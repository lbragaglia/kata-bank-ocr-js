var assert = require('chai').assert;
var parser = require('../program.js');

describe('KataBankOCR', function() {
  describe('User Story 1', function() {
    it('should parse account number', function() {
      
      var _0 = [' _ ',
                '| |',
                '|_|',
                '   '];
      var input = '';
      for (var l = 0; l < 4; l++) {
        for (var i = 0; i < 9; i++) {
          input += _0[l];
        }
        input += '\n';
      }
      console.log(input);
      assert.equal('000000000', parser.parse(input));
      
    });
  });
});