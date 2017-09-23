const fs = require('fs');

const acorn = require('acorn'),
      esprima = require('esprima'),
      sbs = require('sidebyside');

const tokenizer = require('./dist/out.js');

const simple = `/test/.match('foo');`;

const code = `
// testing 123
function (foo, bar) {
  return foo + a + 355;
  var a, b;
  var baz = "foo";
  /* this is a test */
  var boo = 123 + 'fds';
  /* this is
   * another
   * test
  */
  /test/.match("YOLO!");
  var faz = 'bar';
  return baz + foo + faz - bar || 'baz';
}
`;

//const tabs = fs.readFileSync('./samples/across-tabs.js').toString();
//const somejqueryfile = fs.readFileSync('./samples/somejqueryfile.js').toString();
//const anotherjqueryfile = fs.readFileSync('./samples/anotherjqueryfile.js').toString();
//const jquery = fs.readFileSync('./samples/jquery.js').toString();
const react = fs.readFileSync('./samples/react.js').toString();

const test = react;


let a = [],
    b = [],
    c = [];

console.log('lilboy');
let s = Date.now();
let n = 0;
let tokens;
tokens = tokenizer(test);
  for (token of tokens) { a.push(token); n++; }
console.log(`${Date.now() - s}ms; ${n} tokens`);
console.log('');

console.log('acorn');
n = 0;
s = Date.now();
tokens = acorn.tokenizer(test);
  for (token of tokens) { b.push(token); n++; }
console.log(`${Date.now() - s}ms; ${n} tokens`);
console.log('');

console.log('esprima');
n = 0;
s = Date.now();
tokens = esprima.tokenize(test);
  for (token of tokens) { c.push(token); n++; }
console.log(`${Date.now() - s}ms; ${n} tokens`);
console.log('');

//sbs(a, b);
