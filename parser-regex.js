var fs = require('fs');
var digits = require('./digits')();
var digit = /(...)[ _|]{24}(...)[ _|]{24}(...)[ _|]{24}(...)/g;

module.exports = {
  name: 'Regexp',
  parse: parse,
  parseFile: function(filename) {
    return parse(fs.readFileSync(filename).toString())
  }
}

function parse(text) {
  var numbers = [],
    pos = 0;

  text = text.replace(/[\r\n]/g, '');

  for (pos = 0; pos < text.length; pos += 27 * 4) {
    var account = '';
    [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(function(i) {
      account += next(text, pos + i * 3);
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