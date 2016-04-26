var digits = require('./digits')(),
  parseFile = require('./common').parseFile;

module.exports = {
  name: 'Simple',
  parse: parse,
  parseFile: parseFile(parse)
}

function parse(text) {
  var lines = text.split('\n'),
    numbers = [],
    l, i, d, key;

  for (l = 0; l < lines.length; l += 4) {
    if (lines[l].length != 27) throw new Error('Wrong length [' + lines[l].length + '] of line ' + l);
    if (lines.length - l < 4) break;

    i = numbers.length; //Math.floor(l / 4)
    numbers[i] = '';
    for (d = 0; d < 27; d += 3) {
      key = lines[l].slice(d, d + 3) +
        lines[l + 1].slice(d, d + 3) +
        lines[l + 2].slice(d, d + 3) +
        lines[l + 3].slice(d, d + 3);

      numbers[i] += digits[key] || '?';
    }
  }

  return numbers;
}