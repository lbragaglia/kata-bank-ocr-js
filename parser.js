var digits = require('./digits').digits,
  parseFile = require('./common').parseFile,
  isValid = require('./common').isValid;

module.exports = {
  name: 'Simple',
  parse: parse,
  parseFile: parseFile(parse)
}

function parseChars(text) {
  var lines = text.split('\n'),
    numbers = [],
    l, i, d, key;

  for (l = 0; l < lines.length; l += 4) {
    if (lines[l].length != 27) throw new Error('Wrong length [' + lines[l].length + '] of line ' + l);
    if (lines.length - l < 4) break;

    i = numbers.length; //Math.floor(l / 4)
    numbers[i] = [];
    for (d = 0; d < 27; d += 3) {
      numbers[i].push(lines[l].slice(d, d + 3) +
        lines[l + 1].slice(d, d + 3) +
        lines[l + 2].slice(d, d + 3) +
        lines[l + 3].slice(d, d + 3));
    }
  }

  return numbers;
}

function parseDigits(accounts) {
  var numbers = [];

  accounts.forEach(function(account) {
    var number = '';
    account.forEach(function(entry) {
      number += digits[entry] || '?';
    })
    numbers.push(number);
  });

  return numbers;
}

function parse(text) {
  return parseDigits(parseChars(text))
}