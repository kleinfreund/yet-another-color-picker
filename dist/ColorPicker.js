import{render as t}from"lit-html";function e(t,e,r){return Math.max(e,Math.min(t,r))}function r(t,e=2){return t.toFixed(e).replace(/\.?0+$/,"")}var o={deg:1,grad:.9,rad:180/Math.PI,turn:360},s={from:t=>t.endsWith("%")?h.from(t,{referenceValue:1}):e(n.from(t),0,1),to:t=>String(t)},i={from(t){const e=t.match(/deg|g?rad|turn$/);if(null===e)return n.from(t);const r=e[0];return n.from(t.slice(0,-r.length))*o[r]},to:t=>n.to(t)},n={from:(t,{min:r=Number.NEGATIVE_INFINITY,max:o=Number.POSITIVE_INFINITY}={})=>t.endsWith(".")?NaN:e(Number(t),r,o),to:t=>r(t)},h={from(t,{referenceValue:e=100,min:r=0,max:o=100}={}){if(!t.endsWith("%"))return NaN;return n.from(t.slice(0,-1),{min:r,max:o})*e/100},to:t=>n.to(t)+"%"},l={from:t=>t.endsWith("%")?h.from(t,{referenceValue:255}):n.from(t,{min:0,max:255}),to:t=>n.to(t)},a={hsl:{h:i,s:h,l:h,a:s},hwb:{h:i,w:h,b:h,a:s},rgb:{r:l,g:l,b:l,a:s}};import{html as c}from"lit-html";function u(t,e,r,o,s,i,n,h,l,u,p,m,d,b){return c`
		${c`
		<div
			class="cp-color-space"
			@mousedown="${u}"
			@touchstart="${p}"
		>
			<div
				class="cp-thumb"
				tabIndex="0"
				aria-label="Color space thumb"
				@keydown="${l}"
			></div>
		</div>
	`}
		${c`
		<div class="cp-range-input-group">
			${c`
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
				.value="${r.hsv.h}"
				@keydown="${i}"
				@input="${t=>h(t,"h")}"
			>
		</label>
	`}
			${"show"===o?c`
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
				max="1"
				step="0.01"
				.value="${r.hsv.a}"
				@keydown="${i}"
				@input="${t=>h(t,"a")}"
			>
		</label>
	`:""}
		</div>
	`}
		${c`
		<button
			class="cp-copy-button"
			type="button"
			@click="${n}"
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
		${c`
		<div class="cp-color-input-wrapper">
			<div class="cp-color-input-group">
				${"hex"===e?(()=>{const e="hide"===o&&[5,9].includes(r.hex.length)?r.hex.slice(0,-(r.hex.length-1)/4):r.hex;return c`
			<label
				class="cp-hex-input-label"
				for="${t}-color-hex"
			>
				<span class="cp-color-input-label-text">Hex</span>

				<input
					class="cp-color-input"
					id="${t}-color-hex"
					type="text"
					.value="${e}"
					@input="${b}"
				>
			</label>
		`})():(g=e,g.split("").concat("show"===o?["a"]:[]).map((e=>{const o=a[g][e].to(r[g][e]);return c`
				<label
					class="cp-color-input-label"
					id="${t}-color-${g}-${e}-label"
					for="${t}-color-${g}-${e}"
				>
					<span class="cp-color-input-label-text">${e.toUpperCase()}</span>

					<input
						class="cp-color-input"
						id="${t}-color-${g}-${e}"
						type="text"
						.value="${o}"
						@input="${t=>d(t,e)}"
					>
				</label>
			`})))}
			</div>
			${s.length>1?c`
		<button
			class="cp-switch-format-button"
			type="button"
			@click="${m}"
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
	`;var g}function p(t){const e=[],r=t.length>5?2:1;for(let o=1;o<t.length;o+=r){const s=t.substring(o,o+r).repeat(r%2+1),i=parseInt(s,16);e.push(o===3*r+1?i/255:i)}return 3===e.length&&e.push(1),{r:e[0],g:e[1],b:e[2],a:e[3]}}function m(t){const e=t.l/100,r=e+t.s/100*Math.min(e,1-e),o=0===r?0:200*(1-e/r);return{h:t.h,s:o,v:100*r,a:t.a}}function d(t){let e=t.h%360;e<0&&(e+=360);const r=t.s/100,o=t.l/100;return{r:255*b(0,e,r,o),g:255*b(8,e,r,o),b:255*b(4,e,r,o),a:t.a}}function b(t,e,r,o){const s=(t+e/30)%12;return o-r*Math.min(o,1-o)*Math.max(-1,Math.min(s-3,9-s,1))}function g(t){const e=t.s/100,r=t.v/100,o=r*(1-e/2);return{h:t.h,s:0===o||1===o?0:(r-o)/Math.min(o,1-o)*100,l:100*o,a:t.a}}function v(t){return{h:t.h,w:t.v*(100-t.s)/100,b:100-t.v,a:t.a}}function f(t){return d(g(t))}function w(t){const e=t.w/100,r=t.b/100;let o,s;const i=e+r;return i>=1?(o=0,s=e/i):(s=1-r,o=100*(1-e/s)),{h:t.h,s:o,v:100*s,a:t.a}}function y(t){const{r:e,g:r,b:o,a:s}=t,i=Math.min(e,r,o),n=Math.max(e,r,o),h=n-i,l=(n+i)/2;let a=0;0!==h&&(n===e?a=(r-o)/h+(r<o?6:0):n===r?a=(o-e)/h+2:n===o&&(a=(e-r)/h+4),a*=60);let c=0;return 0!==l&&255!==l&&(c=(n-l)/Math.min(l,255-l)),{h:a,s:100*c,l:l/255*100,a:s}}function C(t){return"#"+Object.values(t).map(((t,e)=>Math.round(3===e?255*t:t).toString(16).padStart(2,"0"))).join("")}function x(t){return v(m(y(t)))}var $={hex:{hex:t=>t,hsl:t=>y(p(t)),hsv:t=>w(x(p(t))),hwb:t=>x(p(t)),rgb:p},hsl:{hex:t=>C(d(t)),hsl:t=>t,hsv:m,hwb:t=>x(d(t)),rgb:d},hsv:{hex:t=>C(f(t)),hsl:g,hsv:t=>t,hwb:v,rgb:f},hwb:{hex:t=>C(f(w(t))),hsl:t=>y(f(w(t))),hsv:w,hwb:t=>t,rgb:t=>f(w(t))},rgb:{hex:C,hsl:y,hsv:t=>w(x(t)),hwb:x,rgb:t=>t}};function F(t,e,r){return $[t][e](r)}function T({format:t,color:e},o){switch(t){case"hex":return o&&[5,9].includes(e.length)?e.substring(0,e.length-(e.length-1)/4):e;case"hsl":return`hsl(${r(e.h)} ${r(e.s)}% ${r(e.l)}%`+(o?")":` / ${r(e.a)})`);case"hwb":return`hwb(${r(e.h)} ${r(e.w)}% ${r(e.b)}%`+(o?")":` / ${r(e.a)})`);case"rgb":return`rgb(${r(e.r)} ${r(e.g)} ${r(e.b)}`+(o?")":` / ${r(e.a)})`)}}function S(t){return/^#(?:(?:[A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(t)}var I={hsl:["h","s","l","a"],hwb:["h","w","b","a"],rgb:["r","g","b","a"]};var M={"alpha-channel":{type:String,property:"alphaChannel"},color:{type:String,property:"color"},"default-format":{type:String,property:"defaultFormat"},id:{type:String,property:"id"},"visible-formats":{type:Array,property:"visibleFormats"}},A=["hex","hsl","hsv","hwb","rgb"],k=class r extends HTMLElement{static observedAttributes=Object.keys(M);static{void 0===window.customElements.get("color-picker")&&window.customElements.define("color-picker",r)}#t="hsl";#e="show";#r="#ffffffff";#o="hsl";#s="color-picker";#i=["hex","hsl","hwb","rgb"];#n=null;#h=null;#l=!1;#a={hex:"#ffffffff",hsl:{h:0,s:0,l:100,a:1},hsv:{h:0,s:0,v:100,a:1},hwb:{h:0,w:100,b:0,a:1},rgb:{r:255,g:255,b:255,a:1}};#c=0;get[Symbol.toStringTag](){return"ColorPicker"}get activeFormat(){return this.#t}set activeFormat(t){this.#t=t,this.#u((()=>{this.#p()}))}get alphaChannel(){return this.#e}set alphaChannel(t){this.#e=t,this.#u((()=>{this.#p()}))}get color(){return this.#r}set color(t){this.#r=t,this.#u((()=>{this.#m(),this.#p()}))}get colors(){return this.#a}set colors(t){this.#a=t,this.#u((()=>{this.#p(),this.#d()}))}get defaultFormat(){return this.#o}set defaultFormat(t){this.#o=t}get id(){return this.#s}set id(t){this.#s=t,this.#u((()=>{this.#p()}))}get visibleFormats(){return this.#i}set visibleFormats(t){this.#i=t}connectedCallback(){this.isConnected&&(this.ownerDocument.addEventListener("mousemove",this.#b,{passive:!1}),this.ownerDocument.addEventListener("touchmove",this.#g,{passive:!1}),this.ownerDocument.addEventListener("mouseup",this.#v),this.ownerDocument.addEventListener("touchend",this.#v),this.activeFormat=this.visibleFormats.includes(this.defaultFormat)?this.defaultFormat:this.visibleFormats[0])}disconnectedCallback(){this.ownerDocument.removeEventListener("mousemove",this.#b),this.ownerDocument.removeEventListener("touchmove",this.#g),this.ownerDocument.removeEventListener("mouseup",this.#v),this.ownerDocument.removeEventListener("touchend",this.#v)}attributeChangedCallback(t,e,r){e!==r&&this.#f(t)}#f(t){const{property:e,type:r}=M[t],o=this.getAttribute(t);let s;if(null!==o){if(r===Array)s=o.split(",").map((t=>t.trim()));else s=o;this[e]!==s&&Reflect.set(this,e,s)}}#m(){const t=function(t){if("string"!=typeof t){const e=function(t){return"r"in t?"rgb":"w"in t?"hwb":"v"in t?"hsv":"s"in t?"hsl":null}(t);return null===e?null:{format:e,color:t}}if(t.startsWith("#"))return S(t)?{format:"hex",color:t}:null;if(!t.includes("(")){const e=document.createElement("canvas").getContext("2d");e.fillStyle=t;const r=e.fillStyle;return"#000000"===r&&"black"!==t?null:{format:"hex",color:r}}const[e,r]=t.split("("),o=e.substring(0,3);if(!(o in I))return null;const s=r.replace(/[,/)]/g," ").replace(/\s+/g," ").trim().split(" ");3===s.length&&s.push("1");const i=I[o],n=Object.fromEntries(i.map(((t,e)=>[t,a[o][t].from(s[e])])));return{format:o,color:n}}(this.color);null!==t&&this.#w(t)}#w({format:t,color:e}){let r=e;if("hide"===this.alphaChannel)if("string"!=typeof e)e.a=1,r=e;else if([5,9].includes(e.length)){const t=(e.length-1)/4;r=e.substring(0,e.length-t)+"f".repeat(t)}else[4,7].includes(e.length)&&(r=e+"f".repeat((e.length-1)/3));if(!function(t,e){if("string"==typeof t||"string"==typeof e)return t===e;for(const r in t)if(t[r]!==e[r])return!1;return!0}(this.colors[t],r)){const e={};e[t]=r;for(const o of A)o!==t&&(e[o]=F(t,o,r));this.colors=e}}#d(){const t=this.#y(),e=new CustomEvent("color-change",{detail:t});this.dispatchEvent(e)}#y(){const t="hide"===this.alphaChannel,e=T({color:this.#a[this.activeFormat],format:this.activeFormat},t);return{colors:this.colors,cssColor:e}}#C(){this.style.setProperty("--cp-hsl-h",String(this.colors.hsl.h)),this.style.setProperty("--cp-hsl-s",String(this.colors.hsl.s)),this.style.setProperty("--cp-hsl-l",String(this.colors.hsl.l)),this.style.setProperty("--cp-hsl-a",String(this.colors.hsl.a)),null!==this.#n&&null!==this.#h&&(this.#n.style.position="relative",this.#n.style.backgroundColor="hsl(var(--cp-hsl-h) 100% 50%)",this.#n.style.backgroundImage="linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",this.#h.style.boxSizing="border-box",this.#h.style.position="absolute",this.#h.style.left=`${this.colors.hsv.s}%`,this.#h.style.bottom=`${this.colors.hsv.v}%`)}#u(t){this.#c++,queueMicrotask(t)}#p(){this.#c--,0===this.#c&&this.#x()}#x(){if(!this.isConnected)return;const e=u(this.id,this.activeFormat,this.colors,this.alphaChannel,this.visibleFormats,this.#$,this.#F,this.#T,this.#S,this.#I,this.#M,this.#A,this.#k,this.#E);this.classList.add("cp-color-picker"),t(e,this),this.#n=this.querySelector(".cp-color-space"),this.#h=this.querySelector(".cp-thumb"),this.#C()}#I=t=>{this.#l=!0,this.#b(t)};#b=t=>{1===t.buttons&&!1!==this.#l&&this.#n instanceof HTMLElement&&this.#N(this.#n,t.clientX,t.clientY)};#M=t=>{this.#l=!0,this.#g(t)};#g=t=>{if(!1===this.#l||!(this.#n instanceof HTMLElement))return;t.preventDefault();const e=t.touches[0];this.#N(this.#n,e.clientX,e.clientY)};#N(t,r,o){const s=function(t,r,o){const s=t.getBoundingClientRect(),i=r-s.left,n=o-s.top;return{x:0===s.width?0:e(i/s.width*100,0,100),y:0===s.height?0:e(100*(1-n/s.height),0,100)}}(t,r,o),i=Object.assign({},this.colors.hsv);i.s=s.x,i.v=s.y,this.#w({format:"hsv",color:i})}#v=()=>{this.#l=!1};#S=t=>{if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(t.key))return;t.preventDefault();const r=["ArrowLeft","ArrowDown"].includes(t.key)?-1:1,o=["ArrowLeft","ArrowRight"].includes(t.key)?"s":"v",s=t.shiftKey?10:1,i=this.colors.hsv[o]+r*s,n=Object.assign({},this.colors.hsv);n[o]=e(i,0,100),this.#w({format:"hsv",color:n})};#$=t=>{if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(t.key)||!t.shiftKey)return;const r=t.currentTarget,o=Number(r.step),s=["ArrowLeft","ArrowDown"].includes(t.key)?-1:1,i=e(Number(r.value)+s*o*10,Number(r.min),Number(r.max));r.value=String(i-s*o)};#T=(t,e)=>{const r=t.currentTarget,o=Object.assign({},this.colors.hsv);o[e]=Number(r.value),this.#w({format:"hsv",color:o})};#E=t=>{const e=t.target;S(e.value)&&this.#w({format:"hex",color:e.value})};#k=(t,e)=>{const r=t.target,o=this.activeFormat,s=Object.assign({},this.#a[o]),i=a[o][e].from(r.value);Number.isNaN(i)||(s[e]=i,this.#w({format:o,color:s}))};copyColor(){return this.#F()}#F=()=>{const t=this.#a[this.activeFormat],e="hide"===this.alphaChannel,r=T({color:t,format:this.activeFormat},e);return window.navigator.clipboard.writeText(r)};switchFormat(){return this.#A()}#A=()=>{const t=(this.visibleFormats.findIndex((t=>t===this.activeFormat))+1)%this.visibleFormats.length;this.activeFormat=this.visibleFormats[t]}};export{k as ColorPicker};