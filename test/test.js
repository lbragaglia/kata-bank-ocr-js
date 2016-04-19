var assert = require('chai').assert;
var parser = require('../program.js');

var _0 = [
    ' _ ',
    '| |',
    '|_|',
    '   '
  ],
  _1 = [
    '   ',
    '  |',
    '  |',
    '   '
  ];

describe('KataBankOCR', function() {
  describe('User Story 1', function() {
    it('should parse account number 000000000', function() {
      var input = '';
      for (var l = 0; l < 4; l++) {
        for (var i = 0; i < 9; i++) {
          input += _0[l];
        }
        input += '\n';
      }
      assert.equal('000000000', parser.parse(input)[0]);
    });

    it('should parse account number 111111111', function() {
      var input = '';
      for (var l = 0; l < 4; l++) {
        for (var i = 0; i < 9; i++) {
          input += _1[l];
        }
        input += '\n';
      }
      assert.equal('111111111', parser.parse(input)[0]);
    });


    it('should parse account number 010101010', function() {
      var input = '';
      for (var l = 0; l < 4; l++) {
        for (var i = 0; i < 9; i += 2) {
          input += _0[l];
          if (i < 8) input += _1[l];
        }
        input += '\n';
      }
      assert.equal('010101010', parser.parse(input)[0]);
    });
  });
});