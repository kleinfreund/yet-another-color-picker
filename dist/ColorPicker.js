var t;const e=window,s=e.trustedTypes,i=s?s.createPolicy("lit-html",{createHTML:t=>t}):void 0,o="$lit$",n=`lit$${(Math.random()+"").slice(9)}$`,r="?"+n,l=`<${r}>`,h=document,a=()=>h.createComment(""),c=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,p="[ \t\n\f\r]",d=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,v=/-->/g,m=/>/g,g=RegExp(`>|${p}(?:([^\\s"'>=/]+)(${p}*=${p}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),f=/'/g,$=/"/g,b=/^(?:script|style|textarea|title)$/i,A=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),_=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),w=new WeakMap,x=h.createTreeWalker(h,129,null,!1),C=(t,e)=>{const s=t.length-1,r=[];let h,a=2===e?"<svg>":"",c=d;for(let e=0;e<s;e++){const s=t[e];let i,u,p=-1,A=0;for(;A<s.length&&(c.lastIndex=A,u=c.exec(s),null!==u);)A=c.lastIndex,c===d?"!--"===u[1]?c=v:void 0!==u[1]?c=m:void 0!==u[2]?(b.test(u[2])&&(h=RegExp("</"+u[2],"g")),c=g):void 0!==u[3]&&(c=g):c===g?">"===u[0]?(c=null!=h?h:d,p=-1):void 0===u[1]?p=-2:(p=c.lastIndex-u[2].length,i=u[1],c=void 0===u[3]?g:'"'===u[3]?$:f):c===$||c===f?c=g:c===v||c===m?c=d:(c=g,h=void 0);const _=c===g&&t[e+1].startsWith("/>")?" ":"";a+=c===d?s+l:p>=0?(r.push(i),s.slice(0,p)+o+s.slice(p)+n+_):s+n+(-2===p?(r.push(void 0),e):_)}const u=a+(t[s]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==i?i.createHTML(u):u,r]};class S{constructor({strings:t,_$litType$:e},i){let l;this.parts=[];let h=0,c=0;const u=t.length-1,p=this.parts,[d,v]=C(t,e);if(this.el=S.createElement(d,i),x.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(l=x.nextNode())&&p.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const e of l.getAttributeNames())if(e.endsWith(o)||e.startsWith(n)){const s=v[c++];if(t.push(e),void 0!==s){const t=l.getAttribute(s.toLowerCase()+o).split(n),e=/([.?@])?(.*)/.exec(s);p.push({type:1,index:h,name:e[2],strings:t,ctor:"."===e[1]?P:"?"===e[1]?I:"@"===e[1]?E:H})}else p.push({type:6,index:h})}for(const e of t)l.removeAttribute(e)}if(b.test(l.tagName)){const t=l.textContent.split(n),e=t.length-1;if(e>0){l.textContent=s?s.emptyScript:"";for(let s=0;s<e;s++)l.append(t[s],a()),x.nextNode(),p.push({type:2,index:++h});l.append(t[e],a())}}}else if(8===l.nodeType)if(l.data===r)p.push({type:2,index:h});else{let t=-1;for(;-1!==(t=l.data.indexOf(n,t+1));)p.push({type:7,index:h}),t+=n.length-1}h++}}static createElement(t,e){const s=h.createElement("template");return s.innerHTML=t,s}}function T(t,e,s=t,i){var o,n,r,l;if(e===_)return e;let h=void 0!==i?null===(o=s._$Co)||void 0===o?void 0:o[i]:s._$Cl;const a=c(e)?void 0:e._$litDirective$;return(null==h?void 0:h.constructor)!==a&&(null===(n=null==h?void 0:h._$AO)||void 0===n||n.call(h,!1),void 0===a?h=void 0:(h=new a(t),h._$AT(t,s,i)),void 0!==i?(null!==(r=(l=s)._$Co)&&void 0!==r?r:l._$Co=[])[i]=h:s._$Cl=h),void 0!==h&&(e=T(t,h._$AS(t,e.values),h,i)),e}class M{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:i}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:h).importNode(s,!0);x.currentNode=o;let n=x.nextNode(),r=0,l=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new N(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new k(n,this,t)),this._$AV.push(e),a=i[++l]}r!==(null==a?void 0:a.index)&&(n=x.nextNode(),r++)}return x.currentNode=h,o}v(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class N{constructor(t,e,s,i){var o;this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cp=null===(o=null==i?void 0:i.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=T(this,t,e),c(t)?t===y||null==t||""===t?(this._$AH!==y&&this._$AR(),this._$AH=y):t!==this._$AH&&t!==_&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>u(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==y&&c(this._$AH)?this._$AA.nextSibling.data=t:this.$(h.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=S.createElement(i.h,this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.v(s);else{const t=new M(o,this),e=t.u(this.options);t.v(s),this.$(e),this._$AH=t}}_$AC(t){let e=w.get(t.strings);return void 0===e&&w.set(t.strings,e=new S(t)),e}T(t){u(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new N(this.k(a()),this.k(a()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class H{constructor(t,e,s,i,o){this.type=1,this._$AH=y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=y}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(void 0===o)t=T(this,t,e,0),n=!c(t)||t!==this._$AH&&t!==_,n&&(this._$AH=t);else{const i=t;let r,l;for(t=o[0],r=0;r<o.length-1;r++)l=T(this,i[s+r],e,r),l===_&&(l=this._$AH[r]),n||(n=!c(l)||l!==this._$AH[r]),l===y?t=y:t!==y&&(t+=(null!=l?l:"")+o[r+1]),this._$AH[r]=l}n&&!i&&this.j(t)}j(t){t===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class P extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===y?void 0:t}}const V=s?s.emptyScript:"";class I extends H{constructor(){super(...arguments),this.type=4}j(t){t&&t!==y?this.element.setAttribute(this.name,V):this.element.removeAttribute(this.name)}}class E extends H{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=T(this,t,e,0))&&void 0!==s?s:y)===_)return;const i=this._$AH,o=t===y&&i!==y||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==y&&(i===y||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class k{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){T(this,t)}}const D=e.litHtmlPolyfillSupport;null==D||D(S,N),(null!==(t=e.litHtmlVersions)&&void 0!==t?t:e.litHtmlVersions=[]).push("2.7.4");function F(t,e,s){return Math.max(e,Math.min(t,s))}function W(t,e=2){return t.toFixed(e).replace(/\.?0+$/,"")}function L(t){if(t.endsWith("."))return NaN;return(parseFloat(t)%360+360)%360/360}function R(t){return W(360*t)}function O(t){if(!t.endsWith("%"))return NaN;const e=t.substring(0,t.length-1);if(e.endsWith("."))return NaN;const s=parseFloat(e);return Number.isNaN(s)?NaN:F(s,0,100)/100}function U(t){return W(100*t)+"%"}function j(t){if(t.endsWith("%"))return O(t);if(t.endsWith("."))return NaN;const e=parseFloat(t);return Number.isNaN(e)?NaN:F(e,0,255)/255}function B(t){return W(255*t)}function q(t){return t.endsWith("%")?O(t):F(parseFloat(t),0,1)}function z(t){return String(t)}const Q={hsl:{h:{to:R,from:L},s:{to:U,from:O},l:{to:U,from:O},a:{to:z,from:q}},hwb:{h:{to:R,from:L},w:{to:U,from:O},b:{to:U,from:O},a:{to:z,from:q}},rgb:{r:{to:B,from:j},g:{to:B,from:j},b:{to:B,from:j},a:{to:z,from:q}}};function K(t,e,s,i,o,n,r,l,h,a,c,u,p,d,v,m,g){return A`
		${A`
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
		${A`
		<div class="cp-range-input-group">
			${A`
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
			${"show"===n?A`
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
		${A`
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
		${A`
		<div class="cp-color-input-wrapper">
			<div class="cp-color-input-group">
				${"hex"===e?A`
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
	`:s.map((s=>A`
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
			${r.length>1?A`
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
	`}function X(t){const e=t.replace(/^#/,""),s=[],i=e.length>4?2:1;for(let t=0;t<e.length;t+=i){const o=e.slice(t,t+i);s.push(o.repeat(i%2+1))}3===s.length&&s.push("ff");const o=s.map((t=>parseInt(t,16)/255));return{r:o[0],g:o[1],b:o[2],a:o[3]}}function Y(t){const e=t.l<.5?t.l*(1+t.s):t.l+t.s-t.l*t.s,s=2*t.l-e;return{r:Z(s,e,t.h+1/3),g:Z(s,e,t.h),b:Z(s,e,t.h-1/3),a:t.a}}function Z(t,e,s){return s<0?s+=1:s>1&&(s-=1),s<1/6?t+6*(e-t)*s:s<.5?e:s<2/3?t+(e-t)*(2/3-s)*6:t}function G(t){return{r:J(5,t),g:J(3,t),b:J(1,t),a:t.a}}function J(t,e){const s=(t+6*e.h)%6;return e.v-e.v*e.s*Math.max(0,Math.min(s,4-s,1))}function tt(t){return{h:t.h,s:1===t.b?0:1-t.w/(1-t.b),v:1-t.b,a:t.a}}function et(t){const e=Math.min(t.r,t.g,t.b),s=Math.max(t.r,t.g,t.b);let i;return i=s===e?0:s===t.r?(0+(t.g-t.b)/(s-e))/6:s===t.g?(2+(t.b-t.r)/(s-e))/6:(4+(t.r-t.g)/(s-e))/6,i<0&&(i+=1),{h:i,w:e,b:1-s,a:t.a}}function st(t){const e=et(t),s=e.w,i=1-e.b,o=(i+s)/2;let n;return n=0===i||1===s?0:(i-o)/Math.min(o,1-o),{h:e.h,s:n,l:o,a:t.a}}function it(t){return"#"+Object.values(t).map((t=>{const e=255*t,s=Math.round(e).toString(16);return 1===s.length?"0"+s:s})).join("")}const ot={hex:[["hsl",t=>nt(t,[X,st])],["hsv",t=>nt(t,[X,et,tt])],["hwb",t=>nt(t,[X,et])],["rgb",X]],hsl:[["hex",t=>nt(t,[Y,it])],["hsv",function(t){const e=t.l+t.s*Math.min(t.l,1-t.l),s=0===e?0:2-2*t.l/e;return{h:t.h,s,v:e,a:t.a}}],["hwb",t=>nt(t,[Y,et])],["rgb",Y]],hsv:[["hex",t=>nt(t,[G,it])],["hsl",function(t){const e=t.v-t.v*t.s/2,s=Math.min(e,1-e),i=0===s?0:(t.v-e)/s;return{h:t.h,s:i,l:e,a:t.a}}],["hwb",function(t){return{h:t.h,w:(1-t.s)*t.v,b:1-t.v,a:t.a}}],["rgb",G]],hwb:[["hex",t=>nt(t,[tt,G,it])],["hsl",t=>nt(t,[tt,G,st])],["hsv",tt],["rgb",t=>nt(t,[tt,G])]],rgb:[["hex",it],["hsl",st],["hsv",t=>nt(t,[et,tt])],["hwb",et]]};function nt(t,e){return e.reduce(((t,e)=>e(t)),t)}function rt(t){const e={};for(const s in t)e[s]=t[s];return e}const lt={hex:(t,e)=>e&&[5,9].includes(t.length)?t.substring(0,t.length-(t.length-1)/4):t,hsl:(t,e)=>`hsl(${W(360*t.h)} ${W(100*t.s)}% ${W(100*t.l)}%`+(e?")":` / ${W(t.a)})`),hwb:(t,e)=>`hwb(${W(360*t.h)} ${W(100*t.w)}% ${W(100*t.b)}%`+(e?")":` / ${W(t.a)})`),rgb:(t,e)=>`rgb(${W(255*t.r)} ${W(255*t.g)} ${W(255*t.b)}`+(e?")":` / ${W(t.a)})`)};function ht(t,e,s){return lt[e](t,s)}function at(t){return/^#(?:(?:[A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(t)}const ct={"data-alpha-channel":{type:String,default:()=>"show"},"data-color":{type:String,default:()=>"#ffffffff"},"data-default-format":{type:String,default:()=>"hsl"},"data-visible-formats":{type:Array,default:()=>["hex","hsl","hwb","rgb"]},id:{type:String,default:()=>"color-picker"}},ut=Object.entries(ct);class pt extends HTMLElement{static observedAttributes=Object.keys(ct);#t=null;#e=null;#s=!1;#i={hex:"#ffffffff",hsl:{h:0,s:0,l:1,a:1},hsv:{h:0,s:0,v:1,a:1},hwb:{h:0,w:1,b:0,a:1},rgb:{r:1,g:1,b:1,a:1}};#o=!1;#n="hsl";#r=[];#l="";#h=[];constructor(){super(),window.customElements.whenDefined(this.localName).then((()=>{this.#o=!0}))}get[Symbol.toStringTag](){return"ColorPicker"}connectedCallback(){if(!this.isConnected)return;this.ownerDocument.addEventListener("mousemove",this.#a,{passive:!1}),this.ownerDocument.addEventListener("touchmove",this.#c,{passive:!1}),this.ownerDocument.addEventListener("mouseup",this.#u),this.ownerDocument.addEventListener("touchend",this.#u);const t=this.#p("data-visible-formats"),e=this.#p("data-default-format");this.#n=t.includes(e)?e:t[0];for(const t of pt.observedAttributes)this.#d(t,this.#p(t))}disconnectedCallback(){this.ownerDocument.removeEventListener("mousemove",this.#a),this.ownerDocument.removeEventListener("touchmove",this.#c),this.ownerDocument.removeEventListener("mouseup",this.#u),this.ownerDocument.removeEventListener("touchend",this.#u)}attributeChangedCallback(t,e,s){e!==s&&this.#o&&this.#d(t,s)}#d(t,e){this.#h.push({name:t,value:e}),queueMicrotask((()=>{this.#v()}))}#v(){if(0!==this.#h.length){for(const{name:t,value:e}of this.#h)this.#m(t,e);this.#h=[],this.#g()}}#m(t,e){if("data-color"===t){const s=null!==e?e:this.#f(t);this.#$(s)}else if("data-alpha-channel"===t){const s=null!==e?e:this.#f(t);this.#b(s),this.#A(s)}}#$(t){const e=function(t){if(at(t))return{format:"hex",color:t};if(!t.includes("(")){const e=document.createElement("canvas").getContext("2d");e.fillStyle=t;const s=e.fillStyle;return"#000000"===s&&"black"!==t?null:{format:"hex",color:s}}const[e,s]=t.split("("),i=e.substring(0,3),o=s.replace(/[,/)]/g," ").replace(/\s+/g," ").trim().split(" ");3===o.length&&o.push("1");const n=i.split("").concat("a"),r=Object.fromEntries(n.map(((t,e)=>[t,Q[i][t].from(o[e])])));return{format:i,color:r}}(t);null!==e&&this.#_(e.format,e.color)}#_(t,e){let s=e;if("hide"===this.#p("data-alpha-channel"))if("string"!=typeof e)e.a=1,s=e;else if([5,9].includes(e.length)){const t=(e.length-1)/4;s=e.substring(0,e.length-t)+"f".repeat(t)}else[4,7].includes(e.length)&&(s=e+"f".repeat((e.length-1)/3));(function(t,e){if("string"==typeof t||"string"==typeof e)return t===e;for(const s in t)if(t[s]!==e[s])return!1;return!0})(this.#i[t],s)||(this.#y(t,s),this.#w())}#y(t,e){this.#i[t]=e;for(const[e,s]of ot[t])this.#i[e]=s(this.#i[t]);this.#A(this.#p("data-alpha-channel")),this.#g()}#w(){const t=this.#x(),e=new CustomEvent("color-change",{detail:t});this.dispatchEvent(e)}#C(){this.style.setProperty("--cp-hsl-h",String(this.#i.hsl.h)),this.style.setProperty("--cp-hsl-s",String(this.#i.hsl.s)),this.style.setProperty("--cp-hsl-l",String(this.#i.hsl.l)),this.style.setProperty("--cp-hsl-a",String(this.#i.hsl.a)),null!==this.#t&&null!==this.#e&&(this.#t.style.position="relative",this.#t.style.backgroundColor="hsl(calc(var(--cp-hsl-h) * 360) 100% 50%)",this.#t.style.backgroundImage="linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",this.#e.style.boxSizing="border-box",this.#e.style.position="absolute",this.#e.style.left=100*this.#i.hsv.s+"%",this.#e.style.bottom=100*this.#i.hsv.v+"%")}#b(t){const e=Object.keys(this.#i[this.#n]);this.#r="hex"!==this.#n&&"hide"===t?e.slice(0,3):e}#A(t){const e=this.#i.hex;this.#l="hide"===t&&[5,9].includes(e.length)?e.substring(0,e.length-(e.length-1)/4):e}#g(){if(!this.isConnected)return;this.#S();const t=K(this.id,this.#n,this.#r,this.#i,this.#l,this.#p("data-alpha-channel"),this.#p("data-visible-formats"),this.#T,this.#M,this.#N,this.#H,this.#P,this.#V,this.#I,this.#E,this.#k,this.#D);this.classList.add("cp-color-picker"),((t,e,s)=>{var i,o;const n=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new N(e.insertBefore(a(),t),t,void 0,null!=s?s:{})}r._$AI(t)})(t,this),this.#t=this.querySelector(".cp-color-space"),this.#e=this.querySelector(".cp-thumb"),this.#C()}#S(){for(const[t,e]of ut){const s=this.hasAttribute(t);if(e.isRequired&&!s)throw this.#F(`Prop “${t}” is required but wasn't provided.`);e.isRequired||s||this.setAttribute(t,e.default?.())}}#V=t=>{this.#s=!0,this.#a(t)};#a=t=>{1===t.buttons&&!1!==this.#s&&this.#t instanceof HTMLElement&&this.#W(this.#t,t.clientX,t.clientY)};#I=t=>{this.#s=!0,this.#c(t)};#c=t=>{if(!1===this.#s||!(this.#t instanceof HTMLElement))return;t.preventDefault();const e=t.touches[0];this.#W(this.#t,e.clientX,e.clientY)};#W(t,e,s){const i=function(t,e,s){const i=t.getBoundingClientRect(),o=e-i.left,n=s-i.top;return{x:0===i.width?0:F(o/i.width,0,1),y:0===i.height?0:F(1-n/i.height,0,1)}}(t,e,s),o=rt(this.#i.hsv);o.s=i.x,o.v=i.y,this.#_("hsv",o)}#u=()=>{this.#s=!1};#P=t=>{if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(t.key))return;t.preventDefault();const e=["ArrowLeft","ArrowDown"].includes(t.key)?-1:1,s=["ArrowLeft","ArrowRight"].includes(t.key)?"s":"v",i=t.shiftKey?10:1,o=this.#i.hsv[s]+e*i*.01,n=rt(this.#i.hsv);n[s]=F(o,0,1),this.#_("hsv",n)};#M=t=>{if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(t.key)||!t.shiftKey)return;const e=t.currentTarget,s=parseFloat(e.step),i=["ArrowLeft","ArrowDown"].includes(t.key)?-1:1,o=F(parseFloat(e.value)+i*s*10,parseInt(e.min),parseInt(e.max));e.value=String(o-i*s)};#H=(t,e)=>{const s=t.currentTarget,i=rt(this.#i.hsv);i[e]=parseInt(s.value)/parseInt(s.max),this.#_("hsv",i)};#D=t=>{const e=t.target;at(e.value)&&this.#_("hex",e.value)};#k=(t,e)=>{const s=t.target,i=rt(this.#i[this.#n]),o=Q[this.#n][e].from(s.value);Number.isNaN(o)||void 0===o||(i[e]=o,this.#_(this.#n,i))};#x(){const t="hide"===this.#p("data-alpha-channel"),e=ht(this.#i[this.#n],this.#n,t);return{colors:this.#i,cssColor:e}}#N=()=>{const t=this.#i[this.#n],e="hide"===this.#p("data-alpha-channel"),s=ht(t,this.#n,e);return window.navigator.clipboard.writeText(s)};#E=()=>{const t=this.#p("data-visible-formats"),e=(t.findIndex((t=>t===this.#n))+1)%t.length;this.#n=t[e],this.#b(this.#p("data-alpha-channel")),this.#g()};#T=t=>{const e=this.#n;return Q[e][t].to(this.#i[e][t])};#p(t){const e=this.getAttribute(t)??this.#f(t);return ct[t].type===Array?Array.isArray(e)?e:e.split(",").map((t=>t.trim())):e}#f(t){return ct[t].default?.()}#F(t){return new Error(`<${this.localName}>: ${t}`)}}export{pt as ColorPicker};
