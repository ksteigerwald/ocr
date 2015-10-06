var tokenizer = require('./tokens');

function iContactInfo() {
}
iContactInfo.prototype.getName = function(string){};
iContactInfo.prototype.getPhoneNumber = function(string) {};
iContactInfo.prototype.getEmailAddress = function() {};
module.exports = iContactInfo;
