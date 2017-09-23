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

  // TODO support other unicode characters
  _readSimpleIdentifier () {
    let index = this.currentIndex,
        currentIndex = this.currentIndex,
        input = this.input;
    for (let code, length = this.input.length; index < length; ) {
      code = input.charCodeAt(index);
      if (index == currentIndex) {
        if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90) || code === 36 || code === 95) {
          index++;
        } else {
          break;
        }
      } else {
        if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90) || (code >= 48 && code <= 57) || code === 36 || code === 95) {
          index++;
        } else {
          break;
        }
      }
    }
    if (index == currentIndex) {
      return null;
    }
    return input.substring(currentIndex, index);
  }

  _readIntegerOrSimpleFloat () {
    let index = this.currentIndex,
        currentIndex = this.currentIndex,
        input = this.input,
        noPointYet = true;
    for (let code, length = this.input.length; index < length; ) {
      code = input.charCodeAt(index);
      if (code >= 48 && code <= 57) {
        index++;
      } else if (code === 46 && noPointYet) {
        noPointYet = false;
        index++;
      } else if (code === 46) {
        throw new Error('two points');
      } else {
        break;
      }
    }
    if (index == this.currentIndex) {
      return null;
    }
    return input.substring(this.currentIndex, index);
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

    // skip whitespace, newlines, comments
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

    // try to read a regex literal
    let regex = this._readRegex();
    if (regex) {
      this.currentIndex += regex.length;
      return {
        done: false,
        value: {
          type: 'regex',
          value: regex
        }
      };
    }

    // try to read a punctuator
    let punctuator = this._readPunctuator();
    if (punctuator) {
      this.currentIndex += punctuator.length;
      return {
        done: false,
        value: {
          type: 'punctuator',
          value: punctuator
        }
      };
    }

    // try to read an identifier
    let identifier = this._readSimpleIdentifier();
    if (identifier) {
      this.currentIndex += identifier.length;
      return {
        done: false,
        value: {
          type: 'identifier',
          value: identifier
        }
      };
    }

    // try to read a string literal
    let string = this._readString();
    if (string) {
      this.currentIndex += string.length;
      return {
        done: false,
        value: {
          type: 'string',
          value: string
        }
      };
    }

    // try to read a number literal
    let number = this._readIntegerOrSimpleFloat();
    if (number) {
      this.currentIndex += number.length;
      return {
        done: false,
        value: {
          type: 'number',
          value: number
        }
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
