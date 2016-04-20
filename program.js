var fs = require('fs');
var digits = init();

module.exports = {
  parse: parse,
  parseFile: function(filename) {
    return parse(fs.readFileSync(filename).toString())
  }
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

function init() {
  var digits = {},
    _0 =
    ' _ ' +
    '| |' +
    '|_|' +
    '   ',
    _1 =
    '   ' +
    '  |' +
    '  |' +
    '   ',
    _2 =
    ' _ ' +
    ' _|' +
    '|_ ' +
    '   ',
    _3 =
    ' _ ' +
    ' _|' +
    ' _|' +
    '   ',
    _4 =
    '   ' +
    '|_|' +
    '  |' +
    '   ',
    _5 =
    ' _ ' +
    '|_ ' +
    ' _|' +
    '   ',
    _6 =
    ' _ ' +
    '|_ ' +
    '|_|' +
    '   ',
    _7 =
    ' _ ' +
    '  |' +
    '  |' +
    '   ',
    _8 =
    ' _ ' +
    '|_|' +
    '|_|' +
    '   ',
    _9 =
    ' _ ' +
    '|_|' +
    ' _|' +
    '   ';

  digits[_0] = '0';
  digits[_1] = '1';
  digits[_2] = '2';
  digits[_3] = '3';
  digits[_4] = '4';
  digits[_5] = '5';
  digits[_6] = '6';
  digits[_7] = '7';
  digits[_8] = '8';
  digits[_9] = '9';

  return digits;
}