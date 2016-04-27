module.exports = {
 
  strip: function(string){

    // remove comments
    var configString = '';
    string.split(/\n/).forEach(function(line){
      if(!line.match(/\/\//)){
        configString += line;
      }
    });
    // remove require wrapper
    configString = configString.replace('requirejs.config(', '');
    configString = configString.replace(/;$/, '');
    configString = configString.replace(/\)$/, '');

    return JSON.parse(configString);

  },
  
  wrap: function(object){

    return 'requirejs.config(' + JSON.stringify(object) + ');';

  }
};