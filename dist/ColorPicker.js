import{render as t}from"lit-html";function e(t,e,s){return Math.max(e,Math.min(t,s))}function s(t,e=2){return t.toFixed(e).replace(/\.?0+$/,"")}function r(t){if(t.endsWith("."))return NaN;return(parseFloat(t)%360+360)%360/360}function o(t){return s(360*t)}function i(t){if(!t.endsWith("%"))return NaN;const s=t.substring(0,t.length-1);if(s.endsWith("."))return NaN;const r=parseFloat(s);return Number.isNaN(r)?NaN:e(r,0,100)/100}function n(t){return s(100*t)+"%"}function a(t){if(t.endsWith("%"))return i(t);if(t.endsWith("."))return NaN;const s=parseFloat(t);return Number.isNaN(s)?NaN:e(s,0,255)/255}function h(t){return s(255*t)}function l(t){return t.endsWith("%")?i(t):e(parseFloat(t),0,1)}function c(t){return String(t)}var u={hsl:{h:{to:o,from:r},s:{to:n,from:i},l:{to:n,from:i},a:{to:c,from:l}},hwb:{h:{to:o,from:r},w:{to:n,from:i},b:{to:n,from:i},a:{to:c,from:l}},rgb:{r:{to:h,from:a},g:{to:h,from:a},b:{to:h,from:a},a:{to:c,from:l}}};import{html as p}from"lit-html";function m(t,e,s,r,o,i,n,a,h,l,c,u,m,b,v,g,f){return p`
		${p`
		<div
			class="cp-color-space"
			@mousedown="${m}"
			@touchstart="${b}"
		>
			<div
				class="cp-thumb"
				tabIndex="0"
				aria-label="Color space thumb"
				@keydown="${u}"
			></div>
		</div>
	`}
		${p`
		<div class="cp-range-input-group">
			${p`
		<label
			class="cp-range-input-label cp-range-input-label--hue"
			for="${t}-hue-slider"
		>
			<span class="cp-range-input-label-text cp-range-input-label-text--hue">Hue</span>

			<input
				class="cp-range-input cp-range-input--hue"
				id="${t}-hue-slider"
				type="range"
				min="0"
				max="360"
				step="1"
				.value="${360*r.hsv.h}"
				@keydown="${h}"
				@input="${t=>c(t,"h")}"
			>
		</label>
	`}
			${"show"===i?p`
		<label
			class="cp-range-input-label cp-range-input-label--alpha"
			for="${t}-alpha-slider"
		>
			<span class="cp-range-input-label-text cp-range-input-label-text--alpha">Alpha</span>

			<input
				class="cp-range-input cp-range-input--alpha"
				id="${t}-alpha-slider"
				type="range"
				min="0"
				max="100"
				step="1"
				.value="${100*r.hsv.a}"
				@keydown="${h}"
				@input="${t=>c(t,"a")}"
			>
		</label>
	`:""}
		</div>
	`}
		${p`
		<button
			class="cp-copy-button"
			type="button"
			@click="${l}"
		>
			<span class="cp-visually-hidden">Copy coloy</span>

			<svg
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
				width="24"
				height="24"
				viewBox="0 0 32 32"
			>
				<path
					d="M25.313 28v-18.688h-14.625v18.688h14.625zM25.313 6.688c1.438 0 2.688 1.188 2.688 2.625v18.688c0 1.438-1.25 2.688-2.688 2.688h-14.625c-1.438 0-2.688-1.25-2.688-2.688v-18.688c0-1.438 1.25-2.625 2.688-2.625h14.625zM21.313 1.313v2.688h-16v18.688h-2.625v-18.688c0-1.438 1.188-2.688 2.625-2.688h16z"
					fill="currentColor"
				/>
			</svg>
		</button>
	`}
		${p`
		<div class="cp-color-input-wrapper">
			<div class="cp-color-input-group">
				${"hex"===e?p`
		<label
			class="cp-hex-input-label"
			for="${t}-color-hex"
		>
			<span class="cp-color-input-label-text">Hex</span>

			<input
				class="cp-color-input"
				id="${t}-color-hex"
				type="text"
				.value="${o}"
				@input="${f}"
			>
		</label>
	`:s.map((s=>p`
		<label
			class="cp-color-input-label"
			id="${t}-color-${e}-${s}-label"
			for="${t}-color-${e}-${s}"
		>
			<span class="cp-color-input-label-text">${s.toUpperCase()}</span>

			<input
				class="cp-color-input"
				id="${t}-color-${e}-${s}"
				type="text"
				.value="${a(s)}"
				@input="${t=>g(t,s)}"
			>
		</label>
	`))}
			</div>
			${n.length>1?p`
		<button
			class="cp-switch-format-button"
			type="button"
			@click="${v}"
		>
			<span class="cp-visually-hidden">Switch format</span>

			<svg
				class="cp-icon"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="15"
			>
				<path
					d="M8 15l5-5-1-1-4 2-4-2-1 1zm4-9l1-1-5-5-5 5 1 1 4-2z"
					fill="currentColor"
				/>
			</svg>
		</button>
	`:""}
		</div>
	`}
	`}function b(t){const e=[],s=t.length>5?2:1;for(let r=1;r<t.length;r+=s){const o=t.substring(r,r+s).repeat(s%2+1);e.push(parseInt(o,16)/255)}return 3===e.length&&e.push(1),{r:e[0],g:e[1],b:e[2],a:e[3]}}function v(t){const e=t.l<.5?t.l*(1+t.s):t.l+t.s-t.l*t.s,s=2*t.l-e;return{r:g(s,e,t.h+1/3),g:g(s,e,t.h),b:g(s,e,t.h-1/3),a:t.a}}function g(t,e,s){return s<0?s+=1:s>1&&(s-=1),s<1/6?t+6*(e-t)*s:s<.5?e:s<2/3?t+(e-t)*(2/3-s)*6:t}function f(t){return{r:d(5,t),g:d(3,t),b:d(1,t),a:t.a}}function d(t,e){const s=(t+6*e.h)%6;return e.v-e.v*e.s*Math.max(0,Math.min(s,4-s,1))}function w(t){return{h:t.h,s:1===t.b?0:1-t.w/(1-t.b),v:1-t.b,a:t.a}}function y(t){const e=Math.min(t.r,t.g,t.b),s=Math.max(t.r,t.g,t.b);let r;return r=s===e?0:s===t.r?(0+(t.g-t.b)/(s-e))/6:s===t.g?(2+(t.b-t.r)/(s-e))/6:(4+(t.r-t.g)/(s-e))/6,r<0&&(r+=1),{h:r,w:e,b:1-s,a:t.a}}function C(t){const e=y(t),s=e.w,r=1-e.b,o=(r+s)/2;let i;return i=0===r||1===s?0:(r-o)/Math.min(o,1-o),{h:e.h,s:i,l:o,a:t.a}}function x(t){return"#"+Object.values(t).map((t=>Math.round(255*t).toString(16).padStart(2,"0"))).join("")}var $={hex:{hex:t=>t,hsl:t=>C(b(t)),hsv:t=>w(y(b(t))),hwb:t=>y(b(t)),rgb:b},hsl:{hex:t=>x(v(t)),hsl:t=>t,hsv:function(t){const e=t.l+t.s*Math.min(t.l,1-t.l),s=0===e?0:2-2*t.l/e;return{h:t.h,s,v:e,a:t.a}},hwb:t=>y(v(t)),rgb:v},hsv:{hex:t=>x(f(t)),hsl:function(t){const e=t.v-t.v*t.s/2,s=Math.min(e,1-e),r=0===s?0:(t.v-e)/s;return{h:t.h,s:r,l:e,a:t.a}},hsv:t=>t,hwb:function(t){return{h:t.h,w:(1-t.s)*t.v,b:1-t.v,a:t.a}},rgb:f},hwb:{hex:t=>x(f(w(t))),hsl:t=>C(f(w(t))),hsv:w,hwb:t=>t,rgb:t=>f(w(t))},rgb:{hex:x,hsl:C,hsv:t=>w(y(t)),hwb:y,rgb:t=>t}};function F(t,e,s){return $[t][e](s)}function S({format:t,color:e},r){switch(t){case"hex":return r&&[5,9].includes(e.length)?e.substring(0,e.length-(e.length-1)/4):e;case"hsl":return`hsl(${s(360*e.h)} ${s(100*e.s)}% ${s(100*e.l)}%`+(r?")":` / ${s(e.a)})`);case"hwb":return`hwb(${s(360*e.h)} ${s(100*e.w)}% ${s(100*e.b)}%`+(r?")":` / ${s(e.a)})`);case"rgb":return`rgb(${s(255*e.r)} ${s(255*e.g)} ${s(255*e.b)}`+(r?")":` / ${s(e.a)})`)}}function T(t){return/^#(?:(?:[A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(t)}function M(t){if("string"!=typeof t){const e=function(t){return Object.prototype.hasOwnProperty.call(t,"r")?"rgb":Object.prototype.hasOwnProperty.call(t,"w")?"hwb":Object.prototype.hasOwnProperty.call(t,"v")?"hsv":"hsl"}(t);return{format:e,color:t}}if(T(t))return{format:"hex",color:t};if(!t.includes("(")){const e=document.createElement("canvas").getContext("2d");e.fillStyle=t;const s=e.fillStyle;return"#000000"===s&&"black"!==t?null:{format:"hex",color:s}}const[e,s]=t.split("("),r=e.substring(0,3),o=s.replace(/[,/)]/g," ").replace(/\s+/g," ").trim().split(" ");3===o.length&&o.push("1");const i=(r+"a").split(""),n=Object.fromEntries(i.map(((t,e)=>[t,u[r][t].from(o[e])])));return{format:r,color:n}}var k={"alpha-channel":{type:String,property:"alphaChannel"},color:{type:String,property:"color"},"default-format":{type:String,property:"defaultFormat"},id:{type:String,property:"id"},"visible-formats":{type:Array,property:"visibleFormats"}},A=["hex","hsl","hsv","hwb","rgb"],I=class s extends HTMLElement{static observedAttributes=Object.keys(k);static{void 0===window.customElements.get("color-picker")&&window.customElements.define("color-picker",s)}#t="hsl";#e="show";#s="#ffffffff";#r="hsl";#o="color-picker";#i=["hex","hsl","hwb","rgb"];#n=null;#a=null;#h=!1;#l={hex:"#ffffffff",hsl:{h:0,s:0,l:1,a:1},hsv:{h:0,s:0,v:1,a:1},hwb:{h:0,w:1,b:0,a:1},rgb:{r:1,g:1,b:1,a:1}};#c=["h","s","l","a"];#u="#ffffffff";#p=!1;get[Symbol.toStringTag](){return"ColorPicker"}get activeFormat(){return this.#t}set activeFormat(t){this.#t=t,queueMicrotask((()=>{this.#m(),this.#b()}))}get alphaChannel(){return this.#e}set alphaChannel(t){this.#e=t,queueMicrotask((()=>{this.#m(),this.#v(),this.#b()}))}get color(){return this.#s}set color(t){this.#s=t,queueMicrotask((()=>{this.#g(),this.#b()}))}get defaultFormat(){return this.#r}set defaultFormat(t){this.#r=t}get id(){return this.#o}set id(t){this.#o=t,queueMicrotask((()=>{this.#b()}))}get visibleFormats(){return this.#i}set visibleFormats(t){this.#i=t}connectedCallback(){this.isConnected&&(this.ownerDocument.addEventListener("mousemove",this.#f,{passive:!1}),this.ownerDocument.addEventListener("touchmove",this.#d,{passive:!1}),this.ownerDocument.addEventListener("mouseup",this.#w),this.ownerDocument.addEventListener("touchend",this.#w),this.activeFormat=this.visibleFormats.includes(this.defaultFormat)?this.defaultFormat:this.visibleFormats[0])}disconnectedCallback(){this.ownerDocument.removeEventListener("mousemove",this.#f),this.ownerDocument.removeEventListener("touchmove",this.#d),this.ownerDocument.removeEventListener("mouseup",this.#w),this.ownerDocument.removeEventListener("touchend",this.#w)}attributeChangedCallback(t,e,s){e!==s&&this.#y(t)}#y(t){const{property:e,type:s}=k[t],r=this.getAttribute(t);let o;if(null!==r){if(s===Array)o=r.split(",").map((t=>t.trim()));else o=r;this[e]!==o&&Reflect.set(this,e,o)}}#g(){const t=M(this.color);null!==t&&this.#C(t)}#C({format:t,color:e}){let s=e;if("hide"===this.alphaChannel)if("string"!=typeof e)e.a=1,s=e;else if([5,9].includes(e.length)){const t=(e.length-1)/4;s=e.substring(0,e.length-t)+"f".repeat(t)}else[4,7].includes(e.length)&&(s=e+"f".repeat((e.length-1)/3));if(!function(t,e){if("string"==typeof t||"string"==typeof e)return t===e;for(const s in t)if(t[s]!==e[s])return!1;return!0}(this.#l[t],s)){this.#l[t]=s;for(const e of A)e!==t&&(this.#l[e]=F(t,e,s));this.#v(),this.#x(),this.#$()}}#$(){const t=this.#F(),e=new CustomEvent("color-change",{detail:t});this.dispatchEvent(e)}#F(){const t="hide"===this.alphaChannel,e=S({color:this.#l[this.activeFormat],format:this.activeFormat},t);return{colors:this.#l,cssColor:e}}#S(){this.style.setProperty("--cp-hsl-h",String(this.#l.hsl.h)),this.style.setProperty("--cp-hsl-s",String(this.#l.hsl.s)),this.style.setProperty("--cp-hsl-l",String(this.#l.hsl.l)),this.style.setProperty("--cp-hsl-a",String(this.#l.hsl.a)),null!==this.#n&&null!==this.#a&&(this.#n.style.position="relative",this.#n.style.backgroundColor="hsl(calc(var(--cp-hsl-h) * 360) 100% 50%)",this.#n.style.backgroundImage="linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",this.#a.style.boxSizing="border-box",this.#a.style.position="absolute",this.#a.style.left=100*this.#l.hsv.s+"%",this.#a.style.bottom=100*this.#l.hsv.v+"%")}#m(){const t=Object.keys(this.#l[this.activeFormat]);this.#c="hex"!==this.activeFormat&&"hide"===this.alphaChannel?t.slice(0,3):t}#v(){const t=this.#l.hex;this.#u="hide"===this.alphaChannel&&[5,9].includes(t.length)?t.substring(0,t.length-(t.length-1)/4):t}#b(){this.#p||(this.#p=!0,this.#x(),this.#p=!1)}#x(){if(!this.isConnected)return;const e=m(this.id,this.activeFormat,this.#c,this.#l,this.#u,this.alphaChannel,this.visibleFormats,this.#T,this.#M,this.#k,this.#A,this.#I,this.#P,this.#N,this.#O,this.#W,this.#E);this.classList.add("cp-color-picker"),t(e,this),this.#n=this.querySelector(".cp-color-space"),this.#a=this.querySelector(".cp-thumb"),this.#S()}#P=t=>{this.#h=!0,this.#f(t)};#f=t=>{1===t.buttons&&!1!==this.#h&&this.#n instanceof HTMLElement&&this.#L(this.#n,t.clientX,t.clientY)};#N=t=>{this.#h=!0,this.#d(t)};#d=t=>{if(!1===this.#h||!(this.#n instanceof HTMLElement))return;t.preventDefault();const e=t.touches[0];this.#L(this.#n,e.clientX,e.clientY)};#L(t,s,r){const o=function(t,s,r){const o=t.getBoundingClientRect(),i=s-o.left,n=r-o.top;return{x:0===o.width?0:e(i/o.width,0,1),y:0===o.height?0:e(1-n/o.height,0,1)}}(t,s,r),i=Object.assign({},this.#l.hsv);i.s=o.x,i.v=o.y,this.#C({format:"hsv",color:i})}#w=()=>{this.#h=!1};#I=t=>{if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(t.key))return;t.preventDefault();const s=["ArrowLeft","ArrowDown"].includes(t.key)?-1:1,r=["ArrowLeft","ArrowRight"].includes(t.key)?"s":"v",o=t.shiftKey?10:1,i=this.#l.hsv[r]+s*o*.01,n=Object.assign({},this.#l.hsv);n[r]=e(i,0,1),this.#C({format:"hsv",color:n})};#M=t=>{if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(t.key)||!t.shiftKey)return;const s=t.currentTarget,r=parseFloat(s.step),o=["ArrowLeft","ArrowDown"].includes(t.key)?-1:1,i=e(parseFloat(s.value)+o*r*10,parseInt(s.min),parseInt(s.max));s.value=String(i-o*r)};#A=(t,e)=>{const s=t.currentTarget,r=Object.assign({},this.#l.hsv);r[e]=parseInt(s.value)/parseInt(s.max),this.#C({format:"hsv",color:r})};#E=t=>{const e=t.target;T(e.value)&&this.#C({format:"hex",color:e.value})};#W=(t,e)=>{const s=t.target,r=Object.assign({},this.#l[this.activeFormat]),o=u[this.activeFormat][e].from(s.value);Number.isNaN(o)||void 0===o||(r[e]=o,this.#C({format:this.activeFormat,color:r}))};copyColor(){return this.#k()}#k=()=>{const t=this.#l[this.activeFormat],e="hide"===this.alphaChannel,s=S({color:t,format:this.activeFormat},e);return window.navigator.clipboard.writeText(s)};switchFormat(){return this.#O()}#O=()=>{const t=(this.visibleFormats.findIndex((t=>t===this.activeFormat))+1)%this.visibleFormats.length;this.activeFormat=this.visibleFormats[t]};#T=t=>{const e=this.activeFormat;return u[e][t].to(this.#l[e][t])}};export{I as ColorPicker};