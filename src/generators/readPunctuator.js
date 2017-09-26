const punctuators = '{ } / /= ... >= + << ! = >>= ( ; == - >> ~ += >>>= ) , != * >>> && -= &= [ < === % & || *= |= ] > !== ++ | ? %= ^= . <= -- ^ : <<= =>'.split(' ').sort().reverse();

let lines = [];

const $ = (line) => {
  lines.push(line);
}

function getCharCodeMap (punctuators, index) {
  let map = {},
      charCodeToPunctuators = {};
  map.punctuators = punctuators;
  punctuators.forEach(punctuator => {
    if (index == punctuator.length - 1) {
      map[punctuator.charCodeAt(index)] = punctuator;
    } else {
      if (!charCodeToPunctuators[punctuator.charCodeAt(index)]) {
        charCodeToPunctuators[punctuator.charCodeAt(index)] = [];
      }
      charCodeToPunctuators[punctuator.charCodeAt(index)].push(punctuator);
    }
  });
  for (let charCode in charCodeToPunctuators) {
    map[charCode] = getCharCodeMap(charCodeToPunctuators[charCode], index + 1);
    map[charCode].characterCode = charCode;
    map[charCode].parentMap = map;
  }
  if (index === 0) {
    map.characterCode = '*';
  }
  return map;
}

let map = getCharCodeMap(punctuators, 0);

function generate (map, index) {
  if (typeof map === 'string') {
    $('  '.repeat(index * 2) + 'candidate = \'' + map + '\';');
    return;
  }
  $('  '.repeat((index + 0) * 2) + 'switch(input.charCodeAt(index + ' + index + ')) {');
  for (let charCode in map) {
    if (charCode === 'punctuators' || charCode === 'parentMap' || charCode === 'characterCode') {
      continue;
    }
    $('  '.repeat((index + 0) * 2 + 1) + 'case ' + charCode + ':');
    generate(map[charCode], index + 1);
    $('  '.repeat((index + 1) * 2 + 1) + 'break;');
  }
  $('  '.repeat((index + 0) * 2 + 1) + 'default:');
  let readSoFar = '',
      currentMap = map;
  while (currentMap) {
    if (currentMap.characterCode !== '*') {
      readSoFar += String.fromCharCode(currentMap.characterCode);
    }
    currentMap = currentMap.parentMap;
  }
  readSoFar = readSoFar.split('').reverse().join('');
  let searchIndex;
  if ((searchIndex = punctuators.indexOf(readSoFar)) > -1) {
    $('  '.repeat(index * 3 + 1) + 'candidate = \'' + punctuators[searchIndex] + '\';');
    $('  '.repeat(index * 2 + 1) + 'break;');
  } else {
    $('  '.repeat(index * 3 + 1) + 'candidate = null;');
    $('  '.repeat(index * 2 + 1) + 'break;');
  }
  $('  '.repeat((index + 0) * 2) + '}');
}

generate(map, 0);

module.exports = () => {
  return lines.join('\n');
};
