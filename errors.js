function ParsingExeption(message) {
  this.message = message;
  this.name = "ParsingError";
}

module.exports = ParsingExeption;
