module.exports = (target, start, limit) => {
  let code = '';
  const $ = (str) => {
    code += str;
  }
  for (let i = start; i <= limit + start; i++) {
    if (i == start) {
      $('if ')
    } else {
      $('else if');
    }
    $('(input.charAt(currentIndex + ' + i + ') == ' + target + ') {');
    $('  index = ' + 'currentIndex + ' + i + ';');
    $('}');
  }
  $('  else {');
  $('    index = this.input.indexOf(' + target + ', currentIndex + ' + (limit + start + 1) + ')');
  $('  }');
  $('\n');
  return code;
};
