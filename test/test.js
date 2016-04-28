var assert = require('chai').assert,
  simple = require('../parser'),
  regexp = require('../parser-regex'),
  isValid = require('../common').isValid,
  addStatus = require('../common').addStatus,
  print = require('../common').print,
  accounts = [
    '000000000', '111111111', '222222222', '333333333', '444444444', '555555555',
    '666666666', '777777777', '888888888', '999999999', '123456789'
  ];

[simple, regexp].forEach(function(parser) {
  describe('KataBankOCR (parser: ' + parser.name + ')', function() {
    describe('User Story 1', function() {
      accounts.forEach(function(account, i) {
        it('should parse account number ' + account, function() {
          equalNumber(account, 'test/test1_' + i + '.txt', parser);
        });
      });
      it('should parse a file of 500 accounts', function() {
        parser.parseFile('test/test1_11.txt').forEach(function(account, i) {
          assert.equal(accounts[i % 11], account.number);
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
        equalStatus('000000051', 'test/test3_1.txt', parser);
      });
      it('should output an error status for account number 664371495', function() {
        equalStatus('664371495 ERR', 'test/test3_4.txt', parser);
      });
      it('should output an illegible status for account number 49006771?', function() {
        equalStatus('49006771? ILL', 'test/test3_2.txt', parser);
      });
      it('should output an illegible status for account number 1234?678?', function() {
        equalStatus('1234?678? ILL', 'test/test3_3.txt', parser);
      });
    });
    describe('User Story 4', function() {
      it('should resolve an exact account number for 111111111', function() {
        equalStatus('711111111', 'test/test4_1.txt', parser);
      });
      it('should resolve an exact account number for 777777777', function() {
        equalStatus('777777177', 'test/test4_2.txt', parser);
      });
      it('should resolve an exact account number for 200000000', function() {
        equalStatus('200800000', 'test/test4_3.txt', parser);
      });
      it('should resolve an exact account number for 333333333', function() {
        equalStatus('333393333', 'test/test4_4.txt', parser);
      });
    });
  });
});

function equalNumber(account, filename, parser) {
  assert.equal(account, parser.parseFile(filename)[0].number);
}

function equalStatus(account, filename, parser) {
  assert.equal(account, print(addStatus(parser.parseFile(filename)))[0]);
}