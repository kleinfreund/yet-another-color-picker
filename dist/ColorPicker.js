var t;const e=window,s=e.trustedTypes,i=s?s.createPolicy("lit-html",{createHTML:t=>t}):void 0,o=`lit$${(Math.random()+"").slice(9)}$`,n="?"+o,r=`<${n}>`,l=document,h=(t="")=>l.createComment(t),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,c=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,p=/-->/g,d=/>/g,v=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),m=/'/g,g=/"/g,f=/^(?:script|style|textarea|title)$/i,$=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),b=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),y=new WeakMap,_=l.createTreeWalker(l,129,null,!1),w=(t,e)=>{const s=t.length-1,n=[];let l,h=2===e?"<svg>":"",a=c;for(let e=0;e<s;e++){const s=t[e];let i,u,$=-1,b=0;for(;b<s.length&&(a.lastIndex=b,u=a.exec(s),null!==u);)b=a.lastIndex,a===c?"!--"===u[1]?a=p:void 0!==u[1]?a=d:void 0!==u[2]?(f.test(u[2])&&(l=RegExp("</"+u[2],"g")),a=v):void 0!==u[3]&&(a=v):a===v?">"===u[0]?(a=null!=l?l:c,$=-1):void 0===u[1]?$=-2:($=a.lastIndex-u[2].length,i=u[1],a=void 0===u[3]?v:'"'===u[3]?g:m):a===g||a===m?a=v:a===p||a===d?a=c:(a=v,l=void 0);const A=a===v&&t[e+1].startsWith("/>")?" ":"";h+=a===c?s+r:$>=0?(n.push(i),s.slice(0,$)+"$lit$"+s.slice($)+o+A):s+o+(-2===$?(n.push(void 0),e):A)}const u=h+(t[s]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==i?i.createHTML(u):u,n]};class x{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let l=0,a=0;const u=t.length-1,c=this.parts,[p,d]=w(t,e);if(this.el=x.createElement(p,i),_.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(r=_.nextNode())&&c.length<u;){if(1===r.nodeType){if(r.hasAttributes()){const t=[];for(const e of r.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(o)){const s=d[a++];if(t.push(e),void 0!==s){const t=r.getAttribute(s.toLowerCase()+"$lit$").split(o),e=/([.?@])?(.*)/.exec(s);c.push({type:1,index:l,name:e[2],strings:t,ctor:"."===e[1]?N:"?"===e[1]?P:"@"===e[1]?I:M})}else c.push({type:6,index:l})}for(const e of t)r.removeAttribute(e)}if(f.test(r.tagName)){const t=r.textContent.split(o),e=t.length-1;if(e>0){r.textContent=s?s.emptyScript:"";for(let s=0;s<e;s++)r.append(t[s],h()),_.nextNode(),c.push({type:2,index:++l});r.append(t[e],h())}}}else if(8===r.nodeType)if(r.data===n)c.push({type:2,index:l});else{let t=-1;for(;-1!==(t=r.data.indexOf(o,t+1));)c.push({type:7,index:l}),t+=o.length-1}l++}}static createElement(t,e){const s=l.createElement("template");return s.innerHTML=t,s}}function C(t,e,s=t,i){var o,n,r,l;if(e===b)return e;let h=void 0!==i?null===(o=s._$Co)||void 0===o?void 0:o[i]:s._$Cl;const u=a(e)?void 0:e._$litDirective$;return(null==h?void 0:h.constructor)!==u&&(null===(n=null==h?void 0:h._$AO)||void 0===n||n.call(h,!1),void 0===u?h=void 0:(h=new u(t),h._$AT(t,s,i)),void 0!==i?(null!==(r=(l=s)._$Co)&&void 0!==r?r:l._$Co=[])[i]=h:s._$Cl=h),void 0!==h&&(e=C(t,h._$AS(t,e.values),h,i)),e}class T{constructor(t,e){this.u=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(t){var e;const{el:{content:s},parts:i}=this._$AD,o=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:l).importNode(s,!0);_.currentNode=o;let n=_.nextNode(),r=0,h=0,a=i[0];for(;void 0!==a;){if(r===a.index){let e;2===a.type?e=new S(n,n.nextSibling,this,t):1===a.type?e=new a.ctor(n,a.name,a.strings,this,t):6===a.type&&(e=new V(n,this,t)),this.u.push(e),a=i[++h]}r!==(null==a?void 0:a.index)&&(n=_.nextNode(),r++)}return o}p(t){let e=0;for(const s of this.u)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class S{constructor(t,e,s,i){var o;this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cm=null===(o=null==i?void 0:i.isConnected)||void 0===o||o}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cm}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=C(this,t,e),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==b&&this.g(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>u(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.k(t):this.g(t)}O(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}g(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t}$(t){var e;const{values:s,_$litType$:i}=t,o="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=x.createElement(i.h,this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===o)this._$AH.p(s);else{const t=new T(o,this),e=t.v(this.options);t.p(s),this.T(e),this._$AH=t}}_$AC(t){let e=y.get(t.strings);return void 0===e&&y.set(t.strings,e=new x(t)),e}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new S(this.O(h()),this.O(h()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cm=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class M{constructor(t,e,s,i,o){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(void 0===o)t=C(this,t,e,0),n=!a(t)||t!==this._$AH&&t!==b,n&&(this._$AH=t);else{const i=t;let r,l;for(t=o[0],r=0;r<o.length-1;r++)l=C(this,i[s+r],e,r),l===b&&(l=this._$AH[r]),n||(n=!a(l)||l!==this._$AH[r]),l===A?t=A:t!==A&&(t+=(null!=l?l:"")+o[r+1]),this._$AH[r]=l}n&&!i&&this.j(t)}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class N extends M{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===A?void 0:t}}const H=s?s.emptyScript:"";class P extends M{constructor(){super(...arguments),this.type=4}j(t){t&&t!==A?this.element.setAttribute(this.name,H):this.element.removeAttribute(this.name)}}class I extends M{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=C(this,t,e,0))&&void 0!==s?s:A)===b)return;const i=this._$AH,o=t===A&&i!==A||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==A&&(i===A||o);o&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class V{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}}const E=e.litHtmlPolyfillSupport;null==E||E(x,S),(null!==(t=e.litHtmlVersions)&&void 0!==t?t:e.litHtmlVersions=[]).push("2.4.0");function D(t,e,s){return Math.max(e,Math.min(t,s))}function F(t,e=2){return t.toFixed(e).replace(/\.?0+$/,"")}function k(t){if(t.endsWith("."))return NaN;return(parseFloat(t)%360+360)%360/360}function W(t){return F(360*t)}function L(t){if(!t.endsWith("%"))return NaN;const e=t.substring(0,t.length-1);if(e.endsWith("."))return NaN;const s=parseFloat(e);return Number.isNaN(s)?NaN:D(s,0,100)/100}function O(t){return F(100*t)+"%"}function R(t){if(t.endsWith("%"))return L(t);if(t.endsWith("."))return NaN;const e=parseFloat(t);return Number.isNaN(e)?NaN:D(e,0,255)/255}function U(t){return F(255*t)}function j(t){return t.endsWith("%")?L(t):D(parseFloat(t),0,1)}function B(t){return String(t)}const q={hsl:{h:{to:W,from:k},s:{to:O,from:L},l:{to:O,from:L},a:{to:B,from:j}},hwb:{h:{to:W,from:k},w:{to:O,from:L},b:{to:O,from:L},a:{to:B,from:j}},rgb:{r:{to:U,from:R},g:{to:U,from:R},b:{to:U,from:R},a:{to:B,from:j}}};function z(t){const e=t.replace(/^#/,""),s=[],i=e.length>4?2:1;for(let t=0;t<e.length;t+=i){const o=e.slice(t,t+i);s.push(o.repeat(i%2+1))}3===s.length&&s.push("ff");const o=s.map((t=>parseInt(t,16)/255));return{r:o[0],g:o[1],b:o[2],a:o[3]}}function Q(t){const e=t.l<.5?t.l*(1+t.s):t.l+t.s-t.l*t.s,s=2*t.l-e;return{r:K(s,e,t.h+1/3),g:K(s,e,t.h),b:K(s,e,t.h-1/3),a:t.a}}function K(t,e,s){return s<0?s+=1:s>1&&(s-=1),s<1/6?t+6*(e-t)*s:s<.5?e:s<2/3?t+(e-t)*(2/3-s)*6:t}function X(t){return{r:Y(5,t),g:Y(3,t),b:Y(1,t),a:t.a}}function Y(t,e){const s=(t+6*e.h)%6;return e.v-e.v*e.s*Math.max(0,Math.min(s,4-s,1))}function Z(t){return{h:t.h,s:1===t.b?0:1-t.w/(1-t.b),v:1-t.b,a:t.a}}function G(t){const e=Math.min(t.r,t.g,t.b),s=Math.max(t.r,t.g,t.b);let i;return i=s===e?0:s===t.r?(0+(t.g-t.b)/(s-e))/6:s===t.g?(2+(t.b-t.r)/(s-e))/6:(4+(t.r-t.g)/(s-e))/6,i<0&&(i+=1),{h:i,w:e,b:1-s,a:t.a}}function J(t){const e=G(t),s=e.w,i=1-e.b,o=(i+s)/2;let n;return n=0===i||1===s?0:(i-o)/Math.min(o,1-o),{h:e.h,s:n,l:o,a:t.a}}function tt(t){return"#"+Object.values(t).map((t=>{const e=255*t,s=Math.round(e).toString(16);return 1===s.length?"0"+s:s})).join("")}const et={hex:[["hsl",t=>st(t,[z,J])],["hsv",t=>st(t,[z,G,Z])],["hwb",t=>st(t,[z,G])],["rgb",z]],hsl:[["hex",t=>st(t,[Q,tt])],["hsv",function(t){const e=t.l+t.s*Math.min(t.l,1-t.l),s=0===e?0:2-2*t.l/e;return{h:t.h,s,v:e,a:t.a}}],["hwb",t=>st(t,[Q,G])],["rgb",Q]],hsv:[["hex",t=>st(t,[X,tt])],["hsl",function(t){const e=t.v-t.v*t.s/2,s=Math.min(e,1-e),i=0===s?0:(t.v-e)/s;return{h:t.h,s:i,l:e,a:t.a}}],["hwb",function(t){return{h:t.h,w:(1-t.s)*t.v,b:1-t.v,a:t.a}}],["rgb",X]],hwb:[["hex",t=>st(t,[Z,X,tt])],["hsl",t=>st(t,[Z,X,J])],["hsv",Z],["rgb",t=>st(t,[Z,X])]],rgb:[["hex",tt],["hsl",J],["hsv",t=>st(t,[G,Z])],["hwb",G]]};function st(t,e){return e.reduce(((t,e)=>e(t)),t)}function it(t){const e={};for(const s in t)e[s]=t[s];return e}const ot={hex:(t,e)=>e&&[5,9].includes(t.length)?t.substring(0,t.length-(t.length-1)/4):t,hsl:(t,e)=>`hsl(${F(360*t.h)} ${F(100*t.s)}% ${F(100*t.l)}%`+(e?")":` / ${F(t.a)})`),hwb:(t,e)=>`hwb(${F(360*t.h)} ${F(100*t.w)}% ${F(100*t.b)}%`+(e?")":` / ${F(t.a)})`),rgb:(t,e)=>`rgb(${F(255*t.r)} ${F(255*t.g)} ${F(255*t.b)}`+(e?")":` / ${F(t.a)})`)};function nt(t,e,s){return ot[e](t,s)}function rt(t){return/^#(?:(?:[A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(t)}const lt={"data-alpha-channel":{type:String,default:()=>"show"},"data-color":{type:String,default:()=>"#ffffffff"},"data-default-format":{type:String,default:()=>"hsl"},"data-visible-formats":{type:Array,default:()=>["hex","hsl","hwb","rgb"]},id:{type:String,default:()=>"color-picker"}},ht=Object.entries(lt);class at extends HTMLElement{static observedAttributes=Object.keys(lt);#t=null;#e=null;#s=!1;#i={hex:"#ffffffff",hsl:{h:0,s:0,l:1,a:1},hsv:{h:0,s:0,v:1,a:1},hwb:{h:0,w:1,b:0,a:1},rgb:{r:1,g:1,b:1,a:1}};#o=!1;#n="hsl";#r=[];#l="";#h=[];constructor(){super(),window.customElements.whenDefined(this.localName).then((()=>{this.#o=!0}))}get[Symbol.toStringTag](){return"ColorPicker"}connectedCallback(){if(!this.isConnected)return;this.ownerDocument.addEventListener("mousemove",this.#a,{passive:!1}),this.ownerDocument.addEventListener("touchmove",this.#u,{passive:!1}),this.ownerDocument.addEventListener("mouseup",this.#c),this.ownerDocument.addEventListener("touchend",this.#c);const t=this.#p("data-visible-formats"),e=this.#p("data-default-format");this.#n=t.includes(e)?e:t[0];for(const t of at.observedAttributes)this.#d(t,this.#p(t))}disconnectedCallback(){this.ownerDocument.removeEventListener("mousemove",this.#a),this.ownerDocument.removeEventListener("touchmove",this.#u),this.ownerDocument.removeEventListener("mouseup",this.#c),this.ownerDocument.removeEventListener("touchend",this.#c)}attributeChangedCallback(t,e,s){e!==s&&this.#o&&this.#d(t,s)}#d(t,e){this.#h.push({name:t,value:e}),queueMicrotask((()=>{this.#v()}))}#v(){if(0!==this.#h.length){for(const{name:t,value:e}of this.#h)this.#m(t,e);this.#h=[],this.#g()}}#m(t,e){if("data-color"===t){const s=null!==e?e:this.#f(t);this.#$(s)}else if("data-alpha-channel"===t){const s=null!==e?e:this.#f(t);this.#b(s),this.#A(s)}}#$(t){const e=function(t){if(rt(t))return{format:"hex",color:t};if(!t.includes("(")){const e=document.createElement("canvas").getContext("2d");e.fillStyle=t;const s=e.fillStyle;return"#000000"===s&&"black"!==t?null:{format:"hex",color:s}}const[e,s]=t.split("("),i=e.substring(0,3),o=s.replace(/[,/)]/g," ").replace(/\s+/g," ").trim().split(" ");3===o.length&&o.push("1");const n=i.split("").concat("a"),r=Object.fromEntries(n.map(((t,e)=>[t,q[i][t].from(o[e])])));return{format:i,color:r}}(t);null!==e&&this.#y(e.format,e.color)}#y(t,e){let s=e;if("hide"===this.#p("data-alpha-channel"))if("string"!=typeof e)e.a=1,s=e;else if([5,9].includes(e.length)){const t=(e.length-1)/4;s=e.substring(0,e.length-t)+"f".repeat(t)}else[4,7].includes(e.length)&&(s=e+"f".repeat((e.length-1)/3));(function(t,e){if("string"==typeof t||"string"==typeof e)return t===e;for(const s in t)if(t[s]!==e[s])return!1;return!0})(this.#i[t],s)||(this.#_(t,s),this.#w())}#_(t,e){this.#i[t]=e;for(const[e,s]of et[t])this.#i[e]=s(this.#i[t]);this.#A(this.#p("data-alpha-channel")),this.#g()}#w(){const t=this.#x(),e=new CustomEvent("color-change",{detail:t});this.dispatchEvent(e)}#C(){this.style.setProperty("--cp-hsl-h",String(this.#i.hsl.h)),this.style.setProperty("--cp-hsl-s",String(this.#i.hsl.s)),this.style.setProperty("--cp-hsl-l",String(this.#i.hsl.l)),this.style.setProperty("--cp-hsl-a",String(this.#i.hsl.a)),null!==this.#t&&null!==this.#e&&(this.#t.style.position="relative",this.#t.style.backgroundColor="hsl(calc(var(--cp-hsl-h) * 360) 100% 50%)",this.#t.style.backgroundImage="linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)",this.#e.style.boxSizing="border-box",this.#e.style.position="absolute",this.#e.style.left=100*this.#i.hsv.s+"%",this.#e.style.bottom=100*this.#i.hsv.v+"%")}#b(t){const e=Object.keys(this.#i[this.#n]);this.#r="hex"!==this.#n&&"hide"===t?e.slice(0,3):e}#A(t){const e=this.#i.hex;this.#l="hide"===t&&[5,9].includes(e.length)?e.substring(0,e.length-(e.length-1)/4):e}#g(){if(!this.isConnected)return;this.#T();const t=function(t,e,s,i,o,n,r,l,h,a,u,c,p,d,v,m,g){const f=()=>$`
		<label
			class="${ut`range-input-label`} ${ut`range-input-label--hue`}"
			for="${t}-hue-slider"
		>
			<span class="${ut`range-input-label-text`} ${ut`range-input-label-text--hue`}">Hue</span>

			<input
				class="${ut`range-input`} ${ut`range-input--hue`}"
				id="${t}-hue-slider"
				type="range"
				min="0"
				max="360"
				step="1"
				.value="${360*i.hsv.h}"
				@keydown="${h}"
				@input="${t=>u(t,"h")}"
			>
		</label>
	`,b=()=>$`
		<label
			class="${ut`range-input-label`} ${ut`range-input-label--alpha`}"
			for="${t}-alpha-slider"
		>
			<span class="${ut`range-input-label-text`} ${ut`range-input-label-text--alpha`}">Alpha</span>

			<input
				class="${ut`range-input`} ${ut`range-input--alpha`}"
				id="${t}-alpha-slider"
				type="range"
				min="0"
				max="100"
				step="1"
				.value="${100*i.hsv.a}"
				@keydown="${h}"
				@input="${t=>u(t,"a")}"
			>
		</label>
	`,A=()=>$`
		<div class="${ut`range-input-group`}">
			${f()}
			${"show"===n?b():""}
		</div>
	`,y=()=>$`
		<button
			class="${ut`copy-button`}"
			type="button"
			@click="${a}"
		>
			<span class="${ut`visually-hidden`}">Copy coloy</span>

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
	`,_=()=>$`
		<label
			class="${ut`hex-input-label`}"
			for="${t}-color-hex"
		>
			<span class="${ut`color-input-label-text`}">Hex</span>

			<input
				class="${ut`color-input`}"
				id="${t}-color-hex"
				type="text"
				.value="${o}"
				@input="${g}"
			>
		</label>
	`,w=()=>s.map((s=>$`
		<label
			class="${ut`color-input-label`}"
			id="${t}-color-${e}-${s}-label"
			for="${t}-color-${e}-${s}"
		>
			<span class="${ut`color-input-label-text`}">${s.toUpperCase()}</span>

			<input
				class="${ut`color-input`}"
				id="${t}-color-${e}-${s}"
				type="text"
				.value="${l(s)}"
				@input="${t=>m(t,s)}"
			>
		</label>
	`)),x=()=>$`
		<button
			class="${ut`switch-format-button`}"
			type="button"
			@click="${v}"
		>
			<span class="${ut`visually-hidden`}">Switch format</span>

			<svg
				class="${ut`icon`}"
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
	`,C=()=>$`
		<div class="${ut`color-input-wrapper`}">
			<div class="${ut`color-input-group`}">
				${"hex"===e?_():w()}
			</div>
			${r.length>1?x():""}
		</div>
	`;return $`
		${$`
		<div
			class="${ut`color-space`}"
			@mousedown="${p}"
			@touchstart="${d}"
		>
			<div
				class="${ut`thumb`}"
				tabIndex="0"
				aria-label="Color space thumb"
				@keydown="${c}"
			></div>
		</div>
	`}
		${A()}
		${y()}
		${C()}
	`}(this.id,this.#n,this.#r,this.#i,this.#l,this.#p("data-alpha-channel"),this.#p("data-visible-formats"),this.#S,this.#M,this.#N,this.#H,this.#P,this.#I,this.#V,this.#E,this.#D,this.#F);this.classList.add(ut`color-picker`),((t,e,s)=>{var i,o;const n=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let r=n._$litPart$;if(void 0===r){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=r=new S(e.insertBefore(h(),t),t,void 0,null!=s?s:{})}r._$AI(t)})(t,this),this.#t=this.querySelector("."+ut`color-space`),this.#e=this.querySelector("."+ut`thumb`),this.#C()}#T(){for(const[t,e]of ht){const s=this.hasAttribute(t);if(e.isRequired&&!s)throw this.#k(`Prop ???${t}??? is required but wasn't provided.`);e.isRequired||s||this.setAttribute(t,e.default?.())}}#I=t=>{this.#s=!0,this.#a(t)};#a=t=>{1===t.buttons&&!1!==this.#s&&this.#t instanceof HTMLElement&&this.#W(this.#t,t.clientX,t.clientY)};#V=t=>{this.#s=!0,this.#u(t)};#u=t=>{if(!1===this.#s||!(this.#t instanceof HTMLElement))return;t.preventDefault();const e=t.touches[0];this.#W(this.#t,e.clientX,e.clientY)};#W(t,e,s){const i=function(t,e,s){const i=t.getBoundingClientRect(),o=e-i.left,n=s-i.top;return{x:0===i.width?0:D(o/i.width,0,1),y:0===i.height?0:D(1-n/i.height,0,1)}}(t,e,s),o=it(this.#i.hsv);o.s=i.x,o.v=i.y,this.#y("hsv",o)}#c=()=>{this.#s=!1};#P=t=>{if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(t.key))return;t.preventDefault();const e=["ArrowLeft","ArrowDown"].includes(t.key)?-1:1,s=["ArrowLeft","ArrowRight"].includes(t.key)?"s":"v",i=t.shiftKey?10:1,o=this.#i.hsv[s]+e*i*.01,n=it(this.#i.hsv);n[s]=D(o,0,1),this.#y("hsv",n)};#M=t=>{if(!["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(t.key)||!t.shiftKey)return;const e=t.currentTarget,s=parseFloat(e.step),i=["ArrowLeft","ArrowDown"].includes(t.key)?-1:1,o=D(parseFloat(e.value)+i*s*10,parseInt(e.min),parseInt(e.max));e.value=String(o-i*s)};#H=(t,e)=>{const s=t.currentTarget,i=it(this.#i.hsv);i[e]=parseInt(s.value)/parseInt(s.max),this.#y("hsv",i)};#F=t=>{const e=t.target;rt(e.value)&&this.#y("hex",e.value)};#D=(t,e)=>{const s=t.target,i=it(this.#i[this.#n]),o=q[this.#n][e].from(s.value);Number.isNaN(o)||void 0===o||(i[e]=o,this.#y(this.#n,i))};#x(){const t="hide"===this.#p("data-alpha-channel"),e=nt(this.#i[this.#n],this.#n,t);return{colors:this.#i,cssColor:e}}#N=()=>{const t=this.#i[this.#n],e="hide"===this.#p("data-alpha-channel"),s=nt(t,this.#n,e);return window.navigator.clipboard.writeText(s)};#E=()=>{const t=this.#p("data-visible-formats"),e=(t.findIndex((t=>t===this.#n))+1)%t.length;this.#n=t[e],this.#b(this.#p("data-alpha-channel")),this.#g()};#S=t=>{const e=this.#n;return q[e][t].to(this.#i[e][t])};#p(t){const e=this.getAttribute(t)??this.#f(t);return lt[t].type===Array?Array.isArray(e)?e:e.split(",").map((t=>t.trim())):e}#f(t){return lt[t].default?.()}#k(t){return new Error(`<${this.localName}>: ${t}`)}}function ut(t,...e){return"cp-"+t.map(((t,s)=>t+(s<e.length?e[s]:""))).join("")}export{at as ColorPicker};
