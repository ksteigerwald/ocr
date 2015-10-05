var expect = require('chai').expect;
var contact = require('../iContactInfo');
describe('iContactInfo', function(){
  it("hsould have foo", function(){
    console.log(contact);
    expect(contact.foo).to.equal('bar');
  });
});
