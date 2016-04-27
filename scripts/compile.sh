#!/bin/bash
# =================
cd scripts

# build css
echo "Building CSS"
node build-css.js

# build js
echo "Building JS"
node build-js.js

# build template
# echo "Building HTML"
# node build-example.js