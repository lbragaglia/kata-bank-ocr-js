var fs = require('fs');
var digits = init();

module.exports = {
  parse: parse,
  parseFile: function(filename) {
    return parse(fs.readFileSync(filename).toString())
  }
}

console.log(parse(' _  _  _  _  _  _  _  _  _ | || || || || || || || || ||_||_||_||_||_||_||_||_||_|                           '));

function parse(text) {
  var numbers = [];

  var digit = /(...).{30}(...).{1}(...)/g; //(...)[.\n\r]{24}(...)
  var match;
  console.log('before: '+text)
  text=text.replace(/\n/g, '');
  console.log('after: '+text)
  while ((match = digit.exec(text)) !== null) {
    console.log('whole: '+match[0]);
    console.log('digits: '+match[1] + match[2] + match[3])
    digit.lastIndex += 3;
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