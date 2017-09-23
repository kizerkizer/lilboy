const fs = require('fs');

const UglifyJS = require('uglify-es');

let tokenizer = fs.readFileSync('./tokenizer2.js').toString();

const _isNewline = require('./codeGenerators/gen__isNewline.js')();
const _isWhitespace = require('./codeGenerators/gen__isWhitespace.js')();
const _readPunctuator = require('./codeGenerators/gen__readPunctuator.js')();

tokenizer = tokenizer.replace('//#_isNewline', _isNewline);
tokenizer = tokenizer.replace('//#_isWhitespace', _isWhitespace);
tokenizer = tokenizer.replace('//#_readPunctuator', _readPunctuator);

fs.writeFileSync('out.js', tokenizer);
fs.writeFileSync('out.min.js', UglifyJS.minify(tokenizer).code);
