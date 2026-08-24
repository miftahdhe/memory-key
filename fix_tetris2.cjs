const fs = require('fs');
let js = fs.readFileSync('pages/tetris.js', 'utf8');

js = js.replace(/if \(isDragging && colorIndex === dragPiece\.color/g, 'if (isDragging && dragPiece && colorIndex === dragPiece.color');

fs.writeFileSync('pages/tetris.js', js);
