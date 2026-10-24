(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Zo="160",mu=0,Pa=1,gu=2,Yc=1,Kc=2,Tn=3,Pn=0,Dt=1,It=2,Ln=0,Vi=1,fr=2,Ia=3,Da=4,xu=5,si=100,_u=101,vu=102,Na=103,Ua=104,yu=200,Mu=201,bu=202,Su=203,Ro=204,Co=205,wu=206,Eu=207,Tu=208,Au=209,Ru=210,Cu=211,Lu=212,Pu=213,Iu=214,Du=0,Nu=1,Uu=2,pr=3,ku=4,Fu=5,Ou=6,zu=7,Qo=0,Bu=1,Hu=2,Xn=0,Jc=1,Zc=2,Qc=3,ea=4,Gu=5,eh=6,ka="attached",Vu="detached",th=300,Xi=301,ji=302,Lo=303,Po=304,Tr=306,$n=1e3,Zt=1001,mr=1002,St=1003,Io=1004,lr=1005,Gt=1006,nh=1007,pi=1008,jn=1009,Wu=1010,qu=1011,ta=1012,ih=1013,Wn=1014,Rn=1015,gn=1016,sh=1017,rh=1018,li=1020,Xu=1021,Qt=1023,ju=1024,$u=1025,ci=1026,$i=1027,Yu=1028,oh=1029,Ku=1030,ah=1031,lh=1033,Br=33776,Hr=33777,Gr=33778,Vr=33779,Fa=35840,Oa=35841,za=35842,Ba=35843,ch=36196,Ha=37492,Ga=37496,Va=37808,Wa=37809,qa=37810,Xa=37811,ja=37812,$a=37813,Ya=37814,Ka=37815,Ja=37816,Za=37817,Qa=37818,el=37819,tl=37820,nl=37821,Wr=36492,il=36494,sl=36495,Ju=36283,rl=36284,ol=36285,al=36286,hh=2200,uh=2201,Zu=2202,Es=2300,Yi=2301,qr=2302,Fi=2400,Oi=2401,gr=2402,na=2500,Qu=2501,ed=0,dh=1,Do=2,fh=3e3,hi=3001,td=3200,nd=3201,ia=0,id=1,en="",at="srgb",Et="srgb-linear",sa="display-p3",Ar="display-p3-linear",xr="linear",ot="srgb",_r="rec709",vr="p3",vi=7680,ll=519,sd=512,rd=513,od=514,ph=515,ad=516,ld=517,cd=518,hd=519,No=35044,cl="300 es",Uo=1035,Cn=2e3,yr=2001;class _i{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,o=i.length;s<o;s++)i[s].call(this,e);e.target=null}}}const Rt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let hl=1234567;const Ms=Math.PI/180,Ki=180/Math.PI;function cn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Rt[r&255]+Rt[r>>8&255]+Rt[r>>16&255]+Rt[r>>24&255]+"-"+Rt[e&255]+Rt[e>>8&255]+"-"+Rt[e>>16&15|64]+Rt[e>>24&255]+"-"+Rt[t&63|128]+Rt[t>>8&255]+"-"+Rt[t>>16&255]+Rt[t>>24&255]+Rt[n&255]+Rt[n>>8&255]+Rt[n>>16&255]+Rt[n>>24&255]).toLowerCase()}function Lt(r,e,t){return Math.max(e,Math.min(t,r))}function ra(r,e){return(r%e+e)%e}function ud(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function dd(r,e,t){return r!==e?(t-r)/(e-r):0}function bs(r,e,t){return(1-t)*r+t*e}function fd(r,e,t,n){return bs(r,e,1-Math.exp(-t*n))}function pd(r,e=1){return e-Math.abs(ra(r,e*2)-e)}function md(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function gd(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function xd(r,e){return r+Math.floor(Math.random()*(e-r+1))}function _d(r,e){return r+Math.random()*(e-r)}function vd(r){return r*(.5-Math.random())}function yd(r){r!==void 0&&(hl=r);let e=hl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Md(r){return r*Ms}function bd(r){return r*Ki}function ko(r){return(r&r-1)===0&&r!==0}function Sd(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function Mr(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function wd(r,e,t,n,i){const s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+n)/2),h=o((e+n)/2),u=s((e-n)/2),d=o((e-n)/2),f=s((n-e)/2),g=o((n-e)/2);switch(i){case"XYX":r.set(a*h,l*u,l*d,a*c);break;case"YZY":r.set(l*d,a*h,l*u,a*c);break;case"ZXZ":r.set(l*u,l*d,a*h,a*c);break;case"XZX":r.set(a*h,l*g,l*f,a*c);break;case"YXY":r.set(l*f,a*h,l*g,a*c);break;case"ZYZ":r.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function pn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function tt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}const ai={DEG2RAD:Ms,RAD2DEG:Ki,generateUUID:cn,clamp:Lt,euclideanModulo:ra,mapLinear:ud,inverseLerp:dd,lerp:bs,damp:fd,pingpong:pd,smoothstep:md,smootherstep:gd,randInt:xd,randFloat:_d,randFloatSpread:vd,seededRandom:yd,degToRad:Md,radToDeg:bd,isPowerOfTwo:ko,ceilPowerOfTwo:Sd,floorPowerOfTwo:Mr,setQuaternionFromProperEuler:wd,normalize:tt,denormalize:pn};class Se{constructor(e=0,t=0){Se.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*i+e.x,this.y=s*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class je{constructor(e,t,n,i,s,o,a,l,c){je.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c)}set(e,t,n,i,s,o,a,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],x=i[0],m=i[3],p=i[6],y=i[1],_=i[4],v=i[7],E=i[2],b=i[5],A=i[8];return s[0]=o*x+a*y+l*E,s[3]=o*m+a*_+l*b,s[6]=o*p+a*v+l*A,s[1]=c*x+h*y+u*E,s[4]=c*m+h*_+u*b,s[7]=c*p+h*v+u*A,s[2]=d*x+f*y+g*E,s[5]=d*m+f*_+g*b,s[8]=d*p+f*v+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-n*s*h+n*a*l+i*s*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*s,f=c*s-o*l,g=t*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=u*x,e[1]=(i*c-h*n)*x,e[2]=(a*n-i*o)*x,e[3]=d*x,e[4]=(h*t-i*l)*x,e[5]=(i*s-a*t)*x,e[6]=f*x,e[7]=(n*l-c*t)*x,e[8]=(o*t-n*s)*x,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Xr.makeScale(e,t)),this}rotate(e){return this.premultiply(Xr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Xr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Xr=new je;function mh(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function Ts(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Ed(){const r=Ts("canvas");return r.style.display="block",r}const ul={};function Ss(r){r in ul||(ul[r]=!0,console.warn(r))}const dl=new je().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),fl=new je().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Is={[Et]:{transfer:xr,primaries:_r,toReference:r=>r,fromReference:r=>r},[at]:{transfer:ot,primaries:_r,toReference:r=>r.convertSRGBToLinear(),fromReference:r=>r.convertLinearToSRGB()},[Ar]:{transfer:xr,primaries:vr,toReference:r=>r.applyMatrix3(fl),fromReference:r=>r.applyMatrix3(dl)},[sa]:{transfer:ot,primaries:vr,toReference:r=>r.convertSRGBToLinear().applyMatrix3(fl),fromReference:r=>r.applyMatrix3(dl).convertLinearToSRGB()}},Td=new Set([Et,Ar]),Je={enabled:!0,_workingColorSpace:Et,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(r){if(!Td.has(r))throw new Error(`Unsupported working color space, "${r}".`);this._workingColorSpace=r},convert:function(r,e,t){if(this.enabled===!1||e===t||!e||!t)return r;const n=Is[e].toReference,i=Is[t].fromReference;return i(n(r))},fromWorkingColorSpace:function(r,e){return this.convert(r,this._workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this._workingColorSpace)},getPrimaries:function(r){return Is[r].primaries},getTransfer:function(r){return r===en?xr:Is[r].transfer}};function Wi(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function jr(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let yi;class gh{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{yi===void 0&&(yi=Ts("canvas")),yi.width=e.width,yi.height=e.height;const n=yi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=yi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ts("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let o=0;o<s.length;o++)s[o]=Wi(s[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Wi(t[n]/255)*255):t[n]=Wi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ad=0;class xh{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ad++}),this.uuid=cn(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?s.push($r(i[o].image)):s.push($r(i[o]))}else s=$r(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function $r(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?gh.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Rd=0;class wt extends _i{constructor(e=wt.DEFAULT_IMAGE,t=wt.DEFAULT_MAPPING,n=Zt,i=Zt,s=Gt,o=pi,a=Qt,l=jn,c=wt.DEFAULT_ANISOTROPY,h=en){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Rd++}),this.uuid=cn(),this.name="",this.source=new xh(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Se(0,0),this.repeat=new Se(1,1),this.center=new Se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Ss("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===hi?at:en),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==th)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case $n:e.x=e.x-Math.floor(e.x);break;case Zt:e.x=e.x<0?0:1;break;case mr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case $n:e.y=e.y-Math.floor(e.y);break;case Zt:e.y=e.y<0?0:1;break;case mr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ss("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===at?hi:fh}set encoding(e){Ss("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===hi?at:en}}wt.DEFAULT_IMAGE=null;wt.DEFAULT_MAPPING=th;wt.DEFAULT_ANISOTROPY=1;class nt{constructor(e=0,t=0,n=0,i=1){nt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*s,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const _=(c+1)/2,v=(f+1)/2,E=(p+1)/2,b=(h+d)/4,A=(u+x)/4,N=(g+m)/4;return _>v&&_>E?_<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(_),i=b/n,s=A/n):v>E?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=b/i,s=N/i):E<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(E),n=A/s,i=N/s),this.set(n,i,s,t),this}let y=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(u-x)/y,this.z=(d-h)/y,this.w=Math.acos((c+f+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Cd extends _i{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new nt(0,0,e,t),this.scissorTest=!1,this.viewport=new nt(0,0,e,t);const i={width:e,height:t,depth:1};n.encoding!==void 0&&(Ss("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===hi?at:en),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Gt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new wt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new xh(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class tn extends Cd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class _h extends wt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=St,this.minFilter=St,this.wrapR=Zt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ld extends wt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=St,this.minFilter=St,this.wrapR=Zt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class nn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=s[o+0],f=s[o+1],g=s[o+2],x=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=x;return}if(u!==x||l!==d||c!==f||h!==g){let m=1-a;const p=l*d+c*f+h*g+u*x,y=p>=0?1:-1,_=1-p*p;if(_>Number.EPSILON){const E=Math.sqrt(_),b=Math.atan2(E,p*y);m=Math.sin(m*b)/E,a=Math.sin(a*b)/E}const v=a*y;if(l=l*m+d*v,c=c*m+f*v,h=h*m+g*v,u=u*m+x*v,m===1-a){const E=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=E,c*=E,h*=E,u*=E}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[o],d=s[o+1],f=s[o+2],g=s[o+3];return e[t]=a*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-a*f,e[t+2]=c*g+h*f+a*d-l*u,e[t+3]=h*g-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(s/2),d=l(n/2),f=l(i/2),g=l(s/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(s+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(s-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Lt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+o*a+i*c-s*l,this._y=i*h+o*l+s*a-n*c,this._z=s*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,s=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),s=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(s),n*Math.cos(s),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(e=0,t=0,n=0){C.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(pl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(pl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),h=2*(a*t-s*i),u=2*(s*n-o*t);return this.x=t+l*c+o*u-a*h,this.y=n+l*h+a*c-s*u,this.z=i+l*u+s*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-s*a,this.y=s*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Yr.copy(this).projectOnVector(e),this.sub(Yr)}reflect(e){return this.sub(Yr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Lt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Yr=new C,pl=new nn;class Vt{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(sn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(sn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=sn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,sn):sn.fromBufferAttribute(s,o),sn.applyMatrix4(e.matrixWorld),this.expandByPoint(sn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ds.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ds.copy(n.boundingBox)),Ds.applyMatrix4(e.matrixWorld),this.union(Ds)}const i=e.children;for(let s=0,o=i.length;s<o;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,sn),sn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(hs),Ns.subVectors(this.max,hs),Mi.subVectors(e.a,hs),bi.subVectors(e.b,hs),Si.subVectors(e.c,hs),Dn.subVectors(bi,Mi),Nn.subVectors(Si,bi),Zn.subVectors(Mi,Si);let t=[0,-Dn.z,Dn.y,0,-Nn.z,Nn.y,0,-Zn.z,Zn.y,Dn.z,0,-Dn.x,Nn.z,0,-Nn.x,Zn.z,0,-Zn.x,-Dn.y,Dn.x,0,-Nn.y,Nn.x,0,-Zn.y,Zn.x,0];return!Kr(t,Mi,bi,Si,Ns)||(t=[1,0,0,0,1,0,0,0,1],!Kr(t,Mi,bi,Si,Ns))?!1:(Us.crossVectors(Dn,Nn),t=[Us.x,Us.y,Us.z],Kr(t,Mi,bi,Si,Ns))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,sn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(sn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(yn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),yn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),yn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),yn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),yn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),yn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),yn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),yn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(yn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const yn=[new C,new C,new C,new C,new C,new C,new C,new C],sn=new C,Ds=new Vt,Mi=new C,bi=new C,Si=new C,Dn=new C,Nn=new C,Zn=new C,hs=new C,Ns=new C,Us=new C,Qn=new C;function Kr(r,e,t,n,i){for(let s=0,o=r.length-3;s<=o;s+=3){Qn.fromArray(r,s);const a=i.x*Math.abs(Qn.x)+i.y*Math.abs(Qn.y)+i.z*Math.abs(Qn.z),l=e.dot(Qn),c=t.dot(Qn),h=n.dot(Qn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const Pd=new Vt,us=new C,Jr=new C;class xn{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Pd.setFromPoints(e).getCenter(n);let i=0;for(let s=0,o=e.length;s<o;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;us.subVectors(e,this.center);const t=us.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(us,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Jr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(us.copy(e.center).add(Jr)),this.expandByPoint(us.copy(e.center).sub(Jr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Mn=new C,Zr=new C,ks=new C,Un=new C,Qr=new C,Fs=new C,eo=new C;class As{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Mn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Mn.copy(this.origin).addScaledVector(this.direction,t),Mn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Zr.copy(e).add(t).multiplyScalar(.5),ks.copy(t).sub(e).normalize(),Un.copy(this.origin).sub(Zr);const s=e.distanceTo(t)*.5,o=-this.direction.dot(ks),a=Un.dot(this.direction),l=-Un.dot(ks),c=Un.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=s*h,u>=0)if(d>=-g)if(d<=g){const x=1/h;u*=x,d*=x,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Zr).addScaledVector(ks,d),f}intersectSphere(e,t){Mn.subVectors(e.center,this.origin);const n=Mn.dot(this.direction),i=Mn.dot(Mn)-n*n,s=e.radius*e.radius;if(i>s)return null;const o=Math.sqrt(s-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||s>i||((s>n||isNaN(n))&&(n=s),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Mn)!==null}intersectTriangle(e,t,n,i,s){Qr.subVectors(t,e),Fs.subVectors(n,e),eo.crossVectors(Qr,Fs);let o=this.direction.dot(eo),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Un.subVectors(this.origin,e);const l=a*this.direction.dot(Fs.crossVectors(Un,Fs));if(l<0)return null;const c=a*this.direction.dot(Qr.cross(Un));if(c<0||l+c>o)return null;const h=-a*Un.dot(eo);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class We{constructor(e,t,n,i,s,o,a,l,c,h,u,d,f,g,x,m){We.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,o,a,l,c,h,u,d,f,g,x,m)}set(e,t,n,i,s,o,a,l,c,h,u,d,f,g,x,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new We().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/wi.setFromMatrixColumn(e,0).length(),s=1/wi.setFromMatrixColumn(e,1).length(),o=1/wi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const d=o*h,f=o*u,g=a*h,x=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-x*c,t[9]=-a*l,t[2]=x-d*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,g=c*h,x=c*u;t[0]=d+x*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=x+d*a,t[10]=o*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,g=c*h,x=c*u;t[0]=d-x*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=x-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const d=o*h,f=o*u,g=a*h,x=a*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+x,t[1]=l*u,t[5]=x*c+d,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const d=o*l,f=o*c,g=a*l,x=a*c;t[0]=l*h,t[4]=x-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-x*u}else if(e.order==="XZY"){const d=o*l,f=o*c,g=a*l,x=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+x,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=x*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Id,e,Dd)}lookAt(e,t,n){const i=this.elements;return qt.subVectors(e,t),qt.lengthSq()===0&&(qt.z=1),qt.normalize(),kn.crossVectors(n,qt),kn.lengthSq()===0&&(Math.abs(n.z)===1?qt.x+=1e-4:qt.z+=1e-4,qt.normalize(),kn.crossVectors(n,qt)),kn.normalize(),Os.crossVectors(qt,kn),i[0]=kn.x,i[4]=Os.x,i[8]=qt.x,i[1]=kn.y,i[5]=Os.y,i[9]=qt.y,i[2]=kn.z,i[6]=Os.z,i[10]=qt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],x=n[6],m=n[10],p=n[14],y=n[3],_=n[7],v=n[11],E=n[15],b=i[0],A=i[4],N=i[8],M=i[12],w=i[1],k=i[5],V=i[9],j=i[13],L=i[2],I=i[6],F=i[10],B=i[14],D=i[3],O=i[7],H=i[11],Z=i[15];return s[0]=o*b+a*w+l*L+c*D,s[4]=o*A+a*k+l*I+c*O,s[8]=o*N+a*V+l*F+c*H,s[12]=o*M+a*j+l*B+c*Z,s[1]=h*b+u*w+d*L+f*D,s[5]=h*A+u*k+d*I+f*O,s[9]=h*N+u*V+d*F+f*H,s[13]=h*M+u*j+d*B+f*Z,s[2]=g*b+x*w+m*L+p*D,s[6]=g*A+x*k+m*I+p*O,s[10]=g*N+x*V+m*F+p*H,s[14]=g*M+x*j+m*B+p*Z,s[3]=y*b+_*w+v*L+E*D,s[7]=y*A+_*k+v*I+E*O,s[11]=y*N+_*V+v*F+E*H,s[15]=y*M+_*j+v*B+E*Z,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],x=e[7],m=e[11],p=e[15];return g*(+s*l*u-i*c*u-s*a*d+n*c*d+i*a*f-n*l*f)+x*(+t*l*f-t*c*d+s*o*d-i*o*f+i*c*h-s*l*h)+m*(+t*c*u-t*a*f-s*o*u+n*o*f+s*a*h-n*c*h)+p*(-i*a*h-t*l*u+t*a*d+i*o*u-n*o*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],x=e[13],m=e[14],p=e[15],y=u*m*c-x*d*c+x*l*f-a*m*f-u*l*p+a*d*p,_=g*d*c-h*m*c-g*l*f+o*m*f+h*l*p-o*d*p,v=h*x*c-g*u*c+g*a*f-o*x*f-h*a*p+o*u*p,E=g*u*l-h*x*l-g*a*d+o*x*d+h*a*m-o*u*m,b=t*y+n*_+i*v+s*E;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/b;return e[0]=y*A,e[1]=(x*d*s-u*m*s-x*i*f+n*m*f+u*i*p-n*d*p)*A,e[2]=(a*m*s-x*l*s+x*i*c-n*m*c-a*i*p+n*l*p)*A,e[3]=(u*l*s-a*d*s-u*i*c+n*d*c+a*i*f-n*l*f)*A,e[4]=_*A,e[5]=(h*m*s-g*d*s+g*i*f-t*m*f-h*i*p+t*d*p)*A,e[6]=(g*l*s-o*m*s-g*i*c+t*m*c+o*i*p-t*l*p)*A,e[7]=(o*d*s-h*l*s+h*i*c-t*d*c-o*i*f+t*l*f)*A,e[8]=v*A,e[9]=(g*u*s-h*x*s-g*n*f+t*x*f+h*n*p-t*u*p)*A,e[10]=(o*x*s-g*a*s+g*n*c-t*x*c-o*n*p+t*a*p)*A,e[11]=(h*a*s-o*u*s-h*n*c+t*u*c+o*n*f-t*a*f)*A,e[12]=E*A,e[13]=(h*x*i-g*u*i+g*n*d-t*x*d-h*n*m+t*u*m)*A,e[14]=(g*a*i-o*x*i-g*n*l+t*x*l+o*n*m-t*a*m)*A,e[15]=(o*u*i-h*a*i+h*n*l-t*u*l-o*n*d+t*a*d)*A,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,h=s*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,o){return this.set(1,n,s,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,h=o+o,u=a+a,d=s*c,f=s*h,g=s*u,x=o*h,m=o*u,p=a*u,y=l*c,_=l*h,v=l*u,E=n.x,b=n.y,A=n.z;return i[0]=(1-(x+p))*E,i[1]=(f+v)*E,i[2]=(g-_)*E,i[3]=0,i[4]=(f-v)*b,i[5]=(1-(d+p))*b,i[6]=(m+y)*b,i[7]=0,i[8]=(g+_)*A,i[9]=(m-y)*A,i[10]=(1-(d+x))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let s=wi.set(i[0],i[1],i[2]).length();const o=wi.set(i[4],i[5],i[6]).length(),a=wi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],rn.copy(this);const c=1/s,h=1/o,u=1/a;return rn.elements[0]*=c,rn.elements[1]*=c,rn.elements[2]*=c,rn.elements[4]*=h,rn.elements[5]*=h,rn.elements[6]*=h,rn.elements[8]*=u,rn.elements[9]*=u,rn.elements[10]*=u,t.setFromRotationMatrix(rn),n.x=s,n.y=o,n.z=a,this}makePerspective(e,t,n,i,s,o,a=Cn){const l=this.elements,c=2*s/(t-e),h=2*s/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let f,g;if(a===Cn)f=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===yr)f=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,o,a=Cn){const l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(o-s),d=(t+e)*c,f=(n+i)*h;let g,x;if(a===Cn)g=(o+s)*u,x=-2*u;else if(a===yr)g=s*u,x=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const wi=new C,rn=new We,Id=new C(0,0,0),Dd=new C(1,1,1),kn=new C,Os=new C,qt=new C,ml=new We,gl=new nn;class Rr{constructor(e=0,t=0,n=0,i=Rr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Lt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Lt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Lt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Lt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ml.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ml,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return gl.setFromEuler(this),this.setFromQuaternion(gl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Rr.DEFAULT_ORDER="XYZ";class oa{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Nd=0;const xl=new C,Ei=new nn,bn=new We,zs=new C,ds=new C,Ud=new C,kd=new nn,_l=new C(1,0,0),vl=new C(0,1,0),yl=new C(0,0,1),Fd={type:"added"},Od={type:"removed"};class ut extends _i{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Nd++}),this.uuid=cn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ut.DEFAULT_UP.clone();const e=new C,t=new Rr,n=new nn,i=new C(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new We},normalMatrix:{value:new je}}),this.matrix=new We,this.matrixWorld=new We,this.matrixAutoUpdate=ut.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new oa,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ei.setFromAxisAngle(e,t),this.quaternion.multiply(Ei),this}rotateOnWorldAxis(e,t){return Ei.setFromAxisAngle(e,t),this.quaternion.premultiply(Ei),this}rotateX(e){return this.rotateOnAxis(_l,e)}rotateY(e){return this.rotateOnAxis(vl,e)}rotateZ(e){return this.rotateOnAxis(yl,e)}translateOnAxis(e,t){return xl.copy(e).applyQuaternion(this.quaternion),this.position.add(xl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(_l,e)}translateY(e){return this.translateOnAxis(vl,e)}translateZ(e){return this.translateOnAxis(yl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(bn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?zs.copy(e):zs.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ds.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bn.lookAt(ds,zs,this.up):bn.lookAt(zs,ds,this.up),this.quaternion.setFromRotationMatrix(bn),i&&(bn.extractRotation(i.matrixWorld),Ei.setFromRotationMatrix(bn),this.quaternion.premultiply(Ei.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Fd)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Od)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),bn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),bn.multiply(e.parent.matrixWorld)),e.applyMatrix4(bn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,o=i.length;s<o;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ds,e,Ud),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ds,kd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const s=t[n];(s.matrixWorldAutoUpdate===!0||e===!0)&&s.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let s=0,o=i.length;s<o;s++){const a=i[s];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));i.material=a}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}ut.DEFAULT_UP=new C(0,1,0);ut.DEFAULT_MATRIX_AUTO_UPDATE=!0;ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const on=new C,Sn=new C,to=new C,wn=new C,Ti=new C,Ai=new C,Ml=new C,no=new C,io=new C,so=new C;let Bs=!1;class ln{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),on.subVectors(e,t),i.cross(on);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){on.subVectors(i,t),Sn.subVectors(n,t),to.subVectors(e,t);const o=on.dot(on),a=on.dot(Sn),l=on.dot(to),c=Sn.dot(Sn),h=Sn.dot(to),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,wn)===null?!1:wn.x>=0&&wn.y>=0&&wn.x+wn.y<=1}static getUV(e,t,n,i,s,o,a,l){return Bs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Bs=!0),this.getInterpolation(e,t,n,i,s,o,a,l)}static getInterpolation(e,t,n,i,s,o,a,l){return this.getBarycoord(e,t,n,i,wn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,wn.x),l.addScaledVector(o,wn.y),l.addScaledVector(a,wn.z),l)}static isFrontFacing(e,t,n,i){return on.subVectors(n,t),Sn.subVectors(e,t),on.cross(Sn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return on.subVectors(this.c,this.b),Sn.subVectors(this.a,this.b),on.cross(Sn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ln.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return ln.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,s){return Bs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Bs=!0),ln.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}getInterpolation(e,t,n,i,s){return ln.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return ln.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ln.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let o,a;Ti.subVectors(i,n),Ai.subVectors(s,n),no.subVectors(e,n);const l=Ti.dot(no),c=Ai.dot(no);if(l<=0&&c<=0)return t.copy(n);io.subVectors(e,i);const h=Ti.dot(io),u=Ai.dot(io);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(n).addScaledVector(Ti,o);so.subVectors(e,s);const f=Ti.dot(so),g=Ai.dot(so);if(g>=0&&f<=g)return t.copy(s);const x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(n).addScaledVector(Ai,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Ml.subVectors(s,i),a=(u-h)/(u-h+(f-g)),t.copy(i).addScaledVector(Ml,a);const p=1/(m+x+d);return o=x*p,a=d*p,t.copy(n).addScaledVector(Ti,o).addScaledVector(Ai,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const vh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Fn={h:0,s:0,l:0},Hs={h:0,s:0,l:0};function ro(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class ue{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=at){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Je.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Je.workingColorSpace){return this.r=e,this.g=t,this.b=n,Je.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Je.workingColorSpace){if(e=ra(e,1),t=Lt(t,0,1),n=Lt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=ro(o,s,e+1/3),this.g=ro(o,s,e),this.b=ro(o,s,e-1/3)}return Je.toWorkingColorSpace(this,i),this}setStyle(e,t=at){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=at){const n=vh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Wi(e.r),this.g=Wi(e.g),this.b=Wi(e.b),this}copyLinearToSRGB(e){return this.r=jr(e.r),this.g=jr(e.g),this.b=jr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=at){return Je.fromWorkingColorSpace(Ct.copy(this),e),Math.round(Lt(Ct.r*255,0,255))*65536+Math.round(Lt(Ct.g*255,0,255))*256+Math.round(Lt(Ct.b*255,0,255))}getHexString(e=at){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.fromWorkingColorSpace(Ct.copy(this),t);const n=Ct.r,i=Ct.g,s=Ct.b,o=Math.max(n,i,s),a=Math.min(n,i,s);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Je.workingColorSpace){return Je.fromWorkingColorSpace(Ct.copy(this),t),e.r=Ct.r,e.g=Ct.g,e.b=Ct.b,e}getStyle(e=at){Je.fromWorkingColorSpace(Ct.copy(this),e);const t=Ct.r,n=Ct.g,i=Ct.b;return e!==at?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Fn),this.setHSL(Fn.h+e,Fn.s+t,Fn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Fn),e.getHSL(Hs);const n=bs(Fn.h,Hs.h,t),i=bs(Fn.s,Hs.s,t),s=bs(Fn.l,Hs.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ct=new ue;ue.NAMES=vh;let zd=0;class hn extends _i{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:zd++}),this.uuid=cn(),this.name="",this.type="Material",this.blending=Vi,this.side=Pn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ro,this.blendDst=Co,this.blendEquation=si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ue(0,0,0),this.blendAlpha=0,this.depthFunc=pr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ll,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vi,this.stencilZFail=vi,this.stencilZPass=vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Vi&&(n.blending=this.blending),this.side!==Pn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ro&&(n.blendSrc=this.blendSrc),this.blendDst!==Co&&(n.blendDst=this.blendDst),this.blendEquation!==si&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==pr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ll&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==vi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==vi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==vi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=i(e.textures),o=i(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Bt extends hn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Qo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const xt=new C,Gs=new Se;class Nt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=No,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Rn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Gs.fromBufferAttribute(this,t),Gs.applyMatrix3(e),this.setXY(t,Gs.x,Gs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix3(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyMatrix4(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.applyNormalMatrix(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)xt.fromBufferAttribute(this,t),xt.transformDirection(e),this.setXYZ(t,xt.x,xt.y,xt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=pn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=tt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=pn(t,this.array)),t}setX(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=pn(t,this.array)),t}setY(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=pn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=pn(t,this.array)),t}setW(e,t){return this.normalized&&(t=tt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),i=tt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),i=tt(i,this.array),s=tt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==No&&(e.usage=this.usage),e}}class yh extends Nt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Mh extends Nt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class lt extends Nt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Bd=0;const Yt=new We,oo=new ut,Ri=new C,Xt=new Vt,fs=new Vt,bt=new C;class Tt extends _i{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Bd++}),this.uuid=cn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(mh(e)?Mh:yh)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new je().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Yt.makeRotationFromQuaternion(e),this.applyMatrix4(Yt),this}rotateX(e){return Yt.makeRotationX(e),this.applyMatrix4(Yt),this}rotateY(e){return Yt.makeRotationY(e),this.applyMatrix4(Yt),this}rotateZ(e){return Yt.makeRotationZ(e),this.applyMatrix4(Yt),this}translate(e,t,n){return Yt.makeTranslation(e,t,n),this.applyMatrix4(Yt),this}scale(e,t,n){return Yt.makeScale(e,t,n),this.applyMatrix4(Yt),this}lookAt(e){return oo.lookAt(e),oo.updateMatrix(),this.applyMatrix4(oo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ri).negate(),this.translate(Ri.x,Ri.y,Ri.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const s=e[n];t.push(s.x,s.y,s.z||0)}return this.setAttribute("position",new lt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];Xt.setFromBufferAttribute(s),this.morphTargetsRelative?(bt.addVectors(this.boundingBox.min,Xt.min),this.boundingBox.expandByPoint(bt),bt.addVectors(this.boundingBox.max,Xt.max),this.boundingBox.expandByPoint(bt)):(this.boundingBox.expandByPoint(Xt.min),this.boundingBox.expandByPoint(Xt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new C,1/0);return}if(e){const n=this.boundingSphere.center;if(Xt.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];fs.setFromBufferAttribute(a),this.morphTargetsRelative?(bt.addVectors(Xt.min,fs.min),Xt.expandByPoint(bt),bt.addVectors(Xt.max,fs.max),Xt.expandByPoint(bt)):(Xt.expandByPoint(fs.min),Xt.expandByPoint(fs.max))}Xt.getCenter(n);let i=0;for(let s=0,o=e.count;s<o;s++)bt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(bt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)bt.fromBufferAttribute(a,c),l&&(Ri.fromBufferAttribute(e,c),bt.add(Ri)),i=Math.max(i,n.distanceToSquared(bt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,s=t.normal.array,o=t.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Nt(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let w=0;w<a;w++)c[w]=new C,h[w]=new C;const u=new C,d=new C,f=new C,g=new Se,x=new Se,m=new Se,p=new C,y=new C;function _(w,k,V){u.fromArray(i,w*3),d.fromArray(i,k*3),f.fromArray(i,V*3),g.fromArray(o,w*2),x.fromArray(o,k*2),m.fromArray(o,V*2),d.sub(u),f.sub(u),x.sub(g),m.sub(g);const j=1/(x.x*m.y-m.x*x.y);isFinite(j)&&(p.copy(d).multiplyScalar(m.y).addScaledVector(f,-x.y).multiplyScalar(j),y.copy(f).multiplyScalar(x.x).addScaledVector(d,-m.x).multiplyScalar(j),c[w].add(p),c[k].add(p),c[V].add(p),h[w].add(y),h[k].add(y),h[V].add(y))}let v=this.groups;v.length===0&&(v=[{start:0,count:n.length}]);for(let w=0,k=v.length;w<k;++w){const V=v[w],j=V.start,L=V.count;for(let I=j,F=j+L;I<F;I+=3)_(n[I+0],n[I+1],n[I+2])}const E=new C,b=new C,A=new C,N=new C;function M(w){A.fromArray(s,w*3),N.copy(A);const k=c[w];E.copy(k),E.sub(A.multiplyScalar(A.dot(k))).normalize(),b.crossVectors(N,k);const j=b.dot(h[w])<0?-1:1;l[w*4]=E.x,l[w*4+1]=E.y,l[w*4+2]=E.z,l[w*4+3]=j}for(let w=0,k=v.length;w<k;++w){const V=v[w],j=V.start,L=V.count;for(let I=j,F=j+L;I<F;I+=3)M(n[I+0]),M(n[I+1]),M(n[I+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Nt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new C,s=new C,o=new C,a=new C,l=new C,c=new C,h=new C,u=new C;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,x),c.fromBufferAttribute(n,m),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(x,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)bt.fromBufferAttribute(e,t),bt.normalize(),e.setXYZ(t,bt.x,bt.y,bt.z)}toNonIndexed(){function e(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new Nt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Tt,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const s=e.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const bl=new We,ei=new As,Vs=new xn,Sl=new C,Ci=new C,Li=new C,Pi=new C,ao=new C,Ws=new C,qs=new Se,Xs=new Se,js=new Se,wl=new C,El=new C,Tl=new C,$s=new C,Ys=new C;class oe extends ut{constructor(e=new Tt,t=new Bt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(s&&a){Ws.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=a[l],u=s[l];h!==0&&(ao.fromBufferAttribute(u,e),o?Ws.addScaledVector(ao,h):Ws.addScaledVector(ao.sub(t),h))}t.add(Ws)}return t}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Vs.copy(n.boundingSphere),Vs.applyMatrix4(s),ei.copy(e.ray).recast(e.near),!(Vs.containsPoint(ei.origin)===!1&&(ei.intersectSphere(Vs,Sl)===null||ei.origin.distanceToSquared(Sl)>(e.far-e.near)**2))&&(bl.copy(s).invert(),ei.copy(e.ray).applyMatrix4(bl),!(n.boundingBox!==null&&ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ei)))}_computeIntersections(e,t,n){let i;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){const m=d[g],p=o[m.materialIndex],y=Math.max(m.start,f.start),_=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let v=y,E=_;v<E;v+=3){const b=a.getX(v),A=a.getX(v+1),N=a.getX(v+2);i=Ks(this,p,e,n,c,h,u,b,A,N),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const y=a.getX(m),_=a.getX(m+1),v=a.getX(m+2);i=Ks(this,o,e,n,c,h,u,y,_,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){const m=d[g],p=o[m.materialIndex],y=Math.max(m.start,f.start),_=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let v=y,E=_;v<E;v+=3){const b=v,A=v+1,N=v+2;i=Ks(this,p,e,n,c,h,u,b,A,N),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const y=m,_=m+1,v=m+2;i=Ks(this,o,e,n,c,h,u,y,_,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function Hd(r,e,t,n,i,s,o,a){let l;if(e.side===Dt?l=n.intersectTriangle(o,s,i,!0,a):l=n.intersectTriangle(i,s,o,e.side===Pn,a),l===null)return null;Ys.copy(a),Ys.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Ys);return c<t.near||c>t.far?null:{distance:c,point:Ys.clone(),object:r}}function Ks(r,e,t,n,i,s,o,a,l,c){r.getVertexPosition(a,Ci),r.getVertexPosition(l,Li),r.getVertexPosition(c,Pi);const h=Hd(r,e,t,n,Ci,Li,Pi,$s);if(h){i&&(qs.fromBufferAttribute(i,a),Xs.fromBufferAttribute(i,l),js.fromBufferAttribute(i,c),h.uv=ln.getInterpolation($s,Ci,Li,Pi,qs,Xs,js,new Se)),s&&(qs.fromBufferAttribute(s,a),Xs.fromBufferAttribute(s,l),js.fromBufferAttribute(s,c),h.uv1=ln.getInterpolation($s,Ci,Li,Pi,qs,Xs,js,new Se),h.uv2=h.uv1),o&&(wl.fromBufferAttribute(o,a),El.fromBufferAttribute(o,l),Tl.fromBufferAttribute(o,c),h.normal=ln.getInterpolation($s,Ci,Li,Pi,wl,El,Tl,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:l,c,normal:new C,materialIndex:0};ln.getNormal(Ci,Li,Pi,u.normal),h.face=u}return h}class xe extends Tt{constructor(e=1,t=1,n=1,i=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:o};const a=this;i=Math.floor(i),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,o,s,0),g("z","y","x",1,-1,n,t,-e,o,s,1),g("x","z","y",1,1,e,n,t,i,o,2),g("x","z","y",1,-1,e,n,-t,i,o,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new lt(c,3)),this.setAttribute("normal",new lt(h,3)),this.setAttribute("uv",new lt(u,2));function g(x,m,p,y,_,v,E,b,A,N,M){const w=v/A,k=E/N,V=v/2,j=E/2,L=b/2,I=A+1,F=N+1;let B=0,D=0;const O=new C;for(let H=0;H<F;H++){const Z=H*k-j;for(let ne=0;ne<I;ne++){const K=ne*w-V;O[x]=K*y,O[m]=Z*_,O[p]=L,c.push(O.x,O.y,O.z),O[x]=0,O[m]=0,O[p]=b>0?1:-1,h.push(O.x,O.y,O.z),u.push(ne/A),u.push(1-H/N),B+=1}}for(let H=0;H<N;H++)for(let Z=0;Z<A;Z++){const ne=d+Z+I*H,K=d+Z+I*(H+1),J=d+(Z+1)+I*(H+1),ae=d+(Z+1)+I*H;l.push(ne,K,ae),l.push(K,J,ae),D+=6}a.addGroup(f,D,M),f+=D,d+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xe(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ji(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function zt(r){const e={};for(let t=0;t<r.length;t++){const n=Ji(r[t]);for(const i in n)e[i]=n[i]}return e}function Gd(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function bh(r){return r.getRenderTarget()===null?r.outputColorSpace:Je.workingColorSpace}const Zi={clone:Ji,merge:zt};var Vd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Wd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ht extends hn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Vd,this.fragmentShader=Wd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ji(e.uniforms),this.uniformsGroups=Gd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Sh extends ut{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new We,this.projectionMatrix=new We,this.projectionMatrixInverse=new We,this.coordinateSystem=Cn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Pt extends Sh{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ki*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ms*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ki*2*Math.atan(Math.tan(Ms*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ms*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ii=-90,Di=1;class qd extends ut{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Pt(Ii,Di,e,t);i.layers=this.layers,this.add(i);const s=new Pt(Ii,Di,e,t);s.layers=this.layers,this.add(s);const o=new Pt(Ii,Di,e,t);o.layers=this.layers,this.add(o);const a=new Pt(Ii,Di,e,t);a.layers=this.layers,this.add(a);const l=new Pt(Ii,Di,e,t);l.layers=this.layers,this.add(l);const c=new Pt(Ii,Di,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Cn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===yr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=x,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class wh extends wt{constructor(e,t,n,i,s,o,a,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Xi,super(e,t,n,i,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Xd extends tn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(Ss("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===hi?at:en),this.texture=new wh(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Gt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new xe(5,5,5),s=new Ht({name:"CubemapFromEquirect",uniforms:Ji(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Dt,blending:Ln});s.uniforms.tEquirect.value=t;const o=new oe(i,s),a=t.minFilter;return t.minFilter===pi&&(t.minFilter=Gt),new qd(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,i){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(s)}}const lo=new C,jd=new C,$d=new je;class Bn{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=lo.subVectors(n,t).cross(jd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(lo),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||$d.getNormalMatrix(e),i=this.coplanarPoint(lo).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ti=new xn,Js=new C;class aa{constructor(e=new Bn,t=new Bn,n=new Bn,i=new Bn,s=new Bn,o=new Bn){this.planes=[e,t,n,i,s,o]}set(e,t,n,i,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Cn){const n=this.planes,i=e.elements,s=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],g=i[9],x=i[10],m=i[11],p=i[12],y=i[13],_=i[14],v=i[15];if(n[0].setComponents(l-s,d-c,m-f,v-p).normalize(),n[1].setComponents(l+s,d+c,m+f,v+p).normalize(),n[2].setComponents(l+o,d+h,m+g,v+y).normalize(),n[3].setComponents(l-o,d-h,m-g,v-y).normalize(),n[4].setComponents(l-a,d-u,m-x,v-_).normalize(),t===Cn)n[5].setComponents(l+a,d+u,m+x,v+_).normalize();else if(t===yr)n[5].setComponents(a,u,x,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ti.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ti.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ti)}intersectsSprite(e){return ti.center.set(0,0,0),ti.radius=.7071067811865476,ti.applyMatrix4(e.matrixWorld),this.intersectsSphere(ti)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Js.x=i.normal.x>0?e.max.x:e.min.x,Js.y=i.normal.y>0?e.max.y:e.min.y,Js.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Js)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Eh(){let r=null,e=!1,t=null,n=null;function i(s,o){t(s,o),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Yd(r,e){const t=e.isWebGL2,n=new WeakMap;function i(c,h){const u=c.array,d=c.usage,f=u.byteLength,g=r.createBuffer();r.bindBuffer(h,g),r.bufferData(h,u,d),c.onUploadCallback();let x;if(u instanceof Float32Array)x=r.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)x=r.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else x=r.UNSIGNED_SHORT;else if(u instanceof Int16Array)x=r.SHORT;else if(u instanceof Uint32Array)x=r.UNSIGNED_INT;else if(u instanceof Int32Array)x=r.INT;else if(u instanceof Int8Array)x=r.BYTE;else if(u instanceof Uint8Array)x=r.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)x=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:x,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:f}}function s(c,h,u){const d=h.array,f=h._updateRange,g=h.updateRanges;if(r.bindBuffer(u,c),f.count===-1&&g.length===0&&r.bufferSubData(u,0,d),g.length!==0){for(let x=0,m=g.length;x<m;x++){const p=g[x];t?r.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):r.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}f.count!==-1&&(t?r.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):r.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function o(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(r.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const d=n.get(c);(!d||d.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);if(u===void 0)n.set(c,i(c,h));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(u.buffer,c,h),u.version=c.version}}return{get:o,remove:a,update:l}}class is extends Tt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=e/a,d=t/l,f=[],g=[],x=[],m=[];for(let p=0;p<h;p++){const y=p*d-o;for(let _=0;_<c;_++){const v=_*u-s;g.push(v,-y,0),x.push(0,0,1),m.push(_/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let y=0;y<a;y++){const _=y+c*p,v=y+c*(p+1),E=y+1+c*(p+1),b=y+1+c*p;f.push(_,v,b),f.push(v,E,b)}this.setIndex(f),this.setAttribute("position",new lt(g,3)),this.setAttribute("normal",new lt(x,3)),this.setAttribute("uv",new lt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new is(e.width,e.height,e.widthSegments,e.heightSegments)}}var Kd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Jd=`#ifdef USE_ALPHAHASH
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
#endif`,Zd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Qd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ef=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,tf=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,nf=`#ifdef USE_AOMAP
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
#endif`,sf=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,rf=`#ifdef USE_BATCHING
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
#endif`,of=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,af=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,lf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,cf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,hf=`#ifdef USE_IRIDESCENCE
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
#endif`,uf=`#ifdef USE_BUMPMAP
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
#endif`,df=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ff=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,pf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,mf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,gf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,xf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,_f=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,vf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,yf=`#define PI 3.141592653589793
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
} // validated`,Mf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,bf=`vec3 transformedNormal = objectNormal;
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
#endif`,Sf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,wf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ef=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Tf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Af="gl_FragColor = linearToOutputTexel( gl_FragColor );",Rf=`
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
}`,Cf=`#ifdef USE_ENVMAP
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
#endif`,Lf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Pf=`#ifdef USE_ENVMAP
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
#endif`,If=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Df=`#ifdef USE_ENVMAP
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
#endif`,Nf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Uf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,kf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ff=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Of=`#ifdef USE_GRADIENTMAP
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
}`,zf=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Bf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Hf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Gf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Vf=`uniform bool receiveShadow;
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
#endif`,Wf=`#ifdef USE_ENVMAP
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
#endif`,qf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Xf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,jf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,$f=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Yf=`PhysicalMaterial material;
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
#endif`,Kf=`struct PhysicalMaterial {
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
}`,Jf=`
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
#endif`,Zf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Qf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ep=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,tp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,np=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,ip=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,sp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,rp=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,op=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ap=`#if defined( USE_POINTS_UV )
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
#endif`,lp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,cp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,hp=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,up=`#ifdef USE_MORPHNORMALS
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
#endif`,dp=`#ifdef USE_MORPHTARGETS
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
#endif`,fp=`#ifdef USE_MORPHTARGETS
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
#endif`,pp=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,mp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,gp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,xp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,_p=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,vp=`#ifdef USE_NORMALMAP
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
#endif`,yp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Mp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Sp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,wp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ep=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Tp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ap=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Rp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Cp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Lp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Pp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ip=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Dp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Np=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Up=`float getShadowMask() {
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
}`,kp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Fp=`#ifdef USE_SKINNING
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
#endif`,Op=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,zp=`#ifdef USE_SKINNING
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
#endif`,Bp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Hp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Gp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Vp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Wp=`#ifdef USE_TRANSMISSION
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
#endif`,qp=`#ifdef USE_TRANSMISSION
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
#endif`,Xp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$p=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Yp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Kp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Jp=`uniform sampler2D t2D;
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
}`,Zp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,em=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,tm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,nm=`#include <common>
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
}`,im=`#if DEPTH_PACKING == 3200
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
}`,sm=`#define DISTANCE
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
}`,rm=`#define DISTANCE
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
}`,om=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,am=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lm=`uniform float scale;
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
}`,cm=`uniform vec3 diffuse;
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
}`,hm=`#include <common>
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
}`,um=`uniform vec3 diffuse;
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
}`,dm=`#define LAMBERT
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
}`,fm=`#define LAMBERT
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
}`,pm=`#define MATCAP
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
}`,mm=`#define MATCAP
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
}`,gm=`#define NORMAL
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
}`,xm=`#define NORMAL
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
}`,_m=`#define PHONG
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
}`,vm=`#define PHONG
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
}`,ym=`#define STANDARD
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
}`,Mm=`#define STANDARD
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
}`,bm=`#define TOON
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
}`,Sm=`#define TOON
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
}`,wm=`uniform float size;
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
}`,Em=`uniform vec3 diffuse;
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
}`,Tm=`#include <common>
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
}`,Am=`uniform vec3 color;
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
}`,Rm=`uniform float rotation;
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
}`,Cm=`uniform vec3 diffuse;
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
}`,Be={alphahash_fragment:Kd,alphahash_pars_fragment:Jd,alphamap_fragment:Zd,alphamap_pars_fragment:Qd,alphatest_fragment:ef,alphatest_pars_fragment:tf,aomap_fragment:nf,aomap_pars_fragment:sf,batching_pars_vertex:rf,batching_vertex:of,begin_vertex:af,beginnormal_vertex:lf,bsdfs:cf,iridescence_fragment:hf,bumpmap_pars_fragment:uf,clipping_planes_fragment:df,clipping_planes_pars_fragment:ff,clipping_planes_pars_vertex:pf,clipping_planes_vertex:mf,color_fragment:gf,color_pars_fragment:xf,color_pars_vertex:_f,color_vertex:vf,common:yf,cube_uv_reflection_fragment:Mf,defaultnormal_vertex:bf,displacementmap_pars_vertex:Sf,displacementmap_vertex:wf,emissivemap_fragment:Ef,emissivemap_pars_fragment:Tf,colorspace_fragment:Af,colorspace_pars_fragment:Rf,envmap_fragment:Cf,envmap_common_pars_fragment:Lf,envmap_pars_fragment:Pf,envmap_pars_vertex:If,envmap_physical_pars_fragment:Wf,envmap_vertex:Df,fog_vertex:Nf,fog_pars_vertex:Uf,fog_fragment:kf,fog_pars_fragment:Ff,gradientmap_pars_fragment:Of,lightmap_fragment:zf,lightmap_pars_fragment:Bf,lights_lambert_fragment:Hf,lights_lambert_pars_fragment:Gf,lights_pars_begin:Vf,lights_toon_fragment:qf,lights_toon_pars_fragment:Xf,lights_phong_fragment:jf,lights_phong_pars_fragment:$f,lights_physical_fragment:Yf,lights_physical_pars_fragment:Kf,lights_fragment_begin:Jf,lights_fragment_maps:Zf,lights_fragment_end:Qf,logdepthbuf_fragment:ep,logdepthbuf_pars_fragment:tp,logdepthbuf_pars_vertex:np,logdepthbuf_vertex:ip,map_fragment:sp,map_pars_fragment:rp,map_particle_fragment:op,map_particle_pars_fragment:ap,metalnessmap_fragment:lp,metalnessmap_pars_fragment:cp,morphcolor_vertex:hp,morphnormal_vertex:up,morphtarget_pars_vertex:dp,morphtarget_vertex:fp,normal_fragment_begin:pp,normal_fragment_maps:mp,normal_pars_fragment:gp,normal_pars_vertex:xp,normal_vertex:_p,normalmap_pars_fragment:vp,clearcoat_normal_fragment_begin:yp,clearcoat_normal_fragment_maps:Mp,clearcoat_pars_fragment:bp,iridescence_pars_fragment:Sp,opaque_fragment:wp,packing:Ep,premultiplied_alpha_fragment:Tp,project_vertex:Ap,dithering_fragment:Rp,dithering_pars_fragment:Cp,roughnessmap_fragment:Lp,roughnessmap_pars_fragment:Pp,shadowmap_pars_fragment:Ip,shadowmap_pars_vertex:Dp,shadowmap_vertex:Np,shadowmask_pars_fragment:Up,skinbase_vertex:kp,skinning_pars_vertex:Fp,skinning_vertex:Op,skinnormal_vertex:zp,specularmap_fragment:Bp,specularmap_pars_fragment:Hp,tonemapping_fragment:Gp,tonemapping_pars_fragment:Vp,transmission_fragment:Wp,transmission_pars_fragment:qp,uv_pars_fragment:Xp,uv_pars_vertex:jp,uv_vertex:$p,worldpos_vertex:Yp,background_vert:Kp,background_frag:Jp,backgroundCube_vert:Zp,backgroundCube_frag:Qp,cube_vert:em,cube_frag:tm,depth_vert:nm,depth_frag:im,distanceRGBA_vert:sm,distanceRGBA_frag:rm,equirect_vert:om,equirect_frag:am,linedashed_vert:lm,linedashed_frag:cm,meshbasic_vert:hm,meshbasic_frag:um,meshlambert_vert:dm,meshlambert_frag:fm,meshmatcap_vert:pm,meshmatcap_frag:mm,meshnormal_vert:gm,meshnormal_frag:xm,meshphong_vert:_m,meshphong_frag:vm,meshphysical_vert:ym,meshphysical_frag:Mm,meshtoon_vert:bm,meshtoon_frag:Sm,points_vert:wm,points_frag:Em,shadow_vert:Tm,shadow_frag:Am,sprite_vert:Rm,sprite_frag:Cm},re={common:{diffuse:{value:new ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new Se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new ue(16777215)},opacity:{value:1},center:{value:new Se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},fn={basic:{uniforms:zt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.fog]),vertexShader:Be.meshbasic_vert,fragmentShader:Be.meshbasic_frag},lambert:{uniforms:zt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new ue(0)}}]),vertexShader:Be.meshlambert_vert,fragmentShader:Be.meshlambert_frag},phong:{uniforms:zt([re.common,re.specularmap,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.fog,re.lights,{emissive:{value:new ue(0)},specular:{value:new ue(1118481)},shininess:{value:30}}]),vertexShader:Be.meshphong_vert,fragmentShader:Be.meshphong_frag},standard:{uniforms:zt([re.common,re.envmap,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.roughnessmap,re.metalnessmap,re.fog,re.lights,{emissive:{value:new ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag},toon:{uniforms:zt([re.common,re.aomap,re.lightmap,re.emissivemap,re.bumpmap,re.normalmap,re.displacementmap,re.gradientmap,re.fog,re.lights,{emissive:{value:new ue(0)}}]),vertexShader:Be.meshtoon_vert,fragmentShader:Be.meshtoon_frag},matcap:{uniforms:zt([re.common,re.bumpmap,re.normalmap,re.displacementmap,re.fog,{matcap:{value:null}}]),vertexShader:Be.meshmatcap_vert,fragmentShader:Be.meshmatcap_frag},points:{uniforms:zt([re.points,re.fog]),vertexShader:Be.points_vert,fragmentShader:Be.points_frag},dashed:{uniforms:zt([re.common,re.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Be.linedashed_vert,fragmentShader:Be.linedashed_frag},depth:{uniforms:zt([re.common,re.displacementmap]),vertexShader:Be.depth_vert,fragmentShader:Be.depth_frag},normal:{uniforms:zt([re.common,re.bumpmap,re.normalmap,re.displacementmap,{opacity:{value:1}}]),vertexShader:Be.meshnormal_vert,fragmentShader:Be.meshnormal_frag},sprite:{uniforms:zt([re.sprite,re.fog]),vertexShader:Be.sprite_vert,fragmentShader:Be.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Be.background_vert,fragmentShader:Be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Be.backgroundCube_vert,fragmentShader:Be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Be.cube_vert,fragmentShader:Be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Be.equirect_vert,fragmentShader:Be.equirect_frag},distanceRGBA:{uniforms:zt([re.common,re.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Be.distanceRGBA_vert,fragmentShader:Be.distanceRGBA_frag},shadow:{uniforms:zt([re.lights,re.fog,{color:{value:new ue(0)},opacity:{value:1}}]),vertexShader:Be.shadow_vert,fragmentShader:Be.shadow_frag}};fn.physical={uniforms:zt([fn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new Se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new Se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new ue(0)},specularColor:{value:new ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new Se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:Be.meshphysical_vert,fragmentShader:Be.meshphysical_frag};const Zs={r:0,b:0,g:0};function Lm(r,e,t,n,i,s,o){const a=new ue(0);let l=s===!0?0:1,c,h,u=null,d=0,f=null;function g(m,p){let y=!1,_=p.isScene===!0?p.background:null;_&&_.isTexture&&(_=(p.backgroundBlurriness>0?t:e).get(_)),_===null?x(a,l):_&&_.isColor&&(x(_,1),y=!0);const v=r.xr.getEnvironmentBlendMode();v==="additive"?n.buffers.color.setClear(0,0,0,1,o):v==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(r.autoClear||y)&&r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil),_&&(_.isCubeTexture||_.mapping===Tr)?(h===void 0&&(h=new oe(new xe(1,1,1),new Ht({name:"BackgroundCubeMaterial",uniforms:Ji(fn.backgroundCube.uniforms),vertexShader:fn.backgroundCube.vertexShader,fragmentShader:fn.backgroundCube.fragmentShader,side:Dt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,b,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.toneMapped=Je.getTransfer(_.colorSpace)!==ot,(u!==_||d!==_.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=_,d=_.version,f=r.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(c===void 0&&(c=new oe(new is(2,2),new Ht({name:"BackgroundMaterial",uniforms:Ji(fn.background.uniforms),vertexShader:fn.background.vertexShader,fragmentShader:fn.background.fragmentShader,side:Pn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=_,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=Je.getTransfer(_.colorSpace)!==ot,_.matrixAutoUpdate===!0&&_.updateMatrix(),c.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||d!==_.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,u=_,d=_.version,f=r.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function x(m,p){m.getRGB(Zs,bh(r)),n.buffers.color.setClear(Zs.r,Zs.g,Zs.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),l=p,x(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,x(a,l)},render:g}}function Pm(r,e,t,n){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s=n.isWebGL2?null:e.get("OES_vertex_array_object"),o=n.isWebGL2||s!==null,a={},l=m(null);let c=l,h=!1;function u(L,I,F,B,D){let O=!1;if(o){const H=x(B,F,I);c!==H&&(c=H,f(c.object)),O=p(L,B,F,D),O&&y(L,B,F,D)}else{const H=I.wireframe===!0;(c.geometry!==B.id||c.program!==F.id||c.wireframe!==H)&&(c.geometry=B.id,c.program=F.id,c.wireframe=H,O=!0)}D!==null&&t.update(D,r.ELEMENT_ARRAY_BUFFER),(O||h)&&(h=!1,N(L,I,F,B),D!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(D).buffer))}function d(){return n.isWebGL2?r.createVertexArray():s.createVertexArrayOES()}function f(L){return n.isWebGL2?r.bindVertexArray(L):s.bindVertexArrayOES(L)}function g(L){return n.isWebGL2?r.deleteVertexArray(L):s.deleteVertexArrayOES(L)}function x(L,I,F){const B=F.wireframe===!0;let D=a[L.id];D===void 0&&(D={},a[L.id]=D);let O=D[I.id];O===void 0&&(O={},D[I.id]=O);let H=O[B];return H===void 0&&(H=m(d()),O[B]=H),H}function m(L){const I=[],F=[],B=[];for(let D=0;D<i;D++)I[D]=0,F[D]=0,B[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:F,attributeDivisors:B,object:L,attributes:{},index:null}}function p(L,I,F,B){const D=c.attributes,O=I.attributes;let H=0;const Z=F.getAttributes();for(const ne in Z)if(Z[ne].location>=0){const J=D[ne];let ae=O[ne];if(ae===void 0&&(ne==="instanceMatrix"&&L.instanceMatrix&&(ae=L.instanceMatrix),ne==="instanceColor"&&L.instanceColor&&(ae=L.instanceColor)),J===void 0||J.attribute!==ae||ae&&J.data!==ae.data)return!0;H++}return c.attributesNum!==H||c.index!==B}function y(L,I,F,B){const D={},O=I.attributes;let H=0;const Z=F.getAttributes();for(const ne in Z)if(Z[ne].location>=0){let J=O[ne];J===void 0&&(ne==="instanceMatrix"&&L.instanceMatrix&&(J=L.instanceMatrix),ne==="instanceColor"&&L.instanceColor&&(J=L.instanceColor));const ae={};ae.attribute=J,J&&J.data&&(ae.data=J.data),D[ne]=ae,H++}c.attributes=D,c.attributesNum=H,c.index=B}function _(){const L=c.newAttributes;for(let I=0,F=L.length;I<F;I++)L[I]=0}function v(L){E(L,0)}function E(L,I){const F=c.newAttributes,B=c.enabledAttributes,D=c.attributeDivisors;F[L]=1,B[L]===0&&(r.enableVertexAttribArray(L),B[L]=1),D[L]!==I&&((n.isWebGL2?r:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,I),D[L]=I)}function b(){const L=c.newAttributes,I=c.enabledAttributes;for(let F=0,B=I.length;F<B;F++)I[F]!==L[F]&&(r.disableVertexAttribArray(F),I[F]=0)}function A(L,I,F,B,D,O,H){H===!0?r.vertexAttribIPointer(L,I,F,D,O):r.vertexAttribPointer(L,I,F,B,D,O)}function N(L,I,F,B){if(n.isWebGL2===!1&&(L.isInstancedMesh||B.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;_();const D=B.attributes,O=F.getAttributes(),H=I.defaultAttributeValues;for(const Z in O){const ne=O[Z];if(ne.location>=0){let K=D[Z];if(K===void 0&&(Z==="instanceMatrix"&&L.instanceMatrix&&(K=L.instanceMatrix),Z==="instanceColor"&&L.instanceColor&&(K=L.instanceColor)),K!==void 0){const J=K.normalized,ae=K.itemSize,_e=t.get(K);if(_e===void 0)continue;const ve=_e.buffer,Ie=_e.type,Ne=_e.bytesPerElement,pe=n.isWebGL2===!0&&(Ie===r.INT||Ie===r.UNSIGNED_INT||K.gpuType===ih);if(K.isInterleavedBufferAttribute){const Ye=K.data,G=Ye.stride,Ut=K.offset;if(Ye.isInstancedInterleavedBuffer){for(let Ee=0;Ee<ne.locationSize;Ee++)E(ne.location+Ee,Ye.meshPerAttribute);L.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=Ye.meshPerAttribute*Ye.count)}else for(let Ee=0;Ee<ne.locationSize;Ee++)v(ne.location+Ee);r.bindBuffer(r.ARRAY_BUFFER,ve);for(let Ee=0;Ee<ne.locationSize;Ee++)A(ne.location+Ee,ae/ne.locationSize,Ie,J,G*Ne,(Ut+ae/ne.locationSize*Ee)*Ne,pe)}else{if(K.isInstancedBufferAttribute){for(let Ye=0;Ye<ne.locationSize;Ye++)E(ne.location+Ye,K.meshPerAttribute);L.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let Ye=0;Ye<ne.locationSize;Ye++)v(ne.location+Ye);r.bindBuffer(r.ARRAY_BUFFER,ve);for(let Ye=0;Ye<ne.locationSize;Ye++)A(ne.location+Ye,ae/ne.locationSize,Ie,J,ae*Ne,ae/ne.locationSize*Ye*Ne,pe)}}else if(H!==void 0){const J=H[Z];if(J!==void 0)switch(J.length){case 2:r.vertexAttrib2fv(ne.location,J);break;case 3:r.vertexAttrib3fv(ne.location,J);break;case 4:r.vertexAttrib4fv(ne.location,J);break;default:r.vertexAttrib1fv(ne.location,J)}}}}b()}function M(){V();for(const L in a){const I=a[L];for(const F in I){const B=I[F];for(const D in B)g(B[D].object),delete B[D];delete I[F]}delete a[L]}}function w(L){if(a[L.id]===void 0)return;const I=a[L.id];for(const F in I){const B=I[F];for(const D in B)g(B[D].object),delete B[D];delete I[F]}delete a[L.id]}function k(L){for(const I in a){const F=a[I];if(F[L.id]===void 0)continue;const B=F[L.id];for(const D in B)g(B[D].object),delete B[D];delete F[L.id]}}function V(){j(),h=!0,c!==l&&(c=l,f(c.object))}function j(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:V,resetDefaultState:j,dispose:M,releaseStatesOfGeometry:w,releaseStatesOfProgram:k,initAttributes:_,enableAttribute:v,disableUnusedAttributes:b}}function Im(r,e,t,n){const i=n.isWebGL2;let s;function o(h){s=h}function a(h,u){r.drawArrays(s,h,u),t.update(u,s,1)}function l(h,u,d){if(d===0)return;let f,g;if(i)f=r,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](s,h,u,d),t.update(u,s,d)}function c(h,u,d){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<d;g++)this.render(h[g],u[g]);else{f.multiDrawArraysWEBGL(s,h,0,u,0,d);let g=0;for(let x=0;x<d;x++)g+=u[x];t.update(g,s,1)}}this.setMode=o,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function Dm(r,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");n=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function s(A){if(A==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&r.constructor.name==="WebGL2RenderingContext";let a=t.precision!==void 0?t.precision:"highp";const l=s(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=o||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),d=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),x=r.getParameter(r.MAX_VERTEX_ATTRIBS),m=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),p=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),_=d>0,v=o||e.has("OES_texture_float"),E=_&&v,b=o?r.getParameter(r.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:s,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:g,maxAttributes:x,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:y,vertexTextures:_,floatFragmentTextures:v,floatVertexTextures:E,maxSamples:b}}function Nm(r){const e=this;let t=null,n=0,i=!1,s=!1;const o=new Bn,a=new je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,p=r.get(u);if(!i||g===null||g.length===0||s&&!m)s?h(null):c();else{const y=s?0:n,_=y*4;let v=p.clippingState||null;l.value=v,v=h(g,d,_,f);for(let E=0;E!==_;++E)v[E]=t[E];p.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const x=u!==null?u.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const p=f+x*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let _=0,v=f;_!==x;++_,v+=4)o.copy(u[_]).applyMatrix4(y,a),o.normal.toArray(m,v),m[v+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function Um(r){let e=new WeakMap;function t(o,a){return a===Lo?o.mapping=Xi:a===Po&&(o.mapping=ji),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Lo||a===Po)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Xd(l.height/2);return c.fromEquirectangularTexture(r,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:n,dispose:s}}class Cr extends Sh{constructor(e=-1,t=1,n=1,i=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const zi=4,Al=[.125,.215,.35,.446,.526,.582],ri=20,co=new Cr,Rl=new ue;let ho=null,uo=0,fo=0;const ii=(1+Math.sqrt(5))/2,Ni=1/ii,Cl=[new C(1,1,1),new C(-1,1,1),new C(1,1,-1),new C(-1,1,-1),new C(0,ii,Ni),new C(0,ii,-Ni),new C(Ni,0,ii),new C(-Ni,0,ii),new C(ii,Ni,0),new C(-ii,Ni,0)];class Fo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){ho=this._renderer.getRenderTarget(),uo=this._renderer.getActiveCubeFace(),fo=this._renderer.getActiveMipmapLevel(),this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Il(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Pl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ho,uo,fo),e.scissorTest=!1,Qs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Xi||e.mapping===ji?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ho=this._renderer.getRenderTarget(),uo=this._renderer.getActiveCubeFace(),fo=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Gt,minFilter:Gt,generateMipmaps:!1,type:gn,format:Qt,colorSpace:Et,depthBuffer:!1},i=Ll(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ll(e,t,n);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=km(s)),this._blurMaterial=Fm(s,e,t)}return i}_compileMaterial(e){const t=new oe(this._lodPlanes[0],e);this._renderer.compile(t,co)}_sceneToCubeUV(e,t,n,i){const a=new Pt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Rl),h.toneMapping=Xn,h.autoClear=!1;const f=new Bt({name:"PMREM.Background",side:Dt,depthWrite:!1,depthTest:!1}),g=new oe(new xe,f);let x=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,x=!0):(f.color.copy(Rl),x=!0);for(let p=0;p<6;p++){const y=p%3;y===0?(a.up.set(0,l[p],0),a.lookAt(c[p],0,0)):y===1?(a.up.set(0,0,l[p]),a.lookAt(0,c[p],0)):(a.up.set(0,l[p],0),a.lookAt(0,0,c[p]));const _=this._cubeSize;Qs(i,y*_,p>2?_:0,_,_),h.setRenderTarget(i),x&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Xi||e.mapping===ji;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Il()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Pl());const s=i?this._cubemapMaterial:this._equirectMaterial,o=new oe(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Qs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,co)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const s=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=Cl[(i-1)%Cl.length];this._blur(e,i-1,i,s,o)}t.autoClear=n}_blur(e,t,n,i,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",s),this._halfBlur(o,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new oe(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*ri-1),x=s/g,m=isFinite(s)?1+Math.floor(h*x):ri;m>ri&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ri}`);const p=[];let y=0;for(let A=0;A<ri;++A){const N=A/x,M=Math.exp(-N*N/2);p.push(M),A===0?y+=M:A<m&&(y+=2*M)}for(let A=0;A<p.length;A++)p[A]=p[A]/y;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:_}=this;d.dTheta.value=g,d.mipInt.value=_-n;const v=this._sizeLods[i],E=3*v*(i>_-zi?i-_+zi:0),b=4*(this._cubeSize-v);Qs(t,E,b,3*v,2*v),l.setRenderTarget(t),l.render(u,co)}}function km(r){const e=[],t=[],n=[];let i=r;const s=r-zi+1+Al.length;for(let o=0;o<s;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>r-zi?l=Al[o-r+zi-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,x=3,m=2,p=1,y=new Float32Array(x*g*f),_=new Float32Array(m*g*f),v=new Float32Array(p*g*f);for(let b=0;b<f;b++){const A=b%3*2/3-1,N=b>2?0:-1,M=[A,N,0,A+2/3,N,0,A+2/3,N+1,0,A,N,0,A+2/3,N+1,0,A,N+1,0];y.set(M,x*g*b),_.set(d,m*g*b);const w=[b,b,b,b,b,b];v.set(w,p*g*b)}const E=new Tt;E.setAttribute("position",new Nt(y,x)),E.setAttribute("uv",new Nt(_,m)),E.setAttribute("faceIndex",new Nt(v,p)),e.push(E),i>zi&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ll(r,e,t){const n=new tn(r,e,t);return n.texture.mapping=Tr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Qs(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function Fm(r,e,t){const n=new Float32Array(ri),i=new C(0,1,0);return new Ht({name:"SphericalGaussianBlur",defines:{n:ri,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:la(),fragmentShader:`

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
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Pl(){return new Ht({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:la(),fragmentShader:`

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
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function Il(){return new Ht({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:la(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ln,depthTest:!1,depthWrite:!1})}function la(){return`

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
	`}function Om(r){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Lo||l===Po,h=l===Xi||l===ji;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=e.get(a);return t===null&&(t=new Fo(r)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),e.set(a,u),u.texture}else{if(e.has(a))return e.get(a).texture;{const u=a.image;if(c&&u&&u.height>0||h&&u&&i(u)){t===null&&(t=new Fo(r));const d=c?t.fromEquirectangular(a):t.fromCubemap(a);return e.set(a,d),a.addEventListener("dispose",s),d.texture}else return null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){const l=a.target;l.removeEventListener("dispose",s);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function zm(r){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Bm(r,e,t,n){const i={},s=new WeakMap;function o(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const x=d.morphAttributes[g];for(let m=0,p=x.length;m<p;m++)e.remove(x[m])}d.removeEventListener("dispose",o),delete i[d.id];const f=s.get(d);f&&(e.remove(f),s.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)e.update(d[g],r.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const x=f[g];for(let m=0,p=x.length;m<p;m++)e.update(x[m],r.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,g=u.attributes.position;let x=0;if(f!==null){const y=f.array;x=f.version;for(let _=0,v=y.length;_<v;_+=3){const E=y[_+0],b=y[_+1],A=y[_+2];d.push(E,b,b,A,A,E)}}else if(g!==void 0){const y=g.array;x=g.version;for(let _=0,v=y.length/3-1;_<v;_+=3){const E=_+0,b=_+1,A=_+2;d.push(E,b,b,A,A,E)}}else return;const m=new(mh(d)?Mh:yh)(d,1);m.version=x;const p=s.get(u);p&&e.remove(p),s.set(u,m)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Hm(r,e,t,n){const i=n.isWebGL2;let s;function o(f){s=f}let a,l;function c(f){a=f.type,l=f.bytesPerElement}function h(f,g){r.drawElements(s,g,a,f*l),t.update(g,s,1)}function u(f,g,x){if(x===0)return;let m,p;if(i)m=r,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](s,g,a,f*l,x),t.update(g,s,x)}function d(f,g,x){if(x===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<x;p++)this.render(f[p]/l,g[p]);else{m.multiDrawElementsWEBGL(s,g,0,a,f,0,x);let p=0;for(let y=0;y<x;y++)p+=g[y];t.update(p,s,1)}}this.setMode=o,this.setIndex=c,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function Gm(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case r.TRIANGLES:t.triangles+=a*(s/3);break;case r.LINES:t.lines+=a*(s/2);break;case r.LINE_STRIP:t.lines+=a*(s-1);break;case r.LINE_LOOP:t.lines+=a*s;break;case r.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Vm(r,e){return r[0]-e[0]}function Wm(r,e){return Math.abs(e[1])-Math.abs(r[1])}function qm(r,e,t){const n={},i=new Float32Array(8),s=new WeakMap,o=new nt,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,u){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,x=g!==void 0?g.length:0;let m=s.get(h);if(m===void 0||m.count!==x){let I=function(){j.dispose(),s.delete(h),h.removeEventListener("dispose",I)};var f=I;m!==void 0&&m.texture.dispose();const _=h.morphAttributes.position!==void 0,v=h.morphAttributes.normal!==void 0,E=h.morphAttributes.color!==void 0,b=h.morphAttributes.position||[],A=h.morphAttributes.normal||[],N=h.morphAttributes.color||[];let M=0;_===!0&&(M=1),v===!0&&(M=2),E===!0&&(M=3);let w=h.attributes.position.count*M,k=1;w>e.maxTextureSize&&(k=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const V=new Float32Array(w*k*4*x),j=new _h(V,w,k,x);j.type=Rn,j.needsUpdate=!0;const L=M*4;for(let F=0;F<x;F++){const B=b[F],D=A[F],O=N[F],H=w*k*4*F;for(let Z=0;Z<B.count;Z++){const ne=Z*L;_===!0&&(o.fromBufferAttribute(B,Z),V[H+ne+0]=o.x,V[H+ne+1]=o.y,V[H+ne+2]=o.z,V[H+ne+3]=0),v===!0&&(o.fromBufferAttribute(D,Z),V[H+ne+4]=o.x,V[H+ne+5]=o.y,V[H+ne+6]=o.z,V[H+ne+7]=0),E===!0&&(o.fromBufferAttribute(O,Z),V[H+ne+8]=o.x,V[H+ne+9]=o.y,V[H+ne+10]=o.z,V[H+ne+11]=O.itemSize===4?o.w:1)}}m={count:x,texture:j,size:new Se(w,k)},s.set(h,m),h.addEventListener("dispose",I)}let p=0;for(let _=0;_<d.length;_++)p+=d[_];const y=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(r,"morphTargetBaseInfluence",y),u.getUniforms().setValue(r,"morphTargetInfluences",d),u.getUniforms().setValue(r,"morphTargetsTexture",m.texture,t),u.getUniforms().setValue(r,"morphTargetsTextureSize",m.size)}else{const g=d===void 0?0:d.length;let x=n[h.id];if(x===void 0||x.length!==g){x=[];for(let v=0;v<g;v++)x[v]=[v,0];n[h.id]=x}for(let v=0;v<g;v++){const E=x[v];E[0]=v,E[1]=d[v]}x.sort(Wm);for(let v=0;v<8;v++)v<g&&x[v][1]?(a[v][0]=x[v][0],a[v][1]=x[v][1]):(a[v][0]=Number.MAX_SAFE_INTEGER,a[v][1]=0);a.sort(Vm);const m=h.morphAttributes.position,p=h.morphAttributes.normal;let y=0;for(let v=0;v<8;v++){const E=a[v],b=E[0],A=E[1];b!==Number.MAX_SAFE_INTEGER&&A?(m&&h.getAttribute("morphTarget"+v)!==m[b]&&h.setAttribute("morphTarget"+v,m[b]),p&&h.getAttribute("morphNormal"+v)!==p[b]&&h.setAttribute("morphNormal"+v,p[b]),i[v]=A,y+=A):(m&&h.hasAttribute("morphTarget"+v)===!0&&h.deleteAttribute("morphTarget"+v),p&&h.hasAttribute("morphNormal"+v)===!0&&h.deleteAttribute("morphNormal"+v),i[v]=0)}const _=h.morphTargetsRelative?1:1-y;u.getUniforms().setValue(r,"morphTargetBaseInfluence",_),u.getUniforms().setValue(r,"morphTargetInfluences",i)}}return{update:l}}function Xm(r,e,t,n){let i=new WeakMap;function s(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}class Th extends wt{constructor(e,t,n,i,s,o,a,l,c,h){if(h=h!==void 0?h:ci,h!==ci&&h!==$i)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ci&&(n=Wn),n===void 0&&h===$i&&(n=li),super(null,i,s,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:St,this.minFilter=l!==void 0?l:St,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Ah=new wt,Rh=new Th(1,1);Rh.compareFunction=ph;const Ch=new _h,Lh=new Ld,Ph=new wh,Dl=[],Nl=[],Ul=new Float32Array(16),kl=new Float32Array(9),Fl=new Float32Array(4);function ss(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=Dl[i];if(s===void 0&&(s=new Float32Array(i),Dl[i]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,r[o].toArray(s,a)}return s}function _t(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function vt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function Lr(r,e){let t=Nl[e];t===void 0&&(t=new Int32Array(e),Nl[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function jm(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function $m(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;r.uniform2fv(this.addr,e),vt(t,e)}}function Ym(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(_t(t,e))return;r.uniform3fv(this.addr,e),vt(t,e)}}function Km(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;r.uniform4fv(this.addr,e),vt(t,e)}}function Jm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),vt(t,e)}else{if(_t(t,n))return;Fl.set(n),r.uniformMatrix2fv(this.addr,!1,Fl),vt(t,n)}}function Zm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),vt(t,e)}else{if(_t(t,n))return;kl.set(n),r.uniformMatrix3fv(this.addr,!1,kl),vt(t,n)}}function Qm(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),vt(t,e)}else{if(_t(t,n))return;Ul.set(n),r.uniformMatrix4fv(this.addr,!1,Ul),vt(t,n)}}function eg(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function tg(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;r.uniform2iv(this.addr,e),vt(t,e)}}function ng(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;r.uniform3iv(this.addr,e),vt(t,e)}}function ig(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;r.uniform4iv(this.addr,e),vt(t,e)}}function sg(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function rg(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;r.uniform2uiv(this.addr,e),vt(t,e)}}function og(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;r.uniform3uiv(this.addr,e),vt(t,e)}}function ag(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;r.uniform4uiv(this.addr,e),vt(t,e)}}function lg(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);const s=this.type===r.SAMPLER_2D_SHADOW?Rh:Ah;t.setTexture2D(e||s,i)}function cg(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Lh,i)}function hg(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Ph,i)}function ug(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Ch,i)}function dg(r){switch(r){case 5126:return jm;case 35664:return $m;case 35665:return Ym;case 35666:return Km;case 35674:return Jm;case 35675:return Zm;case 35676:return Qm;case 5124:case 35670:return eg;case 35667:case 35671:return tg;case 35668:case 35672:return ng;case 35669:case 35673:return ig;case 5125:return sg;case 36294:return rg;case 36295:return og;case 36296:return ag;case 35678:case 36198:case 36298:case 36306:case 35682:return lg;case 35679:case 36299:case 36307:return cg;case 35680:case 36300:case 36308:case 36293:return hg;case 36289:case 36303:case 36311:case 36292:return ug}}function fg(r,e){r.uniform1fv(this.addr,e)}function pg(r,e){const t=ss(e,this.size,2);r.uniform2fv(this.addr,t)}function mg(r,e){const t=ss(e,this.size,3);r.uniform3fv(this.addr,t)}function gg(r,e){const t=ss(e,this.size,4);r.uniform4fv(this.addr,t)}function xg(r,e){const t=ss(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function _g(r,e){const t=ss(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function vg(r,e){const t=ss(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function yg(r,e){r.uniform1iv(this.addr,e)}function Mg(r,e){r.uniform2iv(this.addr,e)}function bg(r,e){r.uniform3iv(this.addr,e)}function Sg(r,e){r.uniform4iv(this.addr,e)}function wg(r,e){r.uniform1uiv(this.addr,e)}function Eg(r,e){r.uniform2uiv(this.addr,e)}function Tg(r,e){r.uniform3uiv(this.addr,e)}function Ag(r,e){r.uniform4uiv(this.addr,e)}function Rg(r,e,t){const n=this.cache,i=e.length,s=Lr(t,i);_t(n,s)||(r.uniform1iv(this.addr,s),vt(n,s));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Ah,s[o])}function Cg(r,e,t){const n=this.cache,i=e.length,s=Lr(t,i);_t(n,s)||(r.uniform1iv(this.addr,s),vt(n,s));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||Lh,s[o])}function Lg(r,e,t){const n=this.cache,i=e.length,s=Lr(t,i);_t(n,s)||(r.uniform1iv(this.addr,s),vt(n,s));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Ph,s[o])}function Pg(r,e,t){const n=this.cache,i=e.length,s=Lr(t,i);_t(n,s)||(r.uniform1iv(this.addr,s),vt(n,s));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Ch,s[o])}function Ig(r){switch(r){case 5126:return fg;case 35664:return pg;case 35665:return mg;case 35666:return gg;case 35674:return xg;case 35675:return _g;case 35676:return vg;case 5124:case 35670:return yg;case 35667:case 35671:return Mg;case 35668:case 35672:return bg;case 35669:case 35673:return Sg;case 5125:return wg;case 36294:return Eg;case 36295:return Tg;case 36296:return Ag;case 35678:case 36198:case 36298:case 36306:case 35682:return Rg;case 35679:case 36299:case 36307:return Cg;case 35680:case 36300:case 36308:case 36293:return Lg;case 36289:case 36303:case 36311:case 36292:return Pg}}class Dg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=dg(t.type)}}class Ng{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ig(t.type)}}class Ug{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,o=i.length;s!==o;++s){const a=i[s];a.setValue(e,t[a.id],n)}}}const po=/(\w+)(\])?(\[|\.)?/g;function Ol(r,e){r.seq.push(e),r.map[e.id]=e}function kg(r,e,t){const n=r.name,i=n.length;for(po.lastIndex=0;;){const s=po.exec(n),o=po.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Ol(t,c===void 0?new Dg(a,r,e):new Ng(a,r,e));break}else{let u=t.map[a];u===void 0&&(u=new Ug(a),Ol(t,u)),t=u}}}class cr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const s=e.getActiveUniform(t,i),o=e.getUniformLocation(t,s.name);kg(s,o,this)}}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function zl(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const Fg=37297;let Og=0;function zg(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=i;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function Bg(r){const e=Je.getPrimaries(Je.workingColorSpace),t=Je.getPrimaries(r);let n;switch(e===t?n="":e===vr&&t===_r?n="LinearDisplayP3ToLinearSRGB":e===_r&&t===vr&&(n="LinearSRGBToLinearDisplayP3"),r){case Et:case Ar:return[n,"LinearTransferOETF"];case at:case sa:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",r),[n,"LinearTransferOETF"]}}function Bl(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";const s=/ERROR: 0:(\d+)/.exec(i);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+zg(r.getShaderSource(e),o)}else return i}function Hg(r,e){const t=Bg(e);return`vec4 ${r}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Gg(r,e){let t;switch(e){case Jc:t="Linear";break;case Zc:t="Reinhard";break;case Qc:t="OptimizedCineon";break;case ea:t="ACESFilmic";break;case eh:t="AgX";break;case Gu:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Vg(r){return[r.extensionDerivatives||r.envMapCubeUVHeight||r.bumpMap||r.normalMapTangentSpace||r.clearcoatNormalMap||r.flatShading||r.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(r.extensionFragDepth||r.logarithmicDepthBuffer)&&r.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",r.extensionDrawBuffers&&r.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(r.extensionShaderTextureLOD||r.envMap||r.transmission)&&r.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Bi).join(`
`)}function Wg(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Bi).join(`
`)}function qg(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Xg(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),o=s.name;let a=1;s.type===r.FLOAT_MAT2&&(a=2),s.type===r.FLOAT_MAT3&&(a=3),s.type===r.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:r.getAttribLocation(e,o),locationSize:a}}return t}function Bi(r){return r!==""}function Hl(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Gl(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const jg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oo(r){return r.replace(jg,Yg)}const $g=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Yg(r,e){let t=Be[e];if(t===void 0){const n=$g.get(e);if(n!==void 0)t=Be[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Oo(t)}const Kg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vl(r){return r.replace(Kg,Jg)}function Jg(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Wl(r){let e="precision "+r.precision+` float;
precision `+r.precision+" int;";return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Zg(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===Yc?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===Kc?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Tn&&(e="SHADOWMAP_TYPE_VSM"),e}function Qg(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case Xi:case ji:e="ENVMAP_TYPE_CUBE";break;case Tr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function e0(r){let e="ENVMAP_MODE_REFLECTION";if(r.envMap)switch(r.envMapMode){case ji:e="ENVMAP_MODE_REFRACTION";break}return e}function t0(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case Qo:e="ENVMAP_BLENDING_MULTIPLY";break;case Bu:e="ENVMAP_BLENDING_MIX";break;case Hu:e="ENVMAP_BLENDING_ADD";break}return e}function n0(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function i0(r,e,t,n){const i=r.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Zg(t),c=Qg(t),h=e0(t),u=t0(t),d=n0(t),f=t.isWebGL2?"":Vg(t),g=Wg(t),x=qg(s),m=i.createProgram();let p,y,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Bi).join(`
`),p.length>0&&(p+=`
`),y=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Bi).join(`
`),y.length>0&&(y+=`
`)):(p=[Wl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Bi).join(`
`),y=[f,Wl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Xn?"#define TONE_MAPPING":"",t.toneMapping!==Xn?Be.tonemapping_pars_fragment:"",t.toneMapping!==Xn?Gg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Be.colorspace_pars_fragment,Hg("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Bi).join(`
`)),o=Oo(o),o=Hl(o,t),o=Gl(o,t),a=Oo(a),a=Hl(a,t),a=Gl(a,t),o=Vl(o),a=Vl(a),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,y=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===cl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===cl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);const v=_+p+o,E=_+y+a,b=zl(i,i.VERTEX_SHADER,v),A=zl(i,i.FRAGMENT_SHADER,E);i.attachShader(m,b),i.attachShader(m,A),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function N(V){if(r.debug.checkShaderErrors){const j=i.getProgramInfoLog(m).trim(),L=i.getShaderInfoLog(b).trim(),I=i.getShaderInfoLog(A).trim();let F=!0,B=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(F=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,m,b,A);else{const D=Bl(i,b,"vertex"),O=Bl(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+j+`
`+D+`
`+O)}else j!==""?console.warn("THREE.WebGLProgram: Program Info Log:",j):(L===""||I==="")&&(B=!1);B&&(V.diagnostics={runnable:F,programLog:j,vertexShader:{log:L,prefix:p},fragmentShader:{log:I,prefix:y}})}i.deleteShader(b),i.deleteShader(A),M=new cr(i,m),w=Xg(i,m)}let M;this.getUniforms=function(){return M===void 0&&N(this),M};let w;this.getAttributes=function(){return w===void 0&&N(this),w};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=i.getProgramParameter(m,Fg)),k},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Og++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=b,this.fragmentShader=A,this}let s0=0;class r0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new o0(e),t.set(e,n)),n}}class o0{constructor(e){this.id=s0++,this.code=e,this.usedTimes=0}}function a0(r,e,t,n,i,s,o){const a=new oa,l=new r0,c=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(M){return M===0?"uv":`uv${M}`}function m(M,w,k,V,j){const L=V.fog,I=j.geometry,F=M.isMeshStandardMaterial?V.environment:null,B=(M.isMeshStandardMaterial?t:e).get(M.envMap||F),D=B&&B.mapping===Tr?B.image.height:null,O=g[M.type];M.precision!==null&&(f=i.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const H=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,Z=H!==void 0?H.length:0;let ne=0;I.morphAttributes.position!==void 0&&(ne=1),I.morphAttributes.normal!==void 0&&(ne=2),I.morphAttributes.color!==void 0&&(ne=3);let K,J,ae,_e;if(O){const kt=fn[O];K=kt.vertexShader,J=kt.fragmentShader}else K=M.vertexShader,J=M.fragmentShader,l.update(M),ae=l.getVertexShaderID(M),_e=l.getFragmentShaderID(M);const ve=r.getRenderTarget(),Ie=j.isInstancedMesh===!0,Ne=j.isBatchedMesh===!0,pe=!!M.map,Ye=!!M.matcap,G=!!B,Ut=!!M.aoMap,Ee=!!M.lightMap,Ue=!!M.bumpMap,ye=!!M.normalMap,dt=!!M.displacementMap,He=!!M.emissiveMap,R=!!M.metalnessMap,S=!!M.roughnessMap,q=M.anisotropy>0,te=M.clearcoat>0,ee=M.iridescence>0,ie=M.sheen>0,Me=M.transmission>0,he=q&&!!M.anisotropyMap,me=te&&!!M.clearcoatMap,Re=te&&!!M.clearcoatNormalMap,Ge=te&&!!M.clearcoatRoughnessMap,Q=ee&&!!M.iridescenceMap,et=ee&&!!M.iridescenceThicknessMap,$e=ie&&!!M.sheenColorMap,De=ie&&!!M.sheenRoughnessMap,we=!!M.specularMap,ge=!!M.specularColorMap,ze=!!M.specularIntensityMap,Qe=Me&&!!M.transmissionMap,pt=Me&&!!M.thicknessMap,qe=!!M.gradientMap,se=!!M.alphaMap,P=M.alphaTest>0,le=!!M.alphaHash,ce=!!M.extensions,Le=!!I.attributes.uv1,Te=!!I.attributes.uv2,it=!!I.attributes.uv3;let st=Xn;return M.toneMapped&&(ve===null||ve.isXRRenderTarget===!0)&&(st=r.toneMapping),{isWebGL2:h,shaderID:O,shaderType:M.type,shaderName:M.name,vertexShader:K,fragmentShader:J,defines:M.defines,customVertexShaderID:ae,customFragmentShaderID:_e,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Ne,instancing:Ie,instancingColor:Ie&&j.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:ve===null?r.outputColorSpace:ve.isXRRenderTarget===!0?ve.texture.colorSpace:Et,map:pe,matcap:Ye,envMap:G,envMapMode:G&&B.mapping,envMapCubeUVHeight:D,aoMap:Ut,lightMap:Ee,bumpMap:Ue,normalMap:ye,displacementMap:d&&dt,emissiveMap:He,normalMapObjectSpace:ye&&M.normalMapType===id,normalMapTangentSpace:ye&&M.normalMapType===ia,metalnessMap:R,roughnessMap:S,anisotropy:q,anisotropyMap:he,clearcoat:te,clearcoatMap:me,clearcoatNormalMap:Re,clearcoatRoughnessMap:Ge,iridescence:ee,iridescenceMap:Q,iridescenceThicknessMap:et,sheen:ie,sheenColorMap:$e,sheenRoughnessMap:De,specularMap:we,specularColorMap:ge,specularIntensityMap:ze,transmission:Me,transmissionMap:Qe,thicknessMap:pt,gradientMap:qe,opaque:M.transparent===!1&&M.blending===Vi,alphaMap:se,alphaTest:P,alphaHash:le,combine:M.combine,mapUv:pe&&x(M.map.channel),aoMapUv:Ut&&x(M.aoMap.channel),lightMapUv:Ee&&x(M.lightMap.channel),bumpMapUv:Ue&&x(M.bumpMap.channel),normalMapUv:ye&&x(M.normalMap.channel),displacementMapUv:dt&&x(M.displacementMap.channel),emissiveMapUv:He&&x(M.emissiveMap.channel),metalnessMapUv:R&&x(M.metalnessMap.channel),roughnessMapUv:S&&x(M.roughnessMap.channel),anisotropyMapUv:he&&x(M.anisotropyMap.channel),clearcoatMapUv:me&&x(M.clearcoatMap.channel),clearcoatNormalMapUv:Re&&x(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ge&&x(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&x(M.iridescenceMap.channel),iridescenceThicknessMapUv:et&&x(M.iridescenceThicknessMap.channel),sheenColorMapUv:$e&&x(M.sheenColorMap.channel),sheenRoughnessMapUv:De&&x(M.sheenRoughnessMap.channel),specularMapUv:we&&x(M.specularMap.channel),specularColorMapUv:ge&&x(M.specularColorMap.channel),specularIntensityMapUv:ze&&x(M.specularIntensityMap.channel),transmissionMapUv:Qe&&x(M.transmissionMap.channel),thicknessMapUv:pt&&x(M.thicknessMap.channel),alphaMapUv:se&&x(M.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(ye||q),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,vertexUv1s:Le,vertexUv2s:Te,vertexUv3s:it,pointsUvs:j.isPoints===!0&&!!I.attributes.uv&&(pe||se),fog:!!L,useFog:M.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:j.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:ne,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:r.shadowMap.enabled&&k.length>0,shadowMapType:r.shadowMap.type,toneMapping:st,useLegacyLights:r._useLegacyLights,decodeVideoTexture:pe&&M.map.isVideoTexture===!0&&Je.getTransfer(M.map.colorSpace)===ot,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===It,flipSided:M.side===Dt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionDerivatives:ce&&M.extensions.derivatives===!0,extensionFragDepth:ce&&M.extensions.fragDepth===!0,extensionDrawBuffers:ce&&M.extensions.drawBuffers===!0,extensionShaderTextureLOD:ce&&M.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ce&&M.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()}}function p(M){const w=[];if(M.shaderID?w.push(M.shaderID):(w.push(M.customVertexShaderID),w.push(M.customFragmentShaderID)),M.defines!==void 0)for(const k in M.defines)w.push(k),w.push(M.defines[k]);return M.isRawShaderMaterial===!1&&(y(w,M),_(w,M),w.push(r.outputColorSpace)),w.push(M.customProgramCacheKey),w.join()}function y(M,w){M.push(w.precision),M.push(w.outputColorSpace),M.push(w.envMapMode),M.push(w.envMapCubeUVHeight),M.push(w.mapUv),M.push(w.alphaMapUv),M.push(w.lightMapUv),M.push(w.aoMapUv),M.push(w.bumpMapUv),M.push(w.normalMapUv),M.push(w.displacementMapUv),M.push(w.emissiveMapUv),M.push(w.metalnessMapUv),M.push(w.roughnessMapUv),M.push(w.anisotropyMapUv),M.push(w.clearcoatMapUv),M.push(w.clearcoatNormalMapUv),M.push(w.clearcoatRoughnessMapUv),M.push(w.iridescenceMapUv),M.push(w.iridescenceThicknessMapUv),M.push(w.sheenColorMapUv),M.push(w.sheenRoughnessMapUv),M.push(w.specularMapUv),M.push(w.specularColorMapUv),M.push(w.specularIntensityMapUv),M.push(w.transmissionMapUv),M.push(w.thicknessMapUv),M.push(w.combine),M.push(w.fogExp2),M.push(w.sizeAttenuation),M.push(w.morphTargetsCount),M.push(w.morphAttributeCount),M.push(w.numDirLights),M.push(w.numPointLights),M.push(w.numSpotLights),M.push(w.numSpotLightMaps),M.push(w.numHemiLights),M.push(w.numRectAreaLights),M.push(w.numDirLightShadows),M.push(w.numPointLightShadows),M.push(w.numSpotLightShadows),M.push(w.numSpotLightShadowsWithMaps),M.push(w.numLightProbes),M.push(w.shadowMapType),M.push(w.toneMapping),M.push(w.numClippingPlanes),M.push(w.numClipIntersection),M.push(w.depthPacking)}function _(M,w){a.disableAll(),w.isWebGL2&&a.enable(0),w.supportsVertexTextures&&a.enable(1),w.instancing&&a.enable(2),w.instancingColor&&a.enable(3),w.matcap&&a.enable(4),w.envMap&&a.enable(5),w.normalMapObjectSpace&&a.enable(6),w.normalMapTangentSpace&&a.enable(7),w.clearcoat&&a.enable(8),w.iridescence&&a.enable(9),w.alphaTest&&a.enable(10),w.vertexColors&&a.enable(11),w.vertexAlphas&&a.enable(12),w.vertexUv1s&&a.enable(13),w.vertexUv2s&&a.enable(14),w.vertexUv3s&&a.enable(15),w.vertexTangents&&a.enable(16),w.anisotropy&&a.enable(17),w.alphaHash&&a.enable(18),w.batching&&a.enable(19),M.push(a.mask),a.disableAll(),w.fog&&a.enable(0),w.useFog&&a.enable(1),w.flatShading&&a.enable(2),w.logarithmicDepthBuffer&&a.enable(3),w.skinning&&a.enable(4),w.morphTargets&&a.enable(5),w.morphNormals&&a.enable(6),w.morphColors&&a.enable(7),w.premultipliedAlpha&&a.enable(8),w.shadowMapEnabled&&a.enable(9),w.useLegacyLights&&a.enable(10),w.doubleSided&&a.enable(11),w.flipSided&&a.enable(12),w.useDepthPacking&&a.enable(13),w.dithering&&a.enable(14),w.transmission&&a.enable(15),w.sheen&&a.enable(16),w.opaque&&a.enable(17),w.pointsUvs&&a.enable(18),w.decodeVideoTexture&&a.enable(19),M.push(a.mask)}function v(M){const w=g[M.type];let k;if(w){const V=fn[w];k=Zi.clone(V.uniforms)}else k=M.uniforms;return k}function E(M,w){let k;for(let V=0,j=c.length;V<j;V++){const L=c[V];if(L.cacheKey===w){k=L,++k.usedTimes;break}}return k===void 0&&(k=new i0(r,w,M,s),c.push(k)),k}function b(M){if(--M.usedTimes===0){const w=c.indexOf(M);c[w]=c[c.length-1],c.pop(),M.destroy()}}function A(M){l.remove(M)}function N(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:E,releaseProgram:b,releaseShaderCache:A,programs:c,dispose:N}}function l0(){let r=new WeakMap;function e(s){let o=r.get(s);return o===void 0&&(o={},r.set(s,o)),o}function t(s){r.delete(s)}function n(s,o,a){r.get(s)[o]=a}function i(){r=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function c0(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function ql(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Xl(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,f,g,x,m){let p=r[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},r[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=x,p.group=m),e++,p}function a(u,d,f,g,x,m){const p=o(u,d,f,g,x,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(u,d,f,g,x,m){const p=o(u,d,f,g,x,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||c0),n.length>1&&n.sort(d||ql),i.length>1&&i.sort(d||ql)}function h(){for(let u=e,d=r.length;u<d;u++){const f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:a,unshift:l,finish:h,sort:c}}function h0(){let r=new WeakMap;function e(n,i){const s=r.get(n);let o;return s===void 0?(o=new Xl,r.set(n,[o])):i>=s.length?(o=new Xl,s.push(o)):o=s[i],o}function t(){r=new WeakMap}return{get:e,dispose:t}}function u0(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new ue};break;case"SpotLight":t={position:new C,direction:new C,color:new ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new ue,groundColor:new ue};break;case"RectAreaLight":t={color:new ue,position:new C,halfWidth:new C,halfHeight:new C};break}return r[e.id]=t,t}}}function d0(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let f0=0;function p0(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function m0(r,e){const t=new u0,n=d0(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new C);const s=new C,o=new We,a=new We;function l(h,u){let d=0,f=0,g=0;for(let V=0;V<9;V++)i.probe[V].set(0,0,0);let x=0,m=0,p=0,y=0,_=0,v=0,E=0,b=0,A=0,N=0,M=0;h.sort(p0);const w=u===!0?Math.PI:1;for(let V=0,j=h.length;V<j;V++){const L=h[V],I=L.color,F=L.intensity,B=L.distance,D=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)d+=I.r*F*w,f+=I.g*F*w,g+=I.b*F*w;else if(L.isLightProbe){for(let O=0;O<9;O++)i.probe[O].addScaledVector(L.sh.coefficients[O],F);M++}else if(L.isDirectionalLight){const O=t.get(L);if(O.color.copy(L.color).multiplyScalar(L.intensity*w),L.castShadow){const H=L.shadow,Z=n.get(L);Z.shadowBias=H.bias,Z.shadowNormalBias=H.normalBias,Z.shadowRadius=H.radius,Z.shadowMapSize=H.mapSize,i.directionalShadow[x]=Z,i.directionalShadowMap[x]=D,i.directionalShadowMatrix[x]=L.shadow.matrix,v++}i.directional[x]=O,x++}else if(L.isSpotLight){const O=t.get(L);O.position.setFromMatrixPosition(L.matrixWorld),O.color.copy(I).multiplyScalar(F*w),O.distance=B,O.coneCos=Math.cos(L.angle),O.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),O.decay=L.decay,i.spot[p]=O;const H=L.shadow;if(L.map&&(i.spotLightMap[A]=L.map,A++,H.updateMatrices(L),L.castShadow&&N++),i.spotLightMatrix[p]=H.matrix,L.castShadow){const Z=n.get(L);Z.shadowBias=H.bias,Z.shadowNormalBias=H.normalBias,Z.shadowRadius=H.radius,Z.shadowMapSize=H.mapSize,i.spotShadow[p]=Z,i.spotShadowMap[p]=D,b++}p++}else if(L.isRectAreaLight){const O=t.get(L);O.color.copy(I).multiplyScalar(F),O.halfWidth.set(L.width*.5,0,0),O.halfHeight.set(0,L.height*.5,0),i.rectArea[y]=O,y++}else if(L.isPointLight){const O=t.get(L);if(O.color.copy(L.color).multiplyScalar(L.intensity*w),O.distance=L.distance,O.decay=L.decay,L.castShadow){const H=L.shadow,Z=n.get(L);Z.shadowBias=H.bias,Z.shadowNormalBias=H.normalBias,Z.shadowRadius=H.radius,Z.shadowMapSize=H.mapSize,Z.shadowCameraNear=H.camera.near,Z.shadowCameraFar=H.camera.far,i.pointShadow[m]=Z,i.pointShadowMap[m]=D,i.pointShadowMatrix[m]=L.shadow.matrix,E++}i.point[m]=O,m++}else if(L.isHemisphereLight){const O=t.get(L);O.skyColor.copy(L.color).multiplyScalar(F*w),O.groundColor.copy(L.groundColor).multiplyScalar(F*w),i.hemi[_]=O,_++}}y>0&&(e.isWebGL2?r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=re.LTC_FLOAT_1,i.rectAreaLTC2=re.LTC_FLOAT_2):(i.rectAreaLTC1=re.LTC_HALF_1,i.rectAreaLTC2=re.LTC_HALF_2):r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=re.LTC_FLOAT_1,i.rectAreaLTC2=re.LTC_FLOAT_2):r.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=re.LTC_HALF_1,i.rectAreaLTC2=re.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=g;const k=i.hash;(k.directionalLength!==x||k.pointLength!==m||k.spotLength!==p||k.rectAreaLength!==y||k.hemiLength!==_||k.numDirectionalShadows!==v||k.numPointShadows!==E||k.numSpotShadows!==b||k.numSpotMaps!==A||k.numLightProbes!==M)&&(i.directional.length=x,i.spot.length=p,i.rectArea.length=y,i.point.length=m,i.hemi.length=_,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=b,i.spotShadowMap.length=b,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=b+A-N,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=N,i.numLightProbes=M,k.directionalLength=x,k.pointLength=m,k.spotLength=p,k.rectAreaLength=y,k.hemiLength=_,k.numDirectionalShadows=v,k.numPointShadows=E,k.numSpotShadows=b,k.numSpotMaps=A,k.numLightProbes=M,i.version=f0++)}function c(h,u){let d=0,f=0,g=0,x=0,m=0;const p=u.matrixWorldInverse;for(let y=0,_=h.length;y<_;y++){const v=h[y];if(v.isDirectionalLight){const E=i.directional[d];E.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(p),d++}else if(v.isSpotLight){const E=i.spot[g];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(p),E.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(p),g++}else if(v.isRectAreaLight){const E=i.rectArea[x];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(p),a.identity(),o.copy(v.matrixWorld),o.premultiply(p),a.extractRotation(o),E.halfWidth.set(v.width*.5,0,0),E.halfHeight.set(0,v.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),x++}else if(v.isPointLight){const E=i.point[f];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(p),f++}else if(v.isHemisphereLight){const E=i.hemi[m];E.direction.setFromMatrixPosition(v.matrixWorld),E.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:i}}function jl(r,e){const t=new m0(r,e),n=[],i=[];function s(){n.length=0,i.length=0}function o(u){n.push(u)}function a(u){i.push(u)}function l(u){t.setup(n,u)}function c(u){t.setupView(n,u)}return{init:s,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:l,setupLightsView:c,pushLight:o,pushShadow:a}}function g0(r,e){let t=new WeakMap;function n(s,o=0){const a=t.get(s);let l;return a===void 0?(l=new jl(r,e),t.set(s,[l])):o>=a.length?(l=new jl(r,e),a.push(l)):l=a[o],l}function i(){t=new WeakMap}return{get:n,dispose:i}}class x0 extends hn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=td,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class _0 extends hn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const v0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,y0=`uniform sampler2D shadow_pass;
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
}`;function M0(r,e,t){let n=new aa;const i=new Se,s=new Se,o=new nt,a=new x0({depthPacking:nd}),l=new _0,c={},h=t.maxTextureSize,u={[Pn]:Dt,[Dt]:Pn,[It]:It},d=new Ht({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Se},radius:{value:4}},vertexShader:v0,fragmentShader:y0}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Tt;g.setAttribute("position",new Nt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new oe(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Yc;let p=this.type;this.render=function(b,A,N){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;const M=r.getRenderTarget(),w=r.getActiveCubeFace(),k=r.getActiveMipmapLevel(),V=r.state;V.setBlending(Ln),V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const j=p!==Tn&&this.type===Tn,L=p===Tn&&this.type!==Tn;for(let I=0,F=b.length;I<F;I++){const B=b[I],D=B.shadow;if(D===void 0){console.warn("THREE.WebGLShadowMap:",B,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;i.copy(D.mapSize);const O=D.getFrameExtents();if(i.multiply(O),s.copy(D.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/O.x),i.x=s.x*O.x,D.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/O.y),i.y=s.y*O.y,D.mapSize.y=s.y)),D.map===null||j===!0||L===!0){const Z=this.type!==Tn?{minFilter:St,magFilter:St}:{};D.map!==null&&D.map.dispose(),D.map=new tn(i.x,i.y,Z),D.map.texture.name=B.name+".shadowMap",D.camera.updateProjectionMatrix()}r.setRenderTarget(D.map),r.clear();const H=D.getViewportCount();for(let Z=0;Z<H;Z++){const ne=D.getViewport(Z);o.set(s.x*ne.x,s.y*ne.y,s.x*ne.z,s.y*ne.w),V.viewport(o),D.updateMatrices(B,Z),n=D.getFrustum(),v(A,N,D.camera,B,this.type)}D.isPointLightShadow!==!0&&this.type===Tn&&y(D,N),D.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(M,w,k)};function y(b,A){const N=e.update(x);d.defines.VSM_SAMPLES!==b.blurSamples&&(d.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new tn(i.x,i.y)),d.uniforms.shadow_pass.value=b.map.texture,d.uniforms.resolution.value=b.mapSize,d.uniforms.radius.value=b.radius,r.setRenderTarget(b.mapPass),r.clear(),r.renderBufferDirect(A,null,N,d,x,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,r.setRenderTarget(b.map),r.clear(),r.renderBufferDirect(A,null,N,f,x,null)}function _(b,A,N,M){let w=null;const k=N.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(k!==void 0)w=k;else if(w=N.isPointLight===!0?l:a,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const V=w.uuid,j=A.uuid;let L=c[V];L===void 0&&(L={},c[V]=L);let I=L[j];I===void 0&&(I=w.clone(),L[j]=I,A.addEventListener("dispose",E)),w=I}if(w.visible=A.visible,w.wireframe=A.wireframe,M===Tn?w.side=A.shadowSide!==null?A.shadowSide:A.side:w.side=A.shadowSide!==null?A.shadowSide:u[A.side],w.alphaMap=A.alphaMap,w.alphaTest=A.alphaTest,w.map=A.map,w.clipShadows=A.clipShadows,w.clippingPlanes=A.clippingPlanes,w.clipIntersection=A.clipIntersection,w.displacementMap=A.displacementMap,w.displacementScale=A.displacementScale,w.displacementBias=A.displacementBias,w.wireframeLinewidth=A.wireframeLinewidth,w.linewidth=A.linewidth,N.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const V=r.properties.get(w);V.light=N}return w}function v(b,A,N,M,w){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&w===Tn)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,b.matrixWorld);const j=e.update(b),L=b.material;if(Array.isArray(L)){const I=j.groups;for(let F=0,B=I.length;F<B;F++){const D=I[F],O=L[D.materialIndex];if(O&&O.visible){const H=_(b,O,M,w);b.onBeforeShadow(r,b,A,N,j,H,D),r.renderBufferDirect(N,null,j,H,b,D),b.onAfterShadow(r,b,A,N,j,H,D)}}}else if(L.visible){const I=_(b,L,M,w);b.onBeforeShadow(r,b,A,N,j,I,null),r.renderBufferDirect(N,null,j,I,b,null),b.onAfterShadow(r,b,A,N,j,I,null)}}const V=b.children;for(let j=0,L=V.length;j<L;j++)v(V[j],A,N,M,w)}function E(b){b.target.removeEventListener("dispose",E);for(const N in c){const M=c[N],w=b.target.uuid;w in M&&(M[w].dispose(),delete M[w])}}}function b0(r,e,t){const n=t.isWebGL2;function i(){let P=!1;const le=new nt;let ce=null;const Le=new nt(0,0,0,0);return{setMask:function(Te){ce!==Te&&!P&&(r.colorMask(Te,Te,Te,Te),ce=Te)},setLocked:function(Te){P=Te},setClear:function(Te,it,st,yt,kt){kt===!0&&(Te*=yt,it*=yt,st*=yt),le.set(Te,it,st,yt),Le.equals(le)===!1&&(r.clearColor(Te,it,st,yt),Le.copy(le))},reset:function(){P=!1,ce=null,Le.set(-1,0,0,0)}}}function s(){let P=!1,le=null,ce=null,Le=null;return{setTest:function(Te){Te?Ne(r.DEPTH_TEST):pe(r.DEPTH_TEST)},setMask:function(Te){le!==Te&&!P&&(r.depthMask(Te),le=Te)},setFunc:function(Te){if(ce!==Te){switch(Te){case Du:r.depthFunc(r.NEVER);break;case Nu:r.depthFunc(r.ALWAYS);break;case Uu:r.depthFunc(r.LESS);break;case pr:r.depthFunc(r.LEQUAL);break;case ku:r.depthFunc(r.EQUAL);break;case Fu:r.depthFunc(r.GEQUAL);break;case Ou:r.depthFunc(r.GREATER);break;case zu:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}ce=Te}},setLocked:function(Te){P=Te},setClear:function(Te){Le!==Te&&(r.clearDepth(Te),Le=Te)},reset:function(){P=!1,le=null,ce=null,Le=null}}}function o(){let P=!1,le=null,ce=null,Le=null,Te=null,it=null,st=null,yt=null,kt=null;return{setTest:function(rt){P||(rt?Ne(r.STENCIL_TEST):pe(r.STENCIL_TEST))},setMask:function(rt){le!==rt&&!P&&(r.stencilMask(rt),le=rt)},setFunc:function(rt,Ft,un){(ce!==rt||Le!==Ft||Te!==un)&&(r.stencilFunc(rt,Ft,un),ce=rt,Le=Ft,Te=un)},setOp:function(rt,Ft,un){(it!==rt||st!==Ft||yt!==un)&&(r.stencilOp(rt,Ft,un),it=rt,st=Ft,yt=un)},setLocked:function(rt){P=rt},setClear:function(rt){kt!==rt&&(r.clearStencil(rt),kt=rt)},reset:function(){P=!1,le=null,ce=null,Le=null,Te=null,it=null,st=null,yt=null,kt=null}}}const a=new i,l=new s,c=new o,h=new WeakMap,u=new WeakMap;let d={},f={},g=new WeakMap,x=[],m=null,p=!1,y=null,_=null,v=null,E=null,b=null,A=null,N=null,M=new ue(0,0,0),w=0,k=!1,V=null,j=null,L=null,I=null,F=null;const B=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let D=!1,O=0;const H=r.getParameter(r.VERSION);H.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(H)[1]),D=O>=1):H.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),D=O>=2);let Z=null,ne={};const K=r.getParameter(r.SCISSOR_BOX),J=r.getParameter(r.VIEWPORT),ae=new nt().fromArray(K),_e=new nt().fromArray(J);function ve(P,le,ce,Le){const Te=new Uint8Array(4),it=r.createTexture();r.bindTexture(P,it),r.texParameteri(P,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(P,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let st=0;st<ce;st++)n&&(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)?r.texImage3D(le,0,r.RGBA,1,1,Le,0,r.RGBA,r.UNSIGNED_BYTE,Te):r.texImage2D(le+st,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Te);return it}const Ie={};Ie[r.TEXTURE_2D]=ve(r.TEXTURE_2D,r.TEXTURE_2D,1),Ie[r.TEXTURE_CUBE_MAP]=ve(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ie[r.TEXTURE_2D_ARRAY]=ve(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Ie[r.TEXTURE_3D]=ve(r.TEXTURE_3D,r.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),Ne(r.DEPTH_TEST),l.setFunc(pr),He(!1),R(Pa),Ne(r.CULL_FACE),ye(Ln);function Ne(P){d[P]!==!0&&(r.enable(P),d[P]=!0)}function pe(P){d[P]!==!1&&(r.disable(P),d[P]=!1)}function Ye(P,le){return f[P]!==le?(r.bindFramebuffer(P,le),f[P]=le,n&&(P===r.DRAW_FRAMEBUFFER&&(f[r.FRAMEBUFFER]=le),P===r.FRAMEBUFFER&&(f[r.DRAW_FRAMEBUFFER]=le)),!0):!1}function G(P,le){let ce=x,Le=!1;if(P)if(ce=g.get(le),ce===void 0&&(ce=[],g.set(le,ce)),P.isWebGLMultipleRenderTargets){const Te=P.texture;if(ce.length!==Te.length||ce[0]!==r.COLOR_ATTACHMENT0){for(let it=0,st=Te.length;it<st;it++)ce[it]=r.COLOR_ATTACHMENT0+it;ce.length=Te.length,Le=!0}}else ce[0]!==r.COLOR_ATTACHMENT0&&(ce[0]=r.COLOR_ATTACHMENT0,Le=!0);else ce[0]!==r.BACK&&(ce[0]=r.BACK,Le=!0);Le&&(t.isWebGL2?r.drawBuffers(ce):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ce))}function Ut(P){return m!==P?(r.useProgram(P),m=P,!0):!1}const Ee={[si]:r.FUNC_ADD,[_u]:r.FUNC_SUBTRACT,[vu]:r.FUNC_REVERSE_SUBTRACT};if(n)Ee[Na]=r.MIN,Ee[Ua]=r.MAX;else{const P=e.get("EXT_blend_minmax");P!==null&&(Ee[Na]=P.MIN_EXT,Ee[Ua]=P.MAX_EXT)}const Ue={[yu]:r.ZERO,[Mu]:r.ONE,[bu]:r.SRC_COLOR,[Ro]:r.SRC_ALPHA,[Ru]:r.SRC_ALPHA_SATURATE,[Tu]:r.DST_COLOR,[wu]:r.DST_ALPHA,[Su]:r.ONE_MINUS_SRC_COLOR,[Co]:r.ONE_MINUS_SRC_ALPHA,[Au]:r.ONE_MINUS_DST_COLOR,[Eu]:r.ONE_MINUS_DST_ALPHA,[Cu]:r.CONSTANT_COLOR,[Lu]:r.ONE_MINUS_CONSTANT_COLOR,[Pu]:r.CONSTANT_ALPHA,[Iu]:r.ONE_MINUS_CONSTANT_ALPHA};function ye(P,le,ce,Le,Te,it,st,yt,kt,rt){if(P===Ln){p===!0&&(pe(r.BLEND),p=!1);return}if(p===!1&&(Ne(r.BLEND),p=!0),P!==xu){if(P!==y||rt!==k){if((_!==si||b!==si)&&(r.blendEquation(r.FUNC_ADD),_=si,b=si),rt)switch(P){case Vi:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case fr:r.blendFunc(r.ONE,r.ONE);break;case Ia:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Da:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}else switch(P){case Vi:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case fr:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case Ia:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Da:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",P);break}v=null,E=null,A=null,N=null,M.set(0,0,0),w=0,y=P,k=rt}return}Te=Te||le,it=it||ce,st=st||Le,(le!==_||Te!==b)&&(r.blendEquationSeparate(Ee[le],Ee[Te]),_=le,b=Te),(ce!==v||Le!==E||it!==A||st!==N)&&(r.blendFuncSeparate(Ue[ce],Ue[Le],Ue[it],Ue[st]),v=ce,E=Le,A=it,N=st),(yt.equals(M)===!1||kt!==w)&&(r.blendColor(yt.r,yt.g,yt.b,kt),M.copy(yt),w=kt),y=P,k=!1}function dt(P,le){P.side===It?pe(r.CULL_FACE):Ne(r.CULL_FACE);let ce=P.side===Dt;le&&(ce=!ce),He(ce),P.blending===Vi&&P.transparent===!1?ye(Ln):ye(P.blending,P.blendEquation,P.blendSrc,P.blendDst,P.blendEquationAlpha,P.blendSrcAlpha,P.blendDstAlpha,P.blendColor,P.blendAlpha,P.premultipliedAlpha),l.setFunc(P.depthFunc),l.setTest(P.depthTest),l.setMask(P.depthWrite),a.setMask(P.colorWrite);const Le=P.stencilWrite;c.setTest(Le),Le&&(c.setMask(P.stencilWriteMask),c.setFunc(P.stencilFunc,P.stencilRef,P.stencilFuncMask),c.setOp(P.stencilFail,P.stencilZFail,P.stencilZPass)),q(P.polygonOffset,P.polygonOffsetFactor,P.polygonOffsetUnits),P.alphaToCoverage===!0?Ne(r.SAMPLE_ALPHA_TO_COVERAGE):pe(r.SAMPLE_ALPHA_TO_COVERAGE)}function He(P){V!==P&&(P?r.frontFace(r.CW):r.frontFace(r.CCW),V=P)}function R(P){P!==mu?(Ne(r.CULL_FACE),P!==j&&(P===Pa?r.cullFace(r.BACK):P===gu?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):pe(r.CULL_FACE),j=P}function S(P){P!==L&&(D&&r.lineWidth(P),L=P)}function q(P,le,ce){P?(Ne(r.POLYGON_OFFSET_FILL),(I!==le||F!==ce)&&(r.polygonOffset(le,ce),I=le,F=ce)):pe(r.POLYGON_OFFSET_FILL)}function te(P){P?Ne(r.SCISSOR_TEST):pe(r.SCISSOR_TEST)}function ee(P){P===void 0&&(P=r.TEXTURE0+B-1),Z!==P&&(r.activeTexture(P),Z=P)}function ie(P,le,ce){ce===void 0&&(Z===null?ce=r.TEXTURE0+B-1:ce=Z);let Le=ne[ce];Le===void 0&&(Le={type:void 0,texture:void 0},ne[ce]=Le),(Le.type!==P||Le.texture!==le)&&(Z!==ce&&(r.activeTexture(ce),Z=ce),r.bindTexture(P,le||Ie[P]),Le.type=P,Le.texture=le)}function Me(){const P=ne[Z];P!==void 0&&P.type!==void 0&&(r.bindTexture(P.type,null),P.type=void 0,P.texture=void 0)}function he(){try{r.compressedTexImage2D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function me(){try{r.compressedTexImage3D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Re(){try{r.texSubImage2D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Ge(){try{r.texSubImage3D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function Q(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function et(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function $e(){try{r.texStorage2D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function De(){try{r.texStorage3D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function we(){try{r.texImage2D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ge(){try{r.texImage3D.apply(r,arguments)}catch(P){console.error("THREE.WebGLState:",P)}}function ze(P){ae.equals(P)===!1&&(r.scissor(P.x,P.y,P.z,P.w),ae.copy(P))}function Qe(P){_e.equals(P)===!1&&(r.viewport(P.x,P.y,P.z,P.w),_e.copy(P))}function pt(P,le){let ce=u.get(le);ce===void 0&&(ce=new WeakMap,u.set(le,ce));let Le=ce.get(P);Le===void 0&&(Le=r.getUniformBlockIndex(le,P.name),ce.set(P,Le))}function qe(P,le){const Le=u.get(le).get(P);h.get(le)!==Le&&(r.uniformBlockBinding(le,Le,P.__bindingPointIndex),h.set(le,Le))}function se(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),n===!0&&(r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null)),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),d={},Z=null,ne={},f={},g=new WeakMap,x=[],m=null,p=!1,y=null,_=null,v=null,E=null,b=null,A=null,N=null,M=new ue(0,0,0),w=0,k=!1,V=null,j=null,L=null,I=null,F=null,ae.set(0,0,r.canvas.width,r.canvas.height),_e.set(0,0,r.canvas.width,r.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:Ne,disable:pe,bindFramebuffer:Ye,drawBuffers:G,useProgram:Ut,setBlending:ye,setMaterial:dt,setFlipSided:He,setCullFace:R,setLineWidth:S,setPolygonOffset:q,setScissorTest:te,activeTexture:ee,bindTexture:ie,unbindTexture:Me,compressedTexImage2D:he,compressedTexImage3D:me,texImage2D:we,texImage3D:ge,updateUBOMapping:pt,uniformBlockBinding:qe,texStorage2D:$e,texStorage3D:De,texSubImage2D:Re,texSubImage3D:Ge,compressedTexSubImage2D:Q,compressedTexSubImage3D:et,scissor:ze,viewport:Qe,reset:se}}function S0(r,e,t,n,i,s,o){const a=i.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,S){return f?new OffscreenCanvas(R,S):Ts("canvas")}function x(R,S,q,te){let ee=1;if((R.width>te||R.height>te)&&(ee=te/Math.max(R.width,R.height)),ee<1||S===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap){const ie=S?Mr:Math.floor,Me=ie(ee*R.width),he=ie(ee*R.height);u===void 0&&(u=g(Me,he));const me=q?g(Me,he):u;return me.width=Me,me.height=he,me.getContext("2d").drawImage(R,0,0,Me,he),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+Me+"x"+he+")."),me}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),R;return R}function m(R){return ko(R.width)&&ko(R.height)}function p(R){return a?!1:R.wrapS!==Zt||R.wrapT!==Zt||R.minFilter!==St&&R.minFilter!==Gt}function y(R,S){return R.generateMipmaps&&S&&R.minFilter!==St&&R.minFilter!==Gt}function _(R){r.generateMipmap(R)}function v(R,S,q,te,ee=!1){if(a===!1)return S;if(R!==null){if(r[R]!==void 0)return r[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ie=S;if(S===r.RED&&(q===r.FLOAT&&(ie=r.R32F),q===r.HALF_FLOAT&&(ie=r.R16F),q===r.UNSIGNED_BYTE&&(ie=r.R8)),S===r.RED_INTEGER&&(q===r.UNSIGNED_BYTE&&(ie=r.R8UI),q===r.UNSIGNED_SHORT&&(ie=r.R16UI),q===r.UNSIGNED_INT&&(ie=r.R32UI),q===r.BYTE&&(ie=r.R8I),q===r.SHORT&&(ie=r.R16I),q===r.INT&&(ie=r.R32I)),S===r.RG&&(q===r.FLOAT&&(ie=r.RG32F),q===r.HALF_FLOAT&&(ie=r.RG16F),q===r.UNSIGNED_BYTE&&(ie=r.RG8)),S===r.RGBA){const Me=ee?xr:Je.getTransfer(te);q===r.FLOAT&&(ie=r.RGBA32F),q===r.HALF_FLOAT&&(ie=r.RGBA16F),q===r.UNSIGNED_BYTE&&(ie=Me===ot?r.SRGB8_ALPHA8:r.RGBA8),q===r.UNSIGNED_SHORT_4_4_4_4&&(ie=r.RGBA4),q===r.UNSIGNED_SHORT_5_5_5_1&&(ie=r.RGB5_A1)}return(ie===r.R16F||ie===r.R32F||ie===r.RG16F||ie===r.RG32F||ie===r.RGBA16F||ie===r.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function E(R,S,q){return y(R,q)===!0||R.isFramebufferTexture&&R.minFilter!==St&&R.minFilter!==Gt?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function b(R){return R===St||R===Io||R===lr?r.NEAREST:r.LINEAR}function A(R){const S=R.target;S.removeEventListener("dispose",A),M(S),S.isVideoTexture&&h.delete(S)}function N(R){const S=R.target;S.removeEventListener("dispose",N),k(S)}function M(R){const S=n.get(R);if(S.__webglInit===void 0)return;const q=R.source,te=d.get(q);if(te){const ee=te[S.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&w(R),Object.keys(te).length===0&&d.delete(q)}n.remove(R)}function w(R){const S=n.get(R);r.deleteTexture(S.__webglTexture);const q=R.source,te=d.get(q);delete te[S.__cacheKey],o.memory.textures--}function k(R){const S=R.texture,q=n.get(R),te=n.get(S);if(te.__webglTexture!==void 0&&(r.deleteTexture(te.__webglTexture),o.memory.textures--),R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(q.__webglFramebuffer[ee]))for(let ie=0;ie<q.__webglFramebuffer[ee].length;ie++)r.deleteFramebuffer(q.__webglFramebuffer[ee][ie]);else r.deleteFramebuffer(q.__webglFramebuffer[ee]);q.__webglDepthbuffer&&r.deleteRenderbuffer(q.__webglDepthbuffer[ee])}else{if(Array.isArray(q.__webglFramebuffer))for(let ee=0;ee<q.__webglFramebuffer.length;ee++)r.deleteFramebuffer(q.__webglFramebuffer[ee]);else r.deleteFramebuffer(q.__webglFramebuffer);if(q.__webglDepthbuffer&&r.deleteRenderbuffer(q.__webglDepthbuffer),q.__webglMultisampledFramebuffer&&r.deleteFramebuffer(q.__webglMultisampledFramebuffer),q.__webglColorRenderbuffer)for(let ee=0;ee<q.__webglColorRenderbuffer.length;ee++)q.__webglColorRenderbuffer[ee]&&r.deleteRenderbuffer(q.__webglColorRenderbuffer[ee]);q.__webglDepthRenderbuffer&&r.deleteRenderbuffer(q.__webglDepthRenderbuffer)}if(R.isWebGLMultipleRenderTargets)for(let ee=0,ie=S.length;ee<ie;ee++){const Me=n.get(S[ee]);Me.__webglTexture&&(r.deleteTexture(Me.__webglTexture),o.memory.textures--),n.remove(S[ee])}n.remove(S),n.remove(R)}let V=0;function j(){V=0}function L(){const R=V;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),V+=1,R}function I(R){const S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function F(R,S){const q=n.get(R);if(R.isVideoTexture&&dt(R),R.isRenderTargetTexture===!1&&R.version>0&&q.__version!==R.version){const te=R.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ae(q,R,S);return}}t.bindTexture(r.TEXTURE_2D,q.__webglTexture,r.TEXTURE0+S)}function B(R,S){const q=n.get(R);if(R.version>0&&q.__version!==R.version){ae(q,R,S);return}t.bindTexture(r.TEXTURE_2D_ARRAY,q.__webglTexture,r.TEXTURE0+S)}function D(R,S){const q=n.get(R);if(R.version>0&&q.__version!==R.version){ae(q,R,S);return}t.bindTexture(r.TEXTURE_3D,q.__webglTexture,r.TEXTURE0+S)}function O(R,S){const q=n.get(R);if(R.version>0&&q.__version!==R.version){_e(q,R,S);return}t.bindTexture(r.TEXTURE_CUBE_MAP,q.__webglTexture,r.TEXTURE0+S)}const H={[$n]:r.REPEAT,[Zt]:r.CLAMP_TO_EDGE,[mr]:r.MIRRORED_REPEAT},Z={[St]:r.NEAREST,[Io]:r.NEAREST_MIPMAP_NEAREST,[lr]:r.NEAREST_MIPMAP_LINEAR,[Gt]:r.LINEAR,[nh]:r.LINEAR_MIPMAP_NEAREST,[pi]:r.LINEAR_MIPMAP_LINEAR},ne={[sd]:r.NEVER,[hd]:r.ALWAYS,[rd]:r.LESS,[ph]:r.LEQUAL,[od]:r.EQUAL,[cd]:r.GEQUAL,[ad]:r.GREATER,[ld]:r.NOTEQUAL};function K(R,S,q){if(q?(r.texParameteri(R,r.TEXTURE_WRAP_S,H[S.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,H[S.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,H[S.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,Z[S.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,Z[S.minFilter])):(r.texParameteri(R,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(R,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,r.CLAMP_TO_EDGE),(S.wrapS!==Zt||S.wrapT!==Zt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),r.texParameteri(R,r.TEXTURE_MAG_FILTER,b(S.magFilter)),r.texParameteri(R,r.TEXTURE_MIN_FILTER,b(S.minFilter)),S.minFilter!==St&&S.minFilter!==Gt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),S.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,ne[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const te=e.get("EXT_texture_filter_anisotropic");if(S.magFilter===St||S.minFilter!==lr&&S.minFilter!==pi||S.type===Rn&&e.has("OES_texture_float_linear")===!1||a===!1&&S.type===gn&&e.has("OES_texture_half_float_linear")===!1)return;(S.anisotropy>1||n.get(S).__currentAnisotropy)&&(r.texParameterf(R,te.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy)}}function J(R,S){let q=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",A));const te=S.source;let ee=d.get(te);ee===void 0&&(ee={},d.set(te,ee));const ie=I(S);if(ie!==R.__cacheKey){ee[ie]===void 0&&(ee[ie]={texture:r.createTexture(),usedTimes:0},o.memory.textures++,q=!0),ee[ie].usedTimes++;const Me=ee[R.__cacheKey];Me!==void 0&&(ee[R.__cacheKey].usedTimes--,Me.usedTimes===0&&w(S)),R.__cacheKey=ie,R.__webglTexture=ee[ie].texture}return q}function ae(R,S,q){let te=r.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(te=r.TEXTURE_2D_ARRAY),S.isData3DTexture&&(te=r.TEXTURE_3D);const ee=J(R,S),ie=S.source;t.bindTexture(te,R.__webglTexture,r.TEXTURE0+q);const Me=n.get(ie);if(ie.version!==Me.__version||ee===!0){t.activeTexture(r.TEXTURE0+q);const he=Je.getPrimaries(Je.workingColorSpace),me=S.colorSpace===en?null:Je.getPrimaries(S.colorSpace),Re=S.colorSpace===en||he===me?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Re);const Ge=p(S)&&m(S.image)===!1;let Q=x(S.image,Ge,!1,i.maxTextureSize);Q=He(S,Q);const et=m(Q)||a,$e=s.convert(S.format,S.colorSpace);let De=s.convert(S.type),we=v(S.internalFormat,$e,De,S.colorSpace,S.isVideoTexture);K(te,S,et);let ge;const ze=S.mipmaps,Qe=a&&S.isVideoTexture!==!0&&we!==ch,pt=Me.__version===void 0||ee===!0,qe=E(S,Q,et);if(S.isDepthTexture)we=r.DEPTH_COMPONENT,a?S.type===Rn?we=r.DEPTH_COMPONENT32F:S.type===Wn?we=r.DEPTH_COMPONENT24:S.type===li?we=r.DEPTH24_STENCIL8:we=r.DEPTH_COMPONENT16:S.type===Rn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),S.format===ci&&we===r.DEPTH_COMPONENT&&S.type!==ta&&S.type!==Wn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),S.type=Wn,De=s.convert(S.type)),S.format===$i&&we===r.DEPTH_COMPONENT&&(we=r.DEPTH_STENCIL,S.type!==li&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),S.type=li,De=s.convert(S.type))),pt&&(Qe?t.texStorage2D(r.TEXTURE_2D,1,we,Q.width,Q.height):t.texImage2D(r.TEXTURE_2D,0,we,Q.width,Q.height,0,$e,De,null));else if(S.isDataTexture)if(ze.length>0&&et){Qe&&pt&&t.texStorage2D(r.TEXTURE_2D,qe,we,ze[0].width,ze[0].height);for(let se=0,P=ze.length;se<P;se++)ge=ze[se],Qe?t.texSubImage2D(r.TEXTURE_2D,se,0,0,ge.width,ge.height,$e,De,ge.data):t.texImage2D(r.TEXTURE_2D,se,we,ge.width,ge.height,0,$e,De,ge.data);S.generateMipmaps=!1}else Qe?(pt&&t.texStorage2D(r.TEXTURE_2D,qe,we,Q.width,Q.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,Q.width,Q.height,$e,De,Q.data)):t.texImage2D(r.TEXTURE_2D,0,we,Q.width,Q.height,0,$e,De,Q.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Qe&&pt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,qe,we,ze[0].width,ze[0].height,Q.depth);for(let se=0,P=ze.length;se<P;se++)ge=ze[se],S.format!==Qt?$e!==null?Qe?t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,se,0,0,0,ge.width,ge.height,Q.depth,$e,ge.data,0,0):t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,se,we,ge.width,ge.height,Q.depth,0,ge.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Qe?t.texSubImage3D(r.TEXTURE_2D_ARRAY,se,0,0,0,ge.width,ge.height,Q.depth,$e,De,ge.data):t.texImage3D(r.TEXTURE_2D_ARRAY,se,we,ge.width,ge.height,Q.depth,0,$e,De,ge.data)}else{Qe&&pt&&t.texStorage2D(r.TEXTURE_2D,qe,we,ze[0].width,ze[0].height);for(let se=0,P=ze.length;se<P;se++)ge=ze[se],S.format!==Qt?$e!==null?Qe?t.compressedTexSubImage2D(r.TEXTURE_2D,se,0,0,ge.width,ge.height,$e,ge.data):t.compressedTexImage2D(r.TEXTURE_2D,se,we,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Qe?t.texSubImage2D(r.TEXTURE_2D,se,0,0,ge.width,ge.height,$e,De,ge.data):t.texImage2D(r.TEXTURE_2D,se,we,ge.width,ge.height,0,$e,De,ge.data)}else if(S.isDataArrayTexture)Qe?(pt&&t.texStorage3D(r.TEXTURE_2D_ARRAY,qe,we,Q.width,Q.height,Q.depth),t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,Q.width,Q.height,Q.depth,$e,De,Q.data)):t.texImage3D(r.TEXTURE_2D_ARRAY,0,we,Q.width,Q.height,Q.depth,0,$e,De,Q.data);else if(S.isData3DTexture)Qe?(pt&&t.texStorage3D(r.TEXTURE_3D,qe,we,Q.width,Q.height,Q.depth),t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,Q.width,Q.height,Q.depth,$e,De,Q.data)):t.texImage3D(r.TEXTURE_3D,0,we,Q.width,Q.height,Q.depth,0,$e,De,Q.data);else if(S.isFramebufferTexture){if(pt)if(Qe)t.texStorage2D(r.TEXTURE_2D,qe,we,Q.width,Q.height);else{let se=Q.width,P=Q.height;for(let le=0;le<qe;le++)t.texImage2D(r.TEXTURE_2D,le,we,se,P,0,$e,De,null),se>>=1,P>>=1}}else if(ze.length>0&&et){Qe&&pt&&t.texStorage2D(r.TEXTURE_2D,qe,we,ze[0].width,ze[0].height);for(let se=0,P=ze.length;se<P;se++)ge=ze[se],Qe?t.texSubImage2D(r.TEXTURE_2D,se,0,0,$e,De,ge):t.texImage2D(r.TEXTURE_2D,se,we,$e,De,ge);S.generateMipmaps=!1}else Qe?(pt&&t.texStorage2D(r.TEXTURE_2D,qe,we,Q.width,Q.height),t.texSubImage2D(r.TEXTURE_2D,0,0,0,$e,De,Q)):t.texImage2D(r.TEXTURE_2D,0,we,$e,De,Q);y(S,et)&&_(te),Me.__version=ie.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function _e(R,S,q){if(S.image.length!==6)return;const te=J(R,S),ee=S.source;t.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+q);const ie=n.get(ee);if(ee.version!==ie.__version||te===!0){t.activeTexture(r.TEXTURE0+q);const Me=Je.getPrimaries(Je.workingColorSpace),he=S.colorSpace===en?null:Je.getPrimaries(S.colorSpace),me=S.colorSpace===en||Me===he?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,S.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,S.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const Re=S.isCompressedTexture||S.image[0].isCompressedTexture,Ge=S.image[0]&&S.image[0].isDataTexture,Q=[];for(let se=0;se<6;se++)!Re&&!Ge?Q[se]=x(S.image[se],!1,!0,i.maxCubemapSize):Q[se]=Ge?S.image[se].image:S.image[se],Q[se]=He(S,Q[se]);const et=Q[0],$e=m(et)||a,De=s.convert(S.format,S.colorSpace),we=s.convert(S.type),ge=v(S.internalFormat,De,we,S.colorSpace),ze=a&&S.isVideoTexture!==!0,Qe=ie.__version===void 0||te===!0;let pt=E(S,et,$e);K(r.TEXTURE_CUBE_MAP,S,$e);let qe;if(Re){ze&&Qe&&t.texStorage2D(r.TEXTURE_CUBE_MAP,pt,ge,et.width,et.height);for(let se=0;se<6;se++){qe=Q[se].mipmaps;for(let P=0;P<qe.length;P++){const le=qe[P];S.format!==Qt?De!==null?ze?t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+se,P,0,0,le.width,le.height,De,le.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+se,P,ge,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ze?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+se,P,0,0,le.width,le.height,De,we,le.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+se,P,ge,le.width,le.height,0,De,we,le.data)}}}else{qe=S.mipmaps,ze&&Qe&&(qe.length>0&&pt++,t.texStorage2D(r.TEXTURE_CUBE_MAP,pt,ge,Q[0].width,Q[0].height));for(let se=0;se<6;se++)if(Ge){ze?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,Q[se].width,Q[se].height,De,we,Q[se].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,ge,Q[se].width,Q[se].height,0,De,we,Q[se].data);for(let P=0;P<qe.length;P++){const ce=qe[P].image[se].image;ze?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+se,P+1,0,0,ce.width,ce.height,De,we,ce.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+se,P+1,ge,ce.width,ce.height,0,De,we,ce.data)}}else{ze?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,0,0,De,we,Q[se]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+se,0,ge,De,we,Q[se]);for(let P=0;P<qe.length;P++){const le=qe[P];ze?t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+se,P+1,0,0,De,we,le.image[se]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+se,P+1,ge,De,we,le.image[se])}}}y(S,$e)&&_(r.TEXTURE_CUBE_MAP),ie.__version=ee.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function ve(R,S,q,te,ee,ie){const Me=s.convert(q.format,q.colorSpace),he=s.convert(q.type),me=v(q.internalFormat,Me,he,q.colorSpace);if(!n.get(S).__hasExternalTextures){const Ge=Math.max(1,S.width>>ie),Q=Math.max(1,S.height>>ie);ee===r.TEXTURE_3D||ee===r.TEXTURE_2D_ARRAY?t.texImage3D(ee,ie,me,Ge,Q,S.depth,0,Me,he,null):t.texImage2D(ee,ie,me,Ge,Q,0,Me,he,null)}t.bindFramebuffer(r.FRAMEBUFFER,R),ye(S)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,te,ee,n.get(q).__webglTexture,0,Ue(S)):(ee===r.TEXTURE_2D||ee>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,te,ee,n.get(q).__webglTexture,ie),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ie(R,S,q){if(r.bindRenderbuffer(r.RENDERBUFFER,R),S.depthBuffer&&!S.stencilBuffer){let te=a===!0?r.DEPTH_COMPONENT24:r.DEPTH_COMPONENT16;if(q||ye(S)){const ee=S.depthTexture;ee&&ee.isDepthTexture&&(ee.type===Rn?te=r.DEPTH_COMPONENT32F:ee.type===Wn&&(te=r.DEPTH_COMPONENT24));const ie=Ue(S);ye(S)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,ie,te,S.width,S.height):r.renderbufferStorageMultisample(r.RENDERBUFFER,ie,te,S.width,S.height)}else r.renderbufferStorage(r.RENDERBUFFER,te,S.width,S.height);r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,R)}else if(S.depthBuffer&&S.stencilBuffer){const te=Ue(S);q&&ye(S)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,te,r.DEPTH24_STENCIL8,S.width,S.height):ye(S)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,te,r.DEPTH24_STENCIL8,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_STENCIL,S.width,S.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.RENDERBUFFER,R)}else{const te=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let ee=0;ee<te.length;ee++){const ie=te[ee],Me=s.convert(ie.format,ie.colorSpace),he=s.convert(ie.type),me=v(ie.internalFormat,Me,he,ie.colorSpace),Re=Ue(S);q&&ye(S)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,Re,me,S.width,S.height):ye(S)?l.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Re,me,S.width,S.height):r.renderbufferStorage(r.RENDERBUFFER,me,S.width,S.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Ne(R,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),F(S.depthTexture,0);const te=n.get(S.depthTexture).__webglTexture,ee=Ue(S);if(S.depthTexture.format===ci)ye(S)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,te,0,ee):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,te,0);else if(S.depthTexture.format===$i)ye(S)?l.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,te,0,ee):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function pe(R){const S=n.get(R),q=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!S.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");Ne(S.__webglFramebuffer,R)}else if(q){S.__webglDepthbuffer=[];for(let te=0;te<6;te++)t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer[te]),S.__webglDepthbuffer[te]=r.createRenderbuffer(),Ie(S.__webglDepthbuffer[te],R,!1)}else t.bindFramebuffer(r.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=r.createRenderbuffer(),Ie(S.__webglDepthbuffer,R,!1);t.bindFramebuffer(r.FRAMEBUFFER,null)}function Ye(R,S,q){const te=n.get(R);S!==void 0&&ve(te.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),q!==void 0&&pe(R)}function G(R){const S=R.texture,q=n.get(R),te=n.get(S);R.addEventListener("dispose",N),R.isWebGLMultipleRenderTargets!==!0&&(te.__webglTexture===void 0&&(te.__webglTexture=r.createTexture()),te.__version=S.version,o.memory.textures++);const ee=R.isWebGLCubeRenderTarget===!0,ie=R.isWebGLMultipleRenderTargets===!0,Me=m(R)||a;if(ee){q.__webglFramebuffer=[];for(let he=0;he<6;he++)if(a&&S.mipmaps&&S.mipmaps.length>0){q.__webglFramebuffer[he]=[];for(let me=0;me<S.mipmaps.length;me++)q.__webglFramebuffer[he][me]=r.createFramebuffer()}else q.__webglFramebuffer[he]=r.createFramebuffer()}else{if(a&&S.mipmaps&&S.mipmaps.length>0){q.__webglFramebuffer=[];for(let he=0;he<S.mipmaps.length;he++)q.__webglFramebuffer[he]=r.createFramebuffer()}else q.__webglFramebuffer=r.createFramebuffer();if(ie)if(i.drawBuffers){const he=R.texture;for(let me=0,Re=he.length;me<Re;me++){const Ge=n.get(he[me]);Ge.__webglTexture===void 0&&(Ge.__webglTexture=r.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&R.samples>0&&ye(R)===!1){const he=ie?S:[S];q.__webglMultisampledFramebuffer=r.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let me=0;me<he.length;me++){const Re=he[me];q.__webglColorRenderbuffer[me]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,q.__webglColorRenderbuffer[me]);const Ge=s.convert(Re.format,Re.colorSpace),Q=s.convert(Re.type),et=v(Re.internalFormat,Ge,Q,Re.colorSpace,R.isXRRenderTarget===!0),$e=Ue(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,$e,et,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+me,r.RENDERBUFFER,q.__webglColorRenderbuffer[me])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(q.__webglDepthRenderbuffer=r.createRenderbuffer(),Ie(q.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(ee){t.bindTexture(r.TEXTURE_CUBE_MAP,te.__webglTexture),K(r.TEXTURE_CUBE_MAP,S,Me);for(let he=0;he<6;he++)if(a&&S.mipmaps&&S.mipmaps.length>0)for(let me=0;me<S.mipmaps.length;me++)ve(q.__webglFramebuffer[he][me],R,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+he,me);else ve(q.__webglFramebuffer[he],R,S,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);y(S,Me)&&_(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ie){const he=R.texture;for(let me=0,Re=he.length;me<Re;me++){const Ge=he[me],Q=n.get(Ge);t.bindTexture(r.TEXTURE_2D,Q.__webglTexture),K(r.TEXTURE_2D,Ge,Me),ve(q.__webglFramebuffer,R,Ge,r.COLOR_ATTACHMENT0+me,r.TEXTURE_2D,0),y(Ge,Me)&&_(r.TEXTURE_2D)}t.unbindTexture()}else{let he=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(a?he=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(he,te.__webglTexture),K(he,S,Me),a&&S.mipmaps&&S.mipmaps.length>0)for(let me=0;me<S.mipmaps.length;me++)ve(q.__webglFramebuffer[me],R,S,r.COLOR_ATTACHMENT0,he,me);else ve(q.__webglFramebuffer,R,S,r.COLOR_ATTACHMENT0,he,0);y(S,Me)&&_(he),t.unbindTexture()}R.depthBuffer&&pe(R)}function Ut(R){const S=m(R)||a,q=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let te=0,ee=q.length;te<ee;te++){const ie=q[te];if(y(ie,S)){const Me=R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:r.TEXTURE_2D,he=n.get(ie).__webglTexture;t.bindTexture(Me,he),_(Me),t.unbindTexture()}}}function Ee(R){if(a&&R.samples>0&&ye(R)===!1){const S=R.isWebGLMultipleRenderTargets?R.texture:[R.texture],q=R.width,te=R.height;let ee=r.COLOR_BUFFER_BIT;const ie=[],Me=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,he=n.get(R),me=R.isWebGLMultipleRenderTargets===!0;if(me)for(let Re=0;Re<S.length;Re++)t.bindFramebuffer(r.FRAMEBUFFER,he.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Re,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,he.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Re,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,he.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let Re=0;Re<S.length;Re++){ie.push(r.COLOR_ATTACHMENT0+Re),R.depthBuffer&&ie.push(Me);const Ge=he.__ignoreDepthValues!==void 0?he.__ignoreDepthValues:!1;if(Ge===!1&&(R.depthBuffer&&(ee|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&(ee|=r.STENCIL_BUFFER_BIT)),me&&r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,he.__webglColorRenderbuffer[Re]),Ge===!0&&(r.invalidateFramebuffer(r.READ_FRAMEBUFFER,[Me]),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[Me])),me){const Q=n.get(S[Re]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,Q,0)}r.blitFramebuffer(0,0,q,te,0,0,q,te,ee,r.NEAREST),c&&r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ie)}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),me)for(let Re=0;Re<S.length;Re++){t.bindFramebuffer(r.FRAMEBUFFER,he.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Re,r.RENDERBUFFER,he.__webglColorRenderbuffer[Re]);const Ge=n.get(S[Re]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,he.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Re,r.TEXTURE_2D,Ge,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,he.__webglMultisampledFramebuffer)}}function Ue(R){return Math.min(i.maxSamples,R.samples)}function ye(R){const S=n.get(R);return a&&R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function dt(R){const S=o.render.frame;h.get(R)!==S&&(h.set(R,S),R.update())}function He(R,S){const q=R.colorSpace,te=R.format,ee=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||R.format===Uo||q!==Et&&q!==en&&(Je.getTransfer(q)===ot?a===!1?e.has("EXT_sRGB")===!0&&te===Qt?(R.format=Uo,R.minFilter=Gt,R.generateMipmaps=!1):S=gh.sRGBToLinear(S):(te!==Qt||ee!==jn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),S}this.allocateTextureUnit=L,this.resetTextureUnits=j,this.setTexture2D=F,this.setTexture2DArray=B,this.setTexture3D=D,this.setTextureCube=O,this.rebindTextures=Ye,this.setupRenderTarget=G,this.updateRenderTargetMipmap=Ut,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=pe,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=ye}function w0(r,e,t){const n=t.isWebGL2;function i(s,o=en){let a;const l=Je.getTransfer(o);if(s===jn)return r.UNSIGNED_BYTE;if(s===sh)return r.UNSIGNED_SHORT_4_4_4_4;if(s===rh)return r.UNSIGNED_SHORT_5_5_5_1;if(s===Wu)return r.BYTE;if(s===qu)return r.SHORT;if(s===ta)return r.UNSIGNED_SHORT;if(s===ih)return r.INT;if(s===Wn)return r.UNSIGNED_INT;if(s===Rn)return r.FLOAT;if(s===gn)return n?r.HALF_FLOAT:(a=e.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(s===Xu)return r.ALPHA;if(s===Qt)return r.RGBA;if(s===ju)return r.LUMINANCE;if(s===$u)return r.LUMINANCE_ALPHA;if(s===ci)return r.DEPTH_COMPONENT;if(s===$i)return r.DEPTH_STENCIL;if(s===Uo)return a=e.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(s===Yu)return r.RED;if(s===oh)return r.RED_INTEGER;if(s===Ku)return r.RG;if(s===ah)return r.RG_INTEGER;if(s===lh)return r.RGBA_INTEGER;if(s===Br||s===Hr||s===Gr||s===Vr)if(l===ot)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(s===Br)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Hr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Gr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Vr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(s===Br)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Hr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Gr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Vr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===Fa||s===Oa||s===za||s===Ba)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(s===Fa)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===Oa)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===za)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Ba)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===ch)return a=e.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(s===Ha||s===Ga)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(s===Ha)return l===ot?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(s===Ga)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Va||s===Wa||s===qa||s===Xa||s===ja||s===$a||s===Ya||s===Ka||s===Ja||s===Za||s===Qa||s===el||s===tl||s===nl)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(s===Va)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Wa)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===qa)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Xa)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===ja)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===$a)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Ya)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Ka)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Ja)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Za)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Qa)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===el)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===tl)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===nl)return l===ot?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Wr||s===il||s===sl)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(s===Wr)return l===ot?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===il)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===sl)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Ju||s===rl||s===ol||s===al)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(s===Wr)return a.COMPRESSED_RED_RGTC1_EXT;if(s===rl)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===ol)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===al)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===li?n?r.UNSIGNED_INT_24_8:(a=e.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):r[s]!==void 0?r[s]:null}return{convert:i}}class E0 extends Pt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Fe extends ut{constructor(){super(),this.isGroup=!0,this.type="Group"}}const T0={type:"move"};class mo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Fe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Fe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Fe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const x of e.hand.values()){const m=t.getJointPose(x,n),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(T0)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Fe;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class A0 extends _i{constructor(e,t){super();const n=this;let i=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const x=t.getContextAttributes();let m=null,p=null;const y=[],_=[],v=new Se;let E=null;const b=new Pt;b.layers.enable(1),b.viewport=new nt;const A=new Pt;A.layers.enable(2),A.viewport=new nt;const N=[b,A],M=new E0;M.layers.enable(1),M.layers.enable(2);let w=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let J=y[K];return J===void 0&&(J=new mo,y[K]=J),J.getTargetRaySpace()},this.getControllerGrip=function(K){let J=y[K];return J===void 0&&(J=new mo,y[K]=J),J.getGripSpace()},this.getHand=function(K){let J=y[K];return J===void 0&&(J=new mo,y[K]=J),J.getHandSpace()};function V(K){const J=_.indexOf(K.inputSource);if(J===-1)return;const ae=y[J];ae!==void 0&&(ae.update(K.inputSource,K.frame,c||o),ae.dispatchEvent({type:K.type,data:K.inputSource}))}function j(){i.removeEventListener("select",V),i.removeEventListener("selectstart",V),i.removeEventListener("selectend",V),i.removeEventListener("squeeze",V),i.removeEventListener("squeezestart",V),i.removeEventListener("squeezeend",V),i.removeEventListener("end",j),i.removeEventListener("inputsourceschange",L);for(let K=0;K<y.length;K++){const J=_[K];J!==null&&(_[K]=null,y[K].disconnect(J))}w=null,k=null,e.setRenderTarget(m),f=null,d=null,u=null,i=null,p=null,ne.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(v.width,v.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){s=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){a=K,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(K){if(i=K,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",V),i.addEventListener("selectstart",V),i.addEventListener("selectend",V),i.addEventListener("squeeze",V),i.addEventListener("squeezestart",V),i.addEventListener("squeezeend",V),i.addEventListener("end",j),i.addEventListener("inputsourceschange",L),x.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(v),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const J={antialias:i.renderState.layers===void 0?x.antialias:!0,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,J),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new tn(f.framebufferWidth,f.framebufferHeight,{format:Qt,type:jn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil})}else{let J=null,ae=null,_e=null;x.depth&&(_e=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,J=x.stencil?$i:ci,ae=x.stencil?li:Wn);const ve={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:s};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(ve),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),p=new tn(d.textureWidth,d.textureHeight,{format:Qt,type:jn,depthTexture:new Th(d.textureWidth,d.textureHeight,ae,void 0,void 0,void 0,void 0,void 0,void 0,J),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0});const Ie=e.properties.get(p);Ie.__ignoreDepthValues=d.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),ne.setContext(i),ne.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function L(K){for(let J=0;J<K.removed.length;J++){const ae=K.removed[J],_e=_.indexOf(ae);_e>=0&&(_[_e]=null,y[_e].disconnect(ae))}for(let J=0;J<K.added.length;J++){const ae=K.added[J];let _e=_.indexOf(ae);if(_e===-1){for(let Ie=0;Ie<y.length;Ie++)if(Ie>=_.length){_.push(ae),_e=Ie;break}else if(_[Ie]===null){_[Ie]=ae,_e=Ie;break}if(_e===-1)break}const ve=y[_e];ve&&ve.connect(ae)}}const I=new C,F=new C;function B(K,J,ae){I.setFromMatrixPosition(J.matrixWorld),F.setFromMatrixPosition(ae.matrixWorld);const _e=I.distanceTo(F),ve=J.projectionMatrix.elements,Ie=ae.projectionMatrix.elements,Ne=ve[14]/(ve[10]-1),pe=ve[14]/(ve[10]+1),Ye=(ve[9]+1)/ve[5],G=(ve[9]-1)/ve[5],Ut=(ve[8]-1)/ve[0],Ee=(Ie[8]+1)/Ie[0],Ue=Ne*Ut,ye=Ne*Ee,dt=_e/(-Ut+Ee),He=dt*-Ut;J.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(He),K.translateZ(dt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert();const R=Ne+dt,S=pe+dt,q=Ue-He,te=ye+(_e-He),ee=Ye*pe/S*R,ie=G*pe/S*R;K.projectionMatrix.makePerspective(q,te,ee,ie,R,S),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}function D(K,J){J===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(J.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(i===null)return;M.near=A.near=b.near=K.near,M.far=A.far=b.far=K.far,(w!==M.near||k!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),w=M.near,k=M.far);const J=K.parent,ae=M.cameras;D(M,J);for(let _e=0;_e<ae.length;_e++)D(ae[_e],J);ae.length===2?B(M,b,A):M.projectionMatrix.copy(b.projectionMatrix),O(K,M,J)};function O(K,J,ae){ae===null?K.matrix.copy(J.matrixWorld):(K.matrix.copy(ae.matrixWorld),K.matrix.invert(),K.matrix.multiply(J.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(J.projectionMatrix),K.projectionMatrixInverse.copy(J.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Ki*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(K){l=K,d!==null&&(d.fixedFoveation=K),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=K)};let H=null;function Z(K,J){if(h=J.getViewerPose(c||o),g=J,h!==null){const ae=h.views;f!==null&&(e.setRenderTargetFramebuffer(p,f.framebuffer),e.setRenderTarget(p));let _e=!1;ae.length!==M.cameras.length&&(M.cameras.length=0,_e=!0);for(let ve=0;ve<ae.length;ve++){const Ie=ae[ve];let Ne=null;if(f!==null)Ne=f.getViewport(Ie);else{const Ye=u.getViewSubImage(d,Ie);Ne=Ye.viewport,ve===0&&(e.setRenderTargetTextures(p,Ye.colorTexture,d.ignoreDepthValues?void 0:Ye.depthStencilTexture),e.setRenderTarget(p))}let pe=N[ve];pe===void 0&&(pe=new Pt,pe.layers.enable(ve),pe.viewport=new nt,N[ve]=pe),pe.matrix.fromArray(Ie.transform.matrix),pe.matrix.decompose(pe.position,pe.quaternion,pe.scale),pe.projectionMatrix.fromArray(Ie.projectionMatrix),pe.projectionMatrixInverse.copy(pe.projectionMatrix).invert(),pe.viewport.set(Ne.x,Ne.y,Ne.width,Ne.height),ve===0&&(M.matrix.copy(pe.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),_e===!0&&M.cameras.push(pe)}}for(let ae=0;ae<y.length;ae++){const _e=_[ae],ve=y[ae];_e!==null&&ve!==void 0&&ve.update(_e,J,c||o)}H&&H(K,J),J.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:J}),g=null}const ne=new Eh;ne.setAnimationLoop(Z),this.setAnimationLoop=function(K){H=K},this.dispose=function(){}}}function R0(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,bh(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,y,_,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),u(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p)):p.isMeshStandardMaterial?(s(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),x(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,y,_):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Dt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Dt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=e.get(p).envMap;if(y&&(m.envMap.value=y,m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const _=r._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*_,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,y,_){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=_*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Dt&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const y=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function C0(r,e,t,n){let i={},s={},o=[];const a=t.isWebGL2?r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(y,_){const v=_.program;n.uniformBlockBinding(y,v)}function c(y,_){let v=i[y.id];v===void 0&&(g(y),v=h(y),i[y.id]=v,y.addEventListener("dispose",m));const E=_.program;n.updateUBOMapping(y,E);const b=e.render.frame;s[y.id]!==b&&(d(y),s[y.id]=b)}function h(y){const _=u();y.__bindingPointIndex=_;const v=r.createBuffer(),E=y.__size,b=y.usage;return r.bindBuffer(r.UNIFORM_BUFFER,v),r.bufferData(r.UNIFORM_BUFFER,E,b),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,_,v),v}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const _=i[y.id],v=y.uniforms,E=y.__cache;r.bindBuffer(r.UNIFORM_BUFFER,_);for(let b=0,A=v.length;b<A;b++){const N=Array.isArray(v[b])?v[b]:[v[b]];for(let M=0,w=N.length;M<w;M++){const k=N[M];if(f(k,b,M,E)===!0){const V=k.__offset,j=Array.isArray(k.value)?k.value:[k.value];let L=0;for(let I=0;I<j.length;I++){const F=j[I],B=x(F);typeof F=="number"||typeof F=="boolean"?(k.__data[0]=F,r.bufferSubData(r.UNIFORM_BUFFER,V+L,k.__data)):F.isMatrix3?(k.__data[0]=F.elements[0],k.__data[1]=F.elements[1],k.__data[2]=F.elements[2],k.__data[3]=0,k.__data[4]=F.elements[3],k.__data[5]=F.elements[4],k.__data[6]=F.elements[5],k.__data[7]=0,k.__data[8]=F.elements[6],k.__data[9]=F.elements[7],k.__data[10]=F.elements[8],k.__data[11]=0):(F.toArray(k.__data,L),L+=B.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,V,k.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(y,_,v,E){const b=y.value,A=_+"_"+v;if(E[A]===void 0)return typeof b=="number"||typeof b=="boolean"?E[A]=b:E[A]=b.clone(),!0;{const N=E[A];if(typeof b=="number"||typeof b=="boolean"){if(N!==b)return E[A]=b,!0}else if(N.equals(b)===!1)return N.copy(b),!0}return!1}function g(y){const _=y.uniforms;let v=0;const E=16;for(let A=0,N=_.length;A<N;A++){const M=Array.isArray(_[A])?_[A]:[_[A]];for(let w=0,k=M.length;w<k;w++){const V=M[w],j=Array.isArray(V.value)?V.value:[V.value];for(let L=0,I=j.length;L<I;L++){const F=j[L],B=x(F),D=v%E;D!==0&&E-D<B.boundary&&(v+=E-D),V.__data=new Float32Array(B.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=v,v+=B.storage}}}const b=v%E;return b>0&&(v+=E-b),y.__size=v,y.__cache={},this}function x(y){const _={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(_.boundary=4,_.storage=4):y.isVector2?(_.boundary=8,_.storage=8):y.isVector3||y.isColor?(_.boundary=16,_.storage=12):y.isVector4?(_.boundary=16,_.storage=16):y.isMatrix3?(_.boundary=48,_.storage=48):y.isMatrix4?(_.boundary=64,_.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),_}function m(y){const _=y.target;_.removeEventListener("dispose",m);const v=o.indexOf(_.__bindingPointIndex);o.splice(v,1),r.deleteBuffer(i[_.id]),delete i[_.id],delete s[_.id]}function p(){for(const y in i)r.deleteBuffer(i[y]);o=[],i={},s={}}return{bind:l,update:c,dispose:p}}class Ih{constructor(e={}){const{canvas:t=Ed(),context:n=null,depth:i=!0,stencil:s=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=o;const f=new Uint32Array(4),g=new Int32Array(4);let x=null,m=null;const p=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=at,this._useLegacyLights=!1,this.toneMapping=Xn,this.toneMappingExposure=1;const _=this;let v=!1,E=0,b=0,A=null,N=-1,M=null;const w=new nt,k=new nt;let V=null;const j=new ue(0);let L=0,I=t.width,F=t.height,B=1,D=null,O=null;const H=new nt(0,0,I,F),Z=new nt(0,0,I,F);let ne=!1;const K=new aa;let J=!1,ae=!1,_e=null;const ve=new We,Ie=new Se,Ne=new C,pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ye(){return A===null?B:1}let G=n;function Ut(T,z){for(let X=0;X<T.length;X++){const $=T[X],W=t.getContext($,z);if(W!==null)return W}return null}try{const T={alpha:!0,depth:i,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Zo}`),t.addEventListener("webglcontextlost",se,!1),t.addEventListener("webglcontextrestored",P,!1),t.addEventListener("webglcontextcreationerror",le,!1),G===null){const z=["webgl2","webgl","experimental-webgl"];if(_.isWebGL1Renderer===!0&&z.shift(),G=Ut(z,T),G===null)throw Ut(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&G instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),G.getShaderPrecisionFormat===void 0&&(G.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Ee,Ue,ye,dt,He,R,S,q,te,ee,ie,Me,he,me,Re,Ge,Q,et,$e,De,we,ge,ze,Qe;function pt(){Ee=new zm(G),Ue=new Dm(G,Ee,e),Ee.init(Ue),ge=new w0(G,Ee,Ue),ye=new b0(G,Ee,Ue),dt=new Gm(G),He=new l0,R=new S0(G,Ee,ye,He,Ue,ge,dt),S=new Um(_),q=new Om(_),te=new Yd(G,Ue),ze=new Pm(G,Ee,te,Ue),ee=new Bm(G,te,dt,ze),ie=new Xm(G,ee,te,dt),$e=new qm(G,Ue,R),Ge=new Nm(He),Me=new a0(_,S,q,Ee,Ue,ze,Ge),he=new R0(_,He),me=new h0,Re=new g0(Ee,Ue),et=new Lm(_,S,q,ye,ie,d,l),Q=new M0(_,ie,Ue),Qe=new C0(G,dt,Ue,ye),De=new Im(G,Ee,dt,Ue),we=new Hm(G,Ee,dt,Ue),dt.programs=Me.programs,_.capabilities=Ue,_.extensions=Ee,_.properties=He,_.renderLists=me,_.shadowMap=Q,_.state=ye,_.info=dt}pt();const qe=new A0(_,G);this.xr=qe,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){const T=Ee.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Ee.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(T){T!==void 0&&(B=T,this.setSize(I,F,!1))},this.getSize=function(T){return T.set(I,F)},this.setSize=function(T,z,X=!0){if(qe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}I=T,F=z,t.width=Math.floor(T*B),t.height=Math.floor(z*B),X===!0&&(t.style.width=T+"px",t.style.height=z+"px"),this.setViewport(0,0,T,z)},this.getDrawingBufferSize=function(T){return T.set(I*B,F*B).floor()},this.setDrawingBufferSize=function(T,z,X){I=T,F=z,B=X,t.width=Math.floor(T*X),t.height=Math.floor(z*X),this.setViewport(0,0,T,z)},this.getCurrentViewport=function(T){return T.copy(w)},this.getViewport=function(T){return T.copy(H)},this.setViewport=function(T,z,X,$){T.isVector4?H.set(T.x,T.y,T.z,T.w):H.set(T,z,X,$),ye.viewport(w.copy(H).multiplyScalar(B).floor())},this.getScissor=function(T){return T.copy(Z)},this.setScissor=function(T,z,X,$){T.isVector4?Z.set(T.x,T.y,T.z,T.w):Z.set(T,z,X,$),ye.scissor(k.copy(Z).multiplyScalar(B).floor())},this.getScissorTest=function(){return ne},this.setScissorTest=function(T){ye.setScissorTest(ne=T)},this.setOpaqueSort=function(T){D=T},this.setTransparentSort=function(T){O=T},this.getClearColor=function(T){return T.copy(et.getClearColor())},this.setClearColor=function(){et.setClearColor.apply(et,arguments)},this.getClearAlpha=function(){return et.getClearAlpha()},this.setClearAlpha=function(){et.setClearAlpha.apply(et,arguments)},this.clear=function(T=!0,z=!0,X=!0){let $=0;if(T){let W=!1;if(A!==null){const de=A.texture.format;W=de===lh||de===ah||de===oh}if(W){const de=A.texture.type,be=de===jn||de===Wn||de===ta||de===li||de===sh||de===rh,Ae=et.getClearColor(),Pe=et.getClearAlpha(),Ve=Ae.r,ke=Ae.g,Oe=Ae.b;be?(f[0]=Ve,f[1]=ke,f[2]=Oe,f[3]=Pe,G.clearBufferuiv(G.COLOR,0,f)):(g[0]=Ve,g[1]=ke,g[2]=Oe,g[3]=Pe,G.clearBufferiv(G.COLOR,0,g))}else $|=G.COLOR_BUFFER_BIT}z&&($|=G.DEPTH_BUFFER_BIT),X&&($|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",se,!1),t.removeEventListener("webglcontextrestored",P,!1),t.removeEventListener("webglcontextcreationerror",le,!1),me.dispose(),Re.dispose(),He.dispose(),S.dispose(),q.dispose(),ie.dispose(),ze.dispose(),Qe.dispose(),Me.dispose(),qe.dispose(),qe.removeEventListener("sessionstart",kt),qe.removeEventListener("sessionend",rt),_e&&(_e.dispose(),_e=null),Ft.stop()};function se(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),v=!0}function P(){console.log("THREE.WebGLRenderer: Context Restored."),v=!1;const T=dt.autoReset,z=Q.enabled,X=Q.autoUpdate,$=Q.needsUpdate,W=Q.type;pt(),dt.autoReset=T,Q.enabled=z,Q.autoUpdate=X,Q.needsUpdate=$,Q.type=W}function le(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function ce(T){const z=T.target;z.removeEventListener("dispose",ce),Le(z)}function Le(T){Te(T),He.remove(T)}function Te(T){const z=He.get(T).programs;z!==void 0&&(z.forEach(function(X){Me.releaseProgram(X)}),T.isShaderMaterial&&Me.releaseShaderCache(T))}this.renderBufferDirect=function(T,z,X,$,W,de){z===null&&(z=pe);const be=W.isMesh&&W.matrixWorld.determinant()<0,Ae=uu(T,z,X,$,W);ye.setMaterial($,be);let Pe=X.index,Ve=1;if($.wireframe===!0){if(Pe=ee.getWireframeAttribute(X),Pe===void 0)return;Ve=2}const ke=X.drawRange,Oe=X.attributes.position;let gt=ke.start*Ve,Wt=(ke.start+ke.count)*Ve;de!==null&&(gt=Math.max(gt,de.start*Ve),Wt=Math.min(Wt,(de.start+de.count)*Ve)),Pe!==null?(gt=Math.max(gt,0),Wt=Math.min(Wt,Pe.count)):Oe!=null&&(gt=Math.max(gt,0),Wt=Math.min(Wt,Oe.count));const Mt=Wt-gt;if(Mt<0||Mt===1/0)return;ze.setup(W,$,Ae,X,Pe);let vn,ft=De;if(Pe!==null&&(vn=te.get(Pe),ft=we,ft.setIndex(vn)),W.isMesh)$.wireframe===!0?(ye.setLineWidth($.wireframeLinewidth*Ye()),ft.setMode(G.LINES)):ft.setMode(G.TRIANGLES);else if(W.isLine){let Xe=$.linewidth;Xe===void 0&&(Xe=1),ye.setLineWidth(Xe*Ye()),W.isLineSegments?ft.setMode(G.LINES):W.isLineLoop?ft.setMode(G.LINE_LOOP):ft.setMode(G.LINE_STRIP)}else W.isPoints?ft.setMode(G.POINTS):W.isSprite&&ft.setMode(G.TRIANGLES);if(W.isBatchedMesh)ft.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else if(W.isInstancedMesh)ft.renderInstances(gt,Mt,W.count);else if(X.isInstancedBufferGeometry){const Xe=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,kr=Math.min(X.instanceCount,Xe);ft.renderInstances(gt,Mt,kr)}else ft.render(gt,Mt)};function it(T,z,X){T.transparent===!0&&T.side===It&&T.forceSinglePass===!1?(T.side=Dt,T.needsUpdate=!0,Ps(T,z,X),T.side=Pn,T.needsUpdate=!0,Ps(T,z,X),T.side=It):Ps(T,z,X)}this.compile=function(T,z,X=null){X===null&&(X=T),m=Re.get(X),m.init(),y.push(m),X.traverseVisible(function(W){W.isLight&&W.layers.test(z.layers)&&(m.pushLight(W),W.castShadow&&m.pushShadow(W))}),T!==X&&T.traverseVisible(function(W){W.isLight&&W.layers.test(z.layers)&&(m.pushLight(W),W.castShadow&&m.pushShadow(W))}),m.setupLights(_._useLegacyLights);const $=new Set;return T.traverse(function(W){const de=W.material;if(de)if(Array.isArray(de))for(let be=0;be<de.length;be++){const Ae=de[be];it(Ae,X,W),$.add(Ae)}else it(de,X,W),$.add(de)}),y.pop(),m=null,$},this.compileAsync=function(T,z,X=null){const $=this.compile(T,z,X);return new Promise(W=>{function de(){if($.forEach(function(be){He.get(be).currentProgram.isReady()&&$.delete(be)}),$.size===0){W(T);return}setTimeout(de,10)}Ee.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let st=null;function yt(T){st&&st(T)}function kt(){Ft.stop()}function rt(){Ft.start()}const Ft=new Eh;Ft.setAnimationLoop(yt),typeof self<"u"&&Ft.setContext(self),this.setAnimationLoop=function(T){st=T,qe.setAnimationLoop(T),T===null?Ft.stop():Ft.start()},qe.addEventListener("sessionstart",kt),qe.addEventListener("sessionend",rt),this.render=function(T,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(v===!0)return;T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),qe.enabled===!0&&qe.isPresenting===!0&&(qe.cameraAutoUpdate===!0&&qe.updateCamera(z),z=qe.getCamera()),T.isScene===!0&&T.onBeforeRender(_,T,z,A),m=Re.get(T,y.length),m.init(),y.push(m),ve.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),K.setFromProjectionMatrix(ve),ae=this.localClippingEnabled,J=Ge.init(this.clippingPlanes,ae),x=me.get(T,p.length),x.init(),p.push(x),un(T,z,0,_.sortObjects),x.finish(),_.sortObjects===!0&&x.sort(D,O),this.info.render.frame++,J===!0&&Ge.beginShadows();const X=m.state.shadowsArray;if(Q.render(X,T,z),J===!0&&Ge.endShadows(),this.info.autoReset===!0&&this.info.reset(),et.render(x,T),m.setupLights(_._useLegacyLights),z.isArrayCamera){const $=z.cameras;for(let W=0,de=$.length;W<de;W++){const be=$[W];Ea(x,T,be,be.viewport)}}else Ea(x,T,z);A!==null&&(R.updateMultisampleRenderTarget(A),R.updateRenderTargetMipmap(A)),T.isScene===!0&&T.onAfterRender(_,T,z),ze.resetDefaultState(),N=-1,M=null,y.pop(),y.length>0?m=y[y.length-1]:m=null,p.pop(),p.length>0?x=p[p.length-1]:x=null};function un(T,z,X,$){if(T.visible===!1)return;if(T.layers.test(z.layers)){if(T.isGroup)X=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(z);else if(T.isLight)m.pushLight(T),T.castShadow&&m.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||K.intersectsSprite(T)){$&&Ne.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ve);const be=ie.update(T),Ae=T.material;Ae.visible&&x.push(T,be,Ae,X,Ne.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||K.intersectsObject(T))){const be=ie.update(T),Ae=T.material;if($&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ne.copy(T.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),Ne.copy(be.boundingSphere.center)),Ne.applyMatrix4(T.matrixWorld).applyMatrix4(ve)),Array.isArray(Ae)){const Pe=be.groups;for(let Ve=0,ke=Pe.length;Ve<ke;Ve++){const Oe=Pe[Ve],gt=Ae[Oe.materialIndex];gt&&gt.visible&&x.push(T,be,gt,X,Ne.z,Oe)}}else Ae.visible&&x.push(T,be,Ae,X,Ne.z,null)}}const de=T.children;for(let be=0,Ae=de.length;be<Ae;be++)un(de[be],z,X,$)}function Ea(T,z,X,$){const W=T.opaque,de=T.transmissive,be=T.transparent;m.setupLightsView(X),J===!0&&Ge.setGlobalState(_.clippingPlanes,X),de.length>0&&hu(W,de,z,X),$&&ye.viewport(w.copy($)),W.length>0&&Ls(W,z,X),de.length>0&&Ls(de,z,X),be.length>0&&Ls(be,z,X),ye.buffers.depth.setTest(!0),ye.buffers.depth.setMask(!0),ye.buffers.color.setMask(!0),ye.setPolygonOffset(!1)}function hu(T,z,X,$){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;const de=Ue.isWebGL2;_e===null&&(_e=new tn(1,1,{generateMipmaps:!0,type:Ee.has("EXT_color_buffer_half_float")?gn:jn,minFilter:pi,samples:de?4:0})),_.getDrawingBufferSize(Ie),de?_e.setSize(Ie.x,Ie.y):_e.setSize(Mr(Ie.x),Mr(Ie.y));const be=_.getRenderTarget();_.setRenderTarget(_e),_.getClearColor(j),L=_.getClearAlpha(),L<1&&_.setClearColor(16777215,.5),_.clear();const Ae=_.toneMapping;_.toneMapping=Xn,Ls(T,X,$),R.updateMultisampleRenderTarget(_e),R.updateRenderTargetMipmap(_e);let Pe=!1;for(let Ve=0,ke=z.length;Ve<ke;Ve++){const Oe=z[Ve],gt=Oe.object,Wt=Oe.geometry,Mt=Oe.material,vn=Oe.group;if(Mt.side===It&&gt.layers.test($.layers)){const ft=Mt.side;Mt.side=Dt,Mt.needsUpdate=!0,Ta(gt,X,$,Wt,Mt,vn),Mt.side=ft,Mt.needsUpdate=!0,Pe=!0}}Pe===!0&&(R.updateMultisampleRenderTarget(_e),R.updateRenderTargetMipmap(_e)),_.setRenderTarget(be),_.setClearColor(j,L),_.toneMapping=Ae}function Ls(T,z,X){const $=z.isScene===!0?z.overrideMaterial:null;for(let W=0,de=T.length;W<de;W++){const be=T[W],Ae=be.object,Pe=be.geometry,Ve=$===null?be.material:$,ke=be.group;Ae.layers.test(X.layers)&&Ta(Ae,z,X,Pe,Ve,ke)}}function Ta(T,z,X,$,W,de){T.onBeforeRender(_,z,X,$,W,de),T.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),W.onBeforeRender(_,z,X,$,T,de),W.transparent===!0&&W.side===It&&W.forceSinglePass===!1?(W.side=Dt,W.needsUpdate=!0,_.renderBufferDirect(X,z,$,W,T,de),W.side=Pn,W.needsUpdate=!0,_.renderBufferDirect(X,z,$,W,T,de),W.side=It):_.renderBufferDirect(X,z,$,W,T,de),T.onAfterRender(_,z,X,$,W,de)}function Ps(T,z,X){z.isScene!==!0&&(z=pe);const $=He.get(T),W=m.state.lights,de=m.state.shadowsArray,be=W.state.version,Ae=Me.getParameters(T,W.state,de,z,X),Pe=Me.getProgramCacheKey(Ae);let Ve=$.programs;$.environment=T.isMeshStandardMaterial?z.environment:null,$.fog=z.fog,$.envMap=(T.isMeshStandardMaterial?q:S).get(T.envMap||$.environment),Ve===void 0&&(T.addEventListener("dispose",ce),Ve=new Map,$.programs=Ve);let ke=Ve.get(Pe);if(ke!==void 0){if($.currentProgram===ke&&$.lightsStateVersion===be)return Ra(T,Ae),ke}else Ae.uniforms=Me.getUniforms(T),T.onBuild(X,Ae,_),T.onBeforeCompile(Ae,_),ke=Me.acquireProgram(Ae,Pe),Ve.set(Pe,ke),$.uniforms=Ae.uniforms;const Oe=$.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Oe.clippingPlanes=Ge.uniform),Ra(T,Ae),$.needsLights=fu(T),$.lightsStateVersion=be,$.needsLights&&(Oe.ambientLightColor.value=W.state.ambient,Oe.lightProbe.value=W.state.probe,Oe.directionalLights.value=W.state.directional,Oe.directionalLightShadows.value=W.state.directionalShadow,Oe.spotLights.value=W.state.spot,Oe.spotLightShadows.value=W.state.spotShadow,Oe.rectAreaLights.value=W.state.rectArea,Oe.ltc_1.value=W.state.rectAreaLTC1,Oe.ltc_2.value=W.state.rectAreaLTC2,Oe.pointLights.value=W.state.point,Oe.pointLightShadows.value=W.state.pointShadow,Oe.hemisphereLights.value=W.state.hemi,Oe.directionalShadowMap.value=W.state.directionalShadowMap,Oe.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Oe.spotShadowMap.value=W.state.spotShadowMap,Oe.spotLightMatrix.value=W.state.spotLightMatrix,Oe.spotLightMap.value=W.state.spotLightMap,Oe.pointShadowMap.value=W.state.pointShadowMap,Oe.pointShadowMatrix.value=W.state.pointShadowMatrix),$.currentProgram=ke,$.uniformsList=null,ke}function Aa(T){if(T.uniformsList===null){const z=T.currentProgram.getUniforms();T.uniformsList=cr.seqWithValue(z.seq,T.uniforms)}return T.uniformsList}function Ra(T,z){const X=He.get(T);X.outputColorSpace=z.outputColorSpace,X.batching=z.batching,X.instancing=z.instancing,X.instancingColor=z.instancingColor,X.skinning=z.skinning,X.morphTargets=z.morphTargets,X.morphNormals=z.morphNormals,X.morphColors=z.morphColors,X.morphTargetsCount=z.morphTargetsCount,X.numClippingPlanes=z.numClippingPlanes,X.numIntersection=z.numClipIntersection,X.vertexAlphas=z.vertexAlphas,X.vertexTangents=z.vertexTangents,X.toneMapping=z.toneMapping}function uu(T,z,X,$,W){z.isScene!==!0&&(z=pe),R.resetTextureUnits();const de=z.fog,be=$.isMeshStandardMaterial?z.environment:null,Ae=A===null?_.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Et,Pe=($.isMeshStandardMaterial?q:S).get($.envMap||be),Ve=$.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,ke=!!X.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Oe=!!X.morphAttributes.position,gt=!!X.morphAttributes.normal,Wt=!!X.morphAttributes.color;let Mt=Xn;$.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Mt=_.toneMapping);const vn=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ft=vn!==void 0?vn.length:0,Xe=He.get($),kr=m.state.lights;if(J===!0&&(ae===!0||T!==M)){const $t=T===M&&$.id===N;Ge.setState($,T,$t)}let mt=!1;$.version===Xe.__version?(Xe.needsLights&&Xe.lightsStateVersion!==kr.state.version||Xe.outputColorSpace!==Ae||W.isBatchedMesh&&Xe.batching===!1||!W.isBatchedMesh&&Xe.batching===!0||W.isInstancedMesh&&Xe.instancing===!1||!W.isInstancedMesh&&Xe.instancing===!0||W.isSkinnedMesh&&Xe.skinning===!1||!W.isSkinnedMesh&&Xe.skinning===!0||W.isInstancedMesh&&Xe.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Xe.instancingColor===!1&&W.instanceColor!==null||Xe.envMap!==Pe||$.fog===!0&&Xe.fog!==de||Xe.numClippingPlanes!==void 0&&(Xe.numClippingPlanes!==Ge.numPlanes||Xe.numIntersection!==Ge.numIntersection)||Xe.vertexAlphas!==Ve||Xe.vertexTangents!==ke||Xe.morphTargets!==Oe||Xe.morphNormals!==gt||Xe.morphColors!==Wt||Xe.toneMapping!==Mt||Ue.isWebGL2===!0&&Xe.morphTargetsCount!==ft)&&(mt=!0):(mt=!0,Xe.__version=$.version);let Kn=Xe.currentProgram;mt===!0&&(Kn=Ps($,z,W));let Ca=!1,cs=!1,Fr=!1;const At=Kn.getUniforms(),Jn=Xe.uniforms;if(ye.useProgram(Kn.program)&&(Ca=!0,cs=!0,Fr=!0),$.id!==N&&(N=$.id,cs=!0),Ca||M!==T){At.setValue(G,"projectionMatrix",T.projectionMatrix),At.setValue(G,"viewMatrix",T.matrixWorldInverse);const $t=At.map.cameraPosition;$t!==void 0&&$t.setValue(G,Ne.setFromMatrixPosition(T.matrixWorld)),Ue.logarithmicDepthBuffer&&At.setValue(G,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&At.setValue(G,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,cs=!0,Fr=!0)}if(W.isSkinnedMesh){At.setOptional(G,W,"bindMatrix"),At.setOptional(G,W,"bindMatrixInverse");const $t=W.skeleton;$t&&(Ue.floatVertexTextures?($t.boneTexture===null&&$t.computeBoneTexture(),At.setValue(G,"boneTexture",$t.boneTexture,R)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}W.isBatchedMesh&&(At.setOptional(G,W,"batchingTexture"),At.setValue(G,"batchingTexture",W._matricesTexture,R));const Or=X.morphAttributes;if((Or.position!==void 0||Or.normal!==void 0||Or.color!==void 0&&Ue.isWebGL2===!0)&&$e.update(W,X,Kn),(cs||Xe.receiveShadow!==W.receiveShadow)&&(Xe.receiveShadow=W.receiveShadow,At.setValue(G,"receiveShadow",W.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(Jn.envMap.value=Pe,Jn.flipEnvMap.value=Pe.isCubeTexture&&Pe.isRenderTargetTexture===!1?-1:1),cs&&(At.setValue(G,"toneMappingExposure",_.toneMappingExposure),Xe.needsLights&&du(Jn,Fr),de&&$.fog===!0&&he.refreshFogUniforms(Jn,de),he.refreshMaterialUniforms(Jn,$,B,F,_e),cr.upload(G,Aa(Xe),Jn,R)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(cr.upload(G,Aa(Xe),Jn,R),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&At.setValue(G,"center",W.center),At.setValue(G,"modelViewMatrix",W.modelViewMatrix),At.setValue(G,"normalMatrix",W.normalMatrix),At.setValue(G,"modelMatrix",W.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const $t=$.uniformsGroups;for(let zr=0,pu=$t.length;zr<pu;zr++)if(Ue.isWebGL2){const La=$t[zr];Qe.update(La,Kn),Qe.bind(La,Kn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Kn}function du(T,z){T.ambientLightColor.needsUpdate=z,T.lightProbe.needsUpdate=z,T.directionalLights.needsUpdate=z,T.directionalLightShadows.needsUpdate=z,T.pointLights.needsUpdate=z,T.pointLightShadows.needsUpdate=z,T.spotLights.needsUpdate=z,T.spotLightShadows.needsUpdate=z,T.rectAreaLights.needsUpdate=z,T.hemisphereLights.needsUpdate=z}function fu(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(T,z,X){He.get(T.texture).__webglTexture=z,He.get(T.depthTexture).__webglTexture=X;const $=He.get(T);$.__hasExternalTextures=!0,$.__hasExternalTextures&&($.__autoAllocateDepthBuffer=X===void 0,$.__autoAllocateDepthBuffer||Ee.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(T,z){const X=He.get(T);X.__webglFramebuffer=z,X.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(T,z=0,X=0){A=T,E=z,b=X;let $=!0,W=null,de=!1,be=!1;if(T){const Pe=He.get(T);Pe.__useDefaultFramebuffer!==void 0?(ye.bindFramebuffer(G.FRAMEBUFFER,null),$=!1):Pe.__webglFramebuffer===void 0?R.setupRenderTarget(T):Pe.__hasExternalTextures&&R.rebindTextures(T,He.get(T.texture).__webglTexture,He.get(T.depthTexture).__webglTexture);const Ve=T.texture;(Ve.isData3DTexture||Ve.isDataArrayTexture||Ve.isCompressedArrayTexture)&&(be=!0);const ke=He.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(ke[z])?W=ke[z][X]:W=ke[z],de=!0):Ue.isWebGL2&&T.samples>0&&R.useMultisampledRTT(T)===!1?W=He.get(T).__webglMultisampledFramebuffer:Array.isArray(ke)?W=ke[X]:W=ke,w.copy(T.viewport),k.copy(T.scissor),V=T.scissorTest}else w.copy(H).multiplyScalar(B).floor(),k.copy(Z).multiplyScalar(B).floor(),V=ne;if(ye.bindFramebuffer(G.FRAMEBUFFER,W)&&Ue.drawBuffers&&$&&ye.drawBuffers(T,W),ye.viewport(w),ye.scissor(k),ye.setScissorTest(V),de){const Pe=He.get(T.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+z,Pe.__webglTexture,X)}else if(be){const Pe=He.get(T.texture),Ve=z||0;G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,Pe.__webglTexture,X||0,Ve)}N=-1},this.readRenderTargetPixels=function(T,z,X,$,W,de,be){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=He.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&be!==void 0&&(Ae=Ae[be]),Ae){ye.bindFramebuffer(G.FRAMEBUFFER,Ae);try{const Pe=T.texture,Ve=Pe.format,ke=Pe.type;if(Ve!==Qt&&ge.convert(Ve)!==G.getParameter(G.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Oe=ke===gn&&(Ee.has("EXT_color_buffer_half_float")||Ue.isWebGL2&&Ee.has("EXT_color_buffer_float"));if(ke!==jn&&ge.convert(ke)!==G.getParameter(G.IMPLEMENTATION_COLOR_READ_TYPE)&&!(ke===Rn&&(Ue.isWebGL2||Ee.has("OES_texture_float")||Ee.has("WEBGL_color_buffer_float")))&&!Oe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=T.width-$&&X>=0&&X<=T.height-W&&G.readPixels(z,X,$,W,ge.convert(Ve),ge.convert(ke),de)}finally{const Pe=A!==null?He.get(A).__webglFramebuffer:null;ye.bindFramebuffer(G.FRAMEBUFFER,Pe)}}},this.copyFramebufferToTexture=function(T,z,X=0){const $=Math.pow(2,-X),W=Math.floor(z.image.width*$),de=Math.floor(z.image.height*$);R.setTexture2D(z,0),G.copyTexSubImage2D(G.TEXTURE_2D,X,0,0,T.x,T.y,W,de),ye.unbindTexture()},this.copyTextureToTexture=function(T,z,X,$=0){const W=z.image.width,de=z.image.height,be=ge.convert(X.format),Ae=ge.convert(X.type);R.setTexture2D(X,0),G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,X.flipY),G.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),G.pixelStorei(G.UNPACK_ALIGNMENT,X.unpackAlignment),z.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,$,T.x,T.y,W,de,be,Ae,z.image.data):z.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,$,T.x,T.y,z.mipmaps[0].width,z.mipmaps[0].height,be,z.mipmaps[0].data):G.texSubImage2D(G.TEXTURE_2D,$,T.x,T.y,be,Ae,z.image),$===0&&X.generateMipmaps&&G.generateMipmap(G.TEXTURE_2D),ye.unbindTexture()},this.copyTextureToTexture3D=function(T,z,X,$,W=0){if(_.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const de=T.max.x-T.min.x+1,be=T.max.y-T.min.y+1,Ae=T.max.z-T.min.z+1,Pe=ge.convert($.format),Ve=ge.convert($.type);let ke;if($.isData3DTexture)R.setTexture3D($,0),ke=G.TEXTURE_3D;else if($.isDataArrayTexture||$.isCompressedArrayTexture)R.setTexture2DArray($,0),ke=G.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}G.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,$.flipY),G.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),G.pixelStorei(G.UNPACK_ALIGNMENT,$.unpackAlignment);const Oe=G.getParameter(G.UNPACK_ROW_LENGTH),gt=G.getParameter(G.UNPACK_IMAGE_HEIGHT),Wt=G.getParameter(G.UNPACK_SKIP_PIXELS),Mt=G.getParameter(G.UNPACK_SKIP_ROWS),vn=G.getParameter(G.UNPACK_SKIP_IMAGES),ft=X.isCompressedTexture?X.mipmaps[W]:X.image;G.pixelStorei(G.UNPACK_ROW_LENGTH,ft.width),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,ft.height),G.pixelStorei(G.UNPACK_SKIP_PIXELS,T.min.x),G.pixelStorei(G.UNPACK_SKIP_ROWS,T.min.y),G.pixelStorei(G.UNPACK_SKIP_IMAGES,T.min.z),X.isDataTexture||X.isData3DTexture?G.texSubImage3D(ke,W,z.x,z.y,z.z,de,be,Ae,Pe,Ve,ft.data):X.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),G.compressedTexSubImage3D(ke,W,z.x,z.y,z.z,de,be,Ae,Pe,ft.data)):G.texSubImage3D(ke,W,z.x,z.y,z.z,de,be,Ae,Pe,Ve,ft),G.pixelStorei(G.UNPACK_ROW_LENGTH,Oe),G.pixelStorei(G.UNPACK_IMAGE_HEIGHT,gt),G.pixelStorei(G.UNPACK_SKIP_PIXELS,Wt),G.pixelStorei(G.UNPACK_SKIP_ROWS,Mt),G.pixelStorei(G.UNPACK_SKIP_IMAGES,vn),W===0&&$.generateMipmaps&&G.generateMipmap(ke),ye.unbindTexture()},this.initTexture=function(T){T.isCubeTexture?R.setTextureCube(T,0):T.isData3DTexture?R.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?R.setTexture2DArray(T,0):R.setTexture2D(T,0),ye.unbindTexture()},this.resetState=function(){E=0,b=0,A=null,ye.reset(),ze.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Cn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===sa?"display-p3":"srgb",t.unpackColorSpace=Je.workingColorSpace===Ar?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===at?hi:fh}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===hi?at:Et}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class L0 extends Ih{}L0.prototype.isWebGL1Renderer=!0;class ca{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new ue(e),this.near=t,this.far=n}clone(){return new ca(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class ha extends ut{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class P0{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=No,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=cn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=cn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=cn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ot=new C;class ua{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.applyMatrix4(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.applyNormalMatrix(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ot.fromBufferAttribute(this,t),Ot.transformDirection(e),this.setXYZ(t,Ot.x,Ot.y,Ot.z);return this}setX(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=tt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=pn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=pn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=pn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=pn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),i=tt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=tt(t,this.array),n=tt(n,this.array),i=tt(i,this.array),s=tt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Nt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new ua(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const $l=new C,Yl=new nt,Kl=new nt,I0=new C,Jl=new We,er=new C,go=new xn,Zl=new We,xo=new As;class D0 extends oe{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=ka,this.bindMatrix=new We,this.bindMatrixInverse=new We,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Vt),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,er),this.boundingBox.expandByPoint(er)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new xn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,er),this.boundingSphere.expandByPoint(er)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),go.copy(this.boundingSphere),go.applyMatrix4(i),e.ray.intersectsSphere(go)!==!1&&(Zl.copy(i).invert(),xo.copy(e.ray).applyMatrix4(Zl),!(this.boundingBox!==null&&xo.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,xo)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new nt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===ka?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Vu?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Yl.fromBufferAttribute(i.attributes.skinIndex,e),Kl.fromBufferAttribute(i.attributes.skinWeight,e),$l.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){const o=Kl.getComponent(s);if(o!==0){const a=Yl.getComponent(s);Jl.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(I0.copy($l).applyMatrix4(Jl),o)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}}class Dh extends ut{constructor(){super(),this.isBone=!0,this.type="Bone"}}class N0 extends wt{constructor(e=null,t=1,n=1,i,s,o,a,l,c=St,h=St,u,d){super(null,o,a,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ql=new We,U0=new We;class da{constructor(e=[],t=[]){this.uuid=cn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new We)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new We;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,o=e.length;s<o;s++){const a=e[s]?e[s].matrixWorld:U0;Ql.multiplyMatrices(a,t[s]),Ql.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new da(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new N0(t,e,e,Qt,Rn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let o=t[s];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),o=new Dh),this.bones.push(o),this.boneInverses.push(new We().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class zo extends Nt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ui=new We,ec=new We,tr=[],tc=new Vt,k0=new We,ps=new oe,ms=new xn;class Nh extends oe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new zo(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,k0)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Vt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ui),tc.copy(e.boundingBox).applyMatrix4(Ui),this.boundingBox.union(tc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new xn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ui),ms.copy(e.boundingSphere).applyMatrix4(Ui),this.boundingSphere.union(ms)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,i=this.count;if(ps.geometry=this.geometry,ps.material=this.material,ps.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ms.copy(this.boundingSphere),ms.applyMatrix4(n),e.ray.intersectsSphere(ms)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Ui),ec.multiplyMatrices(n,Ui),ps.matrixWorld=ec,ps.raycast(e,tr);for(let o=0,a=tr.length;o<a;o++){const l=tr[o];l.instanceId=s,l.object=this,t.push(l)}tr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new zo(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Uh extends hn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ue(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const nc=new C,ic=new C,sc=new We,_o=new As,nr=new xn;class fa extends ut{constructor(e=new Tt,t=new Uh){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)nc.fromBufferAttribute(t,i-1),ic.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=nc.distanceTo(ic);e.setAttribute("lineDistance",new lt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),nr.copy(n.boundingSphere),nr.applyMatrix4(i),nr.radius+=s,e.ray.intersectsSphere(nr)===!1)return;sc.copy(i).invert(),_o.copy(e.ray).applyMatrix4(sc);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=new C,h=new C,u=new C,d=new C,f=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){const p=Math.max(0,o.start),y=Math.min(g.count,o.start+o.count);for(let _=p,v=y-1;_<v;_+=f){const E=g.getX(_),b=g.getX(_+1);if(c.fromBufferAttribute(m,E),h.fromBufferAttribute(m,b),_o.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const N=e.ray.origin.distanceTo(d);N<e.near||N>e.far||t.push({distance:N,point:u.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,o.start),y=Math.min(m.count,o.start+o.count);for(let _=p,v=y-1;_<v;_+=f){if(c.fromBufferAttribute(m,_),h.fromBufferAttribute(m,_+1),_o.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const b=e.ray.origin.distanceTo(d);b<e.near||b>e.far||t.push({distance:b,point:u.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}const rc=new C,oc=new C;class F0 extends fa{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)rc.fromBufferAttribute(t,i),oc.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+rc.distanceTo(oc);e.setAttribute("lineDistance",new lt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class O0 extends fa{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class pa extends hn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ue(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const ac=new We,Bo=new As,ir=new xn,sr=new C;class kh extends ut{constructor(e=new Tt,t=new pa){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ir.copy(n.boundingSphere),ir.applyMatrix4(i),ir.radius+=s,e.ray.intersectsSphere(ir)===!1)return;ac.copy(i).invert(),Bo.copy(e.ray).applyMatrix4(ac);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,x=f;g<x;g++){const m=c.getX(g);sr.fromBufferAttribute(u,m),lc(sr,m,l,i,e,t,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,x=f;g<x;g++)sr.fromBufferAttribute(u,g),lc(sr,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=i.length;s<o;s++){const a=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function lc(r,e,t,n,i,s,o){const a=Bo.distanceSqToPoint(r);if(a<t){const l=new C;Bo.closestPointToPoint(r,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,object:o})}}class Ho extends wt{constructor(e,t,n,i,s,o,a,l,c){super(e,t,n,i,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ct extends Tt{constructor(e=1,t=1,n=1,i=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),s=Math.floor(s);const h=[],u=[],d=[],f=[];let g=0;const x=[],m=n/2;let p=0;y(),o===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new lt(u,3)),this.setAttribute("normal",new lt(d,3)),this.setAttribute("uv",new lt(f,2));function y(){const v=new C,E=new C;let b=0;const A=(t-e)/n;for(let N=0;N<=s;N++){const M=[],w=N/s,k=w*(t-e)+e;for(let V=0;V<=i;V++){const j=V/i,L=j*l+a,I=Math.sin(L),F=Math.cos(L);E.x=k*I,E.y=-w*n+m,E.z=k*F,u.push(E.x,E.y,E.z),v.set(I,A,F).normalize(),d.push(v.x,v.y,v.z),f.push(j,1-w),M.push(g++)}x.push(M)}for(let N=0;N<i;N++)for(let M=0;M<s;M++){const w=x[M][N],k=x[M+1][N],V=x[M+1][N+1],j=x[M][N+1];h.push(w,k,j),h.push(k,V,j),b+=6}c.addGroup(p,b,0),p+=b}function _(v){const E=g,b=new Se,A=new C;let N=0;const M=v===!0?e:t,w=v===!0?1:-1;for(let V=1;V<=i;V++)u.push(0,m*w,0),d.push(0,w,0),f.push(.5,.5),g++;const k=g;for(let V=0;V<=i;V++){const L=V/i*l+a,I=Math.cos(L),F=Math.sin(L);A.x=M*F,A.y=m*w,A.z=M*I,u.push(A.x,A.y,A.z),d.push(0,w,0),b.x=I*.5+.5,b.y=F*.5*w+.5,f.push(b.x,b.y),g++}for(let V=0;V<i;V++){const j=E+V,L=k+V;v===!0?h.push(L,L+1,j):h.push(L+1,L,j),N+=3}c.addGroup(p,N,v===!0?1:2),p+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ct(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class mn extends ct{constructor(e=1,t=1,n=32,i=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new mn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Rs extends Tt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],o=[];a(i),c(n),h(),this.setAttribute("position",new lt(s,3)),this.setAttribute("normal",new lt(s.slice(),3)),this.setAttribute("uv",new lt(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const _=new C,v=new C,E=new C;for(let b=0;b<t.length;b+=3)f(t[b+0],_),f(t[b+1],v),f(t[b+2],E),l(_,v,E,y)}function l(y,_,v,E){const b=E+1,A=[];for(let N=0;N<=b;N++){A[N]=[];const M=y.clone().lerp(v,N/b),w=_.clone().lerp(v,N/b),k=b-N;for(let V=0;V<=k;V++)V===0&&N===b?A[N][V]=M:A[N][V]=M.clone().lerp(w,V/k)}for(let N=0;N<b;N++)for(let M=0;M<2*(b-N)-1;M++){const w=Math.floor(M/2);M%2===0?(d(A[N][w+1]),d(A[N+1][w]),d(A[N][w])):(d(A[N][w+1]),d(A[N+1][w+1]),d(A[N+1][w]))}}function c(y){const _=new C;for(let v=0;v<s.length;v+=3)_.x=s[v+0],_.y=s[v+1],_.z=s[v+2],_.normalize().multiplyScalar(y),s[v+0]=_.x,s[v+1]=_.y,s[v+2]=_.z}function h(){const y=new C;for(let _=0;_<s.length;_+=3){y.x=s[_+0],y.y=s[_+1],y.z=s[_+2];const v=m(y)/2/Math.PI+.5,E=p(y)/Math.PI+.5;o.push(v,1-E)}g(),u()}function u(){for(let y=0;y<o.length;y+=6){const _=o[y+0],v=o[y+2],E=o[y+4],b=Math.max(_,v,E),A=Math.min(_,v,E);b>.9&&A<.1&&(_<.2&&(o[y+0]+=1),v<.2&&(o[y+2]+=1),E<.2&&(o[y+4]+=1))}}function d(y){s.push(y.x,y.y,y.z)}function f(y,_){const v=y*3;_.x=e[v+0],_.y=e[v+1],_.z=e[v+2]}function g(){const y=new C,_=new C,v=new C,E=new C,b=new Se,A=new Se,N=new Se;for(let M=0,w=0;M<s.length;M+=9,w+=6){y.set(s[M+0],s[M+1],s[M+2]),_.set(s[M+3],s[M+4],s[M+5]),v.set(s[M+6],s[M+7],s[M+8]),b.set(o[w+0],o[w+1]),A.set(o[w+2],o[w+3]),N.set(o[w+4],o[w+5]),E.copy(y).add(_).add(v).divideScalar(3);const k=m(E);x(b,w+0,y,k),x(A,w+2,_,k),x(N,w+4,v,k)}}function x(y,_,v,E){E<0&&y.x===1&&(o[_]=y.x-1),v.x===0&&v.z===0&&(o[_]=E/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rs(e.vertices,e.indices,e.radius,e.details)}}class Pr extends Rs{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Pr(e.radius,e.detail)}}class An extends Rs{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new An(e.radius,e.detail)}}class ma extends Rs{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ma(e.radius,e.detail)}}class ui extends Tt{constructor(e=.5,t=1,n=32,i=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],h=[];let u=e;const d=(t-e)/i,f=new C,g=new Se;for(let x=0;x<=i;x++){for(let m=0;m<=n;m++){const p=s+m/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let x=0;x<i;x++){const m=x*(n+1);for(let p=0;p<n;p++){const y=p+m,_=y,v=y+n+1,E=y+n+2,b=y+1;a.push(_,v,b),a.push(v,E,b)}}this.setIndex(a),this.setAttribute("position",new lt(l,3)),this.setAttribute("normal",new lt(c,3)),this.setAttribute("uv",new lt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ui(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class ht extends Tt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new C,d=new C,f=[],g=[],x=[],m=[];for(let p=0;p<=n;p++){const y=[],_=p/n;let v=0;p===0&&o===0?v=.5/t:p===n&&l===Math.PI&&(v=-.5/t);for(let E=0;E<=t;E++){const b=E/t;u.x=-e*Math.cos(i+b*s)*Math.sin(o+_*a),u.y=e*Math.cos(o+_*a),u.z=e*Math.sin(i+b*s)*Math.sin(o+_*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),x.push(d.x,d.y,d.z),m.push(b+v,1-_),y.push(c++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<t;y++){const _=h[p][y+1],v=h[p][y],E=h[p+1][y],b=h[p+1][y+1];(p!==0||o>0)&&f.push(_,v,b),(p!==n-1||l<Math.PI)&&f.push(v,E,b)}this.setIndex(f),this.setAttribute("position",new lt(g,3)),this.setAttribute("normal",new lt(x,3)),this.setAttribute("uv",new lt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ht(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ga extends Tt{constructor(e=1,t=.4,n=12,i=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],h=new C,u=new C,d=new C;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){const x=g/i*s,m=f/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(x),u.y=(e+t*Math.cos(m))*Math.sin(x),u.z=t*Math.sin(m),a.push(u.x,u.y,u.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){const x=(i+1)*f+g-1,m=(i+1)*(f-1)+g-1,p=(i+1)*(f-1)+g,y=(i+1)*f+g;o.push(x,m,y),o.push(m,p,y)}this.setIndex(o),this.setAttribute("position",new lt(a,3)),this.setAttribute("normal",new lt(l,3)),this.setAttribute("uv",new lt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ga(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class z0 extends Ht{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Yn extends hn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ia,this.normalScale=new Se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class In extends Yn{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Se(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Lt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ue(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ue(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ue(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class B0 extends hn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ia,this.normalScale=new Se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Qo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function rr(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function H0(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function G0(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function cc(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,o=0;o!==n;++s){const a=t[s]*e;for(let l=0;l!==e;++l)i[o++]=r[a+l]}return i}function Fh(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let o=s[n];if(o!==void 0)if(Array.isArray(o))do o=s[n],o!==void 0&&(e.push(s.time),t.push.apply(t,o)),s=r[i++];while(s!==void 0);else if(o.toArray!==void 0)do o=s[n],o!==void 0&&(e.push(s.time),o.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do o=s[n],o!==void 0&&(e.push(s.time),t.push(o)),s=r[i++];while(s!==void 0)}class Cs{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(s=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=s)){const a=t[1];e<a&&(n=2,s=a);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let o=0;o!==i;++o)t[o]=n[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class V0 extends Cs{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Fi,endingEnd:Fi}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,o=e+1,a=i[s],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Oi:s=e,a=2*t-n;break;case gr:s=i.length-2,a=t+i[s]-i[s+1];break;default:s=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Oi:o=e,l=2*n-t;break;case gr:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),x=g*g,m=x*g,p=-d*m+2*d*x-d*g,y=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*g+1,_=(-1-f)*m+(1.5+f)*x+.5*g,v=f*m-f*x;for(let E=0;E!==a;++E)s[E]=p*o[h+E]+y*o[c+E]+_*o[l+E]+v*o[u+E];return s}}class Oh extends Cs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)s[d]=o[c+d]*u+o[l+d]*h;return s}}class W0 extends Cs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class _n{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=rr(t,this.TimeBufferType),this.values=rr(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:rr(e.times,Array),values:rr(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new W0(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Oh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new V0(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Es:t=this.InterpolantFactoryMethodDiscrete;break;case Yi:t=this.InterpolantFactoryMethodLinear;break;case qr:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Es;case this.InterpolantFactoryMethodLinear:return Yi;case this.InterpolantFactoryMethodSmooth:return qr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let s=0,o=i-1;for(;s!==i&&n[s]<e;)++s;for(;o!==-1&&n[o]>t;)--o;if(++o,s!==0||o!==i){s>=o&&(o=Math.max(o,1),s=o-1);const a=this.getValueSize();this.times=n.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&H0(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===qr,s=e.length-1;let o=1;for(let a=1;a<s;++a){let l=!1;const c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(i)l=!0;else{const u=a*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){const x=t[u+g];if(x!==t[d+g]||x!==t[f+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(s>0){e[o]=e[s];for(let a=s*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}_n.prototype.TimeBufferType=Float32Array;_n.prototype.ValueBufferType=Float32Array;_n.prototype.DefaultInterpolation=Yi;class rs extends _n{}rs.prototype.ValueTypeName="bool";rs.prototype.ValueBufferType=Array;rs.prototype.DefaultInterpolation=Es;rs.prototype.InterpolantFactoryMethodLinear=void 0;rs.prototype.InterpolantFactoryMethodSmooth=void 0;class zh extends _n{}zh.prototype.ValueTypeName="color";class Qi extends _n{}Qi.prototype.ValueTypeName="number";class q0 extends Cs{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let h=c+a;c!==h;c+=4)nn.slerpFlat(s,0,o,c-a,o,c,l);return s}}class mi extends _n{InterpolantFactoryMethodLinear(e){return new q0(this.times,this.values,this.getValueSize(),e)}}mi.prototype.ValueTypeName="quaternion";mi.prototype.DefaultInterpolation=Yi;mi.prototype.InterpolantFactoryMethodSmooth=void 0;class os extends _n{}os.prototype.ValueTypeName="string";os.prototype.ValueBufferType=Array;os.prototype.DefaultInterpolation=Es;os.prototype.InterpolantFactoryMethodLinear=void 0;os.prototype.InterpolantFactoryMethodSmooth=void 0;class es extends _n{}es.prototype.ValueTypeName="vector";class Go{constructor(e,t=-1,n,i=na){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=cn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(j0(n[o]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,o=n.length;s!==o;++s)t.push(_n.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,o=[];for(let a=0;a<s;a++){let l=[],c=[];l.push((a+s-1)%s,a,(a+1)%s),c.push(0,1,0);const h=G0(l);l=cc(l,1,h),c=cc(c,1,h),!i&&l[0]===0&&(l.push(s),c.push(c[0])),o.push(new Qi(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],h=c.name.match(s);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,g,x){if(f.length!==0){const m=[],p=[];Fh(f,m,p,g),m.length!==0&&x.push(new u(d,m,p))}},i=[],s=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let x=0;x<d[g].morphTargets.length;x++)f[d[g].morphTargets[x]]=-1;for(const x in f){const m=[],p=[];for(let y=0;y!==d[g].morphTargets.length;++y){const _=d[g];m.push(_.time),p.push(_.morphTarget===x?1:0)}i.push(new Qi(".morphTargetInfluence["+x+"]",m,p))}l=f.length*o}else{const f=".bones["+t[u].name+"]";n(es,f+".position",d,"pos",i),n(mi,f+".quaternion",d,"rot",i),n(es,f+".scale",d,"scl",i)}}return i.length===0?null:new this(s,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function X0(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Qi;case"vector":case"vector2":case"vector3":case"vector4":return es;case"color":return zh;case"quaternion":return mi;case"bool":case"boolean":return rs;case"string":return os}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function j0(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=X0(r.type);if(r.times===void 0){const t=[],n=[];Fh(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}const qn={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};class $0{constructor(e,t,n){const i=this;let s=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){a++,s===!1&&i.onStart!==void 0&&i.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const Y0=new $0;class as{constructor(e){this.manager=e!==void 0?e:Y0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}as.DEFAULT_MATERIAL_NAME="__DEFAULT";const En={};class K0 extends Error{constructor(e,t){super(e),this.response=t}}class Bh extends as{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=qn.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(En[e]!==void 0){En[e].push({onLoad:t,onProgress:n,onError:i});return}En[e]=[],En[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=En[e],u=c.body.getReader(),d=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),f=d?parseInt(d):0,g=f!==0;let x=0;const m=new ReadableStream({start(p){y();function y(){u.read().then(({done:_,value:v})=>{if(_)p.close();else{x+=v.byteLength;const E=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:f});for(let b=0,A=h.length;b<A;b++){const N=h[b];N.onProgress&&N.onProgress(E)}p.enqueue(v),y()}})}}});return new Response(m)}else throw new K0(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return c.json();default:if(a===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{qn.add(e,c);const h=En[e];delete En[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=En[e];if(h===void 0)throw this.manager.itemError(e),c;delete En[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class J0 extends as{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=qn.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o;const a=Ts("img");function l(){h(),qn.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(u){h(),i&&i(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class Hh extends as{constructor(e){super(e)}load(e,t,n,i){const s=new wt,o=new J0(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class Ir extends ut{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ue(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class Z0 extends Ir{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ut.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ue(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const vo=new We,hc=new C,uc=new C;class xa{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Se(512,512),this.map=null,this.mapPass=null,this.matrix=new We,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new aa,this._frameExtents=new Se(1,1),this._viewportCount=1,this._viewports=[new nt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;hc.setFromMatrixPosition(e.matrixWorld),t.position.copy(hc),uc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(uc),t.updateMatrixWorld(),vo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(vo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Q0 extends xa{constructor(){super(new Pt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Ki*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class ex extends Ir{constructor(e,t,n=0,i=Math.PI/3,s=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ut.DEFAULT_UP),this.updateMatrix(),this.target=new ut,this.distance=n,this.angle=i,this.penumbra=s,this.decay=o,this.map=null,this.shadow=new Q0}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const dc=new We,gs=new C,yo=new C;class tx extends xa{constructor(){super(new Pt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Se(4,2),this._viewportCount=6,this._viewports=[new nt(2,1,1,1),new nt(0,1,1,1),new nt(3,1,1,1),new nt(1,1,1,1),new nt(3,0,1,1),new nt(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),gs.setFromMatrixPosition(e.matrixWorld),n.position.copy(gs),yo.copy(n.position),yo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(yo),n.updateMatrixWorld(),i.makeTranslation(-gs.x,-gs.y,-gs.z),dc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(dc)}}class Gh extends Ir{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new tx}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class nx extends xa{constructor(){super(new Cr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Vh extends Ir{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ut.DEFAULT_UP),this.updateMatrix(),this.target=new ut,this.shadow=new nx}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class ws{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class ix extends as{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=qn.get(e);if(o!==void 0){if(s.manager.itemStart(e),o.then){o.then(c=>{t&&t(c),s.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return qn.add(e,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),qn.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});qn.add(e,l),s.manager.itemStart(e)}}class sx{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=fc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=fc();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function fc(){return(typeof performance>"u"?Date:performance).now()}class rx{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,o;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[s+a]=n[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(n,s,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-s,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,o=i;s!==o;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let o=0;o!==s;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){nn.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const o=this._workIndex*s;nn.multiplyQuaternionsFlat(e,o,e,t,e,n),nn.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,s){const o=1-i;for(let a=0;a!==s;++a){const l=t+a;e[l]=e[l]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,s){for(let o=0;o!==s;++o){const a=t+o;e[a]=e[a]+e[n+o]*i}}}const _a="\\[\\]\\.:\\/",ox=new RegExp("["+_a+"]","g"),va="[^"+_a+"]",ax="[^"+_a.replace("\\.","")+"]",lx=/((?:WC+[\/:])*)/.source.replace("WC",va),cx=/(WCOD+)?/.source.replace("WCOD",ax),hx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",va),ux=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",va),dx=new RegExp("^"+lx+cx+hx+ux+"$"),fx=["material","materials","bones","map"];class px{constructor(e,t,n){const i=n||Ze.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class Ze{constructor(e,t,n){this.path=t,this.parsedPath=n||Ze.parseTrackName(t),this.node=Ze.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new Ze.Composite(e,t,n):new Ze(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(ox,"")}static parseTrackName(e){const t=dx.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);fx.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let o=0;o<s.length;o++){const a=s[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=Ze.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}Ze.Composite=px;Ze.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ze.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ze.prototype.GetterByBindingType=[Ze.prototype._getValue_direct,Ze.prototype._getValue_array,Ze.prototype._getValue_arrayElement,Ze.prototype._getValue_toArray];Ze.prototype.SetterByBindingTypeAndVersioning=[[Ze.prototype._setValue_direct,Ze.prototype._setValue_direct_setNeedsUpdate,Ze.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ze.prototype._setValue_array,Ze.prototype._setValue_array_setNeedsUpdate,Ze.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ze.prototype._setValue_arrayElement,Ze.prototype._setValue_arrayElement_setNeedsUpdate,Ze.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ze.prototype._setValue_fromArray,Ze.prototype._setValue_fromArray_setNeedsUpdate,Ze.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class mx{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,o=s.length,a=new Array(o),l={endingStart:Fi,endingEnd:Fi};for(let c=0;c!==o;++c){const h=s[c].createInterpolant(null);a[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=uh,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,s=e._clip.duration,o=s/i,a=i/s;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=s,l[1]=s+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const l=(e-s)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case Qu:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulateAdditive(a);break;case na:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(o),c[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const o=n===Zu;if(e===0)return s===-1?i:o&&(s&1)===1?t-i:i;if(n===hh){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){const a=Math.floor(i/t);i-=t*a,s+=Math.abs(a);const l=this.repetitions-s;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=Oi,i.endingEnd=Oi):(e?i.endingStart=this.zeroSlopeAtStart?Oi:Fi:i.endingStart=gr,t?i.endingEnd=this.zeroSlopeAtEnd?Oi:Fi:i.endingEnd=gr)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,l=o.sampleValues;return a[0]=s,l[0]=t,a[1]=s+e,l[1]=n,this}}const gx=new Float32Array(1);class xx extends _i{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==s;++u){const d=i[u],f=d.name;let g=h[f];if(g!==void 0)++g.referenceCount,o[u]=g;else{if(g=o[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,f));continue}const x=t&&t._propertyBindings[u].binding.parsedPath;g=new rx(Ze.create(n,f,x),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,f),o[u]=g}a[u].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let o=s[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,o=this._actionsByClip,a=o[s],l=a.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const u=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete o[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,o=this._bindingsByRootAndName,a=o[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[s],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Oh(new Float32Array(2),new Float32Array(2),1,gx),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let o=typeof e=="string"?Go.findByName(i,e):e;const a=o!==null?o.uuid:e,l=this._actionsByClip[a];let c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=na),l!==void 0){const u=l.actionByRoot[s];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;const h=new mx(this,o,t,n);return this._bindAction(h,c),this._addInactiveAction(h,a,s),h}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?Go.findByName(n,e):e,o=s?s.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,s,o);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const o=s.knownActions;for(let a=0,l=o.length;a!==l;++a){const c=o[a];this._deactivateAction(c);const h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const o in s){const a=s[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class _x{constructor(e,t,n=0,i=1/0){this.ray=new As(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new oa,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return Vo(e,this,n,t),n.sort(pc),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)Vo(e[i],this,n,t);return n.sort(pc),n}}function pc(r,e){return r.distance-e.distance}function Vo(r,e,t,n){if(r.layers.test(e.layers)&&r.raycast(e,t),n===!0){const i=r.children;for(let s=0,o=i.length;s<o;s++)Vo(i[s],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Zo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Zo);const Y={meta:{title:"HERO X",subtitle:"모험의 던전",version:"1.8.1",school:"창릉초등학교"},controls:{up:["KeyW","ArrowUp"],down:["KeyS","ArrowDown"],left:["KeyA","ArrowLeft"],right:["KeyD","ArrowRight"],attackMelee:["Mouse0","KeyJ"],attackRanged:["Mouse2","KeyK"],jump:["Space"],dodge:["ShiftLeft","ShiftRight","KeyL"],restart:["KeyR"],toggleGuide:["KeyH"],toggleInventory:["KeyI","Tab"],interact:["KeyE","KeyF"]},player:{maxHp:100,invulnerableTime:.6,hitKnockback:6,moveSpeed:7,attackMoveFactor:.6,dash:{speed:20,duration:.22,cooldown:.9,invulnerable:!0},jumpSpeed:8,gravity:24,climbAssist:1,turnSpeed:14,radius:.5,startPosition:{x:0,z:0},colors:{body:"#2f6df6",accent:"#ffc531",skin:"#f3c6a0",visor:"#5cf2d8"}},combat:{autoAimRange:14,melee:{damage:12,range:1.9,arcDegrees:110,cooldown:.34,knockback:7,swingTime:.22},ranged:{damage:8,speed:22,cooldown:.5,lifetime:1.6,radius:.18,knockback:3}},enemies:{types:{rusher:{name:"고블린 전사",hp:30,speed:4.2,radius:.55,damage:10,attackRange:1.5,attackWindup:.35,attackCooldown:1.3,aggroRange:20,color:"#ff7a45",score:10},shooter:{name:"유령 마법사",hp:20,speed:3.2,radius:.5,damage:8,attackRange:9,attackWindup:.5,attackCooldown:2.2,aggroRange:22,color:"#b06bff",score:15,attackKind:"ranged",retreatRange:4.5,projectileSpeed:11},tank:{name:"트롤 거인",hp:90,speed:1.9,radius:.9,damage:18,attackRange:2,attackWindup:.6,attackCooldown:2,aggroRange:16,color:"#5b7bd6",score:30,knockbackResist:.25},stalker:{name:"동굴 박쥐",hp:18,speed:7.5,radius:.45,damage:7,attackRange:1.3,attackWindup:.25,attackCooldown:.9,aggroRange:16,color:"#8e6cff",score:14,attackKind:"melee",model:"shooter"},artillery:{name:"돌 골렘",hp:70,speed:1.6,radius:.8,damage:16,attackRange:13,attackWindup:.9,attackCooldown:2.2,aggroRange:18,color:"#c0392b",score:40,attackKind:"ranged",retreatRange:5,projectileSpeed:12,knockbackResist:.4,model:"tank"}},spawns:[{type:"rusher",x:12,z:-12},{type:"rusher",x:-14,z:-6},{type:"rusher",x:16,z:6},{type:"rusher",x:-10,z:16},{type:"rusher",x:4,z:20},{type:"rusher",x:-20,z:-18},{type:"shooter",x:18,z:-2},{type:"shooter",x:-6,z:-22},{type:"shooter",x:20,z:18},{type:"tank",x:-22,z:12},{type:"tank",x:10,z:-22}],separation:2.5,deathDuration:.6},camera:{fov:50,offset:{x:0,y:13,z:11},lookAtHeight:1,smoothing:6,near:.1,far:300},world:{arenaHalfSize:28,floorColor:"#79b85a",floorAltColor:"#6fae50",wallHeight:1.2,wallColor:"#a6773f",backgroundColor:"#8ec9ff",fogNear:40,fogFar:90,obstacles:[{x:6,z:-4,w:2,d:2,h:2,color:"#d9a066"},{x:8.2,z:-4,w:2,d:2,h:2,color:"#d9a066"},{x:7,z:-6.2,w:2,d:2,h:1.4,color:"#e0ad6c"},{x:-8,z:-8,w:1.2,d:1.2,h:4,color:"#9aa3b2"},{x:-8,z:8,w:1.2,d:1.2,h:4,color:"#9aa3b2"},{x:8,z:8,w:1.2,d:1.2,h:4,color:"#9aa3b2"},{x:0,z:-14,w:10,d:1,h:1.6,color:"#a6773f"},{x:-16,z:2,w:1,d:8,h:1.6,color:"#a6773f"},{x:14,z:14,w:3,d:3,h:2.5,color:"#7f8795"},{x:-14,z:-16,w:2.5,d:2.5,h:2,color:"#7f8795"}]},graphics:{shadows:!0,maxPixelRatio:2,antialias:!0,shadowMapSize:2048,bloom:{strength:.42,radius:.35,threshold:.85}},difficulty:{default:"normal",presets:{easy:{label:"쉬움",enemyHp:.8,enemyDamage:.7,enemySpeed:.9},normal:{label:"보통",enemyHp:1.15,enemyDamage:1.1,enemySpeed:1},hard:{label:"어려움",enemyHp:1.6,enemyDamage:1.6,enemySpeed:1.15}}},loot:{healChance:.25,healAmount:25,goldChance:.6,goldMin:3,goldMax:12,xpPerScore:1,lifetime:20,magnetRange:3.5,magnetSpeed:6,pickupRadius:.9},dungeon:{name:"잊혀진 숲",chests:[{x:-22,z:-4},{x:12,z:2},{x:-4,z:24}],autoAdvanceSeconds:6,chestLoot:{goldMin:15,goldMax:40,equipChance:.8,healChance:.5,interactRange:2.2}},boss:{name:"숲의 수호 로봇",hp:420,speed:2.8,radius:1.6,color:"#3f8f5f",score:300,knockbackResist:.1,spawn:{x:0,z:-20},contactDamage:22,engageRange:11,chargeMinRange:5,windup:{charge:.8,slam:.7,barrage:.6,summon:.9,mortar:.8},closePatterns:["slam","barrage"],useCharge:!0,model:"guardian",chargeDuration:.55,recover:.7,cooldown:1.3,phase2Ratio:.5,phase2TimeMul:.7,phase2SpeedMul:1.3,charge:{speed:18},slam:{radius:4.5,damage:26},barrage:{count:8,phase2Count:12,damage:10,speed:9},summon:{type:"stalker",count:2,phase2Count:3,maxAlive:4},mortar:{count:3,phase2Count:5,delay:1.1,radius:2.4,damage:18,spread:3.5},reward:{goldMin:80,goldMax:150,xp:120,equipMinRarity:"rare"}},equipment:{dropChance:.3,inventorySize:20,defenseScale:50,rarities:{common:{label:"일반",prefix:"",statMul:1,weight:55,color:"#cdd6f4"},uncommon:{label:"고급",prefix:"튼튼한",statMul:1.3,weight:25,color:"#7dffb0"},rare:{label:"희귀",prefix:"희귀한",statMul:1.7,weight:13,color:"#5b8dff"},epic:{label:"영웅",prefix:"영웅의",statMul:2.2,weight:5,color:"#c77dff"},legendary:{label:"전설",prefix:"전설의",statMul:3,weight:2,color:"#ffc531"}}},progression:{xpBase:40,xpGrowth:1.35,hpPerLevel:10,damagePerLevel:.08,maxLevel:30,levelUpHealRatio:.5},hud:{showDamageNumbers:!0},juice:{hitShake:{amp:.25,duration:.25},slamShake:{amp:.5,duration:.4},hitStop:{duration:.06,timeScale:.1},bossHitStop:.35},performance:{autoQualityInterval:6,autoQualityFps:30,maxStep:.05},save:{autoSaveInterval:3},debug:{showFps:!0}},vx={"player.maxHp":{min:1,max:9999},"player.invulnerableTime":{min:0,max:5},"player.hitKnockback":{min:0,max:50},"player.moveSpeed":{min:1,max:30},"player.attackMoveFactor":{min:0,max:1},"player.jumpSpeed":{min:1,max:30},"player.gravity":{min:1,max:100},"player.climbAssist":{min:0,max:3},"dungeon.autoAdvanceSeconds":{min:0,max:60},"player.dash.speed":{min:1,max:60},"player.dash.duration":{min:.05,max:2},"player.dash.cooldown":{min:0,max:10},"combat.autoAimRange":{min:2,max:60},"boss.summon.count":{min:0,max:10},"boss.summon.maxAlive":{min:0,max:20},"boss.mortar.count":{min:0,max:20},"boss.mortar.delay":{min:.3,max:5},"boss.mortar.radius":{min:.5,max:10},"boss.mortar.damage":{min:0,max:999},"combat.ranged.damage":{min:1,max:9999},"combat.ranged.speed":{min:1,max:100},"combat.ranged.cooldown":{min:.05,max:5},"combat.ranged.lifetime":{min:.1,max:10},"combat.ranged.radius":{min:.05,max:2},"combat.ranged.knockback":{min:0,max:50},"player.turnSpeed":{min:1,max:40},"player.radius":{min:.2,max:2},"combat.melee.damage":{min:1,max:9999},"combat.melee.range":{min:.5,max:10},"combat.melee.arcDegrees":{min:10,max:360},"combat.melee.cooldown":{min:.05,max:5},"combat.melee.knockback":{min:0,max:50},"combat.melee.swingTime":{min:.05,max:2},"enemies.separation":{min:0,max:20},"loot.healChance":{min:0,max:1},"loot.healAmount":{min:1,max:9999},"loot.goldChance":{min:0,max:1},"loot.goldMin":{min:0,max:99999},"loot.goldMax":{min:0,max:99999},"loot.xpPerScore":{min:.1,max:100},"loot.lifetime":{min:1,max:600},"loot.magnetRange":{min:0,max:30},"loot.magnetSpeed":{min:0,max:50},"loot.pickupRadius":{min:.2,max:5},"dungeon.chestLoot.goldMin":{min:0,max:99999},"dungeon.chestLoot.goldMax":{min:0,max:99999},"dungeon.chestLoot.equipChance":{min:0,max:1},"dungeon.chestLoot.healChance":{min:0,max:1},"dungeon.chestLoot.interactRange":{min:.5,max:10},"boss.hp":{min:1,max:99999},"boss.speed":{min:0,max:30},"boss.radius":{min:.5,max:6},"boss.contactDamage":{min:0,max:9999},"boss.engageRange":{min:1,max:60},"boss.chargeMinRange":{min:0,max:60},"boss.chargeDuration":{min:.1,max:5},"boss.recover":{min:0,max:5},"boss.cooldown":{min:0,max:10},"boss.phase2Ratio":{min:0,max:1},"boss.phase2TimeMul":{min:.2,max:1},"boss.phase2SpeedMul":{min:1,max:3},"boss.charge.speed":{min:1,max:60},"boss.slam.radius":{min:.5,max:30},"boss.slam.damage":{min:0,max:9999},"boss.barrage.count":{min:1,max:64},"boss.barrage.phase2Count":{min:1,max:64},"boss.barrage.damage":{min:0,max:9999},"boss.barrage.speed":{min:1,max:60},"equipment.dropChance":{min:0,max:1},"equipment.inventorySize":{min:1,max:200},"equipment.defenseScale":{min:1,max:1e3},"progression.xpBase":{min:1,max:99999},"progression.xpGrowth":{min:1,max:3},"progression.hpPerLevel":{min:0,max:1e3},"progression.damagePerLevel":{min:0,max:1},"progression.maxLevel":{min:1,max:999},"save.autoSaveInterval":{min:.5,max:600},"performance.autoQualityInterval":{min:2,max:60},"performance.autoQualityFps":{min:10,max:60},"performance.maxStep":{min:.01,max:.1},"juice.hitShake.amp":{min:0,max:2},"juice.slamShake.amp":{min:0,max:3},"juice.hitStop.duration":{min:0,max:.5},"juice.hitStop.timeScale":{min:0,max:1},"juice.bossHitStop":{min:0,max:2},"progression.levelUpHealRatio":{min:0,max:1},"enemies.deathDuration":{min:0,max:5},"camera.fov":{min:30,max:90},"camera.offset.y":{min:3,max:40},"camera.offset.z":{min:0,max:40},"camera.smoothing":{min:.5,max:30},"world.arenaHalfSize":{min:10,max:200},"graphics.maxPixelRatio":{min:1,max:3},"graphics.bloom.strength":{min:0,max:3},"graphics.bloom.radius":{min:0,max:1},"graphics.bloom.threshold":{min:0,max:2}},yx={hp:{min:1,max:99999},speed:{min:0,max:30},radius:{min:.2,max:5},damage:{min:0,max:9999},attackRange:{min:.3,max:30},attackWindup:{min:0,max:5},attackCooldown:{min:.1,max:20},aggroRange:{min:1,max:200},score:{min:0,max:99999}},Mo=(r,e,t)=>typeof r=="number"&&!Number.isNaN(r)?Math.min(t,Math.max(e,r)):e;function Mx(r){const e=[];for(const[t,{min:n,max:i}]of Object.entries(vx)){const s=t.split(".");let o=r;for(let h=0;h<s.length-1;h++)o=o?.[s[h]];const a=s[s.length-1];if(!o||typeof o!="object")continue;const l=o[a],c=Mo(l,n,i);c!==l&&(o[a]=c,e.push({path:t,from:typeof l=="number"?l:NaN,to:c}))}for(const[t,n]of Object.entries(r.difficulty.presets))for(const i of["enemyHp","enemyDamage","enemySpeed"]){const s=n[i],o=Mo(s,.1,5);o!==s&&(n[i]=o,e.push({path:`difficulty.presets.${t}.${i}`,from:typeof s=="number"?s:NaN,to:o}))}for(const[t,n]of Object.entries(r.enemies.types))for(const[i,{min:s,max:o}]of Object.entries(yx)){const a=i,l=n[a],c=Mo(l,s,o);c!==l&&(n[a]=c,e.push({path:`enemies.types.${t}.${i}`,from:typeof l=="number"?l:NaN,to:c}))}return e}function Wh(r,e,t=0){return r.h!==void 0&&e>=r.h-t}const gi=(r,e,t)=>Math.max(e,Math.min(t,r));function bx(r,e=0){const t=Math.hypot(r.x,r.z);if(t<1e-6)return{x:0,z:0};const n=r.x/t,i=r.z/t,s=Math.cos(e),o=Math.sin(e);return{x:n*s+i*o,z:-n*o+i*s}}function ya(r,e,t,n=0,i=0){const s={x:r.x,z:r.z};for(const o of t){if(Wh(o,n,i))continue;const a=o.w/2,l=o.d/2,c=gi(s.x,o.x-a,o.x+a),h=gi(s.z,o.z-l,o.z+l),u=s.x-c,d=s.z-h,f=u*u+d*d;if(!(f>=e*e))if(f<1e-9){const g=a+e-Math.abs(s.x-o.x),x=l+e-Math.abs(s.z-o.z);g<x?s.x+=Math.sign(s.x-o.x||1)*g:s.z+=Math.sign(s.z-o.z||1)*x}else{const g=Math.sqrt(f);s.x=c+u/g*e,s.z=h+d/g*e}}return s}function Ma(r,e,t){const n=Math.max(0,e-t);return{x:gi(r.x,-n,n),z:gi(r.z,-n,n)}}function ba(r,e,t){let n=(e-r)%(Math.PI*2);return n>Math.PI&&(n-=Math.PI*2),n<-Math.PI&&(n+=Math.PI*2),r+n*gi(t,0,1)}function Dr(r){return Math.atan2(r.x,r.z)}function Sx(r,e,t,n){if(Math.abs(r.x)>n||Math.abs(r.z)>n)return!0;for(const i of t){const s=gi(r.x,i.x-i.w/2,i.x+i.w/2),o=gi(r.z,i.z-i.d/2,i.z+i.d/2);if((r.x-s)**2+(r.z-o)**2<e*e)return!0}return!1}function wx(r,e,t,n,i=0){let s=0;const o=e*.5;for(const a of t)a.h===void 0||a.h<=s||Wh(a,n,i)&&Math.abs(r.x-a.x)<=a.w/2+o&&Math.abs(r.z-a.z)<=a.d/2+o&&(s=a.h);return s}function Ex(r,e,t,n=0){let i=r.y+r.vy*e-.5*t*e*e,s=r.vy-t*e;return i<=n&&(i=n,s=0),{y:i,vy:s}}function Tx(){return{timer:0,cooldown:0,dir:{x:0,z:1}}}function Ax(r,e,t,n){if(r.timer>0||r.cooldown>0)return!1;const i=Math.hypot(e.x,e.z);return r.dir=i>1e-6?{x:e.x/i,z:e.z/i}:{x:0,z:1},r.timer=t,r.cooldown=n,!0}function Rx(r,e){r.timer>0&&(r.timer=Math.max(0,r.timer-e)),r.cooldown>0&&(r.cooldown=Math.max(0,r.cooldown-e))}function Cx(r,e,t,n,i,s){const o=t.x-r.x,a=t.z-r.z,l=Math.hypot(o,a);if(l-n>i)return!1;if(l<1e-6)return!0;let h=Math.atan2(o,a)-e;for(;h>Math.PI;)h-=Math.PI*2;for(;h<-Math.PI;)h+=Math.PI*2;const u=Math.atan2(n,l),d=s*Math.PI/180/2;return Math.abs(h)<=d+u}class Lx{constructor(e,t,n,i,s,o,a=()=>{},l=()=>1,c=()=>0){this.player=e,this.input=t,this.getEnemies=n,this.getAimPoint=i,this.effects=s,this.projectiles=o,this.onEnemyDamaged=a,this.getDamageMultiplier=l,this.getWeaponAttack=c,this.kills=0,this.score=0,this.meleeCooldown=0,this.rangedCooldown=0,this.onAttack=null,this.tmp=new C,this.attacks=0,this.meleeQueued=!1,this.rangedQueued=!1,this.pressAttached=!1}reset(){this.kills=0,this.score=0,this.meleeCooldown=0,this.rangedCooldown=0}update(e){if(!this.pressAttached){this.pressAttached=!0;const n=Y.controls;this.input.onPress(n.attackMelee,()=>this.meleeQueued=!0),this.input.onPress(n.attackRanged,()=>this.rangedQueued=!0)}if(this.meleeCooldown>0&&(this.meleeCooldown-=e),this.rangedCooldown>0&&(this.rangedCooldown-=e),this.player.health.isDead){this.meleeQueued=this.rangedQueued=!1;return}const t=Y.controls;this.meleeCooldown<=0&&(this.input.isActionDown(t.attackMelee)||this.meleeQueued)?(this.meleeQueued=!1,this.meleeAttack()):this.rangedCooldown<=0&&(this.input.isActionDown(t.attackRanged)||this.rangedQueued)&&(this.rangedQueued=!1,this.rangedAttack())}damageEnemy(e,t,n,i){if(!e.alive||!e.hit(t,n,i))return!1;const s=e.position;return this.tmp.set(s.x,.8,s.z),e.alive?this.effects.burst(this.tmp,16777215,5,3):(this.effects.burst(this.tmp,e.def.color,18,7),this.kills++,this.score+=e.def.score),this.onEnemyDamaged(e,t,!e.alive),!0}faceAim(){const e=this.player.position,t=this.getAimPoint();if(t){const n={x:t.x-e.x,z:t.z-e.z};Math.hypot(n.x,n.z)>.25&&(this.player.facing=Dr(n))}return{x:Math.sin(this.player.facing),z:Math.cos(this.player.facing)}}meleeAttack(){const e=Y.combat.melee;this.meleeCooldown=e.cooldown,this.attacks++,this.onAttack?.("melee"),this.faceAim();const t=this.player.position;this.player.triggerAttack(e.swingTime),this.effects.swing(t,this.player.facing,e.range,e.arcDegrees,e.swingTime);const n={x:t.x,z:t.z};for(const i of this.getEnemies()){if(!i.alive)continue;const s=i.position;if(!Cx(n,this.player.facing,{x:s.x,z:s.z},i.radius,e.range,e.arcDegrees))continue;const o=Math.hypot(s.x-t.x,s.z-t.z)||1;this.damageEnemy(i,Math.round((e.damage+this.getWeaponAttack("melee"))*this.getDamageMultiplier()),{x:(s.x-t.x)/o,z:(s.z-t.z)/o},e.knockback)}}rangedAttack(){const e=Y.combat.ranged;this.rangedCooldown=e.cooldown,this.attacks++,this.onAttack?.("ranged");const t=this.faceAim(),n=this.player.position;this.player.triggerAttack(.15),this.projectiles.spawn({x:n.x+t.x*.7,z:n.z+t.z*.7},t,{damage:Math.round((e.damage+this.getWeaponAttack("ranged"))*this.getDamageMultiplier()),speed:e.speed,lifetime:e.lifetime,radius:e.radius,knockback:e.knockback,color:6091480,friendly:!0})}}function fe(r){const e=new Yn({color:new ue(r.color),roughness:r.roughness??.6,metalness:r.metalness??.1,flatShading:r.flatShading??!1,map:r.map??null,normalMap:r.normalMap??null,transparent:r.transparent??!1,opacity:r.opacity??1});return r.emissive!==void 0&&(e.emissive=new ue(r.emissive),e.emissiveIntensity=r.emissiveIntensity??1),r.normalMap&&r.normalScale!==void 0&&e.normalScale.set(r.normalScale,r.normalScale),e}function jt(r,e=2){const t=new ue(r),n=new Yn({color:t.clone().multiplyScalar(.25),roughness:.4,metalness:0});return n.emissive=t,n.emissiveIntensity=e,n}class Px{constructor(e,t=120){this.root=new Fe,this.swings=[],this.particles=[],this.particleGeo=new xe(.16,.16,.16),this.root.name="Effects",e.add(this.root);for(let n=0;n<t;n++){const i=new oe(this.particleGeo,jt(16777215,1.8));i.visible=!1,this.root.add(i),this.particles.push({mesh:i,v:new C,life:0,max:1})}}swing(e,t,n,i,s,o=6091480){const a=i*Math.PI/180,l=new ui(.45,n,24,1,Math.PI/2-a/2,a),c=new Bt({color:o,transparent:!0,opacity:.75,side:It,depthWrite:!1}),h=new oe(l,c);h.position.set(e.x,.5,e.z),h.rotation.order="YXZ",h.rotation.y=t,h.rotation.x=Math.PI/2,this.root.add(h),this.swings.push({mesh:h,life:s,max:s})}shockwave(e,t,n=.45,i=16732025){const s=new ui(t*.8,t,48),o=new Bt({color:i,transparent:!0,opacity:.8,side:It,depthWrite:!1}),a=new oe(s,o);a.position.set(e.x,.08,e.z),a.rotation.x=-Math.PI/2,a.scale.setScalar(.2),this.root.add(a),this.swings.push({mesh:a,life:n,max:n,grow:!0})}marker(e,t,n,i=16742981){const s=new ui(t*.7,t,40),o=new Bt({color:i,transparent:!0,opacity:.2,side:It,depthWrite:!1}),a=new oe(s,o);a.position.set(e.x,.07,e.z),a.rotation.x=-Math.PI/2,this.root.add(a),this.swings.push({mesh:a,life:n,max:n,grow:!1,warn:!0})}burst(e,t,n=8,i=5){let s=0;for(const o of this.particles){if(o.life>0)continue;o.mesh.visible=!0,o.mesh.position.copy(e);const a=o.mesh.material;if(a.emissive.set(t),a.color.set(t).multiplyScalar(.3),o.v.set(Math.random()-.5,Math.random()*.8+.3,Math.random()-.5).normalize().multiplyScalar(i*(.5+Math.random()*.5)),o.life=o.max=.4+Math.random()*.4,o.mesh.scale.setScalar(.6+Math.random()*.8),++s>=n)break}}update(e){for(let t=this.swings.length-1;t>=0;t--){const n=this.swings[t];n.life-=e;const i=Math.max(0,n.life/n.max);n.warn?(n.mesh.material.opacity=.25+(1-i)*.6*(.7+.3*Math.sin(n.life*25)),n.mesh.scale.setScalar(1)):(n.mesh.material.opacity=.75*i,n.mesh.scale.setScalar(n.grow?.2+(1-i)*.8:1+(1-i)*.15)),n.life<=0&&(this.root.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material.dispose(),this.swings.splice(t,1))}for(const t of this.particles)t.life<=0||(t.life-=e,t.v.y-=16*e,t.mesh.position.addScaledVector(t.v,e),t.mesh.position.y<.08&&(t.mesh.position.y=.08,t.v.y*=-.3,t.v.x*=.7,t.v.z*=.7),t.mesh.rotation.x+=e*6,t.mesh.rotation.z+=e*4,t.mesh.scale.setScalar(Math.max(.01,t.life/t.max)*1.2),t.life<=0&&(t.mesh.visible=!1))}dispose(){this.root.removeFromParent(),this.particleGeo.dispose(),this.particles.forEach(e=>e.mesh.material.dispose()),this.swings.forEach(e=>{e.mesh.geometry.dispose(),e.mesh.material.dispose()})}}const mc=.9,Ix=1;class Dx{constructor(e){this.root=new Fe,this.shots=[],this.geo=new ht(1,10,8),this.root.name="Projectiles",e.add(this.root)}spawn(e,t,n){const i=new oe(this.geo,jt(n.color,2.5));i.position.set(e.x,mc,e.z),i.scale.set(n.radius,n.radius,n.radius*2.2),i.lookAt(e.x+t.x,mc,e.z+t.z),this.root.add(i),this.shots.push({mesh:i,dir:{x:t.x,z:t.z},life:n.lifetime,spec:n})}get count(){return this.shots.length}update(e,t){const n=t.world.getObstacleBoxes(),i=t.world.getArenaHalfSize();for(let s=this.shots.length-1;s>=0;s--){const o=this.shots[s];o.life-=e,o.mesh.position.x+=o.dir.x*o.spec.speed*e,o.mesh.position.z+=o.dir.z*o.spec.speed*e;const a={x:o.mesh.position.x,z:o.mesh.position.z};let l=o.life<=0||Sx(a,o.spec.radius,n,i);if(!l&&o.spec.friendly)for(const c of t.enemies){if(!c.alive)continue;const h=c.radius+o.spec.radius;if((c.position.x-a.x)**2+(c.position.z-a.z)**2<h*h){t.onHitEnemy(c,o.spec,o.dir),l=!0;break}}else if(!l&&t.playerY<Ix){const c=t.playerRadius+o.spec.radius;(t.playerPos.x-a.x)**2+(t.playerPos.z-a.z)**2<c*c&&(t.onHitPlayer(o.spec,o.dir,a),l=!0)}l&&this.remove(s)}}clear(){for(let e=this.shots.length-1;e>=0;e--)this.remove(e)}dispose(){this.clear(),this.geo.dispose(),this.root.removeFromParent()}remove(e){const t=this.shots[e];this.root.remove(t.mesh),t.mesh.material.dispose(),this.shots.splice(e,1)}}class gc{constructor(e,t=Y.dungeon.chests){this.root=new Fe,this.chests=[],this.bodyGeo=new xe(1.2,.7,.8),this.lidGeo=new xe(1.24,.3,.84),this.woodMat=fe({color:11893050}),this.trimMat=fe({color:16765503,roughness:.3,metalness:.9}),this.openedMat=fe({color:7031334}),this.root.name="Chests",e.add(this.root);for(const n of t)this.place(n.x,n.z)}place(e,t){const n=new Fe;n.position.set(e,0,t);const i=new oe(this.bodyGeo,this.woodMat);i.position.y=.35,i.castShadow=!0,i.receiveShadow=!0,n.add(i);const s=new oe(new xe(.2,.72,.84),this.trimMat);s.position.y=.35,n.add(s);const o=new oe(this.lidGeo,this.woodMat);o.position.set(0,.15,.42),o.castShadow=!0;const a=new Fe;a.position.set(0,.7,-.42),a.add(o),n.add(a),this.root.add(n),this.chests.push({root:n,lid:o,x:e,z:t,opened:!1,openT:0})}getCollisionBoxes(){return this.chests.map(e=>({x:e.x,z:e.z,w:1.3,d:.9}))}nearest(e,t=Y.dungeon.chestLoot.interactRange){let n=null,i=t;for(const s of this.chests){if(s.opened)continue;const o=Math.hypot(s.x-e.x,s.z-e.z);o<i&&(i=o,n=s)}return n}open(e){return e.opened?!1:(e.opened=!0,!0)}get openedCount(){return this.chests.filter(e=>e.opened).length}get total(){return this.chests.length}update(e){for(const t of this.chests){const n=t.opened?1:0;t.openT!==n&&(t.openT+=(n-t.openT)*(1-Math.exp(-8*e)),Math.abs(n-t.openT)<.01&&(t.openT=n),t.lid.parent.rotation.x=-t.openT*1.9,t.opened&&t.openT>.5&&t.lid.material!==this.openedMat&&(t.lid.material=this.openedMat))}}reset(){for(const e of this.chests)e.opened=!1,e.openT=0,e.lid.parent.rotation.x=0,e.lid.material=this.woodMat}dispose(){this.root.removeFromParent(),this.bodyGeo.dispose(),this.lidGeo.dispose(),this.woodMat.dispose(),this.trimMat.dispose(),this.openedMat.dispose()}}class Nr extends oe{constructor(){const e=Nr.SkyShader,t=new Ht({name:e.name,uniforms:Zi.clone(e.uniforms),vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,side:Dt,depthWrite:!1});super(new xe(1,1,1),t),this.isSky=!0}}Nr.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new C},up:{value:new C(0,1,0)}},vertexShader:`
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

		}`};function Nx(r){const e=(n,i)=>{let s=n*374761393+i*668265263+r*1442695041|0;return s=(s^s>>>13)*1274126177,((s^s>>>16)>>>0)/4294967295},t=n=>n*n*(3-2*n);return(n,i)=>{const s=Math.floor(n),o=Math.floor(i),a=t(n-s),l=t(i-o),c=e(s,o),h=e(s+1,o),u=e(s,o+1),d=e(s+1,o+1);return c+(h-c)*a+(u-c)*l+(c-h-u+d)*a*l}}function xc(r,e,t,n){let i=0,s=.5,o=1;for(let a=0;a<4;a++){const l=n*o,c=(e*o%l+l)%l,h=(t*o%l+l)%l;i+=s*r(c,h),s*=.5,o*=2}return i}function or(r){const e=new ue(r);return[e.r*255,e.g*255,e.b*255]}function Ux(r){const e=r.size??512,t=r.scale??6,n=Nx(r.seed??7),i=new Float32Array(e*e),s=or(r.colorA),o=or(r.colorB),a=or(r.flecks[0]),l=or(r.flecks[1]),c=document.createElement("canvas");c.width=c.height=e;const h=c.getContext("2d"),u=h.createImageData(e,e);for(let _=0;_<e;_++)for(let v=0;v<e;v++){const E=v/e*t,b=_/e*t,A=xc(n,E,b,t),N=xc(n,E*7+3,b*7+3,t*7);i[_*e+v]=A*.7+N*.3;const M=Math.min(1,Math.max(0,(A-.35)*2.2));let w=s[0]+(o[0]-s[0])*M,k=s[1]+(o[1]-s[1])*M,V=s[2]+(o[2]-s[2])*M;if(N>.74){const I=N>.8?l:a;w=w*.4+I[0]*.6,k=k*.4+I[1]*.6,V=V*.4+I[2]*.6}const j=.9+N*.2,L=(_*e+v)*4;u.data[L]=Math.min(255,w*j),u.data[L+1]=Math.min(255,k*j),u.data[L+2]=Math.min(255,V*j),u.data[L+3]=255}h.putImageData(u,0,0);const d=document.createElement("canvas");d.width=d.height=e;const f=d.getContext("2d"),g=f.createImageData(e,e),x=r.bump??2.5,m=(_,v)=>i[(v+e)%e*e+(_+e)%e];for(let _=0;_<e;_++)for(let v=0;v<e;v++){const E=(m(v+1,_)-m(v-1,_))*x,b=(m(v,_+1)-m(v,_-1))*x,A=Math.hypot(E,b,1),N=(_*e+v)*4;g.data[N]=(-E/A*.5+.5)*255,g.data[N+1]=(-b/A*.5+.5)*255,g.data[N+2]=1/A*255,g.data[N+3]=255}f.putImageData(g,0,0);const p=new Ho(c);p.colorSpace=at;const y=new Ho(d);for(const _ of[p,y])_.wrapS=_.wrapT=$n;return{map:p,normalMap:y}}const ts={low:{label:"낮음",bloom:!1,msaa:0,shadowMapSize:1024,anisotropy:1,normalScale:.4,grassCount:600,particleCount:40},medium:{label:"중간",bloom:!1,msaa:0,shadowMapSize:2048,anisotropy:4,normalScale:.7,grassCount:1800,particleCount:90},high:{label:"높음",bloom:!0,msaa:4,shadowMapSize:2048,anisotropy:8,normalScale:.9,grassCount:3500,particleCount:160}},kx=["low","medium","high"];function Fx(r){return typeof r=="string"&&r in ts}function qh(r){let e=r>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}const _c={forest:{inside:[["rock",10],["bush",14],["flower",24],["stump",4]],outside:[["tree",46],["rock",10]]},cave:{inside:[["crystalSmall",18],["stalagmite",10],["mushroom",14]],outside:[["crystalBig",20],["stalagmite",26]]},fortress:{inside:[["barrel",10],["pipe",6],["lamp",8],["crate",6]],outside:[["tower",10],["pipe",14],["crate",12]]}};function Ox(r,e,t,n){const i={x:0,z:0};if(Math.hypot(r.x-i.x,r.z-i.z)<4+t||Math.hypot(r.x-n.x,r.z-n.z)<4+t)return!1;for(const s of e.obstacles)if(Math.abs(r.x-s.x)<s.w/2+t+.6&&Math.abs(r.z-s.z)<s.d/2+t+.6)return!1;for(const s of e.chests)if(Math.hypot(r.x-s.x,r.z-s.z)<2.2+t)return!1;for(const s of e.spawns)if(Math.hypot(r.x-s.x,r.z-s.z)<1.8+t)return!1;return!0}function zx(r,e,t=1,n=14){const i=qh(t+r.id.length*7919),s=_c[r.id]??_c.forest,o=r.arenaHalfSize,a=[],l=[];for(const[c,h]of s.inside){let u=0;for(let d=0;d<h*30&&u<h;d++){const f={x:(i()*2-1)*(o-1.5),z:(i()*2-1)*(o-1.5)};Ox(f,r,.6,e)&&(a.some(g=>Math.hypot(g.x-f.x,g.z-f.z)<1.4)||(a.push({kind:c,x:f.x,z:f.z,scale:.75+i()*.6,rot:i()*Math.PI*2}),u++))}}for(const[c,h]of s.outside){let u=0;for(let d=0;d<h*30&&u<h;d++){const f=Math.floor(i()*4),g=(i()*2-1)*(o+n),x=o+1.5+i()*n,m=f===0?{x:g,z:-x}:f===1?{x:g,z:x}:f===2?{x:-x,z:g}:{x,z:g};l.some(p=>Math.hypot(p.x-m.x,p.z-m.z)<2.6)||(l.push({kind:c,x:m.x,z:m.z,scale:.8+i()*.7,rot:i()*Math.PI*2}),u++)}}return{inside:a,outside:l}}class Bx{constructor(e,t,n){this.def=e,this.root=new Fe,this.disposables=[],this.grass=null,this.grassMat=null,this.grassTime={value:0},this.particles=null,this.particleVel=null,this.lamps=[],this.t=0,this.root.name=`Decor-${e.id}`,this.rnd=qh(e.id.length*131+17);const i=zx(e,t,1);for(const s of i.inside)this.root.add(this.makeProp(s));for(const s of i.outside)this.root.add(this.makeProp(s));this.buildGrass(n),this.buildParticles(n)}makeProp(e){const t=new Fe;t.position.set(e.x,0,e.z),t.rotation.y=e.rot,t.scale.setScalar(e.scale);const n=(s,o,a,l=0,c=0,h=!0)=>{const u=new oe(s,o);return u.position.set(l,a,c),u.castShadow=h,u.receiveShadow=!0,t.add(u),this.disposables.push(s,o),u},i=this.rnd;switch(e.kind){case"tree":{const s=2.2+i()*1.4;n(new ct(.22,.32,s,7),fe({color:"#6b4a2a",roughness:.9}),s/2);const o=fe({color:new ue().setHSL(.27+i()*.07,.55,.32+i()*.1),roughness:.85,flatShading:!0});n(new An(1.5+i()*.5,1),o,s+.8),n(new An(1.1+i()*.4,1),o,s+1.7,.6,.3),n(new An(1+i()*.4,1),o,s+1.4,-.7,-.2);break}case"rock":n(new Pr(.5+i()*.5,0),fe({color:"#8a8f99",roughness:.9,flatShading:!0}),.3);break;case"bush":n(new An(.55,1),fe({color:"#3f8a3a",roughness:.9,flatShading:!0}),.4),n(new An(.4,1),fe({color:"#4c9a44",roughness:.9,flatShading:!0}),.5,.4,.2);break;case"flower":{const s=["#ff6b90","#ffd23f","#ffffff","#b48cff"][Math.floor(i()*4)];n(new ct(.02,.02,.4,4),fe({color:"#3f8a3a"}),.2,0,0,!1),n(new ht(.1,6,5),fe({color:s,roughness:.7,emissive:s,emissiveIntensity:.25}),.42,0,0,!1);break}case"stump":n(new ct(.45,.55,.5,9),fe({color:"#7a5533",roughness:.95}),.25);break;case"crystalSmall":case"crystalBig":{const s=e.kind==="crystalBig",o=i()<.5?"#8fe8ff":"#c7a2ff",a=s?4:2;for(let l=0;l<a;l++){const c=(s?1.8:.7)*(.7+i()*.6);n(new mn((s?.4:.16)*(.7+i()*.6),c,5),fe({color:o,roughness:.15,emissive:o,emissiveIntensity:s?.6:.45,flatShading:!0}),c/2,(i()-.5)*.8,(i()-.5)*.8).rotation.set((i()-.5)*.6,0,(i()-.5)*.6)}break}case"stalagmite":n(new mn(.35+i()*.3,1.2+i()*1.6,6),fe({color:"#4a4f7a",roughness:.9,flatShading:!0}),.8);break;case"mushroom":{n(new ct(.06,.08,.3,6),fe({color:"#d9d4e8"}),.15,0,0,!1),n(new ht(.18,8,6,0,Math.PI*2,0,Math.PI/2),jt("#7fe3ff",.9),.3,0,0,!1);break}case"barrel":n(new ct(.4,.4,.9,12),fe({color:i()<.5?"#b0392f":"#6d7280",roughness:.5,metalness:.7}),.45);break;case"crate":n(new xe(.9,.9,.9),fe({color:"#8d9099",roughness:.5,metalness:.6}),.45);break;case"pipe":n(new ct(.18,.18,2.4,10),fe({color:"#5c6069",roughness:.4,metalness:.85}),.2).rotation.z=Math.PI/2;break;case"lamp":{n(new ct(.06,.08,1.4,6),fe({color:"#3a3c44",metalness:.8,roughness:.4}),.7,0,0,!1);const s=jt("#ff3b3b",2);n(new ht(.14,8,6),s,1.45,0,0,!1),this.lamps.push(s);break}case"tower":n(new xe(2.2,5+i()*3,2.2),fe({color:"#5c6069",roughness:.5,metalness:.6}),3),n(new ht(.2,8,6),jt("#ff3b3b",1.8),7,0,0,!1);break;default:n(new ht(.3,6,5),fe({color:"#999999"}),.3)}return t}buildGrass(e){if(this.def.id!=="forest")return;const t=ts[e].grassCount;if(t<=0)return;const n=new is(.14,.7,1,3);n.translate(0,.35,0);const i=n.attributes.position;for(let g=0;g<i.count;g++){const x=i.getY(g);i.setX(g,i.getX(g)*(1-x/.7)*1.2)}const s=fe({color:"#5fae3f",roughness:.95,metalness:0});s.side=It;const o=this.grassTime;s.onBeforeCompile=g=>{g.uniforms.uTime=o,g.vertexShader=g.vertexShader.replace("#include <common>",`#include <common>
uniform float uTime;`).replace("#include <begin_vertex>",`#include <begin_vertex>
          // 바람: 인스턴스 위치를 위상으로 써서 포기마다 다르게, 끝부분(uv.y 큰 쪽)이 더 흔들린다
          vec4 wp = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
          float sway = sin(uTime * 1.8 + wp.x * 0.7 + wp.z * 0.5) * 0.18 * uv.y * uv.y;
          transformed.x += sway;
          transformed.z += sway * 0.5;`)};const a=new Nh(n,s,t),l=this.def.arenaHalfSize,c=new We,h=new nn,u=new C,d=new C,f=new ue;for(let g=0;g<t;g++){d.set((this.rnd()*2-1)*(l-.5),0,(this.rnd()*2-1)*(l-.5)),h.setFromAxisAngle(new C(0,1,0),this.rnd()*Math.PI);const x=.6+this.rnd()*.9;u.set(x,x,x),c.compose(d,h,u),a.setMatrixAt(g,c),f.setHSL(.27+this.rnd()*.05,.6,.3+this.rnd()*.15),a.setColorAt(g,f)}a.instanceMatrix.needsUpdate=!0,a.instanceColor&&(a.instanceColor.needsUpdate=!0),a.castShadow=!1,a.receiveShadow=!0,a.frustumCulled=!1,this.grass=a,this.grassMat=s,this.root.add(a),this.disposables.push(n,s)}buildParticles(e){const t=ts[e].particleCount;if(t<=0)return;const n=this.def.arenaHalfSize+6,i=new Float32Array(t*3);this.particleVel=new Float32Array(t*3);for(let l=0;l<t;l++)i[l*3]=(this.rnd()*2-1)*n,i[l*3+1]=.5+this.rnd()*4,i[l*3+2]=(this.rnd()*2-1)*n,this.particleVel[l*3]=(this.rnd()-.5)*.6,this.particleVel[l*3+1]=(this.rnd()-.5)*.3,this.particleVel[l*3+2]=(this.rnd()-.5)*.6;const s=new Tt;s.setAttribute("position",new Nt(i,3));const o=this.def.id==="forest"?{color:16773770,size:.18}:this.def.id==="cave"?{color:10475775,size:.12}:{color:16752704,size:.1},a=new pa({color:o.color,size:o.size,transparent:!0,opacity:.85,sizeAttenuation:!0,depthWrite:!1,blending:fr});this.particles=new kh(s,a),this.particles.frustumCulled=!1,this.root.add(this.particles),this.disposables.push(s,a)}applyQuality(e){this.grass&&(this.root.remove(this.grass),this.grass.geometry.dispose(),this.grassMat?.dispose(),this.grass=null),this.particles&&(this.root.remove(this.particles),this.particles.geometry.dispose(),this.particles.material.dispose(),this.particles=null),this.buildGrass(e),this.buildParticles(e)}update(e){this.t+=e,this.grassTime.value=this.t;for(let t=0;t<this.lamps.length;t++)this.lamps[t].emissiveIntensity=1.2+Math.max(0,Math.sin(this.t*3+t))*1.8;if(this.particles&&this.particleVel){const t=this.particles.geometry.attributes.position,n=t.array,i=this.def.arenaHalfSize+6,s=t.count;for(let o=0;o<s;o++){const a=o*3;n[a]+=this.particleVel[a]*e+Math.sin(this.t+o)*.004,n[a+1]+=this.particleVel[a+1]*e+Math.cos(this.t*.7+o)*.003,n[a+2]+=this.particleVel[a+2]*e,n[a]>i&&(n[a]=-i),n[a]<-i&&(n[a]=i),n[a+2]>i&&(n[a+2]=-i),n[a+2]<-i&&(n[a+2]=i),n[a+1]<.3&&(n[a+1]=4.5),n[a+1]>5&&(n[a+1]=.3)}t.needsUpdate=!0}}dispose(){this.root.removeFromParent();for(const e of this.disposables)e.dispose();this.disposables.length=0}}const Hx={backgroundColor:Y.world.backgroundColor,fogNear:Y.world.fogNear,fogFar:Y.world.fogFar,floorColor:Y.world.floorColor,floorAltColor:Y.world.floorAltColor,floorFlecks:["#8bd268","#66ad48"],wallColor:Y.world.wallColor,wallHeight:Y.world.wallHeight,skyColor:"#dcefff",groundColor:"#5f8f3a",sunColor:"#fff4de",sunIntensity:2.6,sky:{elevation:32,azimuth:160,turbidity:6,rayleigh:1.6},exposure:1,groundBump:3.2,groundScale:4,groundRoughness:.95},Jt=[{id:"forest",name:Y.dungeon.name,subtitle:"햇살이 드는 숲. 로봇 3종과 숲의 수호 로봇.",recommendedLevel:1,arenaHalfSize:Y.world.arenaHalfSize,theme:Hx,obstacles:Y.world.obstacles,chests:Y.dungeon.chests,spawns:Y.enemies.spawns,boss:{},rewardMul:{gold:1,xp:1}},{id:"cave",name:"수정 동굴",subtitle:"어둡고 좁은 동굴. 빠른 동굴 박쥐이 떼로 덤빈다.",recommendedLevel:4,requiresClear:"forest",arenaHalfSize:24,theme:{backgroundColor:"#161a33",fogNear:16,fogFar:52,floorColor:"#3b4070",floorAltColor:"#343a64",floorFlecks:["#7fe3ff","#b48cff"],wallColor:"#4a3f7a",wallHeight:2.4,skyColor:"#6f7fd6",groundColor:"#1f2340",sunColor:"#c9d6ff",sunIntensity:1.3,exposure:.9,groundBump:3.2,groundScale:5,groundRoughness:.75},obstacles:[{x:7,z:-7,w:1.4,d:1.4,h:5,color:"#8fe8ff"},{x:-9,z:-5,w:1.6,d:1.6,h:6,color:"#c7a2ff"},{x:10,z:8,w:1.4,d:1.4,h:4.5,color:"#8fe8ff"},{x:-11,z:10,w:1.8,d:1.8,h:5.5,color:"#c7a2ff"},{x:2,z:14,w:1.2,d:1.2,h:4,color:"#8fe8ff"},{x:-4,z:-14,w:4,d:2.2,h:2.2,color:"#5a5f8c"},{x:16,z:-2,w:2.6,d:4,h:2.6,color:"#5a5f8c"},{x:-17,z:2,w:2.4,d:5,h:2.4,color:"#5a5f8c"},{x:6,z:19,w:5,d:2,h:2,color:"#5a5f8c"},{x:0,z:-9,w:7,d:1,h:3,color:"#4a3f7a"},{x:14,z:16,w:1,d:7,h:3,color:"#4a3f7a"}],chests:[{x:-19,z:-16},{x:19,z:12},{x:-2,z:20}],spawns:[{type:"stalker",x:9,z:-13},{type:"stalker",x:-13,z:-11},{type:"stalker",x:15,z:5},{type:"stalker",x:-15,z:14},{type:"stalker",x:4,z:9},{type:"stalker",x:-7,z:16},{type:"shooter",x:18,z:-10},{type:"shooter",x:-18,z:-6},{type:"shooter",x:17,z:18},{type:"shooter",x:-12,z:19},{type:"rusher",x:12,z:0},{type:"rusher",x:-8,z:7},{type:"rusher",x:0,z:-17},{type:"tank",x:-1,z:18}],boss:{name:"수정 골렘",hp:650,color:"#8f6cff",speed:2.6,radius:1.8,score:500,spawn:{x:0,z:-17},contactDamage:24,model:"golem",useCharge:!1,closePatterns:["slam","summon","barrage"],engageRange:9,windup:{slam:.9,barrage:.7,summon:1},slam:{radius:5.5,damage:30},barrage:{count:10,phase2Count:14,damage:11,speed:9.5},summon:{type:"stalker",count:2,phase2Count:3,maxAlive:4},phase2SpeedMul:1.4,reward:{goldMin:150,goldMax:240,xp:220,equipMinRarity:"rare"}},rewardMul:{gold:1.3,xp:1.3}},{id:"fortress",name:"강철 요새",subtitle:"붉은 강철 요새. 트롤 거인과 포대가 길목을 지킨다.",recommendedLevel:8,requiresClear:"cave",arenaHalfSize:30,theme:{backgroundColor:"#2b2d33",fogNear:30,fogFar:84,floorColor:"#5c6069",floorAltColor:"#54585f",floorFlecks:["#7b808a","#b0392f"],wallColor:"#7a2b2b",wallHeight:2.8,skyColor:"#b9bcc6",groundColor:"#3a3c44",sunColor:"#ffd9c7",sunIntensity:3.2,sky:{elevation:18,azimuth:220,turbidity:12,rayleigh:.6},exposure:1.1,groundBump:1.6,groundScale:9,groundRoughness:.55},obstacles:[{x:0,z:-8,w:12,d:1.2,h:3,color:"#7a2b2b"},{x:0,z:8,w:12,d:1.2,h:3,color:"#7a2b2b"},{x:-12,z:0,w:1.2,d:10,h:3,color:"#7a2b2b"},{x:12,z:0,w:1.2,d:10,h:3,color:"#7a2b2b"},{x:-20,z:-20,w:3,d:3,h:2,color:"#8d9099"},{x:20,z:-20,w:3,d:3,h:2,color:"#8d9099"},{x:-20,z:20,w:3,d:3,h:2,color:"#8d9099"},{x:20,z:20,w:3,d:3,h:2,color:"#8d9099"},{x:18,z:4,w:4,d:2,h:2.4,color:"#b0392f"},{x:-18,z:-4,w:4,d:2,h:2.4,color:"#b0392f"},{x:6,z:20,w:2,d:4,h:2.4,color:"#c9a227"},{x:-6,z:-20,w:2,d:4,h:2.4,color:"#c9a227"}],chests:[{x:-26,z:0},{x:26,z:0},{x:0,z:26},{x:0,z:-26}],spawns:[{type:"tank",x:0,z:-14},{type:"tank",x:0,z:14},{type:"tank",x:-16,z:0},{type:"tank",x:16,z:0},{type:"artillery",x:-20,z:-16},{type:"artillery",x:20,z:-16},{type:"artillery",x:-20,z:16},{type:"artillery",x:20,z:16},{type:"shooter",x:24,z:-6},{type:"shooter",x:-24,z:6},{type:"shooter",x:8,z:24},{type:"rusher",x:-8,z:-12},{type:"rusher",x:8,z:12},{type:"rusher",x:22,z:10},{type:"rusher",x:-22,z:-10},{type:"stalker",x:10,z:-24},{type:"stalker",x:-10,z:24},{type:"stalker",x:26,z:24}],boss:{name:"요새 사령관",hp:900,color:"#c0392b",speed:3.2,radius:1.7,score:800,spawn:{x:0,z:-22},contactDamage:28,model:"commander",closePatterns:["mortar","barrage","slam","mortar"],windup:{charge:.65,slam:.6,barrage:.5,mortar:.7},mortar:{count:4,phase2Count:6,delay:1,radius:2.6,damage:22,spread:4},charge:{speed:21},slam:{radius:5,damage:34},barrage:{count:12,phase2Count:18,damage:12,speed:11},reward:{goldMin:250,goldMax:400,xp:400,equipMinRarity:"epic"}},rewardMul:{gold:1.6,xp:1.6}}];function hr(r,e){return!r.requiresClear||(e[r.requiresClear]??0)>0}function vc(r){return Jt.find(e=>e.requiresClear===r)??null}function Wo(r){const e=Y.boss,t=r.boss;return{...e,...t,spawn:{...e.spawn,...t.spawn??{}},windup:{...e.windup,...t.windup??{}},charge:{...e.charge,...t.charge??{}},slam:{...e.slam,...t.slam??{}},barrage:{...e.barrage,...t.barrage??{}},summon:{...e.summon,...t.summon??{}},mortar:{...e.mortar,...t.mortar??{}},reward:{...e.reward,...t.reward??{}}}}class yc{constructor(e,t,n="medium"){this.def=t,this.root=new Fe,this.boxes=[],this.disposables=[],this.sky=null,this.floorMat=null,this.decor=null,this.groundMaps=null,this.lastQuality=null,this.sunDir=new C(12,26,10).normalize();const i=t.theme;this.root.name=`Dungeon-${t.id}`,e.background=new ue(i.backgroundColor),e.fog=new ca(i.backgroundColor,i.fogNear,i.fogFar),i.sky&&this.buildSky(i.sky),this.buildLights(),this.buildFloor(),this.buildWalls(),this.buildObstacles(),this.decor=new Bx(t,Wo(t).spawn,n),this.root.add(this.decor.root),this.applyQuality(n),e.add(this.root)}update(e){this.decor?.update(e)}buildSky(e){this.sky=new Nr,this.sky.scale.setScalar(900);const t=this.sky.material.uniforms;t.turbidity.value=e.turbidity,t.rayleigh.value=e.rayleigh,t.mieCoefficient.value=.005,t.mieDirectionalG.value=.8;const n=ai.degToRad(90-e.elevation),i=ai.degToRad(e.azimuth),s=new C().setFromSphericalCoords(1,n,i);t.sunPosition.value.copy(s),this.root.add(this.sky)}applyQuality(e){const t=ts[e];this.sun.shadow.mapSize.x!==t.shadowMapSize&&(this.sun.shadow.mapSize.set(t.shadowMapSize,t.shadowMapSize),this.sun.shadow.map?.dispose(),this.sun.shadow.map=null),this.groundMaps&&(this.groundMaps.map.anisotropy=t.anisotropy,this.groundMaps.normalMap.anisotropy=t.anisotropy,this.groundMaps.map.needsUpdate=!0,this.groundMaps.normalMap.needsUpdate=!0),this.floorMat?.normalScale.set(t.normalScale,t.normalScale),this.decor&&this.lastQuality!==e&&this.decor.applyQuality(e),this.lastQuality=e}buildLights(){const e=Y.graphics,t=this.def.theme,n=new Z0(new ue(t.skyColor),new ue(t.groundColor),.9);if(this.root.add(n),this.sun=new Vh(new ue(t.sunColor),t.sunIntensity),this.def.theme.sky){const s=this.def.theme.sky,o=new C().setFromSphericalCoords(1,ai.degToRad(90-s.elevation),ai.degToRad(s.azimuth));this.sunDir.copy(o)}this.sun.castShadow=e.shadows,this.sun.shadow.mapSize.set(e.shadowMapSize,e.shadowMapSize);const i=this.sun.shadow.camera;i.left=-24,i.right=24,i.top=24,i.bottom=-24,i.near=1,i.far=90,i.updateProjectionMatrix(),this.sun.shadow.bias=-6e-4,this.root.add(this.sun,this.sun.target)}buildFloor(){const e=this.def.theme;this.groundMaps=Ux({colorA:e.floorColor,colorB:e.floorAltColor,flecks:e.floorFlecks,bump:e.groundBump,scale:e.groundScale,seed:this.def.id.length*13+7});const t=this.def.arenaHalfSize*2+60,n=t/10;this.groundMaps.map.repeat.set(n,n),this.groundMaps.normalMap.repeat.set(n,n),this.floorMat=fe({color:16777215,map:this.groundMaps.map,normalMap:this.groundMaps.normalMap,normalScale:.7,roughness:e.groundRoughness,metalness:0});const i=new oe(new is(t,t),this.floorMat);i.rotation.x=-Math.PI/2,i.receiveShadow=!0,i.name="Floor",this.root.add(i),this.disposables.push(this.groundMaps.map,this.groundMaps.normalMap,i.geometry,this.floorMat)}buildWalls(){const e=this.def.theme,t=this.def.arenaHalfSize,n=fe({color:e.wallColor,roughness:.8,metalness:this.def.id==="fortress"?.5:.05}),i=t*2+1,s=.5,o=new xe(i,e.wallHeight,s);this.disposables.push(n,o);const a=[[0,-(t+s/2),0],[0,t+s/2,0],[-(t+s/2),0,Math.PI/2],[t+s/2,0,Math.PI/2]];for(const[l,c,h]of a){const u=new oe(o,n);u.position.set(l,e.wallHeight/2,c),u.rotation.y=h,u.castShadow=!0,u.receiveShadow=!0,this.root.add(u)}}buildObstacles(){for(const e of this.def.obstacles){const t=new xe(e.w,e.h,e.d),n=new ue(e.color??"#9aa3b2"),i={h:0,s:0,l:0};n.getHSL(i);const s=this.def.id==="cave"&&i.l>.6,o=this.def.id==="fortress",a=fe(s?{color:n,roughness:.2,metalness:.1,emissive:n,emissiveIntensity:.22,flatShading:!0}:{color:n,roughness:o?.45:.85,metalness:o?.6:.05}),l=new oe(t,a);l.position.set(e.x,e.h/2,e.z),l.castShadow=!0,l.receiveShadow=!0,this.root.add(l),this.boxes.push({x:e.x,z:e.z,w:e.w,d:e.d,h:e.h}),this.disposables.push(t,a)}}setShadows(e){this.sun.castShadow=e}updateLight(e){this.sun.position.set(e.x+this.sunDir.x*30,Math.max(10,this.sunDir.y*30),e.z+this.sunDir.z*30),this.sun.target.position.copy(e)}getObstacleBoxes(){return this.boxes}addCollisionBoxes(e){this.boxes.push(...e)}removeCollisionBoxes(e){const t=new Set(e);for(let n=this.boxes.length-1;n>=0;n--)t.has(this.boxes[n])&&this.boxes.splice(n,1)}getArenaHalfSize(){return this.def.arenaHalfSize}dispose(){this.decor?.dispose(),this.sky&&(this.sky.geometry.dispose(),this.sky.material.dispose()),this.root.removeFromParent(),this.disposables.forEach(e=>e.dispose())}}class Gx{constructor(e,t){this.cb=t,this.el=document.createElement("div"),this.el.className="guide dungeons",this.el.hidden=!0,this.el.innerHTML=`
      <div class="guide-panel dungeons-panel" role="dialog" aria-labelledby="dungeons-title">
        <div class="inv-head"><h2 class="guide-title" id="dungeons-title">던전 선택</h2><button class="btn small" id="dungeons-close" type="button">닫기 (Esc)</button></div>
        <p class="guide-sub">던전을 클리어하면 다음 던전이 열립니다. 레벨·골드·장비는 모든 던전에서 이어집니다.</p>
        <div class="dungeon-list" id="dungeon-list"></div>
      </div>`,e.appendChild(this.el),this.el.querySelector("#dungeons-close")?.addEventListener("click",()=>this.cb.onClose()),this.el.querySelector("#dungeon-list")?.addEventListener("click",n=>{const i=n.target.closest("button[data-dungeon]");if(!i||i.disabled)return;const s=Jt.find(o=>o.id===i.dataset.dungeon);s&&this.cb.enter(s)})}get visible(){return!this.el.hidden}refresh(){const e=this.cb.clears(),t=this.cb.level(),n=this.el.querySelector("#dungeon-list");n.innerHTML=Jt.map((i,s)=>{const o=hr(i,e),a=e[i.id]??0,l=i.requiresClear?Jt.find(u=>u.id===i.requiresClear)?.name??i.requiresClear:"",c=o?a>0?`클리어 ${a}회`:"아직 클리어하지 않음":`잠김 · '${l}' 클리어 필요`,h=t<i.recommendedLevel?` <span class="dungeon-warn">(현재 레벨 ${t}: 어려울 수 있음)</span>`:"";return`<div class="dungeon-card${o?"":" locked"}" data-card="${i.id}">
          <div class="dungeon-index">${s+1}</div>
          <div class="dungeon-text">
            <div class="dungeon-name">${i.name}</div>
            <div class="dungeon-sub">${i.subtitle}</div>
            <div class="dungeon-meta">권장 레벨 ${i.recommendedLevel}${h} · 적 ${i.spawns.length}마리 · 상자 ${i.chests.length}개 · ${c}</div>
          </div>
          <button class="btn${o?"":" secondary"}" type="button" data-dungeon="${i.id}" ${o?"":"disabled"}>${o?"입장":"잠김"}</button>
        </div>`}).join("")}show(){this.refresh(),this.el.hidden=!1}hide(){this.el.hidden=!0}}function Mc(r,e){if(e===ed)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===Do||e===dh){let t=r.getIndex();if(t===null){const o=[],a=r.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);r.setIndex(o),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===Do)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}class Vx extends as{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new $x(t)}),this.register(function(t){return new i_(t)}),this.register(function(t){return new s_(t)}),this.register(function(t){return new r_(t)}),this.register(function(t){return new Kx(t)}),this.register(function(t){return new Jx(t)}),this.register(function(t){return new Zx(t)}),this.register(function(t){return new Qx(t)}),this.register(function(t){return new jx(t)}),this.register(function(t){return new e_(t)}),this.register(function(t){return new Yx(t)}),this.register(function(t){return new n_(t)}),this.register(function(t){return new t_(t)}),this.register(function(t){return new qx(t)}),this.register(function(t){return new o_(t)}),this.register(function(t){return new a_(t)})}load(e,t,n,i){const s=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=ws.extractUrlBase(e);o=ws.resolveURL(c,this.path)}else o=ws.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new Bh(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,o,function(h){t(h),s.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const o={},a={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Xh){try{o[Ke.KHR_BINARY_GLTF]=new l_(e)}catch(u){i&&i(u);return}s=JSON.parse(o[Ke.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new M_(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,o[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case Ke.KHR_MATERIALS_UNLIT:o[u]=new Xx;break;case Ke.KHR_DRACO_MESH_COMPRESSION:o[u]=new c_(s,this.dracoLoader);break;case Ke.KHR_TEXTURE_TRANSFORM:o[u]=new h_;break;case Ke.KHR_MESH_QUANTIZATION:o[u]=new u_;break;default:d.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function Wx(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}const Ke={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class qx{constructor(e){this.parser=e,this.name=Ke.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let c;const h=new ue(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Et);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Vh(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Gh(h),c.distance=u;break;case"spot":c=new ex(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Hn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],a=(s.extensions&&s.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class Xx{constructor(){this.name=Ke.KHR_MATERIALS_UNLIT}getMaterialType(){return Bt}extendParams(e,t,n){const i=[];e.color=new ue(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const o=s.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Et),e.opacity=o[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,at))}return Promise.all(i)}}class jx{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}}class $x{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Se(a,a)}return Promise.all(s)}}class Yx{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(s)}}class Kx{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[];t.sheenColor=new ue(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Et)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,at)),o.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(s)}}class Jx{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(s)}}class Zx{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new ue().setRGB(a[0],a[1],a[2],Et),Promise.all(s)}}class Qx{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}}class e_{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new ue().setRGB(a[0],a[1],a[2],Et),o.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,at)),Promise.all(s)}}class t_{constructor(e){this.parser=e,this.name=Ke.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(s)}}class n_{constructor(e){this.parser=e,this.name=Ke.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:In}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const s=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(s)}}class i_{constructor(e){this.parser=e,this.name=Ke.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,o)}}class s_{constructor(e){this.parser=e,this.name=Ke.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class r_{constructor(e){this.parser=e,this.name=Ke.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const o=s.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,o.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class o_{constructor(e){this.name=Ke.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):o.ready.then(function(){const f=new ArrayBuffer(h*u);return o.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class a_{constructor(e){this.name=Ke.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==Kt.TRIANGLES&&c.mode!==Kt.TRIANGLE_STRIP&&c.mode!==Kt.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(h=>(l[c]=h,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const g of u){const x=new We,m=new C,p=new nn,y=new C(1,1,1),_=new Nh(g.geometry,g.material,d);for(let v=0;v<d;v++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,v),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,v),l.SCALE&&y.fromBufferAttribute(l.SCALE,v),_.setMatrixAt(v,x.compose(m,p,y));for(const v in l)if(v==="_COLOR_0"){const E=l[v];_.instanceColor=new zo(E.array,E.itemSize,E.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&g.geometry.setAttribute(v,l[v]);ut.prototype.copy.call(_,g),this.parser.assignFinalMaterial(_),f.push(_)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Xh="glTF",xs=12,bc={JSON:1313821514,BIN:5130562};class l_{constructor(e){this.name=Ke.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,xs),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Xh)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-xs,s=new DataView(e,xs);let o=0;for(;o<i;){const a=s.getUint32(o,!0);o+=4;const l=s.getUint32(o,!0);if(o+=4,l===bc.JSON){const c=new Uint8Array(e,xs+o,a);this.content=n.decode(c)}else if(l===bc.BIN){const c=xs+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class c_{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ke.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const h in o){const u=qo[h]||h.toLowerCase();a[u]=o[h]}for(const h in e.attributes){const u=qo[h]||h.toLowerCase();if(o[h]!==void 0){const d=n.accessors[e.attributes[h]],f=qi[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const g in f.attributes){const x=f.attributes[g],m=l[g];m!==void 0&&(x.normalized=m)}u(f)},a,c,Et,d)})})}}class h_{constructor(){this.name=Ke.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class u_{constructor(){this.name=Ke.KHR_MESH_QUANTIZATION}}class jh extends Cs{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[s+o];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,g=e*c,x=g-c,m=-2*f+3*d,p=f-d,y=1-m,_=p-d+u;for(let v=0;v!==a;v++){const E=o[x+v+a],b=o[x+v+l]*h,A=o[g+v+a],N=o[g+v]*h;s[v]=y*E+_*b+m*A+p*N}return s}}const d_=new nn;class f_ extends jh{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return d_.fromArray(s).normalize().toArray(s),s}}const Kt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},qi={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Sc={9728:St,9729:Gt,9984:Io,9985:nh,9986:lr,9987:pi},wc={33071:Zt,33648:mr,10497:$n},bo={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},qo={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},On={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},p_={CUBICSPLINE:void 0,LINEAR:Yi,STEP:Es},So={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function m_(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Yn({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Pn})),r.DefaultMaterial}function ni(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Hn(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function g_(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const o=[],a=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;o.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;a.push(d)}if(s){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;l.push(d)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function x_(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function __(r){let e;const t=r.extensions&&r.extensions[Ke.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+wo(t.attributes):e=r.indices+":"+wo(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+wo(r.targets[n]);return e}function wo(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function Xo(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function v_(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const y_=new We;class M_{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Wx,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,s=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,s=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&s<98?this.textureLoader=new Hh(this.options.manager):this.textureLoader=new ix(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Bh(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return ni(s,a,i),Hn(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,h]of o.children.entries())s(h,a.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ke.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,o){n.load(ws.resolveURL(t.uri,i.path),s,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=bo[i.type],a=qi[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new Nt(c,o,l))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(o){const a=o[0],l=bo[i.type],c=qi[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let x,m;if(f&&f!==u){const p=Math.floor(d/f),y="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let _=t.cache.get(y);_||(x=new c(a,p*f,i.count*f/h),_=new P0(x,f/h),t.cache.add(y,_)),m=new ua(_,l,d%f/h,g)}else a===null?x=new c(i.count*l):x=new c(a,d,i.count*l),m=new Nt(x,l,g);if(i.sparse!==void 0){const p=bo.SCALAR,y=qi[i.sparse.indices.componentType],_=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,E=new y(o[1],_,i.sparse.count*p),b=new c(o[2],v,i.sparse.count*l);a!==null&&(m=new Nt(m.array.slice(),m.itemSize,m.normalized));for(let A=0,N=E.length;A<N;A++){const M=E[A];if(m.setX(M,b[A*l]),l>=2&&m.setY(M,b[A*l+1]),l>=3&&m.setZ(M,b[A*l+2]),l>=4&&m.setW(M,b[A*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,o=t.images[s];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,s,a)}loadTextureImage(e,t,n){const i=this,s=this.json,o=s.textures[e],a=s.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=o.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(s.samplers||{})[o.sampler]||{};return h.magFilter=Sc[d.magFilter]||Gt,h.minFilter=Sc[d.minFilter]||pi,h.wrapS=wc[d.wrapS]||$n,h.wrapT=wc[d.wrapT]||$n,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:o.mimeType});return l=a.createObjectURL(d),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(x){const m=new wt(x);m.needsUpdate=!0,d(m)}),t.load(ws.resolveURL(u,s.path),g,void 0,f)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),u.userData.mimeType=o.mimeType||v_(o.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),s.extensions[Ke.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[Ke.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=s.associations.get(o);o=s.extensions[Ke.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),s.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new pa,hn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Uh,hn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||s||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),s&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),s&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Yn}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let o;const a={},l=s.extensions||{},c=[];if(l[Ke.KHR_MATERIALS_UNLIT]){const u=i[Ke.KHR_MATERIALS_UNLIT];o=u.getMaterialType(),c.push(u.extendParams(a,s,t))}else{const u=s.pbrMetallicRoughness||{};if(a.color=new ue(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],Et),a.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",u.baseColorTexture,at)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),o=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}s.doubleSided===!0&&(a.side=It);const h=s.alphaMode||So.OPAQUE;if(h===So.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===So.MASK&&(a.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&o!==Bt&&(c.push(t.assignTexture(a,"normalMap",s.normalTexture)),a.normalScale=new Se(1,1),s.normalTexture.scale!==void 0)){const u=s.normalTexture.scale;a.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&o!==Bt&&(c.push(t.assignTexture(a,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&o!==Bt){const u=s.emissiveFactor;a.emissive=new ue().setRGB(u[0],u[1],u[2],Et)}return s.emissiveTexture!==void 0&&o!==Bt&&c.push(t.assignTexture(a,"emissiveMap",s.emissiveTexture,at)),Promise.all(c).then(function(){const u=new o(a);return s.name&&(u.name=s.name),Hn(u,s),t.associations.set(u,{materials:e}),s.extensions&&ni(i,u,s),u})}createUniqueName(e){const t=Ze.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(a){return n[Ke.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return Ec(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],h=__(c),u=i[h];if(u)o.push(u.promise);else{let d;c.extensions&&c.extensions[Ke.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=Ec(new Tt,c,t),i[h]={primitive:c,promise:d},o.push(d)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],o=s.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const h=o[l].material===void 0?m_(this.cache):this.getDependency("material",o[l].material);a.push(h)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const x=h[f],m=o[f];let p;const y=c[f];if(m.mode===Kt.TRIANGLES||m.mode===Kt.TRIANGLE_STRIP||m.mode===Kt.TRIANGLE_FAN||m.mode===void 0)p=s.isSkinnedMesh===!0?new D0(x,y):new oe(x,y),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===Kt.TRIANGLE_STRIP?p.geometry=Mc(p.geometry,dh):m.mode===Kt.TRIANGLE_FAN&&(p.geometry=Mc(p.geometry,Do));else if(m.mode===Kt.LINES)p=new F0(x,y);else if(m.mode===Kt.LINE_STRIP)p=new fa(x,y);else if(m.mode===Kt.LINE_LOOP)p=new O0(x,y);else if(m.mode===Kt.POINTS)p=new kh(x,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&x_(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),Hn(p,s),m.extensions&&ni(i,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return s.extensions&&ni(i,u[0],s),u[0];const d=new Fe;s.extensions&&ni(i,d,s),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Pt(ai.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Cr(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Hn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),o=i,a=[],l=[];for(let c=0,h=o.length;c<h;c++){const u=o[c];if(u){a.push(u);const d=new We;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new da(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],g=i.samplers[f.sampler],x=f.target,m=x.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,y=i.parameters!==void 0?i.parameters[g.output]:g.output;x.node!==void 0&&(o.push(this.getDependency("node",m)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",y)),c.push(g),h.push(x))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],g=u[2],x=u[3],m=u[4],p=[];for(let y=0,_=d.length;y<_;y++){const v=d[y],E=f[y],b=g[y],A=x[y],N=m[y];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();const M=n._createAnimationTracks(v,E,b,A,N);if(M)for(let w=0;w<M.length;w++)p.push(M[w])}return new Go(s,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const o=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,h=a.length;c<h;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(o),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,y_)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],o=s.name?i.createUniqueName(s.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),s.camera!==void 0&&a.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let h;if(s.isBone===!0?h=new Dh:c.length>1?h=new Fe:c.length===1?h=c[0]:h=new ut,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(s.name&&(h.userData.name=s.name,h.name=o),Hn(h,s),s.extensions&&ni(n,h,s),s.matrix!==void 0){const u=new We;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new Fe;n.name&&(s.name=i.createUniqueName(n.name)),Hn(s,n),n.extensions&&ni(t,s,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof hn||d instanceof wt)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){const o=[],a=e.name?e.name:e.uuid,l=[];On[s.path]===On.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(a);let c;switch(On[s.path]){case On.weights:c=Qi;break;case On.rotation:c=mi;break;case On.position:case On.scale:c=es;break;default:switch(n.itemSize){case 1:c=Qi;break;case 2:case 3:default:c=es;break}break}const h=i.interpolation!==void 0?p_[i.interpolation]:Yi,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const g=new c(l[d]+"."+On[s.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),o.push(g)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Xo(t.constructor),i=new Float32Array(t.length);for(let s=0,o=t.length;s<o;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof mi?f_:jh;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function b_(r,e,t){const n=e.attributes,i=new Vt;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new C(l[0],l[1],l[2]),new C(c[0],c[1],c[2])),a.normalized){const h=Xo(qi[a.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const a=new C,l=new C;for(let c=0,h=s.length;c<h;c++){const u=s[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const x=Xo(qi[d.componentType]);l.multiplyScalar(x)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}r.boundingBox=i;const o=new xn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=o}function Ec(r,e,t){const n=e.attributes,i=[];function s(o,a){return t.getDependency("accessor",o).then(function(l){r.setAttribute(a,l)})}for(const o in n){const a=qo[o]||o.toLowerCase();a in r.attributes||i.push(s(n[o],a))}if(e.indices!==void 0&&!r.index){const o=t.getDependency("accessor",e.indices).then(function(a){r.setIndex(a)});i.push(o)}return Je.workingColorSpace!==Et&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Je.workingColorSpace}" not supported.`),Hn(r,e),b_(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?g_(r,e.targets,t):r})}function S_(r){const e=new Map,t=new Map,n=r.clone();return $h(r,n,function(i,s){e.set(s,i),t.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const s=i,o=e.get(i),a=o.skeleton.bones;s.skeleton=o.skeleton.clone(),s.bindMatrix.copy(o.bindMatrix),s.skeleton.bones=a.map(function(l){return t.get(l)}),s.bind(s.skeleton,s.bindMatrix)}),n}function $h(r,e,t){t(r,e);for(let n=0;n<r.children.length;n++)$h(r.children[n],e.children[n],t)}const w_=/^(left|right|l|r)[_\- ]?(.+)$/,E_=/^(leg|boot|knee|thigh|shin|foot|shoe)/,T_=/^(arm|hand|bracer|forearm|glove|shoulder|upperarm|lowerarm)/,Tc=/^(head|hair|fringe|ear|eye|pupil|glint|brow|nose|mouth|glass|hat|helmet|cap|visor)/,A_=/^(sword|weapon|blade|shield|axe|staff|bow|gun|wand)/;function br(r){const e=r.toLowerCase().trim();if(A_.test(e))return"weapon";if(Tc.test(e))return"head";const t=w_.exec(e);if(t){const n=t[1]==="left"||t[1]==="l",i=t[2];return E_.test(i)?n?"leftLeg":"rightLeg":T_.test(i)?n?"leftArm":"rightArm":Tc.test(i)?"head":null}return null}function R_(r){r.updateMatrixWorld(!0);const e=new Map;r.traverse(v=>{const E=v;if(!E.isMesh)return;const b=br(E.name);if(!b)return;const A=e.get(b)??[];A.push(E),e.set(b,A)});const t=e.has("leftLeg")&&e.has("rightLeg"),n=e.has("leftArm")&&e.has("rightArm");if(!t&&!n)return null;const i=v=>{const E=new Vt;for(const b of v)E.expandByObject(b);return E},s=e.get("weapon")??[];let o=null;if(s.length>0&&n){const v=i(s).getCenter(new C).x,E=i(e.get("leftArm")).getCenter(new C).x,b=i(e.get("rightArm")).getCenter(new C).x;o=Math.abs(v-E)<=Math.abs(v-b)?"leftArm":"rightArm",e.get(o).push(...s)}const a=(v,E)=>{const b=e.get(v);if(!b||b.length===0)return null;const A=b.filter(V=>br(V.name)!=="weapon"),N=i(A.length?A:b),M=N.getCenter(new C),w=new C(M.x,E?N.max.y:N.min.y,M.z),k=new Fe;k.name=`joint:${v}`,k.position.copy(w),r.add(k),k.updateMatrixWorld(!0);for(const V of b)k.attach(V);return{group:k,length:N.max.y-N.min.y}},l=t?a("leftLeg",!0):null,c=t?a("rightLeg",!0):null,h=n?a("leftArm",!0):null,u=n?a("rightArm",!0):null,d=a("head",!1),f=o==="leftArm"?h:u,g=f===h?u:h,x=new Fe;x.name="rigBody";const m=[...r.children];r.add(x);for(const v of m)x.attach(v);let p=0;const y=(v,E,b)=>v+(E-v)*Math.max(0,Math.min(1,b)),_=v=>v*v*(3-2*v);return{update(v,E){p+=v;const b=E.hurt??0;let A=0,N=0,M=0,w=0,k=0,V=0,j=0,L=0,I=0;if(E.dead){x.rotation.set(-1.45,0,0),x.position.y=.25;return}if(E.moving){const O=p*9*Math.max(.6,Math.min(1.4,E.speed/6));A=Math.sin(O)*.65,N=-A,M=-Math.sin(O)*.5,w=-M,I=Math.abs(Math.sin(O))*.035,j=.06}else M=w=Math.sin(p*2)*.04,I=Math.sin(p*2)*.01;E.airborne&&(A=.55,N=.3,M=w=-2.4),E.dashing&&(j=.45,M=w=.9,A=.7,N=-.5);let F=0,B=0;if(E.attack!==null){const O=E.attack;if(O<.12)F=y(0,-2.2,_(O/.12)),k=y(0,.5,O/.12),L=y(0,.35,O/.12);else{const H=_((O-.12)/.88);F=y(-2.2,1.1,H),k=y(.5,-.2,H),L=y(.35,-.3,H),j+=y(0,.18,H)}B=-F*.3}b>0&&(j-=.35*b,V-=.3*b);const D=f===h?1:-1;l&&(l.group.rotation.x=A),c&&(c.group.rotation.x=N),f&&(f.group.rotation.x=E.attack!==null?F:f===h?M:w,f.group.rotation.z=k*D),g&&(g.group.rotation.x=E.attack!==null?B:g===h?M:w,g.group.rotation.z=0),d&&(d.group.rotation.x=V+(E.moving?Math.sin(p*9)*.02:0)),x.rotation.set(j,L,0),x.position.y=I}}}const C_=[[/^wheel/,"wheel"],[/^claw/,"claw"],[/^rotor/,"rotor"],[/^wing/,"wing"],[/^barrel/,"barrel"],[/^shield/,"shield"],[/^piston/,"piston"],[/^antenna/,"antenna"],[/^glow/,"glow"],[/^eye/,"eye"],[/^float/,"float"],[/^leg/,"leg"]];function L_(r){const e=r.toLowerCase().trim();for(const[t,n]of C_)if(t.test(e))return n;return null}function P_(r){const t=r.toLowerCase().trim().split(/[_\-\s]+/);return t.length>=2?`${t[0]}:${t[1]}`:t[0]}function I_(r){r.updateMatrixWorld(!0);const e=new Vt().setFromObject(r),t=Math.max(.01,e.max.y-e.min.y),n=new Map,i=new Map;r.traverse(j=>{const L=j;if(!L.isMesh)return;const I=br(L.name);if(I){const O=i.get(I)??[];O.push(L),i.set(I,O);return}const F=L_(L.name);if(!F)return;const B=F==="glow"||F==="eye"?`${F}:${L.name}`:F==="rotor"||F==="barrel"||F==="shield"?F:P_(L.name),D=n.get(B)??{kind:F,meshes:[]};D.meshes.push(L),n.set(B,D)});const s=i.has("leftLeg")&&i.has("rightLeg"),o=i.has("leftArm")&&i.has("rightArm");if(n.size===0&&!s&&!o)return null;const a=j=>{const L=new Vt;for(const I of j)L.expandByObject(I);return L},l=(j,L,I)=>{const F=new Fe;F.name=j,F.position.copy(I),r.add(F),F.updateMatrixWorld(!0);for(const B of L)F.attach(B);return F},c=[],h=[];let u=!1;for(const{kind:j,meshes:L}of n.values()){if(j==="float"){u=!0;continue}const I=a(L),F=I.getCenter(new C),B=F.x>=0?1:-1;let D;switch(j){case"claw":case"wing":D=new C(B>0?I.min.x:I.max.x,F.y,j==="claw"?I.min.z:F.z);break;case"shield":case"antenna":D=new C(F.x,I.min.y,F.z);break;case"leg":D=new C(F.x,I.max.y,F.z);break;default:D=F.clone()}const O=l(`joint:${j}`,L,D);if(j==="glow")for(const H of L){const Z=Array.isArray(H.material)?H.material:[H.material];for(const ne of Z)ne.emissive&&h.push(ne)}c.push({kind:j,group:O,side:B,base:D.clone()})}c.some(j=>j.kind==="rotor"||j.kind==="wing")&&(u=!0);const d=h.map(j=>j.emissiveIntensity),f=i.get("weapon")??[];let g=null;if(f.length>0&&o){const j=a(f).getCenter(new C).x,L=a(i.get("leftArm")).getCenter(new C).x,I=a(i.get("rightArm")).getCenter(new C).x;g=Math.abs(j-L)<=Math.abs(j-I)?"leftArm":"rightArm",i.get(g).push(...f)}const x=(j,L)=>{const I=i.get(j);if(!I||I.length===0)return null;const F=I.filter(O=>br(O.name)!=="weapon"),B=a(F.length?F:I),D=B.getCenter(new C);return l(`joint:${j}`,I,new C(D.x,L?B.max.y:B.min.y,D.z))},m=s?x("leftLeg",!0):null,p=s?x("rightLeg",!0):null,y=o?x("leftArm",!0):null,_=o?x("rightArm",!0):null,v=x("head",!1),E=g==="leftArm"?y:_,b=E===y?_:y,A=new Fe;A.name="rigBody";const N=[...r.children];r.add(A);for(const j of N)A.attach(j);const M=(j,L,I)=>j+(L-j)*Math.max(0,Math.min(1,I));let w=0,k=0,V=0;return{update(j,L){w+=j;const I=L.state==="windup"?L.windup:0;V>.5&&I===0&&(k=1),V=I,k=Math.max(0,k-j*4);const F=L.moving?1:0;for(const B of c){const D=B.group;switch(B.kind){case"wheel":L.moving&&(D.rotation.x+=j*9);break;case"claw":D.rotation.y=-B.side*(.15+I*.7+(L.moving?Math.sin(w*10)*.08:0));break;case"rotor":D.rotation.y+=j*18;break;case"wing":D.rotation.z=B.side*Math.sin(w*14)*(.45+F*.2);break;case"barrel":D.position.z=B.base.z-k*t*.12;break;case"shield":D.rotation.x=-I*1.1+(L.moving?Math.sin(w*8)*.03:0);break;case"piston":D.position.y=B.base.y+(L.moving?Math.sin(w*8+B.side*Math.PI)*t*.05:0);break;case"antenna":D.rotation.z=Math.sin(w*3+B.side)*.12+(L.moving?Math.sin(w*12)*.1:0);break;case"leg":D.rotation.x=Math.sin(w*6+B.side)*.2*(u?1:F);break;case"eye":{const O=1+I*.5;D.scale.set(O,O,1);break}}}if(h.forEach((B,D)=>B.emissiveIntensity=d[D]*(.5+I*1.5+k)),m||y){const B=w*8,D=L.moving?Math.sin(B)*.6:0,O=L.moving?-Math.sin(B)*.4:Math.sin(w*2)*.05;m&&(m.rotation.x=D),p&&(p.rotation.x=-D);let H=O;I>0?H=M(0,-2,I):k>0&&(H=k>.6?M(-2,1.1,(1-k)/.4):M(1.1,0,(.6-k)/.6)),E&&(E.rotation.x=H),b&&(b.rotation.x=I>0?M(0,.5,I):k>0?-.3*k:-O),v&&(v.rotation.x=-.25*I+(L.moving?Math.sin(B)*.03:0)),A.rotation.y=I>0?.3*I:k>.6?M(.3,-.25,(1-k)/.4):M(-.25,0,(.6-k)/.6)}else A.rotation.y=0;A.position.y=u?t*.3+Math.sin(w*3)*t*.04:L.moving?Math.abs(Math.sin(w*8))*t*.025:0,A.rotation.x=I*-.12+k*.1}}}const Eo="[HERO X]",Ce={info(r,...e){console.info(`${Eo} ${r}`,...e)},warn(r,...e){console.warn(`${Eo} ${r}`,...e)},error(r,...e){console.error(`${Eo} ${r}`,...e)}},Yh={player:null,enemies:{},bosses:{}};function jo(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function Ac(r){return!jo(r)||typeof r.file!="string"||!r.file?null:{file:r.file,scale:typeof r.scale=="number"&&r.scale>0?r.scale:1,offsetY:typeof r.offsetY=="number"?r.offsetY:0,rotationY:typeof r.rotationY=="number"?r.rotationY:0,rotationX:typeof r.rotationX=="number"?r.rotationX:0}}function D_(r){if(!jo(r))return{...Yh,enemies:{},bosses:{}};const e={player:Ac(r.player),enemies:{},bosses:{}};for(const[t,n]of[["enemies",e.enemies],["bosses",e.bosses]]){const i=r[t];if(jo(i))for(const[s,o]of Object.entries(i)){const a=Ac(o);a&&(n[s]=a)}}return e}class N_{constructor(){this.models=new Map,this.manifest=Yh,this.loader=null,this.onPlayerReady=null}get loadedKeys(){return[...this.models.keys()]}has(e){return this.models.has(e)}async load(e){const t=e.endsWith("/")?e:e+"/";try{const i=await fetch(`${t}models/manifest.json`,{cache:"no-cache"});if(!i.ok){Ce.warn(`models/manifest.json 을 읽지 못했습니다 (${i.status}). 임시 모델을 씁니다.`);return}this.manifest=D_(await i.json())}catch(i){Ce.warn("models/manifest.json 을 읽지 못했습니다. 임시 모델을 씁니다.",i);return}const n=[];this.manifest.player&&n.push(this.loadOne("player",this.manifest.player,t));for(const[i,s]of Object.entries(this.manifest.enemies))s&&n.push(this.loadOne(`enemy:${i}`,s,t));for(const[i,s]of Object.entries(this.manifest.bosses))s&&n.push(this.loadOne(`boss:${i}`,s,t));await Promise.all(n)}async loadOne(e,t,n){this.loader??(this.loader=new Vx);try{const i=await this.loader.loadAsync(`${n}models/${t.file}`);this.models.set(e,{gltf:i,entry:t}),Ce.info(`모델 로드: ${e} ← ${t.file} (애니메이션 ${i.animations.length}개)`),e==="player"&&this.onPlayerReady?.()}catch(i){Ce.warn(`모델 '${t.file}' 을(를) 읽지 못해 '${e}' 는 임시 모델을 씁니다.`,i)}}createPlayerModel(){const e=this.models.get("player");return e?U_(e):null}createEnemyModel(e,t){const n=this.models.get(e);return n?k_(n,t):null}}const Hi=new N_;function Kh(r){const e=[],t=new Map;return r.traverse(n=>{const i=n;if(!i.isMesh)return;const s=o=>{let a=t.get(o);return a||(a=o.clone(),t.set(o,a),a.emissive&&e.push(a)),a};i.material=Array.isArray(i.material)?i.material.map(s):s(i.material)}),e}function Jh(r,e){const t=S_(r.gltf.scene),n=new Fe;n.add(t),t.traverse(c=>{const h=c;h.isMesh&&(h.castShadow=!0,h.receiveShadow=!1)}),t.rotation.set((r.entry.rotationX??0)*Math.PI/180,(r.entry.rotationY??0)*Math.PI/180,0),t.updateMatrixWorld(!0);let i=r.entry.scale??1;if(e){const c=new Vt().setFromObject(t),h=c.max.y-c.min.y;h>1e-6&&(i*=e/h)}t.scale.setScalar(i),t.updateMatrixWorld(!0);const s=new Vt().setFromObject(t),o=s.getCenter(new C);t.position.set(-o.x,-s.min.y+(r.entry.offsetY??0),-o.z);const a=r.gltf.animations,l=a.length>0?new xx(t):null;return{root:n,mixer:l,clips:a}}function Vn(r,...e){for(const t of e){const n=r.find(i=>i.name.toLowerCase().includes(t));if(n)return n}return null}function Zh(r){r.traverse(e=>{const t=e;t.isMesh&&(t.geometry.dispose(),(Array.isArray(t.material)?t.material:[t.material]).forEach(i=>i.dispose()))})}function U_(r){const{root:e,mixer:t,clips:n}=Jh(r,1.9);e.name="GltfHero";const i={idle:Vn(n,"idle","stand"),walk:Vn(n,"run","walk"),attack:Vn(n,"attack","slash","punch"),jump:Vn(n,"jump"),die:Vn(n,"die","death","dead")};let s=null;const o=(h,u=!0)=>{if(!t||!h)return;const d=t.clipAction(h);s!==d&&(d.reset(),d.setLoop(u?uh:hh,1/0),d.clampWhenFinished=!u,d.fadeIn(.12).play(),s?.fadeOut(.12),s=d)},a=t?null:R_(e);a&&Ce.info("플레이어 모델: 부품 이름 리그로 걷기·공격 동작을 만듭니다.");const l=Kh(e);let c=0;return{root:e,update(h,u){c+=h;const d=u.hurt??0;for(const f of l)f.emissive.setRGB(d*.6,0,0);a?a.update(h,u):t?(u.dead?o(i.die??i.idle,!1):u.attack!==null&&i.attack?o(i.attack,!1):u.airborne&&i.jump?o(i.jump,!1):u.moving?o(i.walk??i.idle):o(i.idle),t.update(h)):(e.rotation.z=u.moving?Math.sin(c*10)*.05:0,e.rotation.x=u.attack!==null?-.25*Math.sin(u.attack*Math.PI):0,e.scale.setScalar(u.dead?.6:1))},dispose(){t?.stopAllAction(),Zh(e)}}}function k_(r,e){const{root:t,mixer:n,clips:i}=Jh(r,e);t.name="GltfEnemy";const s=n?null:I_(t),o=Vn(i,"run","walk"),a=Vn(i,"idle"),l=Vn(i,"attack");let c=null;const h=x=>{if(!n||!x)return;const m=n.clipAction(x);c!==m&&(m.reset().fadeIn(.1).play(),c?.fadeOut(.1),c=m)},u=Kh(t),d=u.map(x=>x.emissive.clone());let f=0,g=0;return{root:t,update(x,m){if(g+=x,m.state==="dead"){const p=Math.max(0,1-m.death);t.scale.setScalar(p),t.position.y=-(1-p)*.5;return}s?s.update(x,m):n?(m.state==="windup"&&l?h(l):m.moving?h(o??a):h(a??o),n.update(x)):(t.position.y=m.moving?Math.abs(Math.sin(g*8))*.06:0,t.rotation.x=m.state==="windup"?-.2*m.windup:0),f>0&&(f-=x,f<=0&&u.forEach((p,y)=>p.emissive.copy(d[y])))},flash(){f=.09;for(const x of u)x.emissive.setScalar(.8)},dispose(){n?.stopAllAction(),Zh(t)}}}class F_{constructor(){this.state="idle",this.pattern=null,this.timer=0,this.total=0,this.cooldown=0,this.closeIndex=-1,this.chargeDir={x:0,z:1}}update(e,t,n,i,s){const o=s?i.phase2TimeMul:1,a=n.x-t.x,l=n.z-t.z,c=Math.hypot(a,l),h=c>1e-6?{x:a/c,z:l/c}:{x:0,z:1},u={x:0,z:0};this.cooldown>0&&(this.cooldown=Math.max(0,this.cooldown-e));const d={state:this.state,move:u,execute:null,windupPattern:null,windupProgress:0};switch(this.state){case"dead":return d;case"idle":return this.state="chase",{...d,state:this.state};case"chase":{if(this.cooldown<=0&&c<=i.engageRange){if(c>i.chargeMinRange&&i.useCharge!==!1)this.pattern="charge";else{const f=i.closePatterns&&i.closePatterns.length>0?i.closePatterns:["slam","barrage"];this.closeIndex=(this.closeIndex+1)%f.length,this.pattern=f[this.closeIndex]}return this.state="windup",this.timer=this.total=i.windup[this.pattern]*o,this.chargeDir=h,{...d,state:this.state,windupPattern:this.pattern,windupProgress:0}}return{...d,state:this.state,move:c>2.5?h:u}}case"windup":{this.timer-=e,this.chargeDir=h;const f=this.total>0?1-Math.max(0,this.timer)/this.total:1;if(this.timer>0)return{...d,state:this.state,windupPattern:this.pattern,windupProgress:f};const g=this.pattern;return g==="charge"?(this.state="charge",this.timer=i.chargeDuration,{...d,state:this.state,move:this.chargeDir,execute:"charge"}):(this.state="recover",this.timer=i.recover*o,{...d,state:this.state,execute:g})}case"charge":return this.timer-=e,this.timer>0?{...d,state:this.state,move:this.chargeDir}:(this.state="recover",this.timer=i.recover*o,{...d,state:this.state});case"recover":return this.timer-=e,this.timer>0?{...d,state:this.state}:(this.state="chase",this.cooldown=i.cooldown*o,{...d,state:this.state})}}stopCharge(){this.state==="charge"&&(this.timer=0)}kill(){this.state="dead"}}class Qh{constructor(e,t=0){this.maxHp=e,this.invulnerableTime=t,this.invulnerable=0,this.hp=e}get isDead(){return this.hp<=0}get ratio(){return this.maxHp>0?Math.max(0,Math.min(1,this.hp/this.maxHp)):0}takeDamage(e){return this.isDead||this.invulnerable>0||e<=0?!1:(this.hp=Math.max(0,this.hp-e),this.invulnerable=this.invulnerableTime,!0)}heal(e){this.isDead||e<=0||(this.hp=Math.min(this.maxHp,this.hp+e))}reset(e=this.maxHp){this.maxHp=e,this.hp=e,this.invulnerable=0}update(e){this.invulnerable>0&&(this.invulnerable=Math.max(0,this.invulnerable-e))}}class O_{constructor(){this.state="idle",this.cooldown=0,this.windup=0,this.windupTotal=0,this.hurtTimer=0}get windupProgress(){return this.state==="windup"&&this.windupTotal>0?1-this.windup/this.windupTotal:0}update(e,t,n,i){const s=n.x-t.x,o=n.z-t.z,a=Math.hypot(s,o),l=a>1e-6?{x:s/a,z:o/a}:{x:0,z:0};this.cooldown>0&&(this.cooldown=Math.max(0,this.cooldown-e));const c={x:0,z:0},h=i.attackKind==="ranged";switch(this.state){case"dead":return{move:c,attackNow:!1,state:this.state};case"hurt":return this.hurtTimer-=e,this.hurtTimer<=0&&(this.state="chase"),{move:c,attackNow:!1,state:this.state};case"idle":return a<=i.aggroRange&&(this.state="chase"),{move:c,attackNow:!1,state:this.state};case"chase":return a>i.aggroRange*1.5?(this.state="idle",{move:c,attackNow:!1,state:this.state}):h&&i.retreatRange!==void 0&&a<i.retreatRange?{move:{x:-l.x,z:-l.z},attackNow:!1,state:this.state}:a<=i.attackRange&&this.cooldown<=0?(this.state="windup",this.windup=this.windupTotal=i.attackWindup,{move:c,attackNow:!1,state:this.state}):{move:a<=i.attackRange?c:l,attackNow:!1,state:this.state};case"windup":{if(this.windup-=e,this.windup>0)return{move:c,attackNow:!1,state:this.state};this.cooldown=i.attackCooldown,this.state="chase";const u=h?i.attackRange*1.3:i.attackRange+.4;return{move:c,attackNow:a<=u,state:this.state}}}}onHurt(e=.15){this.state!=="dead"&&(this.state="hurt",this.hurtTimer=e)}kill(){this.state="dead"}}function z_(r,e){const t=Hi.createEnemyModel(`enemy:${r}`,e.radius*2.8);if(t)return t;switch(e.model??r){case"tank":return H_(e);case"shooter":return G_(e);case"rusher":default:return V_(e)}}function B_(r){return fe({color:new ue(r.color).lerp(new ue(10134450),.6),roughness:.35,metalness:.85})}function H_(r){const e=new Fe;e.name=`Enemy-${r.name}`;const t=r.radius,n=fe({color:new ue(r.color)}),i=fe({color:2764605}),s=fe({color:10134450}),o=jt(16765503,2.2),a=new oe(new xe(t*1.7,t*1.5,t*1.4),n);a.position.y=t*1.1,a.castShadow=!0,e.add(a);for(const f of[-1,1]){const g=new oe(new xe(t*.5,t*.6,t*1.7),i);g.position.set(f*t*.85,t*.3,0),g.castShadow=!0,e.add(g);const x=new oe(new ht(t*.13,8,6),o);x.position.set(f*t*.35,t*1.5,t*.72),e.add(x)}for(const f of[-1,1]){const g=new oe(new ct(t*.12,t*.14,t*.7,8),i);g.position.set(f*t*.45,t*2.1,-t*.45),e.add(g)}const l=[];for(const f of[-1,1]){const g=new oe(new ct(t*.1,t*.1,t*.6,8),s);g.position.set(f*t*.95,t*.75,-t*.4),e.add(g),l.push(g)}const c=new Fe;c.position.set(0,t*1.7,t*.6);const h=new oe(new xe(t*1.9,t*1.6,t*.2),s);h.position.set(0,-t*.7,t*.3),h.castShadow=!0,c.add(h),e.add(c);let u=0,d=Math.random()*10;return{root:e,update(f,g){if(d+=f,g.state==="dead"){const x=Math.max(0,1-g.death);e.scale.setScalar(x),e.position.y=-(1-x)*t,e.rotation.y+=f*6;return}a.position.y=t*1.1+(g.moving?Math.abs(Math.sin(d*8))*.04:0),l[0].position.y=t*.75+(g.moving?Math.sin(d*8)*.12:0),l[1].position.y=t*.75+(g.moving?-Math.sin(d*8)*.12:0),c.rotation.x=-g.windup*1.3,o.emissive.setRGB(1,.82-g.windup*.6,.25-g.windup*.2),o.emissiveIntensity=1.6+Math.sin(d*4)*.4+g.windup*1.5,u>0&&(u-=f,n.emissive.setScalar(u>0?.9:0))},flash(){u=.09,n.emissive.setScalar(.9)},dispose(){e.traverse(f=>{const g=f;if(g.isMesh){g.geometry.dispose();const x=g.material;Array.isArray(x)?x.forEach(m=>m.dispose()):x.dispose()}})}}}function G_(r){const e=new Fe;e.name=`Enemy-${r.name}`;const t=r.radius,n=fe({color:new ue(r.color),flatShading:!0,roughness:.5,metalness:.5}),i=fe({color:2764605}),s=jt(16733559,2.5),o=new Fe;e.add(o);const a=new oe(new An(t*.9,1),n);a.position.y=t*1.6,a.castShadow=!0,o.add(a);const l=new oe(new ga(t*1.1,t*.12,8,20),i);l.position.y=t*1.6,l.rotation.x=Math.PI/2,o.add(l);const c=new oe(new ct(t*.16,t*.2,t*1,10),i);c.rotation.x=Math.PI/2,c.position.set(0,t*1.6,t*1.1),o.add(c);const h=new oe(new ht(t*.2,8,6),s);h.position.set(0,t*1.6,t*1.6),o.add(h);const u=new Fe;u.position.y=t*2.55;for(let p=0;p<3;p++){const y=new oe(new xe(t*1.4,t*.04,t*.16),i);y.rotation.y=p/3*Math.PI*2,u.add(y)}o.add(u);const d=new oe(new ht(t*.14,8,6),jt(6091480,1.6));d.position.set(0,t*.85,t*.35),o.add(d);let f=0,g=Math.random()*10,x=0,m=0;return{root:e,update(p,y){if(g+=p,y.state==="dead"){const _=Math.max(0,1-y.death);e.scale.setScalar(_),e.position.y=-(1-_)*t,e.rotation.y+=p*8;return}o.position.y=Math.sin(g*3)*.08,l.rotation.z+=p*2,u.rotation.y+=p*(y.moving?28:18),o.rotation.x=y.moving?.15:0,x>.6&&y.windup===0&&(m=1),x=y.windup,m=Math.max(0,m-p*5),c.position.z=t*1.1-m*t*.3,h.position.z=t*1.6-m*t*.3,h.scale.setScalar(1+y.windup*1.5),s.color.setRGB(1,.33+y.windup*.6,.47+y.windup*.5),f>0&&(f-=p,n.emissive.setScalar(f>0?.9:0))},flash(){f=.09,n.emissive.setScalar(.9)},dispose(){e.traverse(p=>{const y=p;if(y.isMesh){y.geometry.dispose();const _=y.material;Array.isArray(_)?_.forEach(v=>v.dispose()):_.dispose()}})}}}function V_(r){const e=new Fe;e.name=`Enemy-${r.name}`;const t=r.radius,n=fe({color:new ue(r.color)}),i=fe({color:2764605}),s=fe({color:16777215}),o=fe({color:1710626,roughness:.3}),a=new oe(new xe(t*1.6,t*1.4,t*1.6),n);a.position.y=t*1.1,a.castShadow=!0,e.add(a);const l=new oe(new xe(t*1.9,t*.5,t*1.9),i);l.position.y=t*.25,l.castShadow=!0,e.add(l);const c=new oe(new ht(t*.32,12,10),s);c.position.set(0,t*1.35,t*.75),e.add(c);const h=new oe(new ht(t*.16,10,8),o);h.position.set(0,t*1.35,t*1),e.add(h);const u=new oe(new ct(.03,.03,t*.8,6),i);u.position.set(0,t*2.1,0),e.add(u);const d=jt(r.color,2.5),f=new oe(new ht(.08,8,6),d);f.position.set(0,t*2.5,0),e.add(f);const g=fe({color:1711398,roughness:.7,metalness:.3}),x=[];for(const _ of[-1,1])for(const v of[-1,1]){const E=new oe(new ct(t*.3,t*.3,t*.22,12),g);E.rotation.z=Math.PI/2,E.position.set(_*t*1,t*.3,v*t*.6),E.castShadow=!0,e.add(E),x.push(E)}const m=[];for(const _ of[-1,1]){const v=new Fe;v.position.set(_*t*.85,t*1,t*.5);const E=new oe(new xe(t*.18,t*.18,t*.7),i);E.position.z=t*.35,v.add(E);const b=new oe(new mn(t*.14,t*.35,4),B_(r));b.rotation.x=Math.PI/2,b.position.z=t*.85,v.add(b),e.add(v),m.push(v)}let p=0,y=Math.random()*10;return{root:e,update(_,v){if(y+=_,v.state==="dead"){const b=Math.max(0,1-v.death);e.scale.setScalar(b),e.position.y=-(1-b)*t,e.rotation.y+=_*8;return}if(a.position.y=t*1.1+(v.moving?Math.abs(Math.sin(y*14))*.06:0),v.moving)for(const b of x)b.rotation.x+=_*9;const E=v.windup;h.scale.setScalar(1+E*1.2),h.material.emissive.setRGB(.1+E*.9,.1,.13),a.rotation.x=-E*.35,m[0].rotation.y=-.2-E*.9,m[1].rotation.y=.2+E*.9,d.emissiveIntensity=1.8+Math.sin(y*6)*.7+E*2,p>0&&(p-=_,n.emissive.setScalar(p>0?.9:0))},flash(){p=.09,n.emissive.setScalar(.9)},dispose(){e.traverse(_=>{const v=_;if(v.isMesh){v.geometry.dispose();const E=v.material;Array.isArray(E)?E.forEach(b=>b.dispose()):E.dispose()}})}}}class eu{constructor(e,t,n,i={hp:1,speed:1},s=z_){this.type=e,this.mul=i,this.object3d=new Fe,this.ai=new O_,this.facing=0,this.knock={x:0,z:0},this.deathTimer=0,this.def=t,this.health=new Qh(Math.max(1,Math.round(t.hp*i.hp)),0),this.model=s(e,t),this.object3d.name=`Enemy-${e}`,this.object3d.add(this.model.root),this.object3d.position.set(n.x,0,n.z),this.facing=Math.random()*Math.PI*2,this.object3d.rotation.y=this.facing}get position(){return this.object3d.position}get radius(){return this.def.radius}get alive(){return!this.health.isDead}get removable(){return this.health.isDead&&this.deathTimer>=Y.enemies.deathDuration}hit(e,t,n){if(!this.health.takeDamage(e))return!1;const i=this.def.knockbackResist??1;return this.knock.x+=t.x*n*i,this.knock.z+=t.z*n*i,this.model.flash(),this.health.isDead?this.ai.kill():this.onHurtEffect(),!0}onHurtEffect(){this.ai.onHurt()}update(e,t){if(this.health.isDead){this.deathTimer+=e,this.model.update(e,{state:"dead",moving:!1,windup:0,death:Math.min(1,this.deathTimer/Math.max(.01,Y.enemies.deathDuration))});return}const n=this.object3d.position,i={x:n.x,z:n.z},s=this.ai.update(e,i,t.playerPos,this.def);let o={x:n.x+s.move.x*this.def.speed*this.mul.speed*e+this.knock.x*e,z:n.z+s.move.z*this.def.speed*this.mul.speed*e+this.knock.z*e};const a=Math.exp(-8*e);this.knock.x*=a,this.knock.z*=a;const l=Y.enemies.separation;for(const h of t.others){if(h===this||!h.alive)continue;const u=o.x-h.position.x,d=o.z-h.position.z,f=this.radius+h.radius+.2,g=u*u+d*d;if(g<f*f&&g>1e-6){const x=Math.sqrt(g),m=(1-x/f)*l*e;o={x:o.x+u/x*m,z:o.z+d/x*m}}}if(o=ya(o,this.radius,t.world.getObstacleBoxes()),o=Ma(o,t.world.getArenaHalfSize(),this.radius),n.x=o.x,n.z=o.z,s.state==="chase"||s.state==="windup"){const h=Dr({x:t.playerPos.x-n.x,z:t.playerPos.z-n.z});this.facing=ba(this.facing,h,1-Math.exp(-10*e))}this.object3d.rotation.y=this.facing,s.attackNow&&t.onAttackPlayer(this,this.def.damage);const c=s.move.x!==0||s.move.z!==0;this.model.update(e,{state:s.state,moving:c,windup:this.ai.windupProgress,death:0})}dispose(){this.object3d.removeFromParent(),this.model.dispose()}}function W_(r=Y.boss){return{name:r.name,hp:r.hp,speed:r.speed,radius:r.radius,damage:r.contactDamage,attackRange:r.engageRange,attackWindup:r.windup.slam,attackCooldown:r.cooldown,aggroRange:999,color:r.color,score:r.score,knockbackResist:r.knockbackResist}}class q_ extends eu{constructor(e,t,n=Y.boss){super("boss",W_(n),e,t,(i,s)=>X_(s,n.model)),this.cfg=n,this.bossAI=new F_,this.chargeHit=!1}get phase2(){return this.health.ratio<=this.cfg.phase2Ratio}hit(e,t,n){const i=super.hit(e,t,n);return i&&this.health.isDead&&this.bossAI.kill(),i}onHurtEffect(){}update(e,t){const n=t;if(this.health.isDead){this.deathTimer+=e,this.model.update(e,{state:"dead",moving:!1,windup:0,death:Math.min(1,this.deathTimer/Math.max(.01,Y.enemies.deathDuration))});return}const i=this.cfg,s=this.object3d.position,o={x:s.x,z:s.z},a=this.bossAI.update(e,o,t.playerPos,i,this.phase2),l=this.phase2?i.phase2SpeedMul:1,c=a.state==="charge"?i.charge.speed:this.def.speed*this.mul.speed*l;let h={x:s.x+a.move.x*c*e+this.knock.x*e,z:s.z+a.move.z*c*e+this.knock.z*e};const u=Math.exp(-8*e);this.knock.x*=u,this.knock.z*=u,h=ya(h,this.radius,t.world.getObstacleBoxes()),h=Ma(h,t.world.getArenaHalfSize(),this.radius),a.state==="charge"&&Math.hypot(h.x-s.x,h.z-s.z)<c*e*.3&&this.bossAI.stopCharge(),s.x=h.x,s.z=h.z;const d=a.state==="charge"?a.move:{x:t.playerPos.x-s.x,z:t.playerPos.z-s.z};(d.x!==0||d.z!==0)&&(this.facing=ba(this.facing,Dr(d),1-Math.exp(-(a.state==="charge"?30:6)*e))),this.object3d.rotation.y=this.facing,a.execute==="charge"&&(this.chargeHit=!1),a.execute==="slam"&&n.onBossAttack(this,{kind:"slam",radius:i.slam.radius,damage:i.slam.damage}),a.execute==="barrage"&&n.onBossAttack(this,{kind:"barrage",count:this.phase2?i.barrage.phase2Count:i.barrage.count,aimed:this.phase2,damage:i.barrage.damage,speed:i.barrage.speed}),a.execute==="summon"&&n.onBossAttack(this,{kind:"summon",type:i.summon.type,count:this.phase2?i.summon.phase2Count:i.summon.count,maxAlive:i.summon.maxAlive}),a.execute==="mortar"&&n.onBossAttack(this,{kind:"mortar",count:this.phase2?i.mortar.phase2Count:i.mortar.count,delay:i.mortar.delay,radius:i.mortar.radius,damage:i.mortar.damage,spread:i.mortar.spread}),a.state==="charge"&&!this.chargeHit&&Math.hypot(t.playerPos.x-s.x,t.playerPos.z-s.z)<this.radius+n.playerRadius&&(this.chargeHit=!0,n.onBossAttack(this,{kind:"contact",damage:i.contactDamage}));const f=a.move.x!==0||a.move.z!==0,g={state:a.state==="windup"?"windup":a.state==="dead"?"dead":"chase",moving:f,windup:a.windupProgress,death:0,pattern:a.windupPattern??(a.state==="charge"?"charge":null),phase2:this.phase2};this.model.update(e,g)}}function X_(r,e="guardian"){const t=Hi.createEnemyModel(`boss:${e}`,r.radius*3);if(t)return t;const n=new Fe;n.name=`Boss-${r.name}`;const i=r.radius,s=fe({color:new ue(r.color)}),o=fe({color:e==="commander"?3816516:2764605}),a=fe({color:e==="golem"?9431295:e==="commander"?11548975:16765503}),l=jt(6091480,2.5),c=new Bt({color:16777215,transparent:!0,opacity:0}),h=e==="golem"?new Pr(i*.95,0):e==="commander"?new xe(i*1.9,i*1.2,i*1.3):new xe(i*1.5,i*1.3,i*1.2),u=new oe(h,s);u.position.y=i*1.3,u.castShadow=!0,n.add(u);const d=new oe(new xe(i*1.3,i*.6,i*1),o);d.position.y=i*.35,d.castShadow=!0,n.add(d);const f=e==="golem"?new An(i*.42,0):new xe(i*.8,i*.6,i*.8),g=new oe(f,s);g.position.y=i*2.3,g.castShadow=!0,n.add(g);for(const v of[-1,1]){const E=new oe(new ht(i*.1,8,6),l);if(E.position.set(v*i*.2,i*2.35,i*.42),n.add(E),e==="golem"){const b=new oe(new mn(i*.22,i*.9,5),a);b.position.set(v*i*.6,i*2.2,-i*.3),b.rotation.z=-v*.5,n.add(b)}else if(e==="commander"){const b=new oe(new ct(i*.16,i*.2,i*.9,8),o);b.position.set(v*i*.75,i*2.2,i*.2),b.rotation.x=Math.PI/2-.35,n.add(b)}else{const b=new oe(new mn(i*.12,i*.4,5),a);b.position.set(v*i*.25,i*2.75,0),n.add(b)}}if(e==="guardian"){const v=new oe(new mn(i*.16,i*.5,5),a);v.position.y=i*2.85,n.add(v)}if(e==="golem")for(let v=0;v<5;v++){const E=new oe(new mn(i*.12,i*.5+v%2*i*.2,4),a),b=v/5*Math.PI*2;E.position.set(Math.cos(b)*i*.8,i*1.5+Math.sin(v)*i*.2,Math.sin(b)*i*.8),E.rotation.set(Math.sin(b)*.9,0,-Math.cos(b)*.9),n.add(E)}const x=[];for(const v of[-1,1]){const E=new Fe;E.position.set(v*i*(e==="commander"?1.15:.95),i*1.8,0);const b=new oe(new xe(i*.3,i*1.1,i*.3),o);b.position.y=-i*.55,b.castShadow=!0,E.add(b);const A=e==="golem"?new ht(i*.34,8,6):e==="commander"?new ct(i*.18,i*.24,i*.9,8):new xe(i*.55,i*.4,i*.55),N=new oe(A,e==="commander"?o:a);N.position.y=-i*1.2,N.castShadow=!0,E.add(N),n.add(E),x.push(E)}const m=new oe(new ui(i*.9,i*1.1,32),c);m.rotation.x=-Math.PI/2,m.position.y=.06,n.add(m);let p=0,y=0;const _={charge:16742981,slam:16732025,barrage:11561983,summon:9431295,mortar:16757071};return{root:n,update(v,E){const b=E;if(y+=v,b.state==="dead"){const k=Math.max(0,1-b.death);n.scale.setScalar(k),n.position.y=-(1-k)*i,n.rotation.y+=v*3;return}l.emissive.set(b.phase2?16726843:6091480),l.emissiveIntensity=2+Math.sin(y*(b.phase2?8:3))*.8,u.position.y=i*1.3+(b.moving?Math.abs(Math.sin(y*6))*.08:0);const A=1+Math.sin(y*1.6)*.02;u.scale.set(A,1/A,A);const N=b.windup,M=b.pattern??null;c.opacity=M&&b.state==="windup"?.25+N*.55:M==="charge"?.5:0,M&&c.color.set(_[M]),m.scale.setScalar(M==="slam"?1+N*1.6:1);const w=M==="slam"?-2.6*N:M==="charge"?-1.2:M==="barrage"?-1.6*N:M==="summon"?-3*N:M==="mortar"?-1.4:0;for(const k of x)k.rotation.x+=(w-k.rotation.x)*(1-Math.exp(-12*v));u.rotation.x=M==="charge"?.25:M==="slam"?-.15*N:0,p>0&&(p-=v,s.emissive.setScalar(p>0?.9:0))},flash(){p=.09,s.emissive.setScalar(.9)},dispose(){n.traverse(v=>{const E=v;if(E.isMesh){E.geometry.dispose();const b=E.material;Array.isArray(b)?b.forEach(A=>A.dispose()):b.dispose()}})}}}class j_{constructor(e){this.scene=e,this.enemies=[],this.multipliers={hp:1,speed:1}}spawnFromConfig(e=Y.enemies.spawns){for(const t of e){if(!Y.enemies.types[t.type]){Ce.warn(`적 종류 '${t.type}' 이(가) GameConfig.enemies.types 에 없어 배치를 건너뜁니다.`);continue}this.spawn(t.type,t.x,t.z)}}spawn(e,t,n){const i=Y.enemies.types[e];if(!i)return null;const s=new eu(e,i,{x:t,z:n},{...this.multipliers});return this.scene.add(s.object3d),this.enemies.push(s),s}addEnemy(e){this.scene.add(e.object3d),this.enemies.push(e)}getEnemies(){return this.enemies}get aliveCount(){return this.enemies.reduce((e,t)=>e+(t.alive?1:0),0)}update(e,t){const n={...t,others:this.enemies};for(const i of this.enemies)i.update(e,n);for(let i=this.enemies.length-1;i>=0;i--)this.enemies[i].removable&&(this.enemies[i].dispose(),this.enemies.splice(i,1))}clear(){this.enemies.forEach(e=>e.dispose()),this.enemies.length=0}dispose(){this.clear()}}function Rc(r){const e=r;if(!e||!e.tagName)return!1;const t=e.tagName.toUpperCase();return t==="INPUT"||t==="TEXTAREA"||t==="SELECT"||e.isContentEditable===!0}class $_{constructor(){this.pressed=new Set,this.pressHandlers=new Map,this.pointer={x:0,y:0,has:!1},this.cleanup=[],this.virtualAxis={x:0,z:0}}attach(e=window,t){const n=u=>{Rc(u.target)||(u.repeat||this.press(u.code),this.isGameKey(u.code)&&u.preventDefault())},i=u=>{this.pressed.delete(u.code)},s=()=>this.pressed.clear(),o=()=>{document.hidden&&s()},a=u=>{if(u.pointerType==="touch")return;const d=t?t.getBoundingClientRect():{left:0,top:0,width:window.innerWidth,height:window.innerHeight};this.pointer.x=(u.clientX-d.left)/d.width*2-1,this.pointer.y=-((u.clientY-d.top)/d.height)*2+1,this.pointer.has=!0},l=u=>{Rc(u.target)||u.pointerType==="touch"||(a(u),this.press(`Mouse${u.button}`))},c=u=>{u.pointerType!=="touch"&&this.pressed.delete(`Mouse${u.button}`)},h=u=>u.preventDefault();e.addEventListener("keydown",n),e.addEventListener("keyup",i),e.addEventListener("blur",s),e.addEventListener("pointermove",a),e.addEventListener("pointerdown",l),e.addEventListener("pointerup",c),e.addEventListener("pointercancel",c),document.addEventListener("visibilitychange",o),t?.addEventListener("contextmenu",h),this.cleanup=[()=>e.removeEventListener("keydown",n),()=>e.removeEventListener("keyup",i),()=>e.removeEventListener("blur",s),()=>e.removeEventListener("pointermove",a),()=>e.removeEventListener("pointerdown",l),()=>e.removeEventListener("pointerup",c),()=>e.removeEventListener("pointercancel",c),()=>document.removeEventListener("visibilitychange",o),()=>t?.removeEventListener("contextmenu",h)]}detach(){this.cleanup.forEach(e=>e()),this.cleanup=[],this.pressed.clear()}onPress(e,t){for(const n of e){const i=this.pressHandlers.get(n)??[];i.push(t),this.pressHandlers.set(n,i)}}isDown(e){return this.pressed.has(e)}isActionDown(e){return e.some(t=>this.pressed.has(t))}getPointer(){return this.pointer}getPressedCodes(){return[...this.pressed]}getMoveAxis(){const e=Y.controls,t={x:(this.isActionDown(e.right)?1:0)-(this.isActionDown(e.left)?1:0),z:(this.isActionDown(e.down)?1:0)-(this.isActionDown(e.up)?1:0)};return t.x===0&&t.z===0?{x:this.virtualAxis.x,z:this.virtualAxis.z}:t}setVirtualAxis(e,t){const n=Math.hypot(e,t),i=n>1?1/n:1;this.virtualAxis.x=e*i,this.virtualAxis.z=t*i}pressVirtual(e){!e||this.pressed.has(e)||this.press(e)}releaseVirtual(e){this.pressed.delete(e)}press(e){this.pressed.add(e),this.pressHandlers.get(e)?.forEach(t=>t())}isGameKey(e){return Object.values(Y.controls).some(t=>t.includes(e))}}function Cc(r,e){try{r.setPointerCapture(e)}catch{}}class Y_{constructor(e,t,n,i){this.input=t,this.stickPointer=null,this.stickCenter={x:0,y:0},this.radius=56,this.floating=!0;const s=Y.controls;this.el=document.createElement("div"),this.el.className="touch",this.el.hidden=!0,this.el.innerHTML=`
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
      </div>`,e.appendChild(this.el),this.stick=this.el.querySelector("#touch-stick"),this.knob=this.stick.querySelector(".touch-knob"),this.zone=this.el.querySelector("#touch-zone"),this.interactBtn=this.el.querySelector("#touch-interact");const o=(c,h,u)=>{this.stickPointer===null&&(h.preventDefault(),this.stickPointer=h.pointerId,Cc(c,h.pointerId),this.stickCenter=u,this.moveStick(h.clientX,h.clientY))},a=c=>{c.pointerId===this.stickPointer&&(c.preventDefault(),this.moveStick(c.clientX,c.clientY))},l=c=>{c.pointerId===this.stickPointer&&(this.stickPointer=null,this.knob.style.transform="translate(0px, 0px)",this.input.setVirtualAxis(0,0),this.floating&&this.stick.classList.remove("active"))};this.stick.addEventListener("pointerdown",c=>{const h=this.stick.getBoundingClientRect();o(this.stick,c,{x:h.left+h.width/2,y:h.top+h.height/2})}),this.stick.addEventListener("pointermove",a),this.stick.addEventListener("pointerup",l),this.stick.addEventListener("pointercancel",l),this.zone.addEventListener("pointerdown",c=>{!this.floating||this.stickPointer!==null||(this.placeStick(c.clientX,c.clientY),this.stick.classList.add("active"),o(this.zone,c,{x:c.clientX,y:c.clientY}))}),this.zone.addEventListener("pointermove",a),this.zone.addEventListener("pointerup",l),this.zone.addEventListener("pointercancel",l),this.el.querySelectorAll(".touch-btn").forEach(c=>{const h=c.dataset.code??"",u=f=>{f.preventDefault(),Cc(c,f.pointerId),c.classList.add("down"),this.input.pressVirtual(h)},d=()=>{c.classList.remove("down"),this.input.releaseVirtual(h)};c.addEventListener("pointerdown",u),c.addEventListener("pointerup",d),c.addEventListener("pointercancel",d),c.addEventListener("contextmenu",f=>f.preventDefault())}),this.setFloating(!0),this.el.querySelector("#touch-menu")?.addEventListener("click",n),this.el.querySelector("#touch-inventory")?.addEventListener("click",i),this.el.addEventListener("contextmenu",c=>c.preventDefault())}placeStick(e,t){const n=this.el.getBoundingClientRect(),i=this.stick.offsetWidth/2||68;this.stick.style.left=`${e-n.left-i}px`,this.stick.style.top=`${t-n.top-i}px`,this.stick.style.bottom="auto"}setFloating(e){this.floating=e,this.el.classList.toggle("floating",e),this.stick.classList.remove("active"),this.stick.style.left="",this.stick.style.top="",this.stick.style.bottom=""}get isFloating(){return this.floating}moveStick(e,t){let n=e-this.stickCenter.x,i=t-this.stickCenter.y;const s=Math.hypot(n,i);s>this.radius&&(n=n/s*this.radius,i=i/s*this.radius),this.knob.style.transform=`translate(${n}px, ${i}px)`;const o=.15,a=Math.abs(n/this.radius)<o?0:n/this.radius,l=Math.abs(i/this.radius)<o?0:i/this.radius;this.input.setVirtualAxis(a,l)}get visible(){return!this.el.hidden}setLeftHanded(e){this.el.classList.toggle("lefty",e)}setButtonScale(e){this.el.style.setProperty("--touch-scale",String(e))}setDodgeCooldown(e){const t=this.el.querySelector("#touch-dodge");t&&(t.style.opacity=e>0?String(.35+(1-e)*.3):"",t.classList.toggle("cooling",e>0))}setInteract(e){this.interactBtn.hidden=!e}show(){this.el.hidden=!1}hide(){this.el.hidden=!0,this.stickPointer=null,this.stick.classList.remove("active"),this.knob.style.transform="translate(0px, 0px)",this.input.setVirtualAxis(0,0),this.el.querySelectorAll(".touch-btn").forEach(e=>{e.classList.remove("down"),this.input.releaseVirtual(e.dataset.code??"")})}}const xi=["melee","ranged","armor","trinket1","trinket2"],Lc={melee:"근접 무기",ranged:"원거리 무기",armor:"방어구",trinket1:"장신구 1",trinket2:"장신구 2"};function tu(r){return r==="trinket"?["trinket1","trinket2"]:[r]}class K_{constructor(){this.inventory=[],this.equipped={melee:null,ranged:null,armor:null,trinket1:null,trinket2:null}}add(e){return this.inventory.length>=Y.equipment.inventorySize?!1:(this.inventory.push(e),!0)}get isFull(){return this.inventory.length>=Y.equipment.inventorySize}discard(e){const t=this.inventory.findIndex(n=>n.uid===e);return t<0?!1:(this.inventory.splice(t,1),!0)}targetSlot(e){const t=tu(e.category);return t.find(n=>this.equipped[n]===null)??t[0]}equip(e){const t=this.inventory.findIndex(o=>o.uid===e);if(t<0)return null;const n=this.inventory[t],i=this.targetSlot(n);this.inventory.splice(t,1);const s=this.equipped[i];return this.equipped[i]=n,s&&this.inventory.push(s),i}unequip(e){const t=this.equipped[e];return!t||this.isFull?!1:(this.equipped[e]=null,this.inventory.push(t),!0)}totals(){const e={attack:0,defense:0,maxHp:0,moveSpeed:0};for(const t of xi){const n=this.equipped[t];n&&(e.attack+=n.stats.attack,e.defense+=n.stats.defense,e.maxHp+=n.stats.maxHp,e.moveSpeed+=n.stats.moveSpeed)}return e}weaponAttack(e){return this.equipped[e]?.stats.attack??0}compare(e){const t=this.equipped[this.targetSlot(e)];return{attack:e.stats.attack-(t?.stats.attack??0),defense:e.stats.defense-(t?.stats.defense??0),maxHp:e.stats.maxHp-(t?.stats.maxHp??0),moveSpeed:Math.round((e.stats.moveSpeed-(t?.stats.moveSpeed??0))*100)/100}}reset(){this.inventory.length=0;for(const e of xi)this.equipped[e]=null}}function J_(r,e){if(r<=0)return 0;const t=Y.equipment.defenseScale;return Math.max(1,Math.round(r*(t/(t+Math.max(0,e)))))}const di=[{id:"sword_basic",name:"에너지 검",category:"melee",base:{attack:4},description:"기본형 에너지 검. 가볍고 다루기 쉽다."},{id:"axe_heavy",name:"플라즈마 도끼",category:"melee",base:{attack:7,moveSpeed:-.05},description:"무겁지만 한 방이 세다. 이동이 조금 느려진다."},{id:"hammer_pulse",name:"펄스 망치",category:"melee",base:{attack:9,moveSpeed:-.1},description:"충격파를 내는 망치. 느리지만 강력하다."},{id:"blaster_basic",name:"소형 블래스터",category:"ranged",base:{attack:3},description:"빠르게 쏠 수 있는 기본 블래스터."},{id:"bow_photon",name:"광자 활",category:"ranged",base:{attack:5},description:"빛의 화살을 쏘는 활."},{id:"cannon_arc",name:"아크 캐논",category:"ranged",base:{attack:8,moveSpeed:-.05},description:"전기를 뿜는 대형 캐논."},{id:"vest_light",name:"경량 조끼",category:"armor",base:{defense:6},description:"움직임을 방해하지 않는 가벼운 방어구."},{id:"plate_steel",name:"강철 갑옷",category:"armor",base:{defense:12,maxHp:10,moveSpeed:-.05},description:"튼튼한 강철판 갑옷."},{id:"suit_nano",name:"나노 슈트",category:"armor",base:{defense:9,moveSpeed:.05},description:"몸에 딱 맞는 첨단 슈트. 조금 더 빨라진다."},{id:"ring_vitality",name:"생명의 반지",category:"trinket",base:{maxHp:20},description:"최대 체력을 늘려 준다."},{id:"boots_wind",name:"바람 신발",category:"trinket",base:{moveSpeed:.12},description:"이동 속도가 빨라진다."},{id:"amulet_power",name:"힘의 목걸이",category:"trinket",base:{attack:2,defense:2},description:"공격과 방어를 조금씩 올려 준다."},{id:"spear_crystal",name:"수정 창",category:"melee",base:{attack:6,moveSpeed:.04},description:"수정 동굴에서 캔 가볍고 날카로운 창."},{id:"rifle_rail",name:"레일 라이플",category:"ranged",base:{attack:10,moveSpeed:-.08},description:"돌 골렘의 심장석을 박아 만든 강력한 총. 무겁다."},{id:"cloak_shadow",name:"그림자 망토",category:"armor",base:{defense:7,moveSpeed:.1},description:"얇지만 몸놀림이 빨라지는 망토."},{id:"core_fortress",name:"요새 코어",category:"trinket",base:{defense:6,maxHp:15},description:"요새의 동력 코어. 단단해진다."}],Z_={attack:0,defense:0,maxHp:0,moveSpeed:0};let Q_=1;function Sr(r,e){const t=Y.equipment.rarities[e],n={...Z_};for(const i of Object.keys(n)){const s=r.base[i]??0;n[i]=i==="moveSpeed"?Math.round(s*(s>0?t.statMul:1)*100)/100:Math.round(s*t.statMul)}return{uid:Q_++,templateId:r.id,name:t.prefix?`${t.prefix} ${r.name}`:r.name,category:r.category,rarity:e,stats:n,description:r.description}}function nu(r=Math.random){const e=Object.entries(Y.equipment.rarities),t=e.reduce((i,[,s])=>i+s.weight,0);let n=r()*t;for(const[i,s]of e)if(n-=s.weight,n<=0)return i;return e[e.length-1][0]}function Pc(r=Math.random){const e=di[Math.min(di.length-1,Math.floor(r()*di.length))];return Sr(e,nu(r))}const Ic=["common","uncommon","rare","epic","legendary"];function ev(r,e=Math.random){const t=di[Math.min(di.length-1,Math.floor(e()*di.length))],n=nu(e),i=Ic.indexOf(n)>=Ic.indexOf(r)?n:r;return Sr(t,i)}function wr(r){return di.find(e=>e.id===r)}function tv(r,e,t=Math.random,n){const i=[];if(i.push({kind:"xp",amount:Math.max(1,Math.round(r*e.xpPerScore))}),t()<e.healChance&&i.push({kind:"heal",amount:e.healAmount}),t()<e.goldChance){const s=Math.max(0,e.goldMax-e.goldMin);i.push({kind:"gold",amount:Math.round(e.goldMin+t()*s)})}return n&&t()<(e.equipChance??0)&&i.push({kind:"equip",amount:0,item:n()}),i}function nv(r,e=Math.random,t){const n=[],i=Math.max(0,r.goldMax-r.goldMin);return n.push({kind:"gold",amount:Math.round(r.goldMin+e()*i)}),t&&e()<r.equipChance&&n.push({kind:"equip",amount:0,item:t()}),e()<r.healChance&&n.push({kind:"heal",amount:r.healAmount}),n}class iv{constructor(e){this.root=new Fe,this.pickups=[],this.geos={heal:new xe(.42,.42,.42),xp:new ma(.3,0),gold:new ct(.26,.26,.1,16),equip:new xe(.5,.36,.34)},this.mats={heal:fe({color:16732025,emissive:5574946,emissiveIntensity:1.2,roughness:.35,metalness:.3}),xp:fe({color:6091480,emissive:1002052,emissiveIntensity:1.2,roughness:.35,metalness:.3}),gold:fe({color:16765503,emissive:5061120,emissiveIntensity:1.2,roughness:.35,metalness:.3}),equip:fe({color:13489908,emissive:3357269,emissiveIntensity:1.2,roughness:.35,metalness:.3})},this.root.name="Loot",e.add(this.root)}dropFor(e,t,n={gold:1,xp:1}){const i=Y.loot,s={...i,xpPerScore:i.xpPerScore*n.xp,goldMin:Math.round(i.goldMin*n.gold),goldMax:Math.round(i.goldMax*n.gold),equipChance:Y.equipment.dropChance},o=tv(e,s,Math.random,()=>Pc());return this.scatter(o,t,.6),o}dropChest(e){const t=Y.dungeon.chestLoot,n=nv({...t,healAmount:Y.loot.healAmount},Math.random,()=>Pc());return this.scatter(n,e,1.1),n}scatter(e,t,n){e.forEach((i,s)=>{const o=s/e.length*Math.PI*2+Math.random();this.spawn(i,{x:t.x+Math.cos(o)*n,z:t.z+Math.sin(o)*n})})}spawn(e,t){let n=this.mats[e.kind];if(e.kind==="equip"&&e.item){const s=new ue(Y.equipment.rarities[e.item.rarity].color);n=new B0({color:s,emissive:s.clone().multiplyScalar(.35)})}const i=new oe(this.geos[e.kind],n);i.position.set(t.x,.6,t.z),e.kind==="gold"&&(i.rotation.x=Math.PI/2),i.castShadow=!0,this.root.add(i),this.pickups.push({mesh:i,drop:e,t:Math.random()*6,life:Y.loot.lifetime})}get count(){return this.pickups.length}update(e,t,n){const i=Y.loot;for(let s=this.pickups.length-1;s>=0;s--){const o=this.pickups[s];o.t+=e,o.life-=e,o.mesh.rotation.y+=e*2.5,o.mesh.position.y=.6+Math.sin(o.t*3)*.12,o.mesh.visible=o.life>3||Math.floor(o.t*8)%2===0;const a=t.x-o.mesh.position.x,l=t.z-o.mesh.position.z,c=Math.hypot(a,l);if(c<i.magnetRange&&c>1e-4){const h=(i.magnetSpeed+(i.magnetRange-c)*2)*e;o.mesh.position.x+=a/c*Math.min(h,c),o.mesh.position.z+=l/c*Math.min(h,c)}if(c<i.pickupRadius){n(o.drop,{x:o.mesh.position.x,z:o.mesh.position.z}),this.remove(s);continue}o.life<=0&&this.remove(s)}}clear(){for(let e=this.pickups.length-1;e>=0;e--)this.remove(e)}dispose(){this.clear(),Object.values(this.geos).forEach(e=>e.dispose()),Object.values(this.mats).forEach(e=>e.dispose()),this.root.removeFromParent()}remove(e){const t=this.pickups[e];this.root.remove(t.mesh),t.drop.kind==="equip"&&t.mesh.material.dispose(),this.pickups.splice(e,1)}}function Dc(r,e){const t=[],n=(i,s,o,a=!1)=>{if(s===0&&!o)return;const l=h=>a?`${Math.round(h*100)}%`:String(h);let c=`${i} ${s>0?"+":""}${l(s)}`;o!==void 0&&o!==0&&(c+=` <span class="${o>0?"up":"down"}">(${o>0?"▲":"▼"}${l(Math.abs(o))})</span>`),t.push(c)};return n("공격",r.attack,e?.attack),n("방어",r.defense,e?.defense),n("체력",r.maxHp,e?.maxHp),n("속도",r.moveSpeed,e?.moveSpeed,!0),t.join(" · ")||"효과 없음"}class sv{constructor(e,t,n){this.equipment=t,this.callbacks=n,this.el=document.createElement("div"),this.el.className="guide inv",this.el.hidden=!0,this.el.innerHTML=`
      <div class="guide-panel inv-panel" role="dialog" aria-labelledby="inv-title">
        <div class="inv-head"><h2 class="guide-title" id="inv-title">장비</h2><button class="btn small" id="inv-close" type="button">닫기 (I)</button></div>
        <p class="guide-sub" id="inv-summary"></p>
        <div id="inv-body"></div>
      </div>`,e.appendChild(this.el),this.body=this.el.querySelector("#inv-body"),this.el.querySelector("#inv-close")?.addEventListener("click",()=>this.callbacks.onClose()),this.body.addEventListener("click",i=>{const s=i.target.closest("button[data-action]");if(!s)return;const o=s.dataset.action;o==="equip"?this.equipment.equip(Number(s.dataset.uid)):o==="unequip"?this.equipment.unequip(s.dataset.slot):o==="discard"&&this.equipment.discard(Number(s.dataset.uid)),this.callbacks.onChange(),this.render()})}get visible(){return!this.el.hidden}show(){this.el.hidden=!1,this.render()}hide(){this.el.hidden=!0}render(){const e=this.equipment,t=Y.equipment.rarities;this.el.querySelector("#inv-summary").textContent=this.callbacks.getSummary();const n=xi.map(s=>{const o=e.equipped[s];return`<li class="inv-row">
        <span class="inv-slot">${Lc[s]}</span>
        ${o?`<span class="inv-name" style="color:${t[o.rarity].color}">${o.name}</span><span class="inv-stats">${Dc(o.stats)}</span>
          <button class="btn small ghost" type="button" data-action="unequip" data-slot="${s}">해제</button>`:'<span class="inv-empty">비어 있음</span>'}
      </li>`}).join(""),i=e.inventory.length?e.inventory.map(s=>`<li class="inv-row">
          <span class="inv-slot">${Lc[e.targetSlot(s)]}</span>
          <span class="inv-name" style="color:${t[s.rarity].color}">${s.name} <small>${t[s.rarity].label}</small></span>
          <span class="inv-stats">${Dc(s.stats,e.compare(s))}</span>
          <button class="btn small" type="button" data-action="equip" data-uid="${s.uid}">장착</button>
          <button class="btn small ghost" type="button" data-action="discard" data-uid="${s.uid}" title="${s.description}">버리기</button>
        </li>`).join(""):'<li class="inv-empty">가방이 비어 있습니다. 적을 처치하면 장비가 떨어집니다.</li>';this.body.innerHTML=`
      <h3 class="inv-h">장착 중</h3><ul class="inv-list">${n}</ul>
      <h3 class="inv-h">가방 (${e.inventory.length} / ${Y.equipment.inventorySize})</h3><ul class="inv-list">${i}</ul>`}}class rv{constructor(){this.level=1,this.xp=0,this.gold=0}get xpToNext(){const e=Y.progression;return Math.round(e.xpBase*Math.pow(e.xpGrowth,this.level-1))}get maxHp(){return Y.player.maxHp+(this.level-1)*Y.progression.hpPerLevel}get damageMultiplier(){return 1+(this.level-1)*Y.progression.damagePerLevel}addXp(e){if(e<=0)return 0;this.xp+=e;let t=0;const n=Y.progression.maxLevel;for(;this.level<n&&this.xp>=this.xpToNext;)this.xp-=this.xpToNext,this.level++,t++;return this.level>=n&&(this.xp=Math.min(this.xp,this.xpToNext)),t}addGold(e){e>0&&(this.gold+=e)}reset(){this.level=1,this.xp=0,this.gold=0}}class ov{constructor(e,t){this.object3d=new Fe,this.facing=0,this.moving=!1,this.speed=0,this.jumpY=0,this.groundY=0,this.jumpVy=0,this.attackTimer=0,this.attackDuration=0,this.dashing=!1,this.object3d.name="Player",this.model=e,this.object3d.add(e.root),this.object3d.position.set(t.x,0,t.z),this.health=new Qh(Y.player.maxHp,Y.player.invulnerableTime)}get position(){return this.object3d.position}get attacking(){return this.attackTimer>0}get airborne(){return this.jumpY>this.groundY+1e-4}get currentModel(){return this.model}get faceVisible(){let e=!1;return this.model.root.traverse(t=>{const n=t;n.isMesh&&n.visible&&n.material.map&&n.parent?.position.y===1.42&&n.material.transparent&&(e=!0)}),e}setModel(e){this.object3d.remove(this.model.root),this.model.dispose(),this.model=e,this.object3d.add(e.root)}triggerAttack(e){this.attackTimer=this.attackDuration=Math.max(.01,e)}reset(e){this.health.reset(Y.player.maxHp),this.health.invulnerableTime=Y.player.invulnerableTime,this.object3d.position.set(e.x,0,e.z),this.facing=0,this.moving=!1,this.speed=0,this.attackTimer=0,this.jumpY=0,this.jumpVy=0,this.groundY=0,this.object3d.visible=!0}update(e){this.health.update(e),this.attackTimer>0&&(this.attackTimer-=e),this.object3d.rotation.y=this.facing,this.object3d.position.y=this.jumpY,this.model.update(e,{moving:this.moving,speed:this.speed,attack:this.attackTimer>0?1-this.attackTimer/this.attackDuration:null,airborne:this.airborne,dead:this.health.isDead,dashing:this.dashing,hurt:!this.dashing&&this.health.invulnerableTime>0?Math.min(1,this.health.invulnerable/this.health.invulnerableTime):0}),this.object3d.visible=this.health.isDead||this.health.invulnerable<=0||Math.floor(this.health.invulnerable*20)%2===0}dispose(){this.model.dispose()}}class av{constructor(e,t,n,i,s=()=>1){this.player=e,this.input=t,this.world=n,this.getCameraYaw=i,this.getSpeedMultiplier=s,this.knock={x:0,z:0},this.jumpQueued=!1,this.dashQueued=!1,this.dash=Tx(),this.onDash=null,this.onJump=null,this.input.onPress(Y.controls.jump,()=>{this.jumpQueued=!0}),this.input.onPress(Y.controls.dodge,()=>{this.dashQueued=!0})}get dashCooldownRatio(){const e=Y.player.dash.cooldown;return e>0?Math.min(1,this.dash.cooldown/e):0}get dashing(){return this.dash.timer>0}applyKnockback(e,t){this.knock.x+=e.x*t,this.knock.z+=e.z*t}reset(){this.knock.x=0,this.knock.z=0,this.jumpQueued=!1,this.dashQueued=!1,this.dash.timer=0,this.dash.cooldown=0,this.player.dashing=!1}update(e){const t=Y.player,n=this.player.position;if(this.player.health.isDead){this.player.moving=!1,this.player.speed=0;return}this.jumpQueued&&!this.player.airborne&&(this.player.jumpVy=t.jumpSpeed,this.player.jumpY=this.player.groundY+.001,this.onJump?.()),this.jumpQueued=!1;const i=this.input.getMoveAxis();let s=bx(i,this.getCameraYaw()),o=s.x!==0||s.z!==0,a=t.moveSpeed*this.getSpeedMultiplier()*(this.player.attacking?t.attackMoveFactor:1);if(Rx(this.dash,e),this.dashQueued){this.dashQueued=!1;const d=o?s:{x:Math.sin(this.player.facing),z:Math.cos(this.player.facing)};Ax(this.dash,d,t.dash.duration,t.dash.cooldown)&&(t.dash.invulnerable&&(this.player.health.invulnerable=Math.max(this.player.health.invulnerable,t.dash.duration)),this.knock.x=0,this.knock.z=0,this.onDash?.(this.dash.dir))}this.dash.timer>0&&(s=this.dash.dir,o=!0,a=t.dash.speed),this.player.dashing=this.dash.timer>0;let l={x:n.x+s.x*a*e+this.knock.x*e,z:n.z+s.z*a*e+this.knock.z*e};const c=Math.exp(-8*e);this.knock.x*=c,this.knock.z*=c;const h=this.world.getObstacleBoxes();l=ya(l,t.radius,h,this.player.jumpY,t.climbAssist),l=Ma(l,this.world.getArenaHalfSize(),t.radius),n.x=l.x,n.z=l.z;const u=wx(l,t.radius,h,this.player.jumpY,t.climbAssist);if(this.player.groundY=u,this.player.jumpY!==u||this.player.jumpVy!==0){const d=Ex({y:this.player.jumpY,vy:this.player.jumpVy},e,t.gravity,u);this.player.jumpY=d.y,this.player.jumpVy=d.vy}if(o&&(!this.player.attacking||this.dash.timer>0)){const d=Dr(s);this.player.facing=ba(this.player.facing,d,1-Math.exp(-t.turnSpeed*e))}this.player.moving=o,this.player.speed=o?a:0}}function lv(r){const e=new Fe;e.name="PlaceholderHero";const t=D=>fe({color:D,roughness:.55,metalness:.15}),n=t(r.body),i=fe({color:r.accent,roughness:.35,metalness:.7}),s=fe({color:r.skin,roughness:.7,metalness:0}),o=jt(r.visor,1),a=jt(r.visor,2.2),l=t("#2c3e6b"),c=fe({color:"#1f2433",roughness:.8}),h=fe({color:"#c0392b",roughness:.8});h.side=It;const u=fe({color:"#1a1a22",roughness:.3}),d=fe({color:"#ffffff",roughness:.4}),f=(D,O,H,Z=0,ne=0,K=0)=>{const J=new oe(O,H);return J.position.set(Z,ne,K),J.castShadow=!0,D.add(J),J},g=D=>{const O=new Fe;O.position.set(D,.52,0),f(O,new ct(.11,.1,.26,10),l,0,-.13,0);const H=new Fe;return H.position.set(0,-.26,0),f(H,new ct(.095,.09,.24,10),l,0,-.12,0),f(H,new xe(.22,.12,.3),i,0,-.26,.04),O.add(H),e.add(O),{hip:O,knee:H}},x=g(-.14),m=g(.14),p=new Fe;f(p,new xe(.58,.52,.36),n,0,.78,0),f(p,new xe(.62,.08,.38),i,0,.54,0),f(p,new xe(.12,.1,.04),jt(r.visor,1),0,.54,.2),f(p,new xe(.36,.4,.18),i,0,.82,-.26);for(const D of[-1,1])f(p,new ht(.15,10,8,0,Math.PI*2,0,Math.PI/2),i,D*.36,1.02,0);e.add(p);const y=new is(.5,.7,1,4);y.translate(0,-.35,0);const _=new oe(y,h);_.position.set(0,1.02,-.2),_.castShadow=!0,p.add(_);const v=y.attributes.position.array.slice(),E=D=>{const O=new Fe;O.position.set(D,.98,0),f(O,new ct(.085,.08,.24,10),n,0,-.12,0);const H=new Fe;return H.position.set(0,-.24,0),f(H,new ct(.075,.07,.22,10),s,0,-.11,0),f(H,new ht(.1,10,8),s,0,-.24,0),O.add(H),p.add(O),{shoulder:O,elbow:H}},b=E(-.38),A=E(.38),N=new Fe;N.position.set(0,-.24,0),f(N,new xe(.07,.07,.9),a,0,0,.5),f(N,new xe(.2,.06,.06),i,0,0,.08),f(N,new ct(.035,.035,.2,8),l,0,0,-.08).rotation.x=Math.PI/2,A.elbow.add(N);const M=new Fe;M.position.y=1.42,f(M,new ht(.4,24,18),s);const w=new Fe;for(const D of[-1,1]){f(w,new ht(.075,10,8),d,D*.14,.02,.35),f(w,new ht(.04,8,6),u,D*.14,.02,.405);const O=f(w,new xe(.14,.03,.03),c,D*.14,.13,.37);O.rotation.z=D*.15}f(w,new xe(.12,.03,.03),fe({color:"#a1413a",roughness:.8}),0,-.16,.38),M.add(w),f(M,new xe(.52,.1,.1),o,0,.22,.33);const k=f(M,new ht(.43,24,12,0,Math.PI*2,0,Math.PI*.5),c,0,.04,-.05);k.rotation.x=-.3;for(let D=0;D<5;D++){const O=f(M,new mn(.09,.26,5),c,(D-2)*.13,.42,-.05+Math.abs(D-2)*.02);O.rotation.z=(D-2)*.35,O.rotation.x=-.4}const V=new Bt({transparent:!0,opacity:1}),j=new oe(new ht(.405,24,18,Math.PI*.22,Math.PI*.56,Math.PI*.22,Math.PI*.56),V);j.visible=!1,M.add(j),e.add(M);let L=0,I=Math.random()*10;const F=(D,O)=>1-Math.exp(-O*D),B=(D,O,H,Z)=>{D.rotation[O]+=(H-D.rotation[O])*Z};return{root:e,setFace(D){V.map&&V.map!==D&&V.map.dispose(),D&&(D.wrapS=$n,D.repeat.x=-1,D.needsUpdate=!0),V.map=D,V.needsUpdate=!0,j.visible=D!==null,w.visible=D===null},update(D,O){if(I+=D,O.dead){e.rotation.z=ai.lerp(e.rotation.z,Math.PI/2,F(D,8)),e.position.y=ai.lerp(e.position.y,.4,F(D,8));return}e.rotation.z=0;const H=F(D,14),Z=O.hurt??0;n.emissive.setRGB(Z*.8,0,0),s.emissive.setRGB(Z*.5,0,0);const ne=y.attributes.position,K=Math.sin(I*3)*.04,J=(O.moving?Math.min(1,O.speed/7):0)*(O.dashing?1.6:1);for(let pe=0;pe<ne.count;pe++){const G=-v[pe*3+1]/.7;ne.setZ(pe,v[pe*3+2]-G*G*(.35*J)+K*G),ne.setX(pe,v[pe*3]+Math.sin(I*4+G*3)*.03*G)}if(ne.needsUpdate=!0,O.dashing){B(p,"x",.55,H),B(b.shoulder,"x",1.4,H),B(A.shoulder,"x",1.4,H),B(x.hip,"x",-.6,H),B(m.hip,"x",.3,H),B(x.knee,"x",.8,H),B(m.knee,"x",.4,H),e.position.y=0;return}if(B(p,"x",Z*-.35+(O.moving?.08:0),H),O.airborne){B(x.hip,"x",-.9,H),B(m.hip,"x",.5,H),B(x.knee,"x",1.2,H),B(m.knee,"x",.9,H),B(b.shoulder,"x",-2.2,H),B(b.elbow,"x",-.4,H),O.attack===null&&B(A.shoulder,"x",-2.2,H),e.position.y=0;return}const ae=O.moving?1:0;L+=D*(O.speed>0?O.speed*1.7:0);const _e=Math.sin(L)*.8*ae,ve=Math.max(0,-Math.sin(L))*.9*ae,Ie=Math.max(0,Math.sin(L))*.9*ae;B(x.hip,"x",_e,H),B(m.hip,"x",-_e,H),B(x.knee,"x",ve,H),B(m.knee,"x",Ie,H),B(b.shoulder,"x",-_e*.8,H),B(b.elbow,"x",-.3-Math.max(0,-_e)*.4,H);const Ne=O.moving?0:Math.sin(I*2.2)*.012;if(p.scale.set(1,1+Ne,1),e.position.y=Math.abs(Math.sin(L))*.06*ae,O.attack!==null){const pe=O.attack,Ye=Math.min(1,pe*2.5),G=Math.sin(pe*Math.PI);A.shoulder.rotation.x=-Math.PI/2*Ye-G*.4,A.shoulder.rotation.y=(.5-pe)*1.8,A.elbow.rotation.x=-.6*(1-pe)-.2,p.rotation.y=(.5-pe)*.55,M.rotation.y=(.5-pe)*.3}else B(A.shoulder,"x",_e*.8-.1,F(D,10)),B(A.shoulder,"y",0,F(D,10)),B(A.elbow,"x",-.35+Math.sin(I*2.2)*.03,F(D,10)),B(p,"y",0,F(D,10)),B(M,"y",0,F(D,10));B(M,"x",Z*-.3,H)},dispose(){e.traverse(D=>{const O=D;if(O.isMesh){O.geometry.dispose();const H=O.material;Array.isArray(H)?H.forEach(Z=>Z.dispose()):H.dispose()}})}}}const $o="hero-x.face",To=256;function cv(r,e){const t=Math.max(1,Math.min(r,e)),n=Math.round((r-t)/2),i=e*.4,s=Math.round(Math.min(Math.max(0,i-t/2),Math.max(0,e-t)));return{x:n,y:s,size:t}}async function hv(r){const e=URL.createObjectURL(r);try{const t=await new Promise((o,a)=>{const l=new Image;l.onload=()=>o(l),l.onerror=()=>a(new Error("이미지를 읽을 수 없습니다. JPG·PNG 파일인지 확인하세요.")),l.src=e}),n=document.createElement("canvas");n.width=n.height=To;const i=n.getContext("2d");if(!i)throw new Error("캔버스를 만들 수 없습니다.");const s=cv(t.naturalWidth,t.naturalHeight);return i.drawImage(t,s.x,s.y,s.size,s.size,0,0,To,To),n.toDataURL("image/jpeg",.85)}finally{URL.revokeObjectURL(e)}}function uv(){try{const r=localStorage.getItem($o);return r&&r.startsWith("data:image/")?r:null}catch{return null}}function Nc(r){try{return r?localStorage.setItem($o,r):localStorage.removeItem($o),!0}catch{return!1}}function dv(r){return new Promise((e,t)=>{new Hh().load(r,n=>{n.colorSpace=at,e(n)},void 0,()=>t(new Error("얼굴 텍스처를 만들 수 없습니다.")))})}const iu={establish:3,approach:6.5,fight:11,slowmo:13,finale:16},fv=iu.establish,pv=[{type:"rusher",x:-3,z:-11},{type:"rusher",x:3,z:-11},{type:"rusher",x:0,z:-13},{type:"shooter",x:-5,z:-14},{type:"tank",x:5,z:-14}],mv=.35,_s=r=>Math.max(0,Math.min(1,r)),Uc=r=>r*r*(3-2*r),dn=(r,e,t)=>r+(e-r)*t;function kc(r,e,t=0,n="초등학교"){const i=iu,s={shot:"done",cam:{x:e.x,y:13,z:e.z+11},look:{x:e.x,y:1,z:e.z},fov:50,timeScale:1,walk:!1,attack:!1,dodge:!1,title:!1,caption:""};if(r<i.establish){const o=Uc(_s(r/i.establish));return{...s,shot:"establish",cam:{x:e.x+dn(-3,-1.2,o),y:dn(9,3.2,o),z:e.z-dn(13,6.5,o)},look:{x:e.x,y:dn(1.2,1.5,o),z:e.z+1.5},fov:dn(52,38,o),title:r>.6,caption:r>1?`${n} 3학년 교실, 조용한 수학 시간`:""}}if(r<i.approach)return{...s,shot:"approach",cam:{x:e.x+3.5,y:1.6,z:e.z+4.5},look:{x:e.x,y:1.2,z:e.z-2.5},fov:46,walk:r<5,caption:"갑자기 몬스터들이 교실로 들이닥쳤다!"};if(r<i.fight){const o=_s((r-i.approach)/(i.fight-i.approach)),a=dn(-.45,.75,o),l=5.5;return{...s,shot:"fight",cam:{x:e.x+Math.sin(a)*l,y:2.8,z:e.z+Math.cos(a)*l},look:{x:e.x,y:1.1,z:e.z},fov:44-7*_s(t),attack:!0}}if(r<i.slowmo){const o=_s((r-i.fight)/(i.slowmo-i.fight));return{...s,shot:"slowmo",cam:{x:e.x+2.4,y:2.1,z:e.z-3.6},look:{x:e.x,y:1.3,z:e.z},fov:dn(34,30,o),timeScale:.25,attack:!0,dodge:r<i.fight+.3,caption:"소년은 검을 들었다"}}if(r<i.finale){const o=Uc(_s((r-i.slowmo)/(i.finale-i.slowmo)));return{...s,shot:"finale",cam:{x:e.x,y:dn(5,13,o),z:e.z+dn(7,15,o)},look:{x:e.x,y:1,z:e.z},fov:dn(42,56,o),attack:!0,title:r>i.slowmo+.5,caption:r>i.slowmo+.5?"모험을 시작하세요":""}}return s}class gv{constructor(e){this.hooks=e,this.t=0,this.punch=0,this.spawned=!1,this.dodged=!1,this.attackTimer=0,this.attackHeld=!1,this.ended=!1,this.frame=kc(0,e.hero())}get timeScale(){return this.frame.timeScale}get time(){return this.t}get shot(){return this.frame.shot}onKill(){this.punch=1}update(e){if(this.ended)return;this.t+=e,this.punch=Math.max(0,this.punch-e*2.5);const t=this.hooks.hero(),n=this.frame=kc(this.t,t,this.punch,Y.meta.school);if(n.shot==="done"){this.finish();return}if(!this.spawned&&this.t>=fv){this.spawned=!0,this.hooks.onMonsters?.();for(const a of pv)this.hooks.spawn(a.type,a.x,a.z)}const i=this.hooks.nearestEnemy();n.walk?this.hooks.setAxis(0,-1):n.attack&&i&&i.dist>2.6?this.hooks.setAxis(i.dx*.8,i.dz*.8):this.hooks.setAxis(0,0);const s=Y.controls.attackMelee[0];if(this.attackHeld&&(this.hooks.release(s),this.attackHeld=!1),this.attackTimer-=e,n.attack&&i&&i.dist<=2.6&&this.attackTimer<=0&&(this.hooks.press(s),this.attackHeld=!0,this.attackTimer=.45),n.dodge&&!this.dodged){this.dodged=!0;const a=Y.controls.dodge[0];this.hooks.press(a),setTimeout(()=>this.hooks.release(a),60)}const o=this.hooks.camera;o.position.set(n.cam.x,n.cam.y,n.cam.z),o.lookAt(n.look.x,n.look.y,n.look.z),Math.abs(o.fov-n.fov)>.001&&(o.fov=n.fov,o.updateProjectionMatrix()),this.hooks.overlay.set(n.title,n.caption)}finish(){this.ended||(this.ended=!0,this.attackHeld&&this.hooks.release(Y.controls.attackMelee[0]),this.hooks.setAxis(0,0),this.hooks.onEnd())}}class xv{constructor(e,t){this.root=new Fe,this.boxes=[],this.disposables=[];const n=e.x,i=e.z;this.root.name="IntroClassroom";const s=fe({color:12159322,roughness:.8}),o=fe({color:8016432,roughness:.85}),a=fe({color:9147555,roughness:.4,metalness:.6}),l=fe({color:15854040,roughness:.95}),c=fe({color:5913378,roughness:.85}),h=fe({color:16448250,roughness:.9}),u=fe({color:12597547,roughness:.8}),d=fe({color:3102916,roughness:.8});this.disposables.push(s,o,a,l,c,h,u,d);const f=(p,y,_,v,E,b=!0)=>{const A=new oe(p,y);return A.position.set(_,v,E),A.castShadow=b,A.receiveShadow=!0,this.root.add(A),this.disposables.push(p),A};f(new xe(13,.06,11),s,n,.03,i+1.5,!1);for(let p=-6;p<=6;p+=1.3)f(new xe(.04,.07,11),o,n+p,.035,i+1.5,!1);f(new xe(13,3.4,.3),l,n,1.7,i+7.2),this.boxes.push({x:n,z:i+7.2,w:13,d:.3}),f(new xe(5.2,2,.12),c,n-1,1.9,i+7);const g=this.makeBoardTexture(t),x=new Yn({map:g,roughness:.9});this.disposables.push(g,x),f(new xe(4.9,1.75,.06),x,n-1,1.92,i+6.93),f(new xe(5.2,.1,.2),c,n-1,.95,i+6.96),f(new ct(.32,.32,.06,20),h,n+4.2,2.8,i+7).rotation.x=Math.PI/2,f(new xe(.04,.22,.04),a,n+4.2,2.9,i+6.95),f(new xe(.16,.04,.04),a,n+4.27,2.8,i+6.95),f(new xe(1.6,1.4,.1),fe({color:10475775,roughness:.2,metalness:.1}),n+4.5,1.9,i+7),f(new xe(1.7,.08,.14),o,n+4.5,1.9,i+7),f(new xe(.08,1.5,.14),o,n+4.5,1.9,i+7),this.desk(f,s,o,n+3.2,i+5.6,1.5,.9,1);const m=[[n-3.4,i-1.2],[n-.9,i-1.2],[n+1.8,i-1.2],[n-3.4,i+1.6],[n+1.8,i+1.6]];for(const[p,y]of m){this.desk(f,s,a,p,y,1.3,.8,.78),f(new xe(.5,.06,.5),s,p,.46,y-.75),f(new xe(.5,.5,.06),s,p,.72,y-.98);for(const _ of[-.2,.2])for(const v of[-.2,.2])f(new xe(.05,.46,.05),a,p+_,.23,y-.75+v)}f(new xe(.55,.05,.4),h,n-.9,.82,i-1.25),f(new xe(.3,.06,.4),u,n-1.35,.82,i-1.2),f(new xe(.3,.08,.42),d,n-.45,.83,i-1.15),f(new xe(.03,.03,.3),fe({color:15911244,roughness:.6}),n-.7,.81,i-1.3),f(new ht(.22,12,10),fe({color:5210080,roughness:.5}),n+3.2,1.3,i+5.6)}desk(e,t,n,i,s,o,a,l){e(new xe(o,.08,a),t,i,l,s),e(new xe(o-.1,.25,a-.1),t,i,l-.2,s);for(const c of[-1,1])for(const h of[-1,1])e(new xe(.07,l,.07),n,i+c*(o/2-.08),l/2,s+h*(a/2-.08));this.boxes.push({x:i,z:s,w:o,d:a})}makeBoardTexture(e){const t=document.createElement("canvas");t.width=1024,t.height=368;const n=t.getContext("2d");if(n){n.fillStyle="#2f5d46",n.fillRect(0,0,t.width,t.height),n.strokeStyle="rgba(255,255,255,0.08)";for(let s=0;s<40;s++)n.beginPath(),n.moveTo(Math.random()*t.width,Math.random()*t.height),n.lineTo(Math.random()*t.width,Math.random()*t.height),n.stroke();n.fillStyle="#f7f3e3",n.textAlign="center",n.font="700 74px sans-serif",n.fillText(`${e} 3학년`,t.width/2,120),n.font="600 58px sans-serif",n.fillStyle="#ffe9a8",n.fillText("오늘의 수학:  347 + 268 = ?",t.width/2,220),n.font="500 40px sans-serif",n.fillStyle="#cfe9d8",n.fillText("조용히 문제를 풉니다 ✎",t.width/2,300)}const i=new Ho(t);return i.colorSpace=at,i.anisotropy=4,i}dispose(){this.root.removeFromParent();for(const e of this.disposables)e.dispose()}}const an=(r,e,t)=>e+Math.floor(r()*(t-e+1));function vs(r,e,t){const n=new Set([e]);let i=0;for(;n.size<4&&i++<100;){const a=an(r,1,t)*(r()<.5?-1:1),l=e+a;l>=0&&!n.has(l)&&n.add(l)}let s=e+t+1;for(;n.size<4;)n.add(s++);const o=[...n];for(let a=o.length-1;a>0;a--){const l=Math.floor(r()*(a+1));[o[a],o[l]]=[o[l],o[a]]}return o}function Fc(r=Math.random,e){const t=["add","sub","mul","div","mul2"],n=e??t[Math.floor(r()*t.length)];switch(n){case"add":{const i=an(r,100,899),s=an(r,100,999-i);return{kind:n,text:`${i} + ${s} = ?`,answer:i+s,choices:vs(r,i+s,30)}}case"sub":{const i=an(r,200,999),s=an(r,100,i-1);return{kind:n,text:`${i} − ${s} = ?`,answer:i-s,choices:vs(r,i-s,30)}}case"mul":{const i=an(r,2,9),s=an(r,2,9);return{kind:n,text:`${i} × ${s} = ?`,answer:i*s,choices:vs(r,i*s,9)}}case"div":{const i=an(r,2,9),s=an(r,2,9);return{kind:n,text:`${i*s} ÷ ${i} = ?`,answer:s,choices:vs(r,s,3)}}case"mul2":default:{const i=an(r,12,49),s=an(r,2,9);return{kind:"mul2",text:`${i} × ${s} = ?`,answer:i*s,choices:vs(r,i*s,20)}}}}class _v{constructor(e,t){this.cb=t,this.problem=null,this.wrongCount=0,this.el=document.createElement("div"),this.el.className="guide quiz",this.el.hidden=!0,this.el.innerHTML=`
      <div class="guide-panel quiz-panel" role="dialog" aria-labelledby="quiz-title">
        <p class="guide-eyebrow">보물 상자의 자물쇠</p>
        <h2 class="guide-title" id="quiz-title">수학 문제를 풀면 열려요</h2>
        <p class="quiz-question" id="quiz-question"></p>
        <div class="quiz-choices" id="quiz-choices"></div>
        <p class="quiz-feedback" id="quiz-feedback"></p>
        <div class="btns"><button class="btn small ghost" id="quiz-close" type="button">나중에</button></div>
      </div>`,e.appendChild(this.el),this.question=this.el.querySelector("#quiz-question"),this.choicesEl=this.el.querySelector("#quiz-choices"),this.feedback=this.el.querySelector("#quiz-feedback"),this.el.querySelector("#quiz-close").addEventListener("click",()=>this.close()),this.choicesEl.addEventListener("click",n=>{const i=n.target.closest("button[data-value]");!i||!this.problem||this.pick(Number(i.dataset.value))})}get visible(){return!this.el.hidden}open(e){this.wrongCount=0,this.feedback.textContent="",this.render(e),this.el.hidden=!1}close(){this.el.hidden||(this.el.hidden=!0,this.problem=null,this.cb.onClose())}render(e){this.problem=e,this.question.textContent=e.text,this.choicesEl.innerHTML=e.choices.map(t=>`<button type="button" class="btn quiz-choice" data-value="${t}">${t}</button>`).join("")}pick(e){if(this.problem){if(e===this.problem.answer){this.feedback.textContent="정답! 상자가 열립니다.",this.feedback.classList.remove("wrong"),this.el.hidden=!0,this.problem=null,this.cb.onCorrect();return}this.wrongCount++,this.feedback.textContent=this.wrongCount>=2?`아쉬워요. 정답은 ${this.problem.answer} 이었어요. 새 문제!`:"다시 생각해 봐요. 새 문제!",this.feedback.classList.add("wrong"),this.el.classList.remove("shake"),this.el.offsetWidth,this.el.classList.add("shake"),this.render(this.cb.onWrong())}}}class vv{constructor(e,t){this.lastCaption="",this.el=document.createElement("div"),this.el.className="intro",this.el.hidden=!0,this.el.innerHTML=`
      <div class="intro-bar top"></div>
      <div class="intro-bar bottom"></div>
      <h1 class="intro-title">${Y.meta.title.replace(" X"," <em>X</em>")}</h1>
      <p class="intro-caption"></p>
      <button type="button" class="btn small ghost intro-skip">건너뛰기</button>`,e.appendChild(this.el),this.title=this.el.querySelector(".intro-title"),this.caption=this.el.querySelector(".intro-caption"),this.el.querySelector(".intro-skip").addEventListener("click",t)}get visible(){return!this.el.hidden}show(){this.el.hidden=!1,this.title.classList.remove("on"),this.caption.classList.remove("on"),this.lastCaption="",requestAnimationFrame(()=>this.el.classList.add("on"))}hide(){this.el.hidden=!0,this.el.classList.remove("on")}set(e,t){this.title.classList.toggle("on",e),t!==this.lastCaption&&(this.lastCaption=t,this.caption.textContent=t,this.caption.classList.toggle("on",t!==""))}}function Yo(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function yv(r){if(!Yo(r))return null;const e=[];if(typeof r.file=="string"&&r.file&&e.push(r.file),Array.isArray(r.files))for(const t of r.files)typeof t=="string"&&t&&e.push(t);return e.length===0?null:{files:e,gain:typeof r.gain=="number"&&r.gain>0?Math.min(4,r.gain):1}}function Mv(r){const e={sfx:{},music:{}};if(!Yo(r))return e;for(const t of["sfx","music"]){const n=r[t];if(Yo(n))for(const[i,s]of Object.entries(n)){const o=yv(s);o&&(e[t][i]=o)}}return e}class bv{constructor(){this.sounds=new Map,this.onLoaded=null}get loadedKeys(){return[...this.sounds.keys()]}get(e){return this.sounds.get(e)??null}async load(e){const t=e.endsWith("/")?e:e+"/";let n;try{const s=await fetch(`${t}sounds/manifest.json`,{cache:"no-cache"});if(!s.ok){Ce.warn(`sounds/manifest.json 을 읽지 못했습니다 (${s.status}). 합성음을 씁니다.`);return}n=Mv(await s.json())}catch(s){Ce.warn("sounds/manifest.json 을 읽지 못했습니다. 합성음을 씁니다.",s);return}const i=[];for(const[s,o]of Object.entries(n.sfx))o&&i.push(this.loadOne(`sfx:${s}`,o,t));for(const[s,o]of Object.entries(n.music))o&&i.push(this.loadOne(`music:${s}`,o,t));await Promise.all(i)}async loadOne(e,t,n){const i=[];for(const s of t.files)try{const o=await fetch(`${n}sounds/${s}`);if(!o.ok)throw new Error(`HTTP ${o.status}`);i.push(await o.arrayBuffer())}catch(o){Ce.warn(`음원 '${s}' 을(를) 읽지 못했습니다.`,o)}if(i.length===0){Ce.warn(`'${e}' 음원 파일이 모두 실패해 합성음을 씁니다.`);return}this.sounds.set(e,{entry:t,data:i}),Ce.info(`음원 로드: ${e} ← ${t.files.join(", ")}`),this.onLoaded?.(e)}}const oi=new bv;function Oc(r){return r==="Mouse0"?"마우스 왼쪽":r==="Mouse2"?"마우스 오른쪽":r==="Mouse1"?"마우스 가운데":r==="Space"?"Space":r==="Escape"?"Esc":r==="ShiftLeft"||r==="ShiftRight"?"Shift":r.startsWith("Key")?r.slice(3):r.startsWith("Arrow")?{Up:"↑",Down:"↓",Left:"←",Right:"→"}[r.slice(5)]??r:r}class Sv{constructor(e,t){const n=Y.controls,i=s=>s.map(o=>`<span class="key">${Oc(o)}</span>`).join(" ");this.guide=document.createElement("div"),this.guide.className="guide",this.guide.hidden=!0,this.guide.innerHTML=`
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
        <p class="guide-note">고블린 전사는 곤봉을 치켜든 뒤 내려치고, 유령 마법사는 지팡이를 치켜들어 마법탄을 쏘며, 트롤 거인은 방패를 들어 올린 뒤 도끼를 휘두릅니다. 눈이 커지고 밝아지는 것이 공격 신호입니다. 보스는 바닥 원 색깔로 패턴을 예고합니다(주황 돌진 · 빨강 내려찍기 · 보라 탄막).</p>
      </div>`,e.appendChild(this.guide),this.guide.querySelector("#guide-close")?.addEventListener("click",t),this.hud=document.createElement("div"),this.hud.className="hud",e.appendChild(this.hud),this.setHudText("")}get visible(){return!this.guide.hidden}show(){this.guide.hidden=!1}hide(){this.guide.hidden=!0}toggle(){this.guide.hidden=!this.guide.hidden}setHudText(e){const t=Oc(Y.controls.toggleGuide[0]??"KeyH");this.hud.textContent=`${t}: 조작 안내 · Esc: 메뉴${e?" · "+e:""}`}}const su="hero-x.difficulty";function wv(){try{const r=localStorage.getItem(su);if(r&&Sa(r))return r}catch{}return Y.difficulty.default}function zc(r){try{localStorage.setItem(su,r)}catch{}}function Sa(r){return r in Y.difficulty.presets}function Gi(r){return Y.difficulty.presets[r]??Y.difficulty.presets[Y.difficulty.default]}function ru(){return Object.keys(Y.difficulty.presets)}class Ev{constructor(e,t){this.cb=t,this.confirming=!1;const n=Y.meta,i=ru().map(o=>`<button type="button" class="diff-btn" data-level="${o}">${Gi(o).label}</button>`).join("");this.el=document.createElement("div"),this.el.className="guide menu",this.el.innerHTML=`
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
          <button class="btn secondary" id="menu-intro" type="button">인트로 보기</button>
        </div>
        <div class="diff-row"><span class="hud-label">난이도</span>${i}</div>
        <div class="menu-confirm" id="menu-confirm" hidden>
          <p>이어갈 진행이 있습니다. 새로 시작하면 레벨·골드·장비·기록이 초기화되고 저장 데이터도 새로 씁니다. 계속할까요?</p>
          <div class="btns"><button class="btn small" id="menu-confirm-yes" type="button">새로 시작</button><button class="btn small ghost" id="menu-confirm-no" type="button">취소</button></div>
        </div>
        <p class="guide-note">던전마다 적을 모두 처치하면 보스가 나타나고, 보스를 쓰러뜨리면 클리어되어 다음 던전이 열립니다. 게임을 끝내려면 브라우저 탭을 닫으세요.</p>
        <p class="menu-save" id="menu-save"></p>
      </div>`,e.appendChild(this.el);const s=o=>this.el.querySelector(o);s("#menu-new").addEventListener("click",()=>{this.cb.hasProgress()?this.setConfirm(!0):this.cb.newGame()}),s("#menu-confirm-yes").addEventListener("click",()=>{this.setConfirm(!1),this.cb.newGame()}),s("#menu-confirm-no").addEventListener("click",()=>this.setConfirm(!1)),s("#menu-continue").addEventListener("click",()=>this.cb.continueGame()),s("#menu-inventory").addEventListener("click",()=>this.cb.openInventory()),s("#menu-guide").addEventListener("click",()=>this.cb.openGuide()),s("#menu-settings").addEventListener("click",()=>this.cb.openSettings()),s("#menu-dungeons").addEventListener("click",()=>this.cb.openDungeons()),s("#menu-intro").addEventListener("click",()=>this.cb.playIntro()),this.el.querySelectorAll(".diff-btn").forEach(o=>{o.addEventListener("click",()=>{this.cb.difficulty.set(o.dataset.level),this.refresh()})}),this.refresh()}get visible(){return!this.el.hidden}setConfirm(e){this.confirming=e,this.el.querySelector("#menu-confirm").hidden=!e}refresh(){const e=this.cb.hasRun(),t=this.cb.hasProgress(),n=this.el.querySelector("#menu-continue");n.disabled=!t,n.textContent=e?"이어하기":t?"이어하기 (던전 선택)":"이어하기",n.title=t?"":"이어갈 진행이 없습니다";const i=this.el.querySelector("#menu-dungeons");i.disabled=!t,i.title=t?"":"새 게임을 먼저 시작하세요";const s=this.el.querySelector("#menu-progress"),o=this.cb.progressText();s.textContent=o,s.hidden=o==="",this.el.querySelector("#menu-save").textContent=this.cb.saveNote();const a=this.cb.difficulty.get();this.el.querySelectorAll(".diff-btn").forEach(l=>l.setAttribute("aria-pressed",String(l.dataset.level===a)))}show(){this.setConfirm(!1),this.refresh(),this.el.hidden=!1}hide(){this.el.hidden=!0}pressPrimary(){this.confirming?(this.setConfirm(!1),this.cb.newGame()):this.cb.hasProgress()?this.cb.continueGame():this.cb.newGame()}}class Tv{constructor(e,t){this.project=t,this.popups=[],this.root=document.createElement("div"),this.root.className="dmg-layer",e.appendChild(this.root)}show(e,t,n="enemy"){const i=document.createElement("div");i.className=`dmg ${n}`;const s=Math.round(t);i.textContent=n==="kill"?`${s} 처치!`:n==="heal"?`+${s}`:n==="levelup"?`레벨 ${s}!`:String(s),this.root.appendChild(i),this.popups.push({el:i,pos:e.clone(),t:0}),this.popups.length>40&&this.remove(0)}showText(e,t,n){const i=document.createElement("div");i.className="dmg text",i.textContent=t,n&&(i.style.color=n),this.root.appendChild(i),this.popups.push({el:i,pos:e.clone(),t:-.6}),this.popups.length>40&&this.remove(0)}update(e){for(let t=this.popups.length-1;t>=0;t--){const n=this.popups[t];n.t+=e,n.pos.y+=e*1.4;const i=this.project(n.pos);i?(n.el.style.transform=`translate(${i.x}px, ${i.y}px) translate(-50%, -50%) scale(${1+Math.min(n.t*2,.3)})`,n.el.style.opacity=String(Math.max(0,Math.min(1,1.3-Math.max(0,n.t))))):n.el.style.opacity="0",n.t>1.1&&this.remove(t)}}clear(){for(;this.popups.length;)this.remove(this.popups.length-1)}remove(e){this.popups[e].el.remove(),this.popups.splice(e,1)}}class Av{constructor(e){this.last={hp:-1,maxHp:-1,enemies:-1,kills:-1,score:-1,level:-1,xp:-1,xpToNext:-1,gold:-1},this.root=document.createElement("div"),this.root.className="hud-top",this.root.innerHTML=`
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
      </div>`,e.appendChild(this.root),this.hpFill=this.root.querySelector("#hud-hp-fill"),this.hpText=this.root.querySelector("#hud-hp-text"),this.enemiesText=this.root.querySelector("#hud-enemies"),this.killsText=this.root.querySelector("#hud-kills"),this.scoreText=this.root.querySelector("#hud-score"),this.levelText=this.root.querySelector("#hud-level"),this.xpFill=this.root.querySelector("#hud-xp-fill"),this.xpText=this.root.querySelector("#hud-xp-text"),this.goldText=this.root.querySelector("#hud-gold"),this.chestText=this.root.querySelector("#hud-chests"),this.prompt=document.createElement("div"),this.prompt.className="hud-prompt",this.prompt.hidden=!0,e.appendChild(this.prompt),this.bossBar=document.createElement("div"),this.bossBar.className="boss-bar",this.bossBar.hidden=!0,this.bossBar.innerHTML='<span class="boss-name" id="boss-name"></span><div class="boss-track"><i id="boss-fill"></i></div><span class="boss-hp" id="boss-hp"></span>',e.appendChild(this.bossBar),this.banner=document.createElement("div"),this.banner.className="banner",this.banner.hidden=!0,e.appendChild(this.banner)}setBoss(e){if(!e){this.bossBar.hidden=!0;return}this.bossBar.hidden=!1,this.bossBar.querySelector("#boss-name").textContent=e.name+(e.phase2?" (분노)":""),this.bossBar.querySelector("#boss-fill").style.width=`${Math.max(0,Math.min(1,e.hp/e.maxHp))*100}%`,this.bossBar.querySelector("#boss-hp").textContent=`${Math.ceil(e.hp)} / ${e.maxHp}`,this.bossBar.classList.toggle("phase2",e.phase2)}showBanner(e,t=2200){this.banner.textContent=e,this.banner.hidden=!1,this.banner.classList.remove("pop"),this.banner.offsetWidth,this.banner.classList.add("pop"),clearTimeout(this.bannerTimer),this.bannerTimer=setTimeout(()=>this.banner.hidden=!0,t)}setDungeonName(e){this.root.querySelector("#hud-dungeon").textContent=e}setChests(e,t){const n=`${e} / ${t}`;this.chestText.textContent!==n&&(this.chestText.textContent=n)}setPrompt(e){this.prompt.textContent!==e&&(this.prompt.textContent=e),this.prompt.hidden=e===""}update(e){e.level!==this.last.level&&(this.levelText.textContent=String(e.level),this.last.level=e.level),(e.xp!==this.last.xp||e.xpToNext!==this.last.xpToNext)&&(this.xpFill.style.width=`${e.xpToNext>0?Math.min(100,e.xp/e.xpToNext*100):100}%`,this.xpText.textContent=`${e.xp} / ${e.xpToNext}`,this.last.xp=e.xp,this.last.xpToNext=e.xpToNext),e.gold!==this.last.gold&&(this.goldText.textContent=e.gold.toLocaleString("ko-KR"),this.last.gold=e.gold);const t=Math.ceil(e.hp);if(t!==this.last.hp||e.maxHp!==this.last.maxHp){const n=e.maxHp>0?Math.max(0,Math.min(1,e.hp/e.maxHp)):0;this.hpFill.style.width=`${n*100}%`,this.hpFill.classList.toggle("low",n<=.3),this.hpText.textContent=`${t} / ${e.maxHp}`,this.last.hp=t,this.last.maxHp=e.maxHp}e.enemies!==this.last.enemies&&(this.enemiesText.textContent=String(e.enemies),this.last.enemies=e.enemies),e.kills!==this.last.kills&&(this.killsText.textContent=String(e.kills),this.last.kills=e.kills),e.score!==this.last.score&&(this.scoreText.textContent=e.score.toLocaleString("ko-KR"),this.last.score=e.score)}flashHit(){this.root.classList.remove("hit"),this.root.offsetWidth,this.root.classList.add("hit")}show(){this.root.hidden=!1}hide(){this.root.hidden=!0}}class Rv{constructor(e,t,n,i){this.timer=0,this.next=null,this.el=document.createElement("div"),this.el.className="guide result",this.el.hidden=!0,this.el.innerHTML=`
      <div class="guide-panel result-panel" role="dialog" aria-labelledby="result-title">
        <p class="guide-eyebrow" id="result-eyebrow">결과</p>
        <h2 class="guide-title" id="result-title">결과</h2>
        <p class="guide-sub" id="result-sub"></p>
        <p class="result-next" id="result-count" hidden></p>
        <div class="btns"><button class="btn" id="result-next" type="button" hidden>다음 던전으로</button><button class="btn" id="result-restart" type="button">다시 도전 (R)</button><button class="btn secondary" id="result-dungeons" type="button">던전 선택</button><button class="btn secondary" id="result-menu" type="button">메인 메뉴</button></div>
      </div>`,e.appendChild(this.el),this.title=this.el.querySelector("#result-title"),this.sub=this.el.querySelector("#result-sub"),this.el.querySelector("#result-restart")?.addEventListener("click",t),this.el.querySelector("#result-menu")?.addEventListener("click",n),this.el.querySelector("#result-dungeons")?.addEventListener("click",i),this.el.querySelector("#result-next")?.addEventListener("click",()=>this.goNext());for(const s of["#result-restart","#result-dungeons","#result-menu"])this.el.querySelector(s)?.addEventListener("click",()=>this.stopCountdown())}startCountdown(e,t){const n=this.el.querySelector("#result-count");let i=t;const s=()=>{if(n.textContent=`${i}초 뒤 '${e}' 으로 이동합니다 (다른 버튼을 누르면 취소)`,i<=0){this.goNext();return}i--,this.timer=window.setTimeout(s,1e3)};s()}stopCountdown(){clearTimeout(this.timer),this.timer=0,this.el.querySelector("#result-count").hidden=!0}goNext(){const e=this.next;this.stopCountdown(),this.next=null,e?.onNext()}get visible(){return!this.el.hidden}show(e,t,n){this.title.textContent=e,this.sub.textContent=t,this.stopCountdown(),this.next=n??null;const i=this.el.querySelector("#result-next"),s=this.el.querySelector("#result-count");i.hidden=!n,i.textContent=n?`다음 던전: ${n.name}`:"",s.hidden=!n||n.seconds<=0,this.el.hidden=!1,n&&n.seconds>0&&this.startCountdown(n.name,n.seconds)}hide(){this.stopCountdown(),this.next=null,this.el.hidden=!0}}function Cv(){if(typeof window>"u"||typeof navigator>"u")return!1;try{if(window.matchMedia?.("(pointer: coarse)").matches)return!0}catch{}return navigator.maxTouchPoints>0&&/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)}const Lv=["게임","소리","전투 수치","화면"],Ko=[{key:"difficulty",kind:"choice",group:"게임",label:"난이도",description:"적의 체력·공격력·속도 배율. 바꾸면 던전을 처음부터 다시 시작합니다.",options:ru().map(r=>({value:r,label:Gi(r).label}))},{key:"cameraDistance",kind:"range",group:"게임",label:"카메라 거리",description:"1.0 이 기본. 멀리 두면 넓게 보이고 가까우면 캐릭터가 크게 보입니다.",min:.6,max:1.6,step:.1,unit:"×"},{key:"touchControls",kind:"toggle",group:"게임",label:"터치 조작",description:"화면에 조이스틱·버튼을 띄우고 가까운 적을 자동으로 조준합니다. 휴대폰·태블릿은 기본 켜짐."},{key:"floatingJoystick",kind:"toggle",group:"게임",label:"조이스틱: 누르는 자리에",description:"켜면 버튼이 아닌 아무 곳이나 눌러 그 자리에서 끌면 움직입니다. 끄면 왼쪽 아래 고정 조이스틱."},{key:"leftHanded",kind:"toggle",group:"게임",label:"왼손 모드",description:"공격·점프·회피 버튼을 왼쪽에, 고정 조이스틱을 오른쪽에 둡니다."},{key:"touchButtonScale",kind:"range",group:"게임",label:"터치 버튼 크기",description:"버튼이 작거나 크면 조절하세요.",min:.8,max:1.4,step:.1,unit:"×"},{key:"chestQuiz",kind:"toggle",group:"게임",label:"상자 수학 문제",description:"보물 상자를 열 때 초등 3학년 수학 문제(덧셈·뺄셈·곱셈·나눗셈)를 하나 풀어야 열립니다."},{key:"haptics",kind:"toggle",group:"게임",label:"진동",description:"맞거나 처치할 때 짧게 진동합니다 (지원하는 휴대폰만, iPhone 은 안 됨)."},{key:"soundMaster",kind:"range",group:"소리",label:"전체 음량",description:"0 이면 무음. 소리는 첫 조작(터치·키) 뒤부터 납니다.",min:0,max:1,step:.1},{key:"soundSfx",kind:"range",group:"소리",label:"효과음",description:"공격·피격·획득·보스 소리.",min:0,max:1,step:.1},{key:"soundMusic",kind:"range",group:"소리",label:"음악",description:"던전·보스·메뉴 배경 음악.",min:0,max:1,step:.1},{key:"playerHpMul",kind:"range",group:"전투 수치",label:"내 최대 체력",description:"레벨·장비 보너스를 더한 최대 체력에 곱합니다.",min:.5,max:3,step:.1,unit:"×"},{key:"playerDamageMul",kind:"range",group:"전투 수치",label:"내 공격력",description:"근접·원거리 공격 피해에 곱합니다.",min:.5,max:3,step:.1,unit:"×"},{key:"enemyHpMul",kind:"range",group:"전투 수치",label:"적 체력",description:"난이도 배율에 다시 곱합니다. 다음 던전 입장부터 적용됩니다.",min:.5,max:3,step:.1,unit:"×"},{key:"quality",kind:"choice",group:"화면",label:"화질",description:"높음: 빛 번짐·고급 안티앨리어싱 (PC 권장). 중간: 기본. 낮음: 그림자 해상도·바닥 선명도 낮춤.",options:kx.map(r=>({value:r,label:ts[r].label}))},{key:"showDamageNumbers",kind:"toggle",group:"화면",label:"피해 숫자 표시",description:"공격하거나 맞을 때 숫자를 띄웁니다."},{key:"hitFlash",kind:"toggle",group:"화면",label:"피격 시 화면 번쩍임",description:"맞았을 때 화면 테두리를 붉게 비춥니다."},{key:"shadows",kind:"toggle",group:"화면",label:"그림자",description:"느린 PC·휴대폰에서는 끄면 부드러워집니다."},{key:"resolution",kind:"range",group:"화면",label:"렌더 해상도",description:"1.0 이 기기 기본. 휴대폰에서 끊기면 0.6~0.8 로 낮추세요.",min:.5,max:1.5,step:.1,unit:"×"},{key:"autoQuality",kind:"toggle",group:"화면",label:"자동 화질 조절",description:"플레이 중 평균 30 FPS 아래면 그림자를 끄고 해상도를 한 단계씩 낮춥니다. 직접 정하려면 끄세요."},{key:"showFps",kind:"toggle",group:"화면",label:"FPS 표시",description:"왼쪽 아래에 초당 프레임을 보여줍니다."}];function fi(){const r=Cv();return{difficulty:Y.difficulty.default,playerHpMul:1,playerDamageMul:1,enemyHpMul:1,cameraDistance:1,touchControls:r,floatingJoystick:!0,leftHanded:!1,touchButtonScale:1,haptics:r,soundMaster:.8,soundSfx:1,soundMusic:.6,quality:r?"medium":"high",resolution:r?.8:1,autoQuality:!0,showDamageNumbers:Y.hud.showDamageNumbers,hitFlash:!0,shadows:r?!1:Y.graphics.shadows,showFps:Y.debug.showFps,chestQuiz:!0}}function Jo(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function Pv(r,e){const t=Number.isFinite(e)?e:fi()[r.key],n=Math.round((t-r.min)/r.step)*r.step+r.min,i=Math.min(r.max,Math.max(r.min,n));return Math.round(i*1e3)/1e3}function ou(r){const e=fi(),t=[];if(!Jo(r))return{settings:e,warnings:r==null?[]:["설정 데이터가 객체가 아니라 기본값을 씁니다."]};const n={...e};for(const i of Ko){const s=r[i.key];if(s!==void 0)if(i.kind==="choice")i.key==="difficulty"?typeof s=="string"&&Sa(s)?n.difficulty=s:t.push(`난이도 값 '${String(s)}' 이(가) 잘못되어 기본값으로 바꿨습니다.`):Fx(s)?n.quality=s:t.push(`화질 값 '${String(s)}' 이(가) 잘못되어 기본값으로 바꿨습니다.`);else if(i.kind==="toggle")typeof s=="boolean"?n[i.key]=s:t.push(`'${i.label}' 값이 참/거짓이 아니라 기본값으로 바꿨습니다.`);else{const o=typeof s=="number"?Pv(i,s):NaN;Number.isNaN(o)?t.push(`'${i.label}' 값이 숫자가 아니라 기본값으로 바꿨습니다.`):(o!==s&&t.push(`'${i.label}' 값 ${String(s)} 을(를) 허용 범위 안의 ${o} 으로 보정했습니다.`),n[i.key]=o)}}return{settings:n,warnings:t}}const au="hero-x.settings",Iv=1;function Dv(r){if(!r)return{settings:fi(),warnings:[],found:!1};let e=null;try{e=r.getItem(au)}catch{}if(!e)return{settings:fi(),warnings:[],found:!1};try{const t=JSON.parse(e),n=Jo(t)&&Jo(t.settings)?t.settings:t;return{...ou(n),found:!0}}catch{return{settings:fi(),warnings:["설정 데이터를 읽을 수 없어 기본값을 씁니다."],found:!0}}}function ys(r,e){if(!r)return!1;try{return r.setItem(au,JSON.stringify({version:Iv,settings:e})),!0}catch(t){return Ce.warn("설정 저장에 실패했습니다.",t),!1}}class Nv{constructor(e,t){this.cb=t,this.confirming=!1,this.el=document.createElement("div"),this.el.className="guide settings",this.el.hidden=!0;const n=Lv.map(s=>{const o=Ko.filter(a=>a.group===s).map(a=>{let l="";return a.kind==="choice"?l=a.options.map(c=>`<button type="button" class="diff-btn" data-key="${a.key}" data-value="${c.value}"${a.key==="difficulty"?` data-level="${c.value}"`:""}>${c.label}</button>`).join(""):a.kind==="toggle"?l=`<button type="button" class="toggle" role="switch" data-key="${a.key}" aria-checked="false"><span class="toggle-knob"></span></button>`:l=`<input type="range" data-key="${a.key}" min="${a.min}" max="${a.max}" step="${a.step}" aria-label="${a.label}"><output data-out="${a.key}"></output>`,`<div class="set-row" data-row="${a.key}"><div class="set-text"><div class="set-label">${a.label}</div><div class="set-desc">${a.description}</div></div><div class="set-control">${l}</div></div>`}).join("");return`<section class="set-group"><h3 class="set-group-title">${s}</h3>${o}</section>`}).join("");this.el.innerHTML=`
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
      </div>`,e.appendChild(this.el),this.el.querySelector("#settings-close")?.addEventListener("click",()=>this.cb.onClose());const i=this.el.querySelector("#face-file");i.addEventListener("change",async()=>{const s=i.files?.[0];if(i.value="",!s)return;const o=this.el.querySelector("#face-status");o.textContent="사진을 처리하는 중…";try{await this.cb.face.pick(s),o.textContent=""}catch(a){o.textContent=a instanceof Error?a.message:String(a)}this.refresh()}),this.el.querySelector("#face-clear")?.addEventListener("click",()=>{this.cb.face.clear(),this.refresh()}),this.el.querySelector("#settings-reset")?.addEventListener("click",()=>this.setConfirm(!0)),this.el.querySelector("#settings-reset-no")?.addEventListener("click",()=>this.setConfirm(!1)),this.el.querySelector("#settings-reset-yes")?.addEventListener("click",()=>{this.setConfirm(!1),this.cb.resetAll(),this.refresh()}),this.el.querySelectorAll('input[type="range"]').forEach(s=>{s.addEventListener("input",()=>{this.cb.set(s.dataset.key,Number(s.value)),this.refresh()})}),this.el.querySelectorAll("button.toggle").forEach(s=>{s.addEventListener("click",()=>{const o=s.dataset.key;this.cb.set(o,!this.cb.get()[o]),this.refresh()})}),this.el.querySelectorAll(".diff-btn").forEach(s=>{s.addEventListener("click",()=>{this.cb.set(s.dataset.key,s.dataset.value),this.refresh()})}),this.refresh()}get visible(){return!this.el.hidden}setConfirm(e){this.confirming=e,this.el.querySelector("#settings-confirm").hidden=!e}refresh(){const e=this.cb.get(),t=this.cb.face.get(),n=this.el.querySelector("#face-preview");n.hidden=!t,t&&(n.src=t),this.el.querySelector("#face-clear").disabled=!t;for(const i of Ko)if(i.kind==="choice"){const s=String(e[i.key]);this.el.querySelectorAll(`.diff-btn[data-key="${i.key}"]`).forEach(o=>o.setAttribute("aria-pressed",String(o.dataset.value===s)))}else if(i.kind==="toggle")this.el.querySelector(`button.toggle[data-key="${i.key}"]`)?.setAttribute("aria-checked",String(e[i.key]));else{const s=this.el.querySelector(`input[data-key="${i.key}"]`),o=this.el.querySelector(`output[data-out="${i.key}"]`),a=e[i.key];s&&(s.value=String(a)),o&&(o.textContent=`${a.toFixed(1)}${i.unit??""}`)}}show(){this.setConfirm(!1),this.refresh(),this.el.hidden=!1}hide(){this.confirming=!1,this.el.hidden=!0}pressBack(){this.confirming?this.setConfirm(!1):this.cb.onClose()}}const ur=2,Bc={clears:0,deaths:0,totalKills:0,bestScore:0,dungeonClears:{}};function dr(r){return{...r,dungeonClears:{...r.dungeonClears}}}const Uv=["common","uncommon","rare","epic","legendary"];function kv(r){return typeof r=="string"&&Uv.includes(r)}function Gn(r){return typeof r=="object"&&r!==null&&!Array.isArray(r)}function zn(r,e,t,n){const i=typeof r=="number"&&Number.isFinite(r)?Math.floor(r):n;return Math.min(t,Math.max(e,i))}function Hc(r){return{templateId:r.templateId,rarity:r.rarity}}function Fv(r){const e={};for(const t of xi){const n=r.equipment.equipped[t];e[t]=n?Hc(n):null}return{version:ur,savedAt:(r.now??new Date).toISOString(),gameVersion:Y.meta.version,difficulty:r.difficulty,stats:{level:r.stats.level,xp:r.stats.xp,gold:r.stats.gold},equipment:{inventory:r.equipment.inventory.map(Hc),equipped:e},records:dr(r.records)}}function Gc(r,e,t){return!Gn(r)||typeof r.templateId!="string"||!kv(r.rarity)?(e.push(`${t}: 장비 항목 형식이 잘못되어 버렸습니다.`),null):wr(r.templateId)?{templateId:r.templateId,rarity:r.rarity}:(e.push(`${t}: 알 수 없는 장비 '${r.templateId}' 를 버렸습니다.`),null)}function Ov(r){if(!Gn(r))return{ok:!1,reason:"invalid",message:"저장 데이터가 객체가 아닙니다."};const e=typeof r.version=="number"?r.version:NaN;if(!Number.isInteger(e)||e<1)return{ok:!1,reason:"invalid",message:"저장 데이터에 버전이 없습니다."};if(e>ur)return{ok:!1,reason:"newer",message:`저장 데이터 버전(${e})이 이 게임이 아는 버전(${ur})보다 새롭습니다.`};const t=zv(r,e),n=[];if(!Gn(t.stats)||!Gn(t.equipment))return{ok:!1,reason:"invalid",message:"stats 또는 equipment 항목이 없습니다."};const i=Y.progression,s=zn(t.stats.level,1,i.maxLevel,1),o=Math.round(i.xpBase*Math.pow(i.xpGrowth,s-1)),a={level:s,xp:zn(t.stats.xp,0,o,0),gold:zn(t.stats.gold,0,999999999,0)};(a.level!==t.stats.level||a.xp!==t.stats.xp||a.gold!==t.stats.gold)&&n.push("성장 수치가 범위를 벗어나 보정했습니다.");const l=typeof t.difficulty=="string"&&Sa(t.difficulty)?t.difficulty:Y.difficulty.default;l!==t.difficulty&&n.push("난이도 값이 잘못되어 기본 난이도로 바꿨습니다.");const c=t.equipment,h=[],u=Array.isArray(c.inventory)?c.inventory:[];Array.isArray(c.inventory)||n.push("가방 목록이 없어 비웠습니다."),u.forEach((_,v)=>{const E=Gc(_,n,`가방 ${v+1}번`);E&&h.push(E)});const d={},f=Gn(c.equipped)?c.equipped:{};for(const _ of xi){const v=f[_];if(v==null){d[_]=null;continue}const E=Gc(v,n,`슬롯 ${_}`);E&&!tu(wr(E.templateId).category).includes(_)?(n.push(`슬롯 ${_}: 맞지 않는 장비라 가방으로 옮겼습니다.`),h.push(E),d[_]=null):d[_]=E}const g=Y.equipment.inventorySize;h.length>g&&(n.push(`가방이 ${g}칸을 넘어 뒤쪽 ${h.length-g}개를 버렸습니다.`),h.length=g);const x=Gn(t.records)?t.records:{},m={},p=Gn(x.dungeonClears)?x.dungeonClears:{};for(const[_,v]of Object.entries(p)){if(!Jt.some(E=>E.id===_)){n.push(`알 수 없는 던전 '${_}' 의 클리어 기록을 버렸습니다.`);continue}m[_]=zn(v,0,1e9,0)}const y={clears:zn(x.clears,0,1e9,0),deaths:zn(x.deaths,0,1e9,0),totalKills:zn(x.totalKills,0,1e9,0),bestScore:zn(x.bestScore,0,1e12,0),dungeonClears:m};return{ok:!0,warnings:n,data:{version:ur,savedAt:typeof t.savedAt=="string"&&!Number.isNaN(Date.parse(t.savedAt))?t.savedAt:new Date(0).toISOString(),gameVersion:typeof t.gameVersion=="string"?t.gameVersion:"?",difficulty:l,stats:a,equipment:{inventory:h,equipped:d},records:y}}}function zv(r,e){const t={...r};if(e<2){const n=Gn(t.records)?{...t.records}:{},i=typeof n.clears=="number"?n.clears:0;n.dungeonClears=i>0?{[Jt[0].id]:i}:{},t.records=n}return t}function Bv(r,e){e.stats.reset(),e.stats.level=r.stats.level,e.stats.xp=r.stats.xp,e.stats.gold=r.stats.gold,e.equipment.reset();for(const t of r.equipment.inventory){const n=wr(t.templateId);n&&e.equipment.add(Sr(n,t.rarity))}for(const t of xi){const n=r.equipment.equipped[t],i=n?wr(n.templateId):void 0;n&&i&&(e.equipment.equipped[t]=Sr(i,n.rarity))}}function Vc(r){const e=r.stats,t=r.equipment;return e.level>1||e.xp>0||e.gold>0||t.inventory.length>0||xi.some(n=>t.equipped[n]!==null)||r.records.clears>0||r.records.deaths>0}const Ur="hero-x.save",Wc="hero-x.save.corrupt";function Hv(){try{const r=globalThis.localStorage,e="__hero-x-probe__";return r.setItem(e,"1"),r.removeItem(e),r}catch{return null}}function Gv(r){if(!r)return{kind:"unavailable"};let e;try{e=r.getItem(Ur)}catch{return{kind:"unavailable"}}if(e===null||e==="")return{kind:"none"};let t;try{t=JSON.parse(e)}catch{return qc(r,e),{kind:"corrupt",message:"저장 데이터를 읽을 수 없어(JSON 손상) 따로 보관하고 새로 시작합니다."}}const n=Ov(t);return n.ok?{kind:"loaded",data:n.data,warnings:n.warnings}:n.reason==="newer"?{kind:"newer",message:n.message}:(qc(r,e),{kind:"corrupt",message:`저장 데이터가 손상되어 따로 보관하고 새로 시작합니다. (${n.message})`})}function qc(r,e){try{r.setItem(Wc,e),r.removeItem(Ur),Ce.warn(`손상된 저장 데이터를 '${Wc}' 에 보관했습니다.`)}catch{}}function Vv(r,e){if(!r)return!1;try{return r.setItem(Ur,JSON.stringify(e)),!0}catch(t){return Ce.warn("저장에 실패했습니다.",t),!1}}function Wv(r){if(r)try{r.removeItem(Ur)}catch{}}function ar(r){if(typeof navigator>"u"||typeof navigator.vibrate!="function")return!1;try{return navigator.vibrate(r)}catch{return!1}}const qv={melee:{parts:[{wave:"noise",freq:0,duration:.14,gain:.22,filter:900,filterType:"bandpass",filterEnd:2600},{wave:"triangle",freq:180,freqEnd:90,duration:.1,gain:.1}],reverb:.1,pitchJitter:2,gainJitter:.15},ranged:{parts:[{wave:"square",freq:1200,freqEnd:300,duration:.14,gain:.14,detune:8,filter:3e3},{wave:"sine",freq:2400,freqEnd:600,duration:.08,gain:.08},{wave:"noise",freq:0,duration:.02,gain:.1,filter:4e3,filterType:"highpass"}],reverb:.15,pitchJitter:1.5},enemyHit:{parts:[{wave:"sine",freq:160,freqEnd:50,duration:.14,gain:.4},{wave:"noise",freq:0,duration:.06,gain:.3,filter:1500,filterType:"bandpass",distortion:.4},{wave:"square",freq:520,freqEnd:380,duration:.09,gain:.1,filter:2500}],reverb:.2,pitchJitter:2,gainJitter:.2},kill:{parts:[{wave:"sine",freq:120,freqEnd:30,duration:.45,gain:.5},{wave:"noise",freq:0,duration:.5,gain:.4,filter:3e3,filterEnd:300,distortion:.5},{wave:"sawtooth",freq:300,freqEnd:60,duration:.3,gain:.12,filter:1200},{wave:"triangle",freq:1800,freqEnd:2600,duration:.25,gain:.06,delay:.05}],reverb:.35,pitchJitter:1.5,gainJitter:.15},hurt:{parts:[{wave:"sawtooth",freq:220,freqEnd:110,duration:.22,gain:.22,distortion:.3,filter:1800},{wave:"noise",freq:0,duration:.1,gain:.18,filter:800,filterType:"bandpass"},{wave:"sine",freq:90,freqEnd:40,duration:.2,gain:.3}],reverb:.2,pitchJitter:1},pickup:{parts:[{wave:"sine",freq:880,duration:.07,gain:.16},{wave:"sine",freq:1320,duration:.12,gain:.16,delay:.06}],reverb:.25,pitchJitter:.5},equip:{parts:[{wave:"triangle",freq:440,duration:.08,gain:.15},{wave:"triangle",freq:660,duration:.08,gain:.15,delay:.08},{wave:"triangle",freq:880,duration:.16,gain:.15,delay:.16},{wave:"noise",freq:0,duration:.03,gain:.12,filter:5e3,filterType:"highpass"}],reverb:.3},heal:{parts:[{wave:"sine",freq:440,freqEnd:880,duration:.3,gain:.18,detune:6,attack:.03},{wave:"sine",freq:1320,duration:.3,gain:.08,delay:.15,attack:.05}],reverb:.45},levelup:{parts:[{wave:"triangle",freq:523,duration:.12,gain:.16},{wave:"triangle",freq:659,duration:.12,gain:.16,delay:.1},{wave:"triangle",freq:784,duration:.12,gain:.16,delay:.2},{wave:"triangle",freq:1047,duration:.5,gain:.18,delay:.3,detune:7},{wave:"sawtooth",freq:523,duration:.5,gain:.06,delay:.3,filter:1500,detune:5}],reverb:.5},chest:{parts:[{wave:"sawtooth",freq:90,freqEnd:140,duration:.25,gain:.08,filter:600},{wave:"sine",freq:1568,duration:.18,gain:.12,delay:.1},{wave:"sine",freq:2093,duration:.3,gain:.12,delay:.22},{wave:"noise",freq:0,duration:.3,gain:.05,filter:6e3,filterType:"highpass",delay:.1}],reverb:.4},jump:{parts:[{wave:"sine",freq:300,freqEnd:600,duration:.14,gain:.16},{wave:"noise",freq:0,duration:.05,gain:.08,filter:3e3,filterType:"highpass"}],pitchJitter:1},dash:{parts:[{wave:"noise",freq:0,duration:.18,gain:.28,filter:1200,filterType:"bandpass",filterEnd:3500},{wave:"sine",freq:220,freqEnd:440,duration:.1,gain:.08}],pitchJitter:1},bossAppear:{parts:[{wave:"sawtooth",freq:55,duration:1.2,gain:.35,filter:300,filterEnd:1200,detune:10,attack:.05},{wave:"noise",freq:0,duration:1,gain:.2,filter:400,attack:.1},{wave:"sine",freq:110,freqEnd:55,duration:.8,gain:.3}],reverb:.6},slam:{parts:[{wave:"sine",freq:90,freqEnd:25,duration:.5,gain:.6},{wave:"noise",freq:0,duration:.35,gain:.45,filter:600,distortion:.5},{wave:"sawtooth",freq:70,duration:.3,gain:.15,distortion:.6,filter:500}],reverb:.4,pitchJitter:1},boom:{parts:[{wave:"sine",freq:100,freqEnd:30,duration:.4,gain:.5},{wave:"noise",freq:0,duration:.45,gain:.4,filter:2500,filterEnd:200,distortion:.4}],reverb:.4,pitchJitter:2,gainJitter:.15},summon:{parts:[{wave:"triangle",freq:300,freqEnd:900,duration:.35,gain:.15,detune:12},{wave:"sine",freq:900,freqEnd:1800,duration:.3,gain:.08,delay:.1},{wave:"noise",freq:0,duration:.3,gain:.08,filter:4e3,filterType:"highpass"}],reverb:.5},clear:{parts:[{wave:"triangle",freq:523,duration:.15,gain:.18,detune:7},{wave:"triangle",freq:659,duration:.15,gain:.18,delay:.15,detune:7},{wave:"triangle",freq:784,duration:.15,gain:.18,delay:.3,detune:7},{wave:"triangle",freq:1047,duration:.7,gain:.2,delay:.45,detune:7},{wave:"sawtooth",freq:262,duration:.7,gain:.07,delay:.45,filter:1500,detune:6,attack:.05},{wave:"sawtooth",freq:392,duration:.7,gain:.05,delay:.45,filter:1500,detune:6,attack:.05}],reverb:.5},defeat:{parts:[{wave:"sawtooth",freq:330,freqEnd:165,duration:.6,gain:.2,filter:1200,filterEnd:300},{wave:"sine",freq:165,freqEnd:82,duration:.8,gain:.25,delay:.3}],reverb:.5},ui:{parts:[{wave:"sine",freq:700,duration:.05,gain:.12},{wave:"triangle",freq:1400,duration:.03,gain:.06}],reverb:.1}},U=null,Xc={menu:{bpm:84,root:130.81,chords:[[0,4,7],U,U,U,[-3,0,4],U,U,U,[-7,-3,0],U,U,U,[-5,-1,2],U,U,U],bass:[0,U,7,U,-3,U,4,U,-7,U,0,U,-5,U,2,U],melody:[12,U,16,U,19,U,16,U,12,U,14,U,16,U,U,U,17,U,16,U,14,U,12,U,11,U,U,U,12,U,U,U],bassWave:"triangle",melodyWave:"sine",melodyGain:.6,padWave:"triangle",padGain:.8,reverb:.45},forest:{bpm:112,root:130.81,chords:[[0,4,7],U,U,U,[0,5,9],U,U,U,[-1,2,7],U,U,U,[0,4,9],U,U,U],bass:[0,0,7,0,5,5,0,5,7,7,2,7,9,9,4,9],melody:[12,14,16,U,19,U,16,U,17,U,16,14,12,U,U,U,14,U,16,U,19,U,14,U,16,U,12,U,U,U,U,U],drums:["k","h","s","h","k","h","s","h","k","h","s","h","k","h","s","h","k","h","s","h","k","h","s","h","k","h","s","h","k","k","s","s"],bassWave:"triangle",melodyWave:"square",melodyGain:.45,melodyFilter:2400,padWave:"triangle",padGain:.6,reverb:.3},cave:{bpm:92,root:110,chords:[[0,3,7],U,U,U,[-4,0,3],U,U,U,[5,8,12],U,U,U,[-5,-2,2],U,U,U],bass:[0,U,0,U,-4,U,-4,U,5,U,5,U,-5,U,-5,U],melody:[12,U,U,15,U,17,U,U,15,U,12,U,U,U,10,U,12,U,U,15,U,19,U,U,17,U,15,U,12,U,U,U],drums:["k",U,"h",U,"s",U,"h",U,"k",U,"h",U,"s",U,"h",U,"k",U,"h",U,"s",U,"h",U,"k",U,"h",U,"s",U,"s","s"],bassWave:"sine",melodyWave:"triangle",melodyGain:.55,melodyFilter:1800,padWave:"triangle",padGain:.7,reverb:.55},fortress:{bpm:132,root:98,chords:[[0,3,7],U,U,U,[-4,0,3],U,U,U,[-2,2,5],U,U,U,[-5,-1,2],U,U,U],bass:[0,0,12,0,-4,-4,8,-4,-2,-2,10,-2,-5,-5,7,-5],melody:[12,12,U,15,U,12,U,17,15,U,12,U,U,U,U,U,10,10,U,12,U,10,U,8,7,U,U,U,10,U,12,U],drums:["k","h","s","h","k","k","s","h","k","h","s","h","k","k","s","h","k","h","s","h","k","k","s","h","k","h","s","h","s","s","s","s"],bassWave:"sawtooth",melodyWave:"sawtooth",melodyGain:.4,melodyFilter:2200,padWave:"sawtooth",padGain:.35,reverb:.3},boss:{bpm:150,root:98,chords:[[0,3,7],U,U,U,[5,8,12],U,U,U,[0,3,7],U,U,U,[-5,-1,2],U,U,U],bass:[0,0,0,0,5,5,5,5,0,0,0,0,-5,-5,-3,-1],melody:[12,U,12,15,U,12,18,17,17,U,U,15,U,12,U,U,12,U,12,15,U,19,U,17,14,U,U,U,15,U,17,U],drums:["k","k","s","h","k","k","s","h","k","k","s","h","k","k","s","h","k","k","s","h","k","k","s","h","k","k","s","s","k","k","s","s"],bassWave:"sawtooth",melodyWave:"sawtooth",melodyGain:.35,melodyFilter:2600,padWave:"sawtooth",padGain:.3,reverb:.3}};function Ao(r,e){return r*Math.pow(2,e/12)}function Xv(r,e){const t=r.length;if(t===0)return null;const n=(e%t+t)%t,i=r[n];if(!i)return null;let s=1;for(;s<t&&r[(n+s)%t]===null;)s++;return{notes:i,hold:s}}class jv{constructor(){this.ctx=null,this.reverb=null,this.noiseBuffer=null,this.shaperCurves=new Map,this.volumes={master:.8,sfx:1,music:.6},this.lastPlayed=new Map,this.unlocked=!1,this.cleanup=[],this.activeVoices=0,this.decoded=new Map,this.decoding=new Set,this.track=null,this.pendingTrack=null,this.nextNoteTime=0,this.step=0,this.schedulerId=0,this.trackGain=null,this.musicSource=null,this.musicIsFile=!1,oi.onLoaded=e=>this.decodeKey(e)}attach(e=window){const t=()=>{if(this.ensureContext(),this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume(),this.ctx&&(this.unlocked=!0),this.pendingTrack){const i=this.pendingTrack;this.pendingTrack=null,this.playMusic(i)}};for(const i of["pointerdown","keydown","touchend"])e.addEventListener(i,t,{passive:!0}),this.cleanup.push(()=>e.removeEventListener(i,t));const n=()=>{this.ctx&&(document.hidden?this.ctx.suspend():this.ctx.resume())};document.addEventListener("visibilitychange",n),this.cleanup.push(()=>document.removeEventListener("visibilitychange",n))}get ready(){return this.unlocked&&this.ctx!==null}get currentTrack(){return this.track??this.pendingTrack}get voices(){return this.activeVoices}get usingFileMusic(){return this.musicIsFile}get fileKeys(){return[...this.decoded.keys()]}ensureContext(){if(!this.ctx)try{const e=window.AudioContext??window.webkitAudioContext;if(!e)return;const t=new e;this.ctx=t,this.master=t.createGain(),this.sfxGain=t.createGain(),this.musicGain=t.createGain(),this.sfxGain.connect(this.master),this.musicGain.connect(this.master);const n=t.createDynamicsCompressor();n.threshold.value=-14,n.knee.value=18,n.ratio.value=4,n.attack.value=.003,n.release.value=.25,this.master.connect(n),n.connect(t.destination),this.applyVolumes();const i=t.sampleRate;this.noiseBuffer=t.createBuffer(1,i,t.sampleRate);const s=this.noiseBuffer.getChannelData(0);for(let l=0;l<i;l++)s[l]=Math.random()*2-1;const o=Math.floor(t.sampleRate*1.8),a=t.createBuffer(2,o,t.sampleRate);for(let l=0;l<2;l++){const c=a.getChannelData(l);for(let h=0;h<o;h++){const u=h/o;c[h]=(Math.random()*2-1)*Math.pow(1-u,3)*.6}}this.reverb=t.createConvolver(),this.reverb.buffer=a,this.reverb.connect(this.master);for(const l of oi.loadedKeys)this.decodeKey(l)}catch(e){Ce.warn("소리를 켤 수 없습니다 (Web Audio 미지원). 게임은 계속 진행됩니다.",e),this.ctx=null}}setVolumes(e){this.volumes={...this.volumes,...e},this.applyVolumes()}applyVolumes(){if(!this.ctx)return;const e=t=>Math.min(1,Math.max(0,t));this.master.gain.value=e(this.volumes.master),this.sfxGain.gain.value=e(this.volumes.sfx),this.musicGain.gain.value=e(this.volumes.music)}decodeKey(e){if(!this.ctx||this.decoded.has(e)||this.decoding.has(e))return;const t=oi.get(e);if(!t)return;this.decoding.add(e);const n=this.ctx;Promise.all(t.data.map(i=>n.decodeAudioData(i.slice(0)))).then(i=>{if(this.decoded.set(e,i),this.track&&e===`music:${this.track}`&&!this.musicIsFile){const s=this.track;this.stopMusic(),this.playMusic(s)}}).catch(i=>Ce.warn(`음원 '${e}' 디코딩 실패. 합성음을 씁니다.`,i)).finally(()=>this.decoding.delete(e))}fileBuffers(e){const t=this.decoded.get(e),n=oi.get(e);return t&&n?{buffers:t,gain:n.entry.gain}:(n&&this.decodeKey(e),null)}playBuffer(e,t,n,i,s,o){if(!this.ctx)return null;const a=this.ctx.createBufferSource();a.buffer=e[Math.floor(Math.random()*e.length)],a.playbackRate.value=n,a.loop=o;const l=this.ctx.createGain();return l.gain.value=i,a.connect(l),l.connect(t),this.trackVoice(a),a.start(s),a}trackVoice(e){this.activeVoices++,e.addEventListener("ended",()=>{this.activeVoices--})}play(e,t=.03){if(!this.ctx||!this.unlocked||this.volumes.master<=0||this.volumes.sfx<=0)return;const n=this.ctx.currentTime,i=this.lastPlayed.get(e)??-1;if(n-i<t)return;this.lastPlayed.set(e,n);const s=qv[e],o=s.pitchJitter?Math.pow(2,(Math.random()*2-1)*s.pitchJitter/12):1,a=s.gainJitter?1+(Math.random()*2-1)*s.gainJitter:1,l=this.fileBuffers(`sfx:${e}`);if(l){this.playBuffer(l.buffers,this.sfxGain,o,a*l.gain,n,!1);return}const c=this.ctx.createGain();if(c.gain.value=a,c.connect(this.sfxGain),s.reverb&&this.reverb){const h=this.ctx.createGain();h.gain.value=s.reverb,c.connect(h),h.connect(this.reverb)}for(const h of s.parts)this.synthPart(h,c,n,o)}synthPart(e,t,n,i){const s=this.ctx;if(!s)return;const o=n+(e.delay??0),a=o+e.duration,l=s.createGain();l.gain.setValueAtTime(1e-4,o),l.gain.linearRampToValueAtTime(e.gain,o+(e.attack??.008)),l.gain.exponentialRampToValueAtTime(1e-4,a),l.connect(t);let c=l;if(e.distortion){const f=s.createWaveShaper();f.curve=this.shaperCurve(e.distortion),f.oversample="2x",f.connect(c),c=f}const h=e.wave==="noise",u=e.filter??(h?2e3:void 0);if(u!==void 0){const f=s.createBiquadFilter();f.type=e.filterType??"lowpass",f.Q.value=f.type==="bandpass"?1.2:.8,f.frequency.setValueAtTime(u,o),e.filterEnd!==void 0&&f.frequency.exponentialRampToValueAtTime(Math.max(20,e.filterEnd),a),f.connect(c),c=f}if(h){if(!this.noiseBuffer)return;const f=s.createBufferSource();f.buffer=this.noiseBuffer,f.loop=!0,f.connect(c),this.trackVoice(f),f.start(o),f.stop(a+.02);return}const d=e.detune?[-e.detune/2,e.detune/2]:[0];for(const f of d){const g=s.createOscillator();if(g.type=e.wave,g.frequency.setValueAtTime(e.freq*i,o),e.freqEnd!==void 0&&g.frequency.exponentialRampToValueAtTime(Math.max(1,e.freqEnd*i),a),g.detune.value=f,d.length>1){const x=s.createGain();x.gain.value=.55,g.connect(x),x.connect(c)}else g.connect(c);this.trackVoice(g),g.start(o),g.stop(a+.02)}}shaperCurve(e){const t=Math.round(e*100)/100;let n=this.shaperCurves.get(t);if(n)return n;const i=1024,s=t*100;n=new Float32Array(i);for(let o=0;o<i;o++){const a=o*2/i-1;n[o]=(1+s)*a/(1+s*Math.abs(a))}return this.shaperCurves.set(t,n),n}playMusic(e){if(!this.ctx||!this.unlocked){this.pendingTrack=e;return}if(e===this.track||(this.stopMusic(),!e))return;this.track=e;const t=this.ctx.currentTime;this.trackGain=this.ctx.createGain(),this.trackGain.gain.setValueAtTime(1e-4,t),this.trackGain.gain.exponentialRampToValueAtTime(1,t+.6),this.trackGain.connect(this.musicGain);const n=this.fileBuffers(`music:${e}`);if(n){this.musicIsFile=!0,this.musicSource=this.playBuffer(n.buffers,this.trackGain,1,n.gain,t+.05,!0);return}const i=Xc[e];if(i.reverb&&this.reverb){const s=this.ctx.createGain();s.gain.value=i.reverb,this.trackGain.connect(s),s.connect(this.reverb)}this.musicIsFile=!1,this.step=0,this.nextNoteTime=t+.05,this.schedule()}stopMusic(){if(this.schedulerId&&(clearTimeout(this.schedulerId),this.schedulerId=0),this.trackGain&&this.ctx){const e=this.trackGain,t=this.musicSource,n=this.ctx.currentTime;e.gain.cancelScheduledValues(n),e.gain.setValueAtTime(e.gain.value,n),e.gain.exponentialRampToValueAtTime(1e-4,n+.4);try{t?.stop(n+.45)}catch{}setTimeout(()=>e.disconnect(),500)}this.musicSource=null,this.musicIsFile=!1,this.trackGain=null,this.track=null,this.pendingTrack=null}schedule(){if(!this.ctx||!this.track||!this.trackGain)return;const e=Xc[this.track],t=60/e.bpm,n=t/2,i=.25;for(;this.nextNoteTime<this.ctx.currentTime+i;){const s=this.step,o=this.nextNoteTime;if(s%2===0){const c=s/2,h=e.bass[c%e.bass.length];if(h!==null&&this.note(e.bassWave,Ao(e.root,h),o,t*.9,.2,void 0,!0),e.chords&&e.chords[c%e.chords.length]!==null){const u=Xv(e.chords,c);u&&this.pad(e,u.notes,o,u.hold*t)}}const a=e.melody[s%e.melody.length];a!==null&&this.note(e.melodyWave,Ao(e.root,a),o,n*.8,.14*e.melodyGain,e.melodyFilter);const l=e.drums?.[s%e.drums.length];l&&this.drum(l,o),this.nextNoteTime+=n,this.step++}this.schedulerId=window.setTimeout(()=>this.schedule(),100)}note(e,t,n,i,s,o,a=!1){const l=this.ctx;if(!l||!this.trackGain)return;const c=l.createGain();c.gain.setValueAtTime(1e-4,n),c.gain.linearRampToValueAtTime(s,n+.01),c.gain.exponentialRampToValueAtTime(1e-4,n+i),c.connect(this.trackGain);let h=c;if(o){const d=l.createBiquadFilter();d.type="lowpass",d.Q.value=1.5,d.frequency.setValueAtTime(o,n),d.frequency.exponentialRampToValueAtTime(Math.max(200,o*.3),n+i),d.connect(c),h=d}const u=l.createOscillator();if(u.type=e,u.frequency.value=t,u.connect(h),this.trackVoice(u),u.start(n),u.stop(n+i+.02),a){const d=l.createOscillator(),f=l.createGain();d.type="sine",d.frequency.value=t/2,f.gain.value=.7,d.connect(f),f.connect(c),this.trackVoice(d),d.start(n),d.stop(n+i+.02)}}pad(e,t,n,i){const s=this.ctx;if(!s||!this.trackGain)return;const o=.045*(e.padGain??1),a=s.createGain();a.gain.setValueAtTime(1e-4,n),a.gain.linearRampToValueAtTime(o,n+.12),a.gain.setValueAtTime(o,n+i-.2),a.gain.exponentialRampToValueAtTime(1e-4,n+i);const l=s.createBiquadFilter();l.type="lowpass",l.frequency.value=900,l.connect(a),a.connect(this.trackGain);for(const c of t)for(const h of[-6,6]){const u=s.createOscillator();u.type=e.padWave??"triangle",u.frequency.value=Ao(e.root,c),u.detune.value=h,u.connect(l),this.trackVoice(u),u.start(n),u.stop(n+i+.02)}}drum(e,t){const n=this.ctx;if(!n||!this.trackGain||!this.noiseBuffer)return;const i=this.trackGain,s=(l,c)=>{const h=n.createGain();return h.gain.setValueAtTime(l,t),h.gain.exponentialRampToValueAtTime(1e-4,t+c),h.connect(i),h},o=(l,c,h,u)=>{const d=n.createBufferSource();d.buffer=this.noiseBuffer,d.loop=!0;const f=n.createBiquadFilter();f.type=l,f.frequency.value=c,f.Q.value=.7,d.connect(f),f.connect(s(h,u)),this.trackVoice(d),d.start(t),d.stop(t+u+.02)},a=(l,c,h,u)=>{const d=n.createOscillator();d.type="sine",d.frequency.setValueAtTime(l,t),d.frequency.exponentialRampToValueAtTime(c,t+u*.5),d.connect(s(h,u)),this.trackVoice(d),d.start(t),d.stop(t+u+.02)};for(const l of e)l==="k"?a(150,40,.5,.25):l==="s"?(o("bandpass",1800,.3,.12),a(200,120,.2,.08)):l==="h"?o("highpass",7e3,.12,.04):l==="o"&&o("highpass",6e3,.1,.22)}dispose(){this.stopMusic(),this.cleanup.forEach(e=>e()),this.cleanup=[],oi.onLoaded=null,this.ctx?.close(),this.ctx=null}}function $v(r,e,t=30,n=.5){if(r.length===0)return{next:e,message:null};const i=r.reduce((o,a)=>o+a,0)/r.length;if(i>=t)return{next:e,message:null};if(e.quality==="high")return{next:{...e,quality:"medium"},message:`화면이 끊겨(평균 ${Math.round(i)} FPS) 화질을 '중간'으로 낮췄습니다`};if(e.shadows)return{next:{...e,shadows:!1},message:`화면이 끊겨(평균 ${Math.round(i)} FPS) 그림자를 껐습니다`};const s=Math.round(Math.max(n,e.resolution-.2)*10)/10;return s<e.resolution?{next:{...e,resolution:s},message:`화면이 끊겨(평균 ${Math.round(i)} FPS) 해상도를 ${s.toFixed(1)}× 로 낮췄습니다`}:{next:e,message:null}}const lu={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class ls{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Yv=new Cr(-1,1,1,-1,0,1);class Kv extends Tt{constructor(){super(),this.setAttribute("position",new lt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new lt([0,2,0,0,2,0],2))}}const Jv=new Kv;class wa{constructor(e){this._mesh=new oe(Jv,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Yv)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Zv extends ls{constructor(e,t){super(),this.textureID=t!==void 0?t:"tDiffuse",e instanceof Ht?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Zi.clone(e.uniforms),this.material=new Ht({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new wa(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class jc extends ls{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),s.buffers.stencil.setClear(a),s.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class Qv extends ls{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class ey{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const n=e.getSize(new Se);this._width=n.width,this._height=n.height,t=new tn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:gn}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Zv(lu),this.copyPass.material.blending=Ln,this.clock=new sx}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let n=!1;for(let i=0,s=this.passes.length;i<s;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),o.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}jc!==void 0&&(o instanceof jc?n=!0:o instanceof Qv&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Se);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(n,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const ty={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class ny extends ls{constructor(){super();const e=ty;this.uniforms=Zi.clone(e.uniforms),this.material=new z0({name:e.name,uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader}),this.fsQuad=new wa(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Je.getTransfer(this._outputColorSpace)===ot&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Jc?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Zc?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Qc?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===ea?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===eh&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this.fsQuad.render(e))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class iy extends ls{constructor(e,t,n=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new ue}render(e,t,n){const i=e.autoClear;e.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor)),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=i}}const sy={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ue(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class ns extends ls{constructor(e,t,n,i){super(),this.strength=t!==void 0?t:1,this.radius=n,this.threshold=i,this.resolution=e!==void 0?new Se(e.x,e.y):new Se(256,256),this.clearColor=new ue(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new tn(s,o,{type:gn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const d=new tn(s,o,{type:gn});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const f=new tn(s,o,{type:gn});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),s=Math.round(s/2),o=Math.round(o/2)}const a=sy;this.highPassUniforms=Zi.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ht({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new Se(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1),new C(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=lu;this.copyUniforms=Zi.clone(h.uniforms),this.blendMaterial=new Ht({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:fr,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new ue,this.oldClearAlpha=1,this.basic=new Bt,this.fsQuad=new wa(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(n,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(n,i),this.renderTargetsVertical[s].setSize(n,i),this.separableBlurMaterials[s].uniforms.invSize.value=new Se(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(e,t,n,i,s){e.getClearColor(this._oldClearColor),this.oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,e.setRenderTarget(null),e.clear(),this.fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this.fsQuad.render(e);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=ns.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this.fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=ns.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this.fsQuad.render(e),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this.fsQuad.render(e),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this.fsQuad.render(e)):(e.setRenderTarget(n),this.fsQuad.render(e)),e.setClearColor(this._oldClearColor,this.oldClearAlpha),e.autoClear=o}getSeperableBlurMaterial(e){const t=[];for(let n=0;n<e;n++)t.push(.39894*Math.exp(-.5*n*n/(e*e))/e);return new Ht({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new Se(.5,.5)},direction:{value:new Se(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(e){return new Ht({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}ns.BlurDirectionX=new Se(1,0);ns.BlurDirectionY=new Se(0,1);class ry extends ha{constructor(e=null){super();const t=new xe;t.deleteAttribute("uv");const n=new Yn({side:Dt}),i=new Yn;let s=5;e!==null&&e._useLegacyLights===!1&&(s=900);const o=new Gh(16777215,s,28,2);o.position.set(.418,16.199,.3),this.add(o);const a=new oe(t,n);a.position.set(-.757,13.219,.717),a.scale.set(31.713,28.305,28.591),this.add(a);const l=new oe(t,i);l.position.set(-10.906,2.009,1.846),l.rotation.set(0,-.195,0),l.scale.set(2.328,7.905,4.651),this.add(l);const c=new oe(t,i);c.position.set(-5.607,-.754,-.758),c.rotation.set(0,.994,0),c.scale.set(1.97,1.534,3.955),this.add(c);const h=new oe(t,i);h.position.set(6.167,.857,7.803),h.rotation.set(0,.561,0),h.scale.set(3.927,6.285,3.687),this.add(h);const u=new oe(t,i);u.position.set(-2.017,.018,6.124),u.rotation.set(0,.333,0),u.scale.set(2.002,4.566,2.064),this.add(u);const d=new oe(t,i);d.position.set(2.291,-.756,-2.621),d.rotation.set(0,-.286,0),d.scale.set(1.546,1.552,1.496),this.add(d);const f=new oe(t,i);f.position.set(-2.193,-.369,-5.547),f.rotation.set(0,.516,0),f.scale.set(3.875,3.487,2.986),this.add(f);const g=new oe(t,ki(50));g.position.set(-16.116,14.37,8.208),g.scale.set(.1,2.428,2.739),this.add(g);const x=new oe(t,ki(50));x.position.set(-16.109,18.021,-8.207),x.scale.set(.1,2.425,2.751),this.add(x);const m=new oe(t,ki(17));m.position.set(14.904,12.198,-1.832),m.scale.set(.15,4.265,6.331),this.add(m);const p=new oe(t,ki(43));p.position.set(-.462,8.89,14.52),p.scale.set(4.38,5.441,.088),this.add(p);const y=new oe(t,ki(20));y.position.set(3.235,11.486,-12.541),y.scale.set(2.5,2,.1),this.add(y);const _=new oe(t,ki(100));_.position.set(0,20,0),_.scale.set(1,.1,1),this.add(_)}dispose(){const e=new Set;this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))});for(const t of e)t.dispose()}}function ki(r){const e=new Bt;return e.color.setScalar(r),e}class oy{constructor(e){this.composer=null,this.bloom=null,this.quality="medium",this.envMap=null,this.width=1,this.height=1,this.sceneRef=null,this.cameraRef=null;const t=Y.graphics;this.renderer=new Ih({canvas:e,antialias:t.antialias,powerPreference:"high-performance"}),this.renderer.outputColorSpace=at,this.renderer.toneMapping=ea,this.renderer.toneMappingExposure=1,this.renderer.shadowMap.enabled=t.shadows,this.renderer.shadowMap.type=Kc,this.pmrem=new Fo(this.renderer)}environment(){return this.envMap||(this.envMap=this.pmrem.fromScene(new ry,.04).texture),this.envMap}setExposure(e){this.renderer.toneMappingExposure=e}get currentQuality(){return this.quality}setQuality(e){this.quality=e;const t=ts[e];if(t.bloom){if(this.composer||this.buildComposer(t.msaa),this.bloom){const n=Y.graphics.bloom;this.bloom.strength=n.strength,this.bloom.radius=n.radius,this.bloom.threshold=n.threshold}}else this.composer&&(this.composer.dispose(),this.composer=null,this.bloom=null)}buildComposer(e){const t=this.renderer,n=t.capabilities.isWebGL2?e:0,i=new tn(this.width,this.height,{samples:n,type:gn});this.composer=new ey(t,i),this.composer.setPixelRatio(t.getPixelRatio()),this.composer.setSize(this.width,this.height);const s=Y.graphics.bloom;this.bloom=new ns(new Se(this.width,this.height),s.strength,s.radius,s.threshold),this.composer.addPass(new iy(this.sceneRef??new ha,this.cameraRef??new Pt)),this.composer.addPass(this.bloom),this.composer.addPass(new ny)}render(e,t){if((this.sceneRef!==e||this.cameraRef!==t)&&(this.sceneRef=e,this.cameraRef=t,this.composer)){const n=this.composer.passes[0];n.scene=e,n.camera=t}this.composer?this.composer.render():this.renderer.render(e,t)}setSize(e,t){this.width=e,this.height=t,this.renderer.setSize(e,t,!1),this.composer?.setSize(e,t),this.bloom?.setSize(e,t)}setPixelRatio(e){this.renderer.setPixelRatio(e),this.composer?.setPixelRatio(e),this.composer&&this.composer.setSize(this.width,this.height)}get bloomEnabled(){return this.composer!==null}dispose(){this.composer?.dispose(),this.envMap?.dispose(),this.pmrem.dispose(),this.renderer.dispose()}}class ay{constructor(e){this.camera=e,this.desired=new C,this.lookTarget=new C,this.first=!0,this.distanceScale=1,this.shakeAmp=0,this.shakeTime=0,this.shakeTotal=0,this.shakeOffset=new C}shake(e,t){this.shakeAmp=Math.max(this.shakeAmp,e),this.shakeTime=this.shakeTotal=Math.max(this.shakeTime,t)}resetFollow(){this.first=!0}update(e,t){const n=Y.camera,i=this.distanceScale;if(this.desired.set(t.x+n.offset.x*i,t.y+n.offset.y*i,t.z+n.offset.z*i),this.first)this.camera.position.copy(this.desired),this.first=!1;else{const s=1-Math.exp(-n.smoothing*e);this.camera.position.lerp(this.desired,s)}if(this.lookTarget.set(t.x,t.y+n.lookAtHeight,t.z),this.shakeTime>0){this.shakeTime=Math.max(0,this.shakeTime-e);const s=this.shakeTotal>0?this.shakeTime/this.shakeTotal:0,o=this.shakeAmp*s*s;this.shakeOffset.set((Math.random()-.5)*2*o,(Math.random()-.5)*2*o,(Math.random()-.5)*2*o),this.camera.position.add(this.shakeOffset),this.shakeTime===0&&(this.shakeAmp=0)}this.camera.lookAt(this.lookTarget)}getYaw(){const e=Y.camera.offset;return Math.atan2(e.x,e.z)}}class ly{constructor(e,t){this.canvas=e,this.scene=new ha,this.input=new $_,this.dungeonDef=Jt[0],this.bossCfg=Wo(Jt[0]),this.unlockedNow=null,this.qualityFrames=0,this.qualityTime=0,this.qualitySamples=[],this.contextLost=!1,this.restoreGraceUntil=0,this.hitStopTime=0,this.face=uv(),this.playerUsesGltf=!1,this.audio=new jv,this.mortars=[],this.settings=fi(),this.mode="menu",this.intro=null,this.introSet=null,this.introNext="menu",this.skipGuardUntil=0,this.runActive=!1,this.stats=new rv,this.equipment=new K_,this.paused=!1,this.boss=null,this.bossDefeated=!1,this.difficulty=wv(),this.storage=Hv(),this.records={...Bc},this.hasSavedProgress=!1,this.saveBlocked=!1,this.saveDirty=!1,this.saveTimer=0,this.lastSavedAt=null,this.saveStatus="",this.projTmp=new C,this.raycaster=new _x,this.groundPlane=new Bn(new C(0,1,0),0),this.aimHit=new C,this.camTarget=new C,this.running=!1,this.ended=!1,this.rafId=0,this.lastTime=0,this.frames=0,this.fpsFrames=0,this.fpsTime=0,this.flushSave=()=>{this.saveDirty&&this.saveNow()},this.onVisibility=()=>{document.visibilityState==="hidden"&&this.flushSave()},this.currentPrompt="",this.loop=o=>{if(this.running){this.rafId=requestAnimationFrame(this.loop);try{this.frame(o)}catch(a){if(this.restoreGraceUntil>0){if(performance.now()<this.restoreGraceUntil){Ce.warn("그래픽 복구 중 프레임 오류를 건너뜁니다.",a);return}this.restoreGraceUntil=0,Ce.warn("그래픽 복구에 실패해 페이지를 다시 엽니다.",a),this.flushSave(),this.hud.showBanner("그래픽 복구 실패 — 다시 여는 중…",3e3),location.reload();return}throw this.stop(),this.flushSave(),Ce.error("게임 루프에서 오류가 나 멈췄습니다. 새로고침(F5)하면 저장된 진행에서 이어집니다.",a),a}}},this.resize=()=>{const o=this.canvas.clientWidth||window.innerWidth,a=this.canvas.clientHeight||window.innerHeight;this.pipeline.setSize(o,a),this.camera.aspect=o/a,this.camera.updateProjectionMatrix()};for(const o of Mx(Y))Ce.warn(`설정 '${o.path}' 값 ${o.from} 은(는) 허용 범위를 벗어나 ${o.to} 로 보정했습니다.`);this.loadSettingsFromStorage();const n=Y.graphics;this.pipeline=new oy(e),this.renderer=this.pipeline.renderer,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,n.maxPixelRatio)),e.addEventListener("webglcontextlost",o=>{o.preventDefault(),this.contextLost=!0,this.hud.showBanner("그래픽 연결이 끊겼습니다. 복구 중…",4e3),Ce.warn("WebGL 컨텍스트가 끊겼습니다. 복구를 기다립니다.")}),e.addEventListener("webglcontextrestored",()=>{this.contextLost=!1,this.lastTime=performance.now(),this.restoreGraceUntil=performance.now()+3e3,this.hud.showBanner("그래픽 연결이 복구됐습니다",1500),Ce.info("WebGL 컨텍스트가 복구됐습니다.")});const i=Y.camera;this.camera=new Pt(i.fov,1,i.near,i.far),this.scene.environment=this.pipeline.environment(),this.dungeon=new yc(this.scene,this.dungeonDef,this.settings.quality),this.pipeline.setExposure(this.dungeonDef.theme.exposure),this.chests=new gc(this.scene,this.dungeonDef.chests),this.dungeon.addCollisionBoxes(this.chests.getCollisionBoxes());const s={getObstacleBoxes:()=>this.dungeon.getObstacleBoxes(),getArenaHalfSize:()=>this.dungeon.getArenaHalfSize()};this.player=new ov(lv(Y.player.colors),Y.player.startPosition),this.scene.add(this.player.object3d),this.cameraCtrl=new ay(this.camera),this.controller=new av(this.player,this.input,s,()=>this.cameraCtrl.getYaw(),()=>1+this.equipment.totals().moveSpeed),this.controller.onJump=()=>this.audio.play("jump"),this.controller.onDash=o=>{this.audio.play("dash");const a=this.player.position;this.effects.burst(new C(a.x-o.x*.5,.4,a.z-o.z*.5),6091480,10,4),this.settings.haptics&&ar(10)},this.aimRing=new oe(new ui(.55,.72,32),new Bt({color:6091480,transparent:!0,opacity:.8,side:It,depthWrite:!1})),this.aimRing.rotation.x=-Math.PI/2,this.aimRing.position.y=.06,this.aimRing.visible=!1,this.scene.add(this.aimRing),this.effects=new Px(this.scene),this.projectiles=new Dx(this.scene),this.spawner=new j_(this.scene),this.applyDifficultyToSpawner(),this.spawner.spawnFromConfig(this.dungeonDef.spawns),this.combat=new Lx(this.player,this.input,()=>this.spawner.getEnemies(),()=>this.getAimPoint(),this.effects,this.projectiles,(o,a,l)=>{this.audio.play(l?"kill":"enemyHit",.05),l&&(this.hitStopTime=Math.max(this.hitStopTime,o.type==="boss"?Y.juice.bossHitStop:Y.juice.hitStop.duration),o.type==="boss"&&this.cameraCtrl.shake(Y.juice.slamShake.amp,.6),this.mode==="intro"?this.intro?.onKill():this.loot.dropFor(o.def.score,{x:o.position.x,z:o.position.z},this.dungeonDef.rewardMul),this.settings.haptics&&ar(o.type==="boss"?[60,40,120]:18)),this.settings.showDamageNumbers&&(this.projTmp.set(o.position.x,1.6,o.position.z),this.damageNumbers.show(this.projTmp,l?o.def.score:a,l?"kill":"enemy"))},()=>this.effectiveDamageMultiplier(),o=>this.equipment.weaponAttack(o)),this.combat.onAttack=o=>this.audio.play(o),this.loot=new iv(this.scene),this.damageNumbers=new Tv(t,o=>this.projectToScreen(o)),this.guide=new Sv(t,()=>this.guide.hide()),this.touch=new Y_(t,this.input,()=>{this.mode==="play"&&this.openMenu()},()=>{this.mode==="play"&&this.toggleInventory()}),this.hud=new Av(t),this.hud.setDungeonName(this.dungeonDef.name),this.introOverlay=new vv(t,()=>this.endIntro()),this.quizUI=new _v(t,{onCorrect:()=>{this.paused=!1;const o=this.player.position,a=this.chests.nearest({x:o.x,z:o.z});a&&this.openChestNow(a.x,a.z),this.lastTime=performance.now()},onWrong:()=>(this.audio.play("hurt",.1),Fc()),onClose:()=>{this.paused=!1,this.lastTime=performance.now()}}),this.result=new Rv(t,()=>this.retry(),()=>this.openMenu(),()=>this.openDungeons()),this.dungeonSelect=new Gx(t,{clears:()=>this.records.dungeonClears,level:()=>this.stats.level,enter:o=>this.enterDungeon(o),onClose:()=>this.closeDungeons()}),this.loadFromStorage(),this.menu=new Ev(t,{newGame:()=>this.newGame(),continueGame:()=>this.continueGame(),openSettings:()=>this.openSettings(),openDungeons:()=>this.openDungeons(),playIntro:()=>this.startIntro("menu"),hasProgress:()=>this.runActive||this.hasSavedProgress,progressText:()=>this.progressText(),saveNote:()=>this.saveStatus,openInventory:()=>this.toggleInventory(!0),openGuide:()=>this.guide.show(),hasRun:()=>this.runActive,difficulty:{get:()=>this.difficulty,set:o=>this.setDifficulty(o)}}),this.settingsUI=new Nv(t,{get:()=>this.settings,set:(o,a)=>this.updateSetting(o,a),resetAll:()=>this.resetSettings(),onClose:()=>this.closeSettings(),face:{get:()=>this.face,pick:async o=>{const a=await hv(o);this.face=a,Nc(a)||Ce.warn("얼굴 사진을 브라우저에 저장하지 못했습니다 (용량 또는 저장소 제한). 이번 실행에서만 보입니다."),await this.applyFace(),Ce.info("얼굴 사진을 적용했습니다.")},clear:()=>{this.face=null,Nc(null),this.applyFace()}}}),this.inventoryUI=new sv(t,this.equipment,{onChange:()=>{this.applyStats(),this.markDirty()},onClose:()=>this.toggleInventory(!1),getSummary:()=>this.statSummary()}),this.applyDifficulty(),this.applySettings(),this.input.attach(window,e),this.audio.attach(window),t.addEventListener("click",o=>{o.target.closest("button")&&this.audio.play("ui")}),this.audio.playMusic("menu"),this.input.onPress(Y.controls.toggleGuide,()=>this.guide.toggle()),this.input.onPress(Y.controls.restart,()=>{this.mode==="result"&&this.retry()}),this.input.onPress(Y.controls.toggleInventory,()=>{this.mode!=="menu"&&this.toggleInventory()}),this.input.onPress(Y.controls.interact,()=>this.tryInteract()),this.input.onPress(["Escape"],()=>{this.quizUI.visible?this.quizUI.close():this.guide.visible?this.guide.hide():this.settingsUI.visible?this.settingsUI.pressBack():this.dungeonSelect.visible?this.closeDungeons():this.inventoryUI.visible?this.toggleInventory(!1):this.mode==="play"&&this.openMenu()}),this.input.onPress(["Enter"],()=>{this.mode==="menu"&&performance.now()>this.skipGuardUntil&&!this.inventoryUI.visible&&!this.guide.visible&&!this.settingsUI.visible&&!this.dungeonSelect.visible&&this.menu.pressPrimary()}),window.addEventListener("keydown",()=>{this.mode==="intro"&&this.endIntro()}),e.addEventListener("pointerdown",()=>{this.mode==="intro"&&this.endIntro()}),this.hud.hide(),this.menu.show(),this.applyFace(),Hi.onPlayerReady=()=>this.swapPlayerModel(),Hi.load("./"),oi.load("./"),window.addEventListener("resize",this.resize),window.addEventListener("beforeunload",this.flushSave),document.addEventListener("visibilitychange",this.onVisibility),this.resize(),Ce.info(`${Y.meta.title} v${Y.meta.version} 준비 완료 (적 ${this.spawner.aliveCount}마리)`)}start(){this.running||(this.running=!0,this.lastTime=performance.now(),this.rafId=requestAnimationFrame(this.loop))}stop(){this.running=!1,cancelAnimationFrame(this.rafId)}setDifficulty(e){e!==this.difficulty&&(this.difficulty=e,this.settings.difficulty=e,ys(this.storage,this.settings),this.settingsUI?.refresh(),this.markDirty(),zc(e),this.applyDifficulty(),this.restart(),Ce.info(`난이도: ${Gi(e).label}`))}getDifficulty(){return this.difficulty}applyDifficultyToSpawner(){const e=Gi(this.difficulty);this.spawner.multipliers={hp:e.enemyHp*this.settings.enemyHpMul,speed:e.enemySpeed}}loadSettingsFromStorage(){const e=Dv(this.storage);this.settings=e.settings;for(const t of e.warnings)Ce.warn(`설정 보정: ${t}`);e.found||(this.settings.difficulty=this.difficulty),this.difficulty=this.settings.difficulty}updateSetting(e,t){const n=ou({...this.settings,[e]:t}).settings;if(e==="difficulty"){this.settings=n,ys(this.storage,this.settings),this.setDifficulty(n.difficulty);return}this.settings=n,ys(this.storage,this.settings),this.applySettings()}resetSettings(){const e=this.settings.difficulty;this.settings=fi(),ys(this.storage,this.settings),this.applySettings(),e!==this.settings.difficulty&&this.setDifficulty(this.settings.difficulty),Ce.info("설정을 기본값으로 되돌렸습니다.")}applySettings(){const e=this.settings;this.cameraCtrl.distanceScale=e.cameraDistance,this.renderer.shadowMap.enabled!==e.shadows&&(this.renderer.shadowMap.enabled=e.shadows,this.scene.traverse(t=>{const n=t;if(!n.isMesh)return;const i=Array.isArray(n.material)?n.material:[n.material];for(const s of i)s.needsUpdate=!0})),this.dungeon.setShadows(e.shadows),this.pipeline.setQuality(e.quality),this.dungeon.applyQuality(e.quality),e.showFps||this.guide.setHudText(""),this.applyPixelRatio(),this.audio.setVolumes({master:e.soundMaster,sfx:e.soundSfx,music:e.soundMusic}),this.touch.isFloating!==e.floatingJoystick&&this.touch.setFloating(e.floatingJoystick),this.touch.setLeftHanded(e.leftHanded),this.touch.setButtonScale(e.touchButtonScale),this.updateTouchVisibility(),this.applyDifficultyToSpawner(),this.applyStats()}applyPixelRatio(){const e=Math.min(window.devicePixelRatio||1,Y.graphics.maxPixelRatio);this.pipeline.setPixelRatio(Math.max(.3,e*this.settings.resolution))}getSettings(){return{...this.settings}}openSettings(){this.inventoryUI.hide(),this.guide.hide(),this.settingsUI.show()}closeSettings(){this.settingsUI.hide(),this.mode==="menu"&&this.menu.refresh()}applyDifficulty(){this.applyDifficultyToSpawner(),this.menu?.refresh()}newGame(){if(!this.introSeen()){this.startIntro("newGame");return}this.stats.reset(),this.equipment.reset(),this.records=dr(Bc),this.saveBlocked=!1,Wv(this.storage),this.enterDungeon(Jt[0]),Ce.info("새 게임을 시작합니다.")}enterDungeon(e){if(!hr(e,this.records.dungeonClears)){Ce.warn(`던전 '${e.name}' 은(는) 아직 잠겨 있습니다.`);return}this.loadDungeon(e),this.restart(),this.runActive=!0,this.saveNow(),this.dungeonSelect.hide(),this.enterPlay(),this.hud.showBanner(e.name,1800)}loadDungeon(e){e.id===this.dungeonDef.id&&this.dungeon.def.id===e.id||(this.chests.dispose(),this.dungeon.dispose(),this.dungeonDef=e,this.bossCfg=Wo(e),this.dungeon=new yc(this.scene,e,this.settings.quality),this.pipeline.setExposure(e.theme.exposure),this.chests=new gc(this.scene,e.chests),this.dungeon.addCollisionBoxes(this.chests.getCollisionBoxes()),this.hud.setDungeonName(e.name),Ce.info(`던전 '${e.name}' 을(를) 불러왔습니다 (적 ${e.spawns.length}마리, 상자 ${e.chests.length}개).`))}openDungeons(){!this.runActive&&!this.hasSavedProgress||(this.inventoryUI.hide(),this.settingsUI.hide(),this.guide.hide(),this.mode==="result"&&(this.result.hide(),this.mode="menu",this.hud.hide(),this.menu.show()),this.dungeonSelect.show())}closeDungeons(){this.dungeonSelect.hide(),this.mode==="menu"&&this.menu.refresh()}getDungeonId(){return this.dungeonDef.id}continueGame(){if(!this.runActive){this.hasSavedProgress&&this.openDungeons();return}this.enterPlay()}retry(){this.restart(),this.runActive=!0,this.enterPlay()}introSeen(){try{return this.storage?.getItem("hero-x.introSeen")==="1"}catch{return!0}}startIntro(e){if(this.mode!=="intro"){try{this.storage?.setItem("hero-x.introSeen","1")}catch{}this.introNext=e,this.loadDungeon(Jt[0]),this.restart(),this.spawner.clear(),this.player.position.set(0,0,3),this.mode="intro",this.paused=!1,this.menu.hide(),this.guide.hide(),this.settingsUI.hide(),this.dungeonSelect.hide(),this.result.hide(),this.inventoryUI.hide(),this.hud.hide(),this.touch.hide(),this.introOverlay.show(),this.audio.playMusic("menu"),this.introSet=new xv({x:0,z:3},Y.meta.school),this.scene.add(this.introSet.root),this.dungeon.addCollisionBoxes(this.introSet.boxes),this.player.facing=Math.PI,this.intro=new gv({spawn:(t,n,i)=>{const s=this.spawner.spawn(t,n,i);s&&s.health.reset(Math.max(1,Math.round(s.health.maxHp*mv)))},hero:()=>({x:this.player.position.x,z:this.player.position.z}),nearestEnemy:()=>{const t=this.player.position;let n=null;for(const i of this.spawner.getEnemies()){if(!i.alive)continue;const s=i.position.x-t.x,o=i.position.z-t.z,a=Math.hypot(s,o);(!n||a<n.dist)&&(n={dist:a,dx:a>1e-6?s/a:0,dz:a>1e-6?o/a:0})}return n},setAxis:(t,n)=>this.input.setVirtualAxis(t,n),press:t=>this.input.pressVirtual(t),release:t=>this.input.releaseVirtual(t),camera:this.camera,overlay:this.introOverlay,onMonsters:()=>this.audio.playMusic("boss"),onEnd:()=>this.endIntro()}),this.lastTime=performance.now(),Ce.info("인트로 연출을 시작합니다.")}}endIntro(){if(this.mode!=="intro")return;const e=this.intro;if(this.intro=null,e?.finish(),this.introOverlay.hide(),this.input.setVirtualAxis(0,0),this.input.releaseVirtual(Y.controls.attackMelee[0]),this.camera.fov=Y.camera.fov,this.camera.updateProjectionMatrix(),this.cameraCtrl.resetFollow(),this.skipGuardUntil=performance.now()+400,this.introSet&&(this.dungeon.removeCollisionBoxes(this.introSet.boxes),this.introSet.dispose(),this.introSet=null),this.restart(),this.mode="menu",this.introNext==="newGame"){this.newGame();return}this.menu.show(),this.audio.playMusic("menu")}openMenu(){this.mode="menu",this.inventoryUI.hide(),this.paused=!1,this.result.hide(),this.hud.hide(),this.touch.hide(),this.saveNow(),this.menu.show(),this.audio.playMusic("menu")}dungeonMusic(){const e=this.dungeonDef.id;return e==="cave"||e==="fortress"||e==="forest"?e:"forest"}async applyFace(){const e=this.player.currentModel;if(e.setFace){if(!this.face){e.setFace(null);return}try{e.setFace(await dv(this.face))}catch(t){Ce.warn("얼굴 사진을 붙이지 못했습니다.",t)}}}swapPlayerModel(){const e=Hi.createPlayerModel();e&&(this.player.setModel(e),this.playerUsesGltf=!0,Ce.info("플레이어 정식 모델로 교체했습니다."))}getFace(){return this.face}updateTouchVisibility(){const e=this.settings.touchControls&&this.mode==="play";e?this.touch.show():this.touch.hide(),document.body.classList.toggle("touch-mode",e)}loadFromStorage(){const e=Gv(this.storage);switch(e.kind){case"loaded":if(Bv(e.data,{stats:this.stats,equipment:this.equipment}),this.records=dr(e.data.records),this.difficulty=e.data.difficulty,zc(this.difficulty),this.hasSavedProgress=Vc(e.data),this.lastSavedAt=e.data.savedAt,this.saveStatus=`마지막 저장: ${$c(e.data.savedAt)}`,e.warnings.length>0){this.saveStatus+=" · 일부 항목을 보정했습니다 (F12 콘솔 참고)";for(const t of e.warnings)Ce.warn(`저장 데이터 보정: ${t}`)}Ce.info(`저장 데이터를 불러왔습니다. 레벨 ${this.stats.level} · 골드 ${this.stats.gold}`);break;case"corrupt":this.saveStatus="저장 데이터가 손상되어 새로 시작합니다. 손상된 데이터는 따로 보관했습니다.",Ce.warn(e.message);break;case"newer":this.saveBlocked=!0,this.saveStatus="이 저장 데이터는 더 새로운 버전의 게임에서 만든 것이라 읽지 않습니다. 새 게임을 누르면 덮어씁니다.",Ce.warn(e.message);break;case"unavailable":this.saveStatus="이 브라우저에서는 저장이 되지 않습니다 (사생활 보호 모드 등).",Ce.warn("브라우저 저장소를 쓸 수 없어 진행이 저장되지 않습니다.");break;default:this.saveStatus="저장된 진행이 없습니다."}}markDirty(){this.saveDirty=!0}saveNow(){if(this.saveDirty=!1,this.saveTimer=0,this.saveBlocked)return!1;const e=Fv({stats:this.stats,equipment:this.equipment,difficulty:this.difficulty,records:this.records}),t=Vv(this.storage,e);return t?(this.hasSavedProgress=Vc(e),this.lastSavedAt=e.savedAt,this.saveStatus=`마지막 저장: ${$c(e.savedAt)}`):this.saveStatus=this.storage?"저장에 실패했습니다 (저장 공간 부족 또는 차단). 진행이 기억되지 않을 수 있습니다.":"이 브라우저에서는 저장이 되지 않습니다 (사생활 보호 모드 등).",this.menu?.visible&&this.menu.refresh(),t}progressText(){if(!this.runActive&&!this.hasSavedProgress)return"";const e=this.records,t=Jt.filter(i=>hr(i,e.dungeonClears)).length,n=[`레벨 ${this.stats.level}`,`골드 ${this.stats.gold}`,`클리어 ${e.clears}회`,`열린 던전 ${t}/${Jt.length}`];return e.bestScore>0&&n.push(`최고 점수 ${e.bestScore}`),this.runActive||n.push("이어하기는 던전 선택부터"),n.join(" · ")}getRecords(){return dr(this.records)}enterPlay(){this.mode="play",this.menu.hide(),this.guide.hide(),this.settingsUI.hide(),this.dungeonSelect.hide(),this.result.hide(),this.hud.show(),this.updateTouchVisibility(),this.audio.playMusic(this.boss&&this.boss.alive?"boss":this.dungeonMusic()),this.lastTime=performance.now(),this.canvas.focus()}tryInteract(){if(this.ended||this.paused||this.player.health.isDead||this.mode!=="play")return;const e=this.player.position,t=this.chests.nearest({x:e.x,z:e.z});if(t){if(this.settings.chestQuiz){this.paused=!0,this.audio.play("ui"),this.quizUI.open(Fc());return}this.openChestNow(t.x,t.z)}}openChestNow(e,t){const n=this.chests.nearest({x:e,z:t},.5);if(!n||!this.chests.open(n))return;const i=this.loot.dropChest({x:n.x,z:n.z});this.audio.play("chest"),this.settings.haptics&&ar(25),this.effects.burst(new C(n.x,1,n.z),16765503,16,5),this.damageNumbers.showText(new C(n.x,1.8,n.z),"보물 상자!","#ffd23f"),Ce.info(`보물 상자 개봉: ${i.map(s=>s.kind==="equip"?s.item?.name:`${s.kind} ${s.amount}`).join(", ")}`)}toggleInventory(e=!this.inventoryUI.visible){e?(this.inventoryUI.show(),this.paused=!0):(this.inventoryUI.hide(),this.paused=!1,this.lastTime=performance.now()),this.mode==="menu"&&this.menu.refresh()}applyStats(){const e=this.player.health;e.maxHp=this.effectiveMaxHp(),e.hp>e.maxHp&&(e.hp=e.maxHp)}effectiveMaxHp(){return Math.max(1,Math.round((this.stats.maxHp+this.equipment.totals().maxHp)*this.settings.playerHpMul))}effectiveDamageMultiplier(){return this.stats.damageMultiplier*this.settings.playerDamageMul}statSummary(){const e=this.equipment.totals(),t=Math.round((Y.combat.melee.damage+this.equipment.weaponAttack("melee"))*this.effectiveDamageMultiplier()),n=Math.round((Y.combat.ranged.damage+this.equipment.weaponAttack("ranged"))*this.effectiveDamageMultiplier()),i=Math.round((1+e.moveSpeed)*100);return`레벨 ${this.stats.level} · 골드 ${this.stats.gold} · 근접 ${t} · 원거리 ${n} · 방어 ${e.defense} · 최대 체력 ${this.player.health.maxHp} · 속도 ${i}%`}restart(){this.spawner.clear(),this.spawner.spawnFromConfig(this.dungeonDef.spawns),this.unlockedNow=null,this.projectiles.clear(),this.damageNumbers.clear(),this.loot.clear(),this.chests.reset(),this.boss=null,this.bossDefeated=!1,this.mortars.length=0,this.hud.setBoss(null),this.player.reset(Y.player.startPosition),this.player.health.reset(this.effectiveMaxHp()),this.controller.reset(),this.combat.reset(),this.result.hide(),this.ended=!1,Ce.info("전투를 다시 시작합니다.")}showResult(e,t,n=null){this.ended=!0,this.mode="result",this.runActive=!1,this.inventoryUI.hide(),this.touch.hide(),this.paused=!1,this.records.totalKills+=this.combat.kills,this.records.bestScore=Math.max(this.records.bestScore,this.combat.score),this.audio.play(this.player.health.isDead?"defeat":"clear"),this.audio.playMusic(null),this.saveNow(),this.result.show(e,t,n?{name:n.name,seconds:Y.dungeon.autoAdvanceSeconds,onNext:()=>this.enterDungeon(n)}:void 0)}dispose(){this.stop(),this.input.detach(),this.audio.dispose(),window.removeEventListener("resize",this.resize),window.removeEventListener("beforeunload",this.flushSave),document.removeEventListener("visibilitychange",this.onVisibility),this.aimRing.removeFromParent(),this.aimRing.geometry.dispose(),this.aimRing.material.dispose(),this.spawner.dispose(),this.projectiles.dispose(),this.loot.dispose(),this.chests.dispose(),this.effects.dispose(),this.player.dispose(),this.dungeon.dispose(),this.pipeline.dispose()}setPlayerPosition(e,t){this.player.position.set(e,0,t)}debugKillBoss(){this.boss&&this.boss.alive&&this.combat.damageEnemy(this.boss,1e9,{x:0,z:1},0)}debugDefeatRegularEnemies(){for(const e of this.spawner.getEnemies())e.alive&&e!==this.boss&&this.combat.damageEnemy(e,99999,{x:0,z:1},0)}getDebugState(){const e=this.player.position,t=this.camera.position,n=this.input.getPointer();return{running:this.running,frames:this.frames,ended:this.ended,settings:{...this.settings},dungeon:{id:this.dungeonDef.id,name:this.dungeonDef.name,arenaHalfSize:this.dungeon.getArenaHalfSize(),obstacles:this.dungeon.getObstacleBoxes().length},dungeonSelectVisible:this.dungeonSelect.visible,unlockedNow:this.unlockedNow?.id??null,mortars:this.mortars.length,hitStop:this.hitStopTime,bossModel:this.bossCfg.model,settingsVisible:this.settingsUI.visible,touchVisible:this.touch.visible,floatingJoystick:this.touch.isFloating,dash:{active:this.controller.dashing,cooldown:this.controller.dashCooldownRatio,invulnerable:this.player.health.invulnerable},aimRingVisible:this.aimRing.visible,audio:{ready:this.audio.ready,track:this.audio.currentTrack,voices:this.audio.voices,fileMusic:this.audio.usingFileMusic,files:this.audio.fileKeys,fetched:oi.loadedKeys},contextLost:this.contextLost,face:this.face!==null,faceVisible:this.player.faceVisible,models:{loaded:Hi.loadedKeys,playerGltf:this.playerUsesGltf},pixelRatio:this.renderer.getPixelRatio(),interactButtonVisible:this.touch.visible&&!document.getElementById("touch-interact")?.hidden,shadowsEnabled:this.renderer.shadowMap.enabled,quality:this.pipeline.currentQuality,bloomEnabled:this.pipeline.bloomEnabled,exposure:this.renderer.toneMappingExposure,cameraDistanceScale:this.cameraCtrl.distanceScale,save:{status:this.saveStatus,lastSavedAt:this.lastSavedAt,hasSavedProgress:this.hasSavedProgress,blocked:this.saveBlocked,dirty:this.saveDirty,records:{...this.records}},player:{x:e.x,z:e.z,facing:this.player.facing,moving:this.player.moving,hp:this.player.health.hp,maxHp:this.player.health.maxHp},camera:{x:t.x,y:t.y,z:t.z},guideVisible:this.guide.visible,resultVisible:this.result.visible,mode:this.mode,intro:this.intro?{time:this.intro.time,shot:this.intro.shot,fov:this.camera.fov}:null,menuVisible:this.menu.visible,runActive:this.runActive,enemies:this.spawner.getEnemies().map(i=>({type:i.type,x:i.position.x,z:i.position.z,hp:i.health.hp,state:i.ai.state})),aliveEnemies:this.spawner.aliveCount,projectiles:this.projectiles.count,playerY:this.player.jumpY,groundY:this.player.groundY,difficulty:this.difficulty,pickups:this.loot.count,stats:{level:this.stats.level,xp:this.stats.xp,xpToNext:this.stats.xpToNext,gold:this.stats.gold,maxHp:this.stats.maxHp},equipment:{inventory:this.equipment.inventory.length,equipped:Object.fromEntries(Object.entries(this.equipment.equipped).map(([i,s])=>[i,s?s.name:null])),totals:this.equipment.totals()},paused:this.paused,chestsOpened:this.chests.openedCount,chestPositions:this.dungeonDef.chests.map(i=>({x:i.x,z:i.z})),attacks:this.combat.attacks,inventoryVisible:this.inventoryUI.visible,chests:{opened:this.chests.openedCount,total:this.chests.total,nearby:this.chests.nearest({x:this.player.position.x,z:this.player.position.z})!==null},prompt:this.currentPrompt,boss:this.boss?{alive:this.boss.alive,hp:this.boss.health.hp,maxHp:this.boss.health.maxHp,state:this.boss.bossAI.state,phase2:this.boss.phase2}:null,bossDefeated:this.bossDefeated,kills:this.combat.kills,score:this.combat.score,input:{pointerX:n.x,pointerY:n.y,pointerHas:n.has,pressed:this.input.getPressedCodes()}}}projectToScreen(e){const t=this.projTmp.copy(e).project(this.camera);return t.z>1?null:{x:(t.x+1)/2*this.canvas.clientWidth,y:(1-t.y)/2*this.canvas.clientHeight}}getAimPoint(){if(this.mode==="intro")return this.nearestEnemyPoint(30);if(this.settings.touchControls)return this.nearestEnemyPoint(Y.combat.autoAimRange);const e=this.input.getPointer();if(!e.has)return null;this.raycaster.setFromCamera(new Se(e.x,e.y),this.camera);const t=this.raycaster.ray.intersectPlane(this.groundPlane,this.aimHit);return t?{x:t.x,z:t.z}:null}nearestEnemyPoint(e){const t=this.player.position;let n=null,i=e;for(const s of this.spawner.getEnemies()){if(!s.alive)continue;const o=Math.hypot(s.position.x-t.x,s.position.z-t.z);o<i&&(i=o,n=s)}return n?{x:n.position.x,z:n.position.z}:null}onEnemyAttack(e,t){if(this.ended)return;const n=this.player.position,i=e.position,s=Math.hypot(n.x-i.x,n.z-i.z)||1,o={x:(n.x-i.x)/s,z:(n.z-i.z)/s};if(t=t*Gi(this.difficulty).enemyDamage,e.def.attackKind==="ranged"){this.projectiles.spawn({x:i.x+o.x*(e.radius+.3),z:i.z+o.z*(e.radius+.3)},o,{damage:t,speed:e.def.projectileSpeed??10,lifetime:3,radius:.2,knockback:0,color:16733559,friendly:!1});return}this.damagePlayer(t,{x:i.x,z:i.z})}damagePlayer(e,t){if(this.mode==="intro"||this.ended)return;const n=J_(e,this.equipment.totals().defense);if(!this.player.health.takeDamage(n))return;const i=this.player.position,s=Math.hypot(i.x-t.x,i.z-t.z)||1;this.controller.applyKnockback({x:(i.x-t.x)/s,z:(i.z-t.z)/s},Y.player.hitKnockback),this.audio.play("hurt",.1),this.cameraCtrl.shake(Y.juice.hitShake.amp,Y.juice.hitShake.duration),this.settings.haptics&&ar(40),this.effects.burst(new C(i.x,1,i.z),16732025,6,4),this.settings.hitFlash&&this.hud.flashHit(),this.settings.showDamageNumbers&&this.damageNumbers.show(new C(i.x,2,i.z),n,"player"),this.player.health.isDead&&(this.records.deaths++,this.showResult("쓰러졌습니다",`처치 ${this.combat.kills} · 점수 ${this.combat.score} · 레벨 ${this.stats.level} · 골드 ${this.stats.gold}`),Ce.info("플레이어가 쓰러졌습니다."))}onCollect(e,t){const n=new C(t.x,1.4,t.z);if(e.kind==="heal")this.audio.play("heal"),this.player.health.heal(e.amount),this.effects.burst(n,16732025,6,3),this.settings.showDamageNumbers&&this.damageNumbers.show(n,e.amount,"heal");else if(e.kind==="gold")this.audio.play("pickup",.06),this.stats.addGold(e.amount),this.markDirty(),this.effects.burst(n,16765503,4,2);else if(e.kind==="equip"){if(!e.item)return;if(this.equipment.add(e.item)){this.audio.play("equip"),this.markDirty();const i=Y.equipment.rarities[e.item.rarity].color;this.effects.burst(n,i,10,4),this.damageNumbers.showText(n,`획득: ${e.item.name}`,i)}else this.loot.spawn(e,t),this.damageNumbers.showText(n,"가방이 가득 찼어요","#ff6b90")}else{const i=this.stats.addXp(e.amount);if(this.markDirty(),i===0?this.audio.play("pickup",.06):this.audio.play("levelup"),this.effects.burst(n,6091480,4,2),i>0){const s=this.player.health;this.applyStats(),s.heal(Math.round(s.maxHp*Y.progression.levelUpHealRatio));const o=this.player.position;this.effects.burst(new C(o.x,1,o.z),16765503,24,7),this.damageNumbers.show(new C(o.x,2.4,o.z),this.stats.level,"levelup"),Ce.info(`레벨 업! 레벨 ${this.stats.level} (최대 체력 ${s.maxHp}, 공격력 ×${this.stats.damageMultiplier.toFixed(2)})`)}}}spawnBoss(){const e=this.bossCfg,t=this.spawner.multipliers;this.boss=new q_({x:e.spawn.x,z:e.spawn.z},{hp:t.hp,speed:t.speed},e),this.spawner.addEnemy(this.boss),this.hud.showBanner(`${e.name} 등장!`),this.audio.play("bossAppear"),this.audio.playMusic("boss"),this.cameraCtrl.shake(Y.juice.slamShake.amp*.8,.8),this.effects.burst(new C(e.spawn.x,1.5,e.spawn.z),e.color,30,9),Ce.info(`보스 등장: ${e.name} (체력 ${this.boss.health.maxHp})`)}onBossAttack(e,t){if(this.ended)return;const n=Gi(this.difficulty).enemyDamage,i=e.position,s=this.player.position;if(t.kind==="contact")this.damagePlayer(t.damage*n,{x:i.x,z:i.z});else if(t.kind==="slam")this.audio.play("slam"),this.cameraCtrl.shake(Y.juice.slamShake.amp,Y.juice.slamShake.duration),this.effects.shockwave(new C(i.x,0,i.z),t.radius),this.effects.burst(new C(i.x,.5,i.z),16732025,20,6),Math.hypot(s.x-i.x,s.z-i.z)<=t.radius+Y.player.radius&&this.player.jumpY<1&&this.damagePlayer(t.damage*n,{x:i.x,z:i.z});else if(t.kind==="summon"){const o=this.spawner.getEnemies().filter(l=>l.alive&&l.type===t.type).length,a=Math.max(0,Math.min(t.count,t.maxAlive-o));for(let l=0;l<a;l++){const c=l/Math.max(1,a)*Math.PI*2+Math.random()*.5,h=i.x+Math.sin(c)*(e.radius+1.2),u=i.z+Math.cos(c)*(e.radius+1.2);this.spawner.spawn(t.type,h,u)&&this.effects.burst(new C(h,1,u),9431295,10,5)}a>0&&(this.hud.showBanner("부하 소환!",900),this.audio.play("summon"))}else if(t.kind==="mortar")for(let o=0;o<t.count;o++){const a=Math.random()*Math.PI*2,l=o===0?0:Math.random()*t.spread,c=s.x+Math.sin(a)*l,h=s.z+Math.cos(a)*l;this.mortars.push({x:c,z:h,t:t.delay+o*.12,radius:t.radius,damage:t.damage*n}),this.effects.marker(new C(c,0,h),t.radius,t.delay+o*.12,16757071)}else{const o=Math.atan2(s.x-i.x,s.z-i.z);for(let a=0;a<t.count;a++){const l=t.aimed?o+(a-(t.count-1)/2)*Math.PI*2/t.count:a/t.count*Math.PI*2,c={x:Math.sin(l),z:Math.cos(l)};this.projectiles.spawn({x:i.x+c.x*(e.radius+.4),z:i.z+c.z*(e.radius+.4)},c,{damage:t.damage*n,speed:t.speed,lifetime:4,radius:.25,knockback:0,color:11561983,friendly:!1})}}}updateMortars(e){if(this.mortars.length===0)return;const t=this.player.position;for(let n=this.mortars.length-1;n>=0;n--){const i=this.mortars[n];if(i.t-=e,i.t>0||(this.mortars.splice(n,1),this.audio.play("boom",.08),this.cameraCtrl.shake(Y.juice.slamShake.amp*.6,.3),this.effects.shockwave(new C(i.x,0,i.z),i.radius,.4,16757071),this.effects.burst(new C(i.x,.6,i.z),16742981,14,6),this.ended))continue;Math.hypot(t.x-i.x,t.z-i.z)<=i.radius+Y.player.radius&&this.player.jumpY<1&&this.damagePlayer(i.damage,{x:i.x,z:i.z})}}onBossDefeated(){const e=this.bossCfg,t={x:this.boss.position.x,z:this.boss.position.z};this.loot.spawn({kind:"gold",amount:Math.round(e.reward.goldMin+Math.random()*(e.reward.goldMax-e.reward.goldMin))},{x:t.x-1,z:t.z}),this.loot.spawn({kind:"xp",amount:e.reward.xp},{x:t.x+1,z:t.z}),this.loot.spawn({kind:"equip",amount:0,item:ev(e.reward.equipMinRarity)},{x:t.x,z:t.z+1}),this.loot.spawn({kind:"heal",amount:Y.loot.healAmount*2},{x:t.x,z:t.z-1}),this.records.clears++;const n=this.dungeonDef.id,i=this.records.dungeonClears[n]??0;this.records.dungeonClears[n]=i+1;const s=vc(n);this.unlockedNow=i===0&&s?s:null,this.markDirty(),this.hud.showBanner(this.unlockedNow?`던전 클리어! '${this.unlockedNow.name}' 이(가) 열렸습니다`:"던전 클리어!",3e3),Ce.info("보스를 처치했습니다. 던전 클리어!")}checkVictory(){if(!(this.ended||this.dungeonDef.spawns.length===0)){if(!this.boss){this.spawner.aliveCount===0&&this.spawnBoss();return}if(this.hud.setBoss(this.boss.alive?{name:this.bossCfg.name,hp:this.boss.health.hp,maxHp:this.boss.health.maxHp,phase2:this.boss.phase2}:null),!this.boss.alive&&!this.bossDefeated&&(this.bossDefeated=!0,this.onBossDefeated()),this.bossDefeated&&(this.loot.count===0||this.boss.removable)){const e=this.unlockedNow?` · 새 던전 '${this.unlockedNow.name}' 이(가) 열렸습니다!`:"",t=vc(this.dungeonDef.id);this.showResult("던전 클리어!",`${this.dungeonDef.name} · 처치 ${this.combat.kills} · 점수 ${this.combat.score} · 레벨 ${this.stats.level} · 골드 ${this.stats.gold}${e}`,t&&hr(t,this.records.dungeonClears)?t:null)}}}frame(e){const t=Math.min(.2,Math.max(0,(e-this.lastTime)/1e3));if(this.lastTime=e,this.contextLost)return;if(this.mode==="intro"&&this.intro){let i=t*this.intro.timeScale;for(;i>1e-6&&this.mode==="intro";){const s=Math.min(Y.performance.maxStep,i);i-=s,this.simulate(s)}this.intro?.update(t),this.pipeline.render(this.scene,this.camera),this.frames++,this.updateFps(t);return}if(this.paused||this.mode==="menu"){this.pipeline.render(this.scene,this.camera);return}let n=t;for(this.hitStopTime>0&&(this.hitStopTime=Math.max(0,this.hitStopTime-t),n=t*Y.juice.hitStop.timeScale);n>1e-6&&this.mode==="play";){const i=Math.min(Y.performance.maxStep,n);n-=i,this.simulate(i)}this.hud.update({hp:this.player.health.hp,maxHp:this.player.health.maxHp,enemies:this.spawner.aliveCount,kills:this.combat.kills,score:this.combat.score,level:this.stats.level,xp:this.stats.xp,xpToNext:this.stats.xpToNext,gold:this.stats.gold}),this.pipeline.render(this.scene,this.camera),this.frames++,this.restoreGraceUntil>0&&(this.restoreGraceUntil=0),this.updateFps(t),this.updateAutoQuality(t)}simulate(e){const t=this.player.position;this.controller.update(e),this.ended||this.combat.update(e),this.spawner.update(e,{playerPos:{x:t.x,z:t.z},world:this.dungeon,onAttackPlayer:(s,o)=>this.onEnemyAttack(s,o),onBossAttack:(s,o)=>this.onBossAttack(s,o),playerRadius:Y.player.radius}),this.projectiles.update(e,{world:this.dungeon,enemies:this.spawner.getEnemies(),playerPos:{x:t.x,z:t.z},playerY:this.player.jumpY,playerRadius:Y.player.radius,onHitEnemy:(s,o,a)=>{this.ended||this.combat.damageEnemy(s,o.damage,a,o.knockback)},onHitPlayer:(s,o,a)=>this.damagePlayer(s.damage,a)}),this.loot.update(e,{x:t.x,z:t.z},(s,o)=>this.onCollect(s,o)),this.updateMortars(e),this.chests.update(e);const n=!this.ended&&this.chests.nearest({x:t.x,z:t.z})!==null;this.currentPrompt=n?`${Y.controls.interact[0].replace("Key","")} 보물 상자 열기`:"",this.hud.setPrompt(this.currentPrompt),this.touch.setInteract(n),this.touch.setDodgeCooldown(this.controller.dashCooldownRatio);const i=this.settings.touchControls&&!this.ended?this.nearestEnemyPoint(Y.combat.autoAimRange):null;this.aimRing.visible=i!==null,i&&this.aimRing.position.set(i.x,.06,i.z),this.hud.setChests(this.chests.openedCount,this.chests.total),this.player.update(e),this.effects.update(e),this.damageNumbers.update(e),this.camTarget.set(t.x,0,t.z),this.cameraCtrl.update(e,this.camTarget),this.dungeon.updateLight(t),this.dungeon.update(e),this.mode!=="intro"&&(this.checkVictory(),this.saveTimer+=e,this.saveDirty&&this.saveTimer>=Y.save.autoSaveInterval&&this.saveNow())}updateAutoQuality(e){if(!this.settings.autoQuality)return;this.qualityFrames++,this.qualityTime+=e;const t=Y.performance;if(this.qualityTime<t.autoQualityInterval)return;this.qualitySamples.push(this.qualityFrames/this.qualityTime),this.qualityFrames=0,this.qualityTime=0;const n=$v(this.qualitySamples,{quality:this.settings.quality,shadows:this.settings.shadows,resolution:this.settings.resolution},t.autoQualityFps);this.qualitySamples.length=0,n.message&&(this.settings={...this.settings,quality:n.next.quality,shadows:n.next.shadows,resolution:n.next.resolution},ys(this.storage,this.settings),this.settingsUI.refresh(),this.applySettings(),this.hud.showBanner(n.message,2500),Ce.info(`자동 화질 조절: ${n.message}`))}updateFps(e){this.settings.showFps&&(this.fpsFrames++,this.fpsTime+=e,this.fpsTime>=.5&&(this.guide.setHudText(`FPS ${Math.round(this.fpsFrames/this.fpsTime)}`),this.fpsFrames=0,this.fpsTime=0))}}function $c(r){const e=new Date(r);if(Number.isNaN(e.getTime())||e.getTime()===0)return"알 수 없음";const t=n=>String(n).padStart(2,"0");return`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())} ${t(e.getHours())}:${t(e.getMinutes())}`}function cy(r){let e=null;const t=(n,i)=>{e||(e=document.createElement("div"),e.className="error-box",r.appendChild(e)),e.innerHTML=`<b>${n}</b>
${i}

자세한 내용은 F12 → Console 탭, 해결 방법은 TROUBLESHOOTING.md 를 확인하세요.`};window.addEventListener("error",n=>{t("게임 실행 중 오류가 발생했습니다.",String(n.message||n.error||"알 수 없는 오류"))}),window.addEventListener("unhandledrejection",n=>{const i=n.reason;t("게임 실행 중 오류가 발생했습니다.",String(i?.message??i??"알 수 없는 오류"))})}function hy(r,e){const t=document.createElement("div");t.className="error-box",t.innerHTML=`<b>게임을 시작할 수 없습니다.</b>
${e}`,r.appendChild(t)}const cu=document.getElementById("game-canvas"),Er=document.getElementById("ui-root");if(!cu||!Er)throw new Error("index.html 에 #game-canvas 또는 #ui-root 요소가 없습니다.");cy(Er);uy();dy();try{const r=new ly(cu,Er);r.start(),new URLSearchParams(location.search).has("debug")&&(window.__heroX=r)}catch(r){Ce.error("게임을 시작하지 못했습니다.",r),hy(Er,`이 브라우저에서 3D 화면(WebGL)을 켤 수 없거나 초기화에 실패했습니다.
최신 Chrome 또는 Edge 로 열어 보고, 그래도 안 되면 TROUBLESHOOTING.md 를 참고하세요.
오류: ${r instanceof Error?r.message:String(r)}`)}function uy(){const r=i=>i.preventDefault();document.addEventListener("gesturestart",r,{passive:!1}),document.addEventListener("gesturechange",r,{passive:!1}),document.addEventListener("gestureend",r,{passive:!1}),document.addEventListener("touchmove",i=>{i.touches.length>1&&i.preventDefault()},{passive:!1});let e=0,t=0,n=0;document.addEventListener("touchend",i=>{const s=i.changedTouches[0],o=Date.now();s&&o-e<300&&Math.hypot(s.clientX-t,s.clientY-n)<30&&i.preventDefault(),e=o,s&&(t=s.clientX,n=s.clientY)},{passive:!1})}function dy(){const r=document.querySelector('meta[name="viewport"]'),e=r?.getAttribute("content")??"",t=window.visualViewport;let n=0;const i=()=>{const a=t?Math.round(t.height):window.innerHeight;document.documentElement.style.setProperty("--app-height",`${a}px`),window.scrollTo(0,0)},s=()=>{r&&(r.setAttribute("content",e+", minimum-scale=1.0"),requestAnimationFrame(()=>r.setAttribute("content",e)))},o=()=>{s(),i(),clearTimeout(n),n=window.setTimeout(i,350)};window.addEventListener("orientationchange",o),window.addEventListener("resize",o),t?.addEventListener("resize",i),t?.addEventListener("scroll",i),i()}
