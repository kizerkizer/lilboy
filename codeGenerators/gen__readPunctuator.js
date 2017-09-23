const punctuators = '{ } / /= ... >= + << ! = >>= ( ; == - >> ~ += >>>= ) , != * >>> && -= &= [ < === % & || *= |= ] > !== ++ | ? %= ^= . <= _-- ^ : <<= =>'.split(' ').sort().reverse();

let lines = [];

const $ = (line) => {
  lines.push(line);
}

let map = {};

punctuators.forEach(punctuator => {
  if (!map[punctuator.charCodeAt(0)]) {
    map[punctuator.charCodeAt(0)] = [];
  }
  map[punctuator.charCodeAt(0)].push(punctuator);
});

$('_readPunctuator () {');
$('  switch (this.input.charCodeAt(this.currentIndex)) {');
for (let punctuatorPrefix in map) {
  $('    case ' + punctuatorPrefix + ':');
    for (let punctuator of map[punctuatorPrefix]) {
      $('      if (this.input.substring(this.currentIndex, this.currentIndex + ' + punctuator.length + ') === \'' + punctuator + '\') {');
      $('        return \'' + punctuator + '\';');
      $('      }');
    }
    $('      return null;');
}
$('    default:');
$('      return null;');
$('  }');
$('}');

module.exports = () => {
  return lines.join('\n');
};
