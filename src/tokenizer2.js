class Tokenizer {
  constructor (input) {
    this.input = input;
    this.index = 0;
    this.line = 0;
    this.lastReadToken = null;
  }
  next () {
      /*#skipWhitespaceAndComments*/
  }
}

module.exports = input => {
  let tokenizer = new Tokenizer(input);
  return {
    [Symbol.iterator] () {
      return {
        next () {
          return tokenizer.next();
        }
      }
    }
  };
};
