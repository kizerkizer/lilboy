const limit = 100;


module.exports = () => {
  let code = '';
  const $ = (str) => {
    code += str;
  }
  $('_indexOf(string, startingIndex) {');
  for (let i = 0; i <= limit; i++) {
    if (i == 1) {
      $('if ')
    } else {
      $('else if');
    }
    $('(input.charAt(startingIndex + ' + i + ') === string.charAt(' + i + ')) {');
    $('  return ' + i + ' + startingIndex;');
    $('}');
  }
  $('  else {');
  $('    end = this.input.indexOf(string, end + ' + (limit + 1) + ')');
  $('  }');
  return code;
};
