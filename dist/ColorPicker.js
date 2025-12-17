var Et = Object.defineProperty;
var pt = (t) => {
  throw TypeError(t);
};
var It = (t, s, e) => s in t ? Et(t, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[s] = e;
var mt = (t, s, e) => It(t, typeof s != "symbol" ? s + "" : s, e), at = (t, s, e) => s.has(t) || pt("Cannot " + e);
var i = (t, s, e) => (at(t, s, "read from private field"), e ? e.call(t) : s.get(t)), u = (t, s, e) => s.has(t) ? pt("Cannot add the same private member more than once") : s instanceof WeakSet ? s.add(t) : s.set(t, e), f = (t, s, e, r) => (at(t, s, "write to private field"), r ? r.call(t, e) : s.set(t, e), e), l = (t, s, e) => (at(t, s, "access private method"), e);
var ot = (t, s, e, r) => ({
  set _(n) {
    f(t, s, n, e);
  },
  get _() {
    return i(t, s, r);
  }
});
import { render as Vt, html as v, nothing as Mt } from "lit-html";
function V(t, s, e) {
  return Math.max(s, Math.min(t, e));
}
function Nt(t, s) {
  if (typeof t == "string" || typeof s == "string")
    return t === s;
  for (const e in t)
    if (t[e] !== s[e])
      return !1;
  return !0;
}
function kt(t, s) {
  const e = t.toFixed(s);
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
const Lt = {
  deg: 1,
  grad: 0.9,
  rad: 180 / Math.PI,
  turn: 360
}, lt = {
  from(t) {
    return t.endsWith("%") ? I.from(t, { referenceValue: 1 }) : w.from(t, { min: 0, max: 1 });
  },
  to(t) {
    return w.to(t);
  }
}, bt = {
  from(t) {
    const s = t.match(/deg|g?rad|turn$/);
    if (s === null)
      return w.from(t);
    const e = s[0];
    return w.from(t.slice(0, -e.length)) * Lt[e];
  },
  to(t) {
    return w.to(t);
  }
}, w = {
  from(t, { min: s = Number.NEGATIVE_INFINITY, max: e = Number.POSITIVE_INFINITY } = {}) {
    return t.endsWith(".") ? NaN : V(Number(t), s, e);
  },
  to(t) {
    return kt(t, 2);
  }
}, I = {
  from(t, { referenceValue: s = 100, min: e = 0, max: r = 100 } = {}) {
    return t.endsWith("%") ? w.from(t.slice(0, -1), { min: e, max: r }) * s / 100 : NaN;
  },
  to(t) {
    return w.to(t) + "%";
  }
}, ht = {
  from(t) {
    return t.endsWith("%") ? I.from(t, { referenceValue: 255 }) : w.from(t, { min: 0, max: 255 });
  },
  to(t) {
    return w.to(t);
  }
}, Ht = {
  hsl: {
    h: bt,
    s: I,
    l: I,
    a: lt
  },
  hwb: {
    h: bt,
    w: I,
    b: I,
    a: lt
  },
  rgb: {
    r: ht,
    g: ht,
    b: ht,
    a: lt
  }
};
function Q(t, s) {
  return Ht[t][s];
}
function Y(t) {
  const s = [], e = t.length > 5 ? 2 : 1;
  for (let r = 1; r < t.length; r += e) {
    const n = t.substring(r, r + e).repeat(e % 2 + 1), a = parseInt(n, 16);
    s.push(r === 3 * e + 1 ? a / 255 : a);
  }
  return s.length === 3 && s.push(1), {
    r: s[0],
    g: s[1],
    b: s[2],
    a: s[3]
  };
}
function wt(t) {
  const s = t.l / 100, e = s + t.s / 100 * Math.min(s, 1 - s), r = e === 0 ? 0 : 200 * (1 - s / e);
  return {
    h: t.h,
    s: r,
    v: e * 100,
    a: t.a
  };
}
function K(t) {
  let s = t.h % 360;
  s < 0 && (s += 360);
  const e = t.s / 100, r = t.l / 100;
  return {
    r: ct(0, s, e, r) * 255,
    g: ct(8, s, e, r) * 255,
    b: ct(4, s, e, r) * 255,
    a: t.a
  };
}
function ct(t, s, e, r) {
  const n = (t + s / 30) % 12, a = e * Math.min(r, 1 - r);
  return r - a * Math.max(-1, Math.min(n - 3, 9 - n, 1));
}
function xt(t) {
  const s = t.s / 100, e = t.v / 100, r = e * (1 - s / 2);
  return {
    h: t.h,
    s: r === 0 || r === 1 ? 0 : (e - r) / Math.min(r, 1 - r) * 100,
    l: r * 100,
    a: t.a
  };
}
function $t(t) {
  return {
    h: t.h,
    w: t.v * (100 - t.s) / 100,
    b: 100 - t.v,
    a: t.a
  };
}
function O(t) {
  return K(xt(t));
}
function E(t) {
  const s = t.w / 100, e = t.b / 100;
  let r, n;
  const a = s + e;
  return a >= 1 ? (r = 0, n = s / a) : (n = 1 - e, r = (1 - s / n) * 100), {
    h: t.h,
    s: r,
    v: n * 100,
    a: t.a
  };
}
function X(t) {
  const { r: s, g: e, b: r, a: n } = t, a = Math.min(s, e, r), h = Math.max(s, e, r), c = h - a, p = (h + a) / 2;
  let b = 0;
  c !== 0 && (h === s ? b = (e - r) / c + (e < r ? 6 : 0) : h === e ? b = (r - s) / c + 2 : h === r && (b = (s - e) / c + 4), b *= 60);
  let C = 0;
  return p !== 0 && p !== 255 && (C = (h - p) / Math.min(p, 255 - p)), {
    h: b,
    s: C * 100,
    l: p / 255 * 100,
    a: n
  };
}
function _(t) {
  return "#" + Object.values(t).map((s, e) => Math.round(e === 3 ? s * 255 : s).toString(16).padStart(2, "0")).join("");
}
function R(t) {
  return $t(wt(X(t)));
}
const Ot = {
  hex: {
    hex: (t) => t,
    hsl: (t) => X(Y(t)),
    hsv: (t) => E(R(Y(t))),
    hwb: (t) => R(Y(t)),
    rgb: Y
  },
  hsl: {
    hex: (t) => _(K(t)),
    hsl: (t) => t,
    hsv: wt,
    hwb: (t) => R(K(t)),
    rgb: K
  },
  hsv: {
    hex: (t) => _(O(t)),
    hsl: xt,
    hsv: (t) => t,
    hwb: $t,
    rgb: O
  },
  hwb: {
    hex: (t) => _(O(E(t))),
    hsl: (t) => X(O(E(t))),
    hsv: E,
    hwb: (t) => t,
    rgb: (t) => O(E(t))
  },
  rgb: {
    hex: _,
    hsl: X,
    hsv: (t) => E(R(t)),
    hwb: R,
    rgb: (t) => t
  }
};
function Rt(t, s, e) {
  return Ot[t][s](e);
}
function G({ format: t, color: s }, e) {
  if (t === "hex")
    return e && [5, 9].includes(s.length) ? s.substring(0, s.length - (s.length - 1) / 4) : s;
  const r = Object.entries(s).slice(0, e ? 3 : 4).map(([n, a]) => {
    const h = Q(t, n);
    return (n === "a" ? "/ " : "") + h.to(a);
  });
  return `${t}(${r.join(" ")})`;
}
function ft(t, s, e) {
  const r = t.getBoundingClientRect(), n = s - r.left, a = e - r.top;
  return {
    x: r.width === 0 ? 0 : V(n / r.width * 100, 0, 100),
    y: r.height === 0 ? 0 : V((1 - a / r.height) * 100, 0, 100)
  };
}
function Tt(t) {
  return /^#(?:(?:[A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(t);
}
function Dt(t) {
  return "r" in t ? "rgb" : "w" in t ? "hwb" : "v" in t ? "hsv" : "s" in t ? "hsl" : null;
}
const gt = {
  hsl: ["h", "s", "l", "a"],
  hwb: ["h", "w", "b", "a"],
  rgb: ["r", "g", "b", "a"]
};
function Ut(t) {
  if (typeof t != "string") {
    const c = Dt(t);
    return c === null ? null : { format: c, color: t };
  }
  if (t.startsWith("#"))
    return Tt(t) ? { format: "hex", color: t } : null;
  if (!t.includes("(")) {
    const c = document.createElement("canvas").getContext("2d");
    c.fillStyle = t;
    const p = c.fillStyle;
    return p === "#000000" && t !== "black" ? null : { format: "hex", color: p };
  }
  const [s, e] = t.split("("), r = s.substring(0, 3);
  if (!(r in gt))
    return null;
  const n = e.replace(/[,/)]/g, " ").replace(/\s+/g, " ").trim().split(" ");
  n.length === 3 && n.push("1");
  const a = gt[r], h = Object.fromEntries(a.map((c, p) => {
    const b = Q(r, c);
    return [
      c,
      b.from(n[p])
    ];
  }));
  return { format: r, color: h };
}
class Wt extends HTMLElement {
  static formAssociated = !0;
  #t = this.attachInternals();
  get labels() {
    return this.#t.labels;
  }
  get form() {
    return this.#t.form;
  }
  get shadowRoot() {
    return this.#t.shadowRoot;
  }
  get type() {
    return this.tagName.toLowerCase();
  }
  get validationMessage() {
    return this.#t.validationMessage;
  }
  get validity() {
    return this.#t.validity;
  }
  get willValidate() {
    return this.#t.willValidate;
  }
  checkValidity() {
    return this.#t.checkValidity();
  }
  reportValidity() {
    return this.#t.reportValidity();
  }
  setFormValue(...s) {
    this.#t.setFormValue(...s);
  }
}
const vt = {
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
}, qt = ["hex", "hsl", "hsv", "hwb", "rgb"];
var M, D, d, U, N, W, g, y, A, k, o, x, ut, At, $, T, dt, Ct, Z, L, tt, H, J, F, et, q, j, st, rt, B, P;
const it = class it extends Wt {
  constructor() {
    super();
    u(this, o);
    /**
     * Indicates when changes to the `value` content attribute *shouldn't* be reflected by its IDL attribute.
     *
     * This happens as soon as the user made changes to the form value by changing the current color (1) via the GUI or (2) by updating it programmatically.
     *
     * A form reset will reset this flag.
     */
    u(this, M, !1);
    u(this, D, !1);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    u(this, d, {
      hex: "#ffffffff",
      hsl: { h: 0, s: 0, l: 100, a: 1 },
      hsv: { h: 0, s: 0, v: 100, a: 1 },
      hwb: { h: 0, w: 100, b: 0, a: 1 },
      rgb: { r: 255, g: 255, b: 255, a: 1 }
    });
    u(this, U, "show");
    u(this, N, "hsl");
    u(this, W, ["hex", "hsl", "hwb", "rgb"]);
    u(this, g, null);
    u(this, y, null);
    /**
     * Tracks whether a pointer originated from within the color space.
     *
     * Only if it did do we want to run the logic of dragging the color space thumb around.
     */
    u(this, A, !1);
    /**
     * Tracks queued updates.
     */
    u(this, k, 0);
    u(this, Z, (e) => {
      f(this, A, !0), i(this, L).call(this, e);
    });
    u(this, L, (e) => {
      e.buttons !== 1 || i(this, A) === !1 || !(i(this, g) instanceof HTMLElement) || this.disabledState || this.readOnly || l(this, o, J).call(this, ft(i(this, g), e.clientX, e.clientY));
    });
    u(this, tt, (e) => {
      f(this, A, !0), i(this, H).call(this, e);
    });
    u(this, H, (e) => {
      if (i(this, A) === !1 || !(i(this, g) instanceof HTMLElement) || this.disabledState || this.readOnly)
        return;
      e.preventDefault();
      const r = e.touches[0];
      l(this, o, J).call(this, ft(i(this, g), r.clientX, r.clientY));
    });
    u(this, F, () => {
      f(this, A, !1);
    });
    u(this, et, (e) => {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(e.key) || !(i(this, g) instanceof HTMLElement) || this.disabledState || this.readOnly)
        return;
      e.preventDefault();
      const r = ["ArrowLeft", "ArrowDown"].includes(e.key) ? -1 : 1, n = ["ArrowLeft", "ArrowRight"].includes(e.key) ? "s" : "v", a = e.shiftKey ? 10 : 1, { s: h, v: c } = i(this, d).hsv, p = n === "s" ? V(h + r * a, 0, 100) : h, b = n === "v" ? V(c + r * a, 0, 100) : c;
      l(this, o, J).call(this, { x: p, y: b });
    });
    u(this, q, (e) => {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(e.key) || !e.shiftKey)
        return;
      const r = e.currentTarget, n = Number(r.step), a = ["ArrowLeft", "ArrowDown"].includes(e.key) ? -1 : 1, h = Number(r.value) + a * n * 10, c = V(h, Number(r.min), Number(r.max));
      r.value = String(c - a * n);
    });
    u(this, j, (e, r) => {
      const n = e.currentTarget, a = Object.assign({}, i(this, d).hsl);
      a[r] = Number(n.value), l(this, o, x).call(this, a, { isUserTriggered: !0 });
    });
    u(this, st, (e) => {
      const r = e.target;
      Tt(r.value) && l(this, o, x).call(this, r.value, { isUserTriggered: !0 });
    });
    u(this, rt, (e, r) => {
      const n = e.target, a = this.format, h = Object.assign({}, i(this, d)[a]), p = Q(a, r).from(n.value);
      Number.isNaN(p) || (h[r] = p, l(this, o, x).call(this, h, { isUserTriggered: !0 }));
    });
    u(this, B, async () => {
      const e = this.alphaChannel === "hide", r = G({ color: i(this, d)[this.format], format: this.format }, e);
      await window.navigator.clipboard.writeText(r), l(this, o, ut).call(this, "color-copy");
    });
    u(this, P, () => {
      const r = (this.visibleFormats.findIndex((n) => n === this.format) + 1) % this.visibleFormats.length;
      this.format = this.visibleFormats[r];
    });
    this.setFormValue(this.value);
  }
  get [Symbol.toStringTag]() {
    return "ColorPicker";
  }
  /**
   * Whether to show input controls for a color’s alpha channel. If set to `'hide'`, the alpha range input and the alpha channel input are hidden, the “Copy color” button will copy a CSS color value without alpha channel, and the object emitted in a `color-change` event will have a `cssColor` property value without alpha channel.
   */
  get alphaChannel() {
    return i(this, U);
  }
  set alphaChannel(e) {
    f(this, U, e), l(this, o, $).call(this, () => {
      l(this, o, T).call(this);
    });
  }
  get defaultValue() {
    return this.getAttribute("value") ?? "";
  }
  set defaultValue(e) {
    this.setAttribute("value", e), i(this, M) || l(this, o, x).call(this, e, { isUserTriggered: !1 });
  }
  /**
   * The form-associated element's disabled state. Controls the disabled state of the form controls and buttons that are part of the color picker. Does not change when an ancestor fieldset is disabled.
   */
  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(e) {
    e ? this.setAttribute("disabled", "") : this.removeAttribute("disabled"), l(this, o, $).call(this, () => {
      l(this, o, T).call(this);
    });
  }
  /**
   * The element's _effective_ disabled state. `true` if the element itself is disabled _or_ if the element is a descendant of a disabled `fieldset` element.
   */
  // Keeping track of this separetely to the `disabled` IDL attribute is necessary because that should only indicate if the element itself is disabled. However, sometimes we need to know whether the element is functionally disabled through _either_ its own disabled state _or_ an ancestor fieldset.
  get disabledState() {
    return this.disabled || i(this, D);
  }
  set disabledState(e) {
    f(this, D, e), l(this, o, $).call(this, () => {
      l(this, o, T).call(this);
    });
  }
  /**
   * The current color format. Changed by interacting with the “Switch format” button.
   */
  get format() {
    return i(this, N);
  }
  set format(e) {
    e = e || "hsl", f(this, N, this.visibleFormats.includes(e) ? e : this.visibleFormats[0]), l(this, o, $).call(this, () => {
      l(this, o, T).call(this);
    });
  }
  get name() {
    return this.getAttribute("name") ?? "";
  }
  set name(e) {
    this.setAttribute("name", e);
  }
  /**
   * ID of the form-associated element. Will be used to prefix all form controls’ `id` and `for` attribute values.
   */
  get id() {
    return this.getAttribute("id") ?? "color-picker";
  }
  set id(e) {
    this.setAttribute("id", e), l(this, o, $).call(this, () => {
      l(this, o, T).call(this);
    });
  }
  get readOnly() {
    return this.hasAttribute("readonly");
  }
  set readOnly(e) {
    e ? this.setAttribute("readonly", "") : this.removeAttribute("readonly"), l(this, o, $).call(this, () => {
      l(this, o, T).call(this);
    });
  }
  get required() {
    return this.hasAttribute("required");
  }
  set required(e) {
    e ? this.setAttribute("required", "") : this.removeAttribute("required");
  }
  /**
   * Value of the form-associated element.
   *
   * **Getter**: Returns the current color as a string in functional RGB notation (e.g. `rgb(255 255 255 / 1)`).
   */
  get value() {
    return G({ format: "rgb", color: i(this, d).rgb }, !1);
  }
  /**
   * **Setter**: Sets the current color. Any valid CSS color can be used.
   *
   * Sets the dirty flag.
   */
  set value(e) {
    l(this, o, x).call(this, e, { isUserTriggered: !0 });
  }
  /**
   * A list of visible color formats. Controls for which formats the color `input` elements are shown and in which order the formats will be cycled through when activating the format switch button.
   */
  get visibleFormats() {
    return i(this, W);
  }
  set visibleFormats(e) {
    f(this, W, e), this.format = i(this, N);
  }
  connectedCallback() {
    this.isConnected && (this.ownerDocument.addEventListener("mousemove", i(this, L), { passive: !1 }), this.ownerDocument.addEventListener("touchmove", i(this, H), { passive: !1 }), this.ownerDocument.addEventListener("mouseup", i(this, F)), this.ownerDocument.addEventListener("touchend", i(this, F)), l(this, o, dt).call(this));
  }
  disconnectedCallback() {
    this.ownerDocument.removeEventListener("mousemove", i(this, L)), this.ownerDocument.removeEventListener("touchmove", i(this, H)), this.ownerDocument.removeEventListener("mouseup", i(this, F)), this.ownerDocument.removeEventListener("touchend", i(this, F));
  }
  attributeChangedCallback(e, r, n) {
    if (n !== r) {
      let a;
      const { property: h, type: c, reflected: p = !1 } = vt[e];
      switch (c) {
        case Array: {
          a = n !== null ? n.split(",").map((b) => b.trim()) : null;
          break;
        }
        case Boolean: {
          a = n !== null;
          break;
        }
        default: {
          a = n;
          break;
        }
      }
      (n !== null || !p) && (this[h] = a);
    }
  }
  formDisabledCallback(e) {
    this.disabledState = e;
  }
  /**
   * Resets the dirty flag and initializes the color picker anew using the value of the `value` content attribute, if set, or; otherwise, the default color.
   */
  // This relies on all internal form controls being disassociated from their form so that they don't reset their values per the default reset algorithm. This would interfere with the logic in this callback.
  formResetCallback() {
    f(this, M, !1), l(this, o, x).call(this, this.defaultValue || "#ffffffff", { isUserTriggered: !1 });
  }
  /**
   * Copies the current color (determined by the active color format).
   *
   * For example, if the active color format is HSL, the copied text will be a valid CSS color in HSL format.
   *
   * Only works in secure browsing contexts (i.e. HTTPS).
   */
  copyColor() {
    return i(this, B).call(this);
  }
  /**
   * Sets the next active color format by cycling through `colorPicker.visibleFormats`.
   */
  switchFormat() {
    return i(this, P).call(this);
  }
};
M = new WeakMap(), D = new WeakMap(), d = new WeakMap(), U = new WeakMap(), N = new WeakMap(), W = new WeakMap(), g = new WeakMap(), y = new WeakMap(), A = new WeakMap(), k = new WeakMap(), o = new WeakSet(), /**
 * Set `value`.
 *
 * Sets the dirty flag **if `isUserTriggered` is `true`**.
 */
