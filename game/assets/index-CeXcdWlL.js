(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Aa="160",Ah=0,ro=1,Rh=2,xc=1,vc=2,xn=3,Mn=0,Bt=1,Ot=2,Fn=0,Di=1,ao=2,oo=3,lo=4,Ch=5,jn=100,Lh=101,Ph=102,co=103,ho=104,Ih=200,Dh=201,Nh=202,Uh=203,ra=204,aa=205,Fh=206,Oh=207,kh=208,Bh=209,zh=210,Hh=211,Gh=212,Vh=213,Wh=214,qh=0,Xh=1,jh=2,Ys=3,$h=4,Yh=5,Kh=6,Zh=7,Ra=0,Jh=1,Qh=2,On=0,eu=1,tu=2,nu=3,iu=4,su=5,ru=6,uo="attached",au="detached",yc=300,Fi=301,Oi=302,oa=303,la=304,ar=306,ti=1e3,Xt=1001,Ks=1002,Mt=1003,ca=1004,qs=1005,Ft=1006,Mc=1007,ni=1008,kn=1009,ou=1010,lu=1011,Ca=1012,Sc=1013,Nn=1014,vn=1015,os=1016,bc=1017,Ec=1018,Yn=1020,cu=1021,jt=1023,hu=1024,uu=1025,Kn=1026,ki=1027,du=1028,wc=1029,fu=1030,Tc=1031,Ac=1033,vr=33776,yr=33777,Mr=33778,Sr=33779,fo=35840,po=35841,mo=35842,go=35843,Rc=36196,_o=37492,xo=37496,vo=37808,yo=37809,Mo=37810,So=37811,bo=37812,Eo=37813,wo=37814,To=37815,Ao=37816,Ro=37817,Co=37818,Lo=37819,Po=37820,Io=37821,br=36492,Do=36494,No=36495,pu=36283,Uo=36284,Fo=36285,Oo=36286,Cc=2200,Lc=2201,mu=2202,ls=2300,Bi=2301,Er=2302,Ti=2400,Ai=2401,Zs=2402,La=2500,gu=2501,_u=0,Pc=1,ha=2,Ic=3e3,Zn=3001,xu=3200,vu=3201,Pa=0,yu=1,$t="",rt="srgb",bt="srgb-linear",Ia="display-p3",or="display-p3-linear",Js="linear",st="srgb",Qs="rec709",er="p3",ci=7680,ko=519,Mu=512,Su=513,bu=514,Dc=515,Eu=516,wu=517,Tu=518,Au=519,ua=35044,Bo="300 es",da=1035,yn=2e3,tr=2001;class li{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const i=this._listeners[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,e);e.target=null}}}const wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let zo=1234567;const is=Math.PI/180,zi=180/Math.PI;function en(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(wt[s&255]+wt[s>>8&255]+wt[s>>16&255]+wt[s>>24&255]+"-"+wt[e&255]+wt[e>>8&255]+"-"+wt[e>>16&15|64]+wt[e>>24&255]+"-"+wt[t&63|128]+wt[t>>8&255]+"-"+wt[t>>16&255]+wt[t>>24&255]+wt[n&255]+wt[n>>8&255]+wt[n>>16&255]+wt[n>>24&255]).toLowerCase()}function At(s,e,t){return Math.max(e,Math.min(t,s))}function Da(s,e){return(s%e+e)%e}function Ru(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Cu(s,e,t){return s!==e?(t-s)/(e-s):0}function ss(s,e,t){return(1-t)*s+t*e}function Lu(s,e,t,n){return ss(s,e,1-Math.exp(-t*n))}function Pu(s,e=1){return e-Math.abs(Da(s,e*2)-e)}function Iu(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Du(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Nu(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Uu(s,e){return s+Math.random()*(e-s)}function Fu(s){return s*(.5-Math.random())}function Ou(s){s!==void 0&&(zo=s);let e=zo+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ku(s){return s*is}function Bu(s){return s*zi}function fa(s){return(s&s-1)===0&&s!==0}function zu(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function nr(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Hu(s,e,t,n,i){const r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":s.set(o*h,l*u,l*d,o*c);break;case"YZY":s.set(l*d,o*h,l*u,o*c);break;case"ZXZ":s.set(l*u,l*d,o*h,o*c);break;case"XZX":s.set(o*h,l*g,l*f,o*c);break;case"YXY":s.set(l*f,o*h,l*g,o*c);break;case"ZYZ":s.set(l*g,l*f,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function on(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Qe(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const pa={DEG2RAD:is,RAD2DEG:zi,generateUUID:en,clamp:At,euclideanModulo:Da,mapLinear:Ru,inverseLerp:Cu,lerp:ss,damp:Lu,pingpong:Pu,smoothstep:Iu,smootherstep:Du,randInt:Nu,randFloat:Uu,randFloatSpread:Fu,seededRandom:Ou,degToRad:ku,radToDeg:Bu,isPowerOfTwo:fa,ceilPowerOfTwo:zu,floorPowerOfTwo:nr,setQuaternionFromProperEuler:Hu,normalize:Qe,denormalize:on};class Le{constructor(e=0,t=0){Le.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(At(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*i+e.x,this.y=r*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class He{constructor(e,t,n,i,r,a,o,l,c){He.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c)}set(e,t,n,i,r,a,o,l,c){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=i[0],m=i[3],p=i[6],M=i[1],x=i[4],v=i[7],R=i[2],w=i[5],A=i[8];return r[0]=a*_+o*M+l*R,r[3]=a*m+o*x+l*w,r[6]=a*p+o*v+l*A,r[1]=c*_+h*M+u*R,r[4]=c*m+h*x+u*w,r[7]=c*p+h*v+u*A,r[2]=d*_+f*M+g*R,r[5]=d*m+f*x+g*w,r[8]=d*p+f*v+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*r,f=c*r-a*l,g=t*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(i*c-h*n)*_,e[2]=(o*n-i*a)*_,e[3]=d*_,e[4]=(h*t-i*l)*_,e[5]=(i*r-o*t)*_,e[6]=f*_,e[7]=(n*l-c*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(wr.makeScale(e,t)),this}rotate(e){return this.premultiply(wr.makeRotation(-e)),this}translate(e,t){return this.premultiply(wr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const wr=new He;function Nc(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function cs(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Gu(){const s=cs("canvas");return s.style.display="block",s}const Ho={};function rs(s){s in Ho||(Ho[s]=!0,console.warn(s))}const Go=new He().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Vo=new He().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ms={[bt]:{transfer:Js,primaries:Qs,toReference:s=>s,fromReference:s=>s},[rt]:{transfer:st,primaries:Qs,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[or]:{transfer:Js,primaries:er,toReference:s=>s.applyMatrix3(Vo),fromReference:s=>s.applyMatrix3(Go)},[Ia]:{transfer:st,primaries:er,toReference:s=>s.convertSRGBToLinear().applyMatrix3(Vo),fromReference:s=>s.applyMatrix3(Go).convertLinearToSRGB()}},Vu=new Set([bt,or]),Ye={enabled:!0,_workingColorSpace:bt,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Vu.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,e,t){if(this.enabled===!1||e===t||!e||!t)return s;const n=ms[e].toReference,i=ms[t].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,e){return this.convert(s,this._workingColorSpace,e)},toWorkingColorSpace:function(s,e){return this.convert(s,e,this._workingColorSpace)},getPrimaries:function(s){return ms[s].primaries},getTransfer:function(s){return s===$t?Js:ms[s].transfer}};function Ni(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Tr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let hi;class Uc{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{hi===void 0&&(hi=cs("canvas")),hi.width=e.width,hi.height=e.height;const n=hi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=hi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=cs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=Ni(r[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ni(t[n]/255)*255):t[n]=Ni(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Wu=0;class Fc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wu++}),this.uuid=en(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Ar(i[a].image)):r.push(Ar(i[a]))}else r=Ar(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function Ar(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Uc.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let qu=0;class St extends li{constructor(e=St.DEFAULT_IMAGE,t=St.DEFAULT_MAPPING,n=Xt,i=Xt,r=Ft,a=ni,o=jt,l=kn,c=St.DEFAULT_ANISOTROPY,h=$t){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qu++}),this.uuid=en(),this.name="",this.source=new Fc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Le(0,0),this.repeat=new Le(1,1),this.center=new Le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new He,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(rs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Zn?rt:$t),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==yc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ti:e.x=e.x-Math.floor(e.x);break;case Xt:e.x=e.x<0?0:1;break;case Ks:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ti:e.y=e.y-Math.floor(e.y);break;case Xt:e.y=e.y<0?0:1;break;case Ks:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return rs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===rt?Zn:Ic}set encoding(e){rs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Zn?rt:$t}}St.DEFAULT_IMAGE=null;St.DEFAULT_MAPPING=yc;St.DEFAULT_ANISOTROPY=1;class et{constructor(e=0,t=0,n=0,i=1){et.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],_=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,v=(f+1)/2,R=(p+1)/2,w=(h+d)/4,A=(u+_)/4,I=(g+m)/4;return x>v&&x>R?x<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(x),i=w/n,r=A/n):v>R?v<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(v),n=w/i,r=I/i):R<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(R),n=A/r,i=I/r),this.set(n,i,r,t),this}let M=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(u-_)/M,this.z=(d-h)/M,this.w=Math.acos((c+f+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Xu extends li{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new et(0,0,e,t),this.scissorTest=!1,this.viewport=new et(0,0,e,t);const i={width:e,height:t,depth:1};n.encoding!==void 0&&(rs("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Zn?rt:$t),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ft,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new St(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Fc(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ii extends Xu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Oc extends St{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Mt,this.minFilter=Mt,this.wrapR=Xt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ju extends St{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Mt,this.minFilter=Mt,this.wrapR=Xt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class tn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||l!==d||c!==f||h!==g){let m=1-o;const p=l*d+c*f+h*g+u*_,M=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const R=Math.sqrt(x),w=Math.atan2(R,p*M);m=Math.sin(m*w)/R,o=Math.sin(o*w)/R}const v=o*M;if(l=l*m+d*v,c=c*m+f*v,h=h*m+g*v,u=u*m+_*v,m===1-o){const R=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=R,c*=R,h*=R,u*=R}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-o*f,e[t+2]=c*g+h*f+o*d-l*u,e[t+3]=h*g-o*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(r/2),d=l(n/2),f=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(a-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(r+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-c)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(At(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+i*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(i),n*Math.sin(r),n*Math.cos(r),t*Math.sin(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(e=0,t=0,n=0){C.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Wo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Wo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-r*i),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=i+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Rr.copy(this).projectOnVector(e),this.sub(Rr)}reflect(e){return this.sub(Rr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(At(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Rr=new C,Wo=new tn;class sn{constructor(e=new C(1/0,1/0,1/0),t=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Yt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Yt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Yt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Yt):Yt.fromBufferAttribute(r,a),Yt.applyMatrix4(e.matrixWorld),this.expandByPoint(Yt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),gs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),gs.copy(n.boundingBox)),gs.applyMatrix4(e.matrixWorld),this.union(gs)}const i=e.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Yt),Yt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Yi),_s.subVectors(this.max,Yi),ui.subVectors(e.a,Yi),di.subVectors(e.b,Yi),fi.subVectors(e.c,Yi),bn.subVectors(di,ui),En.subVectors(fi,di),Hn.subVectors(ui,fi);let t=[0,-bn.z,bn.y,0,-En.z,En.y,0,-Hn.z,Hn.y,bn.z,0,-bn.x,En.z,0,-En.x,Hn.z,0,-Hn.x,-bn.y,bn.x,0,-En.y,En.x,0,-Hn.y,Hn.x,0];return!Cr(t,ui,di,fi,_s)||(t=[1,0,0,0,1,0,0,0,1],!Cr(t,ui,di,fi,_s))?!1:(xs.crossVectors(bn,En),t=[xs.x,xs.y,xs.z],Cr(t,ui,di,fi,_s))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(dn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const dn=[new C,new C,new C,new C,new C,new C,new C,new C],Yt=new C,gs=new sn,ui=new C,di=new C,fi=new C,bn=new C,En=new C,Hn=new C,Yi=new C,_s=new C,xs=new C,Gn=new C;function Cr(s,e,t,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Gn.fromArray(s,r);const o=i.x*Math.abs(Gn.x)+i.y*Math.abs(Gn.y)+i.z*Math.abs(Gn.z),l=e.dot(Gn),c=t.dot(Gn),h=n.dot(Gn);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const $u=new sn,Ki=new C,Lr=new C;class cn{constructor(e=new C,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):$u.setFromPoints(e).getCenter(n);let i=0;for(let r=0,a=e.length;r<a;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ki.subVectors(e,this.center);const t=Ki.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ki,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Lr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ki.copy(e.center).add(Lr)),this.expandByPoint(Ki.copy(e.center).sub(Lr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const fn=new C,Pr=new C,vs=new C,wn=new C,Ir=new C,ys=new C,Dr=new C;class hs{constructor(e=new C,t=new C(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(fn.copy(this.origin).addScaledVector(this.direction,t),fn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Pr.copy(e).add(t).multiplyScalar(.5),vs.copy(t).sub(e).normalize(),wn.copy(this.origin).sub(Pr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(vs),o=wn.dot(this.direction),l=-wn.dot(vs),c=wn.lengthSq(),h=Math.abs(1-a*a);let u,d,f,g;if(h>0)if(u=a*l-o,d=a*o-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Pr).addScaledVector(vs,d),f}intersectSphere(e,t){fn.subVectors(e.center,this.origin);const n=fn.dot(this.direction),i=fn.dot(fn)-n*n,r=e.radius*e.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,fn)!==null}intersectTriangle(e,t,n,i,r){Ir.subVectors(t,e),ys.subVectors(n,e),Dr.crossVectors(Ir,ys);let a=this.direction.dot(Dr),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;wn.subVectors(this.origin,e);const l=o*this.direction.dot(ys.crossVectors(wn,ys));if(l<0)return null;const c=o*this.direction.dot(Ir.cross(wn));if(c<0||l+c>a)return null;const h=-o*wn.dot(Dr);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ge{constructor(e,t,n,i,r,a,o,l,c,h,u,d,f,g,_,m){Ge.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,a,o,l,c,h,u,d,f,g,_,m)}set(e,t,n,i,r,a,o,l,c,h,u,d,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ge().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/pi.setFromMatrixColumn(e,0).length(),r=1/pi.setFromMatrixColumn(e,1).length(),a=1/pi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=a*h,f=a*u,g=o*h,_=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-_*c,t[9]=-o*l,t[2]=_-d*c,t[6]=g+f*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d+_*o,t[4]=g*o-f,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=_+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*h,f=l*u,g=c*h,_=c*u;t[0]=d-_*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*h,f=a*u,g=o*h,_=o*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+_,t[1]=l*u,t[5]=_*c+d,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=a*l,f=a*c,g=o*l,_=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+_,t[5]=a*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Yu,e,Ku)}lookAt(e,t,n){const i=this.elements;return Ht.subVectors(e,t),Ht.lengthSq()===0&&(Ht.z=1),Ht.normalize(),Tn.crossVectors(n,Ht),Tn.lengthSq()===0&&(Math.abs(n.z)===1?Ht.x+=1e-4:Ht.z+=1e-4,Ht.normalize(),Tn.crossVectors(n,Ht)),Tn.normalize(),Ms.crossVectors(Ht,Tn),i[0]=Tn.x,i[4]=Ms.x,i[8]=Ht.x,i[1]=Tn.y,i[5]=Ms.y,i[9]=Ht.y,i[2]=Tn.z,i[6]=Ms.z,i[10]=Ht.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],M=n[3],x=n[7],v=n[11],R=n[15],w=i[0],A=i[4],I=i[8],y=i[12],E=i[1],k=i[5],N=i[9],J=i[13],P=i[2],z=i[6],V=i[10],j=i[14],W=i[3],X=i[7],$=i[11],te=i[15];return r[0]=a*w+o*E+l*P+c*W,r[4]=a*A+o*k+l*z+c*X,r[8]=a*I+o*N+l*V+c*$,r[12]=a*y+o*J+l*j+c*te,r[1]=h*w+u*E+d*P+f*W,r[5]=h*A+u*k+d*z+f*X,r[9]=h*I+u*N+d*V+f*$,r[13]=h*y+u*J+d*j+f*te,r[2]=g*w+_*E+m*P+p*W,r[6]=g*A+_*k+m*z+p*X,r[10]=g*I+_*N+m*V+p*$,r[14]=g*y+_*J+m*j+p*te,r[3]=M*w+x*E+v*P+R*W,r[7]=M*A+x*k+v*z+R*X,r[11]=M*I+x*N+v*V+R*$,r[15]=M*y+x*J+v*j+R*te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*l*u-i*c*u-r*o*d+n*c*d+i*o*f-n*l*f)+_*(+t*l*f-t*c*d+r*a*d-i*a*f+i*c*h-r*l*h)+m*(+t*c*u-t*o*f-r*a*u+n*a*f+r*o*h-n*c*h)+p*(-i*o*h-t*l*u+t*o*d+i*a*u-n*a*d+n*l*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],M=u*m*c-_*d*c+_*l*f-o*m*f-u*l*p+o*d*p,x=g*d*c-h*m*c-g*l*f+a*m*f+h*l*p-a*d*p,v=h*_*c-g*u*c+g*o*f-a*_*f-h*o*p+a*u*p,R=g*u*l-h*_*l-g*o*d+a*_*d+h*o*m-a*u*m,w=t*M+n*x+i*v+r*R;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return e[0]=M*A,e[1]=(_*d*r-u*m*r-_*i*f+n*m*f+u*i*p-n*d*p)*A,e[2]=(o*m*r-_*l*r+_*i*c-n*m*c-o*i*p+n*l*p)*A,e[3]=(u*l*r-o*d*r-u*i*c+n*d*c+o*i*f-n*l*f)*A,e[4]=x*A,e[5]=(h*m*r-g*d*r+g*i*f-t*m*f-h*i*p+t*d*p)*A,e[6]=(g*l*r-a*m*r-g*i*c+t*m*c+a*i*p-t*l*p)*A,e[7]=(a*d*r-h*l*r+h*i*c-t*d*c-a*i*f+t*l*f)*A,e[8]=v*A,e[9]=(g*u*r-h*_*r-g*n*f+t*_*f+h*n*p-t*u*p)*A,e[10]=(a*_*r-g*o*r+g*n*c-t*_*c-a*n*p+t*o*p)*A,e[11]=(h*o*r-a*u*r-h*n*c+t*u*c+a*n*f-t*o*f)*A,e[12]=R*A,e[13]=(h*_*i-g*u*i+g*n*d-t*_*d-h*n*m+t*u*m)*A,e[14]=(g*o*i-a*_*i-g*n*l+t*_*l+a*n*m-t*o*m)*A,e[15]=(a*u*i-h*o*i+h*n*l-t*u*l-a*n*d+t*o*d)*A,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,a){return this.set(1,n,r,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,d=r*c,f=r*h,g=r*u,_=a*h,m=a*u,p=o*u,M=l*c,x=l*h,v=l*u,R=n.x,w=n.y,A=n.z;return i[0]=(1-(_+p))*R,i[1]=(f+v)*R,i[2]=(g-x)*R,i[3]=0,i[4]=(f-v)*w,i[5]=(1-(d+p))*w,i[6]=(m+M)*w,i[7]=0,i[8]=(g+x)*A,i[9]=(m-M)*A,i[10]=(1-(d+_))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=pi.set(i[0],i[1],i[2]).length();const a=pi.set(i[4],i[5],i[6]).length(),o=pi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Kt.copy(this);const c=1/r,h=1/a,u=1/o;return Kt.elements[0]*=c,Kt.elements[1]*=c,Kt.elements[2]*=c,Kt.elements[4]*=h,Kt.elements[5]*=h,Kt.elements[6]*=h,Kt.elements[8]*=u,Kt.elements[9]*=u,Kt.elements[10]*=u,t.setFromRotationMatrix(Kt),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,i,r,a,o=yn){const l=this.elements,c=2*r/(t-e),h=2*r/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i);let f,g;if(o===yn)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===tr)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,a,o=yn){const l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(a-r),d=(t+e)*c,f=(n+i)*h;let g,_;if(o===yn)g=(a+r)*u,_=-2*u;else if(o===tr)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const pi=new C,Kt=new Ge,Yu=new C(0,0,0),Ku=new C(1,1,1),Tn=new C,Ms=new C,Ht=new C,qo=new Ge,Xo=new tn;class lr{constructor(e=0,t=0,n=0,i=lr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(At(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-At(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(At(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-At(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(At(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-At(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return qo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(qo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Xo.setFromEuler(this),this.setFromQuaternion(Xo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}lr.DEFAULT_ORDER="XYZ";class Na{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Zu=0;const jo=new C,mi=new tn,pn=new Ge,Ss=new C,Zi=new C,Ju=new C,Qu=new tn,$o=new C(1,0,0),Yo=new C(0,1,0),Ko=new C(0,0,1),ed={type:"added"},td={type:"removed"};class at extends li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zu++}),this.uuid=en(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=at.DEFAULT_UP.clone();const e=new C,t=new lr,n=new tn,i=new C(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ge},normalMatrix:{value:new He}}),this.matrix=new Ge,this.matrixWorld=new Ge,this.matrixAutoUpdate=at.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=at.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Na,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return mi.setFromAxisAngle(e,t),this.quaternion.multiply(mi),this}rotateOnWorldAxis(e,t){return mi.setFromAxisAngle(e,t),this.quaternion.premultiply(mi),this}rotateX(e){return this.rotateOnAxis($o,e)}rotateY(e){return this.rotateOnAxis(Yo,e)}rotateZ(e){return this.rotateOnAxis(Ko,e)}translateOnAxis(e,t){return jo.copy(e).applyQuaternion(this.quaternion),this.position.add(jo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($o,e)}translateY(e){return this.translateOnAxis(Yo,e)}translateZ(e){return this.translateOnAxis(Ko,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ss.copy(e):Ss.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Zi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pn.lookAt(Zi,Ss,this.up):pn.lookAt(Ss,Zi,this.up),this.quaternion.setFromRotationMatrix(pn),i&&(pn.extractRotation(i.matrixWorld),mi.setFromRotationMatrix(pn),this.quaternion.premultiply(mi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(ed)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(td)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(pn),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zi,e,Ju),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Zi,Qu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++){const o=i[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));i.material=o}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}at.DEFAULT_UP=new C(0,1,0);at.DEFAULT_MATRIX_AUTO_UPDATE=!0;at.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Zt=new C,mn=new C,Nr=new C,gn=new C,gi=new C,_i=new C,Zo=new C,Ur=new C,Fr=new C,Or=new C;let bs=!1;class Jt{constructor(e=new C,t=new C,n=new C){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Zt.subVectors(e,t),i.cross(Zt);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Zt.subVectors(i,t),mn.subVectors(n,t),Nr.subVectors(e,t);const a=Zt.dot(Zt),o=Zt.dot(mn),l=Zt.dot(Nr),c=mn.dot(mn),h=mn.dot(Nr),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,gn)===null?!1:gn.x>=0&&gn.y>=0&&gn.x+gn.y<=1}static getUV(e,t,n,i,r,a,o,l){return bs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),bs=!0),this.getInterpolation(e,t,n,i,r,a,o,l)}static getInterpolation(e,t,n,i,r,a,o,l){return this.getBarycoord(e,t,n,i,gn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,gn.x),l.addScaledVector(a,gn.y),l.addScaledVector(o,gn.z),l)}static isFrontFacing(e,t,n,i){return Zt.subVectors(n,t),mn.subVectors(e,t),Zt.cross(mn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zt.subVectors(this.c,this.b),mn.subVectors(this.a,this.b),Zt.cross(mn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Jt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Jt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,i,r){return bs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),bs=!0),Jt.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}getInterpolation(e,t,n,i,r){return Jt.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return Jt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Jt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let a,o;gi.subVectors(i,n),_i.subVectors(r,n),Ur.subVectors(e,n);const l=gi.dot(Ur),c=_i.dot(Ur);if(l<=0&&c<=0)return t.copy(n);Fr.subVectors(e,i);const h=gi.dot(Fr),u=_i.dot(Fr);if(h>=0&&u<=h)return t.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(gi,a);Or.subVectors(e,r);const f=gi.dot(Or),g=_i.dot(Or);if(g>=0&&f<=g)return t.copy(r);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(_i,o);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Zo.subVectors(r,i),o=(u-h)/(u-h+(f-g)),t.copy(i).addScaledVector(Zo,o);const p=1/(m+_+d);return a=_*p,o=d*p,t.copy(n).addScaledVector(gi,a).addScaledVector(_i,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const kc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},An={h:0,s:0,l:0},Es={h:0,s:0,l:0};function kr(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class de{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=rt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ye.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Ye.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ye.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Ye.workingColorSpace){if(e=Da(e,1),t=At(t,0,1),n=At(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=kr(a,r,e+1/3),this.g=kr(a,r,e),this.b=kr(a,r,e-1/3)}return Ye.toWorkingColorSpace(this,i),this}setStyle(e,t=rt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=rt){const n=kc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ni(e.r),this.g=Ni(e.g),this.b=Ni(e.b),this}copyLinearToSRGB(e){return this.r=Tr(e.r),this.g=Tr(e.g),this.b=Tr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=rt){return Ye.fromWorkingColorSpace(Tt.copy(this),e),Math.round(At(Tt.r*255,0,255))*65536+Math.round(At(Tt.g*255,0,255))*256+Math.round(At(Tt.b*255,0,255))}getHexString(e=rt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ye.workingColorSpace){Ye.fromWorkingColorSpace(Tt.copy(this),t);const n=Tt.r,i=Tt.g,r=Tt.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ye.workingColorSpace){return Ye.fromWorkingColorSpace(Tt.copy(this),t),e.r=Tt.r,e.g=Tt.g,e.b=Tt.b,e}getStyle(e=rt){Ye.fromWorkingColorSpace(Tt.copy(this),e);const t=Tt.r,n=Tt.g,i=Tt.b;return e!==rt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(An),this.setHSL(An.h+e,An.s+t,An.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(An),e.getHSL(Es);const n=ss(An.h,Es.h,t),i=ss(An.s,Es.s,t),r=ss(An.l,Es.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Tt=new de;de.NAMES=kc;let nd=0;class nn extends li{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:nd++}),this.uuid=en(),this.name="",this.type="Material",this.blending=Di,this.side=Mn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ra,this.blendDst=aa,this.blendEquation=jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new de(0,0,0),this.blendAlpha=0,this.depthFunc=Ys,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ko,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ci,this.stencilZFail=ci,this.stencilZPass=ci,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Di&&(n.blending=this.blending),this.side!==Mn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ra&&(n.blendSrc=this.blendSrc),this.blendDst!==aa&&(n.blendDst=this.blendDst),this.blendEquation!==jn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ys&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ko&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ci&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ci&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ci&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=i(e.textures),a=i(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ft extends nn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new de(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ra,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const mt=new C,ws=new Le;class Nt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ua,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=vn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ws.fromBufferAttribute(this,t),ws.applyMatrix3(e),this.setXY(t,ws.x,ws.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix3(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix4(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyNormalMatrix(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.transformDirection(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=on(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Qe(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=on(t,this.array)),t}setX(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=on(t,this.array)),t}setY(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=on(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=on(t,this.array)),t}setW(e,t){return this.normalized&&(t=Qe(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),i=Qe(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),i=Qe(i,this.array),r=Qe(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ua&&(e.usage=this.usage),e}}class Bc extends Nt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class zc extends Nt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ot extends Nt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let id=0;const Wt=new Ge,Br=new at,xi=new C,Gt=new sn,Ji=new sn,yt=new C;class Ut extends li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:id++}),this.uuid=en(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Nc(e)?zc:Bc)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new He().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Wt.makeRotationFromQuaternion(e),this.applyMatrix4(Wt),this}rotateX(e){return Wt.makeRotationX(e),this.applyMatrix4(Wt),this}rotateY(e){return Wt.makeRotationY(e),this.applyMatrix4(Wt),this}rotateZ(e){return Wt.makeRotationZ(e),this.applyMatrix4(Wt),this}translate(e,t,n){return Wt.makeTranslation(e,t,n),this.applyMatrix4(Wt),this}scale(e,t,n){return Wt.makeScale(e,t,n),this.applyMatrix4(Wt),this}lookAt(e){return Br.lookAt(e),Br.updateMatrix(),this.applyMatrix4(Br.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(xi).negate(),this.translate(xi.x,xi.y,xi.z),this}setFromPoints(e){const t=[];for(let n=0,i=e.length;n<i;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ot(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new sn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];Gt.setFromBufferAttribute(r),this.morphTargetsRelative?(yt.addVectors(this.boundingBox.min,Gt.min),this.boundingBox.expandByPoint(yt),yt.addVectors(this.boundingBox.max,Gt.max),this.boundingBox.expandByPoint(yt)):(this.boundingBox.expandByPoint(Gt.min),this.boundingBox.expandByPoint(Gt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new cn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new C,1/0);return}if(e){const n=this.boundingSphere.center;if(Gt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Ji.setFromBufferAttribute(o),this.morphTargetsRelative?(yt.addVectors(Gt.min,Ji.min),Gt.expandByPoint(yt),yt.addVectors(Gt.max,Ji.max),Gt.expandByPoint(yt)):(Gt.expandByPoint(Ji.min),Gt.expandByPoint(Ji.max))}Gt.getCenter(n);let i=0;for(let r=0,a=e.count;r<a;r++)yt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(yt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)yt.fromBufferAttribute(o,c),l&&(xi.fromBufferAttribute(e,c),yt.add(xi)),i=Math.max(i,n.distanceToSquared(yt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,i=t.position.array,r=t.normal.array,a=t.uv.array,o=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Nt(new Float32Array(4*o),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let E=0;E<o;E++)c[E]=new C,h[E]=new C;const u=new C,d=new C,f=new C,g=new Le,_=new Le,m=new Le,p=new C,M=new C;function x(E,k,N){u.fromArray(i,E*3),d.fromArray(i,k*3),f.fromArray(i,N*3),g.fromArray(a,E*2),_.fromArray(a,k*2),m.fromArray(a,N*2),d.sub(u),f.sub(u),_.sub(g),m.sub(g);const J=1/(_.x*m.y-m.x*_.y);isFinite(J)&&(p.copy(d).multiplyScalar(m.y).addScaledVector(f,-_.y).multiplyScalar(J),M.copy(f).multiplyScalar(_.x).addScaledVector(d,-m.x).multiplyScalar(J),c[E].add(p),c[k].add(p),c[N].add(p),h[E].add(M),h[k].add(M),h[N].add(M))}let v=this.groups;v.length===0&&(v=[{start:0,count:n.length}]);for(let E=0,k=v.length;E<k;++E){const N=v[E],J=N.start,P=N.count;for(let z=J,V=J+P;z<V;z+=3)x(n[z+0],n[z+1],n[z+2])}const R=new C,w=new C,A=new C,I=new C;function y(E){A.fromArray(r,E*3),I.copy(A);const k=c[E];R.copy(k),R.sub(A.multiplyScalar(A.dot(k))).normalize(),w.crossVectors(I,k);const J=w.dot(h[E])<0?-1:1;l[E*4]=R.x,l[E*4+1]=R.y,l[E*4+2]=R.z,l[E*4+3]=J}for(let E=0,k=v.length;E<k;++E){const N=v[E],J=N.start,P=N.count;for(let z=J,V=J+P;z<V;z+=3)y(n[z+0]),y(n[z+1]),y(n[z+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Nt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new C,r=new C,a=new C,o=new C,l=new C,c=new C,h=new C,u=new C;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)yt.fromBufferAttribute(e,t),yt.normalize(),e.setXYZ(t,yt.x,yt.y,yt.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let _=0,m=l.length;_<m;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new Nt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ut,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=e(d,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(i[l]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const i=e.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(t))}const r=e.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Jo=new Ge,Vn=new hs,Ts=new cn,Qo=new C,vi=new C,yi=new C,Mi=new C,zr=new C,As=new C,Rs=new Le,Cs=new Le,Ls=new Le,el=new C,tl=new C,nl=new C,Ps=new C,Is=new C;class xe extends at{constructor(e=new Ut,t=new ft){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(r&&o){As.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],u=r[l];h!==0&&(zr.fromBufferAttribute(u,e),a?As.addScaledVector(zr,h):As.addScaledVector(zr.sub(t),h))}t.add(As)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ts.copy(n.boundingSphere),Ts.applyMatrix4(r),Vn.copy(e.ray).recast(e.near),!(Ts.containsPoint(Vn.origin)===!1&&(Vn.intersectSphere(Ts,Qo)===null||Vn.origin.distanceToSquared(Qo)>(e.far-e.near)**2))&&(Jo.copy(r).invert(),Vn.copy(e.ray).applyMatrix4(Jo),!(n.boundingBox!==null&&Vn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Vn)))}_computeIntersections(e,t,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),x=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let v=M,R=x;v<R;v+=3){const w=o.getX(v),A=o.getX(v+1),I=o.getX(v+2);i=Ds(this,p,e,n,c,h,u,w,A,I),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const M=o.getX(m),x=o.getX(m+1),v=o.getX(m+2);i=Ds(this,a,e,n,c,h,u,M,x,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),x=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let v=M,R=x;v<R;v+=3){const w=v,A=v+1,I=v+2;i=Ds(this,p,e,n,c,h,u,w,A,I),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const M=m,x=m+1,v=m+2;i=Ds(this,a,e,n,c,h,u,M,x,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function sd(s,e,t,n,i,r,a,o){let l;if(e.side===Bt?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,e.side===Mn,o),l===null)return null;Is.copy(o),Is.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Is);return c<t.near||c>t.far?null:{distance:c,point:Is.clone(),object:s}}function Ds(s,e,t,n,i,r,a,o,l,c){s.getVertexPosition(o,vi),s.getVertexPosition(l,yi),s.getVertexPosition(c,Mi);const h=sd(s,e,t,n,vi,yi,Mi,Ps);if(h){i&&(Rs.fromBufferAttribute(i,o),Cs.fromBufferAttribute(i,l),Ls.fromBufferAttribute(i,c),h.uv=Jt.getInterpolation(Ps,vi,yi,Mi,Rs,Cs,Ls,new Le)),r&&(Rs.fromBufferAttribute(r,o),Cs.fromBufferAttribute(r,l),Ls.fromBufferAttribute(r,c),h.uv1=Jt.getInterpolation(Ps,vi,yi,Mi,Rs,Cs,Ls,new Le),h.uv2=h.uv1),a&&(el.fromBufferAttribute(a,o),tl.fromBufferAttribute(a,l),nl.fromBufferAttribute(a,c),h.normal=Jt.getInterpolation(Ps,vi,yi,Mi,el,tl,nl,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new C,materialIndex:0};Jt.getNormal(vi,yi,Mi,u.normal),h.face=u}return h}class je extends Ut{constructor(e=1,t=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,r,4),g("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new ot(c,3)),this.setAttribute("normal",new ot(h,3)),this.setAttribute("uv",new ot(u,2));function g(_,m,p,M,x,v,R,w,A,I,y){const E=v/A,k=R/I,N=v/2,J=R/2,P=w/2,z=A+1,V=I+1;let j=0,W=0;const X=new C;for(let $=0;$<V;$++){const te=$*k-J;for(let ne=0;ne<z;ne++){const G=ne*E-N;X[_]=G*M,X[m]=te*x,X[p]=P,c.push(X.x,X.y,X.z),X[_]=0,X[m]=0,X[p]=w>0?1:-1,h.push(X.x,X.y,X.z),u.push(ne/A),u.push(1-$/I),j+=1}}for(let $=0;$<I;$++)for(let te=0;te<A;te++){const ne=d+te+z*$,G=d+te+z*($+1),Y=d+(te+1)+z*($+1),le=d+(te+1)+z*$;l.push(ne,G,le),l.push(G,Y,le),W+=6}o.addGroup(f,W,y),f+=W,d+=j}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new je(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Hi(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function It(s){const e={};for(let t=0;t<s.length;t++){const n=Hi(s[t]);for(const i in n)e[i]=n[i]}return e}function rd(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Hc(s){return s.getRenderTarget()===null?s.outputColorSpace:Ye.workingColorSpace}const ad={clone:Hi,merge:It};var od=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ld=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class si extends nn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=od,this.fragmentShader=ld,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Hi(e.uniforms),this.uniformsGroups=rd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Gc extends at{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ge,this.projectionMatrix=new Ge,this.projectionMatrixInverse=new Ge,this.coordinateSystem=yn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Dt extends Gc{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=zi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(is*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return zi*2*Math.atan(Math.tan(is*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,i,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(is*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Si=-90,bi=1;class cd extends at{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Dt(Si,bi,e,t);i.layers=this.layers,this.add(i);const r=new Dt(Si,bi,e,t);r.layers=this.layers,this.add(r);const a=new Dt(Si,bi,e,t);a.layers=this.layers,this.add(a);const o=new Dt(Si,bi,e,t);o.layers=this.layers,this.add(o);const l=new Dt(Si,bi,e,t);l.layers=this.layers,this.add(l);const c=new Dt(Si,bi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===yn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===tr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Vc extends St{constructor(e,t,n,i,r,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:Fi,super(e,t,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class hd extends ii{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];t.encoding!==void 0&&(rs("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Zn?rt:$t),this.texture=new Vc(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ft}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new je(5,5,5),r=new si({name:"CubemapFromEquirect",uniforms:Hi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Bt,blending:Fn});r.uniforms.tEquirect.value=t;const a=new xe(i,r),o=t.minFilter;return t.minFilter===ni&&(t.minFilter=Ft),new cd(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(r)}}const Hr=new C,ud=new C,dd=new He;class Ln{constructor(e=new C(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Hr.subVectors(n,t).cross(ud.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Hr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||dd.getNormalMatrix(e),i=this.coplanarPoint(Hr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Wn=new cn,Ns=new C;class Ua{constructor(e=new Ln,t=new Ln,n=new Ln,i=new Ln,r=new Ln,a=new Ln){this.planes=[e,t,n,i,r,a]}set(e,t,n,i,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=yn){const n=this.planes,i=e.elements,r=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],g=i[9],_=i[10],m=i[11],p=i[12],M=i[13],x=i[14],v=i[15];if(n[0].setComponents(l-r,d-c,m-f,v-p).normalize(),n[1].setComponents(l+r,d+c,m+f,v+p).normalize(),n[2].setComponents(l+a,d+h,m+g,v+M).normalize(),n[3].setComponents(l-a,d-h,m-g,v-M).normalize(),n[4].setComponents(l-o,d-u,m-_,v-x).normalize(),t===yn)n[5].setComponents(l+o,d+u,m+_,v+x).normalize();else if(t===tr)n[5].setComponents(o,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Wn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Wn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Wn)}intersectsSprite(e){return Wn.center.set(0,0,0),Wn.radius=.7071067811865476,Wn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Wn)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Ns.x=i.normal.x>0?e.max.x:e.min.x,Ns.y=i.normal.y>0?e.max.y:e.min.y,Ns.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Ns)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Wc(){let s=null,e=!1,t=null,n=null;function i(r,a){t(r,a),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function fd(s,e){const t=e.isWebGL2,n=new WeakMap;function i(c,h){const u=c.array,d=c.usage,f=u.byteLength,g=s.createBuffer();s.bindBuffer(h,g),s.bufferData(h,u,d),c.onUploadCallback();let _;if(u instanceof Float32Array)_=s.FLOAT;else if(u instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(t)_=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=s.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=s.SHORT;else if(u instanceof Uint32Array)_=s.UNSIGNED_INT;else if(u instanceof Int32Array)_=s.INT;else if(u instanceof Int8Array)_=s.BYTE;else if(u instanceof Uint8Array)_=s.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:c.version,size:f}}function r(c,h,u){const d=h.array,f=h._updateRange,g=h.updateRanges;if(s.bindBuffer(u,c),f.count===-1&&g.length===0&&s.bufferSubData(u,0,d),g.length!==0){for(let _=0,m=g.length;_<m;_++){const p=g[_];t?s.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d,p.start,p.count):s.bufferSubData(u,p.start*d.BYTES_PER_ELEMENT,d.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}f.count!==-1&&(t?s.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):s.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function a(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function o(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(s.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const d=n.get(c);(!d||d.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const u=n.get(c);if(u===void 0)n.set(c,i(c,h));else if(u.version<c.version){if(u.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,c,h),u.version=c.version}}return{get:a,remove:o,update:l}}class cr extends Ut{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=e/o,d=t/l,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const M=p*d-a;for(let x=0;x<c;x++){const v=x*u-r;g.push(v,-M,0),_.push(0,0,1),m.push(x/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let M=0;M<o;M++){const x=M+c*p,v=M+c*(p+1),R=M+1+c*(p+1),w=M+1+c*p;f.push(x,v,w),f.push(v,R,w)}this.setIndex(f),this.setAttribute("position",new ot(g,3)),this.setAttribute("normal",new ot(_,3)),this.setAttribute("uv",new ot(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cr(e.width,e.height,e.widthSegments,e.heightSegments)}}var pd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,md=`#ifdef USE_ALPHAHASH
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
#endif`,gd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_d=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,xd=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,vd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,yd=`#ifdef USE_AOMAP
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
#endif`,Md=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Sd=`#ifdef USE_BATCHING
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
#endif`,bd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Ed=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Td=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ad=`#ifdef USE_IRIDESCENCE
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
#endif`,Rd=`#ifdef USE_BUMPMAP
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
#endif`,Cd=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ld=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Id=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Dd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Nd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ud=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Fd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Od=`#define PI 3.141592653589793
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
} // validated`,kd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Bd=`vec3 transformedNormal = objectNormal;
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
#endif`,zd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Hd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Gd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Vd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Wd="gl_FragColor = linearToOutputTexel( gl_FragColor );",qd=`
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
}`,Xd=`#ifdef USE_ENVMAP
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
#endif`,jd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,$d=`#ifdef USE_ENVMAP
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
#endif`,Yd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Kd=`#ifdef USE_ENVMAP
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
#endif`,Zd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Jd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Qd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ef=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,tf=`#ifdef USE_GRADIENTMAP
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
}`,nf=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,sf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,rf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,af=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,of=`uniform bool receiveShadow;
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
#endif`,lf=`#ifdef USE_ENVMAP
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
#endif`,cf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,hf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,uf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,df=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ff=`PhysicalMaterial material;
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
#endif`,pf=`struct PhysicalMaterial {
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
}`,mf=`
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
#endif`,gf=`#if defined( RE_IndirectDiffuse )
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
#endif`,_f=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,vf=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Mf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Sf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,bf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ef=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,wf=`#if defined( USE_POINTS_UV )
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
#endif`,Tf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Af=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rf=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Cf=`#ifdef USE_MORPHNORMALS
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
#endif`,Lf=`#ifdef USE_MORPHTARGETS
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
#endif`,Pf=`#ifdef USE_MORPHTARGETS
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
#endif`,If=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Df=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Nf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Uf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ff=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Of=`#ifdef USE_NORMALMAP
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
#endif`,kf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Bf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Hf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Gf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Vf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Wf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Xf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,jf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$f=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Yf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Kf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Zf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Qf=`float getShadowMask() {
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
}`,ep=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,tp=`#ifdef USE_SKINNING
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
#endif`,np=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ip=`#ifdef USE_SKINNING
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
#endif`,sp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,rp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ap=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,op=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,lp=`#ifdef USE_TRANSMISSION
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
#endif`,cp=`#ifdef USE_TRANSMISSION
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
#endif`,hp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,up=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const pp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,mp=`uniform sampler2D t2D;
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
}`,gp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_p=`#ifdef ENVMAP_TYPE_CUBE
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
}`,xp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yp=`#include <common>
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
}`,Mp=`#if DEPTH_PACKING == 3200
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
}`,Sp=`#define DISTANCE
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
}`,bp=`#define DISTANCE
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
}`,Ep=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,wp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tp=`uniform float scale;
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
}`,Ap=`uniform vec3 diffuse;
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
}`,Rp=`#include <common>
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
}`,Cp=`uniform vec3 diffuse;
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
}`,Lp=`#define LAMBERT
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
}`,Pp=`#define LAMBERT
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
}`,Ip=`#define MATCAP
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
}`,Dp=`#define MATCAP
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
}`,Np=`#define NORMAL
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
}`,Up=`#define NORMAL
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
}`,Fp=`#define PHONG
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
}`,Op=`#define PHONG
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
}`,kp=`#define STANDARD
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
}`,Bp=`#define STANDARD
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
}`,zp=`#define TOON
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
}`,Hp=`#define TOON
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
}`,Gp=`uniform float size;
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
}`,Vp=`uniform vec3 diffuse;
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
}`,Wp=`#include <common>
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
}`,qp=`uniform vec3 color;
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
}`,Xp=`uniform float rotation;
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
}`,jp=`uniform vec3 diffuse;
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
}`,Ue={alphahash_fragment:pd,alphahash_pars_fragment:md,alphamap_fragment:gd,alphamap_pars_fragment:_d,alphatest_fragment:xd,alphatest_pars_fragment:vd,aomap_fragment:yd,aomap_pars_fragment:Md,batching_pars_vertex:Sd,batching_vertex:bd,begin_vertex:Ed,beginnormal_vertex:wd,bsdfs:Td,iridescence_fragment:Ad,bumpmap_pars_fragment:Rd,clipping_planes_fragment:Cd,clipping_planes_pars_fragment:Ld,clipping_planes_pars_vertex:Pd,clipping_planes_vertex:Id,color_fragment:Dd,color_pars_fragment:Nd,color_pars_vertex:Ud,color_vertex:Fd,common:Od,cube_uv_reflection_fragment:kd,defaultnormal_vertex:Bd,displacementmap_pars_vertex:zd,displacementmap_vertex:Hd,emissivemap_fragment:Gd,emissivemap_pars_fragment:Vd,colorspace_fragment:Wd,colorspace_pars_fragment:qd,envmap_fragment:Xd,envmap_common_pars_fragment:jd,envmap_pars_fragment:$d,envmap_pars_vertex:Yd,envmap_physical_pars_fragment:lf,envmap_vertex:Kd,fog_vertex:Zd,fog_pars_vertex:Jd,fog_fragment:Qd,fog_pars_fragment:ef,gradientmap_pars_fragment:tf,lightmap_fragment:nf,lightmap_pars_fragment:sf,lights_lambert_fragment:rf,lights_lambert_pars_fragment:af,lights_pars_begin:of,lights_toon_fragment:cf,lights_toon_pars_fragment:hf,lights_phong_fragment:uf,lights_phong_pars_fragment:df,lights_physical_fragment:ff,lights_physical_pars_fragment:pf,lights_fragment_begin:mf,lights_fragment_maps:gf,lights_fragment_end:_f,logdepthbuf_fragment:xf,logdepthbuf_pars_fragment:vf,logdepthbuf_pars_vertex:yf,logdepthbuf_vertex:Mf,map_fragment:Sf,map_pars_fragment:bf,map_particle_fragment:Ef,map_particle_pars_fragment:wf,metalnessmap_fragment:Tf,metalnessmap_pars_fragment:Af,morphcolor_vertex:Rf,morphnormal_vertex:Cf,morphtarget_pars_vertex:Lf,morphtarget_vertex:Pf,normal_fragment_begin:If,normal_fragment_maps:Df,normal_pars_fragment:Nf,normal_pars_vertex:Uf,normal_vertex:Ff,normalmap_pars_fragment:Of,clearcoat_normal_fragment_begin:kf,clearcoat_normal_fragment_maps:Bf,clearcoat_pars_fragment:zf,iridescence_pars_fragment:Hf,opaque_fragment:Gf,packing:Vf,premultiplied_alpha_fragment:Wf,project_vertex:qf,dithering_fragment:Xf,dithering_pars_fragment:jf,roughnessmap_fragment:$f,roughnessmap_pars_fragment:Yf,shadowmap_pars_fragment:Kf,shadowmap_pars_vertex:Zf,shadowmap_vertex:Jf,shadowmask_pars_fragment:Qf,skinbase_vertex:ep,skinning_pars_vertex:tp,skinning_vertex:np,skinnormal_vertex:ip,specularmap_fragment:sp,specularmap_pars_fragment:rp,tonemapping_fragment:ap,tonemapping_pars_fragment:op,transmission_fragment:lp,transmission_pars_fragment:cp,uv_pars_fragment:hp,uv_pars_vertex:up,uv_vertex:dp,worldpos_vertex:fp,background_vert:pp,background_frag:mp,backgroundCube_vert:gp,backgroundCube_frag:_p,cube_vert:xp,cube_frag:vp,depth_vert:yp,depth_frag:Mp,distanceRGBA_vert:Sp,distanceRGBA_frag:bp,equirect_vert:Ep,equirect_frag:wp,linedashed_vert:Tp,linedashed_frag:Ap,meshbasic_vert:Rp,meshbasic_frag:Cp,meshlambert_vert:Lp,meshlambert_frag:Pp,meshmatcap_vert:Ip,meshmatcap_frag:Dp,meshnormal_vert:Np,meshnormal_frag:Up,meshphong_vert:Fp,meshphong_frag:Op,meshphysical_vert:kp,meshphysical_frag:Bp,meshtoon_vert:zp,meshtoon_frag:Hp,points_vert:Gp,points_frag:Vp,shadow_vert:Wp,shadow_frag:qp,sprite_vert:Xp,sprite_frag:jp},se={common:{diffuse:{value:new de(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new He}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new He}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new He}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new He},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new He},normalScale:{value:new Le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new He},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new He}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new He}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new He}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new de(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new de(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0},uvTransform:{value:new He}},sprite:{diffuse:{value:new de(16777215)},opacity:{value:1},center:{value:new Le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new He},alphaMap:{value:null},alphaMapTransform:{value:new He},alphaTest:{value:0}}},an={basic:{uniforms:It([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.fog]),vertexShader:Ue.meshbasic_vert,fragmentShader:Ue.meshbasic_frag},lambert:{uniforms:It([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new de(0)}}]),vertexShader:Ue.meshlambert_vert,fragmentShader:Ue.meshlambert_frag},phong:{uniforms:It([se.common,se.specularmap,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.fog,se.lights,{emissive:{value:new de(0)},specular:{value:new de(1118481)},shininess:{value:30}}]),vertexShader:Ue.meshphong_vert,fragmentShader:Ue.meshphong_frag},standard:{uniforms:It([se.common,se.envmap,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.roughnessmap,se.metalnessmap,se.fog,se.lights,{emissive:{value:new de(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag},toon:{uniforms:It([se.common,se.aomap,se.lightmap,se.emissivemap,se.bumpmap,se.normalmap,se.displacementmap,se.gradientmap,se.fog,se.lights,{emissive:{value:new de(0)}}]),vertexShader:Ue.meshtoon_vert,fragmentShader:Ue.meshtoon_frag},matcap:{uniforms:It([se.common,se.bumpmap,se.normalmap,se.displacementmap,se.fog,{matcap:{value:null}}]),vertexShader:Ue.meshmatcap_vert,fragmentShader:Ue.meshmatcap_frag},points:{uniforms:It([se.points,se.fog]),vertexShader:Ue.points_vert,fragmentShader:Ue.points_frag},dashed:{uniforms:It([se.common,se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ue.linedashed_vert,fragmentShader:Ue.linedashed_frag},depth:{uniforms:It([se.common,se.displacementmap]),vertexShader:Ue.depth_vert,fragmentShader:Ue.depth_frag},normal:{uniforms:It([se.common,se.bumpmap,se.normalmap,se.displacementmap,{opacity:{value:1}}]),vertexShader:Ue.meshnormal_vert,fragmentShader:Ue.meshnormal_frag},sprite:{uniforms:It([se.sprite,se.fog]),vertexShader:Ue.sprite_vert,fragmentShader:Ue.sprite_frag},background:{uniforms:{uvTransform:{value:new He},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ue.background_vert,fragmentShader:Ue.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ue.backgroundCube_vert,fragmentShader:Ue.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ue.cube_vert,fragmentShader:Ue.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ue.equirect_vert,fragmentShader:Ue.equirect_frag},distanceRGBA:{uniforms:It([se.common,se.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ue.distanceRGBA_vert,fragmentShader:Ue.distanceRGBA_frag},shadow:{uniforms:It([se.lights,se.fog,{color:{value:new de(0)},opacity:{value:1}}]),vertexShader:Ue.shadow_vert,fragmentShader:Ue.shadow_frag}};an.physical={uniforms:It([an.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new He},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new He},clearcoatNormalScale:{value:new Le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new He},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new He},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new He},sheen:{value:0},sheenColor:{value:new de(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new He},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new He},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new He},transmissionSamplerSize:{value:new Le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new He},attenuationDistance:{value:0},attenuationColor:{value:new de(0)},specularColor:{value:new de(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new He},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new He},anisotropyVector:{value:new Le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new He}}]),vertexShader:Ue.meshphysical_vert,fragmentShader:Ue.meshphysical_frag};const Us={r:0,b:0,g:0};function $p(s,e,t,n,i,r,a){const o=new de(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(m,p){let M=!1,x=p.isScene===!0?p.background:null;x&&x.isTexture&&(x=(p.backgroundBlurriness>0?t:e).get(x)),x===null?_(o,l):x&&x.isColor&&(_(x,1),M=!0);const v=s.xr.getEnvironmentBlendMode();v==="additive"?n.buffers.color.setClear(0,0,0,1,a):v==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(s.autoClear||M)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),x&&(x.isCubeTexture||x.mapping===ar)?(h===void 0&&(h=new xe(new je(1,1,1),new si({name:"BackgroundCubeMaterial",uniforms:Hi(an.backgroundCube.uniforms),vertexShader:an.backgroundCube.vertexShader,fragmentShader:an.backgroundCube.fragmentShader,side:Bt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.toneMapped=Ye.getTransfer(x.colorSpace)!==st,(u!==x||d!==x.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=x,d=x.version,f=s.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(c===void 0&&(c=new xe(new cr(2,2),new si({name:"BackgroundMaterial",uniforms:Hi(an.background.uniforms),vertexShader:an.background.vertexShader,fragmentShader:an.background.fragmentShader,side:Mn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=x,c.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,c.material.toneMapped=Ye.getTransfer(x.colorSpace)!==st,x.matrixAutoUpdate===!0&&x.updateMatrix(),c.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||d!==x.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=x,d=x.version,f=s.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null))}function _(m,p){m.getRGB(Us,Hc(s)),n.buffers.color.setClear(Us.r,Us.g,Us.b,p,a)}return{getClearColor:function(){return o},setClearColor:function(m,p=1){o.set(m),l=p,_(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(m){l=m,_(o,l)},render:g}}function Yp(s,e,t,n){const i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},l=m(null);let c=l,h=!1;function u(P,z,V,j,W){let X=!1;if(a){const $=_(j,V,z);c!==$&&(c=$,f(c.object)),X=p(P,j,V,W),X&&M(P,j,V,W)}else{const $=z.wireframe===!0;(c.geometry!==j.id||c.program!==V.id||c.wireframe!==$)&&(c.geometry=j.id,c.program=V.id,c.wireframe=$,X=!0)}W!==null&&t.update(W,s.ELEMENT_ARRAY_BUFFER),(X||h)&&(h=!1,I(P,z,V,j),W!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function d(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function f(P){return n.isWebGL2?s.bindVertexArray(P):r.bindVertexArrayOES(P)}function g(P){return n.isWebGL2?s.deleteVertexArray(P):r.deleteVertexArrayOES(P)}function _(P,z,V){const j=V.wireframe===!0;let W=o[P.id];W===void 0&&(W={},o[P.id]=W);let X=W[z.id];X===void 0&&(X={},W[z.id]=X);let $=X[j];return $===void 0&&($=m(d()),X[j]=$),$}function m(P){const z=[],V=[],j=[];for(let W=0;W<i;W++)z[W]=0,V[W]=0,j[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:V,attributeDivisors:j,object:P,attributes:{},index:null}}function p(P,z,V,j){const W=c.attributes,X=z.attributes;let $=0;const te=V.getAttributes();for(const ne in te)if(te[ne].location>=0){const Y=W[ne];let le=X[ne];if(le===void 0&&(ne==="instanceMatrix"&&P.instanceMatrix&&(le=P.instanceMatrix),ne==="instanceColor"&&P.instanceColor&&(le=P.instanceColor)),Y===void 0||Y.attribute!==le||le&&Y.data!==le.data)return!0;$++}return c.attributesNum!==$||c.index!==j}function M(P,z,V,j){const W={},X=z.attributes;let $=0;const te=V.getAttributes();for(const ne in te)if(te[ne].location>=0){let Y=X[ne];Y===void 0&&(ne==="instanceMatrix"&&P.instanceMatrix&&(Y=P.instanceMatrix),ne==="instanceColor"&&P.instanceColor&&(Y=P.instanceColor));const le={};le.attribute=Y,Y&&Y.data&&(le.data=Y.data),W[ne]=le,$++}c.attributes=W,c.attributesNum=$,c.index=j}function x(){const P=c.newAttributes;for(let z=0,V=P.length;z<V;z++)P[z]=0}function v(P){R(P,0)}function R(P,z){const V=c.newAttributes,j=c.enabledAttributes,W=c.attributeDivisors;V[P]=1,j[P]===0&&(s.enableVertexAttribArray(P),j[P]=1),W[P]!==z&&((n.isWebGL2?s:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,z),W[P]=z)}function w(){const P=c.newAttributes,z=c.enabledAttributes;for(let V=0,j=z.length;V<j;V++)z[V]!==P[V]&&(s.disableVertexAttribArray(V),z[V]=0)}function A(P,z,V,j,W,X,$){$===!0?s.vertexAttribIPointer(P,z,V,W,X):s.vertexAttribPointer(P,z,V,j,W,X)}function I(P,z,V,j){if(n.isWebGL2===!1&&(P.isInstancedMesh||j.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const W=j.attributes,X=V.getAttributes(),$=z.defaultAttributeValues;for(const te in X){const ne=X[te];if(ne.location>=0){let G=W[te];if(G===void 0&&(te==="instanceMatrix"&&P.instanceMatrix&&(G=P.instanceMatrix),te==="instanceColor"&&P.instanceColor&&(G=P.instanceColor)),G!==void 0){const Y=G.normalized,le=G.itemSize,_e=t.get(G);if(_e===void 0)continue;const ge=_e.buffer,Pe=_e.type,De=_e.bytesPerElement,Ee=n.isWebGL2===!0&&(Pe===s.INT||Pe===s.UNSIGNED_INT||G.gpuType===Sc);if(G.isInterleavedBufferAttribute){const qe=G.data,U=qe.stride,Rt=G.offset;if(qe.isInstancedInterleavedBuffer){for(let ye=0;ye<ne.locationSize;ye++)R(ne.location+ye,qe.meshPerAttribute);P.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=qe.meshPerAttribute*qe.count)}else for(let ye=0;ye<ne.locationSize;ye++)v(ne.location+ye);s.bindBuffer(s.ARRAY_BUFFER,ge);for(let ye=0;ye<ne.locationSize;ye++)A(ne.location+ye,le/ne.locationSize,Pe,Y,U*De,(Rt+le/ne.locationSize*ye)*De,Ee)}else{if(G.isInstancedBufferAttribute){for(let qe=0;qe<ne.locationSize;qe++)R(ne.location+qe,G.meshPerAttribute);P.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let qe=0;qe<ne.locationSize;qe++)v(ne.location+qe);s.bindBuffer(s.ARRAY_BUFFER,ge);for(let qe=0;qe<ne.locationSize;qe++)A(ne.location+qe,le/ne.locationSize,Pe,Y,le*De,le/ne.locationSize*qe*De,Ee)}}else if($!==void 0){const Y=$[te];if(Y!==void 0)switch(Y.length){case 2:s.vertexAttrib2fv(ne.location,Y);break;case 3:s.vertexAttrib3fv(ne.location,Y);break;case 4:s.vertexAttrib4fv(ne.location,Y);break;default:s.vertexAttrib1fv(ne.location,Y)}}}}w()}function y(){N();for(const P in o){const z=o[P];for(const V in z){const j=z[V];for(const W in j)g(j[W].object),delete j[W];delete z[V]}delete o[P]}}function E(P){if(o[P.id]===void 0)return;const z=o[P.id];for(const V in z){const j=z[V];for(const W in j)g(j[W].object),delete j[W];delete z[V]}delete o[P.id]}function k(P){for(const z in o){const V=o[z];if(V[P.id]===void 0)continue;const j=V[P.id];for(const W in j)g(j[W].object),delete j[W];delete V[P.id]}}function N(){J(),h=!0,c!==l&&(c=l,f(c.object))}function J(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:u,reset:N,resetDefaultState:J,dispose:y,releaseStatesOfGeometry:E,releaseStatesOfProgram:k,initAttributes:x,enableAttribute:v,disableUnusedAttributes:w}}function Kp(s,e,t,n){const i=n.isWebGL2;let r;function a(h){r=h}function o(h,u){s.drawArrays(r,h,u),t.update(u,r,1)}function l(h,u,d){if(d===0)return;let f,g;if(i)f=s,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](r,h,u,d),t.update(u,r,d)}function c(h,u,d){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<d;g++)this.render(h[g],u[g]);else{f.multiDrawArraysWEBGL(r,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_];t.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=l,this.renderMultiDraw=c}function Zp(s,e,t){let n;function i(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");n=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const l=r(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const c=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),_=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),p=s.getParameter(s.MAX_VARYING_VECTORS),M=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),x=d>0,v=a||e.has("OES_texture_float"),R=x&&v,w=a?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:M,vertexTextures:x,floatFragmentTextures:v,floatVertexTextures:R,maxSamples:w}}function Jp(s){const e=this;let t=null,n=0,i=!1,r=!1;const a=new Ln,o=new He,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||r&&!m)r?h(null):c();else{const M=r?0:n,x=M*4;let v=p.clippingState||null;l.value=v,v=h(g,d,x,f);for(let R=0;R!==x;++R)v[R]=t[R];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=l.value,g!==!0||m===null){const p=f+_*4,M=d.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,v=f;x!==_;++x,v+=4)a.copy(u[x]).applyMatrix4(M,o),a.normal.toArray(m,v),m[v+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Qp(s){let e=new WeakMap;function t(a,o){return o===oa?a.mapping=Fi:o===la&&(a.mapping=Oi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===oa||o===la)if(e.has(a)){const l=e.get(a).texture;return t(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new hd(l.height/2);return c.fromEquirectangularTexture(s,a),e.set(a,c),a.addEventListener("dispose",i),t(c.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Fa extends Gc{constructor(e=-1,t=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Ri=4,il=[.125,.215,.35,.446,.526,.582],$n=20,Gr=new Fa,sl=new de;let Vr=null,Wr=0,qr=0;const Xn=(1+Math.sqrt(5))/2,Ei=1/Xn,rl=[new C(1,1,1),new C(-1,1,1),new C(1,1,-1),new C(-1,1,-1),new C(0,Xn,Ei),new C(0,Xn,-Ei),new C(Ei,0,Xn),new C(-Ei,0,Xn),new C(Xn,Ei,0),new C(-Xn,Ei,0)];class al{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){Vr=this._renderer.getRenderTarget(),Wr=this._renderer.getActiveCubeFace(),qr=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,i,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=cl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ll(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Vr,Wr,qr),e.scissorTest=!1,Fs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Fi||e.mapping===Oi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Vr=this._renderer.getRenderTarget(),Wr=this._renderer.getActiveCubeFace(),qr=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ft,minFilter:Ft,generateMipmaps:!1,type:os,format:jt,colorSpace:bt,depthBuffer:!1},i=ol(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ol(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=em(r)),this._blurMaterial=tm(r,e,t)}return i}_compileMaterial(e){const t=new xe(this._lodPlanes[0],e);this._renderer.compile(t,Gr)}_sceneToCubeUV(e,t,n,i){const o=new Dt(90,1,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(sl),h.toneMapping=On,h.autoClear=!1;const f=new ft({name:"PMREM.Background",side:Bt,depthWrite:!1,depthTest:!1}),g=new xe(new je,f);let _=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,_=!0):(f.color.copy(sl),_=!0);for(let p=0;p<6;p++){const M=p%3;M===0?(o.up.set(0,l[p],0),o.lookAt(c[p],0,0)):M===1?(o.up.set(0,0,l[p]),o.lookAt(0,c[p],0)):(o.up.set(0,l[p],0),o.lookAt(0,0,c[p]));const x=this._cubeSize;Fs(i,M*x,p>2?x:0,x,x),h.setRenderTarget(i),_&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Fi||e.mapping===Oi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=cl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ll());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new xe(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const l=this._cubeSize;Fs(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,Gr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),a=rl[(i-1)%rl.length];this._blur(e,i-1,i,r,a)}t.autoClear=n}_blur(e,t,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",r),this._halfBlur(a,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new xe(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*$n-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):$n;m>$n&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${$n}`);const p=[];let M=0;for(let A=0;A<$n;++A){const I=A/_,y=Math.exp(-I*I/2);p.push(y),A===0?M+=y:A<m&&(M+=2*y)}for(let A=0;A<p.length;A++)p[A]=p[A]/M;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:x}=this;d.dTheta.value=g,d.mipInt.value=x-n;const v=this._sizeLods[i],R=3*v*(i>x-Ri?i-x+Ri:0),w=4*(this._cubeSize-v);Fs(t,R,w,3*v,2*v),l.setRenderTarget(t),l.render(u,Gr)}}function em(s){const e=[],t=[],n=[];let i=s;const r=s-Ri+1+il.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);t.push(o);let l=1/o;a>s-Ri?l=il[a-s+Ri-1]:a===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,M=new Float32Array(_*g*f),x=new Float32Array(m*g*f),v=new Float32Array(p*g*f);for(let w=0;w<f;w++){const A=w%3*2/3-1,I=w>2?0:-1,y=[A,I,0,A+2/3,I,0,A+2/3,I+1,0,A,I,0,A+2/3,I+1,0,A,I+1,0];M.set(y,_*g*w),x.set(d,m*g*w);const E=[w,w,w,w,w,w];v.set(E,p*g*w)}const R=new Ut;R.setAttribute("position",new Nt(M,_)),R.setAttribute("uv",new Nt(x,m)),R.setAttribute("faceIndex",new Nt(v,p)),e.push(R),i>Ri&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function ol(s,e,t){const n=new ii(s,e,t);return n.texture.mapping=ar,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Fs(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function tm(s,e,t){const n=new Float32Array($n),i=new C(0,1,0);return new si({name:"SphericalGaussianBlur",defines:{n:$n,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Oa(),fragmentShader:`

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
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function ll(){return new si({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Oa(),fragmentShader:`

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
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function cl(){return new si({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Oa(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function Oa(){return`

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
	`}function nm(s){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===oa||l===la,h=l===Fi||l===Oi;if(c||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=e.get(o);return t===null&&(t=new al(s)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),e.set(o,u),u.texture}else{if(e.has(o))return e.get(o).texture;{const u=o.image;if(c&&u&&u.height>0||h&&u&&i(u)){t===null&&(t=new al(s));const d=c?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",r),d.texture}else return null}}}return o}function i(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){const l=o.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function im(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const i=t(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function sm(s,e,t,n){const i={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}d.removeEventListener("dispose",a),delete i[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return i[d.id]===!0||(d.addEventListener("dispose",a),i[d.id]=!0,t.memory.geometries++),d}function l(u){const d=u.attributes;for(const g in d)e.update(d[g],s.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],s.ARRAY_BUFFER)}}function c(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const M=f.array;_=f.version;for(let x=0,v=M.length;x<v;x+=3){const R=M[x+0],w=M[x+1],A=M[x+2];d.push(R,w,w,A,A,R)}}else if(g!==void 0){const M=g.array;_=g.version;for(let x=0,v=M.length/3-1;x<v;x+=3){const R=x+0,w=x+1,A=x+2;d.push(R,w,w,A,A,R)}}else return;const m=new(Nc(d)?zc:Bc)(d,1);m.version=_;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function rm(s,e,t,n){const i=n.isWebGL2;let r;function a(f){r=f}let o,l;function c(f){o=f.type,l=f.bytesPerElement}function h(f,g){s.drawElements(r,g,o,f*l),t.update(g,r,1)}function u(f,g,_){if(_===0)return;let m,p;if(i)m=s,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,o,f*l,_),t.update(g,r,_)}function d(f,g,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<_;p++)this.render(f[p]/l,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,o,f,0,_);let p=0;for(let M=0;M<_;M++)p+=g[M];t.update(p,r,1)}}this.setMode=a,this.setIndex=c,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function am(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case s.TRIANGLES:t.triangles+=o*(r/3);break;case s.LINES:t.lines+=o*(r/2);break;case s.LINE_STRIP:t.lines+=o*(r-1);break;case s.LINE_LOOP:t.lines+=o*r;break;case s.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function om(s,e){return s[0]-e[0]}function lm(s,e){return Math.abs(e[1])-Math.abs(s[1])}function cm(s,e,t){const n={},i=new Float32Array(8),r=new WeakMap,a=new et,o=[];for(let c=0;c<8;c++)o[c]=[c,0];function l(c,h,u){const d=c.morphTargetInfluences;if(e.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let m=r.get(h);if(m===void 0||m.count!==_){let z=function(){J.dispose(),r.delete(h),h.removeEventListener("dispose",z)};var f=z;m!==void 0&&m.texture.dispose();const x=h.morphAttributes.position!==void 0,v=h.morphAttributes.normal!==void 0,R=h.morphAttributes.color!==void 0,w=h.morphAttributes.position||[],A=h.morphAttributes.normal||[],I=h.morphAttributes.color||[];let y=0;x===!0&&(y=1),v===!0&&(y=2),R===!0&&(y=3);let E=h.attributes.position.count*y,k=1;E>e.maxTextureSize&&(k=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const N=new Float32Array(E*k*4*_),J=new Oc(N,E,k,_);J.type=vn,J.needsUpdate=!0;const P=y*4;for(let V=0;V<_;V++){const j=w[V],W=A[V],X=I[V],$=E*k*4*V;for(let te=0;te<j.count;te++){const ne=te*P;x===!0&&(a.fromBufferAttribute(j,te),N[$+ne+0]=a.x,N[$+ne+1]=a.y,N[$+ne+2]=a.z,N[$+ne+3]=0),v===!0&&(a.fromBufferAttribute(W,te),N[$+ne+4]=a.x,N[$+ne+5]=a.y,N[$+ne+6]=a.z,N[$+ne+7]=0),R===!0&&(a.fromBufferAttribute(X,te),N[$+ne+8]=a.x,N[$+ne+9]=a.y,N[$+ne+10]=a.z,N[$+ne+11]=X.itemSize===4?a.w:1)}}m={count:_,texture:J,size:new Le(E,k)},r.set(h,m),h.addEventListener("dispose",z)}let p=0;for(let x=0;x<d.length;x++)p+=d[x];const M=h.morphTargetsRelative?1:1-p;u.getUniforms().setValue(s,"morphTargetBaseInfluence",M),u.getUniforms().setValue(s,"morphTargetInfluences",d),u.getUniforms().setValue(s,"morphTargetsTexture",m.texture,t),u.getUniforms().setValue(s,"morphTargetsTextureSize",m.size)}else{const g=d===void 0?0:d.length;let _=n[h.id];if(_===void 0||_.length!==g){_=[];for(let v=0;v<g;v++)_[v]=[v,0];n[h.id]=_}for(let v=0;v<g;v++){const R=_[v];R[0]=v,R[1]=d[v]}_.sort(lm);for(let v=0;v<8;v++)v<g&&_[v][1]?(o[v][0]=_[v][0],o[v][1]=_[v][1]):(o[v][0]=Number.MAX_SAFE_INTEGER,o[v][1]=0);o.sort(om);const m=h.morphAttributes.position,p=h.morphAttributes.normal;let M=0;for(let v=0;v<8;v++){const R=o[v],w=R[0],A=R[1];w!==Number.MAX_SAFE_INTEGER&&A?(m&&h.getAttribute("morphTarget"+v)!==m[w]&&h.setAttribute("morphTarget"+v,m[w]),p&&h.getAttribute("morphNormal"+v)!==p[w]&&h.setAttribute("morphNormal"+v,p[w]),i[v]=A,M+=A):(m&&h.hasAttribute("morphTarget"+v)===!0&&h.deleteAttribute("morphTarget"+v),p&&h.hasAttribute("morphNormal"+v)===!0&&h.deleteAttribute("morphNormal"+v),i[v]=0)}const x=h.morphTargetsRelative?1:1-M;u.getUniforms().setValue(s,"morphTargetBaseInfluence",x),u.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:l}}function hm(s,e,t,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=e.get(l,h);if(i.get(u)!==c&&(e.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function a(){i=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}class qc extends St{constructor(e,t,n,i,r,a,o,l,c,h){if(h=h!==void 0?h:Kn,h!==Kn&&h!==ki)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Kn&&(n=Nn),n===void 0&&h===ki&&(n=Yn),super(null,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Mt,this.minFilter=l!==void 0?l:Mt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Xc=new St,jc=new qc(1,1);jc.compareFunction=Dc;const $c=new Oc,Yc=new ju,Kc=new Vc,hl=[],ul=[],dl=new Float32Array(16),fl=new Float32Array(9),pl=new Float32Array(4);function Wi(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=hl[i];if(r===void 0&&(r=new Float32Array(i),hl[i]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,s[a].toArray(r,o)}return r}function gt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function _t(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function hr(s,e){let t=ul[e];t===void 0&&(t=new Int32Array(e),ul[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function um(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function dm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;s.uniform2fv(this.addr,e),_t(t,e)}}function fm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(gt(t,e))return;s.uniform3fv(this.addr,e),_t(t,e)}}function pm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;s.uniform4fv(this.addr,e),_t(t,e)}}function mm(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(gt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,n))return;pl.set(n),s.uniformMatrix2fv(this.addr,!1,pl),_t(t,n)}}function gm(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(gt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,n))return;fl.set(n),s.uniformMatrix3fv(this.addr,!1,fl),_t(t,n)}}function _m(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(gt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),_t(t,e)}else{if(gt(t,n))return;dl.set(n),s.uniformMatrix4fv(this.addr,!1,dl),_t(t,n)}}function xm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function vm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;s.uniform2iv(this.addr,e),_t(t,e)}}function ym(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gt(t,e))return;s.uniform3iv(this.addr,e),_t(t,e)}}function Mm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;s.uniform4iv(this.addr,e),_t(t,e)}}function Sm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function bm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(gt(t,e))return;s.uniform2uiv(this.addr,e),_t(t,e)}}function Em(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(gt(t,e))return;s.uniform3uiv(this.addr,e),_t(t,e)}}function wm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(gt(t,e))return;s.uniform4uiv(this.addr,e),_t(t,e)}}function Tm(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);const r=this.type===s.SAMPLER_2D_SHADOW?jc:Xc;t.setTexture2D(e||r,i)}function Am(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Yc,i)}function Rm(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Kc,i)}function Cm(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||$c,i)}function Lm(s){switch(s){case 5126:return um;case 35664:return dm;case 35665:return fm;case 35666:return pm;case 35674:return mm;case 35675:return gm;case 35676:return _m;case 5124:case 35670:return xm;case 35667:case 35671:return vm;case 35668:case 35672:return ym;case 35669:case 35673:return Mm;case 5125:return Sm;case 36294:return bm;case 36295:return Em;case 36296:return wm;case 35678:case 36198:case 36298:case 36306:case 35682:return Tm;case 35679:case 36299:case 36307:return Am;case 35680:case 36300:case 36308:case 36293:return Rm;case 36289:case 36303:case 36311:case 36292:return Cm}}function Pm(s,e){s.uniform1fv(this.addr,e)}function Im(s,e){const t=Wi(e,this.size,2);s.uniform2fv(this.addr,t)}function Dm(s,e){const t=Wi(e,this.size,3);s.uniform3fv(this.addr,t)}function Nm(s,e){const t=Wi(e,this.size,4);s.uniform4fv(this.addr,t)}function Um(s,e){const t=Wi(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function Fm(s,e){const t=Wi(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function Om(s,e){const t=Wi(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function km(s,e){s.uniform1iv(this.addr,e)}function Bm(s,e){s.uniform2iv(this.addr,e)}function zm(s,e){s.uniform3iv(this.addr,e)}function Hm(s,e){s.uniform4iv(this.addr,e)}function Gm(s,e){s.uniform1uiv(this.addr,e)}function Vm(s,e){s.uniform2uiv(this.addr,e)}function Wm(s,e){s.uniform3uiv(this.addr,e)}function qm(s,e){s.uniform4uiv(this.addr,e)}function Xm(s,e,t){const n=this.cache,i=e.length,r=hr(t,i);gt(n,r)||(s.uniform1iv(this.addr,r),_t(n,r));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||Xc,r[a])}function jm(s,e,t){const n=this.cache,i=e.length,r=hr(t,i);gt(n,r)||(s.uniform1iv(this.addr,r),_t(n,r));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Yc,r[a])}function $m(s,e,t){const n=this.cache,i=e.length,r=hr(t,i);gt(n,r)||(s.uniform1iv(this.addr,r),_t(n,r));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||Kc,r[a])}function Ym(s,e,t){const n=this.cache,i=e.length,r=hr(t,i);gt(n,r)||(s.uniform1iv(this.addr,r),_t(n,r));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||$c,r[a])}function Km(s){switch(s){case 5126:return Pm;case 35664:return Im;case 35665:return Dm;case 35666:return Nm;case 35674:return Um;case 35675:return Fm;case 35676:return Om;case 5124:case 35670:return km;case 35667:case 35671:return Bm;case 35668:case 35672:return zm;case 35669:case 35673:return Hm;case 5125:return Gm;case 36294:return Vm;case 36295:return Wm;case 36296:return qm;case 35678:case 36198:case 36298:case 36306:case 35682:return Xm;case 35679:case 36299:case 36307:return jm;case 35680:case 36300:case 36308:case 36293:return $m;case 36289:case 36303:case 36311:case 36292:return Ym}}class Zm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Lm(t.type)}}class Jm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Km(t.type)}}class Qm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(e,t[o.id],n)}}}const Xr=/(\w+)(\])?(\[|\.)?/g;function ml(s,e){s.seq.push(e),s.map[e.id]=e}function eg(s,e,t){const n=s.name,i=n.length;for(Xr.lastIndex=0;;){const r=Xr.exec(n),a=Xr.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){ml(t,c===void 0?new Zm(o,s,e):new Jm(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new Qm(o),ml(t,u)),t=u}}}class Xs{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),a=e.getUniformLocation(t,r.name);eg(r,a,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function gl(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const tg=37297;let ng=0;function ig(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function sg(s){const e=Ye.getPrimaries(Ye.workingColorSpace),t=Ye.getPrimaries(s);let n;switch(e===t?n="":e===er&&t===Qs?n="LinearDisplayP3ToLinearSRGB":e===Qs&&t===er&&(n="LinearSRGBToLinearDisplayP3"),s){case bt:case or:return[n,"LinearTransferOETF"];case rt:case Ia:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function _l(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),i=s.getShaderInfoLog(e).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+i+`

`+ig(s.getShaderSource(e),a)}else return i}function rg(s,e){const t=sg(e);return`vec4 ${s}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function ag(s,e){let t;switch(e){case eu:t="Linear";break;case tu:t="Reinhard";break;case nu:t="OptimizedCineon";break;case iu:t="ACESFilmic";break;case ru:t="AgX";break;case su:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function og(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ci).join(`
`)}function lg(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ci).join(`
`)}function cg(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function hg(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:s.getAttribLocation(e,a),locationSize:o}}return t}function Ci(s){return s!==""}function xl(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function vl(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ug=/^[ \t]*#include +<([\w\d./]+)>/gm;function ma(s){return s.replace(ug,fg)}const dg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function fg(s,e){let t=Ue[e];if(t===void 0){const n=dg.get(e);if(n!==void 0)t=Ue[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ma(t)}const pg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function yl(s){return s.replace(pg,mg)}function mg(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Ml(s){let e="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function gg(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===xc?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===vc?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===xn&&(e="SHADOWMAP_TYPE_VSM"),e}function _g(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Fi:case Oi:e="ENVMAP_TYPE_CUBE";break;case ar:e="ENVMAP_TYPE_CUBE_UV";break}return e}function xg(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Oi:e="ENVMAP_MODE_REFRACTION";break}return e}function vg(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ra:e="ENVMAP_BLENDING_MULTIPLY";break;case Jh:e="ENVMAP_BLENDING_MIX";break;case Qh:e="ENVMAP_BLENDING_ADD";break}return e}function yg(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Mg(s,e,t,n){const i=s.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=gg(t),c=_g(t),h=xg(t),u=vg(t),d=yg(t),f=t.isWebGL2?"":og(t),g=lg(t),_=cg(r),m=i.createProgram();let p,M,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ci).join(`
`),p.length>0&&(p+=`
`),M=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ci).join(`
`),M.length>0&&(M+=`
`)):(p=[Ml(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ci).join(`
`),M=[f,Ml(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==On?"#define TONE_MAPPING":"",t.toneMapping!==On?Ue.tonemapping_pars_fragment:"",t.toneMapping!==On?ag("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ue.colorspace_pars_fragment,rg("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ci).join(`
`)),a=ma(a),a=xl(a,t),a=vl(a,t),o=ma(o),o=xl(o,t),o=vl(o,t),a=yl(a),o=yl(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,M=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Bo?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Bo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+M);const v=x+p+a,R=x+M+o,w=gl(i,i.VERTEX_SHADER,v),A=gl(i,i.FRAGMENT_SHADER,R);i.attachShader(m,w),i.attachShader(m,A),t.index0AttributeName!==void 0?i.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function I(N){if(s.debug.checkShaderErrors){const J=i.getProgramInfoLog(m).trim(),P=i.getShaderInfoLog(w).trim(),z=i.getShaderInfoLog(A).trim();let V=!0,j=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(V=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,m,w,A);else{const W=_l(i,w,"vertex"),X=_l(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+J+`
`+W+`
`+X)}else J!==""?console.warn("THREE.WebGLProgram: Program Info Log:",J):(P===""||z==="")&&(j=!1);j&&(N.diagnostics={runnable:V,programLog:J,vertexShader:{log:P,prefix:p},fragmentShader:{log:z,prefix:M}})}i.deleteShader(w),i.deleteShader(A),y=new Xs(i,m),E=hg(i,m)}let y;this.getUniforms=function(){return y===void 0&&I(this),y};let E;this.getAttributes=function(){return E===void 0&&I(this),E};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=i.getProgramParameter(m,tg)),k},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ng++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=w,this.fragmentShader=A,this}let Sg=0;class bg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Eg(e),t.set(e,n)),n}}class Eg{constructor(e){this.id=Sg++,this.code=e,this.usedTimes=0}}function wg(s,e,t,n,i,r,a){const o=new Na,l=new bg,c=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(y){return y===0?"uv":`uv${y}`}function m(y,E,k,N,J){const P=N.fog,z=J.geometry,V=y.isMeshStandardMaterial?N.environment:null,j=(y.isMeshStandardMaterial?t:e).get(y.envMap||V),W=j&&j.mapping===ar?j.image.height:null,X=g[y.type];y.precision!==null&&(f=i.getMaxPrecision(y.precision),f!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const $=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,te=$!==void 0?$.length:0;let ne=0;z.morphAttributes.position!==void 0&&(ne=1),z.morphAttributes.normal!==void 0&&(ne=2),z.morphAttributes.color!==void 0&&(ne=3);let G,Y,le,_e;if(X){const Ct=an[X];G=Ct.vertexShader,Y=Ct.fragmentShader}else G=y.vertexShader,Y=y.fragmentShader,l.update(y),le=l.getVertexShaderID(y),_e=l.getFragmentShaderID(y);const ge=s.getRenderTarget(),Pe=J.isInstancedMesh===!0,De=J.isBatchedMesh===!0,Ee=!!y.map,qe=!!y.matcap,U=!!j,Rt=!!y.aoMap,ye=!!y.lightMap,Re=!!y.bumpMap,fe=!!y.normalMap,lt=!!y.displacementMap,Fe=!!y.emissiveMap,T=!!y.metalnessMap,S=!!y.roughnessMap,O=y.anisotropy>0,Q=y.clearcoat>0,Z=y.iridescence>0,ee=y.sheen>0,pe=y.transmission>0,oe=O&&!!y.anisotropyMap,he=Q&&!!y.clearcoatMap,be=Q&&!!y.clearcoatNormalMap,Oe=Q&&!!y.clearcoatRoughnessMap,K=Z&&!!y.iridescenceMap,Je=Z&&!!y.iridescenceThicknessMap,Ve=ee&&!!y.sheenColorMap,Ae=ee&&!!y.sheenRoughnessMap,ve=!!y.specularMap,ue=!!y.specularColorMap,Ne=!!y.specularIntensityMap,Ze=pe&&!!y.transmissionMap,ut=pe&&!!y.thicknessMap,Be=!!y.gradientMap,ie=!!y.alphaMap,L=y.alphaTest>0,re=!!y.alphaHash,ae=!!y.extensions,we=!!z.attributes.uv1,Me=!!z.attributes.uv2,tt=!!z.attributes.uv3;let nt=On;return y.toneMapped&&(ge===null||ge.isXRRenderTarget===!0)&&(nt=s.toneMapping),{isWebGL2:h,shaderID:X,shaderType:y.type,shaderName:y.name,vertexShader:G,fragmentShader:Y,defines:y.defines,customVertexShaderID:le,customFragmentShaderID:_e,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:De,instancing:Pe,instancingColor:Pe&&J.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:ge===null?s.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:bt,map:Ee,matcap:qe,envMap:U,envMapMode:U&&j.mapping,envMapCubeUVHeight:W,aoMap:Rt,lightMap:ye,bumpMap:Re,normalMap:fe,displacementMap:d&&lt,emissiveMap:Fe,normalMapObjectSpace:fe&&y.normalMapType===yu,normalMapTangentSpace:fe&&y.normalMapType===Pa,metalnessMap:T,roughnessMap:S,anisotropy:O,anisotropyMap:oe,clearcoat:Q,clearcoatMap:he,clearcoatNormalMap:be,clearcoatRoughnessMap:Oe,iridescence:Z,iridescenceMap:K,iridescenceThicknessMap:Je,sheen:ee,sheenColorMap:Ve,sheenRoughnessMap:Ae,specularMap:ve,specularColorMap:ue,specularIntensityMap:Ne,transmission:pe,transmissionMap:Ze,thicknessMap:ut,gradientMap:Be,opaque:y.transparent===!1&&y.blending===Di,alphaMap:ie,alphaTest:L,alphaHash:re,combine:y.combine,mapUv:Ee&&_(y.map.channel),aoMapUv:Rt&&_(y.aoMap.channel),lightMapUv:ye&&_(y.lightMap.channel),bumpMapUv:Re&&_(y.bumpMap.channel),normalMapUv:fe&&_(y.normalMap.channel),displacementMapUv:lt&&_(y.displacementMap.channel),emissiveMapUv:Fe&&_(y.emissiveMap.channel),metalnessMapUv:T&&_(y.metalnessMap.channel),roughnessMapUv:S&&_(y.roughnessMap.channel),anisotropyMapUv:oe&&_(y.anisotropyMap.channel),clearcoatMapUv:he&&_(y.clearcoatMap.channel),clearcoatNormalMapUv:be&&_(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Oe&&_(y.clearcoatRoughnessMap.channel),iridescenceMapUv:K&&_(y.iridescenceMap.channel),iridescenceThicknessMapUv:Je&&_(y.iridescenceThicknessMap.channel),sheenColorMapUv:Ve&&_(y.sheenColorMap.channel),sheenRoughnessMapUv:Ae&&_(y.sheenRoughnessMap.channel),specularMapUv:ve&&_(y.specularMap.channel),specularColorMapUv:ue&&_(y.specularColorMap.channel),specularIntensityMapUv:Ne&&_(y.specularIntensityMap.channel),transmissionMapUv:Ze&&_(y.transmissionMap.channel),thicknessMapUv:ut&&_(y.thicknessMap.channel),alphaMapUv:ie&&_(y.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(fe||O),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,vertexUv1s:we,vertexUv2s:Me,vertexUv3s:tt,pointsUvs:J.isPoints===!0&&!!z.attributes.uv&&(Ee||ie),fog:!!P,useFog:y.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:y.flatShading===!0,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:J.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:ne,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:s.shadowMap.enabled&&k.length>0,shadowMapType:s.shadowMap.type,toneMapping:nt,useLegacyLights:s._useLegacyLights,decodeVideoTexture:Ee&&y.map.isVideoTexture===!0&&Ye.getTransfer(y.map.colorSpace)===st,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Ot,flipSided:y.side===Bt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionDerivatives:ae&&y.extensions.derivatives===!0,extensionFragDepth:ae&&y.extensions.fragDepth===!0,extensionDrawBuffers:ae&&y.extensions.drawBuffers===!0,extensionShaderTextureLOD:ae&&y.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ae&&y.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()}}function p(y){const E=[];if(y.shaderID?E.push(y.shaderID):(E.push(y.customVertexShaderID),E.push(y.customFragmentShaderID)),y.defines!==void 0)for(const k in y.defines)E.push(k),E.push(y.defines[k]);return y.isRawShaderMaterial===!1&&(M(E,y),x(E,y),E.push(s.outputColorSpace)),E.push(y.customProgramCacheKey),E.join()}function M(y,E){y.push(E.precision),y.push(E.outputColorSpace),y.push(E.envMapMode),y.push(E.envMapCubeUVHeight),y.push(E.mapUv),y.push(E.alphaMapUv),y.push(E.lightMapUv),y.push(E.aoMapUv),y.push(E.bumpMapUv),y.push(E.normalMapUv),y.push(E.displacementMapUv),y.push(E.emissiveMapUv),y.push(E.metalnessMapUv),y.push(E.roughnessMapUv),y.push(E.anisotropyMapUv),y.push(E.clearcoatMapUv),y.push(E.clearcoatNormalMapUv),y.push(E.clearcoatRoughnessMapUv),y.push(E.iridescenceMapUv),y.push(E.iridescenceThicknessMapUv),y.push(E.sheenColorMapUv),y.push(E.sheenRoughnessMapUv),y.push(E.specularMapUv),y.push(E.specularColorMapUv),y.push(E.specularIntensityMapUv),y.push(E.transmissionMapUv),y.push(E.thicknessMapUv),y.push(E.combine),y.push(E.fogExp2),y.push(E.sizeAttenuation),y.push(E.morphTargetsCount),y.push(E.morphAttributeCount),y.push(E.numDirLights),y.push(E.numPointLights),y.push(E.numSpotLights),y.push(E.numSpotLightMaps),y.push(E.numHemiLights),y.push(E.numRectAreaLights),y.push(E.numDirLightShadows),y.push(E.numPointLightShadows),y.push(E.numSpotLightShadows),y.push(E.numSpotLightShadowsWithMaps),y.push(E.numLightProbes),y.push(E.shadowMapType),y.push(E.toneMapping),y.push(E.numClippingPlanes),y.push(E.numClipIntersection),y.push(E.depthPacking)}function x(y,E){o.disableAll(),E.isWebGL2&&o.enable(0),E.supportsVertexTextures&&o.enable(1),E.instancing&&o.enable(2),E.instancingColor&&o.enable(3),E.matcap&&o.enable(4),E.envMap&&o.enable(5),E.normalMapObjectSpace&&o.enable(6),E.normalMapTangentSpace&&o.enable(7),E.clearcoat&&o.enable(8),E.iridescence&&o.enable(9),E.alphaTest&&o.enable(10),E.vertexColors&&o.enable(11),E.vertexAlphas&&o.enable(12),E.vertexUv1s&&o.enable(13),E.vertexUv2s&&o.enable(14),E.vertexUv3s&&o.enable(15),E.vertexTangents&&o.enable(16),E.anisotropy&&o.enable(17),E.alphaHash&&o.enable(18),E.batching&&o.enable(19),y.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.skinning&&o.enable(4),E.morphTargets&&o.enable(5),E.morphNormals&&o.enable(6),E.morphColors&&o.enable(7),E.premultipliedAlpha&&o.enable(8),E.shadowMapEnabled&&o.enable(9),E.useLegacyLights&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),y.push(o.mask)}function v(y){const E=g[y.type];let k;if(E){const N=an[E];k=ad.clone(N.uniforms)}else k=y.uniforms;return k}function R(y,E){let k;for(let N=0,J=c.length;N<J;N++){const P=c[N];if(P.cacheKey===E){k=P,++k.usedTimes;break}}return k===void 0&&(k=new Mg(s,E,y,r),c.push(k)),k}function w(y){if(--y.usedTimes===0){const E=c.indexOf(y);c[E]=c[c.length-1],c.pop(),y.destroy()}}function A(y){l.remove(y)}function I(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:v,acquireProgram:R,releaseProgram:w,releaseShaderCache:A,programs:c,dispose:I}}function Tg(){let s=new WeakMap;function e(r){let a=s.get(r);return a===void 0&&(a={},s.set(r,a)),a}function t(r){s.delete(r)}function n(r,a,o){s.get(r)[a]=o}function i(){s=new WeakMap}return{get:e,remove:t,update:n,dispose:i}}function Ag(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Sl(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function bl(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function a(u,d,f,g,_,m){let p=s[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},s[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function o(u,d,f,g,_,m){const p=a(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function l(u,d,f,g,_,m){const p=a(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||Ag),n.length>1&&n.sort(d||Sl),i.length>1&&i.sort(d||Sl)}function h(){for(let u=e,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:o,unshift:l,finish:h,sort:c}}function Rg(){let s=new WeakMap;function e(n,i){const r=s.get(n);let a;return r===void 0?(a=new bl,s.set(n,[a])):i>=r.length?(a=new bl,r.push(a)):a=r[i],a}function t(){s=new WeakMap}return{get:e,dispose:t}}function Cg(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new C,color:new de};break;case"SpotLight":t={position:new C,direction:new C,color:new de,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new C,color:new de,distance:0,decay:0};break;case"HemisphereLight":t={direction:new C,skyColor:new de,groundColor:new de};break;case"RectAreaLight":t={color:new de,position:new C,halfWidth:new C,halfHeight:new C};break}return s[e.id]=t,t}}}function Lg(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Le,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let Pg=0;function Ig(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function Dg(s,e){const t=new Cg,n=Lg(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new C);const r=new C,a=new Ge,o=new Ge;function l(h,u){let d=0,f=0,g=0;for(let N=0;N<9;N++)i.probe[N].set(0,0,0);let _=0,m=0,p=0,M=0,x=0,v=0,R=0,w=0,A=0,I=0,y=0;h.sort(Ig);const E=u===!0?Math.PI:1;for(let N=0,J=h.length;N<J;N++){const P=h[N],z=P.color,V=P.intensity,j=P.distance,W=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)d+=z.r*V*E,f+=z.g*V*E,g+=z.b*V*E;else if(P.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(P.sh.coefficients[X],V);y++}else if(P.isDirectionalLight){const X=t.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity*E),P.castShadow){const $=P.shadow,te=n.get(P);te.shadowBias=$.bias,te.shadowNormalBias=$.normalBias,te.shadowRadius=$.radius,te.shadowMapSize=$.mapSize,i.directionalShadow[_]=te,i.directionalShadowMap[_]=W,i.directionalShadowMatrix[_]=P.shadow.matrix,v++}i.directional[_]=X,_++}else if(P.isSpotLight){const X=t.get(P);X.position.setFromMatrixPosition(P.matrixWorld),X.color.copy(z).multiplyScalar(V*E),X.distance=j,X.coneCos=Math.cos(P.angle),X.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),X.decay=P.decay,i.spot[p]=X;const $=P.shadow;if(P.map&&(i.spotLightMap[A]=P.map,A++,$.updateMatrices(P),P.castShadow&&I++),i.spotLightMatrix[p]=$.matrix,P.castShadow){const te=n.get(P);te.shadowBias=$.bias,te.shadowNormalBias=$.normalBias,te.shadowRadius=$.radius,te.shadowMapSize=$.mapSize,i.spotShadow[p]=te,i.spotShadowMap[p]=W,w++}p++}else if(P.isRectAreaLight){const X=t.get(P);X.color.copy(z).multiplyScalar(V),X.halfWidth.set(P.width*.5,0,0),X.halfHeight.set(0,P.height*.5,0),i.rectArea[M]=X,M++}else if(P.isPointLight){const X=t.get(P);if(X.color.copy(P.color).multiplyScalar(P.intensity*E),X.distance=P.distance,X.decay=P.decay,P.castShadow){const $=P.shadow,te=n.get(P);te.shadowBias=$.bias,te.shadowNormalBias=$.normalBias,te.shadowRadius=$.radius,te.shadowMapSize=$.mapSize,te.shadowCameraNear=$.camera.near,te.shadowCameraFar=$.camera.far,i.pointShadow[m]=te,i.pointShadowMap[m]=W,i.pointShadowMatrix[m]=P.shadow.matrix,R++}i.point[m]=X,m++}else if(P.isHemisphereLight){const X=t.get(P);X.skyColor.copy(P.color).multiplyScalar(V*E),X.groundColor.copy(P.groundColor).multiplyScalar(V*E),i.hemi[x]=X,x++}}M>0&&(e.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=se.LTC_FLOAT_1,i.rectAreaLTC2=se.LTC_FLOAT_2):(i.rectAreaLTC1=se.LTC_HALF_1,i.rectAreaLTC2=se.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=se.LTC_FLOAT_1,i.rectAreaLTC2=se.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=se.LTC_HALF_1,i.rectAreaLTC2=se.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=g;const k=i.hash;(k.directionalLength!==_||k.pointLength!==m||k.spotLength!==p||k.rectAreaLength!==M||k.hemiLength!==x||k.numDirectionalShadows!==v||k.numPointShadows!==R||k.numSpotShadows!==w||k.numSpotMaps!==A||k.numLightProbes!==y)&&(i.directional.length=_,i.spot.length=p,i.rectArea.length=M,i.point.length=m,i.hemi.length=x,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=R,i.pointShadowMap.length=R,i.spotShadow.length=w,i.spotShadowMap.length=w,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=R,i.spotLightMatrix.length=w+A-I,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=I,i.numLightProbes=y,k.directionalLength=_,k.pointLength=m,k.spotLength=p,k.rectAreaLength=M,k.hemiLength=x,k.numDirectionalShadows=v,k.numPointShadows=R,k.numSpotShadows=w,k.numSpotMaps=A,k.numLightProbes=y,i.version=Pg++)}function c(h,u){let d=0,f=0,g=0,_=0,m=0;const p=u.matrixWorldInverse;for(let M=0,x=h.length;M<x;M++){const v=h[M];if(v.isDirectionalLight){const R=i.directional[d];R.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(p),d++}else if(v.isSpotLight){const R=i.spot[g];R.position.setFromMatrixPosition(v.matrixWorld),R.position.applyMatrix4(p),R.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(p),g++}else if(v.isRectAreaLight){const R=i.rectArea[_];R.position.setFromMatrixPosition(v.matrixWorld),R.position.applyMatrix4(p),o.identity(),a.copy(v.matrixWorld),a.premultiply(p),o.extractRotation(a),R.halfWidth.set(v.width*.5,0,0),R.halfHeight.set(0,v.height*.5,0),R.halfWidth.applyMatrix4(o),R.halfHeight.applyMatrix4(o),_++}else if(v.isPointLight){const R=i.point[f];R.position.setFromMatrixPosition(v.matrixWorld),R.position.applyMatrix4(p),f++}else if(v.isHemisphereLight){const R=i.hemi[m];R.direction.setFromMatrixPosition(v.matrixWorld),R.direction.transformDirection(p),m++}}}return{setup:l,setupView:c,state:i}}function El(s,e){const t=new Dg(s,e),n=[],i=[];function r(){n.length=0,i.length=0}function a(u){n.push(u)}function o(u){i.push(u)}function l(u){t.setup(n,u)}function c(u){t.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:t},setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Ng(s,e){let t=new WeakMap;function n(r,a=0){const o=t.get(r);let l;return o===void 0?(l=new El(s,e),t.set(r,[l])):a>=o.length?(l=new El(s,e),o.push(l)):l=o[a],l}function i(){t=new WeakMap}return{get:n,dispose:i}}class Ug extends nn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Fg extends nn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Og=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,kg=`uniform sampler2D shadow_pass;
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
}`;function Bg(s,e,t){let n=new Ua;const i=new Le,r=new Le,a=new et,o=new Ug({depthPacking:vu}),l=new Fg,c={},h=t.maxTextureSize,u={[Mn]:Bt,[Bt]:Mn,[Ot]:Ot},d=new si({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Le},radius:{value:4}},vertexShader:Og,fragmentShader:kg}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Ut;g.setAttribute("position",new Nt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new xe(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=xc;let p=this.type;this.render=function(w,A,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const y=s.getRenderTarget(),E=s.getActiveCubeFace(),k=s.getActiveMipmapLevel(),N=s.state;N.setBlending(Fn),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);const J=p!==xn&&this.type===xn,P=p===xn&&this.type!==xn;for(let z=0,V=w.length;z<V;z++){const j=w[z],W=j.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",j,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;i.copy(W.mapSize);const X=W.getFrameExtents();if(i.multiply(X),r.copy(W.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/X.x),i.x=r.x*X.x,W.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/X.y),i.y=r.y*X.y,W.mapSize.y=r.y)),W.map===null||J===!0||P===!0){const te=this.type!==xn?{minFilter:Mt,magFilter:Mt}:{};W.map!==null&&W.map.dispose(),W.map=new ii(i.x,i.y,te),W.map.texture.name=j.name+".shadowMap",W.camera.updateProjectionMatrix()}s.setRenderTarget(W.map),s.clear();const $=W.getViewportCount();for(let te=0;te<$;te++){const ne=W.getViewport(te);a.set(r.x*ne.x,r.y*ne.y,r.x*ne.z,r.y*ne.w),N.viewport(a),W.updateMatrices(j,te),n=W.getFrustum(),v(A,I,W.camera,j,this.type)}W.isPointLightShadow!==!0&&this.type===xn&&M(W,I),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(y,E,k)};function M(w,A){const I=e.update(_);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ii(i.x,i.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,s.setRenderTarget(w.mapPass),s.clear(),s.renderBufferDirect(A,null,I,d,_,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,s.setRenderTarget(w.map),s.clear(),s.renderBufferDirect(A,null,I,f,_,null)}function x(w,A,I,y){let E=null;const k=I.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(k!==void 0)E=k;else if(E=I.isPointLight===!0?l:o,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const N=E.uuid,J=A.uuid;let P=c[N];P===void 0&&(P={},c[N]=P);let z=P[J];z===void 0&&(z=E.clone(),P[J]=z,A.addEventListener("dispose",R)),E=z}if(E.visible=A.visible,E.wireframe=A.wireframe,y===xn?E.side=A.shadowSide!==null?A.shadowSide:A.side:E.side=A.shadowSide!==null?A.shadowSide:u[A.side],E.alphaMap=A.alphaMap,E.alphaTest=A.alphaTest,E.map=A.map,E.clipShadows=A.clipShadows,E.clippingPlanes=A.clippingPlanes,E.clipIntersection=A.clipIntersection,E.displacementMap=A.displacementMap,E.displacementScale=A.displacementScale,E.displacementBias=A.displacementBias,E.wireframeLinewidth=A.wireframeLinewidth,E.linewidth=A.linewidth,I.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const N=s.properties.get(E);N.light=I}return E}function v(w,A,I,y,E){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&E===xn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,w.matrixWorld);const J=e.update(w),P=w.material;if(Array.isArray(P)){const z=J.groups;for(let V=0,j=z.length;V<j;V++){const W=z[V],X=P[W.materialIndex];if(X&&X.visible){const $=x(w,X,y,E);w.onBeforeShadow(s,w,A,I,J,$,W),s.renderBufferDirect(I,null,J,$,w,W),w.onAfterShadow(s,w,A,I,J,$,W)}}}else if(P.visible){const z=x(w,P,y,E);w.onBeforeShadow(s,w,A,I,J,z,null),s.renderBufferDirect(I,null,J,z,w,null),w.onAfterShadow(s,w,A,I,J,z,null)}}const N=w.children;for(let J=0,P=N.length;J<P;J++)v(N[J],A,I,y,E)}function R(w){w.target.removeEventListener("dispose",R);for(const I in c){const y=c[I],E=w.target.uuid;E in y&&(y[E].dispose(),delete y[E])}}}function zg(s,e,t){const n=t.isWebGL2;function i(){let L=!1;const re=new et;let ae=null;const we=new et(0,0,0,0);return{setMask:function(Me){ae!==Me&&!L&&(s.colorMask(Me,Me,Me,Me),ae=Me)},setLocked:function(Me){L=Me},setClear:function(Me,tt,nt,xt,Ct){Ct===!0&&(Me*=xt,tt*=xt,nt*=xt),re.set(Me,tt,nt,xt),we.equals(re)===!1&&(s.clearColor(Me,tt,nt,xt),we.copy(re))},reset:function(){L=!1,ae=null,we.set(-1,0,0,0)}}}function r(){let L=!1,re=null,ae=null,we=null;return{setTest:function(Me){Me?De(s.DEPTH_TEST):Ee(s.DEPTH_TEST)},setMask:function(Me){re!==Me&&!L&&(s.depthMask(Me),re=Me)},setFunc:function(Me){if(ae!==Me){switch(Me){case qh:s.depthFunc(s.NEVER);break;case Xh:s.depthFunc(s.ALWAYS);break;case jh:s.depthFunc(s.LESS);break;case Ys:s.depthFunc(s.LEQUAL);break;case $h:s.depthFunc(s.EQUAL);break;case Yh:s.depthFunc(s.GEQUAL);break;case Kh:s.depthFunc(s.GREATER);break;case Zh:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}ae=Me}},setLocked:function(Me){L=Me},setClear:function(Me){we!==Me&&(s.clearDepth(Me),we=Me)},reset:function(){L=!1,re=null,ae=null,we=null}}}function a(){let L=!1,re=null,ae=null,we=null,Me=null,tt=null,nt=null,xt=null,Ct=null;return{setTest:function(it){L||(it?De(s.STENCIL_TEST):Ee(s.STENCIL_TEST))},setMask:function(it){re!==it&&!L&&(s.stencilMask(it),re=it)},setFunc:function(it,Lt,rn){(ae!==it||we!==Lt||Me!==rn)&&(s.stencilFunc(it,Lt,rn),ae=it,we=Lt,Me=rn)},setOp:function(it,Lt,rn){(tt!==it||nt!==Lt||xt!==rn)&&(s.stencilOp(it,Lt,rn),tt=it,nt=Lt,xt=rn)},setLocked:function(it){L=it},setClear:function(it){Ct!==it&&(s.clearStencil(it),Ct=it)},reset:function(){L=!1,re=null,ae=null,we=null,Me=null,tt=null,nt=null,xt=null,Ct=null}}}const o=new i,l=new r,c=new a,h=new WeakMap,u=new WeakMap;let d={},f={},g=new WeakMap,_=[],m=null,p=!1,M=null,x=null,v=null,R=null,w=null,A=null,I=null,y=new de(0,0,0),E=0,k=!1,N=null,J=null,P=null,z=null,V=null;const j=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,X=0;const $=s.getParameter(s.VERSION);$.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec($)[1]),W=X>=1):$.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec($)[1]),W=X>=2);let te=null,ne={};const G=s.getParameter(s.SCISSOR_BOX),Y=s.getParameter(s.VIEWPORT),le=new et().fromArray(G),_e=new et().fromArray(Y);function ge(L,re,ae,we){const Me=new Uint8Array(4),tt=s.createTexture();s.bindTexture(L,tt),s.texParameteri(L,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(L,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let nt=0;nt<ae;nt++)n&&(L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY)?s.texImage3D(re,0,s.RGBA,1,1,we,0,s.RGBA,s.UNSIGNED_BYTE,Me):s.texImage2D(re+nt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Me);return tt}const Pe={};Pe[s.TEXTURE_2D]=ge(s.TEXTURE_2D,s.TEXTURE_2D,1),Pe[s.TEXTURE_CUBE_MAP]=ge(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Pe[s.TEXTURE_2D_ARRAY]=ge(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Pe[s.TEXTURE_3D]=ge(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),l.setClear(1),c.setClear(0),De(s.DEPTH_TEST),l.setFunc(Ys),Fe(!1),T(ro),De(s.CULL_FACE),fe(Fn);function De(L){d[L]!==!0&&(s.enable(L),d[L]=!0)}function Ee(L){d[L]!==!1&&(s.disable(L),d[L]=!1)}function qe(L,re){return f[L]!==re?(s.bindFramebuffer(L,re),f[L]=re,n&&(L===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=re),L===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=re)),!0):!1}function U(L,re){let ae=_,we=!1;if(L)if(ae=g.get(re),ae===void 0&&(ae=[],g.set(re,ae)),L.isWebGLMultipleRenderTargets){const Me=L.texture;if(ae.length!==Me.length||ae[0]!==s.COLOR_ATTACHMENT0){for(let tt=0,nt=Me.length;tt<nt;tt++)ae[tt]=s.COLOR_ATTACHMENT0+tt;ae.length=Me.length,we=!0}}else ae[0]!==s.COLOR_ATTACHMENT0&&(ae[0]=s.COLOR_ATTACHMENT0,we=!0);else ae[0]!==s.BACK&&(ae[0]=s.BACK,we=!0);we&&(t.isWebGL2?s.drawBuffers(ae):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ae))}function Rt(L){return m!==L?(s.useProgram(L),m=L,!0):!1}const ye={[jn]:s.FUNC_ADD,[Lh]:s.FUNC_SUBTRACT,[Ph]:s.FUNC_REVERSE_SUBTRACT};if(n)ye[co]=s.MIN,ye[ho]=s.MAX;else{const L=e.get("EXT_blend_minmax");L!==null&&(ye[co]=L.MIN_EXT,ye[ho]=L.MAX_EXT)}const Re={[Ih]:s.ZERO,[Dh]:s.ONE,[Nh]:s.SRC_COLOR,[ra]:s.SRC_ALPHA,[zh]:s.SRC_ALPHA_SATURATE,[kh]:s.DST_COLOR,[Fh]:s.DST_ALPHA,[Uh]:s.ONE_MINUS_SRC_COLOR,[aa]:s.ONE_MINUS_SRC_ALPHA,[Bh]:s.ONE_MINUS_DST_COLOR,[Oh]:s.ONE_MINUS_DST_ALPHA,[Hh]:s.CONSTANT_COLOR,[Gh]:s.ONE_MINUS_CONSTANT_COLOR,[Vh]:s.CONSTANT_ALPHA,[Wh]:s.ONE_MINUS_CONSTANT_ALPHA};function fe(L,re,ae,we,Me,tt,nt,xt,Ct,it){if(L===Fn){p===!0&&(Ee(s.BLEND),p=!1);return}if(p===!1&&(De(s.BLEND),p=!0),L!==Ch){if(L!==M||it!==k){if((x!==jn||w!==jn)&&(s.blendEquation(s.FUNC_ADD),x=jn,w=jn),it)switch(L){case Di:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ao:s.blendFunc(s.ONE,s.ONE);break;case oo:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case lo:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Di:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ao:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case oo:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case lo:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}v=null,R=null,A=null,I=null,y.set(0,0,0),E=0,M=L,k=it}return}Me=Me||re,tt=tt||ae,nt=nt||we,(re!==x||Me!==w)&&(s.blendEquationSeparate(ye[re],ye[Me]),x=re,w=Me),(ae!==v||we!==R||tt!==A||nt!==I)&&(s.blendFuncSeparate(Re[ae],Re[we],Re[tt],Re[nt]),v=ae,R=we,A=tt,I=nt),(xt.equals(y)===!1||Ct!==E)&&(s.blendColor(xt.r,xt.g,xt.b,Ct),y.copy(xt),E=Ct),M=L,k=!1}function lt(L,re){L.side===Ot?Ee(s.CULL_FACE):De(s.CULL_FACE);let ae=L.side===Bt;re&&(ae=!ae),Fe(ae),L.blending===Di&&L.transparent===!1?fe(Fn):fe(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),l.setFunc(L.depthFunc),l.setTest(L.depthTest),l.setMask(L.depthWrite),o.setMask(L.colorWrite);const we=L.stencilWrite;c.setTest(we),we&&(c.setMask(L.stencilWriteMask),c.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),c.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),O(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?De(s.SAMPLE_ALPHA_TO_COVERAGE):Ee(s.SAMPLE_ALPHA_TO_COVERAGE)}function Fe(L){N!==L&&(L?s.frontFace(s.CW):s.frontFace(s.CCW),N=L)}function T(L){L!==Ah?(De(s.CULL_FACE),L!==J&&(L===ro?s.cullFace(s.BACK):L===Rh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ee(s.CULL_FACE),J=L}function S(L){L!==P&&(W&&s.lineWidth(L),P=L)}function O(L,re,ae){L?(De(s.POLYGON_OFFSET_FILL),(z!==re||V!==ae)&&(s.polygonOffset(re,ae),z=re,V=ae)):Ee(s.POLYGON_OFFSET_FILL)}function Q(L){L?De(s.SCISSOR_TEST):Ee(s.SCISSOR_TEST)}function Z(L){L===void 0&&(L=s.TEXTURE0+j-1),te!==L&&(s.activeTexture(L),te=L)}function ee(L,re,ae){ae===void 0&&(te===null?ae=s.TEXTURE0+j-1:ae=te);let we=ne[ae];we===void 0&&(we={type:void 0,texture:void 0},ne[ae]=we),(we.type!==L||we.texture!==re)&&(te!==ae&&(s.activeTexture(ae),te=ae),s.bindTexture(L,re||Pe[L]),we.type=L,we.texture=re)}function pe(){const L=ne[te];L!==void 0&&L.type!==void 0&&(s.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function oe(){try{s.compressedTexImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function he(){try{s.compressedTexImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function be(){try{s.texSubImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Oe(){try{s.texSubImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function K(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Je(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ve(){try{s.texStorage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ae(){try{s.texStorage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ve(){try{s.texImage2D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ue(){try{s.texImage3D.apply(s,arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ne(L){le.equals(L)===!1&&(s.scissor(L.x,L.y,L.z,L.w),le.copy(L))}function Ze(L){_e.equals(L)===!1&&(s.viewport(L.x,L.y,L.z,L.w),_e.copy(L))}function ut(L,re){let ae=u.get(re);ae===void 0&&(ae=new WeakMap,u.set(re,ae));let we=ae.get(L);we===void 0&&(we=s.getUniformBlockIndex(re,L.name),ae.set(L,we))}function Be(L,re){const we=u.get(re).get(L);h.get(re)!==we&&(s.uniformBlockBinding(re,we,L.__bindingPointIndex),h.set(re,we))}function ie(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),d={},te=null,ne={},f={},g=new WeakMap,_=[],m=null,p=!1,M=null,x=null,v=null,R=null,w=null,A=null,I=null,y=new de(0,0,0),E=0,k=!1,N=null,J=null,P=null,z=null,V=null,le.set(0,0,s.canvas.width,s.canvas.height),_e.set(0,0,s.canvas.width,s.canvas.height),o.reset(),l.reset(),c.reset()}return{buffers:{color:o,depth:l,stencil:c},enable:De,disable:Ee,bindFramebuffer:qe,drawBuffers:U,useProgram:Rt,setBlending:fe,setMaterial:lt,setFlipSided:Fe,setCullFace:T,setLineWidth:S,setPolygonOffset:O,setScissorTest:Q,activeTexture:Z,bindTexture:ee,unbindTexture:pe,compressedTexImage2D:oe,compressedTexImage3D:he,texImage2D:ve,texImage3D:ue,updateUBOMapping:ut,uniformBlockBinding:Be,texStorage2D:Ve,texStorage3D:Ae,texSubImage2D:be,texSubImage3D:Oe,compressedTexSubImage2D:K,compressedTexSubImage3D:Je,scissor:Ne,viewport:Ze,reset:ie}}function Hg(s,e,t,n,i,r,a){const o=i.isWebGL2,l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,S){return f?new OffscreenCanvas(T,S):cs("canvas")}function _(T,S,O,Q){let Z=1;if((T.width>Q||T.height>Q)&&(Z=Q/Math.max(T.width,T.height)),Z<1||S===!0)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap){const ee=S?nr:Math.floor,pe=ee(Z*T.width),oe=ee(Z*T.height);u===void 0&&(u=g(pe,oe));const he=O?g(pe,oe):u;return he.width=pe,he.height=oe,he.getContext("2d").drawImage(T,0,0,pe,oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+T.width+"x"+T.height+") to ("+pe+"x"+oe+")."),he}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+T.width+"x"+T.height+")."),T;return T}function m(T){return fa(T.width)&&fa(T.height)}function p(T){return o?!1:T.wrapS!==Xt||T.wrapT!==Xt||T.minFilter!==Mt&&T.minFilter!==Ft}function M(T,S){return T.generateMipmaps&&S&&T.minFilter!==Mt&&T.minFilter!==Ft}function x(T){s.generateMipmap(T)}function v(T,S,O,Q,Z=!1){if(o===!1)return S;if(T!==null){if(s[T]!==void 0)return s[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let ee=S;if(S===s.RED&&(O===s.FLOAT&&(ee=s.R32F),O===s.HALF_FLOAT&&(ee=s.R16F),O===s.UNSIGNED_BYTE&&(ee=s.R8)),S===s.RED_INTEGER&&(O===s.UNSIGNED_BYTE&&(ee=s.R8UI),O===s.UNSIGNED_SHORT&&(ee=s.R16UI),O===s.UNSIGNED_INT&&(ee=s.R32UI),O===s.BYTE&&(ee=s.R8I),O===s.SHORT&&(ee=s.R16I),O===s.INT&&(ee=s.R32I)),S===s.RG&&(O===s.FLOAT&&(ee=s.RG32F),O===s.HALF_FLOAT&&(ee=s.RG16F),O===s.UNSIGNED_BYTE&&(ee=s.RG8)),S===s.RGBA){const pe=Z?Js:Ye.getTransfer(Q);O===s.FLOAT&&(ee=s.RGBA32F),O===s.HALF_FLOAT&&(ee=s.RGBA16F),O===s.UNSIGNED_BYTE&&(ee=pe===st?s.SRGB8_ALPHA8:s.RGBA8),O===s.UNSIGNED_SHORT_4_4_4_4&&(ee=s.RGBA4),O===s.UNSIGNED_SHORT_5_5_5_1&&(ee=s.RGB5_A1)}return(ee===s.R16F||ee===s.R32F||ee===s.RG16F||ee===s.RG32F||ee===s.RGBA16F||ee===s.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function R(T,S,O){return M(T,O)===!0||T.isFramebufferTexture&&T.minFilter!==Mt&&T.minFilter!==Ft?Math.log2(Math.max(S.width,S.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?S.mipmaps.length:1}function w(T){return T===Mt||T===ca||T===qs?s.NEAREST:s.LINEAR}function A(T){const S=T.target;S.removeEventListener("dispose",A),y(S),S.isVideoTexture&&h.delete(S)}function I(T){const S=T.target;S.removeEventListener("dispose",I),k(S)}function y(T){const S=n.get(T);if(S.__webglInit===void 0)return;const O=T.source,Q=d.get(O);if(Q){const Z=Q[S.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&E(T),Object.keys(Q).length===0&&d.delete(O)}n.remove(T)}function E(T){const S=n.get(T);s.deleteTexture(S.__webglTexture);const O=T.source,Q=d.get(O);delete Q[S.__cacheKey],a.memory.textures--}function k(T){const S=T.texture,O=n.get(T),Q=n.get(S);if(Q.__webglTexture!==void 0&&(s.deleteTexture(Q.__webglTexture),a.memory.textures--),T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(O.__webglFramebuffer[Z]))for(let ee=0;ee<O.__webglFramebuffer[Z].length;ee++)s.deleteFramebuffer(O.__webglFramebuffer[Z][ee]);else s.deleteFramebuffer(O.__webglFramebuffer[Z]);O.__webglDepthbuffer&&s.deleteRenderbuffer(O.__webglDepthbuffer[Z])}else{if(Array.isArray(O.__webglFramebuffer))for(let Z=0;Z<O.__webglFramebuffer.length;Z++)s.deleteFramebuffer(O.__webglFramebuffer[Z]);else s.deleteFramebuffer(O.__webglFramebuffer);if(O.__webglDepthbuffer&&s.deleteRenderbuffer(O.__webglDepthbuffer),O.__webglMultisampledFramebuffer&&s.deleteFramebuffer(O.__webglMultisampledFramebuffer),O.__webglColorRenderbuffer)for(let Z=0;Z<O.__webglColorRenderbuffer.length;Z++)O.__webglColorRenderbuffer[Z]&&s.deleteRenderbuffer(O.__webglColorRenderbuffer[Z]);O.__webglDepthRenderbuffer&&s.deleteRenderbuffer(O.__webglDepthRenderbuffer)}if(T.isWebGLMultipleRenderTargets)for(let Z=0,ee=S.length;Z<ee;Z++){const pe=n.get(S[Z]);pe.__webglTexture&&(s.deleteTexture(pe.__webglTexture),a.memory.textures--),n.remove(S[Z])}n.remove(S),n.remove(T)}let N=0;function J(){N=0}function P(){const T=N;return T>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+i.maxTextures),N+=1,T}function z(T){const S=[];return S.push(T.wrapS),S.push(T.wrapT),S.push(T.wrapR||0),S.push(T.magFilter),S.push(T.minFilter),S.push(T.anisotropy),S.push(T.internalFormat),S.push(T.format),S.push(T.type),S.push(T.generateMipmaps),S.push(T.premultiplyAlpha),S.push(T.flipY),S.push(T.unpackAlignment),S.push(T.colorSpace),S.join()}function V(T,S){const O=n.get(T);if(T.isVideoTexture&&lt(T),T.isRenderTargetTexture===!1&&T.version>0&&O.__version!==T.version){const Q=T.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{le(O,T,S);return}}t.bindTexture(s.TEXTURE_2D,O.__webglTexture,s.TEXTURE0+S)}function j(T,S){const O=n.get(T);if(T.version>0&&O.__version!==T.version){le(O,T,S);return}t.bindTexture(s.TEXTURE_2D_ARRAY,O.__webglTexture,s.TEXTURE0+S)}function W(T,S){const O=n.get(T);if(T.version>0&&O.__version!==T.version){le(O,T,S);return}t.bindTexture(s.TEXTURE_3D,O.__webglTexture,s.TEXTURE0+S)}function X(T,S){const O=n.get(T);if(T.version>0&&O.__version!==T.version){_e(O,T,S);return}t.bindTexture(s.TEXTURE_CUBE_MAP,O.__webglTexture,s.TEXTURE0+S)}const $={[ti]:s.REPEAT,[Xt]:s.CLAMP_TO_EDGE,[Ks]:s.MIRRORED_REPEAT},te={[Mt]:s.NEAREST,[ca]:s.NEAREST_MIPMAP_NEAREST,[qs]:s.NEAREST_MIPMAP_LINEAR,[Ft]:s.LINEAR,[Mc]:s.LINEAR_MIPMAP_NEAREST,[ni]:s.LINEAR_MIPMAP_LINEAR},ne={[Mu]:s.NEVER,[Au]:s.ALWAYS,[Su]:s.LESS,[Dc]:s.LEQUAL,[bu]:s.EQUAL,[Tu]:s.GEQUAL,[Eu]:s.GREATER,[wu]:s.NOTEQUAL};function G(T,S,O){if(O?(s.texParameteri(T,s.TEXTURE_WRAP_S,$[S.wrapS]),s.texParameteri(T,s.TEXTURE_WRAP_T,$[S.wrapT]),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,$[S.wrapR]),s.texParameteri(T,s.TEXTURE_MAG_FILTER,te[S.magFilter]),s.texParameteri(T,s.TEXTURE_MIN_FILTER,te[S.minFilter])):(s.texParameteri(T,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(T,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(S.wrapS!==Xt||S.wrapT!==Xt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(T,s.TEXTURE_MAG_FILTER,w(S.magFilter)),s.texParameteri(T,s.TEXTURE_MIN_FILTER,w(S.minFilter)),S.minFilter!==Mt&&S.minFilter!==Ft&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),S.compareFunction&&(s.texParameteri(T,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(T,s.TEXTURE_COMPARE_FUNC,ne[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const Q=e.get("EXT_texture_filter_anisotropic");if(S.magFilter===Mt||S.minFilter!==qs&&S.minFilter!==ni||S.type===vn&&e.has("OES_texture_float_linear")===!1||o===!1&&S.type===os&&e.has("OES_texture_half_float_linear")===!1)return;(S.anisotropy>1||n.get(S).__currentAnisotropy)&&(s.texParameterf(T,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,i.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy)}}function Y(T,S){let O=!1;T.__webglInit===void 0&&(T.__webglInit=!0,S.addEventListener("dispose",A));const Q=S.source;let Z=d.get(Q);Z===void 0&&(Z={},d.set(Q,Z));const ee=z(S);if(ee!==T.__cacheKey){Z[ee]===void 0&&(Z[ee]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,O=!0),Z[ee].usedTimes++;const pe=Z[T.__cacheKey];pe!==void 0&&(Z[T.__cacheKey].usedTimes--,pe.usedTimes===0&&E(S)),T.__cacheKey=ee,T.__webglTexture=Z[ee].texture}return O}function le(T,S,O){let Q=s.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Q=s.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Q=s.TEXTURE_3D);const Z=Y(T,S),ee=S.source;t.bindTexture(Q,T.__webglTexture,s.TEXTURE0+O);const pe=n.get(ee);if(ee.version!==pe.__version||Z===!0){t.activeTexture(s.TEXTURE0+O);const oe=Ye.getPrimaries(Ye.workingColorSpace),he=S.colorSpace===$t?null:Ye.getPrimaries(S.colorSpace),be=S.colorSpace===$t||oe===he?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);const Oe=p(S)&&m(S.image)===!1;let K=_(S.image,Oe,!1,i.maxTextureSize);K=Fe(S,K);const Je=m(K)||o,Ve=r.convert(S.format,S.colorSpace);let Ae=r.convert(S.type),ve=v(S.internalFormat,Ve,Ae,S.colorSpace,S.isVideoTexture);G(Q,S,Je);let ue;const Ne=S.mipmaps,Ze=o&&S.isVideoTexture!==!0&&ve!==Rc,ut=pe.__version===void 0||Z===!0,Be=R(S,K,Je);if(S.isDepthTexture)ve=s.DEPTH_COMPONENT,o?S.type===vn?ve=s.DEPTH_COMPONENT32F:S.type===Nn?ve=s.DEPTH_COMPONENT24:S.type===Yn?ve=s.DEPTH24_STENCIL8:ve=s.DEPTH_COMPONENT16:S.type===vn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),S.format===Kn&&ve===s.DEPTH_COMPONENT&&S.type!==Ca&&S.type!==Nn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),S.type=Nn,Ae=r.convert(S.type)),S.format===ki&&ve===s.DEPTH_COMPONENT&&(ve=s.DEPTH_STENCIL,S.type!==Yn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),S.type=Yn,Ae=r.convert(S.type))),ut&&(Ze?t.texStorage2D(s.TEXTURE_2D,1,ve,K.width,K.height):t.texImage2D(s.TEXTURE_2D,0,ve,K.width,K.height,0,Ve,Ae,null));else if(S.isDataTexture)if(Ne.length>0&&Je){Ze&&ut&&t.texStorage2D(s.TEXTURE_2D,Be,ve,Ne[0].width,Ne[0].height);for(let ie=0,L=Ne.length;ie<L;ie++)ue=Ne[ie],Ze?t.texSubImage2D(s.TEXTURE_2D,ie,0,0,ue.width,ue.height,Ve,Ae,ue.data):t.texImage2D(s.TEXTURE_2D,ie,ve,ue.width,ue.height,0,Ve,Ae,ue.data);S.generateMipmaps=!1}else Ze?(ut&&t.texStorage2D(s.TEXTURE_2D,Be,ve,K.width,K.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,K.width,K.height,Ve,Ae,K.data)):t.texImage2D(s.TEXTURE_2D,0,ve,K.width,K.height,0,Ve,Ae,K.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Ze&&ut&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Be,ve,Ne[0].width,Ne[0].height,K.depth);for(let ie=0,L=Ne.length;ie<L;ie++)ue=Ne[ie],S.format!==jt?Ve!==null?Ze?t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ie,0,0,0,ue.width,ue.height,K.depth,Ve,ue.data,0,0):t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ie,ve,ue.width,ue.height,K.depth,0,ue.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ze?t.texSubImage3D(s.TEXTURE_2D_ARRAY,ie,0,0,0,ue.width,ue.height,K.depth,Ve,Ae,ue.data):t.texImage3D(s.TEXTURE_2D_ARRAY,ie,ve,ue.width,ue.height,K.depth,0,Ve,Ae,ue.data)}else{Ze&&ut&&t.texStorage2D(s.TEXTURE_2D,Be,ve,Ne[0].width,Ne[0].height);for(let ie=0,L=Ne.length;ie<L;ie++)ue=Ne[ie],S.format!==jt?Ve!==null?Ze?t.compressedTexSubImage2D(s.TEXTURE_2D,ie,0,0,ue.width,ue.height,Ve,ue.data):t.compressedTexImage2D(s.TEXTURE_2D,ie,ve,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ze?t.texSubImage2D(s.TEXTURE_2D,ie,0,0,ue.width,ue.height,Ve,Ae,ue.data):t.texImage2D(s.TEXTURE_2D,ie,ve,ue.width,ue.height,0,Ve,Ae,ue.data)}else if(S.isDataArrayTexture)Ze?(ut&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Be,ve,K.width,K.height,K.depth),t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,Ve,Ae,K.data)):t.texImage3D(s.TEXTURE_2D_ARRAY,0,ve,K.width,K.height,K.depth,0,Ve,Ae,K.data);else if(S.isData3DTexture)Ze?(ut&&t.texStorage3D(s.TEXTURE_3D,Be,ve,K.width,K.height,K.depth),t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,Ve,Ae,K.data)):t.texImage3D(s.TEXTURE_3D,0,ve,K.width,K.height,K.depth,0,Ve,Ae,K.data);else if(S.isFramebufferTexture){if(ut)if(Ze)t.texStorage2D(s.TEXTURE_2D,Be,ve,K.width,K.height);else{let ie=K.width,L=K.height;for(let re=0;re<Be;re++)t.texImage2D(s.TEXTURE_2D,re,ve,ie,L,0,Ve,Ae,null),ie>>=1,L>>=1}}else if(Ne.length>0&&Je){Ze&&ut&&t.texStorage2D(s.TEXTURE_2D,Be,ve,Ne[0].width,Ne[0].height);for(let ie=0,L=Ne.length;ie<L;ie++)ue=Ne[ie],Ze?t.texSubImage2D(s.TEXTURE_2D,ie,0,0,Ve,Ae,ue):t.texImage2D(s.TEXTURE_2D,ie,ve,Ve,Ae,ue);S.generateMipmaps=!1}else Ze?(ut&&t.texStorage2D(s.TEXTURE_2D,Be,ve,K.width,K.height),t.texSubImage2D(s.TEXTURE_2D,0,0,0,Ve,Ae,K)):t.texImage2D(s.TEXTURE_2D,0,ve,Ve,Ae,K);M(S,Je)&&x(Q),pe.__version=ee.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function _e(T,S,O){if(S.image.length!==6)return;const Q=Y(T,S),Z=S.source;t.bindTexture(s.TEXTURE_CUBE_MAP,T.__webglTexture,s.TEXTURE0+O);const ee=n.get(Z);if(Z.version!==ee.__version||Q===!0){t.activeTexture(s.TEXTURE0+O);const pe=Ye.getPrimaries(Ye.workingColorSpace),oe=S.colorSpace===$t?null:Ye.getPrimaries(S.colorSpace),he=S.colorSpace===$t||pe===oe?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,S.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,S.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,he);const be=S.isCompressedTexture||S.image[0].isCompressedTexture,Oe=S.image[0]&&S.image[0].isDataTexture,K=[];for(let ie=0;ie<6;ie++)!be&&!Oe?K[ie]=_(S.image[ie],!1,!0,i.maxCubemapSize):K[ie]=Oe?S.image[ie].image:S.image[ie],K[ie]=Fe(S,K[ie]);const Je=K[0],Ve=m(Je)||o,Ae=r.convert(S.format,S.colorSpace),ve=r.convert(S.type),ue=v(S.internalFormat,Ae,ve,S.colorSpace),Ne=o&&S.isVideoTexture!==!0,Ze=ee.__version===void 0||Q===!0;let ut=R(S,Je,Ve);G(s.TEXTURE_CUBE_MAP,S,Ve);let Be;if(be){Ne&&Ze&&t.texStorage2D(s.TEXTURE_CUBE_MAP,ut,ue,Je.width,Je.height);for(let ie=0;ie<6;ie++){Be=K[ie].mipmaps;for(let L=0;L<Be.length;L++){const re=Be[L];S.format!==jt?Ae!==null?Ne?t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L,0,0,re.width,re.height,Ae,re.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L,ue,re.width,re.height,0,re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ne?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L,0,0,re.width,re.height,Ae,ve,re.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L,ue,re.width,re.height,0,Ae,ve,re.data)}}}else{Be=S.mipmaps,Ne&&Ze&&(Be.length>0&&ut++,t.texStorage2D(s.TEXTURE_CUBE_MAP,ut,ue,K[0].width,K[0].height));for(let ie=0;ie<6;ie++)if(Oe){Ne?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,K[ie].width,K[ie].height,Ae,ve,K[ie].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,ue,K[ie].width,K[ie].height,0,Ae,ve,K[ie].data);for(let L=0;L<Be.length;L++){const ae=Be[L].image[ie].image;Ne?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L+1,0,0,ae.width,ae.height,Ae,ve,ae.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L+1,ue,ae.width,ae.height,0,Ae,ve,ae.data)}}else{Ne?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Ae,ve,K[ie]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,ue,Ae,ve,K[ie]);for(let L=0;L<Be.length;L++){const re=Be[L];Ne?t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L+1,0,0,Ae,ve,re.image[ie]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ie,L+1,ue,Ae,ve,re.image[ie])}}}M(S,Ve)&&x(s.TEXTURE_CUBE_MAP),ee.__version=Z.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function ge(T,S,O,Q,Z,ee){const pe=r.convert(O.format,O.colorSpace),oe=r.convert(O.type),he=v(O.internalFormat,pe,oe,O.colorSpace);if(!n.get(S).__hasExternalTextures){const Oe=Math.max(1,S.width>>ee),K=Math.max(1,S.height>>ee);Z===s.TEXTURE_3D||Z===s.TEXTURE_2D_ARRAY?t.texImage3D(Z,ee,he,Oe,K,S.depth,0,pe,oe,null):t.texImage2D(Z,ee,he,Oe,K,0,pe,oe,null)}t.bindFramebuffer(s.FRAMEBUFFER,T),fe(S)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Q,Z,n.get(O).__webglTexture,0,Re(S)):(Z===s.TEXTURE_2D||Z>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Q,Z,n.get(O).__webglTexture,ee),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Pe(T,S,O){if(s.bindRenderbuffer(s.RENDERBUFFER,T),S.depthBuffer&&!S.stencilBuffer){let Q=o===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(O||fe(S)){const Z=S.depthTexture;Z&&Z.isDepthTexture&&(Z.type===vn?Q=s.DEPTH_COMPONENT32F:Z.type===Nn&&(Q=s.DEPTH_COMPONENT24));const ee=Re(S);fe(S)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ee,Q,S.width,S.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,ee,Q,S.width,S.height)}else s.renderbufferStorage(s.RENDERBUFFER,Q,S.width,S.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,T)}else if(S.depthBuffer&&S.stencilBuffer){const Q=Re(S);O&&fe(S)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Q,s.DEPTH24_STENCIL8,S.width,S.height):fe(S)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Q,s.DEPTH24_STENCIL8,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,S.width,S.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,T)}else{const Q=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let Z=0;Z<Q.length;Z++){const ee=Q[Z],pe=r.convert(ee.format,ee.colorSpace),oe=r.convert(ee.type),he=v(ee.internalFormat,pe,oe,ee.colorSpace),be=Re(S);O&&fe(S)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,be,he,S.width,S.height):fe(S)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,be,he,S.width,S.height):s.renderbufferStorage(s.RENDERBUFFER,he,S.width,S.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function De(T,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,T),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),V(S.depthTexture,0);const Q=n.get(S.depthTexture).__webglTexture,Z=Re(S);if(S.depthTexture.format===Kn)fe(S)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0,Z):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Q,0);else if(S.depthTexture.format===ki)fe(S)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0,Z):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Q,0);else throw new Error("Unknown depthTexture format")}function Ee(T){const S=n.get(T),O=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!S.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");De(S.__webglFramebuffer,T)}else if(O){S.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer[Q]),S.__webglDepthbuffer[Q]=s.createRenderbuffer(),Pe(S.__webglDepthbuffer[Q],T,!1)}else t.bindFramebuffer(s.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=s.createRenderbuffer(),Pe(S.__webglDepthbuffer,T,!1);t.bindFramebuffer(s.FRAMEBUFFER,null)}function qe(T,S,O){const Q=n.get(T);S!==void 0&&ge(Q.__webglFramebuffer,T,T.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),O!==void 0&&Ee(T)}function U(T){const S=T.texture,O=n.get(T),Q=n.get(S);T.addEventListener("dispose",I),T.isWebGLMultipleRenderTargets!==!0&&(Q.__webglTexture===void 0&&(Q.__webglTexture=s.createTexture()),Q.__version=S.version,a.memory.textures++);const Z=T.isWebGLCubeRenderTarget===!0,ee=T.isWebGLMultipleRenderTargets===!0,pe=m(T)||o;if(Z){O.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(o&&S.mipmaps&&S.mipmaps.length>0){O.__webglFramebuffer[oe]=[];for(let he=0;he<S.mipmaps.length;he++)O.__webglFramebuffer[oe][he]=s.createFramebuffer()}else O.__webglFramebuffer[oe]=s.createFramebuffer()}else{if(o&&S.mipmaps&&S.mipmaps.length>0){O.__webglFramebuffer=[];for(let oe=0;oe<S.mipmaps.length;oe++)O.__webglFramebuffer[oe]=s.createFramebuffer()}else O.__webglFramebuffer=s.createFramebuffer();if(ee)if(i.drawBuffers){const oe=T.texture;for(let he=0,be=oe.length;he<be;he++){const Oe=n.get(oe[he]);Oe.__webglTexture===void 0&&(Oe.__webglTexture=s.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&T.samples>0&&fe(T)===!1){const oe=ee?S:[S];O.__webglMultisampledFramebuffer=s.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let he=0;he<oe.length;he++){const be=oe[he];O.__webglColorRenderbuffer[he]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,O.__webglColorRenderbuffer[he]);const Oe=r.convert(be.format,be.colorSpace),K=r.convert(be.type),Je=v(be.internalFormat,Oe,K,be.colorSpace,T.isXRRenderTarget===!0),Ve=Re(T);s.renderbufferStorageMultisample(s.RENDERBUFFER,Ve,Je,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+he,s.RENDERBUFFER,O.__webglColorRenderbuffer[he])}s.bindRenderbuffer(s.RENDERBUFFER,null),T.depthBuffer&&(O.__webglDepthRenderbuffer=s.createRenderbuffer(),Pe(O.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(Z){t.bindTexture(s.TEXTURE_CUBE_MAP,Q.__webglTexture),G(s.TEXTURE_CUBE_MAP,S,pe);for(let oe=0;oe<6;oe++)if(o&&S.mipmaps&&S.mipmaps.length>0)for(let he=0;he<S.mipmaps.length;he++)ge(O.__webglFramebuffer[oe][he],T,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+oe,he);else ge(O.__webglFramebuffer[oe],T,S,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);M(S,pe)&&x(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ee){const oe=T.texture;for(let he=0,be=oe.length;he<be;he++){const Oe=oe[he],K=n.get(Oe);t.bindTexture(s.TEXTURE_2D,K.__webglTexture),G(s.TEXTURE_2D,Oe,pe),ge(O.__webglFramebuffer,T,Oe,s.COLOR_ATTACHMENT0+he,s.TEXTURE_2D,0),M(Oe,pe)&&x(s.TEXTURE_2D)}t.unbindTexture()}else{let oe=s.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(o?oe=T.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(oe,Q.__webglTexture),G(oe,S,pe),o&&S.mipmaps&&S.mipmaps.length>0)for(let he=0;he<S.mipmaps.length;he++)ge(O.__webglFramebuffer[he],T,S,s.COLOR_ATTACHMENT0,oe,he);else ge(O.__webglFramebuffer,T,S,s.COLOR_ATTACHMENT0,oe,0);M(S,pe)&&x(oe),t.unbindTexture()}T.depthBuffer&&Ee(T)}function Rt(T){const S=m(T)||o,O=T.isWebGLMultipleRenderTargets===!0?T.texture:[T.texture];for(let Q=0,Z=O.length;Q<Z;Q++){const ee=O[Q];if(M(ee,S)){const pe=T.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,oe=n.get(ee).__webglTexture;t.bindTexture(pe,oe),x(pe),t.unbindTexture()}}}function ye(T){if(o&&T.samples>0&&fe(T)===!1){const S=T.isWebGLMultipleRenderTargets?T.texture:[T.texture],O=T.width,Q=T.height;let Z=s.COLOR_BUFFER_BIT;const ee=[],pe=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,oe=n.get(T),he=T.isWebGLMultipleRenderTargets===!0;if(he)for(let be=0;be<S.length;be++)t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+be,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+be,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let be=0;be<S.length;be++){ee.push(s.COLOR_ATTACHMENT0+be),T.depthBuffer&&ee.push(pe);const Oe=oe.__ignoreDepthValues!==void 0?oe.__ignoreDepthValues:!1;if(Oe===!1&&(T.depthBuffer&&(Z|=s.DEPTH_BUFFER_BIT),T.stencilBuffer&&(Z|=s.STENCIL_BUFFER_BIT)),he&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,oe.__webglColorRenderbuffer[be]),Oe===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[pe]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[pe])),he){const K=n.get(S[be]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,K,0)}s.blitFramebuffer(0,0,O,Q,0,0,O,Q,Z,s.NEAREST),c&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ee)}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),he)for(let be=0;be<S.length;be++){t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+be,s.RENDERBUFFER,oe.__webglColorRenderbuffer[be]);const Oe=n.get(S[be]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,oe.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+be,s.TEXTURE_2D,Oe,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}}function Re(T){return Math.min(i.maxSamples,T.samples)}function fe(T){const S=n.get(T);return o&&T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function lt(T){const S=a.render.frame;h.get(T)!==S&&(h.set(T,S),T.update())}function Fe(T,S){const O=T.colorSpace,Q=T.format,Z=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||T.format===da||O!==bt&&O!==$t&&(Ye.getTransfer(O)===st?o===!1?e.has("EXT_sRGB")===!0&&Q===jt?(T.format=da,T.minFilter=Ft,T.generateMipmaps=!1):S=Uc.sRGBToLinear(S):(Q!==jt||Z!==kn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),S}this.allocateTextureUnit=P,this.resetTextureUnits=J,this.setTexture2D=V,this.setTexture2DArray=j,this.setTexture3D=W,this.setTextureCube=X,this.rebindTextures=qe,this.setupRenderTarget=U,this.updateRenderTargetMipmap=Rt,this.updateMultisampleRenderTarget=ye,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=fe}function Gg(s,e,t){const n=t.isWebGL2;function i(r,a=$t){let o;const l=Ye.getTransfer(a);if(r===kn)return s.UNSIGNED_BYTE;if(r===bc)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Ec)return s.UNSIGNED_SHORT_5_5_5_1;if(r===ou)return s.BYTE;if(r===lu)return s.SHORT;if(r===Ca)return s.UNSIGNED_SHORT;if(r===Sc)return s.INT;if(r===Nn)return s.UNSIGNED_INT;if(r===vn)return s.FLOAT;if(r===os)return n?s.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===cu)return s.ALPHA;if(r===jt)return s.RGBA;if(r===hu)return s.LUMINANCE;if(r===uu)return s.LUMINANCE_ALPHA;if(r===Kn)return s.DEPTH_COMPONENT;if(r===ki)return s.DEPTH_STENCIL;if(r===da)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===du)return s.RED;if(r===wc)return s.RED_INTEGER;if(r===fu)return s.RG;if(r===Tc)return s.RG_INTEGER;if(r===Ac)return s.RGBA_INTEGER;if(r===vr||r===yr||r===Mr||r===Sr)if(l===st)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===vr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===yr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Mr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Sr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===vr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===yr)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Mr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Sr)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===fo||r===po||r===mo||r===go)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===fo)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===po)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===mo)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===go)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Rc)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===_o||r===xo)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===_o)return l===st?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===xo)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===vo||r===yo||r===Mo||r===So||r===bo||r===Eo||r===wo||r===To||r===Ao||r===Ro||r===Co||r===Lo||r===Po||r===Io)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===vo)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===yo)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Mo)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===So)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===bo)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Eo)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===wo)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===To)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Ao)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Ro)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Co)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Lo)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Po)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Io)return l===st?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===br||r===Do||r===No)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===br)return l===st?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Do)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===No)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===pu||r===Uo||r===Fo||r===Oo)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===br)return o.COMPRESSED_RED_RGTC1_EXT;if(r===Uo)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Fo)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Oo)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Yn?n?s.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}class Vg extends Dt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ke extends at{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Wg={type:"move"};class jr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ke,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ke,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ke,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(c,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Wg)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ke;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class qg extends li{constructor(e,t){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const _=t.getContextAttributes();let m=null,p=null;const M=[],x=[],v=new Le;let R=null;const w=new Dt;w.layers.enable(1),w.viewport=new et;const A=new Dt;A.layers.enable(2),A.viewport=new et;const I=[w,A],y=new Vg;y.layers.enable(1),y.layers.enable(2);let E=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(G){let Y=M[G];return Y===void 0&&(Y=new jr,M[G]=Y),Y.getTargetRaySpace()},this.getControllerGrip=function(G){let Y=M[G];return Y===void 0&&(Y=new jr,M[G]=Y),Y.getGripSpace()},this.getHand=function(G){let Y=M[G];return Y===void 0&&(Y=new jr,M[G]=Y),Y.getHandSpace()};function N(G){const Y=x.indexOf(G.inputSource);if(Y===-1)return;const le=M[Y];le!==void 0&&(le.update(G.inputSource,G.frame,c||a),le.dispatchEvent({type:G.type,data:G.inputSource}))}function J(){i.removeEventListener("select",N),i.removeEventListener("selectstart",N),i.removeEventListener("selectend",N),i.removeEventListener("squeeze",N),i.removeEventListener("squeezestart",N),i.removeEventListener("squeezeend",N),i.removeEventListener("end",J),i.removeEventListener("inputsourceschange",P);for(let G=0;G<M.length;G++){const Y=x[G];Y!==null&&(x[G]=null,M[G].disconnect(Y))}E=null,k=null,e.setRenderTarget(m),f=null,d=null,u=null,i=null,p=null,ne.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(v.width,v.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(G){r=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(G){o=G,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(G){c=G},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(G){if(i=G,i!==null){if(m=e.getRenderTarget(),i.addEventListener("select",N),i.addEventListener("selectstart",N),i.addEventListener("selectend",N),i.addEventListener("squeeze",N),i.addEventListener("squeezestart",N),i.addEventListener("squeezeend",N),i.addEventListener("end",J),i.addEventListener("inputsourceschange",P),_.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(v),i.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const Y={antialias:i.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,Y),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new ii(f.framebufferWidth,f.framebufferHeight,{format:jt,type:kn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let Y=null,le=null,_e=null;_.depth&&(_e=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Y=_.stencil?ki:Kn,le=_.stencil?Yn:Nn);const ge={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:r};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(ge),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),p=new ii(d.textureWidth,d.textureHeight,{format:jt,type:kn,depthTexture:new qc(d.textureWidth,d.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Pe=e.properties.get(p);Pe.__ignoreDepthValues=d.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),ne.setContext(i),ne.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function P(G){for(let Y=0;Y<G.removed.length;Y++){const le=G.removed[Y],_e=x.indexOf(le);_e>=0&&(x[_e]=null,M[_e].disconnect(le))}for(let Y=0;Y<G.added.length;Y++){const le=G.added[Y];let _e=x.indexOf(le);if(_e===-1){for(let Pe=0;Pe<M.length;Pe++)if(Pe>=x.length){x.push(le),_e=Pe;break}else if(x[Pe]===null){x[Pe]=le,_e=Pe;break}if(_e===-1)break}const ge=M[_e];ge&&ge.connect(le)}}const z=new C,V=new C;function j(G,Y,le){z.setFromMatrixPosition(Y.matrixWorld),V.setFromMatrixPosition(le.matrixWorld);const _e=z.distanceTo(V),ge=Y.projectionMatrix.elements,Pe=le.projectionMatrix.elements,De=ge[14]/(ge[10]-1),Ee=ge[14]/(ge[10]+1),qe=(ge[9]+1)/ge[5],U=(ge[9]-1)/ge[5],Rt=(ge[8]-1)/ge[0],ye=(Pe[8]+1)/Pe[0],Re=De*Rt,fe=De*ye,lt=_e/(-Rt+ye),Fe=lt*-Rt;Y.matrixWorld.decompose(G.position,G.quaternion,G.scale),G.translateX(Fe),G.translateZ(lt),G.matrixWorld.compose(G.position,G.quaternion,G.scale),G.matrixWorldInverse.copy(G.matrixWorld).invert();const T=De+lt,S=Ee+lt,O=Re-Fe,Q=fe+(_e-Fe),Z=qe*Ee/S*T,ee=U*Ee/S*T;G.projectionMatrix.makePerspective(O,Q,Z,ee,T,S),G.projectionMatrixInverse.copy(G.projectionMatrix).invert()}function W(G,Y){Y===null?G.matrixWorld.copy(G.matrix):G.matrixWorld.multiplyMatrices(Y.matrixWorld,G.matrix),G.matrixWorldInverse.copy(G.matrixWorld).invert()}this.updateCamera=function(G){if(i===null)return;y.near=A.near=w.near=G.near,y.far=A.far=w.far=G.far,(E!==y.near||k!==y.far)&&(i.updateRenderState({depthNear:y.near,depthFar:y.far}),E=y.near,k=y.far);const Y=G.parent,le=y.cameras;W(y,Y);for(let _e=0;_e<le.length;_e++)W(le[_e],Y);le.length===2?j(y,w,A):y.projectionMatrix.copy(w.projectionMatrix),X(G,y,Y)};function X(G,Y,le){le===null?G.matrix.copy(Y.matrixWorld):(G.matrix.copy(le.matrixWorld),G.matrix.invert(),G.matrix.multiply(Y.matrixWorld)),G.matrix.decompose(G.position,G.quaternion,G.scale),G.updateMatrixWorld(!0),G.projectionMatrix.copy(Y.projectionMatrix),G.projectionMatrixInverse.copy(Y.projectionMatrixInverse),G.isPerspectiveCamera&&(G.fov=zi*2*Math.atan(1/G.projectionMatrix.elements[5]),G.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(G){l=G,d!==null&&(d.fixedFoveation=G),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=G)};let $=null;function te(G,Y){if(h=Y.getViewerPose(c||a),g=Y,h!==null){const le=h.views;f!==null&&(e.setRenderTargetFramebuffer(p,f.framebuffer),e.setRenderTarget(p));let _e=!1;le.length!==y.cameras.length&&(y.cameras.length=0,_e=!0);for(let ge=0;ge<le.length;ge++){const Pe=le[ge];let De=null;if(f!==null)De=f.getViewport(Pe);else{const qe=u.getViewSubImage(d,Pe);De=qe.viewport,ge===0&&(e.setRenderTargetTextures(p,qe.colorTexture,d.ignoreDepthValues?void 0:qe.depthStencilTexture),e.setRenderTarget(p))}let Ee=I[ge];Ee===void 0&&(Ee=new Dt,Ee.layers.enable(ge),Ee.viewport=new et,I[ge]=Ee),Ee.matrix.fromArray(Pe.transform.matrix),Ee.matrix.decompose(Ee.position,Ee.quaternion,Ee.scale),Ee.projectionMatrix.fromArray(Pe.projectionMatrix),Ee.projectionMatrixInverse.copy(Ee.projectionMatrix).invert(),Ee.viewport.set(De.x,De.y,De.width,De.height),ge===0&&(y.matrix.copy(Ee.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),_e===!0&&y.cameras.push(Ee)}}for(let le=0;le<M.length;le++){const _e=x[le],ge=M[le];_e!==null&&ge!==void 0&&ge.update(_e,Y,c||a)}$&&$(G,Y),Y.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Y}),g=null}const ne=new Wc;ne.setAnimationLoop(te),this.setAnimationLoop=function(G){$=G},this.dispose=function(){}}}function Xg(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Hc(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,M,x,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,M,x):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Bt&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Bt&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=e.get(p).envMap;if(M&&(m.envMap.value=M,m.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const x=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*x,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,M,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=x*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Bt&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function jg(s,e,t,n){let i={},r={},a=[];const o=t.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(M,x){const v=x.program;n.uniformBlockBinding(M,v)}function c(M,x){let v=i[M.id];v===void 0&&(g(M),v=h(M),i[M.id]=v,M.addEventListener("dispose",m));const R=x.program;n.updateUBOMapping(M,R);const w=e.render.frame;r[M.id]!==w&&(d(M),r[M.id]=w)}function h(M){const x=u();M.__bindingPointIndex=x;const v=s.createBuffer(),R=M.__size,w=M.usage;return s.bindBuffer(s.UNIFORM_BUFFER,v),s.bufferData(s.UNIFORM_BUFFER,R,w),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,x,v),v}function u(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const x=i[M.id],v=M.uniforms,R=M.__cache;s.bindBuffer(s.UNIFORM_BUFFER,x);for(let w=0,A=v.length;w<A;w++){const I=Array.isArray(v[w])?v[w]:[v[w]];for(let y=0,E=I.length;y<E;y++){const k=I[y];if(f(k,w,y,R)===!0){const N=k.__offset,J=Array.isArray(k.value)?k.value:[k.value];let P=0;for(let z=0;z<J.length;z++){const V=J[z],j=_(V);typeof V=="number"||typeof V=="boolean"?(k.__data[0]=V,s.bufferSubData(s.UNIFORM_BUFFER,N+P,k.__data)):V.isMatrix3?(k.__data[0]=V.elements[0],k.__data[1]=V.elements[1],k.__data[2]=V.elements[2],k.__data[3]=0,k.__data[4]=V.elements[3],k.__data[5]=V.elements[4],k.__data[6]=V.elements[5],k.__data[7]=0,k.__data[8]=V.elements[6],k.__data[9]=V.elements[7],k.__data[10]=V.elements[8],k.__data[11]=0):(V.toArray(k.__data,P),P+=j.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,N,k.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(M,x,v,R){const w=M.value,A=x+"_"+v;if(R[A]===void 0)return typeof w=="number"||typeof w=="boolean"?R[A]=w:R[A]=w.clone(),!0;{const I=R[A];if(typeof w=="number"||typeof w=="boolean"){if(I!==w)return R[A]=w,!0}else if(I.equals(w)===!1)return I.copy(w),!0}return!1}function g(M){const x=M.uniforms;let v=0;const R=16;for(let A=0,I=x.length;A<I;A++){const y=Array.isArray(x[A])?x[A]:[x[A]];for(let E=0,k=y.length;E<k;E++){const N=y[E],J=Array.isArray(N.value)?N.value:[N.value];for(let P=0,z=J.length;P<z;P++){const V=J[P],j=_(V),W=v%R;W!==0&&R-W<j.boundary&&(v+=R-W),N.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=v,v+=j.storage}}}const w=v%R;return w>0&&(v+=R-w),M.__size=v,M.__cache={},this}function _(M){const x={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(x.boundary=4,x.storage=4):M.isVector2?(x.boundary=8,x.storage=8):M.isVector3||M.isColor?(x.boundary=16,x.storage=12):M.isVector4?(x.boundary=16,x.storage=16):M.isMatrix3?(x.boundary=48,x.storage=48):M.isMatrix4?(x.boundary=64,x.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),x}function m(M){const x=M.target;x.removeEventListener("dispose",m);const v=a.indexOf(x.__bindingPointIndex);a.splice(v,1),s.deleteBuffer(i[x.id]),delete i[x.id],delete r[x.id]}function p(){for(const M in i)s.deleteBuffer(i[M]);a=[],i={},r={}}return{bind:l,update:c,dispose:p}}class Zc{constructor(e={}){const{canvas:t=Gu(),context:n=null,depth:i=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=a;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const p=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=rt,this._useLegacyLights=!1,this.toneMapping=On,this.toneMappingExposure=1;const x=this;let v=!1,R=0,w=0,A=null,I=-1,y=null;const E=new et,k=new et;let N=null;const J=new de(0);let P=0,z=t.width,V=t.height,j=1,W=null,X=null;const $=new et(0,0,z,V),te=new et(0,0,z,V);let ne=!1;const G=new Ua;let Y=!1,le=!1,_e=null;const ge=new Ge,Pe=new Le,De=new C,Ee={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function qe(){return A===null?j:1}let U=n;function Rt(b,D){for(let B=0;B<b.length;B++){const H=b[B],F=t.getContext(H,D);if(F!==null)return F}return null}try{const b={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Aa}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",L,!1),t.addEventListener("webglcontextcreationerror",re,!1),U===null){const D=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&D.shift(),U=Rt(D,b),U===null)throw Rt(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&U instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),U.getShaderPrecisionFormat===void 0&&(U.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let ye,Re,fe,lt,Fe,T,S,O,Q,Z,ee,pe,oe,he,be,Oe,K,Je,Ve,Ae,ve,ue,Ne,Ze;function ut(){ye=new im(U),Re=new Zp(U,ye,e),ye.init(Re),ue=new Gg(U,ye,Re),fe=new zg(U,ye,Re),lt=new am(U),Fe=new Tg,T=new Hg(U,ye,fe,Fe,Re,ue,lt),S=new Qp(x),O=new nm(x),Q=new fd(U,Re),Ne=new Yp(U,ye,Q,Re),Z=new sm(U,Q,lt,Ne),ee=new hm(U,Z,Q,lt),Ve=new cm(U,Re,T),Oe=new Jp(Fe),pe=new wg(x,S,O,ye,Re,Ne,Oe),oe=new Xg(x,Fe),he=new Rg,be=new Ng(ye,Re),Je=new $p(x,S,O,fe,ee,d,l),K=new Bg(x,ee,Re),Ze=new jg(U,lt,Re,fe),Ae=new Kp(U,ye,lt,Re),ve=new rm(U,ye,lt,Re),lt.programs=pe.programs,x.capabilities=Re,x.extensions=ye,x.properties=Fe,x.renderLists=he,x.shadowMap=K,x.state=fe,x.info=lt}ut();const Be=new qg(x,U);this.xr=Be,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const b=ye.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=ye.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return j},this.setPixelRatio=function(b){b!==void 0&&(j=b,this.setSize(z,V,!1))},this.getSize=function(b){return b.set(z,V)},this.setSize=function(b,D,B=!0){if(Be.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=b,V=D,t.width=Math.floor(b*j),t.height=Math.floor(D*j),B===!0&&(t.style.width=b+"px",t.style.height=D+"px"),this.setViewport(0,0,b,D)},this.getDrawingBufferSize=function(b){return b.set(z*j,V*j).floor()},this.setDrawingBufferSize=function(b,D,B){z=b,V=D,j=B,t.width=Math.floor(b*B),t.height=Math.floor(D*B),this.setViewport(0,0,b,D)},this.getCurrentViewport=function(b){return b.copy(E)},this.getViewport=function(b){return b.copy($)},this.setViewport=function(b,D,B,H){b.isVector4?$.set(b.x,b.y,b.z,b.w):$.set(b,D,B,H),fe.viewport(E.copy($).multiplyScalar(j).floor())},this.getScissor=function(b){return b.copy(te)},this.setScissor=function(b,D,B,H){b.isVector4?te.set(b.x,b.y,b.z,b.w):te.set(b,D,B,H),fe.scissor(k.copy(te).multiplyScalar(j).floor())},this.getScissorTest=function(){return ne},this.setScissorTest=function(b){fe.setScissorTest(ne=b)},this.setOpaqueSort=function(b){W=b},this.setTransparentSort=function(b){X=b},this.getClearColor=function(b){return b.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor.apply(Je,arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha.apply(Je,arguments)},this.clear=function(b=!0,D=!0,B=!0){let H=0;if(b){let F=!1;if(A!==null){const ce=A.texture.format;F=ce===Ac||ce===Tc||ce===wc}if(F){const ce=A.texture.type,me=ce===kn||ce===Nn||ce===Ca||ce===Yn||ce===bc||ce===Ec,Se=Je.getClearColor(),Te=Je.getClearAlpha(),ke=Se.r,Ce=Se.g,Ie=Se.b;me?(f[0]=ke,f[1]=Ce,f[2]=Ie,f[3]=Te,U.clearBufferuiv(U.COLOR,0,f)):(g[0]=ke,g[1]=Ce,g[2]=Ie,g[3]=Te,U.clearBufferiv(U.COLOR,0,g))}else H|=U.COLOR_BUFFER_BIT}D&&(H|=U.DEPTH_BUFFER_BIT),B&&(H|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",L,!1),t.removeEventListener("webglcontextcreationerror",re,!1),he.dispose(),be.dispose(),Fe.dispose(),S.dispose(),O.dispose(),ee.dispose(),Ne.dispose(),Ze.dispose(),pe.dispose(),Be.dispose(),Be.removeEventListener("sessionstart",Ct),Be.removeEventListener("sessionend",it),_e&&(_e.dispose(),_e=null),Lt.stop()};function ie(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),v=!0}function L(){console.log("THREE.WebGLRenderer: Context Restored."),v=!1;const b=lt.autoReset,D=K.enabled,B=K.autoUpdate,H=K.needsUpdate,F=K.type;ut(),lt.autoReset=b,K.enabled=D,K.autoUpdate=B,K.needsUpdate=H,K.type=F}function re(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function ae(b){const D=b.target;D.removeEventListener("dispose",ae),we(D)}function we(b){Me(b),Fe.remove(b)}function Me(b){const D=Fe.get(b).programs;D!==void 0&&(D.forEach(function(B){pe.releaseProgram(B)}),b.isShaderMaterial&&pe.releaseShaderCache(b))}this.renderBufferDirect=function(b,D,B,H,F,ce){D===null&&(D=Ee);const me=F.isMesh&&F.matrixWorld.determinant()<0,Se=bh(b,D,B,H,F);fe.setMaterial(H,me);let Te=B.index,ke=1;if(H.wireframe===!0){if(Te=Z.getWireframeAttribute(B),Te===void 0)return;ke=2}const Ce=B.drawRange,Ie=B.attributes.position;let pt=Ce.start*ke,zt=(Ce.start+Ce.count)*ke;ce!==null&&(pt=Math.max(pt,ce.start*ke),zt=Math.min(zt,(ce.start+ce.count)*ke)),Te!==null?(pt=Math.max(pt,0),zt=Math.min(zt,Te.count)):Ie!=null&&(pt=Math.max(pt,0),zt=Math.min(zt,Ie.count));const vt=zt-pt;if(vt<0||vt===1/0)return;Ne.setup(F,H,Se,B,Te);let un,ct=Ae;if(Te!==null&&(un=Q.get(Te),ct=ve,ct.setIndex(un)),F.isMesh)H.wireframe===!0?(fe.setLineWidth(H.wireframeLinewidth*qe()),ct.setMode(U.LINES)):ct.setMode(U.TRIANGLES);else if(F.isLine){let ze=H.linewidth;ze===void 0&&(ze=1),fe.setLineWidth(ze*qe()),F.isLineSegments?ct.setMode(U.LINES):F.isLineLoop?ct.setMode(U.LINE_LOOP):ct.setMode(U.LINE_STRIP)}else F.isPoints?ct.setMode(U.POINTS):F.isSprite&&ct.setMode(U.TRIANGLES);if(F.isBatchedMesh)ct.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else if(F.isInstancedMesh)ct.renderInstances(pt,vt,F.count);else if(B.isInstancedBufferGeometry){const ze=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,mr=Math.min(B.instanceCount,ze);ct.renderInstances(pt,vt,mr)}else ct.render(pt,vt)};function tt(b,D,B){b.transparent===!0&&b.side===Ot&&b.forceSinglePass===!1?(b.side=Bt,b.needsUpdate=!0,ps(b,D,B),b.side=Mn,b.needsUpdate=!0,ps(b,D,B),b.side=Ot):ps(b,D,B)}this.compile=function(b,D,B=null){B===null&&(B=b),m=be.get(B),m.init(),M.push(m),B.traverseVisible(function(F){F.isLight&&F.layers.test(D.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),b!==B&&b.traverseVisible(function(F){F.isLight&&F.layers.test(D.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),m.setupLights(x._useLegacyLights);const H=new Set;return b.traverse(function(F){const ce=F.material;if(ce)if(Array.isArray(ce))for(let me=0;me<ce.length;me++){const Se=ce[me];tt(Se,B,F),H.add(Se)}else tt(ce,B,F),H.add(ce)}),M.pop(),m=null,H},this.compileAsync=function(b,D,B=null){const H=this.compile(b,D,B);return new Promise(F=>{function ce(){if(H.forEach(function(me){Fe.get(me).currentProgram.isReady()&&H.delete(me)}),H.size===0){F(b);return}setTimeout(ce,10)}ye.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let nt=null;function xt(b){nt&&nt(b)}function Ct(){Lt.stop()}function it(){Lt.start()}const Lt=new Wc;Lt.setAnimationLoop(xt),typeof self<"u"&&Lt.setContext(self),this.setAnimationLoop=function(b){nt=b,Be.setAnimationLoop(b),b===null?Lt.stop():Lt.start()},Be.addEventListener("sessionstart",Ct),Be.addEventListener("sessionend",it),this.render=function(b,D){if(D!==void 0&&D.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(v===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),Be.enabled===!0&&Be.isPresenting===!0&&(Be.cameraAutoUpdate===!0&&Be.updateCamera(D),D=Be.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,D,A),m=be.get(b,M.length),m.init(),M.push(m),ge.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),G.setFromProjectionMatrix(ge),le=this.localClippingEnabled,Y=Oe.init(this.clippingPlanes,le),_=he.get(b,p.length),_.init(),p.push(_),rn(b,D,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(W,X),this.info.render.frame++,Y===!0&&Oe.beginShadows();const B=m.state.shadowsArray;if(K.render(B,b,D),Y===!0&&Oe.endShadows(),this.info.autoReset===!0&&this.info.reset(),Je.render(_,b),m.setupLights(x._useLegacyLights),D.isArrayCamera){const H=D.cameras;for(let F=0,ce=H.length;F<ce;F++){const me=H[F];Qa(_,b,me,me.viewport)}}else Qa(_,b,D);A!==null&&(T.updateMultisampleRenderTarget(A),T.updateRenderTargetMipmap(A)),b.isScene===!0&&b.onAfterRender(x,b,D),Ne.resetDefaultState(),I=-1,y=null,M.pop(),M.length>0?m=M[M.length-1]:m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function rn(b,D,B,H){if(b.visible===!1)return;if(b.layers.test(D.layers)){if(b.isGroup)B=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(D);else if(b.isLight)m.pushLight(b),b.castShadow&&m.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||G.intersectsSprite(b)){H&&De.setFromMatrixPosition(b.matrixWorld).applyMatrix4(ge);const me=ee.update(b),Se=b.material;Se.visible&&_.push(b,me,Se,B,De.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||G.intersectsObject(b))){const me=ee.update(b),Se=b.material;if(H&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),De.copy(b.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),De.copy(me.boundingSphere.center)),De.applyMatrix4(b.matrixWorld).applyMatrix4(ge)),Array.isArray(Se)){const Te=me.groups;for(let ke=0,Ce=Te.length;ke<Ce;ke++){const Ie=Te[ke],pt=Se[Ie.materialIndex];pt&&pt.visible&&_.push(b,me,pt,B,De.z,Ie)}}else Se.visible&&_.push(b,me,Se,B,De.z,null)}}const ce=b.children;for(let me=0,Se=ce.length;me<Se;me++)rn(ce[me],D,B,H)}function Qa(b,D,B,H){const F=b.opaque,ce=b.transmissive,me=b.transparent;m.setupLightsView(B),Y===!0&&Oe.setGlobalState(x.clippingPlanes,B),ce.length>0&&Sh(F,ce,D,B),H&&fe.viewport(E.copy(H)),F.length>0&&fs(F,D,B),ce.length>0&&fs(ce,D,B),me.length>0&&fs(me,D,B),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1)}function Sh(b,D,B,H){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;const ce=Re.isWebGL2;_e===null&&(_e=new ii(1,1,{generateMipmaps:!0,type:ye.has("EXT_color_buffer_half_float")?os:kn,minFilter:ni,samples:ce?4:0})),x.getDrawingBufferSize(Pe),ce?_e.setSize(Pe.x,Pe.y):_e.setSize(nr(Pe.x),nr(Pe.y));const me=x.getRenderTarget();x.setRenderTarget(_e),x.getClearColor(J),P=x.getClearAlpha(),P<1&&x.setClearColor(16777215,.5),x.clear();const Se=x.toneMapping;x.toneMapping=On,fs(b,B,H),T.updateMultisampleRenderTarget(_e),T.updateRenderTargetMipmap(_e);let Te=!1;for(let ke=0,Ce=D.length;ke<Ce;ke++){const Ie=D[ke],pt=Ie.object,zt=Ie.geometry,vt=Ie.material,un=Ie.group;if(vt.side===Ot&&pt.layers.test(H.layers)){const ct=vt.side;vt.side=Bt,vt.needsUpdate=!0,eo(pt,B,H,zt,vt,un),vt.side=ct,vt.needsUpdate=!0,Te=!0}}Te===!0&&(T.updateMultisampleRenderTarget(_e),T.updateRenderTargetMipmap(_e)),x.setRenderTarget(me),x.setClearColor(J,P),x.toneMapping=Se}function fs(b,D,B){const H=D.isScene===!0?D.overrideMaterial:null;for(let F=0,ce=b.length;F<ce;F++){const me=b[F],Se=me.object,Te=me.geometry,ke=H===null?me.material:H,Ce=me.group;Se.layers.test(B.layers)&&eo(Se,D,B,Te,ke,Ce)}}function eo(b,D,B,H,F,ce){b.onBeforeRender(x,D,B,H,F,ce),b.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),F.onBeforeRender(x,D,B,H,b,ce),F.transparent===!0&&F.side===Ot&&F.forceSinglePass===!1?(F.side=Bt,F.needsUpdate=!0,x.renderBufferDirect(B,D,H,F,b,ce),F.side=Mn,F.needsUpdate=!0,x.renderBufferDirect(B,D,H,F,b,ce),F.side=Ot):x.renderBufferDirect(B,D,H,F,b,ce),b.onAfterRender(x,D,B,H,F,ce)}function ps(b,D,B){D.isScene!==!0&&(D=Ee);const H=Fe.get(b),F=m.state.lights,ce=m.state.shadowsArray,me=F.state.version,Se=pe.getParameters(b,F.state,ce,D,B),Te=pe.getProgramCacheKey(Se);let ke=H.programs;H.environment=b.isMeshStandardMaterial?D.environment:null,H.fog=D.fog,H.envMap=(b.isMeshStandardMaterial?O:S).get(b.envMap||H.environment),ke===void 0&&(b.addEventListener("dispose",ae),ke=new Map,H.programs=ke);let Ce=ke.get(Te);if(Ce!==void 0){if(H.currentProgram===Ce&&H.lightsStateVersion===me)return no(b,Se),Ce}else Se.uniforms=pe.getUniforms(b),b.onBuild(B,Se,x),b.onBeforeCompile(Se,x),Ce=pe.acquireProgram(Se,Te),ke.set(Te,Ce),H.uniforms=Se.uniforms;const Ie=H.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ie.clippingPlanes=Oe.uniform),no(b,Se),H.needsLights=wh(b),H.lightsStateVersion=me,H.needsLights&&(Ie.ambientLightColor.value=F.state.ambient,Ie.lightProbe.value=F.state.probe,Ie.directionalLights.value=F.state.directional,Ie.directionalLightShadows.value=F.state.directionalShadow,Ie.spotLights.value=F.state.spot,Ie.spotLightShadows.value=F.state.spotShadow,Ie.rectAreaLights.value=F.state.rectArea,Ie.ltc_1.value=F.state.rectAreaLTC1,Ie.ltc_2.value=F.state.rectAreaLTC2,Ie.pointLights.value=F.state.point,Ie.pointLightShadows.value=F.state.pointShadow,Ie.hemisphereLights.value=F.state.hemi,Ie.directionalShadowMap.value=F.state.directionalShadowMap,Ie.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ie.spotShadowMap.value=F.state.spotShadowMap,Ie.spotLightMatrix.value=F.state.spotLightMatrix,Ie.spotLightMap.value=F.state.spotLightMap,Ie.pointShadowMap.value=F.state.pointShadowMap,Ie.pointShadowMatrix.value=F.state.pointShadowMatrix),H.currentProgram=Ce,H.uniformsList=null,Ce}function to(b){if(b.uniformsList===null){const D=b.currentProgram.getUniforms();b.uniformsList=Xs.seqWithValue(D.seq,b.uniforms)}return b.uniformsList}function no(b,D){const B=Fe.get(b);B.outputColorSpace=D.outputColorSpace,B.batching=D.batching,B.instancing=D.instancing,B.instancingColor=D.instancingColor,B.skinning=D.skinning,B.morphTargets=D.morphTargets,B.morphNormals=D.morphNormals,B.morphColors=D.morphColors,B.morphTargetsCount=D.morphTargetsCount,B.numClippingPlanes=D.numClippingPlanes,B.numIntersection=D.numClipIntersection,B.vertexAlphas=D.vertexAlphas,B.vertexTangents=D.vertexTangents,B.toneMapping=D.toneMapping}function bh(b,D,B,H,F){D.isScene!==!0&&(D=Ee),T.resetTextureUnits();const ce=D.fog,me=H.isMeshStandardMaterial?D.environment:null,Se=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:bt,Te=(H.isMeshStandardMaterial?O:S).get(H.envMap||me),ke=H.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Ce=!!B.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Ie=!!B.morphAttributes.position,pt=!!B.morphAttributes.normal,zt=!!B.morphAttributes.color;let vt=On;H.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(vt=x.toneMapping);const un=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ct=un!==void 0?un.length:0,ze=Fe.get(H),mr=m.state.lights;if(Y===!0&&(le===!0||b!==y)){const Vt=b===y&&H.id===I;Oe.setState(H,b,Vt)}let dt=!1;H.version===ze.__version?(ze.needsLights&&ze.lightsStateVersion!==mr.state.version||ze.outputColorSpace!==Se||F.isBatchedMesh&&ze.batching===!1||!F.isBatchedMesh&&ze.batching===!0||F.isInstancedMesh&&ze.instancing===!1||!F.isInstancedMesh&&ze.instancing===!0||F.isSkinnedMesh&&ze.skinning===!1||!F.isSkinnedMesh&&ze.skinning===!0||F.isInstancedMesh&&ze.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&ze.instancingColor===!1&&F.instanceColor!==null||ze.envMap!==Te||H.fog===!0&&ze.fog!==ce||ze.numClippingPlanes!==void 0&&(ze.numClippingPlanes!==Oe.numPlanes||ze.numIntersection!==Oe.numIntersection)||ze.vertexAlphas!==ke||ze.vertexTangents!==Ce||ze.morphTargets!==Ie||ze.morphNormals!==pt||ze.morphColors!==zt||ze.toneMapping!==vt||Re.isWebGL2===!0&&ze.morphTargetsCount!==ct)&&(dt=!0):(dt=!0,ze.__version=H.version);let Bn=ze.currentProgram;dt===!0&&(Bn=ps(H,D,F));let io=!1,$i=!1,gr=!1;const Et=Bn.getUniforms(),zn=ze.uniforms;if(fe.useProgram(Bn.program)&&(io=!0,$i=!0,gr=!0),H.id!==I&&(I=H.id,$i=!0),io||y!==b){Et.setValue(U,"projectionMatrix",b.projectionMatrix),Et.setValue(U,"viewMatrix",b.matrixWorldInverse);const Vt=Et.map.cameraPosition;Vt!==void 0&&Vt.setValue(U,De.setFromMatrixPosition(b.matrixWorld)),Re.logarithmicDepthBuffer&&Et.setValue(U,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&Et.setValue(U,"isOrthographic",b.isOrthographicCamera===!0),y!==b&&(y=b,$i=!0,gr=!0)}if(F.isSkinnedMesh){Et.setOptional(U,F,"bindMatrix"),Et.setOptional(U,F,"bindMatrixInverse");const Vt=F.skeleton;Vt&&(Re.floatVertexTextures?(Vt.boneTexture===null&&Vt.computeBoneTexture(),Et.setValue(U,"boneTexture",Vt.boneTexture,T)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}F.isBatchedMesh&&(Et.setOptional(U,F,"batchingTexture"),Et.setValue(U,"batchingTexture",F._matricesTexture,T));const _r=B.morphAttributes;if((_r.position!==void 0||_r.normal!==void 0||_r.color!==void 0&&Re.isWebGL2===!0)&&Ve.update(F,B,Bn),($i||ze.receiveShadow!==F.receiveShadow)&&(ze.receiveShadow=F.receiveShadow,Et.setValue(U,"receiveShadow",F.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(zn.envMap.value=Te,zn.flipEnvMap.value=Te.isCubeTexture&&Te.isRenderTargetTexture===!1?-1:1),$i&&(Et.setValue(U,"toneMappingExposure",x.toneMappingExposure),ze.needsLights&&Eh(zn,gr),ce&&H.fog===!0&&oe.refreshFogUniforms(zn,ce),oe.refreshMaterialUniforms(zn,H,j,V,_e),Xs.upload(U,to(ze),zn,T)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Xs.upload(U,to(ze),zn,T),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&Et.setValue(U,"center",F.center),Et.setValue(U,"modelViewMatrix",F.modelViewMatrix),Et.setValue(U,"normalMatrix",F.normalMatrix),Et.setValue(U,"modelMatrix",F.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Vt=H.uniformsGroups;for(let xr=0,Th=Vt.length;xr<Th;xr++)if(Re.isWebGL2){const so=Vt[xr];Ze.update(so,Bn),Ze.bind(so,Bn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Bn}function Eh(b,D){b.ambientLightColor.needsUpdate=D,b.lightProbe.needsUpdate=D,b.directionalLights.needsUpdate=D,b.directionalLightShadows.needsUpdate=D,b.pointLights.needsUpdate=D,b.pointLightShadows.needsUpdate=D,b.spotLights.needsUpdate=D,b.spotLightShadows.needsUpdate=D,b.rectAreaLights.needsUpdate=D,b.hemisphereLights.needsUpdate=D}function wh(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(b,D,B){Fe.get(b.texture).__webglTexture=D,Fe.get(b.depthTexture).__webglTexture=B;const H=Fe.get(b);H.__hasExternalTextures=!0,H.__hasExternalTextures&&(H.__autoAllocateDepthBuffer=B===void 0,H.__autoAllocateDepthBuffer||ye.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(b,D){const B=Fe.get(b);B.__webglFramebuffer=D,B.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(b,D=0,B=0){A=b,R=D,w=B;let H=!0,F=null,ce=!1,me=!1;if(b){const Te=Fe.get(b);Te.__useDefaultFramebuffer!==void 0?(fe.bindFramebuffer(U.FRAMEBUFFER,null),H=!1):Te.__webglFramebuffer===void 0?T.setupRenderTarget(b):Te.__hasExternalTextures&&T.rebindTextures(b,Fe.get(b.texture).__webglTexture,Fe.get(b.depthTexture).__webglTexture);const ke=b.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(me=!0);const Ce=Fe.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ce[D])?F=Ce[D][B]:F=Ce[D],ce=!0):Re.isWebGL2&&b.samples>0&&T.useMultisampledRTT(b)===!1?F=Fe.get(b).__webglMultisampledFramebuffer:Array.isArray(Ce)?F=Ce[B]:F=Ce,E.copy(b.viewport),k.copy(b.scissor),N=b.scissorTest}else E.copy($).multiplyScalar(j).floor(),k.copy(te).multiplyScalar(j).floor(),N=ne;if(fe.bindFramebuffer(U.FRAMEBUFFER,F)&&Re.drawBuffers&&H&&fe.drawBuffers(b,F),fe.viewport(E),fe.scissor(k),fe.setScissorTest(N),ce){const Te=Fe.get(b.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+D,Te.__webglTexture,B)}else if(me){const Te=Fe.get(b.texture),ke=D||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Te.__webglTexture,B||0,ke)}I=-1},this.readRenderTargetPixels=function(b,D,B,H,F,ce,me){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=Fe.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&me!==void 0&&(Se=Se[me]),Se){fe.bindFramebuffer(U.FRAMEBUFFER,Se);try{const Te=b.texture,ke=Te.format,Ce=Te.type;if(ke!==jt&&ue.convert(ke)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ie=Ce===os&&(ye.has("EXT_color_buffer_half_float")||Re.isWebGL2&&ye.has("EXT_color_buffer_float"));if(Ce!==kn&&ue.convert(Ce)!==U.getParameter(U.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ce===vn&&(Re.isWebGL2||ye.has("OES_texture_float")||ye.has("WEBGL_color_buffer_float")))&&!Ie){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=b.width-H&&B>=0&&B<=b.height-F&&U.readPixels(D,B,H,F,ue.convert(ke),ue.convert(Ce),ce)}finally{const Te=A!==null?Fe.get(A).__webglFramebuffer:null;fe.bindFramebuffer(U.FRAMEBUFFER,Te)}}},this.copyFramebufferToTexture=function(b,D,B=0){const H=Math.pow(2,-B),F=Math.floor(D.image.width*H),ce=Math.floor(D.image.height*H);T.setTexture2D(D,0),U.copyTexSubImage2D(U.TEXTURE_2D,B,0,0,b.x,b.y,F,ce),fe.unbindTexture()},this.copyTextureToTexture=function(b,D,B,H=0){const F=D.image.width,ce=D.image.height,me=ue.convert(B.format),Se=ue.convert(B.type);T.setTexture2D(B,0),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,B.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,B.unpackAlignment),D.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,H,b.x,b.y,F,ce,me,Se,D.image.data):D.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,H,b.x,b.y,D.mipmaps[0].width,D.mipmaps[0].height,me,D.mipmaps[0].data):U.texSubImage2D(U.TEXTURE_2D,H,b.x,b.y,me,Se,D.image),H===0&&B.generateMipmaps&&U.generateMipmap(U.TEXTURE_2D),fe.unbindTexture()},this.copyTextureToTexture3D=function(b,D,B,H,F=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ce=b.max.x-b.min.x+1,me=b.max.y-b.min.y+1,Se=b.max.z-b.min.z+1,Te=ue.convert(H.format),ke=ue.convert(H.type);let Ce;if(H.isData3DTexture)T.setTexture3D(H,0),Ce=U.TEXTURE_3D;else if(H.isDataArrayTexture||H.isCompressedArrayTexture)T.setTexture2DArray(H,0),Ce=U.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,H.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,H.unpackAlignment);const Ie=U.getParameter(U.UNPACK_ROW_LENGTH),pt=U.getParameter(U.UNPACK_IMAGE_HEIGHT),zt=U.getParameter(U.UNPACK_SKIP_PIXELS),vt=U.getParameter(U.UNPACK_SKIP_ROWS),un=U.getParameter(U.UNPACK_SKIP_IMAGES),ct=B.isCompressedTexture?B.mipmaps[F]:B.image;U.pixelStorei(U.UNPACK_ROW_LENGTH,ct.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ct.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,b.min.x),U.pixelStorei(U.UNPACK_SKIP_ROWS,b.min.y),U.pixelStorei(U.UNPACK_SKIP_IMAGES,b.min.z),B.isDataTexture||B.isData3DTexture?U.texSubImage3D(Ce,F,D.x,D.y,D.z,ce,me,Se,Te,ke,ct.data):B.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),U.compressedTexSubImage3D(Ce,F,D.x,D.y,D.z,ce,me,Se,Te,ct.data)):U.texSubImage3D(Ce,F,D.x,D.y,D.z,ce,me,Se,Te,ke,ct),U.pixelStorei(U.UNPACK_ROW_LENGTH,Ie),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,pt),U.pixelStorei(U.UNPACK_SKIP_PIXELS,zt),U.pixelStorei(U.UNPACK_SKIP_ROWS,vt),U.pixelStorei(U.UNPACK_SKIP_IMAGES,un),F===0&&H.generateMipmaps&&U.generateMipmap(Ce),fe.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?T.setTextureCube(b,0):b.isData3DTexture?T.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?T.setTexture2DArray(b,0):T.setTexture2D(b,0),fe.unbindTexture()},this.resetState=function(){R=0,w=0,A=null,fe.reset(),Ne.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Ia?"display-p3":"srgb",t.unpackColorSpace=Ye.workingColorSpace===or?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===rt?Zn:Ic}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Zn?rt:bt}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class $g extends Zc{}$g.prototype.isWebGL1Renderer=!0;class ka{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new de(e),this.near=t,this.far=n}clone(){return new ka(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Yg extends at{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Kg{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ua,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=en()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=en()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=en()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Pt=new C;class Ba{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}setX(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Qe(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=on(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=on(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=on(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=on(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),i=Qe(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Qe(t,this.array),n=Qe(n,this.array),i=Qe(i,this.array),r=Qe(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Nt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ba(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const wl=new C,Tl=new et,Al=new et,Zg=new C,Rl=new Ge,Os=new C,$r=new cn,Cl=new Ge,Yr=new hs;class Jg extends xe{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=uo,this.bindMatrix=new Ge,this.bindMatrixInverse=new Ge,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new sn),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Os),this.boundingBox.expandByPoint(Os)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new cn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Os),this.boundingSphere.expandByPoint(Os)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),$r.copy(this.boundingSphere),$r.applyMatrix4(i),e.ray.intersectsSphere($r)!==!1&&(Cl.copy(i).invert(),Yr.copy(e.ray).applyMatrix4(Cl),!(this.boundingBox!==null&&Yr.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Yr)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new et,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===uo?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===au?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Tl.fromBufferAttribute(i.attributes.skinIndex,e),Al.fromBufferAttribute(i.attributes.skinWeight,e),wl.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=Al.getComponent(r);if(a!==0){const o=Tl.getComponent(r);Rl.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Zg.copy(wl).applyMatrix4(Rl),a)}}return t.applyMatrix4(this.bindMatrixInverse)}boneTransform(e,t){return console.warn("THREE.SkinnedMesh: .boneTransform() was renamed to .applyBoneTransform() in r151."),this.applyBoneTransform(e,t)}}class Jc extends at{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Qg extends St{constructor(e=null,t=1,n=1,i,r,a,o,l,c=Mt,h=Mt,u,d){super(null,a,o,l,c,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ll=new Ge,e0=new Ge;class za{constructor(e=[],t=[]){this.uuid=en(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ge)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ge;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:e0;Ll.multiplyMatrices(o,t[r]),Ll.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new za(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Qg(t,e,e,jt,vn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Jc),this.bones.push(a),this.boneInverses.push(new Ge().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class ga extends Nt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const wi=new Ge,Pl=new Ge,ks=[],Il=new sn,t0=new Ge,Qi=new xe,es=new cn;class n0 extends xe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ga(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,t0)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new sn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,wi),Il.copy(e.boundingBox).applyMatrix4(wi),this.boundingBox.union(Il)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new cn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,wi),es.copy(e.boundingSphere).applyMatrix4(wi),this.boundingSphere.union(es)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Qi.geometry=this.geometry,Qi.material=this.material,Qi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),es.copy(this.boundingSphere),es.applyMatrix4(n),e.ray.intersectsSphere(es)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,wi),Pl.multiplyMatrices(n,wi),Qi.matrixWorld=Pl,Qi.raycast(e,ks);for(let a=0,o=ks.length;a<o;a++){const l=ks[a];l.instanceId=r,l.object=this,t.push(l)}ks.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ga(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Qc extends nn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new de(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Dl=new C,Nl=new C,Ul=new Ge,Kr=new hs,Bs=new cn;class Ha extends at{constructor(e=new Ut,t=new Qc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)Dl.fromBufferAttribute(t,i-1),Nl.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Dl.distanceTo(Nl);e.setAttribute("lineDistance",new ot(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Bs.copy(n.boundingSphere),Bs.applyMatrix4(i),Bs.radius+=r,e.ray.intersectsSphere(Bs)===!1)return;Ul.copy(i).invert(),Kr.copy(e.ray).applyMatrix4(Ul);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=new C,h=new C,u=new C,d=new C,f=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){const p=Math.max(0,a.start),M=Math.min(g.count,a.start+a.count);for(let x=p,v=M-1;x<v;x+=f){const R=g.getX(x),w=g.getX(x+1);if(c.fromBufferAttribute(m,R),h.fromBufferAttribute(m,w),Kr.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const I=e.ray.origin.distanceTo(d);I<e.near||I>e.far||t.push({distance:I,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,a.start),M=Math.min(m.count,a.start+a.count);for(let x=p,v=M-1;x<v;x+=f){if(c.fromBufferAttribute(m,x),h.fromBufferAttribute(m,x+1),Kr.distanceSqToSegment(c,h,d,u)>l)continue;d.applyMatrix4(this.matrixWorld);const w=e.ray.origin.distanceTo(d);w<e.near||w>e.far||t.push({distance:w,point:u.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}const Fl=new C,Ol=new C;class i0 extends Ha{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)Fl.fromBufferAttribute(t,i),Ol.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Fl.distanceTo(Ol);e.setAttribute("lineDistance",new ot(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class s0 extends Ha{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class eh extends nn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new de(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const kl=new Ge,_a=new hs,zs=new cn,Hs=new C;class r0 extends at{constructor(e=new Ut,t=new eh){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),zs.copy(n.boundingSphere),zs.applyMatrix4(i),zs.radius+=r,e.ray.intersectsSphere(zs)===!1)return;kl.copy(i).invert(),_a.copy(e.ray).applyMatrix4(kl);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let g=d,_=f;g<_;g++){const m=c.getX(g);Hs.fromBufferAttribute(u,m),Bl(Hs,m,l,i,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,_=f;g<_;g++)Hs.fromBufferAttribute(u,g),Bl(Hs,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Bl(s,e,t,n,i,r,a){const o=_a.distanceSqToPoint(s);if(o<t){const l=new C;_a.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,object:a})}}class a0 extends St{constructor(e,t,n,i,r,a,o,l,c){super(e,t,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ln extends Ut{constructor(e=1,t=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;M(),a===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new ot(u,3)),this.setAttribute("normal",new ot(d,3)),this.setAttribute("uv",new ot(f,2));function M(){const v=new C,R=new C;let w=0;const A=(t-e)/n;for(let I=0;I<=r;I++){const y=[],E=I/r,k=E*(t-e)+e;for(let N=0;N<=i;N++){const J=N/i,P=J*l+o,z=Math.sin(P),V=Math.cos(P);R.x=k*z,R.y=-E*n+m,R.z=k*V,u.push(R.x,R.y,R.z),v.set(z,A,V).normalize(),d.push(v.x,v.y,v.z),f.push(J,1-E),y.push(g++)}_.push(y)}for(let I=0;I<i;I++)for(let y=0;y<r;y++){const E=_[y][I],k=_[y+1][I],N=_[y+1][I+1],J=_[y][I+1];h.push(E,k,J),h.push(k,N,J),w+=6}c.addGroup(p,w,0),p+=w}function x(v){const R=g,w=new Le,A=new C;let I=0;const y=v===!0?e:t,E=v===!0?1:-1;for(let N=1;N<=i;N++)u.push(0,m*E,0),d.push(0,E,0),f.push(.5,.5),g++;const k=g;for(let N=0;N<=i;N++){const P=N/i*l+o,z=Math.cos(P),V=Math.sin(P);A.x=y*V,A.y=m*E,A.z=y*z,u.push(A.x,A.y,A.z),d.push(0,E,0),w.x=z*.5+.5,w.y=V*.5*E+.5,f.push(w.x,w.y),g++}for(let N=0;N<i;N++){const J=R+N,P=k+N;v===!0?h.push(P,P+1,J):h.push(P+1,P,J),I+=3}c.addGroup(p,I,v===!0?1:2),p+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ln(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Li extends ln{constructor(e=1,t=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Li(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class us extends Ut{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const r=[],a=[];o(i),c(n),h(),this.setAttribute("position",new ot(r,3)),this.setAttribute("normal",new ot(r.slice(),3)),this.setAttribute("uv",new ot(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const x=new C,v=new C,R=new C;for(let w=0;w<t.length;w+=3)f(t[w+0],x),f(t[w+1],v),f(t[w+2],R),l(x,v,R,M)}function l(M,x,v,R){const w=R+1,A=[];for(let I=0;I<=w;I++){A[I]=[];const y=M.clone().lerp(v,I/w),E=x.clone().lerp(v,I/w),k=w-I;for(let N=0;N<=k;N++)N===0&&I===w?A[I][N]=y:A[I][N]=y.clone().lerp(E,N/k)}for(let I=0;I<w;I++)for(let y=0;y<2*(w-I)-1;y++){const E=Math.floor(y/2);y%2===0?(d(A[I][E+1]),d(A[I+1][E]),d(A[I][E])):(d(A[I][E+1]),d(A[I+1][E+1]),d(A[I+1][E]))}}function c(M){const x=new C;for(let v=0;v<r.length;v+=3)x.x=r[v+0],x.y=r[v+1],x.z=r[v+2],x.normalize().multiplyScalar(M),r[v+0]=x.x,r[v+1]=x.y,r[v+2]=x.z}function h(){const M=new C;for(let x=0;x<r.length;x+=3){M.x=r[x+0],M.y=r[x+1],M.z=r[x+2];const v=m(M)/2/Math.PI+.5,R=p(M)/Math.PI+.5;a.push(v,1-R)}g(),u()}function u(){for(let M=0;M<a.length;M+=6){const x=a[M+0],v=a[M+2],R=a[M+4],w=Math.max(x,v,R),A=Math.min(x,v,R);w>.9&&A<.1&&(x<.2&&(a[M+0]+=1),v<.2&&(a[M+2]+=1),R<.2&&(a[M+4]+=1))}}function d(M){r.push(M.x,M.y,M.z)}function f(M,x){const v=M*3;x.x=e[v+0],x.y=e[v+1],x.z=e[v+2]}function g(){const M=new C,x=new C,v=new C,R=new C,w=new Le,A=new Le,I=new Le;for(let y=0,E=0;y<r.length;y+=9,E+=6){M.set(r[y+0],r[y+1],r[y+2]),x.set(r[y+3],r[y+4],r[y+5]),v.set(r[y+6],r[y+7],r[y+8]),w.set(a[E+0],a[E+1]),A.set(a[E+2],a[E+3]),I.set(a[E+4],a[E+5]),R.copy(M).add(x).add(v).divideScalar(3);const k=m(R);_(w,E+0,M,k),_(A,E+2,x,k),_(I,E+4,v,k)}}function _(M,x,v,R){R<0&&M.x===1&&(a[x]=M.x-1),v.x===0&&v.z===0&&(a[x]=R/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new us(e.vertices,e.indices,e.radius,e.details)}}class Ga extends us{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ga(e.radius,e.detail)}}class ur extends us{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new ur(e.radius,e.detail)}}class Va extends us{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Va(e.radius,e.detail)}}class Jn extends Ut{constructor(e=.5,t=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],h=[];let u=e;const d=(t-e)/i,f=new C,g=new Le;for(let _=0;_<=i;_++){for(let m=0;m<=n;m++){const p=r+m/n*a;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let _=0;_<i;_++){const m=_*(n+1);for(let p=0;p<n;p++){const M=p+m,x=M,v=M+n+1,R=M+n+2,w=M+1;o.push(x,v,w),o.push(v,R,w)}}this.setIndex(o),this.setAttribute("position",new ot(l,3)),this.setAttribute("normal",new ot(c,3)),this.setAttribute("uv",new ot(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jn(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class kt extends Ut{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new C,d=new C,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const M=[],x=p/n;let v=0;p===0&&a===0?v=.5/t:p===n&&l===Math.PI&&(v=-.5/t);for(let R=0;R<=t;R++){const w=R/t;u.x=-e*Math.cos(i+w*r)*Math.sin(a+x*o),u.y=e*Math.cos(a+x*o),u.z=e*Math.sin(i+w*r)*Math.sin(a+x*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(w+v,1-x),M.push(c++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<t;M++){const x=h[p][M+1],v=h[p][M],R=h[p+1][M],w=h[p+1][M+1];(p!==0||a>0)&&f.push(x,v,w),(p!==n-1||l<Math.PI)&&f.push(v,R,w)}this.setIndex(f),this.setAttribute("position",new ot(g,3)),this.setAttribute("normal",new ot(_,3)),this.setAttribute("uv",new ot(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Wa extends Ut{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const a=[],o=[],l=[],c=[],h=new C,u=new C,d=new C;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){const _=g/i*r,m=f/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(_),u.y=(e+t*Math.cos(m))*Math.sin(_),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){const _=(i+1)*f+g-1,m=(i+1)*(f-1)+g-1,p=(i+1)*(f-1)+g,M=(i+1)*f+g;a.push(_,m,M),a.push(m,p,M)}this.setIndex(a),this.setAttribute("position",new ot(o,3)),this.setAttribute("normal",new ot(l,3)),this.setAttribute("uv",new ot(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wa(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class qa extends nn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new de(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new de(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pa,this.normalScale=new Le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Sn extends qa{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Le(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return At(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new de(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new de(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new de(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class ht extends nn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new de(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new de(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pa,this.normalScale=new Le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ra,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}function Gs(s,e,t){return!s||!t&&s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function o0(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function l0(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function zl(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let l=0;l!==e;++l)i[a++]=s[o+l]}return i}function th(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=s[i++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=s[i++];while(r!==void 0)}class ds{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let a=0;a!==i;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class c0 extends ds{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ti,endingEnd:Ti}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,a=e+1,o=i[r],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ai:r=e,o=2*t-n;break;case Zs:r=i.length-2,o=t+i[r]-i[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ai:a=e,l=2*n-t;break;case Zs:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}const c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,M=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,x=(-1-f)*m+(1.5+f)*_+.5*g,v=f*m-f*_;for(let R=0;R!==o;++R)r[R]=p*a[h+R]+M*a[c+R]+x*a[l+R]+v*a[u+R];return r}}class nh extends ds{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}}class h0 extends ds{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class hn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Gs(t,this.TimeBufferType),this.values=Gs(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Gs(e.times,Array),values:Gs(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new h0(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new nh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new c0(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ls:t=this.InterpolantFactoryMethodDiscrete;break;case Bi:t=this.InterpolantFactoryMethodLinear;break;case Er:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ls;case this.InterpolantFactoryMethodLinear:return Bi;case this.InterpolantFactoryMethodSmooth:return Er}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,a=i-1;for(;r!==i&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&o0(i))for(let o=0,l=i.length;o!==l;++o){const c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Er,r=e.length-1;let a=1;for(let o=1;o<r;++o){let l=!1;const c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(i)l=!0;else{const u=o*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[f+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];const u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}hn.prototype.TimeBufferType=Float32Array;hn.prototype.ValueBufferType=Float32Array;hn.prototype.DefaultInterpolation=Bi;class qi extends hn{}qi.prototype.ValueTypeName="bool";qi.prototype.ValueBufferType=Array;qi.prototype.DefaultInterpolation=ls;qi.prototype.InterpolantFactoryMethodLinear=void 0;qi.prototype.InterpolantFactoryMethodSmooth=void 0;class ih extends hn{}ih.prototype.ValueTypeName="color";class Gi extends hn{}Gi.prototype.ValueTypeName="number";class u0 extends ds{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t);let c=e*o;for(let h=c+o;c!==h;c+=4)tn.slerpFlat(r,0,a,c-o,a,c,l);return r}}class ri extends hn{InterpolantFactoryMethodLinear(e){return new u0(this.times,this.values,this.getValueSize(),e)}}ri.prototype.ValueTypeName="quaternion";ri.prototype.DefaultInterpolation=Bi;ri.prototype.InterpolantFactoryMethodSmooth=void 0;class Xi extends hn{}Xi.prototype.ValueTypeName="string";Xi.prototype.ValueBufferType=Array;Xi.prototype.DefaultInterpolation=ls;Xi.prototype.InterpolantFactoryMethodLinear=void 0;Xi.prototype.InterpolantFactoryMethodSmooth=void 0;class Vi extends hn{}Vi.prototype.ValueTypeName="vector";class xa{constructor(e,t=-1,n,i=La){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=en(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(f0(n[a]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(hn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);const h=l0(l);l=zl(l,1,h),c=zl(c,1,h),!i&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new Gi(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){const c=e[o],h=c.name.match(r);if(h&&h.length>1){const u=h[1];let d=i[u];d||(i[u]=d=[]),d.push(c)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,g,_){if(f.length!==0){const m=[],p=[];th(f,m,p,g),m.length!==0&&_.push(new u(d,m,p))}},i=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let u=0;u<c.length;u++){const d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(const _ in f){const m=[],p=[];for(let M=0;M!==d[g].morphTargets.length;++M){const x=d[g];m.push(x.time),p.push(x.morphTarget===_?1:0)}i.push(new Gi(".morphTargetInfluence["+_+"]",m,p))}l=f.length*a}else{const f=".bones["+t[u].name+"]";n(Vi,f+".position",d,"pos",i),n(ri,f+".quaternion",d,"rot",i),n(Vi,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,l,i,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function d0(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Gi;case"vector":case"vector2":case"vector3":case"vector4":return Vi;case"color":return ih;case"quaternion":return ri;case"bool":case"boolean":return qi;case"string":return Xi}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function f0(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=d0(s.type);if(s.times===void 0){const t=[],n=[];th(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const Un={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class p0{constructor(e,t,n){const i=this;let r=!1,a=0,o=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,r===!1&&i.onStart!==void 0&&i.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const m0=new p0;class ji{constructor(e){this.manager=e!==void 0?e:m0,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}ji.DEFAULT_MATERIAL_NAME="__DEFAULT";const _n={};class g0 extends Error{constructor(e,t){super(e),this.response=t}}class sh extends ji{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Un.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(_n[e]!==void 0){_n[e].push({onLoad:t,onProgress:n,onError:i});return}_n[e]=[],_n[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const h=_n[e],u=c.body.getReader(),d=c.headers.get("Content-Length")||c.headers.get("X-File-Size"),f=d?parseInt(d):0,g=f!==0;let _=0;const m=new ReadableStream({start(p){M();function M(){u.read().then(({done:x,value:v})=>{if(x)p.close();else{_+=v.byteLength;const R=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let w=0,A=h.length;w<A;w++){const I=h[w];I.onProgress&&I.onProgress(R)}p.enqueue(v),M()}})}}});return new Response(m)}else throw new g0(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o===void 0)return c.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return c.arrayBuffer().then(g=>f.decode(g))}}}).then(c=>{Un.add(e,c);const h=_n[e];delete _n[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(c)}}).catch(c=>{const h=_n[e];if(h===void 0)throw this.manager.itemError(e),c;delete _n[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class _0 extends ji{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Un.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=cs("img");function l(){h(),Un.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){h(),i&&i(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class rh extends ji{constructor(e){super(e)}load(e,t,n,i){const r=new St,a=new _0(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class dr extends at{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new de(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class x0 extends dr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(at.DEFAULT_UP),this.updateMatrix(),this.groundColor=new de(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Zr=new Ge,Hl=new C,Gl=new C;class Xa{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Le(512,512),this.map=null,this.mapPass=null,this.matrix=new Ge,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ua,this._frameExtents=new Le(1,1),this._viewportCount=1,this._viewports=[new et(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Hl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Hl),Gl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Gl),t.updateMatrixWorld(),Zr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Zr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Zr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class v0 extends Xa{constructor(){super(new Dt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=zi*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class y0 extends dr{constructor(e,t,n=0,i=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(at.DEFAULT_UP),this.updateMatrix(),this.target=new at,this.distance=n,this.angle=i,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new v0}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Vl=new Ge,ts=new C,Jr=new C;class M0 extends Xa{constructor(){super(new Dt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Le(4,2),this._viewportCount=6,this._viewports=[new et(2,1,1,1),new et(0,1,1,1),new et(3,1,1,1),new et(1,1,1,1),new et(3,0,1,1),new et(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ts.setFromMatrixPosition(e.matrixWorld),n.position.copy(ts),Jr.copy(n.position),Jr.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Jr),n.updateMatrixWorld(),i.makeTranslation(-ts.x,-ts.y,-ts.z),Vl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Vl)}}class S0 extends dr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new M0}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class b0 extends Xa{constructor(){super(new Fa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ah extends dr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(at.DEFAULT_UP),this.updateMatrix(),this.target=new at,this.shadow=new b0}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class as{static decodeText(e){if(typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class E0 extends ji{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Un.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{i&&i(c)});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return Un.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Un.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});Un.add(e,l),r.manager.itemStart(e)}}class w0{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,a;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,r=e*i+i;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[r+o]=n[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(n,r,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){o.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,a=i;r!==a;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){tn.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){const a=this._workIndex*r;tn.multiplyQuaternionsFlat(e,a,e,t,e,n),tn.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,r){const a=1-i;for(let o=0;o!==r;++o){const l=t+o;e[l]=e[l]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,r){for(let a=0;a!==r;++a){const o=t+a;e[o]=e[o]+e[n+a]*i}}}const ja="\\[\\]\\.:\\/",T0=new RegExp("["+ja+"]","g"),$a="[^"+ja+"]",A0="[^"+ja.replace("\\.","")+"]",R0=/((?:WC+[\/:])*)/.source.replace("WC",$a),C0=/(WCOD+)?/.source.replace("WCOD",A0),L0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",$a),P0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",$a),I0=new RegExp("^"+R0+C0+L0+P0+"$"),D0=["material","materials","bones","map"];class N0{constructor(e,t,n){const i=n||$e.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class $e{constructor(e,t,n){this.path=t,this.parsedPath=n||$e.parseTrackName(t),this.node=$e.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new $e.Composite(e,t,n):new $e(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(T0,"")}static parseTrackName(e){const t=I0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);D0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=$e.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const a=e[i];if(a===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}$e.Composite=N0;$e.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};$e.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};$e.prototype.GetterByBindingType=[$e.prototype._getValue_direct,$e.prototype._getValue_array,$e.prototype._getValue_arrayElement,$e.prototype._getValue_toArray];$e.prototype.SetterByBindingTypeAndVersioning=[[$e.prototype._setValue_direct,$e.prototype._setValue_direct_setNeedsUpdate,$e.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_array,$e.prototype._setValue_array_setNeedsUpdate,$e.prototype._setValue_array_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_arrayElement,$e.prototype._setValue_arrayElement_setNeedsUpdate,$e.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[$e.prototype._setValue_fromArray,$e.prototype._setValue_fromArray_setNeedsUpdate,$e.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class U0{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const r=t.tracks,a=r.length,o=new Array(a),l={endingStart:Ti,endingEnd:Ti};for(let c=0;c!==a;++c){const h=r[c].createInterpolant(null);o[c]=h,h.settings=l}this._interpolantSettings=l,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Lc,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const i=this._clip.duration,r=e._clip.duration,a=r/i,o=i/r;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,r=i.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);const l=o.parameterPositions,c=o.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/a,c[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const r=this._startTime;if(r!==null){const l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case gu:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulateAdditive(o);break;case La:default:for(let h=0,u=l.length;h!==u;++h)l[h].evaluate(a),c[h].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,r=this._loopCount;const a=n===mu;if(e===0)return r===-1?i:a&&(r&1)===1?t-i:i;if(n===Cc){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){const o=Math.floor(i/t);i-=t*o,r+=Math.abs(o);const l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=i;if(a&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=Ai,i.endingEnd=Ai):(e?i.endingStart=this.zeroSlopeAtStart?Ai:Ti:i.endingStart=Zs,t?i.endingEnd=this.zeroSlopeAtEnd?Ai:Ti:i.endingEnd=Zs)}_scheduleFading(e,t,n){const i=this._mixer,r=i.time;let a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,l=a.sampleValues;return o[0]=r,l[0]=t,o[1]=r+e,l[1]=n,this}}const F0=new Float32Array(1);class O0 extends li{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,a=e._propertyBindings,o=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let h=c[l];h===void 0&&(h={},c[l]=h);for(let u=0;u!==r;++u){const d=i[u],f=d.name;let g=h[f];if(g!==void 0)++g.referenceCount,a[u]=g;else{if(g=a[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,l,f));continue}const _=t&&t._propertyBindings[u].binding.parsedPath;g=new w0($e.create(n,f,_),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,l,f),a[u]=g}o[u].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,r=this._actionsByClip;let a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const r=e._clip.uuid,a=this._actionsByClip,o=a[r],l=o.knownActions,c=l[l.length-1],h=e._byClipCacheIndex;c._byClipCacheIndex=h,l[h]=c,l.pop(),e._byClipCacheIndex=null;const u=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],l.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,r=this._bindings;let a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new nh(new Float32Array(2),new Float32Array(2),1,F0),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){const i=t||this._root,r=i.uuid;let a=typeof e=="string"?xa.findByName(i,e):e;const o=a!==null?a.uuid:e,l=this._actionsByClip[o];let c=null;if(n===void 0&&(a!==null?n=a.blendMode:n=La),l!==void 0){const u=l.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;c=l.knownActions[0],a===null&&(a=c._clip)}if(a===null)return null;const h=new U0(this,a,t,n);return this._bindAction(h,c),this._addInactiveAction(h,o,r),h}existingAction(e,t){const n=t||this._root,i=n.uuid,r=typeof e=="string"?xa.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,r,a);const o=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)o[c].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){const a=r.knownActions;for(let o=0,l=a.length;o!==l;++o){const c=a[o];this._deactivateAction(c);const h=c._cacheIndex,u=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,l=o[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(const a in r){const o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class k0{constructor(e,t,n=0,i=1/0){this.ray=new hs(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Na,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return va(e,this,n,t),n.sort(Wl),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)va(e[i],this,n,t);return n.sort(Wl),n}}function Wl(s,e){return s.distance-e.distance}function va(s,e,t,n){if(s.layers.test(e.layers)&&s.raycast(e,t),n===!0){const i=s.children;for(let r=0,a=i.length;r<a;r++)va(i[r],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Aa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Aa);const q={meta:{title:"HERO X",subtitle:"모험의 던전",version:"0.7.0-b.1"},controls:{up:["KeyW","ArrowUp"],down:["KeyS","ArrowDown"],left:["KeyA","ArrowLeft"],right:["KeyD","ArrowRight"],attackMelee:["Mouse0","KeyJ"],attackRanged:["Mouse2","KeyK"],jump:["Space"],dodge:["ShiftLeft","ShiftRight","KeyL"],restart:["KeyR"],toggleGuide:["KeyH"],toggleInventory:["KeyI","Tab"],interact:["KeyE","KeyF"]},player:{maxHp:100,invulnerableTime:.6,hitKnockback:6,moveSpeed:7,attackMoveFactor:.6,dash:{speed:20,duration:.22,cooldown:.9,invulnerable:!0},jumpSpeed:8,gravity:24,turnSpeed:14,radius:.5,startPosition:{x:0,z:0},colors:{body:"#2f6df6",accent:"#ffc531",skin:"#f3c6a0",visor:"#5cf2d8"}},combat:{autoAimRange:14,melee:{damage:12,range:1.9,arcDegrees:110,cooldown:.45,knockback:7,swingTime:.22},ranged:{damage:8,speed:22,cooldown:.5,lifetime:1.6,radius:.18,knockback:3}},enemies:{types:{rusher:{name:"돌진 로봇",hp:30,speed:4.2,radius:.55,damage:10,attackRange:1.5,attackWindup:.35,attackCooldown:1.3,aggroRange:20,color:"#ff7a45",score:10},shooter:{name:"포격 드론",hp:20,speed:3.2,radius:.5,damage:8,attackRange:9,attackWindup:.5,attackCooldown:2.2,aggroRange:22,color:"#b06bff",score:15,attackKind:"ranged",retreatRange:4.5,projectileSpeed:11},tank:{name:"철벽 로봇",hp:90,speed:1.9,radius:.9,damage:18,attackRange:2,attackWindup:.6,attackCooldown:2,aggroRange:16,color:"#5b7bd6",score:30,knockbackResist:.25},stalker:{name:"박쥐 드론",hp:18,speed:7.5,radius:.45,damage:7,attackRange:1.3,attackWindup:.25,attackCooldown:.9,aggroRange:16,color:"#8e6cff",score:14,attackKind:"melee",model:"shooter"},artillery:{name:"요새 포대",hp:70,speed:1.6,radius:.8,damage:16,attackRange:13,attackWindup:.9,attackCooldown:2.2,aggroRange:18,color:"#c0392b",score:40,attackKind:"ranged",retreatRange:5,projectileSpeed:12,knockbackResist:.4,model:"tank"}},spawns:[{type:"rusher",x:12,z:-12},{type:"rusher",x:-14,z:-6},{type:"rusher",x:16,z:6},{type:"rusher",x:-10,z:16},{type:"rusher",x:4,z:20},{type:"rusher",x:-20,z:-18},{type:"shooter",x:18,z:-2},{type:"shooter",x:-6,z:-22},{type:"shooter",x:20,z:18},{type:"tank",x:-22,z:12},{type:"tank",x:10,z:-22}],separation:2.5,deathDuration:.6},camera:{fov:50,offset:{x:0,y:13,z:11},lookAtHeight:1,smoothing:6,near:.1,far:300},world:{arenaHalfSize:28,floorColor:"#79b85a",floorAltColor:"#6fae50",wallHeight:1.2,wallColor:"#a6773f",backgroundColor:"#8ec9ff",fogNear:40,fogFar:90,obstacles:[{x:6,z:-4,w:2,d:2,h:2,color:"#d9a066"},{x:8.2,z:-4,w:2,d:2,h:2,color:"#d9a066"},{x:7,z:-6.2,w:2,d:2,h:1.4,color:"#e0ad6c"},{x:-8,z:-8,w:1.2,d:1.2,h:4,color:"#9aa3b2"},{x:-8,z:8,w:1.2,d:1.2,h:4,color:"#9aa3b2"},{x:8,z:8,w:1.2,d:1.2,h:4,color:"#9aa3b2"},{x:0,z:-14,w:10,d:1,h:1.6,color:"#a6773f"},{x:-16,z:2,w:1,d:8,h:1.6,color:"#a6773f"},{x:14,z:14,w:3,d:3,h:2.5,color:"#7f8795"},{x:-14,z:-16,w:2.5,d:2.5,h:2,color:"#7f8795"}]},graphics:{shadows:!0,maxPixelRatio:2,antialias:!0,shadowMapSize:2048},difficulty:{default:"normal",presets:{easy:{label:"쉬움",enemyHp:.8,enemyDamage:.7,enemySpeed:.9},normal:{label:"보통",enemyHp:1.15,enemyDamage:1.1,enemySpeed:1},hard:{label:"어려움",enemyHp:1.6,enemyDamage:1.6,enemySpeed:1.15}}},loot:{healChance:.25,healAmount:25,goldChance:.6,goldMin:3,goldMax:12,xpPerScore:1,lifetime:20,magnetRange:3.5,magnetSpeed:6,pickupRadius:.9},dungeon:{name:"잊혀진 숲",chests:[{x:-22,z:-4},{x:12,z:2},{x:-4,z:24}],chestLoot:{goldMin:15,goldMax:40,equipChance:.8,healChance:.5,interactRange:2.2}},boss:{name:"숲의 수호 로봇",hp:420,speed:2.8,radius:1.6,color:"#3f8f5f",score:300,knockbackResist:.1,spawn:{x:0,z:-20},contactDamage:22,engageRange:11,chargeMinRange:5,windup:{charge:.8,slam:.7,barrage:.6,summon:.9,mortar:.8},closePatterns:["slam","barrage"],useCharge:!0,model:"guardian",chargeDuration:.55,recover:.7,cooldown:1.3,phase2Ratio:.5,phase2TimeMul:.7,phase2SpeedMul:1.3,charge:{speed:18},slam:{radius:4.5,damage:26},barrage:{count:8,phase2Count:12,damage:10,speed:9},summon:{type:"stalker",count:2,phase2Count:3,maxAlive:4},mortar:{count:3,phase2Count:5,delay:1.1,radius:2.4,damage:18,spread:3.5},reward:{goldMin:80,goldMax:150,xp:120,equipMinRarity:"rare"}},equipment:{dropChance:.3,inventorySize:20,defenseScale:50,rarities:{common:{label:"일반",prefix:"",statMul:1,weight:55,color:"#cdd6f4"},uncommon:{label:"고급",prefix:"튼튼한",statMul:1.3,weight:25,color:"#7dffb0"},rare:{label:"희귀",prefix:"희귀한",statMul:1.7,weight:13,color:"#5b8dff"},epic:{label:"영웅",prefix:"영웅의",statMul:2.2,weight:5,color:"#c77dff"},legendary:{label:"전설",prefix:"전설의",statMul:3,weight:2,color:"#ffc531"}}},progression:{xpBase:40,xpGrowth:1.35,hpPerLevel:10,damagePerLevel:.08,maxLevel:30,levelUpHealRatio:.5},hud:{showDamageNumbers:!0},save:{autoSaveInterval:3},debug:{showFps:!0}},B0={"player.maxHp":{min:1,max:9999},"player.invulnerableTime":{min:0,max:5},"player.hitKnockback":{min:0,max:50},"player.moveSpeed":{min:1,max:30},"player.attackMoveFactor":{min:0,max:1},"player.jumpSpeed":{min:1,max:30},"player.gravity":{min:1,max:100},"player.dash.speed":{min:1,max:60},"player.dash.duration":{min:.05,max:2},"player.dash.cooldown":{min:0,max:10},"combat.autoAimRange":{min:2,max:60},"boss.summon.count":{min:0,max:10},"boss.summon.maxAlive":{min:0,max:20},"boss.mortar.count":{min:0,max:20},"boss.mortar.delay":{min:.3,max:5},"boss.mortar.radius":{min:.5,max:10},"boss.mortar.damage":{min:0,max:999},"combat.ranged.damage":{min:1,max:9999},"combat.ranged.speed":{min:1,max:100},"combat.ranged.cooldown":{min:.05,max:5},"combat.ranged.lifetime":{min:.1,max:10},"combat.ranged.radius":{min:.05,max:2},"combat.ranged.knockback":{min:0,max:50},"player.turnSpeed":{min:1,max:40},"player.radius":{min:.2,max:2},"combat.melee.damage":{min:1,max:9999},"combat.melee.range":{min:.5,max:10},"combat.melee.arcDegrees":{min:10,max:360},"combat.melee.cooldown":{min:.05,max:5},"combat.melee.knockback":{min:0,max:50},"combat.melee.swingTime":{min:.05,max:2},"enemies.separation":{min:0,max:20},"loot.healChance":{min:0,max:1},"loot.healAmount":{min:1,max:9999},"loot.goldChance":{min:0,max:1},"loot.goldMin":{min:0,max:99999},"loot.goldMax":{min:0,max:99999},"loot.xpPerScore":{min:.1,max:100},"loot.lifetime":{min:1,max:600},"loot.magnetRange":{min:0,max:30},"loot.magnetSpeed":{min:0,max:50},"loot.pickupRadius":{min:.2,max:5},"dungeon.chestLoot.goldMin":{min:0,max:99999},"dungeon.chestLoot.goldMax":{min:0,max:99999},"dungeon.chestLoot.equipChance":{min:0,max:1},"dungeon.chestLoot.healChance":{min:0,max:1},"dungeon.chestLoot.interactRange":{min:.5,max:10},"boss.hp":{min:1,max:99999},"boss.speed":{min:0,max:30},"boss.radius":{min:.5,max:6},"boss.contactDamage":{min:0,max:9999},"boss.engageRange":{min:1,max:60},"boss.chargeMinRange":{min:0,max:60},"boss.chargeDuration":{min:.1,max:5},"boss.recover":{min:0,max:5},"boss.cooldown":{min:0,max:10},"boss.phase2Ratio":{min:0,max:1},"boss.phase2TimeMul":{min:.2,max:1},"boss.phase2SpeedMul":{min:1,max:3},"boss.charge.speed":{min:1,max:60},"boss.slam.radius":{min:.5,max:30},"boss.slam.damage":{min:0,max:9999},"boss.barrage.count":{min:1,max:64},"boss.barrage.phase2Count":{min:1,max:64},"boss.barrage.damage":{min:0,max:9999},"boss.barrage.speed":{min:1,max:60},"equipment.dropChance":{min:0,max:1},"equipment.inventorySize":{min:1,max:200},"equipment.defenseScale":{min:1,max:1e3},"progression.xpBase":{min:1,max:99999},"progression.xpGrowth":{min:1,max:3},"progression.hpPerLevel":{min:0,max:1e3},"progression.damagePerLevel":{min:0,max:1},"progression.maxLevel":{min:1,max:999},"save.autoSaveInterval":{min:.5,max:600},"progression.levelUpHealRatio":{min:0,max:1},"enemies.deathDuration":{min:0,max:5},"camera.fov":{min:30,max:90},"camera.offset.y":{min:3,max:40},"camera.offset.z":{min:0,max:40},"camera.smoothing":{min:.5,max:30},"world.arenaHalfSize":{min:10,max:200},"graphics.maxPixelRatio":{min:1,max:3}},z0={hp:{min:1,max:99999},speed:{min:0,max:30},radius:{min:.2,max:5},damage:{min:0,max:9999},attackRange:{min:.3,max:30},attackWindup:{min:0,max:5},attackCooldown:{min:.1,max:20},aggroRange:{min:1,max:200},score:{min:0,max:99999}},Qr=(s,e,t)=>typeof s=="number"&&!Number.isNaN(s)?Math.min(t,Math.max(e,s)):e;function H0(s){const e=[];for(const[t,{min:n,max:i}]of Object.entries(B0)){const r=t.split(".");let a=s;for(let h=0;h<r.length-1;h++)a=a?.[r[h]];const o=r[r.length-1];if(!a||typeof a!="object")continue;const l=a[o],c=Qr(l,n,i);c!==l&&(a[o]=c,e.push({path:t,from:typeof l=="number"?l:NaN,to:c}))}for(const[t,n]of Object.entries(s.difficulty.presets))for(const i of["enemyHp","enemyDamage","enemySpeed"]){const r=n[i],a=Qr(r,.1,5);a!==r&&(n[i]=a,e.push({path:`difficulty.presets.${t}.${i}`,from:typeof r=="number"?r:NaN,to:a}))}for(const[t,n]of Object.entries(s.enemies.types))for(const[i,{min:r,max:a}]of Object.entries(z0)){const o=i,l=n[o],c=Qr(l,r,a);c!==l&&(n[o]=c,e.push({path:`enemies.types.${t}.${i}`,from:typeof l=="number"?l:NaN,to:c}))}return e}const ai=(s,e,t)=>Math.max(e,Math.min(t,s));function G0(s,e=0){const t=Math.hypot(s.x,s.z);if(t<1e-6)return{x:0,z:0};const n=s.x/t,i=s.z/t,r=Math.cos(e),a=Math.sin(e);return{x:n*r+i*a,z:-n*a+i*r}}function Ya(s,e,t){const n={x:s.x,z:s.z};for(const i of t){const r=i.w/2,a=i.d/2,o=ai(n.x,i.x-r,i.x+r),l=ai(n.z,i.z-a,i.z+a),c=n.x-o,h=n.z-l,u=c*c+h*h;if(!(u>=e*e))if(u<1e-9){const d=r+e-Math.abs(n.x-i.x),f=a+e-Math.abs(n.z-i.z);d<f?n.x+=Math.sign(n.x-i.x||1)*d:n.z+=Math.sign(n.z-i.z||1)*f}else{const d=Math.sqrt(u);n.x=o+c/d*e,n.z=l+h/d*e}}return n}function Ka(s,e,t){const n=Math.max(0,e-t);return{x:ai(s.x,-n,n),z:ai(s.z,-n,n)}}function Za(s,e,t){let n=(e-s)%(Math.PI*2);return n>Math.PI&&(n-=Math.PI*2),n<-Math.PI&&(n+=Math.PI*2),s+n*ai(t,0,1)}function fr(s){return Math.atan2(s.x,s.z)}function V0(s,e,t,n){if(Math.abs(s.x)>n||Math.abs(s.z)>n)return!0;for(const i of t){const r=ai(s.x,i.x-i.w/2,i.x+i.w/2),a=ai(s.z,i.z-i.d/2,i.z+i.d/2);if((s.x-r)**2+(s.z-a)**2<e*e)return!0}return!1}function W0(s,e,t){let n=s.vy-t*e,i=s.y+n*e;return i<=0&&(i=0,n=0),{y:i,vy:n}}function q0(){return{timer:0,cooldown:0,dir:{x:0,z:1}}}function X0(s,e,t,n){if(s.timer>0||s.cooldown>0)return!1;const i=Math.hypot(e.x,e.z);return s.dir=i>1e-6?{x:e.x/i,z:e.z/i}:{x:0,z:1},s.timer=t,s.cooldown=n,!0}function j0(s,e){s.timer>0&&(s.timer=Math.max(0,s.timer-e)),s.cooldown>0&&(s.cooldown=Math.max(0,s.cooldown-e))}function $0(s,e,t,n,i,r){const a=t.x-s.x,o=t.z-s.z,l=Math.hypot(a,o);if(l-n>i)return!1;if(l<1e-6)return!0;let h=Math.atan2(a,o)-e;for(;h>Math.PI;)h-=Math.PI*2;for(;h<-Math.PI;)h+=Math.PI*2;const u=Math.atan2(n,l),d=r*Math.PI/180/2;return Math.abs(h)<=d+u}class Y0{constructor(e,t,n,i,r,a,o=()=>{},l=()=>1,c=()=>0){this.player=e,this.input=t,this.getEnemies=n,this.getAimPoint=i,this.effects=r,this.projectiles=a,this.onEnemyDamaged=o,this.getDamageMultiplier=l,this.getWeaponAttack=c,this.kills=0,this.score=0,this.meleeCooldown=0,this.rangedCooldown=0,this.onAttack=null,this.tmp=new C}reset(){this.kills=0,this.score=0,this.meleeCooldown=0,this.rangedCooldown=0}update(e){if(this.meleeCooldown>0&&(this.meleeCooldown-=e),this.rangedCooldown>0&&(this.rangedCooldown-=e),this.player.health.isDead)return;const t=q.controls;this.meleeCooldown<=0&&this.input.isActionDown(t.attackMelee)?this.meleeAttack():this.rangedCooldown<=0&&this.input.isActionDown(t.attackRanged)&&this.rangedAttack()}damageEnemy(e,t,n,i){if(!e.alive||!e.hit(t,n,i))return!1;const r=e.position;return this.tmp.set(r.x,.8,r.z),e.alive?this.effects.burst(this.tmp,16777215,5,3):(this.effects.burst(this.tmp,e.def.color,18,7),this.kills++,this.score+=e.def.score),this.onEnemyDamaged(e,t,!e.alive),!0}faceAim(){const e=this.player.position,t=this.getAimPoint();if(t){const n={x:t.x-e.x,z:t.z-e.z};Math.hypot(n.x,n.z)>.25&&(this.player.facing=fr(n))}return{x:Math.sin(this.player.facing),z:Math.cos(this.player.facing)}}meleeAttack(){const e=q.combat.melee;this.meleeCooldown=e.cooldown,this.onAttack?.("melee"),this.faceAim();const t=this.player.position;this.player.triggerAttack(e.swingTime),this.effects.swing(t,this.player.facing,e.range,e.arcDegrees,e.swingTime);const n={x:t.x,z:t.z};for(const i of this.getEnemies()){if(!i.alive)continue;const r=i.position;if(!$0(n,this.player.facing,{x:r.x,z:r.z},i.radius,e.range,e.arcDegrees))continue;const a=Math.hypot(r.x-t.x,r.z-t.z)||1;this.damageEnemy(i,Math.round((e.damage+this.getWeaponAttack("melee"))*this.getDamageMultiplier()),{x:(r.x-t.x)/a,z:(r.z-t.z)/a},e.knockback)}}rangedAttack(){const e=q.combat.ranged;this.rangedCooldown=e.cooldown,this.onAttack?.("ranged");const t=this.faceAim(),n=this.player.position;this.player.triggerAttack(.15),this.projectiles.spawn({x:n.x+t.x*.7,z:n.z+t.z*.7},t,{damage:Math.round((e.damage+this.getWeaponAttack("ranged"))*this.getDamageMultiplier()),speed:e.speed,lifetime:e.lifetime,radius:e.radius,knockback:e.knockback,color:6091480,friendly:!0})}}class K0{constructor(e,t=120){this.root=new Ke,this.swings=[],this.particles=[],this.particleGeo=new je(.16,.16,.16),this.root.name="Effects",e.add(this.root);for(let n=0;n<t;n++){const i=new xe(this.particleGeo,new ft({color:16777215}));i.visible=!1,this.root.add(i),this.particles.push({mesh:i,v:new C,life:0,max:1})}}swing(e,t,n,i,r,a=6091480){const o=i*Math.PI/180,l=new Jn(.45,n,24,1,Math.PI/2-o/2,o),c=new ft({color:a,transparent:!0,opacity:.75,side:Ot,depthWrite:!1}),h=new xe(l,c);h.position.set(e.x,.5,e.z),h.rotation.order="YXZ",h.rotation.y=t,h.rotation.x=Math.PI/2,this.root.add(h),this.swings.push({mesh:h,life:r,max:r})}shockwave(e,t,n=.45,i=16732025){const r=new Jn(t*.8,t,48),a=new ft({color:i,transparent:!0,opacity:.8,side:Ot,depthWrite:!1}),o=new xe(r,a);o.position.set(e.x,.08,e.z),o.rotation.x=-Math.PI/2,o.scale.setScalar(.2),this.root.add(o),this.swings.push({mesh:o,life:n,max:n,grow:!0})}marker(e,t,n,i=16742981){const r=new Jn(t*.7,t,40),a=new ft({color:i,transparent:!0,opacity:.2,side:Ot,depthWrite:!1}),o=new xe(r,a);o.position.set(e.x,.07,e.z),o.rotation.x=-Math.PI/2,this.root.add(o),this.swings.push({mesh:o,life:n,max:n,grow:!1,warn:!0})}burst(e,t,n=8,i=5){let r=0;for(const a of this.particles)if(!(a.life>0)&&(a.mesh.visible=!0,a.mesh.position.copy(e),a.mesh.material.color.set(t),a.v.set(Math.random()-.5,Math.random()*.8+.3,Math.random()-.5).normalize().multiplyScalar(i*(.5+Math.random()*.5)),a.life=a.max=.4+Math.random()*.4,a.mesh.scale.setScalar(.6+Math.random()*.8),++r>=n))break}update(e){for(let t=this.swings.length-1;t>=0;t--){const n=this.swings[t];n.life-=e;const i=Math.max(0,n.life/n.max);n.warn?(n.mesh.material.opacity=.25+(1-i)*.6*(.7+.3*Math.sin(n.life*25)),n.mesh.scale.setScalar(1)):(n.mesh.material.opacity=.75*i,n.mesh.scale.setScalar(n.grow?.2+(1-i)*.8:1+(1-i)*.15)),n.life<=0&&(this.root.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material.dispose(),this.swings.splice(t,1))}for(const t of this.particles)t.life<=0||(t.life-=e,t.v.y-=16*e,t.mesh.position.addScaledVector(t.v,e),t.mesh.position.y<.08&&(t.mesh.position.y=.08,t.v.y*=-.3,t.v.x*=.7,t.v.z*=.7),t.mesh.rotation.x+=e*6,t.mesh.rotation.z+=e*4,t.mesh.scale.setScalar(Math.max(.01,t.life/t.max)*1.2),t.life<=0&&(t.mesh.visible=!1))}dispose(){this.root.removeFromParent(),this.particleGeo.dispose(),this.particles.forEach(e=>e.mesh.material.dispose()),this.swings.forEach(e=>{e.mesh.geometry.dispose(),e.mesh.material.dispose()})}}const ql=.9,Z0=1;class J0{constructor(e){this.root=new Ke,this.shots=[],this.geo=new kt(1,10,8),this.root.name="Projectiles",e.add(this.root)}spawn(e,t,n){const i=new xe(this.geo,new ft({color:n.color}));i.position.set(e.x,ql,e.z),i.scale.set(n.radius,n.radius,n.radius*2.2),i.lookAt(e.x+t.x,ql,e.z+t.z),this.root.add(i),this.shots.push({mesh:i,dir:{x:t.x,z:t.z},life:n.lifetime,spec:n})}get count(){return this.shots.length}update(e,t){const n=t.world.getObstacleBoxes(),i=t.world.getArenaHalfSize();for(let r=this.shots.length-1;r>=0;r--){const a=this.shots[r];a.life-=e,a.mesh.position.x+=a.dir.x*a.spec.speed*e,a.mesh.position.z+=a.dir.z*a.spec.speed*e;const o={x:a.mesh.position.x,z:a.mesh.position.z};let l=a.life<=0||V0(o,a.spec.radius,n,i);if(!l&&a.spec.friendly)for(const c of t.enemies){if(!c.alive)continue;const h=c.radius+a.spec.radius;if((c.position.x-o.x)**2+(c.position.z-o.z)**2<h*h){t.onHitEnemy(c,a.spec,a.dir),l=!0;break}}else if(!l&&t.playerY<Z0){const c=t.playerRadius+a.spec.radius;(t.playerPos.x-o.x)**2+(t.playerPos.z-o.z)**2<c*c&&(t.onHitPlayer(a.spec,a.dir,o),l=!0)}l&&this.remove(r)}}clear(){for(let e=this.shots.length-1;e>=0;e--)this.remove(e)}dispose(){this.clear(),this.geo.dispose(),this.root.removeFromParent()}remove(e){const t=this.shots[e];this.root.remove(t.mesh),t.mesh.material.dispose(),this.shots.splice(e,1)}}class Xl{constructor(e,t=q.dungeon.chests){this.root=new Ke,this.chests=[],this.bodyGeo=new je(1.2,.7,.8),this.lidGeo=new je(1.24,.3,.84),this.woodMat=new ht({color:11893050}),this.trimMat=new ht({color:16765503}),this.openedMat=new ht({color:7031334}),this.root.name="Chests",e.add(this.root);for(const n of t)this.place(n.x,n.z)}place(e,t){const n=new Ke;n.position.set(e,0,t);const i=new xe(this.bodyGeo,this.woodMat);i.position.y=.35,i.castShadow=!0,i.receiveShadow=!0,n.add(i);const r=new xe(new je(.2,.72,.84),this.trimMat);r.position.y=.35,n.add(r);const a=new xe(this.lidGeo,this.woodMat);a.position.set(0,.15,.42),a.castShadow=!0;const o=new Ke;o.position.set(0,.7,-.42),o.add(a),n.add(o),this.root.add(n),this.chests.push({root:n,lid:a,x:e,z:t,opened:!1,openT:0})}getCollisionBoxes(){return this.chests.map(e=>({x:e.x,z:e.z,w:1.3,d:.9}))}nearest(e,t=q.dungeon.chestLoot.interactRange){let n=null,i=t;for(const r of this.chests){if(r.opened)continue;const a=Math.hypot(r.x-e.x,r.z-e.z);a<i&&(i=a,n=r)}return n}open(e){return e.opened?!1:(e.opened=!0,!0)}get openedCount(){return this.chests.filter(e=>e.opened).length}get total(){return this.chests.length}update(e){for(const t of this.chests){const n=t.opened?1:0;t.openT!==n&&(t.openT+=(n-t.openT)*(1-Math.exp(-8*e)),Math.abs(n-t.openT)<.01&&(t.openT=n),t.lid.parent.rotation.x=-t.openT*1.9,t.opened&&t.openT>.5&&t.lid.material!==this.openedMat&&(t.lid.material=this.openedMat))}}reset(){for(const e of this.chests)e.opened=!1,e.openT=0,e.lid.parent.rotation.x=0,e.lid.material=this.woodMat}dispose(){this.root.removeFromParent(),this.bodyGeo.dispose(),this.lidGeo.dispose(),this.woodMat.dispose(),this.trimMat.dispose(),this.openedMat.dispose()}}class jl{constructor(e,t){this.def=t,this.root=new Ke,this.boxes=[],this.disposables=[];const n=t.theme;this.root.name=`Dungeon-${t.id}`,e.background=new de(n.backgroundColor),e.fog=new ka(n.backgroundColor,n.fogNear,n.fogFar),this.buildLights(),this.buildFloor(),this.buildWalls(),this.buildObstacles(),e.add(this.root)}buildLights(){const e=q.graphics,t=this.def.theme,n=new x0(new de(t.skyColor),new de(t.groundColor),1.1);this.root.add(n),this.sun=new ah(new de(t.sunColor),t.sunIntensity),this.sun.castShadow=e.shadows,this.sun.shadow.mapSize.set(e.shadowMapSize,e.shadowMapSize);const i=this.sun.shadow.camera;i.left=-24,i.right=24,i.top=24,i.bottom=-24,i.near=1,i.far=90,i.updateProjectionMatrix(),this.sun.shadow.bias=-6e-4,this.root.add(this.sun,this.sun.target)}buildFloor(){const e=this.def.theme,t=document.createElement("canvas");t.width=t.height=256;const n=t.getContext("2d");if(n){n.fillStyle=e.floorColor,n.fillRect(0,0,256,256),n.fillStyle=e.floorAltColor;for(let o=0;o<8;o++)for(let l=0;l<8;l++)(l+o)%2&&n.fillRect(l*32,o*32,32,32);for(let o=0;o<160;o++)n.fillStyle=Math.random()<.5?e.floorFlecks[0]:e.floorFlecks[1],n.fillRect(Math.random()*256,Math.random()*256,3,6)}const i=new a0(t);i.wrapS=i.wrapT=ti;const r=this.def.arenaHalfSize*2+60;i.repeat.set(r/4,r/4),i.colorSpace=rt,i.anisotropy=4;const a=new xe(new cr(r,r),new ht({map:i}));a.rotation.x=-Math.PI/2,a.receiveShadow=!0,a.name="Floor",this.root.add(a),this.disposables.push(i,a.geometry,a.material)}buildWalls(){const e=this.def.theme,t=this.def.arenaHalfSize,n=new ht({color:new de(e.wallColor)}),i=t*2+1,r=.5,a=new je(i,e.wallHeight,r);this.disposables.push(n,a);const o=[[0,-(t+r/2),0],[0,t+r/2,0],[-(t+r/2),0,Math.PI/2],[t+r/2,0,Math.PI/2]];for(const[l,c,h]of o){const u=new xe(a,n);u.position.set(l,e.wallHeight/2,c),u.rotation.y=h,u.castShadow=!0,u.receiveShadow=!0,this.root.add(u)}}buildObstacles(){for(const e of this.def.obstacles){const t=new je(e.w,e.h,e.d),n=new ht({color:new de(e.color??"#9aa3b2")}),i=new xe(t,n);i.position.set(e.x,e.h/2,e.z),i.castShadow=!0,i.receiveShadow=!0,this.root.add(i),this.boxes.push({x:e.x,z:e.z,w:e.w,d:e.d}),this.disposables.push(t,n)}}setShadows(e){this.sun.castShadow=e}updateLight(e){this.sun.position.set(e.x+12,26,e.z+10),this.sun.target.position.copy(e)}getObstacleBoxes(){return this.boxes}addCollisionBoxes(e){this.boxes.push(...e)}getArenaHalfSize(){return this.def.arenaHalfSize}dispose(){this.root.removeFromParent(),this.disposables.forEach(e=>e.dispose())}}const Q0={backgroundColor:q.world.backgroundColor,fogNear:q.world.fogNear,fogFar:q.world.fogFar,floorColor:q.world.floorColor,floorAltColor:q.world.floorAltColor,floorFlecks:["#8bd268","#66ad48"],wallColor:q.world.wallColor,wallHeight:q.world.wallHeight,skyColor:"#dcefff",groundColor:"#5f8f3a",sunColor:"#fff4de",sunIntensity:2.2},Qt=[{id:"forest",name:q.dungeon.name,subtitle:"햇살이 드는 숲. 로봇 3종과 숲의 수호 로봇.",recommendedLevel:1,arenaHalfSize:q.world.arenaHalfSize,theme:Q0,obstacles:q.world.obstacles,chests:q.dungeon.chests,spawns:q.enemies.spawns,boss:{},rewardMul:{gold:1,xp:1}},{id:"cave",name:"수정 동굴",subtitle:"어둡고 좁은 동굴. 빠른 박쥐 드론이 떼로 덤빈다.",recommendedLevel:4,requiresClear:"forest",arenaHalfSize:24,theme:{backgroundColor:"#161a33",fogNear:16,fogFar:52,floorColor:"#3b4070",floorAltColor:"#343a64",floorFlecks:["#7fe3ff","#b48cff"],wallColor:"#4a3f7a",wallHeight:2.4,skyColor:"#6f7fd6",groundColor:"#1f2340",sunColor:"#c9d6ff",sunIntensity:1.5},obstacles:[{x:7,z:-7,w:1.4,d:1.4,h:5,color:"#8fe8ff"},{x:-9,z:-5,w:1.6,d:1.6,h:6,color:"#c7a2ff"},{x:10,z:8,w:1.4,d:1.4,h:4.5,color:"#8fe8ff"},{x:-11,z:10,w:1.8,d:1.8,h:5.5,color:"#c7a2ff"},{x:2,z:14,w:1.2,d:1.2,h:4,color:"#8fe8ff"},{x:-4,z:-14,w:4,d:2.2,h:2.2,color:"#5a5f8c"},{x:16,z:-2,w:2.6,d:4,h:2.6,color:"#5a5f8c"},{x:-17,z:2,w:2.4,d:5,h:2.4,color:"#5a5f8c"},{x:6,z:19,w:5,d:2,h:2,color:"#5a5f8c"},{x:0,z:-9,w:7,d:1,h:3,color:"#4a3f7a"},{x:14,z:16,w:1,d:7,h:3,color:"#4a3f7a"}],chests:[{x:-19,z:-16},{x:19,z:12},{x:-2,z:20}],spawns:[{type:"stalker",x:9,z:-13},{type:"stalker",x:-13,z:-11},{type:"stalker",x:15,z:5},{type:"stalker",x:-15,z:14},{type:"stalker",x:4,z:9},{type:"stalker",x:-7,z:16},{type:"shooter",x:18,z:-10},{type:"shooter",x:-18,z:-6},{type:"shooter",x:17,z:18},{type:"shooter",x:-12,z:19},{type:"rusher",x:12,z:0},{type:"rusher",x:-8,z:7},{type:"rusher",x:0,z:-17},{type:"tank",x:-1,z:18}],boss:{name:"수정 골렘",hp:650,color:"#8f6cff",speed:2.6,radius:1.8,score:500,spawn:{x:0,z:-17},contactDamage:24,model:"golem",useCharge:!1,closePatterns:["slam","summon","barrage"],engageRange:9,windup:{slam:.9,barrage:.7,summon:1},slam:{radius:5.5,damage:30},barrage:{count:10,phase2Count:14,damage:11,speed:9.5},summon:{type:"stalker",count:2,phase2Count:3,maxAlive:4},phase2SpeedMul:1.4,reward:{goldMin:150,goldMax:240,xp:220,equipMinRarity:"rare"}},rewardMul:{gold:1.3,xp:1.3}},{id:"fortress",name:"강철 요새",subtitle:"붉은 강철 요새. 철벽 로봇과 포대가 길목을 지킨다.",recommendedLevel:8,requiresClear:"cave",arenaHalfSize:30,theme:{backgroundColor:"#2b2d33",fogNear:30,fogFar:84,floorColor:"#5c6069",floorAltColor:"#54585f",floorFlecks:["#7b808a","#b0392f"],wallColor:"#7a2b2b",wallHeight:2.8,skyColor:"#b9bcc6",groundColor:"#3a3c44",sunColor:"#ffd9c7",sunIntensity:1.9},obstacles:[{x:0,z:-8,w:12,d:1.2,h:3,color:"#7a2b2b"},{x:0,z:8,w:12,d:1.2,h:3,color:"#7a2b2b"},{x:-12,z:0,w:1.2,d:10,h:3,color:"#7a2b2b"},{x:12,z:0,w:1.2,d:10,h:3,color:"#7a2b2b"},{x:-20,z:-20,w:3,d:3,h:2,color:"#8d9099"},{x:20,z:-20,w:3,d:3,h:2,color:"#8d9099"},{x:-20,z:20,w:3,d:3,h:2,color:"#8d9099"},{x:20,z:20,w:3,d:3,h:2,color:"#8d9099"},{x:18,z:4,w:4,d:2,h:2.4,color:"#b0392f"},{x:-18,z:-4,w:4,d:2,h:2.4,color:"#b0392f"},{x:6,z:20,w:2,d:4,h:2.4,color:"#c9a227"},{x:-6,z:-20,w:2,d:4,h:2.4,color:"#c9a227"}],chests:[{x:-26,z:0},{x:26,z:0},{x:0,z:26},{x:0,z:-26}],spawns:[{type:"tank",x:0,z:-14},{type:"tank",x:0,z:14},{type:"tank",x:-16,z:0},{type:"tank",x:16,z:0},{type:"artillery",x:-20,z:-16},{type:"artillery",x:20,z:-16},{type:"artillery",x:-20,z:16},{type:"artillery",x:20,z:16},{type:"shooter",x:24,z:-6},{type:"shooter",x:-24,z:6},{type:"shooter",x:8,z:24},{type:"rusher",x:-8,z:-12},{type:"rusher",x:8,z:12},{type:"rusher",x:22,z:10},{type:"rusher",x:-22,z:-10},{type:"stalker",x:10,z:-24},{type:"stalker",x:-10,z:24},{type:"stalker",x:26,z:24}],boss:{name:"요새 사령관",hp:900,color:"#c0392b",speed:3.2,radius:1.7,score:800,spawn:{x:0,z:-22},contactDamage:28,model:"commander",closePatterns:["mortar","barrage","slam","mortar"],windup:{charge:.65,slam:.6,barrage:.5,mortar:.7},mortar:{count:4,phase2Count:6,delay:1,radius:2.6,damage:22,spread:4},charge:{speed:21},slam:{radius:5,damage:34},barrage:{count:12,phase2Count:18,damage:12,speed:11},reward:{goldMin:250,goldMax:400,xp:400,equipMinRarity:"epic"}},rewardMul:{gold:1.6,xp:1.6}}];function ya(s,e){return!s.requiresClear||(e[s.requiresClear]??0)>0}function e_(s){return Qt.find(e=>e.requiresClear===s)??null}function $l(s){const e=q.boss,t=s.boss;return{...e,...t,spawn:{...e.spawn,...t.spawn??{}},windup:{...e.windup,...t.windup??{}},charge:{...e.charge,...t.charge??{}},slam:{...e.slam,...t.slam??{}},barrage:{...e.barrage,...t.barrage??{}},summon:{...e.summon,...t.summon??{}},mortar:{...e.mortar,...t.mortar??{}},reward:{...e.reward,...t.reward??{}}}}class t_{constructor(e,t){this.cb=t,this.el=document.createElement("div"),this.el.className="guide dungeons",this.el.hidden=!0,this.el.innerHTML=`
      <div class="guide-panel dungeons-panel" role="dialog" aria-labelledby="dungeons-title">
        <div class="inv-head"><h2 class="guide-title" id="dungeons-title">던전 선택</h2><button class="btn small" id="dungeons-close" type="button">닫기 (Esc)</button></div>
        <p class="guide-sub">던전을 클리어하면 다음 던전이 열립니다. 레벨·골드·장비는 모든 던전에서 이어집니다.</p>
        <div class="dungeon-list" id="dungeon-list"></div>
      </div>`,e.appendChild(this.el),this.el.querySelector("#dungeons-close")?.addEventListener("click",()=>this.cb.onClose()),this.el.querySelector("#dungeon-list")?.addEventListener("click",n=>{const i=n.target.closest("button[data-dungeon]");if(!i||i.disabled)return;const r=Qt.find(a=>a.id===i.dataset.dungeon);r&&this.cb.enter(r)})}get visible(){return!this.el.hidden}refresh(){const e=this.cb.clears(),t=this.cb.level(),n=this.el.querySelector("#dungeon-list");n.innerHTML=Qt.map((i,r)=>{const a=ya(i,e),o=e[i.id]??0,l=i.requiresClear?Qt.find(u=>u.id===i.requiresClear)?.name??i.requiresClear:"",c=a?o>0?`클리어 ${o}회`:"아직 클리어하지 않음":`잠김 · '${l}' 클리어 필요`,h=t<i.recommendedLevel?` <span class="dungeon-warn">(현재 레벨 ${t}: 어려울 수 있음)</span>`:"";return`<div class="dungeon-card${a?"":" locked"}" data-card="${i.id}">
          <div class="dungeon-index">${r+1}</div>
          <div class="dungeon-text">
            <div class="dungeon-name">${i.name}</div>
            <div class="dungeon-sub">${i.subtitle}</div>
            <div class="dungeon-meta">권장 레벨 ${i.recommendedLevel}${h} · 적 ${i.spawns.length}마리 · 상자 ${i.chests.length}개 · ${c}</div>
          </div>
          <button class="btn${a?"":" secondary"}" type="button" data-dungeon="${i.id}" ${a?"":"disabled"}>${a?"입장":"잠김"}</button>
        </div>`}).join("")}show(){this.refresh(),this.el.hidden=!1}hide(){this.el.hidden=!0}}function Yl(s,e){if(e===_u)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===ha||e===Pc){let t=s.getIndex();if(t===null){const a=[],o=s.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);s.setIndex(a),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===ha)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}class n_ extends ji{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new o_(t)}),this.register(function(t){return new g_(t)}),this.register(function(t){return new __(t)}),this.register(function(t){return new x_(t)}),this.register(function(t){return new c_(t)}),this.register(function(t){return new h_(t)}),this.register(function(t){return new u_(t)}),this.register(function(t){return new d_(t)}),this.register(function(t){return new a_(t)}),this.register(function(t){return new f_(t)}),this.register(function(t){return new l_(t)}),this.register(function(t){return new m_(t)}),this.register(function(t){return new p_(t)}),this.register(function(t){return new s_(t)}),this.register(function(t){return new v_(t)}),this.register(function(t){return new y_(t)})}load(e,t,n,i){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const c=as.extractUrlBase(e);a=as.resolveURL(c,this.path)}else a=as.extractUrlBase(e);this.manager.itemStart(e);const o=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new sh(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setDDSLoader(){throw new Error('THREE.GLTFLoader: "MSFT_texture_dds" no longer supported. Please update to "KHR_texture_basisu".')}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===oh){try{a[We.KHR_BINARY_GLTF]=new M_(e)}catch(u){i&&i(u);return}r=JSON.parse(a[We.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new N_(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case We.KHR_MATERIALS_UNLIT:a[u]=new r_;break;case We.KHR_DRACO_MESH_COMPRESSION:a[u]=new S_(r,this.dracoLoader);break;case We.KHR_TEXTURE_TRANSFORM:a[u]=new b_;break;case We.KHR_MESH_QUANTIZATION:a[u]=new E_;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function i_(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const We={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class s_{constructor(e){this.parser=e,this.name=We.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const h=new de(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],bt);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new ah(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new S0(h),c.distance=u;break;case"spot":c=new y0(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Pn(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}}class r_{constructor(){this.name=We.KHR_MATERIALS_UNLIT}getMaterialType(){return ft}extendParams(e,t,n){const i=[];e.color=new de(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],bt),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,rt))}return Promise.all(i)}}class a_{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class o_{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Le(o,o)}return Promise.all(r)}}class l_{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class c_{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new de(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],bt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,rt)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class h_{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class u_{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new de().setRGB(o[0],o[1],o[2],bt),Promise.all(r)}}class d_{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class f_{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new de().setRGB(o[0],o[1],o[2],bt),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,rt)),Promise.all(r)}}class p_{constructor(e){this.parser=e,this.name=We.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class m_{constructor(e){this.parser=e,this.name=We.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Sn}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class g_{constructor(e){this.parser=e,this.name=We.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class __{constructor(e){this.parser=e,this.name=We.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class x_{constructor(e){this.parser=e,this.name=We.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=i.images[a.source];let l=n.textureLoader;if(o.uri){const c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class v_{constructor(e){this.name=We.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,i.mode,i.filter),f})})}else return null}}class y_{constructor(e){this.name=We.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==qt.TRIANGLES&&c.mode!==qt.TRIANGLE_STRIP&&c.mode!==qt.TRIANGLE_FAN&&c.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],l={};for(const c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{const h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,f=[];for(const g of u){const _=new Ge,m=new C,p=new tn,M=new C(1,1,1),x=new n0(g.geometry,g.material,d);for(let v=0;v<d;v++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,v),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,v),l.SCALE&&M.fromBufferAttribute(l.SCALE,v),x.setMatrixAt(v,_.compose(m,p,M));for(const v in l)if(v==="_COLOR_0"){const R=l[v];x.instanceColor=new ga(R.array,R.itemSize,R.normalized)}else v!=="TRANSLATION"&&v!=="ROTATION"&&v!=="SCALE"&&g.geometry.setAttribute(v,l[v]);at.prototype.copy.call(x,g),this.parser.assignFinalMaterial(x),f.push(x)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const oh="glTF",ns=12,Kl={JSON:1313821514,BIN:5130562};class M_{constructor(e){this.name=We.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ns),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==oh)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-ns,r=new DataView(e,ns);let a=0;for(;a<i;){const o=r.getUint32(a,!0);a+=4;const l=r.getUint32(a,!0);if(a+=4,l===Kl.JSON){const c=new Uint8Array(e,ns+a,o);this.content=n.decode(c)}else if(l===Kl.BIN){const c=ns+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class S_{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=We.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(const h in a){const u=Ma[h]||h.toLowerCase();o[u]=a[h]}for(const h in e.attributes){const u=Ma[h]||h.toLowerCase();if(a[h]!==void 0){const d=n.accessors[e.attributes[h]],f=Ui[d.componentType];c[u]=f.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(f){for(const g in f.attributes){const _=f.attributes[g],m=l[g];m!==void 0&&(_.normalized=m)}u(f)},o,c,bt,d)})})}}class b_{constructor(){this.name=We.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class E_{constructor(){this.name=We.KHR_MESH_QUANTIZATION}}class lh extends ds{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=i-t,u=(n-t)/h,d=u*u,f=d*u,g=e*c,_=g-c,m=-2*f+3*d,p=f-d,M=1-m,x=p-d+u;for(let v=0;v!==o;v++){const R=a[_+v+o],w=a[_+v+l]*h,A=a[g+v+o],I=a[g+v]*h;r[v]=M*R+x*w+m*A+p*I}return r}}const w_=new tn;class T_ extends lh{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return w_.fromArray(r).normalize().toArray(r),r}}const qt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ui={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Zl={9728:Mt,9729:Ft,9984:ca,9985:Mc,9986:qs,9987:ni},Jl={33071:Xt,33648:Ks,10497:ti},ea={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ma={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Rn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},A_={CUBICSPLINE:void 0,LINEAR:Bi,STEP:ls},ta={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function R_(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new qa({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Mn})),s.DefaultMaterial}function qn(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Pn(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function C_(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,h=e.length;c<h;c++){const u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){const u=e[c];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):s.attributes.position;a.push(d)}if(i){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):s.attributes.normal;o.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):s.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){const h=c[0],u=c[1],d=c[2];return n&&(s.morphAttributes.position=h),i&&(s.morphAttributes.normal=u),r&&(s.morphAttributes.color=d),s.morphTargetsRelative=!0,s})}function L_(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function P_(s){let e;const t=s.extensions&&s.extensions[We.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+na(t.attributes):e=s.indices+":"+na(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+na(s.targets[n]);return e}function na(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function Sa(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function I_(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const D_=new Ge;class N_{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new i_,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=!1,r=-1;typeof navigator<"u"&&(n=/^((?!chrome|android).)*safari/i.test(navigator.userAgent)===!0,i=navigator.userAgent.indexOf("Firefox")>-1,r=i?navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1]:-1),typeof createImageBitmap>"u"||n||i&&r<98?this.textureLoader=new rh(this.options.manager):this.textureLoader=new E0(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new sh(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return qn(r,o,i),Pn(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const a=t[i].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(a,o)=>{const l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(const[c,h]of a.children.entries())r(h,o.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[We.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,a){n.load(as.resolveURL(t.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=ea[i.type],o=Ui[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new Nt(c,a,l))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],l=ea[i.type],c=Ui[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let _,m;if(f&&f!==u){const p=Math.floor(d/f),M="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let x=t.cache.get(M);x||(_=new c(o,p*f,i.count*f/h),x=new Kg(_,f/h),t.cache.add(M,x)),m=new Ba(x,l,d%f/h,g)}else o===null?_=new c(i.count*l):_=new c(o,d,i.count*l),m=new Nt(_,l,g);if(i.sparse!==void 0){const p=ea.SCALAR,M=Ui[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,R=new M(a[1],x,i.sparse.count*p),w=new c(a[2],v,i.sparse.count*l);o!==null&&(m=new Nt(m.array.slice(),m.itemSize,m.normalized));for(let A=0,I=R.length;A<I;A++){const y=R[A];if(m.setX(y,w[A*l]),l>=2&&m.setY(y,w[A*l+1]),l>=3&&m.setZ(y,w[A*l+2]),l>=4&&m.setW(y,w[A*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const i=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return h.magFilter=Zl[d.magFilter]||Ft,h.minFilter=Zl[d.minFilter]||ni,h.wrapS=Jl[d.wrapS]||ti,h.wrapT=Jl[d.wrapT]||ti,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=i.images[e],o=self.URL||self.webkitURL;let l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;const d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(l).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const m=new St(_);m.needsUpdate=!0,d(m)}),t.load(as.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),u.userData.mimeType=a.mimeType||I_(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[We.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[We.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const l=r.associations.get(a);a=r.extensions[We.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new eh,nn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let l=this.cache.get(o);l||(l=new Qc,nn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return qa}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let a;const o={},l=r.extensions||{},c=[];if(l[We.KHR_MATERIALS_UNLIT]){const u=i[We.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,r,t))}else{const u=r.pbrMetallicRoughness||{};if(o.color=new de(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],bt),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,rt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Ot);const h=r.alphaMode||ta.OPAQUE;if(h===ta.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===ta.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==ft&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Le(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==ft&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==ft){const u=r.emissiveFactor;o.emissive=new de().setRGB(u[0],u[1],u[2],bt)}return r.emissiveTexture!==void 0&&a!==ft&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,rt)),Promise.all(c).then(function(){const u=new a(o);return r.name&&(u.name=r.name),Pn(u,r),t.associations.set(u,{materials:e}),r.extensions&&qn(i,u,r),u})}createUniqueName(e){const t=$e.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[We.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return Ql(l,o,t)})}const a=[];for(let o=0,l=e.length;o<l;o++){const c=e[o],h=P_(c),u=i[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[We.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=Ql(new Ut,c,t),i[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){const h=a[l].material===void 0?R_(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){const c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const _=h[f],m=a[f];let p;const M=c[f];if(m.mode===qt.TRIANGLES||m.mode===qt.TRIANGLE_STRIP||m.mode===qt.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new Jg(_,M):new xe(_,M),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===qt.TRIANGLE_STRIP?p.geometry=Yl(p.geometry,Pc):m.mode===qt.TRIANGLE_FAN&&(p.geometry=Yl(p.geometry,ha));else if(m.mode===qt.LINES)p=new i0(_,M);else if(m.mode===qt.LINE_STRIP)p=new Ha(_,M);else if(m.mode===qt.LINE_LOOP)p=new s0(_,M);else if(m.mode===qt.POINTS)p=new r0(_,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&L_(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Pn(p,r),m.extensions&&qn(i,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&qn(i,u[0],r),u[0];const d=new Ke;r.extensions&&qn(i,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Dt(pa.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Fa(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Pn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),a=i,o=[],l=[];for(let c=0,h=a.length;c<h;c++){const u=a[c];if(u){o.push(u);const d=new Ge;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new za(o,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){const f=i.channels[u],g=i.samplers[f.sampler],_=f.target,m=_.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,M=i.parameters!==void 0?i.parameters[g.output]:g.output;_.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",M)),c.push(g),h.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],g=u[2],_=u[3],m=u[4],p=[];for(let M=0,x=d.length;M<x;M++){const v=d[M],R=f[M],w=g[M],A=_[M],I=m[M];if(v===void 0)continue;v.updateMatrix&&v.updateMatrix();const y=n._createAnimationTracks(v,R,w,A,I);if(y)for(let E=0;E<y.length;E++)p.push(y[E])}return new xa(r,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){const h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,D_)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(r.isBone===!0?h=new Jc:c.length>1?h=new Ke:c.length===1?h=c[0]:h=new at,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=a),Pn(h,r),r.extensions&&qn(n,h,r),r.matrix!==void 0){const u=new Ge;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new Ke;n.name&&(r.name=i.createUniqueName(n.name)),Pn(r,n),n.extensions&&qn(t,r,n);const a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);const c=h=>{const u=new Map;for(const[d,f]of i.associations)(d instanceof nn||d instanceof St)&&u.set(d,f);return h.traverse(d=>{const f=i.associations.get(d);f!=null&&u.set(d,f)}),u};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){const a=[],o=e.name?e.name:e.uuid,l=[];Rn[r.path]===Rn.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(Rn[r.path]){case Rn.weights:c=Gi;break;case Rn.rotation:c=ri;break;case Rn.position:case Rn.scale:c=Vi;break;default:switch(n.itemSize){case 1:c=Gi;break;case 2:case 3:default:c=Vi;break}break}const h=i.interpolation!==void 0?A_[i.interpolation]:Bi,u=this._getArrayFromAccessor(n);for(let d=0,f=l.length;d<f;d++){const g=new c(l[d]+"."+Rn[r.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=Sa(t.constructor),i=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof ri?T_:lh;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function U_(s,e,t){const n=e.attributes,i=new sn;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new C(l[0],l[1],l[2]),new C(c[0],c[1],c[2])),o.normalized){const h=Sa(Ui[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new C,l=new C;for(let c=0,h=r.length;c<h;c++){const u=r[c];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const _=Sa(Ui[d.componentType]);l.multiplyScalar(_)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}s.boundingBox=i;const a=new cn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=a}function Ql(s,e,t){const n=e.attributes,i=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){s.setAttribute(o,l)})}for(const a in n){const o=Ma[a]||a.toLowerCase();o in s.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!s.index){const a=t.getDependency("accessor",e.indices).then(function(o){s.setIndex(o)});i.push(a)}return Ye.workingColorSpace!==bt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ye.workingColorSpace}" not supported.`),Pn(s,e),U_(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?C_(s,e.targets,t):s})}function F_(s){const e=new Map,t=new Map,n=s.clone();return ch(s,n,function(i,r){e.set(r,i),t.set(i,r)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const r=i,a=e.get(i),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(l){return t.get(l)}),r.bind(r.skeleton,r.bindMatrix)}),n}function ch(s,e,t){t(s,e);for(let n=0;n<s.children.length;n++)ch(s.children[n],e.children[n],t)}const ia="[HERO X]",Xe={info(s,...e){console.info(`${ia} ${s}`,...e)},warn(s,...e){console.warn(`${ia} ${s}`,...e)},error(s,...e){console.error(`${ia} ${s}`,...e)}},hh={player:null,enemies:{},bosses:{}};function ba(s){return typeof s=="object"&&s!==null&&!Array.isArray(s)}function ec(s){return!ba(s)||typeof s.file!="string"||!s.file?null:{file:s.file,scale:typeof s.scale=="number"&&s.scale>0?s.scale:1,offsetY:typeof s.offsetY=="number"?s.offsetY:0,rotationY:typeof s.rotationY=="number"?s.rotationY:0}}function O_(s){if(!ba(s))return{...hh,enemies:{},bosses:{}};const e={player:ec(s.player),enemies:{},bosses:{}};for(const[t,n]of[["enemies",e.enemies],["bosses",e.bosses]]){const i=s[t];if(ba(i))for(const[r,a]of Object.entries(i)){const o=ec(a);o&&(n[r]=o)}}return e}class k_{constructor(){this.models=new Map,this.manifest=hh,this.loader=null,this.onPlayerReady=null}get loadedKeys(){return[...this.models.keys()]}has(e){return this.models.has(e)}async load(e){const t=e.endsWith("/")?e:e+"/";try{const i=await fetch(`${t}models/manifest.json`,{cache:"no-cache"});if(!i.ok){Xe.warn(`models/manifest.json 을 읽지 못했습니다 (${i.status}). 임시 모델을 씁니다.`);return}this.manifest=O_(await i.json())}catch(i){Xe.warn("models/manifest.json 을 읽지 못했습니다. 임시 모델을 씁니다.",i);return}const n=[];this.manifest.player&&n.push(this.loadOne("player",this.manifest.player,t));for(const[i,r]of Object.entries(this.manifest.enemies))r&&n.push(this.loadOne(`enemy:${i}`,r,t));for(const[i,r]of Object.entries(this.manifest.bosses))r&&n.push(this.loadOne(`boss:${i}`,r,t));await Promise.all(n)}async loadOne(e,t,n){this.loader??(this.loader=new n_);try{const i=await this.loader.loadAsync(`${n}models/${t.file}`);this.models.set(e,{gltf:i,entry:t}),Xe.info(`모델 로드: ${e} ← ${t.file} (애니메이션 ${i.animations.length}개)`),e==="player"&&this.onPlayerReady?.()}catch(i){Xe.warn(`모델 '${t.file}' 을(를) 읽지 못해 '${e}' 는 임시 모델을 씁니다.`,i)}}createPlayerModel(){const e=this.models.get("player");return e?B_(e):null}createEnemyModel(e,t){const n=this.models.get(e);return n?z_(n,t):null}}const Pi=new k_;function uh(s,e){const t=F_(s.gltf.scene),n=new Ke;n.add(t),t.traverse(l=>{const c=l;c.isMesh&&(c.castShadow=!0,c.receiveShadow=!1)});let i=s.entry.scale??1;if(e){const l=new sn().setFromObject(t),c=l.max.y-l.min.y;c>1e-6&&(i*=e/c)}t.scale.setScalar(i);const r=new sn().setFromObject(t);t.position.y=-r.min.y+(s.entry.offsetY??0),t.rotation.y=(s.entry.rotationY??0)*Math.PI/180;const a=s.gltf.animations,o=a.length>0?new O0(t):null;return{root:n,mixer:o,clips:a}}function Dn(s,...e){for(const t of e){const n=s.find(i=>i.name.toLowerCase().includes(t));if(n)return n}return null}function dh(s){s.traverse(e=>{const t=e;t.isMesh&&(t.geometry.dispose(),(Array.isArray(t.material)?t.material:[t.material]).forEach(i=>i.dispose()))})}function B_(s){const{root:e,mixer:t,clips:n}=uh(s,1.9);e.name="GltfHero";const i={idle:Dn(n,"idle","stand"),walk:Dn(n,"run","walk"),attack:Dn(n,"attack","slash","punch"),jump:Dn(n,"jump"),die:Dn(n,"die","death","dead")};let r=null;const a=(l,c=!0)=>{if(!t||!l)return;const h=t.clipAction(l);r!==h&&(h.reset(),h.setLoop(c?Lc:Cc,1/0),h.clampWhenFinished=!c,h.fadeIn(.12).play(),r?.fadeOut(.12),r=h)};let o=0;return{root:e,update(l,c){o+=l,t?(c.dead?a(i.die??i.idle,!1):c.attack!==null&&i.attack?a(i.attack,!1):c.airborne&&i.jump?a(i.jump,!1):c.moving?a(i.walk??i.idle):a(i.idle),t.update(l)):(e.rotation.z=c.moving?Math.sin(o*10)*.05:0,e.rotation.x=c.attack!==null?-.25*Math.sin(c.attack*Math.PI):0,e.scale.setScalar(c.dead?.6:1))},dispose(){t?.stopAllAction(),dh(e)}}}function z_(s,e){const{root:t,mixer:n,clips:i}=uh(s,e);t.name="GltfEnemy";const r=Dn(i,"run","walk"),a=Dn(i,"idle"),o=Dn(i,"attack");let l=null;const c=f=>{if(!n||!f)return;const g=n.clipAction(f);l!==g&&(g.reset().fadeIn(.1).play(),l?.fadeOut(.1),l=g)},h=[];t.traverse(f=>{const g=f;if(g.isMesh){const _=Array.isArray(g.material)?g.material:[g.material];for(const m of _)m.emissive&&h.push(m)}});let u=0,d=0;return{root:t,update(f,g){if(d+=f,g.state==="dead"){const _=Math.max(0,1-g.death);t.scale.setScalar(_),t.position.y=-(1-_)*.5;return}if(n?(g.state==="windup"&&o?c(o):g.moving?c(r??a):c(a??r),n.update(f)):(t.position.y=g.moving?Math.abs(Math.sin(d*8))*.06:0,t.rotation.x=g.state==="windup"?-.2*g.windup:0),u>0){u-=f;for(const _ of h)_.emissive.setScalar(u>0?.8:0)}},flash(){u=.09;for(const f of h)f.emissive.setScalar(.8)},dispose(){n?.stopAllAction(),dh(t)}}}class H_{constructor(){this.state="idle",this.pattern=null,this.timer=0,this.total=0,this.cooldown=0,this.closeIndex=-1,this.chargeDir={x:0,z:1}}update(e,t,n,i,r){const a=r?i.phase2TimeMul:1,o=n.x-t.x,l=n.z-t.z,c=Math.hypot(o,l),h=c>1e-6?{x:o/c,z:l/c}:{x:0,z:1},u={x:0,z:0};this.cooldown>0&&(this.cooldown=Math.max(0,this.cooldown-e));const d={state:this.state,move:u,execute:null,windupPattern:null,windupProgress:0};switch(this.state){case"dead":return d;case"idle":return this.state="chase",{...d,state:this.state};case"chase":{if(this.cooldown<=0&&c<=i.engageRange){if(c>i.chargeMinRange&&i.useCharge!==!1)this.pattern="charge";else{const f=i.closePatterns&&i.closePatterns.length>0?i.closePatterns:["slam","barrage"];this.closeIndex=(this.closeIndex+1)%f.length,this.pattern=f[this.closeIndex]}return this.state="windup",this.timer=this.total=i.windup[this.pattern]*a,this.chargeDir=h,{...d,state:this.state,windupPattern:this.pattern,windupProgress:0}}return{...d,state:this.state,move:c>2.5?h:u}}case"windup":{this.timer-=e,this.chargeDir=h;const f=this.total>0?1-Math.max(0,this.timer)/this.total:1;if(this.timer>0)return{...d,state:this.state,windupPattern:this.pattern,windupProgress:f};const g=this.pattern;return g==="charge"?(this.state="charge",this.timer=i.chargeDuration,{...d,state:this.state,move:this.chargeDir,execute:"charge"}):(this.state="recover",this.timer=i.recover*a,{...d,state:this.state,execute:g})}case"charge":return this.timer-=e,this.timer>0?{...d,state:this.state,move:this.chargeDir}:(this.state="recover",this.timer=i.recover*a,{...d,state:this.state});case"recover":return this.timer-=e,this.timer>0?{...d,state:this.state}:(this.state="chase",this.cooldown=i.cooldown*a,{...d,state:this.state})}}stopCharge(){this.state==="charge"&&(this.timer=0)}kill(){this.state="dead"}}class fh{constructor(e,t=0){this.maxHp=e,this.invulnerableTime=t,this.invulnerable=0,this.hp=e}get isDead(){return this.hp<=0}get ratio(){return this.maxHp>0?Math.max(0,Math.min(1,this.hp/this.maxHp)):0}takeDamage(e){return this.isDead||this.invulnerable>0||e<=0?!1:(this.hp=Math.max(0,this.hp-e),this.invulnerable=this.invulnerableTime,!0)}heal(e){this.isDead||e<=0||(this.hp=Math.min(this.maxHp,this.hp+e))}reset(e=this.maxHp){this.maxHp=e,this.hp=e,this.invulnerable=0}update(e){this.invulnerable>0&&(this.invulnerable=Math.max(0,this.invulnerable-e))}}class G_{constructor(){this.state="idle",this.cooldown=0,this.windup=0,this.windupTotal=0,this.hurtTimer=0}get windupProgress(){return this.state==="windup"&&this.windupTotal>0?1-this.windup/this.windupTotal:0}update(e,t,n,i){const r=n.x-t.x,a=n.z-t.z,o=Math.hypot(r,a),l=o>1e-6?{x:r/o,z:a/o}:{x:0,z:0};this.cooldown>0&&(this.cooldown=Math.max(0,this.cooldown-e));const c={x:0,z:0},h=i.attackKind==="ranged";switch(this.state){case"dead":return{move:c,attackNow:!1,state:this.state};case"hurt":return this.hurtTimer-=e,this.hurtTimer<=0&&(this.state="chase"),{move:c,attackNow:!1,state:this.state};case"idle":return o<=i.aggroRange&&(this.state="chase"),{move:c,attackNow:!1,state:this.state};case"chase":return o>i.aggroRange*1.5?(this.state="idle",{move:c,attackNow:!1,state:this.state}):h&&i.retreatRange!==void 0&&o<i.retreatRange?{move:{x:-l.x,z:-l.z},attackNow:!1,state:this.state}:o<=i.attackRange&&this.cooldown<=0?(this.state="windup",this.windup=this.windupTotal=i.attackWindup,{move:c,attackNow:!1,state:this.state}):{move:o<=i.attackRange?c:l,attackNow:!1,state:this.state};case"windup":{if(this.windup-=e,this.windup>0)return{move:c,attackNow:!1,state:this.state};this.cooldown=i.attackCooldown,this.state="chase";const u=h?i.attackRange*1.3:i.attackRange+.4;return{move:c,attackNow:o<=u,state:this.state}}}}onHurt(e=.15){this.state!=="dead"&&(this.state="hurt",this.hurtTimer=e)}kill(){this.state="dead"}}function V_(s,e){const t=Pi.createEnemyModel(`enemy:${s}`,e.radius*2.8);if(t)return t;switch(e.model??s){case"tank":return W_(e);case"shooter":return q_(e);case"rusher":default:return X_(e)}}function W_(s){const e=new Ke;e.name=`Enemy-${s.name}`;const t=s.radius,n=new ht({color:new de(s.color)}),i=new ht({color:2764605}),r=new ht({color:10134450}),a=new ft({color:16765503}),o=new xe(new je(t*1.7,t*1.5,t*1.4),n);o.position.y=t*1.1,o.castShadow=!0,e.add(o);for(const d of[-1,1]){const f=new xe(new je(t*.5,t*.6,t*1.7),i);f.position.set(d*t*.85,t*.3,0),f.castShadow=!0,e.add(f);const g=new xe(new kt(t*.13,8,6),a);g.position.set(d*t*.35,t*1.5,t*.72),e.add(g)}const l=new Ke;l.position.set(0,t*1.7,t*.6);const c=new xe(new je(t*1.9,t*1.6,t*.2),r);c.position.set(0,-t*.7,t*.3),c.castShadow=!0,l.add(c),e.add(l);let h=0,u=Math.random()*10;return{root:e,update(d,f){if(u+=d,f.state==="dead"){const g=Math.max(0,1-f.death);e.scale.setScalar(g),e.position.y=-(1-g)*t,e.rotation.y+=d*6;return}o.position.y=t*1.1+(f.moving?Math.abs(Math.sin(u*8))*.04:0),l.rotation.x=-f.windup*1.3,a.color.setRGB(1,.82-f.windup*.6,.25-f.windup*.2),h>0&&(h-=d,n.emissive.setScalar(h>0?.9:0))},flash(){h=.09,n.emissive.setScalar(.9)},dispose(){e.traverse(d=>{const f=d;if(f.isMesh){f.geometry.dispose();const g=f.material;Array.isArray(g)?g.forEach(_=>_.dispose()):g.dispose()}})}}}function q_(s){const e=new Ke;e.name=`Enemy-${s.name}`;const t=s.radius,n=new ht({color:new de(s.color),flatShading:!0}),i=new ht({color:2764605}),r=new ft({color:16733559}),a=new Ke;e.add(a);const o=new xe(new ur(t*.9,1),n);o.position.y=t*1.6,o.castShadow=!0,a.add(o);const l=new xe(new Wa(t*1.1,t*.12,8,20),i);l.position.y=t*1.6,l.rotation.x=Math.PI/2,a.add(l);const c=new xe(new ln(t*.16,t*.2,t*1,10),i);c.rotation.x=Math.PI/2,c.position.set(0,t*1.6,t*1.1),a.add(c);const h=new xe(new kt(t*.2,8,6),r);h.position.set(0,t*1.6,t*1.6),a.add(h);let u=0,d=Math.random()*10;return{root:e,update(f,g){if(d+=f,g.state==="dead"){const _=Math.max(0,1-g.death);e.scale.setScalar(_),e.position.y=-(1-_)*t,e.rotation.y+=f*8;return}a.position.y=Math.sin(d*3)*.08,l.rotation.z+=f*2,h.scale.setScalar(1+g.windup*1.5),r.color.setRGB(1,.33+g.windup*.6,.47+g.windup*.5),u>0&&(u-=f,n.emissive.setScalar(u>0?.9:0))},flash(){u=.09,n.emissive.setScalar(.9)},dispose(){e.traverse(f=>{const g=f;if(g.isMesh){g.geometry.dispose();const _=g.material;Array.isArray(_)?_.forEach(m=>m.dispose()):_.dispose()}})}}}function X_(s){const e=new Ke;e.name=`Enemy-${s.name}`;const t=s.radius,n=new ht({color:new de(s.color)}),i=new ht({color:2764605}),r=new ht({color:16777215}),a=new ft({color:1710626}),o=new xe(new je(t*1.6,t*1.4,t*1.6),n);o.position.y=t*1.1,o.castShadow=!0,e.add(o);const l=new xe(new je(t*1.9,t*.5,t*1.9),i);l.position.y=t*.25,l.castShadow=!0,e.add(l);const c=new xe(new kt(t*.32,12,10),r);c.position.set(0,t*1.35,t*.75),e.add(c);const h=new xe(new kt(t*.16,10,8),a);h.position.set(0,t*1.35,t*1),e.add(h);const u=new xe(new ln(.03,.03,t*.8,6),i);u.position.set(0,t*2.1,0),e.add(u);const d=new xe(new kt(.08,8,6),new ft({color:s.color}));d.position.set(0,t*2.5,0),e.add(d);let f=0,g=Math.random()*10;return{root:e,update(_,m){if(g+=_,m.state==="dead"){const M=Math.max(0,1-m.death);e.scale.setScalar(M),e.position.y=-(1-M)*t,e.rotation.y+=_*8;return}o.position.y=t*1.1+(m.moving?Math.abs(Math.sin(g*14))*.06:0);const p=m.windup;h.scale.setScalar(1+p*1.2),h.material.color.setRGB(.1+p*.9,.1,.13),o.rotation.x=-p*.35,f>0&&(f-=_,n.emissive.setScalar(f>0?.9:0))},flash(){f=.09,n.emissive.setScalar(.9)},dispose(){e.traverse(_=>{const m=_;if(m.isMesh){m.geometry.dispose();const p=m.material;Array.isArray(p)?p.forEach(M=>M.dispose()):p.dispose()}})}}}class ph{constructor(e,t,n,i={hp:1,speed:1},r=V_){this.type=e,this.mul=i,this.object3d=new Ke,this.ai=new G_,this.facing=0,this.knock={x:0,z:0},this.deathTimer=0,this.def=t,this.health=new fh(Math.max(1,Math.round(t.hp*i.hp)),0),this.model=r(e,t),this.object3d.name=`Enemy-${e}`,this.object3d.add(this.model.root),this.object3d.position.set(n.x,0,n.z),this.facing=Math.random()*Math.PI*2,this.object3d.rotation.y=this.facing}get position(){return this.object3d.position}get radius(){return this.def.radius}get alive(){return!this.health.isDead}get removable(){return this.health.isDead&&this.deathTimer>=q.enemies.deathDuration}hit(e,t,n){if(!this.health.takeDamage(e))return!1;const i=this.def.knockbackResist??1;return this.knock.x+=t.x*n*i,this.knock.z+=t.z*n*i,this.model.flash(),this.health.isDead?this.ai.kill():this.onHurtEffect(),!0}onHurtEffect(){this.ai.onHurt()}update(e,t){if(this.health.isDead){this.deathTimer+=e,this.model.update(e,{state:"dead",moving:!1,windup:0,death:Math.min(1,this.deathTimer/Math.max(.01,q.enemies.deathDuration))});return}const n=this.object3d.position,i={x:n.x,z:n.z},r=this.ai.update(e,i,t.playerPos,this.def);let a={x:n.x+r.move.x*this.def.speed*this.mul.speed*e+this.knock.x*e,z:n.z+r.move.z*this.def.speed*this.mul.speed*e+this.knock.z*e};const o=Math.exp(-8*e);this.knock.x*=o,this.knock.z*=o;const l=q.enemies.separation;for(const h of t.others){if(h===this||!h.alive)continue;const u=a.x-h.position.x,d=a.z-h.position.z,f=this.radius+h.radius+.2,g=u*u+d*d;if(g<f*f&&g>1e-6){const _=Math.sqrt(g),m=(1-_/f)*l*e;a={x:a.x+u/_*m,z:a.z+d/_*m}}}if(a=Ya(a,this.radius,t.world.getObstacleBoxes()),a=Ka(a,t.world.getArenaHalfSize(),this.radius),n.x=a.x,n.z=a.z,r.state==="chase"||r.state==="windup"){const h=fr({x:t.playerPos.x-n.x,z:t.playerPos.z-n.z});this.facing=Za(this.facing,h,1-Math.exp(-10*e))}this.object3d.rotation.y=this.facing,r.attackNow&&t.onAttackPlayer(this,this.def.damage);const c=r.move.x!==0||r.move.z!==0;this.model.update(e,{state:r.state,moving:c,windup:this.ai.windupProgress,death:0})}dispose(){this.object3d.removeFromParent(),this.model.dispose()}}function j_(s=q.boss){return{name:s.name,hp:s.hp,speed:s.speed,radius:s.radius,damage:s.contactDamage,attackRange:s.engageRange,attackWindup:s.windup.slam,attackCooldown:s.cooldown,aggroRange:999,color:s.color,score:s.score,knockbackResist:s.knockbackResist}}class $_ extends ph{constructor(e,t,n=q.boss){super("boss",j_(n),e,t,(i,r)=>Y_(r,n.model)),this.cfg=n,this.bossAI=new H_,this.chargeHit=!1}get phase2(){return this.health.ratio<=this.cfg.phase2Ratio}hit(e,t,n){const i=super.hit(e,t,n);return i&&this.health.isDead&&this.bossAI.kill(),i}onHurtEffect(){}update(e,t){const n=t;if(this.health.isDead){this.deathTimer+=e,this.model.update(e,{state:"dead",moving:!1,windup:0,death:Math.min(1,this.deathTimer/Math.max(.01,q.enemies.deathDuration))});return}const i=this.cfg,r=this.object3d.position,a={x:r.x,z:r.z},o=this.bossAI.update(e,a,t.playerPos,i,this.phase2),l=this.phase2?i.phase2SpeedMul:1,c=o.state==="charge"?i.charge.speed:this.def.speed*this.mul.speed*l;let h={x:r.x+o.move.x*c*e+this.knock.x*e,z:r.z+o.move.z*c*e+this.knock.z*e};const u=Math.exp(-8*e);this.knock.x*=u,this.knock.z*=u,h=Ya(h,this.radius,t.world.getObstacleBoxes()),h=Ka(h,t.world.getArenaHalfSize(),this.radius),o.state==="charge"&&Math.hypot(h.x-r.x,h.z-r.z)<c*e*.3&&this.bossAI.stopCharge(),r.x=h.x,r.z=h.z;const d=o.state==="charge"?o.move:{x:t.playerPos.x-r.x,z:t.playerPos.z-r.z};(d.x!==0||d.z!==0)&&(this.facing=Za(this.facing,fr(d),1-Math.exp(-(o.state==="charge"?30:6)*e))),this.object3d.rotation.y=this.facing,o.execute==="charge"&&(this.chargeHit=!1),o.execute==="slam"&&n.onBossAttack(this,{kind:"slam",radius:i.slam.radius,damage:i.slam.damage}),o.execute==="barrage"&&n.onBossAttack(this,{kind:"barrage",count:this.phase2?i.barrage.phase2Count:i.barrage.count,aimed:this.phase2,damage:i.barrage.damage,speed:i.barrage.speed}),o.execute==="summon"&&n.onBossAttack(this,{kind:"summon",type:i.summon.type,count:this.phase2?i.summon.phase2Count:i.summon.count,maxAlive:i.summon.maxAlive}),o.execute==="mortar"&&n.onBossAttack(this,{kind:"mortar",count:this.phase2?i.mortar.phase2Count:i.mortar.count,delay:i.mortar.delay,radius:i.mortar.radius,damage:i.mortar.damage,spread:i.mortar.spread}),o.state==="charge"&&!this.chargeHit&&Math.hypot(t.playerPos.x-r.x,t.playerPos.z-r.z)<this.radius+n.playerRadius&&(this.chargeHit=!0,n.onBossAttack(this,{kind:"contact",damage:i.contactDamage}));const f=o.move.x!==0||o.move.z!==0,g={state:o.state==="windup"?"windup":o.state==="dead"?"dead":"chase",moving:f,windup:o.windupProgress,death:0,pattern:o.windupPattern??(o.state==="charge"?"charge":null),phase2:this.phase2};this.model.update(e,g)}}function Y_(s,e="guardian"){const t=Pi.createEnemyModel(`boss:${e}`,s.radius*3);if(t)return t;const n=new Ke;n.name=`Boss-${s.name}`;const i=s.radius,r=new ht({color:new de(s.color)}),a=new ht({color:e==="commander"?3816516:2764605}),o=new ht({color:e==="golem"?9431295:e==="commander"?11548975:16765503}),l=new ft({color:6091480}),c=new ft({color:16777215,transparent:!0,opacity:0}),h=e==="golem"?new Ga(i*.95,0):e==="commander"?new je(i*1.9,i*1.2,i*1.3):new je(i*1.5,i*1.3,i*1.2),u=new xe(h,r);u.position.y=i*1.3,u.castShadow=!0,n.add(u);const d=new xe(new je(i*1.3,i*.6,i*1),a);d.position.y=i*.35,d.castShadow=!0,n.add(d);const f=e==="golem"?new ur(i*.42,0):new je(i*.8,i*.6,i*.8),g=new xe(f,r);g.position.y=i*2.3,g.castShadow=!0,n.add(g);for(const v of[-1,1]){const R=new xe(new kt(i*.1,8,6),l);if(R.position.set(v*i*.2,i*2.35,i*.42),n.add(R),e==="golem"){const w=new xe(new Li(i*.22,i*.9,5),o);w.position.set(v*i*.6,i*2.2,-i*.3),w.rotation.z=-v*.5,n.add(w)}else if(e==="commander"){const w=new xe(new ln(i*.16,i*.2,i*.9,8),a);w.position.set(v*i*.75,i*2.2,i*.2),w.rotation.x=Math.PI/2-.35,n.add(w)}else{const w=new xe(new Li(i*.12,i*.4,5),o);w.position.set(v*i*.25,i*2.75,0),n.add(w)}}if(e==="guardian"){const v=new xe(new Li(i*.16,i*.5,5),o);v.position.y=i*2.85,n.add(v)}if(e==="golem")for(let v=0;v<5;v++){const R=new xe(new Li(i*.12,i*.5+v%2*i*.2,4),o),w=v/5*Math.PI*2;R.position.set(Math.cos(w)*i*.8,i*1.5+Math.sin(v)*i*.2,Math.sin(w)*i*.8),R.rotation.set(Math.sin(w)*.9,0,-Math.cos(w)*.9),n.add(R)}const _=[];for(const v of[-1,1]){const R=new Ke;R.position.set(v*i*(e==="commander"?1.15:.95),i*1.8,0);const w=new xe(new je(i*.3,i*1.1,i*.3),a);w.position.y=-i*.55,w.castShadow=!0,R.add(w);const A=e==="golem"?new kt(i*.34,8,6):e==="commander"?new ln(i*.18,i*.24,i*.9,8):new je(i*.55,i*.4,i*.55),I=new xe(A,e==="commander"?a:o);I.position.y=-i*1.2,I.castShadow=!0,R.add(I),n.add(R),_.push(R)}const m=new xe(new Jn(i*.9,i*1.1,32),c);m.rotation.x=-Math.PI/2,m.position.y=.06,n.add(m);let p=0,M=0;const x={charge:16742981,slam:16732025,barrage:11561983,summon:9431295,mortar:16757071};return{root:n,update(v,R){const w=R;if(M+=v,w.state==="dead"){const E=Math.max(0,1-w.death);n.scale.setScalar(E),n.position.y=-(1-E)*i,n.rotation.y+=v*3;return}l.color.set(w.phase2?16726843:6091480),u.position.y=i*1.3+(w.moving?Math.abs(Math.sin(M*6))*.08:0);const A=w.windup,I=w.pattern??null;c.opacity=I&&w.state==="windup"?.25+A*.55:I==="charge"?.5:0,I&&c.color.set(x[I]),m.scale.setScalar(I==="slam"?1+A*1.6:1);const y=I==="slam"?-2.6*A:I==="charge"?-1.2:I==="barrage"?-1.6*A:I==="summon"?-3*A:I==="mortar"?-1.4:0;for(const E of _)E.rotation.x+=(y-E.rotation.x)*(1-Math.exp(-12*v));u.rotation.x=I==="charge"?.25:I==="slam"?-.15*A:0,p>0&&(p-=v,r.emissive.setScalar(p>0?.9:0))},flash(){p=.09,r.emissive.setScalar(.9)},dispose(){n.traverse(v=>{const R=v;if(R.isMesh){R.geometry.dispose();const w=R.material;Array.isArray(w)?w.forEach(A=>A.dispose()):w.dispose()}})}}}class K_{constructor(e){this.scene=e,this.enemies=[],this.multipliers={hp:1,speed:1}}spawnFromConfig(e=q.enemies.spawns){for(const t of e){if(!q.enemies.types[t.type]){Xe.warn(`적 종류 '${t.type}' 이(가) GameConfig.enemies.types 에 없어 배치를 건너뜁니다.`);continue}this.spawn(t.type,t.x,t.z)}}spawn(e,t,n){const i=q.enemies.types[e];if(!i)return null;const r=new ph(e,i,{x:t,z:n},{...this.multipliers});return this.scene.add(r.object3d),this.enemies.push(r),r}addEnemy(e){this.scene.add(e.object3d),this.enemies.push(e)}getEnemies(){return this.enemies}get aliveCount(){return this.enemies.reduce((e,t)=>e+(t.alive?1:0),0)}update(e,t){const n={...t,others:this.enemies};for(const i of this.enemies)i.update(e,n);for(let i=this.enemies.length-1;i>=0;i--)this.enemies[i].removable&&(this.enemies[i].dispose(),this.enemies.splice(i,1))}clear(){this.enemies.forEach(e=>e.dispose()),this.enemies.length=0}dispose(){this.clear()}}function tc(s){const e=s;if(!e||!e.tagName)return!1;const t=e.tagName.toUpperCase();return t==="INPUT"||t==="TEXTAREA"||t==="SELECT"||e.isContentEditable===!0}class Z_{constructor(){this.pressed=new Set,this.pressHandlers=new Map,this.pointer={x:0,y:0,has:!1},this.cleanup=[],this.virtualAxis={x:0,z:0}}attach(e=window,t){const n=u=>{tc(u.target)||(u.repeat||this.press(u.code),this.isGameKey(u.code)&&u.preventDefault())},i=u=>{this.pressed.delete(u.code)},r=()=>this.pressed.clear(),a=()=>{document.hidden&&r()},o=u=>{if(u.pointerType==="touch")return;const d=t?t.getBoundingClientRect():{left:0,top:0,width:window.innerWidth,height:window.innerHeight};this.pointer.x=(u.clientX-d.left)/d.width*2-1,this.pointer.y=-((u.clientY-d.top)/d.height)*2+1,this.pointer.has=!0},l=u=>{tc(u.target)||u.pointerType==="touch"||(o(u),this.press(`Mouse${u.button}`))},c=u=>{u.pointerType!=="touch"&&this.pressed.delete(`Mouse${u.button}`)},h=u=>u.preventDefault();e.addEventListener("keydown",n),e.addEventListener("keyup",i),e.addEventListener("blur",r),e.addEventListener("pointermove",o),e.addEventListener("pointerdown",l),e.addEventListener("pointerup",c),e.addEventListener("pointercancel",c),document.addEventListener("visibilitychange",a),t?.addEventListener("contextmenu",h),this.cleanup=[()=>e.removeEventListener("keydown",n),()=>e.removeEventListener("keyup",i),()=>e.removeEventListener("blur",r),()=>e.removeEventListener("pointermove",o),()=>e.removeEventListener("pointerdown",l),()=>e.removeEventListener("pointerup",c),()=>e.removeEventListener("pointercancel",c),()=>document.removeEventListener("visibilitychange",a),()=>t?.removeEventListener("contextmenu",h)]}detach(){this.cleanup.forEach(e=>e()),this.cleanup=[],this.pressed.clear()}onPress(e,t){for(const n of e){const i=this.pressHandlers.get(n)??[];i.push(t),this.pressHandlers.set(n,i)}}isDown(e){return this.pressed.has(e)}isActionDown(e){return e.some(t=>this.pressed.has(t))}getPointer(){return this.pointer}getPressedCodes(){return[...this.pressed]}getMoveAxis(){const e=q.controls,t={x:(this.isActionDown(e.right)?1:0)-(this.isActionDown(e.left)?1:0),z:(this.isActionDown(e.down)?1:0)-(this.isActionDown(e.up)?1:0)};return t.x===0&&t.z===0?{x:this.virtualAxis.x,z:this.virtualAxis.z}:t}setVirtualAxis(e,t){const n=Math.hypot(e,t),i=n>1?1/n:1;this.virtualAxis.x=e*i,this.virtualAxis.z=t*i}pressVirtual(e){!e||this.pressed.has(e)||this.press(e)}releaseVirtual(e){this.pressed.delete(e)}press(e){this.pressed.add(e),this.pressHandlers.get(e)?.forEach(t=>t())}isGameKey(e){return Object.values(q.controls).some(t=>t.includes(e))}}function nc(s,e){try{s.setPointerCapture(e)}catch{}}class J_{constructor(e,t,n,i){this.input=t,this.stickPointer=null,this.stickCenter={x:0,y:0},this.radius=56,this.floating=!0;const r=q.controls;this.el=document.createElement("div"),this.el.className="touch",this.el.hidden=!0,this.el.innerHTML=`
      <div class="touch-zone" id="touch-zone" aria-hidden="true"></div>
      <div class="touch-stick" id="touch-stick" aria-label="이동 조이스틱"><div class="touch-knob"></div></div>
      <div class="touch-buttons">
        <button type="button" class="touch-btn touch-melee" data-code="${r.attackMelee[1]??r.attackMelee[0]}" aria-label="근접 공격">근접</button>
        <button type="button" class="touch-btn touch-ranged" data-code="${r.attackRanged[1]??r.attackRanged[0]}" aria-label="원거리 공격">원거리</button>
        <button type="button" class="touch-btn touch-jump" data-code="${r.jump[0]}" aria-label="점프">점프</button>
        <button type="button" class="touch-btn touch-dodge" id="touch-dodge" data-code="${r.dodge[0]}" aria-label="회피">회피</button>
        <button type="button" class="touch-btn touch-interact" id="touch-interact" data-code="${r.interact[0]}" aria-label="상자 열기" hidden>열기</button>
      </div>
      <div class="rotate-hint">휴대폰을 가로로 돌리면 더 넓게 보입니다</div>
      <div class="touch-top">
        <button type="button" class="touch-small" id="touch-inventory" aria-label="장비">장비</button>
        <button type="button" class="touch-small" id="touch-menu" aria-label="메뉴">메뉴</button>
      </div>`,e.appendChild(this.el),this.stick=this.el.querySelector("#touch-stick"),this.knob=this.stick.querySelector(".touch-knob"),this.zone=this.el.querySelector("#touch-zone"),this.interactBtn=this.el.querySelector("#touch-interact");const a=(c,h,u)=>{this.stickPointer===null&&(h.preventDefault(),this.stickPointer=h.pointerId,nc(c,h.pointerId),this.stickCenter=u,this.moveStick(h.clientX,h.clientY))},o=c=>{c.pointerId===this.stickPointer&&(c.preventDefault(),this.moveStick(c.clientX,c.clientY))},l=c=>{c.pointerId===this.stickPointer&&(this.stickPointer=null,this.knob.style.transform="translate(0px, 0px)",this.input.setVirtualAxis(0,0),this.floating&&this.stick.classList.remove("active"))};this.stick.addEventListener("pointerdown",c=>{const h=this.stick.getBoundingClientRect();a(this.stick,c,{x:h.left+h.width/2,y:h.top+h.height/2})}),this.stick.addEventListener("pointermove",o),this.stick.addEventListener("pointerup",l),this.stick.addEventListener("pointercancel",l),this.zone.addEventListener("pointerdown",c=>{!this.floating||this.stickPointer!==null||(this.placeStick(c.clientX,c.clientY),this.stick.classList.add("active"),a(this.zone,c,{x:c.clientX,y:c.clientY}))}),this.zone.addEventListener("pointermove",o),this.zone.addEventListener("pointerup",l),this.zone.addEventListener("pointercancel",l),this.el.querySelectorAll(".touch-btn").forEach(c=>{const h=c.dataset.code??"",u=f=>{f.preventDefault(),nc(c,f.pointerId),c.classList.add("down"),this.input.pressVirtual(h)},d=()=>{c.classList.remove("down"),this.input.releaseVirtual(h)};c.addEventListener("pointerdown",u),c.addEventListener("pointerup",d),c.addEventListener("pointercancel",d),c.addEventListener("contextmenu",f=>f.preventDefault())}),this.setFloating(!0),this.el.querySelector("#touch-menu")?.addEventListener("click",n),this.el.querySelector("#touch-inventory")?.addEventListener("click",i),this.el.addEventListener("contextmenu",c=>c.preventDefault())}placeStick(e,t){const n=this.el.getBoundingClientRect(),i=this.stick.offsetWidth/2||68;this.stick.style.left=`${e-n.left-i}px`,this.stick.style.top=`${t-n.top-i}px`,this.stick.style.bottom="auto"}setFloating(e){this.floating=e,this.el.classList.toggle("floating",e),this.stick.classList.remove("active"),this.stick.style.left="",this.stick.style.top="",this.stick.style.bottom=""}get isFloating(){return this.floating}moveStick(e,t){let n=e-this.stickCenter.x,i=t-this.stickCenter.y;const r=Math.hypot(n,i);r>this.radius&&(n=n/r*this.radius,i=i/r*this.radius),this.knob.style.transform=`translate(${n}px, ${i}px)`;const a=.15,o=Math.abs(n/this.radius)<a?0:n/this.radius,l=Math.abs(i/this.radius)<a?0:i/this.radius;this.input.setVirtualAxis(o,l)}get visible(){return!this.el.hidden}setLeftHanded(e){this.el.classList.toggle("lefty",e)}setButtonScale(e){this.el.style.setProperty("--touch-scale",String(e))}setDodgeCooldown(e){const t=this.el.querySelector("#touch-dodge");t&&(t.style.opacity=e>0?String(.35+(1-e)*.3):"",t.classList.toggle("cooling",e>0))}setInteract(e){this.interactBtn.hidden=!e}show(){this.el.hidden=!1}hide(){this.el.hidden=!0,this.stickPointer=null,this.stick.classList.remove("active"),this.knob.style.transform="translate(0px, 0px)",this.input.setVirtualAxis(0,0),this.el.querySelectorAll(".touch-btn").forEach(e=>{e.classList.remove("down"),this.input.releaseVirtual(e.dataset.code??"")})}}const oi=["melee","ranged","armor","trinket1","trinket2"],ic={melee:"근접 무기",ranged:"원거리 무기",armor:"방어구",trinket1:"장신구 1",trinket2:"장신구 2"};function mh(s){return s==="trinket"?["trinket1","trinket2"]:[s]}class Q_{constructor(){this.inventory=[],this.equipped={melee:null,ranged:null,armor:null,trinket1:null,trinket2:null}}add(e){return this.inventory.length>=q.equipment.inventorySize?!1:(this.inventory.push(e),!0)}get isFull(){return this.inventory.length>=q.equipment.inventorySize}discard(e){const t=this.inventory.findIndex(n=>n.uid===e);return t<0?!1:(this.inventory.splice(t,1),!0)}targetSlot(e){const t=mh(e.category);return t.find(n=>this.equipped[n]===null)??t[0]}equip(e){const t=this.inventory.findIndex(a=>a.uid===e);if(t<0)return null;const n=this.inventory[t],i=this.targetSlot(n);this.inventory.splice(t,1);const r=this.equipped[i];return this.equipped[i]=n,r&&this.inventory.push(r),i}unequip(e){const t=this.equipped[e];return!t||this.isFull?!1:(this.equipped[e]=null,this.inventory.push(t),!0)}totals(){const e={attack:0,defense:0,maxHp:0,moveSpeed:0};for(const t of oi){const n=this.equipped[t];n&&(e.attack+=n.stats.attack,e.defense+=n.stats.defense,e.maxHp+=n.stats.maxHp,e.moveSpeed+=n.stats.moveSpeed)}return e}weaponAttack(e){return this.equipped[e]?.stats.attack??0}compare(e){const t=this.equipped[this.targetSlot(e)];return{attack:e.stats.attack-(t?.stats.attack??0),defense:e.stats.defense-(t?.stats.defense??0),maxHp:e.stats.maxHp-(t?.stats.maxHp??0),moveSpeed:Math.round((e.stats.moveSpeed-(t?.stats.moveSpeed??0))*100)/100}}reset(){this.inventory.length=0;for(const e of oi)this.equipped[e]=null}}function ex(s,e){if(s<=0)return 0;const t=q.equipment.defenseScale;return Math.max(1,Math.round(s*(t/(t+Math.max(0,e)))))}const Qn=[{id:"sword_basic",name:"에너지 검",category:"melee",base:{attack:4},description:"기본형 에너지 검. 가볍고 다루기 쉽다."},{id:"axe_heavy",name:"플라즈마 도끼",category:"melee",base:{attack:7,moveSpeed:-.05},description:"무겁지만 한 방이 세다. 이동이 조금 느려진다."},{id:"hammer_pulse",name:"펄스 망치",category:"melee",base:{attack:9,moveSpeed:-.1},description:"충격파를 내는 망치. 느리지만 강력하다."},{id:"blaster_basic",name:"소형 블래스터",category:"ranged",base:{attack:3},description:"빠르게 쏠 수 있는 기본 블래스터."},{id:"bow_photon",name:"광자 활",category:"ranged",base:{attack:5},description:"빛의 화살을 쏘는 활."},{id:"cannon_arc",name:"아크 캐논",category:"ranged",base:{attack:8,moveSpeed:-.05},description:"전기를 뿜는 대형 캐논."},{id:"vest_light",name:"경량 조끼",category:"armor",base:{defense:6},description:"움직임을 방해하지 않는 가벼운 방어구."},{id:"plate_steel",name:"강철 갑옷",category:"armor",base:{defense:12,maxHp:10,moveSpeed:-.05},description:"튼튼한 강철판 갑옷."},{id:"suit_nano",name:"나노 슈트",category:"armor",base:{defense:9,moveSpeed:.05},description:"몸에 딱 맞는 첨단 슈트. 조금 더 빨라진다."},{id:"ring_vitality",name:"생명의 반지",category:"trinket",base:{maxHp:20},description:"최대 체력을 늘려 준다."},{id:"boots_wind",name:"바람 신발",category:"trinket",base:{moveSpeed:.12},description:"이동 속도가 빨라진다."},{id:"amulet_power",name:"힘의 목걸이",category:"trinket",base:{attack:2,defense:2},description:"공격과 방어를 조금씩 올려 준다."},{id:"spear_crystal",name:"수정 창",category:"melee",base:{attack:6,moveSpeed:.04},description:"수정 동굴에서 캔 가볍고 날카로운 창."},{id:"rifle_rail",name:"레일 라이플",category:"ranged",base:{attack:10,moveSpeed:-.08},description:"요새 포대의 부품으로 만든 강력한 총. 무겁다."},{id:"cloak_shadow",name:"그림자 망토",category:"armor",base:{defense:7,moveSpeed:.1},description:"얇지만 몸놀림이 빨라지는 망토."},{id:"core_fortress",name:"요새 코어",category:"trinket",base:{defense:6,maxHp:15},description:"요새의 동력 코어. 단단해진다."}],tx={attack:0,defense:0,maxHp:0,moveSpeed:0};let nx=1;function ir(s,e){const t=q.equipment.rarities[e],n={...tx};for(const i of Object.keys(n)){const r=s.base[i]??0;n[i]=i==="moveSpeed"?Math.round(r*(r>0?t.statMul:1)*100)/100:Math.round(r*t.statMul)}return{uid:nx++,templateId:s.id,name:t.prefix?`${t.prefix} ${s.name}`:s.name,category:s.category,rarity:e,stats:n,description:s.description}}function gh(s=Math.random){const e=Object.entries(q.equipment.rarities),t=e.reduce((i,[,r])=>i+r.weight,0);let n=s()*t;for(const[i,r]of e)if(n-=r.weight,n<=0)return i;return e[e.length-1][0]}function sc(s=Math.random){const e=Qn[Math.min(Qn.length-1,Math.floor(s()*Qn.length))];return ir(e,gh(s))}const rc=["common","uncommon","rare","epic","legendary"];function ix(s,e=Math.random){const t=Qn[Math.min(Qn.length-1,Math.floor(e()*Qn.length))],n=gh(e),i=rc.indexOf(n)>=rc.indexOf(s)?n:s;return ir(t,i)}function sr(s){return Qn.find(e=>e.id===s)}function sx(s,e,t=Math.random,n){const i=[];if(i.push({kind:"xp",amount:Math.max(1,Math.round(s*e.xpPerScore))}),t()<e.healChance&&i.push({kind:"heal",amount:e.healAmount}),t()<e.goldChance){const r=Math.max(0,e.goldMax-e.goldMin);i.push({kind:"gold",amount:Math.round(e.goldMin+t()*r)})}return n&&t()<(e.equipChance??0)&&i.push({kind:"equip",amount:0,item:n()}),i}function rx(s,e=Math.random,t){const n=[],i=Math.max(0,s.goldMax-s.goldMin);return n.push({kind:"gold",amount:Math.round(s.goldMin+e()*i)}),t&&e()<s.equipChance&&n.push({kind:"equip",amount:0,item:t()}),e()<s.healChance&&n.push({kind:"heal",amount:s.healAmount}),n}class ax{constructor(e){this.root=new Ke,this.pickups=[],this.geos={heal:new je(.42,.42,.42),xp:new Va(.3,0),gold:new ln(.26,.26,.1,16),equip:new je(.5,.36,.34)},this.mats={heal:new ht({color:16732025,emissive:5574946}),xp:new ht({color:6091480,emissive:1002052}),gold:new ht({color:16765503,emissive:5061120}),equip:new ht({color:13489908,emissive:3357269})},this.root.name="Loot",e.add(this.root)}dropFor(e,t,n={gold:1,xp:1}){const i=q.loot,r={...i,xpPerScore:i.xpPerScore*n.xp,goldMin:Math.round(i.goldMin*n.gold),goldMax:Math.round(i.goldMax*n.gold),equipChance:q.equipment.dropChance},a=sx(e,r,Math.random,()=>sc());return this.scatter(a,t,.6),a}dropChest(e){const t=q.dungeon.chestLoot,n=rx({...t,healAmount:q.loot.healAmount},Math.random,()=>sc());return this.scatter(n,e,1.1),n}scatter(e,t,n){e.forEach((i,r)=>{const a=r/e.length*Math.PI*2+Math.random();this.spawn(i,{x:t.x+Math.cos(a)*n,z:t.z+Math.sin(a)*n})})}spawn(e,t){let n=this.mats[e.kind];if(e.kind==="equip"&&e.item){const r=new de(q.equipment.rarities[e.item.rarity].color);n=new ht({color:r,emissive:r.clone().multiplyScalar(.35)})}const i=new xe(this.geos[e.kind],n);i.position.set(t.x,.6,t.z),e.kind==="gold"&&(i.rotation.x=Math.PI/2),i.castShadow=!0,this.root.add(i),this.pickups.push({mesh:i,drop:e,t:Math.random()*6,life:q.loot.lifetime})}get count(){return this.pickups.length}update(e,t,n){const i=q.loot;for(let r=this.pickups.length-1;r>=0;r--){const a=this.pickups[r];a.t+=e,a.life-=e,a.mesh.rotation.y+=e*2.5,a.mesh.position.y=.6+Math.sin(a.t*3)*.12,a.mesh.visible=a.life>3||Math.floor(a.t*8)%2===0;const o=t.x-a.mesh.position.x,l=t.z-a.mesh.position.z,c=Math.hypot(o,l);if(c<i.magnetRange&&c>1e-4){const h=(i.magnetSpeed+(i.magnetRange-c)*2)*e;a.mesh.position.x+=o/c*Math.min(h,c),a.mesh.position.z+=l/c*Math.min(h,c)}if(c<i.pickupRadius){n(a.drop,{x:a.mesh.position.x,z:a.mesh.position.z}),this.remove(r);continue}a.life<=0&&this.remove(r)}}clear(){for(let e=this.pickups.length-1;e>=0;e--)this.remove(e)}dispose(){this.clear(),Object.values(this.geos).forEach(e=>e.dispose()),Object.values(this.mats).forEach(e=>e.dispose()),this.root.removeFromParent()}remove(e){const t=this.pickups[e];this.root.remove(t.mesh),t.drop.kind==="equip"&&t.mesh.material.dispose(),this.pickups.splice(e,1)}}function ac(s,e){const t=[],n=(i,r,a,o=!1)=>{if(r===0&&!a)return;const l=h=>o?`${Math.round(h*100)}%`:String(h);let c=`${i} ${r>0?"+":""}${l(r)}`;a!==void 0&&a!==0&&(c+=` <span class="${a>0?"up":"down"}">(${a>0?"▲":"▼"}${l(Math.abs(a))})</span>`),t.push(c)};return n("공격",s.attack,e?.attack),n("방어",s.defense,e?.defense),n("체력",s.maxHp,e?.maxHp),n("속도",s.moveSpeed,e?.moveSpeed,!0),t.join(" · ")||"효과 없음"}class ox{constructor(e,t,n){this.equipment=t,this.callbacks=n,this.el=document.createElement("div"),this.el.className="guide inv",this.el.hidden=!0,this.el.innerHTML=`
      <div class="guide-panel inv-panel" role="dialog" aria-labelledby="inv-title">
        <div class="inv-head"><h2 class="guide-title" id="inv-title">장비</h2><button class="btn small" id="inv-close" type="button">닫기 (I)</button></div>
        <p class="guide-sub" id="inv-summary"></p>
        <div id="inv-body"></div>
      </div>`,e.appendChild(this.el),this.body=this.el.querySelector("#inv-body"),this.el.querySelector("#inv-close")?.addEventListener("click",()=>this.callbacks.onClose()),this.body.addEventListener("click",i=>{const r=i.target.closest("button[data-action]");if(!r)return;const a=r.dataset.action;a==="equip"?this.equipment.equip(Number(r.dataset.uid)):a==="unequip"?this.equipment.unequip(r.dataset.slot):a==="discard"&&this.equipment.discard(Number(r.dataset.uid)),this.callbacks.onChange(),this.render()})}get visible(){return!this.el.hidden}show(){this.el.hidden=!1,this.render()}hide(){this.el.hidden=!0}render(){const e=this.equipment,t=q.equipment.rarities;this.el.querySelector("#inv-summary").textContent=this.callbacks.getSummary();const n=oi.map(r=>{const a=e.equipped[r];return`<li class="inv-row">
        <span class="inv-slot">${ic[r]}</span>
        ${a?`<span class="inv-name" style="color:${t[a.rarity].color}">${a.name}</span><span class="inv-stats">${ac(a.stats)}</span>
          <button class="btn small ghost" type="button" data-action="unequip" data-slot="${r}">해제</button>`:'<span class="inv-empty">비어 있음</span>'}
      </li>`}).join(""),i=e.inventory.length?e.inventory.map(r=>`<li class="inv-row">
          <span class="inv-slot">${ic[e.targetSlot(r)]}</span>
          <span class="inv-name" style="color:${t[r.rarity].color}">${r.name} <small>${t[r.rarity].label}</small></span>
          <span class="inv-stats">${ac(r.stats,e.compare(r))}</span>
          <button class="btn small" type="button" data-action="equip" data-uid="${r.uid}">장착</button>
          <button class="btn small ghost" type="button" data-action="discard" data-uid="${r.uid}" title="${r.description}">버리기</button>
        </li>`).join(""):'<li class="inv-empty">가방이 비어 있습니다. 적을 처치하면 장비가 떨어집니다.</li>';this.body.innerHTML=`
      <h3 class="inv-h">장착 중</h3><ul class="inv-list">${n}</ul>
      <h3 class="inv-h">가방 (${e.inventory.length} / ${q.equipment.inventorySize})</h3><ul class="inv-list">${i}</ul>`}}class lx{constructor(){this.level=1,this.xp=0,this.gold=0}get xpToNext(){const e=q.progression;return Math.round(e.xpBase*Math.pow(e.xpGrowth,this.level-1))}get maxHp(){return q.player.maxHp+(this.level-1)*q.progression.hpPerLevel}get damageMultiplier(){return 1+(this.level-1)*q.progression.damagePerLevel}addXp(e){if(e<=0)return 0;this.xp+=e;let t=0;const n=q.progression.maxLevel;for(;this.level<n&&this.xp>=this.xpToNext;)this.xp-=this.xpToNext,this.level++,t++;return this.level>=n&&(this.xp=Math.min(this.xp,this.xpToNext)),t}addGold(e){e>0&&(this.gold+=e)}reset(){this.level=1,this.xp=0,this.gold=0}}class cx{constructor(e,t){this.object3d=new Ke,this.facing=0,this.moving=!1,this.speed=0,this.jumpY=0,this.jumpVy=0,this.attackTimer=0,this.attackDuration=0,this.dashing=!1,this.object3d.name="Player",this.model=e,this.object3d.add(e.root),this.object3d.position.set(t.x,0,t.z),this.health=new fh(q.player.maxHp,q.player.invulnerableTime)}get position(){return this.object3d.position}get attacking(){return this.attackTimer>0}get airborne(){return this.jumpY>0}get currentModel(){return this.model}get faceVisible(){let e=!1;return this.model.root.traverse(t=>{const n=t;n.isMesh&&n.visible&&n.material.map&&n.parent?.position.y===1.42&&(e=!0)}),e}setModel(e){this.object3d.remove(this.model.root),this.model.dispose(),this.model=e,this.object3d.add(e.root)}triggerAttack(e){this.attackTimer=this.attackDuration=Math.max(.01,e)}reset(e){this.health.reset(q.player.maxHp),this.health.invulnerableTime=q.player.invulnerableTime,this.object3d.position.set(e.x,0,e.z),this.facing=0,this.moving=!1,this.speed=0,this.attackTimer=0,this.jumpY=0,this.jumpVy=0,this.object3d.visible=!0}update(e){this.health.update(e),this.attackTimer>0&&(this.attackTimer-=e),this.object3d.rotation.y=this.facing,this.object3d.position.y=this.jumpY,this.model.update(e,{moving:this.moving,speed:this.speed,attack:this.attackTimer>0?1-this.attackTimer/this.attackDuration:null,airborne:this.airborne,dead:this.health.isDead}),this.object3d.visible=this.health.isDead||this.health.invulnerable<=0||Math.floor(this.health.invulnerable*20)%2===0}dispose(){this.model.dispose()}}class hx{constructor(e,t,n,i,r=()=>1){this.player=e,this.input=t,this.world=n,this.getCameraYaw=i,this.getSpeedMultiplier=r,this.knock={x:0,z:0},this.jumpQueued=!1,this.dashQueued=!1,this.dash=q0(),this.onDash=null,this.onJump=null,this.input.onPress(q.controls.jump,()=>{this.jumpQueued=!0}),this.input.onPress(q.controls.dodge,()=>{this.dashQueued=!0})}get dashCooldownRatio(){const e=q.player.dash.cooldown;return e>0?Math.min(1,this.dash.cooldown/e):0}get dashing(){return this.dash.timer>0}applyKnockback(e,t){this.knock.x+=e.x*t,this.knock.z+=e.z*t}reset(){this.knock.x=0,this.knock.z=0,this.jumpQueued=!1,this.dashQueued=!1,this.dash.timer=0,this.dash.cooldown=0,this.player.dashing=!1}update(e){const t=q.player,n=this.player.position;if(this.player.health.isDead){this.player.moving=!1,this.player.speed=0;return}if(this.jumpQueued&&!this.player.airborne&&(this.player.jumpVy=t.jumpSpeed,this.player.jumpY=.001,this.onJump?.()),this.jumpQueued=!1,this.player.airborne){const h=W0({y:this.player.jumpY,vy:this.player.jumpVy},e,t.gravity);this.player.jumpY=h.y,this.player.jumpVy=h.vy}const i=this.input.getMoveAxis();let r=G0(i,this.getCameraYaw()),a=r.x!==0||r.z!==0,o=t.moveSpeed*this.getSpeedMultiplier()*(this.player.attacking?t.attackMoveFactor:1);if(j0(this.dash,e),this.dashQueued){this.dashQueued=!1;const h=a?r:{x:Math.sin(this.player.facing),z:Math.cos(this.player.facing)};X0(this.dash,h,t.dash.duration,t.dash.cooldown)&&(t.dash.invulnerable&&(this.player.health.invulnerable=Math.max(this.player.health.invulnerable,t.dash.duration)),this.knock.x=0,this.knock.z=0,this.onDash?.(this.dash.dir))}this.dash.timer>0&&(r=this.dash.dir,a=!0,o=t.dash.speed),this.player.dashing=this.dash.timer>0;let l={x:n.x+r.x*o*e+this.knock.x*e,z:n.z+r.z*o*e+this.knock.z*e};const c=Math.exp(-8*e);if(this.knock.x*=c,this.knock.z*=c,l=Ya(l,t.radius,this.world.getObstacleBoxes()),l=Ka(l,this.world.getArenaHalfSize(),t.radius),n.x=l.x,n.z=l.z,a&&(!this.player.attacking||this.dash.timer>0)){const h=fr(r);this.player.facing=Za(this.player.facing,h,1-Math.exp(-t.turnSpeed*e))}this.player.moving=a,this.player.speed=a?o:0}}function ux(s){const e=new Ke;e.name="PlaceholderHero";const t=I=>new ht({color:new de(I)}),n=t(s.body),i=t(s.accent),r=t(s.skin),a=new ft({color:new de(s.visor)}),o=new ft({color:new de(s.visor)}),l=t("#2c3e6b"),c=(I,y,E,k=0,N=0,J=0)=>{const P=new xe(y,E);return P.position.set(k,N,J),P.castShadow=!0,I.add(P),P},h=I=>{const y=new Ke;return y.position.set(I,.5,0),c(y,new ln(.11,.12,.42,10),l,0,-.21,0),c(y,new je(.24,.12,.32),i,0,-.46,.04),e.add(y),y},u=h(-.14),d=h(.14),f=new Ke;c(f,new je(.6,.52,.36),n,0,.76,0),c(f,new je(.62,.08,.38),i,0,.52,0),c(f,new je(.36,.4,.18),i,0,.8,-.26),e.add(f);const g=I=>{const y=new Ke;return y.position.set(I,.98,0),c(y,new ln(.085,.08,.44,10),n,0,-.2,0),c(y,new kt(.1,10,8),r,0,-.44,0),f.add(y),y},_=g(-.38),m=g(.38),p=new Ke;p.position.set(0,-.44,0),c(p,new je(.07,.07,.9),o,0,0,.5),c(p,new je(.18,.06,.06),i,0,0,.08),m.add(p);const M=new Ke;M.position.y=1.42,c(M,new kt(.4,24,18),r),c(M,new je(.5,.16,.12),a,0,.05,.36);const x=c(M,new kt(.43,24,12,0,Math.PI*2,0,Math.PI*.5),l,0,.03,-.05);x.rotation.x=-.3;const v=new ft({transparent:!0,opacity:1}),R=new xe(new kt(.405,24,18,Math.PI*.72,Math.PI*.56,Math.PI*.22,Math.PI*.56),v);R.visible=!1,M.add(R);const w=M.children[1];e.add(M);let A=0;return{root:e,setFace(I){v.map&&v.map!==I&&v.map.dispose(),v.map=I,v.needsUpdate=!0,R.visible=I!==null,w.visible=I===null},update(I,y){if(y.dead){e.rotation.z=pa.lerp(e.rotation.z,Math.PI/2,1-Math.exp(-8*I)),e.position.y=pa.lerp(e.position.y,.4,1-Math.exp(-8*I));return}if(e.rotation.z=0,y.airborne){const N=1-Math.exp(-14*I);u.rotation.x+=(-.9-u.rotation.x)*N,d.rotation.x+=(.5-d.rotation.x)*N,_.rotation.x+=(-2.2-_.rotation.x)*N,y.attack===null&&(m.rotation.x+=(-2.2-m.rotation.x)*N),e.position.y=0;return}const E=y.moving?1:0;A+=I*(y.speed>0?y.speed*1.6:0);const k=Math.sin(A)*.75*E;if(u.rotation.x=k,d.rotation.x=-k,_.rotation.x=-k*.8,e.position.y=Math.abs(Math.sin(A))*.06*E,y.attack!==null){const N=y.attack,J=Math.sin(N*Math.PI);m.rotation.x=-Math.PI/2*Math.min(1,N*2)-J*.3,m.rotation.y=(.5-N)*1.6,f.rotation.y=(.5-N)*.5}else{const N=1-Math.exp(-10*I);m.rotation.x+=(k*.8-m.rotation.x)*N,m.rotation.y+=(0-m.rotation.y)*N,f.rotation.y+=(0-f.rotation.y)*N}if(!y.moving){const N=1-Math.exp(-10*I);u.rotation.x+=(0-u.rotation.x)*N,d.rotation.x+=(0-d.rotation.x)*N,_.rotation.x+=(0-_.rotation.x)*N}},dispose(){e.traverse(I=>{const y=I;if(y.isMesh){y.geometry.dispose();const E=y.material;Array.isArray(E)?E.forEach(k=>k.dispose()):E.dispose()}})}}}const Ea="hero-x.face",sa=256;function dx(s,e){const t=Math.max(1,Math.min(s,e)),n=Math.round((s-t)/2),i=e*.4,r=Math.round(Math.min(Math.max(0,i-t/2),Math.max(0,e-t)));return{x:n,y:r,size:t}}async function fx(s){const e=URL.createObjectURL(s);try{const t=await new Promise((a,o)=>{const l=new Image;l.onload=()=>a(l),l.onerror=()=>o(new Error("이미지를 읽을 수 없습니다. JPG·PNG 파일인지 확인하세요.")),l.src=e}),n=document.createElement("canvas");n.width=n.height=sa;const i=n.getContext("2d");if(!i)throw new Error("캔버스를 만들 수 없습니다.");const r=dx(t.naturalWidth,t.naturalHeight);return i.drawImage(t,r.x,r.y,r.size,r.size,0,0,sa,sa),n.toDataURL("image/jpeg",.85)}finally{URL.revokeObjectURL(e)}}function px(){try{const s=localStorage.getItem(Ea);return s&&s.startsWith("data:image/")?s:null}catch{return null}}function oc(s){try{return s?localStorage.setItem(Ea,s):localStorage.removeItem(Ea),!0}catch{return!1}}function mx(s){return new Promise((e,t)=>{new rh().load(s,n=>{n.colorSpace=rt,e(n)},void 0,()=>t(new Error("얼굴 텍스처를 만들 수 없습니다.")))})}function lc(s){return s==="Mouse0"?"마우스 왼쪽":s==="Mouse2"?"마우스 오른쪽":s==="Mouse1"?"마우스 가운데":s==="Space"?"Space":s==="Escape"?"Esc":s==="ShiftLeft"||s==="ShiftRight"?"Shift":s.startsWith("Key")?s.slice(3):s.startsWith("Arrow")?{Up:"↑",Down:"↓",Left:"←",Right:"→"}[s.slice(5)]??s:s}class gx{constructor(e,t){const n=q.controls,i=r=>r.map(a=>`<span class="key">${lc(a)}</span>`).join(" ");this.guide=document.createElement("div"),this.guide.className="guide",this.guide.hidden=!0,this.guide.innerHTML=`
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
      </div>`,e.appendChild(this.guide),this.guide.querySelector("#guide-close")?.addEventListener("click",t),this.hud=document.createElement("div"),this.hud.className="hud",e.appendChild(this.hud),this.setHudText("")}get visible(){return!this.guide.hidden}show(){this.guide.hidden=!1}hide(){this.guide.hidden=!0}toggle(){this.guide.hidden=!this.guide.hidden}setHudText(e){const t=lc(q.controls.toggleGuide[0]??"KeyH");this.hud.textContent=`${t}: 조작 안내 · Esc: 메뉴${e?" · "+e:""}`}}const _h="hero-x.difficulty";function _x(){try{const s=localStorage.getItem(_h);if(s&&Ja(s))return s}catch{}return q.difficulty.default}function cc(s){try{localStorage.setItem(_h,s)}catch{}}function Ja(s){return s in q.difficulty.presets}function Ii(s){return q.difficulty.presets[s]??q.difficulty.presets[q.difficulty.default]}function xh(){return Object.keys(q.difficulty.presets)}class xx{constructor(e,t){this.cb=t,this.confirming=!1;const n=q.meta,i=xh().map(a=>`<button type="button" class="diff-btn" data-level="${a}">${Ii(a).label}</button>`).join("");this.el=document.createElement("div"),this.el.className="guide menu",this.el.innerHTML=`
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
      </div>`,e.appendChild(this.el);const r=a=>this.el.querySelector(a);r("#menu-new").addEventListener("click",()=>{this.cb.hasProgress()?this.setConfirm(!0):this.cb.newGame()}),r("#menu-confirm-yes").addEventListener("click",()=>{this.setConfirm(!1),this.cb.newGame()}),r("#menu-confirm-no").addEventListener("click",()=>this.setConfirm(!1)),r("#menu-continue").addEventListener("click",()=>this.cb.continueGame()),r("#menu-inventory").addEventListener("click",()=>this.cb.openInventory()),r("#menu-guide").addEventListener("click",()=>this.cb.openGuide()),r("#menu-settings").addEventListener("click",()=>this.cb.openSettings()),r("#menu-dungeons").addEventListener("click",()=>this.cb.openDungeons()),this.el.querySelectorAll(".diff-btn").forEach(a=>{a.addEventListener("click",()=>{this.cb.difficulty.set(a.dataset.level),this.refresh()})}),this.refresh()}get visible(){return!this.el.hidden}setConfirm(e){this.confirming=e,this.el.querySelector("#menu-confirm").hidden=!e}refresh(){const e=this.cb.hasRun(),t=this.cb.hasProgress(),n=this.el.querySelector("#menu-continue");n.disabled=!t,n.textContent=e?"이어하기":t?"이어하기 (던전 선택)":"이어하기",n.title=t?"":"이어갈 진행이 없습니다";const i=this.el.querySelector("#menu-dungeons");i.disabled=!t,i.title=t?"":"새 게임을 먼저 시작하세요";const r=this.el.querySelector("#menu-progress"),a=this.cb.progressText();r.textContent=a,r.hidden=a==="",this.el.querySelector("#menu-save").textContent=this.cb.saveNote();const o=this.cb.difficulty.get();this.el.querySelectorAll(".diff-btn").forEach(l=>l.setAttribute("aria-pressed",String(l.dataset.level===o)))}show(){this.setConfirm(!1),this.refresh(),this.el.hidden=!1}hide(){this.el.hidden=!0}pressPrimary(){this.confirming?(this.setConfirm(!1),this.cb.newGame()):this.cb.hasProgress()?this.cb.continueGame():this.cb.newGame()}}class vx{constructor(e,t){this.project=t,this.popups=[],this.root=document.createElement("div"),this.root.className="dmg-layer",e.appendChild(this.root)}show(e,t,n="enemy"){const i=document.createElement("div");i.className=`dmg ${n}`;const r=Math.round(t);i.textContent=n==="kill"?`${r} 처치!`:n==="heal"?`+${r}`:n==="levelup"?`레벨 ${r}!`:String(r),this.root.appendChild(i),this.popups.push({el:i,pos:e.clone(),t:0}),this.popups.length>40&&this.remove(0)}showText(e,t,n){const i=document.createElement("div");i.className="dmg text",i.textContent=t,n&&(i.style.color=n),this.root.appendChild(i),this.popups.push({el:i,pos:e.clone(),t:-.6}),this.popups.length>40&&this.remove(0)}update(e){for(let t=this.popups.length-1;t>=0;t--){const n=this.popups[t];n.t+=e,n.pos.y+=e*1.4;const i=this.project(n.pos);i?(n.el.style.transform=`translate(${i.x}px, ${i.y}px) translate(-50%, -50%) scale(${1+Math.min(n.t*2,.3)})`,n.el.style.opacity=String(Math.max(0,Math.min(1,1.3-Math.max(0,n.t))))):n.el.style.opacity="0",n.t>1.1&&this.remove(t)}}clear(){for(;this.popups.length;)this.remove(this.popups.length-1)}remove(e){this.popups[e].el.remove(),this.popups.splice(e,1)}}class yx{constructor(e){this.last={hp:-1,maxHp:-1,enemies:-1,kills:-1,score:-1,level:-1,xp:-1,xpToNext:-1,gold:-1},this.root=document.createElement("div"),this.root.className="hud-top",this.root.innerHTML=`
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
      </div>`,e.appendChild(this.root),this.hpFill=this.root.querySelector("#hud-hp-fill"),this.hpText=this.root.querySelector("#hud-hp-text"),this.enemiesText=this.root.querySelector("#hud-enemies"),this.killsText=this.root.querySelector("#hud-kills"),this.scoreText=this.root.querySelector("#hud-score"),this.levelText=this.root.querySelector("#hud-level"),this.xpFill=this.root.querySelector("#hud-xp-fill"),this.xpText=this.root.querySelector("#hud-xp-text"),this.goldText=this.root.querySelector("#hud-gold"),this.chestText=this.root.querySelector("#hud-chests"),this.prompt=document.createElement("div"),this.prompt.className="hud-prompt",this.prompt.hidden=!0,e.appendChild(this.prompt),this.bossBar=document.createElement("div"),this.bossBar.className="boss-bar",this.bossBar.hidden=!0,this.bossBar.innerHTML='<span class="boss-name" id="boss-name"></span><div class="boss-track"><i id="boss-fill"></i></div><span class="boss-hp" id="boss-hp"></span>',e.appendChild(this.bossBar),this.banner=document.createElement("div"),this.banner.className="banner",this.banner.hidden=!0,e.appendChild(this.banner)}setBoss(e){if(!e){this.bossBar.hidden=!0;return}this.bossBar.hidden=!1,this.bossBar.querySelector("#boss-name").textContent=e.name+(e.phase2?" (분노)":""),this.bossBar.querySelector("#boss-fill").style.width=`${Math.max(0,Math.min(1,e.hp/e.maxHp))*100}%`,this.bossBar.querySelector("#boss-hp").textContent=`${Math.ceil(e.hp)} / ${e.maxHp}`,this.bossBar.classList.toggle("phase2",e.phase2)}showBanner(e,t=2200){this.banner.textContent=e,this.banner.hidden=!1,this.banner.classList.remove("pop"),this.banner.offsetWidth,this.banner.classList.add("pop"),clearTimeout(this.bannerTimer),this.bannerTimer=setTimeout(()=>this.banner.hidden=!0,t)}setDungeonName(e){this.root.querySelector("#hud-dungeon").textContent=e}setChests(e,t){const n=`${e} / ${t}`;this.chestText.textContent!==n&&(this.chestText.textContent=n)}setPrompt(e){this.prompt.textContent!==e&&(this.prompt.textContent=e),this.prompt.hidden=e===""}update(e){e.level!==this.last.level&&(this.levelText.textContent=String(e.level),this.last.level=e.level),(e.xp!==this.last.xp||e.xpToNext!==this.last.xpToNext)&&(this.xpFill.style.width=`${e.xpToNext>0?Math.min(100,e.xp/e.xpToNext*100):100}%`,this.xpText.textContent=`${e.xp} / ${e.xpToNext}`,this.last.xp=e.xp,this.last.xpToNext=e.xpToNext),e.gold!==this.last.gold&&(this.goldText.textContent=e.gold.toLocaleString("ko-KR"),this.last.gold=e.gold);const t=Math.ceil(e.hp);if(t!==this.last.hp||e.maxHp!==this.last.maxHp){const n=e.maxHp>0?Math.max(0,Math.min(1,e.hp/e.maxHp)):0;this.hpFill.style.width=`${n*100}%`,this.hpFill.classList.toggle("low",n<=.3),this.hpText.textContent=`${t} / ${e.maxHp}`,this.last.hp=t,this.last.maxHp=e.maxHp}e.enemies!==this.last.enemies&&(this.enemiesText.textContent=String(e.enemies),this.last.enemies=e.enemies),e.kills!==this.last.kills&&(this.killsText.textContent=String(e.kills),this.last.kills=e.kills),e.score!==this.last.score&&(this.scoreText.textContent=e.score.toLocaleString("ko-KR"),this.last.score=e.score)}flashHit(){this.root.classList.remove("hit"),this.root.offsetWidth,this.root.classList.add("hit")}show(){this.root.hidden=!1}hide(){this.root.hidden=!0}}class Mx{constructor(e,t,n,i){this.el=document.createElement("div"),this.el.className="guide result",this.el.hidden=!0,this.el.innerHTML=`
      <div class="guide-panel result-panel" role="dialog" aria-labelledby="result-title">
        <p class="guide-eyebrow" id="result-eyebrow">결과</p>
        <h2 class="guide-title" id="result-title">결과</h2>
        <p class="guide-sub" id="result-sub"></p>
        <div class="btns"><button class="btn" id="result-restart" type="button">다시 도전 (R)</button><button class="btn secondary" id="result-dungeons" type="button">던전 선택</button><button class="btn secondary" id="result-menu" type="button">메인 메뉴</button></div>
      </div>`,e.appendChild(this.el),this.title=this.el.querySelector("#result-title"),this.sub=this.el.querySelector("#result-sub"),this.el.querySelector("#result-restart")?.addEventListener("click",t),this.el.querySelector("#result-menu")?.addEventListener("click",n),this.el.querySelector("#result-dungeons")?.addEventListener("click",i)}get visible(){return!this.el.hidden}show(e,t){this.title.textContent=e,this.sub.textContent=t,this.el.hidden=!1}hide(){this.el.hidden=!0}}function Sx(){if(typeof window>"u"||typeof navigator>"u")return!1;try{if(window.matchMedia?.("(pointer: coarse)").matches)return!0}catch{}return navigator.maxTouchPoints>0&&/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)}const bx=["게임","소리","전투 수치","화면"],wa=[{key:"difficulty",kind:"choice",group:"게임",label:"난이도",description:"적의 체력·공격력·속도 배율. 바꾸면 던전을 처음부터 다시 시작합니다."},{key:"cameraDistance",kind:"range",group:"게임",label:"카메라 거리",description:"1.0 이 기본. 멀리 두면 넓게 보이고 가까우면 캐릭터가 크게 보입니다.",min:.6,max:1.6,step:.1,unit:"×"},{key:"touchControls",kind:"toggle",group:"게임",label:"터치 조작",description:"화면에 조이스틱·버튼을 띄우고 가까운 적을 자동으로 조준합니다. 휴대폰·태블릿은 기본 켜짐."},{key:"floatingJoystick",kind:"toggle",group:"게임",label:"조이스틱: 누르는 자리에",description:"켜면 버튼이 아닌 아무 곳이나 눌러 그 자리에서 끌면 움직입니다. 끄면 왼쪽 아래 고정 조이스틱."},{key:"leftHanded",kind:"toggle",group:"게임",label:"왼손 모드",description:"공격·점프·회피 버튼을 왼쪽에, 고정 조이스틱을 오른쪽에 둡니다."},{key:"touchButtonScale",kind:"range",group:"게임",label:"터치 버튼 크기",description:"버튼이 작거나 크면 조절하세요.",min:.8,max:1.4,step:.1,unit:"×"},{key:"haptics",kind:"toggle",group:"게임",label:"진동",description:"맞거나 처치할 때 짧게 진동합니다 (지원하는 휴대폰만, iPhone 은 안 됨)."},{key:"soundMaster",kind:"range",group:"소리",label:"전체 음량",description:"0 이면 무음. 소리는 첫 조작(터치·키) 뒤부터 납니다.",min:0,max:1,step:.1},{key:"soundSfx",kind:"range",group:"소리",label:"효과음",description:"공격·피격·획득·보스 소리.",min:0,max:1,step:.1},{key:"soundMusic",kind:"range",group:"소리",label:"음악",description:"던전·보스·메뉴 배경 음악.",min:0,max:1,step:.1},{key:"playerHpMul",kind:"range",group:"전투 수치",label:"내 최대 체력",description:"레벨·장비 보너스를 더한 최대 체력에 곱합니다.",min:.5,max:3,step:.1,unit:"×"},{key:"playerDamageMul",kind:"range",group:"전투 수치",label:"내 공격력",description:"근접·원거리 공격 피해에 곱합니다.",min:.5,max:3,step:.1,unit:"×"},{key:"enemyHpMul",kind:"range",group:"전투 수치",label:"적 체력",description:"난이도 배율에 다시 곱합니다. 다음 던전 입장부터 적용됩니다.",min:.5,max:3,step:.1,unit:"×"},{key:"showDamageNumbers",kind:"toggle",group:"화면",label:"피해 숫자 표시",description:"공격하거나 맞을 때 숫자를 띄웁니다."},{key:"hitFlash",kind:"toggle",group:"화면",label:"피격 시 화면 번쩍임",description:"맞았을 때 화면 테두리를 붉게 비춥니다."},{key:"shadows",kind:"toggle",group:"화면",label:"그림자",description:"느린 PC·휴대폰에서는 끄면 부드러워집니다."},{key:"resolution",kind:"range",group:"화면",label:"렌더 해상도",description:"1.0 이 기기 기본. 휴대폰에서 끊기면 0.6~0.8 로 낮추세요.",min:.5,max:1.5,step:.1,unit:"×"},{key:"showFps",kind:"toggle",group:"화면",label:"FPS 표시",description:"왼쪽 아래에 초당 프레임을 보여줍니다."}];function ei(){const s=Sx();return{difficulty:q.difficulty.default,playerHpMul:1,playerDamageMul:1,enemyHpMul:1,cameraDistance:1,touchControls:s,floatingJoystick:!0,leftHanded:!1,touchButtonScale:1,haptics:s,soundMaster:.8,soundSfx:1,soundMusic:.6,resolution:s?.8:1,showDamageNumbers:q.hud.showDamageNumbers,hitFlash:!0,shadows:s?!1:q.graphics.shadows,showFps:q.debug.showFps}}function Ta(s){return typeof s=="object"&&s!==null&&!Array.isArray(s)}function Ex(s,e){const t=Number.isFinite(e)?e:ei()[s.key],n=Math.round((t-s.min)/s.step)*s.step+s.min,i=Math.min(s.max,Math.max(s.min,n));return Math.round(i*1e3)/1e3}function vh(s){const e=ei(),t=[];if(!Ta(s))return{settings:e,warnings:s==null?[]:["설정 데이터가 객체가 아니라 기본값을 씁니다."]};const n={...e};for(const i of wa){const r=s[i.key];if(r!==void 0)if(i.kind==="choice")typeof r=="string"&&Ja(r)?n.difficulty=r:t.push(`난이도 값 '${String(r)}' 이(가) 잘못되어 기본값으로 바꿨습니다.`);else if(i.kind==="toggle")typeof r=="boolean"?n[i.key]=r:t.push(`'${i.label}' 값이 참/거짓이 아니라 기본값으로 바꿨습니다.`);else{const a=typeof r=="number"?Ex(i,r):NaN;Number.isNaN(a)?t.push(`'${i.label}' 값이 숫자가 아니라 기본값으로 바꿨습니다.`):(a!==r&&t.push(`'${i.label}' 값 ${String(r)} 을(를) 허용 범위 안의 ${a} 으로 보정했습니다.`),n[i.key]=a)}}return{settings:n,warnings:t}}const yh="hero-x.settings",wx=1;function Tx(s){if(!s)return{settings:ei(),warnings:[],found:!1};let e=null;try{e=s.getItem(yh)}catch{}if(!e)return{settings:ei(),warnings:[],found:!1};try{const t=JSON.parse(e),n=Ta(t)&&Ta(t.settings)?t.settings:t;return{...vh(n),found:!0}}catch{return{settings:ei(),warnings:["설정 데이터를 읽을 수 없어 기본값을 씁니다."],found:!0}}}function Vs(s,e){if(!s)return!1;try{return s.setItem(yh,JSON.stringify({version:wx,settings:e})),!0}catch(t){return Xe.warn("설정 저장에 실패했습니다.",t),!1}}class Ax{constructor(e,t){this.cb=t,this.confirming=!1,this.el=document.createElement("div"),this.el.className="guide settings",this.el.hidden=!0;const n=bx.map(r=>{const a=wa.filter(o=>o.group===r).map(o=>{let l="";return o.kind==="choice"?l=xh().map(c=>`<button type="button" class="diff-btn" data-key="difficulty" data-level="${c}">${Ii(c).label}</button>`).join(""):o.kind==="toggle"?l=`<button type="button" class="toggle" role="switch" data-key="${o.key}" aria-checked="false"><span class="toggle-knob"></span></button>`:l=`<input type="range" data-key="${o.key}" min="${o.min}" max="${o.max}" step="${o.step}" aria-label="${o.label}"><output data-out="${o.key}"></output>`,`<div class="set-row" data-row="${o.key}"><div class="set-text"><div class="set-label">${o.label}</div><div class="set-desc">${o.description}</div></div><div class="set-control">${l}</div></div>`}).join("");return`<section class="set-group"><h3 class="set-group-title">${r}</h3>${a}</section>`}).join("");this.el.innerHTML=`
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
      </div>`,e.appendChild(this.el),this.el.querySelector("#settings-close")?.addEventListener("click",()=>this.cb.onClose());const i=this.el.querySelector("#face-file");i.addEventListener("change",async()=>{const r=i.files?.[0];if(i.value="",!r)return;const a=this.el.querySelector("#face-status");a.textContent="사진을 처리하는 중…";try{await this.cb.face.pick(r),a.textContent=""}catch(o){a.textContent=o instanceof Error?o.message:String(o)}this.refresh()}),this.el.querySelector("#face-clear")?.addEventListener("click",()=>{this.cb.face.clear(),this.refresh()}),this.el.querySelector("#settings-reset")?.addEventListener("click",()=>this.setConfirm(!0)),this.el.querySelector("#settings-reset-no")?.addEventListener("click",()=>this.setConfirm(!1)),this.el.querySelector("#settings-reset-yes")?.addEventListener("click",()=>{this.setConfirm(!1),this.cb.resetAll(),this.refresh()}),this.el.querySelectorAll('input[type="range"]').forEach(r=>{r.addEventListener("input",()=>{this.cb.set(r.dataset.key,Number(r.value)),this.refresh()})}),this.el.querySelectorAll("button.toggle").forEach(r=>{r.addEventListener("click",()=>{const a=r.dataset.key;this.cb.set(a,!this.cb.get()[a]),this.refresh()})}),this.el.querySelectorAll(".diff-btn").forEach(r=>{r.addEventListener("click",()=>{this.cb.set("difficulty",r.dataset.level),this.refresh()})}),this.refresh()}get visible(){return!this.el.hidden}setConfirm(e){this.confirming=e,this.el.querySelector("#settings-confirm").hidden=!e}refresh(){const e=this.cb.get(),t=this.cb.face.get(),n=this.el.querySelector("#face-preview");n.hidden=!t,t&&(n.src=t),this.el.querySelector("#face-clear").disabled=!t;for(const i of wa)if(i.kind==="choice")this.el.querySelectorAll('.diff-btn[data-key="difficulty"]').forEach(r=>r.setAttribute("aria-pressed",String(r.dataset.level===e.difficulty)));else if(i.kind==="toggle")this.el.querySelector(`button.toggle[data-key="${i.key}"]`)?.setAttribute("aria-checked",String(e[i.key]));else{const r=this.el.querySelector(`input[data-key="${i.key}"]`),a=this.el.querySelector(`output[data-out="${i.key}"]`),o=e[i.key];r&&(r.value=String(o)),a&&(a.textContent=`${o.toFixed(1)}${i.unit??""}`)}}show(){this.setConfirm(!1),this.refresh(),this.el.hidden=!1}hide(){this.confirming=!1,this.el.hidden=!0}pressBack(){this.confirming?this.setConfirm(!1):this.cb.onClose()}}const js=2,hc={clears:0,deaths:0,totalKills:0,bestScore:0,dungeonClears:{}};function $s(s){return{...s,dungeonClears:{...s.dungeonClears}}}const Rx=["common","uncommon","rare","epic","legendary"];function Cx(s){return typeof s=="string"&&Rx.includes(s)}function In(s){return typeof s=="object"&&s!==null&&!Array.isArray(s)}function Cn(s,e,t,n){const i=typeof s=="number"&&Number.isFinite(s)?Math.floor(s):n;return Math.min(t,Math.max(e,i))}function uc(s){return{templateId:s.templateId,rarity:s.rarity}}function Lx(s){const e={};for(const t of oi){const n=s.equipment.equipped[t];e[t]=n?uc(n):null}return{version:js,savedAt:(s.now??new Date).toISOString(),gameVersion:q.meta.version,difficulty:s.difficulty,stats:{level:s.stats.level,xp:s.stats.xp,gold:s.stats.gold},equipment:{inventory:s.equipment.inventory.map(uc),equipped:e},records:$s(s.records)}}function dc(s,e,t){return!In(s)||typeof s.templateId!="string"||!Cx(s.rarity)?(e.push(`${t}: 장비 항목 형식이 잘못되어 버렸습니다.`),null):sr(s.templateId)?{templateId:s.templateId,rarity:s.rarity}:(e.push(`${t}: 알 수 없는 장비 '${s.templateId}' 를 버렸습니다.`),null)}function Px(s){if(!In(s))return{ok:!1,reason:"invalid",message:"저장 데이터가 객체가 아닙니다."};const e=typeof s.version=="number"?s.version:NaN;if(!Number.isInteger(e)||e<1)return{ok:!1,reason:"invalid",message:"저장 데이터에 버전이 없습니다."};if(e>js)return{ok:!1,reason:"newer",message:`저장 데이터 버전(${e})이 이 게임이 아는 버전(${js})보다 새롭습니다.`};const t=Ix(s,e),n=[];if(!In(t.stats)||!In(t.equipment))return{ok:!1,reason:"invalid",message:"stats 또는 equipment 항목이 없습니다."};const i=q.progression,r=Cn(t.stats.level,1,i.maxLevel,1),a=Math.round(i.xpBase*Math.pow(i.xpGrowth,r-1)),o={level:r,xp:Cn(t.stats.xp,0,a,0),gold:Cn(t.stats.gold,0,999999999,0)};(o.level!==t.stats.level||o.xp!==t.stats.xp||o.gold!==t.stats.gold)&&n.push("성장 수치가 범위를 벗어나 보정했습니다.");const l=typeof t.difficulty=="string"&&Ja(t.difficulty)?t.difficulty:q.difficulty.default;l!==t.difficulty&&n.push("난이도 값이 잘못되어 기본 난이도로 바꿨습니다.");const c=t.equipment,h=[],u=Array.isArray(c.inventory)?c.inventory:[];Array.isArray(c.inventory)||n.push("가방 목록이 없어 비웠습니다."),u.forEach((x,v)=>{const R=dc(x,n,`가방 ${v+1}번`);R&&h.push(R)});const d={},f=In(c.equipped)?c.equipped:{};for(const x of oi){const v=f[x];if(v==null){d[x]=null;continue}const R=dc(v,n,`슬롯 ${x}`);R&&!mh(sr(R.templateId).category).includes(x)?(n.push(`슬롯 ${x}: 맞지 않는 장비라 가방으로 옮겼습니다.`),h.push(R),d[x]=null):d[x]=R}const g=q.equipment.inventorySize;h.length>g&&(n.push(`가방이 ${g}칸을 넘어 뒤쪽 ${h.length-g}개를 버렸습니다.`),h.length=g);const _=In(t.records)?t.records:{},m={},p=In(_.dungeonClears)?_.dungeonClears:{};for(const[x,v]of Object.entries(p)){if(!Qt.some(R=>R.id===x)){n.push(`알 수 없는 던전 '${x}' 의 클리어 기록을 버렸습니다.`);continue}m[x]=Cn(v,0,1e9,0)}const M={clears:Cn(_.clears,0,1e9,0),deaths:Cn(_.deaths,0,1e9,0),totalKills:Cn(_.totalKills,0,1e9,0),bestScore:Cn(_.bestScore,0,1e12,0),dungeonClears:m};return{ok:!0,warnings:n,data:{version:js,savedAt:typeof t.savedAt=="string"&&!Number.isNaN(Date.parse(t.savedAt))?t.savedAt:new Date(0).toISOString(),gameVersion:typeof t.gameVersion=="string"?t.gameVersion:"?",difficulty:l,stats:o,equipment:{inventory:h,equipped:d},records:M}}}function Ix(s,e){const t={...s};if(e<2){const n=In(t.records)?{...t.records}:{},i=typeof n.clears=="number"?n.clears:0;n.dungeonClears=i>0?{[Qt[0].id]:i}:{},t.records=n}return t}function Dx(s,e){e.stats.reset(),e.stats.level=s.stats.level,e.stats.xp=s.stats.xp,e.stats.gold=s.stats.gold,e.equipment.reset();for(const t of s.equipment.inventory){const n=sr(t.templateId);n&&e.equipment.add(ir(n,t.rarity))}for(const t of oi){const n=s.equipment.equipped[t],i=n?sr(n.templateId):void 0;n&&i&&(e.equipment.equipped[t]=ir(i,n.rarity))}}function fc(s){const e=s.stats,t=s.equipment;return e.level>1||e.xp>0||e.gold>0||t.inventory.length>0||oi.some(n=>t.equipped[n]!==null)||s.records.clears>0||s.records.deaths>0}const pr="hero-x.save",pc="hero-x.save.corrupt";function Nx(){try{const s=globalThis.localStorage,e="__hero-x-probe__";return s.setItem(e,"1"),s.removeItem(e),s}catch{return null}}function Ux(s){if(!s)return{kind:"unavailable"};let e;try{e=s.getItem(pr)}catch{return{kind:"unavailable"}}if(e===null||e==="")return{kind:"none"};let t;try{t=JSON.parse(e)}catch{return mc(s,e),{kind:"corrupt",message:"저장 데이터를 읽을 수 없어(JSON 손상) 따로 보관하고 새로 시작합니다."}}const n=Px(t);return n.ok?{kind:"loaded",data:n.data,warnings:n.warnings}:n.reason==="newer"?{kind:"newer",message:n.message}:(mc(s,e),{kind:"corrupt",message:`저장 데이터가 손상되어 따로 보관하고 새로 시작합니다. (${n.message})`})}function mc(s,e){try{s.setItem(pc,e),s.removeItem(pr),Xe.warn(`손상된 저장 데이터를 '${pc}' 에 보관했습니다.`)}catch{}}function Fx(s,e){if(!s)return!1;try{return s.setItem(pr,JSON.stringify(e)),!0}catch(t){return Xe.warn("저장에 실패했습니다.",t),!1}}function Ox(s){if(s)try{s.removeItem(pr)}catch{}}function Ws(s){if(typeof navigator>"u"||typeof navigator.vibrate!="function")return!1;try{return navigator.vibrate(s)}catch{return!1}}const kx={melee:[{wave:"noise",freq:0,duration:.09,gain:.35,filter:2600},{wave:"triangle",freq:320,freqEnd:140,duration:.1,gain:.25}],ranged:[{wave:"square",freq:880,freqEnd:220,duration:.12,gain:.18}],enemyHit:[{wave:"square",freq:200,freqEnd:90,duration:.07,gain:.22}],kill:[{wave:"noise",freq:0,duration:.18,gain:.3,filter:1600},{wave:"sawtooth",freq:160,freqEnd:40,duration:.22,gain:.25}],hurt:[{wave:"sawtooth",freq:140,freqEnd:60,duration:.18,gain:.35},{wave:"noise",freq:0,duration:.1,gain:.2,filter:900}],pickup:[{wave:"sine",freq:880,duration:.07,gain:.2},{wave:"sine",freq:1320,duration:.1,gain:.2,delay:.06}],equip:[{wave:"triangle",freq:523,duration:.09,gain:.22},{wave:"triangle",freq:659,duration:.09,gain:.22,delay:.08},{wave:"triangle",freq:784,duration:.16,gain:.22,delay:.16}],heal:[{wave:"sine",freq:440,freqEnd:880,duration:.25,gain:.2}],levelup:[{wave:"square",freq:523,duration:.1,gain:.18},{wave:"square",freq:659,duration:.1,gain:.18,delay:.1},{wave:"square",freq:784,duration:.1,gain:.18,delay:.2},{wave:"square",freq:1046,duration:.35,gain:.2,delay:.3}],chest:[{wave:"noise",freq:0,duration:.2,gain:.15,filter:600},{wave:"sine",freq:1046,duration:.12,gain:.18,delay:.15},{wave:"sine",freq:1568,duration:.2,gain:.18,delay:.25}],jump:[{wave:"sine",freq:300,freqEnd:600,duration:.14,gain:.18}],dash:[{wave:"noise",freq:0,duration:.16,gain:.25,filter:3200}],bossAppear:[{wave:"sawtooth",freq:55,freqEnd:40,duration:1.2,gain:.35},{wave:"noise",freq:0,duration:.6,gain:.2,filter:400},{wave:"square",freq:110,duration:.3,gain:.2,delay:.5}],slam:[{wave:"sine",freq:90,freqEnd:30,duration:.35,gain:.45},{wave:"noise",freq:0,duration:.25,gain:.3,filter:700}],boom:[{wave:"noise",freq:0,duration:.35,gain:.35,filter:1200},{wave:"sine",freq:120,freqEnd:35,duration:.3,gain:.35}],summon:[{wave:"sine",freq:660,freqEnd:1320,duration:.3,gain:.2},{wave:"triangle",freq:330,freqEnd:660,duration:.3,gain:.15,delay:.1}],clear:[{wave:"square",freq:523,duration:.12,gain:.2},{wave:"square",freq:659,duration:.12,gain:.2,delay:.12},{wave:"square",freq:784,duration:.12,gain:.2,delay:.24},{wave:"square",freq:1046,duration:.5,gain:.22,delay:.36},{wave:"triangle",freq:261,duration:.9,gain:.15,delay:.36}],defeat:[{wave:"sawtooth",freq:392,freqEnd:196,duration:.5,gain:.2},{wave:"sawtooth",freq:294,freqEnd:110,duration:.8,gain:.2,delay:.4}],ui:[{wave:"sine",freq:700,duration:.05,gain:.12}]},Bx={menu:{bpm:84,root:130.81,bass:[0,null,7,null,5,null,7,null],melody:[12,16,19,16,12,null,14,null,17,14,12,null,11,null,12,null],bassWave:"triangle",melodyWave:"sine",melodyGain:.6},forest:{bpm:112,root:130.81,bass:[0,0,5,5,7,7,5,5],melody:[12,14,16,12,19,null,16,null,17,16,14,12,14,null,12,null],bassWave:"triangle",melodyWave:"square",melodyGain:.45},cave:{bpm:92,root:110,bass:[0,null,3,null,5,null,3,null],melody:[12,null,15,null,17,15,12,null,10,null,12,null,15,null,12,null],bassWave:"sine",melodyWave:"triangle",melodyGain:.55},fortress:{bpm:132,root:98,bass:[0,0,0,3,0,0,0,5],melody:[12,12,15,12,17,15,12,null,10,10,12,10,8,null,7,null],bassWave:"sawtooth",melodyWave:"square",melodyGain:.4},boss:{bpm:150,root:98,bass:[0,0,3,3,0,0,6,5],melody:[12,null,12,15,12,null,18,17,12,null,12,15,19,null,17,15],bassWave:"sawtooth",melodyWave:"sawtooth",melodyGain:.35}};function gc(s,e){return s*Math.pow(2,e/12)}class zx{constructor(){this.ctx=null,this.noiseBuffer=null,this.volumes={master:.8,sfx:1,music:.6},this.lastPlayed=new Map,this.unlocked=!1,this.cleanup=[],this.track=null,this.pendingTrack=null,this.nextNoteTime=0,this.step=0,this.schedulerId=0,this.trackGain=null}attach(e=window){const t=()=>{if(this.ensureContext(),this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume(),this.ctx&&(this.unlocked=!0),this.pendingTrack){const i=this.pendingTrack;this.pendingTrack=null,this.playMusic(i)}};for(const i of["pointerdown","keydown","touchend"])e.addEventListener(i,t,{passive:!0}),this.cleanup.push(()=>e.removeEventListener(i,t));const n=()=>{this.ctx&&(document.hidden?this.ctx.suspend():this.ctx.resume())};document.addEventListener("visibilitychange",n),this.cleanup.push(()=>document.removeEventListener("visibilitychange",n))}get ready(){return this.unlocked&&this.ctx!==null}get currentTrack(){return this.track??this.pendingTrack}ensureContext(){if(!this.ctx)try{const e=window.AudioContext??window.webkitAudioContext;if(!e)return;this.ctx=new e,this.master=this.ctx.createGain(),this.sfxGain=this.ctx.createGain(),this.musicGain=this.ctx.createGain(),this.sfxGain.connect(this.master),this.musicGain.connect(this.master),this.master.connect(this.ctx.destination),this.applyVolumes();const t=this.ctx.sampleRate;this.noiseBuffer=this.ctx.createBuffer(1,t,this.ctx.sampleRate);const n=this.noiseBuffer.getChannelData(0);for(let i=0;i<t;i++)n[i]=Math.random()*2-1}catch(e){Xe.warn("소리를 켤 수 없습니다 (Web Audio 미지원). 게임은 계속 진행됩니다.",e),this.ctx=null}}setVolumes(e){this.volumes={...this.volumes,...e},this.applyVolumes()}applyVolumes(){if(!this.ctx)return;const e=t=>Math.min(1,Math.max(0,t));this.master.gain.value=e(this.volumes.master),this.sfxGain.gain.value=e(this.volumes.sfx),this.musicGain.gain.value=e(this.volumes.music)}play(e,t=.03){if(!this.ctx||!this.unlocked||this.volumes.master<=0||this.volumes.sfx<=0)return;const n=this.ctx.currentTime,i=this.lastPlayed.get(e)??-1;if(!(n-i<t)){this.lastPlayed.set(e,n);for(const r of kx[e]){const a=n+(r.delay??0),o=this.ctx.createGain();if(o.gain.setValueAtTime(1e-4,a),o.gain.linearRampToValueAtTime(r.gain,a+.008),o.gain.exponentialRampToValueAtTime(1e-4,a+r.duration),o.connect(this.sfxGain),r.wave==="noise"){if(!this.noiseBuffer)continue;const l=this.ctx.createBufferSource();l.buffer=this.noiseBuffer,l.loop=!0;const c=this.ctx.createBiquadFilter();c.type="lowpass",c.frequency.value=r.filter??2e3,l.connect(c),c.connect(o),l.start(a),l.stop(a+r.duration+.02)}else{const l=this.ctx.createOscillator();l.type=r.wave,l.frequency.setValueAtTime(r.freq,a),r.freqEnd!==void 0&&l.frequency.exponentialRampToValueAtTime(Math.max(1,r.freqEnd),a+r.duration),l.connect(o),l.start(a),l.stop(a+r.duration+.02)}}}}playMusic(e){if(!this.ctx||!this.unlocked){this.pendingTrack=e;return}e!==this.track&&(this.stopMusic(),e&&(this.track=e,this.trackGain=this.ctx.createGain(),this.trackGain.gain.setValueAtTime(1e-4,this.ctx.currentTime),this.trackGain.gain.exponentialRampToValueAtTime(1,this.ctx.currentTime+.6),this.trackGain.connect(this.musicGain),this.step=0,this.nextNoteTime=this.ctx.currentTime+.05,this.schedule()))}stopMusic(){if(this.schedulerId&&(clearTimeout(this.schedulerId),this.schedulerId=0),this.trackGain&&this.ctx){const e=this.trackGain;e.gain.cancelScheduledValues(this.ctx.currentTime),e.gain.setValueAtTime(e.gain.value,this.ctx.currentTime),e.gain.exponentialRampToValueAtTime(1e-4,this.ctx.currentTime+.4),setTimeout(()=>e.disconnect(),500)}this.trackGain=null,this.track=null,this.pendingTrack=null}schedule(){if(!this.ctx||!this.track||!this.trackGain)return;const e=Bx[this.track],t=60/e.bpm,n=t/2,i=.25;for(;this.nextNoteTime<this.ctx.currentTime+i;){const r=this.step;if(r%2===0){const o=e.bass[r/2%e.bass.length];o!==null&&this.note(e.bassWave,gc(e.root,o),this.nextNoteTime,t*.9,.22)}const a=e.melody[r%e.melody.length];a!==null&&this.note(e.melodyWave,gc(e.root,a),this.nextNoteTime,n*.8,.14*e.melodyGain),this.nextNoteTime+=n,this.step++}this.schedulerId=window.setTimeout(()=>this.schedule(),100)}note(e,t,n,i,r){if(!this.ctx||!this.trackGain)return;const a=this.ctx.createOscillator(),o=this.ctx.createGain();a.type=e,a.frequency.value=t,o.gain.setValueAtTime(1e-4,n),o.gain.linearRampToValueAtTime(r,n+.01),o.gain.exponentialRampToValueAtTime(1e-4,n+i),a.connect(o),o.connect(this.trackGain),a.start(n),a.stop(n+i+.02)}dispose(){this.stopMusic(),this.cleanup.forEach(e=>e()),this.cleanup=[],this.ctx?.close(),this.ctx=null}}class Hx{constructor(e){this.camera=e,this.desired=new C,this.lookTarget=new C,this.first=!0,this.distanceScale=1}update(e,t){const n=q.camera,i=this.distanceScale;if(this.desired.set(t.x+n.offset.x*i,t.y+n.offset.y*i,t.z+n.offset.z*i),this.first)this.camera.position.copy(this.desired),this.first=!1;else{const r=1-Math.exp(-n.smoothing*e);this.camera.position.lerp(this.desired,r)}this.lookTarget.set(t.x,t.y+n.lookAtHeight,t.z),this.camera.lookAt(this.lookTarget)}getYaw(){const e=q.camera.offset;return Math.atan2(e.x,e.z)}}class Gx{constructor(e,t){this.canvas=e,this.scene=new Yg,this.input=new Z_,this.dungeonDef=Qt[0],this.bossCfg=$l(Qt[0]),this.unlockedNow=null,this.face=px(),this.playerUsesGltf=!1,this.audio=new zx,this.mortars=[],this.settings=ei(),this.mode="menu",this.runActive=!1,this.stats=new lx,this.equipment=new Q_,this.paused=!1,this.boss=null,this.bossDefeated=!1,this.difficulty=_x(),this.storage=Nx(),this.records={...hc},this.hasSavedProgress=!1,this.saveBlocked=!1,this.saveDirty=!1,this.saveTimer=0,this.lastSavedAt=null,this.saveStatus="",this.projTmp=new C,this.raycaster=new k0,this.groundPlane=new Ln(new C(0,1,0),0),this.aimHit=new C,this.camTarget=new C,this.running=!1,this.ended=!1,this.rafId=0,this.lastTime=0,this.frames=0,this.fpsFrames=0,this.fpsTime=0,this.flushSave=()=>{this.saveDirty&&this.saveNow()},this.onVisibility=()=>{document.visibilityState==="hidden"&&this.flushSave()},this.currentPrompt="",this.loop=a=>{if(!this.running)return;this.rafId=requestAnimationFrame(this.loop);const o=Math.min(.05,(a-this.lastTime)/1e3);if(this.lastTime=a,this.paused||this.mode==="menu"){this.renderer.render(this.scene,this.camera);return}const l=this.player.position;this.controller.update(o),this.ended||this.combat.update(o),this.spawner.update(o,{playerPos:{x:l.x,z:l.z},world:this.dungeon,onAttackPlayer:(u,d)=>this.onEnemyAttack(u,d),onBossAttack:(u,d)=>this.onBossAttack(u,d),playerRadius:q.player.radius}),this.projectiles.update(o,{world:this.dungeon,enemies:this.spawner.getEnemies(),playerPos:{x:l.x,z:l.z},playerY:this.player.jumpY,playerRadius:q.player.radius,onHitEnemy:(u,d,f)=>{this.ended||this.combat.damageEnemy(u,d.damage,f,d.knockback)},onHitPlayer:(u,d,f)=>this.damagePlayer(u.damage,f)}),this.loot.update(o,{x:l.x,z:l.z},(u,d)=>this.onCollect(u,d)),this.updateMortars(o),this.chests.update(o);const c=!this.ended&&this.chests.nearest({x:l.x,z:l.z})!==null;this.currentPrompt=c?`${q.controls.interact[0].replace("Key","")} 보물 상자 열기`:"",this.hud.setPrompt(this.currentPrompt),this.touch.setInteract(c),this.touch.setDodgeCooldown(this.controller.dashCooldownRatio);const h=this.settings.touchControls&&!this.ended?this.nearestEnemyPoint(q.combat.autoAimRange):null;this.aimRing.visible=h!==null,h&&this.aimRing.position.set(h.x,.06,h.z),this.hud.setChests(this.chests.openedCount,this.chests.total),this.player.update(o),this.effects.update(o),this.damageNumbers.update(o),this.camTarget.set(l.x,0,l.z),this.cameraCtrl.update(o,this.camTarget),this.dungeon.updateLight(l),this.checkVictory(),this.saveTimer+=o,this.saveDirty&&this.saveTimer>=q.save.autoSaveInterval&&this.saveNow(),this.hud.update({hp:this.player.health.hp,maxHp:this.player.health.maxHp,enemies:this.spawner.aliveCount,kills:this.combat.kills,score:this.combat.score,level:this.stats.level,xp:this.stats.xp,xpToNext:this.stats.xpToNext,gold:this.stats.gold}),this.renderer.render(this.scene,this.camera),this.frames++,this.updateFps(o)},this.resize=()=>{const a=this.canvas.clientWidth||window.innerWidth,o=this.canvas.clientHeight||window.innerHeight;this.renderer.setSize(a,o,!1),this.camera.aspect=a/o,this.camera.updateProjectionMatrix()};for(const a of H0(q))Xe.warn(`설정 '${a.path}' 값 ${a.from} 은(는) 허용 범위를 벗어나 ${a.to} 로 보정했습니다.`);this.loadSettingsFromStorage();const n=q.graphics;this.renderer=new Zc({canvas:e,antialias:n.antialias,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,n.maxPixelRatio)),this.renderer.shadowMap.enabled=n.shadows,this.renderer.shadowMap.type=vc,this.renderer.outputColorSpace=rt;const i=q.camera;this.camera=new Dt(i.fov,1,i.near,i.far),this.dungeon=new jl(this.scene,this.dungeonDef),this.chests=new Xl(this.scene,this.dungeonDef.chests),this.dungeon.addCollisionBoxes(this.chests.getCollisionBoxes());const r={getObstacleBoxes:()=>this.dungeon.getObstacleBoxes(),getArenaHalfSize:()=>this.dungeon.getArenaHalfSize()};this.player=new cx(ux(q.player.colors),q.player.startPosition),this.scene.add(this.player.object3d),this.cameraCtrl=new Hx(this.camera),this.controller=new hx(this.player,this.input,r,()=>this.cameraCtrl.getYaw(),()=>1+this.equipment.totals().moveSpeed),this.controller.onJump=()=>this.audio.play("jump"),this.controller.onDash=a=>{this.audio.play("dash");const o=this.player.position;this.effects.burst(new C(o.x-a.x*.5,.4,o.z-a.z*.5),6091480,10,4),this.settings.haptics&&Ws(10)},this.aimRing=new xe(new Jn(.55,.72,32),new ft({color:6091480,transparent:!0,opacity:.8,side:Ot,depthWrite:!1})),this.aimRing.rotation.x=-Math.PI/2,this.aimRing.position.y=.06,this.aimRing.visible=!1,this.scene.add(this.aimRing),this.effects=new K0(this.scene),this.projectiles=new J0(this.scene),this.spawner=new K_(this.scene),this.applyDifficultyToSpawner(),this.spawner.spawnFromConfig(this.dungeonDef.spawns),this.combat=new Y0(this.player,this.input,()=>this.spawner.getEnemies(),()=>this.getAimPoint(),this.effects,this.projectiles,(a,o,l)=>{this.audio.play(l?"kill":"enemyHit",.05),l&&(this.loot.dropFor(a.def.score,{x:a.position.x,z:a.position.z},this.dungeonDef.rewardMul),this.settings.haptics&&Ws(a.type==="boss"?[60,40,120]:18)),this.settings.showDamageNumbers&&(this.projTmp.set(a.position.x,1.6,a.position.z),this.damageNumbers.show(this.projTmp,l?a.def.score:o,l?"kill":"enemy"))},()=>this.effectiveDamageMultiplier(),a=>this.equipment.weaponAttack(a)),this.combat.onAttack=a=>this.audio.play(a),this.loot=new ax(this.scene),this.damageNumbers=new vx(t,a=>this.projectToScreen(a)),this.guide=new gx(t,()=>this.guide.hide()),this.touch=new J_(t,this.input,()=>{this.mode==="play"&&this.openMenu()},()=>{this.mode==="play"&&this.toggleInventory()}),this.hud=new yx(t),this.hud.setDungeonName(this.dungeonDef.name),this.result=new Mx(t,()=>this.retry(),()=>this.openMenu(),()=>this.openDungeons()),this.dungeonSelect=new t_(t,{clears:()=>this.records.dungeonClears,level:()=>this.stats.level,enter:a=>this.enterDungeon(a),onClose:()=>this.closeDungeons()}),this.loadFromStorage(),this.menu=new xx(t,{newGame:()=>this.newGame(),continueGame:()=>this.continueGame(),openSettings:()=>this.openSettings(),openDungeons:()=>this.openDungeons(),hasProgress:()=>this.runActive||this.hasSavedProgress,progressText:()=>this.progressText(),saveNote:()=>this.saveStatus,openInventory:()=>this.toggleInventory(!0),openGuide:()=>this.guide.show(),hasRun:()=>this.runActive,difficulty:{get:()=>this.difficulty,set:a=>this.setDifficulty(a)}}),this.settingsUI=new Ax(t,{get:()=>this.settings,set:(a,o)=>this.updateSetting(a,o),resetAll:()=>this.resetSettings(),onClose:()=>this.closeSettings(),face:{get:()=>this.face,pick:async a=>{const o=await fx(a);this.face=o,oc(o)||Xe.warn("얼굴 사진을 브라우저에 저장하지 못했습니다 (용량 또는 저장소 제한). 이번 실행에서만 보입니다."),await this.applyFace(),Xe.info("얼굴 사진을 적용했습니다.")},clear:()=>{this.face=null,oc(null),this.applyFace()}}}),this.inventoryUI=new ox(t,this.equipment,{onChange:()=>{this.applyStats(),this.markDirty()},onClose:()=>this.toggleInventory(!1),getSummary:()=>this.statSummary()}),this.applyDifficulty(),this.applySettings(),this.input.attach(window,e),this.audio.attach(window),t.addEventListener("click",a=>{a.target.closest("button")&&this.audio.play("ui")}),this.audio.playMusic("menu"),this.input.onPress(q.controls.toggleGuide,()=>this.guide.toggle()),this.input.onPress(q.controls.restart,()=>{this.mode==="result"&&this.retry()}),this.input.onPress(q.controls.toggleInventory,()=>{this.mode!=="menu"&&this.toggleInventory()}),this.input.onPress(q.controls.interact,()=>this.tryInteract()),this.input.onPress(["Escape"],()=>{this.guide.visible?this.guide.hide():this.settingsUI.visible?this.settingsUI.pressBack():this.dungeonSelect.visible?this.closeDungeons():this.inventoryUI.visible?this.toggleInventory(!1):this.mode==="play"&&this.openMenu()}),this.input.onPress(["Enter"],()=>{this.mode==="menu"&&!this.inventoryUI.visible&&!this.guide.visible&&!this.settingsUI.visible&&!this.dungeonSelect.visible&&this.menu.pressPrimary()}),this.hud.hide(),this.menu.show(),this.applyFace(),Pi.onPlayerReady=()=>this.swapPlayerModel(),Pi.load("./"),window.addEventListener("resize",this.resize),window.addEventListener("beforeunload",this.flushSave),document.addEventListener("visibilitychange",this.onVisibility),this.resize(),Xe.info(`${q.meta.title} v${q.meta.version} 준비 완료 (적 ${this.spawner.aliveCount}마리)`)}start(){this.running||(this.running=!0,this.lastTime=performance.now(),this.rafId=requestAnimationFrame(this.loop))}stop(){this.running=!1,cancelAnimationFrame(this.rafId)}setDifficulty(e){e!==this.difficulty&&(this.difficulty=e,this.settings.difficulty=e,Vs(this.storage,this.settings),this.settingsUI?.refresh(),this.markDirty(),cc(e),this.applyDifficulty(),this.restart(),Xe.info(`난이도: ${Ii(e).label}`))}getDifficulty(){return this.difficulty}applyDifficultyToSpawner(){const e=Ii(this.difficulty);this.spawner.multipliers={hp:e.enemyHp*this.settings.enemyHpMul,speed:e.enemySpeed}}loadSettingsFromStorage(){const e=Tx(this.storage);this.settings=e.settings;for(const t of e.warnings)Xe.warn(`설정 보정: ${t}`);e.found||(this.settings.difficulty=this.difficulty),this.difficulty=this.settings.difficulty}updateSetting(e,t){const n=vh({...this.settings,[e]:t}).settings;if(e==="difficulty"){this.settings=n,Vs(this.storage,this.settings),this.setDifficulty(n.difficulty);return}this.settings=n,Vs(this.storage,this.settings),this.applySettings()}resetSettings(){const e=this.settings.difficulty;this.settings=ei(),Vs(this.storage,this.settings),this.applySettings(),e!==this.settings.difficulty&&this.setDifficulty(this.settings.difficulty),Xe.info("설정을 기본값으로 되돌렸습니다.")}applySettings(){const e=this.settings;this.cameraCtrl.distanceScale=e.cameraDistance,this.renderer.shadowMap.enabled!==e.shadows&&(this.renderer.shadowMap.enabled=e.shadows,this.scene.traverse(t=>{const n=t;if(!n.isMesh)return;const i=Array.isArray(n.material)?n.material:[n.material];for(const r of i)r.needsUpdate=!0})),this.dungeon.setShadows(e.shadows),e.showFps||this.guide.setHudText(""),this.applyPixelRatio(),this.audio.setVolumes({master:e.soundMaster,sfx:e.soundSfx,music:e.soundMusic}),this.touch.isFloating!==e.floatingJoystick&&this.touch.setFloating(e.floatingJoystick),this.touch.setLeftHanded(e.leftHanded),this.touch.setButtonScale(e.touchButtonScale),this.updateTouchVisibility(),this.applyDifficultyToSpawner(),this.applyStats()}applyPixelRatio(){const e=Math.min(window.devicePixelRatio||1,q.graphics.maxPixelRatio);this.renderer.setPixelRatio(Math.max(.3,e*this.settings.resolution))}getSettings(){return{...this.settings}}openSettings(){this.inventoryUI.hide(),this.guide.hide(),this.settingsUI.show()}closeSettings(){this.settingsUI.hide(),this.mode==="menu"&&this.menu.refresh()}applyDifficulty(){this.applyDifficultyToSpawner(),this.menu?.refresh()}newGame(){this.stats.reset(),this.equipment.reset(),this.records=$s(hc),this.saveBlocked=!1,Ox(this.storage),this.enterDungeon(Qt[0]),Xe.info("새 게임을 시작합니다.")}enterDungeon(e){if(!ya(e,this.records.dungeonClears)){Xe.warn(`던전 '${e.name}' 은(는) 아직 잠겨 있습니다.`);return}this.loadDungeon(e),this.restart(),this.runActive=!0,this.saveNow(),this.dungeonSelect.hide(),this.enterPlay(),this.hud.showBanner(e.name,1800)}loadDungeon(e){e.id===this.dungeonDef.id&&this.dungeon.def.id===e.id||(this.chests.dispose(),this.dungeon.dispose(),this.dungeonDef=e,this.bossCfg=$l(e),this.dungeon=new jl(this.scene,e),this.chests=new Xl(this.scene,e.chests),this.dungeon.addCollisionBoxes(this.chests.getCollisionBoxes()),this.hud.setDungeonName(e.name),Xe.info(`던전 '${e.name}' 을(를) 불러왔습니다 (적 ${e.spawns.length}마리, 상자 ${e.chests.length}개).`))}openDungeons(){!this.runActive&&!this.hasSavedProgress||(this.inventoryUI.hide(),this.settingsUI.hide(),this.guide.hide(),this.mode==="result"&&(this.result.hide(),this.mode="menu",this.hud.hide(),this.menu.show()),this.dungeonSelect.show())}closeDungeons(){this.dungeonSelect.hide(),this.mode==="menu"&&this.menu.refresh()}getDungeonId(){return this.dungeonDef.id}continueGame(){if(!this.runActive){this.hasSavedProgress&&this.openDungeons();return}this.enterPlay()}retry(){this.restart(),this.runActive=!0,this.enterPlay()}openMenu(){this.mode="menu",this.inventoryUI.hide(),this.paused=!1,this.result.hide(),this.hud.hide(),this.touch.hide(),this.saveNow(),this.menu.show(),this.audio.playMusic("menu")}dungeonMusic(){const e=this.dungeonDef.id;return e==="cave"||e==="fortress"||e==="forest"?e:"forest"}async applyFace(){const e=this.player.currentModel;if(e.setFace){if(!this.face){e.setFace(null);return}try{e.setFace(await mx(this.face))}catch(t){Xe.warn("얼굴 사진을 붙이지 못했습니다.",t)}}}swapPlayerModel(){const e=Pi.createPlayerModel();e&&(this.player.setModel(e),this.playerUsesGltf=!0,Xe.info("플레이어 정식 모델로 교체했습니다."))}getFace(){return this.face}updateTouchVisibility(){const e=this.settings.touchControls&&this.mode==="play";e?this.touch.show():this.touch.hide(),document.body.classList.toggle("touch-mode",e)}loadFromStorage(){const e=Ux(this.storage);switch(e.kind){case"loaded":if(Dx(e.data,{stats:this.stats,equipment:this.equipment}),this.records=$s(e.data.records),this.difficulty=e.data.difficulty,cc(this.difficulty),this.hasSavedProgress=fc(e.data),this.lastSavedAt=e.data.savedAt,this.saveStatus=`마지막 저장: ${_c(e.data.savedAt)}`,e.warnings.length>0){this.saveStatus+=" · 일부 항목을 보정했습니다 (F12 콘솔 참고)";for(const t of e.warnings)Xe.warn(`저장 데이터 보정: ${t}`)}Xe.info(`저장 데이터를 불러왔습니다. 레벨 ${this.stats.level} · 골드 ${this.stats.gold}`);break;case"corrupt":this.saveStatus="저장 데이터가 손상되어 새로 시작합니다. 손상된 데이터는 따로 보관했습니다.",Xe.warn(e.message);break;case"newer":this.saveBlocked=!0,this.saveStatus="이 저장 데이터는 더 새로운 버전의 게임에서 만든 것이라 읽지 않습니다. 새 게임을 누르면 덮어씁니다.",Xe.warn(e.message);break;case"unavailable":this.saveStatus="이 브라우저에서는 저장이 되지 않습니다 (사생활 보호 모드 등).",Xe.warn("브라우저 저장소를 쓸 수 없어 진행이 저장되지 않습니다.");break;default:this.saveStatus="저장된 진행이 없습니다."}}markDirty(){this.saveDirty=!0}saveNow(){if(this.saveDirty=!1,this.saveTimer=0,this.saveBlocked)return!1;const e=Lx({stats:this.stats,equipment:this.equipment,difficulty:this.difficulty,records:this.records}),t=Fx(this.storage,e);return t&&(this.hasSavedProgress=fc(e),this.lastSavedAt=e.savedAt,this.saveStatus=`마지막 저장: ${_c(e.savedAt)}`,this.menu?.visible&&this.menu.refresh()),t}progressText(){if(!this.runActive&&!this.hasSavedProgress)return"";const e=this.records,t=Qt.filter(i=>ya(i,e.dungeonClears)).length,n=[`레벨 ${this.stats.level}`,`골드 ${this.stats.gold}`,`클리어 ${e.clears}회`,`열린 던전 ${t}/${Qt.length}`];return e.bestScore>0&&n.push(`최고 점수 ${e.bestScore}`),this.runActive||n.push("이어하기는 던전 선택부터"),n.join(" · ")}getRecords(){return $s(this.records)}enterPlay(){this.mode="play",this.menu.hide(),this.guide.hide(),this.settingsUI.hide(),this.dungeonSelect.hide(),this.result.hide(),this.hud.show(),this.updateTouchVisibility(),this.audio.playMusic(this.boss&&this.boss.alive?"boss":this.dungeonMusic()),this.lastTime=performance.now(),this.canvas.focus()}tryInteract(){if(this.ended||this.paused||this.player.health.isDead)return;const e=this.player.position,t=this.chests.nearest({x:e.x,z:e.z});if(!t||!this.chests.open(t))return;const n=this.loot.dropChest({x:t.x,z:t.z});this.audio.play("chest"),this.settings.haptics&&Ws(25),this.effects.burst(new C(t.x,1,t.z),16765503,16,5),this.damageNumbers.showText(new C(t.x,1.8,t.z),"보물 상자!","#ffd23f"),Xe.info(`보물 상자 개봉: ${n.map(i=>i.kind==="equip"?i.item?.name:`${i.kind} ${i.amount}`).join(", ")}`)}toggleInventory(e=!this.inventoryUI.visible){e?(this.inventoryUI.show(),this.paused=!0):(this.inventoryUI.hide(),this.paused=!1,this.lastTime=performance.now()),this.mode==="menu"&&this.menu.refresh()}applyStats(){const e=this.player.health;e.maxHp=this.effectiveMaxHp(),e.hp>e.maxHp&&(e.hp=e.maxHp)}effectiveMaxHp(){return Math.max(1,Math.round((this.stats.maxHp+this.equipment.totals().maxHp)*this.settings.playerHpMul))}effectiveDamageMultiplier(){return this.stats.damageMultiplier*this.settings.playerDamageMul}statSummary(){const e=this.equipment.totals(),t=Math.round((q.combat.melee.damage+this.equipment.weaponAttack("melee"))*this.effectiveDamageMultiplier()),n=Math.round((q.combat.ranged.damage+this.equipment.weaponAttack("ranged"))*this.effectiveDamageMultiplier()),i=Math.round((1+e.moveSpeed)*100);return`레벨 ${this.stats.level} · 골드 ${this.stats.gold} · 근접 ${t} · 원거리 ${n} · 방어 ${e.defense} · 최대 체력 ${this.player.health.maxHp} · 속도 ${i}%`}restart(){this.spawner.clear(),this.spawner.spawnFromConfig(this.dungeonDef.spawns),this.unlockedNow=null,this.projectiles.clear(),this.damageNumbers.clear(),this.loot.clear(),this.chests.reset(),this.boss=null,this.bossDefeated=!1,this.mortars.length=0,this.hud.setBoss(null),this.player.reset(q.player.startPosition),this.player.health.reset(this.effectiveMaxHp()),this.controller.reset(),this.combat.reset(),this.result.hide(),this.ended=!1,Xe.info("전투를 다시 시작합니다.")}showResult(e,t){this.ended=!0,this.mode="result",this.runActive=!1,this.inventoryUI.hide(),this.touch.hide(),this.paused=!1,this.records.totalKills+=this.combat.kills,this.records.bestScore=Math.max(this.records.bestScore,this.combat.score),this.audio.play(this.player.health.isDead?"defeat":"clear"),this.audio.playMusic(null),this.saveNow(),this.result.show(e,t)}dispose(){this.stop(),this.input.detach(),this.audio.dispose(),window.removeEventListener("resize",this.resize),window.removeEventListener("beforeunload",this.flushSave),document.removeEventListener("visibilitychange",this.onVisibility),this.aimRing.removeFromParent(),this.aimRing.geometry.dispose(),this.aimRing.material.dispose(),this.spawner.dispose(),this.projectiles.dispose(),this.loot.dispose(),this.chests.dispose(),this.effects.dispose(),this.player.dispose(),this.dungeon.dispose(),this.renderer.dispose()}setPlayerPosition(e,t){this.player.position.set(e,0,t)}debugDefeatRegularEnemies(){for(const e of this.spawner.getEnemies())e.alive&&e!==this.boss&&this.combat.damageEnemy(e,99999,{x:0,z:1},0)}getDebugState(){const e=this.player.position,t=this.camera.position,n=this.input.getPointer();return{running:this.running,frames:this.frames,ended:this.ended,settings:{...this.settings},dungeon:{id:this.dungeonDef.id,name:this.dungeonDef.name,arenaHalfSize:this.dungeon.getArenaHalfSize(),obstacles:this.dungeon.getObstacleBoxes().length},dungeonSelectVisible:this.dungeonSelect.visible,unlockedNow:this.unlockedNow?.id??null,mortars:this.mortars.length,bossModel:this.bossCfg.model,settingsVisible:this.settingsUI.visible,touchVisible:this.touch.visible,floatingJoystick:this.touch.isFloating,dash:{active:this.controller.dashing,cooldown:this.controller.dashCooldownRatio,invulnerable:this.player.health.invulnerable},aimRingVisible:this.aimRing.visible,audio:{ready:this.audio.ready,track:this.audio.currentTrack},face:this.face!==null,faceVisible:this.player.faceVisible,models:{loaded:Pi.loadedKeys,playerGltf:this.playerUsesGltf},pixelRatio:this.renderer.getPixelRatio(),interactButtonVisible:this.touch.visible&&!document.getElementById("touch-interact")?.hidden,shadowsEnabled:this.renderer.shadowMap.enabled,cameraDistanceScale:this.cameraCtrl.distanceScale,save:{status:this.saveStatus,lastSavedAt:this.lastSavedAt,hasSavedProgress:this.hasSavedProgress,blocked:this.saveBlocked,dirty:this.saveDirty,records:{...this.records}},player:{x:e.x,z:e.z,facing:this.player.facing,moving:this.player.moving,hp:this.player.health.hp,maxHp:this.player.health.maxHp},camera:{x:t.x,y:t.y,z:t.z},guideVisible:this.guide.visible,resultVisible:this.result.visible,mode:this.mode,menuVisible:this.menu.visible,runActive:this.runActive,enemies:this.spawner.getEnemies().map(i=>({type:i.type,x:i.position.x,z:i.position.z,hp:i.health.hp,state:i.ai.state})),aliveEnemies:this.spawner.aliveCount,projectiles:this.projectiles.count,playerY:this.player.jumpY,difficulty:this.difficulty,pickups:this.loot.count,stats:{level:this.stats.level,xp:this.stats.xp,xpToNext:this.stats.xpToNext,gold:this.stats.gold,maxHp:this.stats.maxHp},equipment:{inventory:this.equipment.inventory.length,equipped:Object.fromEntries(Object.entries(this.equipment.equipped).map(([i,r])=>[i,r?r.name:null])),totals:this.equipment.totals()},paused:this.paused,inventoryVisible:this.inventoryUI.visible,chests:{opened:this.chests.openedCount,total:this.chests.total,nearby:this.chests.nearest({x:this.player.position.x,z:this.player.position.z})!==null},prompt:this.currentPrompt,boss:this.boss?{alive:this.boss.alive,hp:this.boss.health.hp,maxHp:this.boss.health.maxHp,state:this.boss.bossAI.state,phase2:this.boss.phase2}:null,bossDefeated:this.bossDefeated,kills:this.combat.kills,score:this.combat.score,input:{pointerX:n.x,pointerY:n.y,pointerHas:n.has,pressed:this.input.getPressedCodes()}}}projectToScreen(e){const t=this.projTmp.copy(e).project(this.camera);return t.z>1?null:{x:(t.x+1)/2*this.canvas.clientWidth,y:(1-t.y)/2*this.canvas.clientHeight}}getAimPoint(){if(this.settings.touchControls)return this.nearestEnemyPoint(q.combat.autoAimRange);const e=this.input.getPointer();if(!e.has)return null;this.raycaster.setFromCamera(new Le(e.x,e.y),this.camera);const t=this.raycaster.ray.intersectPlane(this.groundPlane,this.aimHit);return t?{x:t.x,z:t.z}:null}nearestEnemyPoint(e){const t=this.player.position;let n=null,i=e;for(const r of this.spawner.getEnemies()){if(!r.alive)continue;const a=Math.hypot(r.position.x-t.x,r.position.z-t.z);a<i&&(i=a,n=r)}return n?{x:n.position.x,z:n.position.z}:null}onEnemyAttack(e,t){if(this.ended)return;const n=this.player.position,i=e.position,r=Math.hypot(n.x-i.x,n.z-i.z)||1,a={x:(n.x-i.x)/r,z:(n.z-i.z)/r};if(t=t*Ii(this.difficulty).enemyDamage,e.def.attackKind==="ranged"){this.projectiles.spawn({x:i.x+a.x*(e.radius+.3),z:i.z+a.z*(e.radius+.3)},a,{damage:t,speed:e.def.projectileSpeed??10,lifetime:3,radius:.2,knockback:0,color:16733559,friendly:!1});return}this.damagePlayer(t,{x:i.x,z:i.z})}damagePlayer(e,t){if(this.ended)return;const n=ex(e,this.equipment.totals().defense);if(!this.player.health.takeDamage(n))return;const i=this.player.position,r=Math.hypot(i.x-t.x,i.z-t.z)||1;this.controller.applyKnockback({x:(i.x-t.x)/r,z:(i.z-t.z)/r},q.player.hitKnockback),this.audio.play("hurt",.1),this.settings.haptics&&Ws(40),this.effects.burst(new C(i.x,1,i.z),16732025,6,4),this.settings.hitFlash&&this.hud.flashHit(),this.settings.showDamageNumbers&&this.damageNumbers.show(new C(i.x,2,i.z),n,"player"),this.player.health.isDead&&(this.records.deaths++,this.showResult("쓰러졌습니다",`처치 ${this.combat.kills} · 점수 ${this.combat.score} · 레벨 ${this.stats.level} · 골드 ${this.stats.gold}`),Xe.info("플레이어가 쓰러졌습니다."))}onCollect(e,t){const n=new C(t.x,1.4,t.z);if(e.kind==="heal")this.audio.play("heal"),this.player.health.heal(e.amount),this.effects.burst(n,16732025,6,3),this.settings.showDamageNumbers&&this.damageNumbers.show(n,e.amount,"heal");else if(e.kind==="gold")this.audio.play("pickup",.06),this.stats.addGold(e.amount),this.markDirty(),this.effects.burst(n,16765503,4,2);else if(e.kind==="equip"){if(!e.item)return;if(this.equipment.add(e.item)){this.audio.play("equip"),this.markDirty();const i=q.equipment.rarities[e.item.rarity].color;this.effects.burst(n,i,10,4),this.damageNumbers.showText(n,`획득: ${e.item.name}`,i)}else this.loot.spawn(e,t),this.damageNumbers.showText(n,"가방이 가득 찼어요","#ff6b90")}else{const i=this.stats.addXp(e.amount);if(this.markDirty(),i===0?this.audio.play("pickup",.06):this.audio.play("levelup"),this.effects.burst(n,6091480,4,2),i>0){const r=this.player.health;this.applyStats(),r.heal(Math.round(r.maxHp*q.progression.levelUpHealRatio));const a=this.player.position;this.effects.burst(new C(a.x,1,a.z),16765503,24,7),this.damageNumbers.show(new C(a.x,2.4,a.z),this.stats.level,"levelup"),Xe.info(`레벨 업! 레벨 ${this.stats.level} (최대 체력 ${r.maxHp}, 공격력 ×${this.stats.damageMultiplier.toFixed(2)})`)}}}spawnBoss(){const e=this.bossCfg,t=this.spawner.multipliers;this.boss=new $_({x:e.spawn.x,z:e.spawn.z},{hp:t.hp,speed:t.speed},e),this.spawner.addEnemy(this.boss),this.hud.showBanner(`${e.name} 등장!`),this.audio.play("bossAppear"),this.audio.playMusic("boss"),this.effects.burst(new C(e.spawn.x,1.5,e.spawn.z),e.color,30,9),Xe.info(`보스 등장: ${e.name} (체력 ${this.boss.health.maxHp})`)}onBossAttack(e,t){if(this.ended)return;const n=Ii(this.difficulty).enemyDamage,i=e.position,r=this.player.position;if(t.kind==="contact")this.damagePlayer(t.damage*n,{x:i.x,z:i.z});else if(t.kind==="slam")this.audio.play("slam"),this.effects.shockwave(new C(i.x,0,i.z),t.radius),this.effects.burst(new C(i.x,.5,i.z),16732025,20,6),Math.hypot(r.x-i.x,r.z-i.z)<=t.radius+q.player.radius&&this.player.jumpY<1&&this.damagePlayer(t.damage*n,{x:i.x,z:i.z});else if(t.kind==="summon"){const a=this.spawner.getEnemies().filter(l=>l.alive&&l.type===t.type).length,o=Math.max(0,Math.min(t.count,t.maxAlive-a));for(let l=0;l<o;l++){const c=l/Math.max(1,o)*Math.PI*2+Math.random()*.5,h=i.x+Math.sin(c)*(e.radius+1.2),u=i.z+Math.cos(c)*(e.radius+1.2);this.spawner.spawn(t.type,h,u)&&this.effects.burst(new C(h,1,u),9431295,10,5)}o>0&&(this.hud.showBanner("부하 소환!",900),this.audio.play("summon"))}else if(t.kind==="mortar")for(let a=0;a<t.count;a++){const o=Math.random()*Math.PI*2,l=a===0?0:Math.random()*t.spread,c=r.x+Math.sin(o)*l,h=r.z+Math.cos(o)*l;this.mortars.push({x:c,z:h,t:t.delay+a*.12,radius:t.radius,damage:t.damage*n}),this.effects.marker(new C(c,0,h),t.radius,t.delay+a*.12,16757071)}else{const a=Math.atan2(r.x-i.x,r.z-i.z);for(let o=0;o<t.count;o++){const l=t.aimed?a+(o-(t.count-1)/2)*Math.PI*2/t.count:o/t.count*Math.PI*2,c={x:Math.sin(l),z:Math.cos(l)};this.projectiles.spawn({x:i.x+c.x*(e.radius+.4),z:i.z+c.z*(e.radius+.4)},c,{damage:t.damage*n,speed:t.speed,lifetime:4,radius:.25,knockback:0,color:11561983,friendly:!1})}}}updateMortars(e){if(this.mortars.length===0)return;const t=this.player.position;for(let n=this.mortars.length-1;n>=0;n--){const i=this.mortars[n];if(i.t-=e,i.t>0||(this.mortars.splice(n,1),this.audio.play("boom",.08),this.effects.shockwave(new C(i.x,0,i.z),i.radius,.4,16757071),this.effects.burst(new C(i.x,.6,i.z),16742981,14,6),this.ended))continue;Math.hypot(t.x-i.x,t.z-i.z)<=i.radius+q.player.radius&&this.player.jumpY<1&&this.damagePlayer(i.damage,{x:i.x,z:i.z})}}onBossDefeated(){const e=this.bossCfg,t={x:this.boss.position.x,z:this.boss.position.z};this.loot.spawn({kind:"gold",amount:Math.round(e.reward.goldMin+Math.random()*(e.reward.goldMax-e.reward.goldMin))},{x:t.x-1,z:t.z}),this.loot.spawn({kind:"xp",amount:e.reward.xp},{x:t.x+1,z:t.z}),this.loot.spawn({kind:"equip",amount:0,item:ix(e.reward.equipMinRarity)},{x:t.x,z:t.z+1}),this.loot.spawn({kind:"heal",amount:q.loot.healAmount*2},{x:t.x,z:t.z-1}),this.records.clears++;const n=this.dungeonDef.id,i=this.records.dungeonClears[n]??0;this.records.dungeonClears[n]=i+1;const r=e_(n);this.unlockedNow=i===0&&r?r:null,this.markDirty(),this.hud.showBanner(this.unlockedNow?`던전 클리어! '${this.unlockedNow.name}' 이(가) 열렸습니다`:"던전 클리어!",3e3),Xe.info("보스를 처치했습니다. 던전 클리어!")}checkVictory(){if(!(this.ended||this.dungeonDef.spawns.length===0)){if(!this.boss){this.spawner.aliveCount===0&&this.spawnBoss();return}if(this.hud.setBoss(this.boss.alive?{name:this.bossCfg.name,hp:this.boss.health.hp,maxHp:this.boss.health.maxHp,phase2:this.boss.phase2}:null),!this.boss.alive&&!this.bossDefeated&&(this.bossDefeated=!0,this.onBossDefeated()),this.bossDefeated&&(this.loot.count===0||this.boss.removable)){const e=this.unlockedNow?` · 새 던전 '${this.unlockedNow.name}' 이(가) 열렸습니다!`:"";this.showResult("던전 클리어!",`${this.dungeonDef.name} · 처치 ${this.combat.kills} · 점수 ${this.combat.score} · 레벨 ${this.stats.level} · 골드 ${this.stats.gold}${e}`)}}}updateFps(e){this.settings.showFps&&(this.fpsFrames++,this.fpsTime+=e,this.fpsTime>=.5&&(this.guide.setHudText(`FPS ${Math.round(this.fpsFrames/this.fpsTime)}`),this.fpsFrames=0,this.fpsTime=0))}}function _c(s){const e=new Date(s);if(Number.isNaN(e.getTime())||e.getTime()===0)return"알 수 없음";const t=n=>String(n).padStart(2,"0");return`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())} ${t(e.getHours())}:${t(e.getMinutes())}`}function Vx(s){let e=null;const t=(n,i)=>{e||(e=document.createElement("div"),e.className="error-box",s.appendChild(e)),e.innerHTML=`<b>${n}</b>
${i}

자세한 내용은 F12 → Console 탭, 해결 방법은 TROUBLESHOOTING.md 를 확인하세요.`};window.addEventListener("error",n=>{t("게임 실행 중 오류가 발생했습니다.",String(n.message||n.error||"알 수 없는 오류"))}),window.addEventListener("unhandledrejection",n=>{const i=n.reason;t("게임 실행 중 오류가 발생했습니다.",String(i?.message??i??"알 수 없는 오류"))})}function Wx(s,e){const t=document.createElement("div");t.className="error-box",t.innerHTML=`<b>게임을 시작할 수 없습니다.</b>
${e}`,s.appendChild(t)}const Mh=document.getElementById("game-canvas"),rr=document.getElementById("ui-root");if(!Mh||!rr)throw new Error("index.html 에 #game-canvas 또는 #ui-root 요소가 없습니다.");Vx(rr);qx();try{const s=new Gx(Mh,rr);s.start(),new URLSearchParams(location.search).has("debug")&&(window.__heroX=s)}catch(s){Xe.error("게임을 시작하지 못했습니다.",s),Wx(rr,`이 브라우저에서 3D 화면(WebGL)을 켤 수 없거나 초기화에 실패했습니다.
최신 Chrome 또는 Edge 로 열어 보고, 그래도 안 되면 TROUBLESHOOTING.md 를 참고하세요.
오류: ${s instanceof Error?s.message:String(s)}`)}function qx(){const s=i=>i.preventDefault();document.addEventListener("gesturestart",s,{passive:!1}),document.addEventListener("gesturechange",s,{passive:!1}),document.addEventListener("gestureend",s,{passive:!1}),document.addEventListener("touchmove",i=>{i.touches.length>1&&i.preventDefault()},{passive:!1});let e=0,t=0,n=0;document.addEventListener("touchend",i=>{const r=i.changedTouches[0],a=Date.now();r&&a-e<300&&Math.hypot(r.clientX-t,r.clientY-n)<30&&i.preventDefault(),e=a,r&&(t=r.clientX,n=r.clientY)},{passive:!1})}
