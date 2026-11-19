/*!
 * OverlayScrollbars
 * Version: 2.17.1
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
var OverlayScrollbarsGlobal = function(t) {
  "use strict";
  const createCache = (t, n) => {
    const {o: o, i: s, u: e} = t;
    let c = o;
    let r;
    const cacheUpdateContextual = (t, n) => {
      const o = c;
      const i = t;
      const l = n || (s ? !s(o, i) : o !== i);
      if (l || e) {
        c = i;
        r = o;
      }
      return [ c, l, r ];
    };
    const cacheUpdateIsolated = t => cacheUpdateContextual(n(c, r), t);
    const getCurrentCache = t => [ c, !!t, r ];
    return [ n ? cacheUpdateIsolated : cacheUpdateContextual, getCurrentCache ];
  };
  const n = typeof window !== "undefined" && typeof HTMLElement !== "undefined" && !!window.document;
  const o = n ? window : {};
  const s = Math.max;
  const e = Math.min;
  const c = Math.round;
  const r = Math.abs;
  const i = Math.sign;
  const l = o.cancelAnimationFrame;
  const a = o.requestAnimationFrame;
  const u = o.setTimeout;
  const f = o.clearTimeout;
  const getApi = t => typeof o[t] !== "undefined" ? o[t] : void 0;
  const _ = getApi("MutationObserver");
  const d = getApi("IntersectionObserver");
  const p = getApi("ResizeObserver");
  const v = getApi("WeakRef");
  const g = getApi("ScrollTimeline");
  const isUndefined = t => t === void 0;
  const isNull = t => t === null;
  const isNumber = t => typeof t === "number";
  const isString = t => typeof t === "string";
  const isBoolean = t => typeof t === "boolean";
  const isFunction = t => typeof t === "function";
  const isArray = t => Array.isArray(t);
  const isObject = t => typeof t === "object" && !isArray(t) && !isNull(t);
  const isArrayLike = t => {
    const n = !!t && t.length;
    const o = isNumber(n) && n > -1 && n % 1 == 0;
    return isArray(t) || !isFunction(t) && o ? n > 0 && isObject(t) ? n - 1 in t : true : false;
  };
  const isPlainObject = t => !!t && t.constructor === Object;
  const isHTMLElement = t => t instanceof HTMLElement;
  const isElement = t => t instanceof Element;
  const animationCurrentTime = () => performance.now();
  const animateNumber = (t, n, o, e, c) => {
    let r = 0;
    const i = animationCurrentTime();
    const u = s(0, o);
    const frame = o => {
      const l = animationCurrentTime();
      const f = l - i;
      const _ = f >= u;
      const d = o ? 1 : 1 - (s(0, i + u - l) / u || 0);
      const p = (n - t) * (isFunction(c) ? c(d, d * u, 0, 1, u) : d) + t;
      const v = _ || d === 1;
      e(p, d, v);
      r = v ? 0 : a((() => frame()));
    };
    frame();
    return t => {
      l(r);
      if (t) {
        frame(t);
      }
    };
  };
  function each(t, n) {
    if (isArrayLike(t)) {
      for (let o = 0; o < t.length; o++) {
        if (n(t[o], o, t) === false) {
          break;
        }
      }
    } else if (t) {
      each(Object.keys(t), (o => n(t[o], o, t)));
    }
    return t;
  }
  const inArray = (t, n) => t.indexOf(n) >= 0;
  const concat = (t, n) => t.concat(n);
  const push = (t, n, o) => {
    if (!isString(n) && isArrayLike(n)) {
      Array.prototype.push.apply(t, n);
    } else {
      t.push(n);
    }
    return t;
  };
  const from = t => Array.from(t || []);
  const createOrKeepArray = t => {
    if (isArray(t)) {
      return t;
    }
    return !isString(t) && isArrayLike(t) ? from(t) : [ t ];
  };
  const isEmptyArray = t => !!t && !t.length;
  const deduplicateArray = t => from(new Set(t));
  const runEachAndClear = (t, n, o) => {
    const runFn = t => t ? t.apply(void 0, n || []) : true;
    each(t, runFn);
    if (!o) {
      t.length = 0;
    }
  };
  const h = "paddingTop";
  const b = "paddingRight";
  const y = "paddingLeft";
  const w = "paddingBottom";
  const S = "marginLeft";
  const m = "marginRight";
  const O = "marginBottom";
  const C = "overflowX";
  const $ = "overflowY";
  const x = "width";
  const H = "height";
  const E = "visible";
  const D = "hidden";
  const z = "scroll";
  const capitalizeFirstLetter = t => {
    const n = String(t || "");
    return n ? n[0].toUpperCase() + n.slice(1) : "";
  };
  const equal = (t, n, o, s) => {
    if (t && n) {
      let s = true;
      each(o, (o => {
        const e = t[o];
        const c = n[o];
        if (e !== c) {
          s = false;
        }
      }));
      return s;
    }
    return false;
  };
  const equalWH = (t, n) => equal(t, n, [ "w", "h" ]);
  const equalXY = (t, n) => equal(t, n, [ "x", "y" ]);
  const equalTRBL = (t, n) => equal(t, n, [ "t", "r", "b", "l" ]);
  const bind = (t, ...n) => t.bind(0, ...n);
  const selfClearTimeout = t => {
    let n;
    const o = t ? u : a;
    const s = t ? f : l;
    return [ e => {
      s(n);
      n = o((() => e()), isFunction(t) ? t() : t);
    }, () => s(n) ];
  };
  const getDebouncer = t => {
    const n = isFunction(t) ? t() : t;
    if (isNumber(n)) {
      const t = n ? u : a;
      const o = n ? f : l;
      return s => {
        const e = t((() => s()), n);
        return () => {
          o(e);
        };
      };
    }
    return n && n._;
  };
  const debounce = (t, n) => {
    const {p: o, v: s, S: e, m: c} = n || {};
    let r;
    let i;
    let l;
    let a;
    const clear = () => {
      if (i) {
        i();
      }
      if (r) {
        r();
      }
      a = i = r = l = void 0;
    };
    const u = function invokeFunctionToDebounce(n) {
      clear();
      t.apply(this, n);
    };
    const mergeParms = t => c && l ? c(l, t) : t;
    const flush = () => {
      if (i && l) {
        u(mergeParms(l) || l);
      }
    };
    const f = function debouncedFn() {
      const t = from(arguments);
      const n = getDebouncer(o);
      if (n) {
        const o = typeof e === "function" ? e() : e;
        const c = getDebouncer(s);
        const f = mergeParms(t);
        const _ = f || t;
        const d = u.bind(0, _);
        if (i) {
          i();
        }
        if (o && !a) {
          d();
          a = true;
          i = n((() => a = void 0));
        } else {
          i = n(d);
          if (c && !r) {
            r = c(flush);
          }
        }
        l = _;
      } else {
        u(t);
      }
    };
    f.O = flush;
    f.C = clear;
    return f;
  };
  const hasOwnProperty = (t, n) => Object.prototype.hasOwnProperty.call(t, n);
  const keys = t => t ? Object.keys(t) : [];
  const assignDeep = (t, n, o, s, e, c, r) => {
    const i = [ n, o, s, e, c, r ];
    if ((typeof t !== "object" || isNull(t)) && !isFunction(t)) {
      t = {};
    }
    each(i, (n => {
      each(n, ((o, s) => {
        const e = n[s];
        if (t === e) {
          return true;
        }
        const c = isArray(e);
        if (e && isPlainObject(e)) {
          const n = t[s];
          let o = n;
          if (c && !isArray(n)) {
            o = [];
          } else if (!c && !isPlainObject(n)) {
            o = {};
          }
          t[s] = assignDeep(o, e);
        } else {
          t[s] = c ? e.slice() : e;
        }
      }));
    }));
    return t;
  };
  const removeUndefinedProperties = (t, n) => each(assignDeep({}, t), ((t, n, o) => {
    if (t === void 0) {
      delete o[n];
    } else if (t && isPlainObject(t)) {
      o[n] = removeUndefinedProperties(t);
    }
  }));
  const isEmptyObject = t => !keys(t).length;
  const noop = () => {};
  const capNumber = (t, n, o) => s(t, e(n, o));
  const getDomTokensArray = t => deduplicateArray((isArray(t) ? t : (t || "").split(" ")).filter((t => t)));
  const getAttr = (t, n) => t && t.getAttribute(n);
  const hasAttr = (t, n) => t && t.hasAttribute(n);
  const setAttrs = (t, n, o) => {
    each(getDomTokensArray(n), (n => {
      if (t) {
        t.setAttribute(n, String(o || ""));
      }
    }));
  };
  const removeAttrs = (t, n) => {
    each(getDomTokensArray(n), (n => t && t.removeAttribute(n)));
  };
  const domTokenListAttr = (t, n) => {
    const o = getDomTokensArray(getAttr(t, n));
    const s = bind(setAttrs, t, n);
    const domTokenListOperation = (t, n) => {
      const s = new Set(o);
      each(getDomTokensArray(t), (t => {
        s[n](t);
      }));
      return from(s).join(" ");
    };
    return {
      $: t => s(domTokenListOperation(t, "delete")),
      H: t => s(domTokenListOperation(t, "add")),
      D: t => {
        const n = getDomTokensArray(t);
        return n.reduce(((t, n) => t && o.includes(n)), n.length > 0);
      }
    };
  };
  const removeAttrClass = (t, n, o) => {
    domTokenListAttr(t, n).$(o);
    return bind(addAttrClass, t, n, o);
  };
  const addAttrClass = (t, n, o) => {
    domTokenListAttr(t, n).H(o);
    return bind(removeAttrClass, t, n, o);
  };
  const addRemoveAttrClass = (t, n, o, s) => (s ? addAttrClass : removeAttrClass)(t, n, o);
  const hasAttrClass = (t, n, o) => domTokenListAttr(t, n).D(o);
  const createDomTokenListClass = t => domTokenListAttr(t, "class");
  const removeClass = (t, n) => {
    createDomTokenListClass(t).$(n);
  };
  const addClass = (t, n) => {
    createDomTokenListClass(t).H(n);
    return bind(removeClass, t, n);
  };
  const find = (t, n) => {
    const o = n ? isElement(n) && n : document;
    return o ? from(o.querySelectorAll(t)) : [];
  };
  const findFirst = (t, n) => {
    const o = n ? isElement(n) && n : document;
    return o && o.querySelector(t);
  };
  const is = (t, n) => isElement(t) && t.matches(n);
  const isBodyElement = t => is(t, "body");
  const contents = t => t ? from(t.childNodes) : [];
  const parent = t => t && t.parentElement;
  const closest = (t, n) => isElement(t) && t.closest(n);
  const getFocusedElement = t => document.activeElement;
  const liesBetween = (t, n, o) => {
    const s = closest(t, n);
    const e = t && findFirst(o, s);
    const c = closest(e, n) === s;
    return s && e ? s === t || e === t || c && closest(closest(t, o), n) !== s : false;
  };
  const removeElements = t => {
    each(createOrKeepArray(t), (t => {
      const n = parent(t);
      if (t && n) {
        n.removeChild(t);
      }
    }));
  };
  const appendChildren = (t, n) => bind(removeElements, t && n && each(createOrKeepArray(n), (n => {
    if (n) {
      t.appendChild(n);
    }
  })));
  let I;
  const getTrustedTypePolicy = () => I;
  const setTrustedTypePolicy = t => {
    I = t;
  };
  const createDiv = t => {
    const n = document.createElement("div");
    setAttrs(n, "class", t);
    return n;
  };
  const createDOM = t => {
    const n = createDiv();
    const o = getTrustedTypePolicy();
    const s = t.trim();
    n.innerHTML = o ? o.createHTML(s) : s;
    return each(contents(n), (t => removeElements(t)));
  };
  const getCSSVal = (t, n) => t.getPropertyValue(n) || t[n] || "";
  const validFiniteNumber = t => {
    const n = t || 0;
    return isFinite(n) ? n : 0;
  };
  const parseToZeroOrNumber = t => validFiniteNumber(parseFloat(t || ""));
  const roundCssNumber = t => Math.round(t * 1e4) / 1e4;
  const numberToCssPx = t => `${roundCssNumber(validFiniteNumber(t))}px`;
  function setStyles(t, n) {
    t && n && each(n, ((n, o) => {
      try {
        const s = t.style;
        const e = isNull(n) || isBoolean(n) ? "" : isNumber(n) ? numberToCssPx(n) : n;
        if (o.indexOf("--") === 0) {
          s.setProperty(o, e);
        } else {
          s[o] = e;
        }
      } catch (s) {}
    }));
  }
  function getStyles(t, n, s) {
    const e = isString(n);
    let c = e ? "" : {};
    if (t) {
      const r = o.getComputedStyle(t, s) || t.style;
      c = e ? getCSSVal(r, n) : from(n).reduce(((t, n) => {
        t[n] = getCSSVal(r, n);
        return t;
      }), c);
    }
    return c;
  }
  const topRightBottomLeft = (t, n, o) => {
    const s = n ? `${n}-` : "";
    const e = o ? `-${o}` : "";
    const c = `${s}top${e}`;
    const r = `${s}right${e}`;
    const i = `${s}bottom${e}`;
    const l = `${s}left${e}`;
    const a = getStyles(t, [ c, r, i, l ]);
    return {
      t: parseToZeroOrNumber(a[c]),
      r: parseToZeroOrNumber(a[r]),
      b: parseToZeroOrNumber(a[i]),
      l: parseToZeroOrNumber(a[l])
    };
  };
  const getTrasformTranslateValue = (t, n) => `translate${isObject(t) ? `(${t.x},${t.y})` : `${n ? "X" : "Y"}(${t})`}`;
  const elementHasDimensions = t => !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
  const k = {
    w: 0,
    h: 0
  };
  const getElmWidthHeightProperty = (t, n) => n ? {
    w: n[`${t}Width`],
    h: n[`${t}Height`]
  } : k;
  const getWindowSize = t => getElmWidthHeightProperty("inner", t || o);
  const A = bind(getElmWidthHeightProperty, "offset");
  const T = bind(getElmWidthHeightProperty, "client");
  const M = bind(getElmWidthHeightProperty, "scroll");
  const getFractionalSize = t => {
    const n = parseFloat(getStyles(t, x)) || 0;
    const o = parseFloat(getStyles(t, H)) || 0;
    return {
      w: n - c(n),
      h: o - c(o)
    };
  };
  const getBoundingClientRect = t => t.getBoundingClientRect();
  const hasDimensions = t => !!t && elementHasDimensions(t);
  const domRectHasDimensions = t => !!(t && (t[H] || t[x]));
  const domRectAppeared = (t, n) => {
    const o = domRectHasDimensions(t);
    const s = domRectHasDimensions(n);
    return !s && o;
  };
  const removeEventListener = (t, n, o, s) => {
    each(getDomTokensArray(n), (n => {
      if (t) {
        t.removeEventListener(n, o, s);
      }
    }));
  };
  const addEventListener = (t, n, o, s) => {
    var e;
    const c = (e = s && s.I) != null ? e : true;
    const r = s && s.k || false;
    const i = s && s.A || false;
    const l = {
      passive: c,
      capture: r
    };
    return bind(runEachAndClear, getDomTokensArray(n).map((n => {
      const s = i ? e => {
        removeEventListener(t, n, s, r);
        if (o) {
          o(e);
        }
      } : o;
      if (t) {
        t.addEventListener(n, s, l);
      }
      return bind(removeEventListener, t, n, s, r);
    })));
  };
  const stopPropagation = t => t.stopPropagation();
  const preventDefault = t => t.preventDefault();
  const stopAndPrevent = t => stopPropagation(t) || preventDefault(t);
  const swallowFocusEvents = t => bind(runEachAndClear, createOrKeepArray(t).map((t => addEventListener(t, "focusin focusout focus blur", (t => stopAndPrevent(t)), {
    k: true,
    I: false
  }))));
  const scrollElementTo = (t, n) => {
    const {x: o, y: s} = isNumber(n) ? {
      x: n,
      y: n
    } : n || {};
    isNumber(o) && (t.scrollLeft = o);
    isNumber(s) && (t.scrollTop = s);
  };
  const getElementScroll = t => ({
    x: t.scrollLeft,
    y: t.scrollTop
  });
  const getZeroScrollCoordinates = () => ({
    T: {
      x: 0,
      y: 0
    },
    M: {
      x: 0,
      y: 0
    }
  });
  const sanitizeScrollCoordinates = (t, n) => {
    const {T: o, M: s} = t;
    const {w: e, h: c} = n;
    const sanitizeAxis = (t, n, o) => {
      let s = i(t) * o;
      let e = i(n) * o;
      if (s === e) {
        const o = r(t);
        const c = r(n);
        e = o > c ? 0 : e;
        s = o < c ? 0 : s;
      }
      s = s === e ? 0 : s;
      return [ s + 0, e + 0 ];
    };
    const [l, a] = sanitizeAxis(o.x, s.x, e);
    const [u, f] = sanitizeAxis(o.y, s.y, c);
    return {
      T: {
        x: l,
        y: u
      },
      M: {
        x: a,
        y: f
      }
    };
  };
  const isDefaultDirectionScrollCoordinates = ({T: t, M: n}) => {
    const getAxis = (t, n) => t === 0 && t <= n;
    return {
      x: getAxis(t.x, n.x),
      y: getAxis(t.y, n.y)
    };
  };
  const getScrollCoordinatesPercent = ({T: t, M: n}, o) => {
    const getAxis = (t, n, o) => capNumber(0, 1, (t - o) / (t - n) || 0);
    return {
      x: getAxis(t.x, n.x, o.x),
      y: getAxis(t.y, n.y, o.y)
    };
  };
  const focusElement = t => {
    if (t && t.focus) {
      t.focus({
        preventScroll: true,
        focusVisible: false
      });
    }
  };
  const manageListener = (t, n) => {
    each(createOrKeepArray(n), t);
  };
  const createEventListenerHub = t => {
    const n = new Map;
    const removeEvent = (t, o) => {
      if (t) {
        const s = n.get(t);
        manageListener((t => {
          if (s) {
            s[t ? "delete" : "clear"](t);
          }
        }), o);
      } else {
        n.forEach((t => {
          t.clear();
        }));
        n.clear();
      }
    };
    const addEvent = (t, o) => {
      if (isString(t)) {
        const s = n.get(t) || new Set;
        n.set(t, s);
        manageListener((t => {
          if (isFunction(t)) {
            s.add(t);
          }
        }), o);
        return bind(removeEvent, t, o);
      }
      if (isBoolean(o) && o) {
        removeEvent();
      }
      const s = keys(t);
      const e = [];
      each(s, (n => {
        const o = t[n];
        if (o) {
          push(e, addEvent(n, o));
        }
      }));
      return bind(runEachAndClear, e);
    };
    const triggerEvent = (t, o) => {
      each(from(n.get(t)), (t => {
        if (o && !isEmptyArray(o)) {
          t.apply(0, o);
        } else {
          t();
        }
      }));
    };
    addEvent(t || {});
    return [ addEvent, removeEvent, triggerEvent ];
  };
  const R = {};
  const V = {};
  const addPlugins = t => {
    each(t, (t => each(t, ((n, o) => {
      R[o] = t[o];
    }))));
  };
  const registerPluginModuleInstances = (t, n, o) => keys(t).map((s => {
    const {static: e, instance: c} = t[s];
    const [r, i, l] = o || [];
    const a = o ? c : e;
    if (a) {
      const t = o ? a(r, i, n) : a(n);
      return (l || V)[s] = t;
    }
  }));
  const getInstancePluginModuleInstance = (t, n) => t[n];
  const getStaticPluginModuleInstance = t => getInstancePluginModuleInstance(V, t);
  const L = "__osOptionsValidationPlugin";
  const P = `data-overlayscrollbars`;
  const U = "os-environment";
  const N = `${U}-scrollbar-hidden`;
  const j = `${P}-initialize`;
  const q = "noClipping";
  const B = `${P}-body`;
  const F = P;
  const X = "host";
  const Y = `${P}-viewport`;
  const W = C;
  const G = $;
  const J = "arrange";
  const K = "measuring";
  const Q = "scrolling";
  const Z = "scrollbarHidden";
  const tt = "noContent";
  const nt = "noScrollbars";
  const ot = "contentOverflow";
  const st = `${P}-padding`;
  const et = `${P}-content`;
  const ct = "os-size-observer";
  const rt = `${ct}-appear`;
  const it = `${ct}-listener`;
  const lt = `${it}-scroll`;
  const at = `${it}-item`;
  const ut = `${at}-final`;
  const ft = "os-trinsic-observer";
  const _t = "os-theme-none";
  const dt = "os-scrollbar";
  const pt = `${dt}-rtl`;
  const vt = `${dt}-horizontal`;
  const gt = `${dt}-vertical`;
  const ht = `${dt}-track`;
  const bt = `${dt}-handle`;
  const yt = `${dt}-visible`;
  const wt = `${dt}-cornerless`;
  const St = `${dt}-interaction`;
  const mt = `${dt}-unusable`;
  const Ot = `${dt}-auto-hide`;
  const Ct = `${Ot}-hidden`;
  const $t = `${dt}-wheel`;
  const xt = `${ht}-interactive`;
  const Ht = `${bt}-interactive`;
  const Et = "__osSizeObserverPlugin";
  const Dt = /* @__PURE__ */ (() => ({
    [Et]: {
      static: () => (t, n, o) => {
        const s = 3333333;
        const e = "scroll";
        const c = createDOM(`<div class="${at}" dir="ltr"><div class="${at}"><div class="${ut}"></div></div><div class="${at}"><div class="${ut}" style="width: 200%; height: 200%"></div></div></div>`);
        const r = c[0];
        const i = r.lastChild;
        const u = r.firstChild;
        const f = u == null ? void 0 : u.firstChild;
        let _ = A(r);
        let d = _;
        let p = false;
        let v = null;
        const reset = () => {
          scrollElementTo(u, s);
          scrollElementTo(i, s);
        };
        const onResized = t => {
          v = null;
          if (p) {
            _ = d;
            n(t === true);
          }
        };
        const onScroll = t => {
          d = A(r);
          p = !t || !equalWH(d, _);
          if (t) {
            stopPropagation(t);
            if (p && !isNumber(v)) {
              v = a(onResized);
            }
          } else {
            onResized(t === false);
          }
          reset();
        };
        const g = [ appendChildren(t, c), addEventListener(u, e, onScroll), addEventListener(i, e, onScroll) ];
        addClass(t, lt);
        setStyles(f, {
          [x]: s,
          [H]: s
        });
        const h = a(reset);
        push(g, (() => {
          if (isNumber(v)) {
            l(v);
          }
          l(h);
        }));
        return [ o ? bind(onScroll, false) : reset, g ];
      }
    }
  }))();
  const getShowNativeOverlaidScrollbars = (t, n) => {
    const {R: o} = n;
    const [s, e] = t("showNativeOverlaidScrollbars");
    return [ s && o.x && o.y, e ];
  };
  const overflowIsVisible = t => t.indexOf(E) === 0;
  const overflowBehaviorToOverflowStyle = t => t.replace(`${E}-`, "");
  const overflowCssValueToOverflowStyle = (t, n) => {
    if (t === "auto") {
      return n ? z : D;
    }
    const o = t || D;
    return [ D, z, E ].includes(o) ? o : D;
  };
  const getElementOverflowStyle = (t, n) => {
    const {overflowX: o, overflowY: s} = getStyles(t, [ C, $ ]);
    return {
      x: overflowCssValueToOverflowStyle(o, n.x),
      y: overflowCssValueToOverflowStyle(s, n.y)
    };
  };
  const createViewportOverflowStyleClassName = (t, n) => {
    const o = n ? W : G;
    return `${o}${capitalizeFirstLetter(t)}`;
  };
  const zt = "__osScrollbarsHidingPlugin";
  const It = /* @__PURE__ */ (() => ({
    [zt]: {
      static: () => ({
        V: (t, n, o, s, e) => {
          const {L: c, P: r} = t;
          const {U: i, R: l, N: a} = s;
          const u = !c && !i && (l.x || l.y);
          const [f] = getShowNativeOverlaidScrollbars(e, s);
          const _getViewportOverflowHideOffset = t => {
            const n = i || f ? 0 : 42;
            const getHideOffsetPerAxis = (t, o, s) => {
              const e = t ? n : s;
              const c = o && !i ? e : 0;
              const r = t && !!n;
              return [ c, r ];
            };
            const [o, s] = getHideOffsetPerAxis(l.x, t.x === z, a.x);
            const [e, c] = getHideOffsetPerAxis(l.y, t.y === z, a.y);
            return {
              j: {
                x: o,
                y: e
              },
              q: {
                x: s,
                y: c
              }
            };
          };
          const _hideNativeScrollbars = t => {
            if (!c) {
              const {B: s} = o;
              const e = assignDeep({}, {
                [m]: 0,
                [O]: 0,
                [S]: 0
              });
              const {j: c, q: r} = _getViewportOverflowHideOffset(t);
              const {x: i, y: l} = r;
              const {x: a, y: f} = c;
              const {F: _} = n;
              const d = s ? S : m;
              const p = s ? y : b;
              const v = _[d];
              const g = _[O];
              const h = _[p];
              const C = _[w];
              e[x] = `calc(100% + ${f + v * -1}px)`;
              e[d] = -f + v;
              e[O] = -a + g;
              if (u) {
                e[p] = h + (l ? f : 0);
                e[w] = C + (i ? a : 0);
              }
              return e;
            }
          };
          const _arrangeViewport = (t, s, e) => {
            if (u) {
              const {F: c} = n;
              const {j: i, q: l} = _getViewportOverflowHideOffset(t);
              const {x: a, y: u} = l;
              const {x: f, y: _} = i;
              const {B: d} = o;
              const p = d ? b : y;
              const v = c[p];
              const g = c.paddingTop;
              const h = s.w + e.w;
              const w = s.h + e.h;
              const S = {
                w: _ && u ? `${_ + h - v}px` : "",
                h: f && a ? `${f + w - g}px` : ""
              };
              setStyles(r, {
                "--os-vaw": S.w,
                "--os-vah": S.h
              });
            }
            return u;
          };
          const _undoViewportArrange = () => {
            if (u) {
              const {X: t, F: o} = n;
              const s = getElementOverflowStyle(r, t);
              const {q: e} = _getViewportOverflowHideOffset(s);
              const {x: c, y: i} = e;
              const l = {};
              const assignProps = t => each(t, (t => {
                l[t] = o[t];
              }));
              if (c) {
                assignProps([ O, h, w ]);
              }
              if (i) {
                assignProps([ S, m, y, b ]);
              }
              const a = getStyles(r, keys(l));
              const u = removeAttrClass(r, Y, J);
              setStyles(r, l);
              return () => {
                setStyles(r, assignDeep({}, a, _hideNativeScrollbars(s)));
                u();
              };
            }
            return noop;
          };
          return {
            Y: _arrangeViewport,
            W: _undoViewportArrange,
            G: _hideNativeScrollbars
          };
        }
      })
    }
  }))();
  const kt = "__osClickScrollPlugin";
  const At = /* @__PURE__ */ (() => ({
    [kt]: {
      static: () => (t, n, o, s, e, c, r, i) => {
        let l = false;
        let a = noop;
        const u = {
          clickScrollDistance: e,
          clickScrollDuration: 200,
          clickPressDelay: 150,
          pressDistanceDuration: 90
        };
        const easeOutQuad = t => 1 - (1 - t) * (1 - t);
        const easeInOutQuad = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const {clickScrollDistance: f, clickScrollDuration: _, clickPressDelay: d, pressDistanceDuration: p} = assignDeep({}, u, isFunction(c) ? c(r) : u);
        const v = f === 0;
        const g = p * 2.3;
        const h = p * 2.5;
        const b = f ? e / f : 0;
        const [y, w] = selfClearTimeout(Math.max(22, d));
        const S = o();
        const m = Math.sign(s);
        const O = animateNumber(0, v ? s : f * m, _, ((e, c, r) => {
          if (v) {
            n(e);
          } else {
            t(e);
          }
          if (r) {
            i(l);
            y((() => {
              if (l || v || !p) {
                return;
              }
              const t = o();
              const e = t - S;
              const c = e * b;
              const r = s - e;
              const i = c ? r / c : 0;
              const u = i <= 2.2;
              const f = Math.max(1, i || 0);
              const _ = (!i || i > .5) && Math.sign(r) === m;
              if (_) {
                a = animateNumber(e, u ? s : s - c, u ? g * f : p * f, ((t, o, e) => {
                  n(t);
                  if (e && !u) {
                    a = animateNumber(t, s, h, n, easeOutQuad);
                  }
                }), u && easeInOutQuad);
              }
            }));
          }
        }), easeInOutQuad);
        return t => {
          l = true;
          if (t) {
            O();
          }
          w();
          a();
        };
      }
    }
  }))();
  const opsStringify = t => JSON.stringify(t, ((t, n) => {
    if (isFunction(n)) {
      throw 0;
    }
    return n;
  }));
  const getPropByPath = (t, n) => t ? `${n}`.split(".").reduce(((t, n) => t && hasOwnProperty(t, n) ? t[n] : void 0), t) : void 0;
  const Tt = [ 0, 33 ];
  const Mt = [ 33, 99 ];
  const Rt = [ 222, 666, true ];
  const Vt = {
    paddingAbsolute: false,
    showNativeOverlaidScrollbars: false,
    update: {
      elementEvents: [ [ "img", "load" ] ],
      debounce: {
        mutation: Tt,
        resize: null,
        event: Mt,
        env: Rt
      },
      attributes: null,
      ignoreMutation: null,
      flowDirectionStyles: null
    },
    overflow: {
      x: "scroll",
      y: "scroll"
    },
    scrollbars: {
      theme: "os-theme-dark",
      visibility: "auto",
      autoHide: "never",
      autoHideDelay: 1300,
      autoHideSuspend: false,
      dragScroll: true,
      clickScroll: false,
      pointers: [ "mouse", "touch", "pen" ]
    }
  };
  const getOptionsDiff = (t, n) => {
    const o = {};
    const s = concat(keys(n), keys(t));
    each(s, (s => {
      const e = t[s];
      const c = n[s];
      if (isObject(e) && isObject(c)) {
        assignDeep(o[s] = {}, getOptionsDiff(e, c));
        if (isEmptyObject(o[s])) {
          delete o[s];
        }
      } else if (hasOwnProperty(n, s) && c !== e) {
        let t = true;
        if (isArray(e) || isArray(c)) {
          try {
            if (opsStringify(e) === opsStringify(c)) {
              t = false;
            }
          } catch (r) {}
        }
        if (t) {
          o[s] = c;
        }
      }
    }));
    return o;
  };
  const createOptionCheck = (t, n, o) => s => [ getPropByPath(t, s), o || getPropByPath(n, s) !== void 0 ];
  let Lt;
  const getNonce = () => Lt;
  const setNonce = t => {
    Lt = t;
  };
  let Pt;
  const createEnvironment = () => {
    const getNativeScrollbarSize = (t, n, o) => {
      appendChildren(document.body, t);
      appendChildren(document.body, t);
      const s = T(t);
      const e = A(t);
      const c = getFractionalSize(n);
      if (o) {
        removeElements(t);
      }
      return {
        x: e.h - s.h + c.h,
        y: e.w - s.w + c.w
      };
    };
    const getNativeScrollbarsHiding = t => {
      let n = false;
      const o = addClass(t, N);
      try {
        n = getStyles(t, "scrollbar-width") === "none" || getStyles(t, "display", "::-webkit-scrollbar") === "none";
      } catch (s) {}
      o();
      return n;
    };
    const getFocusableScrollers = t => {
      const getActiveElement = () => t.ownerDocument.activeElement;
      const n = getActiveElement();
      const o = swallowFocusEvents([ t, n ]);
      setStyles(t, {
        visibility: "visible"
      });
      focusElement(t);
      const s = getActiveElement() === t;
      setStyles(t, {
        visibility: ""
      });
      t.blur();
      if (isHTMLElement(n)) {
        n.focus();
      }
      o();
      return s;
    };
    const t = `.${U}{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}.${U} div{width:200%;height:200%;margin:10px 0}.${N}{scrollbar-width:none!important}@supports not (scrollbar-width:none){.${N}::-webkit-scrollbar,.${N}::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}}`;
    const n = createDOM(`<div class="${U}"><div></div><style>${t}</style></div>`);
    const s = n[0];
    const e = s.firstChild;
    const c = s.lastChild;
    const r = getNonce();
    if (r) {
      c.nonce = r;
    }
    const [i, , l] = createEventListenerHub();
    const [a, u] = createCache({
      o: getNativeScrollbarSize(s, e),
      i: equalXY
    }, bind(getNativeScrollbarSize, s, e, true));
    const [f] = u();
    const _ = getNativeScrollbarsHiding(s);
    const d = getFocusableScrollers(s);
    const p = {
      x: f.x === 0,
      y: f.y === 0
    };
    const v = {
      elements: {
        host: null,
        padding: !_,
        viewport: t => _ && isBodyElement(t) && t,
        content: false
      },
      scrollbars: {
        slot: true
      },
      cancel: {
        nativeScrollbarsOverlaid: false,
        body: null
      }
    };
    const h = assignDeep({}, Vt);
    const b = bind(assignDeep, {}, h);
    const y = bind(assignDeep, {}, v);
    const w = {
      N: f,
      R: p,
      U: _,
      J: d,
      K: !!g,
      Z: bind(i, "r"),
      tt: y,
      nt: t => assignDeep(v, t) && y(),
      ot: b,
      st: t => assignDeep(h, t) && b(),
      et: assignDeep({}, v),
      ct: assignDeep({}, h)
    };
    removeAttrs(s, "style");
    removeElements(s);
    addEventListener(o, "resize", (() => {
      l("r", []);
    }));
    if (isFunction(o.matchMedia) && !_ && (!p.x || !p.y)) {
      const addZoomListener = t => {
        const n = o.matchMedia(`(resolution: ${o.devicePixelRatio}dppx)`);
        addEventListener(n, "change", (() => {
          t();
          addZoomListener(t);
        }), {
          A: true
        });
      };
      addZoomListener((() => {
        const [t, n] = a();
        assignDeep(w.N, t);
        l("r", [ n ]);
      }));
    }
    return w;
  };
  const getEnvironment = () => {
    if (!Pt) {
      Pt = createEnvironment();
    }
    return Pt;
  };
  const createElementRef = t => v ? new v(t) : {
    deref: () => t
  };
  const addEventContentChangeListener = (t, n, o) => addEventListener(t, n, (t => o(t)));
  const createEventContentChange = (t, n, o) => {
    const s = new WeakMap;
    const e = new Set;
    const removeElementListeners = t => {
      const n = s.get(t);
      if (n) {
        s.delete(t);
        e.delete(n[0]);
        runEachAndClear(Object.values(n[1]));
      }
    };
    const destroy = () => {
      e.forEach((t => {
        const n = t.deref();
        if (n) {
          removeElementListeners(n);
        }
      }));
      e.clear();
    };
    const updateElements = c => {
      if (o) {
        e.forEach((t => {
          if (!t.deref()) {
            e.delete(t);
          }
        }));
        each(o, (o => {
          const [r, i] = o || [];
          const l = i && r ? (c || find)(r, t) : [];
          each(l, (o => {
            if (!t.contains(o)) {
              removeElementListeners(o);
              return;
            }
            let c = s.get(o);
            if (!c) {
              c = [ createElementRef(o), Object.create(null) ];
              s.set(o, c);
              e.add(c[0]);
            }
            const r = c[1];
            if (!r[i]) {
              r[i] = addEventContentChangeListener(o, i, n);
            }
          }));
        }));
      }
    };
    updateElements();
    return [ destroy, updateElements ];
  };
  const createDOMObserver = (t, n, o, s) => {
    let e = false;
    const {rt: c, it: r, lt: i, ut: l, ft: a, _t: u} = s || {};
    const [f, d] = createEventContentChange(t, (() => e && o(true)), i);
    const p = c || [];
    const v = r || [];
    const g = concat(p, v);
    const observerCallback = (e, c) => {
      if (!isEmptyArray(c)) {
        const r = a || noop;
        const i = u || noop;
        const f = [];
        const _ = [];
        let p = false;
        let g = false;
        each(c, (o => {
          const {attributeName: e, target: c, type: a, oldValue: u, addedNodes: d, removedNodes: h} = o;
          const b = a === "attributes";
          const y = a === "childList";
          const w = t === c;
          const S = b && e;
          const m = S && getAttr(c, e || "");
          const O = isString(m) ? m : null;
          const C = S && u !== O;
          const $ = inArray(v, e) && C;
          if (n && (y || !w)) {
            const n = b && C;
            const a = n && l && is(c, l);
            const _ = a ? !r(c, e, u, O) : !b || n;
            const p = _ && !i(o, !!a, t, s);
            each(d, (t => push(f, t)));
            each(h, (t => push(f, t)));
            g = g || p;
          }
          if (!n && w && C && !r(c, e, u, O)) {
            push(_, e);
            p = p || $;
          }
        }));
        d((t => deduplicateArray(f).reduce(((n, o) => {
          push(n, find(t, o));
          return is(o, t) ? push(n, o) : n;
        }), [])));
        if (n) {
          if (!e && g) {
            o(false);
          }
          return [ false ];
        }
        if (!isEmptyArray(_) || p) {
          const t = [ deduplicateArray(_), p ];
          if (!e) {
            o.apply(0, t);
          }
          return t;
        }
      }
    };
    const h = new _(bind(observerCallback, false));
    return [ () => {
      h.observe(t, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: g,
        subtree: n,
        childList: n,
        characterData: n
      });
      e = true;
      return () => {
        if (e) {
          f();
          h.disconnect();
          e = false;
        }
      };
    }, () => {
      if (e) {
        return observerCallback(true, h.takeRecords());
      }
    } ];
  };
  let Ut = null;
  const createSizeObserver = (t, n, o) => {
    const {dt: s} = o || {};
    const e = getStaticPluginModuleInstance(Et);
    const [c] = createCache({
      o: false,
      u: true
    });
    return () => {
      const o = [];
      const r = createDOM(`<div class="${ct}"><div class="${it}"></div></div>`);
      const i = r[0];
      const l = i.firstChild;
      const onSizeChangedCallbackProxy = t => {
        const o = isArray(t) && !isEmptyArray(t);
        let s = false;
        let e = false;
        if (o) {
          const n = t[0];
          const [o, , r] = c(n.contentRect);
          const i = domRectHasDimensions(o);
          e = domRectAppeared(o, r);
          s = !e && !i;
        } else {
          e = t === true;
        }
        if (!s) {
          n({
            vt: true,
            dt: e
          });
        }
      };
      if (p) {
        if (!isBoolean(Ut)) {
          const n = new p(noop);
          n.observe(t, {
            get box() {
              Ut = true;
            }
          });
          Ut = Ut || false;
          n.disconnect();
        }
        const n = debounce(onSizeChangedCallbackProxy, {
          p: 0,
          v: 0
        });
        const resizeObserverCallback = t => n(t);
        const s = new p(resizeObserverCallback);
        s.observe(Ut ? t : l);
        push(o, [ () => {
          s.disconnect();
          n.C();
        }, !Ut && appendChildren(t, i) ]);
        if (Ut) {
          const n = new p(resizeObserverCallback);
          n.observe(t, {
            box: "border-box"
          });
          push(o, (() => n.disconnect()));
        }
      } else if (e) {
        const [n, c] = e(l, onSizeChangedCallbackProxy, s);
        push(o, concat([ addClass(i, rt), addEventListener(i, "animationstart", n), appendChildren(t, i) ], c));
      } else {
        return noop;
      }
      return bind(runEachAndClear, o);
    };
  };
  const createTrinsicObserver = (t, n) => {
    let o;
    const isHeightIntrinsic = t => t.h === 0 || t.isIntersecting || t.intersectionRatio > 0;
    const s = createDiv(ft);
    const [e] = createCache({
      o: false
    });
    const triggerOnTrinsicChangedCallback = (t, o) => {
      if (t) {
        const s = e(isHeightIntrinsic(t));
        const [, c] = s;
        return c && !o && n(s) && [ s ];
      }
    };
    const intersectionObserverCallback = (t, n) => triggerOnTrinsicChangedCallback(n.pop(), t);
    return [ () => {
      const n = [];
      if (d) {
        o = new d(bind(intersectionObserverCallback, false), {
          root: t
        });
        o.observe(s);
        push(n, (() => {
          o.disconnect();
        }));
      } else {
        const onSizeChanged = () => {
          const t = A(s);
          triggerOnTrinsicChangedCallback(t);
        };
        push(n, createSizeObserver(s, onSizeChanged)());
        onSizeChanged();
      }
      return bind(runEachAndClear, push(n, appendChildren(t, s)));
    }, () => o && intersectionObserverCallback(true, o.takeRecords()) ];
  };
  const createObserversSetup = (t, n, o, s) => {
    let e;
    let c;
    let r;
    let i;
    let l;
    let a;
    let u;
    let f;
    const _ = `[${F}]`;
    const d = `[${Y}]`;
    const v = [ "id", "class", "style", "open", "wrap", "cols", "rows" ];
    const {gt: g, ht: h, P: b, bt: y, yt: w, L: S, wt: m, St: O, Ot: C, Ct: $} = t;
    const getDirectionIsRTL = t => getStyles(t, "direction") === "rtl";
    const createDebouncedObservesUpdate = () => {
      let t;
      let n;
      let o;
      const e = debounce(s, {
        p: () => t,
        v: () => n,
        S: () => o,
        m(t, n) {
          const [o] = t;
          const [s] = n;
          return [ concat(keys(o), keys(s)).reduce(((t, n) => {
            t[n] = o[n] || s[n];
            return t;
          }), {}) ];
        }
      });
      const fn = (s, c) => {
        if (isArray(c)) {
          const [s, e, r] = c;
          t = s;
          n = e;
          o = r;
        } else if (isNumber(c)) {
          t = c;
          n = false;
          o = false;
        } else {
          t = false;
          n = false;
          o = false;
        }
        e(s);
      };
      fn.O = e.O;
      fn.C = e.C;
      return fn;
    };
    const x = {
      $t: false,
      B: getDirectionIsRTL(g)
    };
    const H = getEnvironment();
    const E = getStaticPluginModuleInstance(zt);
    const [D] = createCache({
      i: equalWH,
      o: {
        w: 0,
        h: 0
      }
    }, (() => {
      const s = E && E.V(t, n, x, H, o).W;
      const e = m && S;
      const c = !e && hasAttrClass(h, F, q);
      const r = !S && O(J);
      const i = r && getElementScroll(y);
      const l = i && $();
      const a = C(K, c);
      const u = r && s && s();
      const f = M(b);
      const _ = getFractionalSize(b);
      if (u) {
        u();
      }
      scrollElementTo(y, i);
      if (l) {
        l();
      }
      if (c) {
        a();
      }
      return {
        w: f.w + _.w,
        h: f.h + _.h
      };
    }));
    const z = createDebouncedObservesUpdate();
    const setDirection = t => {
      const n = getDirectionIsRTL(g);
      assignDeep(t, {
        xt: f !== n
      });
      assignDeep(x, {
        B: n
      });
      f = n;
    };
    const onTrinsicChanged = (t, n) => {
      const [o, e] = t;
      const c = {
        Ht: e
      };
      assignDeep(x, {
        $t: o
      });
      if (!n) {
        s(c);
      }
      return c;
    };
    const onSizeChanged = ({vt: t, dt: n}) => {
      const o = n ? s : z;
      const e = {
        vt: t || n,
        dt: n
      };
      setDirection(e);
      o(e, c);
    };
    const onContentMutation = (t, n) => {
      const [, o] = D();
      const s = {
        Et: o
      };
      setDirection(s);
      if (o && !n) {
        z(s, t ? r : e);
      }
      return s;
    };
    const onHostMutation = (t, n, o) => {
      const s = {
        Dt: n
      };
      setDirection(s);
      if (n && !o) {
        z(s, e);
      }
      return s;
    };
    const [I, k] = w ? createTrinsicObserver(h, onTrinsicChanged) : [];
    const A = !S && createSizeObserver(h, onSizeChanged, {
      dt: true
    });
    const [T, R] = createDOMObserver(h, false, onHostMutation, {
      it: v,
      rt: v
    });
    const V = S && p && new p((t => {
      const n = t[t.length - 1].contentRect;
      onSizeChanged({
        vt: true,
        dt: domRectAppeared(n, u)
      });
      u = n;
    }));
    return [ () => {
      if (V) {
        V.observe(h);
      }
      const t = A && A();
      const n = I && I();
      const o = T();
      const s = H.Z((t => {
        const [, n] = D();
        z({
          zt: t,
          Et: n,
          vt: m
        }, i);
      }));
      return () => {
        if (V) {
          V.disconnect();
        }
        if (t) {
          t();
        }
        if (n) {
          n();
        }
        if (a) {
          a();
        }
        o();
        s();
        z.C();
      };
    }, ({It: t, kt: n, At: o}) => {
      const s = {};
      const [u] = t("update.ignoreMutation");
      const [f, p] = t("update.attributes");
      const [g, h] = t("update.elementEvents");
      const [y, m] = t("update.debounce");
      const O = h || p;
      const C = n || o;
      const ignoreMutationFromOptions = t => isFunction(u) && !!u(t);
      if (O) {
        if (l) {
          l();
        }
        if (a) {
          a();
        }
        const [t, n] = createDOMObserver(w || b, true, onContentMutation, {
          rt: concat(v, f || []),
          lt: g,
          ut: _,
          _t: (t, n) => {
            const {target: o, attributeName: s} = t;
            const e = !n && s && !S ? liesBetween(o, _, d) : false;
            return e || !!closest(o, `.${dt}`) || ignoreMutationFromOptions(t);
          }
        });
        a = t();
        l = n;
      }
      if (m) {
        z.O();
        if (isArray(y) || isNumber(y)) {
          e = y;
          c = false;
          r = Mt;
          i = Rt;
        } else if (isPlainObject(y)) {
          e = y.mutation;
          c = y.resize;
          r = y.event;
          i = y.env;
        } else {
          e = false;
          c = false;
          r = false;
          i = false;
        }
      }
      if (C) {
        const t = R();
        const n = k && k();
        const o = l && l();
        if (t) {
          assignDeep(s, onHostMutation(t[0], t[1], C));
        }
        if (n) {
          assignDeep(s, onTrinsicChanged(n[0], C));
        }
        if (o) {
          assignDeep(s, onContentMutation(o[0], C));
        }
      }
      setDirection(s);
      return s;
    }, x ];
  };
  const resolveInitialization = (t, n) => isFunction(n) ? n.apply(0, t) : n;
  const staticInitializationElement = (t, n, o, s) => {
    const e = isUndefined(s) ? o : s;
    const c = resolveInitialization(t, e);
    return c || n.apply(0, t);
  };
  const dynamicInitializationElement = (t, n, o, s) => {
    const e = isUndefined(s) ? o : s;
    const c = resolveInitialization(t, e);
    return !!c && (isHTMLElement(c) ? c : n.apply(0, t));
  };
  const cancelInitialization = (t, n) => {
    const {nativeScrollbarsOverlaid: o, body: s} = n || {};
    const {R: e, U: c, tt: r} = getEnvironment();
    const {nativeScrollbarsOverlaid: i, body: l} = r().cancel;
    const a = o != null ? o : i;
    const u = isUndefined(s) ? l : s;
    const f = (e.x || e.y) && a;
    const _ = t && (isNull(u) ? !c : u);
    return !!f || !!_;
  };
  const createScrollbarsSetupElements = (t, n, o, s) => {
    const e = "--os-viewport-percent";
    const c = "--os-scroll-percent";
    const r = "--os-scroll-direction";
    const {tt: i} = getEnvironment();
    const {scrollbars: l} = i();
    const {slot: a} = l;
    const {gt: u, ht: f, P: _, Tt: d, bt: p, wt: v, L: h} = n;
    const {scrollbars: b} = d ? {} : t;
    const {slot: y} = b || {};
    const w = [];
    const S = [];
    const m = [];
    const O = dynamicInitializationElement([ u, f, _ ], (() => h && v ? u : f), a, y);
    const initScrollTimeline = t => {
      if (g) {
        let n = null;
        let s = [];
        const e = new g({
          source: p,
          axis: t
        });
        const cancelAnimation = () => {
          if (n) {
            n.cancel();
          }
          n = null;
        };
        const _setScrollPercentAnimation = c => {
          const {Mt: r} = o;
          const i = isDefaultDirectionScrollCoordinates(r)[t];
          const l = t === "x";
          const a = [ getTrasformTranslateValue(0, l), getTrasformTranslateValue(`calc(-100% + 100cq${l ? "w" : "h"})`, l) ];
          const u = i ? a : a.reverse();
          if (s[0] === u[0] && s[1] === u[1]) {
            return cancelAnimation;
          }
          s = u;
          cancelAnimation();
          n = c.Rt.animate({
            transform: u
          }, {
            timeline: e,
            fill: "both"
          });
          return cancelAnimation;
        };
        return {
          Vt: _setScrollPercentAnimation
        };
      }
    };
    const C = {
      x: initScrollTimeline("x"),
      y: initScrollTimeline("y")
    };
    const getViewportPercent = () => {
      const {Lt: t, Pt: n} = o;
      const getAxisValue = (t, n) => capNumber(0, 1, t / (t + n) || 0);
      return {
        x: getAxisValue(n.x, t.x),
        y: getAxisValue(n.y, t.y)
      };
    };
    const scrollbarStructureAddRemoveClass = (t, n, o) => {
      const s = o ? addClass : removeClass;
      each(t, (t => {
        s(t.Ut, n);
      }));
    };
    const scrollbarStyle = (t, n) => {
      each(t, (t => {
        const [o, s] = n(t);
        setStyles(o, s);
      }));
    };
    const scrollbarsAddRemoveClass = (t, n, o) => {
      const s = isBoolean(o);
      const e = s ? o : true;
      const c = s ? !o : true;
      if (e) {
        scrollbarStructureAddRemoveClass(S, t, n);
      }
      if (c) {
        scrollbarStructureAddRemoveClass(m, t, n);
      }
    };
    const refreshScrollbarsHandleLength = () => {
      const t = getViewportPercent();
      const createScrollbarStyleFn = t => n => [ n.Ut, {
        [e]: roundCssNumber(t) + ""
      } ];
      scrollbarStyle(S, createScrollbarStyleFn(t.x));
      scrollbarStyle(m, createScrollbarStyleFn(t.y));
    };
    const refreshScrollbarsHandleOffset = () => {
      if (!g) {
        const {Mt: t} = o;
        const n = getScrollCoordinatesPercent(t, getElementScroll(p));
        const createScrollbarStyleFn = t => n => [ n.Ut, {
          [c]: roundCssNumber(t) + ""
        } ];
        scrollbarStyle(S, createScrollbarStyleFn(n.x));
        scrollbarStyle(m, createScrollbarStyleFn(n.y));
      }
    };
    const refreshScrollbarsScrollCoordinates = () => {
      const {Mt: t} = o;
      const n = isDefaultDirectionScrollCoordinates(t);
      const createScrollbarStyleFn = t => n => [ n.Ut, {
        [r]: t ? "0" : "1"
      } ];
      scrollbarStyle(S, createScrollbarStyleFn(n.x));
      scrollbarStyle(m, createScrollbarStyleFn(n.y));
      if (g) {
        S.forEach(C.x.Vt);
        m.forEach(C.y.Vt);
      }
    };
    const refreshScrollbarsScrollbarOffset = () => {
      if (h && !v) {
        const {Lt: t, Mt: n} = o;
        const s = isDefaultDirectionScrollCoordinates(n);
        const e = getScrollCoordinatesPercent(n, getElementScroll(p));
        const styleScrollbarPosition = n => {
          const {Ut: o} = n;
          const c = parent(o) === _ && o;
          const getTranslateValue = (t, n, o) => {
            const s = n * t;
            return numberToCssPx(o ? s : -s);
          };
          return [ c, c && {
            transform: getTrasformTranslateValue({
              x: getTranslateValue(e.x, t.x, s.x),
              y: getTranslateValue(e.y, t.y, s.y)
            })
          } ];
        };
        scrollbarStyle(S, styleScrollbarPosition);
        scrollbarStyle(m, styleScrollbarPosition);
      }
    };
    const generateScrollbarDOM = t => {
      const n = t ? "x" : "y";
      const o = t ? vt : gt;
      const e = createDiv(`${dt} ${o}`);
      const c = createDiv(ht);
      const r = createDiv(bt);
      const i = {
        Ut: e,
        Nt: c,
        Rt: r
      };
      const l = C[n];
      push(t ? S : m, i);
      push(w, [ appendChildren(e, c), appendChildren(c, r), bind(removeElements, e), l && l.Vt(i), s(i, scrollbarsAddRemoveClass, t) ]);
      return i;
    };
    const $ = bind(generateScrollbarDOM, true);
    const x = bind(generateScrollbarDOM, false);
    const appendElements = () => {
      appendChildren(O, S[0].Ut);
      appendChildren(O, m[0].Ut);
      return bind(runEachAndClear, w);
    };
    $();
    x();
    return [ {
      jt: refreshScrollbarsHandleLength,
      qt: refreshScrollbarsHandleOffset,
      Bt: refreshScrollbarsScrollCoordinates,
      Ft: refreshScrollbarsScrollbarOffset,
      Xt: scrollbarsAddRemoveClass,
      Yt: {
        Wt: S,
        Gt: $,
        Jt: bind(scrollbarStyle, S)
      },
      Kt: {
        Wt: m,
        Gt: x,
        Jt: bind(scrollbarStyle, m)
      }
    }, appendElements ];
  };
  const createScrollbarsSetupEvents = (t, n, o, s, e) => (i, l, a) => {
    const {ht: u, P: f, L: _, bt: d, Qt: p, Ct: v} = n;
    const {Ut: g, Nt: h, Rt: b} = i;
    const [y, w] = selfClearTimeout(333);
    const [S, m] = selfClearTimeout(444);
    const [O, C] = selfClearTimeout(150);
    const [$, E] = selfClearTimeout(25);
    const D = [];
    const removeClickPrevention = () => {
      C();
      runEachAndClear(D);
    };
    const scrollOffsetElementScrollBy = t => {
      if (isFunction(d.scrollBy)) {
        d.scrollBy({
          behavior: "smooth",
          left: t.x,
          top: t.y
        });
      }
    };
    const createInteractiveScrollEvents = () => {
      const n = "pointerup pointercancel lostpointercapture";
      const e = `client${a ? "X" : "Y"}`;
      const i = a ? x : H;
      const l = a ? "left" : "top";
      const u = a ? "w" : "h";
      const f = a ? "x" : "y";
      const _ = [];
      const g = addEventListener(h, "pointerdown", s((s => {
        const g = closest(s.target, `.${bt}`) === b;
        const y = g ? b : h;
        const w = t.scrollbars;
        const O = w[g ? "dragScroll" : "clickScroll"];
        const {button: C, isPrimary: $, pointerType: x} = s;
        const {pointers: H} = w;
        const E = C === 0 && $ && O && (H || []).includes(x);
        if (E) {
          runEachAndClear(_);
          m();
          const t = !g && (s.shiftKey || O === "instant");
          const w = bind(getBoundingClientRect, b);
          const C = bind(getBoundingClientRect, h);
          const getHandleOffset = (t, n) => (t || w())[l] - (n || C())[l];
          const $ = c(getBoundingClientRect(d)[i]) / A(d)[u] || 1;
          const x = getElementScroll(d)[f];
          const scrollRelative = t => {
            scrollElementTo(d, {
              [f]: x + t
            });
          };
          const moveHandleRelative = t => {
            const {Lt: n} = o;
            const s = A(h)[u] - A(b)[u];
            const e = 1 / $ * t / s;
            scrollRelative(e * n[f]);
          };
          const H = s[e];
          const E = w();
          const D = C();
          const z = E[i];
          const I = getHandleOffset(E, D) + z / 2;
          const k = H - D[l];
          const T = k - I;
          const M = g ? 0 : T;
          const releasePointerCapture = t => {
            runEachAndClear(P);
            y.releasePointerCapture(t.pointerId);
          };
          const R = g || t;
          const V = v();
          const L = bind(runEachAndClear, [ addEventListener(p, n, releasePointerCapture), addEventListener(p, "selectstart", (t => preventDefault(t)), {
            I: false
          }), addEventListener(h, n, releasePointerCapture), R && addEventListener(h, "pointermove", (t => moveHandleRelative(M + t[e] - H))) ]);
          const P = [ L, R && (() => {
            const t = getElementScroll(d);
            V();
            const n = getElementScroll(d);
            const o = {
              x: n.x - t.x,
              y: n.y - t.y
            };
            if (r(o.x) > 3 || r(o.y) > 3) {
              v();
              scrollElementTo(d, t);
              scrollOffsetElementScrollBy(o);
              S(V);
            }
          }) ];
          push(_, L);
          y.setPointerCapture(s.pointerId);
          if (t) {
            moveHandleRelative(T);
          } else if (!g) {
            const t = getStaticPluginModuleInstance(kt);
            if (t) {
              const {Pt: n} = o;
              const s = t(scrollRelative, moveHandleRelative, bind(getHandleOffset), T, n[f], O, !!a, (t => {
                if (t) {
                  V();
                } else {
                  push(P, V);
                }
              }));
              push(P, s);
              push(_, bind(s, true));
            }
          }
        }
      })));
      return bind(runEachAndClear, [ g, bind(runEachAndClear, _) ]);
    };
    let z = true;
    return bind(runEachAndClear, [ addEventListener(b, "pointermove pointerleave", s(e)), addEventListener(g, "pointerenter", s((() => {
      l(St, true);
    }))), addEventListener(g, "pointerleave pointercancel", s((() => {
      l(St, false);
    }))), addEventListener(g, "wheel", s((t => {
      const {deltaX: n, deltaY: o, deltaMode: s} = t;
      if (z && s === 0 && parent(g) === u) {
        scrollOffsetElementScrollBy({
          x: n,
          y: o
        });
      }
      z = false;
      l($t, true);
      y((() => {
        z = true;
        l($t);
      }));
      preventDefault(t);
    })), {
      I: false,
      k: true
    }), !_ && addEventListener(g, "mousedown", s((() => {
      const t = getFocusedElement();
      if (hasAttr(t, Y) || hasAttr(t, F) || t === document.body) {
        $(bind(focusElement, f));
      }
    }))), addEventListener(g, "pointerdown", (() => {
      removeClickPrevention();
      const t = addEventListener(p, "click", (t => {
        removeClickPrevention();
        stopAndPrevent(t);
      }), {
        A: true,
        k: true,
        I: false
      });
      const n = addEventListener(p, "pointerup pointercancel", (() => {
        n();
        O(removeClickPrevention);
      }), {
        k: true,
        I: true
      });
      push(D, [ t, n ]);
    }), {
      k: true,
      I: true
    }), removeClickPrevention, createInteractiveScrollEvents(), w, m, E ]);
  };
  const createScrollbarsSetup = (t, n, o, s, e, c, r) => {
    let i;
    let l;
    let a;
    let u;
    let f;
    let _ = noop;
    let d = 0;
    const p = [ "mouse", "pen" ];
    const skipEventIfSleeping = t => n => {
      if (!o.Zt) {
        t(n);
      }
    };
    const isHoverablePointerType = t => p.includes(t.pointerType);
    const [v, g] = selfClearTimeout();
    const [h, b] = selfClearTimeout(100);
    const [y, w] = selfClearTimeout(50);
    const [S, m] = selfClearTimeout((() => d));
    const [O, C] = createScrollbarsSetupElements(t, c, e, createScrollbarsSetupEvents(n, c, e, skipEventIfSleeping, (t => isHoverablePointerType(t) && manageScrollbarsAutoHideInstantInteraction())));
    const {ht: $, tn: x, wt: H} = c;
    const {Xt: D, jt: I, qt: k, Bt: A, Ft: T} = O;
    const manageScrollbarsAutoHide = (t, n) => {
      m();
      const hide = t => {
        if (o.Zt) {
          return;
        }
        D(Ct, t);
      };
      if (t) {
        hide();
      } else {
        const t = a ? !i : true;
        if (d > 0 && !n) {
          S(bind(hide, t));
        } else {
          hide(t);
        }
      }
    };
    const manageScrollbarsAutoHideInstantInteraction = () => {
      if (a ? !i : !u) {
        manageScrollbarsAutoHide(true);
        h((() => {
          manageScrollbarsAutoHide(false);
        }));
      }
    };
    const onHostMouseEnter = t => {
      if (isHoverablePointerType(t)) {
        i = true;
        if (!o.Zt && a) {
          manageScrollbarsAutoHide(true);
        }
      }
    };
    const onHostMouseLeave = t => {
      if (isHoverablePointerType(t)) {
        i = false;
        if (!o.Zt && a) {
          manageScrollbarsAutoHide(false);
        }
      }
    };
    const manageAutoHideSuspension = t => {
      D(Ot, t, true);
      D(Ot, t, false);
    };
    const M = [ m, b, w, g, () => _(), addEventListener($, "pointerover", onHostMouseEnter, {
      A: true
    }), addEventListener($, "pointerenter", onHostMouseEnter), addEventListener($, "pointerleave", onHostMouseLeave), addEventListener($, "pointermove", skipEventIfSleeping((t => {
      if (isHoverablePointerType(t) && l) {
        manageScrollbarsAutoHideInstantInteraction();
      }
    }))), addEventListener(x, "scroll", skipEventIfSleeping((t => {
      v((() => {
        k();
        manageScrollbarsAutoHideInstantInteraction();
      }));
      r(t);
      T();
    }))) ];
    const R = getStaticPluginModuleInstance(zt);
    return [ () => bind(runEachAndClear, push(M, C())), ({It: t, At: n, nn: o, sn: c}) => {
      const {en: r, cn: i, rn: p, ln: v} = c || {};
      const {xt: g, dt: h} = o || {};
      const {B: b} = s;
      const {R: w, U: S} = getEnvironment();
      const {an: m, X: O} = e;
      const [C, $] = t("showNativeOverlaidScrollbars");
      const [M, V] = t("scrollbars.theme");
      const [L, P] = t("scrollbars.visibility");
      const [U, N] = t("scrollbars.autoHide");
      const [j, q] = t("scrollbars.autoHideSuspend");
      const [B] = t("scrollbars.autoHideDelay");
      const [F, X] = t("scrollbars.dragScroll");
      const [Y, W] = t("scrollbars.clickScroll");
      const [G, J] = t("overflow");
      const K = h && !n;
      const Q = r || i || v || g || n;
      const Z = p || P || J;
      const tt = C && w.x && w.y;
      const nt = !S && !R;
      const ot = tt || nt;
      const setScrollbarVisibility = (t, n, o) => {
        const s = t.includes(z) && (L === E || L === "auto" && n === z);
        D(yt, s, o);
        return s;
      };
      d = B;
      if ($ || nt) {
        D(_t, ot);
      }
      if (V) {
        D(f);
        D(M, true);
        f = M;
      }
      if (q || K) {
        manageAutoHideSuspension(!j);
        if (K && j) {
          if (O.x || O.y) {
            _();
            y((() => {
              _ = addEventListener(x, z, skipEventIfSleeping(bind(manageAutoHideSuspension, true)), {
                A: true
              });
            }));
          } else {
            manageAutoHideSuspension(true);
          }
        }
      }
      if (N) {
        l = U === "move";
        a = U === "leave";
        u = U === "never";
        manageScrollbarsAutoHide(u, true);
      }
      if (X) {
        D(Ht, F);
      }
      if (W) {
        D(xt, !!Y);
      }
      if (Z) {
        const t = setScrollbarVisibility(G.x, m.x, true);
        const n = setScrollbarVisibility(G.y, m.y, false);
        const o = t && n;
        D(wt, !o);
      }
      if (Q) {
        k();
        I();
        T();
        if (v) {
          A();
        }
        D(mt, !O.x, true);
        D(mt, !O.y, false);
        D(pt, b && !H);
      }
    }, {}, O ];
  };
  const createStructureSetupElements = t => {
    const n = getEnvironment();
    const {tt: s, J: e, U: c} = n;
    const {elements: r} = s();
    const {padding: i, viewport: l, content: a} = r;
    const u = isHTMLElement(t);
    const f = u ? {} : t;
    const {elements: _} = f;
    const {padding: d, viewport: p, content: v} = _ || {};
    const g = u ? t : f.target;
    const h = isBodyElement(g);
    const b = g.ownerDocument;
    const y = b.documentElement;
    const getDocumentWindow = () => b.defaultView || o;
    const w = bind(staticInitializationElement, [ g ]);
    const S = bind(dynamicInitializationElement, [ g ]);
    const m = bind(createDiv, "");
    const O = bind(w, m, l);
    const x = bind(S, m, a);
    const elementHasOverflow = t => {
      const n = A(t);
      const o = M(t);
      const s = getStyles(t, C);
      const e = getStyles(t, $);
      return o.w - n.w > 0 && !overflowIsVisible(s) || o.h - n.h > 0 && !overflowIsVisible(e);
    };
    const H = O(p);
    const E = H === g;
    const D = E && h;
    const z = !E && x(v);
    const I = !E && H === z;
    const k = D ? y : H;
    const T = D ? k : g;
    const R = !E && S(m, i, d);
    const V = !I && z;
    const L = [ V, k, R, T ].map((t => isHTMLElement(t) && !parent(t) && t));
    const elementIsGenerated = t => t && inArray(L, t);
    const P = !elementIsGenerated(k) && elementHasOverflow(k) ? k : g;
    const U = D ? y : k;
    const N = D ? b : k;
    const q = {
      gt: g,
      ht: T,
      P: k,
      un: R,
      yt: V,
      bt: U,
      tn: N,
      fn: h ? y : P,
      Qt: b,
      wt: h,
      Tt: u,
      L: E,
      _n: getDocumentWindow,
      St: t => hasAttrClass(k, Y, t),
      Ot: (t, n) => addRemoveAttrClass(k, Y, t, n),
      Ct: () => addRemoveAttrClass(U, Y, Q, true)
    };
    const {gt: W, ht: G, un: J, P: K, yt: tt} = q;
    const nt = [ tt, K, J, G, W ];
    const ot = [ () => {
      removeAttrs(G, [ F, j ]);
      removeAttrs(W, j);
      if (h) {
        removeAttrs(y, [ j, F ]);
      }
    } ];
    let ct = contents(nt.find((t => t && !elementIsGenerated(t))));
    const rt = D ? W : tt || K;
    const it = bind(runEachAndClear, ot);
    const appendElements = () => {
      const t = getDocumentWindow();
      const n = getFocusedElement();
      const unwrap = t => {
        appendChildren(parent(t), contents(t));
        removeElements(t);
      };
      const o = "tabindex";
      const s = getAttr(K, o);
      const r = swallowFocusEvents(concat(nt, [ n ]));
      setAttrs(G, F, E ? "" : X);
      setAttrs(J, st, "");
      setAttrs(K, Y, "");
      setAttrs(tt, et, "");
      if (!E) {
        if (s || !e) {
          setAttrs(K, o, s || "-1");
        }
        if (h) {
          setAttrs(y, B, "");
        }
      }
      appendChildren(rt, ct);
      appendChildren(G, J);
      appendChildren(J || G, !E && K);
      appendChildren(K, tt);
      push(ot, [ r, () => {
        const t = getFocusedElement();
        const n = elementIsGenerated(K);
        const e = n && t === K ? W : t;
        const c = swallowFocusEvents(concat(nt, [ e ]));
        removeAttrs(J, st);
        removeAttrs(tt, et);
        removeAttrs(K, Y);
        if (h) {
          removeAttrs(y, B);
        }
        if (s) {
          setAttrs(K, o, s);
        } else {
          removeAttrs(K, o);
        }
        if (elementIsGenerated(tt)) {
          unwrap(tt);
        }
        if (n) {
          unwrap(K);
        }
        if (elementIsGenerated(J)) {
          unwrap(J);
        }
        focusElement(e);
        c();
      } ]);
      if (c && !E) {
        addAttrClass(K, Y, Z);
        push(ot, bind(removeAttrs, K, Y));
      }
      focusElement(!E && h && n === W && t.top === t ? K : n);
      r();
      ct = 0;
      return it;
    };
    return [ q, appendElements, it ];
  };
  const createTrinsicUpdateSegment = ({yt: t}) => ({nn: n, dn: o, At: s}) => {
    const {Ht: e} = n || {};
    const {$t: c} = o;
    const r = t && (e || s);
    if (r) {
      setStyles(t, {
        [H]: c && "100%"
      });
    }
  };
  const createPaddingUpdateSegment = ({ht: t, un: n, P: o, L: s}, e) => {
    const [c, r] = createCache({
      i: equalTRBL,
      o: topRightBottomLeft()
    }, bind(topRightBottomLeft, t, "padding", ""));
    return ({It: t, nn: i, dn: l, At: a}) => {
      let [u, f] = r(a);
      const {U: _} = getEnvironment();
      const {vt: d, Et: p, xt: v} = i || {};
      const {B: g} = l;
      const [C, $] = t("paddingAbsolute");
      const H = a || p;
      if (d || f || H) {
        [u, f] = c(a);
      }
      const E = !s && ($ || v || f);
      if (E) {
        const t = !C || !n && !_;
        const s = u.r + u.l;
        const c = u.t + u.b;
        const r = {
          [m]: t && !g ? -s : 0,
          [O]: t ? -c : 0,
          [S]: t && g ? -s : 0,
          top: t ? -u.t : 0,
          right: t ? g ? -u.r : "auto" : 0,
          left: t ? g ? "auto" : -u.l : 0,
          [x]: t && `calc(100% + ${s}px)`
        };
        const i = {
          [h]: t ? u.t : 0,
          [b]: t ? u.r : 0,
          [w]: t ? u.b : 0,
          [y]: t ? u.l : 0
        };
        setStyles(n || o, r);
        setStyles(o, i);
        assignDeep(e, {
          un: u,
          pn: !t,
          F: n ? i : assignDeep({}, r, i)
        });
      }
      return {
        vn: E
      };
    };
  };
  const createOverflowUpdateSegment = (t, n) => {
    const e = getEnvironment();
    const {ht: c, un: i, P: l, L: u, tn: f, bt: _, wt: d, Ot: p, _n: v} = t;
    const {U: g} = e;
    const h = d && u;
    const b = bind(s, 0);
    const y = {
      display: () => false,
      direction: t => t !== "ltr",
      flexDirection: t => t.endsWith("-reverse"),
      writingMode: t => t !== "horizontal-tb"
    };
    const w = keys(y);
    const S = {
      i: equalWH,
      o: {
        w: 0,
        h: 0
      }
    };
    const m = {
      i: equalXY,
      o: {}
    };
    const setMeasuringMode = t => {
      p(K, !h && t);
    };
    const getFlowDirectionStyles = () => getStyles(l, w);
    const getMeasuredScrollCoordinates = (t, n) => {
      const o = !keys(t).length;
      const s = n ? true : w.some((n => {
        const o = t[n];
        return isString(o) && y[n](o);
      }));
      if (o || !s || !hasDimensions(l)) {
        return {
          T: {
            x: 0,
            y: 0
          },
          M: {
            x: 1,
            y: 1
          }
        };
      }
      setMeasuringMode(true);
      const e = getElementScroll(_);
      const c = addEventListener(f, z, (t => {
        const n = getElementScroll(_);
        if (t.isTrusted && n.x === e.x && n.y === e.y) {
          stopPropagation(t);
        }
      }), {
        k: true,
        A: true
      });
      const i = p(tt, true);
      scrollElementTo(_, {
        x: 0,
        y: 0
      });
      const u = p(ot, true);
      const d = getElementScroll(_);
      const v = M(_);
      scrollElementTo(_, {
        x: v.w,
        y: v.h
      });
      const g = getElementScroll(_);
      const h = {
        x: g.x - d.x,
        y: g.y - d.y
      };
      scrollElementTo(_, {
        x: -v.w,
        y: -v.h
      });
      const b = getElementScroll(_);
      const S = {
        x: b.x - d.x,
        y: b.y - d.y
      };
      const m = {
        x: r(h.x) >= r(S.x) ? g.x : b.x,
        y: r(h.y) >= r(S.y) ? g.y : b.y
      };
      i();
      u();
      scrollElementTo(_, e);
      a((() => c()));
      return {
        T: d,
        M: m
      };
    };
    const getOverflowAmount = (t, n) => {
      const s = o.devicePixelRatio % 1 !== 0 ? 1 : 0;
      const e = {
        w: b(t.w - n.w),
        h: b(t.h - n.h)
      };
      return {
        w: e.w > s ? e.w : 0,
        h: e.h > s ? e.h : 0
      };
    };
    const getViewportOverflowStyle = (t, n) => {
      const getAxisOverflowStyle = (t, n, o, s) => {
        const e = t === E ? D : overflowBehaviorToOverflowStyle(t);
        const c = overflowIsVisible(t);
        const r = overflowIsVisible(o);
        if (!n && !s) {
          return D;
        }
        if (c && r) {
          return E;
        }
        if (c) {
          const t = n ? E : D;
          return n && s ? e : t;
        }
        const i = r && s ? E : D;
        return n ? e : i;
      };
      return {
        x: getAxisOverflowStyle(n.x, t.x, n.y, t.y),
        y: getAxisOverflowStyle(n.y, t.y, n.x, t.x)
      };
    };
    const setViewportOverflowStyle = t => {
      const createAllOverflowStyleClassNames = t => [ E, D, z ].map((n => createViewportOverflowStyleClassName(overflowCssValueToOverflowStyle(n), t)));
      const n = createAllOverflowStyleClassNames(true).concat(createAllOverflowStyleClassNames()).join(" ");
      p(n);
      p(keys(t).map((n => createViewportOverflowStyleClassName(t[n], n === "x"))).join(" "), true);
    };
    const [O, C] = createCache(S, bind(getFractionalSize, l));
    const [$, x] = createCache(S, bind(M, l));
    const [H, I] = createCache(S);
    const [k] = createCache(m);
    const [A, R] = createCache(S);
    const [V] = createCache(m);
    const [L] = createCache({
      i: (t, n) => equal(t, n, deduplicateArray(concat(keys(t), keys(n)))),
      o: {}
    });
    const [P, U] = createCache({
      i: (t, n) => equalXY(t.T, n.T) && equalXY(t.M, n.M),
      o: getZeroScrollCoordinates()
    });
    const N = getStaticPluginModuleInstance(zt);
    return ({It: o, nn: s, dn: r, At: a}, {vn: f}) => {
      const {vt: _, Dt: d, Et: y, xt: w, dt: S, zt: m} = s || {};
      const E = N && N.V(t, n, r, e, o);
      const {Y: D, W: z, G: M} = E || {};
      const [j, B] = getShowNativeOverlaidScrollbars(o, e);
      const [X, Y] = o("overflow");
      const W = overflowIsVisible(X.x);
      const G = overflowIsVisible(X.y);
      const J = _ || f || y || w || m || B;
      let K = C(a);
      let Q = x(a);
      let tt = I(a);
      let ot = R(a);
      if (B && g) {
        p(Z, !j);
      }
      if (J) {
        if (hasAttrClass(c, F, q)) {
          setMeasuringMode(true);
        }
        const t = u ? p(nt, true) : noop;
        const n = z && z();
        const [o] = K = O(a);
        const [s] = Q = $(a);
        const e = T(l);
        const r = h && getWindowSize(v());
        const i = {
          w: b(s.w + o.w),
          h: b(s.h + o.h)
        };
        const f = {
          w: b((r ? r.w : e.w + b(e.w - s.w)) + o.w),
          h: b((r ? r.h : e.h + b(e.h - s.h)) + o.h)
        };
        t();
        if (n) {
          n();
        }
        ot = A(f);
        tt = H(getOverflowAmount(i, f), a);
      }
      const [et, ct] = ot;
      const [rt, it] = tt;
      const [lt, at] = Q;
      const [ut, ft] = K;
      const [_t] = k({
        x: rt.w > 0,
        y: rt.h > 0
      });
      const dt = W && G && (_t.x || _t.y) || W && _t.x && !_t.y || G && _t.y && !_t.x;
      const pt = f || w || m || ft || at || ct || it || Y || B || J || d && h;
      const [vt] = o("update.flowDirectionStyles");
      const [gt, ht] = L(vt ? vt(l) || {} : getFlowDirectionStyles(), a);
      const bt = w || S || ht || a;
      const [yt, wt] = bt ? P(getMeasuredScrollCoordinates(gt, !!vt), a) : U();
      let St = getViewportOverflowStyle(_t, X);
      setMeasuringMode(false);
      if (pt) {
        setViewportOverflowStyle(St);
        St = getElementOverflowStyle(l, _t);
        if (M && D) {
          D(St, lt, ut);
          setStyles(l, M(St));
        }
      }
      const [mt, Ot] = V(St);
      addRemoveAttrClass(c, F, q, dt);
      addRemoveAttrClass(i, st, q, dt);
      assignDeep(n, {
        an: mt,
        Pt: {
          x: et.w,
          y: et.h
        },
        Lt: {
          x: rt.w,
          y: rt.h
        },
        X: _t,
        Mt: sanitizeScrollCoordinates(yt, rt)
      });
      return {
        rn: Ot,
        en: ct,
        cn: it,
        ln: wt || it
      };
    };
  };
  const createStructureSetup = t => {
    const [n, o, s] = createStructureSetupElements(t);
    const e = {
      un: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      pn: false,
      F: {
        [m]: 0,
        [O]: 0,
        [S]: 0,
        [h]: 0,
        [b]: 0,
        [w]: 0,
        [y]: 0
      },
      Pt: {
        x: 0,
        y: 0
      },
      Lt: {
        x: 0,
        y: 0
      },
      an: {
        x: D,
        y: D
      },
      X: {
        x: false,
        y: false
      },
      Mt: getZeroScrollCoordinates()
    };
    const {gt: c, bt: r, L: i, Ct: l} = n;
    const {U: a, R: u} = getEnvironment();
    const f = !a && (u.x || u.y);
    const _ = [ createTrinsicUpdateSegment(n), createPaddingUpdateSegment(n, e), createOverflowUpdateSegment(n, e) ];
    return [ o, t => {
      const n = {};
      const o = f;
      const s = o && getElementScroll(r);
      const e = s && l();
      each(_, (o => {
        assignDeep(n, o(t, n) || {});
      }));
      scrollElementTo(r, s);
      if (e) {
        e();
      }
      if (!i) {
        scrollElementTo(c, 0);
      }
      return n;
    }, e, n, s ];
  };
  const createSetups = (t, n, o, s) => {
    let e = false;
    const c = {
      Zt: false,
      gn: false
    };
    const r = createOptionCheck(n, {});
    const [i, l, a, u, f] = createStructureSetup(t);
    const [_, d, p] = createObserversSetup(u, a, r, (t => {
      update({}, t);
    }));
    const [v, g, , h] = createScrollbarsSetup(t, n, c, p, a, u, s);
    const updateHintsAreTruthy = t => keys(t).some((n => !!t[n]));
    const update = (t, s) => {
      const {Zt: r, gn: i} = c;
      if (i || r && e) {
        return false;
      }
      const {hn: a, At: u, kt: f} = t;
      const _ = a || {};
      const v = !!u || !e;
      const h = {
        It: createOptionCheck(n, _, v),
        hn: _,
        At: v
      };
      const b = s || d(assignDeep({}, h, {
        kt: f
      }));
      const y = l(assignDeep({}, h, {
        dn: p,
        nn: b
      }));
      g(assignDeep({}, h, {
        nn: b,
        sn: y
      }));
      const w = updateHintsAreTruthy(b);
      const S = updateHintsAreTruthy(y);
      const m = w || S || !isEmptyObject(_) || v;
      e = true;
      if (m) {
        o(t, {
          nn: b,
          sn: y
        });
      }
      return m;
    };
    return [ () => {
      const {fn: t, bt: n, Ct: o} = u;
      const s = getElementScroll(t);
      const e = [ _(), i(), v(), () => {
        c.gn = true;
      } ];
      const r = o();
      scrollElementTo(n, s);
      r();
      return bind(runEachAndClear, e);
    }, update, t => {
      const n = c.Zt;
      c.Zt = t;
      if (!t && n !== t) {
        update({
          At: true,
          kt: true
        });
      }
    }, () => {
      g({
        It: createOptionCheck(n, {}, false),
        hn: {},
        At: false
      });
    }, () => ({
      bn: c,
      yn: p,
      wn: a
    }), {
      Sn: u,
      mn: h
    }, f ];
  };
  const Nt = new WeakMap;
  const addInstance = (t, n) => {
    Nt.set(t, n);
  };
  const removeInstance = t => {
    Nt.delete(t);
  };
  const getInstance = t => Nt.get(t);
  const OverlayScrollbars = (t, n, o) => {
    const {ot: s} = getEnvironment();
    const e = isHTMLElement(t);
    const c = e ? t : t.target;
    const r = getInstance(c);
    if (n && !r) {
      const r = [];
      const i = {};
      const validateOptions = t => {
        const n = removeUndefinedProperties(t);
        const o = getStaticPluginModuleInstance(L);
        return o ? o(n, true) : n;
      };
      const l = assignDeep({}, s(), validateOptions(n));
      const [a, u, f] = createEventListenerHub();
      const [_, d, p] = createEventListenerHub(o);
      const triggerEvent = (t, n) => {
        p(t, n);
        f(t, n);
      };
      const [v, g, h, b, y, w, S] = createSetups(t, l, (({hn: t, At: n}, {nn: o, sn: s}) => {
        const {vt: e, xt: c, Ht: r, Et: i, Dt: l, dt: a} = o;
        const {en: u, cn: f, rn: _, ln: d} = s;
        triggerEvent("updated", [ m, {
          updateHints: {
            sizeChanged: !!e,
            directionChanged: !!c,
            heightIntrinsicChanged: !!r,
            overflowEdgeChanged: !!u,
            overflowAmountChanged: !!f,
            overflowStyleChanged: !!_,
            scrollCoordinatesChanged: !!d,
            contentMutation: !!i,
            hostMutation: !!l,
            appear: !!a
          },
          changedOptions: t || {},
          force: !!n
        } ]);
      }), (t => triggerEvent("scroll", [ m, t ])));
      const destroy = t => {
        const {bn: n} = y();
        const {gn: o} = n;
        if (o) {
          return;
        }
        removeInstance(c);
        runEachAndClear(r);
        triggerEvent("destroyed", [ m, t ]);
        u();
        d();
      };
      const update = t => g({
        At: t,
        kt: true
      });
      const m = {
        options(t, n) {
          if (t) {
            const o = n ? s() : {};
            const e = getOptionsDiff(l, assignDeep(o, validateOptions(t)));
            if (!isEmptyObject(e)) {
              assignDeep(l, e);
              g({
                hn: e
              });
            }
          }
          return assignDeep({}, l);
        },
        on: _,
        off: (t, n) => {
          if (t && n) {
            d(t, n);
          }
        },
        state() {
          const {bn: t, yn: n, wn: o} = y();
          const {gn: s, Zt: e} = t;
          const {B: c} = n;
          const {Pt: r, Lt: i, an: l, X: a, un: u, pn: f, Mt: _} = o;
          return assignDeep({}, {
            overflowEdge: r,
            overflowAmount: i,
            overflowStyle: l,
            hasOverflow: a,
            scrollCoordinates: {
              start: _.T,
              end: _.M
            },
            padding: u,
            paddingAbsolute: f,
            directionRTL: c,
            sleeping: e,
            destroyed: s
          });
        },
        elements() {
          const {gt: t, ht: n, un: o, P: s, yt: e, bt: c, tn: r} = w.Sn;
          const {Yt: i, Kt: l} = w.mn;
          const translateScrollbarStructure = t => {
            const {Rt: n, Nt: o, Ut: s} = t;
            return {
              scrollbar: s,
              track: o,
              handle: n
            };
          };
          const translateScrollbarsSetupElement = t => {
            const {Wt: n, Gt: o} = t;
            const s = translateScrollbarStructure(n[0]);
            return assignDeep({}, s, {
              clone: () => {
                const t = translateScrollbarStructure(o());
                b();
                return t;
              }
            });
          };
          return assignDeep({}, {
            target: t,
            host: n,
            padding: o || s,
            viewport: s,
            content: e || s,
            scrollOffsetElement: c,
            scrollEventElement: r,
            scrollbarHorizontal: translateScrollbarsSetupElement(i),
            scrollbarVertical: translateScrollbarsSetupElement(l)
          });
        },
        update: update,
        destroy: bind(destroy, false),
        sleep: h,
        plugin: t => i[keys(t)[0]]
      };
      push(r, [ S ]);
      addInstance(c, m);
      registerPluginModuleInstances(R, OverlayScrollbars, [ m, a, i ]);
      if (cancelInitialization(w.Sn.wt, !e && t.cancel)) {
        destroy(true);
        return m;
      }
      push(r, v());
      triggerEvent("initialized", [ m ]);
      m.update();
      return m;
    }
    return r;
  };
  OverlayScrollbars.plugin = t => {
    const n = isArray(t);
    const o = n ? t : [ t ];
    const s = o.map((t => registerPluginModuleInstances(t, OverlayScrollbars)[0]));
    addPlugins(o);
    return n ? s : s[0];
  };
  OverlayScrollbars.valid = t => {
    const n = t && t.elements;
    const o = isFunction(n) && n();
    return isPlainObject(o) && !!getInstance(o.target);
  };
  OverlayScrollbars.env = () => {
    const {N: t, R: n, U: o, K: s, J: e, et: c, ct: r, tt: i, nt: l, ot: a, st: u} = getEnvironment();
    return assignDeep({}, {
      scrollbarsSize: t,
      scrollbarsOverlaid: n,
      scrollbarsHiding: o,
      scrollTimeline: s,
      focusableScrollers: e,
      staticDefaultInitialization: c,
      staticDefaultOptions: r,
      getDefaultInitialization: i,
      setDefaultInitialization: l,
      getDefaultOptions: a,
      setDefaultOptions: u
    });
  };
  OverlayScrollbars.nonce = setNonce;
  OverlayScrollbars.trustedTypePolicy = setTrustedTypePolicy;
  t.ClickScrollPlugin = At;
  t.OverlayScrollbars = OverlayScrollbars;
  t.ScrollbarsHidingPlugin = It;
  t.SizeObserverPlugin = Dt;
  Object.defineProperty(t, Symbol.toStringTag, {
    value: "Module"
  });
  return t;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es6.js.map
