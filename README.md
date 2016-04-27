# SDC Site base

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
  build-scripts.sh

package.json  
require-config.js  
require-config-min.js  

## Head

### Meta, link and jsonp data (to be agreed with Spencer)
Include schema.org jsonp object for Organization

### Site section css file
Include one bundled css file per major site section. Max unminified css size 100k.

### One head.js file, inlined in production
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
The test is based on deetction of two browser apis - page visibility and CSS.supports. All modern browsers support one or both of these, whereas legacy browsers such as IE8, 9 and old android do not.

## Support
Browsers that do not pass the above test will not recieve site javascript and may thus lack some functionailty. However, the main text of each page should still be readable and there should be a basic, useable navigation.


| Yes          | Support % |
| :----------  | :------   |
| IE10         | 0.51      |
| IE11         | 7.9       | 
| Edge         | 2.7       |
| IE Mob 10+   | 1.0       |
| And 4.4+     | 14.2      |
| IOS 7+       | 22.7      |
| FF-10+       | 7.1       |
| Chrome-10+   | 27.9      |
| Saf 7+       | 4.2       |
| Opera-2+     | 0.62      |
| other        | 2.18      |
| ***total***  | 91.1      |

| No           | Support % |
| :----------  | :----     |
| IE8          | 0.52      |
| IE9          | 0.6       |
| And 4.3<     | 1.9       |
| IOS 6<       | 0.1       |
| FF-3<        | 0.3       |
| Chrome-3<    | 0.9       |
| Saf 6<       | 0.6       |
| Opera Mini   | 1         |
| ***total***  | 8.9       |
*Stats based on caniuse.com UK values

## Javascript
Site javascript is written in require modules. Each major section of the site would have a bundled require module that involkes all the most commonely used modules for that section. For example, if 'module1', 'module2' and 'module3' are used throughout the site, a general 'site-main' bundle file might look like this:

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
In development this file would require the raw modules, in production it and its dependent modules would be bundled together into one js file.

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
If the site passes the cut the mustard supports test, we execute the site javascript as below. If we still need to run site js for legacy browser it can be called outside of the check below.

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
### Inlining static files
Css link tags or javascript script tags with the data-inline attribute should inline the contents of their source. If the data-inline attribute points to a source file, then the contents of that file should be inlined instead.

#### Inline content of href into a ```<style>``` tag:

```html
 <link rel="stylesheet" href="/css/site-main.css" data-inline>
 ```
 becomes:
 
```html
 <style>/*i am the content of /css/site-main.css*/</style>
 ```
 
#### Inline content of data-inline attribute into a ```<style>``` tag:

```html
 <link rel="stylesheet" href="/css/site-main.css" data-inline="/css/min/site-main.css">
 ```
becomes:

```html
 <style>/*i am the content of css/min/site-main.css*/</style>
 ```
 
#### Inline content of src into a ```<script>``` tag:

```html
 <script src="/js/site-main.js" data-inline></script>
 ```
becomes:

```html
<script>//i am the content of /js/site-main.js</script>
 ```
 
#### Inline content of data-inline into a ```<script>``` tag:

```html
 <script src="/js/site-main.js" data-inline="/js/min/site-main.js"></script>
```
 becomes:

```html
 <script>//i am the content of /js/min/site-main.js</script>
```
