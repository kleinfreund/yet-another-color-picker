import{render as t}from"lit-html";function e(t,e,s){return Math.max(e,Math.min(t,s))}function s(t,e=2){return t.toFixed(e).replace(/\.?0+$/,"")}function o(t){if(t.endsWith("."))return NaN;return(parseFloat(t)%360+360)%360/360}function r(t){return s(360*t)}function i(t){if(!t.endsWith("%"))return NaN;const s=t.substring(0,t.length-1);if(s.endsWith("."))return NaN;const o=parseFloat(s);return Number.isNaN(o)?NaN:e(o,0,100)/100}function n(t){return s(100*t)+"%"}function a(t){if(t.endsWith("%"))return i(t);if(t.endsWith("."))return NaN;const s=parseFloat(t);return Number.isNaN(s)?NaN:e(s,0,255)/255}function h(t){return s(255*t)}function l(t){return t.endsWith("%")?i(t):e(parseFloat(t),0,1)}function c(t){return String(t)}var u={hsl:{h:{to:r,from:o},s:{to:n,from:i},l:{to:n,from:i},a:{to:c,from:l}},hwb:{h:{to:r,from:o},w:{to:n,from:i},b:{to:n,from:i},a:{to:c,from:l}},rgb:{r:{to:h,from:a},g:{to:h,from:a},b:{to:h,from:a},a:{to:c,from:l}}};import{html as p}from"lit-html";function m(t,e,s,o,r,i,n,a,h,l,c,u,m,b,d,v,f){return p`
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
				.value="${360*o.hsv.h}"
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
				.value="${100*o.hsv.a}"
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
			<span class="cp-visually-hidden">Copy color</span>

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
				.value="${r}"
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
				@input="${t=>v(t,s)}"
			>
		</label>
	`))}
			</div>
			${n.length>1?p`
		<button
			class="cp-switch-format-button"
			type="button"
			@click="${d}"
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
	`}function b(t){const e=[],s=t.length>5?2:1;for(let o=1;o<t.length;o+=s){const r=t.substring(o,o+s).repeat(s%2+1);e.push(parseInt(r,16)/255)}return 3===e.length&&e.push(1),{r:e[0],g:e[1],b:e[2],a:e[3]}}function d(t){const e=t.l<.5?t.l*(1+t.s):t.l+t.s-t.l*t.s,s=2*t.l-e;return{r:v(s,e,t.h+1/3),g:v(s,e,t.h),b:v(s,e,t.h-1/3),a:t.a}}function v(t,e,s){return s<0?s+=1:s>1&&(s-=1),s<1/6?t+6*(e-t)*s:s<.5?e:s<2/3?t+(e-t)*(2/3-s)*6:t}function f(t){return{r:g(5,t),g:g(3,t),b:g(1,t),a:t.a}}function g(t,e){const s=(t+6*e.h)%6;return e.v-e.v*e.s*Math.max(0,Math.min(s,4-s,1))}function w(t){return{h:t.h,s:1===t.b?0:1-t.w/(1-t.b),v:1-t.b,a:t.a}}function y(t){const e=Math.min(t.r,t.g,t.b),s=Math.max(t.r,t.g,t.b);let o;return o=s===e?0:s===t.r?(0+(t.g-t.b)/(s-e))/6:s===t.g?(2+(t.b-t.r)/(s-e))/6:(4+(t.r-t.g)/(s-e))/6,o<0&&(o+=1),{h:o,w:e,b:1-s,a:t.a}}function C(t){const e=y(t),s=e.w,o=1-e.b,r=(o+s)/2;let i;return i=0===o||1===s?0:(o-r)/Math.min(r,1-r),{h:e.h,s:i,l:r,a:t.a}}function x(t){return"#"+Object.values(t).map((t=>Math.round(255*t).toString(16).padStart(2,"0"))).join("")}var $={hex:{hex:t=>t,hsl:t=>C(b(t)),hsv:t=>w(y(b(t))),hwb:t=>y(b(t)),rgb:b},hsl:{hex:t=>x(d(t)),hsl:t=>t,hsv:function(t){const e=t.l+t.s*Math.min(t.l,1-t.l),s=0===e?0:2-2*t.l/e;return{h:t.h,s,v:e,a:t.a}},hwb:t=>y(d(t)),rgb:d},hsv:{hex:t=>x(f(t)),hsl:function(t){const e=t.v-t.v*t.s/2,s=Math.min(e,1-e),o=0===s?0:(t.v-e)/s;return{h:t.h,s:o,l:e,a:t.a}},hsv:t=>t,hwb:function(t){return{h:t.h,w:(1-t.s)*t.v,b:1-t.v,a:t.a}},rgb:f},hwb:{hex:t=>x(f(w(t))),hsl:t=>C(f(w(t))),hsv:w,hwb:t=>t,rgb:t=>f(w(t))},rgb:{hex:x,hsl:C,hsv:t=>w(y(t)),hwb:y,rgb:t=>t}};function F(t,e,s){return $[t][e](s)}function S({format:t,color:e},o){switch(t){case"hex":return o&&[5,9].includes(e.length)?e.substring(0,e.length-(e.length-1)/4):e;case"hsl":return`hsl(${s(360*e.h)} ${s(100*e.s)}% ${s(100*e.l)}%`+(o?")":` / ${s(e.a)})`);case"hwb":return`hwb(${s(360*e.h)} ${s(100*e.w)}% ${s(100*e.b)}%`+(o?")":` / ${s(e.a)})`);case"rgb":return`rgb(${s(255*e.r)} ${s(255*e.g)} ${s(255*e.b)}`+(o?")":` / ${s(e.a)})`)}}function T(t){return/^#(?:(?:[A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(t)}function I(t){if("string"!=typeof t){const e=function(t){return Object.prototype.hasOwnProperty.call(t,"r")?"rgb":Object.prototype.hasOwnProperty.call(t,"w")?"hwb":Object.prototype.hasOwnProperty.call(t,"v")?"hsv":"hsl"}(t);return{format:e,color:t}}if(t.startsWith("#"))return T(t)?{format:"hex",color:t}:null;if(!t.includes("(")){const e=document.createElement("canvas").getContext("2d");e.fillStyle=t;const s=e.fillStyle;return"#000000"===s&&"black"!==t?null:{format:"hex",color:s}}const[e,s]=t.split("("),o=e.substring(0,3),r=s.replace(/[,/)]/g," ").replace(/\s+/g," ").trim().split(" ");3===r.length&&r.push("1");const i=(o+"a").split(""),n=Object.fromEntries(i.map(((t,e)=>[t,u[o][t].from(r[e])])));return{format:o,color:n}}var M={"alpha-channel":{type:String,property:"alphaChannel"},color:{type:String,property:"color"},"default-format":{type:String,property:"defaultFormat"},id:{type:String,property:"id"},"visible-formats":{type:Array,property:"visibleFormats"}},A=["hex","hsl","hsv","hwb","rgb"],k=class s extends HTMLElement{static observedAttributes=Object.keys(M);static{void 0===window.customElements.get("color-picker")&&window.customElements.define("color-picker",s)}#t="hsl";#e="show";#s="#ffffffff";#o="hsl";#r="color-picker";#i=["hex","hsl","hwb","rgb"];#n=null;#a=null;#h=!1;#l={hex:"#ffffffff",hsl:{h:0,s:0,l:1,a:1},hsv:{h:0,s:0,v:1,a:1},hwb:{h:0,w:1,b:0,a:1},rgb:{r:1,g:1,b:1,a:1}};#c=["h","s","l","a"];#u="#ffffffff";#p=0;get[Symbol.toStringTag](){return"ColorPicker"}get activeFormat(){return this.#t}set activeFormat(t){this.#t=t,this.#m((()=>{this.#b(),this.#d()}))}get alphaChannel(){return this.#e}set alphaChannel(t){this.#e=t,this.#m((()=>{this.#b(),this.#v(),this.#d()}))}get color(){return this.#s}set color(t){this.#s=t,this.#m((()=>{this.#f(),this.#d()}))}get colors(){return this.#l}set colors(t){this.#l=t,this.#m((()=>{this.#v(),this.#d(),this.#g()}))}get defaultFormat(){return this.#o}set defaultFormat(t){this.#o=t}get id(){return this.#r}set id(t){this.#r=t,this.#m((()=>{this.#d()}))}get visibleFormats(){return this.#i}set visibleFormats(t){this.#i=t}connectedCallback(){this.isConnected&&(this.ownerDocument.addEventListener("mousemove",this.#w,{passive:!1}),this.ownerDocument.addEventListener("touchmove",this.#y,{passive:!1}),this.ownerDocument.addEventListener("mouseup",this.#C),this.ownerDocument.addEventListener("touchend",this.#C),this.activeFormat=this.visibleFormats.includes(this.defaultFormat)?this.defaultFormat:this.visibleFormats[0])}disconnectedCallback(){this.ownerDocument.removeEventListener("mousemove",this.#w),this.ownerDocument.removeEventListener("touchmove",this.#y),this.ownerDocument.removeEventListener("mouseup",this.#C),this.ownerDocument.removeEventListener("touchend",this.#C)}attributeChangedCallback(t,e,s){e!==s&&this.#x(t)}#x(t){const{property:e,type:s}=M[t],o=this.getAttribute(t);let r;if(null!==o){if(s===Array)r=o.split(",").map((t=>t.trim()));else r=o;this[e]!==r&&Reflect.set(this,e,r)}}#f(){const t=I(this.color);null!==t&&this.#$(t)}#$({format:t,color:e}){let s=e;if("hide"===this.alphaChannel)if("string"!=typeof e)e.a=1,s=e;else if([5,9].includes(e.length)){const t=(e.length-1)/4;s=e.substring(0,e.length-t)+"f".repeat(t)}else[4,7].includes(e.length)&&(s=e+"f".repeat((e.length-1)/3));if(!function(t,e){if("string"==typeof t||"string"==typeof e)return t===e;for(const s in t)if(t[s]!==e[s])return!1;return!0}(this.colors[t],s)){const e={};e[t]=s;for(const o of A)o!==t&&(e[o]=F(t,o,s));this.colors=e}}#g(){const t=this.#F(),e=new CustomEvent("color-change",{detail:t});this.dispatchEvent(e)}#F(){const t="hide"===this.alphaChannel,e=S({color:this.#l[this.activeFormat],format:this.activeFormat},t);return{colors:this.colors,cssColor:e}}#S(){this.style.setProperty("--cp-hsl-h",String(this.colors.hsl.h)),this.style.setProperty("--cp-hsl-s",String(this.colors.hsl.s)),this.style.setProperty("--cp-hsl-l",String(this.colors.hsl.l)),this.style.setProperty("--cp-hsl-a",String(this.colors.hsl.a)),null!==this.#n&&null!==this.#a&&(this.#n.style.position="relative",this.#n.style.backgroundColor="hsl(calc(var(--cp-hsl-h) * 360) 100% 50%)",this.#n.style.backgroundImage="linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",this.#a.style.boxSizing="border-box",this.#a.style.position="absolute",this.#a.style.left=100*this.colors.hsv.s+"%",this.#a.style.bottom=100*this.colors.hsv.v+"%")}#b(){const t=Object.keys(this.colors[this.activeFormat]);this.#c="hex"!==this.activeFormat&&"hide"===this.alphaChannel?t.slice(0,3):t}#v(){const t=this.colors.hex;this.#u="hide"===this.alphaChannel&&[5,9].includes(t.length)?t.substring(0,t.length-(t.length-1)/4):t}#m(t){this.#p++,queueMicrotask(t)}#d(){this.#p--,0===this.#p&&this.#T()}#T(){if(!this.isConnected)return;const e=m(this.id,this.activeFormat,this.#c,this.colors,this.#u,this.alphaChannel,this.visibleFormats,this.#I,this.#M,this.#A,this.#k,this.#N,this.#W,this.#O,this.#E,this.#P,this.#L);this.classList.add("cp-color-picker"),t(e,this),this.#n=this.querySelector(".cp-color-space"),this.#a=this.querySelector(".cp-thumb"),this.#S()}#W=t=>{this.#h=!0,this.#w(t)};#w=t=>{1===t.buttons&&!1!==this.#h&&this.#n instanceof HTMLElement&&this.#V(this.#n,t.clientX,t.clientY)};#O=t=>{this.#h=!0,this.#y(t)};#y=t=>{if(!1===this.#h||!(this.#n instanceof HTMLElement))return;t.preventDefault();const e=t.touches[0];this.#V(this.#n,e.clientX,e.clientY)};#V(t,s,o){const r=function(t,s,o){const r=t.getBoundingClientRect(),i=s-r.left,n=o-r.top;return{x:0===r.width?0:e(i/r.width,0,1),y:0===r.height?0:e(1-n/r.height,0,1)}}(t,s,o),i=Object.assign({},this.colors.hsv);i.s=r.x,i.v=r.y,this.#$({format:"hsv",color:i})}#C=()=>{this.#h=!1};#N=t=>{if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(t.key))return;t.preventDefault();const s=["ArrowLeft","ArrowDown"].includes(t.key)?-1:1,o=["ArrowLeft","ArrowRight"].includes(t.key)?"s":"v",r=t.shiftKey?10:1,i=this.colors.hsv[o]+s*r*.01,n=Object.assign({},this.colors.hsv);n[o]=e(i,0,1),this.#$({format:"hsv",color:n})};#M=t=>{if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(t.key)||!t.shiftKey)return;const s=t.currentTarget,o=parseFloat(s.step),r=["ArrowLeft","ArrowDown"].includes(t.key)?-1:1,i=e(parseFloat(s.value)+r*o*10,parseInt(s.min),parseInt(s.max));s.value=String(i-r*o)};#k=(t,e)=>{const s=t.currentTarget,o=Object.assign({},this.colors.hsv);o[e]=parseInt(s.value)/parseInt(s.max),this.#$({format:"hsv",color:o})};#L=t=>{const e=t.target;T(e.value)&&this.#$({format:"hex",color:e.value})};#P=(t,e)=>{const s=t.target,o=Object.assign({},this.#l[this.activeFormat]),r=u[this.activeFormat][e].from(s.value);Number.isNaN(r)||void 0===r||(o[e]=r,this.#$({format:this.activeFormat,color:o}))};copyColor(){return this.#A()}#A=()=>{const t=this.#l[this.activeFormat],e="hide"===this.alphaChannel,s=S({color:t,format:this.activeFormat},e);return window.navigator.clipboard.writeText(s)};switchFormat(){return this.#E()}#E=()=>{const t=(this.visibleFormats.findIndex((t=>t===this.activeFormat))+1)%this.visibleFormats.length;this.activeFormat=this.visibleFormats[t]};#I=t=>{const e=this.activeFormat;return u[e][t].to(this.#l[e][t])}};export{k as ColorPicker};