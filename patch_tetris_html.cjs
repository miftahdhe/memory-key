const fs = require('fs');
let html = fs.readFileSync('pages/tetris.html', 'utf8');

html = html.replace(/<div class="game-header">[\s\S]*?<\/div>/, `<div class="game-header">
                <span class="score-display">Skor: <span id="score">0</span></span>
                <button class="restart-btn" onclick="tetrisStart()">Ulangi</button>
            </div>`);

html = html.replace(/<div class="screen active">/, `<div class="screen active">
        <div class="bg-orb orb-1" style="z-index: -1;"></div>
        <div class="bg-orb orb-2" style="z-index: -1;"></div>`);

fs.writeFileSync('pages/tetris.html', html);
