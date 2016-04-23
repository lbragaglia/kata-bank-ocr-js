var assert = require('chai').assert;
var simple = require('../parser');
var regexp = require('../parser-regex');
var accounts = [
  '000000000', '111111111', '222222222', '333333333', '444444444', '555555555',
  '666666666', '777777777', '888888888', '999999999', '123456789'
];

[simple, regexp].forEach(function(parser) {
  describe('KataBankOCR (parser: ' + parser.name + ')', function() {
    describe('User Story 1', function() {
      accounts.forEach(function(account, i) {
        it('should parse account number ' + account, function() {
          assert.equal(account, parser.parseFile('test/test' + i + '.txt')[0]);
        });
      });
      it('should parse a file of 500 accounts', function() {
        parser.parseFile('test/test11.txt').forEach(function(account, i) {
          assert.equal(accounts[i % 11], account);
        })
      });
    });
    describe('User Story 2', function() {
      it('should check a valid account number', function() {
        assert.isTrue(parser.isValid('345882865'));
      });
      it('should check an invalid account number', function() {
        assert.isFalse(parser.isValid('111111111'));
      });
    });
  });
});