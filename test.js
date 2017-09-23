const fs = require('fs');

const acorn = require('acorn'),
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

const tabs = fs.readFileSync('./samples/across-tabs.js').toString();
const somejqueryfile = fs.readFileSync('./samples/somejqueryfile.js').toString();
const anotherjqueryfile = fs.readFileSync('./samples/anotherjqueryfile.js').toString();
const jquery = fs.readFileSync('./samples/jquery.min.js').toString();

const test = anotherjqueryfile;


let a = [],
    b = [];

let s = Date.now();
let n = 0;
let tokens;
for (let i = 0; i < 100; i++) {
tokens = tokenizer(test);
  for (token of tokens) { a.push(token.value); n++; }
}
console.log(`${Date.now() - s}ms; ${n} tokens`);

s = Date.now();
n = 0;
for (let i = 0; i < 100; i++) {
tokens = acorn.tokenizer(test);
  for (token of tokens) { b.push(token.type.label); n++; }
}
console.log(`${Date.now() - s}ms; ${n} tokens`);

//sbs(a, b);
