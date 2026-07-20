# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A two-page static web app (no build step, no package.json) for Sysmex Korea's FS (Field Service) team:

- **`index.html`** — "시스템 설치 공유 캘린더" (system install shared calendar). Tracks install/relocation/evaluation events per hospital client, calendar-style, for FY26 (Apr 2026–Mar 2027).
- **`work-schedule.html`** — "근무일정" (work schedule). Tracks per-person daily shift status (AM/PM slots, night duty, weekend/holiday duty) across four regional teams (West/East/Central/South).

Each file is fully self-contained: inline `<style>`, inline `<script>`, no modules, no bundler. The only external dependency is ExcelJS loaded from a CDN (`cdnjs.cloudflare.com/.../exceljs/4.4.0/exceljs.min.js`) for the "Excel 내보내기" export feature.

Both pages link to each other via a small nav bar (`.app-nav`) at the top.

## Development workflow

There is no build/lint/test tooling in this repo — it's plain HTML/CSS/JS. To work on it:

- Open the `.html` file directly in a browser, or serve the directory with any static file server (e.g. `python3 -m http.server`) so `fetch()` calls to Firebase aren't blocked by `file://` CORS restrictions.
- There are no automated tests. Verify changes by manually exercising the UI in a browser (add/edit/delete an event or schedule entry, switch months/weeks, filter by legend, export ICS/Excel).
- Since UI logic and markup live in one file per page, use the browser devtools console to sanity-check `render()` output while iterating.

## Shared data architecture

Both pages persist data to the **same Firebase Realtime Database** (`FIREBASE_URL` constant, currently `https://sysmex-system-schedule-default-rtdb.firebaseio.com`) via plain REST (`fetch` GET/PUT to `<FIREBASE_URL>/<path>.json`), so no SDK is loaded. Each page uses a different path so data doesn't collide:

| Page | Endpoint path | Meta path |
|---|---|---|
| `index.html` | `schedule-overrides.json` | — |
| `work-schedule.html` | `work-schedule.json` | `work-schedule-meta.json` |

Common patterns to preserve when touching storage code:

- `loadStorage()` / `saveStorage()` wrap `fetch` with an explicit timeout (`AbortController` in `index.html`, `Promise.race` in `work-schedule.html` — the latter avoids a postMessage clone error) and surface failures via `showToast()`/`alert()` with Korean error copy distinguishing timeout vs. network vs. 401/403 (Firebase rules) errors. Keep new storage calls consistent with this error handling.
- `render()` is called immediately on page load *before* `loadStorage()` resolves, so the UI never appears empty on a slow/blocked network; data is re-rendered once the fetch completes.
- A `setInterval` (20s) polls `loadStorage()` + `render()` for near-real-time sharing across teammates, but skips the refresh while the edit overlay/panel is open so it doesn't clobber in-progress edits.
- If `FIREBASE_URL` isn't configured (doesn't start with `http`), `STORAGE_ENDPOINT` is `null` and the app runs in local-only mode with a warning banner — don't assume the endpoint is always set.

### index.html data model

- `BASE_EVENTS`: hardcoded seed array of events (installs/relocations/evaluations/holidays), each `{id, category, start, end, title, device, team, assignee}`. Treated as read-only baseline data shipped in the file.
- User changes layer on top without mutating `BASE_EVENTS`: `customEvents` (new events), `editedMap` (id → replacement object for edited base events), `deletedIds` (Set of removed ids, base or custom). `getAllEvents()` merges these three layers — always go through it rather than reading `BASE_EVENTS` directly.
- `CLIENT_DIRECTORY_BASE` + `customClients`: hospital-name → manager/team directory used for autocomplete when adding an event; `getAllClients()` merges them (custom entries override base by name). New clients get auto-registered here when a manager name is typed on save.
- `CATS` defines the three event categories (`install`/`relocation`/`evaluation`) with display order; holidays come from the separate `HOLIDAYS_KR` map (Korean public holidays 2026–2027, including substitute holidays) and aren't user-editable.
- Export features: `buildICS()`/`exportICS()` produce an RFC5545 `.ics` (all-day events, `COLOR` per RFC 7986) for Outlook/Calendar import; `exportExcel()` uses ExcelJS to build a multi-sheet workbook (event table + FY-month summary + per-team pivot tables).

### work-schedule.html data model

- `TEAMS` (west/east/central/south) hardcodes each team's roster (`{name, role}`); `TEAMS.all` is a derived synthetic "team" combining all rosters, rebuilt via `rebuildAllTeam()` whenever team membership changes. `TEAM_ORDER`/`TAB_ORDER` control display order, and `applyMemberOrder()` applies a user-customizable per-team member ordering stored in `scheduleData.memberOrder`.
- `scheduleData[team][date][name]` holds a per-person, per-day entry: `{night, weekend, am1, am2, pm1, pm2}` (see `blankEntry()`). Empty entries are deleted rather than stored (`setEntry()`).
- Status vocab is split into three fixed option lists — `HALF_STATUS` (the four AM/PM slots), `NIGHT_STATUS` (weekday night duty), `WEEKEND_STATUS` (weekend/holiday duty) — each entry carries `key`, `label`, `short` (badge text), `color`/`bg`, and optional `fillGroup` (auto-fills related slots, e.g. OFF fills all 4) and `hasDetail` (allows free-text appended after `key + ':'`, e.g. `"교육: 신제품 교육"`). When adding a new status, follow this shape and wire it into `matchStatus`/`statusOfIn`/`splitDetail`/`combineDetail`.
- Two view modes (`viewMode`: `'month'` | `'week'`) and a `dutyOnlyView` toggle (shows only night/weekend duty badges via `fillDayCellDutyOnly` instead of the full 4-slot quad via `fillDayCell`).
- **One-time data migrations** run on every `init()` but must stay idempotent: `normalizeWeekendKeys()`, `migrateNightKeyNames()`, `normalizeWeekendNight()` scan and rewrite `scheduleData` in place, save only `if(changed)`, and are safe to re-run. Seed-data migrations (`removeSeedSchedule()`, `applySeedScheduleV3()`) are guarded by a one-time flag persisted at `META_ENDPOINT` (`checkSeedRemoved`/`markSeedRemoved`, `checkSeedV3Applied`/`markSeedV3Applied`) so they run exactly once across all clients — when adding a similar one-off backfill, follow this guarded-by-remote-flag pattern rather than a local flag, since state must sync across every teammate's browser.
- `exportExcel()` produces a 5-sheet ExcelJS workbook (per-person summary, team comparison, fairness/equity view with duty color-coding, statistics, detail).

## Conventions to preserve

- All user-facing strings are Korean; keep new UI text and error messages in Korean and consistent in tone with existing copy.
- Both files use raw DOM APIs (`document.createElement`, `innerHTML` template strings) with no framework — don't introduce a framework or build step for small changes.
- Colors are theme-driven: category/status colors are defined once per data item (`CATS`, `HALF_STATUS`, etc.) and consumed everywhere via lookup rather than hardcoded per call site — follow the same pattern for new categories/statuses.
- Firebase Realtime Database is used purely as a JSON blob store via REST `GET`/`PUT` on `.json` paths — there's no auth/rules logic in this repo to change; `testConnection()` in each file is the diagnostic entry point when debugging connectivity issues.
