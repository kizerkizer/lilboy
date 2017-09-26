const _tokenizer = input => {
  let index = 0,
      line = 1,
      lastReadToken = null,
      i;
  return {
    next: () => {
      /*#skipWhitespaceAndComments*/
      let candidate;
      /*#readRegex*/
      if (candidate) {
        index += candidate.length;
        return lastReadToken = {
          value: {
            type: 'regex',
            value: candidate,
            line
          },
          done: false
        }
      }
      /*#readPunctuator*/
      if (candidate) {
        index += candidate.length;
        return lastReadToken = {
          value: {
            type: 'punctuator',
            value: candidate,
            line
          },
          done: false
        }
      }
      /* #readKeyword*/
      /*#readIdentifier*/
      if (candidate) {
        index += candidate.length;
        return lastReadToken = {
          value: {
            type: 'identifier',
            value: candidate,
            line
          },
          done: false
        }
      }
      /*#readString*/
      if (candidate) {
        index += candidate.length;
        return lastReadToken = {
          value: {
            type: 'string',
            value: candidate,
            line
          },
          done: false
        }
      }
      /*#readNumber*/
      if (candidate) {
        index += candidate.length;
        return lastReadToken = {
          value: {
            type: 'number',
            value: candidate,
            line
          },
          done: false
        }
      }
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
