const canvas = document.getElementById('tetris');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gameOverScreen = document.getElementById('game-over-message');
const finalScoreElement = document.getElementById('final-score');

const GRID_SIZE = 8;
const CELL_SIZE = 35;
const GRID_OFFSET_X = (canvas.width - (GRID_SIZE * CELL_SIZE)) / 2;
const GRID_OFFSET_Y = 40;
const TRAY_Y = GRID_OFFSET_Y + (GRID_SIZE * CELL_SIZE) + 40;

const COLORS = [
    '#000000', // empty
    '#3b82f6', // blue
    '#22c55e', // green
    '#eab308', // yellow
    '#f97316', // orange
    '#a855f7', // purple
    '#ef4444', // red
    '#06b6d4'  // teal
];

const SHAPES = [
    { m: [[1]], c: 1 }, 
    { m: [[1,1],[1,1]], c: 2 }, 
    { m: [[1,1,1],[1,1,1],[1,1,1]], c: 3 },
    { m: [[1,1]], c: 4 }, { m: [[1],[1]], c: 4 },
    { m: [[1,1,1]], c: 5 }, { m: [[1],[1],[1]], c: 5 },
    { m: [[1,1,1,1]], c: 6 }, { m: [[1],[1],[1],[1]], c: 6 },
    { m: [[1,1,1,1,1]], c: 7 }, { m: [[1],[1],[1],[1],[1]], c: 7 },
    { m: [[1,0],[1,1]], c: 1 }, { m: [[0,1],[1,1]], c: 2 }, { m: [[1,1],[1,0]], c: 3 }, { m: [[1,1],[0,1]], c: 4 },
    { m: [[1,0,0],[1,0,0],[1,1,1]], c: 5 }, { m: [[0,0,1],[0,0,1],[1,1,1]], c: 6 },
    { m: [[1,1,1],[1,0,0],[1,0,0]], c: 7 }, { m: [[1,1,1],[0,0,1],[0,0,1]], c: 1 }
];

let grid = [];
let tray = [null, null, null];
let score = 0;
let gameOver = false;
let isDragging = false;
let dragPiece = null;
let dragIndex = -1;
let dragOffsetX = 0;
let dragOffsetY = 0;
let mouseX = 0;
let mouseY = 0;

function drawBlock(x, y, size, colorIndex, alpha = 1) {
    if (colorIndex === 0) {
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(x, y, size, size);
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, size, size);
        return;
    }
    
    ctx.globalAlpha = alpha;
    ctx.fillStyle = COLORS[colorIndex];
    ctx.fillRect(x, y, size, size);
    
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(x, y, size, size/3);
    
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.fillRect(x, y + size - size/3, size, size/3);

    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, size, size);
    ctx.globalAlpha = 1;
}

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

function draw() {
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
        drawPiece(dragPiece.matrix, mouseX - dragOffsetX, mouseY - dragOffsetY, CELL_SIZE, dragPiece.color);
    }
}

function fillTray() {
    let emptyCount = 0;
    for (let i=0; i<3; i++) {
        if (!tray[i]) emptyCount++;
    }
    if (emptyCount === 3) {
        for (let i=0; i<3; i++) {
            const shapeDef = SHAPES[Math.floor(Math.random() * SHAPES.length)];
            tray[i] = {
                matrix: shapeDef.m,
                color: shapeDef.c,
                scale: 0.6,
                baseX: 10 + i * 100,
                baseY: TRAY_Y + 10
            };
        }
    }
}

function getGridPos(px, py) {
    const c = Math.floor((px - GRID_OFFSET_X + CELL_SIZE/2) / CELL_SIZE);
    const r = Math.floor((py - GRID_OFFSET_Y + CELL_SIZE/2) / CELL_SIZE);
    return {r, c};
}

function canPlace(matrix, r, c) {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col]) {
                const gr = r + row;
                const gc = c + col;
                if (gr < 0 || gr >= GRID_SIZE || gc < 0 || gc >= GRID_SIZE || grid[gr][gc] !== 0) {
                    return false;
                }
            }
        }
    }
    return true;
}

function placePiece(matrix, r, c, color) {
    let placedBlocks = 0;
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col]) {
                grid[r + row][c + col] = color;
                placedBlocks++;
            }
        }
    }
    score += placedBlocks;
    scoreElement.innerText = score;
}

