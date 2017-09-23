  var a = `_readIdentifier () {
    let index = this.currentIndex;
    for (let length = this.input.length; index < length;) {
      if (index == this.currentIndex) {
        if (/[a-zA-Z]/.test(this.input[index])) {
          index++;
        } else {
          break;
        }
      } else {
        if (/[0-9a-zA-Z]/.test(this.input[index])) {
          index++;
        } else {
          break;
        }
      }
    }
    if (index == this.currentIndex) {
      return null;
    }
    return this.input.substring(this.currentIndex, index);
  }

`
const 

let lines = [];

const $ = (line) => {
  lines.push(line);
}

$('_readIdentifier () {');
$('  let index = this.currentIndex;');

let clauses = [];

// https://stackoverflow.com/a/10073788
function toString (number) {
  let str = number.toString(16);
  return '0x' + str.length >= 4 ? str : new Array(4 - str.length + 1).join('0') + str;
}

newlineCodes.forEach(code => {
  clauses.push('code === ' + '0x' + toString(code));
});
$('  return ' + clauses.join(' || ') + ';');
$('}');

module.exports = () => {
  return lines.join('\n');
};
