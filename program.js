var _0 =
  ' _ ' +
  '| |' +
  '|_|' +
  '   ';
var _1 =
  '   ' +
  '  |' +
  '  |' +
  '   ';
var patterns = {};
patterns[_0] = '0';
patterns[_1] = '1';
module.exports = {
  parse: function(text) {
    var lines = text.split('\n');

    var digits = [];
    for (var l = 0; l < lines.length; l += 4) {
      if (!lines[l].length) {
        continue;
      }

      if (lines[l].length != 27) {
        throw new Error('Numero di caratteri errato: ' + lines[l].length);
      }
      // saltare ultime righe se rimanenti < 4

      digits[Math.floor(l / 4)] = '';
      for (var d = 0; d < 27; d += 3) {
        var key = lines[l][d] + lines[l][d + 1] + lines[l][d + 2] +
          lines[l + 1][d] + lines[l + 1][d + 1] + lines[l + 1][d + 2] +
          lines[l + 2][d] + lines[l + 2][d + 1] + lines[l + 2][d + 2] +
          lines[l + 3][d] + lines[l + 3][d + 1] + lines[l + 3][d + 2];

        digits[Math.floor(l / 4)] += patterns[key];
      }
    }


    return digits;
  }
}