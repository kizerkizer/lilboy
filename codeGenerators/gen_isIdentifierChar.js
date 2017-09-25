const commonCharacters = 'abcdefghijklmnopqrstuvwxyz$_ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('').map(character => character.charCodeAt(0));

module.exports = () => {
  let str = '';
  let clauses = [];
  commonCharacters.forEach(code => {
    clauses.push('code === ' + code);
  });
  return clauses.join(' || ');
}
