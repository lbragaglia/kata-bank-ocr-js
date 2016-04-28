var parseText = require('./common').parseText(splitEntries),
  parseFile = require('./common').parseFile,
  digit = /(...)[ _|]{24}(...)[ _|]{24}(...)[ _|]{24}(...)/g;

module.exports = {
  name: 'Regexp',
  parseFile: parseFile(parseText)
}

function splitEntries(text) {
  var accounts = [],
    pos, entries;
  text = text.replace(/[\r\n]/g, '');

  for (pos = 0; pos < text.length; pos += 27 * 4) {
    entries = [];
    [0, 1, 2, 3, 4, 5, 6, 7, 8].forEach(function(i) {
      entries.push(next(text, pos + i * 3));
    })
    accounts.push({
      entries: entries
    });
  }
  return accounts;
}

function next(text, pos) {
  digit.lastIndex = pos;
  var match = digit.exec(text);

  return match === null ? '' : match[1] + match[2] + match[3] + match[4];
}