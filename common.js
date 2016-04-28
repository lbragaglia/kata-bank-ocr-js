var fs = require('fs'),
  digits = require('./digits').digits,
  alternatives = require('./digits').alternatives;

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

function parseDigits(accounts) {
  accounts.forEach(function(account) {
    account.number = '';
    account.entries.forEach(function(entry) {
      account.number += digits[entry] || '?';
    })
  });

  return accounts;
}

function parseText(splitEntries) {
  return function(text) {
    return parseDigits(splitEntries(text))
  }
}

function addStatus(accounts) {
  accounts.forEach(function(account) {
    account.status = getStatus(account.number);
  });

  return accounts;
}

function resolve(accounts) {
  accounts.forEach(function(account) {
    if (getStatus(account.number)) {
      account.alternatives = [];
      for (i = 0; i < account.number.length; i++) {
        if (account.number[i] === '?') {
          Object.keys(digits).forEach(function(altEntry) {
            var altKey = account.entries.slice(0, i) + altEntry + account.entries.slice(i);
            console.log(diff(account.entries[i], altEntry));
            if (diff(account.entries[i], altEntry).length == 1) {
              var alternative = digits[altKey];
              if (isValid(alternative)) account.alternatives.push(alternative);
            }
          });
        } else {
          alternatives[parseInt(account.number[i], 10)].forEach(function(altDigit) {
            var alternative = account.number.slice(0, i) + altDigit + account.number.slice(i + 1);
            if (isValid(alternative)) account.alternatives.push(alternative);
          });
        }
      }
      if (account.alternatives.length == 0) {
        accounts.status = 'ILL';
      } else if (account.alternatives.length == 1) {
        account.number = account.alternatives[0];
        account.status = '';
      } else {
        account.status = 'AMB';
      }
    }
  });

  return accounts;
}

function print(accounts) {
  var result = [];
  accounts.forEach(function(account) {
    var row = account.number + (account.status ? ' ' + account.status : '')
    if (account.status == 'AMB') {
      row += " ['" + account.alternatives.join("', '") + "']"
    }
    result.push(row);
  });
  return result;
}

function diff(text1, text2) {
  var charDiff = [];
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
  resolve: resolve,
  print: print,
  diff: diff
}