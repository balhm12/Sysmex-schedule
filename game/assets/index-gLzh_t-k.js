(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const vr="160",Tl=0,Gr=1,Al=2,Do=1,Uo=2,rn=3,yn=0,Rt=1,zt=2,xn=0,oi=1,Vr=2,Wr=3,Xr=4,Rl=5,Cn=100,Cl=101,Pl=102,qr=103,$r=104,Ll=200,Dl=201,Ul=202,Il=203,or=204,lr=205,Nl=206,Fl=207,Ol=208,zl=209,kl=210,Bl=211,Hl=212,Gl=213,Vl=214,Wl=0,Xl=1,ql=2,as=3,$l=4,Yl=5,jl=6,Kl=7,Mr=0,Zl=1,Jl=2,vn=0,Ql=1,ec=2,tc=3,nc=4,ic=5,sc=6,Io=300,hi=301,ui=302,cr=303,hr=304,_s=306,os=1e3,Xt=1001,ur=1002,wt=1003,Yr=1004,Cs=1005,Ft=1006,rc=1007,wi=1008,Mn=1009,ac=1010,oc=1011,yr=1012,No=1013,gn=1014,_n=1015,Ti=1016,Fo=1017,Oo=1018,Ln=1020,lc=1021,qt=1023,cc=1024,hc=1025,Dn=1026,di=1027,uc=1028,zo=1029,dc=1030,ko=1031,Bo=1033,Ps=33776,Ls=33777,Ds=33778,Us=33779,jr=35840,Kr=35841,Zr=35842,Jr=35843,Ho=36196,Qr=37492,ea=37496,ta=37808,na=37809,ia=37810,sa=37811,ra=37812,aa=37813,oa=37814,la=37815,ca=37816,ha=37817,ua=37818,da=37819,fa=37820,pa=37821,Is=36492,ma=36494,ga=36495,fc=36283,_a=36284,xa=36285,va=36286,Go=3e3,Un=3001,pc=3200,mc=3201,Vo=0,gc=1,kt="",lt="srgb",on="srgb-linear",Sr="display-p3",xs="display-p3-linear",ls="linear",Je="srgb",cs="rec709",hs="p3",Bn=7680,Ma=519,_c=512,xc=513,vc=514,Wo=515,Mc=516,yc=517,Sc=518,bc=519,ya=35044,Sa="300 es",dr=1035,an=2e3,us=2001;class pi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ba=1234567;const Si=Math.PI/180,Ai=180/Math.PI;function mi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(xt[i&255]+xt[i>>8&255]+xt[i>>16&255]+xt[i>>24&255]+"-"+xt[e&255]+xt[e>>8&255]+"-"+xt[e>>16&15|64]+xt[e>>24&255]+"-"+xt[t&63|128]+xt[t>>8&255]+"-"+xt[t>>16&255]+xt[t>>24&255]+xt[n&255]+xt[n>>8&255]+xt[n>>16&255]+xt[n>>24&255]).toLowerCase()}function Tt(i,e,t){return Math.max(e,Math.min(t,i))}function br(i,e){return(i%e+e)%e}function Ec(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function wc(i,e,t){return i!==e?(t-i)/(e-i):0}function bi(i,e,t){return(1-t)*i+t*e}function Tc(i,e,t,n){return bi(i,e,1-Math.exp(-t*n))}function Ac(i,e=1){return e-Math.abs(br(i,e*2)-e)}function Rc(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Cc(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Pc(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Lc(i,e){return i+Math.random()*(e-i)}function Dc(i){return i*(.5-Math.random())}function Uc(i){i!==void 0&&(ba=i);let e=ba+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ic(i){return i*Si}function Nc(i){return i*Ai}function fr(i){return(i&i-1)===0&&i!==0}function Fc(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function ds(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Oc(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),f=a((e-n)/2),m=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*h,l*u,l*f,o*c);break;case"YZY":i.set(l*f,o*h,l*u,o*c);break;case"ZXZ":i.set(l*u,l*f,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*m,o*c);break;case"YXY":i.set(l*m,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*m,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ni(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function bt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Ea={DEG2RAD:Si,RAD2DEG:Ai,generateUUID:mi,clamp:Tt,euclideanModulo:br,mapLinear:Ec,inverseLerp:wc,lerp:bi,damp:Tc,pingpong:Ac,smoothstep:Rc,smootherstep:Cc,randInt:Pc,randFloat:Lc,randFloatSpread:Dc,seededRandom:Uc,degToRad:Ic,radToDeg:Nc,isPowerOfTwo:fr,ceilPowerOfTwo:Fc,floorPowerOfTwo:ds,setQuaternionFromProperEuler:Oc,normalize:bt,denormalize:ni};class Ge{constructor(e=0,t=0){Ge.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Be{constructor(e,t,n,s,r,a,o,l,c){Be.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],f=n[2],m=n[5],g=n[8],_=s[0],p=s[3],d=s[6],S=s[1],x=s[4],y=s[7],R=s[2],T=s[5],A=s[8];return r[0]=a*_+o*S+l*R,r[3]=a*p+o*x+l*T,r[6]=a*d+o*y+l*A,r[1]=c*_+h*S+u*R,r[4]=c*p+h*x+u*T,r[7]=c*d+h*y+u*A,r[2]=f*_+m*S+g*R,r[5]=f*p+m*x+g*T,r[8]=f*d+m*y+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,f=o*l-h*r,m=c*r-a*l,g=t*u+n*f+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(s*c-h*n)*_,e[2]=(o*n-s*a)*_,e[3]=f*_,e[4]=(h*t-s*l)*_,e[5]=(s*r-o*t)*_,e[6]=m*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ns.makeScale(e,t)),this}rotate(e){return this.premultiply(Ns.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ns.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ns=new Be;function Xo(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function fs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function zc(){const i=fs("canvas");return i.style.display="block",i}const wa={};function Ei(i){i in wa||(wa[i]=!0,console.warn(i))}const Ta=new Be().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Aa=new Be().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ii={[on]:{transfer:ls,primaries:cs,toReference:i=>i,fromReference:i=>i},[lt]:{transfer:Je,primaries:cs,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[xs]:{transfer:ls,primaries:hs,toReference:i=>i.applyMatrix3(Aa),fromReference:i=>i.applyMatrix3(Ta)},[Sr]:{transfer:Je,primaries:hs,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Aa),fromReference:i=>i.applyMatrix3(Ta).convertLinearToSRGB()}},kc=new Set([on,xs]),$e={enabled:!0,_workingColorSpace:on,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!kc.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Ii[e].toReference,s=Ii[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Ii[i].primaries},getTransfer:function(i){return i===kt?ls:Ii[i].transfer}};function li(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Fs(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Hn;class qo{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Hn===void 0&&(Hn=fs("canvas")),Hn.width=e.width,Hn.height=e.height;const n=Hn.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Hn}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=fs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=li(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(li(t[n]/255)*255):t[n]=li(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Bc=0;class $o{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Bc++}),this.uuid=mi(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Os(s[a].image)):r.push(Os(s[a]))}else r=Os(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Os(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?qo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Hc=0;class Ct extends pi{constructor(e=Ct.DEFAULT_IMAGE,t=Ct.DEFAULT_MAPPING,n=Xt,s=Xt,r=Ft,a=wi,o=qt,l=Mn,c=Ct.DEFAULT_ANISOTROPY,h=kt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Hc++}),this.uuid=mi(),this.name="",this.source=new $o(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ge(0,0),this.repeat=new Ge(1,1),this.center=new Ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Ei("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Un?lt:kt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Io)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case os:e.x=e.x-Math.floor(e.x);break;case Xt:e.x=e.x<0?0:1;break;case ur:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case os:e.y=e.y-Math.floor(e.y);break;case Xt:e.y=e.y<0?0:1;break;case ur:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ei("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===lt?Un:Go}set encoding(e){Ei("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Un?lt:kt}}Ct.DEFAULT_IMAGE=null;Ct.DEFAULT_MAPPING=Io;Ct.DEFAULT_ANISOTROPY=1;class mt{constructor(e=0,t=0,n=0,s=1){mt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],h=l[4],u=l[8],f=l[1],m=l[5],g=l[9],_=l[2],p=l[6],d=l[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,y=(m+1)/2,R=(d+1)/2,T=(h+f)/4,A=(u+_)/4,F=(g+p)/4;return x>y&&x>R?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=T/n,r=A/n):y>R?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=T/s,r=F/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=A/r,s=F/r),this.set(n,s,r,t),this}let S=Math.sqrt((p-g)*(p-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(S)<.001&&(S=1),this.x=(p-g)/S,this.y=(u-_)/S,this.z=(f-h)/S,this.w=Math.acos((c+m+d-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Gc extends pi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new mt(0,0,e,t),this.scissorTest=!1,this.viewport=new mt(0,0,e,t);const s={width:e,height:t,depth:1};n.encoding!==void 0&&(Ei("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Un?lt:kt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ft,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Ct(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new $o(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Fn extends Gc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Yo extends Ct{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=wt,this.minFilter=wt,this.wrapR=Xt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Vc extends Ct{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=wt,this.minFilter=wt,this.wrapR=Xt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ri{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3];const f=r[a+0],m=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=f,e[t+1]=m,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==f||c!==m||h!==g){let p=1-o;const d=l*f+c*m+h*g+u*_,S=d>=0?1:-1,x=1-d*d;if(x>Number.EPSILON){const R=Math.sqrt(x),T=Math.atan2(R,d*S);p=Math.sin(p*T)/R,o=Math.sin(o*T)/R}const y=o*S;if(l=l*p+f*y,c=c*p+m*y,h=h*p+g*y,u=u*p+_*y,p===1-o){const R=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=R,c*=R,h*=R,u*=R}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],f=r[a+1],m=r[a+2],g=r[a+3];return e[t]=o*g+h*u+l*m-c*f,e[t+1]=l*g+h*f+c*u-o*m,e[t+2]=c*g+h*m+o*f-l*u,e[t+3]=h*g-o*u-l*f-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),f=l(n/2),m=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=f*h*u+c*m*g,this._y=c*m*u-f*h*g,this._z=c*h*g+f*m*u,this._w=c*h*u-f*m*g;break;case"YXZ":this._x=f*h*u+c*m*g,this._y=c*m*u-f*h*g,this._z=c*h*g-f*m*u,this._w=c*h*u+f*m*g;break;case"ZXY":this._x=f*h*u-c*m*g,this._y=c*m*u+f*h*g,this._z=c*h*g+f*m*u,this._w=c*h*u-f*m*g;break;case"ZYX":this._x=f*h*u-c*m*g,this._y=c*m*u+f*h*g,this._z=c*h*g-f*m*u,this._w=c*h*u+f*m*g;break;case"YZX":this._x=f*h*u+c*m*g,this._y=c*m*u+f*h*g,this._z=c*h*g-f*m*u,this._w=c*h*u-f*m*g;break;case"XZY":this._x=f*h*u-c*m*g,this._y=c*m*u-f*h*g,this._z=c*h*g+f*m*u,this._w=c*h*u+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],f=n+o+u;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(h-l)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(n>o&&n>u){const m=2*Math.sqrt(1+n-o-u);this._w=(h-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(o>u){const m=2*Math.sqrt(1+o-n-u);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+u-n-o);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Tt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-t;return this._w=m*a+t*this._w,this._x=m*n+t*this._x,this._y=m*s+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,f=Math.sin(t*h)/c;return this._w=a*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),n*Math.sin(r),n*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,n=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ra.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ra.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return zs.copy(this).projectOnVector(e),this.sub(zs)}reflect(e){return this.sub(zs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const zs=new L,Ra=new Ri;class Ci{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Ht.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Ht.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Ht.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Ht):Ht.fromBufferAttribute(r,a),Ht.applyMatrix4(e.matrixWorld),this.expandByPoint(Ht);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ni.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ni.copy(n.boundingBox)),Ni.applyMatrix4(e.matrixWorld),this.union(Ni)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Ht),Ht.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(xi),Fi.subVectors(this.max,xi),Gn.subVectors(e.a,xi),Vn.subVectors(e.b,xi),Wn.subVectors(e.c,xi),ln.subVectors(Vn,Gn),cn.subVectors(Wn,Vn),En.subVectors(Gn,Wn);let t=[0,-ln.z,ln.y,0,-cn.z,cn.y,0,-En.z,En.y,ln.z,0,-ln.x,cn.z,0,-cn.x,En.z,0,-En.x,-ln.y,ln.x,0,-cn.y,cn.x,0,-En.y,En.x,0];return!ks(t,Gn,Vn,Wn,Fi)||(t=[1,0,0,0,1,0,0,0,1],!ks(t,Gn,Vn,Wn,Fi))?!1:(Oi.crossVectors(ln,cn),t=[Oi.x,Oi.y,Oi.z],ks(t,Gn,Vn,Wn,Fi))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ht).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ht).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qt[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qt[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qt[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qt[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qt[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qt[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qt[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qt[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qt),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Qt=[new L,new L,new L,new L,new L,new L,new L,new L],Ht=new L,Ni=new Ci,Gn=new L,Vn=new L,Wn=new L,ln=new L,cn=new L,En=new L,xi=new L,Fi=new L,Oi=new L,wn=new L;function ks(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){wn.fromArray(i,r);const o=s.x*Math.abs(wn.x)+s.y*Math.abs(wn.y)+s.z*Math.abs(wn.z),l=e.dot(wn),c=t.dot(wn),h=n.dot(wn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const Wc=new Ci,vi=new L,Bs=new L;class Er{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Wc.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;vi.subVectors(e,this.center);const t=vi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(vi,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Bs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(vi.copy(e.center).add(Bs)),this.expandByPoint(vi.copy(e.center).sub(Bs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const en=new L,Hs=new L,zi=new L,hn=new L,Gs=new L,ki=new L,Vs=new L;class jo{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,en)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=en.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(en.copy(this.origin).addScaledVector(this.direction,t),en.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Hs.copy(e).add(t).multiplyScalar(.5),zi.copy(t).sub(e).normalize(),hn.copy(this.origin).sub(Hs);const r=e.distanceTo(t)*.5,a=-this.direction.dot(zi),o=hn.dot(this.direction),l=-hn.dot(zi),c=hn.lengthSq(),h=Math.abs(1-a*a);let u,f,m,g;if(h>0)if(u=a*l-o,f=a*o-l,g=r*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,m=u*(u+a*f+2*o)+f*(a*u+f+2*l)+c}else f=r,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*l)+c;else f=-r,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*l)+c;else f<=-g?(u=Math.max(0,-(-a*r+o)),f=u>0?-r:Math.min(Math.max(-r,-l),r),m=-u*u+f*(f+2*l)+c):f<=g?(u=0,f=Math.min(Math.max(-r,-l),r),m=f*(f+2*l)+c):(u=Math.max(0,-(a*r+o)),f=u>0?r:Math.min(Math.max(-r,-l),r),m=-u*u+f*(f+2*l)+c);else f=a>0?-r:r,u=Math.max(0,-(a*f+o)),m=-u*u+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Hs).addScaledVector(zi,f),m}intersectSphere(e,t){en.subVectors(e.center,this.origin);const n=en.dot(this.direction),s=en.dot(en)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,s=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,s=(e.min.x-f.x)*c),h>=0?(r=(e.min.y-f.y)*h,a=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,a=(e.min.y-f.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-f.z)*u,l=(e.max.z-f.z)*u):(o=(e.max.z-f.z)*u,l=(e.min.z-f.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,en)!==null}intersectTriangle(e,t,n,s,r){Gs.subVectors(t,e),ki.subVectors(n,e),Vs.crossVectors(Gs,ki);let a=this.direction.dot(Vs),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;hn.subVectors(this.origin,e);const l=o*this.direction.dot(ki.crossVectors(hn,ki));if(l<0)return null;const c=o*this.direction.dot(Gs.cross(hn));if(c<0||l+c>a)return null;const h=-o*hn.dot(Vs);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ct{constructor(e,t,n,s,r,a,o,l,c,h,u,f,m,g,_,p){ct.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,u,f,m,g,_,p)}set(e,t,n,s,r,a,o,l,c,h,u,f,m,g,_,p){const d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=s,d[1]=r,d[5]=a,d[9]=o,d[13]=l,d[2]=c,d[6]=h,d[10]=u,d[14]=f,d[3]=m,d[7]=g,d[11]=_,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ct().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Xn.setFromMatrixColumn(e,0).length(),r=1/Xn.setFromMatrixColumn(e,1).length(),a=1/Xn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const f=a*h,m=a*u,g=o*h,_=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=m+g*c,t[5]=f-_*c,t[9]=-o*l,t[2]=_-f*c,t[6]=g+m*c,t[10]=a*l}else if(e.order==="YXZ"){const f=l*h,m=l*u,g=c*h,_=c*u;t[0]=f+_*o,t[4]=g*o-m,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=m*o-g,t[6]=_+f*o,t[10]=a*l}else if(e.order==="ZXY"){const f=l*h,m=l*u,g=c*h,_=c*u;t[0]=f-_*o,t[4]=-a*u,t[8]=g+m*o,t[1]=m+g*o,t[5]=a*h,t[9]=_-f*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const f=a*h,m=a*u,g=o*h,_=o*u;t[0]=l*h,t[4]=g*c-m,t[8]=f*c+_,t[1]=l*u,t[5]=_*c+f,t[9]=m*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const f=a*l,m=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=_-f*u,t[8]=g*u+m,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=m*u+g,t[10]=f-_*u}else if(e.order==="XZY"){const f=a*l,m=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=f*u+_,t[5]=a*h,t[9]=m*u-g,t[2]=g*u-m,t[6]=o*h,t[10]=_*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Xc,e,qc)}lookAt(e,t,n){const s=this.elements;return Lt.subVectors(e,t),Lt.lengthSq()===0&&(Lt.z=1),Lt.normalize(),un.crossVectors(n,Lt),un.lengthSq()===0&&(Math.abs(n.z)===1?Lt.x+=1e-4:Lt.z+=1e-4,Lt.normalize(),un.crossVectors(n,Lt)),un.normalize(),Bi.crossVectors(Lt,un),s[0]=un.x,s[4]=Bi.x,s[8]=Lt.x,s[1]=un.y,s[5]=Bi.y,s[9]=Lt.y,s[2]=un.z,s[6]=Bi.z,s[10]=Lt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],f=n[9],m=n[13],g=n[2],_=n[6],p=n[10],d=n[14],S=n[3],x=n[7],y=n[11],R=n[15],T=s[0],A=s[4],F=s[8],v=s[12],E=s[1],k=s[5],H=s[9],ee=s[13],P=s[2],z=s[6],V=s[10],$=s[14],W=s[3],q=s[7],Y=s[11],te=s[15];return r[0]=a*T+o*E+l*P+c*W,r[4]=a*A+o*k+l*z+c*q,r[8]=a*F+o*H+l*V+c*Y,r[12]=a*v+o*ee+l*$+c*te,r[1]=h*T+u*E+f*P+m*W,r[5]=h*A+u*k+f*z+m*q,r[9]=h*F+u*H+f*V+m*Y,r[13]=h*v+u*ee+f*$+m*te,r[2]=g*T+_*E+p*P+d*W,r[6]=g*A+_*k+p*z+d*q,r[10]=g*F+_*H+p*V+d*Y,r[14]=g*v+_*ee+p*$+d*te,r[3]=S*T+x*E+y*P+R*W,r[7]=S*A+x*k+y*z+R*q,r[11]=S*F+x*H+y*V+R*Y,r[15]=S*v+x*ee+y*$+R*te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],f=e[10],m=e[14],g=e[3],_=e[7],p=e[11],d=e[15];return g*(+r*l*u-s*c*u-r*o*f+n*c*f+s*o*m-n*l*m)+_*(+t*l*m-t*c*f+r*a*f-s*a*m+s*c*h-r*l*h)+p*(+t*c*u-t*o*m-r*a*u+n*a*m+r*o*h-n*c*h)+d*(-s*o*h-t*l*u+t*o*f+s*a*u-n*a*f+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],f=e[10],m=e[11],g=e[12],_=e[13],p=e[14],d=e[15],S=u*p*c-_*f*c+_*l*m-o*p*m-u*l*d+o*f*d,x=g*f*c-h*p*c-g*l*m+a*p*m+h*l*d-a*f*d,y=h*_*c-g*u*c+g*o*m-a*_*m-h*o*d+a*u*d,R=g*u*l-h*_*l-g*o*f+a*_*f+h*o*p-a*u*p,T=t*S+n*x+s*y+r*R;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return e[0]=S*A,e[1]=(_*f*r-u*p*r-_*s*m+n*p*m+u*s*d-n*f*d)*A,e[2]=(o*p*r-_*l*r+_*s*c-n*p*c-o*s*d+n*l*d)*A,e[3]=(u*l*r-o*f*r-u*s*c+n*f*c+o*s*m-n*l*m)*A,e[4]=x*A,e[5]=(h*p*r-g*f*r+g*s*m-t*p*m-h*s*d+t*f*d)*A,e[6]=(g*l*r-a*p*r-g*s*c+t*p*c+a*s*d-t*l*d)*A,e[7]=(a*f*r-h*l*r+h*s*c-t*f*c-a*s*m+t*l*m)*A,e[8]=y*A,e[9]=(g*u*r-h*_*r-g*n*m+t*_*m+h*n*d-t*u*d)*A,e[10]=(a*_*r-g*o*r+g*n*c-t*_*c-a*n*d+t*o*d)*A,e[11]=(h*o*r-a*u*r-h*n*c+t*u*c+a*n*m-t*o*m)*A,e[12]=R*A,e[13]=(h*_*s-g*u*s+g*n*f-t*_*f-h*n*p+t*u*p)*A,e[14]=(g*o*s-a*_*s-g*n*l+t*_*l+a*n*p-t*o*p)*A,e[15]=(a*u*s-h*o*s+h*n*l-t*u*l-a*n*f+t*o*f)*A,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,f=r*c,m=r*h,g=r*u,_=a*h,p=a*u,d=o*u,S=l*c,x=l*h,y=l*u,R=n.x,T=n.y,A=n.z;return s[0]=(1-(_+d))*R,s[1]=(m+y)*R,s[2]=(g-x)*R,s[3]=0,s[4]=(m-y)*T,s[5]=(1-(f+d))*T,s[6]=(p+S)*T,s[7]=0,s[8]=(g+x)*A,s[9]=(p-S)*A,s[10]=(1-(f+_))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Xn.set(s[0],s[1],s[2]).length();const a=Xn.set(s[4],s[5],s[6]).length(),o=Xn.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Gt.copy(this);const c=1/r,h=1/a,u=1/o;return Gt.elements[0]*=c,Gt.elements[1]*=c,Gt.elements[2]*=c,Gt.elements[4]*=h,Gt.elements[5]*=h,Gt.elements[6]*=h,Gt.elements[8]*=u,Gt.elements[9]*=u,Gt.elements[10]*=u,t.setFromRotationMatrix(Gt),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=an){const l=this.elements,c=2*r/(t-e),h=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s);let m,g;if(o===an)m=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===us)m=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=an){const l=this.elements,c=1/(t-e),h=1/(n-s),u=1/(a-r),f=(t+e)*c,m=(n+s)*h;let g,_;if(o===an)g=(a+r)*u,_=-2*u;else if(o===us)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-f,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Xn=new L,Gt=new ct,Xc=new L(0,0,0),qc=new L(1,1,1),un=new L,Bi=new L,Lt=new L,Ca=new ct,Pa=new Ri;class vs{constructor(e=0,t=0,n=0,s=vs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],f=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(Tt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Tt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Tt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Tt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Tt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Tt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ca.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ca,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Pa.setFromEuler(this),this.setFromQuaternion(Pa,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}vs.DEFAULT_ORDER="XYZ";class wr{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let $c=0;const La=new L,qn=new Ri,tn=new ct,Hi=new L,Mi=new L,Yc=new L,jc=new Ri,Da=new L(1,0,0),Ua=new L(0,1,0),Ia=new L(0,0,1),Kc={type:"added"},Zc={type:"removed"};class gt extends pi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:$c++}),this.uuid=mi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=gt.DEFAULT_UP.clone();const e=new L,t=new vs,n=new Ri,s=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ct},normalMatrix:{value:new Be}}),this.matrix=new ct,this.matrixWorld=new ct,this.matrixAutoUpdate=gt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new wr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return qn.setFromAxisAngle(e,t),this.quaternion.multiply(qn),this}rotateOnWorldAxis(e,t){return qn.setFromAxisAngle(e,t),this.quaternion.premultiply(qn),this}rotateX(e){return this.rotateOnAxis(Da,e)}rotateY(e){return this.rotateOnAxis(Ua,e)}rotateZ(e){return this.rotateOnAxis(Ia,e)}translateOnAxis(e,t){return La.copy(e).applyQuaternion(this.quaternion),this.position.add(La.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Da,e)}translateY(e){return this.translateOnAxis(Ua,e)}translateZ(e){return this.translateOnAxis(Ia,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(tn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Hi.copy(e):Hi.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Mi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?tn.lookAt(Mi,Hi,this.up):tn.lookAt(Hi,Mi,this.up),this.quaternion.setFromRotationMatrix(tn),s&&(tn.extractRotation(s.matrixWorld),qn.setFromRotationMatrix(tn),this.quaternion.premultiply(qn.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Kc)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Zc)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),tn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),tn.multiply(e.parent.matrixWorld)),e.applyMatrix4(tn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mi,e,Yc),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Mi,jc,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++){const o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),f=a(e.skeletons),m=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}gt.DEFAULT_UP=new L(0,1,0);gt.DEFAULT_MATRIX_AUTO_UPDATE=!0;gt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Vt=new L,nn=new L,Ws=new L,sn=new L,$n=new L,Yn=new L,Na=new L,Xs=new L,qs=new L,$s=new L;let Gi=!1;class Wt{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Vt.subVectors(e,t),s.cross(Vt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Vt.subVectors(s,t),nn.subVectors(n,t),Ws.subVectors(e,t);const a=Vt.dot(Vt),o=Vt.dot(nn),l=Vt.dot(Ws),c=nn.dot(nn),h=nn.dot(Ws),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const f=1/u,m=(c*l-o*h)*f,g=(a*h-o*l)*f;return r.set(1-m-g,g,m)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,sn)===null?!1:sn.x>=0&&sn.y>=0&&sn.x+sn.y<=1}static getUV(e,t,n,s,r,a,o,l){return Gi===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Gi=!0),this.getInterpolation(e,t,n,s,r,a,o,l)}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,sn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,sn.x),l.addScaledVector(a,sn.y),l.addScaledVector(o,sn.z),l)}static isFrontFacing(e,t,n,s){return Vt.subVectors(n,t),nn.subVectors(e,t),Vt.cross(nn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Vt.subVectors(this.c,this.b),nn.subVectors(this.a,this.b),Vt.cross(nn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Wt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Wt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,s,r){return Gi===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Gi=!0),Wt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}getInterpolation(e,t,n,s,r){return Wt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Wt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Wt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;$n.subVectors(s,n),Yn.subVectors(r,n),Xs.subVectors(e,n);const l=$n.dot(Xs),c=Yn.dot(Xs);if(l<=0&&c<=0)return t.copy(n);qs.subVectors(e,s);const h=$n.dot(qs),u=Yn.dot(qs);if(h>=0&&u<=h)return t.copy(s);const f=l*u-h*c;if(f<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector($n,a);$s.subVectors(e,r);const m=$n.dot($s),g=Yn.dot($s);if(g>=0&&m<=g)return t.copy(r);const _=m*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Yn,o);const p=h*g-m*u;if(p<=0&&u-h>=0&&m-g>=0)return Na.subVectors(r,s),o=(u-h)/(u-h+(m-g)),t.copy(s).addScaledVector(Na,o);const d=1/(p+_+f);return a=_*d,o=f*d,t.copy(n).addScaledVector($n,a).addScaledVector(Yn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ko={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},dn={h:0,s:0,l:0},Vi={h:0,s:0,l:0};function Ys(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class be{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=lt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=$e.workingColorSpace){return this.r=e,this.g=t,this.b=n,$e.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=$e.workingColorSpace){if(e=br(e,1),t=Tt(t,0,1),n=Tt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Ys(a,r,e+1/3),this.g=Ys(a,r,e),this.b=Ys(a,r,e-1/3)}return $e.toWorkingColorSpace(this,s),this}setStyle(e,t=lt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=lt){const n=Ko[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=li(e.r),this.g=li(e.g),this.b=li(e.b),this}copyLinearToSRGB(e){return this.r=Fs(e.r),this.g=Fs(e.g),this.b=Fs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=lt){return $e.fromWorkingColorSpace(vt.copy(this),e),Math.round(Tt(vt.r*255,0,255))*65536+Math.round(Tt(vt.g*255,0,255))*256+Math.round(Tt(vt.b*255,0,255))}getHexString(e=lt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=$e.workingColorSpace){$e.fromWorkingColorSpace(vt.copy(this),t);const n=vt.r,s=vt.g,r=vt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=$e.workingColorSpace){return $e.fromWorkingColorSpace(vt.copy(this),t),e.r=vt.r,e.g=vt.g,e.b=vt.b,e}getStyle(e=lt){$e.fromWorkingColorSpace(vt.copy(this),e);const t=vt.r,n=vt.g,s=vt.b;return e!==lt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(dn),this.setHSL(dn.h+e,dn.s+t,dn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(dn),e.getHSL(Vi);const n=bi(dn.h,Vi.h,t),s=bi(dn.s,Vi.s,t),r=bi(dn.l,Vi.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const vt=new be;be.NAMES=Ko;let Jc=0;class Pi extends pi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Jc++}),this.uuid=mi(),this.name="",this.type="Material",this.blending=oi,this.side=yn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=or,this.blendDst=lr,this.blendEquation=Cn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new be(0,0,0),this.blendAlpha=0,this.depthFunc=as,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ma,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Bn,this.stencilZFail=Bn,this.stencilZPass=Bn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==oi&&(n.blending=this.blending),this.side!==yn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==or&&(n.blendSrc=this.blendSrc),this.blendDst!==lr&&(n.blendDst=this.blendDst),this.blendEquation!==Cn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==as&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ma&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Bn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Bn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Bn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class At extends Pi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Mr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ot=new L,Wi=new Ge;class Kt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ya,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=_n,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Wi.fromBufferAttribute(this,t),Wi.applyMatrix3(e),this.setXY(t,Wi.x,Wi.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ot.fromBufferAttribute(this,t),ot.applyMatrix3(e),this.setXYZ(t,ot.x,ot.y,ot.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ot.fromBufferAttribute(this,t),ot.applyMatrix4(e),this.setXYZ(t,ot.x,ot.y,ot.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ot.fromBufferAttribute(this,t),ot.applyNormalMatrix(e),this.setXYZ(t,ot.x,ot.y,ot.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ot.fromBufferAttribute(this,t),ot.transformDirection(e),this.setXYZ(t,ot.x,ot.y,ot.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ni(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=bt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ni(t,this.array)),t}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ni(t,this.array)),t}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ni(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ni(t,this.array)),t}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),s=bt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),n=bt(n,this.array),s=bt(s,this.array),r=bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ya&&(e.usage=this.usage),e}}class Zo extends Kt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Jo extends Kt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class rt extends Kt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Qc=0;const Nt=new ct,js=new gt,jn=new L,Dt=new Ci,yi=new Ci,pt=new L;class Bt extends pi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Qc++}),this.uuid=mi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Xo(e)?Jo:Zo)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Be().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Nt.makeRotationFromQuaternion(e),this.applyMatrix4(Nt),this}rotateX(e){return Nt.makeRotationX(e),this.applyMatrix4(Nt),this}rotateY(e){return Nt.makeRotationY(e),this.applyMatrix4(Nt),this}rotateZ(e){return Nt.makeRotationZ(e),this.applyMatrix4(Nt),this}translate(e,t,n){return Nt.makeTranslation(e,t,n),this.applyMatrix4(Nt),this}scale(e,t,n){return Nt.makeScale(e,t,n),this.applyMatrix4(Nt),this}lookAt(e){return js.lookAt(e),js.updateMatrix(),this.applyMatrix4(js.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(jn).negate(),this.translate(jn.x,jn.y,jn.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new rt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ci);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Dt.setFromBufferAttribute(r),this.morphTargetsRelative?(pt.addVectors(this.boundingBox.min,Dt.min),this.boundingBox.expandByPoint(pt),pt.addVectors(this.boundingBox.max,Dt.max),this.boundingBox.expandByPoint(pt)):(this.boundingBox.expandByPoint(Dt.min),this.boundingBox.expandByPoint(Dt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Er);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(Dt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];yi.setFromBufferAttribute(o),this.morphTargetsRelative?(pt.addVectors(Dt.min,yi.min),Dt.expandByPoint(pt),pt.addVectors(Dt.max,yi.max),Dt.expandByPoint(pt)):(Dt.expandByPoint(yi.min),Dt.expandByPoint(yi.max))}Dt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)pt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(pt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)pt.fromBufferAttribute(o,c),l&&(jn.fromBufferAttribute(e,c),pt.add(jn)),s=Math.max(s,n.distanceToSquared(pt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,s=t.position.array,r=t.normal.array,a=t.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Kt(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let E=0;E<o;E++)c[E]=new L,h[E]=new L;const u=new L,f=new L,m=new L,g=new Ge,_=new Ge,p=new Ge,d=new L,S=new L;function x(E,k,H){u.fromArray(s,E*3),f.fromArray(s,k*3),m.fromArray(s,H*3),g.fromArray(a,E*2),_.fromArray(a,k*2),p.fromArray(a,H*2),f.sub(u),m.sub(u),_.sub(g),p.sub(g);const ee=1/(_.x*p.y-p.x*_.y);isFinite(ee)&&(d.copy(f).multiplyScalar(p.y).addScaledVector(m,-_.y).multiplyScalar(ee),S.copy(m).multiplyScalar(_.x).addScaledVector(f,-p.x).multiplyScalar(ee),c[E].add(d),c[k].add(d),c[H].add(d),h[E].add(S),h[k].add(S),h[H].add(S))}let y=this.groups;y.length===0&&(y=[{start:0,count:n.length}]);for(let E=0,k=y.length;E<k;++E){const H=y[E],ee=H.start,P=H.count;for(let z=ee,V=ee+P;z<V;z+=3)x(n[z+0],n[z+1],n[z+2])}const R=new L,T=new L,A=new L,F=new L;function v(E){A.fromArray(r,E*3),F.copy(A);const k=c[E];R.copy(k),R.sub(A.multiplyScalar(A.dot(k))).normalize(),T.crossVectors(F,k);const ee=T.dot(h[E])<0?-1:1;l[E*4]=R.x,l[E*4+1]=R.y,l[E*4+2]=R.z,l[E*4+3]=ee}for(let E=0,k=y.length;E<k;++E){const H=y[E],ee=H.start,P=H.count;for(let z=ee,V=ee+P;z<V;z+=3)v(n[z+0]),v(n[z+1]),v(n[z+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Kt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);const s=new L,r=new L,a=new L,o=new L,l=new L,c=new L,h=new L,u=new L;if(e)for(let f=0,m=e.count;f<m;f+=3){const g=e.getX(f+0),_=e.getX(f+1),p=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,p),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let f=0,m=t.count;f<m;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)pt.fromBufferAttribute(e,t),pt.normalize(),e.setXYZ(t,pt.x,pt.y,pt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,f=new c.constructor(l.length*h);let m=0,g=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?m=l[_]*o.data.stride+o.offset:m=l[_]*h;for(let d=0;d<h;d++)f[g++]=c[m++]}return new Kt(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Bt,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const f=c[h],m=e(f,n);l.push(m)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,f=c.length;u<f;u++){const m=c[u];h.push(m.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let f=0,m=u.length;f<m;f++)h.push(u[f].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Fa=new ct,Tn=new jo,Xi=new Er,Oa=new L,Kn=new L,Zn=new L,Jn=new L,Ks=new L,qi=new L,$i=new Ge,Yi=new Ge,ji=new Ge,za=new L,ka=new L,Ba=new L,Ki=new L,Zi=new L;class Se extends gt{constructor(e=new Bt,t=new At){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){qi.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(Ks.fromBufferAttribute(u,e),a?qi.addScaledVector(Ks,h):qi.addScaledVector(Ks.sub(t),h))}t.add(qi)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Xi.copy(n.boundingSphere),Xi.applyMatrix4(r),Tn.copy(e.ray).recast(e.near),!(Xi.containsPoint(Tn.origin)===!1&&(Tn.intersectSphere(Xi,Oa)===null||Tn.origin.distanceToSquared(Oa)>(e.far-e.near)**2))&&(Fa.copy(r).invert(),Tn.copy(e.ray).applyMatrix4(Fa),!(n.boundingBox!==null&&Tn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Tn)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],d=a[p.materialIndex],S=Math.max(p.start,m.start),x=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let y=S,R=x;y<R;y+=3){const T=o.getX(y),A=o.getX(y+1),F=o.getX(y+2);s=Ji(this,d,e,n,c,h,u,T,A,F),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);for(let p=g,d=_;p<d;p+=3){const S=o.getX(p),x=o.getX(p+1),y=o.getX(p+2);s=Ji(this,a,e,n,c,h,u,S,x,y),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){const p=f[g],d=a[p.materialIndex],S=Math.max(p.start,m.start),x=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let y=S,R=x;y<R;y+=3){const T=y,A=y+1,F=y+2;s=Ji(this,d,e,n,c,h,u,T,A,F),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let p=g,d=_;p<d;p+=3){const S=p,x=p+1,y=p+2;s=Ji(this,a,e,n,c,h,u,S,x,y),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function eh(i,e,t,n,s,r,a,o){let l;if(e.side===Rt?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===yn,o),l===null)return null;Zi.copy(o),Zi.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Zi);return c<t.near||c>t.far?null:{distance:c,point:Zi.clone(),object:i}}function Ji(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Kn),i.getVertexPosition(l,Zn),i.getVertexPosition(c,Jn);const h=eh(i,e,t,n,Kn,Zn,Jn,Ki);if(h){s&&($i.fromBufferAttribute(s,o),Yi.fromBufferAttribute(s,l),ji.fromBufferAttribute(s,c),h.uv=Wt.getInterpolation(Ki,Kn,Zn,Jn,$i,Yi,ji,new Ge)),r&&($i.fromBufferAttribute(r,o),Yi.fromBufferAttribute(r,l),ji.fromBufferAttribute(r,c),h.uv1=Wt.getInterpolation(Ki,Kn,Zn,Jn,$i,Yi,ji,new Ge),h.uv2=h.uv1),a&&(za.fromBufferAttribute(a,o),ka.fromBufferAttribute(a,l),Ba.fromBufferAttribute(a,c),h.normal=Wt.getInterpolation(Ki,Kn,Zn,Jn,za,ka,Ba,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new L,materialIndex:0};Wt.getNormal(Kn,Zn,Jn,u.normal),h.face=u}return h}class We extends Bt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let f=0,m=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new rt(c,3)),this.setAttribute("normal",new rt(h,3)),this.setAttribute("uv",new rt(u,2));function g(_,p,d,S,x,y,R,T,A,F,v){const E=y/A,k=R/F,H=y/2,ee=R/2,P=T/2,z=A+1,V=F+1;let $=0,W=0;const q=new L;for(let Y=0;Y<V;Y++){const te=Y*k-ee;for(let ne=0;ne<z;ne++){const G=ne*E-H;q[_]=G*S,q[p]=te*x,q[d]=P,c.push(q.x,q.y,q.z),q[_]=0,q[p]=0,q[d]=T>0?1:-1,h.push(q.x,q.y,q.z),u.push(ne/A),u.push(1-Y/F),$+=1}}for(let Y=0;Y<F;Y++)for(let te=0;te<A;te++){const ne=f+te+z*Y,G=f+te+z*(Y+1),j=f+(te+1)+z*(Y+1),le=f+(te+1)+z*Y;l.push(ne,G,le),l.push(G,j,le),W+=6}o.addGroup(m,W,v),m+=W,f+=$}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new We(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function fi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Et(i){const e={};for(let t=0;t<i.length;t++){const n=fi(i[t]);for(const s in n)e[s]=n[s]}return e}function th(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Qo(i){return i.getRenderTarget()===null?i.outputColorSpace:$e.workingColorSpace}const nh={clone:fi,merge:Et};var ih=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class On extends Pi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ih,this.fragmentShader=sh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=fi(e.uniforms),this.uniformsGroups=th(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class el extends gt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ct,this.projectionMatrix=new ct,this.projectionMatrixInverse=new ct,this.coordinateSystem=an}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Ot extends el{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ai*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Si*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ai*2*Math.atan(Math.tan(Si*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Si*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Qn=-90,ei=1;class rh extends gt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ot(Qn,ei,e,t);s.layers=this.layers,this.add(s);const r=new Ot(Qn,ei,e,t);r.layers=this.layers,this.add(r);const a=new Ot(Qn,ei,e,t);a.layers=this.layers,this.add(a);const o=new Ot(Qn,ei,e,t);o.layers=this.layers,this.add(o);const l=new Ot(Qn,ei,e,t);l.layers=this.layers,this.add(l);const c=new Ot(Qn,ei,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===an)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===us)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,f,m),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class tl extends Ct{constructor(e,t,n,s,r,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:hi,super(e,t,n,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ah extends Fn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];t.encoding!==void 0&&(Ei("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Un?lt:kt),this.texture=new tl(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ft}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new We(5,5,5),r=new On({name:"CubemapFromEquirect",uniforms:fi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Rt,blending:xn});r.uniforms.tEquirect.value=t;const a=new Se(s,r),o=t.minFilter;return t.minFilter===wi&&(t.minFilter=Ft),new rh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const Zs=new L,oh=new L,lh=new Be;class pn{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Zs.subVectors(n,t).cross(oh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Zs),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||lh.getNormalMatrix(e),s=this.coplanarPoint(Zs).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const An=new Er,Qi=new L;class Tr{constructor(e=new pn,t=new pn,n=new pn,s=new pn,r=new pn,a=new pn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=an){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],f=s[7],m=s[8],g=s[9],_=s[10],p=s[11],d=s[12],S=s[13],x=s[14],y=s[15];if(n[0].setComponents(l-r,f-c,p-m,y-d).normalize(),n[1].setComponents(l+r,f+c,p+m,y+d).normalize(),n[2].setComponents(l+a,f+h,p+g,y+S).normalize(),n[3].setComponents(l-a,f-h,p-g,y-S).normalize(),n[4].setComponents(l-o,f-u,p-_,y-x).normalize(),t===an)n[5].setComponents(l+o,f+u,p+_,y+x).normalize();else if(t===us)n[5].setComponents(o,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),An.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),An.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(An)}intersectsSprite(e){return An.center.set(0,0,0),An.radius=.7071067811865476,An.applyMatrix4(e.matrixWorld),this.intersectsSphere(An)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Qi.x=s.normal.x>0?e.max.x:e.min.x,Qi.y=s.normal.y>0?e.max.y:e.min.y,Qi.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Qi)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function nl(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function ch(i,e){const t=e.isWebGL2,n=new WeakMap;function s(c,h){const u=c.array,f=c.usage,m=u.byteLength,g=i.createBuffer();i.bindBuffer(h,g),i.bufferData(h,u,f),c.onUploadCallback();let _;if(u instanceof Float32Array)_=i.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=i.SHORT;else if(u instanceof Uint32Array)_=i.UNSIGNED_INT;else if(u instanceof Int32Array)_=i.INT;else if(u instanceof Int8Array)_=i.BYTE;else if(u instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:m}}function r(c,h,u){const f=h.array,m=h._updateRange,g=h.updateRanges;if(i.bindBuffer(u,c),m.count===-1&&g.length===0&&i.bufferSubData(u,0,f),g.length!==0){for(let _=0,p=g.length;_<p;_++){const d=g[_];t?i.bufferSubData(u,d.start*f.BYTES_PER_ELEMENT,f,d.start,d.count):i.bufferSubData(u,d.start*f.BYTES_PER_ELEMENT,f.subarray(d.start,d.start+d.count))}h.clearUpdateRanges()}m.count!==-1&&(t?i.bufferSubData(u,m.offset*f.BYTES_PER_ELEMENT,f,m.offset,m.count):i.bufferSubData(u,m.offset*f.BYTES_PER_ELEMENT,f.subarray(m.offset,m.offset+m.count)),m.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(i.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const f=n.get(c);(!f||f.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);if(u===void 0)n.set(c,s(c,h));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,c,h),u.version=c.version}}return{get:a,remove:o,update:l}}class Ms extends Bt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=e/o,f=t/l,m=[],g=[],_=[],p=[];for(let d=0;d<h;d++){const S=d*f-a;for(let x=0;x<c;x++){const y=x*u-r;g.push(y,-S,0),_.push(0,0,1),p.push(x/o),p.push(1-d/l)}}for(let d=0;d<l;d++)for(let S=0;S<o;S++){const x=S+c*d,y=S+c*(d+1),R=S+1+c*(d+1),T=S+1+c*d;m.push(x,y,T),m.push(y,R,T)}this.setIndex(m),this.setAttribute("position",new rt(g,3)),this.setAttribute("normal",new rt(_,3)),this.setAttribute("uv",new rt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ms(e.width,e.height,e.widthSegments,e.heightSegments)}}var hh=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,uh=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,dh=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,fh=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ph=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,mh=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,gh=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,_h=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xh=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,vh=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Mh=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,yh=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Sh=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,bh=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Eh=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,wh=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Th=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ah=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Rh=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ch=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ph=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Lh=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Dh=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Uh=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ih=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Nh=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Fh=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Oh=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,zh=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,kh=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Bh="gl_FragColor = linearToOutputTexel( gl_FragColor );",Hh=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Gh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Vh=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Wh=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Xh=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,qh=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,$h=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Yh=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,jh=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Kh=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Zh=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Jh=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Qh=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,eu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,tu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,nu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,iu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,su=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ru=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,au=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ou=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,cu=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,hu=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,uu=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,du=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,fu=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,pu=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mu=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,gu=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,_u=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,xu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Mu=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Su=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,bu=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Eu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,wu=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Tu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Au=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ru=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Cu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Lu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Du=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Uu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Iu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Nu=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Fu=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ou=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zu=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,ku=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Bu=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Hu=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Gu=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Vu=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Wu=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Xu=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,qu=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,$u=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Yu=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ju=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ku=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Zu=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ju=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Qu=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ed=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,td=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,nd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,id=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,sd=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,rd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ad=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,od=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ld=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const cd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,hd=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ud=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dd=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,md=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,gd=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,_d=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,xd=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,vd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Md=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yd=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Sd=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ed=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wd=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Td=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ad=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Rd=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cd=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Pd=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ld=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dd=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ud=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Id=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Nd=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fd=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Od=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,zd=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,kd=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Bd=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Hd=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Gd=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ie={alphahash_fragment:hh,alphahash_pars_fragment:uh,alphamap_fragment:dh,alphamap_pars_fragment:fh,alphatest_fragment:ph,alphatest_pars_fragment:mh,aomap_fragment:gh,aomap_pars_fragment:_h,batching_pars_vertex:xh,batching_vertex:vh,begin_vertex:Mh,beginnormal_vertex:yh,bsdfs:Sh,iridescence_fragment:bh,bumpmap_pars_fragment:Eh,clipping_planes_fragment:wh,clipping_planes_pars_fragment:Th,clipping_planes_pars_vertex:Ah,clipping_planes_vertex:Rh,color_fragment:Ch,color_pars_fragment:Ph,color_pars_vertex:Lh,color_vertex:Dh,common:Uh,cube_uv_reflection_fragment:Ih,defaultnormal_vertex:Nh,displacementmap_pars_vertex:Fh,displacementmap_vertex:Oh,emissivemap_fragment:zh,emissivemap_pars_fragment:kh,colorspace_fragment:Bh,colorspace_pars_fragment:Hh,envmap_fragment:Gh,envmap_common_pars_fragment:Vh,envmap_pars_fragment:Wh,envmap_pars_vertex:Xh,envmap_physical_pars_fragment:iu,envmap_vertex:qh,fog_vertex:$h,fog_pars_vertex:Yh,fog_fragment:jh,fog_pars_fragment:Kh,gradientmap_pars_fragment:Zh,lightmap_fragment:Jh,lightmap_pars_fragment:Qh,lights_lambert_fragment:eu,lights_lambert_pars_fragment:tu,lights_pars_begin:nu,lights_toon_fragment:su,lights_toon_pars_fragment:ru,lights_phong_fragment:au,lights_phong_pars_fragment:ou,lights_physical_fragment:lu,lights_physical_pars_fragment:cu,lights_fragment_begin:hu,lights_fragment_maps:uu,lights_fragment_end:du,logdepthbuf_fragment:fu,logdepthbuf_pars_fragment:pu,logdepthbuf_pars_vertex:mu,logdepthbuf_vertex:gu,map_fragment:_u,map_pars_fragment:xu,map_particle_fragment:vu,map_particle_pars_fragment:Mu,metalnessmap_fragment:yu,metalnessmap_pars_fragment:Su,morphcolor_vertex:bu,morphnormal_vertex:Eu,morphtarget_pars_vertex:wu,morphtarget_vertex:Tu,normal_fragment_begin:Au,normal_fragment_maps:Ru,normal_pars_fragment:Cu,normal_pars_vertex:Pu,normal_vertex:Lu,normalmap_pars_fragment:Du,clearcoat_normal_fragment_begin:Uu,clearcoat_normal_fragment_maps:Iu,clearcoat_pars_fragment:Nu,iridescence_pars_fragment:Fu,opaque_fragment:Ou,packing:zu,premultiplied_alpha_fragment:ku,project_vertex:Bu,dithering_fragment:Hu,dithering_pars_fragment:Gu,roughnessmap_fragment:Vu,roughnessmap_pars_fragment:Wu,shadowmap_pars_fragment:Xu,shadowmap_pars_vertex:qu,shadowmap_vertex:$u,shadowmask_pars_fragment:Yu,skinbase_vertex:ju,skinning_pars_vertex:Ku,skinning_vertex:Zu,skinnormal_vertex:Ju,specularmap_fragment:Qu,specularmap_pars_fragment:ed,tonemapping_fragment:td,tonemapping_pars_fragment:nd,transmission_fragment:id,transmission_pars_fragment:sd,uv_pars_fragment:rd,uv_pars_vertex:ad,uv_vertex:od,worldpos_vertex:ld,background_vert:cd,background_frag:hd,backgroundCube_vert:ud,backgroundCube_frag:dd,cube_vert:fd,cube_frag:pd,depth_vert:md,depth_frag:gd,distanceRGBA_vert:_d,distanceRGBA_frag:xd,equirect_vert:vd,equirect_frag:Md,linedashed_vert:yd,linedashed_frag:Sd,meshbasic_vert:bd,meshbasic_frag:Ed,meshlambert_vert:wd,meshlambert_frag:Td,meshmatcap_vert:Ad,meshmatcap_frag:Rd,meshnormal_vert:Cd,meshnormal_frag:Pd,meshphong_vert:Ld,meshphong_frag:Dd,meshphysical_vert:Ud,meshphysical_frag:Id,meshtoon_vert:Nd,meshtoon_frag:Fd,points_vert:Od,points_frag:zd,shadow_vert:kd,shadow_frag:Bd,sprite_vert:Hd,sprite_frag:Gd},se={common:{diffuse:{value:new be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new Ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new be(16777215)},opacity:{value:1},center:{value:new Ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},jt={basic:{uniforms:Et([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Ie.meshbasic_vert,fragmentShader:Ie.meshbasic_frag},lambert:{uniforms:Et([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new be(0)}}]),vertexShader:Ie.meshlambert_vert,fragmentShader:Ie.meshlambert_frag},phong:{uniforms:Et([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new be(0)},specular:{value:new be(1118481)},shininess:{value:30}}]),vertexShader:Ie.meshphong_vert,fragmentShader:Ie.meshphong_frag},standard:{uniforms:Et([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag},toon:{uniforms:Et([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new be(0)}}]),vertexShader:Ie.meshtoon_vert,fragmentShader:Ie.meshtoon_frag},matcap:{uniforms:Et([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Ie.meshmatcap_vert,fragmentShader:Ie.meshmatcap_frag},points:{uniforms:Et([se.points,se.fog]),vertexShader:Ie.points_vert,fragmentShader:Ie.points_frag},dashed:{uniforms:Et([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ie.linedashed_vert,fragmentShader:Ie.linedashed_frag},depth:{uniforms:Et([se.common,se.displacementmap]),vertexShader:Ie.depth_vert,fragmentShader:Ie.depth_frag},normal:{uniforms:Et([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Ie.meshnormal_vert,fragmentShader:Ie.meshnormal_frag},sprite:{uniforms:Et([se.sprite,se.fog]),vertexShader:Ie.sprite_vert,fragmentShader:Ie.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ie.background_vert,fragmentShader:Ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ie.backgroundCube_vert,fragmentShader:Ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ie.cube_vert,fragmentShader:Ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ie.equirect_vert,fragmentShader:Ie.equirect_frag},distanceRGBA:{uniforms:Et([se.common,se.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ie.distanceRGBA_vert,fragmentShader:Ie.distanceRGBA_frag},shadow:{uniforms:Et([se.lights,se.fog,{color:{value:new be(0)},opacity:{value:1}}]),vertexShader:Ie.shadow_vert,fragmentShader:Ie.shadow_frag}};jt.physical={uniforms:Et([jt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new Ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new Ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new be(0)},specularColor:{value:new be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new Ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:Ie.meshphysical_vert,fragmentShader:Ie.meshphysical_frag};const es={r:0,b:0,g:0};function Vd(i,e,t,n,s,r,a){const o=new be(0);let l=r===!0?0:1,c,h,u=null,f=0,m=null;function g(p,d){let S=!1,x=d.isScene===!0?d.background:null;x&&x.isTexture&&(x=(d.backgroundBlurriness>0?t:e).get(x)),x===null?_(o,l):x&&x.isColor&&(_(x,1),S=!0);const y=i.xr.getEnvironmentBlendMode();y==="additive"?n.buffers.color.setClear(0,0,0,1,a):y==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||S)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),x&&(x.isCubeTexture||x.mapping===_s)?(h===void 0&&(h=new Se(new We(1,1,1),new On({name:"BackgroundCubeMaterial",uniforms:fi(jt.backgroundCube.uniforms),vertexShader:jt.backgroundCube.vertexShader,fragmentShader:jt.backgroundCube.fragmentShader,side:Rt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,h.material.toneMapped=$e.getTransfer(x.colorSpace)!==Je,(u!==x||f!==x.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,u=x,f=x.version,m=i.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new Se(new Ms(2,2),new On({name:"BackgroundMaterial",uniforms:fi(jt.background.uniforms),vertexShader:jt.background.vertexShader,fragmentShader:jt.background.fragmentShader,side:yn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,c.material.toneMapped=$e.getTransfer(x.colorSpace)!==Je,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||f!==x.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,u=x,f=x.version,m=i.toneMapping),c.layers.enableAll(),p.unshift(c,c.geometry,c.material,0,0,null))}function _(p,d){p.getRGB(es,Qo(i)),n.buffers.color.setClear(es.r,es.g,es.b,d,a)}return{getClearColor:function(){return o},setClearColor:function(p,d=1){o.set(p),l=d,_(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(p){l=p,_(o,l)},render:g}}function Wd(i,e,t,n){const s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},l=p(null);let c=l,h=!1;function u(P,z,V,$,W){let q=!1;if(a){const Y=_($,V,z);c!==Y&&(c=Y,m(c.object)),q=d(P,$,V,W),q&&S(P,$,V,W)}else{const Y=z.wireframe===!0;(c.geometry!==$.id||c.program!==V.id||c.wireframe!==Y)&&(c.geometry=$.id,c.program=V.id,c.wireframe=Y,q=!0)}W!==null&&t.update(W,i.ELEMENT_ARRAY_BUFFER),(q||h)&&(h=!1,F(P,z,V,$),W!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function f(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function m(P){return n.isWebGL2?i.bindVertexArray(P):r.bindVertexArrayOES(P)}function g(P){return n.isWebGL2?i.deleteVertexArray(P):r.deleteVertexArrayOES(P)}function _(P,z,V){const $=V.wireframe===!0;let W=o[P.id];W===void 0&&(W={},o[P.id]=W);let q=W[z.id];q===void 0&&(q={},W[z.id]=q);let Y=q[$];return Y===void 0&&(Y=p(f()),q[$]=Y),Y}function p(P){const z=[],V=[],$=[];for(let W=0;W<s;W++)z[W]=0,V[W]=0,$[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:V,attributeDivisors:$,object:P,attributes:{},index:null}}function d(P,z,V,$){const W=c.attributes,q=z.attributes;let Y=0;const te=V.getAttributes();for(const ne in te)if(te[ne].location>=0){const j=W[ne];let le=q[ne];if(le===void 0&&(ne==="instanceMatrix"&&P.instanceMatrix&&(le=P.instanceMatrix),ne==="instanceColor"&&P.instanceColor&&(le=P.instanceColor)),j===void 0||j.attribute!==le||le&&j.data!==le.data)return!0;Y++}return c.attributesNum!==Y||c.index!==$}function S(P,z,V,$){const W={},q=z.attributes;let Y=0;const te=V.getAttributes();for(const ne in te)if(te[ne].location>=0){let j=q[ne];j===void 0&&(ne==="instanceMatrix"&&P.instanceMatrix&&(j=P.instanceMatrix),ne==="instanceColor"&&P.instanceColor&&(j=P.instanceColor));const le={};le.attribute=j,j&&j.data&&(le.data=j.data),W[ne]=le,Y++}c.attributes=W,c.attributesNum=Y,c.index=$}function x(){const P=c.newAttributes;for(let z=0,V=P.length;z<V;z++)P[z]=0}function y(P){R(P,0)}function R(P,z){const V=c.newAttributes,$=c.enabledAttributes,W=c.attributeDivisors;V[P]=1,$[P]===0&&(i.enableVertexAttribArray(P),$[P]=1),W[P]!==z&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,z),W[P]=z)}function T(){const P=c.newAttributes,z=c.enabledAttributes;for(let V=0,$=z.length;V<$;V++)z[V]!==P[V]&&(i.disableVertexAttribArray(V),z[V]=0)}function A(P,z,V,$,W,q,Y){Y===!0?i.vertexAttribIPointer(P,z,V,W,q):i.vertexAttribPointer(P,z,V,$,W,q)}function F(P,z,V,$){if(n.isWebGL2===!1&&(P.isInstancedMesh||$.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const W=$.attributes,q=V.getAttributes(),Y=z.defaultAttributeValues;for(const te in q){const ne=q[te];if(ne.location>=0){let G=W[te];if(G===void 0&&(te==="instanceMatrix"&&P.instanceMatrix&&(G=P.instanceMatrix),te==="instanceColor"&&P.instanceColor&&(G=P.instanceColor)),G!==void 0){const j=G.normalized,le=G.itemSize,ge=t.get(G);if(ge===void 0)continue;const me=ge.buffer,Pe=ge.type,De=ge.bytesPerElement,Ee=n.isWebGL2===!0&&(Pe===i.INT||Pe===i.UNSIGNED_INT||G.gpuType===No);if(G.isInterleavedBufferAttribute){const Ve=G.data,U=Ve.stride,Mt=G.offset;if(Ve.isInstancedInterleavedBuffer){for(let xe=0;xe<ne.locationSize;xe++)R(ne.location+xe,Ve.meshPerAttribute);P.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=Ve.meshPerAttribute*Ve.count)}else for(let xe=0;xe<ne.locationSize;xe++)y(ne.location+xe);i.bindBuffer(i.ARRAY_BUFFER,me);for(let xe=0;xe<ne.locationSize;xe++)A(ne.location+xe,le/ne.locationSize,Pe,j,U*De,(Mt+le/ne.locationSize*xe)*De,Ee)}else{if(G.isInstancedBufferAttribute){for(let Ve=0;Ve<ne.locationSize;Ve++)R(ne.location+Ve,G.meshPerAttribute);P.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let Ve=0;Ve<ne.locationSize;Ve++)y(ne.location+Ve);i.bindBuffer(i.ARRAY_BUFFER,me);for(let Ve=0;Ve<ne.locationSize;Ve++)A(ne.location+Ve,le/ne.locationSize,Pe,j,le*De,le/ne.locationSize*Ve*De,Ee)}}else if(Y!==void 0){const j=Y[te];if(j!==void 0)switch(j.length){case 2:i.vertexAttrib2fv(ne.location,j);break;case 3:i.vertexAttrib3fv(ne.location,j);break;case 4:i.vertexAttrib4fv(ne.location,j);break;default:i.vertexAttrib1fv(ne.location,j)}}}}T()}function v(){H();for(const P in o){const z=o[P];for(const V in z){const $=z[V];for(const W in $)g($[W].object),delete $[W];delete z[V]}delete o[P]}}function E(P){if(o[P.id]===void 0)return;const z=o[P.id];for(const V in z){const $=z[V];for(const W in $)g($[W].object),delete $[W];delete z[V]}delete o[P.id]}function k(P){for(const z in o){const V=o[z];if(V[P.id]===void 0)continue;const $=V[P.id];for(const W in $)g($[W].object),delete $[W];delete V[P.id]}}function H(){ee(),h=!0,c!==l&&(c=l,m(c.object))}function ee(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:H,resetDefaultState:ee,dispose:v,releaseStatesOfGeometry:E,releaseStatesOfProgram:k,initAttributes:x,enableAttribute:y,disableUnusedAttributes:T}}function Xd(i,e,t,n){const s=n.isWebGL2;let r;function a(h){r=h}function o(h,u){i.drawArrays(r,h,u),t.update(u,r,1)}function l(h,u,f){if(f===0)return;let m,g;if(s)m=i,g="drawArraysInstanced";else if(m=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",m===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[g](r,h,u,f),t.update(u,r,f)}function c(h,u,f){if(f===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<f;g++)this.render(h[g],u[g]);else{m.multiDrawArraysWEBGL(r,h,0,u,0,f);let g=0;for(let _=0;_<f;_++)g+=u[_];t.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function qd(i,e,t){let n;function s(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),p=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),d=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),x=f>0,y=a||e.has("OES_texture_float"),R=x&&y,T=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:f,maxTextureSize:m,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:p,maxVaryings:d,maxFragmentUniforms:S,vertexTextures:x,floatFragmentTextures:y,floatVertexTextures:R,maxSamples:T}}function $d(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new pn,o=new Be,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const m=u.length!==0||f||n!==0||s;return s=f,n=u.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,m){const g=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,d=i.get(u);if(!s||g===null||g.length===0||r&&!p)r?h(null):c();else{const S=r?0:n,x=S*4;let y=d.clippingState||null;l.value=y,y=h(g,f,x,m);for(let R=0;R!==x;++R)y[R]=t[R];d.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,m,g){const _=u!==null?u.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const d=m+_*4,S=f.matrixWorldInverse;o.getNormalMatrix(S),(p===null||p.length<d)&&(p=new Float32Array(d));for(let x=0,y=m;x!==_;++x,y+=4)a.copy(u[x]).applyMatrix4(S,o),a.normal.toArray(p,y),p[y+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function Yd(i){let e=new WeakMap;function t(a,o){return o===cr?a.mapping=hi:o===hr&&(a.mapping=ui),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===cr||o===hr)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new ah(l.height/2);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class il extends el{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ii=4,Ha=[.125,.215,.35,.446,.526,.582],Pn=20,Js=new il,Ga=new be;let Qs=null,er=0,tr=0;const Rn=(1+Math.sqrt(5))/2,ti=1/Rn,Va=[new L(1,1,1),new L(-1,1,1),new L(1,1,-1),new L(-1,1,-1),new L(0,Rn,ti),new L(0,Rn,-ti),new L(ti,0,Rn),new L(-ti,0,Rn),new L(Rn,ti,0),new L(-Rn,ti,0)];class Wa{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Qs=this._renderer.getRenderTarget(),er=this._renderer.getActiveCubeFace(),tr=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$a(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=qa(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Qs,er,tr),e.scissorTest=!1,ts(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===hi||e.mapping===ui?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Qs=this._renderer.getRenderTarget(),er=this._renderer.getActiveCubeFace(),tr=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ft,minFilter:Ft,generateMipmaps:!1,type:Ti,format:qt,colorSpace:on,depthBuffer:!1},s=Xa(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xa(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=jd(r)),this._blurMaterial=Kd(r,e,t)}return s}_compileMaterial(e){const t=new Se(this._lodPlanes[0],e);this._renderer.compile(t,Js)}_sceneToCubeUV(e,t,n,s){const o=new Ot(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Ga),h.toneMapping=vn,h.autoClear=!1;const m=new At({name:"PMREM.Background",side:Rt,depthWrite:!1,depthTest:!1}),g=new Se(new We,m);let _=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,_=!0):(m.color.copy(Ga),_=!0);for(let d=0;d<6;d++){const S=d%3;S===0?(o.up.set(0,l[d],0),o.lookAt(c[d],0,0)):S===1?(o.up.set(0,0,l[d]),o.lookAt(0,c[d],0)):(o.up.set(0,l[d],0),o.lookAt(0,0,c[d]));const x=this._cubeSize;ts(s,S*x,d>2?x:0,x,x),h.setRenderTarget(s),_&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===hi||e.mapping===ui;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=$a()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=qa());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Se(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;ts(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Js)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Va[(s-1)%Va.length];this._blur(e,s-1,s,r,a)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Se(this._lodPlanes[s],c),f=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Pn-1),_=r/g,p=isFinite(r)?1+Math.floor(h*_):Pn;p>Pn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Pn}`);const d=[];let S=0;for(let A=0;A<Pn;++A){const F=A/_,v=Math.exp(-F*F/2);d.push(v),A===0?S+=v:A<p&&(S+=2*v)}for(let A=0;A<d.length;A++)d[A]=d[A]/S;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:x}=this;f.dTheta.value=g,f.mipInt.value=x-n;const y=this._sizeLods[s],R=3*y*(s>x-ii?s-x+ii:0),T=4*(this._cubeSize-y);ts(t,R,T,3*y,2*y),l.setRenderTarget(t),l.render(u,Js)}}function jd(i){const e=[],t=[],n=[];let s=i;const r=i-ii+1+Ha.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let l=1/o;a>i-ii?l=Ha[a-i+ii-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,f=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,g=6,_=3,p=2,d=1,S=new Float32Array(_*g*m),x=new Float32Array(p*g*m),y=new Float32Array(d*g*m);for(let T=0;T<m;T++){const A=T%3*2/3-1,F=T>2?0:-1,v=[A,F,0,A+2/3,F,0,A+2/3,F+1,0,A,F,0,A+2/3,F+1,0,A,F+1,0];S.set(v,_*g*T),x.set(f,p*g*T);const E=[T,T,T,T,T,T];y.set(E,d*g*T)}const R=new Bt;R.setAttribute("position",new Kt(S,_)),R.setAttribute("uv",new Kt(x,p)),R.setAttribute("faceIndex",new Kt(y,d)),e.push(R),s>ii&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Xa(i,e,t){const n=new Fn(i,e,t);return n.texture.mapping=_s,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ts(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Kd(i,e,t){const n=new Float32Array(Pn),s=new L(0,1,0);return new On({name:"SphericalGaussianBlur",defines:{n:Pn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ar(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:xn,depthTest:!1,depthWrite:!1})}function qa(){return new On({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ar(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:xn,depthTest:!1,depthWrite:!1})}function $a(){return new On({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ar(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:xn,depthTest:!1,depthWrite:!1})}function Ar(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Zd(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===cr||l===hr,h=l===hi||l===ui;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=e.get(o);return t===null&&(t=new Wa(i)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),e.set(o,u),u.texture}else{if(e.has(o))return e.get(o).texture;{const u=o.image;if(c&&u&&u.height>0||h&&u&&s(u)){t===null&&(t=new Wa(i));const f=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,f),o.addEventListener("dispose",r),f.texture}else return null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Jd(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const s=t(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Qd(i,e,t,n){const s={},r=new WeakMap;function a(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let p=0,d=_.length;p<d;p++)e.remove(_[p])}f.removeEventListener("dispose",a),delete s[f.id];const m=r.get(f);m&&(e.remove(m),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(u,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,t.memory.geometries++),f}function l(u){const f=u.attributes;for(const g in f)e.update(f[g],i.ARRAY_BUFFER);const m=u.morphAttributes;for(const g in m){const _=m[g];for(let p=0,d=_.length;p<d;p++)e.update(_[p],i.ARRAY_BUFFER)}}function c(u){const f=[],m=u.index,g=u.attributes.position;let _=0;if(m!==null){const S=m.array;_=m.version;for(let x=0,y=S.length;x<y;x+=3){const R=S[x+0],T=S[x+1],A=S[x+2];f.push(R,T,T,A,A,R)}}else if(g!==void 0){const S=g.array;_=g.version;for(let x=0,y=S.length/3-1;x<y;x+=3){const R=x+0,T=x+1,A=x+2;f.push(R,T,T,A,A,R)}}else return;const p=new(Xo(f)?Jo:Zo)(f,1);p.version=_;const d=r.get(u);d&&e.remove(d),r.set(u,p)}function h(u){const f=r.get(u);if(f){const m=u.index;m!==null&&f.version<m.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function ef(i,e,t,n){const s=n.isWebGL2;let r;function a(m){r=m}let o,l;function c(m){o=m.type,l=m.bytesPerElement}function h(m,g){i.drawElements(r,g,o,m*l),t.update(g,r,1)}function u(m,g,_){if(_===0)return;let p,d;if(s)p=i,d="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[d](r,g,o,m*l,_),t.update(g,r,_)}function f(m,g,_){if(_===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let d=0;d<_;d++)this.render(m[d]/l,g[d]);else{p.multiDrawElementsWEBGL(r,g,0,o,m,0,_);let d=0;for(let S=0;S<_;S++)d+=g[S];t.update(d,r,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=u,this.renderMultiDraw=f}function tf(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function nf(i,e){return i[0]-e[0]}function sf(i,e){return Math.abs(e[1])-Math.abs(i[1])}function rf(i,e,t){const n={},s=new Float32Array(8),r=new WeakMap,a=new mt,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,u){const f=c.morphTargetInfluences;if(e.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let p=r.get(h);if(p===void 0||p.count!==_){let z=function(){ee.dispose(),r.delete(h),h.removeEventListener("dispose",z)};var m=z;p!==void 0&&p.texture.dispose();const x=h.morphAttributes.position!==void 0,y=h.morphAttributes.normal!==void 0,R=h.morphAttributes.color!==void 0,T=h.morphAttributes.position||[],A=h.morphAttributes.normal||[],F=h.morphAttributes.color||[];let v=0;x===!0&&(v=1),y===!0&&(v=2),R===!0&&(v=3);let E=h.attributes.position.count*v,k=1;E>e.maxTextureSize&&(k=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const H=new Float32Array(E*k*4*_),ee=new Yo(H,E,k,_);ee.type=_n,ee.needsUpdate=!0;const P=v*4;for(let V=0;V<_;V++){const $=T[V],W=A[V],q=F[V],Y=E*k*4*V;for(let te=0;te<$.count;te++){const ne=te*P;x===!0&&(a.fromBufferAttribute($,te),H[Y+ne+0]=a.x,H[Y+ne+1]=a.y,H[Y+ne+2]=a.z,H[Y+ne+3]=0),y===!0&&(a.fromBufferAttribute(W,te),H[Y+ne+4]=a.x,H[Y+ne+5]=a.y,H[Y+ne+6]=a.z,H[Y+ne+7]=0),R===!0&&(a.fromBufferAttribute(q,te),H[Y+ne+8]=a.x,H[Y+ne+9]=a.y,H[Y+ne+10]=a.z,H[Y+ne+11]=q.itemSize===4?a.w:1)}}p={count:_,texture:ee,size:new Ge(E,k)},r.set(h,p),h.addEventListener("dispose",z)}let d=0;for(let x=0;x<f.length;x++)d+=f[x];const S=h.morphTargetsRelative?1:1-d;u.getUniforms().setValue(i,"morphTargetBaseInfluence",S),u.getUniforms().setValue(i,"morphTargetInfluences",f),u.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),u.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}else{const g=f===void 0?0:f.length;let _=n[h.id];if(_===void 0||_.length!==g){_=[];for(let y=0;y<g;y++)_[y]=[y,0];n[h.id]=_}for(let y=0;y<g;y++){const R=_[y];R[0]=y,R[1]=f[y]}_.sort(sf);for(let y=0;y<8;y++)y<g&&_[y][1]?(o[y][0]=_[y][0],o[y][1]=_[y][1]):(o[y][0]=Number.MAX_SAFE_INTEGER,o[y][1]=0);o.sort(nf);const p=h.morphAttributes.position,d=h.morphAttributes.normal;let S=0;for(let y=0;y<8;y++){const R=o[y],T=R[0],A=R[1];T!==Number.MAX_SAFE_INTEGER&&A?(p&&h.getAttribute("morphTarget"+y)!==p[T]&&h.setAttribute("morphTarget"+y,p[T]),d&&h.getAttribute("morphNormal"+y)!==d[T]&&h.setAttribute("morphNormal"+y,d[T]),s[y]=A,S+=A):(p&&h.hasAttribute("morphTarget"+y)===!0&&h.deleteAttribute("morphTarget"+y),d&&h.hasAttribute("morphNormal"+y)===!0&&h.deleteAttribute("morphNormal"+y),s[y]=0)}const x=h.morphTargetsRelative?1:1-S;u.getUniforms().setValue(i,"morphTargetBaseInfluence",x),u.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:l}}function af(i,e,t,n){let s=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==c&&(f.update(),s.set(f,c))}return u}function a(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}class sl extends Ct{constructor(e,t,n,s,r,a,o,l,c,h){if(h=h!==void 0?h:Dn,h!==Dn&&h!==di)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Dn&&(n=gn),n===void 0&&h===di&&(n=Ln),super(null,s,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:wt,this.minFilter=l!==void 0?l:wt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const rl=new Ct,al=new sl(1,1);al.compareFunction=Wo;const ol=new Yo,ll=new Vc,cl=new tl,Ya=[],ja=[],Ka=new Float32Array(16),Za=new Float32Array(9),Ja=new Float32Array(4);function gi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Ya[s];if(r===void 0&&(r=new Float32Array(s),Ya[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function ht(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function ut(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function ys(i,e){let t=ja[e];t===void 0&&(t=new Int32Array(e),ja[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function of(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function lf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ht(t,e))return;i.uniform2fv(this.addr,e),ut(t,e)}}function cf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ht(t,e))return;i.uniform3fv(this.addr,e),ut(t,e)}}function hf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ht(t,e))return;i.uniform4fv(this.addr,e),ut(t,e)}}function uf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ht(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),ut(t,e)}else{if(ht(t,n))return;Ja.set(n),i.uniformMatrix2fv(this.addr,!1,Ja),ut(t,n)}}function df(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ht(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),ut(t,e)}else{if(ht(t,n))return;Za.set(n),i.uniformMatrix3fv(this.addr,!1,Za),ut(t,n)}}function ff(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ht(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),ut(t,e)}else{if(ht(t,n))return;Ka.set(n),i.uniformMatrix4fv(this.addr,!1,Ka),ut(t,n)}}function pf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function mf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ht(t,e))return;i.uniform2iv(this.addr,e),ut(t,e)}}function gf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ht(t,e))return;i.uniform3iv(this.addr,e),ut(t,e)}}function _f(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ht(t,e))return;i.uniform4iv(this.addr,e),ut(t,e)}}function xf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function vf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ht(t,e))return;i.uniform2uiv(this.addr,e),ut(t,e)}}function Mf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ht(t,e))return;i.uniform3uiv(this.addr,e),ut(t,e)}}function yf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ht(t,e))return;i.uniform4uiv(this.addr,e),ut(t,e)}}function Sf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);const r=this.type===i.SAMPLER_2D_SHADOW?al:rl;t.setTexture2D(e||r,s)}function bf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||ll,s)}function Ef(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||cl,s)}function wf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||ol,s)}function Tf(i){switch(i){case 5126:return of;case 35664:return lf;case 35665:return cf;case 35666:return hf;case 35674:return uf;case 35675:return df;case 35676:return ff;case 5124:case 35670:return pf;case 35667:case 35671:return mf;case 35668:case 35672:return gf;case 35669:case 35673:return _f;case 5125:return xf;case 36294:return vf;case 36295:return Mf;case 36296:return yf;case 35678:case 36198:case 36298:case 36306:case 35682:return Sf;case 35679:case 36299:case 36307:return bf;case 35680:case 36300:case 36308:case 36293:return Ef;case 36289:case 36303:case 36311:case 36292:return wf}}function Af(i,e){i.uniform1fv(this.addr,e)}function Rf(i,e){const t=gi(e,this.size,2);i.uniform2fv(this.addr,t)}function Cf(i,e){const t=gi(e,this.size,3);i.uniform3fv(this.addr,t)}function Pf(i,e){const t=gi(e,this.size,4);i.uniform4fv(this.addr,t)}function Lf(i,e){const t=gi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Df(i,e){const t=gi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Uf(i,e){const t=gi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function If(i,e){i.uniform1iv(this.addr,e)}function Nf(i,e){i.uniform2iv(this.addr,e)}function Ff(i,e){i.uniform3iv(this.addr,e)}function Of(i,e){i.uniform4iv(this.addr,e)}function zf(i,e){i.uniform1uiv(this.addr,e)}function kf(i,e){i.uniform2uiv(this.addr,e)}function Bf(i,e){i.uniform3uiv(this.addr,e)}function Hf(i,e){i.uniform4uiv(this.addr,e)}function Gf(i,e,t){const n=this.cache,s=e.length,r=ys(t,s);ht(n,r)||(i.uniform1iv(this.addr,r),ut(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||rl,r[a])}function Vf(i,e,t){const n=this.cache,s=e.length,r=ys(t,s);ht(n,r)||(i.uniform1iv(this.addr,r),ut(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||ll,r[a])}function Wf(i,e,t){const n=this.cache,s=e.length,r=ys(t,s);ht(n,r)||(i.uniform1iv(this.addr,r),ut(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||cl,r[a])}function Xf(i,e,t){const n=this.cache,s=e.length,r=ys(t,s);ht(n,r)||(i.uniform1iv(this.addr,r),ut(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||ol,r[a])}function qf(i){switch(i){case 5126:return Af;case 35664:return Rf;case 35665:return Cf;case 35666:return Pf;case 35674:return Lf;case 35675:return Df;case 35676:return Uf;case 5124:case 35670:return If;case 35667:case 35671:return Nf;case 35668:case 35672:return Ff;case 35669:case 35673:return Of;case 5125:return zf;case 36294:return kf;case 36295:return Bf;case 36296:return Hf;case 35678:case 36198:case 36298:case 36306:case 35682:return Gf;case 35679:case 36299:case 36307:return Vf;case 35680:case 36300:case 36308:case 36293:return Wf;case 36289:case 36303:case 36311:case 36292:return Xf}}class $f{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Tf(t.type)}}class Yf{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=qf(t.type)}}class jf{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const nr=/(\w+)(\])?(\[|\.)?/g;function Qa(i,e){i.seq.push(e),i.map[e.id]=e}function Kf(i,e,t){const n=i.name,s=n.length;for(nr.lastIndex=0;;){const r=nr.exec(n),a=nr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Qa(t,c===void 0?new $f(o,i,e):new Yf(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new jf(o),Qa(t,u)),t=u}}}class is{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);Kf(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function eo(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Zf=37297;let Jf=0;function Qf(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function ep(i){const e=$e.getPrimaries($e.workingColorSpace),t=$e.getPrimaries(i);let n;switch(e===t?n="":e===hs&&t===cs?n="LinearDisplayP3ToLinearSRGB":e===cs&&t===hs&&(n="LinearSRGBToLinearDisplayP3"),i){case on:case xs:return[n,"LinearTransferOETF"];case lt:case Sr:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function to(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+Qf(i.getShaderSource(e),a)}else return s}function tp(i,e){const t=ep(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function np(i,e){let t;switch(e){case Ql:t="Linear";break;case ec:t="Reinhard";break;case tc:t="OptimizedCineon";break;case nc:t="ACESFilmic";break;case sc:t="AgX";break;case ic:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function ip(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(si).join(`
`)}function sp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(si).join(`
`)}function rp(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function ap(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function si(i){return i!==""}function no(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function io(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const op=/^[ \t]*#include +<([\w\d./]+)>/gm;function pr(i){return i.replace(op,cp)}const lp=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function cp(i,e){let t=Ie[e];if(t===void 0){const n=lp.get(e);if(n!==void 0)t=Ie[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return pr(t)}const hp=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function so(i){return i.replace(hp,up)}function up(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ro(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function dp(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Do?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Uo?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===rn&&(e="SHADOWMAP_TYPE_VSM"),e}function fp(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case hi:case ui:e="ENVMAP_TYPE_CUBE";break;case _s:e="ENVMAP_TYPE_CUBE_UV";break}return e}function pp(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ui:e="ENVMAP_MODE_REFRACTION";break}return e}function mp(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Mr:e="ENVMAP_BLENDING_MULTIPLY";break;case Zl:e="ENVMAP_BLENDING_MIX";break;case Jl:e="ENVMAP_BLENDING_ADD";break}return e}function gp(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function _p(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=dp(t),c=fp(t),h=pp(t),u=mp(t),f=gp(t),m=t.isWebGL2?"":ip(t),g=sp(t),_=rp(r),p=s.createProgram();let d,S,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(si).join(`
`),d.length>0&&(d+=`
`),S=[m,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(si).join(`
`),S.length>0&&(S+=`
`)):(d=[ro(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(si).join(`
`),S=[m,ro(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==vn?"#define TONE_MAPPING":"",t.toneMapping!==vn?Ie.tonemapping_pars_fragment:"",t.toneMapping!==vn?np("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ie.colorspace_pars_fragment,tp("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(si).join(`
`)),a=pr(a),a=no(a,t),a=io(a,t),o=pr(o),o=no(o,t),o=io(o,t),a=so(a),o=so(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,d=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,S=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Sa?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Sa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const y=x+d+a,R=x+S+o,T=eo(s,s.VERTEX_SHADER,y),A=eo(s,s.FRAGMENT_SHADER,R);s.attachShader(p,T),s.attachShader(p,A),t.index0AttributeName!==void 0?s.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function F(H){if(i.debug.checkShaderErrors){const ee=s.getProgramInfoLog(p).trim(),P=s.getShaderInfoLog(T).trim(),z=s.getShaderInfoLog(A).trim();let V=!0,$=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(V=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,T,A);else{const W=to(s,T,"vertex"),q=to(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Program Info Log: `+ee+`
`+W+`
`+q)}else ee!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ee):(P===""||z==="")&&($=!1);$&&(H.diagnostics={runnable:V,programLog:ee,vertexShader:{log:P,prefix:d},fragmentShader:{log:z,prefix:S}})}s.deleteShader(T),s.deleteShader(A),v=new is(s,p),E=ap(s,p)}let v;this.getUniforms=function(){return v===void 0&&F(this),v};let E;this.getAttributes=function(){return E===void 0&&F(this),E};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=s.getProgramParameter(p,Zf)),k},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Jf++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=T,this.fragmentShader=A,this}let xp=0;class vp{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Mp(e),t.set(e,n)),n}}class Mp{constructor(e){this.id=xp++,this.code=e,this.usedTimes=0}}function yp(i,e,t,n,s,r,a){const o=new wr,l=new vp,c=[],h=s.isWebGL2,u=s.logarithmicDepthBuffer,f=s.vertexTextures;let m=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return v===0?"uv":`uv${v}`}function p(v,E,k,H,ee){const P=H.fog,z=ee.geometry,V=v.isMeshStandardMaterial?H.environment:null,$=(v.isMeshStandardMaterial?t:e).get(v.envMap||V),W=$&&$.mapping===_s?$.image.height:null,q=g[v.type];v.precision!==null&&(m=s.getMaxPrecision(v.precision),m!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",m,"instead."));const Y=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,te=Y!==void 0?Y.length:0;let ne=0;z.morphAttributes.position!==void 0&&(ne=1),z.morphAttributes.normal!==void 0&&(ne=2),z.morphAttributes.color!==void 0&&(ne=3);let G,j,le,ge;if(q){const yt=jt[q];G=yt.vertexShader,j=yt.fragmentShader}else G=v.vertexShader,j=v.fragmentShader,l.update(v),le=l.getVertexShaderID(v),ge=l.getFragmentShaderID(v);const me=i.getRenderTarget(),Pe=ee.isInstancedMesh===!0,De=ee.isBatchedMesh===!0,Ee=!!v.map,Ve=!!v.matcap,U=!!$,Mt=!!v.aoMap,xe=!!v.lightMap,Re=!!v.bumpMap,de=!!v.normalMap,et=!!v.displacementMap,Ne=!!v.emissiveMap,w=!!v.metalnessMap,M=!!v.roughnessMap,N=v.anisotropy>0,J=v.clearcoat>0,Z=v.iridescence>0,Q=v.sheen>0,fe=v.transmission>0,oe=N&&!!v.anisotropyMap,he=J&&!!v.clearcoatMap,ye=J&&!!v.clearcoatNormalMap,Fe=J&&!!v.clearcoatRoughnessMap,K=Z&&!!v.iridescenceMap,qe=Z&&!!v.iridescenceThicknessMap,He=Q&&!!v.sheenColorMap,Ae=Q&&!!v.sheenRoughnessMap,_e=!!v.specularMap,ue=!!v.specularColorMap,Ue=!!v.specularIntensityMap,Xe=fe&&!!v.transmissionMap,it=fe&&!!v.thicknessMap,ze=!!v.gradientMap,ie=!!v.alphaMap,C=v.alphaTest>0,re=!!v.alphaHash,ae=!!v.extensions,we=!!z.attributes.uv1,ve=!!z.attributes.uv2,Ye=!!z.attributes.uv3;let je=vn;return v.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(je=i.toneMapping),{isWebGL2:h,shaderID:q,shaderType:v.type,shaderName:v.name,vertexShader:G,fragmentShader:j,defines:v.defines,customVertexShaderID:le,customFragmentShaderID:ge,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:m,batching:De,instancing:Pe,instancingColor:Pe&&ee.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:me===null?i.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:on,map:Ee,matcap:Ve,envMap:U,envMapMode:U&&$.mapping,envMapCubeUVHeight:W,aoMap:Mt,lightMap:xe,bumpMap:Re,normalMap:de,displacementMap:f&&et,emissiveMap:Ne,normalMapObjectSpace:de&&v.normalMapType===gc,normalMapTangentSpace:de&&v.normalMapType===Vo,metalnessMap:w,roughnessMap:M,anisotropy:N,anisotropyMap:oe,clearcoat:J,clearcoatMap:he,clearcoatNormalMap:ye,clearcoatRoughnessMap:Fe,iridescence:Z,iridescenceMap:K,iridescenceThicknessMap:qe,sheen:Q,sheenColorMap:He,sheenRoughnessMap:Ae,specularMap:_e,specularColorMap:ue,specularIntensityMap:Ue,transmission:fe,transmissionMap:Xe,thicknessMap:it,gradientMap:ze,opaque:v.transparent===!1&&v.blending===oi,alphaMap:ie,alphaTest:C,alphaHash:re,combine:v.combine,mapUv:Ee&&_(v.map.channel),aoMapUv:Mt&&_(v.aoMap.channel),lightMapUv:xe&&_(v.lightMap.channel),bumpMapUv:Re&&_(v.bumpMap.channel),normalMapUv:de&&_(v.normalMap.channel),displacementMapUv:et&&_(v.displacementMap.channel),emissiveMapUv:Ne&&_(v.emissiveMap.channel),metalnessMapUv:w&&_(v.metalnessMap.channel),roughnessMapUv:M&&_(v.roughnessMap.channel),anisotropyMapUv:oe&&_(v.anisotropyMap.channel),clearcoatMapUv:he&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:ye&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Fe&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:qe&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:He&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&_(v.sheenRoughnessMap.channel),specularMapUv:_e&&_(v.specularMap.channel),specularColorMapUv:ue&&_(v.specularColorMap.channel),specularIntensityMapUv:Ue&&_(v.specularIntensityMap.channel),transmissionMapUv:Xe&&_(v.transmissionMap.channel),thicknessMapUv:it&&_(v.thicknessMap.channel),alphaMapUv:ie&&_(v.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(de||N),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,vertexUv1s:we,vertexUv2s:ve,vertexUv3s:Ye,pointsUvs:ee.isPoints===!0&&!!z.attributes.uv&&(Ee||ie),fog:!!P,useFog:v.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:ee.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:ne,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&k.length>0,shadowMapType:i.shadowMap.type,toneMapping:je,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Ee&&v.map.isVideoTexture===!0&&$e.getTransfer(v.map.colorSpace)===Je,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===zt,flipSided:v.side===Rt,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionDerivatives:ae&&v.extensions.derivatives===!0,extensionFragDepth:ae&&v.extensions.fragDepth===!0,extensionDrawBuffers:ae&&v.extensions.drawBuffers===!0,extensionShaderTextureLOD:ae&&v.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ae&&v.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()}}function d(v){const E=[];if(v.shaderID?E.push(v.shaderID):(E.push(v.customVertexShaderID),E.push(v.customFragmentShaderID)),v.defines!==void 0)for(const k in v.defines)E.push(k),E.push(v.defines[k]);return v.isRawShaderMaterial===!1&&(S(E,v),x(E,v),E.push(i.outputColorSpace)),E.push(v.customProgramCacheKey),E.join()}function S(v,E){v.push(E.precision),v.push(E.outputColorSpace),v.push(E.envMapMode),v.push(E.envMapCubeUVHeight),v.push(E.mapUv),v.push(E.alphaMapUv),v.push(E.lightMapUv),v.push(E.aoMapUv),v.push(E.bumpMapUv),v.push(E.normalMapUv),v.push(E.displacementMapUv),v.push(E.emissiveMapUv),v.push(E.metalnessMapUv),v.push(E.roughnessMapUv),v.push(E.anisotropyMapUv),v.push(E.clearcoatMapUv),v.push(E.clearcoatNormalMapUv),v.push(E.clearcoatRoughnessMapUv),v.push(E.iridescenceMapUv),v.push(E.iridescenceThicknessMapUv),v.push(E.sheenColorMapUv),v.push(E.sheenRoughnessMapUv),v.push(E.specularMapUv),v.push(E.specularColorMapUv),v.push(E.specularIntensityMapUv),v.push(E.transmissionMapUv),v.push(E.thicknessMapUv),v.push(E.combine),v.push(E.fogExp2),v.push(E.sizeAttenuation),v.push(E.morphTargetsCount),v.push(E.morphAttributeCount),v.push(E.numDirLights),v.push(E.numPointLights),v.push(E.numSpotLights),v.push(E.numSpotLightMaps),v.push(E.numHemiLights),v.push(E.numRectAreaLights),v.push(E.numDirLightShadows),v.push(E.numPointLightShadows),v.push(E.numSpotLightShadows),v.push(E.numSpotLightShadowsWithMaps),v.push(E.numLightProbes),v.push(E.shadowMapType),v.push(E.toneMapping),v.push(E.numClippingPlanes),v.push(E.numClipIntersection),v.push(E.depthPacking)}function x(v,E){o.disableAll(),E.isWebGL2&&o.enable(0),E.supportsVertexTextures&&o.enable(1),E.instancing&&o.enable(2),E.instancingColor&&o.enable(3),E.matcap&&o.enable(4),E.envMap&&o.enable(5),E.normalMapObjectSpace&&o.enable(6),E.normalMapTangentSpace&&o.enable(7),E.clearcoat&&o.enable(8),E.iridescence&&o.enable(9),E.alphaTest&&o.enable(10),E.vertexColors&&o.enable(11),E.vertexAlphas&&o.enable(12),E.vertexUv1s&&o.enable(13),E.vertexUv2s&&o.enable(14),E.vertexUv3s&&o.enable(15),E.vertexTangents&&o.enable(16),E.anisotropy&&o.enable(17),E.alphaHash&&o.enable(18),E.batching&&o.enable(19),v.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.skinning&&o.enable(4),E.morphTargets&&o.enable(5),E.morphNormals&&o.enable(6),E.morphColors&&o.enable(7),E.premultipliedAlpha&&o.enable(8),E.shadowMapEnabled&&o.enable(9),E.useLegacyLights&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),v.push(o.mask)}function y(v){const E=g[v.type];let k;if(E){const H=jt[E];k=nh.clone(H.uniforms)}else k=v.uniforms;return k}function R(v,E){let k;for(let H=0,ee=c.length;H<ee;H++){const P=c[H];if(P.cacheKey===E){k=P,++k.usedTimes;break}}return k===void 0&&(k=new _p(i,E,v,r),c.push(k)),k}function T(v){if(--v.usedTimes===0){const E=c.indexOf(v);c[E]=c[c.length-1],c.pop(),v.destroy()}}function A(v){l.remove(v)}function F(){l.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:y,acquireProgram:R,releaseProgram:T,releaseShaderCache:A,programs:c,dispose:F}}function Sp(){let i=new WeakMap;function e(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function t(r){i.delete(r)}function n(r,a,o){i.get(r)[a]=o}function s(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:s}}function bp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function ao(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function oo(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u,f,m,g,_,p){let d=i[e];return d===void 0?(d={id:u.id,object:u,geometry:f,material:m,groupOrder:g,renderOrder:u.renderOrder,z:_,group:p},i[e]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=m,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=_,d.group=p),e++,d}function o(u,f,m,g,_,p){const d=a(u,f,m,g,_,p);m.transmission>0?n.push(d):m.transparent===!0?s.push(d):t.push(d)}function l(u,f,m,g,_,p){const d=a(u,f,m,g,_,p);m.transmission>0?n.unshift(d):m.transparent===!0?s.unshift(d):t.unshift(d)}function c(u,f){t.length>1&&t.sort(u||bp),n.length>1&&n.sort(f||ao),s.length>1&&s.sort(f||ao)}function h(){for(let u=e,f=i.length;u<f;u++){const m=i[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function Ep(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new oo,i.set(n,[a])):s>=r.length?(a=new oo,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function wp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new be};break;case"SpotLight":t={position:new L,direction:new L,color:new be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new be,groundColor:new be};break;case"RectAreaLight":t={color:new be,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function Tp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Ap=0;function Rp(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Cp(i,e){const t=new wp,n=Tp(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new L);const r=new L,a=new ct,o=new ct;function l(h,u){let f=0,m=0,g=0;for(let H=0;H<9;H++)s.probe[H].set(0,0,0);let _=0,p=0,d=0,S=0,x=0,y=0,R=0,T=0,A=0,F=0,v=0;h.sort(Rp);const E=u===!0?Math.PI:1;for(let H=0,ee=h.length;H<ee;H++){const P=h[H],z=P.color,V=P.intensity,$=P.distance,W=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)f+=z.r*V*E,m+=z.g*V*E,g+=z.b*V*E;else if(P.isLightProbe){for(let q=0;q<9;q++)s.probe[q].addScaledVector(P.sh.coefficients[q],V);v++}else if(P.isDirectionalLight){const q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity*E),P.castShadow){const Y=P.shadow,te=n.get(P);te.shadowBias=Y.bias,te.shadowNormalBias=Y.normalBias,te.shadowRadius=Y.radius,te.shadowMapSize=Y.mapSize,s.directionalShadow[_]=te,s.directionalShadowMap[_]=W,s.directionalShadowMatrix[_]=P.shadow.matrix,y++}s.directional[_]=q,_++}else if(P.isSpotLight){const q=t.get(P);q.position.setFromMatrixPosition(P.matrixWorld),q.color.copy(z).multiplyScalar(V*E),q.distance=$,q.coneCos=Math.cos(P.angle),q.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),q.decay=P.decay,s.spot[d]=q;const Y=P.shadow;if(P.map&&(s.spotLightMap[A]=P.map,A++,Y.updateMatrices(P),P.castShadow&&F++),s.spotLightMatrix[d]=Y.matrix,P.castShadow){const te=n.get(P);te.shadowBias=Y.bias,te.shadowNormalBias=Y.normalBias,te.shadowRadius=Y.radius,te.shadowMapSize=Y.mapSize,s.spotShadow[d]=te,s.spotShadowMap[d]=W,T++}d++}else if(P.isRectAreaLight){const q=t.get(P);q.color.copy(z).multiplyScalar(V),q.halfWidth.set(P.width*.5,0,0),q.halfHeight.set(0,P.height*.5,0),s.rectArea[S]=q,S++}else if(P.isPointLight){const q=t.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity*E),q.distance=P.distance,q.decay=P.decay,P.castShadow){const Y=P.shadow,te=n.get(P);te.shadowBias=Y.bias,te.shadowNormalBias=Y.normalBias,te.shadowRadius=Y.radius,te.shadowMapSize=Y.mapSize,te.shadowCameraNear=Y.camera.near,te.shadowCameraFar=Y.camera.far,s.pointShadow[p]=te,s.pointShadowMap[p]=W,s.pointShadowMatrix[p]=P.shadow.matrix,R++}s.point[p]=q,p++}else if(P.isHemisphereLight){const q=t.get(P);q.skyColor.copy(P.color).multiplyScalar(V*E),q.groundColor.copy(P.groundColor).multiplyScalar(V*E),s.hemi[x]=q,x++}}S>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=se.LTC_FLOAT_1,s.rectAreaLTC2=se.LTC_FLOAT_2):(s.rectAreaLTC1=se.LTC_HALF_1,s.rectAreaLTC2=se.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=se.LTC_FLOAT_1,s.rectAreaLTC2=se.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=se.LTC_HALF_1,s.rectAreaLTC2=se.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=f,s.ambient[1]=m,s.ambient[2]=g;const k=s.hash;(k.directionalLength!==_||k.pointLength!==p||k.spotLength!==d||k.rectAreaLength!==S||k.hemiLength!==x||k.numDirectionalShadows!==y||k.numPointShadows!==R||k.numSpotShadows!==T||k.numSpotMaps!==A||k.numLightProbes!==v)&&(s.directional.length=_,s.spot.length=d,s.rectArea.length=S,s.point.length=p,s.hemi.length=x,s.directionalShadow.length=y,s.directionalShadowMap.length=y,s.pointShadow.length=R,s.pointShadowMap.length=R,s.spotShadow.length=T,s.spotShadowMap.length=T,s.directionalShadowMatrix.length=y,s.pointShadowMatrix.length=R,s.spotLightMatrix.length=T+A-F,s.spotLightMap.length=A,s.numSpotLightShadowsWithMaps=F,s.numLightProbes=v,k.directionalLength=_,k.pointLength=p,k.spotLength=d,k.rectAreaLength=S,k.hemiLength=x,k.numDirectionalShadows=y,k.numPointShadows=R,k.numSpotShadows=T,k.numSpotMaps=A,k.numLightProbes=v,s.version=Ap++)}function c(h,u){let f=0,m=0,g=0,_=0,p=0;const d=u.matrixWorldInverse;for(let S=0,x=h.length;S<x;S++){const y=h[S];if(y.isDirectionalLight){const R=s.directional[f];R.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(d),f++}else if(y.isSpotLight){const R=s.spot[g];R.position.setFromMatrixPosition(y.matrixWorld),R.position.applyMatrix4(d),R.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(d),g++}else if(y.isRectAreaLight){const R=s.rectArea[_];R.position.setFromMatrixPosition(y.matrixWorld),R.position.applyMatrix4(d),o.identity(),a.copy(y.matrixWorld),a.premultiply(d),o.extractRotation(a),R.halfWidth.set(y.width*.5,0,0),R.halfHeight.set(0,y.height*.5,0),R.halfWidth.applyMatrix4(o),R.halfHeight.applyMatrix4(o),_++}else if(y.isPointLight){const R=s.point[m];R.position.setFromMatrixPosition(y.matrixWorld),R.position.applyMatrix4(d),m++}else if(y.isHemisphereLight){const R=s.hemi[p];R.direction.setFromMatrixPosition(y.matrixWorld),R.direction.transformDirection(d),p++}}}return{setup:l,setupView:c,state:s}}function lo(i,e){const t=new Cp(i,e),n=[],s=[];function r(){n.length=0,s.length=0}function a(u){n.push(u)}function o(u){s.push(u)}function l(u){t.setup(n,u)}function c(u){t.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Pp(i,e){let t=new WeakMap;function n(r,a=0){const o=t.get(r);let l;return o===void 0?(l=new lo(i,e),t.set(r,[l])):a>=o.length?(l=new lo(i,e),o.push(l)):l=o[a],l}function s(){t=new WeakMap}return{get:n,dispose:s}}class Lp extends Pi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=pc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Dp extends Pi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Up=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ip=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Np(i,e,t){let n=new Tr;const s=new Ge,r=new Ge,a=new mt,o=new Lp({depthPacking:mc}),l=new Dp,c={},h=t.maxTextureSize,u={[yn]:Rt,[Rt]:yn,[zt]:zt},f=new On({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ge},radius:{value:4}},vertexShader:Up,fragmentShader:Ip}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new Bt;g.setAttribute("position",new Kt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Se(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Do;let d=this.type;this.render=function(T,A,F){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;const v=i.getRenderTarget(),E=i.getActiveCubeFace(),k=i.getActiveMipmapLevel(),H=i.state;H.setBlending(xn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const ee=d!==rn&&this.type===rn,P=d===rn&&this.type!==rn;for(let z=0,V=T.length;z<V;z++){const $=T[z],W=$.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",$,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);const q=W.getFrameExtents();if(s.multiply(q),r.copy(W.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/q.x),s.x=r.x*q.x,W.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/q.y),s.y=r.y*q.y,W.mapSize.y=r.y)),W.map===null||ee===!0||P===!0){const te=this.type!==rn?{minFilter:wt,magFilter:wt}:{};W.map!==null&&W.map.dispose(),W.map=new Fn(s.x,s.y,te),W.map.texture.name=$.name+".shadowMap",W.camera.updateProjectionMatrix()}i.setRenderTarget(W.map),i.clear();const Y=W.getViewportCount();for(let te=0;te<Y;te++){const ne=W.getViewport(te);a.set(r.x*ne.x,r.y*ne.y,r.x*ne.z,r.y*ne.w),H.viewport(a),W.updateMatrices($,te),n=W.getFrustum(),y(A,F,W.camera,$,this.type)}W.isPointLightShadow!==!0&&this.type===rn&&S(W,F),W.needsUpdate=!1}d=this.type,p.needsUpdate=!1,i.setRenderTarget(v,E,k)};function S(T,A){const F=e.update(_);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,m.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Fn(s.x,s.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(A,null,F,f,_,null),m.uniforms.shadow_pass.value=T.mapPass.texture,m.uniforms.resolution.value=T.mapSize,m.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(A,null,F,m,_,null)}function x(T,A,F,v){let E=null;const k=F.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(k!==void 0)E=k;else if(E=F.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const H=E.uuid,ee=A.uuid;let P=c[H];P===void 0&&(P={},c[H]=P);let z=P[ee];z===void 0&&(z=E.clone(),P[ee]=z,A.addEventListener("dispose",R)),E=z}if(E.visible=A.visible,E.wireframe=A.wireframe,v===rn?E.side=A.shadowSide!==null?A.shadowSide:A.side:E.side=A.shadowSide!==null?A.shadowSide:u[A.side],E.alphaMap=A.alphaMap,E.alphaTest=A.alphaTest,E.map=A.map,E.clipShadows=A.clipShadows,E.clippingPlanes=A.clippingPlanes,E.clipIntersection=A.clipIntersection,E.displacementMap=A.displacementMap,E.displacementScale=A.displacementScale,E.displacementBias=A.displacementBias,E.wireframeLinewidth=A.wireframeLinewidth,E.linewidth=A.linewidth,F.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const H=i.properties.get(E);H.light=F}return E}function y(T,A,F,v,E){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&E===rn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,T.matrixWorld);const ee=e.update(T),P=T.material;if(Array.isArray(P)){const z=ee.groups;for(let V=0,$=z.length;V<$;V++){const W=z[V],q=P[W.materialIndex];if(q&&q.visible){const Y=x(T,q,v,E);T.onBeforeShadow(i,T,A,F,ee,Y,W),i.renderBufferDirect(F,null,ee,Y,T,W),T.onAfterShadow(i,T,A,F,ee,Y,W)}}}else if(P.visible){const z=x(T,P,v,E);T.onBeforeShadow(i,T,A,F,ee,z,null),i.renderBufferDirect(F,null,ee,z,T,null),T.onAfterShadow(i,T,A,F,ee,z,null)}}const H=T.children;for(let ee=0,P=H.length;ee<P;ee++)y(H[ee],A,F,v,E)}function R(T){T.target.removeEventListener("dispose",R);for(const F in c){const v=c[F],E=T.target.uuid;E in v&&(v[E].dispose(),delete v[E])}}}function Fp(i,e,t){const n=t.isWebGL2;function s(){let C=!1;const re=new mt;let ae=null;const we=new mt(0,0,0,0);return{setMask:function(ve){ae!==ve&&!C&&(i.colorMask(ve,ve,ve,ve),ae=ve)},setLocked:function(ve){C=ve},setClear:function(ve,Ye,je,dt,yt){yt===!0&&(ve*=dt,Ye*=dt,je*=dt),re.set(ve,Ye,je,dt),we.equals(re)===!1&&(i.clearColor(ve,Ye,je,dt),we.copy(re))},reset:function(){C=!1,ae=null,we.set(-1,0,0,0)}}}function r(){let C=!1,re=null,ae=null,we=null;return{setTest:function(ve){ve?De(i.DEPTH_TEST):Ee(i.DEPTH_TEST)},setMask:function(ve){re!==ve&&!C&&(i.depthMask(ve),re=ve)},setFunc:function(ve){if(ae!==ve){switch(ve){case Wl:i.depthFunc(i.NEVER);break;case Xl:i.depthFunc(i.ALWAYS);break;case ql:i.depthFunc(i.LESS);break;case as:i.depthFunc(i.LEQUAL);break;case $l:i.depthFunc(i.EQUAL);break;case Yl:i.depthFunc(i.GEQUAL);break;case jl:i.depthFunc(i.GREATER);break;case Kl:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ae=ve}},setLocked:function(ve){C=ve},setClear:function(ve){we!==ve&&(i.clearDepth(ve),we=ve)},reset:function(){C=!1,re=null,ae=null,we=null}}}function a(){let C=!1,re=null,ae=null,we=null,ve=null,Ye=null,je=null,dt=null,yt=null;return{setTest:function(Ke){C||(Ke?De(i.STENCIL_TEST):Ee(i.STENCIL_TEST))},setMask:function(Ke){re!==Ke&&!C&&(i.stencilMask(Ke),re=Ke)},setFunc:function(Ke,St,Yt){(ae!==Ke||we!==St||ve!==Yt)&&(i.stencilFunc(Ke,St,Yt),ae=Ke,we=St,ve=Yt)},setOp:function(Ke,St,Yt){(Ye!==Ke||je!==St||dt!==Yt)&&(i.stencilOp(Ke,St,Yt),Ye=Ke,je=St,dt=Yt)},setLocked:function(Ke){C=Ke},setClear:function(Ke){yt!==Ke&&(i.clearStencil(Ke),yt=Ke)},reset:function(){C=!1,re=null,ae=null,we=null,ve=null,Ye=null,je=null,dt=null,yt=null}}}const o=new s,l=new r,c=new a,h=new WeakMap,u=new WeakMap;let f={},m={},g=new WeakMap,_=[],p=null,d=!1,S=null,x=null,y=null,R=null,T=null,A=null,F=null,v=new be(0,0,0),E=0,k=!1,H=null,ee=null,P=null,z=null,V=null;const $=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,q=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(Y)[1]),W=q>=1):Y.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),W=q>=2);let te=null,ne={};const G=i.getParameter(i.SCISSOR_BOX),j=i.getParameter(i.VIEWPORT),le=new mt().fromArray(G),ge=new mt().fromArray(j);function me(C,re,ae,we){const ve=new Uint8Array(4),Ye=i.createTexture();i.bindTexture(C,Ye),i.texParameteri(C,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(C,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let je=0;je<ae;je++)n&&(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)?i.texImage3D(re,0,i.RGBA,1,1,we,0,i.RGBA,i.UNSIGNED_BYTE,ve):i.texImage2D(re+je,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ve);return Ye}const Pe={};Pe[i.TEXTURE_2D]=me(i.TEXTURE_2D,i.TEXTURE_2D,1),Pe[i.TEXTURE_CUBE_MAP]=me(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Pe[i.TEXTURE_2D_ARRAY]=me(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Pe[i.TEXTURE_3D]=me(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),De(i.DEPTH_TEST),l.setFunc(as),Ne(!1),w(Gr),De(i.CULL_FACE),de(xn);function De(C){f[C]!==!0&&(i.enable(C),f[C]=!0)}function Ee(C){f[C]!==!1&&(i.disable(C),f[C]=!1)}function Ve(C,re){return m[C]!==re?(i.bindFramebuffer(C,re),m[C]=re,n&&(C===i.DRAW_FRAMEBUFFER&&(m[i.FRAMEBUFFER]=re),C===i.FRAMEBUFFER&&(m[i.DRAW_FRAMEBUFFER]=re)),!0):!1}function U(C,re){let ae=_,we=!1;if(C)if(ae=g.get(re),ae===void 0&&(ae=[],g.set(re,ae)),C.isWebGLMultipleRenderTargets){const ve=C.texture;if(ae.length!==ve.length||ae[0]!==i.COLOR_ATTACHMENT0){for(let Ye=0,je=ve.length;Ye<je;Ye++)ae[Ye]=i.COLOR_ATTACHMENT0+Ye;ae.length=ve.length,we=!0}}else ae[0]!==i.COLOR_ATTACHMENT0&&(ae[0]=i.COLOR_ATTACHMENT0,we=!0);else ae[0]!==i.BACK&&(ae[0]=i.BACK,we=!0);we&&(t.isWebGL2?i.drawBuffers(ae):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ae))}function Mt(C){return p!==C?(i.useProgram(C),p=C,!0):!1}const xe={[Cn]:i.FUNC_ADD,[Cl]:i.FUNC_SUBTRACT,[Pl]:i.FUNC_REVERSE_SUBTRACT};if(n)xe[qr]=i.MIN,xe[$r]=i.MAX;else{const C=e.get("EXT_blend_minmax");C!==null&&(xe[qr]=C.MIN_EXT,xe[$r]=C.MAX_EXT)}const Re={[Ll]:i.ZERO,[Dl]:i.ONE,[Ul]:i.SRC_COLOR,[or]:i.SRC_ALPHA,[kl]:i.SRC_ALPHA_SATURATE,[Ol]:i.DST_COLOR,[Nl]:i.DST_ALPHA,[Il]:i.ONE_MINUS_SRC_COLOR,[lr]:i.ONE_MINUS_SRC_ALPHA,[zl]:i.ONE_MINUS_DST_COLOR,[Fl]:i.ONE_MINUS_DST_ALPHA,[Bl]:i.CONSTANT_COLOR,[Hl]:i.ONE_MINUS_CONSTANT_COLOR,[Gl]:i.CONSTANT_ALPHA,[Vl]:i.ONE_MINUS_CONSTANT_ALPHA};function de(C,re,ae,we,ve,Ye,je,dt,yt,Ke){if(C===xn){d===!0&&(Ee(i.BLEND),d=!1);return}if(d===!1&&(De(i.BLEND),d=!0),C!==Rl){if(C!==S||Ke!==k){if((x!==Cn||T!==Cn)&&(i.blendEquation(i.FUNC_ADD),x=Cn,T=Cn),Ke)switch(C){case oi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vr:i.blendFunc(i.ONE,i.ONE);break;case Wr:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Xr:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}else switch(C){case oi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vr:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Wr:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Xr:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",C);break}y=null,R=null,A=null,F=null,v.set(0,0,0),E=0,S=C,k=Ke}return}ve=ve||re,Ye=Ye||ae,je=je||we,(re!==x||ve!==T)&&(i.blendEquationSeparate(xe[re],xe[ve]),x=re,T=ve),(ae!==y||we!==R||Ye!==A||je!==F)&&(i.blendFuncSeparate(Re[ae],Re[we],Re[Ye],Re[je]),y=ae,R=we,A=Ye,F=je),(dt.equals(v)===!1||yt!==E)&&(i.blendColor(dt.r,dt.g,dt.b,yt),v.copy(dt),E=yt),S=C,k=!1}function et(C,re){C.side===zt?Ee(i.CULL_FACE):De(i.CULL_FACE);let ae=C.side===Rt;re&&(ae=!ae),Ne(ae),C.blending===oi&&C.transparent===!1?de(xn):de(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),l.setFunc(C.depthFunc),l.setTest(C.depthTest),l.setMask(C.depthWrite),o.setMask(C.colorWrite);const we=C.stencilWrite;c.setTest(we),we&&(c.setMask(C.stencilWriteMask),c.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),c.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),N(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?De(i.SAMPLE_ALPHA_TO_COVERAGE):Ee(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ne(C){H!==C&&(C?i.frontFace(i.CW):i.frontFace(i.CCW),H=C)}function w(C){C!==Tl?(De(i.CULL_FACE),C!==ee&&(C===Gr?i.cullFace(i.BACK):C===Al?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ee(i.CULL_FACE),ee=C}function M(C){C!==P&&(W&&i.lineWidth(C),P=C)}function N(C,re,ae){C?(De(i.POLYGON_OFFSET_FILL),(z!==re||V!==ae)&&(i.polygonOffset(re,ae),z=re,V=ae)):Ee(i.POLYGON_OFFSET_FILL)}function J(C){C?De(i.SCISSOR_TEST):Ee(i.SCISSOR_TEST)}function Z(C){C===void 0&&(C=i.TEXTURE0+$-1),te!==C&&(i.activeTexture(C),te=C)}function Q(C,re,ae){ae===void 0&&(te===null?ae=i.TEXTURE0+$-1:ae=te);let we=ne[ae];we===void 0&&(we={type:void 0,texture:void 0},ne[ae]=we),(we.type!==C||we.texture!==re)&&(te!==ae&&(i.activeTexture(ae),te=ae),i.bindTexture(C,re||Pe[C]),we.type=C,we.texture=re)}function fe(){const C=ne[te];C!==void 0&&C.type!==void 0&&(i.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function oe(){try{i.compressedTexImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function he(){try{i.compressedTexImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ye(){try{i.texSubImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Fe(){try{i.texSubImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function K(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function qe(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function He(){try{i.texStorage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Ae(){try{i.texStorage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function _e(){try{i.texImage2D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function ue(){try{i.texImage3D.apply(i,arguments)}catch(C){console.error("THREE.WebGLState:",C)}}function Ue(C){le.equals(C)===!1&&(i.scissor(C.x,C.y,C.z,C.w),le.copy(C))}function Xe(C){ge.equals(C)===!1&&(i.viewport(C.x,C.y,C.z,C.w),ge.copy(C))}function it(C,re){let ae=u.get(re);ae===void 0&&(ae=new WeakMap,u.set(re,ae));let we=ae.get(C);we===void 0&&(we=i.getUniformBlockIndex(re,C.name),ae.set(C,we))}function ze(C,re){const we=u.get(re).get(C);h.get(re)!==we&&(i.uniformBlockBinding(re,we,C.__bindingPointIndex),h.set(re,we))}function ie(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),f={},te=null,ne={},m={},g=new WeakMap,_=[],p=null,d=!1,S=null,x=null,y=null,R=null,T=null,A=null,F=null,v=new be(0,0,0),E=0,k=!1,H=null,ee=null,P=null,z=null,V=null,le.set(0,0,i.canvas.width,i.canvas.height),ge.set(0,0,i.canvas.width,i.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:De,disable:Ee,bindFramebuffer:Ve,drawBuffers:U,useProgram:Mt,setBlending:de,setMaterial:et,setFlipSided:Ne,setCullFace:w,setLineWidth:M,setPolygonOffset:N,setScissorTest:J,activeTexture:Z,bindTexture:Q,unbindTexture:fe,compressedTexImage2D:oe,compressedTexImage3D:he,texImage2D:_e,texImage3D:ue,updateUBOMapping:it,uniformBlockBinding:ze,texStorage2D:He,texStorage3D:Ae,texSubImage2D:ye,texSubImage3D:Fe,compressedTexSubImage2D:K,compressedTexSubImage3D:qe,scissor:Ue,viewport:Xe,reset:ie}}function Op(i,e,t,n,s,r,a){const o=s.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,M){return m?new OffscreenCanvas(w,M):fs("canvas")}function _(w,M,N,J){let Z=1;if((w.width>J||w.height>J)&&(Z=J/Math.max(w.width,w.height)),Z<1||M===!0)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap){const Q=M?ds:Math.floor,fe=Q(Z*w.width),oe=Q(Z*w.height);u===void 0&&(u=g(fe,oe));const he=N?g(fe,oe):u;return he.width=fe,he.height=oe,he.getContext("2d").drawImage(w,0,0,fe,oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+w.width+"x"+w.height+") to ("+fe+"x"+oe+")."),he}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+w.width+"x"+w.height+")."),w;return w}function p(w){return fr(w.width)&&fr(w.height)}function d(w){return o?!1:w.wrapS!==Xt||w.wrapT!==Xt||w.minFilter!==wt&&w.minFilter!==Ft}function S(w,M){return w.generateMipmaps&&M&&w.minFilter!==wt&&w.minFilter!==Ft}function x(w){i.generateMipmap(w)}function y(w,M,N,J,Z=!1){if(o===!1)return M;if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let Q=M;if(M===i.RED&&(N===i.FLOAT&&(Q=i.R32F),N===i.HALF_FLOAT&&(Q=i.R16F),N===i.UNSIGNED_BYTE&&(Q=i.R8)),M===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(Q=i.R8UI),N===i.UNSIGNED_SHORT&&(Q=i.R16UI),N===i.UNSIGNED_INT&&(Q=i.R32UI),N===i.BYTE&&(Q=i.R8I),N===i.SHORT&&(Q=i.R16I),N===i.INT&&(Q=i.R32I)),M===i.RG&&(N===i.FLOAT&&(Q=i.RG32F),N===i.HALF_FLOAT&&(Q=i.RG16F),N===i.UNSIGNED_BYTE&&(Q=i.RG8)),M===i.RGBA){const fe=Z?ls:$e.getTransfer(J);N===i.FLOAT&&(Q=i.RGBA32F),N===i.HALF_FLOAT&&(Q=i.RGBA16F),N===i.UNSIGNED_BYTE&&(Q=fe===Je?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function R(w,M,N){return S(w,N)===!0||w.isFramebufferTexture&&w.minFilter!==wt&&w.minFilter!==Ft?Math.log2(Math.max(M.width,M.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?M.mipmaps.length:1}function T(w){return w===wt||w===Yr||w===Cs?i.NEAREST:i.LINEAR}function A(w){const M=w.target;M.removeEventListener("dispose",A),v(M),M.isVideoTexture&&h.delete(M)}function F(w){const M=w.target;M.removeEventListener("dispose",F),k(M)}function v(w){const M=n.get(w);if(M.__webglInit===void 0)return;const N=w.source,J=f.get(N);if(J){const Z=J[M.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&E(w),Object.keys(J).length===0&&f.delete(N)}n.remove(w)}function E(w){const M=n.get(w);i.deleteTexture(M.__webglTexture);const N=w.source,J=f.get(N);delete J[M.__cacheKey],a.memory.textures--}function k(w){const M=w.texture,N=n.get(w),J=n.get(M);if(J.__webglTexture!==void 0&&(i.deleteTexture(J.__webglTexture),a.memory.textures--),w.depthTexture&&w.depthTexture.dispose(),w.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(N.__webglFramebuffer[Z]))for(let Q=0;Q<N.__webglFramebuffer[Z].length;Q++)i.deleteFramebuffer(N.__webglFramebuffer[Z][Q]);else i.deleteFramebuffer(N.__webglFramebuffer[Z]);N.__webglDepthbuffer&&i.deleteRenderbuffer(N.__webglDepthbuffer[Z])}else{if(Array.isArray(N.__webglFramebuffer))for(let Z=0;Z<N.__webglFramebuffer.length;Z++)i.deleteFramebuffer(N.__webglFramebuffer[Z]);else i.deleteFramebuffer(N.__webglFramebuffer);if(N.__webglDepthbuffer&&i.deleteRenderbuffer(N.__webglDepthbuffer),N.__webglMultisampledFramebuffer&&i.deleteFramebuffer(N.__webglMultisampledFramebuffer),N.__webglColorRenderbuffer)for(let Z=0;Z<N.__webglColorRenderbuffer.length;Z++)N.__webglColorRenderbuffer[Z]&&i.deleteRenderbuffer(N.__webglColorRenderbuffer[Z]);N.__webglDepthRenderbuffer&&i.deleteRenderbuffer(N.__webglDepthRenderbuffer)}if(w.isWebGLMultipleRenderTargets)for(let Z=0,Q=M.length;Z<Q;Z++){const fe=n.get(M[Z]);fe.__webglTexture&&(i.deleteTexture(fe.__webglTexture),a.memory.textures--),n.remove(M[Z])}n.remove(M),n.remove(w)}let H=0;function ee(){H=0}function P(){const w=H;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),H+=1,w}function z(w){const M=[];return M.push(w.wrapS),M.push(w.wrapT),M.push(w.wrapR||0),M.push(w.magFilter),M.push(w.minFilter),M.push(w.anisotropy),M.push(w.internalFormat),M.push(w.format),M.push(w.type),M.push(w.generateMipmaps),M.push(w.premultiplyAlpha),M.push(w.flipY),M.push(w.unpackAlignment),M.push(w.colorSpace),M.join()}function V(w,M){const N=n.get(w);if(w.isVideoTexture&&et(w),w.isRenderTargetTexture===!1&&w.version>0&&N.__version!==w.version){const J=w.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{le(N,w,M);return}}t.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+M)}function $(w,M){const N=n.get(w);if(w.version>0&&N.__version!==w.version){le(N,w,M);return}t.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+M)}function W(w,M){const N=n.get(w);if(w.version>0&&N.__version!==w.version){le(N,w,M);return}t.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+M)}function q(w,M){const N=n.get(w);if(w.version>0&&N.__version!==w.version){ge(N,w,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+M)}const Y={[os]:i.REPEAT,[Xt]:i.CLAMP_TO_EDGE,[ur]:i.MIRRORED_REPEAT},te={[wt]:i.NEAREST,[Yr]:i.NEAREST_MIPMAP_NEAREST,[Cs]:i.NEAREST_MIPMAP_LINEAR,[Ft]:i.LINEAR,[rc]:i.LINEAR_MIPMAP_NEAREST,[wi]:i.LINEAR_MIPMAP_LINEAR},ne={[_c]:i.NEVER,[bc]:i.ALWAYS,[xc]:i.LESS,[Wo]:i.LEQUAL,[vc]:i.EQUAL,[Sc]:i.GEQUAL,[Mc]:i.GREATER,[yc]:i.NOTEQUAL};function G(w,M,N){if(N?(i.texParameteri(w,i.TEXTURE_WRAP_S,Y[M.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,Y[M.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,Y[M.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,te[M.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,te[M.minFilter])):(i.texParameteri(w,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(w,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(M.wrapS!==Xt||M.wrapT!==Xt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(w,i.TEXTURE_MAG_FILTER,T(M.magFilter)),i.texParameteri(w,i.TEXTURE_MIN_FILTER,T(M.minFilter)),M.minFilter!==wt&&M.minFilter!==Ft&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),M.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,ne[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const J=e.get("EXT_texture_filter_anisotropic");if(M.magFilter===wt||M.minFilter!==Cs&&M.minFilter!==wi||M.type===_n&&e.has("OES_texture_float_linear")===!1||o===!1&&M.type===Ti&&e.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||n.get(M).__currentAnisotropy)&&(i.texParameterf(w,J.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy)}}function j(w,M){let N=!1;w.__webglInit===void 0&&(w.__webglInit=!0,M.addEventListener("dispose",A));const J=M.source;let Z=f.get(J);Z===void 0&&(Z={},f.set(J,Z));const Q=z(M);if(Q!==w.__cacheKey){Z[Q]===void 0&&(Z[Q]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,N=!0),Z[Q].usedTimes++;const fe=Z[w.__cacheKey];fe!==void 0&&(Z[w.__cacheKey].usedTimes--,fe.usedTimes===0&&E(M)),w.__cacheKey=Q,w.__webglTexture=Z[Q].texture}return N}function le(w,M,N){let J=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(J=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(J=i.TEXTURE_3D);const Z=j(w,M),Q=M.source;t.bindTexture(J,w.__webglTexture,i.TEXTURE0+N);const fe=n.get(Q);if(Q.version!==fe.__version||Z===!0){t.activeTexture(i.TEXTURE0+N);const oe=$e.getPrimaries($e.workingColorSpace),he=M.colorSpace===kt?null:$e.getPrimaries(M.colorSpace),ye=M.colorSpace===kt||oe===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye);const Fe=d(M)&&p(M.image)===!1;let K=_(M.image,Fe,!1,s.maxTextureSize);K=Ne(M,K);const qe=p(K)||o,He=r.convert(M.format,M.colorSpace);let Ae=r.convert(M.type),_e=y(M.internalFormat,He,Ae,M.colorSpace,M.isVideoTexture);G(J,M,qe);let ue;const Ue=M.mipmaps,Xe=o&&M.isVideoTexture!==!0&&_e!==Ho,it=fe.__version===void 0||Z===!0,ze=R(M,K,qe);if(M.isDepthTexture)_e=i.DEPTH_COMPONENT,o?M.type===_n?_e=i.DEPTH_COMPONENT32F:M.type===gn?_e=i.DEPTH_COMPONENT24:M.type===Ln?_e=i.DEPTH24_STENCIL8:_e=i.DEPTH_COMPONENT16:M.type===_n&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),M.format===Dn&&_e===i.DEPTH_COMPONENT&&M.type!==yr&&M.type!==gn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=gn,Ae=r.convert(M.type)),M.format===di&&_e===i.DEPTH_COMPONENT&&(_e=i.DEPTH_STENCIL,M.type!==Ln&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=Ln,Ae=r.convert(M.type))),it&&(Xe?t.texStorage2D(i.TEXTURE_2D,1,_e,K.width,K.height):t.texImage2D(i.TEXTURE_2D,0,_e,K.width,K.height,0,He,Ae,null));else if(M.isDataTexture)if(Ue.length>0&&qe){Xe&&it&&t.texStorage2D(i.TEXTURE_2D,ze,_e,Ue[0].width,Ue[0].height);for(let ie=0,C=Ue.length;ie<C;ie++)ue=Ue[ie],Xe?t.texSubImage2D(i.TEXTURE_2D,ie,0,0,ue.width,ue.height,He,Ae,ue.data):t.texImage2D(i.TEXTURE_2D,ie,_e,ue.width,ue.height,0,He,Ae,ue.data);M.generateMipmaps=!1}else Xe?(it&&t.texStorage2D(i.TEXTURE_2D,ze,_e,K.width,K.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,K.width,K.height,He,Ae,K.data)):t.texImage2D(i.TEXTURE_2D,0,_e,K.width,K.height,0,He,Ae,K.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){Xe&&it&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ze,_e,Ue[0].width,Ue[0].height,K.depth);for(let ie=0,C=Ue.length;ie<C;ie++)ue=Ue[ie],M.format!==qt?He!==null?Xe?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,ue.width,ue.height,K.depth,He,ue.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ie,_e,ue.width,ue.height,K.depth,0,ue.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?t.texSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,ue.width,ue.height,K.depth,He,Ae,ue.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ie,_e,ue.width,ue.height,K.depth,0,He,Ae,ue.data)}else{Xe&&it&&t.texStorage2D(i.TEXTURE_2D,ze,_e,Ue[0].width,Ue[0].height);for(let ie=0,C=Ue.length;ie<C;ie++)ue=Ue[ie],M.format!==qt?He!==null?Xe?t.compressedTexSubImage2D(i.TEXTURE_2D,ie,0,0,ue.width,ue.height,He,ue.data):t.compressedTexImage2D(i.TEXTURE_2D,ie,_e,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?t.texSubImage2D(i.TEXTURE_2D,ie,0,0,ue.width,ue.height,He,Ae,ue.data):t.texImage2D(i.TEXTURE_2D,ie,_e,ue.width,ue.height,0,He,Ae,ue.data)}else if(M.isDataArrayTexture)Xe?(it&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ze,_e,K.width,K.height,K.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,He,Ae,K.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,_e,K.width,K.height,K.depth,0,He,Ae,K.data);else if(M.isData3DTexture)Xe?(it&&t.texStorage3D(i.TEXTURE_3D,ze,_e,K.width,K.height,K.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,He,Ae,K.data)):t.texImage3D(i.TEXTURE_3D,0,_e,K.width,K.height,K.depth,0,He,Ae,K.data);else if(M.isFramebufferTexture){if(it)if(Xe)t.texStorage2D(i.TEXTURE_2D,ze,_e,K.width,K.height);else{let ie=K.width,C=K.height;for(let re=0;re<ze;re++)t.texImage2D(i.TEXTURE_2D,re,_e,ie,C,0,He,Ae,null),ie>>=1,C>>=1}}else if(Ue.length>0&&qe){Xe&&it&&t.texStorage2D(i.TEXTURE_2D,ze,_e,Ue[0].width,Ue[0].height);for(let ie=0,C=Ue.length;ie<C;ie++)ue=Ue[ie],Xe?t.texSubImage2D(i.TEXTURE_2D,ie,0,0,He,Ae,ue):t.texImage2D(i.TEXTURE_2D,ie,_e,He,Ae,ue);M.generateMipmaps=!1}else Xe?(it&&t.texStorage2D(i.TEXTURE_2D,ze,_e,K.width,K.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,He,Ae,K)):t.texImage2D(i.TEXTURE_2D,0,_e,He,Ae,K);S(M,qe)&&x(J),fe.__version=Q.version,M.onUpdate&&M.onUpdate(M)}w.__version=M.version}function ge(w,M,N){if(M.image.length!==6)return;const J=j(w,M),Z=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+N);const Q=n.get(Z);if(Z.version!==Q.__version||J===!0){t.activeTexture(i.TEXTURE0+N);const fe=$e.getPrimaries($e.workingColorSpace),oe=M.colorSpace===kt?null:$e.getPrimaries(M.colorSpace),he=M.colorSpace===kt||fe===oe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const ye=M.isCompressedTexture||M.image[0].isCompressedTexture,Fe=M.image[0]&&M.image[0].isDataTexture,K=[];for(let ie=0;ie<6;ie++)!ye&&!Fe?K[ie]=_(M.image[ie],!1,!0,s.maxCubemapSize):K[ie]=Fe?M.image[ie].image:M.image[ie],K[ie]=Ne(M,K[ie]);const qe=K[0],He=p(qe)||o,Ae=r.convert(M.format,M.colorSpace),_e=r.convert(M.type),ue=y(M.internalFormat,Ae,_e,M.colorSpace),Ue=o&&M.isVideoTexture!==!0,Xe=Q.__version===void 0||J===!0;let it=R(M,qe,He);G(i.TEXTURE_CUBE_MAP,M,He);let ze;if(ye){Ue&&Xe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,it,ue,qe.width,qe.height);for(let ie=0;ie<6;ie++){ze=K[ie].mipmaps;for(let C=0;C<ze.length;C++){const re=ze[C];M.format!==qt?Ae!==null?Ue?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,C,0,0,re.width,re.height,Ae,re.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,C,ue,re.width,re.height,0,re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ue?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,C,0,0,re.width,re.height,Ae,_e,re.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,C,ue,re.width,re.height,0,Ae,_e,re.data)}}}else{ze=M.mipmaps,Ue&&Xe&&(ze.length>0&&it++,t.texStorage2D(i.TEXTURE_CUBE_MAP,it,ue,K[0].width,K[0].height));for(let ie=0;ie<6;ie++)if(Fe){Ue?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,K[ie].width,K[ie].height,Ae,_e,K[ie].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,ue,K[ie].width,K[ie].height,0,Ae,_e,K[ie].data);for(let C=0;C<ze.length;C++){const ae=ze[C].image[ie].image;Ue?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,C+1,0,0,ae.width,ae.height,Ae,_e,ae.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,C+1,ue,ae.width,ae.height,0,Ae,_e,ae.data)}}else{Ue?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Ae,_e,K[ie]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,ue,Ae,_e,K[ie]);for(let C=0;C<ze.length;C++){const re=ze[C];Ue?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,C+1,0,0,Ae,_e,re.image[ie]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,C+1,ue,Ae,_e,re.image[ie])}}}S(M,He)&&x(i.TEXTURE_CUBE_MAP),Q.__version=Z.version,M.onUpdate&&M.onUpdate(M)}w.__version=M.version}function me(w,M,N,J,Z,Q){const fe=r.convert(N.format,N.colorSpace),oe=r.convert(N.type),he=y(N.internalFormat,fe,oe,N.colorSpace);if(!n.get(M).__hasExternalTextures){const Fe=Math.max(1,M.width>>Q),K=Math.max(1,M.height>>Q);Z===i.TEXTURE_3D||Z===i.TEXTURE_2D_ARRAY?t.texImage3D(Z,Q,he,Fe,K,M.depth,0,fe,oe,null):t.texImage2D(Z,Q,he,Fe,K,0,fe,oe,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),de(M)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,Z,n.get(N).__webglTexture,0,Re(M)):(Z===i.TEXTURE_2D||Z>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,J,Z,n.get(N).__webglTexture,Q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Pe(w,M,N){if(i.bindRenderbuffer(i.RENDERBUFFER,w),M.depthBuffer&&!M.stencilBuffer){let J=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(N||de(M)){const Z=M.depthTexture;Z&&Z.isDepthTexture&&(Z.type===_n?J=i.DEPTH_COMPONENT32F:Z.type===gn&&(J=i.DEPTH_COMPONENT24));const Q=Re(M);de(M)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Q,J,M.width,M.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,Q,J,M.width,M.height)}else i.renderbufferStorage(i.RENDERBUFFER,J,M.width,M.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,w)}else if(M.depthBuffer&&M.stencilBuffer){const J=Re(M);N&&de(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,J,i.DEPTH24_STENCIL8,M.width,M.height):de(M)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,J,i.DEPTH24_STENCIL8,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,w)}else{const J=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let Z=0;Z<J.length;Z++){const Q=J[Z],fe=r.convert(Q.format,Q.colorSpace),oe=r.convert(Q.type),he=y(Q.internalFormat,fe,oe,Q.colorSpace),ye=Re(M);N&&de(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ye,he,M.width,M.height):de(M)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ye,he,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,he,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function De(w,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),V(M.depthTexture,0);const J=n.get(M.depthTexture).__webglTexture,Z=Re(M);if(M.depthTexture.format===Dn)de(M)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,J,0);else if(M.depthTexture.format===di)de(M)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Ee(w){const M=n.get(w),N=w.isWebGLCubeRenderTarget===!0;if(w.depthTexture&&!M.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");De(M.__webglFramebuffer,w)}else if(N){M.__webglDepthbuffer=[];for(let J=0;J<6;J++)t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[J]),M.__webglDepthbuffer[J]=i.createRenderbuffer(),Pe(M.__webglDepthbuffer[J],w,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=i.createRenderbuffer(),Pe(M.__webglDepthbuffer,w,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ve(w,M,N){const J=n.get(w);M!==void 0&&me(J.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&Ee(w)}function U(w){const M=w.texture,N=n.get(w),J=n.get(M);w.addEventListener("dispose",F),w.isWebGLMultipleRenderTargets!==!0&&(J.__webglTexture===void 0&&(J.__webglTexture=i.createTexture()),J.__version=M.version,a.memory.textures++);const Z=w.isWebGLCubeRenderTarget===!0,Q=w.isWebGLMultipleRenderTargets===!0,fe=p(w)||o;if(Z){N.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(o&&M.mipmaps&&M.mipmaps.length>0){N.__webglFramebuffer[oe]=[];for(let he=0;he<M.mipmaps.length;he++)N.__webglFramebuffer[oe][he]=i.createFramebuffer()}else N.__webglFramebuffer[oe]=i.createFramebuffer()}else{if(o&&M.mipmaps&&M.mipmaps.length>0){N.__webglFramebuffer=[];for(let oe=0;oe<M.mipmaps.length;oe++)N.__webglFramebuffer[oe]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(Q)if(s.drawBuffers){const oe=w.texture;for(let he=0,ye=oe.length;he<ye;he++){const Fe=n.get(oe[he]);Fe.__webglTexture===void 0&&(Fe.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&w.samples>0&&de(w)===!1){const oe=Q?M:[M];N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let he=0;he<oe.length;he++){const ye=oe[he];N.__webglColorRenderbuffer[he]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[he]);const Fe=r.convert(ye.format,ye.colorSpace),K=r.convert(ye.type),qe=y(ye.internalFormat,Fe,K,ye.colorSpace,w.isXRRenderTarget===!0),He=Re(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,He,qe,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,N.__webglColorRenderbuffer[he])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),Pe(N.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){t.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),G(i.TEXTURE_CUBE_MAP,M,fe);for(let oe=0;oe<6;oe++)if(o&&M.mipmaps&&M.mipmaps.length>0)for(let he=0;he<M.mipmaps.length;he++)me(N.__webglFramebuffer[oe][he],w,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,he);else me(N.__webglFramebuffer[oe],w,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);S(M,fe)&&x(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Q){const oe=w.texture;for(let he=0,ye=oe.length;he<ye;he++){const Fe=oe[he],K=n.get(Fe);t.bindTexture(i.TEXTURE_2D,K.__webglTexture),G(i.TEXTURE_2D,Fe,fe),me(N.__webglFramebuffer,w,Fe,i.COLOR_ATTACHMENT0+he,i.TEXTURE_2D,0),S(Fe,fe)&&x(i.TEXTURE_2D)}t.unbindTexture()}else{let oe=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(o?oe=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(oe,J.__webglTexture),G(oe,M,fe),o&&M.mipmaps&&M.mipmaps.length>0)for(let he=0;he<M.mipmaps.length;he++)me(N.__webglFramebuffer[he],w,M,i.COLOR_ATTACHMENT0,oe,he);else me(N.__webglFramebuffer,w,M,i.COLOR_ATTACHMENT0,oe,0);S(M,fe)&&x(oe),t.unbindTexture()}w.depthBuffer&&Ee(w)}function Mt(w){const M=p(w)||o,N=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let J=0,Z=N.length;J<Z;J++){const Q=N[J];if(S(Q,M)){const fe=w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,oe=n.get(Q).__webglTexture;t.bindTexture(fe,oe),x(fe),t.unbindTexture()}}}function xe(w){if(o&&w.samples>0&&de(w)===!1){const M=w.isWebGLMultipleRenderTargets?w.texture:[w.texture],N=w.width,J=w.height;let Z=i.COLOR_BUFFER_BIT;const Q=[],fe=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=n.get(w),he=w.isWebGLMultipleRenderTargets===!0;if(he)for(let ye=0;ye<M.length;ye++)t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let ye=0;ye<M.length;ye++){Q.push(i.COLOR_ATTACHMENT0+ye),w.depthBuffer&&Q.push(fe);const Fe=oe.__ignoreDepthValues!==void 0?oe.__ignoreDepthValues:!1;if(Fe===!1&&(w.depthBuffer&&(Z|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&(Z|=i.STENCIL_BUFFER_BIT)),he&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,oe.__webglColorRenderbuffer[ye]),Fe===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[fe]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[fe])),he){const K=n.get(M[ye]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,K,0)}i.blitFramebuffer(0,0,N,J,0,0,N,J,Z,i.NEAREST),c&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Q)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),he)for(let ye=0;ye<M.length;ye++){t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.RENDERBUFFER,oe.__webglColorRenderbuffer[ye]);const Fe=n.get(M[ye]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ye,i.TEXTURE_2D,Fe,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}}function Re(w){return Math.min(s.maxSamples,w.samples)}function de(w){const M=n.get(w);return o&&w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function et(w){const M=a.render.frame;h.get(w)!==M&&(h.set(w,M),w.update())}function Ne(w,M){const N=w.colorSpace,J=w.format,Z=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||w.format===dr||N!==on&&N!==kt&&($e.getTransfer(N)===Je?o===!1?e.has("EXT_sRGB")===!0&&J===qt?(w.format=dr,w.minFilter=Ft,w.generateMipmaps=!1):M=qo.sRGBToLinear(M):(J!==qt||Z!==Mn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),M}this.allocateTextureUnit=P,this.resetTextureUnits=ee,this.setTexture2D=V,this.setTexture2DArray=$,this.setTexture3D=W,this.setTextureCube=q,this.rebindTextures=Ve,this.setupRenderTarget=U,this.updateRenderTargetMipmap=Mt,this.updateMultisampleRenderTarget=xe,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=me,this.useMultisampledRTT=de}function zp(i,e,t){const n=t.isWebGL2;function s(r,a=kt){let o;const l=$e.getTransfer(a);if(r===Mn)return i.UNSIGNED_BYTE;if(r===Fo)return i.UNSIGNED_SHORT_4_4_4_4;if(r===Oo)return i.UNSIGNED_SHORT_5_5_5_1;if(r===ac)return i.BYTE;if(r===oc)return i.SHORT;if(r===yr)return i.UNSIGNED_SHORT;if(r===No)return i.INT;if(r===gn)return i.UNSIGNED_INT;if(r===_n)return i.FLOAT;if(r===Ti)return n?i.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===lc)return i.ALPHA;if(r===qt)return i.RGBA;if(r===cc)return i.LUMINANCE;if(r===hc)return i.LUMINANCE_ALPHA;if(r===Dn)return i.DEPTH_COMPONENT;if(r===di)return i.DEPTH_STENCIL;if(r===dr)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===uc)return i.RED;if(r===zo)return i.RED_INTEGER;if(r===dc)return i.RG;if(r===ko)return i.RG_INTEGER;if(r===Bo)return i.RGBA_INTEGER;if(r===Ps||r===Ls||r===Ds||r===Us)if(l===Je)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Ps)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Ls)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Ds)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Us)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Ps)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Ls)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Ds)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Us)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===jr||r===Kr||r===Zr||r===Jr)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===jr)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Kr)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Zr)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Jr)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Ho)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Qr||r===ea)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===Qr)return l===Je?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===ea)return l===Je?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===ta||r===na||r===ia||r===sa||r===ra||r===aa||r===oa||r===la||r===ca||r===ha||r===ua||r===da||r===fa||r===pa)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===ta)return l===Je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===na)return l===Je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===ia)return l===Je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===sa)return l===Je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===ra)return l===Je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===aa)return l===Je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===oa)return l===Je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===la)return l===Je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===ca)return l===Je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===ha)return l===Je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===ua)return l===Je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===da)return l===Je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===fa)return l===Je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===pa)return l===Je?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Is||r===ma||r===ga)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===Is)return l===Je?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===ma)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===ga)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===fc||r===_a||r===xa||r===va)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===Is)return o.COMPRESSED_RED_RGTC1_EXT;if(r===_a)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===xa)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===va)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Ln?n?i.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}class kp extends Ot{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ze extends gt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Bp={type:"move"};class ir{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ze,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ze,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ze,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),d=this._getHandJoint(c,_);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],f=h.position.distanceTo(u.position),m=.02,g=.005;c.inputState.pinching&&f>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Bp)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ze;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Hp extends pi{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,f=null,m=null,g=null;const _=t.getContextAttributes();let p=null,d=null;const S=[],x=[],y=new Ge;let R=null;const T=new Ot;T.layers.enable(1),T.viewport=new mt;const A=new Ot;A.layers.enable(2),A.viewport=new mt;const F=[T,A],v=new kp;v.layers.enable(1),v.layers.enable(2);let E=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let j=S[G];return j===void 0&&(j=new ir,S[G]=j),j.getTargetRaySpace()},this.getControllerGrip=function(G){let j=S[G];return j===void 0&&(j=new ir,S[G]=j),j.getGripSpace()},this.getHand=function(G){let j=S[G];return j===void 0&&(j=new ir,S[G]=j),j.getHandSpace()};function H(G){const j=x.indexOf(G.inputSource);if(j===-1)return;const le=S[j];le!==void 0&&(le.update(G.inputSource,G.frame,c||a),le.dispatchEvent({type:G.type,data:G.inputSource}))}function ee(){s.removeEventListener("select",H),s.removeEventListener("selectstart",H),s.removeEventListener("selectend",H),s.removeEventListener("squeeze",H),s.removeEventListener("squeezestart",H),s.removeEventListener("squeezeend",H),s.removeEventListener("end",ee),s.removeEventListener("inputsourceschange",P);for(let G=0;G<S.length;G++){const j=x[G];j!==null&&(x[G]=null,S[G].disconnect(j))}E=null,k=null,e.setRenderTarget(p),m=null,f=null,u=null,s=null,d=null,ne.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(y.width,y.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){r=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(G){if(s=G,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",H),s.addEventListener("selectstart",H),s.addEventListener("selectend",H),s.addEventListener("squeeze",H),s.addEventListener("squeezestart",H),s.addEventListener("squeezeend",H),s.addEventListener("end",ee),s.addEventListener("inputsourceschange",P),_.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(y),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const j={antialias:s.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,j),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),d=new Fn(m.framebufferWidth,m.framebufferHeight,{format:qt,type:Mn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let j=null,le=null,ge=null;_.depth&&(ge=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,j=_.stencil?di:Dn,le=_.stencil?Ln:gn);const me={colorFormat:t.RGBA8,depthFormat:ge,scaleFactor:r};u=new XRWebGLBinding(s,t),f=u.createProjectionLayer(me),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),d=new Fn(f.textureWidth,f.textureHeight,{format:qt,type:Mn,depthTexture:new sl(f.textureWidth,f.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,j),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Pe=e.properties.get(d);Pe.__ignoreDepthValues=f.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),ne.setContext(s),ne.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function P(G){for(let j=0;j<G.removed.length;j++){const le=G.removed[j],ge=x.indexOf(le);ge>=0&&(x[ge]=null,S[ge].disconnect(le))}for(let j=0;j<G.added.length;j++){const le=G.added[j];let ge=x.indexOf(le);if(ge===-1){for(let Pe=0;Pe<S.length;Pe++)if(Pe>=x.length){x.push(le),ge=Pe;break}else if(x[Pe]===null){x[Pe]=le,ge=Pe;break}if(ge===-1)break}const me=S[ge];me&&me.connect(le)}}const z=new L,V=new L;function $(G,j,le){z.setFromMatrixPosition(j.matrixWorld),V.setFromMatrixPosition(le.matrixWorld);const ge=z.distanceTo(V),me=j.projectionMatrix.elements,Pe=le.projectionMatrix.elements,De=me[14]/(me[10]-1),Ee=me[14]/(me[10]+1),Ve=(me[9]+1)/me[5],U=(me[9]-1)/me[5],Mt=(me[8]-1)/me[0],xe=(Pe[8]+1)/Pe[0],Re=De*Mt,de=De*xe,et=ge/(-Mt+xe),Ne=et*-Mt;j.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(Ne),G.translateZ(et),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert();const w=De+et,M=Ee+et,N=Re-Ne,J=de+(ge-Ne),Z=Ve*Ee/M*w,Q=U*Ee/M*w;G.projectionMatrix.makePerspective(N,J,Z,Q,w,M),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}function W(G,j){j===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(j.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(s===null)return;v.near=A.near=T.near=G.near,v.far=A.far=T.far=G.far,(E!==v.near||k!==v.far)&&(s.updateRenderState({depthNear:v.near,depthFar:v.far}),E=v.near,k=v.far);const j=G.parent,le=v.cameras;W(v,j);for(let ge=0;ge<le.length;ge++)W(le[ge],j);le.length===2?$(v,T,A):v.projectionMatrix.copy(T.projectionMatrix),q(G,v,j)};function q(G,j,le){le===null?G.matrix.copy(j.matrixWorld):(G.matrix.copy(le.matrixWorld),G.matrix.invert(),G.matrix.multiply(j.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(j.projectionMatrix),G.projectionMatrixInverse.copy(j.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=Ai*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(f===null&&m===null))return l},this.setFoveation=function(G){l=G,f!==null&&(f.fixedFoveation=G),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=G)};let Y=null;function te(G,j){if(h=j.getViewerPose(c||a),g=j,h!==null){const le=h.views;m!==null&&(e.setRenderTargetFramebuffer(d,m.framebuffer),e.setRenderTarget(d));let ge=!1;le.length!==v.cameras.length&&(v.cameras.length=0,ge=!0);for(let me=0;me<le.length;me++){const Pe=le[me];let De=null;if(m!==null)De=m.getViewport(Pe);else{const Ve=u.getViewSubImage(f,Pe);De=Ve.viewport,me===0&&(e.setRenderTargetTextures(d,Ve.colorTexture,f.ignoreDepthValues?void 0:Ve.depthStencilTexture),e.setRenderTarget(d))}let Ee=F[me];Ee===void 0&&(Ee=new Ot,Ee.layers.enable(me),Ee.viewport=new mt,F[me]=Ee),Ee.matrix.fromArray(Pe.transform.matrix),Ee.matrix.decompose(Ee.position,Ee.quaternion,Ee.scale),Ee.projectionMatrix.fromArray(Pe.projectionMatrix),Ee.projectionMatrixInverse.copy(Ee.projectionMatrix).invert(),Ee.viewport.set(De.x,De.y,De.width,De.height),me===0&&(v.matrix.copy(Ee.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),ge===!0&&v.cameras.push(Ee)}}for(let le=0;le<S.length;le++){const ge=x[le],me=S[le];ge!==null&&me!==void 0&&me.update(ge,j,c||a)}Y&&Y(G,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),g=null}const ne=new nl;ne.setAnimationLoop(te),this.setAnimationLoop=function(G){Y=G},this.dispose=function(){}}}function Gp(i,e){function t(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function n(p,d){d.color.getRGB(p.fogColor.value,Qo(i)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function s(p,d,S,x,y){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(p,d):d.isMeshToonMaterial?(r(p,d),u(p,d)):d.isMeshPhongMaterial?(r(p,d),h(p,d)):d.isMeshStandardMaterial?(r(p,d),f(p,d),d.isMeshPhysicalMaterial&&m(p,d,y)):d.isMeshMatcapMaterial?(r(p,d),g(p,d)):d.isMeshDepthMaterial?r(p,d):d.isMeshDistanceMaterial?(r(p,d),_(p,d)):d.isMeshNormalMaterial?r(p,d):d.isLineBasicMaterial?(a(p,d),d.isLineDashedMaterial&&o(p,d)):d.isPointsMaterial?l(p,d,S,x):d.isSpriteMaterial?c(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,t(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===Rt&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,t(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===Rt&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,t(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,t(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const S=e.get(d).envMap;if(S&&(p.envMap.value=S,p.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap){p.lightMap.value=d.lightMap;const x=i._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=d.lightMapIntensity*x,t(d.lightMap,p.lightMapTransform)}d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,p.aoMapTransform))}function a(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform))}function o(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function l(p,d,S,x){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*S,p.scale.value=x*.5,d.map&&(p.map.value=d.map,t(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function c(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function h(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function u(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function f(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,p.roughnessMapTransform)),e.get(d).envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function m(p,d,S){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Rt&&p.clearcoatNormalScale.value.negate())),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=S.texture,p.transmissionSamplerSize.value.set(S.width,S.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,d){d.matcap&&(p.matcap.value=d.matcap)}function _(p,d){const S=e.get(d).light;p.referencePosition.value.setFromMatrixPosition(S.matrixWorld),p.nearDistance.value=S.shadow.camera.near,p.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Vp(i,e,t,n){let s={},r={},a=[];const o=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(S,x){const y=x.program;n.uniformBlockBinding(S,y)}function c(S,x){let y=s[S.id];y===void 0&&(g(S),y=h(S),s[S.id]=y,S.addEventListener("dispose",p));const R=x.program;n.updateUBOMapping(S,R);const T=e.render.frame;r[S.id]!==T&&(f(S),r[S.id]=T)}function h(S){const x=u();S.__bindingPointIndex=x;const y=i.createBuffer(),R=S.__size,T=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,R,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,y),y}function u(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(S){const x=s[S.id],y=S.uniforms,R=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let T=0,A=y.length;T<A;T++){const F=Array.isArray(y[T])?y[T]:[y[T]];for(let v=0,E=F.length;v<E;v++){const k=F[v];if(m(k,T,v,R)===!0){const H=k.__offset,ee=Array.isArray(k.value)?k.value:[k.value];let P=0;for(let z=0;z<ee.length;z++){const V=ee[z],$=_(V);typeof V=="number"||typeof V=="boolean"?(k.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,H+P,k.__data)):V.isMatrix3?(k.__data[0]=V.elements[0],k.__data[1]=V.elements[1],k.__data[2]=V.elements[2],k.__data[3]=0,k.__data[4]=V.elements[3],k.__data[5]=V.elements[4],k.__data[6]=V.elements[5],k.__data[7]=0,k.__data[8]=V.elements[6],k.__data[9]=V.elements[7],k.__data[10]=V.elements[8],k.__data[11]=0):(V.toArray(k.__data,P),P+=$.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,H,k.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(S,x,y,R){const T=S.value,A=x+"_"+y;if(R[A]===void 0)return typeof T=="number"||typeof T=="boolean"?R[A]=T:R[A]=T.clone(),!0;{const F=R[A];if(typeof T=="number"||typeof T=="boolean"){if(F!==T)return R[A]=T,!0}else if(F.equals(T)===!1)return F.copy(T),!0}return!1}function g(S){const x=S.uniforms;let y=0;const R=16;for(let A=0,F=x.length;A<F;A++){const v=Array.isArray(x[A])?x[A]:[x[A]];for(let E=0,k=v.length;E<k;E++){const H=v[E],ee=Array.isArray(H.value)?H.value:[H.value];for(let P=0,z=ee.length;P<z;P++){const V=ee[P],$=_(V),W=y%R;W!==0&&R-W<$.boundary&&(y+=R-W),H.__data=new Float32Array($.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=y,y+=$.storage}}}const T=y%R;return T>0&&(y+=R-T),S.__size=y,S.__cache={},this}function _(S){const x={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(x.boundary=4,x.storage=4):S.isVector2?(x.boundary=8,x.storage=8):S.isVector3||S.isColor?(x.boundary=16,x.storage=12):S.isVector4?(x.boundary=16,x.storage=16):S.isMatrix3?(x.boundary=48,x.storage=48):S.isMatrix4?(x.boundary=64,x.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),x}function p(S){const x=S.target;x.removeEventListener("dispose",p);const y=a.indexOf(x.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function d(){for(const S in s)i.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:l,update:c,dispose:d}}class hl{constructor(e={}){const{canvas:t=zc(),context:n=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=a;const m=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const d=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=lt,this._useLegacyLights=!1,this.toneMapping=vn,this.toneMappingExposure=1;const x=this;let y=!1,R=0,T=0,A=null,F=-1,v=null;const E=new mt,k=new mt;let H=null;const ee=new be(0);let P=0,z=t.width,V=t.height,$=1,W=null,q=null;const Y=new mt(0,0,z,V),te=new mt(0,0,z,V);let ne=!1;const G=new Tr;let j=!1,le=!1,ge=null;const me=new ct,Pe=new Ge,De=new L,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ve(){return A===null?$:1}let U=n;function Mt(b,D){for(let O=0;O<b.length;O++){const B=b[O],I=t.getContext(B,D);if(I!==null)return I}return null}try{const b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${vr}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",C,!1),t.addEventListener("webglcontextcreationerror",re,!1),U===null){const D=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&D.shift(),U=Mt(D,b),U===null)throw Mt(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&U instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),U.getShaderPrecisionFormat===void 0&&(U.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let xe,Re,de,et,Ne,w,M,N,J,Z,Q,fe,oe,he,ye,Fe,K,qe,He,Ae,_e,ue,Ue,Xe;function it(){xe=new Jd(U),Re=new qd(U,xe,e),xe.init(Re),ue=new zp(U,xe,Re),de=new Fp(U,xe,Re),et=new tf(U),Ne=new Sp,w=new Op(U,xe,de,Ne,Re,ue,et),M=new Yd(x),N=new Zd(x),J=new ch(U,Re),Ue=new Wd(U,xe,J,Re),Z=new Qd(U,J,et,Ue),Q=new af(U,Z,J,et),He=new rf(U,Re,w),Fe=new $d(Ne),fe=new yp(x,M,N,xe,Re,Ue,Fe),oe=new Gp(x,Ne),he=new Ep,ye=new Pp(xe,Re),qe=new Vd(x,M,N,de,Q,f,l),K=new Np(x,Q,Re),Xe=new Vp(U,et,Re,de),Ae=new Xd(U,xe,et,Re),_e=new ef(U,xe,et,Re),et.programs=fe.programs,x.capabilities=Re,x.extensions=xe,x.properties=Ne,x.renderLists=he,x.shadowMap=K,x.state=de,x.info=et}it();const ze=new Hp(x,U);this.xr=ze,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const b=xe.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=xe.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return $},this.setPixelRatio=function(b){b!==void 0&&($=b,this.setSize(z,V,!1))},this.getSize=function(b){return b.set(z,V)},this.setSize=function(b,D,O=!0){if(ze.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=b,V=D,t.width=Math.floor(b*$),t.height=Math.floor(D*$),O===!0&&(t.style.width=b+"px",t.style.height=D+"px"),this.setViewport(0,0,b,D)},this.getDrawingBufferSize=function(b){return b.set(z*$,V*$).floor()},this.setDrawingBufferSize=function(b,D,O){z=b,V=D,$=O,t.width=Math.floor(b*O),t.height=Math.floor(D*O),this.setViewport(0,0,b,D)},this.getCurrentViewport=function(b){return b.copy(E)},this.getViewport=function(b){return b.copy(Y)},this.setViewport=function(b,D,O,B){b.isVector4?Y.set(b.x,b.y,b.z,b.w):Y.set(b,D,O,B),de.viewport(E.copy(Y).multiplyScalar($).floor())},this.getScissor=function(b){return b.copy(te)},this.setScissor=function(b,D,O,B){b.isVector4?te.set(b.x,b.y,b.z,b.w):te.set(b,D,O,B),de.scissor(k.copy(te).multiplyScalar($).floor())},this.getScissorTest=function(){return ne},this.setScissorTest=function(b){de.setScissorTest(ne=b)},this.setOpaqueSort=function(b){W=b},this.setTransparentSort=function(b){q=b},this.getClearColor=function(b){return b.copy(qe.getClearColor())},this.setClearColor=function(){qe.setClearColor.apply(qe,arguments)},this.getClearAlpha=function(){return qe.getClearAlpha()},this.setClearAlpha=function(){qe.setClearAlpha.apply(qe,arguments)},this.clear=function(b=!0,D=!0,O=!0){let B=0;if(b){let I=!1;if(A!==null){const ce=A.texture.format;I=ce===Bo||ce===ko||ce===zo}if(I){const ce=A.texture.type,pe=ce===Mn||ce===gn||ce===yr||ce===Ln||ce===Fo||ce===Oo,Me=qe.getClearColor(),Te=qe.getClearAlpha(),Oe=Me.r,Ce=Me.g,Le=Me.b;pe?(m[0]=Oe,m[1]=Ce,m[2]=Le,m[3]=Te,U.clearBufferuiv(U.COLOR,0,m)):(g[0]=Oe,g[1]=Ce,g[2]=Le,g[3]=Te,U.clearBufferiv(U.COLOR,0,g))}else B|=U.COLOR_BUFFER_BIT}D&&(B|=U.DEPTH_BUFFER_BIT),O&&(B|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",C,!1),t.removeEventListener("webglcontextcreationerror",re,!1),he.dispose(),ye.dispose(),Ne.dispose(),M.dispose(),N.dispose(),Q.dispose(),Ue.dispose(),Xe.dispose(),fe.dispose(),ze.dispose(),ze.removeEventListener("sessionstart",yt),ze.removeEventListener("sessionend",Ke),ge&&(ge.dispose(),ge=null),St.stop()};function ie(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function C(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const b=et.autoReset,D=K.enabled,O=K.autoUpdate,B=K.needsUpdate,I=K.type;it(),et.autoReset=b,K.enabled=D,K.autoUpdate=O,K.needsUpdate=B,K.type=I}function re(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function ae(b){const D=b.target;D.removeEventListener("dispose",ae),we(D)}function we(b){ve(b),Ne.remove(b)}function ve(b){const D=Ne.get(b).programs;D!==void 0&&(D.forEach(function(O){fe.releaseProgram(O)}),b.isShaderMaterial&&fe.releaseShaderCache(b))}this.renderBufferDirect=function(b,D,O,B,I,ce){D===null&&(D=Ee);const pe=I.isMesh&&I.matrixWorld.determinant()<0,Me=Sl(b,D,O,B,I);de.setMaterial(B,pe);let Te=O.index,Oe=1;if(B.wireframe===!0){if(Te=Z.getWireframeAttribute(O),Te===void 0)return;Oe=2}const Ce=O.drawRange,Le=O.attributes.position;let at=Ce.start*Oe,Pt=(Ce.start+Ce.count)*Oe;ce!==null&&(at=Math.max(at,ce.start*Oe),Pt=Math.min(Pt,(ce.start+ce.count)*Oe)),Te!==null?(at=Math.max(at,0),Pt=Math.min(Pt,Te.count)):Le!=null&&(at=Math.max(at,0),Pt=Math.min(Pt,Le.count));const ft=Pt-at;if(ft<0||ft===1/0)return;Ue.setup(I,B,Me,O,Te);let Jt,tt=Ae;if(Te!==null&&(Jt=J.get(Te),tt=_e,tt.setIndex(Jt)),I.isMesh)B.wireframe===!0?(de.setLineWidth(B.wireframeLinewidth*Ve()),tt.setMode(U.LINES)):tt.setMode(U.TRIANGLES);else if(I.isLine){let ke=B.linewidth;ke===void 0&&(ke=1),de.setLineWidth(ke*Ve()),I.isLineSegments?tt.setMode(U.LINES):I.isLineLoop?tt.setMode(U.LINE_LOOP):tt.setMode(U.LINE_STRIP)}else I.isPoints?tt.setMode(U.POINTS):I.isSprite&&tt.setMode(U.TRIANGLES);if(I.isBatchedMesh)tt.renderMultiDraw(I._multiDrawStarts,I._multiDrawCounts,I._multiDrawCount);else if(I.isInstancedMesh)tt.renderInstances(at,ft,I.count);else if(O.isInstancedBufferGeometry){const ke=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,ws=Math.min(O.instanceCount,ke);tt.renderInstances(at,ft,ws)}else tt.render(at,ft)};function Ye(b,D,O){b.transparent===!0&&b.side===zt&&b.forceSinglePass===!1?(b.side=Rt,b.needsUpdate=!0,Ui(b,D,O),b.side=yn,b.needsUpdate=!0,Ui(b,D,O),b.side=zt):Ui(b,D,O)}this.compile=function(b,D,O=null){O===null&&(O=b),p=ye.get(O),p.init(),S.push(p),O.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(p.pushLight(I),I.castShadow&&p.pushShadow(I))}),b!==O&&b.traverseVisible(function(I){I.isLight&&I.layers.test(D.layers)&&(p.pushLight(I),I.castShadow&&p.pushShadow(I))}),p.setupLights(x._useLegacyLights);const B=new Set;return b.traverse(function(I){const ce=I.material;if(ce)if(Array.isArray(ce))for(let pe=0;pe<ce.length;pe++){const Me=ce[pe];Ye(Me,O,I),B.add(Me)}else Ye(ce,O,I),B.add(ce)}),S.pop(),p=null,B},this.compileAsync=function(b,D,O=null){const B=this.compile(b,D,O);return new Promise(I=>{function ce(){if(B.forEach(function(pe){Ne.get(pe).currentProgram.isReady()&&B.delete(pe)}),B.size===0){I(b);return}setTimeout(ce,10)}xe.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let je=null;function dt(b){je&&je(b)}function yt(){St.stop()}function Ke(){St.start()}const St=new nl;St.setAnimationLoop(dt),typeof self<"u"&&St.setContext(self),this.setAnimationLoop=function(b){je=b,ze.setAnimationLoop(b),b===null?St.stop():St.start()},ze.addEventListener("sessionstart",yt),ze.addEventListener("sessionend",Ke),this.render=function(b,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),ze.enabled===!0&&ze.isPresenting===!0&&(ze.cameraAutoUpdate===!0&&ze.updateCamera(D),D=ze.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,D,A),p=ye.get(b,S.length),p.init(),S.push(p),me.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),G.setFromProjectionMatrix(me),le=this.localClippingEnabled,j=Fe.init(this.clippingPlanes,le),_=he.get(b,d.length),_.init(),d.push(_),Yt(b,D,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(W,q),this.info.render.frame++,j===!0&&Fe.beginShadows();const O=p.state.shadowsArray;if(K.render(O,b,D),j===!0&&Fe.endShadows(),this.info.autoReset===!0&&this.info.reset(),qe.render(_,b),p.setupLights(x._useLegacyLights),D.isArrayCamera){const B=D.cameras;for(let I=0,ce=B.length;I<ce;I++){const pe=B[I];Fr(_,b,pe,pe.viewport)}}else Fr(_,b,D);A!==null&&(w.updateMultisampleRenderTarget(A),w.updateRenderTargetMipmap(A)),b.isScene===!0&&b.onAfterRender(x,b,D),Ue.resetDefaultState(),F=-1,v=null,S.pop(),S.length>0?p=S[S.length-1]:p=null,d.pop(),d.length>0?_=d[d.length-1]:_=null};function Yt(b,D,O,B){if(b.visible===!1)return;if(b.layers.test(D.layers)){if(b.isGroup)O=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(D);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||G.intersectsSprite(b)){B&&De.setFromMatrixPosition(b.matrixWorld).applyMatrix4(me);const pe=Q.update(b),Me=b.material;Me.visible&&_.push(b,pe,Me,O,De.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||G.intersectsObject(b))){const pe=Q.update(b),Me=b.material;if(B&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),De.copy(b.boundingSphere.center)):(pe.boundingSphere===null&&pe.computeBoundingSphere(),De.copy(pe.boundingSphere.center)),De.applyMatrix4(b.matrixWorld).applyMatrix4(me)),Array.isArray(Me)){const Te=pe.groups;for(let Oe=0,Ce=Te.length;Oe<Ce;Oe++){const Le=Te[Oe],at=Me[Le.materialIndex];at&&at.visible&&_.push(b,pe,at,O,De.z,Le)}}else Me.visible&&_.push(b,pe,Me,O,De.z,null)}}const ce=b.children;for(let pe=0,Me=ce.length;pe<Me;pe++)Yt(ce[pe],D,O,B)}function Fr(b,D,O,B){const I=b.opaque,ce=b.transmissive,pe=b.transparent;p.setupLightsView(O),j===!0&&Fe.setGlobalState(x.clippingPlanes,O),ce.length>0&&yl(I,ce,D,O),B&&de.viewport(E.copy(B)),I.length>0&&Di(I,D,O),ce.length>0&&Di(ce,D,O),pe.length>0&&Di(pe,D,O),de.buffers.depth.setTest(!0),de.buffers.depth.setMask(!0),de.buffers.color.setMask(!0),de.setPolygonOffset(!1)}function yl(b,D,O,B){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;const ce=Re.isWebGL2;ge===null&&(ge=new Fn(1,1,{generateMipmaps:!0,type:xe.has("EXT_color_buffer_half_float")?Ti:Mn,minFilter:wi,samples:ce?4:0})),x.getDrawingBufferSize(Pe),ce?ge.setSize(Pe.x,Pe.y):ge.setSize(ds(Pe.x),ds(Pe.y));const pe=x.getRenderTarget();x.setRenderTarget(ge),x.getClearColor(ee),P=x.getClearAlpha(),P<1&&x.setClearColor(16777215,.5),x.clear();const Me=x.toneMapping;x.toneMapping=vn,Di(b,O,B),w.updateMultisampleRenderTarget(ge),w.updateRenderTargetMipmap(ge);let Te=!1;for(let Oe=0,Ce=D.length;Oe<Ce;Oe++){const Le=D[Oe],at=Le.object,Pt=Le.geometry,ft=Le.material,Jt=Le.group;if(ft.side===zt&&at.layers.test(B.layers)){const tt=ft.side;ft.side=Rt,ft.needsUpdate=!0,Or(at,O,B,Pt,ft,Jt),ft.side=tt,ft.needsUpdate=!0,Te=!0}}Te===!0&&(w.updateMultisampleRenderTarget(ge),w.updateRenderTargetMipmap(ge)),x.setRenderTarget(pe),x.setClearColor(ee,P),x.toneMapping=Me}function Di(b,D,O){const B=D.isScene===!0?D.overrideMaterial:null;for(let I=0,ce=b.length;I<ce;I++){const pe=b[I],Me=pe.object,Te=pe.geometry,Oe=B===null?pe.material:B,Ce=pe.group;Me.layers.test(O.layers)&&Or(Me,D,O,Te,Oe,Ce)}}function Or(b,D,O,B,I,ce){b.onBeforeRender(x,D,O,B,I,ce),b.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),I.onBeforeRender(x,D,O,B,b,ce),I.transparent===!0&&I.side===zt&&I.forceSinglePass===!1?(I.side=Rt,I.needsUpdate=!0,x.renderBufferDirect(O,D,B,I,b,ce),I.side=yn,I.needsUpdate=!0,x.renderBufferDirect(O,D,B,I,b,ce),I.side=zt):x.renderBufferDirect(O,D,B,I,b,ce),b.onAfterRender(x,D,O,B,I,ce)}function Ui(b,D,O){D.isScene!==!0&&(D=Ee);const B=Ne.get(b),I=p.state.lights,ce=p.state.shadowsArray,pe=I.state.version,Me=fe.getParameters(b,I.state,ce,D,O),Te=fe.getProgramCacheKey(Me);let Oe=B.programs;B.environment=b.isMeshStandardMaterial?D.environment:null,B.fog=D.fog,B.envMap=(b.isMeshStandardMaterial?N:M).get(b.envMap||B.environment),Oe===void 0&&(b.addEventListener("dispose",ae),Oe=new Map,B.programs=Oe);let Ce=Oe.get(Te);if(Ce!==void 0){if(B.currentProgram===Ce&&B.lightsStateVersion===pe)return kr(b,Me),Ce}else Me.uniforms=fe.getUniforms(b),b.onBuild(O,Me,x),b.onBeforeCompile(Me,x),Ce=fe.acquireProgram(Me,Te),Oe.set(Te,Ce),B.uniforms=Me.uniforms;const Le=B.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Le.clippingPlanes=Fe.uniform),kr(b,Me),B.needsLights=El(b),B.lightsStateVersion=pe,B.needsLights&&(Le.ambientLightColor.value=I.state.ambient,Le.lightProbe.value=I.state.probe,Le.directionalLights.value=I.state.directional,Le.directionalLightShadows.value=I.state.directionalShadow,Le.spotLights.value=I.state.spot,Le.spotLightShadows.value=I.state.spotShadow,Le.rectAreaLights.value=I.state.rectArea,Le.ltc_1.value=I.state.rectAreaLTC1,Le.ltc_2.value=I.state.rectAreaLTC2,Le.pointLights.value=I.state.point,Le.pointLightShadows.value=I.state.pointShadow,Le.hemisphereLights.value=I.state.hemi,Le.directionalShadowMap.value=I.state.directionalShadowMap,Le.directionalShadowMatrix.value=I.state.directionalShadowMatrix,Le.spotShadowMap.value=I.state.spotShadowMap,Le.spotLightMatrix.value=I.state.spotLightMatrix,Le.spotLightMap.value=I.state.spotLightMap,Le.pointShadowMap.value=I.state.pointShadowMap,Le.pointShadowMatrix.value=I.state.pointShadowMatrix),B.currentProgram=Ce,B.uniformsList=null,Ce}function zr(b){if(b.uniformsList===null){const D=b.currentProgram.getUniforms();b.uniformsList=is.seqWithValue(D.seq,b.uniforms)}return b.uniformsList}function kr(b,D){const O=Ne.get(b);O.outputColorSpace=D.outputColorSpace,O.batching=D.batching,O.instancing=D.instancing,O.instancingColor=D.instancingColor,O.skinning=D.skinning,O.morphTargets=D.morphTargets,O.morphNormals=D.morphNormals,O.morphColors=D.morphColors,O.morphTargetsCount=D.morphTargetsCount,O.numClippingPlanes=D.numClippingPlanes,O.numIntersection=D.numClipIntersection,O.vertexAlphas=D.vertexAlphas,O.vertexTangents=D.vertexTangents,O.toneMapping=D.toneMapping}function Sl(b,D,O,B,I){D.isScene!==!0&&(D=Ee),w.resetTextureUnits();const ce=D.fog,pe=B.isMeshStandardMaterial?D.environment:null,Me=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:on,Te=(B.isMeshStandardMaterial?N:M).get(B.envMap||pe),Oe=B.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,Ce=!!O.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Le=!!O.morphAttributes.position,at=!!O.morphAttributes.normal,Pt=!!O.morphAttributes.color;let ft=vn;B.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(ft=x.toneMapping);const Jt=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,tt=Jt!==void 0?Jt.length:0,ke=Ne.get(B),ws=p.state.lights;if(j===!0&&(le===!0||b!==v)){const It=b===v&&B.id===F;Fe.setState(B,b,It)}let st=!1;B.version===ke.__version?(ke.needsLights&&ke.lightsStateVersion!==ws.state.version||ke.outputColorSpace!==Me||I.isBatchedMesh&&ke.batching===!1||!I.isBatchedMesh&&ke.batching===!0||I.isInstancedMesh&&ke.instancing===!1||!I.isInstancedMesh&&ke.instancing===!0||I.isSkinnedMesh&&ke.skinning===!1||!I.isSkinnedMesh&&ke.skinning===!0||I.isInstancedMesh&&ke.instancingColor===!0&&I.instanceColor===null||I.isInstancedMesh&&ke.instancingColor===!1&&I.instanceColor!==null||ke.envMap!==Te||B.fog===!0&&ke.fog!==ce||ke.numClippingPlanes!==void 0&&(ke.numClippingPlanes!==Fe.numPlanes||ke.numIntersection!==Fe.numIntersection)||ke.vertexAlphas!==Oe||ke.vertexTangents!==Ce||ke.morphTargets!==Le||ke.morphNormals!==at||ke.morphColors!==Pt||ke.toneMapping!==ft||Re.isWebGL2===!0&&ke.morphTargetsCount!==tt)&&(st=!0):(st=!0,ke.__version=B.version);let Sn=ke.currentProgram;st===!0&&(Sn=Ui(B,D,I));let Br=!1,_i=!1,Ts=!1;const _t=Sn.getUniforms(),bn=ke.uniforms;if(de.useProgram(Sn.program)&&(Br=!0,_i=!0,Ts=!0),B.id!==F&&(F=B.id,_i=!0),Br||v!==b){_t.setValue(U,"projectionMatrix",b.projectionMatrix),_t.setValue(U,"viewMatrix",b.matrixWorldInverse);const It=_t.map.cameraPosition;It!==void 0&&It.setValue(U,De.setFromMatrixPosition(b.matrixWorld)),Re.logarithmicDepthBuffer&&_t.setValue(U,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&_t.setValue(U,"isOrthographic",b.isOrthographicCamera===!0),v!==b&&(v=b,_i=!0,Ts=!0)}if(I.isSkinnedMesh){_t.setOptional(U,I,"bindMatrix"),_t.setOptional(U,I,"bindMatrixInverse");const It=I.skeleton;It&&(Re.floatVertexTextures?(It.boneTexture===null&&It.computeBoneTexture(),_t.setValue(U,"boneTexture",It.boneTexture,w)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}I.isBatchedMesh&&(_t.setOptional(U,I,"batchingTexture"),_t.setValue(U,"batchingTexture",I._matricesTexture,w));const As=O.morphAttributes;if((As.position!==void 0||As.normal!==void 0||As.color!==void 0&&Re.isWebGL2===!0)&&He.update(I,O,Sn),(_i||ke.receiveShadow!==I.receiveShadow)&&(ke.receiveShadow=I.receiveShadow,_t.setValue(U,"receiveShadow",I.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(bn.envMap.value=Te,bn.flipEnvMap.value=Te.isCubeTexture&&Te.isRenderTargetTexture===!1?-1:1),_i&&(_t.setValue(U,"toneMappingExposure",x.toneMappingExposure),ke.needsLights&&bl(bn,Ts),ce&&B.fog===!0&&oe.refreshFogUniforms(bn,ce),oe.refreshMaterialUniforms(bn,B,$,V,ge),is.upload(U,zr(ke),bn,w)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(is.upload(U,zr(ke),bn,w),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&_t.setValue(U,"center",I.center),_t.setValue(U,"modelViewMatrix",I.modelViewMatrix),_t.setValue(U,"normalMatrix",I.normalMatrix),_t.setValue(U,"modelMatrix",I.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const It=B.uniformsGroups;for(let Rs=0,wl=It.length;Rs<wl;Rs++)if(Re.isWebGL2){const Hr=It[Rs];Xe.update(Hr,Sn),Xe.bind(Hr,Sn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Sn}function bl(b,D){b.ambientLightColor.needsUpdate=D,b.lightProbe.needsUpdate=D,b.directionalLights.needsUpdate=D,b.directionalLightShadows.needsUpdate=D,b.pointLights.needsUpdate=D,b.pointLightShadows.needsUpdate=D,b.spotLights.needsUpdate=D,b.spotLightShadows.needsUpdate=D,b.rectAreaLights.needsUpdate=D,b.hemisphereLights.needsUpdate=D}function El(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(b,D,O){Ne.get(b.texture).__webglTexture=D,Ne.get(b.depthTexture).__webglTexture=O;const B=Ne.get(b);B.__hasExternalTextures=!0,B.__hasExternalTextures&&(B.__autoAllocateDepthBuffer=O===void 0,B.__autoAllocateDepthBuffer||xe.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),B.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(b,D){const O=Ne.get(b);O.__webglFramebuffer=D,O.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(b,D=0,O=0){A=b,R=D,T=O;let B=!0,I=null,ce=!1,pe=!1;if(b){const Te=Ne.get(b);Te.__useDefaultFramebuffer!==void 0?(de.bindFramebuffer(U.FRAMEBUFFER,null),B=!1):Te.__webglFramebuffer===void 0?w.setupRenderTarget(b):Te.__hasExternalTextures&&w.rebindTextures(b,Ne.get(b.texture).__webglTexture,Ne.get(b.depthTexture).__webglTexture);const Oe=b.texture;(Oe.isData3DTexture||Oe.isDataArrayTexture||Oe.isCompressedArrayTexture)&&(pe=!0);const Ce=Ne.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ce[D])?I=Ce[D][O]:I=Ce[D],ce=!0):Re.isWebGL2&&b.samples>0&&w.useMultisampledRTT(b)===!1?I=Ne.get(b).__webglMultisampledFramebuffer:Array.isArray(Ce)?I=Ce[O]:I=Ce,E.copy(b.viewport),k.copy(b.scissor),H=b.scissorTest}else E.copy(Y).multiplyScalar($).floor(),k.copy(te).multiplyScalar($).floor(),H=ne;if(de.bindFramebuffer(U.FRAMEBUFFER,I)&&Re.drawBuffers&&B&&de.drawBuffers(b,I),de.viewport(E),de.scissor(k),de.setScissorTest(H),ce){const Te=Ne.get(b.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+D,Te.__webglTexture,O)}else if(pe){const Te=Ne.get(b.texture),Oe=D||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Te.__webglTexture,O||0,Oe)}F=-1},this.readRenderTargetPixels=function(b,D,O,B,I,ce,pe){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=Ne.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&pe!==void 0&&(Me=Me[pe]),Me){de.bindFramebuffer(U.FRAMEBUFFER,Me);try{const Te=b.texture,Oe=Te.format,Ce=Te.type;if(Oe!==qt&&ue.convert(Oe)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Le=Ce===Ti&&(xe.has("EXT_color_buffer_half_float")||Re.isWebGL2&&xe.has("EXT_color_buffer_float"));if(Ce!==Mn&&ue.convert(Ce)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ce===_n&&(Re.isWebGL2||xe.has("OES_texture_float")||xe.has("WEBGL_color_buffer_float")))&&!Le){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=b.width-B&&O>=0&&O<=b.height-I&&U.readPixels(D,O,B,I,ue.convert(Oe),ue.convert(Ce),ce)}finally{const Te=A!==null?Ne.get(A).__webglFramebuffer:null;de.bindFramebuffer(U.FRAMEBUFFER,Te)}}},this.copyFramebufferToTexture=function(b,D,O=0){const B=Math.pow(2,-O),I=Math.floor(D.image.width*B),ce=Math.floor(D.image.height*B);w.setTexture2D(D,0),U.copyTexSubImage2D(U.TEXTURE_2D,O,0,0,b.x,b.y,I,ce),de.unbindTexture()},this.copyTextureToTexture=function(b,D,O,B=0){const I=D.image.width,ce=D.image.height,pe=ue.convert(O.format),Me=ue.convert(O.type);w.setTexture2D(O,0),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,O.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,O.unpackAlignment),D.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,B,b.x,b.y,I,ce,pe,Me,D.image.data):D.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,B,b.x,b.y,D.mipmaps[0].width,D.mipmaps[0].height,pe,D.mipmaps[0].data):U.texSubImage2D(U.TEXTURE_2D,B,b.x,b.y,pe,Me,D.image),B===0&&O.generateMipmaps&&U.generateMipmap(U.TEXTURE_2D),de.unbindTexture()},this.copyTextureToTexture3D=function(b,D,O,B,I=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ce=b.max.x-b.min.x+1,pe=b.max.y-b.min.y+1,Me=b.max.z-b.min.z+1,Te=ue.convert(B.format),Oe=ue.convert(B.type);let Ce;if(B.isData3DTexture)w.setTexture3D(B,0),Ce=U.TEXTURE_3D;else if(B.isDataArrayTexture||B.isCompressedArrayTexture)w.setTexture2DArray(B,0),Ce=U.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,B.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,B.unpackAlignment);const Le=U.getParameter(U.UNPACK_ROW_LENGTH),at=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Pt=U.getParameter(U.UNPACK_SKIP_PIXELS),ft=U.getParameter(U.UNPACK_SKIP_ROWS),Jt=U.getParameter(U.UNPACK_SKIP_IMAGES),tt=O.isCompressedTexture?O.mipmaps[I]:O.image;U.pixelStorei(U.UNPACK_ROW_LENGTH,tt.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,tt.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,b.min.x),U.pixelStorei(U.UNPACK_SKIP_ROWS,b.min.y),U.pixelStorei(U.UNPACK_SKIP_IMAGES,b.min.z),O.isDataTexture||O.isData3DTexture?U.texSubImage3D(Ce,I,D.x,D.y,D.z,ce,pe,Me,Te,Oe,tt.data):O.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),U.compressedTexSubImage3D(Ce,I,D.x,D.y,D.z,ce,pe,Me,Te,tt.data)):U.texSubImage3D(Ce,I,D.x,D.y,D.z,ce,pe,Me,Te,Oe,tt),U.pixelStorei(U.UNPACK_ROW_LENGTH,Le),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,at),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Pt),U.pixelStorei(U.UNPACK_SKIP_ROWS,ft),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Jt),I===0&&B.generateMipmaps&&U.generateMipmap(Ce),de.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?w.setTextureCube(b,0):b.isData3DTexture?w.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?w.setTexture2DArray(b,0):w.setTexture2D(b,0),de.unbindTexture()},this.resetState=function(){R=0,T=0,A=null,de.reset(),Ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return an}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Sr?"display-p3":"srgb",t.unpackColorSpace=$e.workingColorSpace===xs?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===lt?Un:Go}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Un?lt:on}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Wp extends hl{}Wp.prototype.isWebGL1Renderer=!0;class Rr{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new be(e),this.near=t,this.far=n}clone(){return new Rr(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Xp extends gt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class qp extends Ct{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Zt extends Bt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],m=[];let g=0;const _=[],p=n/2;let d=0;S(),a===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new rt(u,3)),this.setAttribute("normal",new rt(f,3)),this.setAttribute("uv",new rt(m,2));function S(){const y=new L,R=new L;let T=0;const A=(t-e)/n;for(let F=0;F<=r;F++){const v=[],E=F/r,k=E*(t-e)+e;for(let H=0;H<=s;H++){const ee=H/s,P=ee*l+o,z=Math.sin(P),V=Math.cos(P);R.x=k*z,R.y=-E*n+p,R.z=k*V,u.push(R.x,R.y,R.z),y.set(z,A,V).normalize(),f.push(y.x,y.y,y.z),m.push(ee,1-E),v.push(g++)}_.push(v)}for(let F=0;F<s;F++)for(let v=0;v<r;v++){const E=_[v][F],k=_[v+1][F],H=_[v+1][F+1],ee=_[v][F+1];h.push(E,k,ee),h.push(k,H,ee),T+=6}c.addGroup(d,T,0),d+=T}function x(y){const R=g,T=new Ge,A=new L;let F=0;const v=y===!0?e:t,E=y===!0?1:-1;for(let H=1;H<=s;H++)u.push(0,p*E,0),f.push(0,E,0),m.push(.5,.5),g++;const k=g;for(let H=0;H<=s;H++){const P=H/s*l+o,z=Math.cos(P),V=Math.sin(P);A.x=v*V,A.y=p*E,A.z=v*z,u.push(A.x,A.y,A.z),f.push(0,E,0),T.x=z*.5+.5,T.y=V*.5*E+.5,m.push(T.x,T.y),g++}for(let H=0;H<s;H++){const ee=R+H,P=k+H;y===!0?h.push(P,P+1,ee):h.push(P+1,P,ee),F+=3}c.addGroup(d,F,y===!0?1:2),d+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class ri extends Zt{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new ri(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Li extends Bt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),c(n),h(),this.setAttribute("position",new rt(r,3)),this.setAttribute("normal",new rt(r.slice(),3)),this.setAttribute("uv",new rt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(S){const x=new L,y=new L,R=new L;for(let T=0;T<t.length;T+=3)m(t[T+0],x),m(t[T+1],y),m(t[T+2],R),l(x,y,R,S)}function l(S,x,y,R){const T=R+1,A=[];for(let F=0;F<=T;F++){A[F]=[];const v=S.clone().lerp(y,F/T),E=x.clone().lerp(y,F/T),k=T-F;for(let H=0;H<=k;H++)H===0&&F===T?A[F][H]=v:A[F][H]=v.clone().lerp(E,H/k)}for(let F=0;F<T;F++)for(let v=0;v<2*(T-F)-1;v++){const E=Math.floor(v/2);v%2===0?(f(A[F][E+1]),f(A[F+1][E]),f(A[F][E])):(f(A[F][E+1]),f(A[F+1][E+1]),f(A[F+1][E]))}}function c(S){const x=new L;for(let y=0;y<r.length;y+=3)x.x=r[y+0],x.y=r[y+1],x.z=r[y+2],x.normalize().multiplyScalar(S),r[y+0]=x.x,r[y+1]=x.y,r[y+2]=x.z}function h(){const S=new L;for(let x=0;x<r.length;x+=3){S.x=r[x+0],S.y=r[x+1],S.z=r[x+2];const y=p(S)/2/Math.PI+.5,R=d(S)/Math.PI+.5;a.push(y,1-R)}g(),u()}function u(){for(let S=0;S<a.length;S+=6){const x=a[S+0],y=a[S+2],R=a[S+4],T=Math.max(x,y,R),A=Math.min(x,y,R);T>.9&&A<.1&&(x<.2&&(a[S+0]+=1),y<.2&&(a[S+2]+=1),R<.2&&(a[S+4]+=1))}}function f(S){r.push(S.x,S.y,S.z)}function m(S,x){const y=S*3;x.x=e[y+0],x.y=e[y+1],x.z=e[y+2]}function g(){const S=new L,x=new L,y=new L,R=new L,T=new Ge,A=new Ge,F=new Ge;for(let v=0,E=0;v<r.length;v+=9,E+=6){S.set(r[v+0],r[v+1],r[v+2]),x.set(r[v+3],r[v+4],r[v+5]),y.set(r[v+6],r[v+7],r[v+8]),T.set(a[E+0],a[E+1]),A.set(a[E+2],a[E+3]),F.set(a[E+4],a[E+5]),R.copy(S).add(x).add(y).divideScalar(3);const k=p(R);_(T,E+0,S,k),_(A,E+2,x,k),_(F,E+4,y,k)}}function _(S,x,y,R){R<0&&S.x===1&&(a[x]=S.x-1),y.x===0&&y.z===0&&(a[x]=R/2/Math.PI+.5)}function p(S){return Math.atan2(S.z,-S.x)}function d(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Li(e.vertices,e.indices,e.radius,e.details)}}class Cr extends Li{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Cr(e.radius,e.detail)}}class Ss extends Li{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ss(e.radius,e.detail)}}class Pr extends Li{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],s=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,s,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Pr(e.radius,e.detail)}}class ci extends Bt{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],h=[];let u=e;const f=(t-e)/s,m=new L,g=new Ge;for(let _=0;_<=s;_++){for(let p=0;p<=n;p++){const d=r+p/n*a;m.x=u*Math.cos(d),m.y=u*Math.sin(d),l.push(m.x,m.y,m.z),c.push(0,0,1),g.x=(m.x/t+1)/2,g.y=(m.y/t+1)/2,h.push(g.x,g.y)}u+=f}for(let _=0;_<s;_++){const p=_*(n+1);for(let d=0;d<n;d++){const S=d+p,x=S,y=S+n+1,R=S+n+2,T=S+1;o.push(x,y,T),o.push(y,R,T)}}this.setIndex(o),this.setAttribute("position",new rt(l,3)),this.setAttribute("normal",new rt(c,3)),this.setAttribute("uv",new rt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ci(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ut extends Bt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new L,f=new L,m=[],g=[],_=[],p=[];for(let d=0;d<=n;d++){const S=[],x=d/n;let y=0;d===0&&a===0?y=.5/t:d===n&&l===Math.PI&&(y=-.5/t);for(let R=0;R<=t;R++){const T=R/t;u.x=-e*Math.cos(s+T*r)*Math.sin(a+x*o),u.y=e*Math.cos(a+x*o),u.z=e*Math.sin(s+T*r)*Math.sin(a+x*o),g.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),p.push(T+y,1-x),S.push(c++)}h.push(S)}for(let d=0;d<n;d++)for(let S=0;S<t;S++){const x=h[d][S+1],y=h[d][S],R=h[d+1][S],T=h[d+1][S+1];(d!==0||a>0)&&m.push(x,y,T),(d!==n-1||l<Math.PI)&&m.push(y,R,T)}this.setIndex(m),this.setAttribute("position",new rt(g,3)),this.setAttribute("normal",new rt(_,3)),this.setAttribute("uv",new rt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ut(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Lr extends Bt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const a=[],o=[],l=[],c=[],h=new L,u=new L,f=new L;for(let m=0;m<=n;m++)for(let g=0;g<=s;g++){const _=g/s*r,p=m/n*Math.PI*2;u.x=(e+t*Math.cos(p))*Math.cos(_),u.y=(e+t*Math.cos(p))*Math.sin(_),u.z=t*Math.sin(p),o.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),f.subVectors(u,h).normalize(),l.push(f.x,f.y,f.z),c.push(g/s),c.push(m/n)}for(let m=1;m<=n;m++)for(let g=1;g<=s;g++){const _=(s+1)*m+g-1,p=(s+1)*(m-1)+g-1,d=(s+1)*(m-1)+g,S=(s+1)*m+g;a.push(_,p,S),a.push(p,d,S)}this.setIndex(a),this.setAttribute("position",new rt(o,3)),this.setAttribute("normal",new rt(l,3)),this.setAttribute("uv",new rt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lr(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class nt extends Pi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Vo,this.normalScale=new Ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Mr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ul extends gt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new be(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class $p extends ul{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new be(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const sr=new ct,co=new L,ho=new L;class Yp{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ge(512,512),this.map=null,this.mapPass=null,this.matrix=new ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Tr,this._frameExtents=new Ge(1,1),this._viewportCount=1,this._viewports=[new mt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;co.setFromMatrixPosition(e.matrixWorld),t.position.copy(co),ho.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ho),t.updateMatrixWorld(),sr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(sr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class jp extends Yp{constructor(){super(new il(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Kp extends ul{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(gt.DEFAULT_UP),this.updateMatrix(),this.target=new gt,this.shadow=new jp}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Zp{constructor(e,t,n=0,s=1/0){this.ray=new jo(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new wr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return mr(e,this,n,t),n.sort(uo),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)mr(e[s],this,n,t);return n.sort(uo),n}}function uo(i,e){return i.distance-e.distance}function mr(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){const s=i.children;for(let r=0,a=s.length;r<a;r++)mr(s[r],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:vr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=vr);const X={meta:{title:"HERO X",subtitle:"모험의 던전",version:"0.6.2"},controls:{up:["KeyW","ArrowUp"],down:["KeyS","ArrowDown"],left:["KeyA","ArrowLeft"],right:["KeyD","ArrowRight"],attackMelee:["Mouse0","KeyJ"],attackRanged:["Mouse2","KeyK"],jump:["Space"],restart:["KeyR"],toggleGuide:["KeyH"],toggleInventory:["KeyI","Tab"],interact:["KeyE","KeyF"]},player:{maxHp:100,invulnerableTime:.6,hitKnockback:6,moveSpeed:7,attackMoveFactor:.6,jumpSpeed:8,gravity:24,turnSpeed:14,radius:.5,startPosition:{x:0,z:0},colors:{body:"#2f6df6",accent:"#ffc531",skin:"#f3c6a0",visor:"#5cf2d8"}},combat:{autoAimRange:14,melee:{damage:12,range:1.9,arcDegrees:110,cooldown:.45,knockback:7,swingTime:.22},ranged:{damage:8,speed:22,cooldown:.5,lifetime:1.6,radius:.18,knockback:3}},enemies:{types:{rusher:{name:"돌진 로봇",hp:30,speed:4.2,radius:.55,damage:10,attackRange:1.5,attackWindup:.35,attackCooldown:1.3,aggroRange:20,color:"#ff7a45",score:10},shooter:{name:"포격 드론",hp:20,speed:3.2,radius:.5,damage:8,attackRange:9,attackWindup:.5,attackCooldown:2.2,aggroRange:22,color:"#b06bff",score:15,attackKind:"ranged",retreatRange:4.5,projectileSpeed:11},tank:{name:"철벽 로봇",hp:90,speed:1.9,radius:.9,damage:18,attackRange:2,attackWindup:.6,attackCooldown:2,aggroRange:16,color:"#5b7bd6",score:30,knockbackResist:.25},stalker:{name:"박쥐 드론",hp:18,speed:7.5,radius:.45,damage:7,attackRange:1.3,attackWindup:.25,attackCooldown:.9,aggroRange:16,color:"#8e6cff",score:14,attackKind:"melee",model:"shooter"},artillery:{name:"요새 포대",hp:70,speed:1.6,radius:.8,damage:16,attackRange:13,attackWindup:.9,attackCooldown:2.2,aggroRange:18,color:"#c0392b",score:40,attackKind:"ranged",retreatRange:5,projectileSpeed:12,knockbackResist:.4,model:"tank"}},spawns:[{type:"rusher",x:12,z:-12},{type:"rusher",x:-14,z:-6},{type:"rusher",x:16,z:6},{type:"rusher",x:-10,z:16},{type:"rusher",x:4,z:20},{type:"rusher",x:-20,z:-18},{type:"shooter",x:18,z:-2},{type:"shooter",x:-6,z:-22},{type:"shooter",x:20,z:18},{type:"tank",x:-22,z:12},{type:"tank",x:10,z:-22}],separation:2.5,deathDuration:.6},camera:{fov:50,offset:{x:0,y:13,z:11},lookAtHeight:1,smoothing:6,near:.1,far:300},world:{arenaHalfSize:28,floorColor:"#79b85a",floorAltColor:"#6fae50",wallHeight:1.2,wallColor:"#a6773f",backgroundColor:"#8ec9ff",fogNear:40,fogFar:90,obstacles:[{x:6,z:-4,w:2,d:2,h:2,color:"#d9a066"},{x:8.2,z:-4,w:2,d:2,h:2,color:"#d9a066"},{x:7,z:-6.2,w:2,d:2,h:1.4,color:"#e0ad6c"},{x:-8,z:-8,w:1.2,d:1.2,h:4,color:"#9aa3b2"},{x:-8,z:8,w:1.2,d:1.2,h:4,color:"#9aa3b2"},{x:8,z:8,w:1.2,d:1.2,h:4,color:"#9aa3b2"},{x:0,z:-14,w:10,d:1,h:1.6,color:"#a6773f"},{x:-16,z:2,w:1,d:8,h:1.6,color:"#a6773f"},{x:14,z:14,w:3,d:3,h:2.5,color:"#7f8795"},{x:-14,z:-16,w:2.5,d:2.5,h:2,color:"#7f8795"}]},graphics:{shadows:!0,maxPixelRatio:2,antialias:!0,shadowMapSize:2048},difficulty:{default:"normal",presets:{easy:{label:"쉬움",enemyHp:.8,enemyDamage:.7,enemySpeed:.9},normal:{label:"보통",enemyHp:1.15,enemyDamage:1.1,enemySpeed:1},hard:{label:"어려움",enemyHp:1.6,enemyDamage:1.6,enemySpeed:1.15}}},loot:{healChance:.25,healAmount:25,goldChance:.6,goldMin:3,goldMax:12,xpPerScore:1,lifetime:20,magnetRange:3.5,magnetSpeed:6,pickupRadius:.9},dungeon:{name:"잊혀진 숲",chests:[{x:-22,z:-4},{x:12,z:2},{x:-4,z:24}],chestLoot:{goldMin:15,goldMax:40,equipChance:.8,healChance:.5,interactRange:2.2}},boss:{name:"숲의 수호 로봇",hp:420,speed:2.8,radius:1.6,color:"#3f8f5f",score:300,knockbackResist:.1,spawn:{x:0,z:-20},contactDamage:22,engageRange:11,chargeMinRange:5,windup:{charge:.8,slam:.7,barrage:.6,summon:.9,mortar:.8},closePatterns:["slam","barrage"],useCharge:!0,model:"guardian",chargeDuration:.55,recover:.7,cooldown:1.3,phase2Ratio:.5,phase2TimeMul:.7,phase2SpeedMul:1.3,charge:{speed:18},slam:{radius:4.5,damage:26},barrage:{count:8,phase2Count:12,damage:10,speed:9},summon:{type:"stalker",count:2,phase2Count:3,maxAlive:4},mortar:{count:3,phase2Count:5,delay:1.1,radius:2.4,damage:18,spread:3.5},reward:{goldMin:80,goldMax:150,xp:120,equipMinRarity:"rare"}},equipment:{dropChance:.3,inventorySize:20,defenseScale:50,rarities:{common:{label:"일반",prefix:"",statMul:1,weight:55,color:"#cdd6f4"},uncommon:{label:"고급",prefix:"튼튼한",statMul:1.3,weight:25,color:"#7dffb0"},rare:{label:"희귀",prefix:"희귀한",statMul:1.7,weight:13,color:"#5b8dff"},epic:{label:"영웅",prefix:"영웅의",statMul:2.2,weight:5,color:"#c77dff"},legendary:{label:"전설",prefix:"전설의",statMul:3,weight:2,color:"#ffc531"}}},progression:{xpBase:40,xpGrowth:1.35,hpPerLevel:10,damagePerLevel:.08,maxLevel:30,levelUpHealRatio:.5},hud:{showDamageNumbers:!0},save:{autoSaveInterval:3},debug:{showFps:!0}},Jp={"player.maxHp":{min:1,max:9999},"player.invulnerableTime":{min:0,max:5},"player.hitKnockback":{min:0,max:50},"player.moveSpeed":{min:1,max:30},"player.attackMoveFactor":{min:0,max:1},"player.jumpSpeed":{min:1,max:30},"player.gravity":{min:1,max:100},"combat.autoAimRange":{min:2,max:60},"boss.summon.count":{min:0,max:10},"boss.summon.maxAlive":{min:0,max:20},"boss.mortar.count":{min:0,max:20},"boss.mortar.delay":{min:.3,max:5},"boss.mortar.radius":{min:.5,max:10},"boss.mortar.damage":{min:0,max:999},"combat.ranged.damage":{min:1,max:9999},"combat.ranged.speed":{min:1,max:100},"combat.ranged.cooldown":{min:.05,max:5},"combat.ranged.lifetime":{min:.1,max:10},"combat.ranged.radius":{min:.05,max:2},"combat.ranged.knockback":{min:0,max:50},"player.turnSpeed":{min:1,max:40},"player.radius":{min:.2,max:2},"combat.melee.damage":{min:1,max:9999},"combat.melee.range":{min:.5,max:10},"combat.melee.arcDegrees":{min:10,max:360},"combat.melee.cooldown":{min:.05,max:5},"combat.melee.knockback":{min:0,max:50},"combat.melee.swingTime":{min:.05,max:2},"enemies.separation":{min:0,max:20},"loot.healChance":{min:0,max:1},"loot.healAmount":{min:1,max:9999},"loot.goldChance":{min:0,max:1},"loot.goldMin":{min:0,max:99999},"loot.goldMax":{min:0,max:99999},"loot.xpPerScore":{min:.1,max:100},"loot.lifetime":{min:1,max:600},"loot.magnetRange":{min:0,max:30},"loot.magnetSpeed":{min:0,max:50},"loot.pickupRadius":{min:.2,max:5},"dungeon.chestLoot.goldMin":{min:0,max:99999},"dungeon.chestLoot.goldMax":{min:0,max:99999},"dungeon.chestLoot.equipChance":{min:0,max:1},"dungeon.chestLoot.healChance":{min:0,max:1},"dungeon.chestLoot.interactRange":{min:.5,max:10},"boss.hp":{min:1,max:99999},"boss.speed":{min:0,max:30},"boss.radius":{min:.5,max:6},"boss.contactDamage":{min:0,max:9999},"boss.engageRange":{min:1,max:60},"boss.chargeMinRange":{min:0,max:60},"boss.chargeDuration":{min:.1,max:5},"boss.recover":{min:0,max:5},"boss.cooldown":{min:0,max:10},"boss.phase2Ratio":{min:0,max:1},"boss.phase2TimeMul":{min:.2,max:1},"boss.phase2SpeedMul":{min:1,max:3},"boss.charge.speed":{min:1,max:60},"boss.slam.radius":{min:.5,max:30},"boss.slam.damage":{min:0,max:9999},"boss.barrage.count":{min:1,max:64},"boss.barrage.phase2Count":{min:1,max:64},"boss.barrage.damage":{min:0,max:9999},"boss.barrage.speed":{min:1,max:60},"equipment.dropChance":{min:0,max:1},"equipment.inventorySize":{min:1,max:200},"equipment.defenseScale":{min:1,max:1e3},"progression.xpBase":{min:1,max:99999},"progression.xpGrowth":{min:1,max:3},"progression.hpPerLevel":{min:0,max:1e3},"progression.damagePerLevel":{min:0,max:1},"progression.maxLevel":{min:1,max:999},"save.autoSaveInterval":{min:.5,max:600},"progression.levelUpHealRatio":{min:0,max:1},"enemies.deathDuration":{min:0,max:5},"camera.fov":{min:30,max:90},"camera.offset.y":{min:3,max:40},"camera.offset.z":{min:0,max:40},"camera.smoothing":{min:.5,max:30},"world.arenaHalfSize":{min:10,max:200},"graphics.maxPixelRatio":{min:1,max:3}},Qp={hp:{min:1,max:99999},speed:{min:0,max:30},radius:{min:.2,max:5},damage:{min:0,max:9999},attackRange:{min:.3,max:30},attackWindup:{min:0,max:5},attackCooldown:{min:.1,max:20},aggroRange:{min:1,max:200},score:{min:0,max:99999}},rr=(i,e,t)=>typeof i=="number"&&!Number.isNaN(i)?Math.min(t,Math.max(e,i)):e;function em(i){const e=[];for(const[t,{min:n,max:s}]of Object.entries(Jp)){const r=t.split(".");let a=i;for(let h=0;h<r.length-1;h++)a=a?.[r[h]];const o=r[r.length-1];if(!a||typeof a!="object")continue;const l=a[o],c=rr(l,n,s);c!==l&&(a[o]=c,e.push({path:t,from:typeof l=="number"?l:NaN,to:c}))}for(const[t,n]of Object.entries(i.difficulty.presets))for(const s of["enemyHp","enemyDamage","enemySpeed"]){const r=n[s],a=rr(r,.1,5);a!==r&&(n[s]=a,e.push({path:`difficulty.presets.${t}.${s}`,from:typeof r=="number"?r:NaN,to:a}))}for(const[t,n]of Object.entries(i.enemies.types))for(const[s,{min:r,max:a}]of Object.entries(Qp)){const o=s,l=n[o],c=rr(l,r,a);c!==l&&(n[o]=c,e.push({path:`enemies.types.${t}.${s}`,from:typeof l=="number"?l:NaN,to:c}))}return e}const zn=(i,e,t)=>Math.max(e,Math.min(t,i));function tm(i,e=0){const t=Math.hypot(i.x,i.z);if(t<1e-6)return{x:0,z:0};const n=i.x/t,s=i.z/t,r=Math.cos(e),a=Math.sin(e);return{x:n*r+s*a,z:-n*a+s*r}}function Dr(i,e,t){const n={x:i.x,z:i.z};for(const s of t){const r=s.w/2,a=s.d/2,o=zn(n.x,s.x-r,s.x+r),l=zn(n.z,s.z-a,s.z+a),c=n.x-o,h=n.z-l,u=c*c+h*h;if(!(u>=e*e))if(u<1e-9){const f=r+e-Math.abs(n.x-s.x),m=a+e-Math.abs(n.z-s.z);f<m?n.x+=Math.sign(n.x-s.x||1)*f:n.z+=Math.sign(n.z-s.z||1)*m}else{const f=Math.sqrt(u);n.x=o+c/f*e,n.z=l+h/f*e}}return n}function Ur(i,e,t){const n=Math.max(0,e-t);return{x:zn(i.x,-n,n),z:zn(i.z,-n,n)}}function Ir(i,e,t){let n=(e-i)%(Math.PI*2);return n>Math.PI&&(n-=Math.PI*2),n<-Math.PI&&(n+=Math.PI*2),i+n*zn(t,0,1)}function bs(i){return Math.atan2(i.x,i.z)}function nm(i,e,t,n){if(Math.abs(i.x)>n||Math.abs(i.z)>n)return!0;for(const s of t){const r=zn(i.x,s.x-s.w/2,s.x+s.w/2),a=zn(i.z,s.z-s.d/2,s.z+s.d/2);if((i.x-r)**2+(i.z-a)**2<e*e)return!0}return!1}function im(i,e,t){let n=i.vy-t*e,s=i.y+n*e;return s<=0&&(s=0,n=0),{y:s,vy:n}}function sm(i,e,t,n,s,r){const a=t.x-i.x,o=t.z-i.z,l=Math.hypot(a,o);if(l-n>s)return!1;if(l<1e-6)return!0;let h=Math.atan2(a,o)-e;for(;h>Math.PI;)h-=Math.PI*2;for(;h<-Math.PI;)h+=Math.PI*2;const u=Math.atan2(n,l),f=r*Math.PI/180/2;return Math.abs(h)<=f+u}class rm{constructor(e,t,n,s,r,a,o=()=>{},l=()=>1,c=()=>0){this.player=e,this.input=t,this.getEnemies=n,this.getAimPoint=s,this.effects=r,this.projectiles=a,this.onEnemyDamaged=o,this.getDamageMultiplier=l,this.getWeaponAttack=c,this.kills=0,this.score=0,this.meleeCooldown=0,this.rangedCooldown=0,this.tmp=new L}reset(){this.kills=0,this.score=0,this.meleeCooldown=0,this.rangedCooldown=0}update(e){if(this.meleeCooldown>0&&(this.meleeCooldown-=e),this.rangedCooldown>0&&(this.rangedCooldown-=e),this.player.health.isDead)return;const t=X.controls;this.meleeCooldown<=0&&this.input.isActionDown(t.attackMelee)?this.meleeAttack():this.rangedCooldown<=0&&this.input.isActionDown(t.attackRanged)&&this.rangedAttack()}damageEnemy(e,t,n,s){if(!e.alive||!e.hit(t,n,s))return!1;const r=e.position;return this.tmp.set(r.x,.8,r.z),e.alive?this.effects.burst(this.tmp,16777215,5,3):(this.effects.burst(this.tmp,e.def.color,18,7),this.kills++,this.score+=e.def.score),this.onEnemyDamaged(e,t,!e.alive),!0}faceAim(){const e=this.player.position,t=this.getAimPoint();if(t){const n={x:t.x-e.x,z:t.z-e.z};Math.hypot(n.x,n.z)>.25&&(this.player.facing=bs(n))}return{x:Math.sin(this.player.facing),z:Math.cos(this.player.facing)}}meleeAttack(){const e=X.combat.melee;this.meleeCooldown=e.cooldown,this.faceAim();const t=this.player.position;this.player.triggerAttack(e.swingTime),this.effects.swing(t,this.player.facing,e.range,e.arcDegrees,e.swingTime);const n={x:t.x,z:t.z};for(const s of this.getEnemies()){if(!s.alive)continue;const r=s.position;if(!sm(n,this.player.facing,{x:r.x,z:r.z},s.radius,e.range,e.arcDegrees))continue;const a=Math.hypot(r.x-t.x,r.z-t.z)||1;this.damageEnemy(s,Math.round((e.damage+this.getWeaponAttack("melee"))*this.getDamageMultiplier()),{x:(r.x-t.x)/a,z:(r.z-t.z)/a},e.knockback)}}rangedAttack(){const e=X.combat.ranged;this.rangedCooldown=e.cooldown;const t=this.faceAim(),n=this.player.position;this.player.triggerAttack(.15),this.projectiles.spawn({x:n.x+t.x*.7,z:n.z+t.z*.7},t,{damage:Math.round((e.damage+this.getWeaponAttack("ranged"))*this.getDamageMultiplier()),speed:e.speed,lifetime:e.lifetime,radius:e.radius,knockback:e.knockback,color:6091480,friendly:!0})}}class am{constructor(e,t=120){this.root=new Ze,this.swings=[],this.particles=[],this.particleGeo=new We(.16,.16,.16),this.root.name="Effects",e.add(this.root);for(let n=0;n<t;n++){const s=new Se(this.particleGeo,new At({color:16777215}));s.visible=!1,this.root.add(s),this.particles.push({mesh:s,v:new L,life:0,max:1})}}swing(e,t,n,s,r,a=6091480){const o=s*Math.PI/180,l=new ci(.45,n,24,1,Math.PI/2-o/2,o),c=new At({color:a,transparent:!0,opacity:.75,side:zt,depthWrite:!1}),h=new Se(l,c);h.position.set(e.x,.5,e.z),h.rotation.order="YXZ",h.rotation.y=t,h.rotation.x=Math.PI/2,this.root.add(h),this.swings.push({mesh:h,life:r,max:r})}shockwave(e,t,n=.45,s=16732025){const r=new ci(t*.8,t,48),a=new At({color:s,transparent:!0,opacity:.8,side:zt,depthWrite:!1}),o=new Se(r,a);o.position.set(e.x,.08,e.z),o.rotation.x=-Math.PI/2,o.scale.setScalar(.2),this.root.add(o),this.swings.push({mesh:o,life:n,max:n,grow:!0})}marker(e,t,n,s=16742981){const r=new ci(t*.7,t,40),a=new At({color:s,transparent:!0,opacity:.2,side:zt,depthWrite:!1}),o=new Se(r,a);o.position.set(e.x,.07,e.z),o.rotation.x=-Math.PI/2,this.root.add(o),this.swings.push({mesh:o,life:n,max:n,grow:!1,warn:!0})}burst(e,t,n=8,s=5){let r=0;for(const a of this.particles)if(!(a.life>0)&&(a.mesh.visible=!0,a.mesh.position.copy(e),a.mesh.material.color.set(t),a.v.set(Math.random()-.5,Math.random()*.8+.3,Math.random()-.5).normalize().multiplyScalar(s*(.5+Math.random()*.5)),a.life=a.max=.4+Math.random()*.4,a.mesh.scale.setScalar(.6+Math.random()*.8),++r>=n))break}update(e){for(let t=this.swings.length-1;t>=0;t--){const n=this.swings[t];n.life-=e;const s=Math.max(0,n.life/n.max);n.warn?(n.mesh.material.opacity=.25+(1-s)*.6*(.7+.3*Math.sin(n.life*25)),n.mesh.scale.setScalar(1)):(n.mesh.material.opacity=.75*s,n.mesh.scale.setScalar(n.grow?.2+(1-s)*.8:1+(1-s)*.15)),n.life<=0&&(this.root.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material.dispose(),this.swings.splice(t,1))}for(const t of this.particles)t.life<=0||(t.life-=e,t.v.y-=16*e,t.mesh.position.addScaledVector(t.v,e),t.mesh.position.y<.08&&(t.mesh.position.y=.08,t.v.y*=-.3,t.v.x*=.7,t.v.z*=.7),t.mesh.rotation.x+=e*6,t.mesh.rotation.z+=e*4,t.mesh.scale.setScalar(Math.max(.01,t.life/t.max)*1.2),t.life<=0&&(t.mesh.visible=!1))}dispose(){this.root.removeFromParent(),this.particleGeo.dispose(),this.particles.forEach(e=>e.mesh.material.dispose()),this.swings.forEach(e=>{e.mesh.geometry.dispose(),e.mesh.material.dispose()})}}const fo=.9,om=1;class lm{constructor(e){this.root=new Ze,this.shots=[],this.geo=new Ut(1,10,8),this.root.name="Projectiles",e.add(this.root)}spawn(e,t,n){const s=new Se(this.geo,new At({color:n.color}));s.position.set(e.x,fo,e.z),s.scale.set(n.radius,n.radius,n.radius*2.2),s.lookAt(e.x+t.x,fo,e.z+t.z),this.root.add(s),this.shots.push({mesh:s,dir:{x:t.x,z:t.z},life:n.lifetime,spec:n})}get count(){return this.shots.length}update(e,t){const n=t.world.getObstacleBoxes(),s=t.world.getArenaHalfSize();for(let r=this.shots.length-1;r>=0;r--){const a=this.shots[r];a.life-=e,a.mesh.position.x+=a.dir.x*a.spec.speed*e,a.mesh.position.z+=a.dir.z*a.spec.speed*e;const o={x:a.mesh.position.x,z:a.mesh.position.z};let l=a.life<=0||nm(o,a.spec.radius,n,s);if(!l&&a.spec.friendly)for(const c of t.enemies){if(!c.alive)continue;const h=c.radius+a.spec.radius;if((c.position.x-o.x)**2+(c.position.z-o.z)**2<h*h){t.onHitEnemy(c,a.spec,a.dir),l=!0;break}}else if(!l&&t.playerY<om){const c=t.playerRadius+a.spec.radius;(t.playerPos.x-o.x)**2+(t.playerPos.z-o.z)**2<c*c&&(t.onHitPlayer(a.spec,a.dir,o),l=!0)}l&&this.remove(r)}}clear(){for(let e=this.shots.length-1;e>=0;e--)this.remove(e)}dispose(){this.clear(),this.geo.dispose(),this.root.removeFromParent()}remove(e){const t=this.shots[e];this.root.remove(t.mesh),t.mesh.material.dispose(),this.shots.splice(e,1)}}class po{constructor(e,t=X.dungeon.chests){this.root=new Ze,this.chests=[],this.bodyGeo=new We(1.2,.7,.8),this.lidGeo=new We(1.24,.3,.84),this.woodMat=new nt({color:11893050}),this.trimMat=new nt({color:16765503}),this.openedMat=new nt({color:7031334}),this.root.name="Chests",e.add(this.root);for(const n of t)this.place(n.x,n.z)}place(e,t){const n=new Ze;n.position.set(e,0,t);const s=new Se(this.bodyGeo,this.woodMat);s.position.y=.35,s.castShadow=!0,s.receiveShadow=!0,n.add(s);const r=new Se(new We(.2,.72,.84),this.trimMat);r.position.y=.35,n.add(r);const a=new Se(this.lidGeo,this.woodMat);a.position.set(0,.15,.42),a.castShadow=!0;const o=new Ze;o.position.set(0,.7,-.42),o.add(a),n.add(o),this.root.add(n),this.chests.push({root:n,lid:a,x:e,z:t,opened:!1,openT:0})}getCollisionBoxes(){return this.chests.map(e=>({x:e.x,z:e.z,w:1.3,d:.9}))}nearest(e,t=X.dungeon.chestLoot.interactRange){let n=null,s=t;for(const r of this.chests){if(r.opened)continue;const a=Math.hypot(r.x-e.x,r.z-e.z);a<s&&(s=a,n=r)}return n}open(e){return e.opened?!1:(e.opened=!0,!0)}get openedCount(){return this.chests.filter(e=>e.opened).length}get total(){return this.chests.length}update(e){for(const t of this.chests){const n=t.opened?1:0;t.openT!==n&&(t.openT+=(n-t.openT)*(1-Math.exp(-8*e)),Math.abs(n-t.openT)<.01&&(t.openT=n),t.lid.parent.rotation.x=-t.openT*1.9,t.opened&&t.openT>.5&&t.lid.material!==this.openedMat&&(t.lid.material=this.openedMat))}}reset(){for(const e of this.chests)e.opened=!1,e.openT=0,e.lid.parent.rotation.x=0,e.lid.material=this.woodMat}dispose(){this.root.removeFromParent(),this.bodyGeo.dispose(),this.lidGeo.dispose(),this.woodMat.dispose(),this.trimMat.dispose(),this.openedMat.dispose()}}class mo{constructor(e,t){this.def=t,this.root=new Ze,this.boxes=[],this.disposables=[];const n=t.theme;this.root.name=`Dungeon-${t.id}`,e.background=new be(n.backgroundColor),e.fog=new Rr(n.backgroundColor,n.fogNear,n.fogFar),this.buildLights(),this.buildFloor(),this.buildWalls(),this.buildObstacles(),e.add(this.root)}buildLights(){const e=X.graphics,t=this.def.theme,n=new $p(new be(t.skyColor),new be(t.groundColor),1.1);this.root.add(n),this.sun=new Kp(new be(t.sunColor),t.sunIntensity),this.sun.castShadow=e.shadows,this.sun.shadow.mapSize.set(e.shadowMapSize,e.shadowMapSize);const s=this.sun.shadow.camera;s.left=-24,s.right=24,s.top=24,s.bottom=-24,s.near=1,s.far=90,s.updateProjectionMatrix(),this.sun.shadow.bias=-6e-4,this.root.add(this.sun,this.sun.target)}buildFloor(){const e=this.def.theme,t=document.createElement("canvas");t.width=t.height=256;const n=t.getContext("2d");if(n){n.fillStyle=e.floorColor,n.fillRect(0,0,256,256),n.fillStyle=e.floorAltColor;for(let o=0;o<8;o++)for(let l=0;l<8;l++)(l+o)%2&&n.fillRect(l*32,o*32,32,32);for(let o=0;o<160;o++)n.fillStyle=Math.random()<.5?e.floorFlecks[0]:e.floorFlecks[1],n.fillRect(Math.random()*256,Math.random()*256,3,6)}const s=new qp(t);s.wrapS=s.wrapT=os;const r=this.def.arenaHalfSize*2+60;s.repeat.set(r/4,r/4),s.colorSpace=lt,s.anisotropy=4;const a=new Se(new Ms(r,r),new nt({map:s}));a.rotation.x=-Math.PI/2,a.receiveShadow=!0,a.name="Floor",this.root.add(a),this.disposables.push(s,a.geometry,a.material)}buildWalls(){const e=this.def.theme,t=this.def.arenaHalfSize,n=new nt({color:new be(e.wallColor)}),s=t*2+1,r=.5,a=new We(s,e.wallHeight,r);this.disposables.push(n,a);const o=[[0,-(t+r/2),0],[0,t+r/2,0],[-(t+r/2),0,Math.PI/2],[t+r/2,0,Math.PI/2]];for(const[l,c,h]of o){const u=new Se(a,n);u.position.set(l,e.wallHeight/2,c),u.rotation.y=h,u.castShadow=!0,u.receiveShadow=!0,this.root.add(u)}}buildObstacles(){for(const e of this.def.obstacles){const t=new We(e.w,e.h,e.d),n=new nt({color:new be(e.color??"#9aa3b2")}),s=new Se(t,n);s.position.set(e.x,e.h/2,e.z),s.castShadow=!0,s.receiveShadow=!0,this.root.add(s),this.boxes.push({x:e.x,z:e.z,w:e.w,d:e.d}),this.disposables.push(t,n)}}setShadows(e){this.sun.castShadow=e}updateLight(e){this.sun.position.set(e.x+12,26,e.z+10),this.sun.target.position.copy(e)}getObstacleBoxes(){return this.boxes}addCollisionBoxes(e){this.boxes.push(...e)}getArenaHalfSize(){return this.def.arenaHalfSize}dispose(){this.root.removeFromParent(),this.disposables.forEach(e=>e.dispose())}}const cm={backgroundColor:X.world.backgroundColor,fogNear:X.world.fogNear,fogFar:X.world.fogFar,floorColor:X.world.floorColor,floorAltColor:X.world.floorAltColor,floorFlecks:["#8bd268","#66ad48"],wallColor:X.world.wallColor,wallHeight:X.world.wallHeight,skyColor:"#dcefff",groundColor:"#5f8f3a",sunColor:"#fff4de",sunIntensity:2.2},$t=[{id:"forest",name:X.dungeon.name,subtitle:"햇살이 드는 숲. 로봇 3종과 숲의 수호 로봇.",recommendedLevel:1,arenaHalfSize:X.world.arenaHalfSize,theme:cm,obstacles:X.world.obstacles,chests:X.dungeon.chests,spawns:X.enemies.spawns,boss:{},rewardMul:{gold:1,xp:1}},{id:"cave",name:"수정 동굴",subtitle:"어둡고 좁은 동굴. 빠른 박쥐 드론이 떼로 덤빈다.",recommendedLevel:4,requiresClear:"forest",arenaHalfSize:24,theme:{backgroundColor:"#161a33",fogNear:16,fogFar:52,floorColor:"#3b4070",floorAltColor:"#343a64",floorFlecks:["#7fe3ff","#b48cff"],wallColor:"#4a3f7a",wallHeight:2.4,skyColor:"#6f7fd6",groundColor:"#1f2340",sunColor:"#c9d6ff",sunIntensity:1.5},obstacles:[{x:7,z:-7,w:1.4,d:1.4,h:5,color:"#8fe8ff"},{x:-9,z:-5,w:1.6,d:1.6,h:6,color:"#c7a2ff"},{x:10,z:8,w:1.4,d:1.4,h:4.5,color:"#8fe8ff"},{x:-11,z:10,w:1.8,d:1.8,h:5.5,color:"#c7a2ff"},{x:2,z:14,w:1.2,d:1.2,h:4,color:"#8fe8ff"},{x:-4,z:-14,w:4,d:2.2,h:2.2,color:"#5a5f8c"},{x:16,z:-2,w:2.6,d:4,h:2.6,color:"#5a5f8c"},{x:-17,z:2,w:2.4,d:5,h:2.4,color:"#5a5f8c"},{x:6,z:19,w:5,d:2,h:2,color:"#5a5f8c"},{x:0,z:-9,w:7,d:1,h:3,color:"#4a3f7a"},{x:14,z:16,w:1,d:7,h:3,color:"#4a3f7a"}],chests:[{x:-19,z:-16},{x:19,z:12},{x:-2,z:20}],spawns:[{type:"stalker",x:9,z:-13},{type:"stalker",x:-13,z:-11},{type:"stalker",x:15,z:5},{type:"stalker",x:-15,z:14},{type:"stalker",x:4,z:9},{type:"stalker",x:-7,z:16},{type:"shooter",x:18,z:-10},{type:"shooter",x:-18,z:-6},{type:"shooter",x:17,z:18},{type:"shooter",x:-12,z:19},{type:"rusher",x:12,z:0},{type:"rusher",x:-8,z:7},{type:"rusher",x:0,z:-17},{type:"tank",x:-1,z:18}],boss:{name:"수정 골렘",hp:650,color:"#8f6cff",speed:2.6,radius:1.8,score:500,spawn:{x:0,z:-17},contactDamage:24,model:"golem",useCharge:!1,closePatterns:["slam","summon","barrage"],engageRange:9,windup:{slam:.9,barrage:.7,summon:1},slam:{radius:5.5,damage:30},barrage:{count:10,phase2Count:14,damage:11,speed:9.5},summon:{type:"stalker",count:2,phase2Count:3,maxAlive:4},phase2SpeedMul:1.4,reward:{goldMin:150,goldMax:240,xp:220,equipMinRarity:"rare"}},rewardMul:{gold:1.3,xp:1.3}},{id:"fortress",name:"강철 요새",subtitle:"붉은 강철 요새. 철벽 로봇과 포대가 길목을 지킨다.",recommendedLevel:8,requiresClear:"cave",arenaHalfSize:30,theme:{backgroundColor:"#2b2d33",fogNear:30,fogFar:84,floorColor:"#5c6069",floorAltColor:"#54585f",floorFlecks:["#7b808a","#b0392f"],wallColor:"#7a2b2b",wallHeight:2.8,skyColor:"#b9bcc6",groundColor:"#3a3c44",sunColor:"#ffd9c7",sunIntensity:1.9},obstacles:[{x:0,z:-8,w:12,d:1.2,h:3,color:"#7a2b2b"},{x:0,z:8,w:12,d:1.2,h:3,color:"#7a2b2b"},{x:-12,z:0,w:1.2,d:10,h:3,color:"#7a2b2b"},{x:12,z:0,w:1.2,d:10,h:3,color:"#7a2b2b"},{x:-20,z:-20,w:3,d:3,h:2,color:"#8d9099"},{x:20,z:-20,w:3,d:3,h:2,color:"#8d9099"},{x:-20,z:20,w:3,d:3,h:2,color:"#8d9099"},{x:20,z:20,w:3,d:3,h:2,color:"#8d9099"},{x:18,z:4,w:4,d:2,h:2.4,color:"#b0392f"},{x:-18,z:-4,w:4,d:2,h:2.4,color:"#b0392f"},{x:6,z:20,w:2,d:4,h:2.4,color:"#c9a227"},{x:-6,z:-20,w:2,d:4,h:2.4,color:"#c9a227"}],chests:[{x:-26,z:0},{x:26,z:0},{x:0,z:26},{x:0,z:-26}],spawns:[{type:"tank",x:0,z:-14},{type:"tank",x:0,z:14},{type:"tank",x:-16,z:0},{type:"tank",x:16,z:0},{type:"artillery",x:-20,z:-16},{type:"artillery",x:20,z:-16},{type:"artillery",x:-20,z:16},{type:"artillery",x:20,z:16},{type:"shooter",x:24,z:-6},{type:"shooter",x:-24,z:6},{type:"shooter",x:8,z:24},{type:"rusher",x:-8,z:-12},{type:"rusher",x:8,z:12},{type:"rusher",x:22,z:10},{type:"rusher",x:-22,z:-10},{type:"stalker",x:10,z:-24},{type:"stalker",x:-10,z:24},{type:"stalker",x:26,z:24}],boss:{name:"요새 사령관",hp:900,color:"#c0392b",speed:3.2,radius:1.7,score:800,spawn:{x:0,z:-22},contactDamage:28,model:"commander",closePatterns:["mortar","barrage","slam","mortar"],windup:{charge:.65,slam:.6,barrage:.5,mortar:.7},mortar:{count:4,phase2Count:6,delay:1,radius:2.6,damage:22,spread:4},charge:{speed:21},slam:{radius:5,damage:34},barrage:{count:12,phase2Count:18,damage:12,speed:11},reward:{goldMin:250,goldMax:400,xp:400,equipMinRarity:"epic"}},rewardMul:{gold:1.6,xp:1.6}}];function gr(i,e){return!i.requiresClear||(e[i.requiresClear]??0)>0}function hm(i){return $t.find(e=>e.requiresClear===i)??null}function go(i){const e=X.boss,t=i.boss;return{...e,...t,spawn:{...e.spawn,...t.spawn??{}},windup:{...e.windup,...t.windup??{}},charge:{...e.charge,...t.charge??{}},slam:{...e.slam,...t.slam??{}},barrage:{...e.barrage,...t.barrage??{}},summon:{...e.summon,...t.summon??{}},mortar:{...e.mortar,...t.mortar??{}},reward:{...e.reward,...t.reward??{}}}}class um{constructor(e,t){this.cb=t,this.el=document.createElement("div"),this.el.className="guide dungeons",this.el.hidden=!0,this.el.innerHTML=`
      <div class="guide-panel dungeons-panel" role="dialog" aria-labelledby="dungeons-title">
        <div class="inv-head"><h2 class="guide-title" id="dungeons-title">던전 선택</h2><button class="btn small" id="dungeons-close" type="button">닫기 (Esc)</button></div>
        <p class="guide-sub">던전을 클리어하면 다음 던전이 열립니다. 레벨·골드·장비는 모든 던전에서 이어집니다.</p>
        <div class="dungeon-list" id="dungeon-list"></div>
      </div>`,e.appendChild(this.el),this.el.querySelector("#dungeons-close")?.addEventListener("click",()=>this.cb.onClose()),this.el.querySelector("#dungeon-list")?.addEventListener("click",n=>{const s=n.target.closest("button[data-dungeon]");if(!s||s.disabled)return;const r=$t.find(a=>a.id===s.dataset.dungeon);r&&this.cb.enter(r)})}get visible(){return!this.el.hidden}refresh(){const e=this.cb.clears(),t=this.cb.level(),n=this.el.querySelector("#dungeon-list");n.innerHTML=$t.map((s,r)=>{const a=gr(s,e),o=e[s.id]??0,l=s.requiresClear?$t.find(u=>u.id===s.requiresClear)?.name??s.requiresClear:"",c=a?o>0?`클리어 ${o}회`:"아직 클리어하지 않음":`잠김 · '${l}' 클리어 필요`,h=t<s.recommendedLevel?` <span class="dungeon-warn">(현재 레벨 ${t}: 어려울 수 있음)</span>`:"";return`<div class="dungeon-card${a?"":" locked"}" data-card="${s.id}">
          <div class="dungeon-index">${r+1}</div>
          <div class="dungeon-text">
            <div class="dungeon-name">${s.name}</div>
            <div class="dungeon-sub">${s.subtitle}</div>
            <div class="dungeon-meta">권장 레벨 ${s.recommendedLevel}${h} · 적 ${s.spawns.length}마리 · 상자 ${s.chests.length}개 · ${c}</div>
          </div>
          <button class="btn${a?"":" secondary"}" type="button" data-dungeon="${s.id}" ${a?"":"disabled"}>${a?"입장":"잠김"}</button>
        </div>`}).join("")}show(){this.refresh(),this.el.hidden=!1}hide(){this.el.hidden=!0}}class dm{constructor(){this.state="idle",this.pattern=null,this.timer=0,this.total=0,this.cooldown=0,this.closeIndex=-1,this.chargeDir={x:0,z:1}}update(e,t,n,s,r){const a=r?s.phase2TimeMul:1,o=n.x-t.x,l=n.z-t.z,c=Math.hypot(o,l),h=c>1e-6?{x:o/c,z:l/c}:{x:0,z:1},u={x:0,z:0};this.cooldown>0&&(this.cooldown=Math.max(0,this.cooldown-e));const f={state:this.state,move:u,execute:null,windupPattern:null,windupProgress:0};switch(this.state){case"dead":return f;case"idle":return this.state="chase",{...f,state:this.state};case"chase":{if(this.cooldown<=0&&c<=s.engageRange){if(c>s.chargeMinRange&&s.useCharge!==!1)this.pattern="charge";else{const m=s.closePatterns&&s.closePatterns.length>0?s.closePatterns:["slam","barrage"];this.closeIndex=(this.closeIndex+1)%m.length,this.pattern=m[this.closeIndex]}return this.state="windup",this.timer=this.total=s.windup[this.pattern]*a,this.chargeDir=h,{...f,state:this.state,windupPattern:this.pattern,windupProgress:0}}return{...f,state:this.state,move:c>2.5?h:u}}case"windup":{this.timer-=e,this.chargeDir=h;const m=this.total>0?1-Math.max(0,this.timer)/this.total:1;if(this.timer>0)return{...f,state:this.state,windupPattern:this.pattern,windupProgress:m};const g=this.pattern;return g==="charge"?(this.state="charge",this.timer=s.chargeDuration,{...f,state:this.state,move:this.chargeDir,execute:"charge"}):(this.state="recover",this.timer=s.recover*a,{...f,state:this.state,execute:g})}case"charge":return this.timer-=e,this.timer>0?{...f,state:this.state,move:this.chargeDir}:(this.state="recover",this.timer=s.recover*a,{...f,state:this.state});case"recover":return this.timer-=e,this.timer>0?{...f,state:this.state}:(this.state="chase",this.cooldown=s.cooldown*a,{...f,state:this.state})}}stopCharge(){this.state==="charge"&&(this.timer=0)}kill(){this.state="dead"}}class dl{constructor(e,t=0){this.maxHp=e,this.invulnerableTime=t,this.invulnerable=0,this.hp=e}get isDead(){return this.hp<=0}get ratio(){return this.maxHp>0?Math.max(0,Math.min(1,this.hp/this.maxHp)):0}takeDamage(e){return this.isDead||this.invulnerable>0||e<=0?!1:(this.hp=Math.max(0,this.hp-e),this.invulnerable=this.invulnerableTime,!0)}heal(e){this.isDead||e<=0||(this.hp=Math.min(this.maxHp,this.hp+e))}reset(e=this.maxHp){this.maxHp=e,this.hp=e,this.invulnerable=0}update(e){this.invulnerable>0&&(this.invulnerable=Math.max(0,this.invulnerable-e))}}class fm{constructor(){this.state="idle",this.cooldown=0,this.windup=0,this.windupTotal=0,this.hurtTimer=0}get windupProgress(){return this.state==="windup"&&this.windupTotal>0?1-this.windup/this.windupTotal:0}update(e,t,n,s){const r=n.x-t.x,a=n.z-t.z,o=Math.hypot(r,a),l=o>1e-6?{x:r/o,z:a/o}:{x:0,z:0};this.cooldown>0&&(this.cooldown=Math.max(0,this.cooldown-e));const c={x:0,z:0},h=s.attackKind==="ranged";switch(this.state){case"dead":return{move:c,attackNow:!1,state:this.state};case"hurt":return this.hurtTimer-=e,this.hurtTimer<=0&&(this.state="chase"),{move:c,attackNow:!1,state:this.state};case"idle":return o<=s.aggroRange&&(this.state="chase"),{move:c,attackNow:!1,state:this.state};case"chase":return o>s.aggroRange*1.5?(this.state="idle",{move:c,attackNow:!1,state:this.state}):h&&s.retreatRange!==void 0&&o<s.retreatRange?{move:{x:-l.x,z:-l.z},attackNow:!1,state:this.state}:o<=s.attackRange&&this.cooldown<=0?(this.state="windup",this.windup=this.windupTotal=s.attackWindup,{move:c,attackNow:!1,state:this.state}):{move:o<=s.attackRange?c:l,attackNow:!1,state:this.state};case"windup":{if(this.windup-=e,this.windup>0)return{move:c,attackNow:!1,state:this.state};this.cooldown=s.attackCooldown,this.state="chase";const u=h?s.attackRange*1.3:s.attackRange+.4;return{move:c,attackNow:o<=u,state:this.state}}}}onHurt(e=.15){this.state!=="dead"&&(this.state="hurt",this.hurtTimer=e)}kill(){this.state="dead"}}function pm(i,e){switch(e.model??i){case"tank":return mm(e);case"shooter":return gm(e);case"rusher":default:return _m(e)}}function mm(i){const e=new Ze;e.name=`Enemy-${i.name}`;const t=i.radius,n=new nt({color:new be(i.color)}),s=new nt({color:2764605}),r=new nt({color:10134450}),a=new At({color:16765503}),o=new Se(new We(t*1.7,t*1.5,t*1.4),n);o.position.y=t*1.1,o.castShadow=!0,e.add(o);for(const f of[-1,1]){const m=new Se(new We(t*.5,t*.6,t*1.7),s);m.position.set(f*t*.85,t*.3,0),m.castShadow=!0,e.add(m);const g=new Se(new Ut(t*.13,8,6),a);g.position.set(f*t*.35,t*1.5,t*.72),e.add(g)}const l=new Ze;l.position.set(0,t*1.7,t*.6);const c=new Se(new We(t*1.9,t*1.6,t*.2),r);c.position.set(0,-t*.7,t*.3),c.castShadow=!0,l.add(c),e.add(l);let h=0,u=Math.random()*10;return{root:e,update(f,m){if(u+=f,m.state==="dead"){const g=Math.max(0,1-m.death);e.scale.setScalar(g),e.position.y=-(1-g)*t,e.rotation.y+=f*6;return}o.position.y=t*1.1+(m.moving?Math.abs(Math.sin(u*8))*.04:0),l.rotation.x=-m.windup*1.3,a.color.setRGB(1,.82-m.windup*.6,.25-m.windup*.2),h>0&&(h-=f,n.emissive.setScalar(h>0?.9:0))},flash(){h=.09,n.emissive.setScalar(.9)},dispose(){e.traverse(f=>{const m=f;if(m.isMesh){m.geometry.dispose();const g=m.material;Array.isArray(g)?g.forEach(_=>_.dispose()):g.dispose()}})}}}function gm(i){const e=new Ze;e.name=`Enemy-${i.name}`;const t=i.radius,n=new nt({color:new be(i.color),flatShading:!0}),s=new nt({color:2764605}),r=new At({color:16733559}),a=new Ze;e.add(a);const o=new Se(new Ss(t*.9,1),n);o.position.y=t*1.6,o.castShadow=!0,a.add(o);const l=new Se(new Lr(t*1.1,t*.12,8,20),s);l.position.y=t*1.6,l.rotation.x=Math.PI/2,a.add(l);const c=new Se(new Zt(t*.16,t*.2,t*1,10),s);c.rotation.x=Math.PI/2,c.position.set(0,t*1.6,t*1.1),a.add(c);const h=new Se(new Ut(t*.2,8,6),r);h.position.set(0,t*1.6,t*1.6),a.add(h);let u=0,f=Math.random()*10;return{root:e,update(m,g){if(f+=m,g.state==="dead"){const _=Math.max(0,1-g.death);e.scale.setScalar(_),e.position.y=-(1-_)*t,e.rotation.y+=m*8;return}a.position.y=Math.sin(f*3)*.08,l.rotation.z+=m*2,h.scale.setScalar(1+g.windup*1.5),r.color.setRGB(1,.33+g.windup*.6,.47+g.windup*.5),u>0&&(u-=m,n.emissive.setScalar(u>0?.9:0))},flash(){u=.09,n.emissive.setScalar(.9)},dispose(){e.traverse(m=>{const g=m;if(g.isMesh){g.geometry.dispose();const _=g.material;Array.isArray(_)?_.forEach(p=>p.dispose()):_.dispose()}})}}}function _m(i){const e=new Ze;e.name=`Enemy-${i.name}`;const t=i.radius,n=new nt({color:new be(i.color)}),s=new nt({color:2764605}),r=new nt({color:16777215}),a=new At({color:1710626}),o=new Se(new We(t*1.6,t*1.4,t*1.6),n);o.position.y=t*1.1,o.castShadow=!0,e.add(o);const l=new Se(new We(t*1.9,t*.5,t*1.9),s);l.position.y=t*.25,l.castShadow=!0,e.add(l);const c=new Se(new Ut(t*.32,12,10),r);c.position.set(0,t*1.35,t*.75),e.add(c);const h=new Se(new Ut(t*.16,10,8),a);h.position.set(0,t*1.35,t*1),e.add(h);const u=new Se(new Zt(.03,.03,t*.8,6),s);u.position.set(0,t*2.1,0),e.add(u);const f=new Se(new Ut(.08,8,6),new At({color:i.color}));f.position.set(0,t*2.5,0),e.add(f);let m=0,g=Math.random()*10;return{root:e,update(_,p){if(g+=_,p.state==="dead"){const S=Math.max(0,1-p.death);e.scale.setScalar(S),e.position.y=-(1-S)*t,e.rotation.y+=_*8;return}o.position.y=t*1.1+(p.moving?Math.abs(Math.sin(g*14))*.06:0);const d=p.windup;h.scale.setScalar(1+d*1.2),h.material.color.setRGB(.1+d*.9,.1,.13),o.rotation.x=-d*.35,m>0&&(m-=_,n.emissive.setScalar(m>0?.9:0))},flash(){m=.09,n.emissive.setScalar(.9)},dispose(){e.traverse(_=>{const p=_;if(p.isMesh){p.geometry.dispose();const d=p.material;Array.isArray(d)?d.forEach(S=>S.dispose()):d.dispose()}})}}}class fl{constructor(e,t,n,s={hp:1,speed:1},r=pm){this.type=e,this.mul=s,this.object3d=new Ze,this.ai=new fm,this.facing=0,this.knock={x:0,z:0},this.deathTimer=0,this.def=t,this.health=new dl(Math.max(1,Math.round(t.hp*s.hp)),0),this.model=r(e,t),this.object3d.name=`Enemy-${e}`,this.object3d.add(this.model.root),this.object3d.position.set(n.x,0,n.z),this.facing=Math.random()*Math.PI*2,this.object3d.rotation.y=this.facing}get position(){return this.object3d.position}get radius(){return this.def.radius}get alive(){return!this.health.isDead}get removable(){return this.health.isDead&&this.deathTimer>=X.enemies.deathDuration}hit(e,t,n){if(!this.health.takeDamage(e))return!1;const s=this.def.knockbackResist??1;return this.knock.x+=t.x*n*s,this.knock.z+=t.z*n*s,this.model.flash(),this.health.isDead?this.ai.kill():this.onHurtEffect(),!0}onHurtEffect(){this.ai.onHurt()}update(e,t){if(this.health.isDead){this.deathTimer+=e,this.model.update(e,{state:"dead",moving:!1,windup:0,death:Math.min(1,this.deathTimer/Math.max(.01,X.enemies.deathDuration))});return}const n=this.object3d.position,s={x:n.x,z:n.z},r=this.ai.update(e,s,t.playerPos,this.def);let a={x:n.x+r.move.x*this.def.speed*this.mul.speed*e+this.knock.x*e,z:n.z+r.move.z*this.def.speed*this.mul.speed*e+this.knock.z*e};const o=Math.exp(-8*e);this.knock.x*=o,this.knock.z*=o;const l=X.enemies.separation;for(const h of t.others){if(h===this||!h.alive)continue;const u=a.x-h.position.x,f=a.z-h.position.z,m=this.radius+h.radius+.2,g=u*u+f*f;if(g<m*m&&g>1e-6){const _=Math.sqrt(g),p=(1-_/m)*l*e;a={x:a.x+u/_*p,z:a.z+f/_*p}}}if(a=Dr(a,this.radius,t.world.getObstacleBoxes()),a=Ur(a,t.world.getArenaHalfSize(),this.radius),n.x=a.x,n.z=a.z,r.state==="chase"||r.state==="windup"){const h=bs({x:t.playerPos.x-n.x,z:t.playerPos.z-n.z});this.facing=Ir(this.facing,h,1-Math.exp(-10*e))}this.object3d.rotation.y=this.facing,r.attackNow&&t.onAttackPlayer(this,this.def.damage);const c=r.move.x!==0||r.move.z!==0;this.model.update(e,{state:r.state,moving:c,windup:this.ai.windupProgress,death:0})}dispose(){this.object3d.removeFromParent(),this.model.dispose()}}function xm(i=X.boss){return{name:i.name,hp:i.hp,speed:i.speed,radius:i.radius,damage:i.contactDamage,attackRange:i.engageRange,attackWindup:i.windup.slam,attackCooldown:i.cooldown,aggroRange:999,color:i.color,score:i.score,knockbackResist:i.knockbackResist}}class vm extends fl{constructor(e,t,n=X.boss){super("boss",xm(n),e,t,(s,r)=>Mm(r,n.model)),this.cfg=n,this.bossAI=new dm,this.chargeHit=!1}get phase2(){return this.health.ratio<=this.cfg.phase2Ratio}hit(e,t,n){const s=super.hit(e,t,n);return s&&this.health.isDead&&this.bossAI.kill(),s}onHurtEffect(){}update(e,t){const n=t;if(this.health.isDead){this.deathTimer+=e,this.model.update(e,{state:"dead",moving:!1,windup:0,death:Math.min(1,this.deathTimer/Math.max(.01,X.enemies.deathDuration))});return}const s=this.cfg,r=this.object3d.position,a={x:r.x,z:r.z},o=this.bossAI.update(e,a,t.playerPos,s,this.phase2),l=this.phase2?s.phase2SpeedMul:1,c=o.state==="charge"?s.charge.speed:this.def.speed*this.mul.speed*l;let h={x:r.x+o.move.x*c*e+this.knock.x*e,z:r.z+o.move.z*c*e+this.knock.z*e};const u=Math.exp(-8*e);this.knock.x*=u,this.knock.z*=u,h=Dr(h,this.radius,t.world.getObstacleBoxes()),h=Ur(h,t.world.getArenaHalfSize(),this.radius),o.state==="charge"&&Math.hypot(h.x-r.x,h.z-r.z)<c*e*.3&&this.bossAI.stopCharge(),r.x=h.x,r.z=h.z;const f=o.state==="charge"?o.move:{x:t.playerPos.x-r.x,z:t.playerPos.z-r.z};(f.x!==0||f.z!==0)&&(this.facing=Ir(this.facing,bs(f),1-Math.exp(-(o.state==="charge"?30:6)*e))),this.object3d.rotation.y=this.facing,o.execute==="charge"&&(this.chargeHit=!1),o.execute==="slam"&&n.onBossAttack(this,{kind:"slam",radius:s.slam.radius,damage:s.slam.damage}),o.execute==="barrage"&&n.onBossAttack(this,{kind:"barrage",count:this.phase2?s.barrage.phase2Count:s.barrage.count,aimed:this.phase2,damage:s.barrage.damage,speed:s.barrage.speed}),o.execute==="summon"&&n.onBossAttack(this,{kind:"summon",type:s.summon.type,count:this.phase2?s.summon.phase2Count:s.summon.count,maxAlive:s.summon.maxAlive}),o.execute==="mortar"&&n.onBossAttack(this,{kind:"mortar",count:this.phase2?s.mortar.phase2Count:s.mortar.count,delay:s.mortar.delay,radius:s.mortar.radius,damage:s.mortar.damage,spread:s.mortar.spread}),o.state==="charge"&&!this.chargeHit&&Math.hypot(t.playerPos.x-r.x,t.playerPos.z-r.z)<this.radius+n.playerRadius&&(this.chargeHit=!0,n.onBossAttack(this,{kind:"contact",damage:s.contactDamage}));const m=o.move.x!==0||o.move.z!==0,g={state:o.state==="windup"?"windup":o.state==="dead"?"dead":"chase",moving:m,windup:o.windupProgress,death:0,pattern:o.windupPattern??(o.state==="charge"?"charge":null),phase2:this.phase2};this.model.update(e,g)}}function Mm(i,e="guardian"){const t=new Ze;t.name=`Boss-${i.name}`;const n=i.radius,s=new nt({color:new be(i.color)}),r=new nt({color:e==="commander"?3816516:2764605}),a=new nt({color:e==="golem"?9431295:e==="commander"?11548975:16765503}),o=new At({color:6091480}),l=new At({color:16777215,transparent:!0,opacity:0}),c=e==="golem"?new Cr(n*.95,0):e==="commander"?new We(n*1.9,n*1.2,n*1.3):new We(n*1.5,n*1.3,n*1.2),h=new Se(c,s);h.position.y=n*1.3,h.castShadow=!0,t.add(h);const u=new Se(new We(n*1.3,n*.6,n*1),r);u.position.y=n*.35,u.castShadow=!0,t.add(u);const f=e==="golem"?new Ss(n*.42,0):new We(n*.8,n*.6,n*.8),m=new Se(f,s);m.position.y=n*2.3,m.castShadow=!0,t.add(m);for(const x of[-1,1]){const y=new Se(new Ut(n*.1,8,6),o);if(y.position.set(x*n*.2,n*2.35,n*.42),t.add(y),e==="golem"){const R=new Se(new ri(n*.22,n*.9,5),a);R.position.set(x*n*.6,n*2.2,-n*.3),R.rotation.z=-x*.5,t.add(R)}else if(e==="commander"){const R=new Se(new Zt(n*.16,n*.2,n*.9,8),r);R.position.set(x*n*.75,n*2.2,n*.2),R.rotation.x=Math.PI/2-.35,t.add(R)}else{const R=new Se(new ri(n*.12,n*.4,5),a);R.position.set(x*n*.25,n*2.75,0),t.add(R)}}if(e==="guardian"){const x=new Se(new ri(n*.16,n*.5,5),a);x.position.y=n*2.85,t.add(x)}if(e==="golem")for(let x=0;x<5;x++){const y=new Se(new ri(n*.12,n*.5+x%2*n*.2,4),a),R=x/5*Math.PI*2;y.position.set(Math.cos(R)*n*.8,n*1.5+Math.sin(x)*n*.2,Math.sin(R)*n*.8),y.rotation.set(Math.sin(R)*.9,0,-Math.cos(R)*.9),t.add(y)}const g=[];for(const x of[-1,1]){const y=new Ze;y.position.set(x*n*(e==="commander"?1.15:.95),n*1.8,0);const R=new Se(new We(n*.3,n*1.1,n*.3),r);R.position.y=-n*.55,R.castShadow=!0,y.add(R);const T=e==="golem"?new Ut(n*.34,8,6):e==="commander"?new Zt(n*.18,n*.24,n*.9,8):new We(n*.55,n*.4,n*.55),A=new Se(T,e==="commander"?r:a);A.position.y=-n*1.2,A.castShadow=!0,y.add(A),t.add(y),g.push(y)}const _=new Se(new ci(n*.9,n*1.1,32),l);_.rotation.x=-Math.PI/2,_.position.y=.06,t.add(_);let p=0,d=0;const S={charge:16742981,slam:16732025,barrage:11561983,summon:9431295,mortar:16757071};return{root:t,update(x,y){const R=y;if(d+=x,R.state==="dead"){const v=Math.max(0,1-R.death);t.scale.setScalar(v),t.position.y=-(1-v)*n,t.rotation.y+=x*3;return}o.color.set(R.phase2?16726843:6091480),h.position.y=n*1.3+(R.moving?Math.abs(Math.sin(d*6))*.08:0);const T=R.windup,A=R.pattern??null;l.opacity=A&&R.state==="windup"?.25+T*.55:A==="charge"?.5:0,A&&l.color.set(S[A]),_.scale.setScalar(A==="slam"?1+T*1.6:1);const F=A==="slam"?-2.6*T:A==="charge"?-1.2:A==="barrage"?-1.6*T:A==="summon"?-3*T:A==="mortar"?-1.4:0;for(const v of g)v.rotation.x+=(F-v.rotation.x)*(1-Math.exp(-12*x));h.rotation.x=A==="charge"?.25:A==="slam"?-.15*T:0,p>0&&(p-=x,s.emissive.setScalar(p>0?.9:0))},flash(){p=.09,s.emissive.setScalar(.9)},dispose(){t.traverse(x=>{const y=x;if(y.isMesh){y.geometry.dispose();const R=y.material;Array.isArray(R)?R.forEach(T=>T.dispose()):R.dispose()}})}}}const ar="[HERO X]",Qe={info(i,...e){console.info(`${ar} ${i}`,...e)},warn(i,...e){console.warn(`${ar} ${i}`,...e)},error(i,...e){console.error(`${ar} ${i}`,...e)}};class ym{constructor(e){this.scene=e,this.enemies=[],this.multipliers={hp:1,speed:1}}spawnFromConfig(e=X.enemies.spawns){for(const t of e){if(!X.enemies.types[t.type]){Qe.warn(`적 종류 '${t.type}' 이(가) GameConfig.enemies.types 에 없어 배치를 건너뜁니다.`);continue}this.spawn(t.type,t.x,t.z)}}spawn(e,t,n){const s=X.enemies.types[e];if(!s)return null;const r=new fl(e,s,{x:t,z:n},{...this.multipliers});return this.scene.add(r.object3d),this.enemies.push(r),r}addEnemy(e){this.scene.add(e.object3d),this.enemies.push(e)}getEnemies(){return this.enemies}get aliveCount(){return this.enemies.reduce((e,t)=>e+(t.alive?1:0),0)}update(e,t){const n={...t,others:this.enemies};for(const s of this.enemies)s.update(e,n);for(let s=this.enemies.length-1;s>=0;s--)this.enemies[s].removable&&(this.enemies[s].dispose(),this.enemies.splice(s,1))}clear(){this.enemies.forEach(e=>e.dispose()),this.enemies.length=0}dispose(){this.clear()}}function _o(i){const e=i;if(!e||!e.tagName)return!1;const t=e.tagName.toUpperCase();return t==="INPUT"||t==="TEXTAREA"||t==="SELECT"||e.isContentEditable===!0}class Sm{constructor(){this.pressed=new Set,this.pressHandlers=new Map,this.pointer={x:0,y:0,has:!1},this.cleanup=[],this.virtualAxis={x:0,z:0}}attach(e=window,t){const n=u=>{_o(u.target)||(u.repeat||this.press(u.code),this.isGameKey(u.code)&&u.preventDefault())},s=u=>{this.pressed.delete(u.code)},r=()=>this.pressed.clear(),a=()=>{document.hidden&&r()},o=u=>{if(u.pointerType==="touch")return;const f=t?t.getBoundingClientRect():{left:0,top:0,width:window.innerWidth,height:window.innerHeight};this.pointer.x=(u.clientX-f.left)/f.width*2-1,this.pointer.y=-((u.clientY-f.top)/f.height)*2+1,this.pointer.has=!0},l=u=>{_o(u.target)||u.pointerType==="touch"||(o(u),this.press(`Mouse${u.button}`))},c=u=>{u.pointerType!=="touch"&&this.pressed.delete(`Mouse${u.button}`)},h=u=>u.preventDefault();e.addEventListener("keydown",n),e.addEventListener("keyup",s),e.addEventListener("blur",r),e.addEventListener("pointermove",o),e.addEventListener("pointerdown",l),e.addEventListener("pointerup",c),e.addEventListener("pointercancel",c),document.addEventListener("visibilitychange",a),t?.addEventListener("contextmenu",h),this.cleanup=[()=>e.removeEventListener("keydown",n),()=>e.removeEventListener("keyup",s),()=>e.removeEventListener("blur",r),()=>e.removeEventListener("pointermove",o),()=>e.removeEventListener("pointerdown",l),()=>e.removeEventListener("pointerup",c),()=>e.removeEventListener("pointercancel",c),()=>document.removeEventListener("visibilitychange",a),()=>t?.removeEventListener("contextmenu",h)]}detach(){this.cleanup.forEach(e=>e()),this.cleanup=[],this.pressed.clear()}onPress(e,t){for(const n of e){const s=this.pressHandlers.get(n)??[];s.push(t),this.pressHandlers.set(n,s)}}isDown(e){return this.pressed.has(e)}isActionDown(e){return e.some(t=>this.pressed.has(t))}getPointer(){return this.pointer}getPressedCodes(){return[...this.pressed]}getMoveAxis(){const e=X.controls,t={x:(this.isActionDown(e.right)?1:0)-(this.isActionDown(e.left)?1:0),z:(this.isActionDown(e.down)?1:0)-(this.isActionDown(e.up)?1:0)};return t.x===0&&t.z===0?{x:this.virtualAxis.x,z:this.virtualAxis.z}:t}setVirtualAxis(e,t){const n=Math.hypot(e,t),s=n>1?1/n:1;this.virtualAxis.x=e*s,this.virtualAxis.z=t*s}pressVirtual(e){!e||this.pressed.has(e)||this.press(e)}releaseVirtual(e){this.pressed.delete(e)}press(e){this.pressed.add(e),this.pressHandlers.get(e)?.forEach(t=>t())}isGameKey(e){return Object.values(X.controls).some(t=>t.includes(e))}}function xo(i,e){try{i.setPointerCapture(e)}catch{}}class bm{constructor(e,t,n,s){this.input=t,this.stickPointer=null,this.stickCenter={x:0,y:0},this.radius=56;const r=X.controls;this.el=document.createElement("div"),this.el.className="touch",this.el.hidden=!0,this.el.innerHTML=`
      <div class="touch-stick" id="touch-stick" aria-label="이동 조이스틱"><div class="touch-knob"></div></div>
      <div class="touch-buttons">
        <button type="button" class="touch-btn touch-melee" data-code="${r.attackMelee[1]??r.attackMelee[0]}" aria-label="근접 공격">근접</button>
        <button type="button" class="touch-btn touch-ranged" data-code="${r.attackRanged[1]??r.attackRanged[0]}" aria-label="원거리 공격">원거리</button>
        <button type="button" class="touch-btn touch-jump" data-code="${r.jump[0]}" aria-label="점프">점프</button>
        <button type="button" class="touch-btn touch-interact" id="touch-interact" data-code="${r.interact[0]}" aria-label="상자 열기" hidden>열기</button>
      </div>
      <div class="rotate-hint">휴대폰을 가로로 돌리면 더 넓게 보입니다</div>
      <div class="touch-top">
        <button type="button" class="touch-small" id="touch-inventory" aria-label="장비">장비</button>
        <button type="button" class="touch-small" id="touch-menu" aria-label="메뉴">메뉴</button>
      </div>`,e.appendChild(this.el),this.stick=this.el.querySelector("#touch-stick"),this.knob=this.stick.querySelector(".touch-knob"),this.interactBtn=this.el.querySelector("#touch-interact"),this.stick.addEventListener("pointerdown",o=>{if(this.stickPointer!==null)return;o.preventDefault(),this.stickPointer=o.pointerId,xo(this.stick,o.pointerId);const l=this.stick.getBoundingClientRect();this.stickCenter={x:l.left+l.width/2,y:l.top+l.height/2},this.moveStick(o.clientX,o.clientY)}),this.stick.addEventListener("pointermove",o=>{o.pointerId===this.stickPointer&&(o.preventDefault(),this.moveStick(o.clientX,o.clientY))});const a=o=>{o.pointerId===this.stickPointer&&(this.stickPointer=null,this.knob.style.transform="translate(0px, 0px)",this.input.setVirtualAxis(0,0))};this.stick.addEventListener("pointerup",a),this.stick.addEventListener("pointercancel",a),this.el.querySelectorAll(".touch-btn").forEach(o=>{const l=o.dataset.code??"",c=u=>{u.preventDefault(),xo(o,u.pointerId),o.classList.add("down"),this.input.pressVirtual(l)},h=()=>{o.classList.remove("down"),this.input.releaseVirtual(l)};o.addEventListener("pointerdown",c),o.addEventListener("pointerup",h),o.addEventListener("pointercancel",h),o.addEventListener("contextmenu",u=>u.preventDefault())}),this.el.querySelector("#touch-menu")?.addEventListener("click",n),this.el.querySelector("#touch-inventory")?.addEventListener("click",s),this.el.addEventListener("contextmenu",o=>o.preventDefault())}moveStick(e,t){let n=e-this.stickCenter.x,s=t-this.stickCenter.y;const r=Math.hypot(n,s);r>this.radius&&(n=n/r*this.radius,s=s/r*this.radius),this.knob.style.transform=`translate(${n}px, ${s}px)`;const a=.15,o=Math.abs(n/this.radius)<a?0:n/this.radius,l=Math.abs(s/this.radius)<a?0:s/this.radius;this.input.setVirtualAxis(o,l)}get visible(){return!this.el.hidden}setInteract(e){this.interactBtn.hidden=!e}show(){this.el.hidden=!1}hide(){this.el.hidden=!0,this.stickPointer=null,this.knob.style.transform="translate(0px, 0px)",this.input.setVirtualAxis(0,0),this.el.querySelectorAll(".touch-btn").forEach(e=>{e.classList.remove("down"),this.input.releaseVirtual(e.dataset.code??"")})}}const kn=["melee","ranged","armor","trinket1","trinket2"],vo={melee:"근접 무기",ranged:"원거리 무기",armor:"방어구",trinket1:"장신구 1",trinket2:"장신구 2"};function pl(i){return i==="trinket"?["trinket1","trinket2"]:[i]}class Em{constructor(){this.inventory=[],this.equipped={melee:null,ranged:null,armor:null,trinket1:null,trinket2:null}}add(e){return this.inventory.length>=X.equipment.inventorySize?!1:(this.inventory.push(e),!0)}get isFull(){return this.inventory.length>=X.equipment.inventorySize}discard(e){const t=this.inventory.findIndex(n=>n.uid===e);return t<0?!1:(this.inventory.splice(t,1),!0)}targetSlot(e){const t=pl(e.category);return t.find(n=>this.equipped[n]===null)??t[0]}equip(e){const t=this.inventory.findIndex(a=>a.uid===e);if(t<0)return null;const n=this.inventory[t],s=this.targetSlot(n);this.inventory.splice(t,1);const r=this.equipped[s];return this.equipped[s]=n,r&&this.inventory.push(r),s}unequip(e){const t=this.equipped[e];return!t||this.isFull?!1:(this.equipped[e]=null,this.inventory.push(t),!0)}totals(){const e={attack:0,defense:0,maxHp:0,moveSpeed:0};for(const t of kn){const n=this.equipped[t];n&&(e.attack+=n.stats.attack,e.defense+=n.stats.defense,e.maxHp+=n.stats.maxHp,e.moveSpeed+=n.stats.moveSpeed)}return e}weaponAttack(e){return this.equipped[e]?.stats.attack??0}compare(e){const t=this.equipped[this.targetSlot(e)];return{attack:e.stats.attack-(t?.stats.attack??0),defense:e.stats.defense-(t?.stats.defense??0),maxHp:e.stats.maxHp-(t?.stats.maxHp??0),moveSpeed:Math.round((e.stats.moveSpeed-(t?.stats.moveSpeed??0))*100)/100}}reset(){this.inventory.length=0;for(const e of kn)this.equipped[e]=null}}function wm(i,e){if(i<=0)return 0;const t=X.equipment.defenseScale;return Math.max(1,Math.round(i*(t/(t+Math.max(0,e)))))}const In=[{id:"sword_basic",name:"에너지 검",category:"melee",base:{attack:4},description:"기본형 에너지 검. 가볍고 다루기 쉽다."},{id:"axe_heavy",name:"플라즈마 도끼",category:"melee",base:{attack:7,moveSpeed:-.05},description:"무겁지만 한 방이 세다. 이동이 조금 느려진다."},{id:"hammer_pulse",name:"펄스 망치",category:"melee",base:{attack:9,moveSpeed:-.1},description:"충격파를 내는 망치. 느리지만 강력하다."},{id:"blaster_basic",name:"소형 블래스터",category:"ranged",base:{attack:3},description:"빠르게 쏠 수 있는 기본 블래스터."},{id:"bow_photon",name:"광자 활",category:"ranged",base:{attack:5},description:"빛의 화살을 쏘는 활."},{id:"cannon_arc",name:"아크 캐논",category:"ranged",base:{attack:8,moveSpeed:-.05},description:"전기를 뿜는 대형 캐논."},{id:"vest_light",name:"경량 조끼",category:"armor",base:{defense:6},description:"움직임을 방해하지 않는 가벼운 방어구."},{id:"plate_steel",name:"강철 갑옷",category:"armor",base:{defense:12,maxHp:10,moveSpeed:-.05},description:"튼튼한 강철판 갑옷."},{id:"suit_nano",name:"나노 슈트",category:"armor",base:{defense:9,moveSpeed:.05},description:"몸에 딱 맞는 첨단 슈트. 조금 더 빨라진다."},{id:"ring_vitality",name:"생명의 반지",category:"trinket",base:{maxHp:20},description:"최대 체력을 늘려 준다."},{id:"boots_wind",name:"바람 신발",category:"trinket",base:{moveSpeed:.12},description:"이동 속도가 빨라진다."},{id:"amulet_power",name:"힘의 목걸이",category:"trinket",base:{attack:2,defense:2},description:"공격과 방어를 조금씩 올려 준다."},{id:"spear_crystal",name:"수정 창",category:"melee",base:{attack:6,moveSpeed:.04},description:"수정 동굴에서 캔 가볍고 날카로운 창."},{id:"rifle_rail",name:"레일 라이플",category:"ranged",base:{attack:10,moveSpeed:-.08},description:"요새 포대의 부품으로 만든 강력한 총. 무겁다."},{id:"cloak_shadow",name:"그림자 망토",category:"armor",base:{defense:7,moveSpeed:.1},description:"얇지만 몸놀림이 빨라지는 망토."},{id:"core_fortress",name:"요새 코어",category:"trinket",base:{defense:6,maxHp:15},description:"요새의 동력 코어. 단단해진다."}],Tm={attack:0,defense:0,maxHp:0,moveSpeed:0};let Am=1;function ps(i,e){const t=X.equipment.rarities[e],n={...Tm};for(const s of Object.keys(n)){const r=i.base[s]??0;n[s]=s==="moveSpeed"?Math.round(r*(r>0?t.statMul:1)*100)/100:Math.round(r*t.statMul)}return{uid:Am++,templateId:i.id,name:t.prefix?`${t.prefix} ${i.name}`:i.name,category:i.category,rarity:e,stats:n,description:i.description}}function ml(i=Math.random){const e=Object.entries(X.equipment.rarities),t=e.reduce((s,[,r])=>s+r.weight,0);let n=i()*t;for(const[s,r]of e)if(n-=r.weight,n<=0)return s;return e[e.length-1][0]}function Mo(i=Math.random){const e=In[Math.min(In.length-1,Math.floor(i()*In.length))];return ps(e,ml(i))}const yo=["common","uncommon","rare","epic","legendary"];function Rm(i,e=Math.random){const t=In[Math.min(In.length-1,Math.floor(e()*In.length))],n=ml(e),s=yo.indexOf(n)>=yo.indexOf(i)?n:i;return ps(t,s)}function ms(i){return In.find(e=>e.id===i)}function Cm(i,e,t=Math.random,n){const s=[];if(s.push({kind:"xp",amount:Math.max(1,Math.round(i*e.xpPerScore))}),t()<e.healChance&&s.push({kind:"heal",amount:e.healAmount}),t()<e.goldChance){const r=Math.max(0,e.goldMax-e.goldMin);s.push({kind:"gold",amount:Math.round(e.goldMin+t()*r)})}return n&&t()<(e.equipChance??0)&&s.push({kind:"equip",amount:0,item:n()}),s}function Pm(i,e=Math.random,t){const n=[],s=Math.max(0,i.goldMax-i.goldMin);return n.push({kind:"gold",amount:Math.round(i.goldMin+e()*s)}),t&&e()<i.equipChance&&n.push({kind:"equip",amount:0,item:t()}),e()<i.healChance&&n.push({kind:"heal",amount:i.healAmount}),n}class Lm{constructor(e){this.root=new Ze,this.pickups=[],this.geos={heal:new We(.42,.42,.42),xp:new Pr(.3,0),gold:new Zt(.26,.26,.1,16),equip:new We(.5,.36,.34)},this.mats={heal:new nt({color:16732025,emissive:5574946}),xp:new nt({color:6091480,emissive:1002052}),gold:new nt({color:16765503,emissive:5061120}),equip:new nt({color:13489908,emissive:3357269})},this.root.name="Loot",e.add(this.root)}dropFor(e,t,n={gold:1,xp:1}){const s=X.loot,r={...s,xpPerScore:s.xpPerScore*n.xp,goldMin:Math.round(s.goldMin*n.gold),goldMax:Math.round(s.goldMax*n.gold),equipChance:X.equipment.dropChance},a=Cm(e,r,Math.random,()=>Mo());return this.scatter(a,t,.6),a}dropChest(e){const t=X.dungeon.chestLoot,n=Pm({...t,healAmount:X.loot.healAmount},Math.random,()=>Mo());return this.scatter(n,e,1.1),n}scatter(e,t,n){e.forEach((s,r)=>{const a=r/e.length*Math.PI*2+Math.random();this.spawn(s,{x:t.x+Math.cos(a)*n,z:t.z+Math.sin(a)*n})})}spawn(e,t){let n=this.mats[e.kind];if(e.kind==="equip"&&e.item){const r=new be(X.equipment.rarities[e.item.rarity].color);n=new nt({color:r,emissive:r.clone().multiplyScalar(.35)})}const s=new Se(this.geos[e.kind],n);s.position.set(t.x,.6,t.z),e.kind==="gold"&&(s.rotation.x=Math.PI/2),s.castShadow=!0,this.root.add(s),this.pickups.push({mesh:s,drop:e,t:Math.random()*6,life:X.loot.lifetime})}get count(){return this.pickups.length}update(e,t,n){const s=X.loot;for(let r=this.pickups.length-1;r>=0;r--){const a=this.pickups[r];a.t+=e,a.life-=e,a.mesh.rotation.y+=e*2.5,a.mesh.position.y=.6+Math.sin(a.t*3)*.12,a.mesh.visible=a.life>3||Math.floor(a.t*8)%2===0;const o=t.x-a.mesh.position.x,l=t.z-a.mesh.position.z,c=Math.hypot(o,l);if(c<s.magnetRange&&c>1e-4){const h=(s.magnetSpeed+(s.magnetRange-c)*2)*e;a.mesh.position.x+=o/c*Math.min(h,c),a.mesh.position.z+=l/c*Math.min(h,c)}if(c<s.pickupRadius){n(a.drop,{x:a.mesh.position.x,z:a.mesh.position.z}),this.remove(r);continue}a.life<=0&&this.remove(r)}}clear(){for(let e=this.pickups.length-1;e>=0;e--)this.remove(e)}dispose(){this.clear(),Object.values(this.geos).forEach(e=>e.dispose()),Object.values(this.mats).forEach(e=>e.dispose()),this.root.removeFromParent()}remove(e){const t=this.pickups[e];this.root.remove(t.mesh),t.drop.kind==="equip"&&t.mesh.material.dispose(),this.pickups.splice(e,1)}}function So(i,e){const t=[],n=(s,r,a,o=!1)=>{if(r===0&&!a)return;const l=h=>o?`${Math.round(h*100)}%`:String(h);let c=`${s} ${r>0?"+":""}${l(r)}`;a!==void 0&&a!==0&&(c+=` <span class="${a>0?"up":"down"}">(${a>0?"▲":"▼"}${l(Math.abs(a))})</span>`),t.push(c)};return n("공격",i.attack,e?.attack),n("방어",i.defense,e?.defense),n("체력",i.maxHp,e?.maxHp),n("속도",i.moveSpeed,e?.moveSpeed,!0),t.join(" · ")||"효과 없음"}class Dm{constructor(e,t,n){this.equipment=t,this.callbacks=n,this.el=document.createElement("div"),this.el.className="guide inv",this.el.hidden=!0,this.el.innerHTML=`
      <div class="guide-panel inv-panel" role="dialog" aria-labelledby="inv-title">
        <div class="inv-head"><h2 class="guide-title" id="inv-title">장비</h2><button class="btn small" id="inv-close" type="button">닫기 (I)</button></div>
        <p class="guide-sub" id="inv-summary"></p>
        <div id="inv-body"></div>
      </div>`,e.appendChild(this.el),this.body=this.el.querySelector("#inv-body"),this.el.querySelector("#inv-close")?.addEventListener("click",()=>this.callbacks.onClose()),this.body.addEventListener("click",s=>{const r=s.target.closest("button[data-action]");if(!r)return;const a=r.dataset.action;a==="equip"?this.equipment.equip(Number(r.dataset.uid)):a==="unequip"?this.equipment.unequip(r.dataset.slot):a==="discard"&&this.equipment.discard(Number(r.dataset.uid)),this.callbacks.onChange(),this.render()})}get visible(){return!this.el.hidden}show(){this.el.hidden=!1,this.render()}hide(){this.el.hidden=!0}render(){const e=this.equipment,t=X.equipment.rarities;this.el.querySelector("#inv-summary").textContent=this.callbacks.getSummary();const n=kn.map(r=>{const a=e.equipped[r];return`<li class="inv-row">
        <span class="inv-slot">${vo[r]}</span>
        ${a?`<span class="inv-name" style="color:${t[a.rarity].color}">${a.name}</span><span class="inv-stats">${So(a.stats)}</span>
          <button class="btn small ghost" type="button" data-action="unequip" data-slot="${r}">해제</button>`:'<span class="inv-empty">비어 있음</span>'}
      </li>`}).join(""),s=e.inventory.length?e.inventory.map(r=>`<li class="inv-row">
          <span class="inv-slot">${vo[e.targetSlot(r)]}</span>
          <span class="inv-name" style="color:${t[r.rarity].color}">${r.name} <small>${t[r.rarity].label}</small></span>
          <span class="inv-stats">${So(r.stats,e.compare(r))}</span>
          <button class="btn small" type="button" data-action="equip" data-uid="${r.uid}">장착</button>
          <button class="btn small ghost" type="button" data-action="discard" data-uid="${r.uid}" title="${r.description}">버리기</button>
        </li>`).join(""):'<li class="inv-empty">가방이 비어 있습니다. 적을 처치하면 장비가 떨어집니다.</li>';this.body.innerHTML=`
      <h3 class="inv-h">장착 중</h3><ul class="inv-list">${n}</ul>
      <h3 class="inv-h">가방 (${e.inventory.length} / ${X.equipment.inventorySize})</h3><ul class="inv-list">${s}</ul>`}}class Um{constructor(){this.level=1,this.xp=0,this.gold=0}get xpToNext(){const e=X.progression;return Math.round(e.xpBase*Math.pow(e.xpGrowth,this.level-1))}get maxHp(){return X.player.maxHp+(this.level-1)*X.progression.hpPerLevel}get damageMultiplier(){return 1+(this.level-1)*X.progression.damagePerLevel}addXp(e){if(e<=0)return 0;this.xp+=e;let t=0;const n=X.progression.maxLevel;for(;this.level<n&&this.xp>=this.xpToNext;)this.xp-=this.xpToNext,this.level++,t++;return this.level>=n&&(this.xp=Math.min(this.xp,this.xpToNext)),t}addGold(e){e>0&&(this.gold+=e)}reset(){this.level=1,this.xp=0,this.gold=0}}class Im{constructor(e,t){this.object3d=new Ze,this.facing=0,this.moving=!1,this.speed=0,this.jumpY=0,this.jumpVy=0,this.attackTimer=0,this.attackDuration=0,this.object3d.name="Player",this.model=e,this.object3d.add(e.root),this.object3d.position.set(t.x,0,t.z),this.health=new dl(X.player.maxHp,X.player.invulnerableTime)}get position(){return this.object3d.position}get attacking(){return this.attackTimer>0}get airborne(){return this.jumpY>0}setModel(e){this.object3d.remove(this.model.root),this.model.dispose(),this.model=e,this.object3d.add(e.root)}triggerAttack(e){this.attackTimer=this.attackDuration=Math.max(.01,e)}reset(e){this.health.reset(X.player.maxHp),this.health.invulnerableTime=X.player.invulnerableTime,this.object3d.position.set(e.x,0,e.z),this.facing=0,this.moving=!1,this.speed=0,this.attackTimer=0,this.jumpY=0,this.jumpVy=0,this.object3d.visible=!0}update(e){this.health.update(e),this.attackTimer>0&&(this.attackTimer-=e),this.object3d.rotation.y=this.facing,this.object3d.position.y=this.jumpY,this.model.update(e,{moving:this.moving,speed:this.speed,attack:this.attackTimer>0?1-this.attackTimer/this.attackDuration:null,airborne:this.airborne,dead:this.health.isDead}),this.object3d.visible=this.health.isDead||this.health.invulnerable<=0||Math.floor(this.health.invulnerable*20)%2===0}dispose(){this.model.dispose()}}class Nm{constructor(e,t,n,s,r=()=>1){this.player=e,this.input=t,this.world=n,this.getCameraYaw=s,this.getSpeedMultiplier=r,this.knock={x:0,z:0},this.jumpQueued=!1,this.input.onPress(X.controls.jump,()=>{this.jumpQueued=!0})}applyKnockback(e,t){this.knock.x+=e.x*t,this.knock.z+=e.z*t}reset(){this.knock.x=0,this.knock.z=0,this.jumpQueued=!1}update(e){const t=X.player,n=this.player.position;if(this.player.health.isDead){this.player.moving=!1,this.player.speed=0;return}if(this.jumpQueued&&!this.player.airborne&&(this.player.jumpVy=t.jumpSpeed,this.player.jumpY=.001),this.jumpQueued=!1,this.player.airborne){const h=im({y:this.player.jumpY,vy:this.player.jumpVy},e,t.gravity);this.player.jumpY=h.y,this.player.jumpVy=h.vy}const s=this.input.getMoveAxis(),r=tm(s,this.getCameraYaw()),a=r.x!==0||r.z!==0,o=t.moveSpeed*this.getSpeedMultiplier()*(this.player.attacking?t.attackMoveFactor:1);let l={x:n.x+r.x*o*e+this.knock.x*e,z:n.z+r.z*o*e+this.knock.z*e};const c=Math.exp(-8*e);if(this.knock.x*=c,this.knock.z*=c,l=Dr(l,t.radius,this.world.getObstacleBoxes()),l=Ur(l,this.world.getArenaHalfSize(),t.radius),n.x=l.x,n.z=l.z,a&&!this.player.attacking){const h=bs(r);this.player.facing=Ir(this.player.facing,h,1-Math.exp(-t.turnSpeed*e))}this.player.moving=a,this.player.speed=a?o:0}}function Fm(i){const e=new Ze;e.name="PlaceholderHero";const t=R=>new nt({color:new be(R)}),n=t(i.body),s=t(i.accent),r=t(i.skin),a=new At({color:new be(i.visor)}),o=new At({color:new be(i.visor)}),l=t("#2c3e6b"),c=(R,T,A,F=0,v=0,E=0)=>{const k=new Se(T,A);return k.position.set(F,v,E),k.castShadow=!0,R.add(k),k},h=R=>{const T=new Ze;return T.position.set(R,.5,0),c(T,new Zt(.11,.12,.42,10),l,0,-.21,0),c(T,new We(.24,.12,.32),s,0,-.46,.04),e.add(T),T},u=h(-.14),f=h(.14),m=new Ze;c(m,new We(.6,.52,.36),n,0,.76,0),c(m,new We(.62,.08,.38),s,0,.52,0),c(m,new We(.36,.4,.18),s,0,.8,-.26),e.add(m);const g=R=>{const T=new Ze;return T.position.set(R,.98,0),c(T,new Zt(.085,.08,.44,10),n,0,-.2,0),c(T,new Ut(.1,10,8),r,0,-.44,0),m.add(T),T},_=g(-.38),p=g(.38),d=new Ze;d.position.set(0,-.44,0),c(d,new We(.07,.07,.9),o,0,0,.5),c(d,new We(.18,.06,.06),s,0,0,.08),p.add(d);const S=new Ze;S.position.y=1.42,c(S,new Ut(.4,24,18),r),c(S,new We(.5,.16,.12),a,0,.05,.36);const x=c(S,new Ut(.43,24,12,0,Math.PI*2,0,Math.PI*.5),l,0,.03,-.05);x.rotation.x=-.3,e.add(S);let y=0;return{root:e,update(R,T){if(T.dead){e.rotation.z=Ea.lerp(e.rotation.z,Math.PI/2,1-Math.exp(-8*R)),e.position.y=Ea.lerp(e.position.y,.4,1-Math.exp(-8*R));return}if(e.rotation.z=0,T.airborne){const v=1-Math.exp(-14*R);u.rotation.x+=(-.9-u.rotation.x)*v,f.rotation.x+=(.5-f.rotation.x)*v,_.rotation.x+=(-2.2-_.rotation.x)*v,T.attack===null&&(p.rotation.x+=(-2.2-p.rotation.x)*v),e.position.y=0;return}const A=T.moving?1:0;y+=R*(T.speed>0?T.speed*1.6:0);const F=Math.sin(y)*.75*A;if(u.rotation.x=F,f.rotation.x=-F,_.rotation.x=-F*.8,e.position.y=Math.abs(Math.sin(y))*.06*A,T.attack!==null){const v=T.attack,E=Math.sin(v*Math.PI);p.rotation.x=-Math.PI/2*Math.min(1,v*2)-E*.3,p.rotation.y=(.5-v)*1.6,m.rotation.y=(.5-v)*.5}else{const v=1-Math.exp(-10*R);p.rotation.x+=(F*.8-p.rotation.x)*v,p.rotation.y+=(0-p.rotation.y)*v,m.rotation.y+=(0-m.rotation.y)*v}if(!T.moving){const v=1-Math.exp(-10*R);u.rotation.x+=(0-u.rotation.x)*v,f.rotation.x+=(0-f.rotation.x)*v,_.rotation.x+=(0-_.rotation.x)*v}},dispose(){e.traverse(R=>{const T=R;if(T.isMesh){T.geometry.dispose();const A=T.material;Array.isArray(A)?A.forEach(F=>F.dispose()):A.dispose()}})}}}function bo(i){return i==="Mouse0"?"마우스 왼쪽":i==="Mouse2"?"마우스 오른쪽":i==="Mouse1"?"마우스 가운데":i==="Space"?"Space":i==="Escape"?"Esc":i.startsWith("Key")?i.slice(3):i.startsWith("Arrow")?{Up:"↑",Down:"↓",Left:"←",Right:"→"}[i.slice(5)]??i:i}class Om{constructor(e,t){const n=X.controls,s=r=>r.map(a=>`<span class="key">${bo(a)}</span>`).join(" ");this.guide=document.createElement("div"),this.guide.className="guide",this.guide.hidden=!0,this.guide.innerHTML=`
      <div class="guide-panel" role="dialog" aria-labelledby="guide-title">
        <div class="inv-head"><h2 class="guide-title" id="guide-title" style="font-size:30px">조작 안내</h2><button class="btn small" id="guide-close" type="button">닫기 (H)</button></div>
        <ul class="guide-keys">
          <li>${s(n.up)} 앞으로</li>
          <li>${s(n.down)} 뒤로</li>
          <li>${s(n.left)} 왼쪽</li>
          <li>${s(n.right)} 오른쪽</li>
          <li>${s(n.attackMelee)} 근접 공격 (마우스가 가리키는 쪽으로)</li>
          <li>${s(n.attackRanged)} 원거리 공격 (에너지 탄 발사)</li>
          <li>${s(n.jump)} 점프 (떠 있는 동안 탄·충격파를 피함)</li>
          <li>${s(n.toggleInventory)} 장비 화면 열기/닫기 (게임 일시정지)</li>
          <li>${s(n.interact)} 보물 상자 열기 (가까이 가면 안내가 뜸)</li>
          <li>${s(["Escape"])} 메인 메뉴 (게임 일시정지)</li>
          <li>${s(n.restart)} 결과 화면에서 다시 도전</li>
          <li>${s(n.toggleGuide)} 이 안내 열기/닫기</li>
        </ul>
        <p class="guide-note">돌진 로봇은 눈이 붉어진 뒤 덤벼들고, 포격 드론은 포신이 밝아진 뒤 탄을 쏘며, 철벽 로봇은 방패를 들어 올린 뒤 내려찍습니다. 보스는 바닥 원 색깔로 패턴을 예고합니다(주황 돌진 · 빨강 내려찍기 · 보라 탄막).</p>
      </div>`,e.appendChild(this.guide),this.guide.querySelector("#guide-close")?.addEventListener("click",t),this.hud=document.createElement("div"),this.hud.className="hud",e.appendChild(this.hud),this.setHudText("")}get visible(){return!this.guide.hidden}show(){this.guide.hidden=!1}hide(){this.guide.hidden=!0}toggle(){this.guide.hidden=!this.guide.hidden}setHudText(e){const t=bo(X.controls.toggleGuide[0]??"KeyH");this.hud.textContent=`${t}: 조작 안내 · Esc: 메뉴${e?" · "+e:""}`}}const gl="hero-x.difficulty";function zm(){try{const i=localStorage.getItem(gl);if(i&&Nr(i))return i}catch{}return X.difficulty.default}function Eo(i){try{localStorage.setItem(gl,i)}catch{}}function Nr(i){return i in X.difficulty.presets}function ai(i){return X.difficulty.presets[i]??X.difficulty.presets[X.difficulty.default]}function _l(){return Object.keys(X.difficulty.presets)}class km{constructor(e,t){this.cb=t,this.confirming=!1;const n=X.meta,s=_l().map(a=>`<button type="button" class="diff-btn" data-level="${a}">${ai(a).label}</button>`).join("");this.el=document.createElement("div"),this.el.className="guide menu",this.el.innerHTML=`
      <div class="guide-panel menu-panel" role="dialog" aria-labelledby="menu-title">
        <p class="guide-eyebrow">3D 액션 RPG</p>
        <h1 class="guide-title" id="menu-title">${n.title.replace(" X"," <em>X</em>")}</h1>
        <p class="guide-sub">${n.subtitle} · v${n.version}</p>
        <p class="menu-progress" id="menu-progress" hidden></p>
        <div class="menu-list">
          <button class="btn" id="menu-new" type="button">새 게임</button>
          <button class="btn secondary" id="menu-continue" type="button">이어하기</button>
          <button class="btn secondary" id="menu-dungeons" type="button">던전 선택</button>
          <button class="btn secondary" id="menu-inventory" type="button">장비</button>
          <button class="btn secondary" id="menu-guide" type="button">조작 안내</button>
          <button class="btn secondary" id="menu-settings" type="button">설정</button>
        </div>
        <div class="diff-row"><span class="hud-label">난이도</span>${s}</div>
        <div class="menu-confirm" id="menu-confirm" hidden>
          <p>이어갈 진행이 있습니다. 새로 시작하면 레벨·골드·장비·기록이 초기화되고 저장 데이터도 새로 씁니다. 계속할까요?</p>
          <div class="btns"><button class="btn small" id="menu-confirm-yes" type="button">새로 시작</button><button class="btn small ghost" id="menu-confirm-no" type="button">취소</button></div>
        </div>
        <p class="guide-note">던전마다 적을 모두 처치하면 보스가 나타나고, 보스를 쓰러뜨리면 클리어되어 다음 던전이 열립니다. 게임을 끝내려면 브라우저 탭을 닫으세요.</p>
        <p class="menu-save" id="menu-save"></p>
      </div>`,e.appendChild(this.el);const r=a=>this.el.querySelector(a);r("#menu-new").addEventListener("click",()=>{this.cb.hasProgress()?this.setConfirm(!0):this.cb.newGame()}),r("#menu-confirm-yes").addEventListener("click",()=>{this.setConfirm(!1),this.cb.newGame()}),r("#menu-confirm-no").addEventListener("click",()=>this.setConfirm(!1)),r("#menu-continue").addEventListener("click",()=>this.cb.continueGame()),r("#menu-inventory").addEventListener("click",()=>this.cb.openInventory()),r("#menu-guide").addEventListener("click",()=>this.cb.openGuide()),r("#menu-settings").addEventListener("click",()=>this.cb.openSettings()),r("#menu-dungeons").addEventListener("click",()=>this.cb.openDungeons()),this.el.querySelectorAll(".diff-btn").forEach(a=>{a.addEventListener("click",()=>{this.cb.difficulty.set(a.dataset.level),this.refresh()})}),this.refresh()}get visible(){return!this.el.hidden}setConfirm(e){this.confirming=e,this.el.querySelector("#menu-confirm").hidden=!e}refresh(){const e=this.cb.hasRun(),t=this.cb.hasProgress(),n=this.el.querySelector("#menu-continue");n.disabled=!t,n.textContent=e?"이어하기":t?"이어하기 (던전 선택)":"이어하기",n.title=t?"":"이어갈 진행이 없습니다";const s=this.el.querySelector("#menu-dungeons");s.disabled=!t,s.title=t?"":"새 게임을 먼저 시작하세요";const r=this.el.querySelector("#menu-progress"),a=this.cb.progressText();r.textContent=a,r.hidden=a==="",this.el.querySelector("#menu-save").textContent=this.cb.saveNote();const o=this.cb.difficulty.get();this.el.querySelectorAll(".diff-btn").forEach(l=>l.setAttribute("aria-pressed",String(l.dataset.level===o)))}show(){this.setConfirm(!1),this.refresh(),this.el.hidden=!1}hide(){this.el.hidden=!0}pressPrimary(){this.confirming?(this.setConfirm(!1),this.cb.newGame()):this.cb.hasProgress()?this.cb.continueGame():this.cb.newGame()}}class Bm{constructor(e,t){this.project=t,this.popups=[],this.root=document.createElement("div"),this.root.className="dmg-layer",e.appendChild(this.root)}show(e,t,n="enemy"){const s=document.createElement("div");s.className=`dmg ${n}`;const r=Math.round(t);s.textContent=n==="kill"?`${r} 처치!`:n==="heal"?`+${r}`:n==="levelup"?`레벨 ${r}!`:String(r),this.root.appendChild(s),this.popups.push({el:s,pos:e.clone(),t:0}),this.popups.length>40&&this.remove(0)}showText(e,t,n){const s=document.createElement("div");s.className="dmg text",s.textContent=t,n&&(s.style.color=n),this.root.appendChild(s),this.popups.push({el:s,pos:e.clone(),t:-.6}),this.popups.length>40&&this.remove(0)}update(e){for(let t=this.popups.length-1;t>=0;t--){const n=this.popups[t];n.t+=e,n.pos.y+=e*1.4;const s=this.project(n.pos);s?(n.el.style.transform=`translate(${s.x}px, ${s.y}px) translate(-50%, -50%) scale(${1+Math.min(n.t*2,.3)})`,n.el.style.opacity=String(Math.max(0,Math.min(1,1.3-Math.max(0,n.t))))):n.el.style.opacity="0",n.t>1.1&&this.remove(t)}}clear(){for(;this.popups.length;)this.remove(this.popups.length-1)}remove(e){this.popups[e].el.remove(),this.popups.splice(e,1)}}class Hm{constructor(e){this.last={hp:-1,maxHp:-1,enemies:-1,kills:-1,score:-1,level:-1,xp:-1,xpToNext:-1,gold:-1},this.root=document.createElement("div"),this.root.className="hud-top",this.root.innerHTML=`
      <div class="hud-panel hud-hp">
        <div class="hud-label">체력</div>
        <div class="hp-bar"><i id="hud-hp-fill"></i></div>
        <div class="hud-value" id="hud-hp-text">100 / 100</div>
        <div class="hud-xp-row"><span class="hud-label">레벨 <b id="hud-level">1</b></span><div class="xp-bar"><i id="hud-xp-fill"></i></div><span class="hud-value" id="hud-xp-text">0 / 40</span></div>
        <div class="hud-value"><span class="hud-label">골드</span><b id="hud-gold">0</b></div>
      </div>
      <div class="hud-panel hud-stats">
        <div><span class="hud-label">던전</span><b id="hud-dungeon"></b></div>
        <div><span class="hud-label">상자</span><b id="hud-chests">0 / 0</b></div>
        <div><span class="hud-label">남은 적</span><b id="hud-enemies">0</b></div>
        <div><span class="hud-label">처치</span><b id="hud-kills">0</b></div>
        <div><span class="hud-label">점수</span><b id="hud-score">0</b></div>
      </div>`,e.appendChild(this.root),this.hpFill=this.root.querySelector("#hud-hp-fill"),this.hpText=this.root.querySelector("#hud-hp-text"),this.enemiesText=this.root.querySelector("#hud-enemies"),this.killsText=this.root.querySelector("#hud-kills"),this.scoreText=this.root.querySelector("#hud-score"),this.levelText=this.root.querySelector("#hud-level"),this.xpFill=this.root.querySelector("#hud-xp-fill"),this.xpText=this.root.querySelector("#hud-xp-text"),this.goldText=this.root.querySelector("#hud-gold"),this.chestText=this.root.querySelector("#hud-chests"),this.prompt=document.createElement("div"),this.prompt.className="hud-prompt",this.prompt.hidden=!0,e.appendChild(this.prompt),this.bossBar=document.createElement("div"),this.bossBar.className="boss-bar",this.bossBar.hidden=!0,this.bossBar.innerHTML='<span class="boss-name" id="boss-name"></span><div class="boss-track"><i id="boss-fill"></i></div><span class="boss-hp" id="boss-hp"></span>',e.appendChild(this.bossBar),this.banner=document.createElement("div"),this.banner.className="banner",this.banner.hidden=!0,e.appendChild(this.banner)}setBoss(e){if(!e){this.bossBar.hidden=!0;return}this.bossBar.hidden=!1,this.bossBar.querySelector("#boss-name").textContent=e.name+(e.phase2?" (분노)":""),this.bossBar.querySelector("#boss-fill").style.width=`${Math.max(0,Math.min(1,e.hp/e.maxHp))*100}%`,this.bossBar.querySelector("#boss-hp").textContent=`${Math.ceil(e.hp)} / ${e.maxHp}`,this.bossBar.classList.toggle("phase2",e.phase2)}showBanner(e,t=2200){this.banner.textContent=e,this.banner.hidden=!1,this.banner.classList.remove("pop"),this.banner.offsetWidth,this.banner.classList.add("pop"),clearTimeout(this.bannerTimer),this.bannerTimer=setTimeout(()=>this.banner.hidden=!0,t)}setDungeonName(e){this.root.querySelector("#hud-dungeon").textContent=e}setChests(e,t){const n=`${e} / ${t}`;this.chestText.textContent!==n&&(this.chestText.textContent=n)}setPrompt(e){this.prompt.textContent!==e&&(this.prompt.textContent=e),this.prompt.hidden=e===""}update(e){e.level!==this.last.level&&(this.levelText.textContent=String(e.level),this.last.level=e.level),(e.xp!==this.last.xp||e.xpToNext!==this.last.xpToNext)&&(this.xpFill.style.width=`${e.xpToNext>0?Math.min(100,e.xp/e.xpToNext*100):100}%`,this.xpText.textContent=`${e.xp} / ${e.xpToNext}`,this.last.xp=e.xp,this.last.xpToNext=e.xpToNext),e.gold!==this.last.gold&&(this.goldText.textContent=e.gold.toLocaleString("ko-KR"),this.last.gold=e.gold);const t=Math.ceil(e.hp);if(t!==this.last.hp||e.maxHp!==this.last.maxHp){const n=e.maxHp>0?Math.max(0,Math.min(1,e.hp/e.maxHp)):0;this.hpFill.style.width=`${n*100}%`,this.hpFill.classList.toggle("low",n<=.3),this.hpText.textContent=`${t} / ${e.maxHp}`,this.last.hp=t,this.last.maxHp=e.maxHp}e.enemies!==this.last.enemies&&(this.enemiesText.textContent=String(e.enemies),this.last.enemies=e.enemies),e.kills!==this.last.kills&&(this.killsText.textContent=String(e.kills),this.last.kills=e.kills),e.score!==this.last.score&&(this.scoreText.textContent=e.score.toLocaleString("ko-KR"),this.last.score=e.score)}flashHit(){this.root.classList.remove("hit"),this.root.offsetWidth,this.root.classList.add("hit")}show(){this.root.hidden=!1}hide(){this.root.hidden=!0}}class Gm{constructor(e,t,n,s){this.el=document.createElement("div"),this.el.className="guide result",this.el.hidden=!0,this.el.innerHTML=`
      <div class="guide-panel result-panel" role="dialog" aria-labelledby="result-title">
        <p class="guide-eyebrow" id="result-eyebrow">결과</p>
        <h2 class="guide-title" id="result-title">결과</h2>
        <p class="guide-sub" id="result-sub"></p>
        <div class="btns"><button class="btn" id="result-restart" type="button">다시 도전 (R)</button><button class="btn secondary" id="result-dungeons" type="button">던전 선택</button><button class="btn secondary" id="result-menu" type="button">메인 메뉴</button></div>
      </div>`,e.appendChild(this.el),this.title=this.el.querySelector("#result-title"),this.sub=this.el.querySelector("#result-sub"),this.el.querySelector("#result-restart")?.addEventListener("click",t),this.el.querySelector("#result-menu")?.addEventListener("click",n),this.el.querySelector("#result-dungeons")?.addEventListener("click",s)}get visible(){return!this.el.hidden}show(e,t){this.title.textContent=e,this.sub.textContent=t,this.el.hidden=!1}hide(){this.el.hidden=!0}}function Vm(){if(typeof window>"u"||typeof navigator>"u")return!1;try{if(window.matchMedia?.("(pointer: coarse)").matches)return!0}catch{}return navigator.maxTouchPoints>0&&/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)}const Wm=["게임","전투 수치","화면"],_r=[{key:"difficulty",kind:"choice",group:"게임",label:"난이도",description:"적의 체력·공격력·속도 배율. 바꾸면 던전을 처음부터 다시 시작합니다."},{key:"cameraDistance",kind:"range",group:"게임",label:"카메라 거리",description:"1.0 이 기본. 멀리 두면 넓게 보이고 가까우면 캐릭터가 크게 보입니다.",min:.6,max:1.6,step:.1,unit:"×"},{key:"touchControls",kind:"toggle",group:"게임",label:"터치 조작",description:"화면에 조이스틱·버튼을 띄우고 가까운 적을 자동으로 조준합니다. 휴대폰·태블릿은 기본 켜짐."},{key:"playerHpMul",kind:"range",group:"전투 수치",label:"내 최대 체력",description:"레벨·장비 보너스를 더한 최대 체력에 곱합니다.",min:.5,max:3,step:.1,unit:"×"},{key:"playerDamageMul",kind:"range",group:"전투 수치",label:"내 공격력",description:"근접·원거리 공격 피해에 곱합니다.",min:.5,max:3,step:.1,unit:"×"},{key:"enemyHpMul",kind:"range",group:"전투 수치",label:"적 체력",description:"난이도 배율에 다시 곱합니다. 다음 던전 입장부터 적용됩니다.",min:.5,max:3,step:.1,unit:"×"},{key:"showDamageNumbers",kind:"toggle",group:"화면",label:"피해 숫자 표시",description:"공격하거나 맞을 때 숫자를 띄웁니다."},{key:"hitFlash",kind:"toggle",group:"화면",label:"피격 시 화면 번쩍임",description:"맞았을 때 화면 테두리를 붉게 비춥니다."},{key:"shadows",kind:"toggle",group:"화면",label:"그림자",description:"느린 PC·휴대폰에서는 끄면 부드러워집니다."},{key:"resolution",kind:"range",group:"화면",label:"렌더 해상도",description:"1.0 이 기기 기본. 휴대폰에서 끊기면 0.6~0.8 로 낮추세요.",min:.5,max:1.5,step:.1,unit:"×"},{key:"showFps",kind:"toggle",group:"화면",label:"FPS 표시",description:"왼쪽 아래에 초당 프레임을 보여줍니다."}];function Nn(){const i=Vm();return{difficulty:X.difficulty.default,playerHpMul:1,playerDamageMul:1,enemyHpMul:1,cameraDistance:1,touchControls:i,resolution:i?.8:1,showDamageNumbers:X.hud.showDamageNumbers,hitFlash:!0,shadows:i?!1:X.graphics.shadows,showFps:X.debug.showFps}}function xr(i){return typeof i=="object"&&i!==null&&!Array.isArray(i)}function Xm(i,e){const t=Number.isFinite(e)?e:Nn()[i.key],n=Math.round((t-i.min)/i.step)*i.step+i.min,s=Math.min(i.max,Math.max(i.min,n));return Math.round(s*1e3)/1e3}function xl(i){const e=Nn(),t=[];if(!xr(i))return{settings:e,warnings:i==null?[]:["설정 데이터가 객체가 아니라 기본값을 씁니다."]};const n={...e};for(const s of _r){const r=i[s.key];if(r!==void 0)if(s.kind==="choice")typeof r=="string"&&Nr(r)?n.difficulty=r:t.push(`난이도 값 '${String(r)}' 이(가) 잘못되어 기본값으로 바꿨습니다.`);else if(s.kind==="toggle")typeof r=="boolean"?n[s.key]=r:t.push(`'${s.label}' 값이 참/거짓이 아니라 기본값으로 바꿨습니다.`);else{const a=typeof r=="number"?Xm(s,r):NaN;Number.isNaN(a)?t.push(`'${s.label}' 값이 숫자가 아니라 기본값으로 바꿨습니다.`):(a!==r&&t.push(`'${s.label}' 값 ${String(r)} 을(를) 허용 범위 안의 ${a} 으로 보정했습니다.`),n[s.key]=a)}}return{settings:n,warnings:t}}const vl="hero-x.settings",qm=1;function $m(i){if(!i)return{settings:Nn(),warnings:[],found:!1};let e=null;try{e=i.getItem(vl)}catch{}if(!e)return{settings:Nn(),warnings:[],found:!1};try{const t=JSON.parse(e),n=xr(t)&&xr(t.settings)?t.settings:t;return{...xl(n),found:!0}}catch{return{settings:Nn(),warnings:["설정 데이터를 읽을 수 없어 기본값을 씁니다."],found:!0}}}function ns(i,e){if(!i)return!1;try{return i.setItem(vl,JSON.stringify({version:qm,settings:e})),!0}catch(t){return Qe.warn("설정 저장에 실패했습니다.",t),!1}}class Ym{constructor(e,t){this.cb=t,this.confirming=!1,this.el=document.createElement("div"),this.el.className="guide settings",this.el.hidden=!0;const n=Wm.map(s=>{const r=_r.filter(a=>a.group===s).map(a=>{let o="";return a.kind==="choice"?o=_l().map(l=>`<button type="button" class="diff-btn" data-key="difficulty" data-level="${l}">${ai(l).label}</button>`).join(""):a.kind==="toggle"?o=`<button type="button" class="toggle" role="switch" data-key="${a.key}" aria-checked="false"><span class="toggle-knob"></span></button>`:o=`<input type="range" data-key="${a.key}" min="${a.min}" max="${a.max}" step="${a.step}" aria-label="${a.label}"><output data-out="${a.key}"></output>`,`<div class="set-row" data-row="${a.key}"><div class="set-text"><div class="set-label">${a.label}</div><div class="set-desc">${a.description}</div></div><div class="set-control">${o}</div></div>`}).join("");return`<section class="set-group"><h3 class="set-group-title">${s}</h3>${r}</section>`}).join("");this.el.innerHTML=`
      <div class="guide-panel settings-panel" role="dialog" aria-labelledby="settings-title">
        <div class="inv-head"><h2 class="guide-title" id="settings-title">설정</h2><button class="btn small" id="settings-close" type="button">닫기 (Esc)</button></div>
        <p class="guide-sub">바꾸는 즉시 적용되고 이 브라우저에 저장됩니다.</p>
        <div class="set-body">${n}</div>
        <div class="menu-confirm" id="settings-confirm" hidden>
          <p>모든 설정을 기본값으로 되돌릴까요?</p>
          <div class="btns"><button class="btn small" id="settings-reset-yes" type="button">되돌리기</button><button class="btn small ghost" id="settings-reset-no" type="button">취소</button></div>
        </div>
        <div class="btns set-foot"><button class="btn secondary" id="settings-reset" type="button">기본값 복원</button></div>
      </div>`,e.appendChild(this.el),this.el.querySelector("#settings-close")?.addEventListener("click",()=>this.cb.onClose()),this.el.querySelector("#settings-reset")?.addEventListener("click",()=>this.setConfirm(!0)),this.el.querySelector("#settings-reset-no")?.addEventListener("click",()=>this.setConfirm(!1)),this.el.querySelector("#settings-reset-yes")?.addEventListener("click",()=>{this.setConfirm(!1),this.cb.resetAll(),this.refresh()}),this.el.querySelectorAll('input[type="range"]').forEach(s=>{s.addEventListener("input",()=>{this.cb.set(s.dataset.key,Number(s.value)),this.refresh()})}),this.el.querySelectorAll("button.toggle").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.key;this.cb.set(r,!this.cb.get()[r]),this.refresh()})}),this.el.querySelectorAll(".diff-btn").forEach(s=>{s.addEventListener("click",()=>{this.cb.set("difficulty",s.dataset.level),this.refresh()})}),this.refresh()}get visible(){return!this.el.hidden}setConfirm(e){this.confirming=e,this.el.querySelector("#settings-confirm").hidden=!e}refresh(){const e=this.cb.get();for(const t of _r)if(t.kind==="choice")this.el.querySelectorAll('.diff-btn[data-key="difficulty"]').forEach(n=>n.setAttribute("aria-pressed",String(n.dataset.level===e.difficulty)));else if(t.kind==="toggle")this.el.querySelector(`button.toggle[data-key="${t.key}"]`)?.setAttribute("aria-checked",String(e[t.key]));else{const n=this.el.querySelector(`input[data-key="${t.key}"]`),s=this.el.querySelector(`output[data-out="${t.key}"]`),r=e[t.key];n&&(n.value=String(r)),s&&(s.textContent=`${r.toFixed(1)}${t.unit??""}`)}}show(){this.setConfirm(!1),this.refresh(),this.el.hidden=!1}hide(){this.confirming=!1,this.el.hidden=!0}pressBack(){this.confirming?this.setConfirm(!1):this.cb.onClose()}}const ss=2,wo={clears:0,deaths:0,totalKills:0,bestScore:0,dungeonClears:{}};function rs(i){return{...i,dungeonClears:{...i.dungeonClears}}}const jm=["common","uncommon","rare","epic","legendary"];function Km(i){return typeof i=="string"&&jm.includes(i)}function mn(i){return typeof i=="object"&&i!==null&&!Array.isArray(i)}function fn(i,e,t,n){const s=typeof i=="number"&&Number.isFinite(i)?Math.floor(i):n;return Math.min(t,Math.max(e,s))}function To(i){return{templateId:i.templateId,rarity:i.rarity}}function Zm(i){const e={};for(const t of kn){const n=i.equipment.equipped[t];e[t]=n?To(n):null}return{version:ss,savedAt:(i.now??new Date).toISOString(),gameVersion:X.meta.version,difficulty:i.difficulty,stats:{level:i.stats.level,xp:i.stats.xp,gold:i.stats.gold},equipment:{inventory:i.equipment.inventory.map(To),equipped:e},records:rs(i.records)}}function Ao(i,e,t){return!mn(i)||typeof i.templateId!="string"||!Km(i.rarity)?(e.push(`${t}: 장비 항목 형식이 잘못되어 버렸습니다.`),null):ms(i.templateId)?{templateId:i.templateId,rarity:i.rarity}:(e.push(`${t}: 알 수 없는 장비 '${i.templateId}' 를 버렸습니다.`),null)}function Jm(i){if(!mn(i))return{ok:!1,reason:"invalid",message:"저장 데이터가 객체가 아닙니다."};const e=typeof i.version=="number"?i.version:NaN;if(!Number.isInteger(e)||e<1)return{ok:!1,reason:"invalid",message:"저장 데이터에 버전이 없습니다."};if(e>ss)return{ok:!1,reason:"newer",message:`저장 데이터 버전(${e})이 이 게임이 아는 버전(${ss})보다 새롭습니다.`};const t=Qm(i,e),n=[];if(!mn(t.stats)||!mn(t.equipment))return{ok:!1,reason:"invalid",message:"stats 또는 equipment 항목이 없습니다."};const s=X.progression,r=fn(t.stats.level,1,s.maxLevel,1),a=Math.round(s.xpBase*Math.pow(s.xpGrowth,r-1)),o={level:r,xp:fn(t.stats.xp,0,a,0),gold:fn(t.stats.gold,0,999999999,0)};(o.level!==t.stats.level||o.xp!==t.stats.xp||o.gold!==t.stats.gold)&&n.push("성장 수치가 범위를 벗어나 보정했습니다.");const l=typeof t.difficulty=="string"&&Nr(t.difficulty)?t.difficulty:X.difficulty.default;l!==t.difficulty&&n.push("난이도 값이 잘못되어 기본 난이도로 바꿨습니다.");const c=t.equipment,h=[],u=Array.isArray(c.inventory)?c.inventory:[];Array.isArray(c.inventory)||n.push("가방 목록이 없어 비웠습니다."),u.forEach((x,y)=>{const R=Ao(x,n,`가방 ${y+1}번`);R&&h.push(R)});const f={},m=mn(c.equipped)?c.equipped:{};for(const x of kn){const y=m[x];if(y==null){f[x]=null;continue}const R=Ao(y,n,`슬롯 ${x}`);R&&!pl(ms(R.templateId).category).includes(x)?(n.push(`슬롯 ${x}: 맞지 않는 장비라 가방으로 옮겼습니다.`),h.push(R),f[x]=null):f[x]=R}const g=X.equipment.inventorySize;h.length>g&&(n.push(`가방이 ${g}칸을 넘어 뒤쪽 ${h.length-g}개를 버렸습니다.`),h.length=g);const _=mn(t.records)?t.records:{},p={},d=mn(_.dungeonClears)?_.dungeonClears:{};for(const[x,y]of Object.entries(d)){if(!$t.some(R=>R.id===x)){n.push(`알 수 없는 던전 '${x}' 의 클리어 기록을 버렸습니다.`);continue}p[x]=fn(y,0,1e9,0)}const S={clears:fn(_.clears,0,1e9,0),deaths:fn(_.deaths,0,1e9,0),totalKills:fn(_.totalKills,0,1e9,0),bestScore:fn(_.bestScore,0,1e12,0),dungeonClears:p};return{ok:!0,warnings:n,data:{version:ss,savedAt:typeof t.savedAt=="string"&&!Number.isNaN(Date.parse(t.savedAt))?t.savedAt:new Date(0).toISOString(),gameVersion:typeof t.gameVersion=="string"?t.gameVersion:"?",difficulty:l,stats:o,equipment:{inventory:h,equipped:f},records:S}}}function Qm(i,e){const t={...i};if(e<2){const n=mn(t.records)?{...t.records}:{},s=typeof n.clears=="number"?n.clears:0;n.dungeonClears=s>0?{[$t[0].id]:s}:{},t.records=n}return t}function eg(i,e){e.stats.reset(),e.stats.level=i.stats.level,e.stats.xp=i.stats.xp,e.stats.gold=i.stats.gold,e.equipment.reset();for(const t of i.equipment.inventory){const n=ms(t.templateId);n&&e.equipment.add(ps(n,t.rarity))}for(const t of kn){const n=i.equipment.equipped[t],s=n?ms(n.templateId):void 0;n&&s&&(e.equipment.equipped[t]=ps(s,n.rarity))}}function Ro(i){const e=i.stats,t=i.equipment;return e.level>1||e.xp>0||e.gold>0||t.inventory.length>0||kn.some(n=>t.equipped[n]!==null)||i.records.clears>0||i.records.deaths>0}const Es="hero-x.save",Co="hero-x.save.corrupt";function tg(){try{const i=globalThis.localStorage,e="__hero-x-probe__";return i.setItem(e,"1"),i.removeItem(e),i}catch{return null}}function ng(i){if(!i)return{kind:"unavailable"};let e;try{e=i.getItem(Es)}catch{return{kind:"unavailable"}}if(e===null||e==="")return{kind:"none"};let t;try{t=JSON.parse(e)}catch{return Po(i,e),{kind:"corrupt",message:"저장 데이터를 읽을 수 없어(JSON 손상) 따로 보관하고 새로 시작합니다."}}const n=Jm(t);return n.ok?{kind:"loaded",data:n.data,warnings:n.warnings}:n.reason==="newer"?{kind:"newer",message:n.message}:(Po(i,e),{kind:"corrupt",message:`저장 데이터가 손상되어 따로 보관하고 새로 시작합니다. (${n.message})`})}function Po(i,e){try{i.setItem(Co,e),i.removeItem(Es),Qe.warn(`손상된 저장 데이터를 '${Co}' 에 보관했습니다.`)}catch{}}function ig(i,e){if(!i)return!1;try{return i.setItem(Es,JSON.stringify(e)),!0}catch(t){return Qe.warn("저장에 실패했습니다.",t),!1}}function sg(i){if(i)try{i.removeItem(Es)}catch{}}class rg{constructor(e){this.camera=e,this.desired=new L,this.lookTarget=new L,this.first=!0,this.distanceScale=1}update(e,t){const n=X.camera,s=this.distanceScale;if(this.desired.set(t.x+n.offset.x*s,t.y+n.offset.y*s,t.z+n.offset.z*s),this.first)this.camera.position.copy(this.desired),this.first=!1;else{const r=1-Math.exp(-n.smoothing*e);this.camera.position.lerp(this.desired,r)}this.lookTarget.set(t.x,t.y+n.lookAtHeight,t.z),this.camera.lookAt(this.lookTarget)}getYaw(){const e=X.camera.offset;return Math.atan2(e.x,e.z)}}class ag{constructor(e,t){this.canvas=e,this.scene=new Xp,this.input=new Sm,this.dungeonDef=$t[0],this.bossCfg=go($t[0]),this.unlockedNow=null,this.mortars=[],this.settings=Nn(),this.mode="menu",this.runActive=!1,this.stats=new Um,this.equipment=new Em,this.paused=!1,this.boss=null,this.bossDefeated=!1,this.difficulty=zm(),this.storage=tg(),this.records={...wo},this.hasSavedProgress=!1,this.saveBlocked=!1,this.saveDirty=!1,this.saveTimer=0,this.lastSavedAt=null,this.saveStatus="",this.projTmp=new L,this.raycaster=new Zp,this.groundPlane=new pn(new L(0,1,0),0),this.aimHit=new L,this.camTarget=new L,this.running=!1,this.ended=!1,this.rafId=0,this.lastTime=0,this.frames=0,this.fpsFrames=0,this.fpsTime=0,this.flushSave=()=>{this.saveDirty&&this.saveNow()},this.onVisibility=()=>{document.visibilityState==="hidden"&&this.flushSave()},this.currentPrompt="",this.loop=a=>{if(!this.running)return;this.rafId=requestAnimationFrame(this.loop);const o=Math.min(.05,(a-this.lastTime)/1e3);if(this.lastTime=a,this.paused||this.mode==="menu"){this.renderer.render(this.scene,this.camera);return}const l=this.player.position;this.controller.update(o),this.ended||this.combat.update(o),this.spawner.update(o,{playerPos:{x:l.x,z:l.z},world:this.dungeon,onAttackPlayer:(h,u)=>this.onEnemyAttack(h,u),onBossAttack:(h,u)=>this.onBossAttack(h,u),playerRadius:X.player.radius}),this.projectiles.update(o,{world:this.dungeon,enemies:this.spawner.getEnemies(),playerPos:{x:l.x,z:l.z},playerY:this.player.jumpY,playerRadius:X.player.radius,onHitEnemy:(h,u,f)=>{this.ended||this.combat.damageEnemy(h,u.damage,f,u.knockback)},onHitPlayer:(h,u,f)=>this.damagePlayer(h.damage,f)}),this.loot.update(o,{x:l.x,z:l.z},(h,u)=>this.onCollect(h,u)),this.updateMortars(o),this.chests.update(o);const c=!this.ended&&this.chests.nearest({x:l.x,z:l.z})!==null;this.currentPrompt=c?`${X.controls.interact[0].replace("Key","")} 보물 상자 열기`:"",this.hud.setPrompt(this.currentPrompt),this.touch.setInteract(c),this.hud.setChests(this.chests.openedCount,this.chests.total),this.player.update(o),this.effects.update(o),this.damageNumbers.update(o),this.camTarget.set(l.x,0,l.z),this.cameraCtrl.update(o,this.camTarget),this.dungeon.updateLight(l),this.checkVictory(),this.saveTimer+=o,this.saveDirty&&this.saveTimer>=X.save.autoSaveInterval&&this.saveNow(),this.hud.update({hp:this.player.health.hp,maxHp:this.player.health.maxHp,enemies:this.spawner.aliveCount,kills:this.combat.kills,score:this.combat.score,level:this.stats.level,xp:this.stats.xp,xpToNext:this.stats.xpToNext,gold:this.stats.gold}),this.renderer.render(this.scene,this.camera),this.frames++,this.updateFps(o)},this.resize=()=>{const a=this.canvas.clientWidth||window.innerWidth,o=this.canvas.clientHeight||window.innerHeight;this.renderer.setSize(a,o,!1),this.camera.aspect=a/o,this.camera.updateProjectionMatrix()};for(const a of em(X))Qe.warn(`설정 '${a.path}' 값 ${a.from} 은(는) 허용 범위를 벗어나 ${a.to} 로 보정했습니다.`);this.loadSettingsFromStorage();const n=X.graphics;this.renderer=new hl({canvas:e,antialias:n.antialias,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,n.maxPixelRatio)),this.renderer.shadowMap.enabled=n.shadows,this.renderer.shadowMap.type=Uo,this.renderer.outputColorSpace=lt;const s=X.camera;this.camera=new Ot(s.fov,1,s.near,s.far),this.dungeon=new mo(this.scene,this.dungeonDef),this.chests=new po(this.scene,this.dungeonDef.chests),this.dungeon.addCollisionBoxes(this.chests.getCollisionBoxes());const r={getObstacleBoxes:()=>this.dungeon.getObstacleBoxes(),getArenaHalfSize:()=>this.dungeon.getArenaHalfSize()};this.player=new Im(Fm(X.player.colors),X.player.startPosition),this.scene.add(this.player.object3d),this.cameraCtrl=new rg(this.camera),this.controller=new Nm(this.player,this.input,r,()=>this.cameraCtrl.getYaw(),()=>1+this.equipment.totals().moveSpeed),this.effects=new am(this.scene),this.projectiles=new lm(this.scene),this.spawner=new ym(this.scene),this.applyDifficultyToSpawner(),this.spawner.spawnFromConfig(this.dungeonDef.spawns),this.combat=new rm(this.player,this.input,()=>this.spawner.getEnemies(),()=>this.getAimPoint(),this.effects,this.projectiles,(a,o,l)=>{l&&this.loot.dropFor(a.def.score,{x:a.position.x,z:a.position.z},this.dungeonDef.rewardMul),this.settings.showDamageNumbers&&(this.projTmp.set(a.position.x,1.6,a.position.z),this.damageNumbers.show(this.projTmp,l?a.def.score:o,l?"kill":"enemy"))},()=>this.effectiveDamageMultiplier(),a=>this.equipment.weaponAttack(a)),this.loot=new Lm(this.scene),this.damageNumbers=new Bm(t,a=>this.projectToScreen(a)),this.guide=new Om(t,()=>this.guide.hide()),this.touch=new bm(t,this.input,()=>{this.mode==="play"&&this.openMenu()},()=>{this.mode==="play"&&this.toggleInventory()}),this.hud=new Hm(t),this.hud.setDungeonName(this.dungeonDef.name),this.result=new Gm(t,()=>this.retry(),()=>this.openMenu(),()=>this.openDungeons()),this.dungeonSelect=new um(t,{clears:()=>this.records.dungeonClears,level:()=>this.stats.level,enter:a=>this.enterDungeon(a),onClose:()=>this.closeDungeons()}),this.loadFromStorage(),this.menu=new km(t,{newGame:()=>this.newGame(),continueGame:()=>this.continueGame(),openSettings:()=>this.openSettings(),openDungeons:()=>this.openDungeons(),hasProgress:()=>this.runActive||this.hasSavedProgress,progressText:()=>this.progressText(),saveNote:()=>this.saveStatus,openInventory:()=>this.toggleInventory(!0),openGuide:()=>this.guide.show(),hasRun:()=>this.runActive,difficulty:{get:()=>this.difficulty,set:a=>this.setDifficulty(a)}}),this.settingsUI=new Ym(t,{get:()=>this.settings,set:(a,o)=>this.updateSetting(a,o),resetAll:()=>this.resetSettings(),onClose:()=>this.closeSettings()}),this.inventoryUI=new Dm(t,this.equipment,{onChange:()=>{this.applyStats(),this.markDirty()},onClose:()=>this.toggleInventory(!1),getSummary:()=>this.statSummary()}),this.applyDifficulty(),this.applySettings(),this.input.attach(window,e),this.input.onPress(X.controls.toggleGuide,()=>this.guide.toggle()),this.input.onPress(X.controls.restart,()=>{this.mode==="result"&&this.retry()}),this.input.onPress(X.controls.toggleInventory,()=>{this.mode!=="menu"&&this.toggleInventory()}),this.input.onPress(X.controls.interact,()=>this.tryInteract()),this.input.onPress(["Escape"],()=>{this.guide.visible?this.guide.hide():this.settingsUI.visible?this.settingsUI.pressBack():this.dungeonSelect.visible?this.closeDungeons():this.inventoryUI.visible?this.toggleInventory(!1):this.mode==="play"&&this.openMenu()}),this.input.onPress(["Enter"],()=>{this.mode==="menu"&&!this.inventoryUI.visible&&!this.guide.visible&&!this.settingsUI.visible&&!this.dungeonSelect.visible&&this.menu.pressPrimary()}),this.hud.hide(),this.menu.show(),window.addEventListener("resize",this.resize),window.addEventListener("beforeunload",this.flushSave),document.addEventListener("visibilitychange",this.onVisibility),this.resize(),Qe.info(`${X.meta.title} v${X.meta.version} 준비 완료 (적 ${this.spawner.aliveCount}마리)`)}start(){this.running||(this.running=!0,this.lastTime=performance.now(),this.rafId=requestAnimationFrame(this.loop))}stop(){this.running=!1,cancelAnimationFrame(this.rafId)}setDifficulty(e){e!==this.difficulty&&(this.difficulty=e,this.settings.difficulty=e,ns(this.storage,this.settings),this.settingsUI?.refresh(),this.markDirty(),Eo(e),this.applyDifficulty(),this.restart(),Qe.info(`난이도: ${ai(e).label}`))}getDifficulty(){return this.difficulty}applyDifficultyToSpawner(){const e=ai(this.difficulty);this.spawner.multipliers={hp:e.enemyHp*this.settings.enemyHpMul,speed:e.enemySpeed}}loadSettingsFromStorage(){const e=$m(this.storage);this.settings=e.settings;for(const t of e.warnings)Qe.warn(`설정 보정: ${t}`);e.found||(this.settings.difficulty=this.difficulty),this.difficulty=this.settings.difficulty}updateSetting(e,t){const n=xl({...this.settings,[e]:t}).settings;if(e==="difficulty"){this.settings=n,ns(this.storage,this.settings),this.setDifficulty(n.difficulty);return}this.settings=n,ns(this.storage,this.settings),this.applySettings()}resetSettings(){const e=this.settings.difficulty;this.settings=Nn(),ns(this.storage,this.settings),this.applySettings(),e!==this.settings.difficulty&&this.setDifficulty(this.settings.difficulty),Qe.info("설정을 기본값으로 되돌렸습니다.")}applySettings(){const e=this.settings;this.cameraCtrl.distanceScale=e.cameraDistance,this.renderer.shadowMap.enabled!==e.shadows&&(this.renderer.shadowMap.enabled=e.shadows,this.scene.traverse(t=>{const n=t;if(!n.isMesh)return;const s=Array.isArray(n.material)?n.material:[n.material];for(const r of s)r.needsUpdate=!0})),this.dungeon.setShadows(e.shadows),e.showFps||this.guide.setHudText(""),this.applyPixelRatio(),this.updateTouchVisibility(),this.applyDifficultyToSpawner(),this.applyStats()}applyPixelRatio(){const e=Math.min(window.devicePixelRatio||1,X.graphics.maxPixelRatio);this.renderer.setPixelRatio(Math.max(.3,e*this.settings.resolution))}getSettings(){return{...this.settings}}openSettings(){this.inventoryUI.hide(),this.guide.hide(),this.settingsUI.show()}closeSettings(){this.settingsUI.hide(),this.mode==="menu"&&this.menu.refresh()}applyDifficulty(){this.applyDifficultyToSpawner(),this.menu?.refresh()}newGame(){this.stats.reset(),this.equipment.reset(),this.records=rs(wo),this.saveBlocked=!1,sg(this.storage),this.enterDungeon($t[0]),Qe.info("새 게임을 시작합니다.")}enterDungeon(e){if(!gr(e,this.records.dungeonClears)){Qe.warn(`던전 '${e.name}' 은(는) 아직 잠겨 있습니다.`);return}this.loadDungeon(e),this.restart(),this.runActive=!0,this.saveNow(),this.dungeonSelect.hide(),this.enterPlay(),this.hud.showBanner(e.name,1800)}loadDungeon(e){e.id===this.dungeonDef.id&&this.dungeon.def.id===e.id||(this.chests.dispose(),this.dungeon.dispose(),this.dungeonDef=e,this.bossCfg=go(e),this.dungeon=new mo(this.scene,e),this.chests=new po(this.scene,e.chests),this.dungeon.addCollisionBoxes(this.chests.getCollisionBoxes()),this.hud.setDungeonName(e.name),Qe.info(`던전 '${e.name}' 을(를) 불러왔습니다 (적 ${e.spawns.length}마리, 상자 ${e.chests.length}개).`))}openDungeons(){!this.runActive&&!this.hasSavedProgress||(this.inventoryUI.hide(),this.settingsUI.hide(),this.guide.hide(),this.mode==="result"&&(this.result.hide(),this.mode="menu",this.hud.hide(),this.menu.show()),this.dungeonSelect.show())}closeDungeons(){this.dungeonSelect.hide(),this.mode==="menu"&&this.menu.refresh()}getDungeonId(){return this.dungeonDef.id}continueGame(){if(!this.runActive){this.hasSavedProgress&&this.openDungeons();return}this.enterPlay()}retry(){this.restart(),this.runActive=!0,this.enterPlay()}openMenu(){this.mode="menu",this.inventoryUI.hide(),this.paused=!1,this.result.hide(),this.hud.hide(),this.touch.hide(),this.saveNow(),this.menu.show()}updateTouchVisibility(){const e=this.settings.touchControls&&this.mode==="play";e?this.touch.show():this.touch.hide(),document.body.classList.toggle("touch-mode",e)}loadFromStorage(){const e=ng(this.storage);switch(e.kind){case"loaded":if(eg(e.data,{stats:this.stats,equipment:this.equipment}),this.records=rs(e.data.records),this.difficulty=e.data.difficulty,Eo(this.difficulty),this.hasSavedProgress=Ro(e.data),this.lastSavedAt=e.data.savedAt,this.saveStatus=`마지막 저장: ${Lo(e.data.savedAt)}`,e.warnings.length>0){this.saveStatus+=" · 일부 항목을 보정했습니다 (F12 콘솔 참고)";for(const t of e.warnings)Qe.warn(`저장 데이터 보정: ${t}`)}Qe.info(`저장 데이터를 불러왔습니다. 레벨 ${this.stats.level} · 골드 ${this.stats.gold}`);break;case"corrupt":this.saveStatus="저장 데이터가 손상되어 새로 시작합니다. 손상된 데이터는 따로 보관했습니다.",Qe.warn(e.message);break;case"newer":this.saveBlocked=!0,this.saveStatus="이 저장 데이터는 더 새로운 버전의 게임에서 만든 것이라 읽지 않습니다. 새 게임을 누르면 덮어씁니다.",Qe.warn(e.message);break;case"unavailable":this.saveStatus="이 브라우저에서는 저장이 되지 않습니다 (사생활 보호 모드 등).",Qe.warn("브라우저 저장소를 쓸 수 없어 진행이 저장되지 않습니다.");break;default:this.saveStatus="저장된 진행이 없습니다."}}markDirty(){this.saveDirty=!0}saveNow(){if(this.saveDirty=!1,this.saveTimer=0,this.saveBlocked)return!1;const e=Zm({stats:this.stats,equipment:this.equipment,difficulty:this.difficulty,records:this.records}),t=ig(this.storage,e);return t&&(this.hasSavedProgress=Ro(e),this.lastSavedAt=e.savedAt,this.saveStatus=`마지막 저장: ${Lo(e.savedAt)}`,this.menu?.visible&&this.menu.refresh()),t}progressText(){if(!this.runActive&&!this.hasSavedProgress)return"";const e=this.records,t=$t.filter(s=>gr(s,e.dungeonClears)).length,n=[`레벨 ${this.stats.level}`,`골드 ${this.stats.gold}`,`클리어 ${e.clears}회`,`열린 던전 ${t}/${$t.length}`];return e.bestScore>0&&n.push(`최고 점수 ${e.bestScore}`),this.runActive||n.push("이어하기는 던전 선택부터"),n.join(" · ")}getRecords(){return rs(this.records)}enterPlay(){this.mode="play",this.menu.hide(),this.guide.hide(),this.settingsUI.hide(),this.dungeonSelect.hide(),this.result.hide(),this.hud.show(),this.updateTouchVisibility(),this.lastTime=performance.now(),this.canvas.focus()}tryInteract(){if(this.ended||this.paused||this.player.health.isDead)return;const e=this.player.position,t=this.chests.nearest({x:e.x,z:e.z});if(!t||!this.chests.open(t))return;const n=this.loot.dropChest({x:t.x,z:t.z});this.effects.burst(new L(t.x,1,t.z),16765503,16,5),this.damageNumbers.showText(new L(t.x,1.8,t.z),"보물 상자!","#ffd23f"),Qe.info(`보물 상자 개봉: ${n.map(s=>s.kind==="equip"?s.item?.name:`${s.kind} ${s.amount}`).join(", ")}`)}toggleInventory(e=!this.inventoryUI.visible){e?(this.inventoryUI.show(),this.paused=!0):(this.inventoryUI.hide(),this.paused=!1,this.lastTime=performance.now()),this.mode==="menu"&&this.menu.refresh()}applyStats(){const e=this.player.health;e.maxHp=this.effectiveMaxHp(),e.hp>e.maxHp&&(e.hp=e.maxHp)}effectiveMaxHp(){return Math.max(1,Math.round((this.stats.maxHp+this.equipment.totals().maxHp)*this.settings.playerHpMul))}effectiveDamageMultiplier(){return this.stats.damageMultiplier*this.settings.playerDamageMul}statSummary(){const e=this.equipment.totals(),t=Math.round((X.combat.melee.damage+this.equipment.weaponAttack("melee"))*this.effectiveDamageMultiplier()),n=Math.round((X.combat.ranged.damage+this.equipment.weaponAttack("ranged"))*this.effectiveDamageMultiplier()),s=Math.round((1+e.moveSpeed)*100);return`레벨 ${this.stats.level} · 골드 ${this.stats.gold} · 근접 ${t} · 원거리 ${n} · 방어 ${e.defense} · 최대 체력 ${this.player.health.maxHp} · 속도 ${s}%`}restart(){this.spawner.clear(),this.spawner.spawnFromConfig(this.dungeonDef.spawns),this.unlockedNow=null,this.projectiles.clear(),this.damageNumbers.clear(),this.loot.clear(),this.chests.reset(),this.boss=null,this.bossDefeated=!1,this.mortars.length=0,this.hud.setBoss(null),this.player.reset(X.player.startPosition),this.player.health.reset(this.effectiveMaxHp()),this.controller.reset(),this.combat.reset(),this.result.hide(),this.ended=!1,Qe.info("전투를 다시 시작합니다.")}showResult(e,t){this.ended=!0,this.mode="result",this.runActive=!1,this.inventoryUI.hide(),this.touch.hide(),this.paused=!1,this.records.totalKills+=this.combat.kills,this.records.bestScore=Math.max(this.records.bestScore,this.combat.score),this.saveNow(),this.result.show(e,t)}dispose(){this.stop(),this.input.detach(),window.removeEventListener("resize",this.resize),window.removeEventListener("beforeunload",this.flushSave),document.removeEventListener("visibilitychange",this.onVisibility),this.spawner.dispose(),this.projectiles.dispose(),this.loot.dispose(),this.chests.dispose(),this.effects.dispose(),this.player.dispose(),this.dungeon.dispose(),this.renderer.dispose()}setPlayerPosition(e,t){this.player.position.set(e,0,t)}debugDefeatRegularEnemies(){for(const e of this.spawner.getEnemies())e.alive&&e!==this.boss&&this.combat.damageEnemy(e,99999,{x:0,z:1},0)}getDebugState(){const e=this.player.position,t=this.camera.position,n=this.input.getPointer();return{running:this.running,frames:this.frames,ended:this.ended,settings:{...this.settings},dungeon:{id:this.dungeonDef.id,name:this.dungeonDef.name,arenaHalfSize:this.dungeon.getArenaHalfSize(),obstacles:this.dungeon.getObstacleBoxes().length},dungeonSelectVisible:this.dungeonSelect.visible,unlockedNow:this.unlockedNow?.id??null,mortars:this.mortars.length,bossModel:this.bossCfg.model,settingsVisible:this.settingsUI.visible,touchVisible:this.touch.visible,pixelRatio:this.renderer.getPixelRatio(),interactButtonVisible:this.touch.visible&&!document.getElementById("touch-interact")?.hidden,shadowsEnabled:this.renderer.shadowMap.enabled,cameraDistanceScale:this.cameraCtrl.distanceScale,save:{status:this.saveStatus,lastSavedAt:this.lastSavedAt,hasSavedProgress:this.hasSavedProgress,blocked:this.saveBlocked,dirty:this.saveDirty,records:{...this.records}},player:{x:e.x,z:e.z,facing:this.player.facing,moving:this.player.moving,hp:this.player.health.hp,maxHp:this.player.health.maxHp},camera:{x:t.x,y:t.y,z:t.z},guideVisible:this.guide.visible,resultVisible:this.result.visible,mode:this.mode,menuVisible:this.menu.visible,runActive:this.runActive,enemies:this.spawner.getEnemies().map(s=>({type:s.type,x:s.position.x,z:s.position.z,hp:s.health.hp,state:s.ai.state})),aliveEnemies:this.spawner.aliveCount,projectiles:this.projectiles.count,playerY:this.player.jumpY,difficulty:this.difficulty,pickups:this.loot.count,stats:{level:this.stats.level,xp:this.stats.xp,xpToNext:this.stats.xpToNext,gold:this.stats.gold,maxHp:this.stats.maxHp},equipment:{inventory:this.equipment.inventory.length,equipped:Object.fromEntries(Object.entries(this.equipment.equipped).map(([s,r])=>[s,r?r.name:null])),totals:this.equipment.totals()},paused:this.paused,inventoryVisible:this.inventoryUI.visible,chests:{opened:this.chests.openedCount,total:this.chests.total,nearby:this.chests.nearest({x:this.player.position.x,z:this.player.position.z})!==null},prompt:this.currentPrompt,boss:this.boss?{alive:this.boss.alive,hp:this.boss.health.hp,maxHp:this.boss.health.maxHp,state:this.boss.bossAI.state,phase2:this.boss.phase2}:null,bossDefeated:this.bossDefeated,kills:this.combat.kills,score:this.combat.score,input:{pointerX:n.x,pointerY:n.y,pointerHas:n.has,pressed:this.input.getPressedCodes()}}}projectToScreen(e){const t=this.projTmp.copy(e).project(this.camera);return t.z>1?null:{x:(t.x+1)/2*this.canvas.clientWidth,y:(1-t.y)/2*this.canvas.clientHeight}}getAimPoint(){if(this.settings.touchControls)return this.nearestEnemyPoint(X.combat.autoAimRange);const e=this.input.getPointer();if(!e.has)return null;this.raycaster.setFromCamera(new Ge(e.x,e.y),this.camera);const t=this.raycaster.ray.intersectPlane(this.groundPlane,this.aimHit);return t?{x:t.x,z:t.z}:null}nearestEnemyPoint(e){const t=this.player.position;let n=null,s=e;for(const r of this.spawner.getEnemies()){if(!r.alive)continue;const a=Math.hypot(r.position.x-t.x,r.position.z-t.z);a<s&&(s=a,n=r)}return n?{x:n.position.x,z:n.position.z}:null}onEnemyAttack(e,t){if(this.ended)return;const n=this.player.position,s=e.position,r=Math.hypot(n.x-s.x,n.z-s.z)||1,a={x:(n.x-s.x)/r,z:(n.z-s.z)/r};if(t=t*ai(this.difficulty).enemyDamage,e.def.attackKind==="ranged"){this.projectiles.spawn({x:s.x+a.x*(e.radius+.3),z:s.z+a.z*(e.radius+.3)},a,{damage:t,speed:e.def.projectileSpeed??10,lifetime:3,radius:.2,knockback:0,color:16733559,friendly:!1});return}this.damagePlayer(t,{x:s.x,z:s.z})}damagePlayer(e,t){if(this.ended)return;const n=wm(e,this.equipment.totals().defense);if(!this.player.health.takeDamage(n))return;const s=this.player.position,r=Math.hypot(s.x-t.x,s.z-t.z)||1;this.controller.applyKnockback({x:(s.x-t.x)/r,z:(s.z-t.z)/r},X.player.hitKnockback),this.effects.burst(new L(s.x,1,s.z),16732025,6,4),this.settings.hitFlash&&this.hud.flashHit(),this.settings.showDamageNumbers&&this.damageNumbers.show(new L(s.x,2,s.z),n,"player"),this.player.health.isDead&&(this.records.deaths++,this.showResult("쓰러졌습니다",`처치 ${this.combat.kills} · 점수 ${this.combat.score} · 레벨 ${this.stats.level} · 골드 ${this.stats.gold}`),Qe.info("플레이어가 쓰러졌습니다."))}onCollect(e,t){const n=new L(t.x,1.4,t.z);if(e.kind==="heal")this.player.health.heal(e.amount),this.effects.burst(n,16732025,6,3),this.settings.showDamageNumbers&&this.damageNumbers.show(n,e.amount,"heal");else if(e.kind==="gold")this.stats.addGold(e.amount),this.markDirty(),this.effects.burst(n,16765503,4,2);else if(e.kind==="equip"){if(!e.item)return;if(this.equipment.add(e.item)){this.markDirty();const s=X.equipment.rarities[e.item.rarity].color;this.effects.burst(n,s,10,4),this.damageNumbers.showText(n,`획득: ${e.item.name}`,s)}else this.loot.spawn(e,t),this.damageNumbers.showText(n,"가방이 가득 찼어요","#ff6b90")}else{const s=this.stats.addXp(e.amount);if(this.markDirty(),this.effects.burst(n,6091480,4,2),s>0){const r=this.player.health;this.applyStats(),r.heal(Math.round(r.maxHp*X.progression.levelUpHealRatio));const a=this.player.position;this.effects.burst(new L(a.x,1,a.z),16765503,24,7),this.damageNumbers.show(new L(a.x,2.4,a.z),this.stats.level,"levelup"),Qe.info(`레벨 업! 레벨 ${this.stats.level} (최대 체력 ${r.maxHp}, 공격력 ×${this.stats.damageMultiplier.toFixed(2)})`)}}}spawnBoss(){const e=this.bossCfg,t=this.spawner.multipliers;this.boss=new vm({x:e.spawn.x,z:e.spawn.z},{hp:t.hp,speed:t.speed},e),this.spawner.addEnemy(this.boss),this.hud.showBanner(`${e.name} 등장!`),this.effects.burst(new L(e.spawn.x,1.5,e.spawn.z),e.color,30,9),Qe.info(`보스 등장: ${e.name} (체력 ${this.boss.health.maxHp})`)}onBossAttack(e,t){if(this.ended)return;const n=ai(this.difficulty).enemyDamage,s=e.position,r=this.player.position;if(t.kind==="contact")this.damagePlayer(t.damage*n,{x:s.x,z:s.z});else if(t.kind==="slam")this.effects.shockwave(new L(s.x,0,s.z),t.radius),this.effects.burst(new L(s.x,.5,s.z),16732025,20,6),Math.hypot(r.x-s.x,r.z-s.z)<=t.radius+X.player.radius&&this.player.jumpY<1&&this.damagePlayer(t.damage*n,{x:s.x,z:s.z});else if(t.kind==="summon"){const a=this.spawner.getEnemies().filter(l=>l.alive&&l.type===t.type).length,o=Math.max(0,Math.min(t.count,t.maxAlive-a));for(let l=0;l<o;l++){const c=l/Math.max(1,o)*Math.PI*2+Math.random()*.5,h=s.x+Math.sin(c)*(e.radius+1.2),u=s.z+Math.cos(c)*(e.radius+1.2);this.spawner.spawn(t.type,h,u)&&this.effects.burst(new L(h,1,u),9431295,10,5)}o>0&&this.hud.showBanner("부하 소환!",900)}else if(t.kind==="mortar")for(let a=0;a<t.count;a++){const o=Math.random()*Math.PI*2,l=a===0?0:Math.random()*t.spread,c=r.x+Math.sin(o)*l,h=r.z+Math.cos(o)*l;this.mortars.push({x:c,z:h,t:t.delay+a*.12,radius:t.radius,damage:t.damage*n}),this.effects.marker(new L(c,0,h),t.radius,t.delay+a*.12,16757071)}else{const a=Math.atan2(r.x-s.x,r.z-s.z);for(let o=0;o<t.count;o++){const l=t.aimed?a+(o-(t.count-1)/2)*Math.PI*2/t.count:o/t.count*Math.PI*2,c={x:Math.sin(l),z:Math.cos(l)};this.projectiles.spawn({x:s.x+c.x*(e.radius+.4),z:s.z+c.z*(e.radius+.4)},c,{damage:t.damage*n,speed:t.speed,lifetime:4,radius:.25,knockback:0,color:11561983,friendly:!1})}}}updateMortars(e){if(this.mortars.length===0)return;const t=this.player.position;for(let n=this.mortars.length-1;n>=0;n--){const s=this.mortars[n];if(s.t-=e,s.t>0||(this.mortars.splice(n,1),this.effects.shockwave(new L(s.x,0,s.z),s.radius,.4,16757071),this.effects.burst(new L(s.x,.6,s.z),16742981,14,6),this.ended))continue;Math.hypot(t.x-s.x,t.z-s.z)<=s.radius+X.player.radius&&this.player.jumpY<1&&this.damagePlayer(s.damage,{x:s.x,z:s.z})}}onBossDefeated(){const e=this.bossCfg,t={x:this.boss.position.x,z:this.boss.position.z};this.loot.spawn({kind:"gold",amount:Math.round(e.reward.goldMin+Math.random()*(e.reward.goldMax-e.reward.goldMin))},{x:t.x-1,z:t.z}),this.loot.spawn({kind:"xp",amount:e.reward.xp},{x:t.x+1,z:t.z}),this.loot.spawn({kind:"equip",amount:0,item:Rm(e.reward.equipMinRarity)},{x:t.x,z:t.z+1}),this.loot.spawn({kind:"heal",amount:X.loot.healAmount*2},{x:t.x,z:t.z-1}),this.records.clears++;const n=this.dungeonDef.id,s=this.records.dungeonClears[n]??0;this.records.dungeonClears[n]=s+1;const r=hm(n);this.unlockedNow=s===0&&r?r:null,this.markDirty(),this.hud.showBanner(this.unlockedNow?`던전 클리어! '${this.unlockedNow.name}' 이(가) 열렸습니다`:"던전 클리어!",3e3),Qe.info("보스를 처치했습니다. 던전 클리어!")}checkVictory(){if(!(this.ended||this.dungeonDef.spawns.length===0)){if(!this.boss){this.spawner.aliveCount===0&&this.spawnBoss();return}if(this.hud.setBoss(this.boss.alive?{name:this.bossCfg.name,hp:this.boss.health.hp,maxHp:this.boss.health.maxHp,phase2:this.boss.phase2}:null),!this.boss.alive&&!this.bossDefeated&&(this.bossDefeated=!0,this.onBossDefeated()),this.bossDefeated&&(this.loot.count===0||this.boss.removable)){const e=this.unlockedNow?` · 새 던전 '${this.unlockedNow.name}' 이(가) 열렸습니다!`:"";this.showResult("던전 클리어!",`${this.dungeonDef.name} · 처치 ${this.combat.kills} · 점수 ${this.combat.score} · 레벨 ${this.stats.level} · 골드 ${this.stats.gold}${e}`)}}}updateFps(e){this.settings.showFps&&(this.fpsFrames++,this.fpsTime+=e,this.fpsTime>=.5&&(this.guide.setHudText(`FPS ${Math.round(this.fpsFrames/this.fpsTime)}`),this.fpsFrames=0,this.fpsTime=0))}}function Lo(i){const e=new Date(i);if(Number.isNaN(e.getTime())||e.getTime()===0)return"알 수 없음";const t=n=>String(n).padStart(2,"0");return`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())} ${t(e.getHours())}:${t(e.getMinutes())}`}function og(i){let e=null;const t=(n,s)=>{e||(e=document.createElement("div"),e.className="error-box",i.appendChild(e)),e.innerHTML=`<b>${n}</b>
${s}

자세한 내용은 F12 → Console 탭, 해결 방법은 TROUBLESHOOTING.md 를 확인하세요.`};window.addEventListener("error",n=>{t("게임 실행 중 오류가 발생했습니다.",String(n.message||n.error||"알 수 없는 오류"))}),window.addEventListener("unhandledrejection",n=>{const s=n.reason;t("게임 실행 중 오류가 발생했습니다.",String(s?.message??s??"알 수 없는 오류"))})}function lg(i,e){const t=document.createElement("div");t.className="error-box",t.innerHTML=`<b>게임을 시작할 수 없습니다.</b>
${e}`,i.appendChild(t)}const Ml=document.getElementById("game-canvas"),gs=document.getElementById("ui-root");if(!Ml||!gs)throw new Error("index.html 에 #game-canvas 또는 #ui-root 요소가 없습니다.");og(gs);try{const i=new ag(Ml,gs);i.start(),new URLSearchParams(location.search).has("debug")&&(window.__heroX=i)}catch(i){Qe.error("게임을 시작하지 못했습니다.",i),lg(gs,`이 브라우저에서 3D 화면(WebGL)을 켤 수 없거나 초기화에 실패했습니다.
최신 Chrome 또는 Edge 로 열어 보고, 그래도 안 되면 TROUBLESHOOTING.md 를 참고하세요.
오류: ${i instanceof Error?i.message:String(i)}`)}
