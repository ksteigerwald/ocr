var Contact = require('./iContactInfo');

function iBusinessCardParser(card) {
  this.card = card;
  if(typeof card === 'string') {
    this.contact = new Contact(card);
  } else {
    this.contact = false;
  }
}

iBusinessCardParser.prototype.getContactInfo = function(){
  return this.contact;
};

module.exports = iBusinessCardParser;
