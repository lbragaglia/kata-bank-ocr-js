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

function fromFile(filename) {
  return fs.readFileSync(filename).toString();
}

function parseFile(parse) {
  return function(filename) {
    return parse(fromFile(filename));
  };
}

function parseText(splitEntries, parseDigits) {
  return function(text) {
    parseDigits(splitEntries(text))
  }
}

function addStatus(accounts) {
  accounts.forEach(function(account) {
    account.status = getStatus(account.number);
  });

  return accounts;
}

function print(accounts) {
  var result = [];
  accounts.forEach(function(account) {
      result.push(account.number + (account.status ? ' ' + account.status : ''));
  });
return result;
}

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
  parseText: parseText,
  addStatus: addStatus,
  print: print,
  diff: diff
}