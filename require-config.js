// inline require-config.json
requirejs.config({
  "baseUrl": "",
  "paths": {
    // site js files - change paths to js/min for production
    "site-main": "js/site-main",
    "site-section": "js/site-section",

    // components
    "component-loader": "node_modules/component-loader/dist/js/component",
    "example": "node_modules/example/dist/js/component",
    "header": "node_modules/sky-component-header/dist/js/component"
  }
});