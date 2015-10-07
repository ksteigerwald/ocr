var expect = require('chai').expect;
var assert = require("assert");
var contact = require('../iContactInfo');
var Tokenizer = require('../tokens');
var Parser = require('../iBusinessCardParser');
var ParsingExeption = require('../errors');
var fs = require("fs");
var cards=[];
var parser = null;

['one','two','three'].forEach(function(f){
  fs.readFile(__dirname.replace('test', 'cards/'+f+'.txt'), 'utf-8', function (err, data) {
    if (err) throw err;
    cards.push(data);
  });
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
    parser = new Parser(cards[0]);
    parser2 = new Parser(cards[1]);
    parser3 = new Parser(cards[2]);
  });

  it("Should have a card property", function(){
    expect(typeof parser.card).to.equal('string');
  });

  it("should have a contact object", function(){
    expect(parser.contact.lines.length).to.equal(6);
  });

  it("Should return the Full Name of the Contact", function(){
    expect(parser.contact.getName()).to.equal('Mike Smith');
    expect(parser3.contact.getName()).to.equal('Arthur Wilson');
    expect(parser2.contact.getName()).to.equal('Lisa Haung');
  });

  it("Should return the email of the contact", function(){
    expect(parser.contact.getEmailAddress()).to.equal('msmith@asymmetrik.com');
    expect(parser2.contact.getEmailAddress()).to.equal('lisa.haung@foobartech.com');
    expect(parser3.contact.getEmailAddress()).to.equal('awilson@abctech.com');
  });

  it("should return the phone number of the contact", function(){
    expect(parser.contact.getPhoneNumber()).to.equal('(410)555-1234');
    expect(parser2.contact.getPhoneNumber()).to.equal('410-555-1234');
   expect(parser3.contact.getPhoneNumber()).to.equal('703-555-1259');
  });
});
