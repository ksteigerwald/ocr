var Contact = require('./iContactInfo');

function iBusinessCardParser(card) {
  Contact.apply(this, arguments);
  /*
  this.card = card;
  if(typeof card === 'string') {
    this.prototype.contact = new Contact(card);
  } else {
    this.prototype.contact = false;
  }
 */
}

iBusinessCardParser.prototype = Contact.prototype;

iBusinessCardParser.prototype.getContactInfo = function(){
  return this.contact;
};

module.exports = iBusinessCardParser;
