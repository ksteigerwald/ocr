var compose = require('./compose');

var TOKENS = {
  mi: 'ike,chael,ca',
  kr: 'is'
};

function Tokenizer(){
  this.keys = Object.keys(TOKENS);
}

var tokenizer = new Tokenizer();

tokenizer.parse = function(string){
  return this.keys.reduce(function(token){
    var chunk = string.toLowerCase().split(token);
    if(chunk.length > 0) return chunk;
  });
};

module.exports = tokenizer;
