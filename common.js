var fs = require('fs');

function isValid(account) {
  return account.split('').reduceRight(function(prev, curr, i) {
    return prev + curr * (9 - i);
  }, 0) % 11 === 0;
};

function getStatus(account) {
  if (account.indexOf('?') !== -1) return 'ILL';
  if (!isValid(account)) return 'ERR';
  return '';
};

function parseFile(parse) {
  //return digits(chars(fromFile(filename)));
  return function(filename, showStatus) {
    return parse(fs.readFileSync(filename).toString()).map(function(account) {
      if (isValid(account)) return account;
      return account + (showStatus ? ' ' + getStatus(account) : '');
    })
  }
};

function diff(text1, text2) {
    var charDiff = '';
    for (var i = 0; i < text1.length; i++) {
      if (text1[i] !== text2[i]) charDiff.push(text1[i]);
    }
    return charDiff;
}

module.exports = {
  isValid: isValid,
  getStatus: getStatus,
  parseFile: parseFile,
  diff: diff
}