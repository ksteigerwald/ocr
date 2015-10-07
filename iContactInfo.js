var Tokenizer = require('./tokens');

function iContactInfo(doc) {
  this.card = doc;
  this.lines = doc.split('\n');
}
iContactInfo.prototype.getName = function(string){
  return this.lines.filter(function(line){
    var name = Tokenizer.parse(line);
    console.log(name[0], line);
    if(name[0]) return line;
  })[0];
};
iContactInfo.prototype.getPhoneNumber = function(string) {};
iContactInfo.prototype.getEmailAddress = function() {};
module.exports = iContactInfo;
