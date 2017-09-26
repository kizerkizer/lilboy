const fs = require('fs');

const isNewline = require('./generators/isNewline.js');
const stringSearch = require('./generators/stringSearch.js');

const generators = {
  'skipWhitespaceAndComments': {
    generate: () => fs.readFileSync('skipWhitespaceAndComments.js').toString()
  },
  'isNewline': {
    generate: isNewline
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
  }
};
