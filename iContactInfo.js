var Tokenizer = require('./tokens');

function iContactInfo(doc) {
  this.card = doc;
  this.lines = doc.split('\n');
}

function _formatPhoneNumber(str, format) {
  var digits = str.replace(/\D/g, '');
  var count = 0;
  return format.replace(/X/g, function() {
    return digits.charAt(count++);
  });
}

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
    return _validPhoneNumber(line);
  });
  return _formatPhoneNumber(numbers[0], 'XXX-XXX-XXXX');
};

iContactInfo.prototype.getEmailAddress = function() {
  var pattern = /^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}[.](([a-zA-Z0-9]){2,63})+$/;
  return this.lines.filter(function(line){
    if(pattern.test(line)) return line;
  })[0];
};

module.exports = iContactInfo;
