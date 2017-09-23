const fs = require('fs');

const UglifyJS = require('uglify-es');

let tokenizer = fs.readFileSync('./tokenizer.js').toString();

const _isNewline = require('./codeGenerators/gen__isNewline.js')();
const _isWhitespace = require('./codeGenerators/gen__isWhitespace.js')();
const _readPunctuator = require('./codeGenerators/gen__readPunctuator.js')();
const _readIdentifier = require('./codeGenerators/gen__readIdentifier.js')();

tokenizer = tokenizer.replace(/\/\*\#\_isNewline\*\//g, _isNewline);
tokenizer = tokenizer.replace('/*#_isWhitespace*/', _isWhitespace);
tokenizer = tokenizer.replace('//#_readPunctuator', _readPunctuator);
tokenizer = tokenizer.replace('//#_readIdentifier', _readIdentifier);

fs.writeFileSync('dist/out.js', tokenizer);
fs.writeFileSync('dist/out.min.js', UglifyJS.minify(tokenizer).code);
