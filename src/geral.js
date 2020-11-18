// jQuery Mask Plugin v1.14.16
// github.com/igorescobar/jQuery-Mask-Plugin
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function(a, n, f) { a instanceof String && (a = String(a)); for (var p = a.length, k = 0; k < p; k++) { var b = a[k]; if (n.call(f, b, k, a)) return { i: k, v: b } } return { i: -1, v: void 0 } };
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, n, f) { a != Array.prototype && a != Object.prototype && (a[n] = f.value) };
$jscomp.getGlobal = function(a) { return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a };
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, n, f, p) {
    if (n) {
        f = $jscomp.global;
        a = a.split(".");
        for (p = 0; p < a.length - 1; p++) {
            var k = a[p];
            k in f || (f[k] = {});
            f = f[k]
        }
        a = a[a.length - 1];
        p = f[a];
        n = n(p);
        n != p && null != n && $jscomp.defineProperty(f, a, { configurable: !0, writable: !0, value: n })
    }
};
$jscomp.polyfill("Array.prototype.find", function(a) { return a ? a : function(a, f) { return $jscomp.findInternal(this, a, f).v } }, "es6", "es3");
(function(a, n, f) { "function" === typeof define && define.amd ? define(["jquery"], a) : "object" === typeof exports && "undefined" === typeof Meteor ? module.exports = a(require("jquery")) : a(n || f) })(function(a) {
    var n = function(b, d, e) {
        var c = {
            invalid: [],
            getCaret: function() {
                try {
                    var a = 0,
                        r = b.get(0),
                        h = document.selection,
                        d = r.selectionStart;
                    if (h && -1 === navigator.appVersion.indexOf("MSIE 10")) {
                        var e = h.createRange();
                        e.moveStart("character", -c.val().length);
                        a = e.text.length
                    } else if (d || "0" === d) a = d;
                    return a
                } catch (C) {}
            },
            setCaret: function(a) {
                try {
                    if (b.is(":focus")) {
                        var c =
                            b.get(0);
                        if (c.setSelectionRange) c.setSelectionRange(a, a);
                        else {
                            var g = c.createTextRange();
                            g.collapse(!0);
                            g.moveEnd("character", a);
                            g.moveStart("character", a);
                            g.select()
                        }
                    }
                } catch (B) {}
            },
            events: function() {
                b.on("keydown.mask", function(a) {
                    b.data("mask-keycode", a.keyCode || a.which);
                    b.data("mask-previus-value", b.val());
                    b.data("mask-previus-caret-pos", c.getCaret());
                    c.maskDigitPosMapOld = c.maskDigitPosMap
                }).on(a.jMaskGlobals.useInput ? "input.mask" : "keyup.mask", c.behaviour).on("paste.mask drop.mask", function() {
                    setTimeout(function() { b.keydown().keyup() },
                        100)
                }).on("change.mask", function() { b.data("changed", !0) }).on("blur.mask", function() {
                    f === c.val() || b.data("changed") || b.trigger("change");
                    b.data("changed", !1)
                }).on("blur.mask", function() { f = c.val() }).on("focus.mask", function(b) {!0 === e.selectOnFocus && a(b.target).select() }).on("focusout.mask", function() { e.clearIfNotMatch && !k.test(c.val()) && c.val("") })
            },
            getRegexMask: function() {
                for (var a = [], b, c, e, t, f = 0; f < d.length; f++)(b = l.translation[d.charAt(f)]) ? (c = b.pattern.toString().replace(/.{1}$|^.{1}/g, ""), e = b.optional,
                    (b = b.recursive) ? (a.push(d.charAt(f)), t = { digit: d.charAt(f), pattern: c }) : a.push(e || b ? c + "?" : c)) : a.push(d.charAt(f).replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
                a = a.join("");
                t && (a = a.replace(new RegExp("(" + t.digit + "(.*" + t.digit + ")?)"), "($1)?").replace(new RegExp(t.digit, "g"), t.pattern));
                return new RegExp(a)
            },
            destroyEvents: function() { b.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask ")) },
            val: function(a) {
                var c = b.is("input") ? "val" : "text";
                if (0 < arguments.length) {
                    if (b[c]() !== a) b[c](a);
                    c = b
                } else c = b[c]();
                return c
            },
            calculateCaretPosition: function(a) {
                var d = c.getMasked(),
                    h = c.getCaret();
                if (a !== d) {
                    var e = b.data("mask-previus-caret-pos") || 0;
                    d = d.length;
                    var g = a.length,
                        f = a = 0,
                        l = 0,
                        k = 0,
                        m;
                    for (m = h; m < d && c.maskDigitPosMap[m]; m++) f++;
                    for (m = h - 1; 0 <= m && c.maskDigitPosMap[m]; m--) a++;
                    for (m = h - 1; 0 <= m; m--) c.maskDigitPosMap[m] && l++;
                    for (m = e - 1; 0 <= m; m--) c.maskDigitPosMapOld[m] && k++;
                    h > g ? h = 10 * d : e >= h && e !== g ? c.maskDigitPosMapOld[h] || (e = h, h = h - (k - l) - a, c.maskDigitPosMap[h] && (h = e)) : h > e && (h = h + (l - k) + f)
                }
                return h
            },
            behaviour: function(d) {
                d =
                    d || window.event;
                c.invalid = [];
                var e = b.data("mask-keycode");
                if (-1 === a.inArray(e, l.byPassKeys)) {
                    e = c.getMasked();
                    var h = c.getCaret(),
                        g = b.data("mask-previus-value") || "";
                    setTimeout(function() { c.setCaret(c.calculateCaretPosition(g)) }, a.jMaskGlobals.keyStrokeCompensation);
                    c.val(e);
                    c.setCaret(h);
                    return c.callbacks(d)
                }
            },
            getMasked: function(a, b) {
                var h = [],
                    f = void 0 === b ? c.val() : b + "",
                    g = 0,
                    k = d.length,
                    n = 0,
                    p = f.length,
                    m = 1,
                    r = "push",
                    u = -1,
                    w = 0;
                b = [];
                if (e.reverse) {
                    r = "unshift";
                    m = -1;
                    var x = 0;
                    g = k - 1;
                    n = p - 1;
                    var A = function() {
                        return -1 <
                            g && -1 < n
                    }
                } else x = k - 1, A = function() { return g < k && n < p };
                for (var z; A();) {
                    var y = d.charAt(g),
                        v = f.charAt(n),
                        q = l.translation[y];
                    if (q) v.match(q.pattern) ? (h[r](v), q.recursive && (-1 === u ? u = g : g === x && g !== u && (g = u - m), x === u && (g -= m)), g += m) : v === z ? (w--, z = void 0) : q.optional ? (g += m, n -= m) : q.fallback ? (h[r](q.fallback), g += m, n -= m) : c.invalid.push({ p: n, v: v, e: q.pattern }), n += m;
                    else {
                        if (!a) h[r](y);
                        v === y ? (b.push(n), n += m) : (z = y, b.push(n + w), w++);
                        g += m
                    }
                }
                a = d.charAt(x);
                k !== p + 1 || l.translation[a] || h.push(a);
                h = h.join("");
                c.mapMaskdigitPositions(h,
                    b, p);
                return h
            },
            mapMaskdigitPositions: function(a, b, d) {
                a = e.reverse ? a.length - d : 0;
                c.maskDigitPosMap = {};
                for (d = 0; d < b.length; d++) c.maskDigitPosMap[b[d] + a] = 1
            },
            callbacks: function(a) {
                var g = c.val(),
                    h = g !== f,
                    k = [g, a, b, e],
                    l = function(a, b, c) { "function" === typeof e[a] && b && e[a].apply(this, c) };
                l("onChange", !0 === h, k);
                l("onKeyPress", !0 === h, k);
                l("onComplete", g.length === d.length, k);
                l("onInvalid", 0 < c.invalid.length, [g, a, b, c.invalid, e])
            }
        };
        b = a(b);
        var l = this,
            f = c.val(),
            k;
        d = "function" === typeof d ? d(c.val(), void 0, b, e) : d;
        l.mask =
            d;
        l.options = e;
        l.remove = function() {
            var a = c.getCaret();
            l.options.placeholder && b.removeAttr("placeholder");
            b.data("mask-maxlength") && b.removeAttr("maxlength");
            c.destroyEvents();
            c.val(l.getCleanVal());
            c.setCaret(a);
            return b
        };
        l.getCleanVal = function() { return c.getMasked(!0) };
        l.getMaskedVal = function(a) { return c.getMasked(!1, a) };
        l.init = function(g) {
            g = g || !1;
            e = e || {};
            l.clearIfNotMatch = a.jMaskGlobals.clearIfNotMatch;
            l.byPassKeys = a.jMaskGlobals.byPassKeys;
            l.translation = a.extend({}, a.jMaskGlobals.translation, e.translation);
            l = a.extend(!0, {}, l, e);
            k = c.getRegexMask();
            if (g) c.events(), c.val(c.getMasked());
            else {
                e.placeholder && b.attr("placeholder", e.placeholder);
                b.data("mask") && b.attr("autocomplete", "off");
                g = 0;
                for (var f = !0; g < d.length; g++) { var h = l.translation[d.charAt(g)]; if (h && h.recursive) { f = !1; break } }
                f && b.attr("maxlength", d.length).data("mask-maxlength", !0);
                c.destroyEvents();
                c.events();
                g = c.getCaret();
                c.val(c.getMasked());
                c.setCaret(g)
            }
        };
        l.init(!b.is("input"))
    };
    a.maskWatchers = {};
    var f = function() {
            var b = a(this),
                d = {},
                e = b.attr("data-mask");
            b.attr("data-mask-reverse") && (d.reverse = !0);
            b.attr("data-mask-clearifnotmatch") && (d.clearIfNotMatch = !0);
            "true" === b.attr("data-mask-selectonfocus") && (d.selectOnFocus = !0);
            if (p(b, e, d)) return b.data("mask", new n(this, e, d))
        },
        p = function(b, d, e) {
            e = e || {};
            var c = a(b).data("mask"),
                f = JSON.stringify;
            b = a(b).val() || a(b).text();
            try { return "function" === typeof d && (d = d(b)), "object" !== typeof c || f(c.options) !== f(e) || c.mask !== d } catch (w) {}
        },
        k = function(a) {
            var b = document.createElement("div");
            a = "on" + a;
            var e = a in b;
            e || (b.setAttribute(a,
                "return;"), e = "function" === typeof b[a]);
            return e
        };
    a.fn.mask = function(b, d) {
        d = d || {};
        var e = this.selector,
            c = a.jMaskGlobals,
            f = c.watchInterval;
        c = d.watchInputs || c.watchInputs;
        var k = function() { if (p(this, b, d)) return a(this).data("mask", new n(this, b, d)) };
        a(this).each(k);
        e && "" !== e && c && (clearInterval(a.maskWatchers[e]), a.maskWatchers[e] = setInterval(function() { a(document).find(e).each(k) }, f));
        return this
    };
    a.fn.masked = function(a) { return this.data("mask").getMaskedVal(a) };
    a.fn.unmask = function() {
        clearInterval(a.maskWatchers[this.selector]);
        delete a.maskWatchers[this.selector];
        return this.each(function() {
            var b = a(this).data("mask");
            b && b.remove().removeData("mask")
        })
    };
    a.fn.cleanVal = function() { return this.data("mask").getCleanVal() };
    a.applyDataMask = function(b) {
        b = b || a.jMaskGlobals.maskElements;
        (b instanceof a ? b : a(b)).filter(a.jMaskGlobals.dataMaskAttr).each(f)
    };
    k = {
        maskElements: "input,td,span,div",
        dataMaskAttr: "*[data-mask]",
        dataMask: !0,
        watchInterval: 300,
        watchInputs: !0,
        keyStrokeCompensation: 10,
        useInput: !/Chrome\/[2-4][0-9]|SamsungBrowser/.test(window.navigator.userAgent) &&
            k("input"),
        watchDataMask: !1,
        byPassKeys: [9, 16, 17, 18, 36, 37, 38, 39, 40, 91],
        translation: { 0: { pattern: /\d/ }, 9: { pattern: /\d/, optional: !0 }, "#": { pattern: /\d/, recursive: !0 }, A: { pattern: /[a-zA-Z0-9]/ }, S: { pattern: /[a-zA-Z]/ } }
    };
    a.jMaskGlobals = a.jMaskGlobals || {};
    k = a.jMaskGlobals = a.extend(!0, {}, k, a.jMaskGlobals);
    k.dataMask && a.applyDataMask();
    setInterval(function() { a.jMaskGlobals.watchDataMask && a.applyDataMask() }, k.watchInterval)
}, window.jQuery, window.Zepto);


var waitForFinalEvent = (function() {
    var timers = {};
    return function(callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout(timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();

$(document).ready(function() {
    $('.bread-crumb ul li').first().html('<a title="madmais" href="/">Início</a>');
});


//slugfy
if (!String.prototype.slugify) {
    String.prototype.slugify = function() {

        return this.toString().toLowerCase()
            .replace(/[àÀáÁâÂãäÄÅåª]+/g, 'a') // Special Characters #1
            .replace(/[èÈéÉêÊëË]+/g, 'e') // Special Characters #2
            .replace(/[ìÌíÍîÎïÏ]+/g, 'i') // Special Characters #3
            .replace(/[òÒóÓôÔõÕöÖº]+/g, 'o') // Special Characters #4
            .replace(/[ùÙúÚûÛüÜ]+/g, 'u') // Special Characters #5
            .replace(/[ýÝÿŸ]+/g, 'y') // Special Characters #6
            .replace(/[ñÑ]+/g, 'n') // Special Characters #7
            .replace(/[çÇ]+/g, 'c') // Special Characters #8
            .replace(/[ß]+/g, 'ss') // Special Characters #9
            .replace(/[Ææ]+/g, 'ae') // Special Characters #10
            .replace(/[Øøœ]+/g, 'oe') // Special Characters #11
            .replace(/[%]+/g, 'pct') // Special Characters #12
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/[^\w\-]+/g, '') // Remove all non-word chars
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, ''); // Trim - from end of text

    };
}


const large = $(window).width();


$.ajax( {
    "url": "/api/catalog_system/pub/category/tree/3/",
    "method": "GET",
    "timeout": 0,
    "headers": {
        "Content-Type": "application/json"
    },
}).done(function(response) {
    let max = 0;
    

    //menu Mobile 

    //menu desktop

    for (response of response) {

        if (max <= 5) {
            loadMenu(response)
        } else {
            loadMoreMenu(response)
        }
        max = max + 1;

  
        loadMenuMobile(response)

    }

    initMobile();


    $('.menu-item').each(function() {
        const text = $(this).children('a').text();
        $(this).addClass('menu-green')
    })

})






//LOAD MENU
function loadMenu(menu) {
    const menuElement = document.querySelector('.before-element');
    let child = menu.children;
    const ulElement = document.createElement('ul');
    const liElement = document.createElement('li');
    const linkElement = document.createElement('a');
    const pElement = document.createElement('p');
    const maxElement = document.createElement('div');
    const menuTItle = document.createElement('span');

    menuTItle.textContent = menu.name;
    linkElement.setAttribute('href', menu.url);
    pElement.textContent = menu.name;
    liElement.setAttribute('class', 'menu-item');
    linkElement.setAttribute('class', 'link-main-menu')
    maxElement.setAttribute('class', 'sub-menu');
    linkElement.appendChild(pElement);
    liElement.appendChild(linkElement);
    menuElement.before(liElement);
    maxElement.appendChild(ulElement)
    ulElement.appendChild(menuTItle);

    for (child of child) {
        const subLiElement = document.createElement('li');
        const subLinkElement = document.createElement('a');

        subLiElement.setAttribute('class', 'sub-menu-item');
        subLinkElement.setAttribute('href', child.url);
        ulElement.setAttribute('class', 'max-container');
        subLinkElement.textContent = child.name;

        subLiElement.appendChild(subLinkElement);
        ulElement.appendChild(subLiElement);
        liElement.appendChild(maxElement);
    }
}

function loadMenuMobile(menu) {
    const menuElement = document.querySelector('.mobile .before-element');
    let child = menu.children;
    const ulElement = document.createElement('ul');
    const liElement = document.createElement('li');
    const linkElement = document.createElement('a');
    const pElement = document.createElement('p');
    const maxElement = document.createElement('div');
    const menuTItle = document.createElement('span');

    menuTItle.textContent = menu.name;
    linkElement.setAttribute('href', menu.url);
    pElement.textContent = menu.name;
    liElement.setAttribute('class', 'menu-item');
    linkElement.setAttribute('class', 'link-main-menu')
    maxElement.setAttribute('class', 'sub-menu');
    linkElement.appendChild(pElement);
    liElement.appendChild(linkElement);
    menuElement.before(liElement);
    maxElement.appendChild(ulElement)
    ulElement.appendChild(menuTItle);

    for (child of child) {
        const subLiElement = document.createElement('li');
        const subLinkElement = document.createElement('a');

        subLiElement.setAttribute('class', 'sub-menu-item');
        subLinkElement.setAttribute('href', child.url);
        ulElement.setAttribute('class', 'max-container');
        subLinkElement.textContent = child.name;

        subLiElement.appendChild(subLinkElement);
        ulElement.appendChild(subLiElement);
        liElement.appendChild(maxElement);
    }
}

//LOAD MORE MENU
function loadMoreMenu(menu) {
    const menuElement = document.querySelector('.all-itens-menu');

    let child = menu.children;
    const liElement = document.createElement('li');
    const linkElement = document.createElement('a');
    const subUlElement = document.createElement('ul')

    liElement.setAttribute('class', 'all-item');
    linkElement.setAttribute('href', menu.url);

    linkElement.textContent = menu.name;
    liElement.appendChild(linkElement);
    menuElement.appendChild(liElement);

    for (child of child) {
        const subLiElement = document.createElement('li');
        const subLinkElement = document.createElement('a');

        subLiElement.setAttribute('class', 'sub-menu-all-item');
        subLinkElement.setAttribute('href', child.url);
        subUlElement.setAttribute('class', 'sub-menu-all-item-container');
        subLinkElement.textContent = child.name;

        subLiElement.appendChild(subLinkElement);
        subUlElement.appendChild(subLiElement);
        liElement.appendChild(subUlElement);
    }
}

function loadMoreMenuMobile(menu) {
    const menuElement = document.querySelector('.mobile .all-itens-menu');

    let child = menu.children;
    const liElement = document.createElement('li');
    const linkElement = document.createElement('a');
    const subUlElement = document.createElement('ul')

    liElement.setAttribute('class', 'all-item');
    linkElement.setAttribute('href', menu.url);

    linkElement.textContent = menu.name;
    liElement.appendChild(linkElement);
    menuElement.appendChild(liElement);

    for (child of child) {
        const subLiElement = document.createElement('li');
        const subLinkElement = document.createElement('a');

        subLiElement.setAttribute('class', 'sub-menu-all-item');
        subLinkElement.setAttribute('href', child.url);
        subUlElement.setAttribute('class', 'sub-menu-all-item-container');
        subLinkElement.textContent = child.name;

        subLiElement.appendChild(subLinkElement);
        subUlElement.appendChild(subLiElement);
        liElement.appendChild(subUlElement);
    }
}


function initMobile() {


    $('.container-all-itens,.sub-menu').before("<span class='open-sub'></span>")

    $('.head-profile').prepend(`
        <span class="toggle-menu">
            <span class="line line-1"></span>
            <span class="line line-2"></span>
            <span class="line line-3"></span>
        </span>
   `);

    $(`<div class="break"></div>`).insertBefore('.search-container');

    $('.toggle-menu, .bt-fechar-menu').click(function() {
        $('.toggle-menu').toggleClass('active');
        $('.main-head-menu.container.mobile').toggleClass('active');
        $('.box-shadow').fadeToggle();
        $('body').toggleClass('menu-open');
        $('.bt-fechar-menu').toggleClass('active')
    })

    $('.open-sub').click(function() {
        $(this).siblings('.sub-menu,.container-all-itens').slideToggle();
    })

    $('.btn-buscar').click(function() {
        $('.search-container .busca').toggleClass('active');
        $('.search-container').toggleClass('active');
    })

}

setTimeout(() => {
    $('.ui-autocomplete').css({
        "max-width": $('.search-container .busca').width()
    })
}, 1000);

/**  Carrega dados  de usuário  logado */
$(function() {
    const url = "/no-cache/profileSystem/getProfile";
    fetch(url)
        .then((resp) => resp.json())
        .then(function(data) {
            if (data.IsUserDefined) {
                $("#meu-cadastro").text("");
                $("#meus-pedidos").text("");
                $("#meu-cadastro").text("Dados Pessoais");
                $("#meus-pedidos").text("Pedidos");

                if (data.FirstName != "null") {
                    $(".account-text").text(data.FirstName);
                } else if (data.Email != "null") {

                    var simplifiedemail = data.Email.substring(0, data.Email.indexOf('@'));


                    $(".account-text").text(simplifiedemail);

                } else {

                    $(".account-text").text("Olá, " + "Usuário");
                }

                $("#login-cadastro").attr("href", "/account");

                $(".account-text").append('<a href="/no-cache/user/logout" class="sair" style="color:#373435;font-weight: 700";> (Sair)</a>')
            } else {

                /* $("#login-cadastro").append('<div><a href="/account"><div>Cadastre-se</div> <div>Login</div></a></div>') */

            }
        });
});

/**dados usuário logado */


$(document).ready(function() {

    $('.title').click(function() {
        var classe = $(this).attr('id');

        $(".departamento-rodape ul").each(function() {
            if ($(this).hasClass(classe)) {
                $(this).slideToggle();
            }
        })
    })
});


function deleteItem(element, index) {
    vtexjs.checkout.getOrderForm()
        .then(function() {
            return vtexjs.checkout.removeItems([{
                "index": index,
                "quantity": 0,
            }]);
        })

    .done(function() {
        element.parentElement.parentElement.parentElement.remove()
    });
}

window.onload = (function() {
    const config = {
        containerCartElement: document.querySelector('.carrinho'),
        containerItensElement: document.querySelector('.mini-cart-itens'),
        cartCountElement: document.querySelector('.mini-cart-qty-admake'),
        cartTotalElement: document.querySelector('.mini-cart-footer'),
        productButtonAddToCartElement: document.querySelector('.add-to-cart-custom'),
        productOrcEspecField: document.querySelector('.orcamento.value-field'),
        productOrcFormSubElement: document.querySelector('.form-sub'),
        productFormOrc: document.querySelector('.form-orcamento'),
        containerAccountTop: document.querySelectorAll('.account-msg .top'),
        containerAccountBot: document.querySelectorAll('.account-msg .bot'),
        togglerCart: document.querySelectorAll('.toggler-cart'),
        listSkus: document.querySelector('#___rc-p-sku-ids'),
        skuSelectElement: document.querySelector('.sku-selection select'),
        shelfOrcField: document.querySelectorAll('.box-item .orc-field'),
        productNotifyme: document.querySelector('.portal-notify-me-ref'),
        productBuyButtonVtex: document.querySelector('.buy-button.buy-button-ref'),
        productFeedback: document.querySelector('.feedback'),
        skuSelected: null,
        skuAvailability: true
    }

    const utils = {
        toMoney: e => (parseInt(e).toFixed() * 0.010).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
        formToJson: function(form) {
            return Object.assign(...Array.from(new FormData(form).entries(), ([x, y]) => ({
                [x]: y
            })));
        },
        request: function(type, url, data) {
            return new Promise(function(resolve, reject) {
                const xhr = new XMLHttpRequest();
                xhr.open(type, url);
                xhr.setRequestHeader('Accept', 'application/vnd.vtex.ds.v10+json');
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        if (xhr.status === 200 || xhr.status === 201 || xhr.status === 304) {
                            return resolve(xhr);
                        } else {
                            return reject(xhr);
                        }
                    }
                }
                xhr.send(JSON.stringify(data));
            });
        },
        validateForm: function(form) {
            let validate = true;
            form.querySelectorAll('.required input').forEach(function(item) {
                if (item.value === '') {
                    validate = false;
                    item.focus();
                }
            });
            return validate;
        }
    }

    const methods = {
        init: function() {
            methods.selectSku();
            methods.productAddToCart();
            methods.animateCart();
            methods.setShelfTextBuyButton();
            methods.verifyOrc();
            methods.sendOrc();
            vtexjs.checkout.getOrderForm().done(function(orderForm) {
                methods.setMiniCartCountItens(orderForm);
                methods.renderItens(orderForm);
                methods.renderTotal(orderForm);
                methods.observerOrderform();
            });
        },
        setMiniCartCountItens: function(orderForm) {
            if (config.cartCountElement) {
                config.cartCountElement.textContent = orderForm.items.length
            }
        },
        renderItens: function(orderForm) {
            if (config.containerItensElement) {
                config.containerItensElement.innerHTML = '';
                if (orderForm.items.length == 0) {
                    config.containerItensElement.innerHTML = `
                        <span class="empty">Seu carrinho está vazio!</span>
                    `;
                }
            }

            orderForm.items.forEach(function(item, i) {
                if (config.containerItensElement) {
                    config.containerItensElement.innerHTML += `
                    <div class="mini-cart-item item-${item.id}">        
                        <span class="imagem">       
                            <a class="sku-imagem" href="${item.detailUrl}">
                                <img height="71" width="71" alt="${item.skuName}" src="${item.imageUrl}" />
                            </a>    
                        </span> 
                        <span class="detalhes">       
                            <span class="name-agrup">           
                                <p class="nome-produto">
                                    <a href="${item.detailUrl}">${item.skuName}</a>
                                </p>            
                                <span class="preco">${utils.toMoney(item.sellingPrice || item.price)}</span>     
                            </span>     
                            <span class="qtd-valor">            
                                <span class="qtd">${item.quantity}x ${utils.toMoney(item.sellingPrice || item.price)}</span>         
                                <span class="trash" onclick="deleteItem(this,'${i}')"></span>       
                            </span>
                        </span>
                    </div>
                `;
                }
            });
        },
        renderTotal: function(orderForm) {
            if (config.cartTotalElement) {
                config.cartTotalElement.innerHTML = `
                    <div class="mini-cart-totais">
                        <span>SubTotal:</span>
                        <span id="mini-cart-admake-total">${orderForm.totalizers.length ? utils.toMoney(orderForm.totalizers[0].value) : 'R$ 00,00'}</span>
                    </div>
                    <div class="mini-cart-botao">
                        <a href="/checkout/#/cart" class="btn btn-finalizar-compra">Finalizar</a>
                    </div>
                `;
            }
        },
        observerOrderform: function() {
            $(window).on('orderFormUpdated.vtex', function(evt, orderForm) {
                methods.setMiniCartCountItens(orderForm);
                methods.renderItens(orderForm);
                methods.renderTotal(orderForm);
            });
        },
        productAddToCart: function() {
            if (config.productButtonAddToCartElement) {
                config.productButtonAddToCartElement.style.display = config.productBuyButtonVtex.style.display;
                config.productButtonAddToCartElement.addEventListener('click', function() {
                    console.log(config.skuAvailability)
                    if (config.skuSelected && config.skuAvailability) {
                        const item = {
                            id: config.skuSelected,
                            quantity: document.querySelector('.qtd.pull-left').value,
                            seller: '1'
                        };
                        vtexjs.checkout.addToCart([item], null, 1)
                            .done(function(orderForm) {
                                config.containerCartElement.classList.add('active');
                            });
                    } else if (!config.skuAvailability) {
                        alert('Produto indisponível');
                    } else {
                        alert('Selecione um modelo')
                    }
                });
            }
        },
        animateCart: function() {
            config.togglerCart.forEach(function(item) {
                item.addEventListener('click', function() {
                    config.containerCartElement.classList.toggle('active');
                })
            });
        },
        selectSku: function() {
            if (config.listSkus) {
                const arraySkus = config.listSkus.value.split(',');
                if (arraySkus.length == 1 && config.productButtonAddToCartElement) {
                    config.skuSelected = arraySkus[0];
                } else if (arraySkus.length > 1 && config.productButtonAddToCartElement) {
                    $(document).ajaxComplete(function(events, xhr, settings) {
                        let url = settings.url.includes("/produto/sku/");
                        if (url) {
                            const response = JSON.parse(xhr.responseText)
                            config.skuSelected = response[0].Id;
                            config.skuAvailability = response[0].Availability;
                        }
                    });
                }
            }
        },
        verifyOrc: function() {
            if (config.productOrcEspecField) {
                config.productFormOrc.style.display = 'block';
                config.productButtonAddToCartElement.style.display = 'none';
                config.productNotifyme.style.display = 'none';
                document.querySelector(".quantidade-produto.buy-button-box").style.display = 'none';
            }
        },
        setShelfTextBuyButton: function() {
            config.shelfOrcField.forEach(function(item) {
                if (item.children.length) {
                    item.parentElement.querySelector('.ver-produto').textContent = 'Orçamento';
                    item.parentElement.querySelector('.ver-produto').style.background = '#808080';

                }
            })
        },
        sendOrc: function() {
            if (config.productFormOrc) {
                config.productFormOrc.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const validate = utils.validateForm(config.productFormOrc);
                    const formData = utils.formToJson(config.productFormOrc);
                    if (validate) {
                        utils.request('PATCH', '/api/dataentities/CL/documents/', {
                            "firstName": formData.cl_first_name,
                            "email": formData.cl_email,
                            "homePhone": formData.cl_home_phone,
                            "phone": formData.cl_phone
                        }).then(function() {
                            utils.request('PATCH', '/api/dataentities/OR/documents/', {
                                clientEmail: formData.cl_email,
                                productInfo: document.querySelector('.productName').textContent + " ___REF: " + document.querySelector('.skuReference').textContent,
                                mesage: formData.or_mesage

                            }).then(function(r) {
                                config.productFeedback.innerHTML = `
                                    <span style="background: #3bb554;height: 40px;line-height: 40px;text-align: center;width: 100%;display: block;color: #fff;">
                                        Orçamento solicitado com sucesso!
                                    </span>
                                `;
                            })
                        });
                    } else {
                        config.productFeedback.innerHTML = `
                            <span style="background: #d2aa25;height: 40px;line-height: 40px;text-align: center;width: 100%;display: block;color: #fff;">
                                Preencha os campos obrigatórios!
                            </span>
                        `;
                    }
                });
            }
        }
    }
    $(document).ajaxComplete(function(event, xhr, settings) {
        let url = settings.url;
        var urlParams = new URLSearchParams(url);
        if (urlParams.get("PageNumber")) {
            methods.verifyOrc();
            methods.setShelfTextBuyButton();
        }
    })

    methods.init();
})();


var SPMaskBehavior = function(val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    },
    spOptions = {
        onKeyPress: function(val, e, field, options) {
            field.mask(SPMaskBehavior.apply({}, arguments), options);
        }
    };

$('#cl_home_phone,#cl_phone').mask(SPMaskBehavior, spOptions);


 const countDownDate = new Date("Nov 22, 2020 23:59:59").getTime();
    const x = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        document.querySelector(".blackweek").style.display = "block";
        document.querySelector(".blackweek").innerHTML = `
            Faltam 
            <div class="timer">
                <div class="d">
                    DIAS
                    <span>${days}</span>
                </div>
                <div class="h">
                    HORAS
                    <span>${hours}</span>
                </div>
                <div class="m">
                    MINUTOS
                    <span>${minutes}</span>
                </div>
                <div class="s">
                    SEGUNDOS
                    <span>${seconds}</span>
                </div>
            </div>
            para a Black Week <strong> MadMais </strong>
        `;
        if (distance < 0) {
            clearInterval(x);
            document.getElementById(".blackweek").style.display = "none";
        }
    }, 1000);