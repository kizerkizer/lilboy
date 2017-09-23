class Token {
  constructor (type, value) {
    this.type = type;
    this.value = value;
  }
}

class Tokenizer {
  constructor (input) {
    this.input = input;
    this.currentIndex = 0;
    this.currentLine = 0;
  }
  // _isNewline (character) : Boolean (generated)

//#_isNewline

  // _isWhitespace (character) : Boolean (generated)

//#_isWhitespace

  // _readPunctuator () : String | null (generated)

//#_readPunctuator

  // TODO generate this:
  _readNumber () {
    let index = this.currentIndex;
    for (let length = this.input.length; index < length;) {
      if (/[0-9]/.test(this.input[index])) {
        index++;
      } else {
        break;
      }
    }
    if (index == this.currentIndex) {
      return null;
    }
    return this.input.substring(this.currentIndex, index);
  }

  _isRegexFirstChar (character) {
    return !this._isNewline(character) && character != '*' && character != '/'; // TODO conform to spec
  }

  _readString () {
    if (this.input[this.currentIndex] == '\'') {
      let end = this.input.indexOf('\'', this.currentIndex + 1);
      if (end === -1) {
        throw new Error('Open string');
      }
      return this.input.substring(this.currentIndex, end + 1);
    }
    if (this.input[this.currentIndex] == '"') {
      let end = this.input.indexOf('"', this.currentIndex + 1);
      if (end === -1) {
        throw new Error('Open string');
      }
      return this.input.substring(this.currentIndex, end + 1);
    }
    return null;
  }

  _readComment () {
    if (this.input[this.currentIndex] == '/' && this.input[this.currentIndex + 1] == '/') {
      return this.input.substring(this.currentIndex, this.input.indexOf('\n', this.currentIndex));
    }
    return null;
  }

  _readMultilineComment () {
    if (this.input[this.currentIndex] == '/' && this.input[this.currentIndex + 1] == '*') {
      return this.input.substring(this.currentIndex, this.input.indexOf('*/', this.currentIndex) + 2);
    }
    return null;
  }

  _readRegex () {
    if (this.input[this.currentIndex] == '/' && this._isRegexFirstChar(this.input[this.currentIndex + 1])) {
      let index = this.currentIndex + 1;
      while (!(this.input[index] == '/' && this.input[index - 1] != '\\')) { // while we are not on an unescaped /
        if (index >= this.input.length) {
          throw new Error('Open regex');
        }
        index++;
      }
      while (this.input[index + 1] == 'g' || this.input[index + 1] == 'i' || this.input[index + 1] == 'm' || this.input[index + 1] == 'u' || this.input[index + 1] == 'y') {
        index++;
      }
      return this.input.substring(this.currentIndex, index + 1);
    }
    return null;
  }

  next () {
    main:
    for (;;) {
      if (this.currentIndex >= this.input.length) {
        return {
          done: true,
          value: undefined
        };
      }
      while (this._isWhitespace(this.input[this.currentIndex])) {
        this.currentIndex++;
      }
      while (this._isNewline(this.input[this.currentIndex])) {
        this.currentIndex++;
        this.currentLine++;
        continue main;
      }
      let regex = this._readRegex();
      if (regex) {
        this.currentIndex += regex.length;
        return {
          done: false,
          value: new Token('regex', regex)
        };
      }
      let comment = this._readComment();
      if (comment) {
        this.currentIndex += comment.length;
        continue;
      }
      let multilineComment = this._readMultilineComment();
      if (multilineComment) {
        this.currentIndex += multilineComment.length;
        continue;
      }
      let punctuator = this._readPunctuator();
      if (punctuator) {
        this.currentIndex += punctuator.length;
        return {
          done: false,
          value: new Token('punctuator', punctuator)
        };
      }

      // read identifier
      let identifier;
      
        let index = this.currentIndex;
        for (let length = this.input.length; index < length;) {
          if (index == this.currentIndex) {
            if (/[a-zA-Z]/.test(this.input[index])) {
              index++;
            } else {
              break;
            }
          } else {
            if (/[0-9a-zA-Z]/.test(this.input[index])) {
              index++;
            } else {
              break;
            }
          }
        }
        if (index == this.currentIndex) {
          identifier = null;
        } else {
          identifier = this.input.substring(this.currentIndex, index);
        }
      
      if (identifier) {
        this.currentIndex += identifier.length;
        return {
          done: false,
          value: new Token('identifier', identifier)
        };
      }

      // end read identifier
      
      let number = this._readNumber();
      if (number) {
        this.currentIndex += number.length;
        return {
          done: false,
          value: new Token('number', number)
        };
      }
      let string = this._readString();
      if (string) {
        this.currentIndex += string.length;
        return {
          done: false,
          value: new Token('string', string)
        };
      }
    }
  }
}

// Iterables are not elegant >:(
module.exports = (input) => {
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

module.exports.Tokenizer = Tokenizer;
