var digits = require('./digits').digits,
  parseFile = require('./common').parseFile,
  parseText = require('./common').parseText,
  digit = /(...)[ _|]{24}(...)[ _|]{24}(...)[ _|]{24}(...)/g;

module.exports = {
  name: 'Regexp',
  parseFile: parseFile(parseText(splitEntries, parseDigits))
}

function splitEntries(text) {
  var accounts = [],
    pos, account;

  text = text.replace(/[\r\n]/g, '');

  for (pos = 0; pos < text.length; pos += 27 * 4) {
    account = '';
    [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(function(i) {
      account += next(text, pos + i * 3);
    })
    accounts.push(account)
  }
  return accounts;
}

function parseDigits(accounts) {
  accounts.forEach(function(account) {
    account.number = '';
    account.entries.forEach(function(entry) {
      account.number += digits[entry] || '?';
    })
  });

  return accounts;
}

function next(text, pos) {
  digit.lastIndex = pos;
  var match = digit.exec(text);
  if (match === null) return '';

  return match[1] + match[2] + match[3] + match[4];
}