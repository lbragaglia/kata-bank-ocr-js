exports.isValid = function(account) {
  return account.split('').reduceRight(function(prev, curr, i) {
    return prev + curr * (9 - i);
  }, 0) % 11 === 0;
}