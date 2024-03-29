import{html as t,render as e}from"lit-html";function o(t,e,o){return Math.max(e,Math.min(t,o))}var s={deg:1,grad:.9,rad:180/Math.PI,turn:360},r={from:t=>t.endsWith("%")?h.from(t,{referenceValue:1}):n.from(t,{min:0,max:1}),to:t=>n.to(t)},i={from(t){const e=t.match(/deg|g?rad|turn$/);if(null===e)return n.from(t);const o=e[0];return n.from(t.slice(0,-o.length))*s[o]},to:t=>n.to(t)},n={from:(t,{min:e=Number.NEGATIVE_INFINITY,max:s=Number.POSITIVE_INFINITY}={})=>t.endsWith(".")?NaN:o(Number(t),e,s),to:t=>function(t,e){const o=t.toFixed(e);return o.includes(".")?o.replace(/\.?0+$/,""):o}(t,2)},h={from(t,{referenceValue:e=100,min:o=0,max:s=100}={}){if(!t.endsWith("%"))return NaN;return n.from(t.slice(0,-1),{min:o,max:s})*e/100},to:t=>n.to(t)+"%"},a={from:t=>t.endsWith("%")?h.from(t,{referenceValue:255}):n.from(t,{min:0,max:255}),to:t=>n.to(t)},l={hsl:{h:i,s:h,l:h,a:r},hwb:{h:i,w:h,b:h,a:r},rgb:{r:a,g:a,b:a,a:r}};function c(t,e){return l[t][e]}function u(t){const e=[],o=t.length>5?2:1;for(let s=1;s<t.length;s+=o){const r=t.substring(s,s+o).repeat(o%2+1),i=parseInt(r,16);e.push(s===3*o+1?i/255:i)}return 3===e.length&&e.push(1),{r:e[0],g:e[1],b:e[2],a:e[3]}}function p(t){const e=t.l/100,o=e+t.s/100*Math.min(e,1-e),s=0===o?0:200*(1-e/o);return{h:t.h,s,v:100*o,a:t.a}}function m(t){let e=t.h%360;e<0&&(e+=360);const o=t.s/100,s=t.l/100;return{r:255*d(0,e,o,s),g:255*d(8,e,o,s),b:255*d(4,e,o,s),a:t.a}}function d(t,e,o,s){const r=(t+e/30)%12;return s-o*Math.min(s,1-s)*Math.max(-1,Math.min(r-3,9-r,1))}function b(t){const e=t.s/100,o=t.v/100,s=o*(1-e/2);return{h:t.h,s:0===s||1===s?0:(o-s)/Math.min(s,1-s)*100,l:100*s,a:t.a}}function v(t){return{h:t.h,w:t.v*(100-t.s)/100,b:100-t.v,a:t.a}}function f(t){return m(b(t))}function g(t){const e=t.w/100,o=t.b/100;let s,r;const i=e+o;return i>=1?(s=0,r=e/i):(r=1-o,s=100*(1-e/r)),{h:t.h,s,v:100*r,a:t.a}}function w(t){const{r:e,g:o,b:s,a:r}=t,i=Math.min(e,o,s),n=Math.max(e,o,s),h=n-i,a=(n+i)/2;let l=0;0!==h&&(n===e?l=(o-s)/h+(o<s?6:0):n===o?l=(s-e)/h+2:n===s&&(l=(e-o)/h+4),l*=60);let c=0;return 0!==a&&255!==a&&(c=(n-a)/Math.min(a,255-a)),{h:l,s:100*c,l:a/255*100,a:r}}function C(t){return"#"+Object.values(t).map(((t,e)=>Math.round(3===e?255*t:t).toString(16).padStart(2,"0"))).join("")}function y(t){return v(p(w(t)))}var x={hex:{hex:t=>t,hsl:t=>w(u(t)),hsv:t=>g(y(u(t))),hwb:t=>y(u(t)),rgb:u},hsl:{hex:t=>C(m(t)),hsl:t=>t,hsv:p,hwb:t=>y(m(t)),rgb:m},hsv:{hex:t=>C(f(t)),hsl:b,hsv:t=>t,hwb:v,rgb:f},hwb:{hex:t=>C(f(g(t))),hsl:t=>w(f(g(t))),hsv:g,hwb:t=>t,rgb:t=>f(g(t))},rgb:{hex:C,hsl:w,hsv:t=>g(y(t)),hwb:y,rgb:t=>t}};function $(t,e,o){return x[t][e](o)}function F({format:t,color:e},o){if("hex"===t)return o&&[5,9].includes(e.length)?e.substring(0,e.length-(e.length-1)/4):e;const s=Object.entries(e).slice(0,o?3:4).map((([e,o])=>("a"===e?"/ ":"")+c(t,e).to(o)));return`${t}(${s.join(" ")})`}function T(t){return/^#(?:(?:[A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(t)}var I={hsl:["h","s","l","a"],hwb:["h","w","b","a"],rgb:["r","g","b","a"]};var M={"alpha-channel":{type:String,property:"alphaChannel"},color:{type:String,property:"color"},"default-format":{type:String,property:"defaultFormat"},id:{type:String,property:"id"},"visible-formats":{type:Array,property:"visibleFormats"}},S=["hex","hsl","hsv","hwb","rgb"],A=class s extends HTMLElement{static observedAttributes=Object.keys(M);static{void 0===window.customElements.get("color-picker")&&window.customElements.define("color-picker",s)}#t="hsl";#e="show";#o="#ffffffff";#s="hsl";#r="color-picker";#i=["hex","hsl","hwb","rgb"];#n=null;#h=null;#a=!1;#l={hex:"#ffffffff",hsl:{h:0,s:0,l:100,a:1},hsv:{h:0,s:0,v:100,a:1},hwb:{h:0,w:100,b:0,a:1},rgb:{r:255,g:255,b:255,a:1}};#c=0;get[Symbol.toStringTag](){return"ColorPicker"}get activeFormat(){return this.#t}set activeFormat(t){this.#t=t,this.#u((()=>{this.#p()}))}get alphaChannel(){return this.#e}set alphaChannel(t){this.#e=t,this.#u((()=>{this.#p()}))}get color(){return this.#o}set color(t){this.#o=t,this.#u((()=>{this.#m(),this.#p()}))}get colors(){return this.#l}set colors(t){this.#l=t,this.#u((()=>{this.#p(),this.#d()}))}get defaultFormat(){return this.#s}set defaultFormat(t){this.#s=t}get id(){return this.#r}set id(t){this.#r=t,this.#u((()=>{this.#p()}))}get visibleFormats(){return this.#i}set visibleFormats(t){this.#i=t}connectedCallback(){this.isConnected&&(this.ownerDocument.addEventListener("mousemove",this.#b,{passive:!1}),this.ownerDocument.addEventListener("touchmove",this.#v,{passive:!1}),this.ownerDocument.addEventListener("mouseup",this.#f),this.ownerDocument.addEventListener("touchend",this.#f),this.activeFormat=this.visibleFormats.includes(this.defaultFormat)?this.defaultFormat:this.visibleFormats[0])}disconnectedCallback(){this.ownerDocument.removeEventListener("mousemove",this.#b),this.ownerDocument.removeEventListener("touchmove",this.#v),this.ownerDocument.removeEventListener("mouseup",this.#f),this.ownerDocument.removeEventListener("touchend",this.#f)}attributeChangedCallback(t,e,o){e!==o&&this.#g(t)}#g(t){const{property:e,type:o}=M[t],s=this.getAttribute(t);let r;if(null!==s){if(o===Array)r=s.split(",").map((t=>t.trim()));else r=s;this[e]!==r&&Reflect.set(this,e,r)}}#m(){const t=function(t){if("string"!=typeof t){const e=function(t){return"r"in t?"rgb":"w"in t?"hwb":"s"in t?"hsl":null}(t);return null===e?null:{format:e,color:t}}if(t.startsWith("#"))return T(t)?{format:"hex",color:t}:null;if(!t.includes("(")){const e=document.createElement("canvas").getContext("2d");e.fillStyle=t;const o=e.fillStyle;return"#000000"===o&&"black"!==t?null:{format:"hex",color:o}}const[e,o]=t.split("("),s=e.substring(0,3);if(!(s in I))return null;const r=o.replace(/[,/)]/g," ").replace(/\s+/g," ").trim().split(" ");3===r.length&&r.push("1");const i=I[s],n=Object.fromEntries(i.map(((t,e)=>[t,c(s,t).from(r[e])])));return{format:s,color:n}}(this.color);null!==t&&this.#w(t)}#w({format:t,color:e}){let o=e;if("hide"===this.alphaChannel)if("string"!=typeof e)e.a=1,o=e;else if([5,9].includes(e.length)){const t=(e.length-1)/4;o=e.substring(0,e.length-t)+"f".repeat(t)}else[4,7].includes(e.length)&&(o=e+"f".repeat((e.length-1)/3));if(!function(t,e){if("string"==typeof t||"string"==typeof e)return t===e;for(const o in t)if(t[o]!==e[o])return!1;return!0}(this.colors[t],o)){const e={};e[t]=o;for(const s of S)s!==t&&(e[s]=$(t,s,o));this.colors=e}}#d(){const t=this.#C(),e=new CustomEvent("color-change",{detail:t});this.dispatchEvent(e)}#C(){const t="hide"===this.alphaChannel,e=F({color:this.#l[this.activeFormat],format:this.activeFormat},t);return{colors:this.colors,cssColor:e}}#y(){const t=F({format:"hsl",color:this.colors.hsl},!1);this.style.setProperty("--cp-color",t),null!==this.#n&&null!==this.#h&&(this.#n.style.position="relative",this.#n.style.backgroundColor=`hsl(${this.colors.hsl.h} 100% 50%)`,this.#n.style.backgroundImage="linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",this.#h.style.boxSizing="border-box",this.#h.style.position="absolute",this.#h.style.left=`${this.colors.hsv.s}%`,this.#h.style.bottom=`${this.colors.hsv.v}%`)}#u(t){this.#c++,queueMicrotask(t)}#p(){this.#c--,0===this.#c&&this.#x()}#x(){this.isConnected&&(this.classList.add("cp-color-picker"),e(this.#$(),this),this.#n=this.querySelector(".cp-color-space"),this.#h=this.querySelector(".cp-thumb"),this.#y())}#$(){const e=()=>t`<label
			class="cp-range-input-label cp-range-input-label--hue"
			for="${this.id}-hue-slider"
		>
			<span class="cp-range-input-label-text cp-range-input-label-text--hue">Hue</span>

			<input
				class="cp-range-input cp-range-input--hue"
				id="${this.id}-hue-slider"
				type="range"
				min="0"
				max="360"
				step="1"
				.value="${this.colors.hsv.h}"
				@keydown="${this.#F}"
				@input="${t=>this.#T(t,"h")}"
			>
		</label>`,o=()=>t`<label
			class="cp-range-input-label cp-range-input-label--alpha"
			for="${this.id}-alpha-slider"
		>
			<span class="cp-range-input-label-text cp-range-input-label-text--alpha">Alpha</span>

			<input
				class="cp-range-input cp-range-input--alpha"
				id="${this.id}-alpha-slider"
				type="range"
				min="0"
				max="1"
				step="0.01"
				.value="${this.colors.hsv.a}"
				@keydown="${this.#F}"
				@input="${t=>this.#T(t,"a")}"
			>
		</label>`,s=()=>{const e="hide"===this.alphaChannel&&[5,9].includes(this.colors.hex.length)?this.colors.hex.slice(0,-(this.colors.hex.length-1)/4):this.colors.hex;return t`<label
				class="cp-hex-input-label"
				for="${this.id}-color-hex"
			>
				<span class="cp-color-input-label-text">Hex</span>

				<input
					class="cp-color-input"
					id="${this.id}-color-hex"
					type="text"
					.value="${e}"
					@input="${this.#I}"
				>
			</label>`},r=e=>e.split("").concat("show"===this.alphaChannel?["a"]:[]).map((o=>{const s=c(e,o).to(this.#l[e][o]);return t`<label
					class="cp-color-input-label"
					id="${this.id}-color-${e}-${o}-label"
					for="${this.id}-color-${e}-${o}"
				>
					<span class="cp-color-input-label-text">${o.toUpperCase()}</span>

					<input
						class="cp-color-input"
						id="${this.id}-color-${e}-${o}"
						type="text"
						.value="${s}"
						@input="${t=>this.#M(t,o)}"
					>
				</label>`})),i=()=>t`<button
			class="cp-switch-format-button"
			type="button"
			@click="${this.#S}"
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
		</button>`;return t`
			${(()=>t`<div
			class="cp-color-space"
			@mousedown="${this.#A}"
			@touchstart="${this.#k}"
		>
			<div
				class="cp-thumb"
				tabIndex="0"
				aria-label="Color space thumb"
				@keydown="${this.#E}"
			></div>
		</div>`)()}
			${(()=>t`<div class="cp-range-input-group">
			${e()}
			${"show"===this.alphaChannel?o():""}
		</div>`)()}
			${(()=>t`<button
			class="cp-copy-button"
			type="button"
			@click="${this.#N}"
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
		</button>`)()}
			${(()=>t`<div class="cp-color-input-wrapper">
			<div class="cp-color-input-group">
				${"hex"===this.activeFormat?s():r(this.activeFormat)}
			</div>
			${this.visibleFormats.length>1?i():""}
		</div>`)()}
		`}#A=t=>{this.#a=!0,this.#b(t)};#b=t=>{1===t.buttons&&!1!==this.#a&&this.#n instanceof HTMLElement&&this.#W(this.#n,t.clientX,t.clientY)};#k=t=>{this.#a=!0,this.#v(t)};#v=t=>{if(!1===this.#a||!(this.#n instanceof HTMLElement))return;t.preventDefault();const e=t.touches[0];this.#W(this.#n,e.clientX,e.clientY)};#W(t,e,s){const r=function(t,e,s){const r=t.getBoundingClientRect(),i=e-r.left,n=s-r.top;return{x:0===r.width?0:o(i/r.width*100,0,100),y:0===r.height?0:o(100*(1-n/r.height),0,100)}}(t,e,s),i=Object.assign({},this.colors.hsv);i.s=r.x,i.v=r.y,this.#w({format:"hsv",color:i})}#f=()=>{this.#a=!1};#E=t=>{if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(t.key))return;t.preventDefault();const e=["ArrowLeft","ArrowDown"].includes(t.key)?-1:1,s=["ArrowLeft","ArrowRight"].includes(t.key)?"s":"v",r=t.shiftKey?10:1,i=this.colors.hsv[s]+e*r,n=Object.assign({},this.colors.hsv);n[s]=o(i,0,100),this.#w({format:"hsv",color:n})};#F=t=>{if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(t.key)||!t.shiftKey)return;const e=t.currentTarget,s=Number(e.step),r=["ArrowLeft","ArrowDown"].includes(t.key)?-1:1,i=o(Number(e.value)+r*s*10,Number(e.min),Number(e.max));e.value=String(i-r*s)};#T=(t,e)=>{const o=t.currentTarget,s=Object.assign({},this.colors.hsv);s[e]=Number(o.value),this.#w({format:"hsv",color:s})};#I=t=>{const e=t.target;T(e.value)&&this.#w({format:"hex",color:e.value})};#M=(t,e)=>{const o=t.target,s=this.activeFormat,r=Object.assign({},this.#l[s]),i=c(s,e).from(o.value);Number.isNaN(i)||(r[e]=i,this.#w({format:s,color:r}))};copyColor(){return this.#N()}#N=()=>{const t=this.#l[this.activeFormat],e="hide"===this.alphaChannel,o=F({color:t,format:this.activeFormat},e);return window.navigator.clipboard.writeText(o)};switchFormat(){return this.#S()}#S=()=>{const t=(this.visibleFormats.findIndex((t=>t===this.activeFormat))+1)%this.visibleFormats.length;this.activeFormat=this.visibleFormats[t]}};export{A as ColorPicker};