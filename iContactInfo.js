var tokens = require('tokens');

function iContactInfo() {
    this.foo = 'bar';
}
var contact = new iContactInfo();
contact.getName = function(string){

};
module.exports = contact;
