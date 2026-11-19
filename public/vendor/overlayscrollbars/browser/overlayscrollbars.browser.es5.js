/*!
 * OverlayScrollbars
 * Version: 2.17.1
 *
 * Copyright (c) Rene Haas | KingSora.
 * https://github.com/KingSora
 *
 * Released under the MIT license.
 */
var OverlayScrollbarsGlobal = function(r) {
  "use strict";
  var e = function createCache(r, e) {
    var a = r.i, n = r.v, t = r.o;
    var i = a;
    var v;
    var o = function cacheUpdateContextual(r, e) {
      var a = i;
      var o = r;
      var u = e || (n ? !n(a, o) : a !== o);
      if (u || t) {
        i = o;
        v = a;
      }
      return [ i, u, v ];
    };
    var u = function cacheUpdateIsolated(r) {
      return o(e(i, v), r);
    };
    var c = function getCurrentCache(r) {
      return [ i, !!r, v ];
    };
    return [ e ? u : o, c ];
  };
  var a = typeof window !== "undefined" && typeof HTMLElement !== "undefined" && !!window.document;
  var n = a ? window : {};
  var t = Math.max;
  var i = Math.min;
  var v = Math.round;
  var o = Math.abs;
  var u = Math.sign;
  var c = n.cancelAnimationFrame;
  var f = n.requestAnimationFrame;
  var l = n.setTimeout;
  var s = n.clearTimeout;
  var d = function getApi(r) {
    return typeof n[r] !== "undefined" ? n[r] : void 0;
  };
  var p = d("MutationObserver");
  var _ = d("IntersectionObserver");
  var g = d("ResizeObserver");
  var h = d("WeakRef");
  var b = d("ScrollTimeline");
  var m = function isUndefined(r) {
    return r === void 0;
  };
  var S = function isNull(r) {
    return r === null;
  };
  var y = function type(r) {
    return m(r) || S(r) ? "" + r : Object.prototype.toString.call(r).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
  };
  var w = function isNumber(r) {
    return typeof r === "number";
  };
  var O = function isString(r) {
    return typeof r === "string";
  };
  var C = function isBoolean(r) {
    return typeof r === "boolean";
  };
  var x = function isFunction(r) {
    return typeof r === "function";
  };
  var E = function isArray(r) {
    return Array.isArray(r);
  };
  var A = function isObject(r) {
    return typeof r === "object" && !E(r) && !S(r);
  };
  var T = function isArrayLike(r) {
    var e = !!r && r.length;
    var a = w(e) && e > -1 && e % 1 == 0;
    return E(r) || !x(r) && a ? e > 0 && A(r) ? e - 1 in r : true : false;
  };
  var D = function isPlainObject(r) {
    return !!r && r.constructor === Object;
  };
  var H = function isHTMLElement(r) {
    return r instanceof HTMLElement;
  };
  var P = function isElement(r) {
    return r instanceof Element;
  };
  var z = function animationCurrentTime() {
    return performance.now();
  };
  var M = function animateNumber(r, e, a, n, i) {
    var v = 0;
    var o = z();
    var u = t(0, a);
    var l = function frame(a) {
      var c = z();
      var s = c - o;
      var d = s >= u;
      var p = a ? 1 : 1 - (t(0, o + u - c) / u || 0);
      var _ = (e - r) * (x(i) ? i(p, p * u, 0, 1, u) : p) + r;
      var g = d || p === 1;
      n(_, p, g);
      v = g ? 0 : f((function() {
        return l();
      }));
    };
    l();
    return function(r) {
      c(v);
      if (r) {
        l(r);
      }
    };
  };
  function each(r, e) {
    if (T(r)) {
      for (var a = 0; a < r.length; a++) {
        if (e(r[a], a, r) === false) {
          break;
        }
      }
    } else if (r) {
      each(Object.keys(r), (function(a) {
        return e(r[a], a, r);
      }));
    }
    return r;
  }
  var k = function inArray(r, e) {
    return r.indexOf(e) >= 0;
  };
  var I = function concat(r, e) {
    return r.concat(e);
  };
  var L = function push(r, e, a) {
    if (!O(e) && T(e)) {
      Array.prototype.push.apply(r, e);
    } else {
      r.push(e);
    }
    return r;
  };
  var V = function from(r) {
    return Array.from(r || []);
  };
  var R = function createOrKeepArray(r) {
    if (E(r)) {
      return r;
    }
    return !O(r) && T(r) ? V(r) : [ r ];
  };
  var F = function isEmptyArray(r) {
    return !!r && !r.length;
  };
  var N = function deduplicateArray(r) {
    return V(new Set(r));
  };
  var j = function runEachAndClear(r, e, a) {
    var n = function runFn(r) {
      return r ? r.apply(void 0, e || []) : true;
    };
    each(r, n);
    if (!a) {
      r.length = 0;
    }
  };
  var q = "paddingTop";
  var U = "paddingRight";
  var B = "paddingLeft";
  var Y = "paddingBottom";
  var W = "marginLeft";
  var X = "marginRight";
  var Z = "marginBottom";
  var G = "overflowX";
  var Q = "overflowY";
  var $ = "width";
  var J = "height";
  var K = "visible";
  var rr = "hidden";
  var er = "scroll";
  var ar = function capitalizeFirstLetter(r) {
    var e = String(r || "");
    return e ? e[0].toUpperCase() + e.slice(1) : "";
  };
  var nr = function equal(r, e, a, n) {
    if (r && e) {
      var t = true;
      each(a, (function(a) {
        var n = r[a];
        var i = e[a];
        if (n !== i) {
          t = false;
        }
      }));
      return t;
    }
    return false;
  };
  var tr = function equalWH(r, e) {
    return nr(r, e, [ "w", "h" ]);
  };
  var ir = function equalXY(r, e) {
    return nr(r, e, [ "x", "y" ]);
  };
  var vr = function equalTRBL(r, e) {
    return nr(r, e, [ "t", "r", "b", "l" ]);
  };
  var or = function bind(r) {
    for (var e = arguments.length, a = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++) {
      a[n - 1] = arguments[n];
    }
    return r.bind.apply(r, [ 0 ].concat(a));
  };
  var ur = function selfClearTimeout(r) {
    var e;
    var a = r ? l : f;
    var n = r ? s : c;
    return [ function(t) {
      n(e);
      e = a((function() {
        return t();
      }), x(r) ? r() : r);
    }, function() {
      return n(e);
    } ];
  };
  var cr = function getDebouncer(r) {
    var e = x(r) ? r() : r;
    if (w(e)) {
      var a = e ? l : f;
      var n = e ? s : c;
      return function(r) {
        var t = a((function() {
          return r();
        }), e);
        return function() {
          n(t);
        };
      };
    }
    return e && e.u;
  };
  var fr = function debounce(r, e) {
    var a = e || {}, n = a.p, t = a._, i = a.m, v = a.S;
    var o;
    var u;
    var c;
    var f;
    var l = function clear() {
      if (u) {
        u();
      }
      if (o) {
        o();
      }
      f = u = o = c = void 0;
    };
    var s = function invokeFunctionToDebounce(e) {
      l();
      r.apply(this, e);
    };
    var d = function mergeParms(r) {
      return v && c ? v(c, r) : r;
    };
    var p = function flush() {
      if (u && c) {
        s(d(c) || c);
      }
    };
    var _ = function debouncedFn() {
      var r = V(arguments);
      var e = cr(n);
      if (e) {
        var a = typeof i === "function" ? i() : i;
        var v = cr(t);
        var l = d(r);
        var _ = l || r;
        var g = s.bind(0, _);
        if (u) {
          u();
        }
        if (a && !f) {
          g();
          f = true;
          u = e((function() {
            return f = void 0;
          }));
        } else {
          u = e(g);
          if (v && !o) {
            o = v(p);
          }
        }
        c = _;
      } else {
        s(r);
      }
    };
    _.O = p;
    _.C = l;
    return _;
  };
  var lr = function hasOwnProperty(r, e) {
    return Object.prototype.hasOwnProperty.call(r, e);
  };
  var sr = function keys(r) {
    return r ? Object.keys(r) : [];
  };
  var dr = function assignDeep(r, e, a, n, t, i, v) {
    var o = [ e, a, n, t, i, v ];
    if ((typeof r !== "object" || S(r)) && !x(r)) {
      r = {};
    }
    each(o, (function(e) {
      each(e, (function(a, n) {
        var t = e[n];
        if (r === t) {
          return true;
        }
        var i = E(t);
        if (t && D(t)) {
          var v = r[n];
          var o = v;
          if (i && !E(v)) {
            o = [];
          } else if (!i && !D(v)) {
            o = {};
          }
          r[n] = dr(o, t);
        } else {
          r[n] = i ? t.slice() : t;
        }
      }));
    }));
    return r;
  };
  var pr = function removeUndefinedProperties(r, e) {
    return each(dr({}, r), (function(r, e, a) {
      if (r === void 0) {
        delete a[e];
      } else if (r && D(r)) {
        a[e] = pr(r);
      }
    }));
  };
  var _r = function isEmptyObject(r) {
    return !sr(r).length;
  };
  var gr = function noop() {};
  var hr = function capNumber(r, e, a) {
    return t(r, i(e, a));
  };
  var br = function getDomTokensArray(r) {
    return N((E(r) ? r : (r || "").split(" ")).filter((function(r) {
      return r;
    })));
  };
  var mr = function getAttr(r, e) {
    return r && r.getAttribute(e);
  };
  var Sr = function hasAttr(r, e) {
    return r && r.hasAttribute(e);
  };
  var yr = function setAttrs(r, e, a) {
    each(br(e), (function(e) {
      if (r) {
        r.setAttribute(e, String(a || ""));
      }
    }));
  };
  var wr = function removeAttrs(r, e) {
    each(br(e), (function(e) {
      return r && r.removeAttribute(e);
    }));
  };
  var Or = function domTokenListAttr(r, e) {
    var a = br(mr(r, e));
    var n = or(yr, r, e);
    var t = function domTokenListOperation(r, e) {
      var n = new Set(a);
      each(br(r), (function(r) {
        n[e](r);
      }));
      return V(n).join(" ");
    };
    return {
      A: function _remove(r) {
        return n(t(r, "delete"));
      },
      T: function _add(r) {
        return n(t(r, "add"));
      },
      D: function _has(r) {
        var e = br(r);
        return e.reduce((function(r, e) {
          return r && a.includes(e);
        }), e.length > 0);
      }
    };
  };
  var Cr = function removeAttrClass(r, e, a) {
    Or(r, e).A(a);
    return or(xr, r, e, a);
  };
  var xr = function addAttrClass(r, e, a) {
    Or(r, e).T(a);
    return or(Cr, r, e, a);
  };
  var Er = function addRemoveAttrClass(r, e, a, n) {
    return (n ? xr : Cr)(r, e, a);
  };
  var Ar = function hasAttrClass(r, e, a) {
    return Or(r, e).D(a);
  };
  var Tr = function createDomTokenListClass(r) {
    return Or(r, "class");
  };
  var Dr = function removeClass(r, e) {
    Tr(r).A(e);
  };
  var Hr = function addClass(r, e) {
    Tr(r).T(e);
    return or(Dr, r, e);
  };
  var Pr = function find(r, e) {
    var a = e ? P(e) && e : document;
    return a ? V(a.querySelectorAll(r)) : [];
  };
  var zr = function findFirst(r, e) {
    var a = e ? P(e) && e : document;
    return a && a.querySelector(r);
  };
  var Mr = function is(r, e) {
    return P(r) && r.matches(e);
  };
  var kr = function isBodyElement(r) {
    return Mr(r, "body");
  };
  var Ir = function contents(r) {
    return r ? V(r.childNodes) : [];
  };
  var Lr = function parent(r) {
    return r && r.parentElement;
  };
  var Vr = function closest(r, e) {
    return P(r) && r.closest(e);
  };
  var Rr = function getFocusedElement(r) {
    return document.activeElement;
  };
  var Fr = function liesBetween(r, e, a) {
    var n = Vr(r, e);
    var t = r && zr(a, n);
    var i = Vr(t, e) === n;
    return n && t ? n === r || t === r || i && Vr(Vr(r, a), e) !== n : false;
  };
  var Nr = function removeElements(r) {
    each(R(r), (function(r) {
      var e = Lr(r);
      if (r && e) {
        e.removeChild(r);
      }
    }));
  };
  var jr = function appendChildren(r, e) {
    return or(Nr, r && e && each(R(e), (function(e) {
      if (e) {
        r.appendChild(e);
      }
    })));
  };
  var qr;
  var Ur = function getTrustedTypePolicy() {
    return qr;
  };
  var Br = function setTrustedTypePolicy(r) {
    qr = r;
  };
  var Yr = function createDiv(r) {
    var e = document.createElement("div");
    yr(e, "class", r);
    return e;
  };
  var Wr = function createDOM(r) {
    var e = Yr();
    var a = Ur();
    var n = r.trim();
    e.innerHTML = a ? a.createHTML(n) : n;
    return each(Ir(e), (function(r) {
      return Nr(r);
    }));
  };
  var Xr = function getCSSVal(r, e) {
    return r.getPropertyValue(e) || r[e] || "";
  };
  var Zr = function validFiniteNumber(r) {
    var e = r || 0;
    return isFinite(e) ? e : 0;
  };
  var Gr = function parseToZeroOrNumber(r) {
    return Zr(parseFloat(r || ""));
  };
  var Qr = function roundCssNumber(r) {
    return Math.round(r * 1e4) / 1e4;
  };
  var $r = function numberToCssPx(r) {
    return Qr(Zr(r)) + "px";
  };
  function setStyles(r, e) {
    r && e && each(e, (function(e, a) {
      try {
        var n = r.style;
        var t = S(e) || C(e) ? "" : w(e) ? $r(e) : e;
        if (a.indexOf("--") === 0) {
          n.setProperty(a, t);
        } else {
          n[a] = t;
        }
      } catch (i) {}
    }));
  }
  function getStyles(r, e, a) {
    var t = O(e);
    var i = t ? "" : {};
    if (r) {
      var v = n.getComputedStyle(r, a) || r.style;
      i = t ? Xr(v, e) : V(e).reduce((function(r, e) {
        r[e] = Xr(v, e);
        return r;
      }), i);
    }
    return i;
  }
  var Jr = function topRightBottomLeft(r, e, a) {
    var n = e ? e + "-" : "";
    var t = a ? "-" + a : "";
    var i = n + "top" + t;
    var v = n + "right" + t;
    var o = n + "bottom" + t;
    var u = n + "left" + t;
    var c = getStyles(r, [ i, v, o, u ]);
    return {
      t: Gr(c[i]),
      r: Gr(c[v]),
      b: Gr(c[o]),
      l: Gr(c[u])
    };
  };
  var Kr = function getTrasformTranslateValue(r, e) {
    return "translate" + (A(r) ? "(" + r.x + "," + r.y + ")" : (e ? "X" : "Y") + "(" + r + ")");
  };
  var re = function elementHasDimensions(r) {
    return !!(r.offsetWidth || r.offsetHeight || r.getClientRects().length);
  };
  var ee = {
    w: 0,
    h: 0
  };
  var ae = function getElmWidthHeightProperty(r, e) {
    return e ? {
      w: e[r + "Width"],
      h: e[r + "Height"]
    } : ee;
  };
  var ne = function getWindowSize(r) {
    return ae("inner", r || n);
  };
  var te = or(ae, "offset");
  var ie = or(ae, "client");
  var ve = or(ae, "scroll");
  var oe = function getFractionalSize(r) {
    var e = parseFloat(getStyles(r, $)) || 0;
    var a = parseFloat(getStyles(r, J)) || 0;
    return {
      w: e - v(e),
      h: a - v(a)
    };
  };
  var ue = function getBoundingClientRect(r) {
    return r.getBoundingClientRect();
  };
  var ce = function hasDimensions(r) {
    return !!r && re(r);
  };
  var fe = function domRectHasDimensions(r) {
    return !!(r && (r[J] || r[$]));
  };
  var le = function domRectAppeared(r, e) {
    var a = fe(r);
    var n = fe(e);
    return !n && a;
  };
  var se = function removeEventListener(r, e, a, n) {
    each(br(e), (function(e) {
      if (r) {
        r.removeEventListener(e, a, n);
      }
    }));
  };
  var de = function addEventListener(r, e, a, n) {
    var t;
    var i = (t = n && n.H) != null ? t : true;
    var v = n && n.P || false;
    var o = n && n.M || false;
    var u = {
      passive: i,
      capture: v
    };
    return or(j, br(e).map((function(e) {
      var n = o ? function(t) {
        se(r, e, n, v);
        if (a) {
          a(t);
        }
      } : a;
      if (r) {
        r.addEventListener(e, n, u);
      }
      return or(se, r, e, n, v);
    })));
  };
  var pe = function stopPropagation(r) {
    return r.stopPropagation();
  };
  var _e = function preventDefault(r) {
    return r.preventDefault();
  };
  var ge = function stopAndPrevent(r) {
    return pe(r) || _e(r);
  };
  var he = function swallowFocusEvents(r) {
    return or(j, R(r).map((function(r) {
      return de(r, "focusin focusout focus blur", (function(r) {
        return ge(r);
      }), {
        P: true,
        H: false
      });
    })));
  };
  var be = function scrollElementTo(r, e) {
    var a = w(e) ? {
      x: e,
      y: e
    } : e || {}, n = a.x, t = a.y;
    w(n) && (r.scrollLeft = n);
    w(t) && (r.scrollTop = t);
  };
  var me = function getElementScroll(r) {
    return {
      x: r.scrollLeft,
      y: r.scrollTop
    };
  };
  var Se = function getZeroScrollCoordinates() {
    return {
      k: {
        x: 0,
        y: 0
      },
      I: {
        x: 0,
        y: 0
      }
    };
  };
  var ye = function sanitizeScrollCoordinates(r, e) {
    var a = r.k, n = r.I;
    var t = e.w, i = e.h;
    var v = function sanitizeAxis(r, e, a) {
      var n = u(r) * a;
      var t = u(e) * a;
      if (n === t) {
        var i = o(r);
        var v = o(e);
        t = i > v ? 0 : t;
        n = i < v ? 0 : n;
      }
      n = n === t ? 0 : n;
      return [ n + 0, t + 0 ];
    };
    var c = v(a.x, n.x, t), f = c[0], l = c[1];
    var s = v(a.y, n.y, i), d = s[0], p = s[1];
    return {
      k: {
        x: f,
        y: d
      },
      I: {
        x: l,
        y: p
      }
    };
  };
  var we = function isDefaultDirectionScrollCoordinates(r) {
    var e = r.k, a = r.I;
    var n = function getAxis(r, e) {
      return r === 0 && r <= e;
    };
    return {
      x: n(e.x, a.x),
      y: n(e.y, a.y)
    };
  };
  var Oe = function getScrollCoordinatesPercent(r, e) {
    var a = r.k, n = r.I;
    var t = function getAxis(r, e, a) {
      return hr(0, 1, (r - a) / (r - e) || 0);
    };
    return {
      x: t(a.x, n.x, e.x),
      y: t(a.y, n.y, e.y)
    };
  };
  var Ce = function focusElement(r) {
    if (r && r.focus) {
      r.focus({
        preventScroll: true,
        focusVisible: false
      });
    }
  };
  var xe = function manageListener(r, e) {
    each(R(e), r);
  };
  var Ee = function createEventListenerHub(r) {
    var e = new Map;
    var a = function removeEvent(r, a) {
      if (r) {
        var n = e.get(r);
        xe((function(r) {
          if (n) {
            n[r ? "delete" : "clear"](r);
          }
        }), a);
      } else {
        e.forEach((function(r) {
          r.clear();
        }));
        e.clear();
      }
    };
    var n = function addEvent(r, t) {
      if (O(r)) {
        var i = e.get(r) || new Set;
        e.set(r, i);
        xe((function(r) {
          if (x(r)) {
            i.add(r);
          }
        }), t);
        return or(a, r, t);
      }
      if (C(t) && t) {
        a();
      }
      var v = sr(r);
      var o = [];
      each(v, (function(e) {
        var a = r[e];
        if (a) {
          L(o, n(e, a));
        }
      }));
      return or(j, o);
    };
    var t = function triggerEvent(r, a) {
      each(V(e.get(r)), (function(r) {
        if (a && !F(a)) {
          r.apply(0, a);
        } else {
          r();
        }
      }));
    };
    n(r || {});
    return [ n, a, t ];
  };
  var Ae = {};
  var Te = {};
  var De = function addPlugins(r) {
    each(r, (function(r) {
      return each(r, (function(e, a) {
        Ae[a] = r[a];
      }));
    }));
  };
  var He = function registerPluginModuleInstances(r, e, a) {
    return sr(r).map((function(n) {
      var t = r[n], i = t.static, v = t.instance;
      var o = a || [], u = o[0], c = o[1], f = o[2];
      var l = a ? v : i;
      if (l) {
        var s = a ? l(u, c, e) : l(e);
        return (f || Te)[n] = s;
      }
    }));
  };
  var Pe = function getInstancePluginModuleInstance(r, e) {
    return r[e];
  };
  var ze = function getStaticPluginModuleInstance(r) {
    return Pe(Te, r);
  };
  function getDefaultExportFromCjs(r) {
    return r && r.L && Object.prototype.hasOwnProperty.call(r, "default") ? r["default"] : r;
  }
  var Me = {
    exports: {}
  };
  (function(r) {
    function _extends() {
      return r.exports = _extends = Object.assign ? Object.assign.bind() : function(r) {
        for (var e = 1; e < arguments.length; e++) {
          var a = arguments[e];
          for (var n in a) {
            ({}).hasOwnProperty.call(a, n) && (r[n] = a[n]);
          }
        }
        return r;
      }, r.exports.L = true, r.exports["default"] = r.exports, _extends.apply(null, arguments);
    }
    r.exports = _extends, r.exports.L = true, r.exports["default"] = r.exports;
  })(Me);
  var ke = Me.exports;
  var Ie = /*@__PURE__*/ getDefaultExportFromCjs(ke);
  var Le = {
    boolean: "__TPL_boolean_TYPE__",
    number: "__TPL_number_TYPE__",
    string: "__TPL_string_TYPE__",
    array: "__TPL_array_TYPE__",
    object: "__TPL_object_TYPE__",
    function: "__TPL_function_TYPE__",
    null: "__TPL_null_TYPE__"
  };
  var Ve = function validateRecursive(r, e, a, n) {
    var t = {};
    var i = Ie({}, e);
    var v = sr(r).filter((function(r) {
      return lr(e, r);
    }));
    each(v, (function(v) {
      var o = e[v];
      var u = r[v];
      var c = D(u);
      var f = n ? n + "." : "";
      if (c && D(o)) {
        var l = Ve(u, o, a, f + v), s = l[0], d = l[1];
        t[v] = s;
        i[v] = d;
        each([ i, t ], (function(r) {
          if (_r(r[v])) {
            delete r[v];
          }
        }));
      } else if (!c) {
        var p = false;
        var _ = [];
        var g = [];
        var h = y(o);
        var b = R(u);
        each(b, (function(r) {
          var e;
          each(Le, (function(a, n) {
            if (a === r) {
              e = n;
            }
          }));
          var a = m(e);
          if (a && O(o)) {
            var n = r.split(" ");
            p = !!n.find((function(r) {
              return r === o;
            }));
            L(_, n);
          } else {
            p = Le[h] === r;
          }
          L(g, a ? Le.string : e);
          return !p;
        }));
        if (p) {
          t[v] = o;
        } else if (a) {
          console.warn('The option "' + f + v + "\" wasn't set, because it doesn't accept the type [ " + h.toUpperCase() + ' ] with the value of "' + o + '".\r\n' + "Accepted types are: [ " + g.join(", ").toUpperCase() + " ].\r\n" + (_.length > 0 ? "\r\nValid strings are: [ " + _.join(", ") + " ]." : ""));
        }
        delete i[v];
      }
    }));
    return [ t, i ];
  };
  var Re = function validateOptions(r, e, a) {
    return Ve(r, e, a);
  };
  var Fe = "__osOptionsValidationPlugin";
  /* @__PURE__ */  (function(r) {
    return r = {}, r[Fe] = {
      static: function _static() {
        var r = Le.number;
        var e = Le.boolean;
        var a = [ Le.array, Le.null ];
        var n = "hidden scroll visible visible-hidden";
        var t = "visible hidden auto";
        var i = "never scroll leavemove";
        var v = [ e, Le.string, Le.function ];
        var o = {
          paddingAbsolute: e,
          showNativeOverlaidScrollbars: e,
          update: {
            elementEvents: a,
            attributes: a,
            debounce: [ Le.number, Le.array, Le.object, Le.null ],
            ignoreMutation: [ Le.function, Le.null ],
            flowDirectionStyles: [ Le.function, Le.null ]
          },
          overflow: {
            x: n,
            y: n
          },
          scrollbars: {
            theme: [ Le.string, Le.null ],
            visibility: t,
            autoHide: i,
            autoHideDelay: r,
            autoHideSuspend: e,
            dragScroll: e,
            clickScroll: v,
            pointers: [ Le.array, Le.null ]
          }
        };
        return function(r, e) {
          var a = Re(o, r, e), n = a[0], t = a[1];
          return Ie({}, t, n);
        };
      }
    }, r;
  })();
  var Ne = "data-overlayscrollbars";
  var je = "os-environment";
  var qe = je + "-scrollbar-hidden";
  var Ue = Ne + "-initialize";
  var Be = "noClipping";
  var Ye = Ne + "-body";
  var We = Ne;
  var Xe = "host";
  var Ze = Ne + "-viewport";
  var Ge = G;
  var Qe = Q;
  var $e = "arrange";
  var Je = "measuring";
  var Ke = "scrolling";
  var ra = "scrollbarHidden";
  var ea = "noContent";
  var aa = "noScrollbars";
  var na = "contentOverflow";
  var ta = Ne + "-padding";
  var ia = Ne + "-content";
  var va = "os-size-observer";
  var oa = va + "-appear";
  var ua = va + "-listener";
  var ca = ua + "-scroll";
  var fa = ua + "-item";
  var la = fa + "-final";
  var sa = "os-trinsic-observer";
  var da = "os-theme-none";
  var pa = "os-scrollbar";
  var _a = pa + "-rtl";
  var ga = pa + "-horizontal";
  var ha = pa + "-vertical";
  var ba = pa + "-track";
  var ma = pa + "-handle";
  var Sa = pa + "-visible";
  var ya = pa + "-cornerless";
  var wa = pa + "-interaction";
  var Oa = pa + "-unusable";
  var Ca = pa + "-auto-hide";
  var xa = Ca + "-hidden";
  var Ea = pa + "-wheel";
  var Aa = ba + "-interactive";
  var Ta = ma + "-interactive";
  var Da = "__osSizeObserverPlugin";
  var Ha = /* @__PURE__ */ function(r) {
    return r = {}, r[Da] = {
      static: function _static() {
        return function(r, e, a) {
          var n;
          var t = 3333333;
          var i = "scroll";
          var v = Wr('<div class="' + fa + '" dir="ltr"><div class="' + fa + '"><div class="' + la + '"></div></div><div class="' + fa + '"><div class="' + la + '" style="width: 200%; height: 200%"></div></div></div>');
          var o = v[0];
          var u = o.lastChild;
          var l = o.firstChild;
          var s = l == null ? void 0 : l.firstChild;
          var d = te(o);
          var p = d;
          var _ = false;
          var g = null;
          var h = function reset() {
            be(l, t);
            be(u, t);
          };
          var b = function onResized(r) {
            g = null;
            if (_) {
              d = p;
              e(r === true);
            }
          };
          var m = function onScroll(r) {
            p = te(o);
            _ = !r || !tr(p, d);
            if (r) {
              pe(r);
              if (_ && !w(g)) {
                g = f(b);
              }
            } else {
              b(r === false);
            }
            h();
          };
          var S = [ jr(r, v), de(l, i, m), de(u, i, m) ];
          Hr(r, ca);
          setStyles(s, (n = {}, n[$] = t, n[J] = t, n));
          var y = f(h);
          L(S, (function() {
            if (w(g)) {
              c(g);
            }
            c(y);
          }));
          return [ a ? or(m, false) : h, S ];
        };
      }
    }, r;
  }();
  var Pa = function getShowNativeOverlaidScrollbars(r, e) {
    var a = e.V;
    var n = r("showNativeOverlaidScrollbars"), t = n[0], i = n[1];
    return [ t && a.x && a.y, i ];
  };
  var za = function overflowIsVisible(r) {
    return r.indexOf(K) === 0;
  };
  var Ma = function overflowBehaviorToOverflowStyle(r) {
    return r.replace(K + "-", "");
  };
  var ka = function overflowCssValueToOverflowStyle(r, e) {
    if (r === "auto") {
      return e ? er : rr;
    }
    var a = r || rr;
    return [ rr, er, K ].includes(a) ? a : rr;
  };
  var Ia = function getElementOverflowStyle(r, e) {
    var a = getStyles(r, [ G, Q ]), n = a.overflowX, t = a.overflowY;
    return {
      x: ka(n, e.x),
      y: ka(t, e.y)
    };
  };
  var La = function createViewportOverflowStyleClassName(r, e) {
    var a = e ? Ge : Qe;
    return "" + a + ar(r);
  };
  var Va = "__osScrollbarsHidingPlugin";
  var Ra = /* @__PURE__ */ function(r) {
    return r = {}, r[Va] = {
      static: function _static() {
        return {
          R: function _viewportArrangement(r, e, a, n, t) {
            var i = r.F, v = r.N;
            var o = n.j, u = n.V, c = n.q;
            var f = !i && !o && (u.x || u.y);
            var l = Pa(t, n), s = l[0];
            var d = function _getViewportOverflowHideOffset(r) {
              var e = o || s ? 0 : 42;
              var a = function getHideOffsetPerAxis(r, a, n) {
                var t = r ? e : n;
                var i = a && !o ? t : 0;
                var v = r && !!e;
                return [ i, v ];
              };
              var n = a(u.x, r.x === er, c.x), t = n[0], i = n[1];
              var v = a(u.y, r.y === er, c.y), f = v[0], l = v[1];
              return {
                U: {
                  x: t,
                  y: f
                },
                B: {
                  x: i,
                  y: l
                }
              };
            };
            var p = function _hideNativeScrollbars(r) {
              if (!i) {
                var n;
                var t = a.Y;
                var v = dr({}, (n = {}, n[X] = 0, n[Z] = 0, n[W] = 0, n));
                var o = d(r), u = o.U, c = o.B;
                var l = c.x, s = c.y;
                var p = u.x, _ = u.y;
                var g = e.W;
                var h = t ? W : X;
                var b = t ? B : U;
                var m = g[h];
                var S = g[Z];
                var y = g[b];
                var w = g[Y];
                v[$] = "calc(100% + " + (_ + m * -1) + "px)";
                v[h] = -_ + m;
                v[Z] = -p + S;
                if (f) {
                  v[b] = y + (s ? _ : 0);
                  v[Y] = w + (l ? p : 0);
                }
                return v;
              }
            };
            var _ = function _arrangeViewport(r, n, t) {
              if (f) {
                var i = e.W;
                var o = d(r), u = o.U, c = o.B;
                var l = c.x, s = c.y;
                var p = u.x, _ = u.y;
                var g = a.Y;
                var h = g ? U : B;
                var b = i[h];
                var m = i.paddingTop;
                var S = n.w + t.w;
                var y = n.h + t.h;
                var w = {
                  w: _ && s ? _ + S - b + "px" : "",
                  h: p && l ? p + y - m + "px" : ""
                };
                setStyles(v, {
                  "--os-vaw": w.w,
                  "--os-vah": w.h
                });
              }
              return f;
            };
            var g = function _undoViewportArrange() {
              if (f) {
                var r = e.X, a = e.W;
                var n = Ia(v, r);
                var t = d(n), i = t.B;
                var o = i.x, u = i.y;
                var c = {};
                var l = function assignProps(r) {
                  return each(r, (function(r) {
                    c[r] = a[r];
                  }));
                };
                if (o) {
                  l([ Z, q, Y ]);
                }
                if (u) {
                  l([ W, X, B, U ]);
                }
                var s = getStyles(v, sr(c));
                var _ = Cr(v, Ze, $e);
                setStyles(v, c);
                return function() {
                  setStyles(v, dr({}, s, p(n)));
                  _();
                };
              }
              return gr;
            };
            return {
              Z: _,
              G: g,
              $: p
            };
          }
        };
      }
    }, r;
  }();
  var Fa = "__osClickScrollPlugin";
  var Na = /* @__PURE__ */ function(r) {
    return r = {}, r[Fa] = {
      static: function _static() {
        return function(r, e, a, n, t, i, v, o) {
          var u = false;
          var c = gr;
          var f = {
            clickScrollDistance: t,
            clickScrollDuration: 200,
            clickPressDelay: 150,
            pressDistanceDuration: 90
          };
          var l = function easeOutQuad(r) {
            return 1 - (1 - r) * (1 - r);
          };
          var s = function easeInOutQuad(r) {
            return r < .5 ? 2 * r * r : 1 - Math.pow(-2 * r + 2, 2) / 2;
          };
          var d = dr({}, f, x(i) ? i(v) : f), p = d.clickScrollDistance, _ = d.clickScrollDuration, g = d.clickPressDelay, h = d.pressDistanceDuration;
          var b = p === 0;
          var m = h * 2.3;
          var S = h * 2.5;
          var y = p ? t / p : 0;
          var w = ur(Math.max(22, g)), O = w[0], C = w[1];
          var E = a();
          var A = Math.sign(n);
          var T = M(0, b ? n : p * A, _, (function(t, i, v) {
            if (b) {
              e(t);
            } else {
              r(t);
            }
            if (v) {
              o(u);
              O((function() {
                if (u || b || !h) {
                  return;
                }
                var r = a();
                var t = r - E;
                var i = t * y;
                var v = n - t;
                var o = i ? v / i : 0;
                var f = o <= 2.2;
                var d = Math.max(1, o || 0);
                var p = (!o || o > .5) && Math.sign(v) === A;
                if (p) {
                  c = M(t, f ? n : n - i, f ? m * d : h * d, (function(r, a, t) {
                    e(r);
                    if (t && !f) {
                      c = M(r, n, S, e, l);
                    }
                  }), f && s);
                }
              }));
            }
          }), s);
          return function(r) {
            u = true;
            if (r) {
              T();
            }
            C();
            c();
          };
        };
      }
    }, r;
  }();
  var ja = function opsStringify(r) {
    return JSON.stringify(r, (function(r, e) {
      if (x(e)) {
        throw 0;
      }
      return e;
    }));
  };
  var qa = function getPropByPath(r, e) {
    return r ? ("" + e).split(".").reduce((function(r, e) {
      return r && lr(r, e) ? r[e] : void 0;
    }), r) : void 0;
  };
  var Ua = [ 0, 33 ];
  var Ba = [ 33, 99 ];
  var Ya = [ 222, 666, true ];
  var Wa = {
    paddingAbsolute: false,
    showNativeOverlaidScrollbars: false,
    update: {
      elementEvents: [ [ "img", "load" ] ],
      debounce: {
        mutation: Ua,
        resize: null,
        event: Ba,
        env: Ya
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
  var Xa = function getOptionsDiff(r, e) {
    var a = {};
    var n = I(sr(e), sr(r));
    each(n, (function(n) {
      var t = r[n];
      var i = e[n];
      if (A(t) && A(i)) {
        dr(a[n] = {}, Xa(t, i));
        if (_r(a[n])) {
          delete a[n];
        }
      } else if (lr(e, n) && i !== t) {
        var v = true;
        if (E(t) || E(i)) {
          try {
            if (ja(t) === ja(i)) {
              v = false;
            }
          } catch (o) {}
        }
        if (v) {
          a[n] = i;
        }
      }
    }));
    return a;
  };
  var Za = function createOptionCheck(r, e, a) {
    return function(n) {
      return [ qa(r, n), a || qa(e, n) !== void 0 ];
    };
  };
  var Ga;
  var Qa = function getNonce() {
    return Ga;
  };
  var $a = function setNonce(r) {
    Ga = r;
  };
  var Ja;
  var Ka = function createEnvironment() {
    var r = function getNativeScrollbarSize(r, e, a) {
      jr(document.body, r);
      jr(document.body, r);
      var n = ie(r);
      var t = te(r);
      var i = oe(e);
      if (a) {
        Nr(r);
      }
      return {
        x: t.h - n.h + i.h,
        y: t.w - n.w + i.w
      };
    };
    var a = function getNativeScrollbarsHiding(r) {
      var e = false;
      var a = Hr(r, qe);
      try {
        e = getStyles(r, "scrollbar-width") === "none" || getStyles(r, "display", "::-webkit-scrollbar") === "none";
      } catch (n) {}
      a();
      return e;
    };
    var t = function getFocusableScrollers(r) {
      var e = function getActiveElement() {
        return r.ownerDocument.activeElement;
      };
      var a = e();
      var n = he([ r, a ]);
      setStyles(r, {
        visibility: "visible"
      });
      Ce(r);
      var t = e() === r;
      setStyles(r, {
        visibility: ""
      });
      r.blur();
      if (H(a)) {
        a.focus();
      }
      n();
      return t;
    };
    var i = "." + je + "{scroll-behavior:auto!important;position:fixed;opacity:0;visibility:hidden;overflow:scroll;height:200px;width:200px;z-index:-1}." + je + " div{width:200%;height:200%;margin:10px 0}." + qe + "{scrollbar-width:none!important}@supports not (scrollbar-width:none){." + qe + "::-webkit-scrollbar,." + qe + "::-webkit-scrollbar-corner{appearance:none!important;display:none!important;width:0!important;height:0!important}}";
    var v = Wr('<div class="' + je + '"><div></div><style>' + i + "</style></div>");
    var o = v[0];
    var u = o.firstChild;
    var c = o.lastChild;
    var f = Qa();
    if (f) {
      c.nonce = f;
    }
    var l = Ee(), s = l[0], d = l[2];
    var p = e({
      i: r(o, u),
      v: ir
    }, or(r, o, u, true)), _ = p[0], g = p[1];
    var h = g(), m = h[0];
    var S = a(o);
    var y = t(o);
    var w = {
      x: m.x === 0,
      y: m.y === 0
    };
    var O = {
      elements: {
        host: null,
        padding: !S,
        viewport: function viewport(r) {
          return S && kr(r) && r;
        },
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
    var C = dr({}, Wa);
    var E = or(dr, {}, C);
    var A = or(dr, {}, O);
    var T = {
      q: m,
      V: w,
      j: S,
      J: y,
      K: !!b,
      rr: or(s, "r"),
      er: A,
      ar: function _setDefaultInitialization(r) {
        return dr(O, r) && A();
      },
      nr: E,
      tr: function _setDefaultOptions(r) {
        return dr(C, r) && E();
      },
      ir: dr({}, O),
      vr: dr({}, C)
    };
    wr(o, "style");
    Nr(o);
    de(n, "resize", (function() {
      d("r", []);
    }));
    if (x(n.matchMedia) && !S && (!w.x || !w.y)) {
      var D = function addZoomListener(r) {
        var e = n.matchMedia("(resolution: " + n.devicePixelRatio + "dppx)");
        de(e, "change", (function() {
          r();
          D(r);
        }), {
          M: true
        });
      };
      D((function() {
        var r = _(), e = r[0], a = r[1];
        dr(T.q, e);
        d("r", [ a ]);
      }));
    }
    return T;
  };
  var rn = function getEnvironment() {
    if (!Ja) {
      Ja = Ka();
    }
    return Ja;
  };
  var en = function createElementRef(r) {
    return h ? new h(r) : {
      deref: function deref() {
        return r;
      }
    };
  };
  var an = function addEventContentChangeListener(r, e, a) {
    return de(r, e, (function(r) {
      return a(r);
    }));
  };
  var nn = function createEventContentChange(r, e, a) {
    var n = new WeakMap;
    var t = new Set;
    var i = function removeElementListeners(r) {
      var e = n.get(r);
      if (e) {
        n.delete(r);
        t.delete(e[0]);
        j(Object.values(e[1]));
      }
    };
    var v = function destroy() {
      t.forEach((function(r) {
        var e = r.deref();
        if (e) {
          i(e);
        }
      }));
      t.clear();
    };
    var o = function updateElements(v) {
      if (a) {
        t.forEach((function(r) {
          if (!r.deref()) {
            t.delete(r);
          }
        }));
        each(a, (function(a) {
          var o = a || [], u = o[0], c = o[1];
          var f = c && u ? (v || Pr)(u, r) : [];
          each(f, (function(a) {
            if (!r.contains(a)) {
              i(a);
              return;
            }
            var v = n.get(a);
            if (!v) {
              v = [ en(a), Object.create(null) ];
              n.set(a, v);
              t.add(v[0]);
            }
            var o = v[1];
            if (!o[c]) {
              o[c] = an(a, c, e);
            }
          }));
        }));
      }
    };
    o();
    return [ v, o ];
  };
  var tn = function createDOMObserver(r, e, a, n) {
    var t = false;
    var i = n || {}, v = i.ur, o = i.cr, u = i.lr, c = i.sr, f = i.dr, l = i.pr;
    var s = nn(r, (function() {
      return t && a(true);
    }), u), d = s[0], _ = s[1];
    var g = v || [];
    var h = o || [];
    var b = I(g, h);
    var m = function observerCallback(t, i) {
      if (!F(i)) {
        var v = f || gr;
        var o = l || gr;
        var u = [];
        var s = [];
        var d = false;
        var p = false;
        each(i, (function(a) {
          var t = a.attributeName, i = a.target, f = a.type, l = a.oldValue, _ = a.addedNodes, g = a.removedNodes;
          var b = f === "attributes";
          var m = f === "childList";
          var S = r === i;
          var y = b && t;
          var w = y && mr(i, t || "");
          var C = O(w) ? w : null;
          var x = y && l !== C;
          var E = k(h, t) && x;
          if (e && (m || !S)) {
            var A = b && x;
            var T = A && c && Mr(i, c);
            var D = T ? !v(i, t, l, C) : !b || A;
            var H = D && !o(a, !!T, r, n);
            each(_, (function(r) {
              return L(u, r);
            }));
            each(g, (function(r) {
              return L(u, r);
            }));
            p = p || H;
          }
          if (!e && S && x && !v(i, t, l, C)) {
            L(s, t);
            d = d || E;
          }
        }));
        _((function(r) {
          return N(u).reduce((function(e, a) {
            L(e, Pr(r, a));
            return Mr(a, r) ? L(e, a) : e;
          }), []);
        }));
        if (e) {
          if (!t && p) {
            a(false);
          }
          return [ false ];
        }
        if (!F(s) || d) {
          var g = [ N(s), d ];
          if (!t) {
            a.apply(0, g);
          }
          return g;
        }
      }
    };
    var S = new p(or(m, false));
    return [ function() {
      S.observe(r, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: b,
        subtree: e,
        childList: e,
        characterData: e
      });
      t = true;
      return function() {
        if (t) {
          d();
          S.disconnect();
          t = false;
        }
      };
    }, function() {
      if (t) {
        return m(true, S.takeRecords());
      }
    } ];
  };
  var vn = null;
  var on = function createSizeObserver(r, a, n) {
    var t = n || {}, i = t._r;
    var v = ze(Da);
    var o = e({
      i: false,
      o: true
    }), u = o[0];
    return function() {
      var e = [];
      var n = Wr('<div class="' + va + '"><div class="' + ua + '"></div></div>');
      var t = n[0];
      var o = t.firstChild;
      var c = function onSizeChangedCallbackProxy(r) {
        var e = E(r) && !F(r);
        var n = false;
        var t = false;
        if (e) {
          var i = r[0];
          var v = u(i.contentRect), o = v[0], c = v[2];
          var f = fe(o);
          t = le(o, c);
          n = !t && !f;
        } else {
          t = r === true;
        }
        if (!n) {
          a({
            gr: true,
            _r: t
          });
        }
      };
      if (g) {
        if (!C(vn)) {
          var f = new g(gr);
          f.observe(r, {
            get box() {
              vn = true;
            }
          });
          vn = vn || false;
          f.disconnect();
        }
        var l = fr(c, {
          p: 0,
          _: 0
        });
        var s = function resizeObserverCallback(r) {
          return l(r);
        };
        var d = new g(s);
        d.observe(vn ? r : o);
        L(e, [ function() {
          d.disconnect();
          l.C();
        }, !vn && jr(r, t) ]);
        if (vn) {
          var p = new g(s);
          p.observe(r, {
            box: "border-box"
          });
          L(e, (function() {
            return p.disconnect();
          }));
        }
      } else if (v) {
        var _ = v(o, c, i), h = _[0], b = _[1];
        L(e, I([ Hr(t, oa), de(t, "animationstart", h), jr(r, t) ], b));
      } else {
        return gr;
      }
      return or(j, e);
    };
  };
  var un = function createTrinsicObserver(r, a) {
    var n;
    var t = function isHeightIntrinsic(r) {
      return r.h === 0 || r.isIntersecting || r.intersectionRatio > 0;
    };
    var i = Yr(sa);
    var v = e({
      i: false
    }), o = v[0];
    var u = function triggerOnTrinsicChangedCallback(r, e) {
      if (r) {
        var n = o(t(r));
        var i = n[1];
        return i && !e && a(n) && [ n ];
      }
    };
    var c = function intersectionObserverCallback(r, e) {
      return u(e.pop(), r);
    };
    return [ function() {
      var e = [];
      if (_) {
        n = new _(or(c, false), {
          root: r
        });
        n.observe(i);
        L(e, (function() {
          n.disconnect();
        }));
      } else {
        var a = function onSizeChanged() {
          var r = te(i);
          u(r);
        };
        L(e, on(i, a)());
        a();
      }
      return or(j, L(e, jr(r, i)));
    }, function() {
      return n && c(true, n.takeRecords());
    } ];
  };
  var cn = function createObserversSetup(r, a, n, t) {
    var i;
    var v;
    var o;
    var u;
    var c;
    var f;
    var l;
    var s;
    var d = "[" + We + "]";
    var p = "[" + Ze + "]";
    var _ = [ "id", "class", "style", "open", "wrap", "cols", "rows" ];
    var h = r.hr, b = r.br, m = r.N, S = r.mr, y = r.Sr, O = r.F, C = r.yr, A = r.wr, T = r.Or, H = r.Cr;
    var P = function getDirectionIsRTL(r) {
      return getStyles(r, "direction") === "rtl";
    };
    var z = function createDebouncedObservesUpdate() {
      var r;
      var e;
      var a;
      var n = fr(t, {
        p: function _debounceTiming() {
          return r;
        },
        _: function _maxDebounceTiming() {
          return e;
        },
        m: function _leading() {
          return a;
        },
        S: function _mergeParams(r, e) {
          var a = r[0];
          var n = e[0];
          return [ I(sr(a), sr(n)).reduce((function(r, e) {
            r[e] = a[e] || n[e];
            return r;
          }), {}) ];
        }
      });
      var i = function fn(t, i) {
        if (E(i)) {
          var v = i[0], o = i[1], u = i[2];
          r = v;
          e = o;
          a = u;
        } else if (w(i)) {
          r = i;
          e = false;
          a = false;
        } else {
          r = false;
          e = false;
          a = false;
        }
        n(t);
      };
      i.O = n.O;
      i.C = n.C;
      return i;
    };
    var M = {
      Er: false,
      Y: P(h)
    };
    var k = rn();
    var L = ze(Va);
    var V = e({
      v: tr,
      i: {
        w: 0,
        h: 0
      }
    }, (function() {
      var e = L && L.R(r, a, M, k, n).G;
      var t = C && O;
      var i = !t && Ar(b, We, Be);
      var v = !O && A($e);
      var o = v && me(S);
      var u = o && H();
      var c = T(Je, i);
      var f = v && e && e();
      var l = ve(m);
      var s = oe(m);
      if (f) {
        f();
      }
      be(S, o);
      if (u) {
        u();
      }
      if (i) {
        c();
      }
      return {
        w: l.w + s.w,
        h: l.h + s.h
      };
    })), R = V[0];
    var F = z();
    var N = function setDirection(r) {
      var e = P(h);
      dr(r, {
        Ar: s !== e
      });
      dr(M, {
        Y: e
      });
      s = e;
    };
    var j = function onTrinsicChanged(r, e) {
      var a = r[0], n = r[1];
      var i = {
        Tr: n
      };
      dr(M, {
        Er: a
      });
      if (!e) {
        t(i);
      }
      return i;
    };
    var q = function onSizeChanged(r) {
      var e = r.gr, a = r._r;
      var n = a ? t : F;
      var i = {
        gr: e || a,
        _r: a
      };
      N(i);
      n(i, v);
    };
    var U = function onContentMutation(r, e) {
      var a = R(), n = a[1];
      var t = {
        Dr: n
      };
      N(t);
      if (n && !e) {
        F(t, r ? o : i);
      }
      return t;
    };
    var B = function onHostMutation(r, e, a) {
      var n = {
        Hr: e
      };
      N(n);
      if (e && !a) {
        F(n, i);
      }
      return n;
    };
    var Y = y ? un(b, j) : [], W = Y[0], X = Y[1];
    var Z = !O && on(b, q, {
      _r: true
    });
    var G = tn(b, false, B, {
      cr: _,
      ur: _
    }), Q = G[0], $ = G[1];
    var J = O && g && new g((function(r) {
      var e = r[r.length - 1].contentRect;
      q({
        gr: true,
        _r: le(e, l)
      });
      l = e;
    }));
    return [ function() {
      if (J) {
        J.observe(b);
      }
      var r = Z && Z();
      var e = W && W();
      var a = Q();
      var n = k.rr((function(r) {
        var e = R(), a = e[1];
        F({
          Pr: r,
          Dr: a,
          gr: C
        }, u);
      }));
      return function() {
        if (J) {
          J.disconnect();
        }
        if (r) {
          r();
        }
        if (e) {
          e();
        }
        if (f) {
          f();
        }
        a();
        n();
        F.C();
      };
    }, function(r) {
      var e = r.zr, a = r.Mr, n = r.kr;
      var t = {};
      var l = e("update.ignoreMutation"), s = l[0];
      var g = e("update.attributes"), h = g[0], b = g[1];
      var S = e("update.elementEvents"), C = S[0], A = S[1];
      var T = e("update.debounce"), H = T[0], P = T[1];
      var z = A || b;
      var M = a || n;
      var k = function ignoreMutationFromOptions(r) {
        return x(s) && !!s(r);
      };
      if (z) {
        if (c) {
          c();
        }
        if (f) {
          f();
        }
        var L = tn(y || m, true, U, {
          ur: I(_, h || []),
          lr: C,
          sr: d,
          pr: function _ignoreContentChange(r, e) {
            var a = r.target, n = r.attributeName;
            var t = !e && n && !O ? Fr(a, d, p) : false;
            return t || !!Vr(a, "." + pa) || k(r);
          }
        }), V = L[0], R = L[1];
        f = V();
        c = R;
      }
      if (P) {
        F.O();
        if (E(H) || w(H)) {
          i = H;
          v = false;
          o = Ba;
          u = Ya;
        } else if (D(H)) {
          i = H.mutation;
          v = H.resize;
          o = H.event;
          u = H.env;
        } else {
          i = false;
          v = false;
          o = false;
          u = false;
        }
      }
      if (M) {
        var q = $();
        var Y = X && X();
        var W = c && c();
        if (q) {
          dr(t, B(q[0], q[1], M));
        }
        if (Y) {
          dr(t, j(Y[0], M));
        }
        if (W) {
          dr(t, U(W[0], M));
        }
      }
      N(t);
      return t;
    }, M ];
  };
  var ln = function resolveInitialization(r, e) {
    return x(e) ? e.apply(0, r) : e;
  };
  var sn = function staticInitializationElement(r, e, a, n) {
    var t = m(n) ? a : n;
    var i = ln(r, t);
    return i || e.apply(0, r);
  };
  var dn = function dynamicInitializationElement(r, e, a, n) {
    var t = m(n) ? a : n;
    var i = ln(r, t);
    return !!i && (H(i) ? i : e.apply(0, r));
  };
  var pn = function cancelInitialization(r, e) {
    var a = e || {}, n = a.nativeScrollbarsOverlaid, t = a.body;
    var i = rn(), v = i.V, o = i.j, u = i.er;
    var c = u().cancel, f = c.nativeScrollbarsOverlaid, l = c.body;
    var s = n != null ? n : f;
    var d = m(t) ? l : t;
    var p = (v.x || v.y) && s;
    var _ = r && (S(d) ? !o : d);
    return !!p || !!_;
  };
  var _n = function createScrollbarsSetupElements(r, e, a, n) {
    var t = "--os-viewport-percent";
    var i = "--os-scroll-percent";
    var v = "--os-scroll-direction";
    var o = rn(), u = o.er;
    var c = u(), f = c.scrollbars;
    var l = f.slot;
    var s = e.hr, d = e.br, p = e.N, _ = e.Ir, g = e.mr, h = e.yr, m = e.F;
    var S = _ ? {} : r, y = S.scrollbars;
    var w = y || {}, O = w.slot;
    var x = [];
    var E = [];
    var A = [];
    var T = dn([ s, d, p ], (function() {
      return m && h ? s : d;
    }), l, O);
    var D = function initScrollTimeline(r) {
      if (b) {
        var e = null;
        var n = [];
        var t = new b({
          source: g,
          axis: r
        });
        var i = function cancelAnimation() {
          if (e) {
            e.cancel();
          }
          e = null;
        };
        var v = function _setScrollPercentAnimation(v) {
          var o = a.Lr;
          var u = we(o)[r];
          var c = r === "x";
          var f = [ Kr(0, c), Kr("calc(-100% + 100cq" + (c ? "w" : "h") + ")", c) ];
          var l = u ? f : f.reverse();
          if (n[0] === l[0] && n[1] === l[1]) {
            return i;
          }
          n = l;
          i();
          e = v.Vr.animate({
            transform: l
          }, {
            timeline: t,
            fill: "both"
          });
          return i;
        };
        return {
          Rr: v
        };
      }
    };
    var H = {
      x: D("x"),
      y: D("y")
    };
    var P = function getViewportPercent() {
      var r = a.Fr, e = a.Nr;
      var n = function getAxisValue(r, e) {
        return hr(0, 1, r / (r + e) || 0);
      };
      return {
        x: n(e.x, r.x),
        y: n(e.y, r.y)
      };
    };
    var z = function scrollbarStructureAddRemoveClass(r, e, a) {
      var n = a ? Hr : Dr;
      each(r, (function(r) {
        n(r.jr, e);
      }));
    };
    var M = function scrollbarStyle(r, e) {
      each(r, (function(r) {
        var a = e(r), n = a[0], t = a[1];
        setStyles(n, t);
      }));
    };
    var k = function scrollbarsAddRemoveClass(r, e, a) {
      var n = C(a);
      var t = n ? a : true;
      var i = n ? !a : true;
      if (t) {
        z(E, r, e);
      }
      if (i) {
        z(A, r, e);
      }
    };
    var I = function refreshScrollbarsHandleLength() {
      var r = P();
      var e = function createScrollbarStyleFn(r) {
        return function(e) {
          var a;
          return [ e.jr, (a = {}, a[t] = Qr(r) + "", a) ];
        };
      };
      M(E, e(r.x));
      M(A, e(r.y));
    };
    var V = function refreshScrollbarsHandleOffset() {
      if (!b) {
        var r = a.Lr;
        var e = Oe(r, me(g));
        var n = function createScrollbarStyleFn(r) {
          return function(e) {
            var a;
            return [ e.jr, (a = {}, a[i] = Qr(r) + "", a) ];
          };
        };
        M(E, n(e.x));
        M(A, n(e.y));
      }
    };
    var R = function refreshScrollbarsScrollCoordinates() {
      var r = a.Lr;
      var e = we(r);
      var n = function createScrollbarStyleFn(r) {
        return function(e) {
          var a;
          return [ e.jr, (a = {}, a[v] = r ? "0" : "1", a) ];
        };
      };
      M(E, n(e.x));
      M(A, n(e.y));
      if (b) {
        E.forEach(H.x.Rr);
        A.forEach(H.y.Rr);
      }
    };
    var F = function refreshScrollbarsScrollbarOffset() {
      if (m && !h) {
        var r = a.Fr, e = a.Lr;
        var n = we(e);
        var t = Oe(e, me(g));
        var i = function styleScrollbarPosition(e) {
          var a = e.jr;
          var i = Lr(a) === p && a;
          var v = function getTranslateValue(r, e, a) {
            var n = e * r;
            return $r(a ? n : -n);
          };
          return [ i, i && {
            transform: Kr({
              x: v(t.x, r.x, n.x),
              y: v(t.y, r.y, n.y)
            })
          } ];
        };
        M(E, i);
        M(A, i);
      }
    };
    var N = function generateScrollbarDOM(r) {
      var e = r ? "x" : "y";
      var a = r ? ga : ha;
      var t = Yr(pa + " " + a);
      var i = Yr(ba);
      var v = Yr(ma);
      var o = {
        jr: t,
        qr: i,
        Vr: v
      };
      var u = H[e];
      L(r ? E : A, o);
      L(x, [ jr(t, i), jr(i, v), or(Nr, t), u && u.Rr(o), n(o, k, r) ]);
      return o;
    };
    var q = or(N, true);
    var U = or(N, false);
    var B = function appendElements() {
      jr(T, E[0].jr);
      jr(T, A[0].jr);
      return or(j, x);
    };
    q();
    U();
    return [ {
      Ur: I,
      Br: V,
      Yr: R,
      Wr: F,
      Xr: k,
      Zr: {
        Gr: E,
        Qr: q,
        $r: or(M, E)
      },
      Jr: {
        Gr: A,
        Qr: U,
        $r: or(M, A)
      }
    }, B ];
  };
  var gn = function createScrollbarsSetupEvents(r, e, a, n, t) {
    return function(i, u, c) {
      var f = e.br, l = e.N, s = e.F, d = e.mr, p = e.Kr, _ = e.Cr;
      var g = i.jr, h = i.qr, b = i.Vr;
      var m = ur(333), S = m[0], y = m[1];
      var w = ur(444), O = w[0], C = w[1];
      var E = ur(150), A = E[0], T = E[1];
      var D = ur(25), H = D[0], P = D[1];
      var z = [];
      var M = function removeClickPrevention() {
        T();
        j(z);
      };
      var k = function scrollOffsetElementScrollBy(r) {
        if (x(d.scrollBy)) {
          d.scrollBy({
            behavior: "smooth",
            left: r.x,
            top: r.y
          });
        }
      };
      var I = function createInteractiveScrollEvents() {
        var e = "pointerup pointercancel lostpointercapture";
        var t = "client" + (c ? "X" : "Y");
        var i = c ? $ : J;
        var u = c ? "left" : "top";
        var f = c ? "w" : "h";
        var l = c ? "x" : "y";
        var s = [];
        var g = de(h, "pointerdown", n((function(n) {
          var g = Vr(n.target, "." + ma) === b;
          var m = g ? b : h;
          var S = r.scrollbars;
          var y = S[g ? "dragScroll" : "clickScroll"];
          var w = n.button, x = n.isPrimary, E = n.pointerType;
          var A = S.pointers;
          var T = w === 0 && x && y && (A || []).includes(E);
          if (T) {
            j(s);
            C();
            var D = !g && (n.shiftKey || y === "instant");
            var H = or(ue, b);
            var P = or(ue, h);
            var z = function getHandleOffset(r, e) {
              return (r || H())[u] - (e || P())[u];
            };
            var M = v(ue(d)[i]) / te(d)[f] || 1;
            var I = me(d)[l];
            var V = function scrollRelative(r) {
              var e;
              be(d, (e = {}, e[l] = I + r, e));
            };
            var R = function moveHandleRelative(r) {
              var e = a.Fr;
              var n = te(h)[f] - te(b)[f];
              var t = 1 / M * r / n;
              V(t * e[l]);
            };
            var F = n[t];
            var N = H();
            var q = P();
            var U = N[i];
            var B = z(N, q) + U / 2;
            var Y = F - q[u];
            var W = Y - B;
            var X = g ? 0 : W;
            var Z = function releasePointerCapture(r) {
              j(J);
              m.releasePointerCapture(r.pointerId);
            };
            var G = g || D;
            var Q = _();
            var $ = or(j, [ de(p, e, Z), de(p, "selectstart", (function(r) {
              return _e(r);
            }), {
              H: false
            }), de(h, e, Z), G && de(h, "pointermove", (function(r) {
              return R(X + r[t] - F);
            })) ]);
            var J = [ $, G && function() {
              var r = me(d);
              Q();
              var e = me(d);
              var a = {
                x: e.x - r.x,
                y: e.y - r.y
              };
              if (o(a.x) > 3 || o(a.y) > 3) {
                _();
                be(d, r);
                k(a);
                O(Q);
              }
            } ];
            L(s, $);
            m.setPointerCapture(n.pointerId);
            if (D) {
              R(W);
            } else if (!g) {
              var K = ze(Fa);
              if (K) {
                var rr = a.Nr;
                var er = K(V, R, or(z), W, rr[l], y, !!c, (function(r) {
                  if (r) {
                    Q();
                  } else {
                    L(J, Q);
                  }
                }));
                L(J, er);
                L(s, or(er, true));
              }
            }
          }
        })));
        return or(j, [ g, or(j, s) ]);
      };
      var V = true;
      return or(j, [ de(b, "pointermove pointerleave", n(t)), de(g, "pointerenter", n((function() {
        u(wa, true);
      }))), de(g, "pointerleave pointercancel", n((function() {
        u(wa, false);
      }))), de(g, "wheel", n((function(r) {
        var e = r.deltaX, a = r.deltaY, n = r.deltaMode;
        if (V && n === 0 && Lr(g) === f) {
          k({
            x: e,
            y: a
          });
        }
        V = false;
        u(Ea, true);
        S((function() {
          V = true;
          u(Ea);
        }));
        _e(r);
      })), {
        H: false,
        P: true
      }), !s && de(g, "mousedown", n((function() {
        var r = Rr();
        if (Sr(r, Ze) || Sr(r, We) || r === document.body) {
          H(or(Ce, l));
        }
      }))), de(g, "pointerdown", (function() {
        M();
        var r = de(p, "click", (function(r) {
          M();
          ge(r);
        }), {
          M: true,
          P: true,
          H: false
        });
        var e = de(p, "pointerup pointercancel", (function() {
          e();
          A(M);
        }), {
          P: true,
          H: true
        });
        L(z, [ r, e ]);
      }), {
        P: true,
        H: true
      }), M, I(), y, C, P ]);
    };
  };
  var hn = function createScrollbarsSetup(r, e, a, n, t, i, v) {
    var o;
    var u;
    var c;
    var f;
    var l;
    var s = gr;
    var d = 0;
    var p = [ "mouse", "pen" ];
    var _ = function skipEventIfSleeping(r) {
      return function(e) {
        if (!a.re) {
          r(e);
        }
      };
    };
    var g = function isHoverablePointerType(r) {
      return p.includes(r.pointerType);
    };
    var h = ur(), b = h[0], m = h[1];
    var S = ur(100), y = S[0], w = S[1];
    var O = ur(50), C = O[0], x = O[1];
    var E = ur((function() {
      return d;
    })), A = E[0], T = E[1];
    var D = _n(r, i, t, gn(e, i, t, _, (function(r) {
      return g(r) && U();
    }))), H = D[0], P = D[1];
    var z = i.br, M = i.ee, k = i.yr;
    var I = H.Xr, V = H.Ur, R = H.Br, F = H.Yr, N = H.Wr;
    var q = function manageScrollbarsAutoHide(r, e) {
      T();
      var n = function hide(r) {
        if (a.re) {
          return;
        }
        I(xa, r);
      };
      if (r) {
        n();
      } else {
        var t = c ? !o : true;
        if (d > 0 && !e) {
          A(or(n, t));
        } else {
          n(t);
        }
      }
    };
    var U = function manageScrollbarsAutoHideInstantInteraction() {
      if (c ? !o : !f) {
        q(true);
        y((function() {
          q(false);
        }));
      }
    };
    var B = function onHostMouseEnter(r) {
      if (g(r)) {
        o = true;
        if (!a.re && c) {
          q(true);
        }
      }
    };
    var Y = function onHostMouseLeave(r) {
      if (g(r)) {
        o = false;
        if (!a.re && c) {
          q(false);
        }
      }
    };
    var W = function manageAutoHideSuspension(r) {
      I(Ca, r, true);
      I(Ca, r, false);
    };
    var X = [ T, w, x, m, function() {
      return s();
    }, de(z, "pointerover", B, {
      M: true
    }), de(z, "pointerenter", B), de(z, "pointerleave", Y), de(z, "pointermove", _((function(r) {
      if (g(r) && u) {
        U();
      }
    }))), de(M, "scroll", _((function(r) {
      b((function() {
        R();
        U();
      }));
      v(r);
      N();
    }))) ];
    var Z = ze(Va);
    return [ function() {
      return or(j, L(X, P()));
    }, function(r) {
      var e = r.zr, a = r.kr, i = r.ae, v = r.ne;
      var o = v || {}, p = o.te, g = o.ie, h = o.ve, b = o.oe;
      var m = i || {}, S = m.Ar, y = m._r;
      var w = n.Y;
      var O = rn(), x = O.V, E = O.j;
      var A = t.ue, T = t.X;
      var D = e("showNativeOverlaidScrollbars"), H = D[0], P = D[1];
      var z = e("scrollbars.theme"), L = z[0], j = z[1];
      var U = e("scrollbars.visibility"), B = U[0], Y = U[1];
      var X = e("scrollbars.autoHide"), G = X[0], Q = X[1];
      var $ = e("scrollbars.autoHideSuspend"), J = $[0], rr = $[1];
      var ar = e("scrollbars.autoHideDelay"), nr = ar[0];
      var tr = e("scrollbars.dragScroll"), ir = tr[0], vr = tr[1];
      var ur = e("scrollbars.clickScroll"), cr = ur[0], fr = ur[1];
      var lr = e("overflow"), sr = lr[0], dr = lr[1];
      var pr = y && !a;
      var _r = p || g || b || S || a;
      var gr = h || Y || dr;
      var hr = H && x.x && x.y;
      var br = !E && !Z;
      var mr = hr || br;
      var Sr = function setScrollbarVisibility(r, e, a) {
        var n = r.includes(er) && (B === K || B === "auto" && e === er);
        I(Sa, n, a);
        return n;
      };
      d = nr;
      if (P || br) {
        I(da, mr);
      }
      if (j) {
        I(l);
        I(L, true);
        l = L;
      }
      if (rr || pr) {
        W(!J);
        if (pr && J) {
          if (T.x || T.y) {
            s();
            C((function() {
              s = de(M, er, _(or(W, true)), {
                M: true
              });
            }));
          } else {
            W(true);
          }
        }
      }
      if (Q) {
        u = G === "move";
        c = G === "leave";
        f = G === "never";
        q(f, true);
      }
      if (vr) {
        I(Ta, ir);
      }
      if (fr) {
        I(Aa, !!cr);
      }
      if (gr) {
        var yr = Sr(sr.x, A.x, true);
        var wr = Sr(sr.y, A.y, false);
        var Or = yr && wr;
        I(ya, !Or);
      }
      if (_r) {
        R();
        V();
        N();
        if (b) {
          F();
        }
        I(Oa, !T.x, true);
        I(Oa, !T.y, false);
        I(_a, w && !k);
      }
    }, {}, H ];
  };
  var bn = function createStructureSetupElements(r) {
    var e = rn();
    var a = e.er, t = e.J, i = e.j;
    var v = a(), o = v.elements;
    var u = o.padding, c = o.viewport, f = o.content;
    var l = H(r);
    var s = l ? {} : r;
    var d = s.elements;
    var p = d || {}, _ = p.padding, g = p.viewport, h = p.content;
    var b = l ? r : s.target;
    var m = kr(b);
    var S = b.ownerDocument;
    var y = S.documentElement;
    var w = function getDocumentWindow() {
      return S.defaultView || n;
    };
    var O = or(sn, [ b ]);
    var C = or(dn, [ b ]);
    var x = or(Yr, "");
    var E = or(O, x, c);
    var A = or(C, x, f);
    var T = function elementHasOverflow(r) {
      var e = te(r);
      var a = ve(r);
      var n = getStyles(r, G);
      var t = getStyles(r, Q);
      return a.w - e.w > 0 && !za(n) || a.h - e.h > 0 && !za(t);
    };
    var D = E(g);
    var P = D === b;
    var z = P && m;
    var M = !P && A(h);
    var V = !P && D === M;
    var R = z ? y : D;
    var F = z ? R : b;
    var N = !P && C(x, u, _);
    var q = !V && M;
    var U = [ q, R, N, F ].map((function(r) {
      return H(r) && !Lr(r) && r;
    }));
    var B = function elementIsGenerated(r) {
      return r && k(U, r);
    };
    var Y = !B(R) && T(R) ? R : b;
    var W = z ? y : R;
    var X = z ? S : R;
    var Z = {
      hr: b,
      br: F,
      N: R,
      ce: N,
      Sr: q,
      mr: W,
      ee: X,
      fe: m ? y : Y,
      Kr: S,
      yr: m,
      Ir: l,
      F: P,
      le: w,
      wr: function _viewportHasClass(r) {
        return Ar(R, Ze, r);
      },
      Or: function _viewportAddRemoveClass(r, e) {
        return Er(R, Ze, r, e);
      },
      Cr: function _removeScrollObscuringStyles() {
        return Er(W, Ze, Ke, true);
      }
    };
    var $ = Z.hr, J = Z.br, K = Z.ce, rr = Z.N, er = Z.Sr;
    var ar = [ er, rr, K, J, $ ];
    var nr = [ function() {
      wr(J, [ We, Ue ]);
      wr($, Ue);
      if (m) {
        wr(y, [ Ue, We ]);
      }
    } ];
    var tr = Ir(ar.find((function(r) {
      return r && !B(r);
    })));
    var ir = z ? $ : er || rr;
    var vr = or(j, nr);
    var ur = function appendElements() {
      var r = w();
      var e = Rr();
      var a = function unwrap(r) {
        jr(Lr(r), Ir(r));
        Nr(r);
      };
      var n = "tabindex";
      var v = mr(rr, n);
      var o = he(I(ar, [ e ]));
      yr(J, We, P ? "" : Xe);
      yr(K, ta, "");
      yr(rr, Ze, "");
      yr(er, ia, "");
      if (!P) {
        if (v || !t) {
          yr(rr, n, v || "-1");
        }
        if (m) {
          yr(y, Ye, "");
        }
      }
      jr(ir, tr);
      jr(J, K);
      jr(K || J, !P && rr);
      jr(rr, er);
      L(nr, [ o, function() {
        var r = Rr();
        var e = B(rr);
        var t = e && r === rr ? $ : r;
        var i = he(I(ar, [ t ]));
        wr(K, ta);
        wr(er, ia);
        wr(rr, Ze);
        if (m) {
          wr(y, Ye);
        }
        if (v) {
          yr(rr, n, v);
        } else {
          wr(rr, n);
        }
        if (B(er)) {
          a(er);
        }
        if (e) {
          a(rr);
        }
        if (B(K)) {
          a(K);
        }
        Ce(t);
        i();
      } ]);
      if (i && !P) {
        xr(rr, Ze, ra);
        L(nr, or(wr, rr, Ze));
      }
      Ce(!P && m && e === $ && r.top === r ? rr : e);
      o();
      tr = 0;
      return vr;
    };
    return [ Z, ur, vr ];
  };
  var mn = function createTrinsicUpdateSegment(r) {
    var e = r.Sr;
    return function(r) {
      var a = r.ae, n = r.se, t = r.kr;
      var i = a || {}, v = i.Tr;
      var o = n.Er;
      var u = e && (v || t);
      if (u) {
        var c;
        setStyles(e, (c = {}, c[J] = o && "100%", c));
      }
    };
  };
  var Sn = function createPaddingUpdateSegment(r, a) {
    var n = r.br, t = r.ce, i = r.N, v = r.F;
    var o = e({
      v: vr,
      i: Jr()
    }, or(Jr, n, "padding", "")), u = o[0], c = o[1];
    return function(r) {
      var e = r.zr, n = r.ae, o = r.se, f = r.kr;
      var l = c(f), s = l[0], d = l[1];
      var p = rn(), _ = p.j;
      var g = n || {}, h = g.gr, b = g.Dr, m = g.Ar;
      var S = o.Y;
      var y = e("paddingAbsolute"), w = y[0], O = y[1];
      var C = f || b;
      if (h || d || C) {
        var x = u(f);
        s = x[0];
        d = x[1];
      }
      var E = !v && (O || m || d);
      if (E) {
        var A, T;
        var D = !w || !t && !_;
        var H = s.r + s.l;
        var P = s.t + s.b;
        var z = (A = {}, A[X] = D && !S ? -H : 0, A[Z] = D ? -P : 0, A[W] = D && S ? -H : 0, 
        A.top = D ? -s.t : 0, A.right = D ? S ? -s.r : "auto" : 0, A.left = D ? S ? "auto" : -s.l : 0, 
        A[$] = D && "calc(100% + " + H + "px)", A);
        var M = (T = {}, T[q] = D ? s.t : 0, T[U] = D ? s.r : 0, T[Y] = D ? s.b : 0, T[B] = D ? s.l : 0, 
        T);
        setStyles(t || i, z);
        setStyles(i, M);
        dr(a, {
          ce: s,
          de: !D,
          W: t ? M : dr({}, z, M)
        });
      }
      return {
        pe: E
      };
    };
  };
  var yn = function createOverflowUpdateSegment(r, a) {
    var i = rn();
    var v = r.br, u = r.ce, c = r.N, l = r.F, s = r.ee, d = r.mr, p = r.yr, _ = r.Or, g = r.le;
    var h = i.j;
    var b = p && l;
    var m = or(t, 0);
    var S = {
      display: function display() {
        return false;
      },
      direction: function direction(r) {
        return r !== "ltr";
      },
      flexDirection: function flexDirection(r) {
        return r.endsWith("-reverse");
      },
      writingMode: function writingMode(r) {
        return r !== "horizontal-tb";
      }
    };
    var y = sr(S);
    var w = {
      v: tr,
      i: {
        w: 0,
        h: 0
      }
    };
    var C = {
      v: ir,
      i: {}
    };
    var x = function setMeasuringMode(r) {
      _(Je, !b && r);
    };
    var E = function getFlowDirectionStyles() {
      return getStyles(c, y);
    };
    var A = function getMeasuredScrollCoordinates(r, e) {
      var a = !sr(r).length;
      var n = e ? true : y.some((function(e) {
        var a = r[e];
        return O(a) && S[e](a);
      }));
      if (a || !n || !ce(c)) {
        return {
          k: {
            x: 0,
            y: 0
          },
          I: {
            x: 1,
            y: 1
          }
        };
      }
      x(true);
      var t = me(d);
      var i = de(s, er, (function(r) {
        var e = me(d);
        if (r.isTrusted && e.x === t.x && e.y === t.y) {
          pe(r);
        }
      }), {
        P: true,
        M: true
      });
      var v = _(ea, true);
      be(d, {
        x: 0,
        y: 0
      });
      var u = _(na, true);
      var l = me(d);
      var p = ve(d);
      be(d, {
        x: p.w,
        y: p.h
      });
      var g = me(d);
      var h = {
        x: g.x - l.x,
        y: g.y - l.y
      };
      be(d, {
        x: -p.w,
        y: -p.h
      });
      var b = me(d);
      var m = {
        x: b.x - l.x,
        y: b.y - l.y
      };
      var w = {
        x: o(h.x) >= o(m.x) ? g.x : b.x,
        y: o(h.y) >= o(m.y) ? g.y : b.y
      };
      v();
      u();
      be(d, t);
      f((function() {
        return i();
      }));
      return {
        k: l,
        I: w
      };
    };
    var T = function getOverflowAmount(r, e) {
      var a = n.devicePixelRatio % 1 !== 0 ? 1 : 0;
      var t = {
        w: m(r.w - e.w),
        h: m(r.h - e.h)
      };
      return {
        w: t.w > a ? t.w : 0,
        h: t.h > a ? t.h : 0
      };
    };
    var D = function getViewportOverflowStyle(r, e) {
      var a = function getAxisOverflowStyle(r, e, a, n) {
        var t = r === K ? rr : Ma(r);
        var i = za(r);
        var v = za(a);
        if (!e && !n) {
          return rr;
        }
        if (i && v) {
          return K;
        }
        if (i) {
          var o = e ? K : rr;
          return e && n ? t : o;
        }
        var u = v && n ? K : rr;
        return e ? t : u;
      };
      return {
        x: a(e.x, r.x, e.y, r.y),
        y: a(e.y, r.y, e.x, r.x)
      };
    };
    var H = function setViewportOverflowStyle(r) {
      var e = function createAllOverflowStyleClassNames(r) {
        return [ K, rr, er ].map((function(e) {
          return La(ka(e), r);
        }));
      };
      var a = e(true).concat(e()).join(" ");
      _(a);
      _(sr(r).map((function(e) {
        return La(r[e], e === "x");
      })).join(" "), true);
    };
    var P = e(w, or(oe, c)), z = P[0], M = P[1];
    var k = e(w, or(ve, c)), L = k[0], V = k[1];
    var R = e(w), F = R[0], j = R[1];
    var q = e(C), U = q[0];
    var B = e(w), Y = B[0], W = B[1];
    var X = e(C), Z = X[0];
    var G = e({
      v: function _equal(r, e) {
        return nr(r, e, N(I(sr(r), sr(e))));
      },
      i: {}
    }), Q = G[0];
    var $ = e({
      v: function _equal(r, e) {
        return ir(r.k, e.k) && ir(r.I, e.I);
      },
      i: Se()
    }), J = $[0], ar = $[1];
    var vr = ze(Va);
    return function(e, n) {
      var t = e.zr, o = e.ae, f = e.se, s = e.kr;
      var d = n.pe;
      var p = o || {}, S = p.gr, y = p.Hr, w = p.Dr, O = p.Ar, C = p._r, P = p.Pr;
      var k = vr && vr.R(r, a, f, i, t);
      var I = k || {}, R = I.Z, N = I.G, q = I.$;
      var B = Pa(t, i), X = B[0], G = B[1];
      var $ = t("overflow"), K = $[0], rr = $[1];
      var er = za(K.x);
      var nr = za(K.y);
      var tr = S || d || w || O || P || G;
      var ir = M(s);
      var or = V(s);
      var ur = j(s);
      var cr = W(s);
      if (G && h) {
        _(ra, !X);
      }
      if (tr) {
        if (Ar(v, We, Be)) {
          x(true);
        }
        var fr = l ? _(aa, true) : gr;
        var lr = N && N();
        var sr = ir = z(s), pr = sr[0];
        var _r = or = L(s), hr = _r[0];
        var br = ie(c);
        var mr = b && ne(g());
        var Sr = {
          w: m(hr.w + pr.w),
          h: m(hr.h + pr.h)
        };
        var yr = {
          w: m((mr ? mr.w : br.w + m(br.w - hr.w)) + pr.w),
          h: m((mr ? mr.h : br.h + m(br.h - hr.h)) + pr.h)
        };
        fr();
        if (lr) {
          lr();
        }
        cr = Y(yr);
        ur = F(T(Sr, yr), s);
      }
      var wr = cr, Or = wr[0], Cr = wr[1];
      var xr = ur, Tr = xr[0], Dr = xr[1];
      var Hr = or, Pr = Hr[0], zr = Hr[1];
      var Mr = ir, kr = Mr[0], Ir = Mr[1];
      var Lr = U({
        x: Tr.w > 0,
        y: Tr.h > 0
      }), Vr = Lr[0];
      var Rr = er && nr && (Vr.x || Vr.y) || er && Vr.x && !Vr.y || nr && Vr.y && !Vr.x;
      var Fr = d || O || P || Ir || zr || Cr || Dr || rr || G || tr || y && b;
      var Nr = t("update.flowDirectionStyles"), jr = Nr[0];
      var qr = Q(jr ? jr(c) || {} : E(), s), Ur = qr[0], Br = qr[1];
      var Yr = O || C || Br || s;
      var Wr = Yr ? J(A(Ur, !!jr), s) : ar(), Xr = Wr[0], Zr = Wr[1];
      var Gr = D(Vr, K);
      x(false);
      if (Fr) {
        H(Gr);
        Gr = Ia(c, Vr);
        if (q && R) {
          R(Gr, Pr, kr);
          setStyles(c, q(Gr));
        }
      }
      var Qr = Z(Gr), $r = Qr[0], Jr = Qr[1];
      Er(v, We, Be, Rr);
      Er(u, ta, Be, Rr);
      dr(a, {
        ue: $r,
        Nr: {
          x: Or.w,
          y: Or.h
        },
        Fr: {
          x: Tr.w,
          y: Tr.h
        },
        X: Vr,
        Lr: ye(Xr, Tr)
      });
      return {
        ve: Jr,
        te: Cr,
        ie: Dr,
        oe: Zr || Dr
      };
    };
  };
  var wn = function createStructureSetup(r) {
    var e;
    var a = bn(r), n = a[0], t = a[1], i = a[2];
    var v = {
      ce: {
        t: 0,
        r: 0,
        b: 0,
        l: 0
      },
      de: false,
      W: (e = {}, e[X] = 0, e[Z] = 0, e[W] = 0, e[q] = 0, e[U] = 0, e[Y] = 0, e[B] = 0, 
      e),
      Nr: {
        x: 0,
        y: 0
      },
      Fr: {
        x: 0,
        y: 0
      },
      ue: {
        x: rr,
        y: rr
      },
      X: {
        x: false,
        y: false
      },
      Lr: Se()
    };
    var o = n.hr, u = n.mr, c = n.F, f = n.Cr;
    var l = rn(), s = l.j, d = l.V;
    var p = !s && (d.x || d.y);
    var _ = [ mn(n), Sn(n, v), yn(n, v) ];
    return [ t, function(r) {
      var e = {};
      var a = p;
      var n = a && me(u);
      var t = n && f();
      each(_, (function(a) {
        dr(e, a(r, e) || {});
      }));
      be(u, n);
      if (t) {
        t();
      }
      if (!c) {
        be(o, 0);
      }
      return e;
    }, v, n, i ];
  };
  var On = function createSetups(r, e, a, n) {
    var t = false;
    var i = {
      re: false,
      _e: false
    };
    var v = Za(e, {});
    var o = wn(r), u = o[0], c = o[1], f = o[2], l = o[3], s = o[4];
    var d = cn(l, f, v, (function(r) {
      w({}, r);
    })), p = d[0], _ = d[1], g = d[2];
    var h = hn(r, e, i, g, f, l, n), b = h[0], m = h[1], S = h[3];
    var y = function updateHintsAreTruthy(r) {
      return sr(r).some((function(e) {
        return !!r[e];
      }));
    };
    var w = function update(r, n) {
      var v = i.re, o = i._e;
      if (o || v && t) {
        return false;
      }
      var u = r.ge, f = r.kr, l = r.Mr;
      var s = u || {};
      var d = !!f || !t;
      var p = {
        zr: Za(e, s, d),
        ge: s,
        kr: d
      };
      var h = n || _(dr({}, p, {
        Mr: l
      }));
      var b = c(dr({}, p, {
        se: g,
        ae: h
      }));
      m(dr({}, p, {
        ae: h,
        ne: b
      }));
      var S = y(h);
      var w = y(b);
      var O = S || w || !_r(s) || d;
      t = true;
      if (O) {
        a(r, {
          ae: h,
          ne: b
        });
      }
      return O;
    };
    return [ function() {
      var r = l.fe, e = l.mr, a = l.Cr;
      var n = me(r);
      var t = [ p(), u(), b(), function() {
        i._e = true;
      } ];
      var v = a();
      be(e, n);
      v();
      return or(j, t);
    }, w, function(r) {
      var e = i.re;
      i.re = r;
      if (!r && e !== r) {
        w({
          kr: true,
          Mr: true
        });
      }
    }, function() {
      m({
        zr: Za(e, {}, false),
        ge: {},
        kr: false
      });
    }, function() {
      return {
        he: i,
        be: g,
        me: f
      };
    }, {
      Se: l,
      ye: S
    }, s ];
  };
  var Cn = new WeakMap;
  var xn = function addInstance(r, e) {
    Cn.set(r, e);
  };
  var En = function removeInstance(r) {
    Cn.delete(r);
  };
  var An = function getInstance(r) {
    return Cn.get(r);
  };
  var Tn = function OverlayScrollbars(r, e, a) {
    var n = rn(), t = n.nr;
    var i = H(r);
    var v = i ? r : r.target;
    var o = An(v);
    if (e && !o) {
      var u = [];
      var c = {};
      var f = function validateOptions(r) {
        var e = pr(r);
        var a = ze(Fe);
        return a ? a(e, true) : e;
      };
      var l = dr({}, t(), f(e));
      var s = Ee(), d = s[0], p = s[1], _ = s[2];
      var g = Ee(a), h = g[0], b = g[1], m = g[2];
      var S = function triggerEvent(r, e) {
        m(r, e);
        _(r, e);
      };
      var y = On(r, l, (function(r, e) {
        var a = r.ge, n = r.kr;
        var t = e.ae, i = e.ne;
        var v = t.gr, o = t.Ar, u = t.Tr, c = t.Dr, f = t.Hr, l = t._r;
        var s = i.te, d = i.ie, p = i.ve, _ = i.oe;
        S("updated", [ z, {
          updateHints: {
            sizeChanged: !!v,
            directionChanged: !!o,
            heightIntrinsicChanged: !!u,
            overflowEdgeChanged: !!s,
            overflowAmountChanged: !!d,
            overflowStyleChanged: !!p,
            scrollCoordinatesChanged: !!_,
            contentMutation: !!c,
            hostMutation: !!f,
            appear: !!l
          },
          changedOptions: a || {},
          force: !!n
        } ]);
      }), (function(r) {
        return S("scroll", [ z, r ]);
      })), w = y[0], O = y[1], C = y[2], x = y[3], E = y[4], A = y[5], T = y[6];
      var D = function destroy(r) {
        var e = E(), a = e.he;
        var n = a._e;
        if (n) {
          return;
        }
        En(v);
        j(u);
        S("destroyed", [ z, r ]);
        p();
        b();
      };
      var P = function update(r) {
        return O({
          kr: r,
          Mr: true
        });
      };
      var z = {
        options: function options(r, e) {
          if (r) {
            var a = e ? t() : {};
            var n = Xa(l, dr(a, f(r)));
            if (!_r(n)) {
              dr(l, n);
              O({
                ge: n
              });
            }
          }
          return dr({}, l);
        },
        on: h,
        off: function off(r, e) {
          if (r && e) {
            b(r, e);
          }
        },
        state: function state() {
          var r = E(), e = r.he, a = r.be, n = r.me;
          var t = e._e, i = e.re;
          var v = a.Y;
          var o = n.Nr, u = n.Fr, c = n.ue, f = n.X, l = n.ce, s = n.de, d = n.Lr;
          return dr({}, {
            overflowEdge: o,
            overflowAmount: u,
            overflowStyle: c,
            hasOverflow: f,
            scrollCoordinates: {
              start: d.k,
              end: d.I
            },
            padding: l,
            paddingAbsolute: s,
            directionRTL: v,
            sleeping: i,
            destroyed: t
          });
        },
        elements: function elements() {
          var r = A.Se, e = r.hr, a = r.br, n = r.ce, t = r.N, i = r.Sr, v = r.mr, o = r.ee;
          var u = A.ye, c = u.Zr, f = u.Jr;
          var l = function translateScrollbarStructure(r) {
            var e = r.Vr, a = r.qr, n = r.jr;
            return {
              scrollbar: n,
              track: a,
              handle: e
            };
          };
          var s = function translateScrollbarsSetupElement(r) {
            var e = r.Gr, a = r.Qr;
            var n = l(e[0]);
            return dr({}, n, {
              clone: function clone() {
                var r = l(a());
                x();
                return r;
              }
            });
          };
          return dr({}, {
            target: e,
            host: a,
            padding: n || t,
            viewport: t,
            content: i || t,
            scrollOffsetElement: v,
            scrollEventElement: o,
            scrollbarHorizontal: s(c),
            scrollbarVertical: s(f)
          });
        },
        update: P,
        destroy: or(D, false),
        sleep: C,
        plugin: function plugin(r) {
          return c[sr(r)[0]];
        }
      };
      L(u, [ T ]);
      xn(v, z);
      He(Ae, Tn, [ z, d, c ]);
      if (pn(A.Se.yr, !i && r.cancel)) {
        D(true);
        return z;
      }
      L(u, w());
      S("initialized", [ z ]);
      z.update();
      return z;
    }
    return o;
  };
  Tn.plugin = function(r) {
    var e = E(r);
    var a = e ? r : [ r ];
    var n = a.map((function(r) {
      return He(r, Tn)[0];
    }));
    De(a);
    return e ? n : n[0];
  };
  Tn.valid = function(r) {
    var e = r && r.elements;
    var a = x(e) && e();
    return D(a) && !!An(a.target);
  };
  Tn.env = function() {
    var r = rn(), e = r.q, a = r.V, n = r.j, t = r.K, i = r.J, v = r.ir, o = r.vr, u = r.er, c = r.ar, f = r.nr, l = r.tr;
    return dr({}, {
      scrollbarsSize: e,
      scrollbarsOverlaid: a,
      scrollbarsHiding: n,
      scrollTimeline: t,
      focusableScrollers: i,
      staticDefaultInitialization: v,
      staticDefaultOptions: o,
      getDefaultInitialization: u,
      setDefaultInitialization: c,
      getDefaultOptions: f,
      setDefaultOptions: l
    });
  };
  Tn.nonce = $a;
  Tn.trustedTypePolicy = Br;
  r.ClickScrollPlugin = Na;
  r.OverlayScrollbars = Tn;
  r.ScrollbarsHidingPlugin = Ra;
  r.SizeObserverPlugin = Ha;
  return r;
}({});
//# sourceMappingURL=overlayscrollbars.browser.es5.js.map
