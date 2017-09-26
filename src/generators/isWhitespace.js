const whitespaceCodes = [0x0009, 0x000b, 0x000c, 0x0020, 0x00a0, 0xfeff, 0x1680, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x200a, 0x202f, 0x205f, 0x3000];

let lines = [];

const $ = (line) => {
  lines.push(line);
}

let clauses = [];

// https://stackoverflow.com/a/10073788
function toString (number) {
  let str = number.toString(16);
  return '0x' + str.length >= 4 ? str : new Array(4 - str.length + 1).join('0') + str;
}

whitespaceCodes.forEach(code => {
  clauses.push('code === ' + '0x' + toString(code));
});
$(clauses.join(' || '));

module.exports = () => {
  return lines.join('\n');
};
