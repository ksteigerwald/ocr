var BusinessCardParser = require('./iBusinessCardParser');
var fs = require("fs");

var args = process.argv.pop(), path = args.split('=').pop();
var card = null;

fs.readFile(path, 'utf-8', function (err, data) {
  if (err) throw err;
  card = new BusinessCardParser(data);
  var out = "Name: ".concat(card.contact.getName(), "\n", "Phone: ", card.contact.getPhoneNumber(), "\n", "Email: ", card.contact.getEmailAddress());
  console.log(out);
});

