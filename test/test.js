var assert = require('chai').assert,
  simple = require('../parser'),
  regexp = require('../parser-regex'),
  isValid = require('../common').isValid,
  accounts = [
    '000000000', '111111111', '222222222', '333333333', '444444444', '555555555',
    '666666666', '777777777', '888888888', '999999999', '123456789'
  ];

[simple, regexp].forEach(function(parser) {
  describe('KataBankOCR (parser: ' + parser.name + ')', function() {
    describe('User Story 1', function() {
      accounts.forEach(function(account, i) {
        it('should parse account number ' + account, function() {
          assert.equal(account, parser.parseFile('test/test1_' + i + '.txt')[0]);
        });
      });
      it('should parse a file of 500 accounts', function() {
        parser.parseFile('test/test1_11.txt').forEach(function(account, i) {
          assert.equal(accounts[i % 11], account);
        })
      });
    });
    describe('User Story 2', function() {
      it('should check a valid account number', function() {
        assert.isTrue(isValid('345882865'));
      });
      it('should check an invalid account number', function() {
        assert.isFalse(isValid('111111111'));
      });
    });
    describe('User Story 3', function() {
      it('should output a valid status for account number 000000051', function() {
        assert.equal('000000051', parser.parseFile('test/test3_1.txt', true));
      });
      it('should output an error status for account number 664371495', function() {
        assert.equal('664371495 ERR', parser.parseFile('test/test3_4.txt', true));
      });
      it('should output an illegible status for account number 49006771?', function() {
        assert.equal('49006771? ILL', parser.parseFile('test/test3_2.txt', true));
      });
      it('should output an illegible status for account number 1234?678?', function() {
        assert.equal('1234?678? ILL', parser.parseFile('test/test3_3.txt', true));
      });
    });
    describe('User Story 4', function() {
      it('should resolve an exact account number for 111111111', function() {
        assert.equal('711111111', parser.parseFile('test/test4_1.txt', true));
      });
      it('should resolve an exact account number for 777777777', function() {
        assert.equal('777777177', parser.parseFile('test/test4_2.txt', true));
      });
      it('should resolve an exact account number for 200000000', function() {
        assert.equal('200800000', parser.parseFile('test/test4_3.txt', true));
      });
      it('should resolve an exact account number for 333333333', function() {
        assert.equal('333393333', parser.parseFile('test/test4_4.txt', true));
      });
    });
  });
});