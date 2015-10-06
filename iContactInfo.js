var Tokenizer = require('./tokens');

function iContactInfo(doc) {
  this.card = doc;
  this.lines = doc.split('\n');
}
iContactInfo.prototype.getName = function(string){
  return this.lines.filter(function(line){
    var name = Tokenizer.parse(line);
    console.log('---------------');
    console.log(name, line, typeof line);
    return name;
  });
};
iContactInfo.prototype.getPhoneNumber = function(string) {};
iContactInfo.prototype.getEmailAddress = function() {};
module.exports = iContactInfo;
