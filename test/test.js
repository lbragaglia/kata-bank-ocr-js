var assert = require('chai').assert;
var simple = require('../parser');
var regexp = require('../parser-regex');

[simple, regexp].forEach(function(parser) {
  describe('KataBankOCR (parser: ' + parser.name + ')', function() {
    describe('User Story 1', function() {
      it('should parse account number 000000000', function() {
        assert.equal('000000000', parser.parseFile('test/test0.txt')[0]);
      });

      it('should parse account number 111111111', function() {
        assert.equal('111111111', parser.parseFile('test/test1.txt')[0]);
      });

      it('should parse account number 222222222', function() {
        assert.equal('222222222', parser.parseFile('test/test2.txt')[0]);
      });

      it('should parse account number 333333333', function() {
        assert.equal('333333333', parser.parseFile('test/test3.txt')[0]);
      });

      it('should parse account number 444444444', function() {
        assert.equal('444444444', parser.parseFile('test/test4.txt')[0]);
      });

      it('should parse account number 555555555', function() {
        assert.equal('555555555', parser.parseFile('test/test5.txt')[0]);
      });

      it('should parse account number 666666666', function() {
        assert.equal('666666666', parser.parseFile('test/test6.txt')[0]);
      });

      it('should parse account number 777777777', function() {
        assert.equal('777777777', parser.parseFile('test/test7.txt')[0]);
      });

      it('should parse account number 888888888', function() {
        assert.equal('888888888', parser.parseFile('test/test8.txt')[0]);
      });

      it('should parse account number 999999999', function() {
        assert.equal('999999999', parser.parseFile('test/test9.txt')[0]);
      });

      it('should parse account number 123456789', function() {
        assert.equal('123456789', parser.parseFile('test/test10.txt')[0]);
      });
    });
  });
});