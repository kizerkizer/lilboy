for (length = input.length, comment, code = input.charCodeAt(this.currentIndex); ; code = input.charCodeAt(index)) {
  if (index >= length) {
    return {
      done: true,
      value: undefined
    };
  }
  if (/*#isWhitespace*/) {
    index++;
    continue;
  }
  if (/*#isNewline*/) {
    index++;
    line++;
    continue;
  }
  /*#readComment*/
  if (comment) {
    index += comment.length;
    continue;
  }
  /*#readMultilineComment*/
  if (comment) {
    index += comment.length;
    continue;
  }
  this.currentIndex = index;
  break;
}
