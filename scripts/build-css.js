// BUILD CSS
// ===============

// get dependencies
var fs = require('fs');

//post css modules
require('es6-promise').polyfill();
var postcss = require('postcss');
var postcssimport = require('postcss-import');
var postcssminifier = require('cssnano');
var postcssvars = require('postcss-simple-vars');

// path consts
var CSS_FOLDER = '../css/';
var CSS_MIN_FOLDER = '../css/min/';

// process each css file
fs.readdirSync(CSS_FOLDER).forEach(function(cssPath){

  if(cssPath.match(/\.css/)){
    
    var cssText = fs.readFileSync(CSS_FOLDER + cssPath, 'utf-8').toString();

    postcss()
      .use(postcssimport())
      .use(postcssvars())
      .use(postcssminifier())
      .process(cssText).then(function(css){

        fs.writeFileSync(CSS_MIN_FOLDER + cssPath, css.css, 'utf-8');

      });

  }

});
