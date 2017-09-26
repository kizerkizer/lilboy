if (input.getCharCodeAt(index) ===  47 && input.getCharCodeAt(index + 1) === 47) {
  comment = input.slice(index, input.indexOf('\n', index); // TODO
} else {
  comment = null;
}
