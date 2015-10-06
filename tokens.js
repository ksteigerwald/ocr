var compose = require('./compose');

var TOKENS = {
  mi: 'ke,chael,ca',
  kr: 'is',
  bo: 'b,bby,rat'
};

function Tokenizer(){
  this.keys = Object.keys(TOKENS);
}

var tokenizer = new Tokenizer();

var _findNames = function(keys, str){
  var line = str.replace(/[^a-zA-Z ]/g, "");//remove special chars
  return keys.map(function(token){
    var chunk = line.split(token);
    if(chunk.length > 1){
      chunk.push(token);
      return chunk;
    } else {
      return false;
    }
  });
};

var _purge = function(list) {
  var purge = list.filter(Boolean);
  return purge.filter(function(match){ return match; });
};

var _possibleLinks = function(list) {
  return list.map(function(sub){
   var key = sub.pop();
   return [key, sub];
  });
};

/*
---------------
  [] 'ASYMMETRIK LTD' 'string'
NAMES: [ '', 'ke s', 'th' ]
*/

var _joiner = function(key, list) {
  var root = key, stems = list.split(',');
  return function(items) {
    //console.log(items,'-----')
    var part = items.split(' ').shift()
    //console.log(root,items,'PART:',part,'Stems:', stems);
    if(stems.indexOf !== -1) {
      return root + part;
    }
  };
};
var _matchName = function(stems){
  return stems.filter(function(stem){
    var k = stem.shift(), v = stem[0], list = TOKENS[k];
    var wordMatches = _joiner(k,list);
    var names = v.filter(wordMatches);
    console.log('NAMES:',names);
    return (list.split(',').indexOf(v) != -1);
  }).map(function(names){
    return names.join('');
  });
};

tokenizer.parse = function(str){
  var lowered = str.toLowerCase();
  var names = compose(_matchName,
                      _possibleLinks,
                      _purge,
                      _findNames)(this.keys, lowered);
  return names;
};

module.exports = tokenizer;
