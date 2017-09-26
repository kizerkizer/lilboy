class Tokenizer {
  constructor (input) {
    this.input = input;
    this.currentIndex = 0;
    this.currentLine = 1;
    this.lastReadToken = null;
  }

  _isKeyword (string) {
    return string === 'var' || string === 'if' || string === 'this' || string === 'for' || string === 'while' || string === 'break' || string === 'case' || string === 'catch' || string === 'class' || string === 'const' || string === 'continue' || string === 'debugger' || string === 'default' || string === 'delete' || string === 'do' || string === 'else' || string === 'export' || string === 'extends' || string === 'finally' || string === 'function' || string === 'import' || string === 'in' || string === 'instanceof' || string === 'new' || string === 'return' || string === 'super' || string === 'switch' || string === 'throw' || string === 'try' || string === 'typeof' || string === 'void' || string === 'with' || string === 'yield';
  }

  // _readPunctuator () : String | null (generated)

//#_readPunctuator

  // _readKeyword () : String | null (generated)

//#_readKeyword

  _isIdentifierFirstCharUnicode(code) {
    return false; // TODO
  }

  // TODO support other unicode characters
  _readSimpleIdentifier () {
    let index = this.currentIndex,
        currentIndex = this.currentIndex,
        input = this.input,
        code = input.charCodeAt(index);
    // check if valid first char
    if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90) || code === 36 || code === 95 || this._isIdentifierFirstCharUnicode(code)) {
      //index++;
    } else {
      return null;
    }
    // check remaining chars
    // 1
      /*code = input.charCodeAt(index + 1);
      if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90) || (code >= 48 && code <= 57) || code === 36 || code === 95) {
        
      } else {
        return input.slice(currentIndex, index + 1);
      }
    // 2
      code = input.charCodeAt(index + 2);
      if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90) || (code >= 48 && code <= 57) || code === 36 || code === 95) {

      } else {
        return input.slice(currentIndex, index + 2);
      }
    // 3
      code = input.charCodeAt(index + 3);
      if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90) || (code >= 48 && code <= 57) || code === 36 || code === 95) {

      } else {
        return input.slice(currentIndex, index + 3);
      }
    // 4
      code = input.charCodeAt(index + 4);
      if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90) || (code >= 48 && code <= 57) || code === 36 || code === 95) {

      } else {
        return input.slice(currentIndex, index + 4);
      }
    // 5
      code = input.charCodeAt(index + 5);
      if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90) || (code >= 48 && code <= 57) || code === 36 || code === 95) {

      } else {
        return input.slice(currentIndex, index + 5);
      }
    // 6
      code = input.charCodeAt(index + 6);
      if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90) || (code >= 48 && code <= 57) || code === 36 || code === 95) {

      } else {
        return input.slice(currentIndex, index + 6);
      }
    // 7
      code = input.charCodeAt(index + 7);
      if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90) || (code >= 48 && code <= 57) || code === 36 || code === 95) {

      } else {
        return input.slice(currentIndex, index + 7);
      }
    // 8
      code = input.charCodeAt(index + 8);
      if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90) || (code >= 48 && code <= 57) || code === 36 || code === 95) {

      } else {
        return input.slice(currentIndex, index + 8);
      }
    // 9
      code = input.charCodeAt(index + 9);
      if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90) || (code >= 48 && code <= 57) || code === 36 || code === 95) {

      } else {
        return input.slice(currentIndex, index + 9);
      }
    // 10
      code = input.charCodeAt(index + 10);
      if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90) || (code >= 48 && code <= 57) || code === 36 || code === 95) {

      } else {
        return input.slice(currentIndex, index + 10);
      }
    // 11
      code = input.charCodeAt(index + 11);
      if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90) || (code >= 48 && code <= 57) || code === 36 || code === 95) {

      } else {
        return input.slice(currentIndex, index + 11);
      }
    // 12
      code = input.charCodeAt(index + 12);
      if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90) || (code >= 48 && code <= 57) || code === 36 || code === 95) {

      } else {
        return input.slice(currentIndex, index + 12);
      }
    // 13
      code = input.charCodeAt(index + 13);
      if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90) || (code >= 48 && code <= 57) || code === 36 || code === 95) {

      } else {
        return input.slice(currentIndex, index + 13);
      }
    // 14
      code = input.charCodeAt(index + 14);
      if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90) || (code >= 48 && code <= 57) || code === 36 || code === 95) {

      } else {
        return input.slice(currentIndex, index + 14);
      }
    // 15
      code = input.charCodeAt(index + 15);
      if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90) || (code >= 48 && code <= 57) || code === 36 || code === 95) {

      } else {
        return input.slice(currentIndex, index + 15);
      }
    // 16
      code = input.charCodeAt(index + 16);
      if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90) || (code >= 48 && code <= 57) || code === 36 || code === 95) {

      } else {
        return input.slice(currentIndex, index + 16);
      }
    index += 16;*/
    for (let length = this.input.length; index < length; ) {
      code = input.charCodeAt(index);
      if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90) || (code >= 48 && code <= 57) || code === 36 || code === 95) {
        index++;
      } else {
        break;
      }
    }
    return input.slice(currentIndex, index);
  }
  
  _readNumber () {
    let index = this.currentIndex,
        currentIndex = this.currentIndex,
        input = this.input,
        noPointYet = true;
    // hex integer?
    if ((input.charCodeAt(index + 1) === 120 || input.charCodeAt(index + 1) === 88) && input.charCodeAt(index) === 48) {
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
    // octal integer?
    if ((input.charCodeAt(index + 1) === 111 || input.charCodeAt(index + 1) === 79) && input.charCodeAt(index) === 48) {
      index += 2;
      for (let code, length = this.input.length; index < length; ) {
        code = input.charCodeAt(index);
        if (code >= 48 && code <= 55) {
          index++;
        } else {
          break;
        }
      }
      return input.slice(this.currentIndex, index);
    }
    // binary integer?
    if ((input.charCodeAt(index + 1) === 98 || input.charCodeAt(index + 1) === 66) && input.charCodeAt(index) === 48) {
      index += 2;
      for (let code, length = this.input.length; index < length; ) {
        code = input.charCodeAt(index);
        if (code === 48 || code === 49) {
          index++;
        } else {
          break;
        }
      }
      return input.slice(this.currentIndex, index);
    }
    // decimal? TODO decimal integer
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
    let input = this.input,
        index,
        end = this.currentIndex,
        count;
    if (input.charCodeAt(this.currentIndex) === 39) { // '
      for (; ; ) {
        /*#stringSearchSingle*/
        if (end === -1) {
          throw new Error('Open string');
        }
        index = end - 1;
        count = 0;
        while (this.input.charCodeAt(index) === 92) { // \
          index--;
          count++;
        }
        if (count % 2 === 0) {
          return input.slice(this.currentIndex, end + 1);
        } else {
          continue;
        }
     }
    } else if (input.charCodeAt(this.currentIndex) === 34) { // "
      for (; ; ) {
        /*#stringSearchDouble*/
        if (end === -1) {
          throw new Error('Open string');
        }
        index = end - 1;
        count = 0;
        while (this.input.charCodeAt(index) === 92) { // \
          index--;
          count++;
        }
        if (count % 2 === 0) {
          return input.slice(this.currentIndex, end + 1);
        } else {
          continue;
        }
     }
    } else {
      return null;
    }
  }

  _readComment (index) {
    let input = this.input;
    if (input.charCodeAt(index) === 47 && input.charCodeAt(index + 1) === 47) {
      /* #searchNewline*/
      //return this.input.slice(currentIndex, index);
      //return input.slice(currentIndex, index);
      /*if (input.charCodeAt(index + 2) === 10) {
        return input.slice(index, index + 2);
      }
      if (input.charCodeAt(index + 3) === 10) {
        return input.slice(index, index + 3);
      }
      if (input.charCodeAt(index + 4) === 10) {
        return input.slice(index, index + 4);
      }
      if (input.charCodeAt(index + 5) === 10) {
        return input.slice(index, index + 5);
      }
      if (input.charCodeAt(index + 6) === 10) {
        return input.slice(index, index + 6);
      }
      if (input.charCodeAt(index + 7) === 10) {
        return input.slice(index, index + 7);
      }
      if (input.charCodeAt(index + 8) === 10) {
        return input.slice(index, index + 8);
      }*/
      return input.slice(index, input.indexOf('\n', index)); // TODO \n ?
      //return this.input.slice(currentIndex, this._indexOf('\n', currentIndex)); // TODO \n ?
    }
    return null;
  }

  _readMultilineComment (index) {
    let input = this.input;
    if (input.charCodeAt(index) === 47 && input.charCodeAt(index + 1) === 42) {
      // TODO check vvv
      //let endIndex = this._indexOf('*/', index);
      let endIndex = this.input.indexOf('*/', index);
      let search = index;
      while ((search = this.input.indexOf('\n', search + 1)) !== -1 && search < endIndex) { // TODO \n ?
        this.currentLine++;
      }
      // TODO check ^^^
      return this.input.slice(index, endIndex + 2);
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
    for (let index = this.currentIndex, line = this.currentLine, input = this.input, length = this.input.length, comment, code = this.input.charCodeAt(this.currentIndex); ; code = input.charCodeAt(index)) {
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
        line++;
        continue;
      }
      // read single line comment
      //if (input.charCodeAt(index) === 47 && input.charCodeAt(index + 1) === 47) {
        /*# searchNewline*/
        //comment = input.slice(index, input.indexOf('\n', index)); // TODO \n ?
      //} else {
        //comment = null;
      //}
      //if (comment) {
        //index += comment.length;
        //continue;
      //}
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

    // try to read an identifier
    candidate = this._readSimpleIdentifier();
    if (candidate) {
      this.currentIndex += candidate.length;
      return this.lastReadToken = {
        done: false,
        value: {
          type: this._isKeyword(candidate) ? 'keyword' : 'identifier',
          value: candidate,
          line: this.currentLine
        }
      };
    }

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
    candidate = this._readNumber();
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
