const limit = 25;

let code = '';

const $ = (str) => {
  code += str;
}

for (let i = 1; i <= limit; i++) {
  if (i == 1) {
    $('if ')
  } else {
    $('else if');
  }
  $('(input.charAt(end + ' + i + ') == \'"\') {');
  $('  end = end + ' + i);
  $('}');
}

$(' else {');
$('    end = this.input.indexOf(\'"\', end + ' + (limit + 1) + ')');
$('  }');

module.exports = () => {
  return code;
};
