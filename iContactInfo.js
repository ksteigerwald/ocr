var Tokenizer = require('./tokens');

function iContactInfo(doc) {
  this.card = doc;
  this.lines = doc.split('\n');
}
var _formatPhoneNumber = function(phone) {
  var phoneNumber = phone.replace(/[a-zA-Z^a-zA-Z ]/g, "");//remove special chars
  console.log(phoneNumber);
  return phoneNumber;
};
var _validPhoneNumber = function(line){
  var pattern = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/g;
  var phoneNumber = line.match(pattern);
  return (phoneNumber && phoneNumber[0].length >= 10 && phoneNumber[0].length <= 12) ? phoneNumber[0] : false;
};
iContactInfo.prototype.getName = function(){
  return this.lines.filter(function(line){
    var name = Tokenizer.parse(line);
    if(name[0]) return line;
  })[0];
};

iContactInfo.prototype.getPhoneNumber = function(phone) {
  var numbers = this.lines.filter(function(line){
    var phoneNumber = _validPhoneNumber(line);
    if(phoneNumber) return phoneNumber;
  });
  return numbers[0];
};

iContactInfo.prototype.getEmailAddress = function() {
  var pattern = /^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}[.](([a-zA-Z0-9]){2,63})+$/;
  return this.lines.filter(function(line){
    if(pattern.test(line)) return line;
  })[0];
};

module.exports = iContactInfo;
