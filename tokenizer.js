class Tokenizer {
  constructor (input) {
    this.input = input;
    this.currentIndex = 0;
    this.currentLine = 1;
    this.lastReadToken = null;
  }

  // _readPunctuator () : String | null (generated)

//#_readPunctuator

   /*_indexOf (string, startingIndex) {
    let input = this.input,
        stringLength = string.length,
        index;
    for (let i = startingIndex, j = 0, length = this.input.length; i < length; i++) {
      index = i;
      while (input.charAt(i + j) === string.charAt(j) && j < stringLength) {
        j++;
      }
      if (j === string.length) {
        return index;
      }
      j = 0;
    }
    return -1;
   }*/

  // _indexOf (string, startingIndex) : Number // TODO ?

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
    return input.slice(currentIndex, index);
  }
  
  _readIntegerOrSimpleFloat () {
    let index = this.currentIndex,
        currentIndex = this.currentIndex,
        input = this.input,
        noPointYet = true;
    // hex integer?
    if (input.charCodeAt(index) === 48 && input.charCodeAt(index + 1) === 120) {
      index += 2;
      for (let code, length = this.input.length; index < length; ) {
        code = input.charCodeAt(index);
        if ((code >= 48 && code <= 57) || (code >= 65 && code <= 70) || (code >= 97 && code <= 102)) {
          index++;
        } else {
          break;
        }
      }
      return input.slice(this.currentIndex, index);
    }
    // decimal ?
    let code,
        length = this.input.length;
    code = input.charCodeAt(index);
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
    return input.slice(this.currentIndex, index);
  }

  _isRegexFirstChar (code) {
    return (!(/*#_isNewline*/)) && code !== 42 && code !== 47; // TODO conform to spec
  }

  _readString () {
    if (this.input[this.currentIndex] == '\'') {
      var end = this.currentIndex,
          index,
          count,
          input = this.input;
      for (; ; ) {
        /*#stringSearchSingle*/
        //end = this._indexOf('\'', end + 1);
        if (end === -1) {
          throw new Error('Open string');
        }
        index = end - 1,
        count = 0;
        while (this.input[index] == '\\') {
          index--;
          count++;
        }
        if (count % 2 == 0) {
          break;
        } else {
          continue;
        }
      }
      return this.input.slice(this.currentIndex, end + 1);
    }
    if (this.input[this.currentIndex] == '"') {
      var end = this.currentIndex,
          index,
          count,
          input = this.input;
      for (; ; ) {
        /*#stringSearchDouble*/
        //end = this._indexOf('\'', end + 1);
        if (end === -1) {
          throw new Error('Open string');
        }
        index = end - 1,
        count = 0;
        while (this.input[index] == '\\') {
          index--;
          count++;
        }
        if (count % 2 == 0) {
          break;
        } else {
          continue;
        }
      }
      return this.input.slice(this.currentIndex, end + 1);
    }
    return null;
  }

  _readComment (currentIndex) {
    let index = currentIndex,
        input = this.input;
    if (this.input[currentIndex] == '/' && this.input[currentIndex + 1] == '/') {
      /*searchNewline*/
      //return this.input.slice(currentIndex, index);
      return this.input.slice(currentIndex, this.input.indexOf('\n', currentIndex)); // TODO \n ?
      //return this.input.slice(currentIndex, this._indexOf('\n', currentIndex)); // TODO \n ?
    }
    return null;
  }

  _readMultilineComment (currentIndex) {
    let input = this.input;
    if (input.charCodeAt(currentIndex) === 47 && input.charCodeAt(currentIndex + 1) === 42) {
      // TODO check vvv
      //let endIndex = this._indexOf('*/', currentIndex);
      let endIndex = this.input.indexOf('*/', currentIndex);
      let search = currentIndex;
      while ((search = this.input.indexOf('\n', search + 1)) !== -1 && search < endIndex) { // TODO \n ?
        this.currentLine++;
      }
      // TODO check ^^^
      return this.input.slice(currentIndex, endIndex + 2);
    }
    return null;
  }

  _readRegex () {
    let input = this.input,
        index = this.currentIndex,
        length = this.input.length;
    if (input.charCodeAt(index) === 47 && this._isRegexFirstChar(input.charCodeAt(index + 1)) && (!this.lastReadToken || (this.lastReadToken.value.type !== 'number' && this.lastReadToken.value.type !== 'identifier' && this.lastReadToken.value.value !== ')'))) {
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
      return input.slice(this.currentIndex, index + 1);
    }
    return null;
  }

  next () {

    // skip whitespace, newlines, comments
    for (let index = this.currentIndex, input = this.input, length = this.input.length, comment, code = this.input.charCodeAt(this.currentIndex); ; code = input.charCodeAt(index)) {
      if (index >= length) {
        return {
          done: true,
          value: undefined
        };
      }
      if (/*#_isWhitespace*/) {
        index++;
        continue;
      }
      if (/*#_isNewline*/) {
        index++;
        this.currentLine++;
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

    let candidate;

    // try to read a regex literal
    candidate = this._readRegex();
    if (candidate) {
      this.currentIndex += candidate.length;
      return this.lastReadToken = {
        done: false,
        value: {
          type: 'regex',
          value: candidate,
          line: this.currentLine
        }
      };
    }

    // try to read a punctuator
    candidate = this._readPunctuator();
    if (candidate) {
      this.currentIndex += candidate.length;
      return this.lastReadToken = {
        done: false,
        value: {
          type: 'punctuator',
          value: candidate,
          line: this.currentLine
        }
      };
    }

    // try to read an identifier
    candidate = this._readSimpleIdentifier();
    if (candidate) {
      this.currentIndex += candidate.length;
      return this.lastReadToken = {
        done: false,
        value: {
          type: 'identifier',
          value: candidate,
          line: this.currentLine
        }
      };
    }

    // try to read a string literal
    candidate = this._readString();
    if (candidate) {
      this.currentIndex += candidate.length;
      return this.lastReadToken = {
        done: false,
        value: {
          type: 'string',
          value: candidate,
          line: this.currentLine
        }
      };
    }

    // try to read a number literal
    candidate = this._readIntegerOrSimpleFloat();
    if (candidate) {
      this.currentIndex += candidate.length;
      return this.lastReadToken = {
        done: false,
        value: {
          type: 'number',
          value: candidate,
          line: this.currentLine
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
