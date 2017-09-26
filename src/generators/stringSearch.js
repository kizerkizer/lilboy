const limit = 128;

module.exports = (quote) => {
  let code = '';
  const $ = (str) => {
    code += str;
  }
  if (quote == 'single') {
    quote = 39;
  } else {
    quote = 34;
  }
  for (let i = 1; i <= limit; i++) {
    if (i == 1) {
      $('if ')
    } else {
      $('else if');
    }
    $('(input.charCodeAt(end + ' + i + ') === ' + quote + ') {');
    $('  end = end + ' + i + ';');
    $('}');
  }
  $('  else {');
  $('    end = this.input.indexOf(String.fromCharCode(' + quote + '), end + ' + (limit + 1) + ')');
  $('  }');
  return code;
};
