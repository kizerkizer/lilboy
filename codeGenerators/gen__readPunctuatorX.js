const punctuators = '{ } / /= ... >= + << ! = >>= ( ; == - >> ~ += >>>= ) , != * >>> && -= &= [ < === % & || *= |= ] > !== ++ | ? %= ^= . <= -- ^ : <<= =>'.split(' ').sort().reverse();

let lines = [];

const $ = (line) => {
  lines.push(line);
}

function getCharCodeMap (punctuators, index) {
  let map = {},
      charCodeToPunctuators = {};
  map.punctuators = punctuators;
  //map.characterCode = punctuators[index - 1] ? punctuators[index - 1].charCodeAt(0) : '*';
  punctuators.forEach(punctuator => {
    if (index == punctuator.length - 1) {
      /*if (!map[punctuator.charCodeAt(index)]) {
        map[punctuator.charCodeAt(index)] = [];
      }
      map[punctuator.charCodeAt(index)].push(punctuator);*/
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


$('_readPunctuator () {');
$('  let input = this.input;');
$('  let index = this.currentIndex;');

function generate (map, index) {
  if (typeof map === 'string') {
    return $('  '.repeat(index * 2) + 'return \'' + map + '\';');
  }
  $('  '.repeat((index + 0) * 2) + 'switch(input.charCodeAt(index + ' + index + ')) {');
  for (let charCode in map) {
    if (charCode === 'punctuators' || charCode === 'parentMap' || charCode === 'characterCode') {
      continue;
    }
    $('  '.repeat((index + 0) * 2 + 1) + 'case ' + charCode + ':');
    generate(map[charCode], index + 1);
  }
  /*let punctuatorAtPreviousIndex = null;
  if (!map.parentMap) {

  } else {
    for (let punctuator of map.parentMap.punctuators) {
      if (punctuator.length === index - 1 + 1 && punctuator.charCodeAt(index - 1) === map.characterCode) {
        punctuatorAtPreviousIndex = punctuator;
        break;
      }
    }
  }
  $('  '.repeat((index + 0) * 2 + 1) + 'default:');
  if (!map.parentMap) {
    $('  '.repeat((index + 0) * 3 + 1) + 'return null');
  } else if (punctuatorAtPreviousIndex) {
    //$('  '.repeat(index * 3 + 1) + 'if (input.charCodeAt(' + (index) + ') === ' + punctuatorAtThisIndex.charCodeAt(index) + ') {');
    //$('  '.repeat(index * 4 + 1) + 'return \'' + punctuatorAtThisIndex + '\';');
    //$('  '.repeat(index * 3 + 1) + '} else {');
    //$('  '.repeat(index * 4 + 1) + 'return null;');
    //$('  '.repeat(index * 3 + 1) + '}');
    $('  '.repeat(index * 3 + 1) + 'return \'' + punctuatorAtPreviousIndex + '\';');
    //$('  '.repeat(index * 3 + 1) + '// TODO');
  } else {
    $('  '.repeat((index + 0) * 3 + 1) + 'return null');
  }*/
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
    $('  '.repeat(index * 3 + 1) + 'return \'' + punctuators[searchIndex] + '\';');
  } else {
    //$('  '.repeat(index * 3 + 1) + 'console.log(\'no punctuator\')');
    $('  '.repeat(index * 3 + 1) + 'return null;');
  }
  $('  '.repeat((index + 0) * 2) + '}');
}

generate(map, 0);

$('}');

module.exports = () => {
  return lines.join('\n');
};
