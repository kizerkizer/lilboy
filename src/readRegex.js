function isRegexFirstChar (code) {
  return (!(/*#isNewline*/)) && code !== 42 && code !== 47; // TODO conform to spec
}


    let length = input.length,
        currentIndex = index;
    i = index;
    if (input.charCodeAt(i) === 47 && isRegexFirstChar(input.charCodeAt(i + 1)) && (!lastReadToken || (lastReadToken.value.type !== 'number' && lastReadToken.value.type !== 'identifier' && lastReadToken.value.value !== ')'))) {
      i++;
      while (! (input.charCodeAt(i) === 47 && input.charCodeAt(i - 1) !== 92)) { // while we are not on unescaped /
        if (i > length) {
          throw new Error('Open regex');
        }
        i++;
      }
      while (input.charCodeAt(i + 1) === 103 || input.charCodeAt(i + 1) === 105 || input.charCodeAt(i + 1) === 109 || input.charCodeAt(i + 1) === 117 || input.charCodeAt(i + 1) === 121) {
        i++;
      }
      candidate = input.slice(currentIndex, i + 1);
    } else {
      candidate = null;
    }

