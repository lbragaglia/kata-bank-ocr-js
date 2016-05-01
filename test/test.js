var assert = require('chai').assert,
  simple = require('../parser'),
  regexp = require('../parser-regex'),
  isValid = require('../common').isValid,
  addStatus = require('../common').addStatus,
  print = require('../common').print,
  resolve = require('../common').resolve,
  resolveMultiple = require('../common').resolveMultiple,
  diff = require('../common').diff,
  _0 = require('../digits')._0,
  _1 = require('../digits')._1,
  _7 = require('../digits')._7,
  accounts = [
    '000000000', '111111111', '222222222', '333333333', '444444444', '555555555',
    '666666666', '777777777', '888888888', '999999999', '123456789'
  ];

[simple, regexp].forEach(function(parser) {
  describe('KataBankOCR (parser: ' + parser.name + ')', function() {
    describe('User Story 1 - parsing', function() {
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
    describe('User Story 2 - checksum', function() {
      it('should check a valid account number 345882865', function() {
        assert.isTrue(isValid('345882865'));
      });
      it('should check a valid account number 200800000', function() {
        assert.isTrue(isValid('200800000'));
      });
      it('should check a valid account number 260000000', function() {
        assert.isTrue(isValid('260000000'));
      });
      it('should check an invalid account number 111111111', function() {
        assert.isFalse(isValid('111111111'));
      });
      it('should check an invalid account number 34588286?', function() {
        assert.isFalse(isValid('34588286?'));
      });
      it('should check a valid account number 899999999', function() {
        assert.isTrue(isValid('899999999'));
      });
    });
    describe('User Story 3 - status', function() {
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
    describe('User Story 4 - fix errors', function() {
      it('should diff 1 char for 1 and 7', function() {
        assert.equal(1, diff(_1, _7).length);
      });
      it('should diff 3 char for 0 and 7', function() {
        assert.equal(3, diff(_0, _7).length);
      });
      it('should diff 4 char for 0 and 1', function() {
        assert.equal(4, diff(_0, _1).length);
      });
      it('should resolve an exact account number for 111111111', function() {
        equalResolve('711111111', 'test/test4_1.txt', parser);
      });
      it('should resolve an exact account number for 777777777', function() {
        equalResolve('777777177', 'test/test4_2.txt', parser);
      });
      it('should resolve an exact account number for 200000000', function() {
        equalResolve('200800000', 'test/test4_3.txt', parser);
      });
      it('should resolve an exact account number for 333333333', function() {
        equalResolve('333393333', 'test/test4_4.txt', parser);
      });
      it('should resolve ambiguously for 888888888', function() {
        equalResolve("888888888 AMB ['888886888', '888888880', '888888988']", 'test/test4_5.txt', parser);
      });
      it('should resolve ambiguously for 555555555', function() {
        equalResolve("555555555 AMB ['555655555', '559555555']", 'test/test4_6.txt', parser);
      });
      it('should resolve ambiguously for 666666666', function() {
        equalResolve("666666666 AMB ['666566666', '686666666']", 'test/test4_7.txt', parser);
      });
      it('should resolve ambiguously for 999999999', function() {
        equalResolve("999999999 AMB ['899999999', '993999999', '999959999']", 'test/test4_8.txt', parser);
      });
      it('should resolve ambiguously for 490067715', function() {
        equalResolve("490067715 AMB ['490067115', '490067719', '490867715']", 'test/test4_9.txt', parser);
      });
      it('should resolve an exact account number for 123456789', function() {
        equalResolve('123456789', 'test/test4_10.txt', parser);
      });
      it('should resolve an exact account number for 000000051', function() {
        equalResolve('000000051', 'test/test4_11.txt', parser);
      });
      it('should resolve an exact account number for 490867715', function() {
        equalResolve('490867715', 'test/test4_12.txt', parser);
      });
    });
    describe('User Story 5 - multiple fixes', function() {
      it('should resolve two ambiguous account numbers for ?9086717?', function() {
        assert.equal("?9086717? AMB ['490857175', '490967175']", print(resolveMultiple(addStatus(parser.parseFile('test/test4_13.txt')), 2))[0]);
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

function equalResolve(account, filename, parser) {
  assert.equal(account, print(resolve(addStatus(parser.parseFile(filename))))[0]);
}