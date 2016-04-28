var digits = require('./digits').digits,
  parseFile = require('./common').parseFile,
  parseText = require('./common').parseText;

module.exports = {
  name: 'Simple',
  parseFile: parseFile(parseText(splitEntries, parseDigits))
}

function splitEntries(text) {
  var lines = text.split('\n'),
    accounts = [],
    l, entries, d;

  for (l = 0; l < lines.length; l += 4) {
    if (lines[l].length != 27) throw new Error('Wrong length [' + lines[l].length + '] of line ' + l);
    if (lines.length - l < 4) break;

    entries = [];
    for (d = 0; d < 27; d += 3) {
      entries.push(lines[l].slice(d, d + 3) +
        lines[l + 1].slice(d, d + 3) +
        lines[l + 2].slice(d, d + 3) +
        lines[l + 3].slice(d, d + 3));
    }
    accounts.push({
      entries: entries
    });
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