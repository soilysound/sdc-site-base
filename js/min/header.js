!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("header",[],e):"object"==typeof exports?exports.sky_component_header=e():t.sky_component_header=e()}(this,function(){return function(t){function e(n){if(a[n])return a[n].exports;var r=a[n]={exports:{},id:n,loaded:!1};return t[n].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var a={};return e.m=t,e.c=a,e.p="",e(0)}([function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=function(t,e){function a(t){t.preventDefault();var e=s.getAttribute("data-state");r("open"===e?!1:!0)}function n(t){var e=t.target;s.contains(e)||u.contains(e)||s===e||u===e||r(!1),l[0].contains(e)||l[1].contains(e)||l[0]===e||l[1]===e||o(!1)}function r(t){t?(s.setAttribute("data-state","open"),u.setAttribute("data-state","open")):(s.setAttribute("data-state","closed"),u.setAttribute("data-state","closed"))}function o(t){t?(l[0].setAttribute("data-state","open"),l[0].setAttribute("aria-selected","true"),l[1].setAttribute("aria-expanded","true"),l[1].setAttribute("aria-hidden","false")):(l[0].setAttribute("data-state","closed"),l[0].setAttribute("aria-selected","false"),l[1].setAttribute("aria-expanded","false"),l[1].setAttribute("aria-hidden","true"))}function i(t){t.preventDefault?t.preventDefault():t.returnValue=!1,l[0]&&l[0]!==this&&l[0].setAttribute("data-state","closed"),l[0]=this,l[1]=l[0].parentNode.querySelector('[data-role="nav-menu"]'),o("open"===l[0].getAttribute("data-state")?!1:!0)}if(t&&document.addEventListener){var s=t.querySelector('[data-role="mobile-nav-action"]'),u=t.querySelector('[data-role="mobile-nav-body"]'),d=t.querySelectorAll('[data-role="nav-menu-link"]'),c=document.createElement("shim"),l=[c,c];s.onclick=a,document.addEventListener("click",n);for(var f=-1;++f<d.length;)d[f].onclick=i}},t.exports=e["default"]}])});