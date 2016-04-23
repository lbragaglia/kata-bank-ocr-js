var fs = require('fs'),
  digits = require('./digits')(),
  isValid = require('./common').isValid;

module.exports = {
  name: 'Simple',
  parse: parse,
  parseFile: function(filename) {
    return parse(fs.readFileSync(filename).toString())
  },
  isValid: isValid
}

function parse(text) {
  var lines = text.split('\n');

  var numbers = [];
  for (var l = 0; l < lines.length; l += 4) {
    if (!lines[l].length) {
      continue;
    }

    if (lines[l].length != 27) {
      throw new Error('Numero di caratteri errato: ' + lines[l].length);
    }
    // saltare ultime righe se rimanenti < 4

    numbers[Math.floor(l / 4)] = '';
    for (var d = 0; d < 27; d += 3) {
      var key = lines[l].slice(d, d + 3) +
        lines[l + 1].slice(d, d + 3) +
        lines[l + 2].slice(d, d + 3) +
        lines[l + 3].slice(d, d + 3);

      numbers[Math.floor(l / 4)] += digits[key];
    }
  }

  return numbers;
}