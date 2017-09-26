for (let length = this.input.length, comment, code = this.input.charCodeAt(this.currentIndex); ; code = this.input.charCodeAt(this.currentIndex)) {
  if (this.currentIndex >= length) {
    return {
      done: true,
      value: undefined
    };
  }
  if (/*#isWhitespace*/) {
    this.currentIndex++;
    continue;
  }
  if (/*#isNewline*/) {
    this.currentIndex++;
    this.line++;
    continue;
  }
  /*#readComment*/
  if (comment) {
    this.currentIndex += comment.length;
    continue;
  }
  /*#readMultilineComment*/
  if (comment) {
    this.currentIndex += comment.length;
    continue;
  }
  break;
}
