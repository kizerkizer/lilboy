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
      $('      switch (this.input.charCodeAt(this.currentIndex + 1) {');
      for (let i = 1; i < punctuator.length; i++) {
        $('        case ' + punctuator[i].charCodeAt(0) + ':');
        $('          
      }
      $('        default:');
      $('          return new Token(\'punctuator\', \'' + punctuator + '\');');
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
