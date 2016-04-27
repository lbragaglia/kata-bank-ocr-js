var digits = require('./digits').digits,
  parseFile = require('./common').parseFile,
  digit = /(...)[ _|]{24}(...)[ _|]{24}(...)[ _|]{24}(...)/g;

module.exports = {
  name: 'Regexp',
  parse: parse,
  parseFile: parseFile(parse)
}

function parse(text) {
  var numbers = [],
    pos, account;

  text = text.replace(/[\r\n]/g, '');

  for (pos = 0; pos < text.length; pos += 27 * 4) {
    account = '';
    [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(function(i) {
      account += next(text, pos + i * 3) || '?';
    })
    numbers.push(account)
  }
  return numbers;
}

function next(text, pos) {
  digit.lastIndex = pos;
  var match = digit.exec(text);
  if (match === null) return '';

  return digits[match[1] + match[2] + match[3] + match[4]];
}