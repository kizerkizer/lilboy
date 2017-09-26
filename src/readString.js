
        let end = index,
        count;
    i = index;
    if (input.charCodeAt(index) === 39) { // '
      for (; ; ) {
        /*#stringSearchSingle*/
        if (end === -1) {
          throw new Error('Open string');
        }
        i = end - 1;
        count = 0;
        while (input.charCodeAt(i) === 92) { // \
          i--;
          count++;
        }
        if (count % 2 === 0) {
          candidate = input.slice(index, end + 1);
          break;
        } else {
          continue;
        }
     }
    } else if (input.charCodeAt(index) === 34) { // "
      for (; ; ) {
        /*#stringSearchDouble*/
        if (end === -1) {
          throw new Error('Open string');
        }
        i = end - 1;
        count = 0;
        while (input.charCodeAt(i) === 92) { // \
          i--;
          count++;
        }
        if (count % 2 === 0) {
          candidate = input.slice(index, end + 1);
          break;
        } else {
          continue;
        }
     }
    } else {
      candidate = null;
    }
