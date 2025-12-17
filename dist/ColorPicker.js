var Ft = Object.defineProperty;
var mt = (t) => {
  throw TypeError(t);
};
var Mt = (t, s, e) => s in t ? Ft(t, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[s] = e;
var ot = (t, s, e) => Mt(t, typeof s != "symbol" ? s + "" : s, e), lt = (t, s, e) => s.has(t) || mt("Cannot " + e);
var r = (t, s, e) => (lt(t, s, "read from private field"), e ? e.call(t) : s.get(t)), u = (t, s, e) => s.has(t) ? mt("Cannot add the same private member more than once") : s instanceof WeakSet ? s.add(t) : s.set(t, e), f = (t, s, e, i) => (lt(t, s, "write to private field"), i ? i.call(t, e) : s.set(t, e), e), l = (t, s, e) => (lt(t, s, "access private method"), e);
var ht = (t, s, e, i) => ({
  set _(n) {
    f(t, s, n, e);
  },
  get _() {
    return r(t, s, i);
  }
});
import { render as kt, html as y, nothing as Nt } from "lit-html";
function M(t, s, e) {
  return Math.max(s, Math.min(t, e));
}
function Lt(t, s) {
  if (typeof t == "string" || typeof s == "string")
    return t === s;
  for (const e in t)
    if (t[e] !== s[e])
      return !1;
  return !0;
}
function Ht(t, s) {
  const e = t.toFixed(s);
  return e.includes(".") ? e.replace(/\.?0+$/, "") : e;
}
const Ot = {
  deg: 1,
  grad: 0.9,
  rad: 180 / Math.PI,
  turn: 360
}, ct = {
  from(t) {
    return t.endsWith("%") ? F.from(t, { referenceValue: 1 }) : x.from(t, { min: 0, max: 1 });
  },
  to(t) {
    return x.to(t);
  }
}, ft = {
  from(t) {
    const s = t.match(/deg|g?rad|turn$/);
    if (s === null)
      return x.from(t);
    const e = s[0];
    return x.from(t.slice(0, -e.length)) * Ot[e];
  },
  to(t) {
    return x.to(t);
  }
}, x = {
  from(t, { min: s = Number.NEGATIVE_INFINITY, max: e = Number.POSITIVE_INFINITY } = {}) {
    return t.endsWith(".") ? NaN : M(Number(t), s, e);
  },
  to(t) {
    return Ht(t, 2);
  }
}, F = {
  from(t, { referenceValue: s = 100, min: e = 0, max: i = 100 } = {}) {
    return t.endsWith("%") ? x.from(t.slice(0, -1), { min: e, max: i }) * s / 100 : NaN;
  },
  to(t) {
    return x.to(t) + "%";
  }
}, ut = {
  from(t) {
    return t.endsWith("%") ? F.from(t, { referenceValue: 255 }) : x.from(t, { min: 0, max: 255 });
  },
  to(t) {
    return x.to(t);
  }
}, Rt = {
  hsl: {
    h: ft,
    s: F,
    l: F,
    a: ct
  },
  hwb: {
    h: ft,
    w: F,
    b: F,
    a: ct
  },
  rgb: {
    r: ut,
    g: ut,
    b: ut,
    a: ct
  }
};
function Z(t, s) {
  return Rt[t][s];
}
function _(t) {
  const s = [], e = t.length > 5 ? 2 : 1;
  for (let i = 1; i < t.length; i += e) {
    const n = t.substring(i, i + e).repeat(e % 2 + 1), a = parseInt(n, 16);
    s.push(i === 3 * e + 1 ? a / 255 : a);
  }
  return s.length === 3 && s.push(1), {
    r: s[0],
    g: s[1],
    b: s[2],
    a: s[3]
  };
}
function xt(t) {
  const s = t.l / 100, e = s + t.s / 100 * Math.min(s, 1 - s), i = e === 0 ? 0 : 200 * (1 - s / e);
  return {
    h: t.h,
    s: i,
    v: e * 100,
    a: t.a
  };
}
function X(t) {
  let s = t.h % 360;
  s < 0 && (s += 360);
  const e = t.s / 100, i = t.l / 100;
  return {
    r: dt(0, s, e, i) * 255,
    g: dt(8, s, e, i) * 255,
    b: dt(4, s, e, i) * 255,
    a: t.a
  };
}
function dt(t, s, e, i) {
  const n = (t + s / 30) % 12, a = e * Math.min(i, 1 - i);
  return i - a * Math.max(-1, Math.min(n - 3, 9 - n, 1));
}
function $t(t) {
  const s = t.s / 100, e = t.v / 100, i = e * (1 - s / 2);
  return {
    h: t.h,
    s: i === 0 || i === 1 ? 0 : (e - i) / Math.min(i, 1 - i) * 100,
    l: i * 100,
    a: t.a
  };
}
function Tt(t) {
  return {
    h: t.h,
    w: t.v * (100 - t.s) / 100,
    b: 100 - t.v,
    a: t.a
  };
}
function R(t) {
  return X($t(t));
}
function E(t) {
  const s = t.w / 100, e = t.b / 100;
  let i, n;
  const a = s + e;
  return a >= 1 ? (i = 0, n = s / a) : (n = 1 - e, i = (1 - s / n) * 100), {
    h: t.h,
    s: i,
    v: n * 100,
    a: t.a
  };
}
function J(t) {
  const { r: s, g: e, b: i, a: n } = t, a = Math.min(s, e, i), h = Math.max(s, e, i), c = h - a, p = (h + a) / 2;
  let m = 0;
  c !== 0 && (h === s ? m = (e - i) / c + (e < i ? 6 : 0) : h === e ? m = (i - s) / c + 2 : h === i && (m = (s - e) / c + 4), m *= 60);
  let S = 0;
  return p !== 0 && p !== 255 && (S = (h - p) / Math.min(p, 255 - p)), {
    h: m,
    s: S * 100,
    l: p / 255 * 100,
    a: n
  };
}
function G(t) {
  return "#" + Object.values(t).map((s, e) => Math.round(e === 3 ? s * 255 : s).toString(16).padStart(2, "0")).join("");
}
function D(t) {
  return Tt(xt(J(t)));
}
const Dt = {
  hex: {
    hex: (t) => t,
    hsl: (t) => J(_(t)),
    hsv: (t) => E(D(_(t))),
    hwb: (t) => D(_(t)),
    rgb: _
  },
  hsl: {
    hex: (t) => G(X(t)),
    hsl: (t) => t,
    hsv: xt,
    hwb: (t) => D(X(t)),
    rgb: X
  },
  hsv: {
    hex: (t) => G(R(t)),
    hsl: $t,
    hsv: (t) => t,
    hwb: Tt,
    rgb: R
  },
  hwb: {
    hex: (t) => G(R(E(t))),
    hsl: (t) => J(R(E(t))),
    hsv: E,
    hwb: (t) => t,
    rgb: (t) => R(E(t))
  },
  rgb: {
    hex: G,
    hsl: J,
    hsv: (t) => E(D(t)),
    hwb: D,
    rgb: (t) => t
  }
};
function Ut(t, s, e) {
  return Dt[t][s](e);
}
function K({ format: t, color: s }, e) {
  if (t === "hex")
    return e && [5, 9].includes(s.length) ? s.substring(0, s.length - (s.length - 1) / 4) : s;
  const i = Object.entries(s).slice(0, e ? 3 : 4).map(([n, a]) => {
    const h = Z(t, n);
    return (n === "a" ? "/ " : "") + h.to(a);
  });
  return `${t}(${i.join(" ")})`;
}
function gt(t, s, e) {
  const i = t.getBoundingClientRect(), n = s - i.left, a = e - i.top;
  return {
    x: i.width === 0 ? 0 : M(n / i.width * 100, 0, 100),
    y: i.height === 0 ? 0 : M((1 - a / i.height) * 100, 0, 100)
  };
}
function At(t) {
  return /^#(?:(?:[A-F0-9]{2}){3,4}|[A-F0-9]{3,4})$/i.test(t);
}
function Wt(t) {
  return "r" in t ? "rgb" : "w" in t ? "hwb" : "v" in t ? "hsv" : "s" in t ? "hsl" : null;
}
const vt = {
  hsl: ["h", "s", "l", "a"],
  hwb: ["h", "w", "b", "a"],
  rgb: ["r", "g", "b", "a"]
};
function qt(t) {
  if (typeof t != "string") {
    const c = Wt(t);
    return c === null ? null : { format: c, color: t };
  }
  if (t.startsWith("#"))
    return At(t) ? { format: "hex", color: t } : null;
  if (!t.includes("(")) {
    const c = document.createElement("canvas").getContext("2d");
    c.fillStyle = t;
    const p = c.fillStyle;
    return p === "#000000" && t !== "black" ? null : { format: "hex", color: p };
  }
  const [s, e] = t.split("("), i = s.substring(0, 3);
  if (!(i in vt))
    return null;
  const n = e.replace(/[,/)]/g, " ").replace(/\s+/g, " ").trim().split(" ");
  n.length === 3 && n.push("1");
  const a = vt[i], h = Object.fromEntries(a.map((c, p) => {
    const m = Z(i, c);
    return [
      c,
      m.from(n[p])
    ];
  }));
  return { format: i, color: h };
}
var v;
class Ct extends HTMLElement {
  constructor() {
    super(...arguments);
    u(this, v, this.attachInternals());
  }
  get labels() {
    return r(this, v).labels;
  }
  get form() {
    return r(this, v).form;
  }
  get shadowRoot() {
    return r(this, v).shadowRoot;
  }
  get type() {
    return this.tagName.toLowerCase();
  }
  get validationMessage() {
    return r(this, v).validationMessage;
  }
  get validity() {
    return r(this, v).validity;
  }
  get willValidate() {
    return r(this, v).willValidate;
  }
  checkValidity() {
    return r(this, v).checkValidity();
  }
  reportValidity() {
    return r(this, v).reportValidity();
  }
  setFormValue(...e) {
    r(this, v).setFormValue(...e);
  }
}
v = new WeakMap(), ot(Ct, "formAssociated", !0);
const yt = {
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
}, jt = ["hex", "hsl", "hsv", "hwb", "rgb"];
var k, U, d, W, N, q, g, w, C, L, o, $, pt, St, T, A, bt, It, tt, H, et, O, Q, V, st, j, B, it, rt, P, z;
const nt = class nt extends Ct {
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
    u(this, k, !1);
    u(this, U, !1);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    u(this, d, {
      hex: "#ffffffff",
      hsl: { h: 0, s: 0, l: 100, a: 1 },
      hsv: { h: 0, s: 0, v: 100, a: 1 },
      hwb: { h: 0, w: 100, b: 0, a: 1 },
      rgb: { r: 255, g: 255, b: 255, a: 1 }
    });
    u(this, W, "show");
    u(this, N, "hsl");
    u(this, q, ["hex", "hsl", "hwb", "rgb"]);
    u(this, g, null);
    u(this, w, null);
    /**
     * Tracks whether a pointer originated from within the color space.
     *
     * Only if it did do we want to run the logic of dragging the color space thumb around.
     */
    u(this, C, !1);
    /**
     * Tracks queued updates.
     */
    u(this, L, 0);
    u(this, tt, (e) => {
      f(this, C, !0), r(this, H).call(this, e);
    });
    u(this, H, (e) => {
      e.buttons !== 1 || r(this, C) === !1 || !(r(this, g) instanceof HTMLElement) || this.disabledState || this.readOnly || l(this, o, Q).call(this, gt(r(this, g), e.clientX, e.clientY));
    });
    u(this, et, (e) => {
      f(this, C, !0), r(this, O).call(this, e);
    });
    u(this, O, (e) => {
      if (r(this, C) === !1 || !(r(this, g) instanceof HTMLElement) || this.disabledState || this.readOnly)
        return;
      e.preventDefault();
      const i = e.touches[0];
      l(this, o, Q).call(this, gt(r(this, g), i.clientX, i.clientY));
    });
    u(this, V, () => {
      f(this, C, !1);
    });
    u(this, st, (e) => {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(e.key) || !(r(this, g) instanceof HTMLElement) || this.disabledState || this.readOnly)
        return;
      e.preventDefault();
      const i = ["ArrowLeft", "ArrowDown"].includes(e.key) ? -1 : 1, n = ["ArrowLeft", "ArrowRight"].includes(e.key) ? "s" : "v", a = e.shiftKey ? 10 : 1, { s: h, v: c } = r(this, d).hsv, p = n === "s" ? M(h + i * a, 0, 100) : h, m = n === "v" ? M(c + i * a, 0, 100) : c;
      l(this, o, Q).call(this, { x: p, y: m });
    });
    u(this, j, (e) => {
      if (!["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(e.key) || !e.shiftKey)
        return;
      const i = e.currentTarget, n = Number(i.step), a = ["ArrowLeft", "ArrowDown"].includes(e.key) ? -1 : 1, h = Number(i.value) + a * n * 10, c = M(h, Number(i.min), Number(i.max));
      i.value = String(c - a * n);
    });
    u(this, B, (e, i) => {
      const n = e.currentTarget, a = Object.assign({}, r(this, d).hsl);
      a[i] = Number(n.value), l(this, o, $).call(this, a, { isUserTriggered: !0 });
    });
    u(this, it, (e) => {
      const i = e.target;
      At(i.value) && l(this, o, $).call(this, i.value, { isUserTriggered: !0 });
    });
    u(this, rt, (e, i) => {
      const n = e.target, a = this.format, h = Object.assign({}, r(this, d)[a]), p = Z(a, i).from(n.value);
      Number.isNaN(p) || (h[i] = p, l(this, o, $).call(this, h, { isUserTriggered: !0 }));
    });
    u(this, P, async () => {
      const e = this.alphaChannel === "hide", i = K({ color: r(this, d)[this.format], format: this.format }, e);
      await window.navigator.clipboard.writeText(i), l(this, o, pt).call(this, "color-copy");
    });
    u(this, z, () => {
      const i = (this.visibleFormats.findIndex((n) => n === this.format) + 1) % this.visibleFormats.length;
      this.format = this.visibleFormats[i];
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
    return r(this, W);
  }
  set alphaChannel(e) {
    f(this, W, e), l(this, o, T).call(this, () => {
      l(this, o, A).call(this);
    });
  }
  get defaultValue() {
    return this.getAttribute("value") ?? "";
  }
  set defaultValue(e) {
    this.setAttribute("value", e), r(this, k) || l(this, o, $).call(this, e, { isUserTriggered: !1 });
  }
  /**
   * The form-associated element's disabled state. Controls the disabled state of the form controls and buttons that are part of the color picker. Does not change when an ancestor fieldset is disabled.
   */
  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(e) {
    e ? this.setAttribute("disabled", "") : this.removeAttribute("disabled"), l(this, o, T).call(this, () => {
      l(this, o, A).call(this);
    });
  }
  /**
   * The element's _effective_ disabled state. `true` if the element itself is disabled _or_ if the element is a descendant of a disabled `fieldset` element.
   */
  // Keeping track of this separetely to the `disabled` IDL attribute is necessary because that should only indicate if the element itself is disabled. However, sometimes we need to know whether the element is functionally disabled through _either_ its own disabled state _or_ an ancestor fieldset.
  get disabledState() {
    return this.disabled || r(this, U);
  }
  set disabledState(e) {
    f(this, U, e), l(this, o, T).call(this, () => {
      l(this, o, A).call(this);
    });
  }
  /**
   * The current color format. Changed by interacting with the “Switch format” button.
   */
  get format() {
    return r(this, N);
  }
  set format(e) {
    e = e || "hsl", f(this, N, this.visibleFormats.includes(e) ? e : this.visibleFormats[0]), l(this, o, T).call(this, () => {
      l(this, o, A).call(this);
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
    this.setAttribute("id", e), l(this, o, T).call(this, () => {
      l(this, o, A).call(this);
    });
  }
  get readOnly() {
    return this.hasAttribute("readonly");
  }
  set readOnly(e) {
    e ? this.setAttribute("readonly", "") : this.removeAttribute("readonly"), l(this, o, T).call(this, () => {
      l(this, o, A).call(this);
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
    return K({ format: "rgb", color: r(this, d).rgb }, !1);
  }
  /**
   * **Setter**: Sets the current color. Any valid CSS color can be used.
   *
   * Sets the dirty flag.
   */
  set value(e) {
    l(this, o, $).call(this, e, { isUserTriggered: !0 });
  }
  /**
   * A list of visible color formats. Controls for which formats the color `input` elements are shown and in which order the formats will be cycled through when activating the format switch button.
   */
  get visibleFormats() {
    return r(this, q);
  }
  set visibleFormats(e) {
    f(this, q, e), this.format = r(this, N);
  }
  connectedCallback() {
    this.isConnected && (this.ownerDocument.addEventListener("mousemove", r(this, H), { passive: !1 }), this.ownerDocument.addEventListener("touchmove", r(this, O), { passive: !1 }), this.ownerDocument.addEventListener("mouseup", r(this, V)), this.ownerDocument.addEventListener("touchend", r(this, V)), l(this, o, bt).call(this));
  }
  disconnectedCallback() {
    this.ownerDocument.removeEventListener("mousemove", r(this, H)), this.ownerDocument.removeEventListener("touchmove", r(this, O)), this.ownerDocument.removeEventListener("mouseup", r(this, V)), this.ownerDocument.removeEventListener("touchend", r(this, V));
  }
  attributeChangedCallback(e, i, n) {
    if (n !== i) {
      let a;
      const { property: h, type: c, reflected: p = !1 } = yt[e];
      switch (c) {
        case Array: {
          a = n !== null ? n.split(",").map((m) => m.trim()) : null;
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
    f(this, k, !1), l(this, o, $).call(this, this.defaultValue || "#ffffffff", { isUserTriggered: !1 });
  }
  /**
   * Copies the current color (determined by the active color format).
   *
   * For example, if the active color format is HSL, the copied text will be a valid CSS color in HSL format.
   *
   * Only works in secure browsing contexts (i.e. HTTPS).
   */
  copyColor() {
    return r(this, P).call(this);
  }
  /**
   * Sets the next active color format by cycling through `colorPicker.visibleFormats`.
   */
  switchFormat() {
    return r(this, z).call(this);
  }
};
k = new WeakMap(), U = new WeakMap(), d = new WeakMap(), W = new WeakMap(), N = new WeakMap(), q = new WeakMap(), g = new WeakMap(), w = new WeakMap(), C = new WeakMap(), L = new WeakMap(), o = new WeakSet(), /**
 * Set `value`.
 *
 * Sets the dirty flag **if `isUserTriggered` is `true`**.
 */
$ = function(e, { isUserTriggered: i }) {
  const n = qt(e);
  if (n === null || (i && f(this, k, !0), Lt(r(this, d)[n.format], n.color)))
    return;
  const a = { [n.format]: n.color };
  for (const h of jt)
    h !== n.format && (a[h] = Ut(n.format, h, n.color));
  f(this, d, a), this.setFormValue(this.value), l(this, o, T).call(this, () => {
    l(this, o, A).call(this), l(this, o, pt).call(this, "color-change"), i && (this.dispatchEvent(new Event("input")), this.dispatchEvent(new Event("change")));
  });
}, pt = function(e) {
  const i = this.alphaChannel === "hide", n = K({ color: r(this, d)[this.format], format: this.format }, i);
  let a;
  const { hex: h, hsl: c, hwb: p, rgb: m } = r(this, d);
  if (this.alphaChannel === "hide") {
    const S = r(this, d).hex.length - 1, Y = S % 4 === 0, b = S / (Y ? 4 : 3);
    a = {
      hex: r(this, d).hex.substring(0, r(this, d).hex.length - (Y ? b : 0)) + "f".repeat(b),
      hsl: { ...c, a: 1 },
      hwb: { ...p, a: 1 },
      rgb: { ...m, a: 1 }
    };
  } else
    a = { hex: h, hsl: c, hwb: p, rgb: m };
  this.dispatchEvent(new CustomEvent(e, {
    detail: {
      colors: a,
      cssColor: n
    }
  }));
}, /**
 * Sets the essential properties of the color picker as inline styles so that they can't be overridden.
 */
St = function() {
  const e = { ...r(this, d).rgb, a: 1 };
  this.style.setProperty("--cp-color", K({ format: "rgb", color: e }, !1)), !(r(this, g) === null || r(this, w) === null) && (r(this, g).style.position = "relative", r(this, g).style.backgroundColor = `hsl(${r(this, d).hsl.h} 100% 50%)`, r(this, g).style.backgroundImage = "linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)", r(this, w).style.boxSizing = "border-box", r(this, w).style.position = "absolute", r(this, w).style.left = `${r(this, d).hsv.s}%`, r(this, w).style.bottom = `${r(this, d).hsv.v}%`);
}, /**
 * Queues an update using `queueMicrotask`.
 *
 * The `callback` must call `this.#renderIfIdle()` which guarantees that `this.#updateCount` is tracked correctly.
 *
 * Using `queueMicrotask` ensures that multiple simultaneous changes to IDL attributes can be processed before applying their effects (which might depend on this having happened).
 */
T = function(e) {
  ht(this, L)._++, queueMicrotask(e);
}, A = function() {
  ht(this, L)._--, r(this, L) === 0 && l(this, o, bt).call(this);
}, /**
 * Renders the component.
 */
bt = function() {
  this.isConnected && (this.classList.add("cp-color-picker"), kt(l(this, o, It).call(this), this), f(this, g, this.querySelector(".cp-color-space")), f(this, w, this.querySelector(".cp-thumb")), l(this, o, St).call(this));
}, It = function() {
  const e = "👽", i = () => y`<div
			class="cp-color-space"
			@mousedown="${r(this, tt)}"
			@touchstart="${r(this, et)}"
		>
			<div
				class="cp-thumb"
				tabIndex="${this.disabledState ? Nt : "0"}"
				aria-label="Color space thumb"
				@keydown="${r(this, st)}"
			></div>
		</div>`, n = () => y`<label
			class="cp-range-input-label cp-range-input-label--hue"
			for="${this.id}-hue-slider"
		>
			<span class="cp-range-input-label-text cp-range-input-label-text--hue">Hue</span>

			<input
				form="${e}"
				class="cp-range-input cp-range-input--hue"
				id="${this.id}-hue-slider"
				type="range"
				min="0"
				max="360"
				step="1"
				.value="${r(this, d).hsl.h}"
				?disabled="${this.disabledState}"
				?readonly="${this.readOnly}"
				@keydown="${r(this, j)}"
				@input="${(b) => r(this, B).call(this, b, "h")}"
			>
		</label>`, a = () => y`<label
			class="cp-range-input-label cp-range-input-label--alpha"
			for="${this.id}-alpha-slider"
		>
			<span class="cp-range-input-label-text cp-range-input-label-text--alpha">Alpha</span>

			<input
				form="${e}"
				class="cp-range-input cp-range-input--alpha"
				id="${this.id}-alpha-slider"
				type="range"
				min="0"
				max="1"
				step="0.01"
				.value="${r(this, d).hsl.a}"
				?disabled="${this.disabledState}"
				?readonly="${this.readOnly}"
				@keydown="${r(this, j)}"
				@input="${(b) => r(this, B).call(this, b, "a")}"
			>
		</label>`, h = () => y`<div class="cp-range-input-group">
			${n()}
			${this.alphaChannel === "show" ? a() : ""}
		</div>`, c = () => y`<button
			class="cp-copy-button"
			type="button"
			?disabled="${this.disabledState}"
			@click="${r(this, P)}"
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
    const b = r(this, d).hex, at = this.alphaChannel === "hide" && [5, 9].includes(b.length) ? b.slice(0, -(b.length - 1) / 4) : b;
    return y`<label
				class="cp-hex-input-label"
				for="${this.id}-color-hex"
			>
				<span class="cp-color-input-label-text">Hex</span>

				<input
					form="${e}"
					class="cp-color-input"
					id="${this.id}-color-hex"
					type="text"
					.value="${at}"
					?disabled="${this.disabledState}"
					?readonly="${this.readOnly}"
					@change="${r(this, it)}"
				>
			</label>`;
  }, m = (b) => b.split("").concat(this.alphaChannel === "show" ? ["a"] : []).map((I) => {
    const Vt = Z(b, I).to(r(this, d)[b][I]);
    return y`<label
					class="cp-color-input-label"
					id="${this.id}-color-${b}-${I}-label"
					for="${this.id}-color-${b}-${I}"
				>
					<span class="cp-color-input-label-text">${I.toUpperCase()}</span>

					<input
						form="${e}"
						class="cp-color-input"
						id="${this.id}-color-${b}-${I}"
						type="text"
						.value="${Vt}"
						?disabled="${this.disabledState}"
						?readonly="${this.readOnly}"
						@change="${(Et) => r(this, rt).call(this, Et, I)}"
					>
				</label>`;
  }), S = () => y`<button
			class="cp-switch-format-button"
			type="button"
			?disabled="${this.disabledState}"
			@click="${r(this, z)}"
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
		</button>`, Y = () => y`<div class="cp-color-input-wrapper">
			<div class="cp-color-input-group">
				${this.format === "hex" ? p() : m(this.format)}
			</div>
			${this.visibleFormats.length > 1 ? S() : ""}
		</div>`;
  return y`
			${i()}
			${h()}
			${c()}
			${Y()}
		`;
}, tt = new WeakMap(), H = new WeakMap(), et = new WeakMap(), O = new WeakMap(), Q = function({ x: e, y: i }) {
  const n = Object.assign({}, r(this, d).hsv);
  n.s = e, n.v = i, l(this, o, $).call(this, n, { isUserTriggered: !0 });
}, V = new WeakMap(), st = new WeakMap(), j = new WeakMap(), B = new WeakMap(), it = new WeakMap(), rt = new WeakMap(), P = new WeakMap(), z = new WeakMap(), ot(nt, "observedAttributes", Object.keys(yt)), window.customElements.get("color-picker") === void 0 && window.customElements.define("color-picker", nt);
let wt = nt;
export {
  wt as ColorPicker
};
