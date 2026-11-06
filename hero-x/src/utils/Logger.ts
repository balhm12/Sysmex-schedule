/**
 * 간단한 로그 도구
 * - 모든 메시지 앞에 [HERO X] 를 붙여 브라우저 콘솔(F12)에서 게임 로그를 쉽게 찾을 수 있게 한다.
 */
const PREFIX = '[HERO X]';

export const Logger = {
  info(message: string, ...rest: unknown[]): void {
    console.info(`${PREFIX} ${message}`, ...rest);
  },
  warn(message: string, ...rest: unknown[]): void {
    console.warn(`${PREFIX} ${message}`, ...rest);
  },
  error(message: string, ...rest: unknown[]): void {
    console.error(`${PREFIX} ${message}`, ...rest);
  },
};
