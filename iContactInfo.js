var Tokenizer = require('./tokens');

function iContactInfo(doc) {
  this.card = doc;
  console.log('---------------');
  console.log(doc.split('\n'));
  this.lines = doc.split('\n');
}
iContactInfo.prototype.getName = function(string){
  return this.lines.filter(function(line){
    var name = Tokenizer.parse(line);
    return name;
  });
};
iContactInfo.prototype.getPhoneNumber = function(string) {};
iContactInfo.prototype.getEmailAddress = function() {};
module.exports = iContactInfo;
