var fs = require('fs');
var digits = require('./digits')();

module.exports = {
  name: 'Regexp',
  parse: parse,
  parseFile: function(filename) {
    return parse(fs.readFileSync(filename).toString())
  }
}

function parse(text) {
  var numbers = [];

  var digit = /(...)[ _|\r\n]{24}(...)[ _|\r\n]{24}(...)[ _|\r\n]{24}(...)/g;
  var match;
  text = text.replace(/\n/g, '');
  var i = 0;
  var account = 0;
  while ((match = digit.exec(text)) !== null) {
    var key = match[1] + match[2] + match[3] + match[4];
    account = Math.floor(i / 9)
    numbers[account] = (numbers[account] || '') + digits[key];
    digit.lastIndex = 3 * ++i;
  }

  return numbers;
}