if (input.charCodeAt(index) === 47 && input.charCodeAt(index + 1) === 42) {
  // TODO check vvv
  let end = input.indexOf('*/', index),
      search = index;
  while ((search = input.indexOf('\n', search + 1)) !== -1 && search < end) {
    line++;
  }
  // TODO check ^^^
  comment = input.slice(index, end + 2);
} else {
  comment = null;
}
