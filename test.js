const fs = require('fs');

const acorn = require('acorn'),
      esprima = require('esprima'),
      sbs = require('sidebyside');

const tokenizer = require('./dist/out.min.js');

const basic = '2>>>2';

const simple = `/test/.match('foo');`;

const string = '"foo"\'foo\'\'bar\'';

const strings = `
function bar () {
  var foo = "a string";
  var bar = "another string";
}
`;

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
const somejqueryfile = fs.readFileSync('./samples/somejqueryfile.js').toString();
//const anotherjqueryfile = fs.readFileSync('./samples/anotherjqueryfile.js').toString();
const jquery = fs.readFileSync('./samples/jquery.js').toString();
const react = fs.readFileSync('./samples/react.js').toString();
//const somestrings = fs.readFileSync('./samples/strings.js').toString();
const bunchofcomments = fs.readFileSync('./samples/bunchofcomments.js').toString();
//const lodash = fs.readFileSync('./samples/lodash.min.js').toString();
const angular = fs.readFileSync('./samples/angular.min.js').toString();

const test = code;

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
