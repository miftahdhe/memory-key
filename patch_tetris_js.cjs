const fs = require('fs');
let js = fs.readFileSync('pages/tetris.js', 'utf8');

const newColors = `
const COLORS = [
    'transparent', // 0 empty
    '#3b82f6', // 1 blue
    '#10b981', // 2 green
    '#f59e0b', // 3 yellow
    '#f97316', // 4 orange
    '#8b5cf6', // 5 purple
    '#ef4444', // 6 red
    '#06b6d4'  // 7 teal
];

// Helper to draw rounded rect
function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}
`;

js = js.replace(/const COLORS = \[[^\]]*\];/, newColors.trim());

const newDrawBlock = `
function drawBlock(x, y, size, colorIndex, alpha = 1) {
    const pad = 1;
    const drawX = x + pad;
    const drawY = y + pad;
    const drawSize = size - pad * 2;
    const radius = 6;
    
    if (colorIndex === 0) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        roundRect(ctx, drawX, drawY, drawSize, drawSize, radius);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 1;
        ctx.stroke();
        return;
    }
    
    ctx.globalAlpha = alpha;
    
    // Base color
    ctx.fillStyle = COLORS[colorIndex];
    roundRect(ctx, drawX, drawY, drawSize, drawSize, radius);
    ctx.fill();
    
    // Inner shadow / Gradient for 3D effect
    const grad = ctx.createLinearGradient(drawX, drawY, drawX, drawY + drawSize);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    grad.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
    
    ctx.fillStyle = grad;
    roundRect(ctx, drawX, drawY, drawSize, drawSize, radius);
    ctx.fill();

    // Subtle border
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();
    
    ctx.globalAlpha = 1;
}
`;

js = js.replace(/function drawBlock\([\s\S]*?\}\n\}/, newDrawBlock.trim());

const newDraw = `
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
            drawBlock(GRID_OFFSET_X + c * CELL_SIZE, GRID_OFFSET_Y + r * CELL_SIZE, CELL_SIZE, grid[r][c]);
        }
    }
    
    if (isDragging && dragPiece) {
        const gridPos = getGridPos(mouseX - dragOffsetX, mouseY - dragOffsetY);
        if (canPlace(dragPiece.matrix, gridPos.r, gridPos.c)) {
            for (let r = 0; r < dragPiece.matrix.length; r++) {
                for (let c = 0; c < dragPiece.matrix[r].length; c++) {
                    if (dragPiece.matrix[r][c]) {
                        drawBlock(
                            GRID_OFFSET_X + (gridPos.c + c) * CELL_SIZE, 
                            GRID_OFFSET_Y + (gridPos.r + r) * CELL_SIZE, 
                            CELL_SIZE, 
                            dragPiece.color, 
                            0.4
                        );
                    }
                }
            }
        }
    }
    
    for (let i = 0; i < 3; i++) {
        const piece = tray[i];
        if (piece && i !== dragIndex) {
            drawPiece(piece.matrix, piece.baseX, piece.baseY, CELL_SIZE * piece.scale, piece.color);
        }
    }
    
    if (isDragging && dragPiece) {
        // Add drop shadow when dragging
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetY = 10;
        
        drawPiece(dragPiece.matrix, mouseX - dragOffsetX, mouseY - dragOffsetY, CELL_SIZE, dragPiece.color);
        
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
    }
}
`;

js = js.replace(/function draw\(\) \{[\s\S]*?\}\n\}/, newDraw.trim());

fs.writeFileSync('pages/tetris.js', js);
