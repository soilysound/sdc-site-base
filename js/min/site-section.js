define("component-loader",[],function(){return{init:function(){var t=["animationstart","webkitAnimationStart","MSAnimationStart"];t.forEach(function(t){document.addEventListener(t,this.startEvent.bind(this))}.bind(this)),this.triggerCss()},startEvent:function(t){if("component-loader"===t.animationName){var n=t.target,e=n.getAttribute("data-component-name"),a=this.getComponentDataSet(n);require([e],function(t){t.init(n,a),n.setAttribute("data-component-loaded",!0)})}},triggerCss:function(){var t=["@keyframes component-loader {99% {outline-width: 1px}100% {outline-width: 0}}","[data-component-name] {animation: component-loader 0.01s}"].join(""),n=document.createElement("style");n.textContent=t,document.head.appendChild(n)},toCamelCase:function(t){var n=[];return t.replace(/^data-/,"").split("-").forEach(function(t,e){e&&(t=t.charAt(0).toUpperCase()+t.slice(1)),n.push(t)}),n.join("").replace(/^data/,"")},getComponentDataSet:function(t){var n=this,e={};return Object.keys(t.attributes).forEach(function(a){var i=t.attributes[a],o=i.nodeName;o.match(/^data-/)&&(e[n.toCamelCase(o)]=i.nodeValue)}),e}}}),define("example",[],function(){return{init:function(t,n){t.style.cssText="background:hotpink",t.textContent=n.myParam}}}),define("site-section",["component-loader","example"],function(t){return{init:function(){t.init()}}});