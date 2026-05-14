import { html as e, nothing as t, render as n } from "lit-html";
//#region src/utilities/clamp.ts
function r(e, t, n) {
	return Math.max(t, Math.min(e, n));
}
//#endregion
//#region src/utilities/colorsAreValueEqual.ts
function i(e, t) {
	if (typeof e == "string" || typeof t == "string") return e === t;
	for (let n in e) if (e[n] !== t[n]) return !1;
	return !0;
}
//#endregion
//#region src/utilities/round.ts
function a(e, t) {
	let n = e.toFixed(t);
	return n.includes(".") ? n.replace(/\.?0+$/, "") : n;
}
//#endregion
//#region src/utilities/CssValues.ts
var o = {
	deg: 1,
	grad: .9,
	rad: 180 / Math.PI,
	turn: 360
}, s = {
	from(e) {
		return e.endsWith("%") ? u.from(e, { referenceValue: 1 }) : l.from(e, {
			min: 0,
			max: 1
		});
	},
	to(e) {
		return l.to(e);
	}
}, c = {
	from(e) {
		let t = e.match(/deg|g?rad|turn$/);
		if (t === null) return l.from(e);
		let n = t[0];
		return l.from(e.slice(0, -n.length)) * o[n];
	},
	to(e) {
		return l.to(e);
	}
}, l = {
	from(e, { min: t = -Infinity, max: n = Infinity } = {}) {
		return e.endsWith(".") ? NaN : r(Number(e), t, n);
	},
	to(e) {
		return a(e, 2);
	}
}, u = {
	from(e, { referenceValue: t = 100, min: n = 0, max: r = 100 } = {}) {
		return e.endsWith("%") ? l.from(e.slice(0, -1), {
			min: n,
			max: r
		}) * t / 100 : NaN;
	},
	to(e) {
		return l.to(e) + "%";
	}
}, d = {
	from(e) {
		return e.endsWith("%") ? u.from(e, { referenceValue: 255 }) : l.from(e, {
			min: 0,
			max: 255
		});
	},
	to(e) {
		return l.to(e);
	}
}, f = {
	hsl: {
		h: c,
		s: u,
		l: u,
		a: s
	},
	hwb: {
		h: c,
		w: u,
		b: u,
		a: s
	},
	rgb: {
		r: d,
		g: d,
		b: d,
		a: s
	}
};
function p(e, t) {
	return f[e][t];
}
//#endregion
//#region src/utilities/color-conversions/convertHexToRgb.ts
function m(e) {
	let t = [], n = e.length > 5 ? 2 : 1;
	for (let r = 1; r < e.length; r += n) {
		let i = e.substring(r, r + n).repeat(n % 2 + 1), a = parseInt(i, 16);
		t.push(r === 3 * n + 1 ? a / 255 : a);
	}
	return t.length === 3 && t.push(1), {
		r: t[0],
		g: t[1],
		b: t[2],
		a: t[3]
	};
}
//#endregion
//#region src/utilities/color-conversions/convertHslToHsv.ts
function h(e) {
	let t = e.l / 100, n = t + e.s / 100 * Math.min(t, 1 - t), r = n === 0 ? 0 : 200 * (1 - t / n);
	return {
		h: e.h,
		s: r,
		v: n * 100,
		a: e.a
	};
}
//#endregion
//#region src/utilities/color-conversions/convertHslToRgb.ts
function g(e) {
	let t = e.h % 360;
	t < 0 && (t += 360);
	let n = e.s / 100, r = e.l / 100;
	return {
		r: _(0, t, n, r) * 255,
		g: _(8, t, n, r) * 255,
		b: _(4, t, n, r) * 255,
		a: e.a
	};
}
function _(e, t, n, r) {
	let i = (e + t / 30) % 12;
	return r - n * Math.min(r, 1 - r) * Math.max(-1, Math.min(i - 3, 9 - i, 1));
}
//#endregion
//#region src/utilities/color-conversions/convertHsvToHsl.ts
function v(e) {
	let t = e.s / 100, n = e.v / 100, r = n * (1 - t / 2);
	return {
		h: e.h,
		s: r === 0 || r === 1 ? 0 : (n - r) / Math.min(r, 1 - r) * 100,
		l: r * 100,
		a: e.a
	};
}
//#endregion
//#region src/utilities/color-conversions/convertHsvToHwb.ts
function y(e) {
	return {
		h: e.h,
		w: e.v * (100 - e.s) / 100,
		b: 100 - e.v,
		a: e.a
	};
}
//#endregion
//#region src/utilities/color-conversions/convertHsvToRgb.ts
function b(e) {
	return g(v(e));
}
//#endregion
//#region src/utilities/color-conversions/convertHwbToHsv.ts
function x(e) {
	let t = e.w / 100, n = e.b / 100, r, i, a = t + n;
	return a >= 1 ? (r = 0, i = t / a) : (i = 1 - n, r = (1 - t / i) * 100), {
		h: e.h,
		s: r,
		v: i * 100,
		a: e.a
	};
}
//#endregion
//#region src/utilities/color-conversions/convertRgbToHsl.ts
function S(e) {
	let { r: t, g: n, b: r, a: i } = e, a = Math.min(t, n, r), o = Math.max(t, n, r), s = o - a, c = (o + a) / 2, l = 0;
	s !== 0 && (o === t ? l = (n - r) / s + (n < r ? 6 : 0) : o === n ? l = (r - t) / s + 2 : o === r && (l = (t - n) / s + 4), l *= 60);
	let u = 0;
	return c !== 0 && c !== 255 && (u = (o - c) / Math.min(c, 255 - c)), {
		h: l,
		s: u * 100,
		l: c / 255 * 100,
		a: i
	};
}
//#endregion
//#region src/utilities/color-conversions/convertRgbToHex.ts
function C(e) {
	return "#" + Object.values(e).map((e, t) => Math.round(t === 3 ? e * 255 : e).toString(16).padStart(2, "0")).join("");
}
//#endregion
//#region src/utilities/color-conversions/convertRgbToHwb.ts
function w(e) {
	return y(h(S(e)));
}
//#endregion
//#region src/utilities/convert.ts
var T = {
	hex: {
		hex: (e) => e,
		hsl: (e) => S(m(e)),
		hsv: (e) => x(w(m(e))),
		hwb: (e) => w(m(e)),
		rgb: m
	},
	hsl: {
		hex: (e) => C(g(e)),
		hsl: (e) => e,
		hsv: h,
		hwb: (e) => w(g(e)),
		rgb: g
	},
	hsv: {
		hex: (e) => C(b(e)),
		hsl: v,
		hsv: (e) => e,
		hwb: y,
		rgb: b
	},
	hwb: {
		hex: (e) => C(b(x(e))),
		hsl: (e) => S(b(x(e))),
		hsv: x,
		hwb: (e) => e,
		rgb: (e) => b(x(e))
	},
	rgb: {
		hex: C,
		hsl: S,
		hsv: (e) => x(w(e)),
		hwb: w,
		rgb: (e) => e
	}
};
function E(e, t, n) {
	return T[e][t](n);
}
//#endregion
//#region src/utilities/formatAsCssColor.ts
function D({ format: e, color: t }, n) {
	return e === "hex" ? n && [5, 9].includes(t.length) ? t.substring(0, t.length - (t.length - 1) / 4) : t : `${e}(${Object.entries(t).slice(0, n ? 3 : 4).map(([t, n]) => {
		let r = p(e, t);
		return (t === "a" ? "/ " : "") + r.to(n);
	}).join(" ")})`;
}
//#endregion
//#region src/utilities/getNewThumbPosition.ts
function O(e, t, n) {
	let i = e.getBoundingClientRect(), a = t - i.left, o = n - i.top;
	return {
		x: i.width === 0 ? 0 : r(a / i.width * 100, 0, 100),
		y: i.height === 0 ? 0 : r((1 - o / i.height) * 100, 0, 100)
	};
}
//#endregion
//#region src/utilities/isValidHexColor.ts
function k(e) {
	return /^#(?:(?:[A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(e);
}
//#endregion
//#region src/utilities/detectFormat.ts
function A(e) {
	return "r" in e ? "rgb" : "w" in e ? "hwb" : "v" in e ? "hsv" : "s" in e ? "hsl" : null;
}
//#endregion
//#region src/utilities/parsePropsColor.ts
var j = {
	hsl: [
		"h",
		"s",
		"l",
		"a"
	],
	hwb: [
		"h",
		"w",
		"b",
		"a"
	],
	rgb: [
		"r",
		"g",
		"b",
		"a"
	]
};
function M(e) {
	if (typeof e != "string") {
		let t = A(e);
		return t === null ? null : {
			format: t,
			color: e
		};
	}
	if (e.startsWith("#")) return k(e) ? {
		format: "hex",
		color: e
	} : null;
	if (!e.includes("(")) {
		let t = document.createElement("canvas").getContext("2d");
		t.fillStyle = e;
		let n = t.fillStyle;
		return n === "#000000" && e !== "black" ? null : {
			format: "hex",
			color: n
		};
	}
	let [t, n] = e.split("("), r = t.substring(0, 3);
	if (!(r in j)) return null;
	let i = n.replace(/[,/)]/g, " ").replace(/\s+/g, " ").trim().split(" ");
	i.length === 3 && i.push("1");
	let a = j[r];
	return {
		format: r,
		color: Object.fromEntries(a.map((e, t) => [e, p(r, e).from(i[t])]))
	};
}
//#endregion
//#region src/CustomFormInput.ts
var N = class extends HTMLElement {
	static formAssociated = !0;
	#e = this.attachInternals();
	get labels() {
		return this.#e.labels;
	}
	get form() {
		return this.#e.form;
	}
	get shadowRoot() {
		return this.#e.shadowRoot;
	}
	get type() {
		return this.tagName.toLowerCase();
	}
	get validationMessage() {
		return this.#e.validationMessage;
	}
	get validity() {
		return this.#e.validity;
	}
	get willValidate() {
		return this.#e.willValidate;
	}
	checkValidity() {
		return this.#e.checkValidity();
	}
	reportValidity() {
		return this.#e.reportValidity();
	}
	setFormValue(...e) {
		this.#e.setFormValue(...e);
	}
}, P = {
	"alpha-channel": {
		type: String,
		property: "alphaChannel"
	},
	disabled: {
		type: Boolean,
		property: "disabled"
	},
	format: {
		type: String,
		property: "format"
	},
	id: {
		type: String,
		property: "id",
		reflected: !0
	},
	name: {
		type: String,
		property: "name",
		reflected: !0
	},
	readonly: {
		type: Boolean,
		property: "readOnly"
	},
	value: {
		type: String,
		property: "defaultValue"
	},
	"visible-formats": {
		type: Array,
		property: "visibleFormats"
	}
}, F = [
	"hex",
	"hsl",
	"hsv",
	"hwb",
	"rgb"
], I = class a extends N {
	static observedAttributes = Object.keys(P);
	static {
		window.customElements.get("color-picker") === void 0 && window.customElements.define("color-picker", a);
	}
	#e = !1;
	#t = !1;
	#n = {
		hex: "#ffffffff",
		hsl: {
			h: 0,
			s: 0,
			l: 100,
			a: 1
		},
		hsv: {
			h: 0,
			s: 0,
			v: 100,
			a: 1
		},
		hwb: {
			h: 0,
			w: 100,
			b: 0,
			a: 1
		},
		rgb: {
			r: 255,
			g: 255,
			b: 255,
			a: 1
		}
	};
	#r = "show";
	#i = "hsl";
	#a = [
		"hex",
		"hsl",
		"hwb",
		"rgb"
	];
	#o = null;
	#s = null;
	#c = !1;
	#l = 0;
	get [Symbol.toStringTag]() {
		return "ColorPicker";
	}
	get alphaChannel() {
		return this.#r;
	}
	set alphaChannel(e) {
		this.#r = e, this.#p(() => {
			this.#m();
		});
	}
	get defaultValue() {
		return this.getAttribute("value") ?? "";
	}
	set defaultValue(e) {
		this.setAttribute("value", e), this.#e || this.#u(e, { isUserTriggered: !1 });
	}
	get disabled() {
		return this.hasAttribute("disabled");
	}
	set disabled(e) {
		e ? this.setAttribute("disabled", "") : this.removeAttribute("disabled"), this.#p(() => {
			this.#m();
		});
	}
	get disabledState() {
		return this.disabled || this.#t;
	}
	set disabledState(e) {
		this.#t = e, this.#p(() => {
			this.#m();
		});
	}
	get format() {
		return this.#i;
	}
	set format(e) {
		e ||= "hsl", this.#i = this.visibleFormats.includes(e) ? e : this.visibleFormats[0], this.#p(() => {
			this.#m();
		});
	}
	get name() {
		return this.getAttribute("name") ?? "";
	}
	set name(e) {
		this.setAttribute("name", e);
	}
	get id() {
		return this.getAttribute("id") ?? "color-picker";
	}
	set id(e) {
		this.setAttribute("id", e), this.#p(() => {
			this.#m();
		});
	}
	get readOnly() {
		return this.hasAttribute("readonly");
	}
	set readOnly(e) {
		e ? this.setAttribute("readonly", "") : this.removeAttribute("readonly"), this.#p(() => {
			this.#m();
		});
	}
	get required() {
		return this.hasAttribute("required");
	}
	set required(e) {
		e ? this.setAttribute("required", "") : this.removeAttribute("required");
	}
	get value() {
		return D({
			format: "rgb",
			color: this.#n.rgb
		}, !1);
	}
	set value(e) {
		this.#u(e, { isUserTriggered: !0 });
	}
	#u(e, { isUserTriggered: t }) {
		let n = M(e);
		if (n === null || (t && (this.#e = !0), i(this.#n[n.format], n.color))) return;
		let r = { [n.format]: n.color };
		for (let e of F) e !== n.format && (r[e] = E(n.format, e, n.color));
		this.#n = r, this.setFormValue(this.value), this.#p(() => {
			this.#m(), this.#d("color-change"), t && (this.dispatchEvent(new Event("input")), this.dispatchEvent(new Event("change")));
		});
	}
	get visibleFormats() {
		return this.#a;
	}
	set visibleFormats(e) {
		this.#a = e, this.format = this.#i;
	}
	constructor() {
		super(), this.setFormValue(this.value);
	}
	connectedCallback() {
		this.isConnected && (this.ownerDocument.addEventListener("mousemove", this.#v, { passive: !1 }), this.ownerDocument.addEventListener("touchmove", this.#b, { passive: !1 }), this.ownerDocument.addEventListener("mouseup", this.#S), this.ownerDocument.addEventListener("touchend", this.#S), this.#h());
	}
	disconnectedCallback() {
		this.ownerDocument.removeEventListener("mousemove", this.#v), this.ownerDocument.removeEventListener("touchmove", this.#b), this.ownerDocument.removeEventListener("mouseup", this.#S), this.ownerDocument.removeEventListener("touchend", this.#S);
	}
	attributeChangedCallback(e, t, n) {
		if (n !== t) {
			let t, { property: r, type: i, reflected: a = !1 } = P[e];
			switch (i) {
				case Array:
					t = n === null ? null : n.split(",").map((e) => e.trim());
					break;
				case Boolean:
					t = n !== null;
					break;
				default:
					t = n;
					break;
			}
			(n !== null || !a) && (this[r] = t);
		}
	}
	formDisabledCallback(e) {
		this.disabledState = e;
	}
	formResetCallback() {
		this.#e = !1, this.#u(this.defaultValue || "#ffffffff", { isUserTriggered: !1 });
	}
	#d(e) {
		let t = this.alphaChannel === "hide", n = D({
			color: this.#n[this.format],
			format: this.format
		}, t), r, { hex: i, hsl: a, hwb: o, rgb: s } = this.#n;
		if (this.alphaChannel === "hide") {
			let e = this.#n.hex.length - 1, t = e % 4 == 0, n = e / (t ? 4 : 3);
			r = {
				hex: this.#n.hex.substring(0, this.#n.hex.length - (t ? n : 0)) + "f".repeat(n),
				hsl: {
					...a,
					a: 1
				},
				hwb: {
					...o,
					a: 1
				},
				rgb: {
					...s,
					a: 1
				}
			};
		} else r = {
			hex: i,
			hsl: a,
			hwb: o,
			rgb: s
		};
		this.dispatchEvent(new CustomEvent(e, { detail: {
			colors: r,
			cssColor: n
		} }));
	}
	#f() {
		let e = {
			...this.#n.rgb,
			a: 1
		};
		this.style.setProperty("--cp-color", D({
			format: "rgb",
			color: e
		}, !1)), !(this.#o === null || this.#s === null) && (this.#o.style.position = "relative", this.#o.style.backgroundColor = `hsl(${this.#n.hsl.h} 100% 50%)`, this.#o.style.backgroundImage = "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)", this.#s.style.boxSizing = "border-box", this.#s.style.position = "absolute", this.#s.style.left = `${this.#n.hsv.s}%`, this.#s.style.bottom = `${this.#n.hsv.v}%`);
	}
	#p(e) {
		this.#l++, queueMicrotask(e);
	}
	#m() {
		this.#l--, this.#l === 0 && this.#h();
	}
	#h() {
		this.isConnected && (this.classList.add("cp-color-picker"), n(this.#g(), this), this.#o = this.querySelector(".cp-color-space"), this.#s = this.querySelector(".cp-thumb"), this.#f());
	}
	#g() {
		let n = "👽";
		return e`
			${e`<div
			class="cp-color-space"
			@mousedown="${this.#_}"
			@touchstart="${this.#y}"
		>
			<div
				class="cp-thumb"
				tabIndex="${this.disabledState ? t : "0"}"
				aria-label="Color space thumb"
				@keydown="${this.#C}"
			></div>
		</div>`}
			${e`<div class="cp-range-input-group">
			${e`<label
			class="cp-range-input-label cp-range-input-label--hue"
			for="${this.id}-hue-slider"
		>
			<span class="cp-range-input-label-text cp-range-input-label-text--hue">Hue</span>

			<input
				form="${n}"
				class="cp-range-input cp-range-input--hue"
				id="${this.id}-hue-slider"
				type="range"
				min="0"
				max="360"
				step="1"
				.value="${this.#n.hsl.h}"
				?disabled="${this.disabledState}"
				?readonly="${this.readOnly}"
				@keydown="${this.#w}"
				@input="${(e) => this.#T(e, "h")}"
			>
		</label>`}
			${this.alphaChannel === "show" ? e`<label
			class="cp-range-input-label cp-range-input-label--alpha"
			for="${this.id}-alpha-slider"
		>
			<span class="cp-range-input-label-text cp-range-input-label-text--alpha">Alpha</span>

			<input
				form="${n}"
				class="cp-range-input cp-range-input--alpha"
				id="${this.id}-alpha-slider"
				type="range"
				min="0"
				max="1"
				step="0.01"
				.value="${this.#n.hsl.a}"
				?disabled="${this.disabledState}"
				?readonly="${this.readOnly}"
				@keydown="${this.#w}"
				@input="${(e) => this.#T(e, "a")}"
			>
		</label>` : ""}
		</div>`}
			${e`<button
			class="cp-copy-button"
			type="button"
			?disabled="${this.disabledState}"
			@click="${this.#O}"
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
		</button>`}
			${e`<div class="cp-color-input-wrapper">
			<div class="cp-color-input-group">
				${this.format === "hex" ? (() => {
			let t = this.#n.hex, r = this.alphaChannel === "hide" && [5, 9].includes(t.length) ? t.slice(0, -(t.length - 1) / 4) : t;
			return e`<label
				class="cp-hex-input-label"
				for="${this.id}-color-hex"
			>
				<span class="cp-color-input-label-text">Hex</span>

				<input
					form="${n}"
					class="cp-color-input"
					id="${this.id}-color-hex"
					type="text"
					.value="${r}"
					?disabled="${this.disabledState}"
					?readonly="${this.readOnly}"
					@change="${this.#E}"
				>
			</label>`;
		})() : ((t) => t.split("").concat(this.alphaChannel === "show" ? ["a"] : []).map((r) => {
			let i = p(t, r).to(this.#n[t][r]);
			return e`<label
					class="cp-color-input-label"
					id="${this.id}-color-${t}-${r}-label"
					for="${this.id}-color-${t}-${r}"
				>
					<span class="cp-color-input-label-text">${r.toUpperCase()}</span>

					<input
						form="${n}"
						class="cp-color-input"
						id="${this.id}-color-${t}-${r}"
						type="text"
						.value="${i}"
						?disabled="${this.disabledState}"
						?readonly="${this.readOnly}"
						@change="${(e) => this.#D(e, r)}"
					>
				</label>`;
		}))(this.format)}
			</div>
			${this.visibleFormats.length > 1 ? e`<button
			class="cp-switch-format-button"
			type="button"
			?disabled="${this.disabledState}"
			@click="${this.#k}"
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
		</button>` : ""}
		</div>`}
		`;
	}
	#_ = (e) => {
		this.#c = !0, this.#v(e);
	};
	#v = (e) => {
		e.buttons !== 1 || this.#c === !1 || !(this.#o instanceof HTMLElement) || this.disabledState || this.readOnly || this.#x(O(this.#o, e.clientX, e.clientY));
	};
	#y = (e) => {
		this.#c = !0, this.#b(e);
	};
	#b = (e) => {
		if (this.#c === !1 || !(this.#o instanceof HTMLElement) || this.disabledState || this.readOnly) return;
		e.preventDefault();
		let t = e.touches[0];
		this.#x(O(this.#o, t.clientX, t.clientY));
	};
	#x({ x: e, y: t }) {
		let n = Object.assign({}, this.#n.hsv);
		n.s = e, n.v = t, this.#u(n, { isUserTriggered: !0 });
	}
	#S = () => {
		this.#c = !1;
	};
	#C = (e) => {
		if (![
			"ArrowUp",
			"ArrowRight",
			"ArrowDown",
			"ArrowLeft"
		].includes(e.key) || !(this.#o instanceof HTMLElement) || this.disabledState || this.readOnly) return;
		e.preventDefault();
		let t = ["ArrowLeft", "ArrowDown"].includes(e.key) ? -1 : 1, n = ["ArrowLeft", "ArrowRight"].includes(e.key) ? "s" : "v", i = e.shiftKey ? 10 : 1, { s: a, v: o } = this.#n.hsv, s = n === "s" ? r(a + t * i, 0, 100) : a, c = n === "v" ? r(o + t * i, 0, 100) : o;
		this.#x({
			x: s,
			y: c
		});
	};
	#w = (e) => {
		if (![
			"ArrowUp",
			"ArrowRight",
			"ArrowDown",
			"ArrowLeft"
		].includes(e.key) || !e.shiftKey) return;
		let t = e.currentTarget, n = Number(t.step), i = ["ArrowLeft", "ArrowDown"].includes(e.key) ? -1 : 1, a = r(Number(t.value) + i * n * 10, Number(t.min), Number(t.max));
		t.value = String(a - i * n);
	};
	#T = (e, t) => {
		let n = e.currentTarget, r = Object.assign({}, this.#n.hsl);
		r[t] = Number(n.value), this.#u(r, { isUserTriggered: !0 });
	};
	#E = (e) => {
		let t = e.target;
		k(t.value) && this.#u(t.value, { isUserTriggered: !0 });
	};
	#D = (e, t) => {
		let n = e.target, r = this.format, i = Object.assign({}, this.#n[r]), a = p(r, t).from(n.value);
		Number.isNaN(a) || (i[t] = a, this.#u(i, { isUserTriggered: !0 }));
	};
	copyColor() {
		return this.#O();
	}
	#O = async () => {
		let e = this.alphaChannel === "hide", t = D({
			color: this.#n[this.format],
			format: this.format
		}, e);
		await window.navigator.clipboard.writeText(t), this.#d("color-copy");
	};
	switchFormat() {
		return this.#k();
	}
	#k = () => {
		let e = (this.visibleFormats.findIndex((e) => e === this.format) + 1) % this.visibleFormats.length;
		this.format = this.visibleFormats[e];
	};
};
//#endregion
export { I as ColorPicker };
