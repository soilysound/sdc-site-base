# SDC Site base

- [Build](#build)
- [Folder Structure](#folder-structure)
- [Head](#head)
  - [Meta data](#meta-data)  
  - [CSS](#site-section-css-file)
  - [JS](#head-javascript)
- [Support](#support)
  - [Modern](#modern-browser)
  - [Legacy](#legacy-browser)
- [Javascript](#javascript)
  - [Initialize site javascript](#init-site-js) 
  - [Load a component from javascript](#load-a-component-from-javascript)
  - [Load a component from markup](#load-a-component-from-markup)
- [Inlining static files](#inlining-static-files)

## Build

```javascript
npm run compile
```

## Folder Structure

* **js**  
  site-main.js  
  site-section.js
  * **min**  
    site-main.js  
    site-section.js
* **css**  
  site-main.css  
  site-section.css  
  * **min**  
    site-main.css  
    site-section.css  
* **scripts**  
  compile.sh  
  build-css.js  
  build-js.js  

index.html
require-config.js  
require-config-min.js
package.json  

## Head

### Meta data
Include schema.org jsonp object for Organization, link and meta data.

```html
  <script data-schema="Organization" type="application/ld+json">
    {
      "name":"Sky Sports",
      "url":"http://www.skysports.com/",
      "logo":"/img/site-logo.png",
      "sameAs":[
        "https://www.facebook.com/skysports",
        "https://twitter.com/skysports",
        "https://www.youtube.com/user/skysportsofficial"
      ],
      "@type":"Organization",
      "@context":"http://schema.org"
    }
  </script> 

  <script data-schema="WebPage" type="application/ld+json">
    {
      "@id":"http://www.skysports.com/",
      "@type":"WebPage",
      "@context":"http://schema.org"
    }
  </script>
```

### Site section css file
Include one bundled css file per major site section. Max unminified css size 100k.

### Head javascript
Include one small head js file, inlined during production. This file creates a global variable:

```javascript 
window.isModernBrowser
``` 
that provides a 'cut the mustard' test for older browsers. This also adds a class to the html element:

```html
<html class="js is-legacy">
```
or:

```html
<html class="js is-modern">
```
The test is based on detection of two browser apis - page visibility and CSS.supports. All modern browsers support one or both of these, whereas legacy browsers such as IE8, 9 and old android do not.

## Support
Browsers that do not pass the above test will not recieve site javascript and may thus lack some functionailty. However, the main text of each page should still be readable and there should be a basic, useable navigation.   

Stats below are based on caniuse.com figures for UK.

#### Modern browser
Browsers and devices listed here should enjoy full site functionality, javascript support and design. 

| Yes          | Support % |
| :----------  | :------   |
| IE10         | 0.5       |
| IE11         | 7.9       | 
| Edge         | 2.7       |
| IE Mob 10+   | 1.0       |
| IOS 7+       | 22.8      |
| Android 4.4  | 2.2       |
| Firefox      | 7.2       |
| Chrome       | 27.8      |
| Chrome And   | 12.1      |
| Saf 7+       | 4.3       |
| Opera        | 0.6       |
| Other        | 2.1       |
| ***total***  | 91.1      |

#### Legacy browser
Browsers and devices listed here will not recieve site javascript and will be missing some functionailty. All text should be viewable and basic navigation functional, but design and appearance may be basic and stripped back.

| No           | Support % |
| :----------  | :----     |
| IE8          | 0.5       |
| IE9          | 0.6       |
| And 4.3<     | 1.1       |
| Opera Mini   | 0.9       |
| IOS <7       | 0.1       |
| Saf <7       | 0.6       |
| ***total***  | 3.8       |

## Javascript
Site javascript is written in require modules. Each major section of the site has a bundled require module that invokes all the most commonely used modules for that section. For example, if 'module1', 'module2' and 'module3' are used throughout the site, a general 'site-main' bundle file might look like this:

```javascript
define('site-main', ['module1', 'module2', 'module3'],
  function(module1, module2, module3){
    return {
      init: function(){
        module1.init();
        module2.init();
        module3.init();
      }
    };
});
```
In development this file would make require requests for the raw modules, in production it and its dependent modules would be bundled together into one js file.

Two require config files exist to manage the file paths for the development version of each require module and the production version, and each page should be able to switch between the two environments seemlessly.

**Dev:**

```javascript
<script src="/require-config.js"></script>
```
**Production:**

```javascript
<script src="/require-config-min.js"></script>
```
### Init site js
If the site passes the modern browser support test described earlier, we execute the site javascript as below. If we still need to run some js for legacy browsers it can be called outside of the check below.

```html
<script>
  // if device is a modern browser, execute javascript
  if(window.isModernBrowser){
    // load and init main site file
    requirejs(['site-main'], function(page){
      page.init();
      // 3rd party js can be invoked here or in the site-main js module
    });
  }
</script>
```
### Load a component from javascript

```javascript
require(['mycomponent'], function(myComponent){
  // pass dom node and object of paramaters to init function
  myComponent.init(myDiv, {
    myParamOne: 10
    myParamTwo: 'blue'
  })
})
```
### Load a component from markup
To declaratively call the above using html markup, add the components name as a data-component-name attribute, along with its params as data-attributes:

```html
<div data-component-name="mycomponent" data-my-param-one="10" data-my-param-two="blue"></div>

```
## Inlining static files
Css link tags or javascript script tags with the data-inline attribute should inline the contents of their source. If the data-inline attribute points to a source file, then the contents of that file should be inlined instead.

### Inline content of href into a ```<style>``` tag:

```html
 <link rel="stylesheet" href="/css/site-main.css" data-inline>
 ```
 becomes:
 
```html
 <style>/*i am the content of /css/site-main.css*/</style>
 ```
 
### Inline content of data-inline attribute into a ```<style>``` tag:

```html
 <link rel="stylesheet" href="/css/site-main.css" data-inline="/css/min/site-main.css">
 ```
becomes:

```html
 <style>/*i am the content of css/min/site-main.css*/</style>
 ```
 
### Inline content of src into a ```<script>``` tag:

```html
 <script src="/js/site-main.js" data-inline></script>
 ```
becomes:

```html
<script>//i am the content of /js/site-main.js</script>
 ```
 
### Inline content of data-inline into a ```<script>``` tag:

```html
 <script src="/js/site-main.js" data-inline="/js/min/site-main.js"></script>
```
 becomes:

```html
 <script>//i am the content of /js/min/site-main.js</script>
```
