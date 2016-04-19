var _0 = ' _ ' +
'| |' +
'|_|' +
'   ';
var patterns = {
  _0: '0'
};
module.exports = {
  parse: function(text) {
    var lines = text.split('\n');
    
    var digits = [];
    for (var l = 0; l < lines.length; l += 4) {
      console.log(lines[l])
      if (lines[l].length != 27) {
        throw new Error('Numero di caratteri errato: ' + lines[l].length);  
      }
      // saltare ultime righe se rimanenti < 4
      
      digits[l] = '';
      for (var d = 0; d < 27; d += 3) {
        digits[l] = patterns[ lines[l][d] + lines[l][d+1] + lines[l][d+2] +
          lines[l+1][d] + lines[l+1][d+1] + lines[l+1][d+2] + 
          lines[l+2][d] + lines[l+2][d+1] + lines[l+2][d+2]
        ];
      }
      
    }
    
    
    return digits[0];
  }
}