let lines = [];

const $ = (line) => {
  lines.push(line);
}

$('_readIdentifier () {');
$('  let index = this.currentIndex;');
$('  let input = this.input;');
$('  for (let length = this.input.length; index < length; ) {');
$('    let code = input.charCodeAt(index);');
$('    if (index === this.currentIndex) {');

let validFirstCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'.split('').map(character => character.charCodeAt(0)); // TODO add more
let validCharacters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_0123456789'.split('').map(character => character.charCodeAt(0)); // TODO add more

let firstCharClauses = validFirstCharacters.map(code => 'code === ' + code);
let charClauses = validCharacters.map(code => 'code === ' + code);

$('      if (' + firstCharClauses.join(' || ') + ') {');
$('        index++;');
$('      } else {');
$('        break;');
$('      }');
$('    } else { ');
$('      if (' + charClauses.join(' || ') + ') {');
$('        index++;');
$('      } else {');
$('        break;');
$('      }');
$('    }');
$('  }');
$('  if (index === this.currentIndex) {');
$('    return null;');
$('  }');
$('  return this.input.substring(this.currentIndex, index);');
$('}');

module.exports = () => {
  return lines.join('\n');
};
