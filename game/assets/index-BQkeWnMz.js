(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ha="160",Jh=0,Mo=1,Qh=2,Uc=1,Fc=2,Sn=3,An=0,Pt=1,Ot=2,Tn=0,zi=1,ar=2,So=3,bo=4,eu=5,ei=100,tu=101,nu=102,Eo=103,wo=104,iu=200,su=201,ru=202,au=203,xa=204,va=205,ou=206,lu=207,cu=208,hu=209,uu=210,du=211,fu=212,pu=213,mu=214,gu=0,_u=1,xu=2,or=3,vu=4,yu=5,Mu=6,Su=7,Ga=0,bu=1,Eu=2,Vn=0,kc=1,Oc=2,zc=3,Va=4,wu=5,Bc=6,To="attached",Tu="detached",Hc=300,Gi=301,Vi=302,ya=303,Ma=304,xr=306,qn=1e3,$t=1001,lr=1002,Mt=1003,Sa=1004,nr=1005,Ht=1006,Gc=1007,ci=1008,Wn=1009,Au=1010,Ru=1011,Wa=1012,Vc=1013,Bn=1014,En=1015,dn=1016,Wc=1017,qc=1018,ii=1020,Cu=1021,Yt=1023,Lu=1024,Pu=1025,si=1026,Wi=1027,Iu=1028,Xc=1029,Du=1030,jc=1031,$c=1033,Ir=33776,Dr=33777,Nr=33778,Ur=33779,Ao=35840,Ro=35841,Co=35842,Lo=35843,Yc=36196,Po=37492,Io=37496,Do=37808,No=37809,Uo=37810,Fo=37811,ko=37812,Oo=37813,zo=37814,Bo=37815,Ho=37816,Go=37817,Vo=37818,Wo=37819,qo=37820,Xo=37821,Fr=36492,jo=36494,$o=36495,Nu=36283,Yo=36284,Ko=36285,Zo=36286,Kc=2200,Zc=2201,Uu=2202,xs=2300,qi=2301,kr=2302,Di=2400,Ni=2401,cr=2402,qa=2500,Fu=2501,ku=0,Jc=1,ba=2,Qc=3e3,ri=3001,Ou=3200,zu=3201,Xa=0,Bu=1,Kt="",ot="srgb",bt="srgb-linear",ja="display-p3",vr="display-p3-linear",hr="linear",rt="srgb",ur="rec709",dr="p3",mi=7680,Jo=519,Hu=512,Gu=513,Vu=514,eh=515,Wu=516,qu=517,Xu=518,ju=519,Ea=35044,Qo="300 es",wa=1035,wn=2e3,fr=2001;class pi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}}const At=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let el=1234567;const ps=Math.PI/180,Xi=180/Math.PI;function rn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(At[r&255]+At[r>>8&255]+At[r>>16&255]+At[r>>24&255]+"-"+At[e&255]+At[e>>8&255]+"-"+At[e>>16&15|64]+At[e>>24&255]+"-"+At[t&63|128]+At[t>>8&255]+"-"+At[t>>16&255]+At[t>>24&255]+At[n&255]+At[n>>8&255]+At[n>>16&255]+At[n>>24&255]).toLowerCase()}function Ct(r,e,t){return Math.max(e,Math.min(t,r))}function $a(r,e){return(r%e+e)%e}function $u(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Yu(r,e,t){return r!==e?(t-r)/(e-r):0}function ms(r,e,t){return(1-t)*r+t*e}function Ku(r,e,t,n){return ms(r,e,1-Math.exp(-t*n))}function Zu(r,e=1){return e-Math.abs($a(r,e*2)-e)}function Ju(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function Qu(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function ed(r,e){return r+Math.floor(Math.random()*(e-r+1))}function td(r,e){return r+Math.random()*(e-r)}function nd(r){return r*(.5-Math.random())}function id(r){r!==void 0&&(el=r);let e=el+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function sd(r){return r*ps}function rd(r){return r*Xi}function Ta(r){return(r&r-1)===0&&r!==0}function ad(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function pr(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function od(r,e,t,n,i){const s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),h=a((e+n)/2),u=s((e-n)/2),d=a((e-n)/2),f=s((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":r.set(o*h,l*u,l*d,o*c);break;case"YZY":r.set(l*d,o*h,l*u,o*c);break;case"ZXZ":r.set(l*u,l*d,o*h,o*c);break;case"XZX":r.set(o*h,l*g,l*f,o*c);break;case"YXY":r.set(l*f,o*h,l*g,o*c);break;case"ZYZ":r.set(l*g,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function un(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function et(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const ni={DEG2RAD:ps,RAD2DEG:Xi,generateUUID:rn,clamp:Ct,euclideanModulo:$a,mapLinear:$u,inverseLerp:Yu,lerp:ms,damp:Ku,pingpong:Zu,smoothstep:Ju,smootherstep:Qu,randInt:ed,randFloat:td,randFloatSpread:nd,seededRandom:id,degToRad:sd,radToDeg:rd,isPowerOfTwo:Ta,ceilPowerOfTwo:ad,floorPowerOfTwo:pr,setQuaternionFromProperEuler:od,normalize:et,denormalize:un};class ve{constructor(e=0,t=0){ve.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class We{constructor(e,t,n,i,s,a,o,l,c){We.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=i[0],m=i[3],p=i[6],M=i[1],x=i[4],v=i[7],R=i[2],w=i[5],A=i[8];return s[0]=a*_+o*M+l*R,s[3]=a*m+o*x+l*w,s[6]=a*p+o*v+l*A,s[1]=c*_+h*M+u*R,s[4]=c*m+h*x+u*w,s[7]=c*p+h*v+u*A,s[2]=d*_+f*M+g*R,s[5]=d*m+f*x+g*w,s[8]=d*p+f*v+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+i*s*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*s,f=c*s-a*l,g=t*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(i*c-h*n)*_,e[2]=(o*n-i*a)*_,e[3]=d*_,e[4]=(h*t-i*l)*_,e[5]=(i*s-o*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*s)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Or.makeScale(e,t)),this}rotate(e){return this.premultiply(Or.makeRotation(-e)),this}translate(e,t){return this.premultiply(Or.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Or=new We;function th(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function vs(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function ld(){const r=vs("canvas");return r.style.display="block",r}const tl={};function gs(r){r in tl||(tl[r]=!0,console.warn(r))}const nl=new We().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),il=new We().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ts={[bt]:{transfer:hr,primaries:ur,toReference:r=>r,fromReference:r=>r},[ot]:{transfer:rt,primaries:ur,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[vr]:{transfer:hr,primaries:dr,toReference:r=>r.applyMatrix3(il),fromReference:r=>r.applyMatrix3(nl)},[ja]:{transfer:rt,primaries:dr,toReference:r=>r.convertSRGBToLinear().applyMatrix3(il),fromReference:r=>r.applyMatrix3(nl).convertLinearToSRGB()}},cd=new Set([bt,vr]),Ke={enabled:!0,_workingColorSpace:bt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!cd.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const n=Ts[e].toReference,i=Ts[t].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return Ts[r].primaries},getTransfer:function(r){return r===Kt?hr:Ts[r].transfer}};function Bi(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function zr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let gi;class nh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{gi===void 0&&(gi=vs("canvas")),gi.width=e.width,gi.height=e.height;const n=gi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=gi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=vs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=Bi(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Bi(t[n]/255)*255):t[n]=Bi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let hd=0;class ih{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:hd++}),this.uuid=rn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(Br(i[a].image)):s.push(Br(i[a]))}else s=Br(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function Br(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?nh.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let ud=0;class St extends pi{constructor(e=St.DEFAULT_IMAGE,t=St.DEFAULT_MAPPING,n=$t,i=$t,s=Ht,a=ci,o=Yt,l=Wn,c=St.DEFAULT_ANISOTROPY,h=Kt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ud++}),this.uuid=rn(),this.name="",this.source=new ih(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ve(0,0),this.repeat=new ve(1,1),this.center=new ve(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(gs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===ri?ot:Kt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Hc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case qn:e.x=e.x-Math.floor(e.x);break;case $t:e.x=e.x<0?0:1;break;case lr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case qn:e.y=e.y-Math.floor(e.y);break;case $t:e.y=e.y<0?0:1;break;case lr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return gs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===ot?ri:Qc}set encoding(e){gs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===ri?ot:Kt}}St.DEFAULT_IMAGE=null;St.DEFAULT_MAPPING=Hc;St.DEFAULT_ANISOTROPY=1;class tt{constructor(e=0,t=0,n=0,i=1){tt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,v=(f+1)/2,R=(p+1)/2,w=(h+d)/4,A=(u+_)/4,P=(g+m)/4;return x>v&&x>R?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=w/n,s=A/n):v>R?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=w/i,s=P/i):R<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(R),n=A/s,i=P/s),this.set(n,i,s,t),this}let M=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-_)/M,this.z=(d-h)/M,this.w=Math.acos((c+f+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class dd extends pi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new tt(0,0,e,t),this.scissorTest=!1,this.viewport=new tt(0,0,e,t);const i={width:e,height:t,depth:1};n.encoding!==void 0&&(gs("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===ri?ot:Kt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ht,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new St(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new ih(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Zt extends dd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class sh extends St{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Mt,this.minFilter=Mt,this.wrapR=$t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class fd extends St{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Mt,this.minFilter=Mt,this.wrapR=$t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jt{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=s[a+0],f=s[a+1],g=s[a+2],_=s[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==d||c!==f||h!==g){let m=1-o;const p=l*d+c*f+h*g+u*_,M=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const R=Math.sqrt(x),w=Math.atan2(R,p*M);m=Math.sin(m*w)/R,o=Math.sin(o*w)/R}const v=o*M;if(l=l*m+d*v,c=c*m+f*v,h=h*m+g*v,u=u*m+_*v,m===1-o){const R=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=R,c*=R,h*=R,u*=R}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[a],d=s[a+1],f=s[a+2],g=s[a+3];return e[t]=o*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-o*f,e[t+2]=c*g+h*f+o*d-l*u,e[t+3]=h*g-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(s/2),d=l(n/2),f=l(i/2),g=l(s/2);switch(a){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(a-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(s-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ct(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-s*l,this._y=i*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(s),n*Math.cos(s),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(e=0,t=0,n=0){C.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(sl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(sl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-s*u,this.z=i+l*u+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Hr.copy(this).projectOnVector(e),this.sub(Hr)}reflect(e){return this.sub(Hr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ct(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Hr=new C,sl=new Jt;class ln{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Qt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Qt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Qt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Qt):Qt.fromBufferAttribute(s,a),Qt.applyMatrix4(e.matrixWorld),this.expandByPoint(Qt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),As.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),As.copy(n.boundingBox)),As.applyMatrix4(e.matrixWorld),this.union(As)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Qt),Qt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(rs),Rs.subVectors(this.max,rs),_i.subVectors(e.a,rs),xi.subVectors(e.b,rs),vi.subVectors(e.c,rs),Cn.subVectors(xi,_i),Ln.subVectors(vi,xi),$n.subVectors(_i,vi);let t=[0,-Cn.z,Cn.y,0,-Ln.z,Ln.y,0,-$n.z,$n.y,Cn.z,0,-Cn.x,Ln.z,0,-Ln.x,$n.z,0,-$n.x,-Cn.y,Cn.x,0,-Ln.y,Ln.x,0,-$n.y,$n.x,0];return!Gr(t,_i,xi,vi,Rs)||(t=[1,0,0,0,1,0,0,0,1],!Gr(t,_i,xi,vi,Rs))?!1:(Cs.crossVectors(Cn,Ln),t=[Cs.x,Cs.y,Cs.z],Gr(t,_i,xi,vi,Rs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Qt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const gn=[new C,new C,new C,new C,new C,new C,new C,new C],Qt=new C,As=new ln,_i=new C,xi=new C,vi=new C,Cn=new C,Ln=new C,$n=new C,rs=new C,Rs=new C,Cs=new C,Yn=new C;function Gr(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Yn.fromArray(r,s);const o=i.x*Math.abs(Yn.x)+i.y*Math.abs(Yn.y)+i.z*Math.abs(Yn.z),l=e.dot(Yn),c=t.dot(Yn),h=n.dot(Yn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const pd=new ln,as=new C,Vr=new C;class fn{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):pd.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;as.subVectors(e,this.center);const t=as.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(as,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Vr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(as.copy(e.center).add(Vr)),this.expandByPoint(as.copy(e.center).sub(Vr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const _n=new C,Wr=new C,Ls=new C,Pn=new C,qr=new C,Ps=new C,Xr=new C;class ys{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_n)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=_n.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_n.copy(this.origin).addScaledVector(this.direction,t),_n.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Wr.copy(e).add(t).multiplyScalar(.5),Ls.copy(t).sub(e).normalize(),Pn.copy(this.origin).sub(Wr);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Ls),o=Pn.dot(this.direction),l=-Pn.dot(Ls),c=Pn.lengthSq(),h=Math.abs(1-a*a);let u,d,f,g;if(h>0)if(u=a*l-o,d=a*o-l,g=s*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Wr).addScaledVector(Ls,d),f}intersectSphere(e,t){_n.subVectors(e.center,this.origin);const n=_n.dot(this.direction),i=_n.dot(_n)-n*n,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,_n)!==null}intersectTriangle(e,t,n,i,s){qr.subVectors(t,e),Ps.subVectors(n,e),Xr.crossVectors(qr,Ps);let a=this.direction.dot(Xr),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Pn.subVectors(this.origin,e);const l=o*this.direction.dot(Ps.crossVectors(Pn,Ps));if(l<0)return null;const c=o*this.direction.dot(qr.cross(Pn));if(c<0||l+c>a)return null;const h=-o*Pn.dot(Xr);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class He{constructor(e,t,n,i,s,a,o,l,c,h,u,d,f,g,_,m){He.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,h,u,d,f,g,_,m)}set(e,t,n,i,s,a,o,l,c,h,u,d,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new He().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/yi.setFromMatrixColumn(e,0).length(),s=1/yi.setFromMatrixColumn(e,1).length(),a=1/yi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=a*h,f=a*u,g=o*h,_=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-_*c,t[9]=-o*l,t[2]=_-d*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d+_*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=_+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d-_*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,f=a*u,g=o*h,_=o*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=a*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(md,e,gd)}lookAt(e,t,n){const i=this.elements;return Vt.subVectors(e,t),Vt.lengthSq()===0&&(Vt.z=1),Vt.normalize(),In.crossVectors(n,Vt),In.lengthSq()===0&&(Math.abs(n.z)===1?Vt.x+=1e-4:Vt.z+=1e-4,Vt.normalize(),In.crossVectors(n,Vt)),In.normalize(),Is.crossVectors(Vt,In),i[0]=In.x,i[4]=Is.x,i[8]=Vt.x,i[1]=In.y,i[5]=Is.y,i[9]=Vt.y,i[2]=In.z,i[6]=Is.z,i[10]=Vt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],M=n[3],x=n[7],v=n[11],R=n[15],w=i[0],A=i[4],P=i[8],y=i[12],b=i[1],U=i[5],N=i[9],Y=i[13],I=i[2],F=i[6],V=i[10],j=i[14],q=i[3],X=i[7],$=i[11],te=i[15];return s[0]=a*w+o*b+l*I+c*q,s[4]=a*A+o*U+l*F+c*X,s[8]=a*P+o*N+l*V+c*$,s[12]=a*y+o*Y+l*j+c*te,s[1]=h*w+u*b+d*I+f*q,s[5]=h*A+u*U+d*F+f*X,s[9]=h*P+u*N+d*V+f*$,s[13]=h*y+u*Y+d*j+f*te,s[2]=g*w+_*b+m*I+p*q,s[6]=g*A+_*U+m*F+p*X,s[10]=g*P+_*N+m*V+p*$,s[14]=g*y+_*Y+m*j+p*te,s[3]=M*w+x*b+v*I+R*q,s[7]=M*A+x*U+v*F+R*X,s[11]=M*P+x*N+v*V+R*$,s[15]=M*y+x*Y+v*j+R*te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+s*l*u-i*c*u-s*o*d+n*c*d+i*o*f-n*l*f)+_*(+t*l*f-t*c*d+s*a*d-i*a*f+i*c*h-s*l*h)+m*(+t*c*u-t*o*f-s*a*u+n*a*f+s*o*h-n*c*h)+p*(-i*o*h-t*l*u+t*o*d+i*a*u-n*a*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],M=u*m*c-_*d*c+_*l*f-o*m*f-u*l*p+o*d*p,x=g*d*c-h*m*c-g*l*f+a*m*f+h*l*p-a*d*p,v=h*_*c-g*u*c+g*o*f-a*_*f-h*o*p+a*u*p,R=g*u*l-h*_*l-g*o*d+a*_*d+h*o*m-a*u*m,w=t*M+n*x+i*v+s*R;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return e[0]=M*A,e[1]=(_*d*s-u*m*s-_*i*f+n*m*f+u*i*p-n*d*p)*A,e[2]=(o*m*s-_*l*s+_*i*c-n*m*c-o*i*p+n*l*p)*A,e[3]=(u*l*s-o*d*s-u*i*c+n*d*c+o*i*f-n*l*f)*A,e[4]=x*A,e[5]=(h*m*s-g*d*s+g*i*f-t*m*f-h*i*p+t*d*p)*A,e[6]=(g*l*s-a*m*s-g*i*c+t*m*c+a*i*p-t*l*p)*A,e[7]=(a*d*s-h*l*s+h*i*c-t*d*c-a*i*f+t*l*f)*A,e[8]=v*A,e[9]=(g*u*s-h*_*s-g*n*f+t*_*f+h*n*p-t*u*p)*A,e[10]=(a*_*s-g*o*s+g*n*c-t*_*c-a*n*p+t*o*p)*A,e[11]=(h*o*s-a*u*s-h*n*c+t*u*c+a*n*f-t*o*f)*A,e[12]=R*A,e[13]=(h*_*i-g*u*i+g*n*d-t*_*d-h*n*m+t*u*m)*A,e[14]=(g*o*i-a*_*i-g*n*l+t*_*l+a*n*m-t*o*m)*A,e[15]=(a*u*i-h*o*i+h*n*l-t*u*l-a*n*d+t*o*d)*A,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,u=o+o,d=s*c,f=s*h,g=s*u,_=a*h,m=a*u,p=o*u,M=l*c,x=l*h,v=l*u,R=n.x,w=n.y,A=n.z;return i[0]=(1-(_+p))*R,i[1]=(f+v)*R,i[2]=(g-x)*R,i[3]=0,i[4]=(f-v)*w,i[5]=(1-(d+p))*w,i[6]=(m+M)*w,i[7]=0,i[8]=(g+x)*A,i[9]=(m-M)*A,i[10]=(1-(d+_))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=yi.set(i[0],i[1],i[2]).length();const a=yi.set(i[4],i[5],i[6]).length(),o=yi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],en.copy(this);const c=1/s,h=1/a,u=1/o;return en.elements[0]*=c,en.elements[1]*=c,en.elements[2]*=c,en.elements[4]*=h,en.elements[5]*=h,en.elements[6]*=h,en.elements[8]*=u,en.elements[9]*=u,en.elements[10]*=u,t.setFromRotationMatrix(en),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=wn){const l=this.elements,c=2*s/(t-e),h=2*s/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let f,g;if(o===wn)f=-(a+s)/(a-s),g=-2*a*s/(a-s);else if(o===fr)f=-a/(a-s),g=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=wn){const l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(a-s),d=(t+e)*c,f=(n+i)*h;let g,_;if(o===wn)g=(a+s)*u,_=-2*u;else if(o===fr)g=s*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const yi=new C,en=new He,md=new C(0,0,0),gd=new C(1,1,1),In=new C,Is=new C,Vt=new C,rl=new He,al=new Jt;class yr{constructor(e=0,t=0,n=0,i=yr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Ct(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ct(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ct(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ct(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Ct(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ct(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return rl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(rl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return al.setFromEuler(this),this.setFromQuaternion(al,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}yr.DEFAULT_ORDER="XYZ";class Ya{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let _d=0;const ol=new C,Mi=new Jt,xn=new He,Ds=new C,os=new C,xd=new C,vd=new Jt,ll=new C(1,0,0),cl=new C(0,1,0),hl=new C(0,0,1),yd={type:"added"},Md={type:"removed"};class lt extends pi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_d++}),this.uuid=rn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=lt.DEFAULT_UP.clone();const e=new C,t=new yr,n=new Jt,i=new C(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new He},normalMatrix:{value:new We}}),this.matrix=new He,this.matrixWorld=new He,this.matrixAutoUpdate=lt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ya,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Mi.setFromAxisAngle(e,t),this.quaternion.multiply(Mi),this}rotateOnWorldAxis(e,t){return Mi.setFromAxisAngle(e,t),this.quaternion.premultiply(Mi),this}rotateX(e){return this.rotateOnAxis(ll,e)}rotateY(e){return this.rotateOnAxis(cl,e)}rotateZ(e){return this.rotateOnAxis(hl,e)}translateOnAxis(e,t){return ol.copy(e).applyQuaternion(this.quaternion),this.position.add(ol.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ll,e)}translateY(e){return this.translateOnAxis(cl,e)}translateZ(e){return this.translateOnAxis(hl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ds.copy(e):Ds.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),os.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(os,Ds,this.up):xn.lookAt(Ds,os,this.up),this.quaternion.setFromRotationMatrix(xn),i&&(xn.extractRotation(i.matrixWorld),Mi.setFromRotationMatrix(xn),this.quaternion.premultiply(Mi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(yd)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Md)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xn.multiply(e.parent.matrixWorld)),e.applyMatrix4(xn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(os,e,xd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(os,vd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let s=0,a=i.length;s<a;s++){const o=i[s];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}lt.DEFAULT_UP=new C(0,1,0);lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const tn=new C,vn=new C,jr=new C,yn=new C,Si=new C,bi=new C,ul=new C,$r=new C,Yr=new C,Kr=new C;let Ns=!1;class nn{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),tn.subVectors(e,t),i.cross(tn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){tn.subVectors(i,t),vn.subVectors(n,t),jr.subVectors(e,t);const a=tn.dot(tn),o=tn.dot(vn),l=tn.dot(jr),c=vn.dot(vn),h=vn.dot(jr),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,g=(a*h-o*l)*d;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,yn)===null?!1:yn.x>=0&&yn.y>=0&&yn.x+yn.y<=1}static getUV(e,t,n,i,s,a,o,l){return Ns===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ns=!0),this.getInterpolation(e,t,n,i,s,a,o,l)}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,yn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,yn.x),l.addScaledVector(a,yn.y),l.addScaledVector(o,yn.z),l)}static isFrontFacing(e,t,n,i){return tn.subVectors(n,t),vn.subVectors(e,t),tn.cross(vn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return tn.subVectors(this.c,this.b),vn.subVectors(this.a,this.b),tn.cross(vn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return nn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return nn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,s){return Ns===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ns=!0),nn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}getInterpolation(e,t,n,i,s){return nn.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return nn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return nn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let a,o;Si.subVectors(i,n),bi.subVectors(s,n),$r.subVectors(e,n);const l=Si.dot($r),c=bi.dot($r);if(l<=0&&c<=0)return t.copy(n);Yr.subVectors(e,i);const h=Si.dot(Yr),u=bi.dot(Yr);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Si,a);Kr.subVectors(e,s);const f=Si.dot(Kr),g=bi.dot(Kr);if(g>=0&&f<=g)return t.copy(s);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(bi,o);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return ul.subVectors(s,i),o=(u-h)/(u-h+(f-g)),t.copy(i).addScaledVector(ul,o);const p=1/(m+_+d);return a=_*p,o=d*p,t.copy(n).addScaledVector(Si,a).addScaledVector(bi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const rh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Dn={h:0,s:0,l:0},Us={h:0,s:0,l:0};function Zr(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class ue{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ot){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ke.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Ke.workingColorSpace){if(e=$a(e,1),t=Ct(t,0,1),n=Ct(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Zr(a,s,e+1/3),this.g=Zr(a,s,e),this.b=Zr(a,s,e-1/3)}return Ke.toWorkingColorSpace(this,i),this}setStyle(e,t=ot){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ot){const n=rh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Bi(e.r),this.g=Bi(e.g),this.b=Bi(e.b),this}copyLinearToSRGB(e){return this.r=zr(e.r),this.g=zr(e.g),this.b=zr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ot){return Ke.fromWorkingColorSpace(Rt.copy(this),e),Math.round(Ct(Rt.r*255,0,255))*65536+Math.round(Ct(Rt.g*255,0,255))*256+Math.round(Ct(Rt.b*255,0,255))}getHexString(e=ot){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.fromWorkingColorSpace(Rt.copy(this),t);const n=Rt.r,i=Rt.g,s=Rt.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ke.workingColorSpace){return Ke.fromWorkingColorSpace(Rt.copy(this),t),e.r=Rt.r,e.g=Rt.g,e.b=Rt.b,e}getStyle(e=ot){Ke.fromWorkingColorSpace(Rt.copy(this),e);const t=Rt.r,n=Rt.g,i=Rt.b;return e!==ot?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Dn),this.setHSL(Dn.h+e,Dn.s+t,Dn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Dn),e.getHSL(Us);const n=ms(Dn.h,Us.h,t),i=ms(Dn.s,Us.s,t),s=ms(Dn.l,Us.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Rt=new ue;ue.NAMES=rh;let Sd=0;class an extends pi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Sd++}),this.uuid=rn(),this.name="",this.type="Material",this.blending=zi,this.side=An,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xa,this.blendDst=va,this.blendEquation=ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ue(0,0,0),this.blendAlpha=0,this.depthFunc=or,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Jo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=mi,this.stencilZFail=mi,this.stencilZPass=mi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==zi&&(n.blending=this.blending),this.side!==An&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==xa&&(n.blendSrc=this.blendSrc),this.blendDst!==va&&(n.blendDst=this.blendDst),this.blendEquation!==ei&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==or&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Jo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==mi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==mi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==mi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class zt extends an{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ga,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const pt=new C,Fs=new ve;class It{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ea,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Fs.fromBufferAttribute(this,t),Fs.applyMatrix3(e),this.setXY(t,Fs.x,Fs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.applyMatrix3(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.applyMatrix4(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.applyNormalMatrix(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.transformDirection(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=un(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=et(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=un(t,this.array)),t}setX(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=un(t,this.array)),t}setY(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=un(t,this.array)),t}setZ(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=un(t,this.array)),t}setW(e,t){return this.normalized&&(t=et(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array),s=et(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ea&&(e.usage=this.usage),e}}class ah extends It{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class oh extends It{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class at extends It{constructor(e,t,n){super(new Float32Array(e),t,n)}}let bd=0;const Xt=new He,Jr=new lt,Ei=new C,Wt=new ln,ls=new ln,yt=new C;class wt extends pi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:bd++}),this.uuid=rn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(th(e)?oh:ah)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new We().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Xt.makeRotationFromQuaternion(e),this.applyMatrix4(Xt),this}rotateX(e){return Xt.makeRotationX(e),this.applyMatrix4(Xt),this}rotateY(e){return Xt.makeRotationY(e),this.applyMatrix4(Xt),this}rotateZ(e){return Xt.makeRotationZ(e),this.applyMatrix4(Xt),this}translate(e,t,n){return Xt.makeTranslation(e,t,n),this.applyMatrix4(Xt),this}scale(e,t,n){return Xt.makeScale(e,t,n),this.applyMatrix4(Xt),this}lookAt(e){return Jr.lookAt(e),Jr.updateMatrix(),this.applyMatrix4(Jr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ei).negate(),this.translate(Ei.x,Ei.y,Ei.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new at(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ln);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Wt.setFromBufferAttribute(s),this.morphTargetsRelative?(yt.addVectors(this.boundingBox.min,Wt.min),this.boundingBox.expandByPoint(yt),yt.addVectors(this.boundingBox.max,Wt.max),this.boundingBox.expandByPoint(yt)):(this.boundingBox.expandByPoint(Wt.min),this.boundingBox.expandByPoint(Wt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new C,1/0);return}if(e){const n=this.boundingSphere.center;if(Wt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];ls.setFromBufferAttribute(o),this.morphTargetsRelative?(yt.addVectors(Wt.min,ls.min),Wt.expandByPoint(yt),yt.addVectors(Wt.max,ls.max),Wt.expandByPoint(yt)):(Wt.expandByPoint(ls.min),Wt.expandByPoint(ls.max))}Wt.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)yt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(yt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)yt.fromBufferAttribute(o,c),l&&(Ei.fromBufferAttribute(e,c),yt.add(Ei)),i=Math.max(i,n.distanceToSquared(yt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,s=t.normal.array,a=t.uv.array,o=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new It(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let b=0;b<o;b++)c[b]=new C,h[b]=new C;const u=new C,d=new C,f=new C,g=new ve,_=new ve,m=new ve,p=new C,M=new C;function x(b,U,N){u.fromArray(i,b*3),d.fromArray(i,U*3),f.fromArray(i,N*3),g.fromArray(a,b*2),_.fromArray(a,U*2),m.fromArray(a,N*2),d.sub(u),f.sub(u),_.sub(g),m.sub(g);const Y=1/(_.x*m.y-m.x*_.y);isFinite(Y)&&(p.copy(d).multiplyScalar(m.y).addScaledVector(f,-_.y).multiplyScalar(Y),M.copy(f).multiplyScalar(_.x).addScaledVector(d,-m.x).multiplyScalar(Y),c[b].add(p),c[U].add(p),c[N].add(p),h[b].add(M),h[U].add(M),h[N].add(M))}let v=this.groups;v.length===0&&(v=[{start:0,count:n.length}]);for(let b=0,U=v.length;b<U;++b){const N=v[b],Y=N.start,I=N.count;for(let F=Y,V=Y+I;F<V;F+=3)x(n[F+0],n[F+1],n[F+2])}const R=new C,w=new C,A=new C,P=new C;function y(b){A.fromArray(s,b*3),P.copy(A);const U=c[b];R.copy(U),R.sub(A.multiplyScalar(A.dot(U))).normalize(),w.crossVectors(P,U);const Y=w.dot(h[b])<0?-1:1;l[b*4]=R.x,l[b*4+1]=R.y,l[b*4+2]=R.z,l[b*4+3]=Y}for(let b=0,U=v.length;b<U;++b){const N=v[b],Y=N.start,I=N.count;for(let F=Y,V=Y+I;F<V;F+=3)y(n[F+0]),y(n[F+1]),y(n[F+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new It(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new C,s=new C,a=new C,o=new C,l=new C,c=new C,h=new C,u=new C;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)yt.fromBufferAttribute(e,t),yt.normalize(),e.setXYZ(t,yt.x,yt.y,yt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new It(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new wt,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const dl=new He,Kn=new ys,ks=new fn,fl=new C,wi=new C,Ti=new C,Ai=new C,Qr=new C,Os=new C,zs=new ve,Bs=new ve,Hs=new ve,pl=new C,ml=new C,gl=new C,Gs=new C,Vs=new C;class le extends lt{constructor(e=new wt,t=new zt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){Os.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],u=s[l];h!==0&&(Qr.fromBufferAttribute(u,e),a?Os.addScaledVector(Qr,h):Os.addScaledVector(Qr.sub(t),h))}t.add(Os)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ks.copy(n.boundingSphere),ks.applyMatrix4(s),Kn.copy(e.ray).recast(e.near),!(ks.containsPoint(Kn.origin)===!1&&(Kn.intersectSphere(ks,fl)===null||Kn.origin.distanceToSquared(fl)>(e.far-e.near)**2))&&(dl.copy(s).invert(),Kn.copy(e.ray).applyMatrix4(dl),!(n.boundingBox!==null&&Kn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Kn)))}_computeIntersections(e,t,n){let i;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),x=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let v=M,R=x;v<R;v+=3){const w=o.getX(v),A=o.getX(v+1),P=o.getX(v+2);i=Ws(this,p,e,n,c,h,u,w,A,P),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const M=o.getX(m),x=o.getX(m+1),v=o.getX(m+2);i=Ws(this,a,e,n,c,h,u,M,x,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),x=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let v=M,R=x;v<R;v+=3){const w=v,A=v+1,P=v+2;i=Ws(this,p,e,n,c,h,u,w,A,P),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const M=m,x=m+1,v=m+2;i=Ws(this,a,e,n,c,h,u,M,x,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function Ed(r,e,t,n,i,s,a,o){let l;if(e.side===Pt?l=n.intersectTriangle(a,s,i,!0,o):l=n.intersectTriangle(i,s,a,e.side===An,o),l===null)return null;Vs.copy(o),Vs.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Vs);return c<t.near||c>t.far?null:{distance:c,point:Vs.clone(),object:r}}function Ws(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,wi),r.getVertexPosition(l,Ti),r.getVertexPosition(c,Ai);const h=Ed(r,e,t,n,wi,Ti,Ai,Gs);if(h){i&&(zs.fromBufferAttribute(i,o),Bs.fromBufferAttribute(i,l),Hs.fromBufferAttribute(i,c),h.uv=nn.getInterpolation(Gs,wi,Ti,Ai,zs,Bs,Hs,new ve)),s&&(zs.fromBufferAttribute(s,o),Bs.fromBufferAttribute(s,l),Hs.fromBufferAttribute(s,c),h.uv1=nn.getInterpolation(Gs,wi,Ti,Ai,zs,Bs,Hs,new ve),h.uv2=h.uv1),a&&(pl.fromBufferAttribute(a,o),ml.fromBufferAttribute(a,l),gl.fromBufferAttribute(a,c),h.normal=nn.getInterpolation(Gs,wi,Ti,Ai,pl,ml,gl,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new C,materialIndex:0};nn.getNormal(wi,Ti,Ai,u.normal),h.face=u}return h}class je extends wt{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new at(c,3)),this.setAttribute("normal",new at(h,3)),this.setAttribute("uv",new at(u,2));function g(_,m,p,M,x,v,R,w,A,P,y){const b=v/A,U=R/P,N=v/2,Y=R/2,I=w/2,F=A+1,V=P+1;let j=0,q=0;const X=new C;for(let $=0;$<V;$++){const te=$*U-Y;for(let ne=0;ne<F;ne++){const G=ne*b-N;X[_]=G*M,X[m]=te*x,X[p]=I,c.push(X.x,X.y,X.z),X[_]=0,X[m]=0,X[p]=w>0?1:-1,h.push(X.x,X.y,X.z),u.push(ne/A),u.push(1-$/P),j+=1}}for(let $=0;$<P;$++)for(let te=0;te<A;te++){const ne=d+te+F*$,G=d+te+F*($+1),K=d+(te+1)+F*($+1),ce=d+(te+1)+F*$;l.push(ne,G,ce),l.push(G,K,ce),q+=6}o.addGroup(f,q,y),f+=q,d+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new je(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ji(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function kt(r){const e={};for(let t=0;t<r.length;t++){const n=ji(r[t]);for(const i in n)e[i]=n[i]}return e}function wd(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function lh(r){return r.getRenderTarget()===null?r.outputColorSpace:Ke.workingColorSpace}const $i={clone:ji,merge:kt};var Td=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ad=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Bt extends an{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Td,this.fragmentShader=Ad,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ji(e.uniforms),this.uniformsGroups=wd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class ch extends lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new He,this.projectionMatrix=new He,this.projectionMatrixInverse=new He,this.coordinateSystem=wn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Lt extends ch{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Xi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ps*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Xi*2*Math.atan(Math.tan(ps*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ps*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ri=-90,Ci=1;class Rd extends lt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Lt(Ri,Ci,e,t);i.layers=this.layers,this.add(i);const s=new Lt(Ri,Ci,e,t);s.layers=this.layers,this.add(s);const a=new Lt(Ri,Ci,e,t);a.layers=this.layers,this.add(a);const o=new Lt(Ri,Ci,e,t);o.layers=this.layers,this.add(o);const l=new Lt(Ri,Ci,e,t);l.layers=this.layers,this.add(l);const c=new Lt(Ri,Ci,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(const c of t)this.remove(c);if(e===wn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===fr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class hh extends St{constructor(e,t,n,i,s,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Gi,super(e,t,n,i,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Cd extends Zt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(gs("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===ri?ot:Kt),this.texture=new hh(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ht}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new je(5,5,5),s=new Bt({name:"CubemapFromEquirect",uniforms:ji(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Pt,blending:Tn});s.uniforms.tEquirect.value=t;const a=new le(i,s),o=t.minFilter;return t.minFilter===ci&&(t.minFilter=Ht),new Rd(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}}const ea=new C,Ld=new C,Pd=new We;class Fn{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=ea.subVectors(n,t).cross(Ld.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ea),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Pd.getNormalMatrix(e),i=this.coplanarPoint(ea).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Zn=new fn,qs=new C;class Ka{constructor(e=new Fn,t=new Fn,n=new Fn,i=new Fn,s=new Fn,a=new Fn){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=wn){const n=this.planes,i=e.elements,s=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],g=i[9],_=i[10],m=i[11],p=i[12],M=i[13],x=i[14],v=i[15];if(n[0].setComponents(l-s,d-c,m-f,v-p).normalize(),n[1].setComponents(l+s,d+c,m+f,v+p).normalize(),n[2].setComponents(l+a,d+h,m+g,v+M).normalize(),n[3].setComponents(l-a,d-h,m-g,v-M).normalize(),n[4].setComponents(l-o,d-u,m-_,v-x).normalize(),t===wn)n[5].setComponents(l+o,d+u,m+_,v+x).normalize();else if(t===fr)n[5].setComponents(o,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Zn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Zn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Zn)}intersectsSprite(e){return Zn.center.set(0,0,0),Zn.radius=.7071067811865476,Zn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Zn)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(qs.x=i.normal.x>0?e.max.x:e.min.x,qs.y=i.normal.y>0?e.max.y:e.min.y,qs.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(qs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function uh(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Id(r,e){const t=e.isWebGL2,n=new WeakMap;function i(c,h){const u=c.array,d=c.usage,f=u.byteLength,g=r.createBuffer();r.bindBuffer(h,g),r.bufferData(h,u,d),c.onUploadCallback();let _;if(u instanceof Float32Array)_=r.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=r.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=r.SHORT;else if(u instanceof Uint32Array)_=r.UNSIGNED_INT;else if(u instanceof Int32Array)_=r.INT;else if(u instanceof Int8Array)_=r.BYTE;else if(u instanceof Uint8Array)_=r.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:f}}function s(c,h,u){const d=h.array,f=h._updateRange,g=h.updateRanges;if(r.bindBuffer(u,c),f.count===-1&&g.length===0&&r.bufferSubData(u,0,d),g.length!==0){for(let _=0,m=g.length;_<m;_++){const p=g[_];t?r.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):r.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}f.count!==-1&&(t?r.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):r.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(r.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const d=n.get(c);(!d||d.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);if(u===void 0)n.set(c,i(c,h));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(u.buffer,c,h),u.version=c.version}}return{get:a,remove:o,update:l}}class Ms extends wt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=e/o,d=t/l,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const M=p*d-a;for(let x=0;x<c;x++){const v=x*u-s;g.push(v,-M,0),_.push(0,0,1),m.push(x/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<o;M++){const x=M+c*p,v=M+c*(p+1),R=M+1+c*(p+1),w=M+1+c*p;f.push(x,v,w),f.push(v,R,w)}this.setIndex(f),this.setAttribute("position",new at(g,3)),this.setAttribute("normal",new at(_,3)),this.setAttribute("uv",new at(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ms(e.width,e.height,e.widthSegments,e.heightSegments)}}var Dd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Nd=`#ifdef USE_ALPHAHASH
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
#endif`,Ud=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Fd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kd=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Od=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,zd=`#ifdef USE_AOMAP
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
#endif`,Bd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Hd=`#ifdef USE_BATCHING
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
#endif`,Gd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Vd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Wd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Xd=`#ifdef USE_IRIDESCENCE
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
#endif`,jd=`#ifdef USE_BUMPMAP
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
#endif`,$d=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Yd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Kd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Zd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Jd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Qd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,ef=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,tf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,nf=`#define PI 3.141592653589793
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
} // validated`,sf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,rf=`vec3 transformedNormal = objectNormal;
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
#endif`,af=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,of=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,cf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hf="gl_FragColor = linearToOutputTexel( gl_FragColor );",uf=`
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
}`,df=`#ifdef USE_ENVMAP
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
#endif`,ff=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,pf=`#ifdef USE_ENVMAP
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
#endif`,mf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gf=`#ifdef USE_ENVMAP
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
#endif`,_f=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,xf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,yf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Mf=`#ifdef USE_GRADIENTMAP
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
}`,Sf=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,bf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ef=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,wf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Tf=`uniform bool receiveShadow;
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
#endif`,Af=`#ifdef USE_ENVMAP
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
#endif`,Rf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Cf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Lf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Pf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,If=`PhysicalMaterial material;
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
#endif`,Df=`struct PhysicalMaterial {
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
}`,Nf=`
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
#endif`,Uf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Ff=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,kf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Of=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Bf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Hf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Gf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Vf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Wf=`#if defined( USE_POINTS_UV )
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
#endif`,qf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jf=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$f=`#ifdef USE_MORPHNORMALS
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
#endif`,Yf=`#ifdef USE_MORPHTARGETS
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
#endif`,Kf=`#ifdef USE_MORPHTARGETS
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
#endif`,Zf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Jf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Qf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ep=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,tp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,np=`#ifdef USE_NORMALMAP
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
#endif`,ip=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,sp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,rp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ap=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,op=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,lp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,cp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,hp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,up=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,fp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,pp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,mp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,gp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_p=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,xp=`float getShadowMask() {
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
}`,vp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,yp=`#ifdef USE_SKINNING
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
#endif`,Mp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Sp=`#ifdef USE_SKINNING
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
#endif`,bp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ep=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,wp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Tp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ap=`#ifdef USE_TRANSMISSION
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
#endif`,Rp=`#ifdef USE_TRANSMISSION
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
#endif`,Cp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Lp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Pp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ip=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Dp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Np=`uniform sampler2D t2D;
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
}`,Up=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Fp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,kp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Op=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zp=`#include <common>
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
}`,Bp=`#if DEPTH_PACKING == 3200
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
}`,Hp=`#define DISTANCE
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
}`,Gp=`#define DISTANCE
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
}`,Vp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Wp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qp=`uniform float scale;
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
}`,Xp=`uniform vec3 diffuse;
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
}`,jp=`#include <common>
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
}`,$p=`uniform vec3 diffuse;
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
}`,Yp=`#define LAMBERT
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
}`,Kp=`#define LAMBERT
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
}`,Zp=`#define MATCAP
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
}`,Jp=`#define MATCAP
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
}`,Qp=`#define NORMAL
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
}`,em=`#define NORMAL
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
}`,tm=`#define PHONG
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
}`,nm=`#define PHONG
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
}`,im=`#define STANDARD
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
}`,sm=`#define STANDARD
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
}`,rm=`#define TOON
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
}`,am=`#define TOON
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
}`,om=`uniform float size;
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
}`,lm=`uniform vec3 diffuse;
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
}`,cm=`#include <common>
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
}`,hm=`uniform vec3 color;
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
}`,um=`uniform float rotation;
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
}`,dm=`uniform vec3 diffuse;
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
}`,Fe={alphahash_fragment:Dd,alphahash_pars_fragment:Nd,alphamap_fragment:Ud,alphamap_pars_fragment:Fd,alphatest_fragment:kd,alphatest_pars_fragment:Od,aomap_fragment:zd,aomap_pars_fragment:Bd,batching_pars_vertex:Hd,batching_vertex:Gd,begin_vertex:Vd,beginnormal_vertex:Wd,bsdfs:qd,iridescence_fragment:Xd,bumpmap_pars_fragment:jd,clipping_planes_fragment:$d,clipping_planes_pars_fragment:Yd,clipping_planes_pars_vertex:Kd,clipping_planes_vertex:Zd,color_fragment:Jd,color_pars_fragment:Qd,color_pars_vertex:ef,color_vertex:tf,common:nf,cube_uv_reflection_fragment:sf,defaultnormal_vertex:rf,displacementmap_pars_vertex:af,displacementmap_vertex:of,emissivemap_fragment:lf,emissivemap_pars_fragment:cf,colorspace_fragment:hf,colorspace_pars_fragment:uf,envmap_fragment:df,envmap_common_pars_fragment:ff,envmap_pars_fragment:pf,envmap_pars_vertex:mf,envmap_physical_pars_fragment:Af,envmap_vertex:gf,fog_vertex:_f,fog_pars_vertex:xf,fog_fragment:vf,fog_pars_fragment:yf,gradientmap_pars_fragment:Mf,lightmap_fragment:Sf,lightmap_pars_fragment:bf,lights_lambert_fragment:Ef,lights_lambert_pars_fragment:wf,lights_pars_begin:Tf,lights_toon_fragment:Rf,lights_toon_pars_fragment:Cf,lights_phong_fragment:Lf,lights_phong_pars_fragment:Pf,lights_physical_fragment:If,lights_physical_pars_fragment:Df,lights_fragment_begin:Nf,lights_fragment_maps:Uf,lights_fragment_end:Ff,logdepthbuf_fragment:kf,logdepthbuf_pars_fragment:Of,logdepthbuf_pars_vertex:zf,logdepthbuf_vertex:Bf,map_fragment:Hf,map_pars_fragment:Gf,map_particle_fragment:Vf,map_particle_pars_fragment:Wf,metalnessmap_fragment:qf,metalnessmap_pars_fragment:Xf,morphcolor_vertex:jf,morphnormal_vertex:$f,morphtarget_pars_vertex:Yf,morphtarget_vertex:Kf,normal_fragment_begin:Zf,normal_fragment_maps:Jf,normal_pars_fragment:Qf,normal_pars_vertex:ep,normal_vertex:tp,normalmap_pars_fragment:np,clearcoat_normal_fragment_begin:ip,clearcoat_normal_fragment_maps:sp,clearcoat_pars_fragment:rp,iridescence_pars_fragment:ap,opaque_fragment:op,packing:lp,premultiplied_alpha_fragment:cp,project_vertex:hp,dithering_fragment:up,dithering_pars_fragment:dp,roughnessmap_fragment:fp,roughnessmap_pars_fragment:pp,shadowmap_pars_fragment:mp,shadowmap_pars_vertex:gp,shadowmap_vertex:_p,shadowmask_pars_fragment:xp,skinbase_vertex:vp,skinning_pars_vertex:yp,skinning_vertex:Mp,skinnormal_vertex:Sp,specularmap_fragment:bp,specularmap_pars_fragment:Ep,tonemapping_fragment:wp,tonemapping_pars_fragment:Tp,transmission_fragment:Ap,transmission_pars_fragment:Rp,uv_pars_fragment:Cp,uv_pars_vertex:Lp,uv_vertex:Pp,worldpos_vertex:Ip,background_vert:Dp,background_frag:Np,backgroundCube_vert:Up,backgroundCube_frag:Fp,cube_vert:kp,cube_frag:Op,depth_vert:zp,depth_frag:Bp,distanceRGBA_vert:Hp,distanceRGBA_frag:Gp,equirect_vert:Vp,equirect_frag:Wp,linedashed_vert:qp,linedashed_frag:Xp,meshbasic_vert:jp,meshbasic_frag:$p,meshlambert_vert:Yp,meshlambert_frag:Kp,meshmatcap_vert:Zp,meshmatcap_frag:Jp,meshnormal_vert:Qp,meshnormal_frag:em,meshphong_vert:tm,meshphong_frag:nm,meshphysical_vert:im,meshphysical_frag:sm,meshtoon_vert:rm,meshtoon_frag:am,points_vert:om,points_frag:lm,shadow_vert:cm,shadow_frag:hm,sprite_vert:um,sprite_frag:dm},se={common:{diffuse:{value:new ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new ve(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new ue(16777215)},opacity:{value:1},center:{value:new ve(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},hn={basic:{uniforms:kt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Fe.meshbasic_vert,fragmentShader:Fe.meshbasic_frag},lambert:{uniforms:kt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new ue(0)}}]),vertexShader:Fe.meshlambert_vert,fragmentShader:Fe.meshlambert_frag},phong:{uniforms:kt([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new ue(0)},specular:{value:new ue(1118481)},shininess:{value:30}}]),vertexShader:Fe.meshphong_vert,fragmentShader:Fe.meshphong_frag},standard:{uniforms:kt([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag},toon:{uniforms:kt([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new ue(0)}}]),vertexShader:Fe.meshtoon_vert,fragmentShader:Fe.meshtoon_frag},matcap:{uniforms:kt([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Fe.meshmatcap_vert,fragmentShader:Fe.meshmatcap_frag},points:{uniforms:kt([se.points,se.fog]),vertexShader:Fe.points_vert,fragmentShader:Fe.points_frag},dashed:{uniforms:kt([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Fe.linedashed_vert,fragmentShader:Fe.linedashed_frag},depth:{uniforms:kt([se.common,se.displacementmap]),vertexShader:Fe.depth_vert,fragmentShader:Fe.depth_frag},normal:{uniforms:kt([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Fe.meshnormal_vert,fragmentShader:Fe.meshnormal_frag},sprite:{uniforms:kt([se.sprite,se.fog]),vertexShader:Fe.sprite_vert,fragmentShader:Fe.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Fe.background_vert,fragmentShader:Fe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Fe.backgroundCube_vert,fragmentShader:Fe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Fe.cube_vert,fragmentShader:Fe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Fe.equirect_vert,fragmentShader:Fe.equirect_frag},distanceRGBA:{uniforms:kt([se.common,se.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Fe.distanceRGBA_vert,fragmentShader:Fe.distanceRGBA_frag},shadow:{uniforms:kt([se.lights,se.fog,{color:{value:new ue(0)},opacity:{value:1}}]),vertexShader:Fe.shadow_vert,fragmentShader:Fe.shadow_frag}};hn.physical={uniforms:kt([hn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new ve(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new ve},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new ue(0)},specularColor:{value:new ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new ve},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:Fe.meshphysical_vert,fragmentShader:Fe.meshphysical_frag};const Xs={r:0,b:0,g:0};function fm(r,e,t,n,i,s,a){const o=new ue(0);let l=s===!0?0:1,c,h,u=null,d=0,f=null;function g(m,p){let M=!1,x=p.isScene===!0?p.background:null;x&&x.isTexture&&(x=(p.backgroundBlurriness>0?t:e).get(x)),x===null?_(o,l):x&&x.isColor&&(_(x,1),M=!0);const v=r.xr.getEnvironmentBlendMode();v==="additive"?n.buffers.color.setClear(0,0,0,1,a):v==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||M)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),x&&(x.isCubeTexture||x.mapping===xr)?(h===void 0&&(h=new le(new je(1,1,1),new Bt({name:"BackgroundCubeMaterial",uniforms:ji(hn.backgroundCube.uniforms),vertexShader:hn.backgroundCube.vertexShader,fragmentShader:hn.backgroundCube.fragmentShader,side:Pt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.toneMapped=Ke.getTransfer(x.colorSpace)!==rt,(u!==x||d!==x.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,f=r.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new le(new Ms(2,2),new Bt({name:"BackgroundMaterial",uniforms:ji(hn.background.uniforms),vertexShader:hn.background.vertexShader,fragmentShader:hn.background.fragmentShader,side:An,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=Ke.getTransfer(x.colorSpace)!==rt,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,f=r.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function _(m,p){m.getRGB(Xs,lh(r)),n.buffers.color.setClear(Xs.r,Xs.g,Xs.b,p,a)}return{getClearColor:function(){return o},setClearColor:function(m,p=1){o.set(m),l=p,_(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,_(o,l)},render:g}}function pm(r,e,t,n){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||s!==null,o={},l=m(null);let c=l,h=!1;function u(I,F,V,j,q){let X=!1;if(a){const $=_(j,V,F);c!==$&&(c=$,f(c.object)),X=p(I,j,V,q),X&&M(I,j,V,q)}else{const $=F.wireframe===!0;(c.geometry!==j.id||c.program!==V.id||c.wireframe!==$)&&(c.geometry=j.id,c.program=V.id,c.wireframe=$,X=!0)}q!==null&&t.update(q,r.ELEMENT_ARRAY_BUFFER),(X||h)&&(h=!1,P(I,F,V,j),q!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function d(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function f(I){return n.isWebGL2?r.bindVertexArray(I):s.bindVertexArrayOES(I)}function g(I){return n.isWebGL2?r.deleteVertexArray(I):s.deleteVertexArrayOES(I)}function _(I,F,V){const j=V.wireframe===!0;let q=o[I.id];q===void 0&&(q={},o[I.id]=q);let X=q[F.id];X===void 0&&(X={},q[F.id]=X);let $=X[j];return $===void 0&&($=m(d()),X[j]=$),$}function m(I){const F=[],V=[],j=[];for(let q=0;q<i;q++)F[q]=0,V[q]=0,j[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:V,attributeDivisors:j,object:I,attributes:{},index:null}}function p(I,F,V,j){const q=c.attributes,X=F.attributes;let $=0;const te=V.getAttributes();for(const ne in te)if(te[ne].location>=0){const K=q[ne];let ce=X[ne];if(ce===void 0&&(ne==="instanceMatrix"&&I.instanceMatrix&&(ce=I.instanceMatrix),ne==="instanceColor"&&I.instanceColor&&(ce=I.instanceColor)),K===void 0||K.attribute!==ce||ce&&K.data!==ce.data)return!0;$++}return c.attributesNum!==$||c.index!==j}function M(I,F,V,j){const q={},X=F.attributes;let $=0;const te=V.getAttributes();for(const ne in te)if(te[ne].location>=0){let K=X[ne];K===void 0&&(ne==="instanceMatrix"&&I.instanceMatrix&&(K=I.instanceMatrix),ne==="instanceColor"&&I.instanceColor&&(K=I.instanceColor));const ce={};ce.attribute=K,K&&K.data&&(ce.data=K.data),q[ne]=ce,$++}c.attributes=q,c.attributesNum=$,c.index=j}function x(){const I=c.newAttributes;for(let F=0,V=I.length;F<V;F++)I[F]=0}function v(I){R(I,0)}function R(I,F){const V=c.newAttributes,j=c.enabledAttributes,q=c.attributeDivisors;V[I]=1,j[I]===0&&(r.enableVertexAttribArray(I),j[I]=1),q[I]!==F&&((n.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](I,F),q[I]=F)}function w(){const I=c.newAttributes,F=c.enabledAttributes;for(let V=0,j=F.length;V<j;V++)F[V]!==I[V]&&(r.disableVertexAttribArray(V),F[V]=0)}function A(I,F,V,j,q,X,$){$===!0?r.vertexAttribIPointer(I,F,V,q,X):r.vertexAttribPointer(I,F,V,j,q,X)}function P(I,F,V,j){if(n.isWebGL2===!1&&(I.isInstancedMesh||j.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const q=j.attributes,X=V.getAttributes(),$=F.defaultAttributeValues;for(const te in X){const ne=X[te];if(ne.location>=0){let G=q[te];if(G===void 0&&(te==="instanceMatrix"&&I.instanceMatrix&&(G=I.instanceMatrix),te==="instanceColor"&&I.instanceColor&&(G=I.instanceColor)),G!==void 0){const K=G.normalized,ce=G.itemSize,xe=t.get(G);if(xe===void 0)continue;const _e=xe.buffer,Ie=xe.type,Ne=xe.bytesPerElement,we=n.isWebGL2===!0&&(Ie===r.INT||Ie===r.UNSIGNED_INT||G.gpuType===Vc);if(G.isInterleavedBufferAttribute){const $e=G.data,k=$e.stride,Dt=G.offset;if($e.isInstancedInterleavedBuffer){for(let Me=0;Me<ne.locationSize;Me++)R(ne.location+Me,$e.meshPerAttribute);I.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=$e.meshPerAttribute*$e.count)}else for(let Me=0;Me<ne.locationSize;Me++)v(ne.location+Me);r.bindBuffer(r.ARRAY_BUFFER,_e);for(let Me=0;Me<ne.locationSize;Me++)A(ne.location+Me,ce/ne.locationSize,Ie,K,k*Ne,(Dt+ce/ne.locationSize*Me)*Ne,we)}else{if(G.isInstancedBufferAttribute){for(let $e=0;$e<ne.locationSize;$e++)R(ne.location+$e,G.meshPerAttribute);I.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let $e=0;$e<ne.locationSize;$e++)v(ne.location+$e);r.bindBuffer(r.ARRAY_BUFFER,_e);for(let $e=0;$e<ne.locationSize;$e++)A(ne.location+$e,ce/ne.locationSize,Ie,K,ce*Ne,ce/ne.locationSize*$e*Ne,we)}}else if($!==void 0){const K=$[te];if(K!==void 0)switch(K.length){case 2:r.vertexAttrib2fv(ne.location,K);break;case 3:r.vertexAttrib3fv(ne.location,K);break;case 4:r.vertexAttrib4fv(ne.location,K);break;default:r.vertexAttrib1fv(ne.location,K)}}}}w()}function y(){N();for(const I in o){const F=o[I];for(const V in F){const j=F[V];for(const q in j)g(j[q].object),delete j[q];delete F[V]}delete o[I]}}function b(I){if(o[I.id]===void 0)return;const F=o[I.id];for(const V in F){const j=F[V];for(const q in j)g(j[q].object),delete j[q];delete F[V]}delete o[I.id]}function U(I){for(const F in o){const V=o[F];if(V[I.id]===void 0)continue;const j=V[I.id];for(const q in j)g(j[q].object),delete j[q];delete V[I.id]}}function N(){Y(),h=!0,c!==l&&(c=l,f(c.object))}function Y(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:N,resetDefaultState:Y,dispose:y,releaseStatesOfGeometry:b,releaseStatesOfProgram:U,initAttributes:x,enableAttribute:v,disableUnusedAttributes:w}}function mm(r,e,t,n){const i=n.isWebGL2;let s;function a(h){s=h}function o(h,u){r.drawArrays(s,h,u),t.update(u,s,1)}function l(h,u,d){if(d===0)return;let f,g;if(i)f=r,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](s,h,u,d),t.update(u,s,d)}function c(h,u,d){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<d;g++)this.render(h[g],u[g]);else{f.multiDrawArraysWEBGL(s,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_];t.update(g,s,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function gm(r,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(A){if(A==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=s(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),d=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),_=r.getParameter(r.MAX_VERTEX_ATTRIBS),m=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),p=r.getParameter(r.MAX_VARYING_VECTORS),M=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),x=d>0,v=a||e.has("OES_texture_float"),R=x&&v,w=a?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:M,vertexTextures:x,floatFragmentTextures:v,floatVertexTextures:R,maxSamples:w}}function _m(r){const e=this;let t=null,n=0,i=!1,s=!1;const a=new Fn,o=new We,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=r.get(u);if(!i||g===null||g.length===0||s&&!m)s?h(null):c();else{const M=s?0:n,x=M*4;let v=p.clippingState||null;l.value=v,v=h(g,d,x,f);for(let R=0;R!==x;++R)v[R]=t[R];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=f+_*4,M=d.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,v=f;x!==_;++x,v+=4)a.copy(u[x]).applyMatrix4(M,o),a.normal.toArray(m,v),m[v+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function xm(r){let e=new WeakMap;function t(a,o){return o===ya?a.mapping=Gi:o===Ma&&(a.mapping=Vi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===ya||o===Ma)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Cd(l.height/2);return c.fromEquirectangularTexture(r,a),e.set(a,c),a.addEventListener("dispose",i),t(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class Mr extends ch{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ui=4,_l=[.125,.215,.35,.446,.526,.582],ti=20,ta=new Mr,xl=new ue;let na=null,ia=0,sa=0;const Qn=(1+Math.sqrt(5))/2,Li=1/Qn,vl=[new C(1,1,1),new C(-1,1,1),new C(1,1,-1),new C(-1,1,-1),new C(0,Qn,Li),new C(0,Qn,-Li),new C(Li,0,Qn),new C(-Li,0,Qn),new C(Qn,Li,0),new C(-Qn,Li,0)];class Aa{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){na=this._renderer.getRenderTarget(),ia=this._renderer.getActiveCubeFace(),sa=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Sl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ml(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(na,ia,sa),e.scissorTest=!1,js(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Gi||e.mapping===Vi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),na=this._renderer.getRenderTarget(),ia=this._renderer.getActiveCubeFace(),sa=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ht,minFilter:Ht,generateMipmaps:!1,type:dn,format:Yt,colorSpace:bt,depthBuffer:!1},i=yl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=yl(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=vm(s)),this._blurMaterial=ym(s,e,t)}return i}_compileMaterial(e){const t=new le(this._lodPlanes[0],e);this._renderer.compile(t,ta)}_sceneToCubeUV(e,t,n,i){const o=new Lt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(xl),h.toneMapping=Vn,h.autoClear=!1;const f=new zt({name:"PMREM.Background",side:Pt,depthWrite:!1,depthTest:!1}),g=new le(new je,f);let _=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,_=!0):(f.color.copy(xl),_=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):M===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const x=this._cubeSize;js(i,M*x,p>2?x:0,x,x),h.setRenderTarget(i),_&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Gi||e.mapping===Vi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Sl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ml());const s=i?this._cubemapMaterial:this._equirectMaterial,a=new le(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;js(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,ta)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),a=vl[(i-1)%vl.length];this._blur(e,i-1,i,s,a)}t.autoClear=n}_blur(e,t,n,i,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new le(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*ti-1),_=s/g,m=isFinite(s)?1+Math.floor(h*_):ti;m>ti&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ti}`);const p=[];let M=0;for(let A=0;A<ti;++A){const P=A/_,y=Math.exp(-P*P/2);p.push(y),A===0?M+=y:A<m&&(M+=2*y)}for(let A=0;A<p.length;A++)p[A]=p[A]/M;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:x}=this;d.dTheta.value=g,d.mipInt.value=x-n;const v=this._sizeLods[i],R=3*v*(i>x-Ui?i-x+Ui:0),w=4*(this._cubeSize-v);js(t,R,w,3*v,2*v),l.setRenderTarget(t),l.render(u,ta)}}function vm(r){const e=[],t=[],n=[];let i=r;const s=r-Ui+1+_l.length;for(let a=0;a<s;a++){const o=Math.pow(2,i);t.push(o);let l=1/o;a>r-Ui?l=_l[a-r+Ui-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*f),x=new Float32Array(m*g*f),v=new Float32Array(p*g*f);for(let w=0;w<f;w++){const A=w%3*2/3-1,P=w>2?0:-1,y=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];M.set(y,_*g*w),x.set(d,m*g*w);const b=[w,w,w,w,w,w];v.set(b,p*g*w)}const R=new wt;R.setAttribute("position",new It(M,_)),R.setAttribute("uv",new It(x,m)),R.setAttribute("faceIndex",new It(v,p)),e.push(R),i>Ui&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function yl(r,e,t){const n=new Zt(r,e,t);return n.texture.mapping=xr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function js(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function ym(r,e,t){const n=new Float32Array(ti),i=new C(0,1,0);return new Bt({name:"SphericalGaussianBlur",defines:{n:ti,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Za(),fragmentShader:`

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
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Ml(){return new Bt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Za(),fragmentShader:`

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
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Sl(){return new Bt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Za(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Tn,depthTest:!1,depthWrite:!1})}function Za(){return`

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
	`}function Mm(r){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===ya||l===Ma,h=l===Gi||l===Vi;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=e.get(o);return t===null&&(t=new Aa(r)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),e.set(o,u),u.texture}else{if(e.has(o))return e.get(o).texture;{const u=o.image;if(c&&u&&u.height>0||h&&u&&i(u)){t===null&&(t=new Aa(r));const d=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",s),d.texture}else return null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Sm(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function bm(r,e,t,n){const i={},s=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}d.removeEventListener("dispose",a),delete i[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)e.update(d[g],r.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],r.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const M=f.array;_=f.version;for(let x=0,v=M.length;x<v;x+=3){const R=M[x+0],w=M[x+1],A=M[x+2];d.push(R,w,w,A,A,R)}}else if(g!==void 0){const M=g.array;_=g.version;for(let x=0,v=M.length/3-1;x<v;x+=3){const R=x+0,w=x+1,A=x+2;d.push(R,w,w,A,A,R)}}else return;const m=new(th(d)?oh:ah)(d,1);m.version=_;const p=s.get(u);p&&e.remove(p),s.set(u,m)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Em(r,e,t,n){const i=n.isWebGL2;let s;function a(f){s=f}let o,l;function c(f){o=f.type,l=f.bytesPerElement}function h(f,g){r.drawElements(s,g,o,f*l),t.update(g,s,1)}function u(f,g,_){if(_===0)return;let m,p;if(i)m=r,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](s,g,o,f*l,_),t.update(g,s,_)}function d(f,g,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<_;p++)this.render(f[p]/l,g[p]);else{m.multiDrawElementsWEBGL(s,g,0,o,f,0,_);let p=0;for(let M=0;M<_;M++)p+=g[M];t.update(p,s,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function wm(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Tm(r,e){return r[0]-e[0]}function Am(r,e){return Math.abs(e[1])-Math.abs(r[1])}function Rm(r,e,t){const n={},i=new Float32Array(8),s=new WeakMap,a=new tt,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,u){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let m=s.get(h);if(m===void 0||m.count!==_){let F=function(){Y.dispose(),s.delete(h),h.removeEventListener("dispose",F)};var f=F;m!==void 0&&m.texture.dispose();const x=h.morphAttributes.position!==void 0,v=h.morphAttributes.normal!==void 0,R=h.morphAttributes.color!==void 0,w=h.morphAttributes.position||[],A=h.morphAttributes.normal||[],P=h.morphAttributes.color||[];let y=0;x===!0&&(y=1),v===!0&&(y=2),R===!0&&(y=3);let b=h.attributes.position.count*y,U=1;b>e.maxTextureSize&&(U=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const N=new Float32Array(b*U*4*_),Y=new sh(N,b,U,_);Y.type=En,Y.needsUpdate=!0;const I=y*4;for(let V=0;V<_;V++){const j=w[V],q=A[V],X=P[V],$=b*U*4*V;for(let te=0;te<j.count;te++){const ne=te*I;x===!0&&(a.fromBufferAttribute(j,te),N[$+ne+0]=a.x,N[$+ne+1]=a.y,N[$+ne+2]=a.z,N[$+ne+3]=0),v===!0&&(a.fromBufferAttribute(q,te),N[$+ne+4]=a.x,N[$+ne+5]=a.y,N[$+ne+6]=a.z,N[$+ne+7]=0),R===!0&&(a.fromBufferAttribute(X,te),N[$+ne+8]=a.x,N[$+ne+9]=a.y,N[$+ne+10]=a.z,N[$+ne+11]=X.itemSize===4?a.w:1)}}m={count:_,texture:Y,size:new ve(b,U)},s.set(h,m),h.addEventListener("dispose",F)}let p=0;for(let x=0;x<d.length;x++)p+=d[x];const M=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(r,"morphTargetBaseInfluence",M),u.getUniforms().setValue(r,"morphTargetInfluences",d),u.getUniforms().setValue(r,"morphTargetsTexture",m.texture,t),u.getUniforms().setValue(r,"morphTargetsTextureSize",m.size)}else{const g=d===void 0?0:d.length;let _=n[h.id];if(_===void 0||_.length!==g){_=[];for(let v=0;v<g;v++)_[v]=[v,0];n[h.id]=_}for(let v=0;v<g;v++){const R=_[v];R[0]=v,R[1]=d[v]}_.sort(Am);for(let v=0;v<8;v++)v<g&&_[v][1]?(o[v][0]=_[v][0],o[v][1]=_[v][1]):(o[v][0]=Number.MAX_SAFE_INTEGER,o[v][1]=0);o.sort(Tm);const m=h.morphAttributes.position,p=h.morphAttributes.normal;let M=0;for(let v=0;v<8;v++){const R=o[v],w=R[0],A=R[1];w!==Number.MAX_SAFE_INTEGER&&A?(m&&h.getAttribute("morphTarget"+v)!==m[w]&&h.setAttribute("morphTarget"+v,m[w]),p&&h.getAttribute("morphNormal"+v)!==p[w]&&h.setAttribute("morphNormal"+v,p[w]),i[v]=A,M+=A):(m&&h.hasAttribute("morphTarget"+v)===!0&&h.deleteAttribute("morphTarget"+v),p&&h.hasAttribute("morphNormal"+v)===!0&&h.deleteAttribute("morphNormal"+v),i[v]=0)}const x=h.morphTargetsRelative?1:1-M;u.getUniforms().setValue(r,"morphTargetBaseInfluence",x),u.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:l}}function Cm(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:a}}class dh extends St{constructor(e,t,n,i,s,a,o,l,c,h){if(h=h!==void 0?h:si,h!==si&&h!==Wi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===si&&(n=Bn),n===void 0&&h===Wi&&(n=ii),super(null,i,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Mt,this.minFilter=l!==void 0?l:Mt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const fh=new St,ph=new dh(1,1);ph.compareFunction=eh;const mh=new sh,gh=new fd,_h=new hh,bl=[],El=[],wl=new Float32Array(16),Tl=new Float32Array(9),Al=new Float32Array(4);function Qi(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=bl[i];if(s===void 0&&(s=new Float32Array(i),bl[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function gt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function _t(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Sr(r,e){let t=El[e];t===void 0&&(t=new Int32Array(e),El[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function Lm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function Pm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;r.uniform2fv(this.addr,e),_t(t,e)}}function Im(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(gt(t,e))return;r.uniform3fv(this.addr,e),_t(t,e)}}function Dm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;r.uniform4fv(this.addr,e),_t(t,e)}}function Nm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(gt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,n))return;Al.set(n),r.uniformMatrix2fv(this.addr,!1,Al),_t(t,n)}}function Um(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(gt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,n))return;Tl.set(n),r.uniformMatrix3fv(this.addr,!1,Tl),_t(t,n)}}function Fm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(gt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,n))return;wl.set(n),r.uniformMatrix4fv(this.addr,!1,wl),_t(t,n)}}function km(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Om(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;r.uniform2iv(this.addr,e),_t(t,e)}}function zm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gt(t,e))return;r.uniform3iv(this.addr,e),_t(t,e)}}function Bm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;r.uniform4iv(this.addr,e),_t(t,e)}}function Hm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Gm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;r.uniform2uiv(this.addr,e),_t(t,e)}}function Vm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gt(t,e))return;r.uniform3uiv(this.addr,e),_t(t,e)}}function Wm(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;r.uniform4uiv(this.addr,e),_t(t,e)}}function qm(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);const s=this.type===r.SAMPLER_2D_SHADOW?ph:fh;t.setTexture2D(e||s,i)}function Xm(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||gh,i)}function jm(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||_h,i)}function $m(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||mh,i)}function Ym(r){switch(r){case 5126:return Lm;case 35664:return Pm;case 35665:return Im;case 35666:return Dm;case 35674:return Nm;case 35675:return Um;case 35676:return Fm;case 5124:case 35670:return km;case 35667:case 35671:return Om;case 35668:case 35672:return zm;case 35669:case 35673:return Bm;case 5125:return Hm;case 36294:return Gm;case 36295:return Vm;case 36296:return Wm;case 35678:case 36198:case 36298:case 36306:case 35682:return qm;case 35679:case 36299:case 36307:return Xm;case 35680:case 36300:case 36308:case 36293:return jm;case 36289:case 36303:case 36311:case 36292:return $m}}function Km(r,e){r.uniform1fv(this.addr,e)}function Zm(r,e){const t=Qi(e,this.size,2);r.uniform2fv(this.addr,t)}function Jm(r,e){const t=Qi(e,this.size,3);r.uniform3fv(this.addr,t)}function Qm(r,e){const t=Qi(e,this.size,4);r.uniform4fv(this.addr,t)}function eg(r,e){const t=Qi(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function tg(r,e){const t=Qi(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function ng(r,e){const t=Qi(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function ig(r,e){r.uniform1iv(this.addr,e)}function sg(r,e){r.uniform2iv(this.addr,e)}function rg(r,e){r.uniform3iv(this.addr,e)}function ag(r,e){r.uniform4iv(this.addr,e)}function og(r,e){r.uniform1uiv(this.addr,e)}function lg(r,e){r.uniform2uiv(this.addr,e)}function cg(r,e){r.uniform3uiv(this.addr,e)}function hg(r,e){r.uniform4uiv(this.addr,e)}function ug(r,e,t){const n=this.cache,i=e.length,s=Sr(t,i);gt(n,s)||(r.uniform1iv(this.addr,s),_t(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||fh,s[a])}function dg(r,e,t){const n=this.cache,i=e.length,s=Sr(t,i);gt(n,s)||(r.uniform1iv(this.addr,s),_t(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||gh,s[a])}function fg(r,e,t){const n=this.cache,i=e.length,s=Sr(t,i);gt(n,s)||(r.uniform1iv(this.addr,s),_t(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||_h,s[a])}function pg(r,e,t){const n=this.cache,i=e.length,s=Sr(t,i);gt(n,s)||(r.uniform1iv(this.addr,s),_t(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||mh,s[a])}function mg(r){switch(r){case 5126:return Km;case 35664:return Zm;case 35665:return Jm;case 35666:return Qm;case 35674:return eg;case 35675:return tg;case 35676:return ng;case 5124:case 35670:return ig;case 35667:case 35671:return sg;case 35668:case 35672:return rg;case 35669:case 35673:return ag;case 5125:return og;case 36294:return lg;case 36295:return cg;case 36296:return hg;case 35678:case 36198:case 36298:case 36306:case 35682:return ug;case 35679:case 36299:case 36307:return dg;case 35680:case 36300:case 36308:case 36293:return fg;case 36289:case 36303:case 36311:case 36292:return pg}}class gg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Ym(t.type)}}class _g{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=mg(t.type)}}class xg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const ra=/(\w+)(\])?(\[|\.)?/g;function Rl(r,e){r.seq.push(e),r.map[e.id]=e}function vg(r,e,t){const n=r.name,i=n.length;for(ra.lastIndex=0;;){const s=ra.exec(n),a=ra.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Rl(t,c===void 0?new gg(o,r,e):new _g(o,r,e));break}else{let u=t.map[o];u===void 0&&(u=new xg(o),Rl(t,u)),t=u}}}class ir{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),a=e.getUniformLocation(t,s.name);vg(s,a,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){const o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Cl(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const yg=37297;let Mg=0;function Sg(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function bg(r){const e=Ke.getPrimaries(Ke.workingColorSpace),t=Ke.getPrimaries(r);let n;switch(e===t?n="":e===dr&&t===ur?n="LinearDisplayP3ToLinearSRGB":e===ur&&t===dr&&(n="LinearSRGBToLinearDisplayP3"),r){case bt:case vr:return[n,"LinearTransferOETF"];case ot:case ja:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Ll(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+Sg(r.getShaderSource(e),a)}else return i}function Eg(r,e){const t=bg(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function wg(r,e){let t;switch(e){case kc:t="Linear";break;case Oc:t="Reinhard";break;case zc:t="OptimizedCineon";break;case Va:t="ACESFilmic";break;case Bc:t="AgX";break;case wu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Tg(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Fi).join(`
`)}function Ag(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Fi).join(`
`)}function Rg(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Cg(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function Fi(r){return r!==""}function Pl(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Il(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Lg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ra(r){return r.replace(Lg,Ig)}const Pg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Ig(r,e){let t=Fe[e];if(t===void 0){const n=Pg.get(e);if(n!==void 0)t=Fe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ra(t)}const Dg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Dl(r){return r.replace(Dg,Ng)}function Ng(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Nl(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Ug(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Uc?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Fc?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Sn&&(e="SHADOWMAP_TYPE_VSM"),e}function Fg(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Gi:case Vi:e="ENVMAP_TYPE_CUBE";break;case xr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function kg(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case Vi:e="ENVMAP_MODE_REFRACTION";break}return e}function Og(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Ga:e="ENVMAP_BLENDING_MULTIPLY";break;case bu:e="ENVMAP_BLENDING_MIX";break;case Eu:e="ENVMAP_BLENDING_ADD";break}return e}function zg(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Bg(r,e,t,n){const i=r.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Ug(t),c=Fg(t),h=kg(t),u=Og(t),d=zg(t),f=t.isWebGL2?"":Tg(t),g=Ag(t),_=Rg(s),m=i.createProgram();let p,M,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Fi).join(`
`),p.length>0&&(p+=`
`),M=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Fi).join(`
`),M.length>0&&(M+=`
`)):(p=[Nl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fi).join(`
`),M=[f,Nl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Vn?"#define TONE_MAPPING":"",t.toneMapping!==Vn?Fe.tonemapping_pars_fragment:"",t.toneMapping!==Vn?wg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Fe.colorspace_pars_fragment,Eg("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Fi).join(`
`)),a=Ra(a),a=Pl(a,t),a=Il(a,t),o=Ra(o),o=Pl(o,t),o=Il(o,t),a=Dl(a),o=Dl(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,M=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Qo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Qo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);const v=x+p+a,R=x+M+o,w=Cl(i,i.VERTEX_SHADER,v),A=Cl(i,i.FRAGMENT_SHADER,R);i.attachShader(m,w),i.attachShader(m,A),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function P(N){if(r.debug.checkShaderErrors){const Y=i.getProgramInfoLog(m).trim(),I=i.getShaderInfoLog(w).trim(),F=i.getShaderInfoLog(A).trim();let V=!0,j=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(V=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,m,w,A);else{const q=Ll(i,w,"vertex"),X=Ll(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+Y+`
`+q+`
`+X)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(I===""||F==="")&&(j=!1);j&&(N.diagnostics={runnable:V,programLog:Y,vertexShader:{log:I,prefix:p},fragmentShader:{log:F,prefix:M}})}i.deleteShader(w),i.deleteShader(A),y=new ir(i,m),b=Cg(i,m)}let y;this.getUniforms=function(){return y===void 0&&P(this),y};let b;this.getAttributes=function(){return b===void 0&&P(this),b};let U=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=i.getProgramParameter(m,yg)),U},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Mg++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=w,this.fragmentShader=A,this}let Hg=0;class Gg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Vg(e),t.set(e,n)),n}}class Vg{constructor(e){this.id=Hg++,this.code=e,this.usedTimes=0}}function Wg(r,e,t,n,i,s,a){const o=new Ya,l=new Gg,c=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return y===0?"uv":`uv${y}`}function m(y,b,U,N,Y){const I=N.fog,F=Y.geometry,V=y.isMeshStandardMaterial?N.environment:null,j=(y.isMeshStandardMaterial?t:e).get(y.envMap||V),q=j&&j.mapping===xr?j.image.height:null,X=g[y.type];y.precision!==null&&(f=i.getMaxPrecision(y.precision),f!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const $=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,te=$!==void 0?$.length:0;let ne=0;F.morphAttributes.position!==void 0&&(ne=1),F.morphAttributes.normal!==void 0&&(ne=2),F.morphAttributes.color!==void 0&&(ne=3);let G,K,ce,xe;if(X){const Nt=hn[X];G=Nt.vertexShader,K=Nt.fragmentShader}else G=y.vertexShader,K=y.fragmentShader,l.update(y),ce=l.getVertexShaderID(y),xe=l.getFragmentShaderID(y);const _e=r.getRenderTarget(),Ie=Y.isInstancedMesh===!0,Ne=Y.isBatchedMesh===!0,we=!!y.map,$e=!!y.matcap,k=!!j,Dt=!!y.aoMap,Me=!!y.lightMap,Ce=!!y.bumpMap,pe=!!y.normalMap,ct=!!y.displacementMap,ke=!!y.emissiveMap,T=!!y.metalnessMap,S=!!y.roughnessMap,z=y.anisotropy>0,Q=y.clearcoat>0,J=y.iridescence>0,ee=y.sheen>0,me=y.transmission>0,oe=z&&!!y.anisotropyMap,de=Q&&!!y.clearcoatMap,Ee=Q&&!!y.clearcoatNormalMap,Oe=Q&&!!y.clearcoatRoughnessMap,Z=J&&!!y.iridescenceMap,Qe=J&&!!y.iridescenceThicknessMap,qe=ee&&!!y.sheenColorMap,Re=ee&&!!y.sheenRoughnessMap,ye=!!y.specularMap,fe=!!y.specularColorMap,Ue=!!y.specularIntensityMap,Je=me&&!!y.transmissionMap,ut=me&&!!y.thicknessMap,Ge=!!y.gradientMap,ie=!!y.alphaMap,L=y.alphaTest>0,re=!!y.alphaHash,ae=!!y.extensions,Te=!!F.attributes.uv1,Se=!!F.attributes.uv2,nt=!!F.attributes.uv3;let it=Vn;return y.toneMapped&&(_e===null||_e.isXRRenderTarget===!0)&&(it=r.toneMapping),{isWebGL2:h,shaderID:X,shaderType:y.type,shaderName:y.name,vertexShader:G,fragmentShader:K,defines:y.defines,customVertexShaderID:ce,customFragmentShaderID:xe,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:Ne,instancing:Ie,instancingColor:Ie&&Y.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:_e===null?r.outputColorSpace:_e.isXRRenderTarget===!0?_e.texture.colorSpace:bt,map:we,matcap:$e,envMap:k,envMapMode:k&&j.mapping,envMapCubeUVHeight:q,aoMap:Dt,lightMap:Me,bumpMap:Ce,normalMap:pe,displacementMap:d&&ct,emissiveMap:ke,normalMapObjectSpace:pe&&y.normalMapType===Bu,normalMapTangentSpace:pe&&y.normalMapType===Xa,metalnessMap:T,roughnessMap:S,anisotropy:z,anisotropyMap:oe,clearcoat:Q,clearcoatMap:de,clearcoatNormalMap:Ee,clearcoatRoughnessMap:Oe,iridescence:J,iridescenceMap:Z,iridescenceThicknessMap:Qe,sheen:ee,sheenColorMap:qe,sheenRoughnessMap:Re,specularMap:ye,specularColorMap:fe,specularIntensityMap:Ue,transmission:me,transmissionMap:Je,thicknessMap:ut,gradientMap:Ge,opaque:y.transparent===!1&&y.blending===zi,alphaMap:ie,alphaTest:L,alphaHash:re,combine:y.combine,mapUv:we&&_(y.map.channel),aoMapUv:Dt&&_(y.aoMap.channel),lightMapUv:Me&&_(y.lightMap.channel),bumpMapUv:Ce&&_(y.bumpMap.channel),normalMapUv:pe&&_(y.normalMap.channel),displacementMapUv:ct&&_(y.displacementMap.channel),emissiveMapUv:ke&&_(y.emissiveMap.channel),metalnessMapUv:T&&_(y.metalnessMap.channel),roughnessMapUv:S&&_(y.roughnessMap.channel),anisotropyMapUv:oe&&_(y.anisotropyMap.channel),clearcoatMapUv:de&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:Ee&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Oe&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Z&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:Qe&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:qe&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Re&&_(y.sheenRoughnessMap.channel),specularMapUv:ye&&_(y.specularMap.channel),specularColorMapUv:fe&&_(y.specularColorMap.channel),specularIntensityMapUv:Ue&&_(y.specularIntensityMap.channel),transmissionMapUv:Je&&_(y.transmissionMap.channel),thicknessMapUv:ut&&_(y.thicknessMap.channel),alphaMapUv:ie&&_(y.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(pe||z),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,vertexUv1s:Te,vertexUv2s:Se,vertexUv3s:nt,pointsUvs:Y.isPoints===!0&&!!F.attributes.uv&&(we||ie),fog:!!I,useFog:y.fog===!0,fogExp2:I&&I.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:Y.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:ne,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:r.shadowMap.enabled&&U.length>0,shadowMapType:r.shadowMap.type,toneMapping:it,useLegacyLights:r._useLegacyLights,decodeVideoTexture:we&&y.map.isVideoTexture===!0&&Ke.getTransfer(y.map.colorSpace)===rt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Ot,flipSided:y.side===Pt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:ae&&y.extensions.derivatives===!0,extensionFragDepth:ae&&y.extensions.fragDepth===!0,extensionDrawBuffers:ae&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:ae&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ae&&y.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function p(y){const b=[];if(y.shaderID?b.push(y.shaderID):(b.push(y.customVertexShaderID),b.push(y.customFragmentShaderID)),y.defines!==void 0)for(const U in y.defines)b.push(U),b.push(y.defines[U]);return y.isRawShaderMaterial===!1&&(M(b,y),x(b,y),b.push(r.outputColorSpace)),b.push(y.customProgramCacheKey),b.join()}function M(y,b){y.push(b.precision),y.push(b.outputColorSpace),y.push(b.envMapMode),y.push(b.envMapCubeUVHeight),y.push(b.mapUv),y.push(b.alphaMapUv),y.push(b.lightMapUv),y.push(b.aoMapUv),y.push(b.bumpMapUv),y.push(b.normalMapUv),y.push(b.displacementMapUv),y.push(b.emissiveMapUv),y.push(b.metalnessMapUv),y.push(b.roughnessMapUv),y.push(b.anisotropyMapUv),y.push(b.clearcoatMapUv),y.push(b.clearcoatNormalMapUv),y.push(b.clearcoatRoughnessMapUv),y.push(b.iridescenceMapUv),y.push(b.iridescenceThicknessMapUv),y.push(b.sheenColorMapUv),y.push(b.sheenRoughnessMapUv),y.push(b.specularMapUv),y.push(b.specularColorMapUv),y.push(b.specularIntensityMapUv),y.push(b.transmissionMapUv),y.push(b.thicknessMapUv),y.push(b.combine),y.push(b.fogExp2),y.push(b.sizeAttenuation),y.push(b.morphTargetsCount),y.push(b.morphAttributeCount),y.push(b.numDirLights),y.push(b.numPointLights),y.push(b.numSpotLights),y.push(b.numSpotLightMaps),y.push(b.numHemiLights),y.push(b.numRectAreaLights),y.push(b.numDirLightShadows),y.push(b.numPointLightShadows),y.push(b.numSpotLightShadows),y.push(b.numSpotLightShadowsWithMaps),y.push(b.numLightProbes),y.push(b.shadowMapType),y.push(b.toneMapping),y.push(b.numClippingPlanes),y.push(b.numClipIntersection),y.push(b.depthPacking)}function x(y,b){o.disableAll(),b.isWebGL2&&o.enable(0),b.supportsVertexTextures&&o.enable(1),b.instancing&&o.enable(2),b.instancingColor&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),y.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.skinning&&o.enable(4),b.morphTargets&&o.enable(5),b.morphNormals&&o.enable(6),b.morphColors&&o.enable(7),b.premultipliedAlpha&&o.enable(8),b.shadowMapEnabled&&o.enable(9),b.useLegacyLights&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),y.push(o.mask)}function v(y){const b=g[y.type];let U;if(b){const N=hn[b];U=$i.clone(N.uniforms)}else U=y.uniforms;return U}function R(y,b){let U;for(let N=0,Y=c.length;N<Y;N++){const I=c[N];if(I.cacheKey===b){U=I,++U.usedTimes;break}}return U===void 0&&(U=new Bg(r,b,y,s),c.push(U)),U}function w(y){if(--y.usedTimes===0){const b=c.indexOf(y);c[b]=c[c.length-1],c.pop(),y.destroy()}}function A(y){l.remove(y)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:R,releaseProgram:w,releaseShaderCache:A,programs:c,dispose:P}}function qg(){let r=new WeakMap;function e(s){let a=r.get(s);return a===void 0&&(a={},r.set(s,a)),a}function t(s){r.delete(s)}function n(s,a,o){r.get(s)[a]=o}function i(){r=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function Xg(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function Ul(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Fl(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(u,d,f,g,_,m){let p=r[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},r[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function o(u,d,f,g,_,m){const p=a(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(u,d,f,g,_,m){const p=a(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||Xg),n.length>1&&n.sort(d||Ul),i.length>1&&i.sort(d||Ul)}function h(){for(let u=e,d=r.length;u<d;u++){const f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:o,unshift:l,finish:h,sort:c}}function jg(){let r=new WeakMap;function e(n,i){const s=r.get(n);let a;return s===void 0?(a=new Fl,r.set(n,[a])):i>=s.length?(a=new Fl,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function $g(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new ue};break;case"SpotLight":t={position:new C,direction:new C,color:new ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new ue,groundColor:new ue};break;case"RectAreaLight":t={color:new ue,position:new C,halfWidth:new C,halfHeight:new C};break}return r[e.id]=t,t}}}function Yg(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ve,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let Kg=0;function Zg(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Jg(r,e){const t=new $g,n=Yg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new C);const s=new C,a=new He,o=new He;function l(h,u){let d=0,f=0,g=0;for(let N=0;N<9;N++)i.probe[N].set(0,0,0);let _=0,m=0,p=0,M=0,x=0,v=0,R=0,w=0,A=0,P=0,y=0;h.sort(Zg);const b=u===!0?Math.PI:1;for(let N=0,Y=h.length;N<Y;N++){const I=h[N],F=I.color,V=I.intensity,j=I.distance,q=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)d+=F.r*V*b,f+=F.g*V*b,g+=F.b*V*b;else if(I.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(I.sh.coefficients[X],V);y++}else if(I.isDirectionalLight){const X=t.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity*b),I.castShadow){const $=I.shadow,te=n.get(I);te.shadowBias=$.bias,te.shadowNormalBias=$.normalBias,te.shadowRadius=$.radius,te.shadowMapSize=$.mapSize,i.directionalShadow[_]=te,i.directionalShadowMap[_]=q,i.directionalShadowMatrix[_]=I.shadow.matrix,v++}i.directional[_]=X,_++}else if(I.isSpotLight){const X=t.get(I);X.position.setFromMatrixPosition(I.matrixWorld),X.color.copy(F).multiplyScalar(V*b),X.distance=j,X.coneCos=Math.cos(I.angle),X.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),X.decay=I.decay,i.spot[p]=X;const $=I.shadow;if(I.map&&(i.spotLightMap[A]=I.map,A++,$.updateMatrices(I),I.castShadow&&P++),i.spotLightMatrix[p]=$.matrix,I.castShadow){const te=n.get(I);te.shadowBias=$.bias,te.shadowNormalBias=$.normalBias,te.shadowRadius=$.radius,te.shadowMapSize=$.mapSize,i.spotShadow[p]=te,i.spotShadowMap[p]=q,w++}p++}else if(I.isRectAreaLight){const X=t.get(I);X.color.copy(F).multiplyScalar(V),X.halfWidth.set(I.width*.5,0,0),X.halfHeight.set(0,I.height*.5,0),i.rectArea[M]=X,M++}else if(I.isPointLight){const X=t.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity*b),X.distance=I.distance,X.decay=I.decay,I.castShadow){const $=I.shadow,te=n.get(I);te.shadowBias=$.bias,te.shadowNormalBias=$.normalBias,te.shadowRadius=$.radius,te.shadowMapSize=$.mapSize,te.shadowCameraNear=$.camera.near,te.shadowCameraFar=$.camera.far,i.pointShadow[m]=te,i.pointShadowMap[m]=q,i.pointShadowMatrix[m]=I.shadow.matrix,R++}i.point[m]=X,m++}else if(I.isHemisphereLight){const X=t.get(I);X.skyColor.copy(I.color).multiplyScalar(V*b),X.groundColor.copy(I.groundColor).multiplyScalar(V*b),i.hemi[x]=X,x++}}M>0&&(e.isWebGL2?r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=se.LTC_FLOAT_1,i.rectAreaLTC2=se.LTC_FLOAT_2):(i.rectAreaLTC1=se.LTC_HALF_1,i.rectAreaLTC2=se.LTC_HALF_2):r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=se.LTC_FLOAT_1,i.rectAreaLTC2=se.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=se.LTC_HALF_1,i.rectAreaLTC2=se.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=g;const U=i.hash;(U.directionalLength!==_||U.pointLength!==m||U.spotLength!==p||U.rectAreaLength!==M||U.hemiLength!==x||U.numDirectionalShadows!==v||U.numPointShadows!==R||U.numSpotShadows!==w||U.numSpotMaps!==A||U.numLightProbes!==y)&&(i.directional.length=_,i.spot.length=p,i.rectArea.length=M,i.point.length=m,i.hemi.length=x,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=R,i.pointShadowMap.length=R,i.spotShadow.length=w,i.spotShadowMap.length=w,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=R,i.spotLightMatrix.length=w+A-P,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=P,i.numLightProbes=y,U.directionalLength=_,U.pointLength=m,U.spotLength=p,U.rectAreaLength=M,U.hemiLength=x,U.numDirectionalShadows=v,U.numPointShadows=R,U.numSpotShadows=w,U.numSpotMaps=A,U.numLightProbes=y,i.version=Kg++)}function c(h,u){let d=0,f=0,g=0,_=0,m=0;const p=u.matrixWorldInverse;for(let M=0,x=h.length;M<x;M++){const v=h[M];if(v.isDirectionalLight){const R=i.directional[d];R.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(p),d++}else if(v.isSpotLight){const R=i.spot[g];R.position.setFromMatrixPosition(v.matrixWorld),R.position.applyMatrix4(p),R.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(p),g++}else if(v.isRectAreaLight){const R=i.rectArea[_];R.position.setFromMatrixPosition(v.matrixWorld),R.position.applyMatrix4(p),o.identity(),a.copy(v.matrixWorld),a.premultiply(p),o.extractRotation(a),R.halfWidth.set(v.width*.5,0,0),R.halfHeight.set(0,v.height*.5,0),R.halfWidth.applyMatrix4(o),R.halfHeight.applyMatrix4(o),_++}else if(v.isPointLight){const R=i.point[f];R.position.setFromMatrixPosition(v.matrixWorld),R.position.applyMatrix4(p),f++}else if(v.isHemisphereLight){const R=i.hemi[m];R.direction.setFromMatrixPosition(v.matrixWorld),R.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:i}}function kl(r,e){const t=new Jg(r,e),n=[],i=[];function s(){n.length=0,i.length=0}function a(u){n.push(u)}function o(u){i.push(u)}function l(u){t.setup(n,u)}function c(u){t.setupView(n,u)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Qg(r,e){let t=new WeakMap;function n(s,a=0){const o=t.get(s);let l;return o===void 0?(l=new kl(r,e),t.set(s,[l])):a>=o.length?(l=new kl(r,e),o.push(l)):l=o[a],l}function i(){t=new WeakMap}return{get:n,dispose:i}}class e0 extends an{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ou,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class t0 extends an{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const n0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,i0=`uniform sampler2D shadow_pass;
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
}`;function s0(r,e,t){let n=new Ka;const i=new ve,s=new ve,a=new tt,o=new e0({depthPacking:zu}),l=new t0,c={},h=t.maxTextureSize,u={[An]:Pt,[Pt]:An,[Ot]:Ot},d=new Bt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ve},radius:{value:4}},vertexShader:n0,fragmentShader:i0}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new wt;g.setAttribute("position",new It(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new le(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Uc;let p=this.type;this.render=function(w,A,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const y=r.getRenderTarget(),b=r.getActiveCubeFace(),U=r.getActiveMipmapLevel(),N=r.state;N.setBlending(Tn),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const Y=p!==Sn&&this.type===Sn,I=p===Sn&&this.type!==Sn;for(let F=0,V=w.length;F<V;F++){const j=w[F],q=j.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;i.copy(q.mapSize);const X=q.getFrameExtents();if(i.multiply(X),s.copy(q.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/X.x),i.x=s.x*X.x,q.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/X.y),i.y=s.y*X.y,q.mapSize.y=s.y)),q.map===null||Y===!0||I===!0){const te=this.type!==Sn?{minFilter:Mt,magFilter:Mt}:{};q.map!==null&&q.map.dispose(),q.map=new Zt(i.x,i.y,te),q.map.texture.name=j.name+".shadowMap",q.camera.updateProjectionMatrix()}r.setRenderTarget(q.map),r.clear();const $=q.getViewportCount();for(let te=0;te<$;te++){const ne=q.getViewport(te);a.set(s.x*ne.x,s.y*ne.y,s.x*ne.z,s.y*ne.w),N.viewport(a),q.updateMatrices(j,te),n=q.getFrustum(),v(A,P,q.camera,j,this.type)}q.isPointLightShadow!==!0&&this.type===Sn&&M(q,P),q.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(y,b,U)};function M(w,A){const P=e.update(_);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Zt(i.x,i.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,r.setRenderTarget(w.mapPass),r.clear(),r.renderBufferDirect(A,null,P,d,_,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,r.setRenderTarget(w.map),r.clear(),r.renderBufferDirect(A,null,P,f,_,null)}function x(w,A,P,y){let b=null;const U=P.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(U!==void 0)b=U;else if(b=P.isPointLight===!0?l:o,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const N=b.uuid,Y=A.uuid;let I=c[N];I===void 0&&(I={},c[N]=I);let F=I[Y];F===void 0&&(F=b.clone(),I[Y]=F,A.addEventListener("dispose",R)),b=F}if(b.visible=A.visible,b.wireframe=A.wireframe,y===Sn?b.side=A.shadowSide!==null?A.shadowSide:A.side:b.side=A.shadowSide!==null?A.shadowSide:u[A.side],b.alphaMap=A.alphaMap,b.alphaTest=A.alphaTest,b.map=A.map,b.clipShadows=A.clipShadows,b.clippingPlanes=A.clippingPlanes,b.clipIntersection=A.clipIntersection,b.displacementMap=A.displacementMap,b.displacementScale=A.displacementScale,b.displacementBias=A.displacementBias,b.wireframeLinewidth=A.wireframeLinewidth,b.linewidth=A.linewidth,P.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const N=r.properties.get(b);N.light=P}return b}function v(w,A,P,y,b){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&b===Sn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,w.matrixWorld);const Y=e.update(w),I=w.material;if(Array.isArray(I)){const F=Y.groups;for(let V=0,j=F.length;V<j;V++){const q=F[V],X=I[q.materialIndex];if(X&&X.visible){const $=x(w,X,y,b);w.onBeforeShadow(r,w,A,P,Y,$,q),r.renderBufferDirect(P,null,Y,$,w,q),w.onAfterShadow(r,w,A,P,Y,$,q)}}}else if(I.visible){const F=x(w,I,y,b);w.onBeforeShadow(r,w,A,P,Y,F,null),r.renderBufferDirect(P,null,Y,F,w,null),w.onAfterShadow(r,w,A,P,Y,F,null)}}const N=w.children;for(let Y=0,I=N.length;Y<I;Y++)v(N[Y],A,P,y,b)}function R(w){w.target.removeEventListener("dispose",R);for(const P in c){const y=c[P],b=w.target.uuid;b in y&&(y[b].dispose(),delete y[b])}}}function r0(r,e,t){const n=t.isWebGL2;function i(){let L=!1;const re=new tt;let ae=null;const Te=new tt(0,0,0,0);return{setMask:function(Se){ae!==Se&&!L&&(r.colorMask(Se,Se,Se,Se),ae=Se)},setLocked:function(Se){L=Se},setClear:function(Se,nt,it,xt,Nt){Nt===!0&&(Se*=xt,nt*=xt,it*=xt),re.set(Se,nt,it,xt),Te.equals(re)===!1&&(r.clearColor(Se,nt,it,xt),Te.copy(re))},reset:function(){L=!1,ae=null,Te.set(-1,0,0,0)}}}function s(){let L=!1,re=null,ae=null,Te=null;return{setTest:function(Se){Se?Ne(r.DEPTH_TEST):we(r.DEPTH_TEST)},setMask:function(Se){re!==Se&&!L&&(r.depthMask(Se),re=Se)},setFunc:function(Se){if(ae!==Se){switch(Se){case gu:r.depthFunc(r.NEVER);break;case _u:r.depthFunc(r.ALWAYS);break;case xu:r.depthFunc(r.LESS);break;case or:r.depthFunc(r.LEQUAL);break;case vu:r.depthFunc(r.EQUAL);break;case yu:r.depthFunc(r.GEQUAL);break;case Mu:r.depthFunc(r.GREATER);break;case Su:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ae=Se}},setLocked:function(Se){L=Se},setClear:function(Se){Te!==Se&&(r.clearDepth(Se),Te=Se)},reset:function(){L=!1,re=null,ae=null,Te=null}}}function a(){let L=!1,re=null,ae=null,Te=null,Se=null,nt=null,it=null,xt=null,Nt=null;return{setTest:function(st){L||(st?Ne(r.STENCIL_TEST):we(r.STENCIL_TEST))},setMask:function(st){re!==st&&!L&&(r.stencilMask(st),re=st)},setFunc:function(st,Ut,cn){(ae!==st||Te!==Ut||Se!==cn)&&(r.stencilFunc(st,Ut,cn),ae=st,Te=Ut,Se=cn)},setOp:function(st,Ut,cn){(nt!==st||it!==Ut||xt!==cn)&&(r.stencilOp(st,Ut,cn),nt=st,it=Ut,xt=cn)},setLocked:function(st){L=st},setClear:function(st){Nt!==st&&(r.clearStencil(st),Nt=st)},reset:function(){L=!1,re=null,ae=null,Te=null,Se=null,nt=null,it=null,xt=null,Nt=null}}}const o=new i,l=new s,c=new a,h=new WeakMap,u=new WeakMap;let d={},f={},g=new WeakMap,_=[],m=null,p=!1,M=null,x=null,v=null,R=null,w=null,A=null,P=null,y=new ue(0,0,0),b=0,U=!1,N=null,Y=null,I=null,F=null,V=null;const j=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,X=0;const $=r.getParameter(r.VERSION);$.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec($)[1]),q=X>=1):$.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),q=X>=2);let te=null,ne={};const G=r.getParameter(r.SCISSOR_BOX),K=r.getParameter(r.VIEWPORT),ce=new tt().fromArray(G),xe=new tt().fromArray(K);function _e(L,re,ae,Te){const Se=new Uint8Array(4),nt=r.createTexture();r.bindTexture(L,nt),r.texParameteri(L,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(L,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let it=0;it<ae;it++)n&&(L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY)?r.texImage3D(re,0,r.RGBA,1,1,Te,0,r.RGBA,r.UNSIGNED_BYTE,Se):r.texImage2D(re+it,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Se);return nt}const Ie={};Ie[r.TEXTURE_2D]=_e(r.TEXTURE_2D,r.TEXTURE_2D,1),Ie[r.TEXTURE_CUBE_MAP]=_e(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ie[r.TEXTURE_2D_ARRAY]=_e(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Ie[r.TEXTURE_3D]=_e(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ne(r.DEPTH_TEST),l.setFunc(or),ke(!1),T(Mo),Ne(r.CULL_FACE),pe(Tn);function Ne(L){d[L]!==!0&&(r.enable(L),d[L]=!0)}function we(L){d[L]!==!1&&(r.disable(L),d[L]=!1)}function $e(L,re){return f[L]!==re?(r.bindFramebuffer(L,re),f[L]=re,n&&(L===r.DRAW_FRAMEBUFFER&&(f[r.FRAMEBUFFER]=re),L===r.FRAMEBUFFER&&(f[r.DRAW_FRAMEBUFFER]=re)),!0):!1}function k(L,re){let ae=_,Te=!1;if(L)if(ae=g.get(re),ae===void 0&&(ae=[],g.set(re,ae)),L.isWebGLMultipleRenderTargets){const Se=L.texture;if(ae.length!==Se.length||ae[0]!==r.COLOR_ATTACHMENT0){for(let nt=0,it=Se.length;nt<it;nt++)ae[nt]=r.COLOR_ATTACHMENT0+nt;ae.length=Se.length,Te=!0}}else ae[0]!==r.COLOR_ATTACHMENT0&&(ae[0]=r.COLOR_ATTACHMENT0,Te=!0);else ae[0]!==r.BACK&&(ae[0]=r.BACK,Te=!0);Te&&(t.isWebGL2?r.drawBuffers(ae):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ae))}function Dt(L){return m!==L?(r.useProgram(L),m=L,!0):!1}const Me={[ei]:r.FUNC_ADD,[tu]:r.FUNC_SUBTRACT,[nu]:r.FUNC_REVERSE_SUBTRACT};if(n)Me[Eo]=r.MIN,Me[wo]=r.MAX;else{const L=e.get("EXT_blend_minmax");L!==null&&(Me[Eo]=L.MIN_EXT,Me[wo]=L.MAX_EXT)}const Ce={[iu]:r.ZERO,[su]:r.ONE,[ru]:r.SRC_COLOR,[xa]:r.SRC_ALPHA,[uu]:r.SRC_ALPHA_SATURATE,[cu]:r.DST_COLOR,[ou]:r.DST_ALPHA,[au]:r.ONE_MINUS_SRC_COLOR,[va]:r.ONE_MINUS_SRC_ALPHA,[hu]:r.ONE_MINUS_DST_COLOR,[lu]:r.ONE_MINUS_DST_ALPHA,[du]:r.CONSTANT_COLOR,[fu]:r.ONE_MINUS_CONSTANT_COLOR,[pu]:r.CONSTANT_ALPHA,[mu]:r.ONE_MINUS_CONSTANT_ALPHA};function pe(L,re,ae,Te,Se,nt,it,xt,Nt,st){if(L===Tn){p===!0&&(we(r.BLEND),p=!1);return}if(p===!1&&(Ne(r.BLEND),p=!0),L!==eu){if(L!==M||st!==U){if((x!==ei||w!==ei)&&(r.blendEquation(r.FUNC_ADD),x=ei,w=ei),st)switch(L){case zi:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ar:r.blendFunc(r.ONE,r.ONE);break;case So:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case bo:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case zi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case ar:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case So:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case bo:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}v=null,R=null,A=null,P=null,y.set(0,0,0),b=0,M=L,U=st}return}Se=Se||re,nt=nt||ae,it=it||Te,(re!==x||Se!==w)&&(r.blendEquationSeparate(Me[re],Me[Se]),x=re,w=Se),(ae!==v||Te!==R||nt!==A||it!==P)&&(r.blendFuncSeparate(Ce[ae],Ce[Te],Ce[nt],Ce[it]),v=ae,R=Te,A=nt,P=it),(xt.equals(y)===!1||Nt!==b)&&(r.blendColor(xt.r,xt.g,xt.b,Nt),y.copy(xt),b=Nt),M=L,U=!1}function ct(L,re){L.side===Ot?we(r.CULL_FACE):Ne(r.CULL_FACE);let ae=L.side===Pt;re&&(ae=!ae),ke(ae),L.blending===zi&&L.transparent===!1?pe(Tn):pe(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),l.setFunc(L.depthFunc),l.setTest(L.depthTest),l.setMask(L.depthWrite),o.setMask(L.colorWrite);const Te=L.stencilWrite;c.setTest(Te),Te&&(c.setMask(L.stencilWriteMask),c.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),c.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),z(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Ne(r.SAMPLE_ALPHA_TO_COVERAGE):we(r.SAMPLE_ALPHA_TO_COVERAGE)}function ke(L){N!==L&&(L?r.frontFace(r.CW):r.frontFace(r.CCW),N=L)}function T(L){L!==Jh?(Ne(r.CULL_FACE),L!==Y&&(L===Mo?r.cullFace(r.BACK):L===Qh?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):we(r.CULL_FACE),Y=L}function S(L){L!==I&&(q&&r.lineWidth(L),I=L)}function z(L,re,ae){L?(Ne(r.POLYGON_OFFSET_FILL),(F!==re||V!==ae)&&(r.polygonOffset(re,ae),F=re,V=ae)):we(r.POLYGON_OFFSET_FILL)}function Q(L){L?Ne(r.SCISSOR_TEST):we(r.SCISSOR_TEST)}function J(L){L===void 0&&(L=r.TEXTURE0+j-1),te!==L&&(r.activeTexture(L),te=L)}function ee(L,re,ae){ae===void 0&&(te===null?ae=r.TEXTURE0+j-1:ae=te);let Te=ne[ae];Te===void 0&&(Te={type:void 0,texture:void 0},ne[ae]=Te),(Te.type!==L||Te.texture!==re)&&(te!==ae&&(r.activeTexture(ae),te=ae),r.bindTexture(L,re||Ie[L]),Te.type=L,Te.texture=re)}function me(){const L=ne[te];L!==void 0&&L.type!==void 0&&(r.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function oe(){try{r.compressedTexImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function de(){try{r.compressedTexImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ee(){try{r.texSubImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Oe(){try{r.texSubImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Z(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Qe(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function qe(){try{r.texStorage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Re(){try{r.texStorage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ye(){try{r.texImage2D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function fe(){try{r.texImage3D.apply(r,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ue(L){ce.equals(L)===!1&&(r.scissor(L.x,L.y,L.z,L.w),ce.copy(L))}function Je(L){xe.equals(L)===!1&&(r.viewport(L.x,L.y,L.z,L.w),xe.copy(L))}function ut(L,re){let ae=u.get(re);ae===void 0&&(ae=new WeakMap,u.set(re,ae));let Te=ae.get(L);Te===void 0&&(Te=r.getUniformBlockIndex(re,L.name),ae.set(L,Te))}function Ge(L,re){const Te=u.get(re).get(L);h.get(re)!==Te&&(r.uniformBlockBinding(re,Te,L.__bindingPointIndex),h.set(re,Te))}function ie(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),n===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),d={},te=null,ne={},f={},g=new WeakMap,_=[],m=null,p=!1,M=null,x=null,v=null,R=null,w=null,A=null,P=null,y=new ue(0,0,0),b=0,U=!1,N=null,Y=null,I=null,F=null,V=null,ce.set(0,0,r.canvas.width,r.canvas.height),xe.set(0,0,r.canvas.width,r.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:Ne,disable:we,bindFramebuffer:$e,drawBuffers:k,useProgram:Dt,setBlending:pe,setMaterial:ct,setFlipSided:ke,setCullFace:T,setLineWidth:S,setPolygonOffset:z,setScissorTest:Q,activeTexture:J,bindTexture:ee,unbindTexture:me,compressedTexImage2D:oe,compressedTexImage3D:de,texImage2D:ye,texImage3D:fe,updateUBOMapping:ut,uniformBlockBinding:Ge,texStorage2D:qe,texStorage3D:Re,texSubImage2D:Ee,texSubImage3D:Oe,compressedTexSubImage2D:Z,compressedTexSubImage3D:Qe,scissor:Ue,viewport:Je,reset:ie}}function a0(r,e,t,n,i,s,a){const o=i.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,S){return f?new OffscreenCanvas(T,S):vs("canvas")}function _(T,S,z,Q){let J=1;if((T.width>Q||T.height>Q)&&(J=Q/Math.max(T.width,T.height)),J<1||S===!0)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap){const ee=S?pr:Math.floor,me=ee(J*T.width),oe=ee(J*T.height);u===void 0&&(u=g(me,oe));const de=z?g(me,oe):u;return de.width=me,de.height=oe,de.getContext("2d").drawImage(T,0,0,me,oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+me+"x"+oe+")."),de}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+")."),T;return T}function m(T){return Ta(T.width)&&Ta(T.height)}function p(T){return o?!1:T.wrapS!==$t||T.wrapT!==$t||T.minFilter!==Mt&&T.minFilter!==Ht}function M(T,S){return T.generateMipmaps&&S&&T.minFilter!==Mt&&T.minFilter!==Ht}function x(T){r.generateMipmap(T)}function v(T,S,z,Q,J=!1){if(o===!1)return S;if(T!==null){if(r[T]!==void 0)return r[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let ee=S;if(S===r.RED&&(z===r.FLOAT&&(ee=r.R32F),z===r.HALF_FLOAT&&(ee=r.R16F),z===r.UNSIGNED_BYTE&&(ee=r.R8)),S===r.RED_INTEGER&&(z===r.UNSIGNED_BYTE&&(ee=r.R8UI),z===r.UNSIGNED_SHORT&&(ee=r.R16UI),z===r.UNSIGNED_INT&&(ee=r.R32UI),z===r.BYTE&&(ee=r.R8I),z===r.SHORT&&(ee=r.R16I),z===r.INT&&(ee=r.R32I)),S===r.RG&&(z===r.FLOAT&&(ee=r.RG32F),z===r.HALF_FLOAT&&(ee=r.RG16F),z===r.UNSIGNED_BYTE&&(ee=r.RG8)),S===r.RGBA){const me=J?hr:Ke.getTransfer(Q);z===r.FLOAT&&(ee=r.RGBA32F),z===r.HALF_FLOAT&&(ee=r.RGBA16F),z===r.UNSIGNED_BYTE&&(ee=me===rt?r.SRGB8_ALPHA8:r.RGBA8),z===r.UNSIGNED_SHORT_4_4_4_4&&(ee=r.RGBA4),z===r.UNSIGNED_SHORT_5_5_5_1&&(ee=r.RGB5_A1)}return(ee===r.R16F||ee===r.R32F||ee===r.RG16F||ee===r.RG32F||ee===r.RGBA16F||ee===r.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function R(T,S,z){return M(T,z)===!0||T.isFramebufferTexture&&T.minFilter!==Mt&&T.minFilter!==Ht?Math.log2(Math.max(S.width,S.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?S.mipmaps.length:1}function w(T){return T===Mt||T===Sa||T===nr?r.NEAREST:r.LINEAR}function A(T){const S=T.target;S.removeEventListener("dispose",A),y(S),S.isVideoTexture&&h.delete(S)}function P(T){const S=T.target;S.removeEventListener("dispose",P),U(S)}function y(T){const S=n.get(T);if(S.__webglInit===void 0)return;const z=T.source,Q=d.get(z);if(Q){const J=Q[S.__cacheKey];J.usedTimes--,J.usedTimes===0&&b(T),Object.keys(Q).length===0&&d.delete(z)}n.remove(T)}function b(T){const S=n.get(T);r.deleteTexture(S.__webglTexture);const z=T.source,Q=d.get(z);delete Q[S.__cacheKey],a.memory.textures--}function U(T){const S=T.texture,z=n.get(T),Q=n.get(S);if(Q.__webglTexture!==void 0&&(r.deleteTexture(Q.__webglTexture),a.memory.textures--),T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(z.__webglFramebuffer[J]))for(let ee=0;ee<z.__webglFramebuffer[J].length;ee++)r.deleteFramebuffer(z.__webglFramebuffer[J][ee]);else r.deleteFramebuffer(z.__webglFramebuffer[J]);z.__webglDepthbuffer&&r.deleteRenderbuffer(z.__webglDepthbuffer[J])}else{if(Array.isArray(z.__webglFramebuffer))for(let J=0;J<z.__webglFramebuffer.length;J++)r.deleteFramebuffer(z.__webglFramebuffer[J]);else r.deleteFramebuffer(z.__webglFramebuffer);if(z.__webglDepthbuffer&&r.deleteRenderbuffer(z.__webglDepthbuffer),z.__webglMultisampledFramebuffer&&r.deleteFramebuffer(z.__webglMultisampledFramebuffer),z.__webglColorRenderbuffer)for(let J=0;J<z.__webglColorRenderbuffer.length;J++)z.__webglColorRenderbuffer[J]&&r.deleteRenderbuffer(z.__webglColorRenderbuffer[J]);z.__webglDepthRenderbuffer&&r.deleteRenderbuffer(z.__webglDepthRenderbuffer)}if(T.isWebGLMultipleRenderTargets)for(let J=0,ee=S.length;J<ee;J++){const me=n.get(S[J]);me.__webglTexture&&(r.deleteTexture(me.__webglTexture),a.memory.textures--),n.remove(S[J])}n.remove(S),n.remove(T)}let N=0;function Y(){N=0}function I(){const T=N;return T>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+i.maxTextures),N+=1,T}function F(T){const S=[];return S.push(T.wrapS),S.push(T.wrapT),S.push(T.wrapR||0),S.push(T.magFilter),S.push(T.minFilter),S.push(T.anisotropy),S.push(T.internalFormat),S.push(T.format),S.push(T.type),S.push(T.generateMipmaps),S.push(T.premultiplyAlpha),S.push(T.flipY),S.push(T.unpackAlignment),S.push(T.colorSpace),S.join()}function V(T,S){const z=n.get(T);if(T.isVideoTexture&&ct(T),T.isRenderTargetTexture===!1&&T.version>0&&z.__version!==T.version){const Q=T.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ce(z,T,S);return}}t.bindTexture(r.TEXTURE_2D,z.__webglTexture,r.TEXTURE0+S)}function j(T,S){const z=n.get(T);if(T.version>0&&z.__version!==T.version){ce(z,T,S);return}t.bindTexture(r.TEXTURE_2D_ARRAY,z.__webglTexture,r.TEXTURE0+S)}function q(T,S){const z=n.get(T);if(T.version>0&&z.__version!==T.version){ce(z,T,S);return}t.bindTexture(r.TEXTURE_3D,z.__webglTexture,r.TEXTURE0+S)}function X(T,S){const z=n.get(T);if(T.version>0&&z.__version!==T.version){xe(z,T,S);return}t.bindTexture(r.TEXTURE_CUBE_MAP,z.__webglTexture,r.TEXTURE0+S)}const $={[qn]:r.REPEAT,[$t]:r.CLAMP_TO_EDGE,[lr]:r.MIRRORED_REPEAT},te={[Mt]:r.NEAREST,[Sa]:r.NEAREST_MIPMAP_NEAREST,[nr]:r.NEAREST_MIPMAP_LINEAR,[Ht]:r.LINEAR,[Gc]:r.LINEAR_MIPMAP_NEAREST,[ci]:r.LINEAR_MIPMAP_LINEAR},ne={[Hu]:r.NEVER,[ju]:r.ALWAYS,[Gu]:r.LESS,[eh]:r.LEQUAL,[Vu]:r.EQUAL,[Xu]:r.GEQUAL,[Wu]:r.GREATER,[qu]:r.NOTEQUAL};function G(T,S,z){if(z?(r.texParameteri(T,r.TEXTURE_WRAP_S,$[S.wrapS]),r.texParameteri(T,r.TEXTURE_WRAP_T,$[S.wrapT]),(T===r.TEXTURE_3D||T===r.TEXTURE_2D_ARRAY)&&r.texParameteri(T,r.TEXTURE_WRAP_R,$[S.wrapR]),r.texParameteri(T,r.TEXTURE_MAG_FILTER,te[S.magFilter]),r.texParameteri(T,r.TEXTURE_MIN_FILTER,te[S.minFilter])):(r.texParameteri(T,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(T,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(T===r.TEXTURE_3D||T===r.TEXTURE_2D_ARRAY)&&r.texParameteri(T,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(S.wrapS!==$t||S.wrapT!==$t)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(T,r.TEXTURE_MAG_FILTER,w(S.magFilter)),r.texParameteri(T,r.TEXTURE_MIN_FILTER,w(S.minFilter)),S.minFilter!==Mt&&S.minFilter!==Ht&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),S.compareFunction&&(r.texParameteri(T,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(T,r.TEXTURE_COMPARE_FUNC,ne[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const Q=e.get("EXT_texture_filter_anisotropic");if(S.magFilter===Mt||S.minFilter!==nr&&S.minFilter!==ci||S.type===En&&e.has("OES_texture_float_linear")===!1||o===!1&&S.type===dn&&e.has("OES_texture_half_float_linear")===!1)return;(S.anisotropy>1||n.get(S).__currentAnisotropy)&&(r.texParameterf(T,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy)}}function K(T,S){let z=!1;T.__webglInit===void 0&&(T.__webglInit=!0,S.addEventListener("dispose",A));const Q=S.source;let J=d.get(Q);J===void 0&&(J={},d.set(Q,J));const ee=F(S);if(ee!==T.__cacheKey){J[ee]===void 0&&(J[ee]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,z=!0),J[ee].usedTimes++;const me=J[T.__cacheKey];me!==void 0&&(J[T.__cacheKey].usedTimes--,me.usedTimes===0&&b(S)),T.__cacheKey=ee,T.__webglTexture=J[ee].texture}return z}function ce(T,S,z){let Q=r.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Q=r.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Q=r.TEXTURE_3D);const J=K(T,S),ee=S.source;t.bindTexture(Q,T.__webglTexture,r.TEXTURE0+z);const me=n.get(ee);if(ee.version!==me.__version||J===!0){t.activeTexture(r.TEXTURE0+z);const oe=Ke.getPrimaries(Ke.workingColorSpace),de=S.colorSpace===Kt?null:Ke.getPrimaries(S.colorSpace),Ee=S.colorSpace===Kt||oe===de?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const Oe=p(S)&&m(S.image)===!1;let Z=_(S.image,Oe,!1,i.maxTextureSize);Z=ke(S,Z);const Qe=m(Z)||o,qe=s.convert(S.format,S.colorSpace);let Re=s.convert(S.type),ye=v(S.internalFormat,qe,Re,S.colorSpace,S.isVideoTexture);G(Q,S,Qe);let fe;const Ue=S.mipmaps,Je=o&&S.isVideoTexture!==!0&&ye!==Yc,ut=me.__version===void 0||J===!0,Ge=R(S,Z,Qe);if(S.isDepthTexture)ye=r.DEPTH_COMPONENT,o?S.type===En?ye=r.DEPTH_COMPONENT32F:S.type===Bn?ye=r.DEPTH_COMPONENT24:S.type===ii?ye=r.DEPTH24_STENCIL8:ye=r.DEPTH_COMPONENT16:S.type===En&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),S.format===si&&ye===r.DEPTH_COMPONENT&&S.type!==Wa&&S.type!==Bn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),S.type=Bn,Re=s.convert(S.type)),S.format===Wi&&ye===r.DEPTH_COMPONENT&&(ye=r.DEPTH_STENCIL,S.type!==ii&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),S.type=ii,Re=s.convert(S.type))),ut&&(Je?t.texStorage2D(r.TEXTURE_2D,1,ye,Z.width,Z.height):t.texImage2D(r.TEXTURE_2D,0,ye,Z.width,Z.height,0,qe,Re,null));else if(S.isDataTexture)if(Ue.length>0&&Qe){Je&&ut&&t.texStorage2D(r.TEXTURE_2D,Ge,ye,Ue[0].width,Ue[0].height);for(let ie=0,L=Ue.length;ie<L;ie++)fe=Ue[ie],Je?t.texSubImage2D(r.TEXTURE_2D,ie,0,0,fe.width,fe.height,qe,Re,fe.data):t.texImage2D(r.TEXTURE_2D,ie,ye,fe.width,fe.height,0,qe,Re,fe.data);S.generateMipmaps=!1}else Je?(ut&&t.texStorage2D(r.TEXTURE_2D,Ge,ye,Z.width,Z.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,Z.width,Z.height,qe,Re,Z.data)):t.texImage2D(r.TEXTURE_2D,0,ye,Z.width,Z.height,0,qe,Re,Z.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Je&&ut&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ge,ye,Ue[0].width,Ue[0].height,Z.depth);for(let ie=0,L=Ue.length;ie<L;ie++)fe=Ue[ie],S.format!==Yt?qe!==null?Je?t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,ie,0,0,0,fe.width,fe.height,Z.depth,qe,fe.data,0,0):t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,ie,ye,fe.width,fe.height,Z.depth,0,fe.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Je?t.texSubImage3D(r.TEXTURE_2D_ARRAY,ie,0,0,0,fe.width,fe.height,Z.depth,qe,Re,fe.data):t.texImage3D(r.TEXTURE_2D_ARRAY,ie,ye,fe.width,fe.height,Z.depth,0,qe,Re,fe.data)}else{Je&&ut&&t.texStorage2D(r.TEXTURE_2D,Ge,ye,Ue[0].width,Ue[0].height);for(let ie=0,L=Ue.length;ie<L;ie++)fe=Ue[ie],S.format!==Yt?qe!==null?Je?t.compressedTexSubImage2D(r.TEXTURE_2D,ie,0,0,fe.width,fe.height,qe,fe.data):t.compressedTexImage2D(r.TEXTURE_2D,ie,ye,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Je?t.texSubImage2D(r.TEXTURE_2D,ie,0,0,fe.width,fe.height,qe,Re,fe.data):t.texImage2D(r.TEXTURE_2D,ie,ye,fe.width,fe.height,0,qe,Re,fe.data)}else if(S.isDataArrayTexture)Je?(ut&&t.texStorage3D(r.TEXTURE_2D_ARRAY,Ge,ye,Z.width,Z.height,Z.depth),t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,qe,Re,Z.data)):t.texImage3D(r.TEXTURE_2D_ARRAY,0,ye,Z.width,Z.height,Z.depth,0,qe,Re,Z.data);else if(S.isData3DTexture)Je?(ut&&t.texStorage3D(r.TEXTURE_3D,Ge,ye,Z.width,Z.height,Z.depth),t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,qe,Re,Z.data)):t.texImage3D(r.TEXTURE_3D,0,ye,Z.width,Z.height,Z.depth,0,qe,Re,Z.data);else if(S.isFramebufferTexture){if(ut)if(Je)t.texStorage2D(r.TEXTURE_2D,Ge,ye,Z.width,Z.height);else{let ie=Z.width,L=Z.height;for(let re=0;re<Ge;re++)t.texImage2D(r.TEXTURE_2D,re,ye,ie,L,0,qe,Re,null),ie>>=1,L>>=1}}else if(Ue.length>0&&Qe){Je&&ut&&t.texStorage2D(r.TEXTURE_2D,Ge,ye,Ue[0].width,Ue[0].height);for(let ie=0,L=Ue.length;ie<L;ie++)fe=Ue[ie],Je?t.texSubImage2D(r.TEXTURE_2D,ie,0,0,qe,Re,fe):t.texImage2D(r.TEXTURE_2D,ie,ye,qe,Re,fe);S.generateMipmaps=!1}else Je?(ut&&t.texStorage2D(r.TEXTURE_2D,Ge,ye,Z.width,Z.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,qe,Re,Z)):t.texImage2D(r.TEXTURE_2D,0,ye,qe,Re,Z);M(S,Qe)&&x(Q),me.__version=ee.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function xe(T,S,z){if(S.image.length!==6)return;const Q=K(T,S),J=S.source;t.bindTexture(r.TEXTURE_CUBE_MAP,T.__webglTexture,r.TEXTURE0+z);const ee=n.get(J);if(J.version!==ee.__version||Q===!0){t.activeTexture(r.TEXTURE0+z);const me=Ke.getPrimaries(Ke.workingColorSpace),oe=S.colorSpace===Kt?null:Ke.getPrimaries(S.colorSpace),de=S.colorSpace===Kt||me===oe?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const Ee=S.isCompressedTexture||S.image[0].isCompressedTexture,Oe=S.image[0]&&S.image[0].isDataTexture,Z=[];for(let ie=0;ie<6;ie++)!Ee&&!Oe?Z[ie]=_(S.image[ie],!1,!0,i.maxCubemapSize):Z[ie]=Oe?S.image[ie].image:S.image[ie],Z[ie]=ke(S,Z[ie]);const Qe=Z[0],qe=m(Qe)||o,Re=s.convert(S.format,S.colorSpace),ye=s.convert(S.type),fe=v(S.internalFormat,Re,ye,S.colorSpace),Ue=o&&S.isVideoTexture!==!0,Je=ee.__version===void 0||Q===!0;let ut=R(S,Qe,qe);G(r.TEXTURE_CUBE_MAP,S,qe);let Ge;if(Ee){Ue&&Je&&t.texStorage2D(r.TEXTURE_CUBE_MAP,ut,fe,Qe.width,Qe.height);for(let ie=0;ie<6;ie++){Ge=Z[ie].mipmaps;for(let L=0;L<Ge.length;L++){const re=Ge[L];S.format!==Yt?Re!==null?Ue?t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L,0,0,re.width,re.height,Re,re.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L,fe,re.width,re.height,0,re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ue?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L,0,0,re.width,re.height,Re,ye,re.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L,fe,re.width,re.height,0,Re,ye,re.data)}}}else{Ge=S.mipmaps,Ue&&Je&&(Ge.length>0&&ut++,t.texStorage2D(r.TEXTURE_CUBE_MAP,ut,fe,Z[0].width,Z[0].height));for(let ie=0;ie<6;ie++)if(Oe){Ue?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Z[ie].width,Z[ie].height,Re,ye,Z[ie].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,fe,Z[ie].width,Z[ie].height,0,Re,ye,Z[ie].data);for(let L=0;L<Ge.length;L++){const ae=Ge[L].image[ie].image;Ue?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L+1,0,0,ae.width,ae.height,Re,ye,ae.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L+1,fe,ae.width,ae.height,0,Re,ye,ae.data)}}else{Ue?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Re,ye,Z[ie]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,fe,Re,ye,Z[ie]);for(let L=0;L<Ge.length;L++){const re=Ge[L];Ue?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L+1,0,0,Re,ye,re.image[ie]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L+1,fe,Re,ye,re.image[ie])}}}M(S,qe)&&x(r.TEXTURE_CUBE_MAP),ee.__version=J.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function _e(T,S,z,Q,J,ee){const me=s.convert(z.format,z.colorSpace),oe=s.convert(z.type),de=v(z.internalFormat,me,oe,z.colorSpace);if(!n.get(S).__hasExternalTextures){const Oe=Math.max(1,S.width>>ee),Z=Math.max(1,S.height>>ee);J===r.TEXTURE_3D||J===r.TEXTURE_2D_ARRAY?t.texImage3D(J,ee,de,Oe,Z,S.depth,0,me,oe,null):t.texImage2D(J,ee,de,Oe,Z,0,me,oe,null)}t.bindFramebuffer(r.FRAMEBUFFER,T),pe(S)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,Q,J,n.get(z).__webglTexture,0,Ce(S)):(J===r.TEXTURE_2D||J>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,Q,J,n.get(z).__webglTexture,ee),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ie(T,S,z){if(r.bindRenderbuffer(r.RENDERBUFFER,T),S.depthBuffer&&!S.stencilBuffer){let Q=o===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(z||pe(S)){const J=S.depthTexture;J&&J.isDepthTexture&&(J.type===En?Q=r.DEPTH_COMPONENT32F:J.type===Bn&&(Q=r.DEPTH_COMPONENT24));const ee=Ce(S);pe(S)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ee,Q,S.width,S.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,ee,Q,S.width,S.height)}else r.renderbufferStorage(r.RENDERBUFFER,Q,S.width,S.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,T)}else if(S.depthBuffer&&S.stencilBuffer){const Q=Ce(S);z&&pe(S)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Q,r.DEPTH24_STENCIL8,S.width,S.height):pe(S)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Q,r.DEPTH24_STENCIL8,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,S.width,S.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,T)}else{const Q=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let J=0;J<Q.length;J++){const ee=Q[J],me=s.convert(ee.format,ee.colorSpace),oe=s.convert(ee.type),de=v(ee.internalFormat,me,oe,ee.colorSpace),Ee=Ce(S);z&&pe(S)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Ee,de,S.width,S.height):pe(S)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Ee,de,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,de,S.width,S.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ne(T,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,T),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),V(S.depthTexture,0);const Q=n.get(S.depthTexture).__webglTexture,J=Ce(S);if(S.depthTexture.format===si)pe(S)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0,J):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,Q,0);else if(S.depthTexture.format===Wi)pe(S)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0,J):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function we(T){const S=n.get(T),z=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!S.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");Ne(S.__webglFramebuffer,T)}else if(z){S.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[Q]),S.__webglDepthbuffer[Q]=r.createRenderbuffer(),Ie(S.__webglDepthbuffer[Q],T,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=r.createRenderbuffer(),Ie(S.__webglDepthbuffer,T,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function $e(T,S,z){const Q=n.get(T);S!==void 0&&_e(Q.__webglFramebuffer,T,T.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),z!==void 0&&we(T)}function k(T){const S=T.texture,z=n.get(T),Q=n.get(S);T.addEventListener("dispose",P),T.isWebGLMultipleRenderTargets!==!0&&(Q.__webglTexture===void 0&&(Q.__webglTexture=r.createTexture()),Q.__version=S.version,a.memory.textures++);const J=T.isWebGLCubeRenderTarget===!0,ee=T.isWebGLMultipleRenderTargets===!0,me=m(T)||o;if(J){z.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(o&&S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer[oe]=[];for(let de=0;de<S.mipmaps.length;de++)z.__webglFramebuffer[oe][de]=r.createFramebuffer()}else z.__webglFramebuffer[oe]=r.createFramebuffer()}else{if(o&&S.mipmaps&&S.mipmaps.length>0){z.__webglFramebuffer=[];for(let oe=0;oe<S.mipmaps.length;oe++)z.__webglFramebuffer[oe]=r.createFramebuffer()}else z.__webglFramebuffer=r.createFramebuffer();if(ee)if(i.drawBuffers){const oe=T.texture;for(let de=0,Ee=oe.length;de<Ee;de++){const Oe=n.get(oe[de]);Oe.__webglTexture===void 0&&(Oe.__webglTexture=r.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&T.samples>0&&pe(T)===!1){const oe=ee?S:[S];z.__webglMultisampledFramebuffer=r.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let de=0;de<oe.length;de++){const Ee=oe[de];z.__webglColorRenderbuffer[de]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,z.__webglColorRenderbuffer[de]);const Oe=s.convert(Ee.format,Ee.colorSpace),Z=s.convert(Ee.type),Qe=v(Ee.internalFormat,Oe,Z,Ee.colorSpace,T.isXRRenderTarget===!0),qe=Ce(T);r.renderbufferStorageMultisample(r.RENDERBUFFER,qe,Qe,T.width,T.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+de,r.RENDERBUFFER,z.__webglColorRenderbuffer[de])}r.bindRenderbuffer(r.RENDERBUFFER,null),T.depthBuffer&&(z.__webglDepthRenderbuffer=r.createRenderbuffer(),Ie(z.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(J){t.bindTexture(r.TEXTURE_CUBE_MAP,Q.__webglTexture),G(r.TEXTURE_CUBE_MAP,S,me);for(let oe=0;oe<6;oe++)if(o&&S.mipmaps&&S.mipmaps.length>0)for(let de=0;de<S.mipmaps.length;de++)_e(z.__webglFramebuffer[oe][de],T,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,de);else _e(z.__webglFramebuffer[oe],T,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);M(S,me)&&x(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ee){const oe=T.texture;for(let de=0,Ee=oe.length;de<Ee;de++){const Oe=oe[de],Z=n.get(Oe);t.bindTexture(r.TEXTURE_2D,Z.__webglTexture),G(r.TEXTURE_2D,Oe,me),_e(z.__webglFramebuffer,T,Oe,r.COLOR_ATTACHMENT0+de,r.TEXTURE_2D,0),M(Oe,me)&&x(r.TEXTURE_2D)}t.unbindTexture()}else{let oe=r.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(o?oe=T.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(oe,Q.__webglTexture),G(oe,S,me),o&&S.mipmaps&&S.mipmaps.length>0)for(let de=0;de<S.mipmaps.length;de++)_e(z.__webglFramebuffer[de],T,S,r.COLOR_ATTACHMENT0,oe,de);else _e(z.__webglFramebuffer,T,S,r.COLOR_ATTACHMENT0,oe,0);M(S,me)&&x(oe),t.unbindTexture()}T.depthBuffer&&we(T)}function Dt(T){const S=m(T)||o,z=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let Q=0,J=z.length;Q<J;Q++){const ee=z[Q];if(M(ee,S)){const me=T.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,oe=n.get(ee).__webglTexture;t.bindTexture(me,oe),x(me),t.unbindTexture()}}}function Me(T){if(o&&T.samples>0&&pe(T)===!1){const S=T.isWebGLMultipleRenderTargets?T.texture:[T.texture],z=T.width,Q=T.height;let J=r.COLOR_BUFFER_BIT;const ee=[],me=T.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,oe=n.get(T),de=T.isWebGLMultipleRenderTargets===!0;if(de)for(let Ee=0;Ee<S.length;Ee++)t.bindFramebuffer(r.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ee,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,oe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ee,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let Ee=0;Ee<S.length;Ee++){ee.push(r.COLOR_ATTACHMENT0+Ee),T.depthBuffer&&ee.push(me);const Oe=oe.__ignoreDepthValues!==void 0?oe.__ignoreDepthValues:!1;if(Oe===!1&&(T.depthBuffer&&(J|=r.DEPTH_BUFFER_BIT),T.stencilBuffer&&(J|=r.STENCIL_BUFFER_BIT)),de&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,oe.__webglColorRenderbuffer[Ee]),Oe===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[me]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[me])),de){const Z=n.get(S[Ee]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Z,0)}r.blitFramebuffer(0,0,z,Q,0,0,z,Q,J,r.NEAREST),c&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ee)}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),de)for(let Ee=0;Ee<S.length;Ee++){t.bindFramebuffer(r.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ee,r.RENDERBUFFER,oe.__webglColorRenderbuffer[Ee]);const Oe=n.get(S[Ee]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,oe.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ee,r.TEXTURE_2D,Oe,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}}function Ce(T){return Math.min(i.maxSamples,T.samples)}function pe(T){const S=n.get(T);return o&&T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ct(T){const S=a.render.frame;h.get(T)!==S&&(h.set(T,S),T.update())}function ke(T,S){const z=T.colorSpace,Q=T.format,J=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||T.format===wa||z!==bt&&z!==Kt&&(Ke.getTransfer(z)===rt?o===!1?e.has("EXT_sRGB")===!0&&Q===Yt?(T.format=wa,T.minFilter=Ht,T.generateMipmaps=!1):S=nh.sRGBToLinear(S):(Q!==Yt||J!==Wn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),S}this.allocateTextureUnit=I,this.resetTextureUnits=Y,this.setTexture2D=V,this.setTexture2DArray=j,this.setTexture3D=q,this.setTextureCube=X,this.rebindTextures=$e,this.setupRenderTarget=k,this.updateRenderTargetMipmap=Dt,this.updateMultisampleRenderTarget=Me,this.setupDepthRenderbuffer=we,this.setupFrameBufferTexture=_e,this.useMultisampledRTT=pe}function o0(r,e,t){const n=t.isWebGL2;function i(s,a=Kt){let o;const l=Ke.getTransfer(a);if(s===Wn)return r.UNSIGNED_BYTE;if(s===Wc)return r.UNSIGNED_SHORT_4_4_4_4;if(s===qc)return r.UNSIGNED_SHORT_5_5_5_1;if(s===Au)return r.BYTE;if(s===Ru)return r.SHORT;if(s===Wa)return r.UNSIGNED_SHORT;if(s===Vc)return r.INT;if(s===Bn)return r.UNSIGNED_INT;if(s===En)return r.FLOAT;if(s===dn)return n?r.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(s===Cu)return r.ALPHA;if(s===Yt)return r.RGBA;if(s===Lu)return r.LUMINANCE;if(s===Pu)return r.LUMINANCE_ALPHA;if(s===si)return r.DEPTH_COMPONENT;if(s===Wi)return r.DEPTH_STENCIL;if(s===wa)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(s===Iu)return r.RED;if(s===Xc)return r.RED_INTEGER;if(s===Du)return r.RG;if(s===jc)return r.RG_INTEGER;if(s===$c)return r.RGBA_INTEGER;if(s===Ir||s===Dr||s===Nr||s===Ur)if(l===rt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(s===Ir)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Dr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Nr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Ur)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(s===Ir)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Dr)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Nr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Ur)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Ao||s===Ro||s===Co||s===Lo)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(s===Ao)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Ro)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Co)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Lo)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Yc)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Po||s===Io)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(s===Po)return l===rt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(s===Io)return l===rt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Do||s===No||s===Uo||s===Fo||s===ko||s===Oo||s===zo||s===Bo||s===Ho||s===Go||s===Vo||s===Wo||s===qo||s===Xo)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(s===Do)return l===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===No)return l===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Uo)return l===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Fo)return l===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===ko)return l===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Oo)return l===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===zo)return l===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Bo)return l===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Ho)return l===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Go)return l===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Vo)return l===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Wo)return l===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===qo)return l===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Xo)return l===rt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Fr||s===jo||s===$o)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(s===Fr)return l===rt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===jo)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===$o)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Nu||s===Yo||s===Ko||s===Zo)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(s===Fr)return o.COMPRESSED_RED_RGTC1_EXT;if(s===Yo)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Ko)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Zo)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===ii?n?r.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class l0 extends Lt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ye extends lt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const c0={type:"move"};class aa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ye,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ye,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ye,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(c0)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ye;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class h0 extends pi{constructor(e,t){super();const n=this;let i=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const _=t.getContextAttributes();let m=null,p=null;const M=[],x=[],v=new ve;let R=null;const w=new Lt;w.layers.enable(1),w.viewport=new tt;const A=new Lt;A.layers.enable(2),A.viewport=new tt;const P=[w,A],y=new l0;y.layers.enable(1),y.layers.enable(2);let b=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let K=M[G];return K===void 0&&(K=new aa,M[G]=K),K.getTargetRaySpace()},this.getControllerGrip=function(G){let K=M[G];return K===void 0&&(K=new aa,M[G]=K),K.getGripSpace()},this.getHand=function(G){let K=M[G];return K===void 0&&(K=new aa,M[G]=K),K.getHandSpace()};function N(G){const K=x.indexOf(G.inputSource);if(K===-1)return;const ce=M[K];ce!==void 0&&(ce.update(G.inputSource,G.frame,c||a),ce.dispatchEvent({type:G.type,data:G.inputSource}))}function Y(){i.removeEventListener("select",N),i.removeEventListener("selectstart",N),i.removeEventListener("selectend",N),i.removeEventListener("squeeze",N),i.removeEventListener("squeezestart",N),i.removeEventListener("squeezeend",N),i.removeEventListener("end",Y),i.removeEventListener("inputsourceschange",I);for(let G=0;G<M.length;G++){const K=x[G];K!==null&&(x[G]=null,M[G].disconnect(K))}b=null,U=null,e.setRenderTarget(m),f=null,d=null,u=null,i=null,p=null,ne.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(v.width,v.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){s=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(G){if(i=G,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",N),i.addEventListener("selectstart",N),i.addEventListener("selectend",N),i.addEventListener("squeeze",N),i.addEventListener("squeezestart",N),i.addEventListener("squeezeend",N),i.addEventListener("end",Y),i.addEventListener("inputsourceschange",I),_.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(v),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const K={antialias:i.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,K),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new Zt(f.framebufferWidth,f.framebufferHeight,{format:Yt,type:Wn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let K=null,ce=null,xe=null;_.depth&&(xe=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,K=_.stencil?Wi:si,ce=_.stencil?ii:Bn);const _e={colorFormat:t.RGBA8,depthFormat:xe,scaleFactor:s};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(_e),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),p=new Zt(d.textureWidth,d.textureHeight,{format:Yt,type:Wn,depthTexture:new dh(d.textureWidth,d.textureHeight,ce,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Ie=e.properties.get(p);Ie.__ignoreDepthValues=d.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),ne.setContext(i),ne.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function I(G){for(let K=0;K<G.removed.length;K++){const ce=G.removed[K],xe=x.indexOf(ce);xe>=0&&(x[xe]=null,M[xe].disconnect(ce))}for(let K=0;K<G.added.length;K++){const ce=G.added[K];let xe=x.indexOf(ce);if(xe===-1){for(let Ie=0;Ie<M.length;Ie++)if(Ie>=x.length){x.push(ce),xe=Ie;break}else if(x[Ie]===null){x[Ie]=ce,xe=Ie;break}if(xe===-1)break}const _e=M[xe];_e&&_e.connect(ce)}}const F=new C,V=new C;function j(G,K,ce){F.setFromMatrixPosition(K.matrixWorld),V.setFromMatrixPosition(ce.matrixWorld);const xe=F.distanceTo(V),_e=K.projectionMatrix.elements,Ie=ce.projectionMatrix.elements,Ne=_e[14]/(_e[10]-1),we=_e[14]/(_e[10]+1),$e=(_e[9]+1)/_e[5],k=(_e[9]-1)/_e[5],Dt=(_e[8]-1)/_e[0],Me=(Ie[8]+1)/Ie[0],Ce=Ne*Dt,pe=Ne*Me,ct=xe/(-Dt+Me),ke=ct*-Dt;K.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(ke),G.translateZ(ct),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert();const T=Ne+ct,S=we+ct,z=Ce-ke,Q=pe+(xe-ke),J=$e*we/S*T,ee=k*we/S*T;G.projectionMatrix.makePerspective(z,Q,J,ee,T,S),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}function q(G,K){K===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(K.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(i===null)return;y.near=A.near=w.near=G.near,y.far=A.far=w.far=G.far,(b!==y.near||U!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),b=y.near,U=y.far);const K=G.parent,ce=y.cameras;q(y,K);for(let xe=0;xe<ce.length;xe++)q(ce[xe],K);ce.length===2?j(y,w,A):y.projectionMatrix.copy(w.projectionMatrix),X(G,y,K)};function X(G,K,ce){ce===null?G.matrix.copy(K.matrixWorld):(G.matrix.copy(ce.matrixWorld),G.matrix.invert(),G.matrix.multiply(K.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(K.projectionMatrix),G.projectionMatrixInverse.copy(K.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=Xi*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(G){l=G,d!==null&&(d.fixedFoveation=G),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=G)};let $=null;function te(G,K){if(h=K.getViewerPose(c||a),g=K,h!==null){const ce=h.views;f!==null&&(e.setRenderTargetFramebuffer(p,f.framebuffer),e.setRenderTarget(p));let xe=!1;ce.length!==y.cameras.length&&(y.cameras.length=0,xe=!0);for(let _e=0;_e<ce.length;_e++){const Ie=ce[_e];let Ne=null;if(f!==null)Ne=f.getViewport(Ie);else{const $e=u.getViewSubImage(d,Ie);Ne=$e.viewport,_e===0&&(e.setRenderTargetTextures(p,$e.colorTexture,d.ignoreDepthValues?void 0:$e.depthStencilTexture),e.setRenderTarget(p))}let we=P[_e];we===void 0&&(we=new Lt,we.layers.enable(_e),we.viewport=new tt,P[_e]=we),we.matrix.fromArray(Ie.transform.matrix),we.matrix.decompose(we.position,we.quaternion,we.scale),we.projectionMatrix.fromArray(Ie.projectionMatrix),we.projectionMatrixInverse.copy(we.projectionMatrix).invert(),we.viewport.set(Ne.x,Ne.y,Ne.width,Ne.height),_e===0&&(y.matrix.copy(we.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),xe===!0&&y.cameras.push(we)}}for(let ce=0;ce<M.length;ce++){const xe=x[ce],_e=M[ce];xe!==null&&_e!==void 0&&_e.update(xe,K,c||a)}$&&$(G,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),g=null}const ne=new uh;ne.setAnimationLoop(te),this.setAnimationLoop=function(G){$=G},this.dispose=function(){}}}function u0(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,lh(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,M,x,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),u(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p)):p.isMeshStandardMaterial?(s(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),_(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,M,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Pt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Pt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=e.get(p).envMap;if(M&&(m.envMap.value=M,m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const x=r._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*x,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=x*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Pt&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function d0(r,e,t,n){let i={},s={},a=[];const o=t.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(M,x){const v=x.program;n.uniformBlockBinding(M,v)}function c(M,x){let v=i[M.id];v===void 0&&(g(M),v=h(M),i[M.id]=v,M.addEventListener("dispose",m));const R=x.program;n.updateUBOMapping(M,R);const w=e.render.frame;s[M.id]!==w&&(d(M),s[M.id]=w)}function h(M){const x=u();M.__bindingPointIndex=x;const v=r.createBuffer(),R=M.__size,w=M.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,R,w),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,x,v),v}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const x=i[M.id],v=M.uniforms,R=M.__cache;r.bindBuffer(r.UNIFORM_BUFFER,x);for(let w=0,A=v.length;w<A;w++){const P=Array.isArray(v[w])?v[w]:[v[w]];for(let y=0,b=P.length;y<b;y++){const U=P[y];if(f(U,w,y,R)===!0){const N=U.__offset,Y=Array.isArray(U.value)?U.value:[U.value];let I=0;for(let F=0;F<Y.length;F++){const V=Y[F],j=_(V);typeof V=="number"||typeof V=="boolean"?(U.__data[0]=V,r.bufferSubData(r.UNIFORM_BUFFER,N+I,U.__data)):V.isMatrix3?(U.__data[0]=V.elements[0],U.__data[1]=V.elements[1],U.__data[2]=V.elements[2],U.__data[3]=0,U.__data[4]=V.elements[3],U.__data[5]=V.elements[4],U.__data[6]=V.elements[5],U.__data[7]=0,U.__data[8]=V.elements[6],U.__data[9]=V.elements[7],U.__data[10]=V.elements[8],U.__data[11]=0):(V.toArray(U.__data,I),I+=j.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,N,U.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(M,x,v,R){const w=M.value,A=x+"_"+v;if(R[A]===void 0)return typeof w=="number"||typeof w=="boolean"?R[A]=w:R[A]=w.clone(),!0;{const P=R[A];if(typeof w=="number"||typeof w=="boolean"){if(P!==w)return R[A]=w,!0}else if(P.equals(w)===!1)return P.copy(w),!0}return!1}function g(M){const x=M.uniforms;let v=0;const R=16;for(let A=0,P=x.length;A<P;A++){const y=Array.isArray(x[A])?x[A]:[x[A]];for(let b=0,U=y.length;b<U;b++){const N=y[b],Y=Array.isArray(N.value)?N.value:[N.value];for(let I=0,F=Y.length;I<F;I++){const V=Y[I],j=_(V),q=v%R;q!==0&&R-q<j.boundary&&(v+=R-q),N.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=v,v+=j.storage}}}const w=v%R;return w>0&&(v+=R-w),M.__size=v,M.__cache={},this}function _(M){const x={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(x.boundary=4,x.storage=4):M.isVector2?(x.boundary=8,x.storage=8):M.isVector3||M.isColor?(x.boundary=16,x.storage=12):M.isVector4?(x.boundary=16,x.storage=16):M.isMatrix3?(x.boundary=48,x.storage=48):M.isMatrix4?(x.boundary=64,x.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),x}function m(M){const x=M.target;x.removeEventListener("dispose",m);const v=a.indexOf(x.__bindingPointIndex);a.splice(v,1),r.deleteBuffer(i[x.id]),delete i[x.id],delete s[x.id]}function p(){for(const M in i)r.deleteBuffer(i[M]);a=[],i={},s={}}return{bind:l,update:c,dispose:p}}class xh{constructor(e={}){const{canvas:t=ld(),context:n=null,depth:i=!0,stencil:s=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=a;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const p=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ot,this._useLegacyLights=!1,this.toneMapping=Vn,this.toneMappingExposure=1;const x=this;let v=!1,R=0,w=0,A=null,P=-1,y=null;const b=new tt,U=new tt;let N=null;const Y=new ue(0);let I=0,F=t.width,V=t.height,j=1,q=null,X=null;const $=new tt(0,0,F,V),te=new tt(0,0,F,V);let ne=!1;const G=new Ka;let K=!1,ce=!1,xe=null;const _e=new He,Ie=new ve,Ne=new C,we={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function $e(){return A===null?j:1}let k=n;function Dt(E,D){for(let B=0;B<E.length;B++){const H=E[B],O=t.getContext(H,D);if(O!==null)return O}return null}try{const E={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ha}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",L,!1),t.addEventListener("webglcontextcreationerror",re,!1),k===null){const D=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&D.shift(),k=Dt(D,E),k===null)throw Dt(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&k instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),k.getShaderPrecisionFormat===void 0&&(k.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Me,Ce,pe,ct,ke,T,S,z,Q,J,ee,me,oe,de,Ee,Oe,Z,Qe,qe,Re,ye,fe,Ue,Je;function ut(){Me=new Sm(k),Ce=new gm(k,Me,e),Me.init(Ce),fe=new o0(k,Me,Ce),pe=new r0(k,Me,Ce),ct=new wm(k),ke=new qg,T=new a0(k,Me,pe,ke,Ce,fe,ct),S=new xm(x),z=new Mm(x),Q=new Id(k,Ce),Ue=new pm(k,Me,Q,Ce),J=new bm(k,Q,ct,Ue),ee=new Cm(k,J,Q,ct),qe=new Rm(k,Ce,T),Oe=new _m(ke),me=new Wg(x,S,z,Me,Ce,Ue,Oe),oe=new u0(x,ke),de=new jg,Ee=new Qg(Me,Ce),Qe=new fm(x,S,z,pe,ee,d,l),Z=new s0(x,ee,Ce),Je=new d0(k,ct,Ce,pe),Re=new mm(k,Me,ct,Ce),ye=new Em(k,Me,ct,Ce),ct.programs=me.programs,x.capabilities=Ce,x.extensions=Me,x.properties=ke,x.renderLists=de,x.shadowMap=Z,x.state=pe,x.info=ct}ut();const Ge=new h0(x,k);this.xr=Ge,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const E=Me.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Me.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(E){E!==void 0&&(j=E,this.setSize(F,V,!1))},this.getSize=function(E){return E.set(F,V)},this.setSize=function(E,D,B=!0){if(Ge.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=E,V=D,t.width=Math.floor(E*j),t.height=Math.floor(D*j),B===!0&&(t.style.width=E+"px",t.style.height=D+"px"),this.setViewport(0,0,E,D)},this.getDrawingBufferSize=function(E){return E.set(F*j,V*j).floor()},this.setDrawingBufferSize=function(E,D,B){F=E,V=D,j=B,t.width=Math.floor(E*B),t.height=Math.floor(D*B),this.setViewport(0,0,E,D)},this.getCurrentViewport=function(E){return E.copy(b)},this.getViewport=function(E){return E.copy($)},this.setViewport=function(E,D,B,H){E.isVector4?$.set(E.x,E.y,E.z,E.w):$.set(E,D,B,H),pe.viewport(b.copy($).multiplyScalar(j).floor())},this.getScissor=function(E){return E.copy(te)},this.setScissor=function(E,D,B,H){E.isVector4?te.set(E.x,E.y,E.z,E.w):te.set(E,D,B,H),pe.scissor(U.copy(te).multiplyScalar(j).floor())},this.getScissorTest=function(){return ne},this.setScissorTest=function(E){pe.setScissorTest(ne=E)},this.setOpaqueSort=function(E){q=E},this.setTransparentSort=function(E){X=E},this.getClearColor=function(E){return E.copy(Qe.getClearColor())},this.setClearColor=function(){Qe.setClearColor.apply(Qe,arguments)},this.getClearAlpha=function(){return Qe.getClearAlpha()},this.setClearAlpha=function(){Qe.setClearAlpha.apply(Qe,arguments)},this.clear=function(E=!0,D=!0,B=!0){let H=0;if(E){let O=!1;if(A!==null){const he=A.texture.format;O=he===$c||he===jc||he===Xc}if(O){const he=A.texture.type,ge=he===Wn||he===Bn||he===Wa||he===ii||he===Wc||he===qc,be=Qe.getClearColor(),Ae=Qe.getClearAlpha(),ze=be.r,Le=be.g,De=be.b;ge?(f[0]=ze,f[1]=Le,f[2]=De,f[3]=Ae,k.clearBufferuiv(k.COLOR,0,f)):(g[0]=ze,g[1]=Le,g[2]=De,g[3]=Ae,k.clearBufferiv(k.COLOR,0,g))}else H|=k.COLOR_BUFFER_BIT}D&&(H|=k.DEPTH_BUFFER_BIT),B&&(H|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",L,!1),t.removeEventListener("webglcontextcreationerror",re,!1),de.dispose(),Ee.dispose(),ke.dispose(),S.dispose(),z.dispose(),ee.dispose(),Ue.dispose(),Je.dispose(),me.dispose(),Ge.dispose(),Ge.removeEventListener("sessionstart",Nt),Ge.removeEventListener("sessionend",st),xe&&(xe.dispose(),xe=null),Ut.stop()};function ie(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),v=!0}function L(){console.log("THREE.WebGLRenderer: Context Restored."),v=!1;const E=ct.autoReset,D=Z.enabled,B=Z.autoUpdate,H=Z.needsUpdate,O=Z.type;ut(),ct.autoReset=E,Z.enabled=D,Z.autoUpdate=B,Z.needsUpdate=H,Z.type=O}function re(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function ae(E){const D=E.target;D.removeEventListener("dispose",ae),Te(D)}function Te(E){Se(E),ke.remove(E)}function Se(E){const D=ke.get(E).programs;D!==void 0&&(D.forEach(function(B){me.releaseProgram(B)}),E.isShaderMaterial&&me.releaseShaderCache(E))}this.renderBufferDirect=function(E,D,B,H,O,he){D===null&&(D=we);const ge=O.isMesh&&O.matrixWorld.determinant()<0,be=$h(E,D,B,H,O);pe.setMaterial(H,ge);let Ae=B.index,ze=1;if(H.wireframe===!0){if(Ae=J.getWireframeAttribute(B),Ae===void 0)return;ze=2}const Le=B.drawRange,De=B.attributes.position;let ft=Le.start*ze,Gt=(Le.start+Le.count)*ze;he!==null&&(ft=Math.max(ft,he.start*ze),Gt=Math.min(Gt,(he.start+he.count)*ze)),Ae!==null?(ft=Math.max(ft,0),Gt=Math.min(Gt,Ae.count)):De!=null&&(ft=Math.max(ft,0),Gt=Math.min(Gt,De.count));const vt=Gt-ft;if(vt<0||vt===1/0)return;Ue.setup(O,H,be,B,Ae);let mn,ht=Re;if(Ae!==null&&(mn=Q.get(Ae),ht=ye,ht.setIndex(mn)),O.isMesh)H.wireframe===!0?(pe.setLineWidth(H.wireframeLinewidth*$e()),ht.setMode(k.LINES)):ht.setMode(k.TRIANGLES);else if(O.isLine){let Ve=H.linewidth;Ve===void 0&&(Ve=1),pe.setLineWidth(Ve*$e()),O.isLineSegments?ht.setMode(k.LINES):O.isLineLoop?ht.setMode(k.LINE_LOOP):ht.setMode(k.LINE_STRIP)}else O.isPoints?ht.setMode(k.POINTS):O.isSprite&&ht.setMode(k.TRIANGLES);if(O.isBatchedMesh)ht.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else if(O.isInstancedMesh)ht.renderInstances(ft,vt,O.count);else if(B.isInstancedBufferGeometry){const Ve=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,Rr=Math.min(B.instanceCount,Ve);ht.renderInstances(ft,vt,Rr)}else ht.render(ft,vt)};function nt(E,D,B){E.transparent===!0&&E.side===Ot&&E.forceSinglePass===!1?(E.side=Pt,E.needsUpdate=!0,ws(E,D,B),E.side=An,E.needsUpdate=!0,ws(E,D,B),E.side=Ot):ws(E,D,B)}this.compile=function(E,D,B=null){B===null&&(B=E),m=Ee.get(B),m.init(),M.push(m),B.traverseVisible(function(O){O.isLight&&O.layers.test(D.layers)&&(m.pushLight(O),O.castShadow&&m.pushShadow(O))}),E!==B&&E.traverseVisible(function(O){O.isLight&&O.layers.test(D.layers)&&(m.pushLight(O),O.castShadow&&m.pushShadow(O))}),m.setupLights(x._useLegacyLights);const H=new Set;return E.traverse(function(O){const he=O.material;if(he)if(Array.isArray(he))for(let ge=0;ge<he.length;ge++){const be=he[ge];nt(be,B,O),H.add(be)}else nt(he,B,O),H.add(he)}),M.pop(),m=null,H},this.compileAsync=function(E,D,B=null){const H=this.compile(E,D,B);return new Promise(O=>{function he(){if(H.forEach(function(ge){ke.get(ge).currentProgram.isReady()&&H.delete(ge)}),H.size===0){O(E);return}setTimeout(he,10)}Me.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let it=null;function xt(E){it&&it(E)}function Nt(){Ut.stop()}function st(){Ut.start()}const Ut=new uh;Ut.setAnimationLoop(xt),typeof self<"u"&&Ut.setContext(self),this.setAnimationLoop=function(E){it=E,Ge.setAnimationLoop(E),E===null?Ut.stop():Ut.start()},Ge.addEventListener("sessionstart",Nt),Ge.addEventListener("sessionend",st),this.render=function(E,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(v===!0)return;E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Ge.enabled===!0&&Ge.isPresenting===!0&&(Ge.cameraAutoUpdate===!0&&Ge.updateCamera(D),D=Ge.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,D,A),m=Ee.get(E,M.length),m.init(),M.push(m),_e.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),G.setFromProjectionMatrix(_e),ce=this.localClippingEnabled,K=Oe.init(this.clippingPlanes,ce),_=de.get(E,p.length),_.init(),p.push(_),cn(E,D,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(q,X),this.info.render.frame++,K===!0&&Oe.beginShadows();const B=m.state.shadowsArray;if(Z.render(B,E,D),K===!0&&Oe.endShadows(),this.info.autoReset===!0&&this.info.reset(),Qe.render(_,E),m.setupLights(x._useLegacyLights),D.isArrayCamera){const H=D.cameras;for(let O=0,he=H.length;O<he;O++){const ge=H[O];mo(_,E,ge,ge.viewport)}}else mo(_,E,D);A!==null&&(T.updateMultisampleRenderTarget(A),T.updateRenderTargetMipmap(A)),E.isScene===!0&&E.onAfterRender(x,E,D),Ue.resetDefaultState(),P=-1,y=null,M.pop(),M.length>0?m=M[M.length-1]:m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function cn(E,D,B,H){if(E.visible===!1)return;if(E.layers.test(D.layers)){if(E.isGroup)B=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(D);else if(E.isLight)m.pushLight(E),E.castShadow&&m.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||G.intersectsSprite(E)){H&&Ne.setFromMatrixPosition(E.matrixWorld).applyMatrix4(_e);const ge=ee.update(E),be=E.material;be.visible&&_.push(E,ge,be,B,Ne.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||G.intersectsObject(E))){const ge=ee.update(E),be=E.material;if(H&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Ne.copy(E.boundingSphere.center)):(ge.boundingSphere===null&&ge.computeBoundingSphere(),Ne.copy(ge.boundingSphere.center)),Ne.applyMatrix4(E.matrixWorld).applyMatrix4(_e)),Array.isArray(be)){const Ae=ge.groups;for(let ze=0,Le=Ae.length;ze<Le;ze++){const De=Ae[ze],ft=be[De.materialIndex];ft&&ft.visible&&_.push(E,ge,ft,B,Ne.z,De)}}else be.visible&&_.push(E,ge,be,B,Ne.z,null)}}const he=E.children;for(let ge=0,be=he.length;ge<be;ge++)cn(he[ge],D,B,H)}function mo(E,D,B,H){const O=E.opaque,he=E.transmissive,ge=E.transparent;m.setupLightsView(B),K===!0&&Oe.setGlobalState(x.clippingPlanes,B),he.length>0&&jh(O,he,D,B),H&&pe.viewport(b.copy(H)),O.length>0&&Es(O,D,B),he.length>0&&Es(he,D,B),ge.length>0&&Es(ge,D,B),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1)}function jh(E,D,B,H){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;const he=Ce.isWebGL2;xe===null&&(xe=new Zt(1,1,{generateMipmaps:!0,type:Me.has("EXT_color_buffer_half_float")?dn:Wn,minFilter:ci,samples:he?4:0})),x.getDrawingBufferSize(Ie),he?xe.setSize(Ie.x,Ie.y):xe.setSize(pr(Ie.x),pr(Ie.y));const ge=x.getRenderTarget();x.setRenderTarget(xe),x.getClearColor(Y),I=x.getClearAlpha(),I<1&&x.setClearColor(16777215,.5),x.clear();const be=x.toneMapping;x.toneMapping=Vn,Es(E,B,H),T.updateMultisampleRenderTarget(xe),T.updateRenderTargetMipmap(xe);let Ae=!1;for(let ze=0,Le=D.length;ze<Le;ze++){const De=D[ze],ft=De.object,Gt=De.geometry,vt=De.material,mn=De.group;if(vt.side===Ot&&ft.layers.test(H.layers)){const ht=vt.side;vt.side=Pt,vt.needsUpdate=!0,go(ft,B,H,Gt,vt,mn),vt.side=ht,vt.needsUpdate=!0,Ae=!0}}Ae===!0&&(T.updateMultisampleRenderTarget(xe),T.updateRenderTargetMipmap(xe)),x.setRenderTarget(ge),x.setClearColor(Y,I),x.toneMapping=be}function Es(E,D,B){const H=D.isScene===!0?D.overrideMaterial:null;for(let O=0,he=E.length;O<he;O++){const ge=E[O],be=ge.object,Ae=ge.geometry,ze=H===null?ge.material:H,Le=ge.group;be.layers.test(B.layers)&&go(be,D,B,Ae,ze,Le)}}function go(E,D,B,H,O,he){E.onBeforeRender(x,D,B,H,O,he),E.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),O.onBeforeRender(x,D,B,H,E,he),O.transparent===!0&&O.side===Ot&&O.forceSinglePass===!1?(O.side=Pt,O.needsUpdate=!0,x.renderBufferDirect(B,D,H,O,E,he),O.side=An,O.needsUpdate=!0,x.renderBufferDirect(B,D,H,O,E,he),O.side=Ot):x.renderBufferDirect(B,D,H,O,E,he),E.onAfterRender(x,D,B,H,O,he)}function ws(E,D,B){D.isScene!==!0&&(D=we);const H=ke.get(E),O=m.state.lights,he=m.state.shadowsArray,ge=O.state.version,be=me.getParameters(E,O.state,he,D,B),Ae=me.getProgramCacheKey(be);let ze=H.programs;H.environment=E.isMeshStandardMaterial?D.environment:null,H.fog=D.fog,H.envMap=(E.isMeshStandardMaterial?z:S).get(E.envMap||H.environment),ze===void 0&&(E.addEventListener("dispose",ae),ze=new Map,H.programs=ze);let Le=ze.get(Ae);if(Le!==void 0){if(H.currentProgram===Le&&H.lightsStateVersion===ge)return xo(E,be),Le}else be.uniforms=me.getUniforms(E),E.onBuild(B,be,x),E.onBeforeCompile(be,x),Le=me.acquireProgram(be,Ae),ze.set(Ae,Le),H.uniforms=be.uniforms;const De=H.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(De.clippingPlanes=Oe.uniform),xo(E,be),H.needsLights=Kh(E),H.lightsStateVersion=ge,H.needsLights&&(De.ambientLightColor.value=O.state.ambient,De.lightProbe.value=O.state.probe,De.directionalLights.value=O.state.directional,De.directionalLightShadows.value=O.state.directionalShadow,De.spotLights.value=O.state.spot,De.spotLightShadows.value=O.state.spotShadow,De.rectAreaLights.value=O.state.rectArea,De.ltc_1.value=O.state.rectAreaLTC1,De.ltc_2.value=O.state.rectAreaLTC2,De.pointLights.value=O.state.point,De.pointLightShadows.value=O.state.pointShadow,De.hemisphereLights.value=O.state.hemi,De.directionalShadowMap.value=O.state.directionalShadowMap,De.directionalShadowMatrix.value=O.state.directionalShadowMatrix,De.spotShadowMap.value=O.state.spotShadowMap,De.spotLightMatrix.value=O.state.spotLightMatrix,De.spotLightMap.value=O.state.spotLightMap,De.pointShadowMap.value=O.state.pointShadowMap,De.pointShadowMatrix.value=O.state.pointShadowMatrix),H.currentProgram=Le,H.uniformsList=null,Le}function _o(E){if(E.uniformsList===null){const D=E.currentProgram.getUniforms();E.uniformsList=ir.seqWithValue(D.seq,E.uniforms)}return E.uniformsList}function xo(E,D){const B=ke.get(E);B.outputColorSpace=D.outputColorSpace,B.batching=D.batching,B.instancing=D.instancing,B.instancingColor=D.instancingColor,B.skinning=D.skinning,B.morphTargets=D.morphTargets,B.morphNormals=D.morphNormals,B.morphColors=D.morphColors,B.morphTargetsCount=D.morphTargetsCount,B.numClippingPlanes=D.numClippingPlanes,B.numIntersection=D.numClipIntersection,B.vertexAlphas=D.vertexAlphas,B.vertexTangents=D.vertexTangents,B.toneMapping=D.toneMapping}function $h(E,D,B,H,O){D.isScene!==!0&&(D=we),T.resetTextureUnits();const he=D.fog,ge=H.isMeshStandardMaterial?D.environment:null,be=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:bt,Ae=(H.isMeshStandardMaterial?z:S).get(H.envMap||ge),ze=H.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Le=!!B.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),De=!!B.morphAttributes.position,ft=!!B.morphAttributes.normal,Gt=!!B.morphAttributes.color;let vt=Vn;H.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(vt=x.toneMapping);const mn=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ht=mn!==void 0?mn.length:0,Ve=ke.get(H),Rr=m.state.lights;if(K===!0&&(ce===!0||E!==y)){const qt=E===y&&H.id===P;Oe.setState(H,E,qt)}let dt=!1;H.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==Rr.state.version||Ve.outputColorSpace!==be||O.isBatchedMesh&&Ve.batching===!1||!O.isBatchedMesh&&Ve.batching===!0||O.isInstancedMesh&&Ve.instancing===!1||!O.isInstancedMesh&&Ve.instancing===!0||O.isSkinnedMesh&&Ve.skinning===!1||!O.isSkinnedMesh&&Ve.skinning===!0||O.isInstancedMesh&&Ve.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Ve.instancingColor===!1&&O.instanceColor!==null||Ve.envMap!==Ae||H.fog===!0&&Ve.fog!==he||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==Oe.numPlanes||Ve.numIntersection!==Oe.numIntersection)||Ve.vertexAlphas!==ze||Ve.vertexTangents!==Le||Ve.morphTargets!==De||Ve.morphNormals!==ft||Ve.morphColors!==Gt||Ve.toneMapping!==vt||Ce.isWebGL2===!0&&Ve.morphTargetsCount!==ht)&&(dt=!0):(dt=!0,Ve.__version=H.version);let Xn=Ve.currentProgram;dt===!0&&(Xn=ws(H,D,O));let vo=!1,ss=!1,Cr=!1;const Tt=Xn.getUniforms(),jn=Ve.uniforms;if(pe.useProgram(Xn.program)&&(vo=!0,ss=!0,Cr=!0),H.id!==P&&(P=H.id,ss=!0),vo||y!==E){Tt.setValue(k,"projectionMatrix",E.projectionMatrix),Tt.setValue(k,"viewMatrix",E.matrixWorldInverse);const qt=Tt.map.cameraPosition;qt!==void 0&&qt.setValue(k,Ne.setFromMatrixPosition(E.matrixWorld)),Ce.logarithmicDepthBuffer&&Tt.setValue(k,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&Tt.setValue(k,"isOrthographic",E.isOrthographicCamera===!0),y!==E&&(y=E,ss=!0,Cr=!0)}if(O.isSkinnedMesh){Tt.setOptional(k,O,"bindMatrix"),Tt.setOptional(k,O,"bindMatrixInverse");const qt=O.skeleton;qt&&(Ce.floatVertexTextures?(qt.boneTexture===null&&qt.computeBoneTexture(),Tt.setValue(k,"boneTexture",qt.boneTexture,T)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}O.isBatchedMesh&&(Tt.setOptional(k,O,"batchingTexture"),Tt.setValue(k,"batchingTexture",O._matricesTexture,T));const Lr=B.morphAttributes;if((Lr.position!==void 0||Lr.normal!==void 0||Lr.color!==void 0&&Ce.isWebGL2===!0)&&qe.update(O,B,Xn),(ss||Ve.receiveShadow!==O.receiveShadow)&&(Ve.receiveShadow=O.receiveShadow,Tt.setValue(k,"receiveShadow",O.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(jn.envMap.value=Ae,jn.flipEnvMap.value=Ae.isCubeTexture&&Ae.isRenderTargetTexture===!1?-1:1),ss&&(Tt.setValue(k,"toneMappingExposure",x.toneMappingExposure),Ve.needsLights&&Yh(jn,Cr),he&&H.fog===!0&&oe.refreshFogUniforms(jn,he),oe.refreshMaterialUniforms(jn,H,j,V,xe),ir.upload(k,_o(Ve),jn,T)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(ir.upload(k,_o(Ve),jn,T),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&Tt.setValue(k,"center",O.center),Tt.setValue(k,"modelViewMatrix",O.modelViewMatrix),Tt.setValue(k,"normalMatrix",O.normalMatrix),Tt.setValue(k,"modelMatrix",O.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const qt=H.uniformsGroups;for(let Pr=0,Zh=qt.length;Pr<Zh;Pr++)if(Ce.isWebGL2){const yo=qt[Pr];Je.update(yo,Xn),Je.bind(yo,Xn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Xn}function Yh(E,D){E.ambientLightColor.needsUpdate=D,E.lightProbe.needsUpdate=D,E.directionalLights.needsUpdate=D,E.directionalLightShadows.needsUpdate=D,E.pointLights.needsUpdate=D,E.pointLightShadows.needsUpdate=D,E.spotLights.needsUpdate=D,E.spotLightShadows.needsUpdate=D,E.rectAreaLights.needsUpdate=D,E.hemisphereLights.needsUpdate=D}function Kh(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(E,D,B){ke.get(E.texture).__webglTexture=D,ke.get(E.depthTexture).__webglTexture=B;const H=ke.get(E);H.__hasExternalTextures=!0,H.__hasExternalTextures&&(H.__autoAllocateDepthBuffer=B===void 0,H.__autoAllocateDepthBuffer||Me.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(E,D){const B=ke.get(E);B.__webglFramebuffer=D,B.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(E,D=0,B=0){A=E,R=D,w=B;let H=!0,O=null,he=!1,ge=!1;if(E){const Ae=ke.get(E);Ae.__useDefaultFramebuffer!==void 0?(pe.bindFramebuffer(k.FRAMEBUFFER,null),H=!1):Ae.__webglFramebuffer===void 0?T.setupRenderTarget(E):Ae.__hasExternalTextures&&T.rebindTextures(E,ke.get(E.texture).__webglTexture,ke.get(E.depthTexture).__webglTexture);const ze=E.texture;(ze.isData3DTexture||ze.isDataArrayTexture||ze.isCompressedArrayTexture)&&(ge=!0);const Le=ke.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Le[D])?O=Le[D][B]:O=Le[D],he=!0):Ce.isWebGL2&&E.samples>0&&T.useMultisampledRTT(E)===!1?O=ke.get(E).__webglMultisampledFramebuffer:Array.isArray(Le)?O=Le[B]:O=Le,b.copy(E.viewport),U.copy(E.scissor),N=E.scissorTest}else b.copy($).multiplyScalar(j).floor(),U.copy(te).multiplyScalar(j).floor(),N=ne;if(pe.bindFramebuffer(k.FRAMEBUFFER,O)&&Ce.drawBuffers&&H&&pe.drawBuffers(E,O),pe.viewport(b),pe.scissor(U),pe.setScissorTest(N),he){const Ae=ke.get(E.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+D,Ae.__webglTexture,B)}else if(ge){const Ae=ke.get(E.texture),ze=D||0;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ae.__webglTexture,B||0,ze)}P=-1},this.readRenderTargetPixels=function(E,D,B,H,O,he,ge){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=ke.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ge!==void 0&&(be=be[ge]),be){pe.bindFramebuffer(k.FRAMEBUFFER,be);try{const Ae=E.texture,ze=Ae.format,Le=Ae.type;if(ze!==Yt&&fe.convert(ze)!==k.getParameter(k.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const De=Le===dn&&(Me.has("EXT_color_buffer_half_float")||Ce.isWebGL2&&Me.has("EXT_color_buffer_float"));if(Le!==Wn&&fe.convert(Le)!==k.getParameter(k.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Le===En&&(Ce.isWebGL2||Me.has("OES_texture_float")||Me.has("WEBGL_color_buffer_float")))&&!De){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=E.width-H&&B>=0&&B<=E.height-O&&k.readPixels(D,B,H,O,fe.convert(ze),fe.convert(Le),he)}finally{const Ae=A!==null?ke.get(A).__webglFramebuffer:null;pe.bindFramebuffer(k.FRAMEBUFFER,Ae)}}},this.copyFramebufferToTexture=function(E,D,B=0){const H=Math.pow(2,-B),O=Math.floor(D.image.width*H),he=Math.floor(D.image.height*H);T.setTexture2D(D,0),k.copyTexSubImage2D(k.TEXTURE_2D,B,0,0,E.x,E.y,O,he),pe.unbindTexture()},this.copyTextureToTexture=function(E,D,B,H=0){const O=D.image.width,he=D.image.height,ge=fe.convert(B.format),be=fe.convert(B.type);T.setTexture2D(B,0),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,B.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,B.unpackAlignment),D.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,H,E.x,E.y,O,he,ge,be,D.image.data):D.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,H,E.x,E.y,D.mipmaps[0].width,D.mipmaps[0].height,ge,D.mipmaps[0].data):k.texSubImage2D(k.TEXTURE_2D,H,E.x,E.y,ge,be,D.image),H===0&&B.generateMipmaps&&k.generateMipmap(k.TEXTURE_2D),pe.unbindTexture()},this.copyTextureToTexture3D=function(E,D,B,H,O=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const he=E.max.x-E.min.x+1,ge=E.max.y-E.min.y+1,be=E.max.z-E.min.z+1,Ae=fe.convert(H.format),ze=fe.convert(H.type);let Le;if(H.isData3DTexture)T.setTexture3D(H,0),Le=k.TEXTURE_3D;else if(H.isDataArrayTexture||H.isCompressedArrayTexture)T.setTexture2DArray(H,0),Le=k.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,H.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,H.unpackAlignment);const De=k.getParameter(k.UNPACK_ROW_LENGTH),ft=k.getParameter(k.UNPACK_IMAGE_HEIGHT),Gt=k.getParameter(k.UNPACK_SKIP_PIXELS),vt=k.getParameter(k.UNPACK_SKIP_ROWS),mn=k.getParameter(k.UNPACK_SKIP_IMAGES),ht=B.isCompressedTexture?B.mipmaps[O]:B.image;k.pixelStorei(k.UNPACK_ROW_LENGTH,ht.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,ht.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,E.min.x),k.pixelStorei(k.UNPACK_SKIP_ROWS,E.min.y),k.pixelStorei(k.UNPACK_SKIP_IMAGES,E.min.z),B.isDataTexture||B.isData3DTexture?k.texSubImage3D(Le,O,D.x,D.y,D.z,he,ge,be,Ae,ze,ht.data):B.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),k.compressedTexSubImage3D(Le,O,D.x,D.y,D.z,he,ge,be,Ae,ht.data)):k.texSubImage3D(Le,O,D.x,D.y,D.z,he,ge,be,Ae,ze,ht),k.pixelStorei(k.UNPACK_ROW_LENGTH,De),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,ft),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Gt),k.pixelStorei(k.UNPACK_SKIP_ROWS,vt),k.pixelStorei(k.UNPACK_SKIP_IMAGES,mn),O===0&&H.generateMipmaps&&k.generateMipmap(Le),pe.unbindTexture()},this.initTexture=function(E){E.isCubeTexture?T.setTextureCube(E,0):E.isData3DTexture?T.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?T.setTexture2DArray(E,0):T.setTexture2D(E,0),pe.unbindTexture()},this.resetState=function(){R=0,w=0,A=null,pe.reset(),Ue.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ja?"display-p3":"srgb",t.unpackColorSpace=Ke.workingColorSpace===vr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===ot?ri:Qc}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===ri?ot:bt}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class f0 extends xh{}f0.prototype.isWebGL1Renderer=!0;class Ja{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new ue(e),this.near=t,this.far=n}clone(){return new Ja(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Qa extends lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class p0{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ea,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=rn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=rn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=rn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ft=new C;class eo{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyMatrix4(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.applyNormalMatrix(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ft.fromBufferAttribute(this,t),Ft.transformDirection(e),this.setXYZ(t,Ft.x,Ft.y,Ft.z);return this}setX(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=et(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=un(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=un(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=un(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=un(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),n=et(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=et(t,this.array),n=et(n,this.array),i=et(i,this.array),s=et(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new It(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new eo(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const Ol=new C,zl=new tt,Bl=new tt,m0=new C,Hl=new He,$s=new C,oa=new fn,Gl=new He,la=new ys;class g0 extends le{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=To,this.bindMatrix=new He,this.bindMatrixInverse=new He,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new ln),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,$s),this.boundingBox.expandByPoint($s)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new fn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,$s),this.boundingSphere.expandByPoint($s)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),oa.copy(this.boundingSphere),oa.applyMatrix4(i),e.ray.intersectsSphere(oa)!==!1&&(Gl.copy(i).invert(),la.copy(e.ray).applyMatrix4(Gl),!(this.boundingBox!==null&&la.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,la)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new tt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===To?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Tu?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;zl.fromBufferAttribute(i.attributes.skinIndex,e),Bl.fromBufferAttribute(i.attributes.skinWeight,e),Ol.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const a=Bl.getComponent(s);if(a!==0){const o=zl.getComponent(s);Hl.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(m0.copy(Ol).applyMatrix4(Hl),a)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}}class vh extends lt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class _0 extends St{constructor(e=null,t=1,n=1,i,s,a,o,l,c=Mt,h=Mt,u,d){super(null,a,o,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Vl=new He,x0=new He;class to{constructor(e=[],t=[]){this.uuid=rn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new He)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new He;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){const o=e[s]?e[s].matrixWorld:x0;Vl.multiplyMatrices(o,t[s]),Vl.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new to(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new _0(t,e,e,Yt,En);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new vh),this.bones.push(a),this.boneInverses.push(new He().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class Ca extends It{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Pi=new He,Wl=new He,Ys=[],ql=new ln,v0=new He,cs=new le,hs=new fn;class yh extends le{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ca(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,v0)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ln),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Pi),ql.copy(e.boundingBox).applyMatrix4(Pi),this.boundingBox.union(ql)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new fn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Pi),hs.copy(e.boundingSphere).applyMatrix4(Pi),this.boundingSphere.union(hs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,i=this.count;if(cs.geometry=this.geometry,cs.material=this.material,cs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),hs.copy(this.boundingSphere),hs.applyMatrix4(n),e.ray.intersectsSphere(hs)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Pi),Wl.multiplyMatrices(n,Pi),cs.matrixWorld=Wl,cs.raycast(e,Ys);for(let a=0,o=Ys.length;a<o;a++){const l=Ys[a];l.instanceId=s,l.object=this,t.push(l)}Ys.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ca(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Mh extends an{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Xl=new C,jl=new C,$l=new He,ca=new ys,Ks=new fn;class no extends lt{constructor(e=new wt,t=new Mh){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Xl.fromBufferAttribute(t,i-1),jl.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Xl.distanceTo(jl);e.setAttribute("lineDistance",new at(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ks.copy(n.boundingSphere),Ks.applyMatrix4(i),Ks.radius+=s,e.ray.intersectsSphere(Ks)===!1)return;$l.copy(i).invert(),ca.copy(e.ray).applyMatrix4($l);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new C,h=new C,u=new C,d=new C,f=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){const p=Math.max(0,a.start),M=Math.min(g.count,a.start+a.count);for(let x=p,v=M-1;x<v;x+=f){const R=g.getX(x),w=g.getX(x+1);if(c.fromBufferAttribute(m,R),h.fromBufferAttribute(m,w),ca.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const P=e.ray.origin.distanceTo(d);P<e.near||P>e.far||t.push({distance:P,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,a.start),M=Math.min(m.count,a.start+a.count);for(let x=p,v=M-1;x<v;x+=f){if(c.fromBufferAttribute(m,x),h.fromBufferAttribute(m,x+1),ca.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const w=e.ray.origin.distanceTo(d);w<e.near||w>e.far||t.push({distance:w,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}const Yl=new C,Kl=new C;class y0 extends no{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Yl.fromBufferAttribute(t,i),Kl.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Yl.distanceTo(Kl);e.setAttribute("lineDistance",new at(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class M0 extends no{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class io extends an{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ue(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Zl=new He,La=new ys,Zs=new fn,Js=new C;class Sh extends lt{constructor(e=new wt,t=new io){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Zs.copy(n.boundingSphere),Zs.applyMatrix4(i),Zs.radius+=s,e.ray.intersectsSphere(Zs)===!1)return;Zl.copy(i).invert(),La.copy(e.ray).applyMatrix4(Zl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=d,_=f;g<_;g++){const m=c.getX(g);Js.fromBufferAttribute(u,m),Jl(Js,m,l,i,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,_=f;g<_;g++)Js.fromBufferAttribute(u,g),Jl(Js,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Jl(r,e,t,n,i,s,a){const o=La.distanceSqToPoint(r);if(o<t){const l=new C;La.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class Ql extends St{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Et extends wt{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;M(),a===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new at(u,3)),this.setAttribute("normal",new at(d,3)),this.setAttribute("uv",new at(f,2));function M(){const v=new C,R=new C;let w=0;const A=(t-e)/n;for(let P=0;P<=s;P++){const y=[],b=P/s,U=b*(t-e)+e;for(let N=0;N<=i;N++){const Y=N/i,I=Y*l+o,F=Math.sin(I),V=Math.cos(I);R.x=U*F,R.y=-b*n+m,R.z=U*V,u.push(R.x,R.y,R.z),v.set(F,A,V).normalize(),d.push(v.x,v.y,v.z),f.push(Y,1-b),y.push(g++)}_.push(y)}for(let P=0;P<i;P++)for(let y=0;y<s;y++){const b=_[y][P],U=_[y+1][P],N=_[y+1][P+1],Y=_[y][P+1];h.push(b,U,Y),h.push(U,N,Y),w+=6}c.addGroup(p,w,0),p+=w}function x(v){const R=g,w=new ve,A=new C;let P=0;const y=v===!0?e:t,b=v===!0?1:-1;for(let N=1;N<=i;N++)u.push(0,m*b,0),d.push(0,b,0),f.push(.5,.5),g++;const U=g;for(let N=0;N<=i;N++){const I=N/i*l+o,F=Math.cos(I),V=Math.sin(I);A.x=y*V,A.y=m*b,A.z=y*F,u.push(A.x,A.y,A.z),d.push(0,b,0),w.x=F*.5+.5,w.y=V*.5*b+.5,f.push(w.x,w.y),g++}for(let N=0;N<i;N++){const Y=R+N,I=U+N;v===!0?h.push(I,I+1,Y):h.push(I+1,I,Y),P+=3}c.addGroup(p,P,v===!0?1:2),p+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Et(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Hn extends Et{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Hn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ss extends wt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],a=[];o(i),c(n),h(),this.setAttribute("position",new at(s,3)),this.setAttribute("normal",new at(s.slice(),3)),this.setAttribute("uv",new at(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const x=new C,v=new C,R=new C;for(let w=0;w<t.length;w+=3)f(t[w+0],x),f(t[w+1],v),f(t[w+2],R),l(x,v,R,M)}function l(M,x,v,R){const w=R+1,A=[];for(let P=0;P<=w;P++){A[P]=[];const y=M.clone().lerp(v,P/w),b=x.clone().lerp(v,P/w),U=w-P;for(let N=0;N<=U;N++)N===0&&P===w?A[P][N]=y:A[P][N]=y.clone().lerp(b,N/U)}for(let P=0;P<w;P++)for(let y=0;y<2*(w-P)-1;y++){const b=Math.floor(y/2);y%2===0?(d(A[P][b+1]),d(A[P+1][b]),d(A[P][b])):(d(A[P][b+1]),d(A[P+1][b+1]),d(A[P+1][b]))}}function c(M){const x=new C;for(let v=0;v<s.length;v+=3)x.x=s[v+0],x.y=s[v+1],x.z=s[v+2],x.normalize().multiplyScalar(M),s[v+0]=x.x,s[v+1]=x.y,s[v+2]=x.z}function h(){const M=new C;for(let x=0;x<s.length;x+=3){M.x=s[x+0],M.y=s[x+1],M.z=s[x+2];const v=m(M)/2/Math.PI+.5,R=p(M)/Math.PI+.5;a.push(v,1-R)}g(),u()}function u(){for(let M=0;M<a.length;M+=6){const x=a[M+0],v=a[M+2],R=a[M+4],w=Math.max(x,v,R),A=Math.min(x,v,R);w>.9&&A<.1&&(x<.2&&(a[M+0]+=1),v<.2&&(a[M+2]+=1),R<.2&&(a[M+4]+=1))}}function d(M){s.push(M.x,M.y,M.z)}function f(M,x){const v=M*3;x.x=e[v+0],x.y=e[v+1],x.z=e[v+2]}function g(){const M=new C,x=new C,v=new C,R=new C,w=new ve,A=new ve,P=new ve;for(let y=0,b=0;y<s.length;y+=9,b+=6){M.set(s[y+0],s[y+1],s[y+2]),x.set(s[y+3],s[y+4],s[y+5]),v.set(s[y+6],s[y+7],s[y+8]),w.set(a[b+0],a[b+1]),A.set(a[b+2],a[b+3]),P.set(a[b+4],a[b+5]),R.copy(M).add(x).add(v).divideScalar(3);const U=m(R);_(w,b+0,M,U),_(A,b+2,x,U),_(P,b+4,v,U)}}function _(M,x,v,R){R<0&&M.x===1&&(a[x]=M.x-1),v.x===0&&v.z===0&&(a[x]=R/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ss(e.vertices,e.indices,e.radius,e.details)}}class br extends Ss{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new br(e.radius,e.detail)}}class bn extends Ss{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new bn(e.radius,e.detail)}}class so extends Ss{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new so(e.radius,e.detail)}}class ai extends wt{constructor(e=.5,t=1,n=32,i=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],h=[];let u=e;const d=(t-e)/i,f=new C,g=new ve;for(let _=0;_<=i;_++){for(let m=0;m<=n;m++){const p=s+m/n*a;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let _=0;_<i;_++){const m=_*(n+1);for(let p=0;p<n;p++){const M=p+m,x=M,v=M+n+1,R=M+n+2,w=M+1;o.push(x,v,w),o.push(v,R,w)}}this.setIndex(o),this.setAttribute("position",new at(l,3)),this.setAttribute("normal",new at(c,3)),this.setAttribute("uv",new at(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ai(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class mt extends wt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new C,d=new C,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const M=[],x=p/n;let v=0;p===0&&a===0?v=.5/t:p===n&&l===Math.PI&&(v=-.5/t);for(let R=0;R<=t;R++){const w=R/t;u.x=-e*Math.cos(i+w*s)*Math.sin(a+x*o),u.y=e*Math.cos(a+x*o),u.z=e*Math.sin(i+w*s)*Math.sin(a+x*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(w+v,1-x),M.push(c++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<t;M++){const x=h[p][M+1],v=h[p][M],R=h[p+1][M],w=h[p+1][M+1];(p!==0||a>0)&&f.push(x,v,w),(p!==n-1||l<Math.PI)&&f.push(v,R,w)}this.setIndex(f),this.setAttribute("position",new at(g,3)),this.setAttribute("normal",new at(_,3)),this.setAttribute("uv",new at(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ro extends wt{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],l=[],c=[],h=new C,u=new C,d=new C;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){const _=g/i*s,m=f/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(_),u.y=(e+t*Math.cos(m))*Math.sin(_),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){const _=(i+1)*f+g-1,m=(i+1)*(f-1)+g-1,p=(i+1)*(f-1)+g,M=(i+1)*f+g;a.push(_,m,M),a.push(m,p,M)}this.setIndex(a),this.setAttribute("position",new at(o,3)),this.setAttribute("normal",new at(l,3)),this.setAttribute("uv",new at(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ro(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class S0 extends Bt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class hi extends an{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xa,this.normalScale=new ve(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Rn extends hi{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ve(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ct(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ue(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ue(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ue(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class b0 extends an{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xa,this.normalScale=new ve(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ga,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function Qs(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function E0(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function w0(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function ec(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){const o=t[s]*e;for(let l=0;l!==e;++l)i[a++]=r[o+l]}return i}function bh(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push.apply(t,a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}class bs{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=s)){const o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}a=n,n=0;break n}break e}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class T0 extends bs{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Di,endingEnd:Di}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,a=e+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ni:s=e,o=2*t-n;break;case cr:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ni:a=e,l=2*n-t;break;case cr:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,M=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,x=(-1-f)*m+(1.5+f)*_+.5*g,v=f*m-f*_;for(let R=0;R!==o;++R)s[R]=p*a[h+R]+M*a[c+R]+x*a[l+R]+v*a[u+R];return s}}class Eh extends bs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[c+d]*u+a[l+d]*h;return s}}class A0 extends bs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class pn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Qs(t,this.TimeBufferType),this.values=Qs(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Qs(e.times,Array),values:Qs(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new A0(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Eh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new T0(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case xs:t=this.InterpolantFactoryMethodDiscrete;break;case qi:t=this.InterpolantFactoryMethodLinear;break;case kr:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return xs;case this.InterpolantFactoryMethodLinear:return qi;case this.InterpolantFactoryMethodSmooth:return kr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&E0(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===kr,s=e.length-1;let a=1;for(let o=1;o<s;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(i)l=!0;else{const u=o*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}pn.prototype.TimeBufferType=Float32Array;pn.prototype.ValueBufferType=Float32Array;pn.prototype.DefaultInterpolation=qi;class es extends pn{}es.prototype.ValueTypeName="bool";es.prototype.ValueBufferType=Array;es.prototype.DefaultInterpolation=xs;es.prototype.InterpolantFactoryMethodLinear=void 0;es.prototype.InterpolantFactoryMethodSmooth=void 0;class wh extends pn{}wh.prototype.ValueTypeName="color";class Yi extends pn{}Yi.prototype.ValueTypeName="number";class R0 extends bs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t);let c=e*o;for(let h=c+o;c!==h;c+=4)Jt.slerpFlat(s,0,a,c-o,a,c,l);return s}}class ui extends pn{InterpolantFactoryMethodLinear(e){return new R0(this.times,this.values,this.getValueSize(),e)}}ui.prototype.ValueTypeName="quaternion";ui.prototype.DefaultInterpolation=qi;ui.prototype.InterpolantFactoryMethodSmooth=void 0;class ts extends pn{}ts.prototype.ValueTypeName="string";ts.prototype.ValueBufferType=Array;ts.prototype.DefaultInterpolation=xs;ts.prototype.InterpolantFactoryMethodLinear=void 0;ts.prototype.InterpolantFactoryMethodSmooth=void 0;class Ki extends pn{}Ki.prototype.ValueTypeName="vector";class Pa{constructor(e,t=-1,n,i=qa){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=rn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(L0(n[a]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,a=n.length;s!==a;++s)t.push(pn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);const h=w0(l);l=ec(l,1,h),c=ec(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),a.push(new Yi(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,g,_){if(f.length!==0){const m=[],p=[];bh(f,m,p,g),m.length!==0&&_.push(new u(d,m,p))}},i=[],s=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(const _ in f){const m=[],p=[];for(let M=0;M!==d[g].morphTargets.length;++M){const x=d[g];m.push(x.time),p.push(x.morphTarget===_?1:0)}i.push(new Yi(".morphTargetInfluence["+_+"]",m,p))}l=f.length*a}else{const f=".bones["+t[u].name+"]";n(Ki,f+".position",d,"pos",i),n(ui,f+".quaternion",d,"rot",i),n(Ki,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function C0(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Yi;case"vector":case"vector2":case"vector3":case"vector4":return Ki;case"color":return wh;case"quaternion":return ui;case"bool":case"boolean":return es;case"string":return ts}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function L0(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=C0(r.type);if(r.times===void 0){const t=[],n=[];bh(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const Gn={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class P0{constructor(e,t,n){const i=this;let s=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,s===!1&&i.onStart!==void 0&&i.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const I0=new P0;class ns{constructor(e){this.manager=e!==void 0?e:I0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}ns.DEFAULT_MATERIAL_NAME="__DEFAULT";const Mn={};class D0 extends Error{constructor(e,t){super(e),this.response=t}}class Th extends ns{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Gn.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(Mn[e]!==void 0){Mn[e].push({onLoad:t,onProgress:n,onError:i});return}Mn[e]=[],Mn[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=Mn[e],u=c.body.getReader(),d=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),f=d?parseInt(d):0,g=f!==0;let _=0;const m=new ReadableStream({start(p){M();function M(){u.read().then(({done:x,value:v})=>{if(x)p.close();else{_+=v.byteLength;const R=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let w=0,A=h.length;w<A;w++){const P=h[w];P.onProgress&&P.onProgress(R)}p.enqueue(v),M()}})}}});return new Response(m)}else throw new D0(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{Gn.add(e,c);const h=Mn[e];delete Mn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=Mn[e];if(h===void 0)throw this.manager.itemError(e),c;delete Mn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class N0 extends ns{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Gn.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a;const o=vs("img");function l(){h(),Gn.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(u){h(),i&&i(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}}class Ah extends ns{constructor(e){super(e)}load(e,t,n,i){const s=new St,a=new N0(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Er extends lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ue(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class U0 extends Er{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(lt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ue(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const ha=new He,tc=new C,nc=new C;class ao{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ve(512,512),this.map=null,this.mapPass=null,this.matrix=new He,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ka,this._frameExtents=new ve(1,1),this._viewportCount=1,this._viewports=[new tt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;tc.setFromMatrixPosition(e.matrixWorld),t.position.copy(tc),nc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(nc),t.updateMatrixWorld(),ha.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ha),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ha)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class F0 extends ao{constructor(){super(new Lt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Xi*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class k0 extends Er{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(lt.DEFAULT_UP),this.updateMatrix(),this.target=new lt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new F0}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const ic=new He,us=new C,ua=new C;class O0 extends ao{constructor(){super(new Lt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ve(4,2),this._viewportCount=6,this._viewports=[new tt(2,1,1,1),new tt(0,1,1,1),new tt(3,1,1,1),new tt(1,1,1,1),new tt(3,0,1,1),new tt(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),us.setFromMatrixPosition(e.matrixWorld),n.position.copy(us),ua.copy(n.position),ua.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(ua),n.updateMatrixWorld(),i.makeTranslation(-us.x,-us.y,-us.z),ic.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ic)}}class Rh extends Er{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new O0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class z0 extends ao{constructor(){super(new Mr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ch extends Er{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(lt.DEFAULT_UP),this.updateMatrix(),this.target=new lt,this.shadow=new z0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class _s{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class B0 extends ns{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Gn.get(e);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(c=>{t&&t(c),s.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return Gn.add(e,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Gn.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});Gn.add(e,l),s.manager.itemStart(e)}}class H0{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=sc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=sc();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function sc(){return(typeof performance>"u"?Date:performance).now()}class G0{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,a;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[s+o]=n[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(n,s,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,a=i;s!==a;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let a=0;a!==s;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){Jt.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const a=this._workIndex*s;Jt.multiplyQuaternionsFlat(e,a,e,t,e,n),Jt.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,s){const a=1-i;for(let o=0;o!==s;++o){const l=t+o;e[l]=e[l]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,s){for(let a=0;a!==s;++a){const o=t+a;e[o]=e[o]+e[n+a]*i}}}const oo="\\[\\]\\.:\\/",V0=new RegExp("["+oo+"]","g"),lo="[^"+oo+"]",W0="[^"+oo.replace("\\.","")+"]",q0=/((?:WC+[\/:])*)/.source.replace("WC",lo),X0=/(WCOD+)?/.source.replace("WCOD",W0),j0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",lo),$0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",lo),Y0=new RegExp("^"+q0+X0+j0+$0+"$"),K0=["material","materials","bones","map"];class Z0{constructor(e,t,n){const i=n||Ze.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Ze{constructor(e,t,n){this.path=t,this.parsedPath=n||Ze.parseTrackName(t),this.node=Ze.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Ze.Composite(e,t,n):new Ze(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(V0,"")}static parseTrackName(e){const t=Y0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);K0.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Ze.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[i];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Ze.Composite=Z0;Ze.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ze.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ze.prototype.GetterByBindingType=[Ze.prototype._getValue_direct,Ze.prototype._getValue_array,Ze.prototype._getValue_arrayElement,Ze.prototype._getValue_toArray];Ze.prototype.SetterByBindingTypeAndVersioning=[[Ze.prototype._setValue_direct,Ze.prototype._setValue_direct_setNeedsUpdate,Ze.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ze.prototype._setValue_array,Ze.prototype._setValue_array_setNeedsUpdate,Ze.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ze.prototype._setValue_arrayElement,Ze.prototype._setValue_arrayElement_setNeedsUpdate,Ze.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ze.prototype._setValue_fromArray,Ze.prototype._setValue_fromArray_setNeedsUpdate,Ze.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class J0{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,a=s.length,o=new Array(a),l={endingStart:Di,endingEnd:Di};for(let c=0;c!==a;++c){const h=s[c].createInterpolant(null);o[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Zc,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,s=e._clip.duration,a=s/i,o=i/s;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Fu:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulateAdditive(o);break;case qa:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const a=n===Uu;if(e===0)return s===-1?i:a&&(s&1)===1?t-i:i;if(n===Kc){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){const o=Math.floor(i/t);i-=t*o,s+=Math.abs(o);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=i;if(a&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=Ni,i.endingEnd=Ni):(e?i.endingStart=this.zeroSlopeAtStart?Ni:Di:i.endingStart=cr,t?i.endingEnd=this.zeroSlopeAtEnd?Ni:Di:i.endingEnd=cr)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,l=a.sampleValues;return o[0]=s,l[0]=t,o[1]=s+e,l[1]=n,this}}const Q0=new Float32Array(1);class e_ extends pi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==s;++u){const d=i[u],f=d.name;let g=h[f];if(g!==void 0)++g.referenceCount,a[u]=g;else{if(g=a[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,f));continue}const _=t&&t._propertyBindings[u].binding.parsedPath;g=new G0(Ze.create(n,f,_),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,f),a[u]=g}o[u].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let a=s[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,a=this._actionsByClip,o=a[s],l=o.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const u=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete a[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,a=this._bindingsByRootAndName,o=a[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[s],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Eh(new Float32Array(2),new Float32Array(2),1,Q0),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let a=typeof e=="string"?Pa.findByName(i,e):e;const o=a!==null?a.uuid:e,l=this._actionsByClip[o];let c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=qa),l!==void 0){const u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;const h=new J0(this,a,t,n);return this._bindAction(h,c),this._addInactiveAction(h,o,s),h}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?Pa.findByName(n,e):e,a=s?s.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,s,a);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const a=s.knownActions;for(let o=0,l=a.length;o!==l;++o){const c=a[o];this._deactivateAction(c);const h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const a in s){const o=s[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class t_{constructor(e,t,n=0,i=1/0){this.ray=new ys(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Ya,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return Ia(e,this,n,t),n.sort(rc),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)Ia(e[i],this,n,t);return n.sort(rc),n}}function rc(r,e){return r.distance-e.distance}function Ia(r,e,t,n){if(r.layers.test(e.layers)&&r.raycast(e,t),n===!0){const i=r.children;for(let s=0,a=i.length;s<a;s++)Ia(i[s],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ha}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ha);const W={meta:{title:"HERO X",subtitle:"모험의 던전",version:"1.1.0-b.1"},controls:{up:["KeyW","ArrowUp"],down:["KeyS","ArrowDown"],left:["KeyA","ArrowLeft"],right:["KeyD","ArrowRight"],attackMelee:["Mouse0","KeyJ"],attackRanged:["Mouse2","KeyK"],jump:["Space"],dodge:["ShiftLeft","ShiftRight","KeyL"],restart:["KeyR"],toggleGuide:["KeyH"],toggleInventory:["KeyI","Tab"],interact:["KeyE","KeyF"]},player:{maxHp:100,invulnerableTime:.6,hitKnockback:6,moveSpeed:7,attackMoveFactor:.6,dash:{speed:20,duration:.22,cooldown:.9,invulnerable:!0},jumpSpeed:8,gravity:24,turnSpeed:14,radius:.5,startPosition:{x:0,z:0},colors:{body:"#2f6df6",accent:"#ffc531",skin:"#f3c6a0",visor:"#5cf2d8"}},combat:{autoAimRange:14,melee:{damage:12,range:1.9,arcDegrees:110,cooldown:.45,knockback:7,swingTime:.22},ranged:{damage:8,speed:22,cooldown:.5,lifetime:1.6,radius:.18,knockback:3}},enemies:{types:{rusher:{name:"돌진 로봇",hp:30,speed:4.2,radius:.55,damage:10,attackRange:1.5,attackWindup:.35,attackCooldown:1.3,aggroRange:20,color:"#ff7a45",score:10},shooter:{name:"포격 드론",hp:20,speed:3.2,radius:.5,damage:8,attackRange:9,attackWindup:.5,attackCooldown:2.2,aggroRange:22,color:"#b06bff",score:15,attackKind:"ranged",retreatRange:4.5,projectileSpeed:11},tank:{name:"철벽 로봇",hp:90,speed:1.9,radius:.9,damage:18,attackRange:2,attackWindup:.6,attackCooldown:2,aggroRange:16,color:"#5b7bd6",score:30,knockbackResist:.25},stalker:{name:"박쥐 드론",hp:18,speed:7.5,radius:.45,damage:7,attackRange:1.3,attackWindup:.25,attackCooldown:.9,aggroRange:16,color:"#8e6cff",score:14,attackKind:"melee",model:"shooter"},artillery:{name:"요새 포대",hp:70,speed:1.6,radius:.8,damage:16,attackRange:13,attackWindup:.9,attackCooldown:2.2,aggroRange:18,color:"#c0392b",score:40,attackKind:"ranged",retreatRange:5,projectileSpeed:12,knockbackResist:.4,model:"tank"}},spawns:[{type:"rusher",x:12,z:-12},{type:"rusher",x:-14,z:-6},{type:"rusher",x:16,z:6},{type:"rusher",x:-10,z:16},{type:"rusher",x:4,z:20},{type:"rusher",x:-20,z:-18},{type:"shooter",x:18,z:-2},{type:"shooter",x:-6,z:-22},{type:"shooter",x:20,z:18},{type:"tank",x:-22,z:12},{type:"tank",x:10,z:-22}],separation:2.5,deathDuration:.6},camera:{fov:50,offset:{x:0,y:13,z:11},lookAtHeight:1,smoothing:6,near:.1,far:300},world:{arenaHalfSize:28,floorColor:"#79b85a",floorAltColor:"#6fae50",wallHeight:1.2,wallColor:"#a6773f",backgroundColor:"#8ec9ff",fogNear:40,fogFar:90,obstacles:[{x:6,z:-4,w:2,d:2,h:2,color:"#d9a066"},{x:8.2,z:-4,w:2,d:2,h:2,color:"#d9a066"},{x:7,z:-6.2,w:2,d:2,h:1.4,color:"#e0ad6c"},{x:-8,z:-8,w:1.2,d:1.2,h:4,color:"#9aa3b2"},{x:-8,z:8,w:1.2,d:1.2,h:4,color:"#9aa3b2"},{x:8,z:8,w:1.2,d:1.2,h:4,color:"#9aa3b2"},{x:0,z:-14,w:10,d:1,h:1.6,color:"#a6773f"},{x:-16,z:2,w:1,d:8,h:1.6,color:"#a6773f"},{x:14,z:14,w:3,d:3,h:2.5,color:"#7f8795"},{x:-14,z:-16,w:2.5,d:2.5,h:2,color:"#7f8795"}]},graphics:{shadows:!0,maxPixelRatio:2,antialias:!0,shadowMapSize:2048,bloom:{strength:.42,radius:.35,threshold:.85}},difficulty:{default:"normal",presets:{easy:{label:"쉬움",enemyHp:.8,enemyDamage:.7,enemySpeed:.9},normal:{label:"보통",enemyHp:1.15,enemyDamage:1.1,enemySpeed:1},hard:{label:"어려움",enemyHp:1.6,enemyDamage:1.6,enemySpeed:1.15}}},loot:{healChance:.25,healAmount:25,goldChance:.6,goldMin:3,goldMax:12,xpPerScore:1,lifetime:20,magnetRange:3.5,magnetSpeed:6,pickupRadius:.9},dungeon:{name:"잊혀진 숲",chests:[{x:-22,z:-4},{x:12,z:2},{x:-4,z:24}],chestLoot:{goldMin:15,goldMax:40,equipChance:.8,healChance:.5,interactRange:2.2}},boss:{name:"숲의 수호 로봇",hp:420,speed:2.8,radius:1.6,color:"#3f8f5f",score:300,knockbackResist:.1,spawn:{x:0,z:-20},contactDamage:22,engageRange:11,chargeMinRange:5,windup:{charge:.8,slam:.7,barrage:.6,summon:.9,mortar:.8},closePatterns:["slam","barrage"],useCharge:!0,model:"guardian",chargeDuration:.55,recover:.7,cooldown:1.3,phase2Ratio:.5,phase2TimeMul:.7,phase2SpeedMul:1.3,charge:{speed:18},slam:{radius:4.5,damage:26},barrage:{count:8,phase2Count:12,damage:10,speed:9},summon:{type:"stalker",count:2,phase2Count:3,maxAlive:4},mortar:{count:3,phase2Count:5,delay:1.1,radius:2.4,damage:18,spread:3.5},reward:{goldMin:80,goldMax:150,xp:120,equipMinRarity:"rare"}},equipment:{dropChance:.3,inventorySize:20,defenseScale:50,rarities:{common:{label:"일반",prefix:"",statMul:1,weight:55,color:"#cdd6f4"},uncommon:{label:"고급",prefix:"튼튼한",statMul:1.3,weight:25,color:"#7dffb0"},rare:{label:"희귀",prefix:"희귀한",statMul:1.7,weight:13,color:"#5b8dff"},epic:{label:"영웅",prefix:"영웅의",statMul:2.2,weight:5,color:"#c77dff"},legendary:{label:"전설",prefix:"전설의",statMul:3,weight:2,color:"#ffc531"}}},progression:{xpBase:40,xpGrowth:1.35,hpPerLevel:10,damagePerLevel:.08,maxLevel:30,levelUpHealRatio:.5},hud:{showDamageNumbers:!0},juice:{hitShake:{amp:.25,duration:.25},slamShake:{amp:.5,duration:.4},hitStop:{duration:.06,timeScale:.1},bossHitStop:.35},performance:{autoQualityInterval:6,autoQualityFps:30,maxStep:.05},save:{autoSaveInterval:3},debug:{showFps:!0}},n_={"player.maxHp":{min:1,max:9999},"player.invulnerableTime":{min:0,max:5},"player.hitKnockback":{min:0,max:50},"player.moveSpeed":{min:1,max:30},"player.attackMoveFactor":{min:0,max:1},"player.jumpSpeed":{min:1,max:30},"player.gravity":{min:1,max:100},"player.dash.speed":{min:1,max:60},"player.dash.duration":{min:.05,max:2},"player.dash.cooldown":{min:0,max:10},"combat.autoAimRange":{min:2,max:60},"boss.summon.count":{min:0,max:10},"boss.summon.maxAlive":{min:0,max:20},"boss.mortar.count":{min:0,max:20},"boss.mortar.delay":{min:.3,max:5},"boss.mortar.radius":{min:.5,max:10},"boss.mortar.damage":{min:0,max:999},"combat.ranged.damage":{min:1,max:9999},"combat.ranged.speed":{min:1,max:100},"combat.ranged.cooldown":{min:.05,max:5},"combat.ranged.lifetime":{min:.1,max:10},"combat.ranged.radius":{min:.05,max:2},"combat.ranged.knockback":{min:0,max:50},"player.turnSpeed":{min:1,max:40},"player.radius":{min:.2,max:2},"combat.melee.damage":{min:1,max:9999},"combat.melee.range":{min:.5,max:10},"combat.melee.arcDegrees":{min:10,max:360},"combat.melee.cooldown":{min:.05,max:5},"combat.melee.knockback":{min:0,max:50},"combat.melee.swingTime":{min:.05,max:2},"enemies.separation":{min:0,max:20},"loot.healChance":{min:0,max:1},"loot.healAmount":{min:1,max:9999},"loot.goldChance":{min:0,max:1},"loot.goldMin":{min:0,max:99999},"loot.goldMax":{min:0,max:99999},"loot.xpPerScore":{min:.1,max:100},"loot.lifetime":{min:1,max:600},"loot.magnetRange":{min:0,max:30},"loot.magnetSpeed":{min:0,max:50},"loot.pickupRadius":{min:.2,max:5},"dungeon.chestLoot.goldMin":{min:0,max:99999},"dungeon.chestLoot.goldMax":{min:0,max:99999},"dungeon.chestLoot.equipChance":{min:0,max:1},"dungeon.chestLoot.healChance":{min:0,max:1},"dungeon.chestLoot.interactRange":{min:.5,max:10},"boss.hp":{min:1,max:99999},"boss.speed":{min:0,max:30},"boss.radius":{min:.5,max:6},"boss.contactDamage":{min:0,max:9999},"boss.engageRange":{min:1,max:60},"boss.chargeMinRange":{min:0,max:60},"boss.chargeDuration":{min:.1,max:5},"boss.recover":{min:0,max:5},"boss.cooldown":{min:0,max:10},"boss.phase2Ratio":{min:0,max:1},"boss.phase2TimeMul":{min:.2,max:1},"boss.phase2SpeedMul":{min:1,max:3},"boss.charge.speed":{min:1,max:60},"boss.slam.radius":{min:.5,max:30},"boss.slam.damage":{min:0,max:9999},"boss.barrage.count":{min:1,max:64},"boss.barrage.phase2Count":{min:1,max:64},"boss.barrage.damage":{min:0,max:9999},"boss.barrage.speed":{min:1,max:60},"equipment.dropChance":{min:0,max:1},"equipment.inventorySize":{min:1,max:200},"equipment.defenseScale":{min:1,max:1e3},"progression.xpBase":{min:1,max:99999},"progression.xpGrowth":{min:1,max:3},"progression.hpPerLevel":{min:0,max:1e3},"progression.damagePerLevel":{min:0,max:1},"progression.maxLevel":{min:1,max:999},"save.autoSaveInterval":{min:.5,max:600},"performance.autoQualityInterval":{min:2,max:60},"performance.autoQualityFps":{min:10,max:60},"performance.maxStep":{min:.01,max:.1},"juice.hitShake.amp":{min:0,max:2},"juice.slamShake.amp":{min:0,max:3},"juice.hitStop.duration":{min:0,max:.5},"juice.hitStop.timeScale":{min:0,max:1},"juice.bossHitStop":{min:0,max:2},"progression.levelUpHealRatio":{min:0,max:1},"enemies.deathDuration":{min:0,max:5},"camera.fov":{min:30,max:90},"camera.offset.y":{min:3,max:40},"camera.offset.z":{min:0,max:40},"camera.smoothing":{min:.5,max:30},"world.arenaHalfSize":{min:10,max:200},"graphics.maxPixelRatio":{min:1,max:3},"graphics.bloom.strength":{min:0,max:3},"graphics.bloom.radius":{min:0,max:1},"graphics.bloom.threshold":{min:0,max:2}},i_={hp:{min:1,max:99999},speed:{min:0,max:30},radius:{min:.2,max:5},damage:{min:0,max:9999},attackRange:{min:.3,max:30},attackWindup:{min:0,max:5},attackCooldown:{min:.1,max:20},aggroRange:{min:1,max:200},score:{min:0,max:99999}},da=(r,e,t)=>typeof r=="number"&&!Number.isNaN(r)?Math.min(t,Math.max(e,r)):e;function s_(r){const e=[];for(const[t,{min:n,max:i}]of Object.entries(n_)){const s=t.split(".");let a=r;for(let h=0;h<s.length-1;h++)a=a?.[s[h]];const o=s[s.length-1];if(!a||typeof a!="object")continue;const l=a[o],c=da(l,n,i);c!==l&&(a[o]=c,e.push({path:t,from:typeof l=="number"?l:NaN,to:c}))}for(const[t,n]of Object.entries(r.difficulty.presets))for(const i of["enemyHp","enemyDamage","enemySpeed"]){const s=n[i],a=da(s,.1,5);a!==s&&(n[i]=a,e.push({path:`difficulty.presets.${t}.${i}`,from:typeof s=="number"?s:NaN,to:a}))}for(const[t,n]of Object.entries(r.enemies.types))for(const[i,{min:s,max:a}]of Object.entries(i_)){const o=i,l=n[o],c=da(l,s,a);c!==l&&(n[o]=c,e.push({path:`enemies.types.${t}.${i}`,from:typeof l=="number"?l:NaN,to:c}))}return e}const di=(r,e,t)=>Math.max(e,Math.min(t,r));function r_(r,e=0){const t=Math.hypot(r.x,r.z);if(t<1e-6)return{x:0,z:0};const n=r.x/t,i=r.z/t,s=Math.cos(e),a=Math.sin(e);return{x:n*s+i*a,z:-n*a+i*s}}function co(r,e,t){const n={x:r.x,z:r.z};for(const i of t){const s=i.w/2,a=i.d/2,o=di(n.x,i.x-s,i.x+s),l=di(n.z,i.z-a,i.z+a),c=n.x-o,h=n.z-l,u=c*c+h*h;if(!(u>=e*e))if(u<1e-9){const d=s+e-Math.abs(n.x-i.x),f=a+e-Math.abs(n.z-i.z);d<f?n.x+=Math.sign(n.x-i.x||1)*d:n.z+=Math.sign(n.z-i.z||1)*f}else{const d=Math.sqrt(u);n.x=o+c/d*e,n.z=l+h/d*e}}return n}function ho(r,e,t){const n=Math.max(0,e-t);return{x:di(r.x,-n,n),z:di(r.z,-n,n)}}function uo(r,e,t){let n=(e-r)%(Math.PI*2);return n>Math.PI&&(n-=Math.PI*2),n<-Math.PI&&(n+=Math.PI*2),r+n*di(t,0,1)}function wr(r){return Math.atan2(r.x,r.z)}function a_(r,e,t,n){if(Math.abs(r.x)>n||Math.abs(r.z)>n)return!0;for(const i of t){const s=di(r.x,i.x-i.w/2,i.x+i.w/2),a=di(r.z,i.z-i.d/2,i.z+i.d/2);if((r.x-s)**2+(r.z-a)**2<e*e)return!0}return!1}function o_(r,e,t){let n=r.vy-t*e,i=r.y+n*e;return i<=0&&(i=0,n=0),{y:i,vy:n}}function l_(){return{timer:0,cooldown:0,dir:{x:0,z:1}}}function c_(r,e,t,n){if(r.timer>0||r.cooldown>0)return!1;const i=Math.hypot(e.x,e.z);return r.dir=i>1e-6?{x:e.x/i,z:e.z/i}:{x:0,z:1},r.timer=t,r.cooldown=n,!0}function h_(r,e){r.timer>0&&(r.timer=Math.max(0,r.timer-e)),r.cooldown>0&&(r.cooldown=Math.max(0,r.cooldown-e))}function u_(r,e,t,n,i,s){const a=t.x-r.x,o=t.z-r.z,l=Math.hypot(a,o);if(l-n>i)return!1;if(l<1e-6)return!0;let h=Math.atan2(a,o)-e;for(;h>Math.PI;)h-=Math.PI*2;for(;h<-Math.PI;)h+=Math.PI*2;const u=Math.atan2(n,l),d=s*Math.PI/180/2;return Math.abs(h)<=d+u}class d_{constructor(e,t,n,i,s,a,o=()=>{},l=()=>1,c=()=>0){this.player=e,this.input=t,this.getEnemies=n,this.getAimPoint=i,this.effects=s,this.projectiles=a,this.onEnemyDamaged=o,this.getDamageMultiplier=l,this.getWeaponAttack=c,this.kills=0,this.score=0,this.meleeCooldown=0,this.rangedCooldown=0,this.onAttack=null,this.tmp=new C}reset(){this.kills=0,this.score=0,this.meleeCooldown=0,this.rangedCooldown=0}update(e){if(this.meleeCooldown>0&&(this.meleeCooldown-=e),this.rangedCooldown>0&&(this.rangedCooldown-=e),this.player.health.isDead)return;const t=W.controls;this.meleeCooldown<=0&&this.input.isActionDown(t.attackMelee)?this.meleeAttack():this.rangedCooldown<=0&&this.input.isActionDown(t.attackRanged)&&this.rangedAttack()}damageEnemy(e,t,n,i){if(!e.alive||!e.hit(t,n,i))return!1;const s=e.position;return this.tmp.set(s.x,.8,s.z),e.alive?this.effects.burst(this.tmp,16777215,5,3):(this.effects.burst(this.tmp,e.def.color,18,7),this.kills++,this.score+=e.def.score),this.onEnemyDamaged(e,t,!e.alive),!0}faceAim(){const e=this.player.position,t=this.getAimPoint();if(t){const n={x:t.x-e.x,z:t.z-e.z};Math.hypot(n.x,n.z)>.25&&(this.player.facing=wr(n))}return{x:Math.sin(this.player.facing),z:Math.cos(this.player.facing)}}meleeAttack(){const e=W.combat.melee;this.meleeCooldown=e.cooldown,this.onAttack?.("melee"),this.faceAim();const t=this.player.position;this.player.triggerAttack(e.swingTime),this.effects.swing(t,this.player.facing,e.range,e.arcDegrees,e.swingTime);const n={x:t.x,z:t.z};for(const i of this.getEnemies()){if(!i.alive)continue;const s=i.position;if(!u_(n,this.player.facing,{x:s.x,z:s.z},i.radius,e.range,e.arcDegrees))continue;const a=Math.hypot(s.x-t.x,s.z-t.z)||1;this.damageEnemy(i,Math.round((e.damage+this.getWeaponAttack("melee"))*this.getDamageMultiplier()),{x:(s.x-t.x)/a,z:(s.z-t.z)/a},e.knockback)}}rangedAttack(){const e=W.combat.ranged;this.rangedCooldown=e.cooldown,this.onAttack?.("ranged");const t=this.faceAim(),n=this.player.position;this.player.triggerAttack(.15),this.projectiles.spawn({x:n.x+t.x*.7,z:n.z+t.z*.7},t,{damage:Math.round((e.damage+this.getWeaponAttack("ranged"))*this.getDamageMultiplier()),speed:e.speed,lifetime:e.lifetime,radius:e.radius,knockback:e.knockback,color:6091480,friendly:!0})}}function Pe(r){const e=new hi({color:new ue(r.color),roughness:r.roughness??.6,metalness:r.metalness??.1,flatShading:r.flatShading??!1,map:r.map??null,normalMap:r.normalMap??null,transparent:r.transparent??!1,opacity:r.opacity??1});return r.emissive!==void 0&&(e.emissive=new ue(r.emissive),e.emissiveIntensity=r.emissiveIntensity??1),r.normalMap&&r.normalScale!==void 0&&e.normalScale.set(r.normalScale,r.normalScale),e}function on(r,e=2){const t=new ue(r),n=new hi({color:t.clone().multiplyScalar(.25),roughness:.4,metalness:0});return n.emissive=t,n.emissiveIntensity=e,n}class f_{constructor(e,t=120){this.root=new Ye,this.swings=[],this.particles=[],this.particleGeo=new je(.16,.16,.16),this.root.name="Effects",e.add(this.root);for(let n=0;n<t;n++){const i=new le(this.particleGeo,on(16777215,1.8));i.visible=!1,this.root.add(i),this.particles.push({mesh:i,v:new C,life:0,max:1})}}swing(e,t,n,i,s,a=6091480){const o=i*Math.PI/180,l=new ai(.45,n,24,1,Math.PI/2-o/2,o),c=new zt({color:a,transparent:!0,opacity:.75,side:Ot,depthWrite:!1}),h=new le(l,c);h.position.set(e.x,.5,e.z),h.rotation.order="YXZ",h.rotation.y=t,h.rotation.x=Math.PI/2,this.root.add(h),this.swings.push({mesh:h,life:s,max:s})}shockwave(e,t,n=.45,i=16732025){const s=new ai(t*.8,t,48),a=new zt({color:i,transparent:!0,opacity:.8,side:Ot,depthWrite:!1}),o=new le(s,a);o.position.set(e.x,.08,e.z),o.rotation.x=-Math.PI/2,o.scale.setScalar(.2),this.root.add(o),this.swings.push({mesh:o,life:n,max:n,grow:!0})}marker(e,t,n,i=16742981){const s=new ai(t*.7,t,40),a=new zt({color:i,transparent:!0,opacity:.2,side:Ot,depthWrite:!1}),o=new le(s,a);o.position.set(e.x,.07,e.z),o.rotation.x=-Math.PI/2,this.root.add(o),this.swings.push({mesh:o,life:n,max:n,grow:!1,warn:!0})}burst(e,t,n=8,i=5){let s=0;for(const a of this.particles){if(a.life>0)continue;a.mesh.visible=!0,a.mesh.position.copy(e);const o=a.mesh.material;if(o.emissive.set(t),o.color.set(t).multiplyScalar(.3),a.v.set(Math.random()-.5,Math.random()*.8+.3,Math.random()-.5).normalize().multiplyScalar(i*(.5+Math.random()*.5)),a.life=a.max=.4+Math.random()*.4,a.mesh.scale.setScalar(.6+Math.random()*.8),++s>=n)break}}update(e){for(let t=this.swings.length-1;t>=0;t--){const n=this.swings[t];n.life-=e;const i=Math.max(0,n.life/n.max);n.warn?(n.mesh.material.opacity=.25+(1-i)*.6*(.7+.3*Math.sin(n.life*25)),n.mesh.scale.setScalar(1)):(n.mesh.material.opacity=.75*i,n.mesh.scale.setScalar(n.grow?.2+(1-i)*.8:1+(1-i)*.15)),n.life<=0&&(this.root.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material.dispose(),this.swings.splice(t,1))}for(const t of this.particles)t.life<=0||(t.life-=e,t.v.y-=16*e,t.mesh.position.addScaledVector(t.v,e),t.mesh.position.y<.08&&(t.mesh.position.y=.08,t.v.y*=-.3,t.v.x*=.7,t.v.z*=.7),t.mesh.rotation.x+=e*6,t.mesh.rotation.z+=e*4,t.mesh.scale.setScalar(Math.max(.01,t.life/t.max)*1.2),t.life<=0&&(t.mesh.visible=!1))}dispose(){this.root.removeFromParent(),this.particleGeo.dispose(),this.particles.forEach(e=>e.mesh.material.dispose()),this.swings.forEach(e=>{e.mesh.geometry.dispose(),e.mesh.material.dispose()})}}const ac=.9,p_=1;class m_{constructor(e){this.root=new Ye,this.shots=[],this.geo=new mt(1,10,8),this.root.name="Projectiles",e.add(this.root)}spawn(e,t,n){const i=new le(this.geo,on(n.color,2.5));i.position.set(e.x,ac,e.z),i.scale.set(n.radius,n.radius,n.radius*2.2),i.lookAt(e.x+t.x,ac,e.z+t.z),this.root.add(i),this.shots.push({mesh:i,dir:{x:t.x,z:t.z},life:n.lifetime,spec:n})}get count(){return this.shots.length}update(e,t){const n=t.world.getObstacleBoxes(),i=t.world.getArenaHalfSize();for(let s=this.shots.length-1;s>=0;s--){const a=this.shots[s];a.life-=e,a.mesh.position.x+=a.dir.x*a.spec.speed*e,a.mesh.position.z+=a.dir.z*a.spec.speed*e;const o={x:a.mesh.position.x,z:a.mesh.position.z};let l=a.life<=0||a_(o,a.spec.radius,n,i);if(!l&&a.spec.friendly)for(const c of t.enemies){if(!c.alive)continue;const h=c.radius+a.spec.radius;if((c.position.x-o.x)**2+(c.position.z-o.z)**2<h*h){t.onHitEnemy(c,a.spec,a.dir),l=!0;break}}else if(!l&&t.playerY<p_){const c=t.playerRadius+a.spec.radius;(t.playerPos.x-o.x)**2+(t.playerPos.z-o.z)**2<c*c&&(t.onHitPlayer(a.spec,a.dir,o),l=!0)}l&&this.remove(s)}}clear(){for(let e=this.shots.length-1;e>=0;e--)this.remove(e)}dispose(){this.clear(),this.geo.dispose(),this.root.removeFromParent()}remove(e){const t=this.shots[e];this.root.remove(t.mesh),t.mesh.material.dispose(),this.shots.splice(e,1)}}class oc{constructor(e,t=W.dungeon.chests){this.root=new Ye,this.chests=[],this.bodyGeo=new je(1.2,.7,.8),this.lidGeo=new je(1.24,.3,.84),this.woodMat=Pe({color:11893050}),this.trimMat=Pe({color:16765503,roughness:.3,metalness:.9}),this.openedMat=Pe({color:7031334}),this.root.name="Chests",e.add(this.root);for(const n of t)this.place(n.x,n.z)}place(e,t){const n=new Ye;n.position.set(e,0,t);const i=new le(this.bodyGeo,this.woodMat);i.position.y=.35,i.castShadow=!0,i.receiveShadow=!0,n.add(i);const s=new le(new je(.2,.72,.84),this.trimMat);s.position.y=.35,n.add(s);const a=new le(this.lidGeo,this.woodMat);a.position.set(0,.15,.42),a.castShadow=!0;const o=new Ye;o.position.set(0,.7,-.42),o.add(a),n.add(o),this.root.add(n),this.chests.push({root:n,lid:a,x:e,z:t,opened:!1,openT:0})}getCollisionBoxes(){return this.chests.map(e=>({x:e.x,z:e.z,w:1.3,d:.9}))}nearest(e,t=W.dungeon.chestLoot.interactRange){let n=null,i=t;for(const s of this.chests){if(s.opened)continue;const a=Math.hypot(s.x-e.x,s.z-e.z);a<i&&(i=a,n=s)}return n}open(e){return e.opened?!1:(e.opened=!0,!0)}get openedCount(){return this.chests.filter(e=>e.opened).length}get total(){return this.chests.length}update(e){for(const t of this.chests){const n=t.opened?1:0;t.openT!==n&&(t.openT+=(n-t.openT)*(1-Math.exp(-8*e)),Math.abs(n-t.openT)<.01&&(t.openT=n),t.lid.parent.rotation.x=-t.openT*1.9,t.opened&&t.openT>.5&&t.lid.material!==this.openedMat&&(t.lid.material=this.openedMat))}}reset(){for(const e of this.chests)e.opened=!1,e.openT=0,e.lid.parent.rotation.x=0,e.lid.material=this.woodMat}dispose(){this.root.removeFromParent(),this.bodyGeo.dispose(),this.lidGeo.dispose(),this.woodMat.dispose(),this.trimMat.dispose(),this.openedMat.dispose()}}class Tr extends le{constructor(){const e=Tr.SkyShader,t=new Bt({name:e.name,uniforms:$i.clone(e.uniforms),vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,side:Pt,depthWrite:!1});super(new je(1,1,1),t),this.isSky=!0}}Tr.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new C},up:{value:new C(0,1,0)}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;
		uniform vec3 up;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( dot( vSunDirection, up ) );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorbtion + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform vec3 up;

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPosition );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
			L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

			vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

			vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

			gl_FragColor = vec4( retColor, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};function g_(r){const e=(n,i)=>{let s=n*374761393+i*668265263+r*1442695041|0;return s=(s^s>>>13)*1274126177,((s^s>>>16)>>>0)/4294967295},t=n=>n*n*(3-2*n);return(n,i)=>{const s=Math.floor(n),a=Math.floor(i),o=t(n-s),l=t(i-a),c=e(s,a),h=e(s+1,a),u=e(s,a+1),d=e(s+1,a+1);return c+(h-c)*o+(u-c)*l+(c-h-u+d)*o*l}}function lc(r,e,t,n){let i=0,s=.5,a=1;for(let o=0;o<4;o++){const l=n*a,c=(e*a%l+l)%l,h=(t*a%l+l)%l;i+=s*r(c,h),s*=.5,a*=2}return i}function er(r){const e=new ue(r);return[e.r*255,e.g*255,e.b*255]}function __(r){const e=r.size??512,t=r.scale??6,n=g_(r.seed??7),i=new Float32Array(e*e),s=er(r.colorA),a=er(r.colorB),o=er(r.flecks[0]),l=er(r.flecks[1]),c=document.createElement("canvas");c.width=c.height=e;const h=c.getContext("2d"),u=h.createImageData(e,e);for(let x=0;x<e;x++)for(let v=0;v<e;v++){const R=v/e*t,w=x/e*t,A=lc(n,R,w,t),P=lc(n,R*7+3,w*7+3,t*7);i[x*e+v]=A*.7+P*.3;const y=Math.min(1,Math.max(0,(A-.35)*2.2));let b=s[0]+(a[0]-s[0])*y,U=s[1]+(a[1]-s[1])*y,N=s[2]+(a[2]-s[2])*y;if(P>.74){const F=P>.8?l:o;b=b*.4+F[0]*.6,U=U*.4+F[1]*.6,N=N*.4+F[2]*.6}const Y=.9+P*.2,I=(x*e+v)*4;u.data[I]=Math.min(255,b*Y),u.data[I+1]=Math.min(255,U*Y),u.data[I+2]=Math.min(255,N*Y),u.data[I+3]=255}h.putImageData(u,0,0);const d=document.createElement("canvas");d.width=d.height=e;const f=d.getContext("2d"),g=f.createImageData(e,e),_=r.bump??2.5,m=(x,v)=>i[(v+e)%e*e+(x+e)%e];for(let x=0;x<e;x++)for(let v=0;v<e;v++){const R=(m(v+1,x)-m(v-1,x))*_,w=(m(v,x+1)-m(v,x-1))*_,A=Math.hypot(R,w,1),P=(x*e+v)*4;g.data[P]=(-R/A*.5+.5)*255,g.data[P+1]=(-w/A*.5+.5)*255,g.data[P+2]=1/A*255,g.data[P+3]=255}f.putImageData(g,0,0);const p=new Ql(c);p.colorSpace=ot;const M=new Ql(d);for(const x of[p,M])x.wrapS=x.wrapT=qn;return{map:p,normalMap:M}}const Zi={low:{label:"낮음",bloom:!1,msaa:0,shadowMapSize:1024,anisotropy:1,normalScale:.4,grassCount:600,particleCount:40},medium:{label:"중간",bloom:!1,msaa:0,shadowMapSize:2048,anisotropy:4,normalScale:.7,grassCount:1800,particleCount:90},high:{label:"높음",bloom:!0,msaa:4,shadowMapSize:2048,anisotropy:8,normalScale:.9,grassCount:3500,particleCount:160}},x_=["low","medium","high"];function v_(r){return typeof r=="string"&&r in Zi}function Lh(r){let e=r>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const cc={forest:{inside:[["rock",10],["bush",14],["flower",24],["stump",4]],outside:[["tree",46],["rock",10]]},cave:{inside:[["crystalSmall",18],["stalagmite",10],["mushroom",14]],outside:[["crystalBig",20],["stalagmite",26]]},fortress:{inside:[["barrel",10],["pipe",6],["lamp",8],["crate",6]],outside:[["tower",10],["pipe",14],["crate",12]]}};function y_(r,e,t,n){const i={x:0,z:0};if(Math.hypot(r.x-i.x,r.z-i.z)<4+t||Math.hypot(r.x-n.x,r.z-n.z)<4+t)return!1;for(const s of e.obstacles)if(Math.abs(r.x-s.x)<s.w/2+t+.6&&Math.abs(r.z-s.z)<s.d/2+t+.6)return!1;for(const s of e.chests)if(Math.hypot(r.x-s.x,r.z-s.z)<2.2+t)return!1;for(const s of e.spawns)if(Math.hypot(r.x-s.x,r.z-s.z)<1.8+t)return!1;return!0}function M_(r,e,t=1,n=14){const i=Lh(t+r.id.length*7919),s=cc[r.id]??cc.forest,a=r.arenaHalfSize,o=[],l=[];for(const[c,h]of s.inside){let u=0;for(let d=0;d<h*30&&u<h;d++){const f={x:(i()*2-1)*(a-1.5),z:(i()*2-1)*(a-1.5)};y_(f,r,.6,e)&&(o.some(g=>Math.hypot(g.x-f.x,g.z-f.z)<1.4)||(o.push({kind:c,x:f.x,z:f.z,scale:.75+i()*.6,rot:i()*Math.PI*2}),u++))}}for(const[c,h]of s.outside){let u=0;for(let d=0;d<h*30&&u<h;d++){const f=Math.floor(i()*4),g=(i()*2-1)*(a+n),_=a+1.5+i()*n,m=f===0?{x:g,z:-_}:f===1?{x:g,z:_}:f===2?{x:-_,z:g}:{x:_,z:g};l.some(p=>Math.hypot(p.x-m.x,p.z-m.z)<2.6)||(l.push({kind:c,x:m.x,z:m.z,scale:.8+i()*.7,rot:i()*Math.PI*2}),u++)}}return{inside:o,outside:l}}class S_{constructor(e,t,n){this.def=e,this.root=new Ye,this.disposables=[],this.grass=null,this.grassMat=null,this.grassTime={value:0},this.particles=null,this.particleVel=null,this.lamps=[],this.t=0,this.root.name=`Decor-${e.id}`,this.rnd=Lh(e.id.length*131+17);const i=M_(e,t,1);for(const s of i.inside)this.root.add(this.makeProp(s));for(const s of i.outside)this.root.add(this.makeProp(s));this.buildGrass(n),this.buildParticles(n)}makeProp(e){const t=new Ye;t.position.set(e.x,0,e.z),t.rotation.y=e.rot,t.scale.setScalar(e.scale);const n=(s,a,o,l=0,c=0,h=!0)=>{const u=new le(s,a);return u.position.set(l,o,c),u.castShadow=h,u.receiveShadow=!0,t.add(u),this.disposables.push(s,a),u},i=this.rnd;switch(e.kind){case"tree":{const s=2.2+i()*1.4;n(new Et(.22,.32,s,7),Pe({color:"#6b4a2a",roughness:.9}),s/2);const a=Pe({color:new ue().setHSL(.27+i()*.07,.55,.32+i()*.1),roughness:.85,flatShading:!0});n(new bn(1.5+i()*.5,1),a,s+.8),n(new bn(1.1+i()*.4,1),a,s+1.7,.6,.3),n(new bn(1+i()*.4,1),a,s+1.4,-.7,-.2);break}case"rock":n(new br(.5+i()*.5,0),Pe({color:"#8a8f99",roughness:.9,flatShading:!0}),.3);break;case"bush":n(new bn(.55,1),Pe({color:"#3f8a3a",roughness:.9,flatShading:!0}),.4),n(new bn(.4,1),Pe({color:"#4c9a44",roughness:.9,flatShading:!0}),.5,.4,.2);break;case"flower":{const s=["#ff6b90","#ffd23f","#ffffff","#b48cff"][Math.floor(i()*4)];n(new Et(.02,.02,.4,4),Pe({color:"#3f8a3a"}),.2,0,0,!1),n(new mt(.1,6,5),Pe({color:s,roughness:.7,emissive:s,emissiveIntensity:.25}),.42,0,0,!1);break}case"stump":n(new Et(.45,.55,.5,9),Pe({color:"#7a5533",roughness:.95}),.25);break;case"crystalSmall":case"crystalBig":{const s=e.kind==="crystalBig",a=i()<.5?"#8fe8ff":"#c7a2ff",o=s?4:2;for(let l=0;l<o;l++){const c=(s?1.8:.7)*(.7+i()*.6);n(new Hn((s?.4:.16)*(.7+i()*.6),c,5),Pe({color:a,roughness:.15,emissive:a,emissiveIntensity:s?.6:.45,flatShading:!0}),c/2,(i()-.5)*.8,(i()-.5)*.8).rotation.set((i()-.5)*.6,0,(i()-.5)*.6)}break}case"stalagmite":n(new Hn(.35+i()*.3,1.2+i()*1.6,6),Pe({color:"#4a4f7a",roughness:.9,flatShading:!0}),.8);break;case"mushroom":{n(new Et(.06,.08,.3,6),Pe({color:"#d9d4e8"}),.15,0,0,!1),n(new mt(.18,8,6,0,Math.PI*2,0,Math.PI/2),on("#7fe3ff",.9),.3,0,0,!1);break}case"barrel":n(new Et(.4,.4,.9,12),Pe({color:i()<.5?"#b0392f":"#6d7280",roughness:.5,metalness:.7}),.45);break;case"crate":n(new je(.9,.9,.9),Pe({color:"#8d9099",roughness:.5,metalness:.6}),.45);break;case"pipe":n(new Et(.18,.18,2.4,10),Pe({color:"#5c6069",roughness:.4,metalness:.85}),.2).rotation.z=Math.PI/2;break;case"lamp":{n(new Et(.06,.08,1.4,6),Pe({color:"#3a3c44",metalness:.8,roughness:.4}),.7,0,0,!1);const s=on("#ff3b3b",2);n(new mt(.14,8,6),s,1.45,0,0,!1),this.lamps.push(s);break}case"tower":n(new je(2.2,5+i()*3,2.2),Pe({color:"#5c6069",roughness:.5,metalness:.6}),3),n(new mt(.2,8,6),on("#ff3b3b",1.8),7,0,0,!1);break;default:n(new mt(.3,6,5),Pe({color:"#999999"}),.3)}return t}buildGrass(e){if(this.def.id!=="forest")return;const t=Zi[e].grassCount;if(t<=0)return;const n=new Ms(.14,.7,1,3);n.translate(0,.35,0);const i=n.attributes.position;for(let g=0;g<i.count;g++){const _=i.getY(g);i.setX(g,i.getX(g)*(1-_/.7)*1.2)}const s=Pe({color:"#5fae3f",roughness:.95,metalness:0});s.side=Ot;const a=this.grassTime;s.onBeforeCompile=g=>{g.uniforms.uTime=a,g.vertexShader=g.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime;`).replace("#include <begin_vertex>",`#include <begin_vertex>
          // 바람: 인스턴스 위치를 위상으로 써서 포기마다 다르게, 끝부분(uv.y 큰 쪽)이 더 흔들린다
          vec4 wp = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
          float sway = sin(uTime * 1.8 + wp.x * 0.7 + wp.z * 0.5) * 0.18 * uv.y * uv.y;
          transformed.x += sway;
          transformed.z += sway * 0.5;`)};const o=new yh(n,s,t),l=this.def.arenaHalfSize,c=new He,h=new Jt,u=new C,d=new C,f=new ue;for(let g=0;g<t;g++){d.set((this.rnd()*2-1)*(l-.5),0,(this.rnd()*2-1)*(l-.5)),h.setFromAxisAngle(new C(0,1,0),this.rnd()*Math.PI);const _=.6+this.rnd()*.9;u.set(_,_,_),c.compose(d,h,u),o.setMatrixAt(g,c),f.setHSL(.27+this.rnd()*.05,.6,.3+this.rnd()*.15),o.setColorAt(g,f)}o.instanceMatrix.needsUpdate=!0,o.instanceColor&&(o.instanceColor.needsUpdate=!0),o.castShadow=!1,o.receiveShadow=!0,o.frustumCulled=!1,this.grass=o,this.grassMat=s,this.root.add(o),this.disposables.push(n,s)}buildParticles(e){const t=Zi[e].particleCount;if(t<=0)return;const n=this.def.arenaHalfSize+6,i=new Float32Array(t*3);this.particleVel=new Float32Array(t*3);for(let l=0;l<t;l++)i[l*3]=(this.rnd()*2-1)*n,i[l*3+1]=.5+this.rnd()*4,i[l*3+2]=(this.rnd()*2-1)*n,this.particleVel[l*3]=(this.rnd()-.5)*.6,this.particleVel[l*3+1]=(this.rnd()-.5)*.3,this.particleVel[l*3+2]=(this.rnd()-.5)*.6;const s=new wt;s.setAttribute("position",new It(i,3));const a=this.def.id==="forest"?{color:16773770,size:.18}:this.def.id==="cave"?{color:10475775,size:.12}:{color:16752704,size:.1},o=new io({color:a.color,size:a.size,transparent:!0,opacity:.85,sizeAttenuation:!0,depthWrite:!1,blending:ar});this.particles=new Sh(s,o),this.particles.frustumCulled=!1,this.root.add(this.particles),this.disposables.push(s,o)}applyQuality(e){this.grass&&(this.root.remove(this.grass),this.grass.geometry.dispose(),this.grassMat?.dispose(),this.grass=null),this.particles&&(this.root.remove(this.particles),this.particles.geometry.dispose(),this.particles.material.dispose(),this.particles=null),this.buildGrass(e),this.buildParticles(e)}update(e){this.t+=e,this.grassTime.value=this.t;for(let t=0;t<this.lamps.length;t++)this.lamps[t].emissiveIntensity=1.2+Math.max(0,Math.sin(this.t*3+t))*1.8;if(this.particles&&this.particleVel){const t=this.particles.geometry.attributes.position,n=t.array,i=this.def.arenaHalfSize+6,s=t.count;for(let a=0;a<s;a++){const o=a*3;n[o]+=this.particleVel[o]*e+Math.sin(this.t+a)*.004,n[o+1]+=this.particleVel[o+1]*e+Math.cos(this.t*.7+a)*.003,n[o+2]+=this.particleVel[o+2]*e,n[o]>i&&(n[o]=-i),n[o]<-i&&(n[o]=i),n[o+2]>i&&(n[o+2]=-i),n[o+2]<-i&&(n[o+2]=i),n[o+1]<.3&&(n[o+1]=4.5),n[o+1]>5&&(n[o+1]=.3)}t.needsUpdate=!0}}dispose(){this.root.removeFromParent();for(const e of this.disposables)e.dispose();this.disposables.length=0}}const b_={backgroundColor:W.world.backgroundColor,fogNear:W.world.fogNear,fogFar:W.world.fogFar,floorColor:W.world.floorColor,floorAltColor:W.world.floorAltColor,floorFlecks:["#8bd268","#66ad48"],wallColor:W.world.wallColor,wallHeight:W.world.wallHeight,skyColor:"#dcefff",groundColor:"#5f8f3a",sunColor:"#fff4de",sunIntensity:2.6,sky:{elevation:32,azimuth:160,turbidity:6,rayleigh:1.6},exposure:1,groundBump:3.2,groundScale:4,groundRoughness:.95},sn=[{id:"forest",name:W.dungeon.name,subtitle:"햇살이 드는 숲. 로봇 3종과 숲의 수호 로봇.",recommendedLevel:1,arenaHalfSize:W.world.arenaHalfSize,theme:b_,obstacles:W.world.obstacles,chests:W.dungeon.chests,spawns:W.enemies.spawns,boss:{},rewardMul:{gold:1,xp:1}},{id:"cave",name:"수정 동굴",subtitle:"어둡고 좁은 동굴. 빠른 박쥐 드론이 떼로 덤빈다.",recommendedLevel:4,requiresClear:"forest",arenaHalfSize:24,theme:{backgroundColor:"#161a33",fogNear:16,fogFar:52,floorColor:"#3b4070",floorAltColor:"#343a64",floorFlecks:["#7fe3ff","#b48cff"],wallColor:"#4a3f7a",wallHeight:2.4,skyColor:"#6f7fd6",groundColor:"#1f2340",sunColor:"#c9d6ff",sunIntensity:1.3,exposure:.9,groundBump:3.2,groundScale:5,groundRoughness:.75},obstacles:[{x:7,z:-7,w:1.4,d:1.4,h:5,color:"#8fe8ff"},{x:-9,z:-5,w:1.6,d:1.6,h:6,color:"#c7a2ff"},{x:10,z:8,w:1.4,d:1.4,h:4.5,color:"#8fe8ff"},{x:-11,z:10,w:1.8,d:1.8,h:5.5,color:"#c7a2ff"},{x:2,z:14,w:1.2,d:1.2,h:4,color:"#8fe8ff"},{x:-4,z:-14,w:4,d:2.2,h:2.2,color:"#5a5f8c"},{x:16,z:-2,w:2.6,d:4,h:2.6,color:"#5a5f8c"},{x:-17,z:2,w:2.4,d:5,h:2.4,color:"#5a5f8c"},{x:6,z:19,w:5,d:2,h:2,color:"#5a5f8c"},{x:0,z:-9,w:7,d:1,h:3,color:"#4a3f7a"},{x:14,z:16,w:1,d:7,h:3,color:"#4a3f7a"}],chests:[{x:-19,z:-16},{x:19,z:12},{x:-2,z:20}],spawns:[{type:"stalker",x:9,z:-13},{type:"stalker",x:-13,z:-11},{type:"stalker",x:15,z:5},{type:"stalker",x:-15,z:14},{type:"stalker",x:4,z:9},{type:"stalker",x:-7,z:16},{type:"shooter",x:18,z:-10},{type:"shooter",x:-18,z:-6},{type:"shooter",x:17,z:18},{type:"shooter",x:-12,z:19},{type:"rusher",x:12,z:0},{type:"rusher",x:-8,z:7},{type:"rusher",x:0,z:-17},{type:"tank",x:-1,z:18}],boss:{name:"수정 골렘",hp:650,color:"#8f6cff",speed:2.6,radius:1.8,score:500,spawn:{x:0,z:-17},contactDamage:24,model:"golem",useCharge:!1,closePatterns:["slam","summon","barrage"],engageRange:9,windup:{slam:.9,barrage:.7,summon:1},slam:{radius:5.5,damage:30},barrage:{count:10,phase2Count:14,damage:11,speed:9.5},summon:{type:"stalker",count:2,phase2Count:3,maxAlive:4},phase2SpeedMul:1.4,reward:{goldMin:150,goldMax:240,xp:220,equipMinRarity:"rare"}},rewardMul:{gold:1.3,xp:1.3}},{id:"fortress",name:"강철 요새",subtitle:"붉은 강철 요새. 철벽 로봇과 포대가 길목을 지킨다.",recommendedLevel:8,requiresClear:"cave",arenaHalfSize:30,theme:{backgroundColor:"#2b2d33",fogNear:30,fogFar:84,floorColor:"#5c6069",floorAltColor:"#54585f",floorFlecks:["#7b808a","#b0392f"],wallColor:"#7a2b2b",wallHeight:2.8,skyColor:"#b9bcc6",groundColor:"#3a3c44",sunColor:"#ffd9c7",sunIntensity:3.2,sky:{elevation:18,azimuth:220,turbidity:12,rayleigh:.6},exposure:1.1,groundBump:1.6,groundScale:9,groundRoughness:.55},obstacles:[{x:0,z:-8,w:12,d:1.2,h:3,color:"#7a2b2b"},{x:0,z:8,w:12,d:1.2,h:3,color:"#7a2b2b"},{x:-12,z:0,w:1.2,d:10,h:3,color:"#7a2b2b"},{x:12,z:0,w:1.2,d:10,h:3,color:"#7a2b2b"},{x:-20,z:-20,w:3,d:3,h:2,color:"#8d9099"},{x:20,z:-20,w:3,d:3,h:2,color:"#8d9099"},{x:-20,z:20,w:3,d:3,h:2,color:"#8d9099"},{x:20,z:20,w:3,d:3,h:2,color:"#8d9099"},{x:18,z:4,w:4,d:2,h:2.4,color:"#b0392f"},{x:-18,z:-4,w:4,d:2,h:2.4,color:"#b0392f"},{x:6,z:20,w:2,d:4,h:2.4,color:"#c9a227"},{x:-6,z:-20,w:2,d:4,h:2.4,color:"#c9a227"}],chests:[{x:-26,z:0},{x:26,z:0},{x:0,z:26},{x:0,z:-26}],spawns:[{type:"tank",x:0,z:-14},{type:"tank",x:0,z:14},{type:"tank",x:-16,z:0},{type:"tank",x:16,z:0},{type:"artillery",x:-20,z:-16},{type:"artillery",x:20,z:-16},{type:"artillery",x:-20,z:16},{type:"artillery",x:20,z:16},{type:"shooter",x:24,z:-6},{type:"shooter",x:-24,z:6},{type:"shooter",x:8,z:24},{type:"rusher",x:-8,z:-12},{type:"rusher",x:8,z:12},{type:"rusher",x:22,z:10},{type:"rusher",x:-22,z:-10},{type:"stalker",x:10,z:-24},{type:"stalker",x:-10,z:24},{type:"stalker",x:26,z:24}],boss:{name:"요새 사령관",hp:900,color:"#c0392b",speed:3.2,radius:1.7,score:800,spawn:{x:0,z:-22},contactDamage:28,model:"commander",closePatterns:["mortar","barrage","slam","mortar"],windup:{charge:.65,slam:.6,barrage:.5,mortar:.7},mortar:{count:4,phase2Count:6,delay:1,radius:2.6,damage:22,spread:4},charge:{speed:21},slam:{radius:5,damage:34},barrage:{count:12,phase2Count:18,damage:12,speed:11},reward:{goldMin:250,goldMax:400,xp:400,equipMinRarity:"epic"}},rewardMul:{gold:1.6,xp:1.6}}];function Da(r,e){return!r.requiresClear||(e[r.requiresClear]??0)>0}function E_(r){return sn.find(e=>e.requiresClear===r)??null}function Na(r){const e=W.boss,t=r.boss;return{...e,...t,spawn:{...e.spawn,...t.spawn??{}},windup:{...e.windup,...t.windup??{}},charge:{...e.charge,...t.charge??{}},slam:{...e.slam,...t.slam??{}},barrage:{...e.barrage,...t.barrage??{}},summon:{...e.summon,...t.summon??{}},mortar:{...e.mortar,...t.mortar??{}},reward:{...e.reward,...t.reward??{}}}}class hc{constructor(e,t,n="medium"){this.def=t,this.root=new Ye,this.boxes=[],this.disposables=[],this.sky=null,this.floorMat=null,this.decor=null,this.groundMaps=null,this.lastQuality=null,this.sunDir=new C(12,26,10).normalize();const i=t.theme;this.root.name=`Dungeon-${t.id}`,e.background=new ue(i.backgroundColor),e.fog=new Ja(i.backgroundColor,i.fogNear,i.fogFar),i.sky&&this.buildSky(i.sky),this.buildLights(),this.buildFloor(),this.buildWalls(),this.buildObstacles(),this.decor=new S_(t,Na(t).spawn,n),this.root.add(this.decor.root),this.applyQuality(n),e.add(this.root)}update(e){this.decor?.update(e)}buildSky(e){this.sky=new Tr,this.sky.scale.setScalar(900);const t=this.sky.material.uniforms;t.turbidity.value=e.turbidity,t.rayleigh.value=e.rayleigh,t.mieCoefficient.value=.005,t.mieDirectionalG.value=.8;const n=ni.degToRad(90-e.elevation),i=ni.degToRad(e.azimuth),s=new C().setFromSphericalCoords(1,n,i);t.sunPosition.value.copy(s),this.root.add(this.sky)}applyQuality(e){const t=Zi[e];this.sun.shadow.mapSize.x!==t.shadowMapSize&&(this.sun.shadow.mapSize.set(t.shadowMapSize,t.shadowMapSize),this.sun.shadow.map?.dispose(),this.sun.shadow.map=null),this.groundMaps&&(this.groundMaps.map.anisotropy=t.anisotropy,this.groundMaps.normalMap.anisotropy=t.anisotropy,this.groundMaps.map.needsUpdate=!0,this.groundMaps.normalMap.needsUpdate=!0),this.floorMat?.normalScale.set(t.normalScale,t.normalScale),this.decor&&this.lastQuality!==e&&this.decor.applyQuality(e),this.lastQuality=e}buildLights(){const e=W.graphics,t=this.def.theme,n=new U0(new ue(t.skyColor),new ue(t.groundColor),.9);if(this.root.add(n),this.sun=new Ch(new ue(t.sunColor),t.sunIntensity),this.def.theme.sky){const s=this.def.theme.sky,a=new C().setFromSphericalCoords(1,ni.degToRad(90-s.elevation),ni.degToRad(s.azimuth));this.sunDir.copy(a)}this.sun.castShadow=e.shadows,this.sun.shadow.mapSize.set(e.shadowMapSize,e.shadowMapSize);const i=this.sun.shadow.camera;i.left=-24,i.right=24,i.top=24,i.bottom=-24,i.near=1,i.far=90,i.updateProjectionMatrix(),this.sun.shadow.bias=-6e-4,this.root.add(this.sun,this.sun.target)}buildFloor(){const e=this.def.theme;this.groundMaps=__({colorA:e.floorColor,colorB:e.floorAltColor,flecks:e.floorFlecks,bump:e.groundBump,scale:e.groundScale,seed:this.def.id.length*13+7});const t=this.def.arenaHalfSize*2+60,n=t/10;this.groundMaps.map.repeat.set(n,n),this.groundMaps.normalMap.repeat.set(n,n),this.floorMat=Pe({color:16777215,map:this.groundMaps.map,normalMap:this.groundMaps.normalMap,normalScale:.7,roughness:e.groundRoughness,metalness:0});const i=new le(new Ms(t,t),this.floorMat);i.rotation.x=-Math.PI/2,i.receiveShadow=!0,i.name="Floor",this.root.add(i),this.disposables.push(this.groundMaps.map,this.groundMaps.normalMap,i.geometry,this.floorMat)}buildWalls(){const e=this.def.theme,t=this.def.arenaHalfSize,n=Pe({color:e.wallColor,roughness:.8,metalness:this.def.id==="fortress"?.5:.05}),i=t*2+1,s=.5,a=new je(i,e.wallHeight,s);this.disposables.push(n,a);const o=[[0,-(t+s/2),0],[0,t+s/2,0],[-(t+s/2),0,Math.PI/2],[t+s/2,0,Math.PI/2]];for(const[l,c,h]of o){const u=new le(a,n);u.position.set(l,e.wallHeight/2,c),u.rotation.y=h,u.castShadow=!0,u.receiveShadow=!0,this.root.add(u)}}buildObstacles(){for(const e of this.def.obstacles){const t=new je(e.w,e.h,e.d),n=new ue(e.color??"#9aa3b2"),i={h:0,s:0,l:0};n.getHSL(i);const s=this.def.id==="cave"&&i.l>.6,a=this.def.id==="fortress",o=Pe(s?{color:n,roughness:.2,metalness:.1,emissive:n,emissiveIntensity:.22,flatShading:!0}:{color:n,roughness:a?.45:.85,metalness:a?.6:.05}),l=new le(t,o);l.position.set(e.x,e.h/2,e.z),l.castShadow=!0,l.receiveShadow=!0,this.root.add(l),this.boxes.push({x:e.x,z:e.z,w:e.w,d:e.d}),this.disposables.push(t,o)}}setShadows(e){this.sun.castShadow=e}updateLight(e){this.sun.position.set(e.x+this.sunDir.x*30,Math.max(10,this.sunDir.y*30),e.z+this.sunDir.z*30),this.sun.target.position.copy(e)}getObstacleBoxes(){return this.boxes}addCollisionBoxes(e){this.boxes.push(...e)}getArenaHalfSize(){return this.def.arenaHalfSize}dispose(){this.decor?.dispose(),this.sky&&(this.sky.geometry.dispose(),this.sky.material.dispose()),this.root.removeFromParent(),this.disposables.forEach(e=>e.dispose())}}class w_{constructor(e,t){this.cb=t,this.el=document.createElement("div"),this.el.className="guide dungeons",this.el.hidden=!0,this.el.innerHTML=`
      <div class="guide-panel dungeons-panel" role="dialog" aria-labelledby="dungeons-title">
        <div class="inv-head"><h2 class="guide-title" id="dungeons-title">던전 선택</h2><button class="btn small" id="dungeons-close" type="button">닫기 (Esc)</button></div>
        <p class="guide-sub">던전을 클리어하면 다음 던전이 열립니다. 레벨·골드·장비는 모든 던전에서 이어집니다.</p>
        <div class="dungeon-list" id="dungeon-list"></div>
      </div>`,e.appendChild(this.el),this.el.querySelector("#dungeons-close")?.addEventListener("click",()=>this.cb.onClose()),this.el.querySelector("#dungeon-list")?.addEventListener("click",n=>{const i=n.target.closest("button[data-dungeon]");if(!i||i.disabled)return;const s=sn.find(a=>a.id===i.dataset.dungeon);s&&this.cb.enter(s)})}get visible(){return!this.el.hidden}refresh(){const e=this.cb.clears(),t=this.cb.level(),n=this.el.querySelector("#dungeon-list");n.innerHTML=sn.map((i,s)=>{const a=Da(i,e),o=e[i.id]??0,l=i.requiresClear?sn.find(u=>u.id===i.requiresClear)?.name??i.requiresClear:"",c=a?o>0?`클리어 ${o}회`:"아직 클리어하지 않음":`잠김 · '${l}' 클리어 필요`,h=t<i.recommendedLevel?` <span class="dungeon-warn">(현재 레벨 ${t}: 어려울 수 있음)</span>`:"";return`<div class="dungeon-card${a?"":" locked"}" data-card="${i.id}">
          <div class="dungeon-index">${s+1}</div>
          <div class="dungeon-text">
            <div class="dungeon-name">${i.name}</div>
            <div class="dungeon-sub">${i.subtitle}</div>
            <div class="dungeon-meta">권장 레벨 ${i.recommendedLevel}${h} · 적 ${i.spawns.length}마리 · 상자 ${i.chests.length}개 · ${c}</div>
          </div>
          <button class="btn${a?"":" secondary"}" type="button" data-dungeon="${i.id}" ${a?"":"disabled"}>${a?"입장":"잠김"}</button>
        </div>`}).join("")}show(){this.refresh(),this.el.hidden=!1}hide(){this.el.hidden=!0}}function uc(r,e){if(e===ku)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===ba||e===Jc){let t=r.getIndex();if(t===null){const a=[],o=r.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);r.setIndex(a),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===ba)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class T_ extends ns{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new P_(t)}),this.register(function(t){return new B_(t)}),this.register(function(t){return new H_(t)}),this.register(function(t){return new G_(t)}),this.register(function(t){return new D_(t)}),this.register(function(t){return new N_(t)}),this.register(function(t){return new U_(t)}),this.register(function(t){return new F_(t)}),this.register(function(t){return new L_(t)}),this.register(function(t){return new k_(t)}),this.register(function(t){return new I_(t)}),this.register(function(t){return new z_(t)}),this.register(function(t){return new O_(t)}),this.register(function(t){return new R_(t)}),this.register(function(t){return new V_(t)}),this.register(function(t){return new W_(t)})}load(e,t,n,i){const s=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=_s.extractUrlBase(e);a=_s.resolveURL(c,this.path)}else a=_s.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new Th(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,a,function(h){t(h),s.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const a={},o={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Ph){try{a[Xe.KHR_BINARY_GLTF]=new q_(e)}catch(u){i&&i(u);return}s=JSON.parse(a[Xe.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new sx(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case Xe.KHR_MATERIALS_UNLIT:a[u]=new C_;break;case Xe.KHR_DRACO_MESH_COMPRESSION:a[u]=new X_(s,this.dracoLoader);break;case Xe.KHR_TEXTURE_TRANSFORM:a[u]=new j_;break;case Xe.KHR_MESH_QUANTIZATION:a[u]=new $_;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function A_(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const Xe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class R_{constructor(e){this.parser=e,this.name=Xe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const h=new ue(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],bt);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Ch(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Rh(h),c.distance=u;break;case"spot":c=new k0(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,kn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class C_{constructor(){this.name=Xe.KHR_MATERIALS_UNLIT}getMaterialType(){return zt}extendParams(e,t,n){const i=[];e.color=new ue(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],bt),e.opacity=a[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,ot))}return Promise.all(i)}}class L_{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class P_{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Rn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ve(o,o)}return Promise.all(s)}}class I_{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Rn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}}class D_{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Rn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new ue(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],bt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,ot)),a.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}}class N_{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Rn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(s)}}class U_{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Rn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new ue().setRGB(o[0],o[1],o[2],bt),Promise.all(s)}}class F_{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Rn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class k_{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Rn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new ue().setRGB(o[0],o[1],o[2],bt),a.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,ot)),Promise.all(s)}}class O_{constructor(e){this.parser=e,this.name=Xe.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Rn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(s)}}class z_{constructor(e){this.parser=e,this.name=Xe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Rn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(s)}}class B_{constructor(e){this.parser=e,this.name=Xe.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}}class H_{constructor(e){this.parser=e,this.name=Xe.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class G_{constructor(e){this.parser=e,this.name=Xe.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class V_{constructor(e){this.name=Xe.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class W_{constructor(e){this.name=Xe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==jt.TRIANGLES&&c.mode!==jt.TRIANGLE_STRIP&&c.mode!==jt.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const g of u){const _=new He,m=new C,p=new Jt,M=new C(1,1,1),x=new yh(g.geometry,g.material,d);for(let v=0;v<d;v++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,v),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,v),l.SCALE&&M.fromBufferAttribute(l.SCALE,v),x.setMatrixAt(v,_.compose(m,p,M));for(const v in l)if(v==="_COLOR_0"){const R=l[v];x.instanceColor=new Ca(R.array,R.itemSize,R.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&g.geometry.setAttribute(v,l[v]);lt.prototype.copy.call(x,g),this.parser.assignFinalMaterial(x),f.push(x)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Ph="glTF",ds=12,dc={JSON:1313821514,BIN:5130562};class q_{constructor(e){this.name=Xe.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ds),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Ph)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-ds,s=new DataView(e,ds);let a=0;for(;a<i;){const o=s.getUint32(a,!0);a+=4;const l=s.getUint32(a,!0);if(a+=4,l===dc.JSON){const c=new Uint8Array(e,ds+a,o);this.content=n.decode(c)}else if(l===dc.BIN){const c=ds+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class X_{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Xe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const h in a){const u=Ua[h]||h.toLowerCase();o[u]=a[h]}for(const h in e.attributes){const u=Ua[h]||h.toLowerCase();if(a[h]!==void 0){const d=n.accessors[e.attributes[h]],f=Hi[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const g in f.attributes){const _=f.attributes[g],m=l[g];m!==void 0&&(_.normalized=m)}u(f)},o,c,bt,d)})})}}class j_{constructor(){this.name=Xe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class $_{constructor(){this.name=Xe.KHR_MESH_QUANTIZATION}}class Ih extends bs{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[s+a];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,g=e*c,_=g-c,m=-2*f+3*d,p=f-d,M=1-m,x=p-d+u;for(let v=0;v!==o;v++){const R=a[_+v+o],w=a[_+v+l]*h,A=a[g+v+o],P=a[g+v]*h;s[v]=M*R+x*w+m*A+p*P}return s}}const Y_=new Jt;class K_ extends Ih{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return Y_.fromArray(s).normalize().toArray(s),s}}const jt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Hi={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},fc={9728:Mt,9729:Ht,9984:Sa,9985:Gc,9986:nr,9987:ci},pc={33071:$t,33648:lr,10497:qn},fa={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ua={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Nn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Z_={CUBICSPLINE:void 0,LINEAR:qi,STEP:xs},pa={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function J_(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new hi({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:An})),r.DefaultMaterial}function Jn(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function kn(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Q_(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;a.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;o.push(d)}if(s){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function ex(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function tx(r){let e;const t=r.extensions&&r.extensions[Xe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+ma(t.attributes):e=r.indices+":"+ma(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+ma(r.targets[n]);return e}function ma(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function Fa(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function nx(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const ix=new He;class sx{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new A_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,s=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,s=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&s<98?this.textureLoader=new Ah(this.options.manager):this.textureLoader=new B0(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Th(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return Jn(s,o,i),kn(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const a=t[i].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,h]of a.children.entries())s(h,o.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Xe.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,a){n.load(_s.resolveURL(t.uri,i.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=fa[i.type],o=Hi[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new It(c,a,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(a){const o=a[0],l=fa[i.type],c=Hi[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,m;if(f&&f!==u){const p=Math.floor(d/f),M="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let x=t.cache.get(M);x||(_=new c(o,p*f,i.count*f/h),x=new p0(_,f/h),t.cache.add(M,x)),m=new eo(x,l,d%f/h,g)}else o===null?_=new c(i.count*l):_=new c(o,d,i.count*l),m=new It(_,l,g);if(i.sparse!==void 0){const p=fa.SCALAR,M=Hi[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,R=new M(a[1],x,i.sparse.count*p),w=new c(a[2],v,i.sparse.count*l);o!==null&&(m=new It(m.array.slice(),m.itemSize,m.normalized));for(let A=0,P=R.length;A<P;A++){const y=R[A];if(m.setX(y,w[A*l]),l>=2&&m.setY(y,w[A*l+1]),l>=3&&m.setZ(y,w[A*l+2]),l>=4&&m.setW(y,w[A*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,a=t.images[s];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){const i=this,s=this.json,a=s.textures[e],o=s.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(s.samplers||{})[a.sampler]||{};return h.magFilter=fc[d.magFilter]||Ht,h.minFilter=fc[d.minFilter]||ci,h.wrapS=pc[d.wrapS]||qn,h.wrapT=pc[d.wrapT]||qn,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=i.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const m=new St(_);m.needsUpdate=!0,d(m)}),t.load(_s.resolveURL(u,s.path),g,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),u.userData.mimeType=a.mimeType||nx(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[Xe.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[Xe.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=s.associations.get(a);a=s.extensions[Xe.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new io,an.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new Mh,an.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||s||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),s&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return hi}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let a;const o={},l=s.extensions||{},c=[];if(l[Xe.KHR_MATERIALS_UNLIT]){const u=i[Xe.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,s,t))}else{const u=s.pbrMetallicRoughness||{};if(o.color=new ue(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],bt),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,ot)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=Ot);const h=s.alphaMode||pa.OPAQUE;if(h===pa.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===pa.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==zt&&(c.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new ve(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;o.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&a!==zt&&(c.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==zt){const u=s.emissiveFactor;o.emissive=new ue().setRGB(u[0],u[1],u[2],bt)}return s.emissiveTexture!==void 0&&a!==zt&&c.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,ot)),Promise.all(c).then(function(){const u=new a(o);return s.name&&(u.name=s.name),kn(u,s),t.associations.set(u,{materials:e}),s.extensions&&Jn(i,u,s),u})}createUniqueName(e){const t=Ze.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[Xe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return mc(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],h=tx(c),u=i[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[Xe.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=mc(new wt,c,t),i[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],a=s.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const h=a[l].material===void 0?J_(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const _=h[f],m=a[f];let p;const M=c[f];if(m.mode===jt.TRIANGLES||m.mode===jt.TRIANGLE_STRIP||m.mode===jt.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new g0(_,M):new le(_,M),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===jt.TRIANGLE_STRIP?p.geometry=uc(p.geometry,Jc):m.mode===jt.TRIANGLE_FAN&&(p.geometry=uc(p.geometry,ba));else if(m.mode===jt.LINES)p=new y0(_,M);else if(m.mode===jt.LINE_STRIP)p=new no(_,M);else if(m.mode===jt.LINE_LOOP)p=new M0(_,M);else if(m.mode===jt.POINTS)p=new Sh(_,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&ex(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),kn(p,s),m.extensions&&Jn(i,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return s.extensions&&Jn(i,u[0],s),u[0];const d=new Ye;s.extensions&&Jn(i,d,s),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Lt(ni.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Mr(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),kn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),a=i,o=[],l=[];for(let c=0,h=a.length;c<h;c++){const u=a[c];if(u){o.push(u);const d=new He;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new to(o,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],g=i.samplers[f.sampler],_=f.target,m=_.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,M=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",M)),c.push(g),h.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],g=u[2],_=u[3],m=u[4],p=[];for(let M=0,x=d.length;M<x;M++){const v=d[M],R=f[M],w=g[M],A=_[M],P=m[M];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();const y=n._createAnimationTracks(v,R,w,A,P);if(y)for(let b=0;b<y.length;b++)p.push(y[b])}return new Pa(s,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const a=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),a=[],o=i.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(a),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,ix)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],a=s.name?i.createUniqueName(s.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(s.isBone===!0?h=new vh:c.length>1?h=new Ye:c.length===1?h=c[0]:h=new lt,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(s.name&&(h.userData.name=s.name,h.name=a),kn(h,s),s.extensions&&Jn(n,h,s),s.matrix!==void 0){const u=new He;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new Ye;n.name&&(s.name=i.createUniqueName(n.name)),kn(s,n),n.extensions&&Jn(t,s,n);const a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof an||d instanceof St)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const a=[],o=e.name?e.name:e.uuid,l=[];Nn[s.path]===Nn.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(Nn[s.path]){case Nn.weights:c=Yi;break;case Nn.rotation:c=ui;break;case Nn.position:case Nn.scale:c=Ki;break;default:switch(n.itemSize){case 1:c=Yi;break;case 2:case 3:default:c=Ki;break}break}const h=i.interpolation!==void 0?Z_[i.interpolation]:qi,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const g=new c(l[d]+"."+Nn[s.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Fa(t.constructor),i=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ui?K_:Ih;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function rx(r,e,t){const n=e.attributes,i=new ln;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new C(l[0],l[1],l[2]),new C(c[0],c[1],c[2])),o.normalized){const h=Fa(Hi[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const o=new C,l=new C;for(let c=0,h=s.length;c<h;c++){const u=s[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const _=Fa(Hi[d.componentType]);l.multiplyScalar(_)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}r.boundingBox=i;const a=new fn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=a}function mc(r,e,t){const n=e.attributes,i=[];function s(a,o){return t.getDependency("accessor",a).then(function(l){r.setAttribute(o,l)})}for(const a in n){const o=Ua[a]||a.toLowerCase();o in r.attributes||i.push(s(n[a],o))}if(e.indices!==void 0&&!r.index){const a=t.getDependency("accessor",e.indices).then(function(o){r.setIndex(o)});i.push(a)}return Ke.workingColorSpace!==bt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ke.workingColorSpace}" not supported.`),kn(r,e),rx(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?Q_(r,e.targets,t):r})}function ax(r){const e=new Map,t=new Map,n=r.clone();return Dh(r,n,function(i,s){e.set(s,i),t.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const s=i,a=e.get(i),o=a.skeleton.bones;s.skeleton=a.skeleton.clone(),s.bindMatrix.copy(a.bindMatrix),s.skeleton.bones=o.map(function(l){return t.get(l)}),s.bind(s.skeleton,s.bindMatrix)}),n}function Dh(r,e,t){t(r,e);for(let n=0;n<r.children.length;n++)Dh(r.children[n],e.children[n],t)}const ga="[HERO X]",Be={info(r,...e){console.info(`${ga} ${r}`,...e)},warn(r,...e){console.warn(`${ga} ${r}`,...e)},error(r,...e){console.error(`${ga} ${r}`,...e)}},Nh={player:null,enemies:{},bosses:{}};function ka(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function gc(r){return!ka(r)||typeof r.file!="string"||!r.file?null:{file:r.file,scale:typeof r.scale=="number"&&r.scale>0?r.scale:1,offsetY:typeof r.offsetY=="number"?r.offsetY:0,rotationY:typeof r.rotationY=="number"?r.rotationY:0}}function ox(r){if(!ka(r))return{...Nh,enemies:{},bosses:{}};const e={player:gc(r.player),enemies:{},bosses:{}};for(const[t,n]of[["enemies",e.enemies],["bosses",e.bosses]]){const i=r[t];if(ka(i))for(const[s,a]of Object.entries(i)){const o=gc(a);o&&(n[s]=o)}}return e}class lx{constructor(){this.models=new Map,this.manifest=Nh,this.loader=null,this.onPlayerReady=null}get loadedKeys(){return[...this.models.keys()]}has(e){return this.models.has(e)}async load(e){const t=e.endsWith("/")?e:e+"/";try{const i=await fetch(`${t}models/manifest.json`,{cache:"no-cache"});if(!i.ok){Be.warn(`models/manifest.json 을 읽지 못했습니다 (${i.status}). 임시 모델을 씁니다.`);return}this.manifest=ox(await i.json())}catch(i){Be.warn("models/manifest.json 을 읽지 못했습니다. 임시 모델을 씁니다.",i);return}const n=[];this.manifest.player&&n.push(this.loadOne("player",this.manifest.player,t));for(const[i,s]of Object.entries(this.manifest.enemies))s&&n.push(this.loadOne(`enemy:${i}`,s,t));for(const[i,s]of Object.entries(this.manifest.bosses))s&&n.push(this.loadOne(`boss:${i}`,s,t));await Promise.all(n)}async loadOne(e,t,n){this.loader??(this.loader=new T_);try{const i=await this.loader.loadAsync(`${n}models/${t.file}`);this.models.set(e,{gltf:i,entry:t}),Be.info(`모델 로드: ${e} ← ${t.file} (애니메이션 ${i.animations.length}개)`),e==="player"&&this.onPlayerReady?.()}catch(i){Be.warn(`모델 '${t.file}' 을(를) 읽지 못해 '${e}' 는 임시 모델을 씁니다.`,i)}}createPlayerModel(){const e=this.models.get("player");return e?cx(e):null}createEnemyModel(e,t){const n=this.models.get(e);return n?hx(n,t):null}}const ki=new lx;function Uh(r,e){const t=ax(r.gltf.scene),n=new Ye;n.add(t),t.traverse(l=>{const c=l;c.isMesh&&(c.castShadow=!0,c.receiveShadow=!1)});let i=r.entry.scale??1;if(e){const l=new ln().setFromObject(t),c=l.max.y-l.min.y;c>1e-6&&(i*=e/c)}t.scale.setScalar(i);const s=new ln().setFromObject(t);t.position.y=-s.min.y+(r.entry.offsetY??0),t.rotation.y=(r.entry.rotationY??0)*Math.PI/180;const a=r.gltf.animations,o=a.length>0?new e_(t):null;return{root:n,mixer:o,clips:a}}function zn(r,...e){for(const t of e){const n=r.find(i=>i.name.toLowerCase().includes(t));if(n)return n}return null}function Fh(r){r.traverse(e=>{const t=e;t.isMesh&&(t.geometry.dispose(),(Array.isArray(t.material)?t.material:[t.material]).forEach(i=>i.dispose()))})}function cx(r){const{root:e,mixer:t,clips:n}=Uh(r,1.9);e.name="GltfHero";const i={idle:zn(n,"idle","stand"),walk:zn(n,"run","walk"),attack:zn(n,"attack","slash","punch"),jump:zn(n,"jump"),die:zn(n,"die","death","dead")};let s=null;const a=(l,c=!0)=>{if(!t||!l)return;const h=t.clipAction(l);s!==h&&(h.reset(),h.setLoop(c?Zc:Kc,1/0),h.clampWhenFinished=!c,h.fadeIn(.12).play(),s?.fadeOut(.12),s=h)};let o=0;return{root:e,update(l,c){o+=l,t?(c.dead?a(i.die??i.idle,!1):c.attack!==null&&i.attack?a(i.attack,!1):c.airborne&&i.jump?a(i.jump,!1):c.moving?a(i.walk??i.idle):a(i.idle),t.update(l)):(e.rotation.z=c.moving?Math.sin(o*10)*.05:0,e.rotation.x=c.attack!==null?-.25*Math.sin(c.attack*Math.PI):0,e.scale.setScalar(c.dead?.6:1))},dispose(){t?.stopAllAction(),Fh(e)}}}function hx(r,e){const{root:t,mixer:n,clips:i}=Uh(r,e);t.name="GltfEnemy";const s=zn(i,"run","walk"),a=zn(i,"idle"),o=zn(i,"attack");let l=null;const c=f=>{if(!n||!f)return;const g=n.clipAction(f);l!==g&&(g.reset().fadeIn(.1).play(),l?.fadeOut(.1),l=g)},h=[];t.traverse(f=>{const g=f;if(g.isMesh){const _=Array.isArray(g.material)?g.material:[g.material];for(const m of _)m.emissive&&h.push(m)}});let u=0,d=0;return{root:t,update(f,g){if(d+=f,g.state==="dead"){const _=Math.max(0,1-g.death);t.scale.setScalar(_),t.position.y=-(1-_)*.5;return}if(n?(g.state==="windup"&&o?c(o):g.moving?c(s??a):c(a??s),n.update(f)):(t.position.y=g.moving?Math.abs(Math.sin(d*8))*.06:0,t.rotation.x=g.state==="windup"?-.2*g.windup:0),u>0){u-=f;for(const _ of h)_.emissive.setScalar(u>0?.8:0)}},flash(){u=.09;for(const f of h)f.emissive.setScalar(.8)},dispose(){n?.stopAllAction(),Fh(t)}}}class ux{constructor(){this.state="idle",this.pattern=null,this.timer=0,this.total=0,this.cooldown=0,this.closeIndex=-1,this.chargeDir={x:0,z:1}}update(e,t,n,i,s){const a=s?i.phase2TimeMul:1,o=n.x-t.x,l=n.z-t.z,c=Math.hypot(o,l),h=c>1e-6?{x:o/c,z:l/c}:{x:0,z:1},u={x:0,z:0};this.cooldown>0&&(this.cooldown=Math.max(0,this.cooldown-e));const d={state:this.state,move:u,execute:null,windupPattern:null,windupProgress:0};switch(this.state){case"dead":return d;case"idle":return this.state="chase",{...d,state:this.state};case"chase":{if(this.cooldown<=0&&c<=i.engageRange){if(c>i.chargeMinRange&&i.useCharge!==!1)this.pattern="charge";else{const f=i.closePatterns&&i.closePatterns.length>0?i.closePatterns:["slam","barrage"];this.closeIndex=(this.closeIndex+1)%f.length,this.pattern=f[this.closeIndex]}return this.state="windup",this.timer=this.total=i.windup[this.pattern]*a,this.chargeDir=h,{...d,state:this.state,windupPattern:this.pattern,windupProgress:0}}return{...d,state:this.state,move:c>2.5?h:u}}case"windup":{this.timer-=e,this.chargeDir=h;const f=this.total>0?1-Math.max(0,this.timer)/this.total:1;if(this.timer>0)return{...d,state:this.state,windupPattern:this.pattern,windupProgress:f};const g=this.pattern;return g==="charge"?(this.state="charge",this.timer=i.chargeDuration,{...d,state:this.state,move:this.chargeDir,execute:"charge"}):(this.state="recover",this.timer=i.recover*a,{...d,state:this.state,execute:g})}case"charge":return this.timer-=e,this.timer>0?{...d,state:this.state,move:this.chargeDir}:(this.state="recover",this.timer=i.recover*a,{...d,state:this.state});case"recover":return this.timer-=e,this.timer>0?{...d,state:this.state}:(this.state="chase",this.cooldown=i.cooldown*a,{...d,state:this.state})}}stopCharge(){this.state==="charge"&&(this.timer=0)}kill(){this.state="dead"}}class kh{constructor(e,t=0){this.maxHp=e,this.invulnerableTime=t,this.invulnerable=0,this.hp=e}get isDead(){return this.hp<=0}get ratio(){return this.maxHp>0?Math.max(0,Math.min(1,this.hp/this.maxHp)):0}takeDamage(e){return this.isDead||this.invulnerable>0||e<=0?!1:(this.hp=Math.max(0,this.hp-e),this.invulnerable=this.invulnerableTime,!0)}heal(e){this.isDead||e<=0||(this.hp=Math.min(this.maxHp,this.hp+e))}reset(e=this.maxHp){this.maxHp=e,this.hp=e,this.invulnerable=0}update(e){this.invulnerable>0&&(this.invulnerable=Math.max(0,this.invulnerable-e))}}class dx{constructor(){this.state="idle",this.cooldown=0,this.windup=0,this.windupTotal=0,this.hurtTimer=0}get windupProgress(){return this.state==="windup"&&this.windupTotal>0?1-this.windup/this.windupTotal:0}update(e,t,n,i){const s=n.x-t.x,a=n.z-t.z,o=Math.hypot(s,a),l=o>1e-6?{x:s/o,z:a/o}:{x:0,z:0};this.cooldown>0&&(this.cooldown=Math.max(0,this.cooldown-e));const c={x:0,z:0},h=i.attackKind==="ranged";switch(this.state){case"dead":return{move:c,attackNow:!1,state:this.state};case"hurt":return this.hurtTimer-=e,this.hurtTimer<=0&&(this.state="chase"),{move:c,attackNow:!1,state:this.state};case"idle":return o<=i.aggroRange&&(this.state="chase"),{move:c,attackNow:!1,state:this.state};case"chase":return o>i.aggroRange*1.5?(this.state="idle",{move:c,attackNow:!1,state:this.state}):h&&i.retreatRange!==void 0&&o<i.retreatRange?{move:{x:-l.x,z:-l.z},attackNow:!1,state:this.state}:o<=i.attackRange&&this.cooldown<=0?(this.state="windup",this.windup=this.windupTotal=i.attackWindup,{move:c,attackNow:!1,state:this.state}):{move:o<=i.attackRange?c:l,attackNow:!1,state:this.state};case"windup":{if(this.windup-=e,this.windup>0)return{move:c,attackNow:!1,state:this.state};this.cooldown=i.attackCooldown,this.state="chase";const u=h?i.attackRange*1.3:i.attackRange+.4;return{move:c,attackNow:o<=u,state:this.state}}}}onHurt(e=.15){this.state!=="dead"&&(this.state="hurt",this.hurtTimer=e)}kill(){this.state="dead"}}function fx(r,e){const t=ki.createEnemyModel(`enemy:${r}`,e.radius*2.8);if(t)return t;switch(e.model??r){case"tank":return px(e);case"shooter":return mx(e);case"rusher":default:return gx(e)}}function px(r){const e=new Ye;e.name=`Enemy-${r.name}`;const t=r.radius,n=Pe({color:new ue(r.color)}),i=Pe({color:2764605}),s=Pe({color:10134450}),a=on(16765503,2.2),o=new le(new je(t*1.7,t*1.5,t*1.4),n);o.position.y=t*1.1,o.castShadow=!0,e.add(o);for(const d of[-1,1]){const f=new le(new je(t*.5,t*.6,t*1.7),i);f.position.set(d*t*.85,t*.3,0),f.castShadow=!0,e.add(f);const g=new le(new mt(t*.13,8,6),a);g.position.set(d*t*.35,t*1.5,t*.72),e.add(g)}const l=new Ye;l.position.set(0,t*1.7,t*.6);const c=new le(new je(t*1.9,t*1.6,t*.2),s);c.position.set(0,-t*.7,t*.3),c.castShadow=!0,l.add(c),e.add(l);let h=0,u=Math.random()*10;return{root:e,update(d,f){if(u+=d,f.state==="dead"){const g=Math.max(0,1-f.death);e.scale.setScalar(g),e.position.y=-(1-g)*t,e.rotation.y+=d*6;return}o.position.y=t*1.1+(f.moving?Math.abs(Math.sin(u*8))*.04:0),l.rotation.x=-f.windup*1.3,a.color.setRGB(1,.82-f.windup*.6,.25-f.windup*.2),h>0&&(h-=d,n.emissive.setScalar(h>0?.9:0))},flash(){h=.09,n.emissive.setScalar(.9)},dispose(){e.traverse(d=>{const f=d;if(f.isMesh){f.geometry.dispose();const g=f.material;Array.isArray(g)?g.forEach(_=>_.dispose()):g.dispose()}})}}}function mx(r){const e=new Ye;e.name=`Enemy-${r.name}`;const t=r.radius,n=Pe({color:new ue(r.color),flatShading:!0,roughness:.5,metalness:.5}),i=Pe({color:2764605}),s=on(16733559,2.5),a=new Ye;e.add(a);const o=new le(new bn(t*.9,1),n);o.position.y=t*1.6,o.castShadow=!0,a.add(o);const l=new le(new ro(t*1.1,t*.12,8,20),i);l.position.y=t*1.6,l.rotation.x=Math.PI/2,a.add(l);const c=new le(new Et(t*.16,t*.2,t*1,10),i);c.rotation.x=Math.PI/2,c.position.set(0,t*1.6,t*1.1),a.add(c);const h=new le(new mt(t*.2,8,6),s);h.position.set(0,t*1.6,t*1.6),a.add(h);let u=0,d=Math.random()*10;return{root:e,update(f,g){if(d+=f,g.state==="dead"){const _=Math.max(0,1-g.death);e.scale.setScalar(_),e.position.y=-(1-_)*t,e.rotation.y+=f*8;return}a.position.y=Math.sin(d*3)*.08,l.rotation.z+=f*2,h.scale.setScalar(1+g.windup*1.5),s.color.setRGB(1,.33+g.windup*.6,.47+g.windup*.5),u>0&&(u-=f,n.emissive.setScalar(u>0?.9:0))},flash(){u=.09,n.emissive.setScalar(.9)},dispose(){e.traverse(f=>{const g=f;if(g.isMesh){g.geometry.dispose();const _=g.material;Array.isArray(_)?_.forEach(m=>m.dispose()):_.dispose()}})}}}function gx(r){const e=new Ye;e.name=`Enemy-${r.name}`;const t=r.radius,n=Pe({color:new ue(r.color)}),i=Pe({color:2764605}),s=Pe({color:16777215}),a=Pe({color:1710626,roughness:.3}),o=new le(new je(t*1.6,t*1.4,t*1.6),n);o.position.y=t*1.1,o.castShadow=!0,e.add(o);const l=new le(new je(t*1.9,t*.5,t*1.9),i);l.position.y=t*.25,l.castShadow=!0,e.add(l);const c=new le(new mt(t*.32,12,10),s);c.position.set(0,t*1.35,t*.75),e.add(c);const h=new le(new mt(t*.16,10,8),a);h.position.set(0,t*1.35,t*1),e.add(h);const u=new le(new Et(.03,.03,t*.8,6),i);u.position.set(0,t*2.1,0),e.add(u);const d=new le(new mt(.08,8,6),on(r.color,2.5));d.position.set(0,t*2.5,0),e.add(d);let f=0,g=Math.random()*10;return{root:e,update(_,m){if(g+=_,m.state==="dead"){const M=Math.max(0,1-m.death);e.scale.setScalar(M),e.position.y=-(1-M)*t,e.rotation.y+=_*8;return}o.position.y=t*1.1+(m.moving?Math.abs(Math.sin(g*14))*.06:0);const p=m.windup;h.scale.setScalar(1+p*1.2),h.material.emissive.setRGB(.1+p*.9,.1,.13),o.rotation.x=-p*.35,f>0&&(f-=_,n.emissive.setScalar(f>0?.9:0))},flash(){f=.09,n.emissive.setScalar(.9)},dispose(){e.traverse(_=>{const m=_;if(m.isMesh){m.geometry.dispose();const p=m.material;Array.isArray(p)?p.forEach(M=>M.dispose()):p.dispose()}})}}}class Oh{constructor(e,t,n,i={hp:1,speed:1},s=fx){this.type=e,this.mul=i,this.object3d=new Ye,this.ai=new dx,this.facing=0,this.knock={x:0,z:0},this.deathTimer=0,this.def=t,this.health=new kh(Math.max(1,Math.round(t.hp*i.hp)),0),this.model=s(e,t),this.object3d.name=`Enemy-${e}`,this.object3d.add(this.model.root),this.object3d.position.set(n.x,0,n.z),this.facing=Math.random()*Math.PI*2,this.object3d.rotation.y=this.facing}get position(){return this.object3d.position}get radius(){return this.def.radius}get alive(){return!this.health.isDead}get removable(){return this.health.isDead&&this.deathTimer>=W.enemies.deathDuration}hit(e,t,n){if(!this.health.takeDamage(e))return!1;const i=this.def.knockbackResist??1;return this.knock.x+=t.x*n*i,this.knock.z+=t.z*n*i,this.model.flash(),this.health.isDead?this.ai.kill():this.onHurtEffect(),!0}onHurtEffect(){this.ai.onHurt()}update(e,t){if(this.health.isDead){this.deathTimer+=e,this.model.update(e,{state:"dead",moving:!1,windup:0,death:Math.min(1,this.deathTimer/Math.max(.01,W.enemies.deathDuration))});return}const n=this.object3d.position,i={x:n.x,z:n.z},s=this.ai.update(e,i,t.playerPos,this.def);let a={x:n.x+s.move.x*this.def.speed*this.mul.speed*e+this.knock.x*e,z:n.z+s.move.z*this.def.speed*this.mul.speed*e+this.knock.z*e};const o=Math.exp(-8*e);this.knock.x*=o,this.knock.z*=o;const l=W.enemies.separation;for(const h of t.others){if(h===this||!h.alive)continue;const u=a.x-h.position.x,d=a.z-h.position.z,f=this.radius+h.radius+.2,g=u*u+d*d;if(g<f*f&&g>1e-6){const _=Math.sqrt(g),m=(1-_/f)*l*e;a={x:a.x+u/_*m,z:a.z+d/_*m}}}if(a=co(a,this.radius,t.world.getObstacleBoxes()),a=ho(a,t.world.getArenaHalfSize(),this.radius),n.x=a.x,n.z=a.z,s.state==="chase"||s.state==="windup"){const h=wr({x:t.playerPos.x-n.x,z:t.playerPos.z-n.z});this.facing=uo(this.facing,h,1-Math.exp(-10*e))}this.object3d.rotation.y=this.facing,s.attackNow&&t.onAttackPlayer(this,this.def.damage);const c=s.move.x!==0||s.move.z!==0;this.model.update(e,{state:s.state,moving:c,windup:this.ai.windupProgress,death:0})}dispose(){this.object3d.removeFromParent(),this.model.dispose()}}function _x(r=W.boss){return{name:r.name,hp:r.hp,speed:r.speed,radius:r.radius,damage:r.contactDamage,attackRange:r.engageRange,attackWindup:r.windup.slam,attackCooldown:r.cooldown,aggroRange:999,color:r.color,score:r.score,knockbackResist:r.knockbackResist}}class xx extends Oh{constructor(e,t,n=W.boss){super("boss",_x(n),e,t,(i,s)=>vx(s,n.model)),this.cfg=n,this.bossAI=new ux,this.chargeHit=!1}get phase2(){return this.health.ratio<=this.cfg.phase2Ratio}hit(e,t,n){const i=super.hit(e,t,n);return i&&this.health.isDead&&this.bossAI.kill(),i}onHurtEffect(){}update(e,t){const n=t;if(this.health.isDead){this.deathTimer+=e,this.model.update(e,{state:"dead",moving:!1,windup:0,death:Math.min(1,this.deathTimer/Math.max(.01,W.enemies.deathDuration))});return}const i=this.cfg,s=this.object3d.position,a={x:s.x,z:s.z},o=this.bossAI.update(e,a,t.playerPos,i,this.phase2),l=this.phase2?i.phase2SpeedMul:1,c=o.state==="charge"?i.charge.speed:this.def.speed*this.mul.speed*l;let h={x:s.x+o.move.x*c*e+this.knock.x*e,z:s.z+o.move.z*c*e+this.knock.z*e};const u=Math.exp(-8*e);this.knock.x*=u,this.knock.z*=u,h=co(h,this.radius,t.world.getObstacleBoxes()),h=ho(h,t.world.getArenaHalfSize(),this.radius),o.state==="charge"&&Math.hypot(h.x-s.x,h.z-s.z)<c*e*.3&&this.bossAI.stopCharge(),s.x=h.x,s.z=h.z;const d=o.state==="charge"?o.move:{x:t.playerPos.x-s.x,z:t.playerPos.z-s.z};(d.x!==0||d.z!==0)&&(this.facing=uo(this.facing,wr(d),1-Math.exp(-(o.state==="charge"?30:6)*e))),this.object3d.rotation.y=this.facing,o.execute==="charge"&&(this.chargeHit=!1),o.execute==="slam"&&n.onBossAttack(this,{kind:"slam",radius:i.slam.radius,damage:i.slam.damage}),o.execute==="barrage"&&n.onBossAttack(this,{kind:"barrage",count:this.phase2?i.barrage.phase2Count:i.barrage.count,aimed:this.phase2,damage:i.barrage.damage,speed:i.barrage.speed}),o.execute==="summon"&&n.onBossAttack(this,{kind:"summon",type:i.summon.type,count:this.phase2?i.summon.phase2Count:i.summon.count,maxAlive:i.summon.maxAlive}),o.execute==="mortar"&&n.onBossAttack(this,{kind:"mortar",count:this.phase2?i.mortar.phase2Count:i.mortar.count,delay:i.mortar.delay,radius:i.mortar.radius,damage:i.mortar.damage,spread:i.mortar.spread}),o.state==="charge"&&!this.chargeHit&&Math.hypot(t.playerPos.x-s.x,t.playerPos.z-s.z)<this.radius+n.playerRadius&&(this.chargeHit=!0,n.onBossAttack(this,{kind:"contact",damage:i.contactDamage}));const f=o.move.x!==0||o.move.z!==0,g={state:o.state==="windup"?"windup":o.state==="dead"?"dead":"chase",moving:f,windup:o.windupProgress,death:0,pattern:o.windupPattern??(o.state==="charge"?"charge":null),phase2:this.phase2};this.model.update(e,g)}}function vx(r,e="guardian"){const t=ki.createEnemyModel(`boss:${e}`,r.radius*3);if(t)return t;const n=new Ye;n.name=`Boss-${r.name}`;const i=r.radius,s=Pe({color:new ue(r.color)}),a=Pe({color:e==="commander"?3816516:2764605}),o=Pe({color:e==="golem"?9431295:e==="commander"?11548975:16765503}),l=on(6091480,2.5),c=new zt({color:16777215,transparent:!0,opacity:0}),h=e==="golem"?new br(i*.95,0):e==="commander"?new je(i*1.9,i*1.2,i*1.3):new je(i*1.5,i*1.3,i*1.2),u=new le(h,s);u.position.y=i*1.3,u.castShadow=!0,n.add(u);const d=new le(new je(i*1.3,i*.6,i*1),a);d.position.y=i*.35,d.castShadow=!0,n.add(d);const f=e==="golem"?new bn(i*.42,0):new je(i*.8,i*.6,i*.8),g=new le(f,s);g.position.y=i*2.3,g.castShadow=!0,n.add(g);for(const v of[-1,1]){const R=new le(new mt(i*.1,8,6),l);if(R.position.set(v*i*.2,i*2.35,i*.42),n.add(R),e==="golem"){const w=new le(new Hn(i*.22,i*.9,5),o);w.position.set(v*i*.6,i*2.2,-i*.3),w.rotation.z=-v*.5,n.add(w)}else if(e==="commander"){const w=new le(new Et(i*.16,i*.2,i*.9,8),a);w.position.set(v*i*.75,i*2.2,i*.2),w.rotation.x=Math.PI/2-.35,n.add(w)}else{const w=new le(new Hn(i*.12,i*.4,5),o);w.position.set(v*i*.25,i*2.75,0),n.add(w)}}if(e==="guardian"){const v=new le(new Hn(i*.16,i*.5,5),o);v.position.y=i*2.85,n.add(v)}if(e==="golem")for(let v=0;v<5;v++){const R=new le(new Hn(i*.12,i*.5+v%2*i*.2,4),o),w=v/5*Math.PI*2;R.position.set(Math.cos(w)*i*.8,i*1.5+Math.sin(v)*i*.2,Math.sin(w)*i*.8),R.rotation.set(Math.sin(w)*.9,0,-Math.cos(w)*.9),n.add(R)}const _=[];for(const v of[-1,1]){const R=new Ye;R.position.set(v*i*(e==="commander"?1.15:.95),i*1.8,0);const w=new le(new je(i*.3,i*1.1,i*.3),a);w.position.y=-i*.55,w.castShadow=!0,R.add(w);const A=e==="golem"?new mt(i*.34,8,6):e==="commander"?new Et(i*.18,i*.24,i*.9,8):new je(i*.55,i*.4,i*.55),P=new le(A,e==="commander"?a:o);P.position.y=-i*1.2,P.castShadow=!0,R.add(P),n.add(R),_.push(R)}const m=new le(new ai(i*.9,i*1.1,32),c);m.rotation.x=-Math.PI/2,m.position.y=.06,n.add(m);let p=0,M=0;const x={charge:16742981,slam:16732025,barrage:11561983,summon:9431295,mortar:16757071};return{root:n,update(v,R){const w=R;if(M+=v,w.state==="dead"){const b=Math.max(0,1-w.death);n.scale.setScalar(b),n.position.y=-(1-b)*i,n.rotation.y+=v*3;return}l.color.set(w.phase2?16726843:6091480),u.position.y=i*1.3+(w.moving?Math.abs(Math.sin(M*6))*.08:0);const A=w.windup,P=w.pattern??null;c.opacity=P&&w.state==="windup"?.25+A*.55:P==="charge"?.5:0,P&&c.color.set(x[P]),m.scale.setScalar(P==="slam"?1+A*1.6:1);const y=P==="slam"?-2.6*A:P==="charge"?-1.2:P==="barrage"?-1.6*A:P==="summon"?-3*A:P==="mortar"?-1.4:0;for(const b of _)b.rotation.x+=(y-b.rotation.x)*(1-Math.exp(-12*v));u.rotation.x=P==="charge"?.25:P==="slam"?-.15*A:0,p>0&&(p-=v,s.emissive.setScalar(p>0?.9:0))},flash(){p=.09,s.emissive.setScalar(.9)},dispose(){n.traverse(v=>{const R=v;if(R.isMesh){R.geometry.dispose();const w=R.material;Array.isArray(w)?w.forEach(A=>A.dispose()):w.dispose()}})}}}class yx{constructor(e){this.scene=e,this.enemies=[],this.multipliers={hp:1,speed:1}}spawnFromConfig(e=W.enemies.spawns){for(const t of e){if(!W.enemies.types[t.type]){Be.warn(`적 종류 '${t.type}' 이(가) GameConfig.enemies.types 에 없어 배치를 건너뜁니다.`);continue}this.spawn(t.type,t.x,t.z)}}spawn(e,t,n){const i=W.enemies.types[e];if(!i)return null;const s=new Oh(e,i,{x:t,z:n},{...this.multipliers});return this.scene.add(s.object3d),this.enemies.push(s),s}addEnemy(e){this.scene.add(e.object3d),this.enemies.push(e)}getEnemies(){return this.enemies}get aliveCount(){return this.enemies.reduce((e,t)=>e+(t.alive?1:0),0)}update(e,t){const n={...t,others:this.enemies};for(const i of this.enemies)i.update(e,n);for(let i=this.enemies.length-1;i>=0;i--)this.enemies[i].removable&&(this.enemies[i].dispose(),this.enemies.splice(i,1))}clear(){this.enemies.forEach(e=>e.dispose()),this.enemies.length=0}dispose(){this.clear()}}function _c(r){const e=r;if(!e||!e.tagName)return!1;const t=e.tagName.toUpperCase();return t==="INPUT"||t==="TEXTAREA"||t==="SELECT"||e.isContentEditable===!0}class Mx{constructor(){this.pressed=new Set,this.pressHandlers=new Map,this.pointer={x:0,y:0,has:!1},this.cleanup=[],this.virtualAxis={x:0,z:0}}attach(e=window,t){const n=u=>{_c(u.target)||(u.repeat||this.press(u.code),this.isGameKey(u.code)&&u.preventDefault())},i=u=>{this.pressed.delete(u.code)},s=()=>this.pressed.clear(),a=()=>{document.hidden&&s()},o=u=>{if(u.pointerType==="touch")return;const d=t?t.getBoundingClientRect():{left:0,top:0,width:window.innerWidth,height:window.innerHeight};this.pointer.x=(u.clientX-d.left)/d.width*2-1,this.pointer.y=-((u.clientY-d.top)/d.height)*2+1,this.pointer.has=!0},l=u=>{_c(u.target)||u.pointerType==="touch"||(o(u),this.press(`Mouse${u.button}`))},c=u=>{u.pointerType!=="touch"&&this.pressed.delete(`Mouse${u.button}`)},h=u=>u.preventDefault();e.addEventListener("keydown",n),e.addEventListener("keyup",i),e.addEventListener("blur",s),e.addEventListener("pointermove",o),e.addEventListener("pointerdown",l),e.addEventListener("pointerup",c),e.addEventListener("pointercancel",c),document.addEventListener("visibilitychange",a),t?.addEventListener("contextmenu",h),this.cleanup=[()=>e.removeEventListener("keydown",n),()=>e.removeEventListener("keyup",i),()=>e.removeEventListener("blur",s),()=>e.removeEventListener("pointermove",o),()=>e.removeEventListener("pointerdown",l),()=>e.removeEventListener("pointerup",c),()=>e.removeEventListener("pointercancel",c),()=>document.removeEventListener("visibilitychange",a),()=>t?.removeEventListener("contextmenu",h)]}detach(){this.cleanup.forEach(e=>e()),this.cleanup=[],this.pressed.clear()}onPress(e,t){for(const n of e){const i=this.pressHandlers.get(n)??[];i.push(t),this.pressHandlers.set(n,i)}}isDown(e){return this.pressed.has(e)}isActionDown(e){return e.some(t=>this.pressed.has(t))}getPointer(){return this.pointer}getPressedCodes(){return[...this.pressed]}getMoveAxis(){const e=W.controls,t={x:(this.isActionDown(e.right)?1:0)-(this.isActionDown(e.left)?1:0),z:(this.isActionDown(e.down)?1:0)-(this.isActionDown(e.up)?1:0)};return t.x===0&&t.z===0?{x:this.virtualAxis.x,z:this.virtualAxis.z}:t}setVirtualAxis(e,t){const n=Math.hypot(e,t),i=n>1?1/n:1;this.virtualAxis.x=e*i,this.virtualAxis.z=t*i}pressVirtual(e){!e||this.pressed.has(e)||this.press(e)}releaseVirtual(e){this.pressed.delete(e)}press(e){this.pressed.add(e),this.pressHandlers.get(e)?.forEach(t=>t())}isGameKey(e){return Object.values(W.controls).some(t=>t.includes(e))}}function xc(r,e){try{r.setPointerCapture(e)}catch{}}class Sx{constructor(e,t,n,i){this.input=t,this.stickPointer=null,this.stickCenter={x:0,y:0},this.radius=56,this.floating=!0;const s=W.controls;this.el=document.createElement("div"),this.el.className="touch",this.el.hidden=!0,this.el.innerHTML=`
      <div class="touch-zone" id="touch-zone" aria-hidden="true"></div>
      <div class="touch-stick" id="touch-stick" aria-label="이동 조이스틱"><div class="touch-knob"></div></div>
      <div class="touch-buttons">
        <button type="button" class="touch-btn touch-melee" data-code="${s.attackMelee[1]??s.attackMelee[0]}" aria-label="근접 공격">근접</button>
        <button type="button" class="touch-btn touch-ranged" data-code="${s.attackRanged[1]??s.attackRanged[0]}" aria-label="원거리 공격">원거리</button>
        <button type="button" class="touch-btn touch-jump" data-code="${s.jump[0]}" aria-label="점프">점프</button>
        <button type="button" class="touch-btn touch-dodge" id="touch-dodge" data-code="${s.dodge[0]}" aria-label="회피">회피</button>
        <button type="button" class="touch-btn touch-interact" id="touch-interact" data-code="${s.interact[0]}" aria-label="상자 열기" hidden>열기</button>
      </div>
      <div class="rotate-hint">휴대폰을 가로로 돌리면 더 넓게 보입니다</div>
      <div class="touch-top">
        <button type="button" class="touch-small" id="touch-inventory" aria-label="장비">장비</button>
        <button type="button" class="touch-small" id="touch-menu" aria-label="메뉴">메뉴</button>
      </div>`,e.appendChild(this.el),this.stick=this.el.querySelector("#touch-stick"),this.knob=this.stick.querySelector(".touch-knob"),this.zone=this.el.querySelector("#touch-zone"),this.interactBtn=this.el.querySelector("#touch-interact");const a=(c,h,u)=>{this.stickPointer===null&&(h.preventDefault(),this.stickPointer=h.pointerId,xc(c,h.pointerId),this.stickCenter=u,this.moveStick(h.clientX,h.clientY))},o=c=>{c.pointerId===this.stickPointer&&(c.preventDefault(),this.moveStick(c.clientX,c.clientY))},l=c=>{c.pointerId===this.stickPointer&&(this.stickPointer=null,this.knob.style.transform="translate(0px, 0px)",this.input.setVirtualAxis(0,0),this.floating&&this.stick.classList.remove("active"))};this.stick.addEventListener("pointerdown",c=>{const h=this.stick.getBoundingClientRect();a(this.stick,c,{x:h.left+h.width/2,y:h.top+h.height/2})}),this.stick.addEventListener("pointermove",o),this.stick.addEventListener("pointerup",l),this.stick.addEventListener("pointercancel",l),this.zone.addEventListener("pointerdown",c=>{!this.floating||this.stickPointer!==null||(this.placeStick(c.clientX,c.clientY),this.stick.classList.add("active"),a(this.zone,c,{x:c.clientX,y:c.clientY}))}),this.zone.addEventListener("pointermove",o),this.zone.addEventListener("pointerup",l),this.zone.addEventListener("pointercancel",l),this.el.querySelectorAll(".touch-btn").forEach(c=>{const h=c.dataset.code??"",u=f=>{f.preventDefault(),xc(c,f.pointerId),c.classList.add("down"),this.input.pressVirtual(h)},d=()=>{c.classList.remove("down"),this.input.releaseVirtual(h)};c.addEventListener("pointerdown",u),c.addEventListener("pointerup",d),c.addEventListener("pointercancel",d),c.addEventListener("contextmenu",f=>f.preventDefault())}),this.setFloating(!0),this.el.querySelector("#touch-menu")?.addEventListener("click",n),this.el.querySelector("#touch-inventory")?.addEventListener("click",i),this.el.addEventListener("contextmenu",c=>c.preventDefault())}placeStick(e,t){const n=this.el.getBoundingClientRect(),i=this.stick.offsetWidth/2||68;this.stick.style.left=`${e-n.left-i}px`,this.stick.style.top=`${t-n.top-i}px`,this.stick.style.bottom="auto"}setFloating(e){this.floating=e,this.el.classList.toggle("floating",e),this.stick.classList.remove("active"),this.stick.style.left="",this.stick.style.top="",this.stick.style.bottom=""}get isFloating(){return this.floating}moveStick(e,t){let n=e-this.stickCenter.x,i=t-this.stickCenter.y;const s=Math.hypot(n,i);s>this.radius&&(n=n/s*this.radius,i=i/s*this.radius),this.knob.style.transform=`translate(${n}px, ${i}px)`;const a=.15,o=Math.abs(n/this.radius)<a?0:n/this.radius,l=Math.abs(i/this.radius)<a?0:i/this.radius;this.input.setVirtualAxis(o,l)}get visible(){return!this.el.hidden}setLeftHanded(e){this.el.classList.toggle("lefty",e)}setButtonScale(e){this.el.style.setProperty("--touch-scale",String(e))}setDodgeCooldown(e){const t=this.el.querySelector("#touch-dodge");t&&(t.style.opacity=e>0?String(.35+(1-e)*.3):"",t.classList.toggle("cooling",e>0))}setInteract(e){this.interactBtn.hidden=!e}show(){this.el.hidden=!1}hide(){this.el.hidden=!0,this.stickPointer=null,this.stick.classList.remove("active"),this.knob.style.transform="translate(0px, 0px)",this.input.setVirtualAxis(0,0),this.el.querySelectorAll(".touch-btn").forEach(e=>{e.classList.remove("down"),this.input.releaseVirtual(e.dataset.code??"")})}}const fi=["melee","ranged","armor","trinket1","trinket2"],vc={melee:"근접 무기",ranged:"원거리 무기",armor:"방어구",trinket1:"장신구 1",trinket2:"장신구 2"};function zh(r){return r==="trinket"?["trinket1","trinket2"]:[r]}class bx{constructor(){this.inventory=[],this.equipped={melee:null,ranged:null,armor:null,trinket1:null,trinket2:null}}add(e){return this.inventory.length>=W.equipment.inventorySize?!1:(this.inventory.push(e),!0)}get isFull(){return this.inventory.length>=W.equipment.inventorySize}discard(e){const t=this.inventory.findIndex(n=>n.uid===e);return t<0?!1:(this.inventory.splice(t,1),!0)}targetSlot(e){const t=zh(e.category);return t.find(n=>this.equipped[n]===null)??t[0]}equip(e){const t=this.inventory.findIndex(a=>a.uid===e);if(t<0)return null;const n=this.inventory[t],i=this.targetSlot(n);this.inventory.splice(t,1);const s=this.equipped[i];return this.equipped[i]=n,s&&this.inventory.push(s),i}unequip(e){const t=this.equipped[e];return!t||this.isFull?!1:(this.equipped[e]=null,this.inventory.push(t),!0)}totals(){const e={attack:0,defense:0,maxHp:0,moveSpeed:0};for(const t of fi){const n=this.equipped[t];n&&(e.attack+=n.stats.attack,e.defense+=n.stats.defense,e.maxHp+=n.stats.maxHp,e.moveSpeed+=n.stats.moveSpeed)}return e}weaponAttack(e){return this.equipped[e]?.stats.attack??0}compare(e){const t=this.equipped[this.targetSlot(e)];return{attack:e.stats.attack-(t?.stats.attack??0),defense:e.stats.defense-(t?.stats.defense??0),maxHp:e.stats.maxHp-(t?.stats.maxHp??0),moveSpeed:Math.round((e.stats.moveSpeed-(t?.stats.moveSpeed??0))*100)/100}}reset(){this.inventory.length=0;for(const e of fi)this.equipped[e]=null}}function Ex(r,e){if(r<=0)return 0;const t=W.equipment.defenseScale;return Math.max(1,Math.round(r*(t/(t+Math.max(0,e)))))}const oi=[{id:"sword_basic",name:"에너지 검",category:"melee",base:{attack:4},description:"기본형 에너지 검. 가볍고 다루기 쉽다."},{id:"axe_heavy",name:"플라즈마 도끼",category:"melee",base:{attack:7,moveSpeed:-.05},description:"무겁지만 한 방이 세다. 이동이 조금 느려진다."},{id:"hammer_pulse",name:"펄스 망치",category:"melee",base:{attack:9,moveSpeed:-.1},description:"충격파를 내는 망치. 느리지만 강력하다."},{id:"blaster_basic",name:"소형 블래스터",category:"ranged",base:{attack:3},description:"빠르게 쏠 수 있는 기본 블래스터."},{id:"bow_photon",name:"광자 활",category:"ranged",base:{attack:5},description:"빛의 화살을 쏘는 활."},{id:"cannon_arc",name:"아크 캐논",category:"ranged",base:{attack:8,moveSpeed:-.05},description:"전기를 뿜는 대형 캐논."},{id:"vest_light",name:"경량 조끼",category:"armor",base:{defense:6},description:"움직임을 방해하지 않는 가벼운 방어구."},{id:"plate_steel",name:"강철 갑옷",category:"armor",base:{defense:12,maxHp:10,moveSpeed:-.05},description:"튼튼한 강철판 갑옷."},{id:"suit_nano",name:"나노 슈트",category:"armor",base:{defense:9,moveSpeed:.05},description:"몸에 딱 맞는 첨단 슈트. 조금 더 빨라진다."},{id:"ring_vitality",name:"생명의 반지",category:"trinket",base:{maxHp:20},description:"최대 체력을 늘려 준다."},{id:"boots_wind",name:"바람 신발",category:"trinket",base:{moveSpeed:.12},description:"이동 속도가 빨라진다."},{id:"amulet_power",name:"힘의 목걸이",category:"trinket",base:{attack:2,defense:2},description:"공격과 방어를 조금씩 올려 준다."},{id:"spear_crystal",name:"수정 창",category:"melee",base:{attack:6,moveSpeed:.04},description:"수정 동굴에서 캔 가볍고 날카로운 창."},{id:"rifle_rail",name:"레일 라이플",category:"ranged",base:{attack:10,moveSpeed:-.08},description:"요새 포대의 부품으로 만든 강력한 총. 무겁다."},{id:"cloak_shadow",name:"그림자 망토",category:"armor",base:{defense:7,moveSpeed:.1},description:"얇지만 몸놀림이 빨라지는 망토."},{id:"core_fortress",name:"요새 코어",category:"trinket",base:{defense:6,maxHp:15},description:"요새의 동력 코어. 단단해진다."}],wx={attack:0,defense:0,maxHp:0,moveSpeed:0};let Tx=1;function mr(r,e){const t=W.equipment.rarities[e],n={...wx};for(const i of Object.keys(n)){const s=r.base[i]??0;n[i]=i==="moveSpeed"?Math.round(s*(s>0?t.statMul:1)*100)/100:Math.round(s*t.statMul)}return{uid:Tx++,templateId:r.id,name:t.prefix?`${t.prefix} ${r.name}`:r.name,category:r.category,rarity:e,stats:n,description:r.description}}function Bh(r=Math.random){const e=Object.entries(W.equipment.rarities),t=e.reduce((i,[,s])=>i+s.weight,0);let n=r()*t;for(const[i,s]of e)if(n-=s.weight,n<=0)return i;return e[e.length-1][0]}function yc(r=Math.random){const e=oi[Math.min(oi.length-1,Math.floor(r()*oi.length))];return mr(e,Bh(r))}const Mc=["common","uncommon","rare","epic","legendary"];function Ax(r,e=Math.random){const t=oi[Math.min(oi.length-1,Math.floor(e()*oi.length))],n=Bh(e),i=Mc.indexOf(n)>=Mc.indexOf(r)?n:r;return mr(t,i)}function gr(r){return oi.find(e=>e.id===r)}function Rx(r,e,t=Math.random,n){const i=[];if(i.push({kind:"xp",amount:Math.max(1,Math.round(r*e.xpPerScore))}),t()<e.healChance&&i.push({kind:"heal",amount:e.healAmount}),t()<e.goldChance){const s=Math.max(0,e.goldMax-e.goldMin);i.push({kind:"gold",amount:Math.round(e.goldMin+t()*s)})}return n&&t()<(e.equipChance??0)&&i.push({kind:"equip",amount:0,item:n()}),i}function Cx(r,e=Math.random,t){const n=[],i=Math.max(0,r.goldMax-r.goldMin);return n.push({kind:"gold",amount:Math.round(r.goldMin+e()*i)}),t&&e()<r.equipChance&&n.push({kind:"equip",amount:0,item:t()}),e()<r.healChance&&n.push({kind:"heal",amount:r.healAmount}),n}class Lx{constructor(e){this.root=new Ye,this.pickups=[],this.geos={heal:new je(.42,.42,.42),xp:new so(.3,0),gold:new Et(.26,.26,.1,16),equip:new je(.5,.36,.34)},this.mats={heal:Pe({color:16732025,emissive:5574946,emissiveIntensity:1.2,roughness:.35,metalness:.3}),xp:Pe({color:6091480,emissive:1002052,emissiveIntensity:1.2,roughness:.35,metalness:.3}),gold:Pe({color:16765503,emissive:5061120,emissiveIntensity:1.2,roughness:.35,metalness:.3}),equip:Pe({color:13489908,emissive:3357269,emissiveIntensity:1.2,roughness:.35,metalness:.3})},this.root.name="Loot",e.add(this.root)}dropFor(e,t,n={gold:1,xp:1}){const i=W.loot,s={...i,xpPerScore:i.xpPerScore*n.xp,goldMin:Math.round(i.goldMin*n.gold),goldMax:Math.round(i.goldMax*n.gold),equipChance:W.equipment.dropChance},a=Rx(e,s,Math.random,()=>yc());return this.scatter(a,t,.6),a}dropChest(e){const t=W.dungeon.chestLoot,n=Cx({...t,healAmount:W.loot.healAmount},Math.random,()=>yc());return this.scatter(n,e,1.1),n}scatter(e,t,n){e.forEach((i,s)=>{const a=s/e.length*Math.PI*2+Math.random();this.spawn(i,{x:t.x+Math.cos(a)*n,z:t.z+Math.sin(a)*n})})}spawn(e,t){let n=this.mats[e.kind];if(e.kind==="equip"&&e.item){const s=new ue(W.equipment.rarities[e.item.rarity].color);n=new b0({color:s,emissive:s.clone().multiplyScalar(.35)})}const i=new le(this.geos[e.kind],n);i.position.set(t.x,.6,t.z),e.kind==="gold"&&(i.rotation.x=Math.PI/2),i.castShadow=!0,this.root.add(i),this.pickups.push({mesh:i,drop:e,t:Math.random()*6,life:W.loot.lifetime})}get count(){return this.pickups.length}update(e,t,n){const i=W.loot;for(let s=this.pickups.length-1;s>=0;s--){const a=this.pickups[s];a.t+=e,a.life-=e,a.mesh.rotation.y+=e*2.5,a.mesh.position.y=.6+Math.sin(a.t*3)*.12,a.mesh.visible=a.life>3||Math.floor(a.t*8)%2===0;const o=t.x-a.mesh.position.x,l=t.z-a.mesh.position.z,c=Math.hypot(o,l);if(c<i.magnetRange&&c>1e-4){const h=(i.magnetSpeed+(i.magnetRange-c)*2)*e;a.mesh.position.x+=o/c*Math.min(h,c),a.mesh.position.z+=l/c*Math.min(h,c)}if(c<i.pickupRadius){n(a.drop,{x:a.mesh.position.x,z:a.mesh.position.z}),this.remove(s);continue}a.life<=0&&this.remove(s)}}clear(){for(let e=this.pickups.length-1;e>=0;e--)this.remove(e)}dispose(){this.clear(),Object.values(this.geos).forEach(e=>e.dispose()),Object.values(this.mats).forEach(e=>e.dispose()),this.root.removeFromParent()}remove(e){const t=this.pickups[e];this.root.remove(t.mesh),t.drop.kind==="equip"&&t.mesh.material.dispose(),this.pickups.splice(e,1)}}function Sc(r,e){const t=[],n=(i,s,a,o=!1)=>{if(s===0&&!a)return;const l=h=>o?`${Math.round(h*100)}%`:String(h);let c=`${i} ${s>0?"+":""}${l(s)}`;a!==void 0&&a!==0&&(c+=` <span class="${a>0?"up":"down"}">(${a>0?"▲":"▼"}${l(Math.abs(a))})</span>`),t.push(c)};return n("공격",r.attack,e?.attack),n("방어",r.defense,e?.defense),n("체력",r.maxHp,e?.maxHp),n("속도",r.moveSpeed,e?.moveSpeed,!0),t.join(" · ")||"효과 없음"}class Px{constructor(e,t,n){this.equipment=t,this.callbacks=n,this.el=document.createElement("div"),this.el.className="guide inv",this.el.hidden=!0,this.el.innerHTML=`
      <div class="guide-panel inv-panel" role="dialog" aria-labelledby="inv-title">
        <div class="inv-head"><h2 class="guide-title" id="inv-title">장비</h2><button class="btn small" id="inv-close" type="button">닫기 (I)</button></div>
        <p class="guide-sub" id="inv-summary"></p>
        <div id="inv-body"></div>
      </div>`,e.appendChild(this.el),this.body=this.el.querySelector("#inv-body"),this.el.querySelector("#inv-close")?.addEventListener("click",()=>this.callbacks.onClose()),this.body.addEventListener("click",i=>{const s=i.target.closest("button[data-action]");if(!s)return;const a=s.dataset.action;a==="equip"?this.equipment.equip(Number(s.dataset.uid)):a==="unequip"?this.equipment.unequip(s.dataset.slot):a==="discard"&&this.equipment.discard(Number(s.dataset.uid)),this.callbacks.onChange(),this.render()})}get visible(){return!this.el.hidden}show(){this.el.hidden=!1,this.render()}hide(){this.el.hidden=!0}render(){const e=this.equipment,t=W.equipment.rarities;this.el.querySelector("#inv-summary").textContent=this.callbacks.getSummary();const n=fi.map(s=>{const a=e.equipped[s];return`<li class="inv-row">
        <span class="inv-slot">${vc[s]}</span>
        ${a?`<span class="inv-name" style="color:${t[a.rarity].color}">${a.name}</span><span class="inv-stats">${Sc(a.stats)}</span>
          <button class="btn small ghost" type="button" data-action="unequip" data-slot="${s}">해제</button>`:'<span class="inv-empty">비어 있음</span>'}
      </li>`}).join(""),i=e.inventory.length?e.inventory.map(s=>`<li class="inv-row">
          <span class="inv-slot">${vc[e.targetSlot(s)]}</span>
          <span class="inv-name" style="color:${t[s.rarity].color}">${s.name} <small>${t[s.rarity].label}</small></span>
          <span class="inv-stats">${Sc(s.stats,e.compare(s))}</span>
          <button class="btn small" type="button" data-action="equip" data-uid="${s.uid}">장착</button>
          <button class="btn small ghost" type="button" data-action="discard" data-uid="${s.uid}" title="${s.description}">버리기</button>
        </li>`).join(""):'<li class="inv-empty">가방이 비어 있습니다. 적을 처치하면 장비가 떨어집니다.</li>';this.body.innerHTML=`
      <h3 class="inv-h">장착 중</h3><ul class="inv-list">${n}</ul>
      <h3 class="inv-h">가방 (${e.inventory.length} / ${W.equipment.inventorySize})</h3><ul class="inv-list">${i}</ul>`}}class Ix{constructor(){this.level=1,this.xp=0,this.gold=0}get xpToNext(){const e=W.progression;return Math.round(e.xpBase*Math.pow(e.xpGrowth,this.level-1))}get maxHp(){return W.player.maxHp+(this.level-1)*W.progression.hpPerLevel}get damageMultiplier(){return 1+(this.level-1)*W.progression.damagePerLevel}addXp(e){if(e<=0)return 0;this.xp+=e;let t=0;const n=W.progression.maxLevel;for(;this.level<n&&this.xp>=this.xpToNext;)this.xp-=this.xpToNext,this.level++,t++;return this.level>=n&&(this.xp=Math.min(this.xp,this.xpToNext)),t}addGold(e){e>0&&(this.gold+=e)}reset(){this.level=1,this.xp=0,this.gold=0}}class Dx{constructor(e,t){this.object3d=new Ye,this.facing=0,this.moving=!1,this.speed=0,this.jumpY=0,this.jumpVy=0,this.attackTimer=0,this.attackDuration=0,this.dashing=!1,this.object3d.name="Player",this.model=e,this.object3d.add(e.root),this.object3d.position.set(t.x,0,t.z),this.health=new kh(W.player.maxHp,W.player.invulnerableTime)}get position(){return this.object3d.position}get attacking(){return this.attackTimer>0}get airborne(){return this.jumpY>0}get currentModel(){return this.model}get faceVisible(){let e=!1;return this.model.root.traverse(t=>{const n=t;n.isMesh&&n.visible&&n.material.map&&n.parent?.position.y===1.42&&(e=!0)}),e}setModel(e){this.object3d.remove(this.model.root),this.model.dispose(),this.model=e,this.object3d.add(e.root)}triggerAttack(e){this.attackTimer=this.attackDuration=Math.max(.01,e)}reset(e){this.health.reset(W.player.maxHp),this.health.invulnerableTime=W.player.invulnerableTime,this.object3d.position.set(e.x,0,e.z),this.facing=0,this.moving=!1,this.speed=0,this.attackTimer=0,this.jumpY=0,this.jumpVy=0,this.object3d.visible=!0}update(e){this.health.update(e),this.attackTimer>0&&(this.attackTimer-=e),this.object3d.rotation.y=this.facing,this.object3d.position.y=this.jumpY,this.model.update(e,{moving:this.moving,speed:this.speed,attack:this.attackTimer>0?1-this.attackTimer/this.attackDuration:null,airborne:this.airborne,dead:this.health.isDead}),this.object3d.visible=this.health.isDead||this.health.invulnerable<=0||Math.floor(this.health.invulnerable*20)%2===0}dispose(){this.model.dispose()}}class Nx{constructor(e,t,n,i,s=()=>1){this.player=e,this.input=t,this.world=n,this.getCameraYaw=i,this.getSpeedMultiplier=s,this.knock={x:0,z:0},this.jumpQueued=!1,this.dashQueued=!1,this.dash=l_(),this.onDash=null,this.onJump=null,this.input.onPress(W.controls.jump,()=>{this.jumpQueued=!0}),this.input.onPress(W.controls.dodge,()=>{this.dashQueued=!0})}get dashCooldownRatio(){const e=W.player.dash.cooldown;return e>0?Math.min(1,this.dash.cooldown/e):0}get dashing(){return this.dash.timer>0}applyKnockback(e,t){this.knock.x+=e.x*t,this.knock.z+=e.z*t}reset(){this.knock.x=0,this.knock.z=0,this.jumpQueued=!1,this.dashQueued=!1,this.dash.timer=0,this.dash.cooldown=0,this.player.dashing=!1}update(e){const t=W.player,n=this.player.position;if(this.player.health.isDead){this.player.moving=!1,this.player.speed=0;return}if(this.jumpQueued&&!this.player.airborne&&(this.player.jumpVy=t.jumpSpeed,this.player.jumpY=.001,this.onJump?.()),this.jumpQueued=!1,this.player.airborne){const h=o_({y:this.player.jumpY,vy:this.player.jumpVy},e,t.gravity);this.player.jumpY=h.y,this.player.jumpVy=h.vy}const i=this.input.getMoveAxis();let s=r_(i,this.getCameraYaw()),a=s.x!==0||s.z!==0,o=t.moveSpeed*this.getSpeedMultiplier()*(this.player.attacking?t.attackMoveFactor:1);if(h_(this.dash,e),this.dashQueued){this.dashQueued=!1;const h=a?s:{x:Math.sin(this.player.facing),z:Math.cos(this.player.facing)};c_(this.dash,h,t.dash.duration,t.dash.cooldown)&&(t.dash.invulnerable&&(this.player.health.invulnerable=Math.max(this.player.health.invulnerable,t.dash.duration)),this.knock.x=0,this.knock.z=0,this.onDash?.(this.dash.dir))}this.dash.timer>0&&(s=this.dash.dir,a=!0,o=t.dash.speed),this.player.dashing=this.dash.timer>0;let l={x:n.x+s.x*o*e+this.knock.x*e,z:n.z+s.z*o*e+this.knock.z*e};const c=Math.exp(-8*e);if(this.knock.x*=c,this.knock.z*=c,l=co(l,t.radius,this.world.getObstacleBoxes()),l=ho(l,this.world.getArenaHalfSize(),t.radius),n.x=l.x,n.z=l.z,a&&(!this.player.attacking||this.dash.timer>0)){const h=wr(s);this.player.facing=uo(this.player.facing,h,1-Math.exp(-t.turnSpeed*e))}this.player.moving=a,this.player.speed=a?o:0}}function Ux(r){const e=new Ye;e.name="PlaceholderHero";const t=P=>Pe({color:P,roughness:.55,metalness:.15}),n=t(r.body),i=t(r.accent),s=t(r.skin),a=on(r.visor,1.6),o=on(r.visor,2.2),l=t("#2c3e6b"),c=(P,y,b,U=0,N=0,Y=0)=>{const I=new le(y,b);return I.position.set(U,N,Y),I.castShadow=!0,P.add(I),I},h=P=>{const y=new Ye;return y.position.set(P,.5,0),c(y,new Et(.11,.12,.42,10),l,0,-.21,0),c(y,new je(.24,.12,.32),i,0,-.46,.04),e.add(y),y},u=h(-.14),d=h(.14),f=new Ye;c(f,new je(.6,.52,.36),n,0,.76,0),c(f,new je(.62,.08,.38),i,0,.52,0),c(f,new je(.36,.4,.18),i,0,.8,-.26),e.add(f);const g=P=>{const y=new Ye;return y.position.set(P,.98,0),c(y,new Et(.085,.08,.44,10),n,0,-.2,0),c(y,new mt(.1,10,8),s,0,-.44,0),f.add(y),y},_=g(-.38),m=g(.38),p=new Ye;p.position.set(0,-.44,0),c(p,new je(.07,.07,.9),o,0,0,.5),c(p,new je(.18,.06,.06),i,0,0,.08),m.add(p);const M=new Ye;M.position.y=1.42,c(M,new mt(.4,24,18),s),c(M,new je(.5,.16,.12),a,0,.05,.36);const x=c(M,new mt(.43,24,12,0,Math.PI*2,0,Math.PI*.5),l,0,.03,-.05);x.rotation.x=-.3;const v=new zt({transparent:!0,opacity:1}),R=new le(new mt(.405,24,18,Math.PI*.22,Math.PI*.56,Math.PI*.22,Math.PI*.56),v);R.visible=!1,M.add(R);const w=M.children[1];e.add(M);let A=0;return{root:e,setFace(P){v.map&&v.map!==P&&v.map.dispose(),P&&(P.wrapS=qn,P.repeat.x=-1,P.needsUpdate=!0),v.map=P,v.needsUpdate=!0,R.visible=P!==null,w.visible=P===null},update(P,y){if(y.dead){e.rotation.z=ni.lerp(e.rotation.z,Math.PI/2,1-Math.exp(-8*P)),e.position.y=ni.lerp(e.position.y,.4,1-Math.exp(-8*P));return}if(e.rotation.z=0,y.airborne){const N=1-Math.exp(-14*P);u.rotation.x+=(-.9-u.rotation.x)*N,d.rotation.x+=(.5-d.rotation.x)*N,_.rotation.x+=(-2.2-_.rotation.x)*N,y.attack===null&&(m.rotation.x+=(-2.2-m.rotation.x)*N),e.position.y=0;return}const b=y.moving?1:0;A+=P*(y.speed>0?y.speed*1.6:0);const U=Math.sin(A)*.75*b;if(u.rotation.x=U,d.rotation.x=-U,_.rotation.x=-U*.8,e.position.y=Math.abs(Math.sin(A))*.06*b,y.attack!==null){const N=y.attack,Y=Math.sin(N*Math.PI);m.rotation.x=-Math.PI/2*Math.min(1,N*2)-Y*.3,m.rotation.y=(.5-N)*1.6,f.rotation.y=(.5-N)*.5}else{const N=1-Math.exp(-10*P);m.rotation.x+=(U*.8-m.rotation.x)*N,m.rotation.y+=(0-m.rotation.y)*N,f.rotation.y+=(0-f.rotation.y)*N}if(!y.moving){const N=1-Math.exp(-10*P);u.rotation.x+=(0-u.rotation.x)*N,d.rotation.x+=(0-d.rotation.x)*N,_.rotation.x+=(0-_.rotation.x)*N}},dispose(){e.traverse(P=>{const y=P;if(y.isMesh){y.geometry.dispose();const b=y.material;Array.isArray(b)?b.forEach(U=>U.dispose()):b.dispose()}})}}}const Oa="hero-x.face",_a=256;function Fx(r,e){const t=Math.max(1,Math.min(r,e)),n=Math.round((r-t)/2),i=e*.4,s=Math.round(Math.min(Math.max(0,i-t/2),Math.max(0,e-t)));return{x:n,y:s,size:t}}async function kx(r){const e=URL.createObjectURL(r);try{const t=await new Promise((a,o)=>{const l=new Image;l.onload=()=>a(l),l.onerror=()=>o(new Error("이미지를 읽을 수 없습니다. JPG·PNG 파일인지 확인하세요.")),l.src=e}),n=document.createElement("canvas");n.width=n.height=_a;const i=n.getContext("2d");if(!i)throw new Error("캔버스를 만들 수 없습니다.");const s=Fx(t.naturalWidth,t.naturalHeight);return i.drawImage(t,s.x,s.y,s.size,s.size,0,0,_a,_a),n.toDataURL("image/jpeg",.85)}finally{URL.revokeObjectURL(e)}}function Ox(){try{const r=localStorage.getItem(Oa);return r&&r.startsWith("data:image/")?r:null}catch{return null}}function bc(r){try{return r?localStorage.setItem(Oa,r):localStorage.removeItem(Oa),!0}catch{return!1}}function zx(r){return new Promise((e,t)=>{new Ah().load(r,n=>{n.colorSpace=ot,e(n)},void 0,()=>t(new Error("얼굴 텍스처를 만들 수 없습니다.")))})}function Ec(r){return r==="Mouse0"?"마우스 왼쪽":r==="Mouse2"?"마우스 오른쪽":r==="Mouse1"?"마우스 가운데":r==="Space"?"Space":r==="Escape"?"Esc":r==="ShiftLeft"||r==="ShiftRight"?"Shift":r.startsWith("Key")?r.slice(3):r.startsWith("Arrow")?{Up:"↑",Down:"↓",Left:"←",Right:"→"}[r.slice(5)]??r:r}class Bx{constructor(e,t){const n=W.controls,i=s=>s.map(a=>`<span class="key">${Ec(a)}</span>`).join(" ");this.guide=document.createElement("div"),this.guide.className="guide",this.guide.hidden=!0,this.guide.innerHTML=`
      <div class="guide-panel" role="dialog" aria-labelledby="guide-title">
        <div class="inv-head"><h2 class="guide-title" id="guide-title" style="font-size:30px">조작 안내</h2><button class="btn small" id="guide-close" type="button">닫기 (H)</button></div>
        <ul class="guide-keys">
          <li>${i(n.up)} 앞으로</li>
          <li>${i(n.down)} 뒤로</li>
          <li>${i(n.left)} 왼쪽</li>
          <li>${i(n.right)} 오른쪽</li>
          <li>${i(n.attackMelee)} 근접 공격 (마우스가 가리키는 쪽으로)</li>
          <li>${i(n.attackRanged)} 원거리 공격 (에너지 탄 발사)</li>
          <li>${i(n.jump)} 점프 (떠 있는 동안 탄·충격파를 피함)</li>
          <li>${i(n.dodge)} 회피 (이동 방향으로 짧게 빠르게, 잠깐 무적)</li>
          <li>${i(n.toggleInventory)} 장비 화면 열기/닫기 (게임 일시정지)</li>
          <li>${i(n.interact)} 보물 상자 열기 (가까이 가면 안내가 뜸)</li>
          <li>${i(["Escape"])} 메인 메뉴 (게임 일시정지)</li>
          <li>${i(n.restart)} 결과 화면에서 다시 도전</li>
          <li>${i(n.toggleGuide)} 이 안내 열기/닫기</li>
        </ul>
        <p class="guide-note">돌진 로봇은 눈이 붉어진 뒤 덤벼들고, 포격 드론은 포신이 밝아진 뒤 탄을 쏘며, 철벽 로봇은 방패를 들어 올린 뒤 내려찍습니다. 보스는 바닥 원 색깔로 패턴을 예고합니다(주황 돌진 · 빨강 내려찍기 · 보라 탄막).</p>
      </div>`,e.appendChild(this.guide),this.guide.querySelector("#guide-close")?.addEventListener("click",t),this.hud=document.createElement("div"),this.hud.className="hud",e.appendChild(this.hud),this.setHudText("")}get visible(){return!this.guide.hidden}show(){this.guide.hidden=!1}hide(){this.guide.hidden=!0}toggle(){this.guide.hidden=!this.guide.hidden}setHudText(e){const t=Ec(W.controls.toggleGuide[0]??"KeyH");this.hud.textContent=`${t}: 조작 안내 · Esc: 메뉴${e?" · "+e:""}`}}const Hh="hero-x.difficulty";function Hx(){try{const r=localStorage.getItem(Hh);if(r&&fo(r))return r}catch{}return W.difficulty.default}function wc(r){try{localStorage.setItem(Hh,r)}catch{}}function fo(r){return r in W.difficulty.presets}function Oi(r){return W.difficulty.presets[r]??W.difficulty.presets[W.difficulty.default]}function Gh(){return Object.keys(W.difficulty.presets)}class Gx{constructor(e,t){this.cb=t,this.confirming=!1;const n=W.meta,i=Gh().map(a=>`<button type="button" class="diff-btn" data-level="${a}">${Oi(a).label}</button>`).join("");this.el=document.createElement("div"),this.el.className="guide menu",this.el.innerHTML=`
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
        <div class="diff-row"><span class="hud-label">난이도</span>${i}</div>
        <div class="menu-confirm" id="menu-confirm" hidden>
          <p>이어갈 진행이 있습니다. 새로 시작하면 레벨·골드·장비·기록이 초기화되고 저장 데이터도 새로 씁니다. 계속할까요?</p>
          <div class="btns"><button class="btn small" id="menu-confirm-yes" type="button">새로 시작</button><button class="btn small ghost" id="menu-confirm-no" type="button">취소</button></div>
        </div>
        <p class="guide-note">던전마다 적을 모두 처치하면 보스가 나타나고, 보스를 쓰러뜨리면 클리어되어 다음 던전이 열립니다. 게임을 끝내려면 브라우저 탭을 닫으세요.</p>
        <p class="menu-save" id="menu-save"></p>
      </div>`,e.appendChild(this.el);const s=a=>this.el.querySelector(a);s("#menu-new").addEventListener("click",()=>{this.cb.hasProgress()?this.setConfirm(!0):this.cb.newGame()}),s("#menu-confirm-yes").addEventListener("click",()=>{this.setConfirm(!1),this.cb.newGame()}),s("#menu-confirm-no").addEventListener("click",()=>this.setConfirm(!1)),s("#menu-continue").addEventListener("click",()=>this.cb.continueGame()),s("#menu-inventory").addEventListener("click",()=>this.cb.openInventory()),s("#menu-guide").addEventListener("click",()=>this.cb.openGuide()),s("#menu-settings").addEventListener("click",()=>this.cb.openSettings()),s("#menu-dungeons").addEventListener("click",()=>this.cb.openDungeons()),this.el.querySelectorAll(".diff-btn").forEach(a=>{a.addEventListener("click",()=>{this.cb.difficulty.set(a.dataset.level),this.refresh()})}),this.refresh()}get visible(){return!this.el.hidden}setConfirm(e){this.confirming=e,this.el.querySelector("#menu-confirm").hidden=!e}refresh(){const e=this.cb.hasRun(),t=this.cb.hasProgress(),n=this.el.querySelector("#menu-continue");n.disabled=!t,n.textContent=e?"이어하기":t?"이어하기 (던전 선택)":"이어하기",n.title=t?"":"이어갈 진행이 없습니다";const i=this.el.querySelector("#menu-dungeons");i.disabled=!t,i.title=t?"":"새 게임을 먼저 시작하세요";const s=this.el.querySelector("#menu-progress"),a=this.cb.progressText();s.textContent=a,s.hidden=a==="",this.el.querySelector("#menu-save").textContent=this.cb.saveNote();const o=this.cb.difficulty.get();this.el.querySelectorAll(".diff-btn").forEach(l=>l.setAttribute("aria-pressed",String(l.dataset.level===o)))}show(){this.setConfirm(!1),this.refresh(),this.el.hidden=!1}hide(){this.el.hidden=!0}pressPrimary(){this.confirming?(this.setConfirm(!1),this.cb.newGame()):this.cb.hasProgress()?this.cb.continueGame():this.cb.newGame()}}class Vx{constructor(e,t){this.project=t,this.popups=[],this.root=document.createElement("div"),this.root.className="dmg-layer",e.appendChild(this.root)}show(e,t,n="enemy"){const i=document.createElement("div");i.className=`dmg ${n}`;const s=Math.round(t);i.textContent=n==="kill"?`${s} 처치!`:n==="heal"?`+${s}`:n==="levelup"?`레벨 ${s}!`:String(s),this.root.appendChild(i),this.popups.push({el:i,pos:e.clone(),t:0}),this.popups.length>40&&this.remove(0)}showText(e,t,n){const i=document.createElement("div");i.className="dmg text",i.textContent=t,n&&(i.style.color=n),this.root.appendChild(i),this.popups.push({el:i,pos:e.clone(),t:-.6}),this.popups.length>40&&this.remove(0)}update(e){for(let t=this.popups.length-1;t>=0;t--){const n=this.popups[t];n.t+=e,n.pos.y+=e*1.4;const i=this.project(n.pos);i?(n.el.style.transform=`translate(${i.x}px, ${i.y}px) translate(-50%, -50%) scale(${1+Math.min(n.t*2,.3)})`,n.el.style.opacity=String(Math.max(0,Math.min(1,1.3-Math.max(0,n.t))))):n.el.style.opacity="0",n.t>1.1&&this.remove(t)}}clear(){for(;this.popups.length;)this.remove(this.popups.length-1)}remove(e){this.popups[e].el.remove(),this.popups.splice(e,1)}}class Wx{constructor(e){this.last={hp:-1,maxHp:-1,enemies:-1,kills:-1,score:-1,level:-1,xp:-1,xpToNext:-1,gold:-1},this.root=document.createElement("div"),this.root.className="hud-top",this.root.innerHTML=`
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
      </div>`,e.appendChild(this.root),this.hpFill=this.root.querySelector("#hud-hp-fill"),this.hpText=this.root.querySelector("#hud-hp-text"),this.enemiesText=this.root.querySelector("#hud-enemies"),this.killsText=this.root.querySelector("#hud-kills"),this.scoreText=this.root.querySelector("#hud-score"),this.levelText=this.root.querySelector("#hud-level"),this.xpFill=this.root.querySelector("#hud-xp-fill"),this.xpText=this.root.querySelector("#hud-xp-text"),this.goldText=this.root.querySelector("#hud-gold"),this.chestText=this.root.querySelector("#hud-chests"),this.prompt=document.createElement("div"),this.prompt.className="hud-prompt",this.prompt.hidden=!0,e.appendChild(this.prompt),this.bossBar=document.createElement("div"),this.bossBar.className="boss-bar",this.bossBar.hidden=!0,this.bossBar.innerHTML='<span class="boss-name" id="boss-name"></span><div class="boss-track"><i id="boss-fill"></i></div><span class="boss-hp" id="boss-hp"></span>',e.appendChild(this.bossBar),this.banner=document.createElement("div"),this.banner.className="banner",this.banner.hidden=!0,e.appendChild(this.banner)}setBoss(e){if(!e){this.bossBar.hidden=!0;return}this.bossBar.hidden=!1,this.bossBar.querySelector("#boss-name").textContent=e.name+(e.phase2?" (분노)":""),this.bossBar.querySelector("#boss-fill").style.width=`${Math.max(0,Math.min(1,e.hp/e.maxHp))*100}%`,this.bossBar.querySelector("#boss-hp").textContent=`${Math.ceil(e.hp)} / ${e.maxHp}`,this.bossBar.classList.toggle("phase2",e.phase2)}showBanner(e,t=2200){this.banner.textContent=e,this.banner.hidden=!1,this.banner.classList.remove("pop"),this.banner.offsetWidth,this.banner.classList.add("pop"),clearTimeout(this.bannerTimer),this.bannerTimer=setTimeout(()=>this.banner.hidden=!0,t)}setDungeonName(e){this.root.querySelector("#hud-dungeon").textContent=e}setChests(e,t){const n=`${e} / ${t}`;this.chestText.textContent!==n&&(this.chestText.textContent=n)}setPrompt(e){this.prompt.textContent!==e&&(this.prompt.textContent=e),this.prompt.hidden=e===""}update(e){e.level!==this.last.level&&(this.levelText.textContent=String(e.level),this.last.level=e.level),(e.xp!==this.last.xp||e.xpToNext!==this.last.xpToNext)&&(this.xpFill.style.width=`${e.xpToNext>0?Math.min(100,e.xp/e.xpToNext*100):100}%`,this.xpText.textContent=`${e.xp} / ${e.xpToNext}`,this.last.xp=e.xp,this.last.xpToNext=e.xpToNext),e.gold!==this.last.gold&&(this.goldText.textContent=e.gold.toLocaleString("ko-KR"),this.last.gold=e.gold);const t=Math.ceil(e.hp);if(t!==this.last.hp||e.maxHp!==this.last.maxHp){const n=e.maxHp>0?Math.max(0,Math.min(1,e.hp/e.maxHp)):0;this.hpFill.style.width=`${n*100}%`,this.hpFill.classList.toggle("low",n<=.3),this.hpText.textContent=`${t} / ${e.maxHp}`,this.last.hp=t,this.last.maxHp=e.maxHp}e.enemies!==this.last.enemies&&(this.enemiesText.textContent=String(e.enemies),this.last.enemies=e.enemies),e.kills!==this.last.kills&&(this.killsText.textContent=String(e.kills),this.last.kills=e.kills),e.score!==this.last.score&&(this.scoreText.textContent=e.score.toLocaleString("ko-KR"),this.last.score=e.score)}flashHit(){this.root.classList.remove("hit"),this.root.offsetWidth,this.root.classList.add("hit")}show(){this.root.hidden=!1}hide(){this.root.hidden=!0}}class qx{constructor(e,t,n,i){this.el=document.createElement("div"),this.el.className="guide result",this.el.hidden=!0,this.el.innerHTML=`
      <div class="guide-panel result-panel" role="dialog" aria-labelledby="result-title">
        <p class="guide-eyebrow" id="result-eyebrow">결과</p>
        <h2 class="guide-title" id="result-title">결과</h2>
        <p class="guide-sub" id="result-sub"></p>
        <div class="btns"><button class="btn" id="result-restart" type="button">다시 도전 (R)</button><button class="btn secondary" id="result-dungeons" type="button">던전 선택</button><button class="btn secondary" id="result-menu" type="button">메인 메뉴</button></div>
      </div>`,e.appendChild(this.el),this.title=this.el.querySelector("#result-title"),this.sub=this.el.querySelector("#result-sub"),this.el.querySelector("#result-restart")?.addEventListener("click",t),this.el.querySelector("#result-menu")?.addEventListener("click",n),this.el.querySelector("#result-dungeons")?.addEventListener("click",i)}get visible(){return!this.el.hidden}show(e,t){this.title.textContent=e,this.sub.textContent=t,this.el.hidden=!1}hide(){this.el.hidden=!0}}function Xx(){if(typeof window>"u"||typeof navigator>"u")return!1;try{if(window.matchMedia?.("(pointer: coarse)").matches)return!0}catch{}return navigator.maxTouchPoints>0&&/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)}const jx=["게임","소리","전투 수치","화면"],za=[{key:"difficulty",kind:"choice",group:"게임",label:"난이도",description:"적의 체력·공격력·속도 배율. 바꾸면 던전을 처음부터 다시 시작합니다.",options:Gh().map(r=>({value:r,label:Oi(r).label}))},{key:"cameraDistance",kind:"range",group:"게임",label:"카메라 거리",description:"1.0 이 기본. 멀리 두면 넓게 보이고 가까우면 캐릭터가 크게 보입니다.",min:.6,max:1.6,step:.1,unit:"×"},{key:"touchControls",kind:"toggle",group:"게임",label:"터치 조작",description:"화면에 조이스틱·버튼을 띄우고 가까운 적을 자동으로 조준합니다. 휴대폰·태블릿은 기본 켜짐."},{key:"floatingJoystick",kind:"toggle",group:"게임",label:"조이스틱: 누르는 자리에",description:"켜면 버튼이 아닌 아무 곳이나 눌러 그 자리에서 끌면 움직입니다. 끄면 왼쪽 아래 고정 조이스틱."},{key:"leftHanded",kind:"toggle",group:"게임",label:"왼손 모드",description:"공격·점프·회피 버튼을 왼쪽에, 고정 조이스틱을 오른쪽에 둡니다."},{key:"touchButtonScale",kind:"range",group:"게임",label:"터치 버튼 크기",description:"버튼이 작거나 크면 조절하세요.",min:.8,max:1.4,step:.1,unit:"×"},{key:"haptics",kind:"toggle",group:"게임",label:"진동",description:"맞거나 처치할 때 짧게 진동합니다 (지원하는 휴대폰만, iPhone 은 안 됨)."},{key:"soundMaster",kind:"range",group:"소리",label:"전체 음량",description:"0 이면 무음. 소리는 첫 조작(터치·키) 뒤부터 납니다.",min:0,max:1,step:.1},{key:"soundSfx",kind:"range",group:"소리",label:"효과음",description:"공격·피격·획득·보스 소리.",min:0,max:1,step:.1},{key:"soundMusic",kind:"range",group:"소리",label:"음악",description:"던전·보스·메뉴 배경 음악.",min:0,max:1,step:.1},{key:"playerHpMul",kind:"range",group:"전투 수치",label:"내 최대 체력",description:"레벨·장비 보너스를 더한 최대 체력에 곱합니다.",min:.5,max:3,step:.1,unit:"×"},{key:"playerDamageMul",kind:"range",group:"전투 수치",label:"내 공격력",description:"근접·원거리 공격 피해에 곱합니다.",min:.5,max:3,step:.1,unit:"×"},{key:"enemyHpMul",kind:"range",group:"전투 수치",label:"적 체력",description:"난이도 배율에 다시 곱합니다. 다음 던전 입장부터 적용됩니다.",min:.5,max:3,step:.1,unit:"×"},{key:"quality",kind:"choice",group:"화면",label:"화질",description:"높음: 빛 번짐·고급 안티앨리어싱 (PC 권장). 중간: 기본. 낮음: 그림자 해상도·바닥 선명도 낮춤.",options:x_.map(r=>({value:r,label:Zi[r].label}))},{key:"showDamageNumbers",kind:"toggle",group:"화면",label:"피해 숫자 표시",description:"공격하거나 맞을 때 숫자를 띄웁니다."},{key:"hitFlash",kind:"toggle",group:"화면",label:"피격 시 화면 번쩍임",description:"맞았을 때 화면 테두리를 붉게 비춥니다."},{key:"shadows",kind:"toggle",group:"화면",label:"그림자",description:"느린 PC·휴대폰에서는 끄면 부드러워집니다."},{key:"resolution",kind:"range",group:"화면",label:"렌더 해상도",description:"1.0 이 기기 기본. 휴대폰에서 끊기면 0.6~0.8 로 낮추세요.",min:.5,max:1.5,step:.1,unit:"×"},{key:"autoQuality",kind:"toggle",group:"화면",label:"자동 화질 조절",description:"플레이 중 평균 30 FPS 아래면 그림자를 끄고 해상도를 한 단계씩 낮춥니다. 직접 정하려면 끄세요."},{key:"showFps",kind:"toggle",group:"화면",label:"FPS 표시",description:"왼쪽 아래에 초당 프레임을 보여줍니다."}];function li(){const r=Xx();return{difficulty:W.difficulty.default,playerHpMul:1,playerDamageMul:1,enemyHpMul:1,cameraDistance:1,touchControls:r,floatingJoystick:!0,leftHanded:!1,touchButtonScale:1,haptics:r,soundMaster:.8,soundSfx:1,soundMusic:.6,quality:r?"medium":"high",resolution:r?.8:1,autoQuality:!0,showDamageNumbers:W.hud.showDamageNumbers,hitFlash:!0,shadows:r?!1:W.graphics.shadows,showFps:W.debug.showFps}}function Ba(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function $x(r,e){const t=Number.isFinite(e)?e:li()[r.key],n=Math.round((t-r.min)/r.step)*r.step+r.min,i=Math.min(r.max,Math.max(r.min,n));return Math.round(i*1e3)/1e3}function Vh(r){const e=li(),t=[];if(!Ba(r))return{settings:e,warnings:r==null?[]:["설정 데이터가 객체가 아니라 기본값을 씁니다."]};const n={...e};for(const i of za){const s=r[i.key];if(s!==void 0)if(i.kind==="choice")i.key==="difficulty"?typeof s=="string"&&fo(s)?n.difficulty=s:t.push(`난이도 값 '${String(s)}' 이(가) 잘못되어 기본값으로 바꿨습니다.`):v_(s)?n.quality=s:t.push(`화질 값 '${String(s)}' 이(가) 잘못되어 기본값으로 바꿨습니다.`);else if(i.kind==="toggle")typeof s=="boolean"?n[i.key]=s:t.push(`'${i.label}' 값이 참/거짓이 아니라 기본값으로 바꿨습니다.`);else{const a=typeof s=="number"?$x(i,s):NaN;Number.isNaN(a)?t.push(`'${i.label}' 값이 숫자가 아니라 기본값으로 바꿨습니다.`):(a!==s&&t.push(`'${i.label}' 값 ${String(s)} 을(를) 허용 범위 안의 ${a} 으로 보정했습니다.`),n[i.key]=a)}}return{settings:n,warnings:t}}const Wh="hero-x.settings",Yx=1;function Kx(r){if(!r)return{settings:li(),warnings:[],found:!1};let e=null;try{e=r.getItem(Wh)}catch{}if(!e)return{settings:li(),warnings:[],found:!1};try{const t=JSON.parse(e),n=Ba(t)&&Ba(t.settings)?t.settings:t;return{...Vh(n),found:!0}}catch{return{settings:li(),warnings:["설정 데이터를 읽을 수 없어 기본값을 씁니다."],found:!0}}}function fs(r,e){if(!r)return!1;try{return r.setItem(Wh,JSON.stringify({version:Yx,settings:e})),!0}catch(t){return Be.warn("설정 저장에 실패했습니다.",t),!1}}class Zx{constructor(e,t){this.cb=t,this.confirming=!1,this.el=document.createElement("div"),this.el.className="guide settings",this.el.hidden=!0;const n=jx.map(s=>{const a=za.filter(o=>o.group===s).map(o=>{let l="";return o.kind==="choice"?l=o.options.map(c=>`<button type="button" class="diff-btn" data-key="${o.key}" data-value="${c.value}"${o.key==="difficulty"?` data-level="${c.value}"`:""}>${c.label}</button>`).join(""):o.kind==="toggle"?l=`<button type="button" class="toggle" role="switch" data-key="${o.key}" aria-checked="false"><span class="toggle-knob"></span></button>`:l=`<input type="range" data-key="${o.key}" min="${o.min}" max="${o.max}" step="${o.step}" aria-label="${o.label}"><output data-out="${o.key}"></output>`,`<div class="set-row" data-row="${o.key}"><div class="set-text"><div class="set-label">${o.label}</div><div class="set-desc">${o.description}</div></div><div class="set-control">${l}</div></div>`}).join("");return`<section class="set-group"><h3 class="set-group-title">${s}</h3>${a}</section>`}).join("");this.el.innerHTML=`
      <div class="guide-panel settings-panel" role="dialog" aria-labelledby="settings-title">
        <div class="inv-head"><h2 class="guide-title" id="settings-title">설정</h2><button class="btn small" id="settings-close" type="button">닫기 (Esc)</button></div>
        <p class="guide-sub">바꾸는 즉시 적용되고 이 브라우저에 저장됩니다.</p>
        <div class="set-body">${n}
          <section class="set-group"><h3 class="set-group-title">내 얼굴</h3>
            <div class="set-row"><div class="set-text"><div class="set-label">내 얼굴 사진</div><div class="set-desc">정면 사진을 고르면 캐릭터 머리에 얼굴이 붙습니다. 사진은 이 브라우저 안에만 저장되고 어디에도 보내지 않습니다.</div><div class="set-desc" id="face-status"></div></div>
            <div class="set-control face-control"><img id="face-preview" alt="얼굴 미리보기" hidden><label class="btn small" for="face-file">사진 고르기</label><input id="face-file" type="file" accept="image/*" hidden><button class="btn small ghost" id="face-clear" type="button">지우기</button></div></div>
          </section>
        </div>
        <div class="menu-confirm" id="settings-confirm" hidden>
          <p>모든 설정을 기본값으로 되돌릴까요?</p>
          <div class="btns"><button class="btn small" id="settings-reset-yes" type="button">되돌리기</button><button class="btn small ghost" id="settings-reset-no" type="button">취소</button></div>
        </div>
        <div class="btns set-foot"><button class="btn secondary" id="settings-reset" type="button">기본값 복원</button></div>
      </div>`,e.appendChild(this.el),this.el.querySelector("#settings-close")?.addEventListener("click",()=>this.cb.onClose());const i=this.el.querySelector("#face-file");i.addEventListener("change",async()=>{const s=i.files?.[0];if(i.value="",!s)return;const a=this.el.querySelector("#face-status");a.textContent="사진을 처리하는 중…";try{await this.cb.face.pick(s),a.textContent=""}catch(o){a.textContent=o instanceof Error?o.message:String(o)}this.refresh()}),this.el.querySelector("#face-clear")?.addEventListener("click",()=>{this.cb.face.clear(),this.refresh()}),this.el.querySelector("#settings-reset")?.addEventListener("click",()=>this.setConfirm(!0)),this.el.querySelector("#settings-reset-no")?.addEventListener("click",()=>this.setConfirm(!1)),this.el.querySelector("#settings-reset-yes")?.addEventListener("click",()=>{this.setConfirm(!1),this.cb.resetAll(),this.refresh()}),this.el.querySelectorAll('input[type="range"]').forEach(s=>{s.addEventListener("input",()=>{this.cb.set(s.dataset.key,Number(s.value)),this.refresh()})}),this.el.querySelectorAll("button.toggle").forEach(s=>{s.addEventListener("click",()=>{const a=s.dataset.key;this.cb.set(a,!this.cb.get()[a]),this.refresh()})}),this.el.querySelectorAll(".diff-btn").forEach(s=>{s.addEventListener("click",()=>{this.cb.set(s.dataset.key,s.dataset.value),this.refresh()})}),this.refresh()}get visible(){return!this.el.hidden}setConfirm(e){this.confirming=e,this.el.querySelector("#settings-confirm").hidden=!e}refresh(){const e=this.cb.get(),t=this.cb.face.get(),n=this.el.querySelector("#face-preview");n.hidden=!t,t&&(n.src=t),this.el.querySelector("#face-clear").disabled=!t;for(const i of za)if(i.kind==="choice"){const s=String(e[i.key]);this.el.querySelectorAll(`.diff-btn[data-key="${i.key}"]`).forEach(a=>a.setAttribute("aria-pressed",String(a.dataset.value===s)))}else if(i.kind==="toggle")this.el.querySelector(`button.toggle[data-key="${i.key}"]`)?.setAttribute("aria-checked",String(e[i.key]));else{const s=this.el.querySelector(`input[data-key="${i.key}"]`),a=this.el.querySelector(`output[data-out="${i.key}"]`),o=e[i.key];s&&(s.value=String(o)),a&&(a.textContent=`${o.toFixed(1)}${i.unit??""}`)}}show(){this.setConfirm(!1),this.refresh(),this.el.hidden=!1}hide(){this.confirming=!1,this.el.hidden=!0}pressBack(){this.confirming?this.setConfirm(!1):this.cb.onClose()}}const sr=2,Tc={clears:0,deaths:0,totalKills:0,bestScore:0,dungeonClears:{}};function rr(r){return{...r,dungeonClears:{...r.dungeonClears}}}const Jx=["common","uncommon","rare","epic","legendary"];function Qx(r){return typeof r=="string"&&Jx.includes(r)}function On(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function Un(r,e,t,n){const i=typeof r=="number"&&Number.isFinite(r)?Math.floor(r):n;return Math.min(t,Math.max(e,i))}function Ac(r){return{templateId:r.templateId,rarity:r.rarity}}function ev(r){const e={};for(const t of fi){const n=r.equipment.equipped[t];e[t]=n?Ac(n):null}return{version:sr,savedAt:(r.now??new Date).toISOString(),gameVersion:W.meta.version,difficulty:r.difficulty,stats:{level:r.stats.level,xp:r.stats.xp,gold:r.stats.gold},equipment:{inventory:r.equipment.inventory.map(Ac),equipped:e},records:rr(r.records)}}function Rc(r,e,t){return!On(r)||typeof r.templateId!="string"||!Qx(r.rarity)?(e.push(`${t}: 장비 항목 형식이 잘못되어 버렸습니다.`),null):gr(r.templateId)?{templateId:r.templateId,rarity:r.rarity}:(e.push(`${t}: 알 수 없는 장비 '${r.templateId}' 를 버렸습니다.`),null)}function tv(r){if(!On(r))return{ok:!1,reason:"invalid",message:"저장 데이터가 객체가 아닙니다."};const e=typeof r.version=="number"?r.version:NaN;if(!Number.isInteger(e)||e<1)return{ok:!1,reason:"invalid",message:"저장 데이터에 버전이 없습니다."};if(e>sr)return{ok:!1,reason:"newer",message:`저장 데이터 버전(${e})이 이 게임이 아는 버전(${sr})보다 새롭습니다.`};const t=nv(r,e),n=[];if(!On(t.stats)||!On(t.equipment))return{ok:!1,reason:"invalid",message:"stats 또는 equipment 항목이 없습니다."};const i=W.progression,s=Un(t.stats.level,1,i.maxLevel,1),a=Math.round(i.xpBase*Math.pow(i.xpGrowth,s-1)),o={level:s,xp:Un(t.stats.xp,0,a,0),gold:Un(t.stats.gold,0,999999999,0)};(o.level!==t.stats.level||o.xp!==t.stats.xp||o.gold!==t.stats.gold)&&n.push("성장 수치가 범위를 벗어나 보정했습니다.");const l=typeof t.difficulty=="string"&&fo(t.difficulty)?t.difficulty:W.difficulty.default;l!==t.difficulty&&n.push("난이도 값이 잘못되어 기본 난이도로 바꿨습니다.");const c=t.equipment,h=[],u=Array.isArray(c.inventory)?c.inventory:[];Array.isArray(c.inventory)||n.push("가방 목록이 없어 비웠습니다."),u.forEach((x,v)=>{const R=Rc(x,n,`가방 ${v+1}번`);R&&h.push(R)});const d={},f=On(c.equipped)?c.equipped:{};for(const x of fi){const v=f[x];if(v==null){d[x]=null;continue}const R=Rc(v,n,`슬롯 ${x}`);R&&!zh(gr(R.templateId).category).includes(x)?(n.push(`슬롯 ${x}: 맞지 않는 장비라 가방으로 옮겼습니다.`),h.push(R),d[x]=null):d[x]=R}const g=W.equipment.inventorySize;h.length>g&&(n.push(`가방이 ${g}칸을 넘어 뒤쪽 ${h.length-g}개를 버렸습니다.`),h.length=g);const _=On(t.records)?t.records:{},m={},p=On(_.dungeonClears)?_.dungeonClears:{};for(const[x,v]of Object.entries(p)){if(!sn.some(R=>R.id===x)){n.push(`알 수 없는 던전 '${x}' 의 클리어 기록을 버렸습니다.`);continue}m[x]=Un(v,0,1e9,0)}const M={clears:Un(_.clears,0,1e9,0),deaths:Un(_.deaths,0,1e9,0),totalKills:Un(_.totalKills,0,1e9,0),bestScore:Un(_.bestScore,0,1e12,0),dungeonClears:m};return{ok:!0,warnings:n,data:{version:sr,savedAt:typeof t.savedAt=="string"&&!Number.isNaN(Date.parse(t.savedAt))?t.savedAt:new Date(0).toISOString(),gameVersion:typeof t.gameVersion=="string"?t.gameVersion:"?",difficulty:l,stats:o,equipment:{inventory:h,equipped:d},records:M}}}function nv(r,e){const t={...r};if(e<2){const n=On(t.records)?{...t.records}:{},i=typeof n.clears=="number"?n.clears:0;n.dungeonClears=i>0?{[sn[0].id]:i}:{},t.records=n}return t}function iv(r,e){e.stats.reset(),e.stats.level=r.stats.level,e.stats.xp=r.stats.xp,e.stats.gold=r.stats.gold,e.equipment.reset();for(const t of r.equipment.inventory){const n=gr(t.templateId);n&&e.equipment.add(mr(n,t.rarity))}for(const t of fi){const n=r.equipment.equipped[t],i=n?gr(n.templateId):void 0;n&&i&&(e.equipment.equipped[t]=mr(i,n.rarity))}}function Cc(r){const e=r.stats,t=r.equipment;return e.level>1||e.xp>0||e.gold>0||t.inventory.length>0||fi.some(n=>t.equipped[n]!==null)||r.records.clears>0||r.records.deaths>0}const Ar="hero-x.save",Lc="hero-x.save.corrupt";function sv(){try{const r=globalThis.localStorage,e="__hero-x-probe__";return r.setItem(e,"1"),r.removeItem(e),r}catch{return null}}function rv(r){if(!r)return{kind:"unavailable"};let e;try{e=r.getItem(Ar)}catch{return{kind:"unavailable"}}if(e===null||e==="")return{kind:"none"};let t;try{t=JSON.parse(e)}catch{return Pc(r,e),{kind:"corrupt",message:"저장 데이터를 읽을 수 없어(JSON 손상) 따로 보관하고 새로 시작합니다."}}const n=tv(t);return n.ok?{kind:"loaded",data:n.data,warnings:n.warnings}:n.reason==="newer"?{kind:"newer",message:n.message}:(Pc(r,e),{kind:"corrupt",message:`저장 데이터가 손상되어 따로 보관하고 새로 시작합니다. (${n.message})`})}function Pc(r,e){try{r.setItem(Lc,e),r.removeItem(Ar),Be.warn(`손상된 저장 데이터를 '${Lc}' 에 보관했습니다.`)}catch{}}function av(r,e){if(!r)return!1;try{return r.setItem(Ar,JSON.stringify(e)),!0}catch(t){return Be.warn("저장에 실패했습니다.",t),!1}}function ov(r){if(r)try{r.removeItem(Ar)}catch{}}function tr(r){if(typeof navigator>"u"||typeof navigator.vibrate!="function")return!1;try{return navigator.vibrate(r)}catch{return!1}}const lv={melee:[{wave:"noise",freq:0,duration:.09,gain:.35,filter:2600},{wave:"triangle",freq:320,freqEnd:140,duration:.1,gain:.25}],ranged:[{wave:"square",freq:880,freqEnd:220,duration:.12,gain:.18}],enemyHit:[{wave:"square",freq:200,freqEnd:90,duration:.07,gain:.22}],kill:[{wave:"noise",freq:0,duration:.18,gain:.3,filter:1600},{wave:"sawtooth",freq:160,freqEnd:40,duration:.22,gain:.25}],hurt:[{wave:"sawtooth",freq:140,freqEnd:60,duration:.18,gain:.35},{wave:"noise",freq:0,duration:.1,gain:.2,filter:900}],pickup:[{wave:"sine",freq:880,duration:.07,gain:.2},{wave:"sine",freq:1320,duration:.1,gain:.2,delay:.06}],equip:[{wave:"triangle",freq:523,duration:.09,gain:.22},{wave:"triangle",freq:659,duration:.09,gain:.22,delay:.08},{wave:"triangle",freq:784,duration:.16,gain:.22,delay:.16}],heal:[{wave:"sine",freq:440,freqEnd:880,duration:.25,gain:.2}],levelup:[{wave:"square",freq:523,duration:.1,gain:.18},{wave:"square",freq:659,duration:.1,gain:.18,delay:.1},{wave:"square",freq:784,duration:.1,gain:.18,delay:.2},{wave:"square",freq:1046,duration:.35,gain:.2,delay:.3}],chest:[{wave:"noise",freq:0,duration:.2,gain:.15,filter:600},{wave:"sine",freq:1046,duration:.12,gain:.18,delay:.15},{wave:"sine",freq:1568,duration:.2,gain:.18,delay:.25}],jump:[{wave:"sine",freq:300,freqEnd:600,duration:.14,gain:.18}],dash:[{wave:"noise",freq:0,duration:.16,gain:.25,filter:3200}],bossAppear:[{wave:"sawtooth",freq:55,freqEnd:40,duration:1.2,gain:.35},{wave:"noise",freq:0,duration:.6,gain:.2,filter:400},{wave:"square",freq:110,duration:.3,gain:.2,delay:.5}],slam:[{wave:"sine",freq:90,freqEnd:30,duration:.35,gain:.45},{wave:"noise",freq:0,duration:.25,gain:.3,filter:700}],boom:[{wave:"noise",freq:0,duration:.35,gain:.35,filter:1200},{wave:"sine",freq:120,freqEnd:35,duration:.3,gain:.35}],summon:[{wave:"sine",freq:660,freqEnd:1320,duration:.3,gain:.2},{wave:"triangle",freq:330,freqEnd:660,duration:.3,gain:.15,delay:.1}],clear:[{wave:"square",freq:523,duration:.12,gain:.2},{wave:"square",freq:659,duration:.12,gain:.2,delay:.12},{wave:"square",freq:784,duration:.12,gain:.2,delay:.24},{wave:"square",freq:1046,duration:.5,gain:.22,delay:.36},{wave:"triangle",freq:261,duration:.9,gain:.15,delay:.36}],defeat:[{wave:"sawtooth",freq:392,freqEnd:196,duration:.5,gain:.2},{wave:"sawtooth",freq:294,freqEnd:110,duration:.8,gain:.2,delay:.4}],ui:[{wave:"sine",freq:700,duration:.05,gain:.12}]},cv={menu:{bpm:84,root:130.81,bass:[0,null,7,null,5,null,7,null],melody:[12,16,19,16,12,null,14,null,17,14,12,null,11,null,12,null],bassWave:"triangle",melodyWave:"sine",melodyGain:.6},forest:{bpm:112,root:130.81,bass:[0,0,5,5,7,7,5,5],melody:[12,14,16,12,19,null,16,null,17,16,14,12,14,null,12,null],bassWave:"triangle",melodyWave:"square",melodyGain:.45},cave:{bpm:92,root:110,bass:[0,null,3,null,5,null,3,null],melody:[12,null,15,null,17,15,12,null,10,null,12,null,15,null,12,null],bassWave:"sine",melodyWave:"triangle",melodyGain:.55},fortress:{bpm:132,root:98,bass:[0,0,0,3,0,0,0,5],melody:[12,12,15,12,17,15,12,null,10,10,12,10,8,null,7,null],bassWave:"sawtooth",melodyWave:"square",melodyGain:.4},boss:{bpm:150,root:98,bass:[0,0,3,3,0,0,6,5],melody:[12,null,12,15,12,null,18,17,12,null,12,15,19,null,17,15],bassWave:"sawtooth",melodyWave:"sawtooth",melodyGain:.35}};function Ic(r,e){return r*Math.pow(2,e/12)}class hv{constructor(){this.ctx=null,this.noiseBuffer=null,this.volumes={master:.8,sfx:1,music:.6},this.lastPlayed=new Map,this.unlocked=!1,this.cleanup=[],this.track=null,this.pendingTrack=null,this.nextNoteTime=0,this.step=0,this.schedulerId=0,this.trackGain=null}attach(e=window){const t=()=>{if(this.ensureContext(),this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume(),this.ctx&&(this.unlocked=!0),this.pendingTrack){const i=this.pendingTrack;this.pendingTrack=null,this.playMusic(i)}};for(const i of["pointerdown","keydown","touchend"])e.addEventListener(i,t,{passive:!0}),this.cleanup.push(()=>e.removeEventListener(i,t));const n=()=>{this.ctx&&(document.hidden?this.ctx.suspend():this.ctx.resume())};document.addEventListener("visibilitychange",n),this.cleanup.push(()=>document.removeEventListener("visibilitychange",n))}get ready(){return this.unlocked&&this.ctx!==null}get currentTrack(){return this.track??this.pendingTrack}ensureContext(){if(!this.ctx)try{const e=window.AudioContext??window.webkitAudioContext;if(!e)return;this.ctx=new e,this.master=this.ctx.createGain(),this.sfxGain=this.ctx.createGain(),this.musicGain=this.ctx.createGain(),this.sfxGain.connect(this.master),this.musicGain.connect(this.master),this.master.connect(this.ctx.destination),this.applyVolumes();const t=this.ctx.sampleRate;this.noiseBuffer=this.ctx.createBuffer(1,t,this.ctx.sampleRate);const n=this.noiseBuffer.getChannelData(0);for(let i=0;i<t;i++)n[i]=Math.random()*2-1}catch(e){Be.warn("소리를 켤 수 없습니다 (Web Audio 미지원). 게임은 계속 진행됩니다.",e),this.ctx=null}}setVolumes(e){this.volumes={...this.volumes,...e},this.applyVolumes()}applyVolumes(){if(!this.ctx)return;const e=t=>Math.min(1,Math.max(0,t));this.master.gain.value=e(this.volumes.master),this.sfxGain.gain.value=e(this.volumes.sfx),this.musicGain.gain.value=e(this.volumes.music)}play(e,t=.03){if(!this.ctx||!this.unlocked||this.volumes.master<=0||this.volumes.sfx<=0)return;const n=this.ctx.currentTime,i=this.lastPlayed.get(e)??-1;if(!(n-i<t)){this.lastPlayed.set(e,n);for(const s of lv[e]){const a=n+(s.delay??0),o=this.ctx.createGain();if(o.gain.setValueAtTime(1e-4,a),o.gain.linearRampToValueAtTime(s.gain,a+.008),o.gain.exponentialRampToValueAtTime(1e-4,a+s.duration),o.connect(this.sfxGain),s.wave==="noise"){if(!this.noiseBuffer)continue;const l=this.ctx.createBufferSource();l.buffer=this.noiseBuffer,l.loop=!0;const c=this.ctx.createBiquadFilter();c.type="lowpass",c.frequency.value=s.filter??2e3,l.connect(c),c.connect(o),l.start(a),l.stop(a+s.duration+.02)}else{const l=this.ctx.createOscillator();l.type=s.wave,l.frequency.setValueAtTime(s.freq,a),s.freqEnd!==void 0&&l.frequency.exponentialRampToValueAtTime(Math.max(1,s.freqEnd),a+s.duration),l.connect(o),l.start(a),l.stop(a+s.duration+.02)}}}}playMusic(e){if(!this.ctx||!this.unlocked){this.pendingTrack=e;return}e!==this.track&&(this.stopMusic(),e&&(this.track=e,this.trackGain=this.ctx.createGain(),this.trackGain.gain.setValueAtTime(1e-4,this.ctx.currentTime),this.trackGain.gain.exponentialRampToValueAtTime(1,this.ctx.currentTime+.6),this.trackGain.connect(this.musicGain),this.step=0,this.nextNoteTime=this.ctx.currentTime+.05,this.schedule()))}stopMusic(){if(this.schedulerId&&(clearTimeout(this.schedulerId),this.schedulerId=0),this.trackGain&&this.ctx){const e=this.trackGain;e.gain.cancelScheduledValues(this.ctx.currentTime),e.gain.setValueAtTime(e.gain.value,this.ctx.currentTime),e.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+.4),setTimeout(()=>e.disconnect(),500)}this.trackGain=null,this.track=null,this.pendingTrack=null}schedule(){if(!this.ctx||!this.track||!this.trackGain)return;const e=cv[this.track],t=60/e.bpm,n=t/2,i=.25;for(;this.nextNoteTime<this.ctx.currentTime+i;){const s=this.step;if(s%2===0){const o=e.bass[s/2%e.bass.length];o!==null&&this.note(e.bassWave,Ic(e.root,o),this.nextNoteTime,t*.9,.22)}const a=e.melody[s%e.melody.length];a!==null&&this.note(e.melodyWave,Ic(e.root,a),this.nextNoteTime,n*.8,.14*e.melodyGain),this.nextNoteTime+=n,this.step++}this.schedulerId=window.setTimeout(()=>this.schedule(),100)}note(e,t,n,i,s){if(!this.ctx||!this.trackGain)return;const a=this.ctx.createOscillator(),o=this.ctx.createGain();a.type=e,a.frequency.value=t,o.gain.setValueAtTime(1e-4,n),o.gain.linearRampToValueAtTime(s,n+.01),o.gain.exponentialRampToValueAtTime(1e-4,n+i),a.connect(o),o.connect(this.trackGain),a.start(n),a.stop(n+i+.02)}dispose(){this.stopMusic(),this.cleanup.forEach(e=>e()),this.cleanup=[],this.ctx?.close(),this.ctx=null}}function uv(r,e,t=30,n=.5){if(r.length===0)return{next:e,message:null};const i=r.reduce((a,o)=>a+o,0)/r.length;if(i>=t)return{next:e,message:null};if(e.quality==="high")return{next:{...e,quality:"medium"},message:`화면이 끊겨(평균 ${Math.round(i)} FPS) 화질을 '중간'으로 낮췄습니다`};if(e.shadows)return{next:{...e,shadows:!1},message:`화면이 끊겨(평균 ${Math.round(i)} FPS) 그림자를 껐습니다`};const s=Math.round(Math.max(n,e.resolution-.2)*10)/10;return s<e.resolution?{next:{...e,resolution:s},message:`화면이 끊겨(평균 ${Math.round(i)} FPS) 해상도를 ${s.toFixed(1)}× 로 낮췄습니다`}:{next:e,message:null}}const qh={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class is{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const dv=new Mr(-1,1,1,-1,0,1);class fv extends wt{constructor(){super(),this.setAttribute("position",new at([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new at([0,2,0,0,2,0],2))}}const pv=new fv;class po{constructor(e){this._mesh=new le(pv,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,dv)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class mv extends is{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Bt?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=$i.clone(e.uniforms),this.material=new Bt({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new po(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Dc extends is{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class gv extends is{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class _v{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new ve);this._width=n.width,this._height=n.height,t=new Zt(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:dn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new mv(qh),this.copyPass.material.blending=Tn,this.clock=new H0}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,s=this.passes.length;i<s;i++){const a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),a.needsSwap){if(n){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Dc!==void 0&&(a instanceof Dc?n=!0:a instanceof gv&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new ve);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const xv={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class vv extends is{constructor(){super();const e=xv;this.uniforms=$i.clone(e.uniforms),this.material=new S0({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new po(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ke.getTransfer(this._outputColorSpace)===rt&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===kc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Oc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===zc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Va?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Bc&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class yv extends is{constructor(e,t,n=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new ue}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=i}}const Mv={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ue(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Ji extends is{constructor(e,t,n,i){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new ve(e.x,e.y):new ve(256,256),this.clearColor=new ue(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new Zt(s,a,{type:dn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const d=new Zt(s,a,{type:dn});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const f=new Zt(s,a,{type:dn});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),s=Math.round(s/2),a=Math.round(a/2)}const o=Mv;this.highPassUniforms=$i.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Bt({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new ve(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=qh;this.copyUniforms=$i.clone(h.uniforms),this.blendMaterial=new Bt({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:ar,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new ue,this.oldClearAlpha=1,this.basic=new zt,this.fsQuad=new po(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new ve(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,s){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=Ji.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Ji.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),o=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=a}getSeperableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new Bt({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new ve(.5,.5)},direction:{value:new ve(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(e){return new Bt({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Ji.BlurDirectionX=new ve(1,0);Ji.BlurDirectionY=new ve(0,1);class Sv extends Qa{constructor(e=null){super();const t=new je;t.deleteAttribute("uv");const n=new hi({side:Pt}),i=new hi;let s=5;e!==null&&e._useLegacyLights===!1&&(s=900);const a=new Rh(16777215,s,28,2);a.position.set(.418,16.199,.3),this.add(a);const o=new le(t,n);o.position.set(-.757,13.219,.717),o.scale.set(31.713,28.305,28.591),this.add(o);const l=new le(t,i);l.position.set(-10.906,2.009,1.846),l.rotation.set(0,-.195,0),l.scale.set(2.328,7.905,4.651),this.add(l);const c=new le(t,i);c.position.set(-5.607,-.754,-.758),c.rotation.set(0,.994,0),c.scale.set(1.97,1.534,3.955),this.add(c);const h=new le(t,i);h.position.set(6.167,.857,7.803),h.rotation.set(0,.561,0),h.scale.set(3.927,6.285,3.687),this.add(h);const u=new le(t,i);u.position.set(-2.017,.018,6.124),u.rotation.set(0,.333,0),u.scale.set(2.002,4.566,2.064),this.add(u);const d=new le(t,i);d.position.set(2.291,-.756,-2.621),d.rotation.set(0,-.286,0),d.scale.set(1.546,1.552,1.496),this.add(d);const f=new le(t,i);f.position.set(-2.193,-.369,-5.547),f.rotation.set(0,.516,0),f.scale.set(3.875,3.487,2.986),this.add(f);const g=new le(t,Ii(50));g.position.set(-16.116,14.37,8.208),g.scale.set(.1,2.428,2.739),this.add(g);const _=new le(t,Ii(50));_.position.set(-16.109,18.021,-8.207),_.scale.set(.1,2.425,2.751),this.add(_);const m=new le(t,Ii(17));m.position.set(14.904,12.198,-1.832),m.scale.set(.15,4.265,6.331),this.add(m);const p=new le(t,Ii(43));p.position.set(-.462,8.89,14.52),p.scale.set(4.38,5.441,.088),this.add(p);const M=new le(t,Ii(20));M.position.set(3.235,11.486,-12.541),M.scale.set(2.5,2,.1),this.add(M);const x=new le(t,Ii(100));x.position.set(0,20,0),x.scale.set(1,.1,1),this.add(x)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function Ii(r){const e=new zt;return e.color.setScalar(r),e}class bv{constructor(e){this.composer=null,this.bloom=null,this.quality="medium",this.envMap=null,this.width=1,this.height=1,this.sceneRef=null,this.cameraRef=null;const t=W.graphics;this.renderer=new xh({canvas:e,antialias:t.antialias,powerPreference:"high-performance"}),this.renderer.outputColorSpace=ot,this.renderer.toneMapping=Va,this.renderer.toneMappingExposure=1,this.renderer.shadowMap.enabled=t.shadows,this.renderer.shadowMap.type=Fc,this.pmrem=new Aa(this.renderer)}environment(){return this.envMap||(this.envMap=this.pmrem.fromScene(new Sv,.04).texture),this.envMap}setExposure(e){this.renderer.toneMappingExposure=e}get currentQuality(){return this.quality}setQuality(e){this.quality=e;const t=Zi[e];if(t.bloom){if(this.composer||this.buildComposer(t.msaa),this.bloom){const n=W.graphics.bloom;this.bloom.strength=n.strength,this.bloom.radius=n.radius,this.bloom.threshold=n.threshold}}else this.composer&&(this.composer.dispose(),this.composer=null,this.bloom=null)}buildComposer(e){const t=this.renderer,n=t.capabilities.isWebGL2?e:0,i=new Zt(this.width,this.height,{samples:n,type:dn});this.composer=new _v(t,i),this.composer.setPixelRatio(t.getPixelRatio()),this.composer.setSize(this.width,this.height);const s=W.graphics.bloom;this.bloom=new Ji(new ve(this.width,this.height),s.strength,s.radius,s.threshold),this.composer.addPass(new yv(this.sceneRef??new Qa,this.cameraRef??new Lt)),this.composer.addPass(this.bloom),this.composer.addPass(new vv)}render(e,t){if((this.sceneRef!==e||this.cameraRef!==t)&&(this.sceneRef=e,this.cameraRef=t,this.composer)){const n=this.composer.passes[0];n.scene=e,n.camera=t}this.composer?this.composer.render():this.renderer.render(e,t)}setSize(e,t){this.width=e,this.height=t,this.renderer.setSize(e,t,!1),this.composer?.setSize(e,t),this.bloom?.setSize(e,t)}setPixelRatio(e){this.renderer.setPixelRatio(e),this.composer?.setPixelRatio(e),this.composer&&this.composer.setSize(this.width,this.height)}get bloomEnabled(){return this.composer!==null}dispose(){this.composer?.dispose(),this.envMap?.dispose(),this.pmrem.dispose(),this.renderer.dispose()}}class Ev{constructor(e){this.camera=e,this.desired=new C,this.lookTarget=new C,this.first=!0,this.distanceScale=1,this.shakeAmp=0,this.shakeTime=0,this.shakeTotal=0,this.shakeOffset=new C}shake(e,t){this.shakeAmp=Math.max(this.shakeAmp,e),this.shakeTime=this.shakeTotal=Math.max(this.shakeTime,t)}update(e,t){const n=W.camera,i=this.distanceScale;if(this.desired.set(t.x+n.offset.x*i,t.y+n.offset.y*i,t.z+n.offset.z*i),this.first)this.camera.position.copy(this.desired),this.first=!1;else{const s=1-Math.exp(-n.smoothing*e);this.camera.position.lerp(this.desired,s)}if(this.lookTarget.set(t.x,t.y+n.lookAtHeight,t.z),this.shakeTime>0){this.shakeTime=Math.max(0,this.shakeTime-e);const s=this.shakeTotal>0?this.shakeTime/this.shakeTotal:0,a=this.shakeAmp*s*s;this.shakeOffset.set((Math.random()-.5)*2*a,(Math.random()-.5)*2*a,(Math.random()-.5)*2*a),this.camera.position.add(this.shakeOffset),this.shakeTime===0&&(this.shakeAmp=0)}this.camera.lookAt(this.lookTarget)}getYaw(){const e=W.camera.offset;return Math.atan2(e.x,e.z)}}class wv{constructor(e,t){this.canvas=e,this.scene=new Qa,this.input=new Mx,this.dungeonDef=sn[0],this.bossCfg=Na(sn[0]),this.unlockedNow=null,this.qualityFrames=0,this.qualityTime=0,this.qualitySamples=[],this.contextLost=!1,this.restoreGraceUntil=0,this.hitStopTime=0,this.face=Ox(),this.playerUsesGltf=!1,this.audio=new hv,this.mortars=[],this.settings=li(),this.mode="menu",this.runActive=!1,this.stats=new Ix,this.equipment=new bx,this.paused=!1,this.boss=null,this.bossDefeated=!1,this.difficulty=Hx(),this.storage=sv(),this.records={...Tc},this.hasSavedProgress=!1,this.saveBlocked=!1,this.saveDirty=!1,this.saveTimer=0,this.lastSavedAt=null,this.saveStatus="",this.projTmp=new C,this.raycaster=new t_,this.groundPlane=new Fn(new C(0,1,0),0),this.aimHit=new C,this.camTarget=new C,this.running=!1,this.ended=!1,this.rafId=0,this.lastTime=0,this.frames=0,this.fpsFrames=0,this.fpsTime=0,this.flushSave=()=>{this.saveDirty&&this.saveNow()},this.onVisibility=()=>{document.visibilityState==="hidden"&&this.flushSave()},this.currentPrompt="",this.loop=a=>{if(this.running){this.rafId=requestAnimationFrame(this.loop);try{this.frame(a)}catch(o){if(this.restoreGraceUntil>0){if(performance.now()<this.restoreGraceUntil){Be.warn("그래픽 복구 중 프레임 오류를 건너뜁니다.",o);return}this.restoreGraceUntil=0,Be.warn("그래픽 복구에 실패해 페이지를 다시 엽니다.",o),this.flushSave(),this.hud.showBanner("그래픽 복구 실패 — 다시 여는 중…",3e3),location.reload();return}throw this.stop(),this.flushSave(),Be.error("게임 루프에서 오류가 나 멈췄습니다. 새로고침(F5)하면 저장된 진행에서 이어집니다.",o),o}}},this.resize=()=>{const a=this.canvas.clientWidth||window.innerWidth,o=this.canvas.clientHeight||window.innerHeight;this.pipeline.setSize(a,o),this.camera.aspect=a/o,this.camera.updateProjectionMatrix()};for(const a of s_(W))Be.warn(`설정 '${a.path}' 값 ${a.from} 은(는) 허용 범위를 벗어나 ${a.to} 로 보정했습니다.`);this.loadSettingsFromStorage();const n=W.graphics;this.pipeline=new bv(e),this.renderer=this.pipeline.renderer,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,n.maxPixelRatio)),e.addEventListener("webglcontextlost",a=>{a.preventDefault(),this.contextLost=!0,this.hud.showBanner("그래픽 연결이 끊겼습니다. 복구 중…",4e3),Be.warn("WebGL 컨텍스트가 끊겼습니다. 복구를 기다립니다.")}),e.addEventListener("webglcontextrestored",()=>{this.contextLost=!1,this.lastTime=performance.now(),this.restoreGraceUntil=performance.now()+3e3,this.hud.showBanner("그래픽 연결이 복구됐습니다",1500),Be.info("WebGL 컨텍스트가 복구됐습니다.")});const i=W.camera;this.camera=new Lt(i.fov,1,i.near,i.far),this.scene.environment=this.pipeline.environment(),this.dungeon=new hc(this.scene,this.dungeonDef,this.settings.quality),this.pipeline.setExposure(this.dungeonDef.theme.exposure),this.chests=new oc(this.scene,this.dungeonDef.chests),this.dungeon.addCollisionBoxes(this.chests.getCollisionBoxes());const s={getObstacleBoxes:()=>this.dungeon.getObstacleBoxes(),getArenaHalfSize:()=>this.dungeon.getArenaHalfSize()};this.player=new Dx(Ux(W.player.colors),W.player.startPosition),this.scene.add(this.player.object3d),this.cameraCtrl=new Ev(this.camera),this.controller=new Nx(this.player,this.input,s,()=>this.cameraCtrl.getYaw(),()=>1+this.equipment.totals().moveSpeed),this.controller.onJump=()=>this.audio.play("jump"),this.controller.onDash=a=>{this.audio.play("dash");const o=this.player.position;this.effects.burst(new C(o.x-a.x*.5,.4,o.z-a.z*.5),6091480,10,4),this.settings.haptics&&tr(10)},this.aimRing=new le(new ai(.55,.72,32),new zt({color:6091480,transparent:!0,opacity:.8,side:Ot,depthWrite:!1})),this.aimRing.rotation.x=-Math.PI/2,this.aimRing.position.y=.06,this.aimRing.visible=!1,this.scene.add(this.aimRing),this.effects=new f_(this.scene),this.projectiles=new m_(this.scene),this.spawner=new yx(this.scene),this.applyDifficultyToSpawner(),this.spawner.spawnFromConfig(this.dungeonDef.spawns),this.combat=new d_(this.player,this.input,()=>this.spawner.getEnemies(),()=>this.getAimPoint(),this.effects,this.projectiles,(a,o,l)=>{this.audio.play(l?"kill":"enemyHit",.05),l&&(this.hitStopTime=Math.max(this.hitStopTime,a.type==="boss"?W.juice.bossHitStop:W.juice.hitStop.duration),a.type==="boss"&&this.cameraCtrl.shake(W.juice.slamShake.amp,.6),this.loot.dropFor(a.def.score,{x:a.position.x,z:a.position.z},this.dungeonDef.rewardMul),this.settings.haptics&&tr(a.type==="boss"?[60,40,120]:18)),this.settings.showDamageNumbers&&(this.projTmp.set(a.position.x,1.6,a.position.z),this.damageNumbers.show(this.projTmp,l?a.def.score:o,l?"kill":"enemy"))},()=>this.effectiveDamageMultiplier(),a=>this.equipment.weaponAttack(a)),this.combat.onAttack=a=>this.audio.play(a),this.loot=new Lx(this.scene),this.damageNumbers=new Vx(t,a=>this.projectToScreen(a)),this.guide=new Bx(t,()=>this.guide.hide()),this.touch=new Sx(t,this.input,()=>{this.mode==="play"&&this.openMenu()},()=>{this.mode==="play"&&this.toggleInventory()}),this.hud=new Wx(t),this.hud.setDungeonName(this.dungeonDef.name),this.result=new qx(t,()=>this.retry(),()=>this.openMenu(),()=>this.openDungeons()),this.dungeonSelect=new w_(t,{clears:()=>this.records.dungeonClears,level:()=>this.stats.level,enter:a=>this.enterDungeon(a),onClose:()=>this.closeDungeons()}),this.loadFromStorage(),this.menu=new Gx(t,{newGame:()=>this.newGame(),continueGame:()=>this.continueGame(),openSettings:()=>this.openSettings(),openDungeons:()=>this.openDungeons(),hasProgress:()=>this.runActive||this.hasSavedProgress,progressText:()=>this.progressText(),saveNote:()=>this.saveStatus,openInventory:()=>this.toggleInventory(!0),openGuide:()=>this.guide.show(),hasRun:()=>this.runActive,difficulty:{get:()=>this.difficulty,set:a=>this.setDifficulty(a)}}),this.settingsUI=new Zx(t,{get:()=>this.settings,set:(a,o)=>this.updateSetting(a,o),resetAll:()=>this.resetSettings(),onClose:()=>this.closeSettings(),face:{get:()=>this.face,pick:async a=>{const o=await kx(a);this.face=o,bc(o)||Be.warn("얼굴 사진을 브라우저에 저장하지 못했습니다 (용량 또는 저장소 제한). 이번 실행에서만 보입니다."),await this.applyFace(),Be.info("얼굴 사진을 적용했습니다.")},clear:()=>{this.face=null,bc(null),this.applyFace()}}}),this.inventoryUI=new Px(t,this.equipment,{onChange:()=>{this.applyStats(),this.markDirty()},onClose:()=>this.toggleInventory(!1),getSummary:()=>this.statSummary()}),this.applyDifficulty(),this.applySettings(),this.input.attach(window,e),this.audio.attach(window),t.addEventListener("click",a=>{a.target.closest("button")&&this.audio.play("ui")}),this.audio.playMusic("menu"),this.input.onPress(W.controls.toggleGuide,()=>this.guide.toggle()),this.input.onPress(W.controls.restart,()=>{this.mode==="result"&&this.retry()}),this.input.onPress(W.controls.toggleInventory,()=>{this.mode!=="menu"&&this.toggleInventory()}),this.input.onPress(W.controls.interact,()=>this.tryInteract()),this.input.onPress(["Escape"],()=>{this.guide.visible?this.guide.hide():this.settingsUI.visible?this.settingsUI.pressBack():this.dungeonSelect.visible?this.closeDungeons():this.inventoryUI.visible?this.toggleInventory(!1):this.mode==="play"&&this.openMenu()}),this.input.onPress(["Enter"],()=>{this.mode==="menu"&&!this.inventoryUI.visible&&!this.guide.visible&&!this.settingsUI.visible&&!this.dungeonSelect.visible&&this.menu.pressPrimary()}),this.hud.hide(),this.menu.show(),this.applyFace(),ki.onPlayerReady=()=>this.swapPlayerModel(),ki.load("./"),window.addEventListener("resize",this.resize),window.addEventListener("beforeunload",this.flushSave),document.addEventListener("visibilitychange",this.onVisibility),this.resize(),Be.info(`${W.meta.title} v${W.meta.version} 준비 완료 (적 ${this.spawner.aliveCount}마리)`)}start(){this.running||(this.running=!0,this.lastTime=performance.now(),this.rafId=requestAnimationFrame(this.loop))}stop(){this.running=!1,cancelAnimationFrame(this.rafId)}setDifficulty(e){e!==this.difficulty&&(this.difficulty=e,this.settings.difficulty=e,fs(this.storage,this.settings),this.settingsUI?.refresh(),this.markDirty(),wc(e),this.applyDifficulty(),this.restart(),Be.info(`난이도: ${Oi(e).label}`))}getDifficulty(){return this.difficulty}applyDifficultyToSpawner(){const e=Oi(this.difficulty);this.spawner.multipliers={hp:e.enemyHp*this.settings.enemyHpMul,speed:e.enemySpeed}}loadSettingsFromStorage(){const e=Kx(this.storage);this.settings=e.settings;for(const t of e.warnings)Be.warn(`설정 보정: ${t}`);e.found||(this.settings.difficulty=this.difficulty),this.difficulty=this.settings.difficulty}updateSetting(e,t){const n=Vh({...this.settings,[e]:t}).settings;if(e==="difficulty"){this.settings=n,fs(this.storage,this.settings),this.setDifficulty(n.difficulty);return}this.settings=n,fs(this.storage,this.settings),this.applySettings()}resetSettings(){const e=this.settings.difficulty;this.settings=li(),fs(this.storage,this.settings),this.applySettings(),e!==this.settings.difficulty&&this.setDifficulty(this.settings.difficulty),Be.info("설정을 기본값으로 되돌렸습니다.")}applySettings(){const e=this.settings;this.cameraCtrl.distanceScale=e.cameraDistance,this.renderer.shadowMap.enabled!==e.shadows&&(this.renderer.shadowMap.enabled=e.shadows,this.scene.traverse(t=>{const n=t;if(!n.isMesh)return;const i=Array.isArray(n.material)?n.material:[n.material];for(const s of i)s.needsUpdate=!0})),this.dungeon.setShadows(e.shadows),this.pipeline.setQuality(e.quality),this.dungeon.applyQuality(e.quality),e.showFps||this.guide.setHudText(""),this.applyPixelRatio(),this.audio.setVolumes({master:e.soundMaster,sfx:e.soundSfx,music:e.soundMusic}),this.touch.isFloating!==e.floatingJoystick&&this.touch.setFloating(e.floatingJoystick),this.touch.setLeftHanded(e.leftHanded),this.touch.setButtonScale(e.touchButtonScale),this.updateTouchVisibility(),this.applyDifficultyToSpawner(),this.applyStats()}applyPixelRatio(){const e=Math.min(window.devicePixelRatio||1,W.graphics.maxPixelRatio);this.pipeline.setPixelRatio(Math.max(.3,e*this.settings.resolution))}getSettings(){return{...this.settings}}openSettings(){this.inventoryUI.hide(),this.guide.hide(),this.settingsUI.show()}closeSettings(){this.settingsUI.hide(),this.mode==="menu"&&this.menu.refresh()}applyDifficulty(){this.applyDifficultyToSpawner(),this.menu?.refresh()}newGame(){this.stats.reset(),this.equipment.reset(),this.records=rr(Tc),this.saveBlocked=!1,ov(this.storage),this.enterDungeon(sn[0]),Be.info("새 게임을 시작합니다.")}enterDungeon(e){if(!Da(e,this.records.dungeonClears)){Be.warn(`던전 '${e.name}' 은(는) 아직 잠겨 있습니다.`);return}this.loadDungeon(e),this.restart(),this.runActive=!0,this.saveNow(),this.dungeonSelect.hide(),this.enterPlay(),this.hud.showBanner(e.name,1800)}loadDungeon(e){e.id===this.dungeonDef.id&&this.dungeon.def.id===e.id||(this.chests.dispose(),this.dungeon.dispose(),this.dungeonDef=e,this.bossCfg=Na(e),this.dungeon=new hc(this.scene,e,this.settings.quality),this.pipeline.setExposure(e.theme.exposure),this.chests=new oc(this.scene,e.chests),this.dungeon.addCollisionBoxes(this.chests.getCollisionBoxes()),this.hud.setDungeonName(e.name),Be.info(`던전 '${e.name}' 을(를) 불러왔습니다 (적 ${e.spawns.length}마리, 상자 ${e.chests.length}개).`))}openDungeons(){!this.runActive&&!this.hasSavedProgress||(this.inventoryUI.hide(),this.settingsUI.hide(),this.guide.hide(),this.mode==="result"&&(this.result.hide(),this.mode="menu",this.hud.hide(),this.menu.show()),this.dungeonSelect.show())}closeDungeons(){this.dungeonSelect.hide(),this.mode==="menu"&&this.menu.refresh()}getDungeonId(){return this.dungeonDef.id}continueGame(){if(!this.runActive){this.hasSavedProgress&&this.openDungeons();return}this.enterPlay()}retry(){this.restart(),this.runActive=!0,this.enterPlay()}openMenu(){this.mode="menu",this.inventoryUI.hide(),this.paused=!1,this.result.hide(),this.hud.hide(),this.touch.hide(),this.saveNow(),this.menu.show(),this.audio.playMusic("menu")}dungeonMusic(){const e=this.dungeonDef.id;return e==="cave"||e==="fortress"||e==="forest"?e:"forest"}async applyFace(){const e=this.player.currentModel;if(e.setFace){if(!this.face){e.setFace(null);return}try{e.setFace(await zx(this.face))}catch(t){Be.warn("얼굴 사진을 붙이지 못했습니다.",t)}}}swapPlayerModel(){const e=ki.createPlayerModel();e&&(this.player.setModel(e),this.playerUsesGltf=!0,Be.info("플레이어 정식 모델로 교체했습니다."))}getFace(){return this.face}updateTouchVisibility(){const e=this.settings.touchControls&&this.mode==="play";e?this.touch.show():this.touch.hide(),document.body.classList.toggle("touch-mode",e)}loadFromStorage(){const e=rv(this.storage);switch(e.kind){case"loaded":if(iv(e.data,{stats:this.stats,equipment:this.equipment}),this.records=rr(e.data.records),this.difficulty=e.data.difficulty,wc(this.difficulty),this.hasSavedProgress=Cc(e.data),this.lastSavedAt=e.data.savedAt,this.saveStatus=`마지막 저장: ${Nc(e.data.savedAt)}`,e.warnings.length>0){this.saveStatus+=" · 일부 항목을 보정했습니다 (F12 콘솔 참고)";for(const t of e.warnings)Be.warn(`저장 데이터 보정: ${t}`)}Be.info(`저장 데이터를 불러왔습니다. 레벨 ${this.stats.level} · 골드 ${this.stats.gold}`);break;case"corrupt":this.saveStatus="저장 데이터가 손상되어 새로 시작합니다. 손상된 데이터는 따로 보관했습니다.",Be.warn(e.message);break;case"newer":this.saveBlocked=!0,this.saveStatus="이 저장 데이터는 더 새로운 버전의 게임에서 만든 것이라 읽지 않습니다. 새 게임을 누르면 덮어씁니다.",Be.warn(e.message);break;case"unavailable":this.saveStatus="이 브라우저에서는 저장이 되지 않습니다 (사생활 보호 모드 등).",Be.warn("브라우저 저장소를 쓸 수 없어 진행이 저장되지 않습니다.");break;default:this.saveStatus="저장된 진행이 없습니다."}}markDirty(){this.saveDirty=!0}saveNow(){if(this.saveDirty=!1,this.saveTimer=0,this.saveBlocked)return!1;const e=ev({stats:this.stats,equipment:this.equipment,difficulty:this.difficulty,records:this.records}),t=av(this.storage,e);return t?(this.hasSavedProgress=Cc(e),this.lastSavedAt=e.savedAt,this.saveStatus=`마지막 저장: ${Nc(e.savedAt)}`):this.saveStatus=this.storage?"저장에 실패했습니다 (저장 공간 부족 또는 차단). 진행이 기억되지 않을 수 있습니다.":"이 브라우저에서는 저장이 되지 않습니다 (사생활 보호 모드 등).",this.menu?.visible&&this.menu.refresh(),t}progressText(){if(!this.runActive&&!this.hasSavedProgress)return"";const e=this.records,t=sn.filter(i=>Da(i,e.dungeonClears)).length,n=[`레벨 ${this.stats.level}`,`골드 ${this.stats.gold}`,`클리어 ${e.clears}회`,`열린 던전 ${t}/${sn.length}`];return e.bestScore>0&&n.push(`최고 점수 ${e.bestScore}`),this.runActive||n.push("이어하기는 던전 선택부터"),n.join(" · ")}getRecords(){return rr(this.records)}enterPlay(){this.mode="play",this.menu.hide(),this.guide.hide(),this.settingsUI.hide(),this.dungeonSelect.hide(),this.result.hide(),this.hud.show(),this.updateTouchVisibility(),this.audio.playMusic(this.boss&&this.boss.alive?"boss":this.dungeonMusic()),this.lastTime=performance.now(),this.canvas.focus()}tryInteract(){if(this.ended||this.paused||this.player.health.isDead)return;const e=this.player.position,t=this.chests.nearest({x:e.x,z:e.z});if(!t||!this.chests.open(t))return;const n=this.loot.dropChest({x:t.x,z:t.z});this.audio.play("chest"),this.settings.haptics&&tr(25),this.effects.burst(new C(t.x,1,t.z),16765503,16,5),this.damageNumbers.showText(new C(t.x,1.8,t.z),"보물 상자!","#ffd23f"),Be.info(`보물 상자 개봉: ${n.map(i=>i.kind==="equip"?i.item?.name:`${i.kind} ${i.amount}`).join(", ")}`)}toggleInventory(e=!this.inventoryUI.visible){e?(this.inventoryUI.show(),this.paused=!0):(this.inventoryUI.hide(),this.paused=!1,this.lastTime=performance.now()),this.mode==="menu"&&this.menu.refresh()}applyStats(){const e=this.player.health;e.maxHp=this.effectiveMaxHp(),e.hp>e.maxHp&&(e.hp=e.maxHp)}effectiveMaxHp(){return Math.max(1,Math.round((this.stats.maxHp+this.equipment.totals().maxHp)*this.settings.playerHpMul))}effectiveDamageMultiplier(){return this.stats.damageMultiplier*this.settings.playerDamageMul}statSummary(){const e=this.equipment.totals(),t=Math.round((W.combat.melee.damage+this.equipment.weaponAttack("melee"))*this.effectiveDamageMultiplier()),n=Math.round((W.combat.ranged.damage+this.equipment.weaponAttack("ranged"))*this.effectiveDamageMultiplier()),i=Math.round((1+e.moveSpeed)*100);return`레벨 ${this.stats.level} · 골드 ${this.stats.gold} · 근접 ${t} · 원거리 ${n} · 방어 ${e.defense} · 최대 체력 ${this.player.health.maxHp} · 속도 ${i}%`}restart(){this.spawner.clear(),this.spawner.spawnFromConfig(this.dungeonDef.spawns),this.unlockedNow=null,this.projectiles.clear(),this.damageNumbers.clear(),this.loot.clear(),this.chests.reset(),this.boss=null,this.bossDefeated=!1,this.mortars.length=0,this.hud.setBoss(null),this.player.reset(W.player.startPosition),this.player.health.reset(this.effectiveMaxHp()),this.controller.reset(),this.combat.reset(),this.result.hide(),this.ended=!1,Be.info("전투를 다시 시작합니다.")}showResult(e,t){this.ended=!0,this.mode="result",this.runActive=!1,this.inventoryUI.hide(),this.touch.hide(),this.paused=!1,this.records.totalKills+=this.combat.kills,this.records.bestScore=Math.max(this.records.bestScore,this.combat.score),this.audio.play(this.player.health.isDead?"defeat":"clear"),this.audio.playMusic(null),this.saveNow(),this.result.show(e,t)}dispose(){this.stop(),this.input.detach(),this.audio.dispose(),window.removeEventListener("resize",this.resize),window.removeEventListener("beforeunload",this.flushSave),document.removeEventListener("visibilitychange",this.onVisibility),this.aimRing.removeFromParent(),this.aimRing.geometry.dispose(),this.aimRing.material.dispose(),this.spawner.dispose(),this.projectiles.dispose(),this.loot.dispose(),this.chests.dispose(),this.effects.dispose(),this.player.dispose(),this.dungeon.dispose(),this.pipeline.dispose()}setPlayerPosition(e,t){this.player.position.set(e,0,t)}debugDefeatRegularEnemies(){for(const e of this.spawner.getEnemies())e.alive&&e!==this.boss&&this.combat.damageEnemy(e,99999,{x:0,z:1},0)}getDebugState(){const e=this.player.position,t=this.camera.position,n=this.input.getPointer();return{running:this.running,frames:this.frames,ended:this.ended,settings:{...this.settings},dungeon:{id:this.dungeonDef.id,name:this.dungeonDef.name,arenaHalfSize:this.dungeon.getArenaHalfSize(),obstacles:this.dungeon.getObstacleBoxes().length},dungeonSelectVisible:this.dungeonSelect.visible,unlockedNow:this.unlockedNow?.id??null,mortars:this.mortars.length,hitStop:this.hitStopTime,bossModel:this.bossCfg.model,settingsVisible:this.settingsUI.visible,touchVisible:this.touch.visible,floatingJoystick:this.touch.isFloating,dash:{active:this.controller.dashing,cooldown:this.controller.dashCooldownRatio,invulnerable:this.player.health.invulnerable},aimRingVisible:this.aimRing.visible,audio:{ready:this.audio.ready,track:this.audio.currentTrack},contextLost:this.contextLost,face:this.face!==null,faceVisible:this.player.faceVisible,models:{loaded:ki.loadedKeys,playerGltf:this.playerUsesGltf},pixelRatio:this.renderer.getPixelRatio(),interactButtonVisible:this.touch.visible&&!document.getElementById("touch-interact")?.hidden,shadowsEnabled:this.renderer.shadowMap.enabled,quality:this.pipeline.currentQuality,bloomEnabled:this.pipeline.bloomEnabled,exposure:this.renderer.toneMappingExposure,cameraDistanceScale:this.cameraCtrl.distanceScale,save:{status:this.saveStatus,lastSavedAt:this.lastSavedAt,hasSavedProgress:this.hasSavedProgress,blocked:this.saveBlocked,dirty:this.saveDirty,records:{...this.records}},player:{x:e.x,z:e.z,facing:this.player.facing,moving:this.player.moving,hp:this.player.health.hp,maxHp:this.player.health.maxHp},camera:{x:t.x,y:t.y,z:t.z},guideVisible:this.guide.visible,resultVisible:this.result.visible,mode:this.mode,menuVisible:this.menu.visible,runActive:this.runActive,enemies:this.spawner.getEnemies().map(i=>({type:i.type,x:i.position.x,z:i.position.z,hp:i.health.hp,state:i.ai.state})),aliveEnemies:this.spawner.aliveCount,projectiles:this.projectiles.count,playerY:this.player.jumpY,difficulty:this.difficulty,pickups:this.loot.count,stats:{level:this.stats.level,xp:this.stats.xp,xpToNext:this.stats.xpToNext,gold:this.stats.gold,maxHp:this.stats.maxHp},equipment:{inventory:this.equipment.inventory.length,equipped:Object.fromEntries(Object.entries(this.equipment.equipped).map(([i,s])=>[i,s?s.name:null])),totals:this.equipment.totals()},paused:this.paused,inventoryVisible:this.inventoryUI.visible,chests:{opened:this.chests.openedCount,total:this.chests.total,nearby:this.chests.nearest({x:this.player.position.x,z:this.player.position.z})!==null},prompt:this.currentPrompt,boss:this.boss?{alive:this.boss.alive,hp:this.boss.health.hp,maxHp:this.boss.health.maxHp,state:this.boss.bossAI.state,phase2:this.boss.phase2}:null,bossDefeated:this.bossDefeated,kills:this.combat.kills,score:this.combat.score,input:{pointerX:n.x,pointerY:n.y,pointerHas:n.has,pressed:this.input.getPressedCodes()}}}projectToScreen(e){const t=this.projTmp.copy(e).project(this.camera);return t.z>1?null:{x:(t.x+1)/2*this.canvas.clientWidth,y:(1-t.y)/2*this.canvas.clientHeight}}getAimPoint(){if(this.settings.touchControls)return this.nearestEnemyPoint(W.combat.autoAimRange);const e=this.input.getPointer();if(!e.has)return null;this.raycaster.setFromCamera(new ve(e.x,e.y),this.camera);const t=this.raycaster.ray.intersectPlane(this.groundPlane,this.aimHit);return t?{x:t.x,z:t.z}:null}nearestEnemyPoint(e){const t=this.player.position;let n=null,i=e;for(const s of this.spawner.getEnemies()){if(!s.alive)continue;const a=Math.hypot(s.position.x-t.x,s.position.z-t.z);a<i&&(i=a,n=s)}return n?{x:n.position.x,z:n.position.z}:null}onEnemyAttack(e,t){if(this.ended)return;const n=this.player.position,i=e.position,s=Math.hypot(n.x-i.x,n.z-i.z)||1,a={x:(n.x-i.x)/s,z:(n.z-i.z)/s};if(t=t*Oi(this.difficulty).enemyDamage,e.def.attackKind==="ranged"){this.projectiles.spawn({x:i.x+a.x*(e.radius+.3),z:i.z+a.z*(e.radius+.3)},a,{damage:t,speed:e.def.projectileSpeed??10,lifetime:3,radius:.2,knockback:0,color:16733559,friendly:!1});return}this.damagePlayer(t,{x:i.x,z:i.z})}damagePlayer(e,t){if(this.ended)return;const n=Ex(e,this.equipment.totals().defense);if(!this.player.health.takeDamage(n))return;const i=this.player.position,s=Math.hypot(i.x-t.x,i.z-t.z)||1;this.controller.applyKnockback({x:(i.x-t.x)/s,z:(i.z-t.z)/s},W.player.hitKnockback),this.audio.play("hurt",.1),this.cameraCtrl.shake(W.juice.hitShake.amp,W.juice.hitShake.duration),this.settings.haptics&&tr(40),this.effects.burst(new C(i.x,1,i.z),16732025,6,4),this.settings.hitFlash&&this.hud.flashHit(),this.settings.showDamageNumbers&&this.damageNumbers.show(new C(i.x,2,i.z),n,"player"),this.player.health.isDead&&(this.records.deaths++,this.showResult("쓰러졌습니다",`처치 ${this.combat.kills} · 점수 ${this.combat.score} · 레벨 ${this.stats.level} · 골드 ${this.stats.gold}`),Be.info("플레이어가 쓰러졌습니다."))}onCollect(e,t){const n=new C(t.x,1.4,t.z);if(e.kind==="heal")this.audio.play("heal"),this.player.health.heal(e.amount),this.effects.burst(n,16732025,6,3),this.settings.showDamageNumbers&&this.damageNumbers.show(n,e.amount,"heal");else if(e.kind==="gold")this.audio.play("pickup",.06),this.stats.addGold(e.amount),this.markDirty(),this.effects.burst(n,16765503,4,2);else if(e.kind==="equip"){if(!e.item)return;if(this.equipment.add(e.item)){this.audio.play("equip"),this.markDirty();const i=W.equipment.rarities[e.item.rarity].color;this.effects.burst(n,i,10,4),this.damageNumbers.showText(n,`획득: ${e.item.name}`,i)}else this.loot.spawn(e,t),this.damageNumbers.showText(n,"가방이 가득 찼어요","#ff6b90")}else{const i=this.stats.addXp(e.amount);if(this.markDirty(),i===0?this.audio.play("pickup",.06):this.audio.play("levelup"),this.effects.burst(n,6091480,4,2),i>0){const s=this.player.health;this.applyStats(),s.heal(Math.round(s.maxHp*W.progression.levelUpHealRatio));const a=this.player.position;this.effects.burst(new C(a.x,1,a.z),16765503,24,7),this.damageNumbers.show(new C(a.x,2.4,a.z),this.stats.level,"levelup"),Be.info(`레벨 업! 레벨 ${this.stats.level} (최대 체력 ${s.maxHp}, 공격력 ×${this.stats.damageMultiplier.toFixed(2)})`)}}}spawnBoss(){const e=this.bossCfg,t=this.spawner.multipliers;this.boss=new xx({x:e.spawn.x,z:e.spawn.z},{hp:t.hp,speed:t.speed},e),this.spawner.addEnemy(this.boss),this.hud.showBanner(`${e.name} 등장!`),this.audio.play("bossAppear"),this.audio.playMusic("boss"),this.cameraCtrl.shake(W.juice.slamShake.amp*.8,.8),this.effects.burst(new C(e.spawn.x,1.5,e.spawn.z),e.color,30,9),Be.info(`보스 등장: ${e.name} (체력 ${this.boss.health.maxHp})`)}onBossAttack(e,t){if(this.ended)return;const n=Oi(this.difficulty).enemyDamage,i=e.position,s=this.player.position;if(t.kind==="contact")this.damagePlayer(t.damage*n,{x:i.x,z:i.z});else if(t.kind==="slam")this.audio.play("slam"),this.cameraCtrl.shake(W.juice.slamShake.amp,W.juice.slamShake.duration),this.effects.shockwave(new C(i.x,0,i.z),t.radius),this.effects.burst(new C(i.x,.5,i.z),16732025,20,6),Math.hypot(s.x-i.x,s.z-i.z)<=t.radius+W.player.radius&&this.player.jumpY<1&&this.damagePlayer(t.damage*n,{x:i.x,z:i.z});else if(t.kind==="summon"){const a=this.spawner.getEnemies().filter(l=>l.alive&&l.type===t.type).length,o=Math.max(0,Math.min(t.count,t.maxAlive-a));for(let l=0;l<o;l++){const c=l/Math.max(1,o)*Math.PI*2+Math.random()*.5,h=i.x+Math.sin(c)*(e.radius+1.2),u=i.z+Math.cos(c)*(e.radius+1.2);this.spawner.spawn(t.type,h,u)&&this.effects.burst(new C(h,1,u),9431295,10,5)}o>0&&(this.hud.showBanner("부하 소환!",900),this.audio.play("summon"))}else if(t.kind==="mortar")for(let a=0;a<t.count;a++){const o=Math.random()*Math.PI*2,l=a===0?0:Math.random()*t.spread,c=s.x+Math.sin(o)*l,h=s.z+Math.cos(o)*l;this.mortars.push({x:c,z:h,t:t.delay+a*.12,radius:t.radius,damage:t.damage*n}),this.effects.marker(new C(c,0,h),t.radius,t.delay+a*.12,16757071)}else{const a=Math.atan2(s.x-i.x,s.z-i.z);for(let o=0;o<t.count;o++){const l=t.aimed?a+(o-(t.count-1)/2)*Math.PI*2/t.count:o/t.count*Math.PI*2,c={x:Math.sin(l),z:Math.cos(l)};this.projectiles.spawn({x:i.x+c.x*(e.radius+.4),z:i.z+c.z*(e.radius+.4)},c,{damage:t.damage*n,speed:t.speed,lifetime:4,radius:.25,knockback:0,color:11561983,friendly:!1})}}}updateMortars(e){if(this.mortars.length===0)return;const t=this.player.position;for(let n=this.mortars.length-1;n>=0;n--){const i=this.mortars[n];if(i.t-=e,i.t>0||(this.mortars.splice(n,1),this.audio.play("boom",.08),this.cameraCtrl.shake(W.juice.slamShake.amp*.6,.3),this.effects.shockwave(new C(i.x,0,i.z),i.radius,.4,16757071),this.effects.burst(new C(i.x,.6,i.z),16742981,14,6),this.ended))continue;Math.hypot(t.x-i.x,t.z-i.z)<=i.radius+W.player.radius&&this.player.jumpY<1&&this.damagePlayer(i.damage,{x:i.x,z:i.z})}}onBossDefeated(){const e=this.bossCfg,t={x:this.boss.position.x,z:this.boss.position.z};this.loot.spawn({kind:"gold",amount:Math.round(e.reward.goldMin+Math.random()*(e.reward.goldMax-e.reward.goldMin))},{x:t.x-1,z:t.z}),this.loot.spawn({kind:"xp",amount:e.reward.xp},{x:t.x+1,z:t.z}),this.loot.spawn({kind:"equip",amount:0,item:Ax(e.reward.equipMinRarity)},{x:t.x,z:t.z+1}),this.loot.spawn({kind:"heal",amount:W.loot.healAmount*2},{x:t.x,z:t.z-1}),this.records.clears++;const n=this.dungeonDef.id,i=this.records.dungeonClears[n]??0;this.records.dungeonClears[n]=i+1;const s=E_(n);this.unlockedNow=i===0&&s?s:null,this.markDirty(),this.hud.showBanner(this.unlockedNow?`던전 클리어! '${this.unlockedNow.name}' 이(가) 열렸습니다`:"던전 클리어!",3e3),Be.info("보스를 처치했습니다. 던전 클리어!")}checkVictory(){if(!(this.ended||this.dungeonDef.spawns.length===0)){if(!this.boss){this.spawner.aliveCount===0&&this.spawnBoss();return}if(this.hud.setBoss(this.boss.alive?{name:this.bossCfg.name,hp:this.boss.health.hp,maxHp:this.boss.health.maxHp,phase2:this.boss.phase2}:null),!this.boss.alive&&!this.bossDefeated&&(this.bossDefeated=!0,this.onBossDefeated()),this.bossDefeated&&(this.loot.count===0||this.boss.removable)){const e=this.unlockedNow?` · 새 던전 '${this.unlockedNow.name}' 이(가) 열렸습니다!`:"";this.showResult("던전 클리어!",`${this.dungeonDef.name} · 처치 ${this.combat.kills} · 점수 ${this.combat.score} · 레벨 ${this.stats.level} · 골드 ${this.stats.gold}${e}`)}}}frame(e){const t=Math.min(.2,Math.max(0,(e-this.lastTime)/1e3));if(this.lastTime=e,this.contextLost)return;if(this.paused||this.mode==="menu"){this.pipeline.render(this.scene,this.camera);return}let n=t;for(this.hitStopTime>0&&(this.hitStopTime=Math.max(0,this.hitStopTime-t),n=t*W.juice.hitStop.timeScale);n>1e-6&&this.mode==="play";){const i=Math.min(W.performance.maxStep,n);n-=i,this.simulate(i)}this.hud.update({hp:this.player.health.hp,maxHp:this.player.health.maxHp,enemies:this.spawner.aliveCount,kills:this.combat.kills,score:this.combat.score,level:this.stats.level,xp:this.stats.xp,xpToNext:this.stats.xpToNext,gold:this.stats.gold}),this.pipeline.render(this.scene,this.camera),this.frames++,this.restoreGraceUntil>0&&(this.restoreGraceUntil=0),this.updateFps(t),this.updateAutoQuality(t)}simulate(e){const t=this.player.position;this.controller.update(e),this.ended||this.combat.update(e),this.spawner.update(e,{playerPos:{x:t.x,z:t.z},world:this.dungeon,onAttackPlayer:(s,a)=>this.onEnemyAttack(s,a),onBossAttack:(s,a)=>this.onBossAttack(s,a),playerRadius:W.player.radius}),this.projectiles.update(e,{world:this.dungeon,enemies:this.spawner.getEnemies(),playerPos:{x:t.x,z:t.z},playerY:this.player.jumpY,playerRadius:W.player.radius,onHitEnemy:(s,a,o)=>{this.ended||this.combat.damageEnemy(s,a.damage,o,a.knockback)},onHitPlayer:(s,a,o)=>this.damagePlayer(s.damage,o)}),this.loot.update(e,{x:t.x,z:t.z},(s,a)=>this.onCollect(s,a)),this.updateMortars(e),this.chests.update(e);const n=!this.ended&&this.chests.nearest({x:t.x,z:t.z})!==null;this.currentPrompt=n?`${W.controls.interact[0].replace("Key","")} 보물 상자 열기`:"",this.hud.setPrompt(this.currentPrompt),this.touch.setInteract(n),this.touch.setDodgeCooldown(this.controller.dashCooldownRatio);const i=this.settings.touchControls&&!this.ended?this.nearestEnemyPoint(W.combat.autoAimRange):null;this.aimRing.visible=i!==null,i&&this.aimRing.position.set(i.x,.06,i.z),this.hud.setChests(this.chests.openedCount,this.chests.total),this.player.update(e),this.effects.update(e),this.damageNumbers.update(e),this.camTarget.set(t.x,0,t.z),this.cameraCtrl.update(e,this.camTarget),this.dungeon.updateLight(t),this.dungeon.update(e),this.checkVictory(),this.saveTimer+=e,this.saveDirty&&this.saveTimer>=W.save.autoSaveInterval&&this.saveNow()}updateAutoQuality(e){if(!this.settings.autoQuality)return;this.qualityFrames++,this.qualityTime+=e;const t=W.performance;if(this.qualityTime<t.autoQualityInterval)return;this.qualitySamples.push(this.qualityFrames/this.qualityTime),this.qualityFrames=0,this.qualityTime=0;const n=uv(this.qualitySamples,{quality:this.settings.quality,shadows:this.settings.shadows,resolution:this.settings.resolution},t.autoQualityFps);this.qualitySamples.length=0,n.message&&(this.settings={...this.settings,quality:n.next.quality,shadows:n.next.shadows,resolution:n.next.resolution},fs(this.storage,this.settings),this.settingsUI.refresh(),this.applySettings(),this.hud.showBanner(n.message,2500),Be.info(`자동 화질 조절: ${n.message}`))}updateFps(e){this.settings.showFps&&(this.fpsFrames++,this.fpsTime+=e,this.fpsTime>=.5&&(this.guide.setHudText(`FPS ${Math.round(this.fpsFrames/this.fpsTime)}`),this.fpsFrames=0,this.fpsTime=0))}}function Nc(r){const e=new Date(r);if(Number.isNaN(e.getTime())||e.getTime()===0)return"알 수 없음";const t=n=>String(n).padStart(2,"0");return`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())} ${t(e.getHours())}:${t(e.getMinutes())}`}function Tv(r){let e=null;const t=(n,i)=>{e||(e=document.createElement("div"),e.className="error-box",r.appendChild(e)),e.innerHTML=`<b>${n}</b>
${i}

자세한 내용은 F12 → Console 탭, 해결 방법은 TROUBLESHOOTING.md 를 확인하세요.`};window.addEventListener("error",n=>{t("게임 실행 중 오류가 발생했습니다.",String(n.message||n.error||"알 수 없는 오류"))}),window.addEventListener("unhandledrejection",n=>{const i=n.reason;t("게임 실행 중 오류가 발생했습니다.",String(i?.message??i??"알 수 없는 오류"))})}function Av(r,e){const t=document.createElement("div");t.className="error-box",t.innerHTML=`<b>게임을 시작할 수 없습니다.</b>
${e}`,r.appendChild(t)}const Xh=document.getElementById("game-canvas"),_r=document.getElementById("ui-root");if(!Xh||!_r)throw new Error("index.html 에 #game-canvas 또는 #ui-root 요소가 없습니다.");Tv(_r);Rv();try{const r=new wv(Xh,_r);r.start(),new URLSearchParams(location.search).has("debug")&&(window.__heroX=r)}catch(r){Be.error("게임을 시작하지 못했습니다.",r),Av(_r,`이 브라우저에서 3D 화면(WebGL)을 켤 수 없거나 초기화에 실패했습니다.
최신 Chrome 또는 Edge 로 열어 보고, 그래도 안 되면 TROUBLESHOOTING.md 를 참고하세요.
오류: ${r instanceof Error?r.message:String(r)}`)}function Rv(){const r=i=>i.preventDefault();document.addEventListener("gesturestart",r,{passive:!1}),document.addEventListener("gesturechange",r,{passive:!1}),document.addEventListener("gestureend",r,{passive:!1}),document.addEventListener("touchmove",i=>{i.touches.length>1&&i.preventDefault()},{passive:!1});let e=0,t=0,n=0;document.addEventListener("touchend",i=>{const s=i.changedTouches[0],a=Date.now();s&&a-e<300&&Math.hypot(s.clientX-t,s.clientY-n)<30&&i.preventDefault(),e=a,s&&(t=s.clientX,n=s.clientY)},{passive:!1})}
