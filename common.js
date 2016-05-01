'use strict';

var fs = require('fs'),
  digits = require('./digits').digits,
  alternatives = require('./digits').alternatives;

function isValid(account) {
  return getChecksum(account) === 0;
}

function getChecksum(account) {
  return account.split('').reduceRight(function(prev, curr, i) {
    // note: curr may be '?' (implicit coercion to number)
    return prev + curr * (9 - i);
  }, 0) % 11;
}

function getStatus(account) {
  if (account.indexOf('?') !== -1) return 'ILL';
  if (!isValid(account)) return 'ERR';
  return '';
}

function fromFile(filename) {
  return fs.readFileSync(filename).toString();
}

function parseFile(parse) {
  return function(filename) {
    return parse(fromFile(filename));
  };
}

function parseAccount(entries) {
  var account = '';
  entries.forEach(function(entry) {
    account += digits[entry] || '?';
  })
  return account;
}

function parseDigits(accounts) {
  accounts.forEach(function(account) {
    account.number = parseAccount(account.entries);
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

function spliceEntries(entries, pos, replacement) {
  return entries.slice(0, pos).concat(replacement).concat(entries.slice(pos + 1))
}

function collectAlternatives(entries, pos, alternatives, max, getSimilarDigits) {
  // end recursion
  if (pos >= entries.length) {
    var alternative = parseAccount(entries);
    if (isValid(alternative)) alternatives.push(alternative);
    return;
  }
  
  // TODO deve prendere in considerazione se l'entry corrente è illeggibile '?'
  // (e quindi evitare di usarla) e calcolare max solo su quelle leggibili
  
  // recurse with original digits
  collectAlternatives(entries, pos + 1, alternatives, max, getSimilarDigits);
  if (max <= 0) return;
  // recurse with alternative digits
  getSimilarDigits(entries[pos]).forEach(function(entry) {
    collectAlternatives(spliceEntries(entries, pos, entry), pos + 1, alternatives, max - 1, getSimilarDigits);
  });
}

// try to resolve only one error per account
function resolve(accounts) {
  return _resolve(accounts, function(account) {
    for (var i = 0; i < account.number.length; i++) {
      if (account.number[i] === '?') {
        Object.keys(digits).forEach(function(altEntry) {
          if (account.entries[i] == altEntry) return;
          if (diff(account.entries[i], altEntry).length == 1) {
            var alternative = account.number.slice(0, i) + digits[altEntry] + account.number.slice(i + 1);
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
  });
}

// explore the whole space of alternatives (fix even multiple read errors, i.e. errors occurred on different positions)
function resolveMultiple(accounts, maxFixesPerAccount) {
  if (!(maxFixesPerAccount >= 0)) maxFixesPerAccount = 9;
  return _resolve(accounts, function(account) {
    collectAlternatives(account.entries, 0, account.alternatives, maxFixesPerAccount, function(entry) {
      return Object.keys(digits).filter(function(altEntry) {
        return diff(entry, altEntry).length == 1
      });
    });
  });
}

// template function with injected strategy
function _resolve(accounts, strategy) {
  accounts.forEach(function(account) {
    if (isValid(account.number)) {
      //console.log('Skipping resolve: account number ' + account.number + ' is valid');
      return;
    }
    account.alternatives = [];
    strategy(account);
    if (account.alternatives.length == 0) {
      //console.log('No alternatives found');
      accounts.status = 'ILL';
    } else if (account.alternatives.length == 1) {
      //console.log('Found exactly 1 alternative');
      account.number = account.alternatives[0];
      account.status = '';
    } else {
      //console.log('Found ' + account.alternatives.length + ' alternatives');
      account.alternatives.sort();
      account.status = 'AMB';
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

// main logic for the entry variant (alternative) detection
function diff(text1, text2) {
  var charDiff = [],
    i;
  for (i = 0; i < text1.length && i < text2.length; i++) {
    if (text1[i] !== text2[i]) charDiff.push(text1[i]);
  }
  //console.log('Diffing ' + (digits[text1] || '?') + ' against ' + (digits[text2] || '?') + ': ' + charDiff.length);
  return charDiff;
}

module.exports = {
  isValid: isValid,
  getStatus: getStatus,
  parseFile: parseFile,
  parseText: parseText,
  addStatus: addStatus,
  resolve: resolve,
  resolveMultiple: resolveMultiple,
  print: print,
  diff: diff
}