x = function(e, { isUserTriggered: r }) {
  const n = Ut(e);
  if (n === null || (r && f(this, M, !0), Nt(i(this, d)[n.format], n.color)))
    return;
  const a = { [n.format]: n.color };
  for (const h of qt)
    h !== n.format && (a[h] = Rt(n.format, h, n.color));
  f(this, d, a), this.setFormValue(this.value), l(this, o, $).call(this, () => {
    l(this, o, T).call(this), l(this, o, ut).call(this, "color-change"), r && (this.dispatchEvent(new Event("input")), this.dispatchEvent(new Event("change")));
  });
}, ut = function(e) {
  const r = this.alphaChannel === "hide", n = G({ color: i(this, d)[this.format], format: this.format }, r);
  let a;
  const { hex: h, hsl: c, hwb: p, rgb: b } = i(this, d);
  if (this.alphaChannel === "hide") {
    const C = i(this, d).hex.length - 1, z = C % 4 === 0, m = C / (z ? 4 : 3);
    a = {
      hex: i(this, d).hex.substring(0, i(this, d).hex.length - (z ? m : 0)) + "f".repeat(m),
      hsl: { ...c, a: 1 },
      hwb: { ...p, a: 1 },
      rgb: { ...b, a: 1 }
    };
  } else
    a = { hex: h, hsl: c, hwb: p, rgb: b };
  this.dispatchEvent(new CustomEvent(e, {
    detail: {
      colors: a,
      cssColor: n
    }
  }));
}, /**
 * Sets the essential properties of the color picker as inline styles so that they can't be overridden.
 */
