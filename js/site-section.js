// SITE-SECTION
// ================
define('site-section', [
  
  // add files to load on page load
  'component-loader',

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
