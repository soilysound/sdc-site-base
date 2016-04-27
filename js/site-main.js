// SITE-MAIN
// ================
define('site-main', [
  
  // add files to load on page load
  'component-loader',
  'header',

  // add files to bundle to be called after page load
  'example'
  ],
function(
  componentLoader
  ){
  return {
    init: function(){
      componentLoader.init();
    }
  };
});
