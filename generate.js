const fs = require('fs');

const UglifyJS = require('uglify-es');

let tokenizer = fs.readFileSync('./tokenizer.js').toString();

const _isNewline = require('./codeGenerators/gen__isNewline.js')();
const _isWhitespace = require('./codeGenerators/gen__isWhitespace.js')();
//const _readPunctuator = require('./codeGenerators/gen__readPunctuator.js')();
const _readPunctuator = require('./codeGenerators/gen__readPunctuatorX.js')();
const _readIdentifier = require('./codeGenerators/gen__readIdentifier.js')();
const isIdentifierFirstChar = require('./codeGenerators/gen_isIdentifierFirstChar.js')();
const isIdentifierChar = require('./codeGenerators/gen_isIdentifierChar.js')();
//const _indexOf = require('./codeGenerators/gen__indexOf.js')();
const stringSearchAny = require('./codeGenerators/gen_stringSearchAny.js');
const search = require('./codeGenerators/gen_search.js');

tokenizer = tokenizer.replace(/\/\*\#\_isNewline\*\//g, _isNewline);
tokenizer = tokenizer.replace('/*#_isWhitespace*/', _isWhitespace);
tokenizer = tokenizer.replace('//#_readPunctuator', _readPunctuator);
tokenizer = tokenizer.replace('//#_readIdentifier', _readIdentifier);
tokenizer = tokenizer.replace(/\/\*\#isIdentifierFirstChar\*\//g, isIdentifierFirstChar);
tokenizer = tokenizer.replace(/\/\*\#isIdentifierChar\*\//g, isIdentifierChar);
//tokenizer = tokenizer.replace('//#_indexOf', _indexOf);
tokenizer = tokenizer.replace('/*#stringSearchSingle*/', stringSearchAny('single'));
tokenizer = tokenizer.replace('/*#stringSearchDouble*/', stringSearchAny('double'));
//tokenizer = tokenizer.replace('/*#stringSearch*/', stringSearchAny('quote'));
tokenizer = tokenizer.replace('/*#searchNewline*/', search('\'\\n\'', 2, 4));
tokenizer = tokenizer.replace('/*#searchMultilineTerminator/', search('\'*/\''));

fs.writeFileSync('dist/out.js', tokenizer);
fs.writeFileSync('dist/out.min.js', UglifyJS.minify(tokenizer).code);
