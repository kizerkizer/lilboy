const _tokenizer = input => {
  let index = 0,
      line = 1,
      lastReadToken = null;
  return {
    next: () => {
      /*#skipWhitespaceAndComments*/
      let candidate;
      /*#readPunctuator*/
      /*#readKeyword*/
      /*#readIdentifier*/
      /*#readString*/
      /*#readNumber*/
      /*#readRegex*/
    }
  };
};

module.exports = input => {
  let tokenizer = _tokenizer(input);
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
