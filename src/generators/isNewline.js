const newlineCodes = [0x000a, 0x000d, 0x2028, 0x2029];

let clauses = [];

// https://stackoverflow.com/a/10073788
function toString (number) {
  let str = number.toString(16);
  return '0x' + str.length >= 4 ? str : new Array(4 - str.length + 1).join('0') + str;
}

newlineCodes.forEach(code => {
  clauses.push('code === ' + '0x' + toString(code));
});

module.exports = () => {
  return clauses.join(' || ');
};
