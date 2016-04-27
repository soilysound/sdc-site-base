// BUILD-JS.JS
// ===============

// get dependencies
var fs = require('fs');
var path = require('path');
var requirejs = require('requirejs');

// get utility functions
var configtools = require('./config-tools.js');

// path consts
var ROOT = path.dirname(__dirname);
var JS_FOLDER = '/js/';
var JS_MIN_FOLDER = '/js/min/';
var JS_FOLDER_PATH = ROOT + JS_FOLDER;
var JS_MIN_FOLDER_PATH = ROOT + JS_MIN_FOLDER;

// get require js config file
var config = fs.readFileSync('../require-config.js', 'utf-8').toString();
config = configtools.strip(config);

// create minified config file
var configMin = JSON.parse(JSON.stringify(config));

// loop from config.paths and process each js file
Object.keys(config.paths).forEach(function(name){

  configMin.paths[name] = JS_MIN_FOLDER + name;

  requirejs.optimize({
    baseUrl: ROOT,
    paths: config.paths,
    out: JS_MIN_FOLDER_PATH + name + '.js',
    name: name
  });

});

fs.writeFileSync(ROOT + '/require-config-min.js', configtools.wrap(configMin), 'utf-8');


