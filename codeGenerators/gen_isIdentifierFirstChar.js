const commonStartingCharacters = 'abcdefghijklmnopqrstuvwxyz$_ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(character => character.charCodeAt(0));

module.exports = () => {
  let str = '';
  let clauses = [];
  commonStartingCharacters.forEach(code => {
    clauses.push('code === ' + code);
  });
  return clauses.join(' || ');
}
