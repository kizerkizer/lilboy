const fs = require('fs');

const beautify = require('js-beautify');
//const UglifyJS = require('uglify-js');

const isNewline = require('./generators/isNewline.js');
const isWhitespace = require('./generators/isWhitespace.js');
const stringSearch = require('./generators/stringSearch.js');
const readPunctuator = require('./generators/readPunctuator.js');

const generators = {
  'skipWhitespaceAndComments': {
    generate: () => fs.readFileSync('skipWhitespaceAndComments.js').toString()
  },
  'isNewline': {
    generate: isNewline
  },
  'isWhitespace': {
    generate: isWhitespace
  },
  'readComment': {
    generate: () => fs.readFileSync('readComment.js').toString()
  },
  'readMultilineComment': {
    generate: () => fs.readFileSync('readMultilineComment.js').toString()
  },
  'stringSearchSingle': {
    generate: () => {
      return stringSearch('single');
    }
  },
  'stringSearchDouble': {
    generate: () => {
      return stringSearch('double');
    }
  },
  'readPunctuator': {
    generate: () => readPunctuator()
  },
  'readIdentifier': {
    generate: () => fs.readFileSync('readIdentifier.js').toString()
  },
  'readString': {
    generate: () => fs.readFileSync('readString.js').toString()
  },
  'tokenizer': {
    generate: () => fs.readFileSync('tokenizerClass.js').toString()
  },
  'readNumber': {
    generate: () => fs.readFileSync('readNumber.js').toString()
  },
  'readRegex': {
    generate: () => fs.readFileSync('readRegex.js').toString()
  }
};


let tokenizer = generators.tokenizer.generate();

let i = 0;

while (tokenizer.indexOf('/*#') > -1 && i < 100) {
  for (let generator in generators) {
    tokenizer = tokenizer.replace('/*#' + generator + '*/', generators[generator].generate());
  }
  i++;
}

fs.writeFileSync('../dist/lilboy.js', tokenizer);
