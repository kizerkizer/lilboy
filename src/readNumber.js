let noPointYet = true;
i = index;
if ((input.charCodeAt(i + 1) === 120 || input.charCodeAt(i + 1) === 88) && input.charCodeAt(i) === 48) { // hex
  i += 2;
  for (let code, length = input.length; i < length; ) {
    code = input.charCodeAt(i);
    if ((code >= 48 && code <= 57) || (code >= 65 && code <= 70) || (code >= 97 && code <= 102)) {
      i++;
    } else {
      break;
    }
  }
  candidate = input.slice(index, i);
} else if ((input.charCodeAt(i + 1) === 111 || input.charCodeAt(i + 1) === 79) && input.charCodeAt(i) === 48) { // octal
  i += 2;
  for (let code, length = input.length; i < length; ) {
    code = input.charCodeAt(i);
    if (code >= 48 && code <= 55) {
      i++;
    } else {
      break;
    }
  }
  candidate = input.slice(index, i);
} else if ((input.charCodeAt(i + 1) === 98 || input.charCodeAt(i + 1) === 66) && input.charCodeAt(i) === 48) { // binary
  i += 2;
  for (let code, length = input.length; i < length; ) {
    code = input.charCodeAt(i);
    if (code === 48 || code === 49) {
      i++;
    } else {
      break;
    }
  }
  candidate = input.slice(index, i);
} else {
  // decimal? TODO decimal integer
  let code,
      length = input.length;
  code = input.charCodeAt(i);
  for (let code, length = input.length; i < length; ) {
    code = input.charCodeAt(i);
    if (code >= 48 && code <= 57) {
      i++;
    } else if (code === 46 && noPointYet) {
      noPointYet = false;
      i++;
    } else if (code === 46) {
      throw new Error('two points');
    } else {
      break;
    }
  }
  if (i == index) {
    candidate = null;
  } else {
    candidate = input.slice(index, i);
  }
}
