var expect = require('chai').expect;
var assert = require("assert");
var contact = require('../iContactInfo');
var Tokenizer = require('../tokens');
var Parser = require('../iBusinessCardParser');
var ParsingExeption = require('../errors');
var fs = require("fs");
var file = null;
var parser = null;

fs.readFile(__dirname.replace('test', 'cards/one.txt'), 'utf-8', function (err, data) {
  if (err) throw err;
  console.log(err, data);
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
  it("ensure start of string gets parsed", function(){
    var parsed = Tokenizer.parse('Mike Smith');
     expect(parsed[0]).to.equal('mike');
  });
});

describe('pattern matches', function(){
  /*
  it("should parse a phone number from a string", function(){

    var str= "Phone number: (420)555-1234 is free to take your call";
    var exp = /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

    expect(str.replace(exp, "foo")).to.equal('555');
  });
 */
});

describe('iBusinessCardParser', function(){
  before(function(){
    parser = new Parser(file);
  });

  it("Should have a card property", function(){
    expect(typeof parser.card).to.equal('string');
  });

  it("should have a contact object", function(){
    expect(parser.contact.lines.length).to.equal(6);
  });

  it("Should return the Full Name of the Contact", function(){
    expect(parser.contact.getName()).to.equal('Mike');
  });
});
