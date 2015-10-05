var expect = require('chai').expect;
var contact = require('../iContactInfo');
var Tokenizer = require('../tokens');
var fs = require("fs");
var file = null;

fs.readFile('../cards/one.txt', 'utf-8', function (err, data) {
  if (err) throw err;
  file = data;
});

describe('tokenizer', function(){
  it("should look for a token match", function(){
    var parsed = Tokenizer.parse('Somone named Mike is related to Borat');
    console.log(parsed);
    expect(parsed[0]).to.equal('bar');
  });

});
