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
    expect(parsed[0]).to.equal('mike');
    expect(parsed[1]).to.equal('borat');
  });
  it("ensure special chars are stripped", function(){
    var parsed = Tokenizer.parse('Somone named Mike, is related to Borat.');
    expect(parsed[0]).to.equal('mike');
    expect(parsed[1]).to.equal('borat');
  });
});

describe('pattern matches', function(){
  it("should parse a phone number from a string", function(){
    var str= "Phone number: (420)555-1234 is free to take your call";
    var exp = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

    expect(str.replace(exp, "foo")).to.equal('555');
  });
})
