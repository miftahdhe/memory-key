const fs = require('fs');
let js = fs.readFileSync('pages/tetris.js', 'utf8');

const drawPieceCode = `
function drawPiece(matrix, x, y, size, colorIndex) {
    if (!matrix) return;
    const width = matrix[0].length * size;
    const height = matrix.length * size;
    
    let offsetX = x + (100 - width) / 2;
    let offsetY = y + (80 - height) / 2;

    if (isDragging && colorIndex === dragPiece.color && matrix === dragPiece.matrix) {
        offsetX = x;
        offsetY = y;
    }

    for (let r = 0; r < matrix.length; r++) {
        for (let c = 0; c < matrix[r].length; c++) {
            if (matrix[r][c]) {
                drawBlock(offsetX + c * size, offsetY + r * size, size, colorIndex);
            }
        }
    }
}
`;

js = js.replace(/function draw\(\)/, drawPieceCode + '\nfunction draw()');

fs.writeFileSync('pages/tetris.js', js);
