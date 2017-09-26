{
    let code = input.charCodeAt(index),
        currentIndex = index,
        i = index;
    if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90) || code === 36 || code === 95) {
      i++;
      for (let length = input.length; i < length; ) {
        code = input.charCodeAt(i);
        if ((code >= 97 && code <= 122) || (code >= 65 && code <= 90) || (code >= 48 && code <= 57) || code === 36 || code === 95) {
          i++;
        } else {
          break;
        }
      }
      candidate = input.slice(currentIndex, i);
    } else {
      candidate = null;
    }
}
