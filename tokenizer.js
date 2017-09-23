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
  _readIdentifier () {
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
      return null;
    }
    return this.input.substring(this.currentIndex, index);
  }

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

  _readComment (currentIndex) {
    if (this.input[currentIndex] == '/' && this.input[currentIndex + 1] == '/') {
      return this.input.substring(currentIndex, this.input.indexOf('\n', currentIndex));
    }
    return null;
  }

  _readMultilineComment (currentIndex) {
    let input = this.input;
    if (input.charCodeAt(currentIndex) === 47 && input.charCodeAt(currentIndex + 1) === 42) {
      return this.input.substring(currentIndex, input.indexOf('*/', currentIndex) + 2);
    }
    return null;
  }

  _readRegex () {
    let input = this.input,
        index = this.currentIndex,
        length = this.input.length;
    if (input.charCodeAt(index) === 47 && this._isRegexFirstChar(input[index + 1])) {
      index++;
      while (! (input.charCodeAt(index) === 47 && input.charCodeAt(index - 1) !== 92)) { // while we are not on unescaped /
        if (index > length) {
          throw new Error('Open regex');
        }
        index++;
      }
      while (input.charCodeAt(index + 1) === 103 || input.charCodeAt(index + 1) === 105 || input.charCodeAt(index + 1) === 109 || input.charCodeAt(index + 1) === 117 || input.charCodeAt(index + 1) === 121) {
        index++;
      }
      return input.substring(this.currentIndex, index + 1);
    }
    return null;
  }

  next () {

    for (let index = this.currentIndex, line = this.currentLine, length = this.input.length, comment; ; ) {
      if (index >= length) {
        return {
          done: true,
          value: undefined
        };
      }
      if (this._isWhitespace(this.input[index])) {
        index++;
        continue;
      }
      if (this._isNewline(this.input[index])) {
        index++;
        line++;
        continue;
      }
      if (comment = this._readComment(index)) {
        index += comment.length;
        continue;
      }
      if (comment = this._readMultilineComment(index)) {
        index += comment.length;
        continue;
      }
      this.currentIndex = index;
      break;
    }

    let regex = this._readRegex();
    if (regex) {
      this.currentIndex += regex.length;
      return {
        done: false,
        value: new Token('regex', regex)
      };
    }

    let punctuator = this._readPunctuator();
    if (punctuator) {
      this.currentIndex += punctuator.length;
      return {
        done: false,
        value: new Token('punctuator', punctuator)
      };
    }

    let identifier = this._readIdentifier();
    if (identifier) {
      this.currentIndex += identifier.length;
      return {
        done: false,
        value: new Token('identifier', identifier)
      };
    }

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
