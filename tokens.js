var compose = require('./compose');

var TOKENS = {
  mi: 'ike,chael,ca',
  kr: 'is',
  bo: 'b, bby, rat'
};

function Tokenizer(){
  this.keys = Object.keys(TOKENS);
}

var tokenizer = new Tokenizer();

var _findNames = function(keys, str){
  return keys.map(function(token){
    var chunk = str.split(token);

    if(chunk.length > 1){
      chunk.push(token);
      return chunk;
    } else {
      return false;
    }
  });
};

var _purge = function(list) {
  return list.filter(function(match){ return match; });
};

var _matchName = function(list) {
  return list.map(function(sub){
   var key = sub.pop();
   var identity = sub.pop().split(' ')[0];
    return key + identity;
  });
};

tokenizer.parse = function(str){
  var lowered = str.toLowerCase();
  var names = compose(_matchName, _purge,  _findNames)(this.keys, lowered);
  return names;
};

module.exports = tokenizer;
