import{html as t,nothing as e,render as s}from"lit-html";function i(t,e,s){return Math.max(e,Math.min(t,s))}var r={deg:1,grad:.9,rad:180/Math.PI,turn:360},a={from:t=>t.endsWith("%")?l.from(t,{referenceValue:1}):o.from(t,{min:0,max:1}),to:t=>o.to(t)},n={from(t){const e=t.match(/deg|g?rad|turn$/);if(null===e)return o.from(t);const s=e[0];return o.from(t.slice(0,-s.length))*r[s]},to:t=>o.to(t)},o={from:(t,{min:e=Number.NEGATIVE_INFINITY,max:s=Number.POSITIVE_INFINITY}={})=>t.endsWith(".")?NaN:i(Number(t),e,s),to:t=>function(t,e){const s=t.toFixed(e);return s.includes(".")?s.replace(/\.?0+$/,""):s}(t,2)},l={from(t,{referenceValue:e=100,min:s=0,max:i=100}={}){if(!t.endsWith("%"))return NaN;return o.from(t.slice(0,-1),{min:s,max:i})*e/100},to:t=>o.to(t)+"%"},h={from:t=>t.endsWith("%")?l.from(t,{referenceValue:255}):o.from(t,{min:0,max:255}),to:t=>o.to(t)},u={hsl:{h:n,s:l,l,a},hwb:{h:n,w:l,b:l,a},rgb:{r:h,g:h,b:h,a}};function c(t,e){return u[t][e]}function d(t){const e=[],s=t.length>5?2:1;for(let i=1;i<t.length;i+=s){const r=t.substring(i,i+s).repeat(s%2+1),a=parseInt(r,16);e.push(i===3*s+1?a/255:a)}return 3===e.length&&e.push(1),{r:e[0],g:e[1],b:e[2],a:e[3]}}function p(t){const e=t.l/100,s=e+t.s/100*Math.min(e,1-e),i=0===s?0:200*(1-e/s);return{h:t.h,s:i,v:100*s,a:t.a}}function m(t){let e=t.h%360;e<0&&(e+=360);const s=t.s/100,i=t.l/100;return{r:255*b(0,e,s,i),g:255*b(8,e,s,i),b:255*b(4,e,s,i),a:t.a}}function b(t,e,s,i){const r=(t+e/30)%12;return i-s*Math.min(i,1-i)*Math.max(-1,Math.min(r-3,9-r,1))}function g(t){const e=t.s/100,s=t.v/100,i=s*(1-e/2);return{h:t.h,s:0===i||1===i?0:(s-i)/Math.min(i,1-i)*100,l:100*i,a:t.a}}function v(t){return{h:t.h,w:t.v*(100-t.s)/100,b:100-t.v,a:t.a}}function f(t){return m(g(t))}function y(t){const e=t.w/100,s=t.b/100;let i,r;const a=e+s;return a>=1?(i=0,r=e/a):(r=1-s,i=100*(1-e/r)),{h:t.h,s:i,v:100*r,a:t.a}}function w(t){const{r:e,g:s,b:i,a:r}=t,a=Math.min(e,s,i),n=Math.max(e,s,i),o=n-a,l=(n+a)/2;let h=0;0!==o&&(n===e?h=(s-i)/o+(s<i?6:0):n===s?h=(i-e)/o+2:n===i&&(h=(e-s)/o+4),h*=60);let u=0;return 0!==l&&255!==l&&(u=(n-l)/Math.min(l,255-l)),{h,s:100*u,l:l/255*100,a:r}}function $(t){return"#"+Object.values(t).map(((t,e)=>Math.round(3===e?255*t:t).toString(16).padStart(2,"0"))).join("")}function x(t){return v(p(w(t)))}var C={hex:{hex:t=>t,hsl:t=>w(d(t)),hsv:t=>y(x(d(t))),hwb:t=>x(d(t)),rgb:d},hsl:{hex:t=>$(m(t)),hsl:t=>t,hsv:p,hwb:t=>x(m(t)),rgb:m},hsv:{hex:t=>$(f(t)),hsl:g,hsv:t=>t,hwb:v,rgb:f},hwb:{hex:t=>$(f(y(t))),hsl:t=>w(f(y(t))),hsv:y,hwb:t=>t,rgb:t=>f(y(t))},rgb:{hex:$,hsl:w,hsv:t=>y(x(t)),hwb:x,rgb:t=>t}};function S(t,e,s){return C[t][e](s)}function T({format:t,color:e},s){if("hex"===t)return s&&[5,9].includes(e.length)?e.substring(0,e.length-(e.length-1)/4):e;const i=Object.entries(e).slice(0,s?3:4).map((([e,s])=>("a"===e?"/ ":"")+c(t,e).to(s)));return`${t}(${i.join(" ")})`}function I(t,e,s){const r=t.getBoundingClientRect(),a=e-r.left,n=s-r.top;return{x:0===r.width?0:i(a/r.width*100,0,100),y:0===r.height?0:i(100*(1-n/r.height),0,100)}}function A(t){return/^#(?:(?:[A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(t)}var M={hsl:["h","s","l","a"],hwb:["h","w","b","a"],rgb:["r","g","b","a"]};var V=class extends HTMLElement{static formAssociated=!0;#t=this.attachInternals();get labels(){return this.#t.labels}get form(){return this.#t.form}get shadowRoot(){return this.#t.shadowRoot}get type(){return this.tagName.toLowerCase()}get validationMessage(){return this.#t.validationMessage}get validity(){return this.#t.validity}get willValidate(){return this.#t.willValidate}checkValidity(){return this.#t.checkValidity()}reportValidity(){return this.#t.reportValidity()}setFormValue(...t){this.#t.setFormValue(...t)}},k={"alpha-channel":{type:String,property:"alphaChannel"},disabled:{type:Boolean,property:"disabled"},format:{type:String,property:"format"},id:{type:String,property:"id",reflected:!0},name:{type:String,property:"name",reflected:!0},readonly:{type:Boolean,property:"readOnly"},value:{type:String,property:"defaultValue"},"visible-formats":{type:Array,property:"visibleFormats"}},E=["hex","hsl","hsv","hwb","rgb"],F=class r extends V{static observedAttributes=Object.keys(k);static{void 0===window.customElements.get("color-picker")&&window.customElements.define("color-picker",r)}#e=!1;#s=!1;#i={hex:"#ffffffff",hsl:{h:0,s:0,l:100,a:1},hsv:{h:0,s:0,v:100,a:1},hwb:{h:0,w:100,b:0,a:1},rgb:{r:255,g:255,b:255,a:1}};#r="show";#a="hsl";#n=["hex","hsl","hwb","rgb"];#o=null;#l=null;#h=!1;#u=0;get[Symbol.toStringTag](){return"ColorPicker"}get alphaChannel(){return this.#r}set alphaChannel(t){this.#r=t,this.#c((()=>{this.#d()}))}get defaultValue(){return this.getAttribute("value")??""}set defaultValue(t){this.setAttribute("value",t),this.#e||this.#p(t,{isUserTriggered:!1})}get disabled(){return this.hasAttribute("disabled")}set disabled(t){t?this.setAttribute("disabled",""):this.removeAttribute("disabled"),this.#c((()=>{this.#d()}))}get disabledState(){return this.disabled||this.#s}set disabledState(t){this.#s=t,this.#c((()=>{this.#d()}))}get format(){return this.#a}set format(t){t=t||"hsl",this.#a=this.visibleFormats.includes(t)?t:this.visibleFormats[0],this.#c((()=>{this.#d()}))}get name(){return this.getAttribute("name")??""}set name(t){this.setAttribute("name",t)}get id(){return this.getAttribute("id")??"color-picker"}set id(t){this.setAttribute("id",t),this.#c((()=>{this.#d()}))}get readOnly(){return this.hasAttribute("readonly")}set readOnly(t){t?this.setAttribute("readonly",""):this.removeAttribute("readonly"),this.#c((()=>{this.#d()}))}get required(){return this.hasAttribute("required")}set required(t){t?this.setAttribute("required",""):this.removeAttribute("required")}get value(){return T({format:"rgb",color:this.#i.rgb},!1)}set value(t){this.#p(t,{isUserTriggered:!0})}#p(t,{isUserTriggered:e}){const s=function(t){if("string"!=typeof t){const e=function(t){return"r"in t?"rgb":"w"in t?"hwb":"v"in t?"hsv":"s"in t?"hsl":null}(t);return null===e?null:{format:e,color:t}}if(t.startsWith("#"))return A(t)?{format:"hex",color:t}:null;if(!t.includes("(")){const e=document.createElement("canvas").getContext("2d");e.fillStyle=t;const s=e.fillStyle;return"#000000"===s&&"black"!==t?null:{format:"hex",color:s}}const[e,s]=t.split("("),i=e.substring(0,3);if(!(i in M))return null;const r=s.replace(/[,/)]/g," ").replace(/\s+/g," ").trim().split(" ");3===r.length&&r.push("1");const a=M[i],n=Object.fromEntries(a.map(((t,e)=>[t,c(i,t).from(r[e])])));return{format:i,color:n}}(t);if(null===s)return;if(e&&(this.#e=!0),function(t,e){if("string"==typeof t||"string"==typeof e)return t===e;for(const s in t)if(t[s]!==e[s])return!1;return!0}(this.#i[s.format],s.color))return;const i={[s.format]:s.color};for(const t of E)t!==s.format&&(i[t]=S(s.format,t,s.color));this.#i=i,this.setFormValue(this.value),this.#c((()=>{this.#d(),this.#m("color-change"),e&&(this.dispatchEvent(new Event("input")),this.dispatchEvent(new Event("change")))}))}get visibleFormats(){return this.#n}set visibleFormats(t){this.#n=t,this.format=this.#a}constructor(){super(),this.setFormValue(this.value)}connectedCallback(){this.isConnected&&(this.ownerDocument.addEventListener("mousemove",this.#b,{passive:!1}),this.ownerDocument.addEventListener("touchmove",this.#g,{passive:!1}),this.ownerDocument.addEventListener("mouseup",this.#v),this.ownerDocument.addEventListener("touchend",this.#v),this.#f())}disconnectedCallback(){this.ownerDocument.removeEventListener("mousemove",this.#b),this.ownerDocument.removeEventListener("touchmove",this.#g),this.ownerDocument.removeEventListener("mouseup",this.#v),this.ownerDocument.removeEventListener("touchend",this.#v)}attributeChangedCallback(t,e,s){if(s!==e){let e;const{property:i,type:r,reflected:a=!1}=k[t];switch(r){case Array:e=null!==s?s.split(",").map((t=>t.trim())):null;break;case Boolean:e=null!==s;break;default:e=s}null===s&&a||(this[i]=e)}}formDisabledCallback(t){this.disabledState=t}formResetCallback(){this.#e=!1,this.#p(this.defaultValue||"#ffffffff",{isUserTriggered:!1})}#m(t){const e="hide"===this.alphaChannel,s=T({color:this.#i[this.format],format:this.format},e);let i;const{hex:r,hsl:a,hwb:n,rgb:o}=this.#i;if("hide"===this.alphaChannel){const t=this.#i.hex.length-1,e=t%4==0,s=t/(e?4:3);i={hex:this.#i.hex.substring(0,this.#i.hex.length-(e?s:0))+"f".repeat(s),hsl:{...a,a:1},hwb:{...n,a:1},rgb:{...o,a:1}}}else i={hex:r,hsl:a,hwb:n,rgb:o};this.dispatchEvent(new CustomEvent(t,{detail:{colors:i,cssColor:s}}))}#y(){const t={...this.#i.rgb,a:1};this.style.setProperty("--cp-color",T({format:"rgb",color:t},!1)),null!==this.#o&&null!==this.#l&&(this.#o.style.position="relative",this.#o.style.backgroundColor=`hsl(${this.#i.hsl.h} 100% 50%)`,this.#o.style.backgroundImage="linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",this.#l.style.boxSizing="border-box",this.#l.style.position="absolute",this.#l.style.left=`${this.#i.hsv.s}%`,this.#l.style.bottom=`${this.#i.hsv.v}%`)}#c(t){this.#u++,queueMicrotask(t)}#d(){this.#u--,0===this.#u&&this.#f()}#f(){this.isConnected&&(this.classList.add("cp-color-picker"),s(this.#w(),this),this.#o=this.querySelector(".cp-color-space"),this.#l=this.querySelector(".cp-thumb"),this.#y())}#w(){const s="👽",i=()=>t`<label
			class="cp-range-input-label cp-range-input-label--hue"
			for="${this.id}-hue-slider"
		>
			<span class="cp-range-input-label-text cp-range-input-label-text--hue">Hue</span>

			<input
				form="${s}"
				class="cp-range-input cp-range-input--hue"
				id="${this.id}-hue-slider"
				type="range"
				min="0"
				max="360"
				step="1"
				.value="${this.#i.hsl.h}"
				?disabled="${this.disabledState}"
				?readonly="${this.readOnly}"
				@keydown="${this.#$}"
				@input="${t=>this.#x(t,"h")}"
			>
		</label>`,r=()=>t`<label
			class="cp-range-input-label cp-range-input-label--alpha"
			for="${this.id}-alpha-slider"
		>
			<span class="cp-range-input-label-text cp-range-input-label-text--alpha">Alpha</span>

			<input
				form="${s}"
				class="cp-range-input cp-range-input--alpha"
				id="${this.id}-alpha-slider"
				type="range"
				min="0"
				max="1"
				step="0.01"
				.value="${this.#i.hsl.a}"
				?disabled="${this.disabledState}"
				?readonly="${this.readOnly}"
				@keydown="${this.#$}"
				@input="${t=>this.#x(t,"a")}"
			>
		</label>`,a=()=>{const e=this.#i.hex,i="hide"===this.alphaChannel&&[5,9].includes(e.length)?e.slice(0,-(e.length-1)/4):e;return t`<label
				class="cp-hex-input-label"
				for="${this.id}-color-hex"
			>
				<span class="cp-color-input-label-text">Hex</span>

				<input
					form="${s}"
					class="cp-color-input"
					id="${this.id}-color-hex"
					type="text"
					.value="${i}"
					?disabled="${this.disabledState}"
					?readonly="${this.readOnly}"
					@change="${this.#C}"
				>
			</label>`},n=e=>e.split("").concat("show"===this.alphaChannel?["a"]:[]).map((i=>{const r=c(e,i).to(this.#i[e][i]);return t`<label
					class="cp-color-input-label"
					id="${this.id}-color-${e}-${i}-label"
					for="${this.id}-color-${e}-${i}"
				>
					<span class="cp-color-input-label-text">${i.toUpperCase()}</span>

					<input
						form="${s}"
						class="cp-color-input"
						id="${this.id}-color-${e}-${i}"
						type="text"
						.value="${r}"
						?disabled="${this.disabledState}"
						?readonly="${this.readOnly}"
						@change="${t=>this.#S(t,i)}"
					>
				</label>`})),o=()=>t`<button
			class="cp-switch-format-button"
			type="button"
			?disabled="${this.disabledState}"
			@click="${this.#T}"
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
			@mousedown="${this.#I}"
			@touchstart="${this.#A}"
		>
			<div
				class="cp-thumb"
				tabIndex="${this.disabledState?e:"0"}"
				aria-label="Color space thumb"
				@keydown="${this.#M}"
			></div>
		</div>`)()}
			${(()=>t`<div class="cp-range-input-group">
			${i()}
			${"show"===this.alphaChannel?r():""}
		</div>`)()}
			${(()=>t`<button
			class="cp-copy-button"
			type="button"
			?disabled="${this.disabledState}"
			@click="${this.#V}"
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
				${"hex"===this.format?a():n(this.format)}
			</div>
			${this.visibleFormats.length>1?o():""}
		</div>`)()}
		`}#I=t=>{this.#h=!0,this.#b(t)};#b=t=>{1===t.buttons&&!1!==this.#h&&this.#o instanceof HTMLElement&&!this.disabledState&&!this.readOnly&&this.#k(I(this.#o,t.clientX,t.clientY))};#A=t=>{this.#h=!0,this.#g(t)};#g=t=>{if(!1===this.#h||!(this.#o instanceof HTMLElement)||this.disabledState||this.readOnly)return;t.preventDefault();const e=t.touches[0];this.#k(I(this.#o,e.clientX,e.clientY))};#k({x:t,y:e}){const s=Object.assign({},this.#i.hsv);s.s=t,s.v=e,this.#p(s,{isUserTriggered:!0})}#v=()=>{this.#h=!1};#M=t=>{if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(t.key)||!(this.#o instanceof HTMLElement)||this.disabledState||this.readOnly)return;t.preventDefault();const e=["ArrowLeft","ArrowDown"].includes(t.key)?-1:1,s=["ArrowLeft","ArrowRight"].includes(t.key)?"s":"v",r=t.shiftKey?10:1,{s:a,v:n}=this.#i.hsv,o="s"===s?i(a+e*r,0,100):a,l="v"===s?i(n+e*r,0,100):n;this.#k({x:o,y:l})};#$=t=>{if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(t.key)||!t.shiftKey)return;const e=t.currentTarget,s=Number(e.step),r=["ArrowLeft","ArrowDown"].includes(t.key)?-1:1,a=i(Number(e.value)+r*s*10,Number(e.min),Number(e.max));e.value=String(a-r*s)};#x=(t,e)=>{const s=t.currentTarget,i=Object.assign({},this.#i.hsl);i[e]=Number(s.value),this.#p(i,{isUserTriggered:!0})};#C=t=>{const e=t.target;A(e.value)&&this.#p(e.value,{isUserTriggered:!0})};#S=(t,e)=>{const s=t.target,i=this.format,r=Object.assign({},this.#i[i]),a=c(i,e).from(s.value);Number.isNaN(a)||(r[e]=a,this.#p(r,{isUserTriggered:!0}))};copyColor(){return this.#V()}#V=async()=>{const t="hide"===this.alphaChannel,e=T({color:this.#i[this.format],format:this.format},t);await window.navigator.clipboard.writeText(e),this.#m("color-copy")};switchFormat(){return this.#T()}#T=()=>{const t=(this.visibleFormats.findIndex((t=>t===this.format))+1)%this.visibleFormats.length;this.format=this.visibleFormats[t]}};export{F as ColorPicker};