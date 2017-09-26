const fs = require('fs');

const tokenizer = require('./tokenizer');

const code = `
function (foo) {
  return foo + 5;
}
`;

let tokens = tokenizer(code);

function parseExpression () {
  
}