function checkLines() {
    let rowsToClear = [];
    let colsToClear = [];

    for (let r = 0; r < GRID_SIZE; r++) {
        let full = true;
        for (let c = 0; c < GRID_SIZE; c++) {
            if (grid[r][c] === 0) full = false;
        }
        if (full) rowsToClear.push(r);
    }

    for (let c = 0; c < GRID_SIZE; c++) {
        let full = true;
        for (let r = 0; r < GRID_SIZE; r++) {
            if (grid[r][c] === 0) full = false;
        }
        if (full) colsToClear.push(c);
    }

    rowsToClear.forEach(r => {
        for (let c = 0; c < GRID_SIZE; c++) grid[r][c] = 0;
    });
    colsToClear.forEach(c => {
        for (let r = 0; r < GRID_SIZE; r++) grid[r][c] = 0;
    });

    const totalLines = rowsToClear.length + colsToClear.length;
    if (totalLines > 0) {
        score += (totalLines * GRID_SIZE) + (totalLines > 1 ? totalLines * 10 : 0);
        scoreElement.innerText = score;
    }
}

function checkGameOver() {
    let possible = false;
    for (let i = 0; i < 3; i++) {
        const piece = tray[i];
        if (piece) {
            for (let r = 0; r < GRID_SIZE; r++) {
                for (let c = 0; c < GRID_SIZE; c++) {
                    if (canPlace(piece.matrix, r, c)) {
                        possible = true;
                        break;
                    }
                }
                if (possible) break;
            }
        }
        if (possible) break;
    }

    if (!possible) {
        gameOver = true;
        finalScoreElement.innerText = score;
        gameOverScreen.classList.add('show');
    }
}

function handlePointerDown(e) {
    if (gameOver) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    mouseX = (clientX - rect.left) * scaleX;
    mouseY = (clientY - rect.top) * scaleY;

    for (let i = 0; i < 3; i++) {
        const piece = tray[i];
        if (piece) {
            const size = CELL_SIZE * piece.scale;
            const w = piece.matrix[0].length * size;
            const h = piece.matrix.length * size;
            const px = piece.baseX + (100 - w) / 2;
            const py = piece.baseY + (80 - h) / 2;

            if (mouseX >= px && mouseX <= px + w && mouseY >= py && mouseY <= py + h) {
                isDragging = true;
                dragIndex = i;
                dragPiece = piece;
                
                const actualW = dragPiece.matrix[0].length * CELL_SIZE;
                const actualH = dragPiece.matrix.length * CELL_SIZE;
                dragOffsetX = actualW / 2;
                dragOffsetY = actualH + 40; 
                
                draw();
                return;
            }
        }
    }
}

function handlePointerMove(e) {
    if (!isDragging) return;
    e.preventDefault(); 
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    mouseX = (clientX - rect.left) * scaleX;
    mouseY = (clientY - rect.top) * scaleY;
    draw();
}

function handlePointerUp(e) {
    if (!isDragging) return;
    
    const gridPos = getGridPos(mouseX - dragOffsetX, mouseY - dragOffsetY);
    if (canPlace(dragPiece.matrix, gridPos.r, gridPos.c)) {
        placePiece(dragPiece.matrix, gridPos.r, gridPos.c, dragPiece.color);
        tray[dragIndex] = null;
        checkLines();
        fillTray();
        checkGameOver();
    }
    
    isDragging = false;
    dragPiece = null;
    dragIndex = -1;
    draw();
}

canvas.addEventListener('mousedown', handlePointerDown);
canvas.addEventListener('mousemove', handlePointerMove);
window.addEventListener('mouseup', handlePointerUp);

canvas.addEventListener('touchstart', handlePointerDown, {passive: false});
canvas.addEventListener('touchmove', handlePointerMove, {passive: false});
window.addEventListener('touchend', handlePointerUp);

function tetrisStart() {
    grid = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(0));
    tray = [null, null, null];
    score = 0;
    gameOver = false;
    scoreElement.innerText = score;
    gameOverScreen.classList.remove('show');
    fillTray();
    draw();
}

// Initial draw (empty)
tetrisStart();
