var t,e=globalThis,s=e.trustedTypes,i=s?s.createPolicy("lit-html",{createHTML:t=>t}):void 0,o="$lit$",n=`lit$${(Math.random()+"").slice(9)}$`,r="?"+n,l=`<${r}>`,h=void 0===e.document?{createTreeWalker:()=>({})}:document,a=()=>h.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,p="[ \t\n\f\r]",d=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,m=/>/g,g=RegExp(`>|${p}(?:([^\\s"'>=/]+)(${p}*=${p}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),f=/'/g,b=/"/g,$=/^(?:script|style|textarea|title)$/i,A=t=>(e,...s)=>({_$litType$:t,strings:e,values:s}),y=A(1),_=(A(2),Symbol.for("lit-noChange")),w=Symbol.for("lit-nothing"),C=new WeakMap,x=h.createTreeWalker(h,129,null,!1);function T(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==i?i.createHTML(e):e}var F=class t{constructor({strings:e,_$litType$:i},h){let c;this.parts=[];let u=0,p=0;const A=e.length-1,y=this.parts,[_,w]=((t,e)=>{const s=t.length-1,i=[];let r,h=2===e?"<svg>":"",a=d;for(let e=0;e<s;e++){const s=t[e];let c,u,p=-1,A=0;for(;A<s.length&&(a.lastIndex=A,u=a.exec(s),null!==u);)A=a.lastIndex,a===d?"!--"===u[1]?a=v:void 0!==u[1]?a=m:void 0!==u[2]?($.test(u[2])&&(r=RegExp("</"+u[2],"g")),a=g):void 0!==u[3]&&(a=g):a===g?">"===u[0]?(a=null!=r?r:d,p=-1):void 0===u[1]?p=-2:(p=a.lastIndex-u[2].length,c=u[1],a=void 0===u[3]?g:'"'===u[3]?b:f):a===b||a===f?a=g:a===v||a===m?a=d:(a=g,r=void 0);const y=a===g&&t[e+1].startsWith("/>")?" ":"";h+=a===d?s+l:p>=0?(i.push(c),s.slice(0,p)+o+s.slice(p)+n+y):s+n+(-2===p?(i.push(void 0),e):y)}return[T(t,h+(t[s]||"<?>")+(2===e?"</svg>":"")),i]})(e,i);if(this.el=t.createElement(_,h),x.currentNode=this.el.content,2===i){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(c=x.nextNode())&&y.length<A;){if(1===c.nodeType){if(c.hasAttributes()){const t=[];for(const e of c.getAttributeNames())if(e.endsWith(o)||e.startsWith(n)){const s=w[p++];if(t.push(e),void 0!==s){const t=c.getAttribute(s.toLowerCase()+o).split(n),e=/([.?@])?(.*)/.exec(s);y.push({type:1,index:u,name:e[2],strings:t,ctor:"."===e[1]?H:"?"===e[1]?k:"@"===e[1]?E:N})}else y.push({type:6,index:u})}for(const e of t)c.removeAttribute(e)}if($.test(c.tagName)){const t=c.textContent.split(n),e=t.length-1;if(e>0){c.textContent=s?s.emptyScript:"";for(let s=0;s<e;s++)c.append(t[s],a()),x.nextNode(),y.push({type:2,index:++u});c.append(t[e],a())}}}else if(8===c.nodeType)if(c.data===r)y.push({type:2,index:u});else{let t=-1;for(;-1!==(t=c.data.indexOf(n,t+1));)y.push({type:7,index:u}),t+=n.length-1}u++}}static createElement(t,e){const s=h.createElement("template");return s.innerHTML=t,s}};function M(t,e,s=t,i){var o,n,r,l;if(e===_)return e;let h=void 0!==i?null===(o=s._$Co)||void 0===o?void 0:o[i]:s._$Cl;const a=c(e)?void 0:e._$litDirective$;return(null==h?void 0:h.constructor)!==a&&(null===(n=null==h?void 0:h._$AO)||void 0===n||n.call(h,!1),void 0===a?h=void 0:(h=new a(t),h._$AT(t,s,i)),void 0!==i?(null!==(r=(l=s)._$Co)&&void 0!==r?r:l._$Co=[])[i]=h:s._$Cl=h),void 0!==h&&(e=M(t,h._$AS(t,e.values),h,i)),e}var S=class t{constructor(t,e,s,i){var o;this.type=2,this._$AH=w,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cp=null===(o=null==i?void 0:i.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=M(this,t,e),c(t)?t===w||null==t||""===t?(this._$AH!==w&&this._$AR(),this._$AH=w):t!==this._$AH&&t!==_&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>u(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==w&&c(this._$AH)?this._$AA.nextSibling.data=t:this.$(h.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=F.createElement(T(i.h,i.h[0]),this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.v(s);else{const t=new class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:i}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:h).importNode(s,!0);x.currentNode=o;let n=x.nextNode(),r=0,l=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new S(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new P(n,this,t)),this._$AV.push(e),a=i[++l]}r!==(null==a?void 0:a.index)&&(n=x.nextNode(),r++)}return x.currentNode=h,o}v(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}(o,this),e=t.u(this.options);t.v(s),this.$(e),this._$AH=t}}_$AC(t){let e=C.get(t.strings);return void 0===e&&C.set(t.strings,e=new F(t)),e}T(e){u(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let i,o=0;for(const n of e)o===s.length?s.push(i=new t(this.k(a()),this.k(a()),this,this.options)):i=s[o],i._$AI(n),o++;o<s.length&&(this._$AR(i&&i._$AB.nextSibling,o),s.length=o)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}},N=class{constructor(t,e,s,i,o){this.type=1,this._$AH=w,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=w}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(void 0===o)t=M(this,t,e,0),n=!c(t)||t!==this._$AH&&t!==_,n&&(this._$AH=t);else{const i=t;let r,l;for(t=o[0],r=0;r<o.length-1;r++)l=M(this,i[s+r],e,r),l===_&&(l=this._$AH[r]),n||(n=!c(l)||l!==this._$AH[r]),l===w?t=w:t!==w&&(t+=(null!=l?l:"")+o[r+1]),this._$AH[r]=l}n&&!i&&this.j(t)}j(t){t===w?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}},H=class extends N{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===w?void 0:t}},I=s?s.emptyScript:"",k=class extends N{constructor(){super(...arguments),this.type=4}j(t){t&&t!==w?this.element.setAttribute(this.name,I):this.element.removeAttribute(this.name)}},E=class extends N{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=M(this,t,e,0))&&void 0!==s?s:w)===_)return;const i=this._$AH,o=t===w&&i!==w||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==w&&(i===w||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}},P=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}},W=e.litHtmlPolyfillSupport;null==W||W(F,S),(null!==(t=e.litHtmlVersions)&&void 0!==t?t:e.litHtmlVersions=[]).push("2.7.5");function L(t,e,s){return Math.max(e,Math.min(t,s))}function O(t,e=2){return t.toFixed(e).replace(/\.?0+$/,"")}function V(t){if(t.endsWith("."))return NaN;return(parseFloat(t)%360+360)%360/360}function R(t){return O(360*t)}function D(t){if(!t.endsWith("%"))return NaN;const e=t.substring(0,t.length-1);if(e.endsWith("."))return NaN;const s=parseFloat(e);return Number.isNaN(s)?NaN:L(s,0,100)/100}function j(t){return O(100*t)+"%"}function q(t){if(t.endsWith("%"))return D(t);if(t.endsWith("."))return NaN;const e=parseFloat(t);return Number.isNaN(e)?NaN:L(e,0,255)/255}function B(t){return O(255*t)}function U(t){return t.endsWith("%")?D(t):L(parseFloat(t),0,1)}function z(t){return String(t)}var Q={hsl:{h:{to:R,from:V},s:{to:j,from:D},l:{to:j,from:D},a:{to:z,from:U}},hwb:{h:{to:R,from:V},w:{to:j,from:D},b:{to:j,from:D},a:{to:z,from:U}},rgb:{r:{to:B,from:q},g:{to:B,from:q},b:{to:B,from:q},a:{to:z,from:U}}};function K(t,e,s,i,o,n,r,l,h,a,c,u,p,d,v,m,g){return y`
		${y`
		<div
			class="cp-color-space"
			@mousedown="${p}"
			@touchstart="${d}"
		>
			<div
				class="cp-thumb"
				tabIndex="0"
				aria-label="Color space thumb"
				@keydown="${u}"
			></div>
		</div>
	`}
		${y`
		<div class="cp-range-input-group">
			${y`
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
				.value="${360*i.hsv.h}"
				@keydown="${h}"
				@input="${t=>c(t,"h")}"
			>
		</label>
	`}
			${"show"===n?y`
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
				.value="${100*i.hsv.a}"
				@keydown="${h}"
				@input="${t=>c(t,"a")}"
			>
		</label>
	`:""}
		</div>
	`}
		${y`
		<button
			class="cp-copy-button"
			type="button"
			@click="${a}"
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
		${y`
		<div class="cp-color-input-wrapper">
			<div class="cp-color-input-group">
				${"hex"===e?y`
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
				@input="${g}"
			>
		</label>
	`:s.map((s=>y`
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
				.value="${l(s)}"
				@input="${t=>m(t,s)}"
			>
		</label>
	`))}
			</div>
			${r.length>1?y`
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
	`}function X(t){const e=t.replace(/^#/,""),s=[],i=e.length>4?2:1;for(let t=0;t<e.length;t+=i){const o=e.slice(t,t+i);s.push(o.repeat(i%2+1))}3===s.length&&s.push("ff");const o=s.map((t=>parseInt(t,16)/255));return{r:o[0],g:o[1],b:o[2],a:o[3]}}function Y(t){const e=t.l<.5?t.l*(1+t.s):t.l+t.s-t.l*t.s,s=2*t.l-e;return{r:Z(s,e,t.h+1/3),g:Z(s,e,t.h),b:Z(s,e,t.h-1/3),a:t.a}}function Z(t,e,s){return s<0?s+=1:s>1&&(s-=1),s<1/6?t+6*(e-t)*s:s<.5?e:s<2/3?t+(e-t)*(2/3-s)*6:t}function G(t){return{r:J(5,t),g:J(3,t),b:J(1,t),a:t.a}}function J(t,e){const s=(t+6*e.h)%6;return e.v-e.v*e.s*Math.max(0,Math.min(s,4-s,1))}function tt(t){return{h:t.h,s:1===t.b?0:1-t.w/(1-t.b),v:1-t.b,a:t.a}}function et(t){const e=Math.min(t.r,t.g,t.b),s=Math.max(t.r,t.g,t.b);let i;return i=s===e?0:s===t.r?(0+(t.g-t.b)/(s-e))/6:s===t.g?(2+(t.b-t.r)/(s-e))/6:(4+(t.r-t.g)/(s-e))/6,i<0&&(i+=1),{h:i,w:e,b:1-s,a:t.a}}function st(t){const e=et(t),s=e.w,i=1-e.b,o=(i+s)/2;let n;return n=0===i||1===s?0:(i-o)/Math.min(o,1-o),{h:e.h,s:n,l:o,a:t.a}}function it(t){return"#"+Object.values(t).map((t=>{const e=255*t,s=Math.round(e).toString(16);return 1===s.length?"0"+s:s})).join("")}var ot={hex:[["hsl",t=>nt(t,[X,st])],["hsv",t=>nt(t,[X,et,tt])],["hwb",t=>nt(t,[X,et])],["rgb",X]],hsl:[["hex",t=>nt(t,[Y,it])],["hsv",function(t){const e=t.l+t.s*Math.min(t.l,1-t.l),s=0===e?0:2-2*t.l/e;return{h:t.h,s,v:e,a:t.a}}],["hwb",t=>nt(t,[Y,et])],["rgb",Y]],hsv:[["hex",t=>nt(t,[G,it])],["hsl",function(t){const e=t.v-t.v*t.s/2,s=Math.min(e,1-e),i=0===s?0:(t.v-e)/s;return{h:t.h,s:i,l:e,a:t.a}}],["hwb",function(t){return{h:t.h,w:(1-t.s)*t.v,b:1-t.v,a:t.a}}],["rgb",G]],hwb:[["hex",t=>nt(t,[tt,G,it])],["hsl",t=>nt(t,[tt,G,st])],["hsv",tt],["rgb",t=>nt(t,[tt,G])]],rgb:[["hex",it],["hsl",st],["hsv",t=>nt(t,[et,tt])],["hwb",et]]};function nt(t,e){return e.reduce(((t,e)=>e(t)),t)}var rt={hex:(t,e)=>e&&[5,9].includes(t.length)?t.substring(0,t.length-(t.length-1)/4):t,hsl:(t,e)=>`hsl(${O(360*t.h)} ${O(100*t.s)}% ${O(100*t.l)}%`+(e?")":` / ${O(t.a)})`),hwb:(t,e)=>`hwb(${O(360*t.h)} ${O(100*t.w)}% ${O(100*t.b)}%`+(e?")":` / ${O(t.a)})`),rgb:(t,e)=>`rgb(${O(255*t.r)} ${O(255*t.g)} ${O(255*t.b)}`+(e?")":` / ${O(t.a)})`)};function lt(t,e,s){return rt[e](t,s)}function ht(t){return/^#(?:(?:[A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(t)}function at(t){if("string"!=typeof t){const e=function(t){return Object.prototype.hasOwnProperty.call(t,"r")?"rgb":Object.prototype.hasOwnProperty.call(t,"w")?"hwb":Object.prototype.hasOwnProperty.call(t,"v")?"hsv":"hsl"}(t);return{format:e,color:t}}if(ht(t))return{format:"hex",color:t};if(!t.includes("(")){const e=document.createElement("canvas").getContext("2d");e.fillStyle=t;const s=e.fillStyle;return"#000000"===s&&"black"!==t?null:{format:"hex",color:s}}const[e,s]=t.split("("),i=e.substring(0,3),o=s.replace(/[,/)]/g," ").replace(/\s+/g," ").trim().split(" ");3===o.length&&o.push("1");const n=(i+"a").split(""),r=Object.fromEntries(n.map(((t,e)=>[t,Q[i][t].from(o[e])])));return{format:i,color:r}}var ct={"alpha-channel":{type:String,property:"alphaChannel"},color:{type:String,property:"color"},"default-format":{type:String,property:"defaultFormat"},id:{type:String,property:"id"},"visible-formats":{type:Array,property:"visibleFormats"}},ut=class t extends HTMLElement{static observedAttributes=Object.keys(ct);static{void 0===window.customElements.get("color-picker")&&window.customElements.define("color-picker",t)}#t="hsl";#e="show";#s="#ffffffff";#i="hsl";#o="color-picker";#n=["hex","hsl","hwb","rgb"];#r=null;#l=null;#h=!1;#a={hex:"#ffffffff",hsl:{h:0,s:0,l:1,a:1},hsv:{h:0,s:0,v:1,a:1},hwb:{h:0,w:1,b:0,a:1},rgb:{r:1,g:1,b:1,a:1}};#c=["h","s","l","a"];#u="#ffffffff";#p=!1;get[Symbol.toStringTag](){return"ColorPicker"}get activeFormat(){return this.#t}set activeFormat(t){this.#t=t,queueMicrotask((()=>{this.#d(),this.#v()}))}get alphaChannel(){return this.#e}set alphaChannel(t){this.#e=t,queueMicrotask((()=>{this.#d(),this.#m(),this.#v()}))}get color(){return this.#s}set color(t){this.#s=t,queueMicrotask((()=>{this.#g(),this.#v()}))}get defaultFormat(){return this.#i}set defaultFormat(t){this.#i=t}get id(){return this.#o}set id(t){this.#o=t,queueMicrotask((()=>{this.#v()}))}get visibleFormats(){return this.#n}set visibleFormats(t){this.#n=t}connectedCallback(){if(this.isConnected){this.ownerDocument.addEventListener("mousemove",this.#f,{passive:!1}),this.ownerDocument.addEventListener("touchmove",this.#b,{passive:!1}),this.ownerDocument.addEventListener("mouseup",this.#$),this.ownerDocument.addEventListener("touchend",this.#$);for(const e of t.observedAttributes)this.#A(e);this.activeFormat=this.visibleFormats.includes(this.defaultFormat)?this.defaultFormat:this.visibleFormats[0]}}disconnectedCallback(){this.ownerDocument.removeEventListener("mousemove",this.#f),this.ownerDocument.removeEventListener("touchmove",this.#b),this.ownerDocument.removeEventListener("mouseup",this.#$),this.ownerDocument.removeEventListener("touchend",this.#$)}attributeChangedCallback(t,e,s){e!==s&&this.#A(t)}#A(t){const{property:e,type:s}=ct[t],i=this.getAttribute(t);let o;if(null!==i){if(s===Array)o=i.split(",").map((t=>t.trim()));else o=i;this[e]!==o&&Reflect.set(this,e,o)}}#g(){const t=at(this.color);null!==t&&this.#y(t.format,t.color)}#y(t,e){let s=e;if("hide"===this.alphaChannel)if("string"!=typeof e)e.a=1,s=e;else if([5,9].includes(e.length)){const t=(e.length-1)/4;s=e.substring(0,e.length-t)+"f".repeat(t)}else[4,7].includes(e.length)&&(s=e+"f".repeat((e.length-1)/3));if(!function(t,e){if("string"==typeof t||"string"==typeof e)return t===e;for(const s in t)if(t[s]!==e[s])return!1;return!0}(this.#a[t],s)){this.#a[t]=s;for(const[e,s]of ot[t])this.#a[e]=s(this.#a[t]);this.#m(),this.#_(),this.#w()}}#w(){const t=this.#C(),e=new CustomEvent("color-change",{detail:t});this.dispatchEvent(e)}#C(){const t="hide"===this.alphaChannel,e=lt(this.#a[this.activeFormat],this.activeFormat,t);return{colors:this.#a,cssColor:e}}#x(){this.style.setProperty("--cp-hsl-h",String(this.#a.hsl.h)),this.style.setProperty("--cp-hsl-s",String(this.#a.hsl.s)),this.style.setProperty("--cp-hsl-l",String(this.#a.hsl.l)),this.style.setProperty("--cp-hsl-a",String(this.#a.hsl.a)),null!==this.#r&&null!==this.#l&&(this.#r.style.position="relative",this.#r.style.backgroundColor="hsl(calc(var(--cp-hsl-h) * 360) 100% 50%)",this.#r.style.backgroundImage="linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",this.#l.style.boxSizing="border-box",this.#l.style.position="absolute",this.#l.style.left=100*this.#a.hsv.s+"%",this.#l.style.bottom=100*this.#a.hsv.v+"%")}#d(){const t=Object.keys(this.#a[this.activeFormat]);this.#c="hex"!==this.activeFormat&&"hide"===this.alphaChannel?t.slice(0,3):t}#m(){const t=this.#a.hex;this.#u="hide"===this.alphaChannel&&[5,9].includes(t.length)?t.substring(0,t.length-(t.length-1)/4):t}#v(){this.#p||(this.#p=!0,this.#_(),this.#p=!1)}#_(){if(!this.isConnected)return;const t=K(this.id,this.activeFormat,this.#c,this.#a,this.#u,this.alphaChannel,this.visibleFormats,this.#T,this.#F,this.#M,this.#S,this.#N,this.#H,this.#I,this.#k,this.#E,this.#P);this.classList.add("cp-color-picker"),((t,e,s)=>{var i,o;const n=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new S(e.insertBefore(a(),t),t,void 0,null!=s?s:{})}r._$AI(t)})(t,this),this.#r=this.querySelector(".cp-color-space"),this.#l=this.querySelector(".cp-thumb"),this.#x()}#H=t=>{this.#h=!0,this.#f(t)};#f=t=>{1===t.buttons&&!1!==this.#h&&this.#r instanceof HTMLElement&&this.#W(this.#r,t.clientX,t.clientY)};#I=t=>{this.#h=!0,this.#b(t)};#b=t=>{if(!1===this.#h||!(this.#r instanceof HTMLElement))return;t.preventDefault();const e=t.touches[0];this.#W(this.#r,e.clientX,e.clientY)};#W(t,e,s){const i=function(t,e,s){const i=t.getBoundingClientRect(),o=e-i.left,n=s-i.top;return{x:0===i.width?0:L(o/i.width,0,1),y:0===i.height?0:L(1-n/i.height,0,1)}}(t,e,s),o=Object.assign({},this.#a.hsv);o.s=i.x,o.v=i.y,this.#y("hsv",o)}#$=()=>{this.#h=!1};#N=t=>{if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(t.key))return;t.preventDefault();const e=["ArrowLeft","ArrowDown"].includes(t.key)?-1:1,s=["ArrowLeft","ArrowRight"].includes(t.key)?"s":"v",i=t.shiftKey?10:1,o=this.#a.hsv[s]+e*i*.01,n=Object.assign({},this.#a.hsv);n[s]=L(o,0,1),this.#y("hsv",n)};#F=t=>{if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(t.key)||!t.shiftKey)return;const e=t.currentTarget,s=parseFloat(e.step),i=["ArrowLeft","ArrowDown"].includes(t.key)?-1:1,o=L(parseFloat(e.value)+i*s*10,parseInt(e.min),parseInt(e.max));e.value=String(o-i*s)};#S=(t,e)=>{const s=t.currentTarget,i=Object.assign({},this.#a.hsv);i[e]=parseInt(s.value)/parseInt(s.max),this.#y("hsv",i)};#P=t=>{const e=t.target;ht(e.value)&&this.#y("hex",e.value)};#E=(t,e)=>{const s=t.target,i=Object.assign({},this.#a[this.activeFormat]),o=Q[this.activeFormat][e].from(s.value);Number.isNaN(o)||void 0===o||(i[e]=o,this.#y(this.activeFormat,i))};copyColor(){return this.#M()}#M=()=>{const t=this.#a[this.activeFormat],e="hide"===this.alphaChannel,s=lt(t,this.activeFormat,e);return window.navigator.clipboard.writeText(s)};switchFormat(){return this.#k()}#k=()=>{const t=(this.visibleFormats.findIndex((t=>t===this.activeFormat))+1)%this.visibleFormats.length;this.activeFormat=this.visibleFormats[t]};#T=t=>{const e=this.activeFormat;return Q[e][t].to(this.#a[e][t])}};export{ut as ColorPicker};