At = function() {
  const e = { ...i(this, d).rgb, a: 1 };
  this.style.setProperty("--cp-color", G({ format: "rgb", color: e }, !1)), !(i(this, g) === null || i(this, y) === null) && (i(this, g).style.position = "relative", i(this, g).style.backgroundColor = `hsl(${i(this, d).hsl.h} 100% 50%)`, i(this, g).style.backgroundImage = "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)", i(this, y).style.boxSizing = "border-box", i(this, y).style.position = "absolute", i(this, y).style.left = `${i(this, d).hsv.s}%`, i(this, y).style.bottom = `${i(this, d).hsv.v}%`);
}, /**
 * Queues an update using `queueMicrotask`.
 *
 * The `callback` must call `this.#renderIfIdle()` which guarantees that `this.#updateCount` is tracked correctly.
 *
 * Using `queueMicrotask` ensures that multiple simultaneous changes to IDL attributes can be processed before applying their effects (which might depend on this having happened).
 */
$ = function(e) {
  ot(this, k)._++, queueMicrotask(e);
}, T = function() {
  ot(this, k)._--, i(this, k) === 0 && l(this, o, dt).call(this);
}, /**
 * Renders the component.
 */
dt = function() {
  this.isConnected && (this.classList.add("cp-color-picker"), Vt(l(this, o, Ct).call(this), this), f(this, g, this.querySelector(".cp-color-space")), f(this, y, this.querySelector(".cp-thumb")), l(this, o, At).call(this));
}, Ct = function() {
  const r = () => v`<div
			class="cp-color-space"
			@mousedown="${i(this, Z)}"
			@touchstart="${i(this, tt)}"
		>
			<div
				class="cp-thumb"
				tabIndex="${this.disabledState ? Mt : "0"}"
				aria-label="Color space thumb"
				@keydown="${i(this, et)}"
			></div>
		</div>`, n = () => v`<label
			class="cp-range-input-label cp-range-input-label--hue"
			for="${this.id}-hue-slider"
		>
			<span class="cp-range-input-label-text cp-range-input-label-text--hue">Hue</span>

			<input
				form="${"👽"}"
				class="cp-range-input cp-range-input--hue"
				id="${this.id}-hue-slider"
				type="range"
				min="0"
				max="360"
				step="1"
				.value="${i(this, d).hsl.h}"
				?disabled="${this.disabledState}"
				?readonly="${this.readOnly}"
				@keydown="${i(this, q)}"
				@input="${(m) => i(this, j).call(this, m, "h")}"
			>
		</label>`, a = () => v`<label
			class="cp-range-input-label cp-range-input-label--alpha"
			for="${this.id}-alpha-slider"
		>
			<span class="cp-range-input-label-text cp-range-input-label-text--alpha">Alpha</span>

			<input
				form="${"👽"}"
				class="cp-range-input cp-range-input--alpha"
				id="${this.id}-alpha-slider"
				type="range"
				min="0"
				max="1"
				step="0.01"
				.value="${i(this, d).hsl.a}"
				?disabled="${this.disabledState}"
				?readonly="${this.readOnly}"
				@keydown="${i(this, q)}"
				@input="${(m) => i(this, j).call(this, m, "a")}"
			>
		</label>`, h = () => v`<div class="cp-range-input-group">
			${n()}
			${this.alphaChannel === "show" ? a() : ""}
		</div>`, c = () => v`<button
			class="cp-copy-button"
			type="button"
			?disabled="${this.disabledState}"
			@click="${i(this, B)}"
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
		</button>`, p = () => {
    const m = i(this, d).hex, nt = this.alphaChannel === "hide" && [5, 9].includes(m.length) ? m.slice(0, -(m.length - 1) / 4) : m;
    return v`<label
				class="cp-hex-input-label"
				for="${this.id}-color-hex"
			>
				<span class="cp-color-input-label-text">Hex</span>

				<input
					form="${"👽"}"
					class="cp-color-input"
					id="${this.id}-color-hex"
					type="text"
					.value="${nt}"
					?disabled="${this.disabledState}"
					?readonly="${this.readOnly}"
					@change="${i(this, st)}"
				>
			</label>`;
  }, b = (m) => m.split("").concat(this.alphaChannel === "show" ? ["a"] : []).map((S) => {
    const St = Q(m, S).to(i(this, d)[m][S]);
    return v`<label
					class="cp-color-input-label"
					id="${this.id}-color-${m}-${S}-label"
					for="${this.id}-color-${m}-${S}"
				>
					<span class="cp-color-input-label-text">${S.toUpperCase()}</span>

					<input
						form="${"👽"}"
						class="cp-color-input"
						id="${this.id}-color-${m}-${S}"
						type="text"
						.value="${St}"
						?disabled="${this.disabledState}"
						?readonly="${this.readOnly}"
						@change="${(Ft) => i(this, rt).call(this, Ft, S)}"
					>
				</label>`;
  }), C = () => v`<button
			class="cp-switch-format-button"
			type="button"
			?disabled="${this.disabledState}"
			@click="${i(this, P)}"
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
		</button>`, z = () => v`<div class="cp-color-input-wrapper">
			<div class="cp-color-input-group">
				${this.format === "hex" ? p() : b(this.format)}
			</div>
			${this.visibleFormats.length > 1 ? C() : ""}
		</div>`;
  return v`
			${r()}
			${h()}
			${c()}
			${z()}
		`;
}, Z = new WeakMap(), L = new WeakMap(), tt = new WeakMap(), H = new WeakMap(), J = function({ x: e, y: r }) {
  const n = Object.assign({}, i(this, d).hsv);
  n.s = e, n.v = r, l(this, o, x).call(this, n, { isUserTriggered: !0 });
}, F = new WeakMap(), et = new WeakMap(), q = new WeakMap(), j = new WeakMap(), st = new WeakMap(), rt = new WeakMap(), B = new WeakMap(), P = new WeakMap(), mt(it, "observedAttributes", Object.keys(vt)), window.customElements.get("color-picker") === void 0 && window.customElements.define("color-picker", it);
let yt = it;
export {
  yt as ColorPicker
};
