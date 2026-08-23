const fs = require('fs');
let html = fs.readFileSync('pages/game.html', 'utf8');

const newGridHtml = `
            <div class="menu-grid" style="grid-template-columns: 1fr; gap: 20px;">
                <button class="menu-card" onclick="window.location.href='memory.html'">
                    <div class="menu-card-content" style="flex-direction: row; justify-content: flex-start; padding: 0 10px;">
                        <div class="icon-wrapper"><span class="icon">🧠</span></div>
                        <div style="display: flex; flex-direction: column; align-items: flex-start; margin-left: 15px;">
                            <span class="menu-card-title" style="font-size: 16px;">Memory Match</span>
                            <span style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">Uji daya ingatmu</span>
                        </div>
                    </div>
                </button>
                <button class="menu-card" onclick="window.location.href='tetris.html'">
                    <div class="menu-card-content" style="flex-direction: row; justify-content: flex-start; padding: 0 10px;">
                        <div class="icon-wrapper"><span class="icon">🧱</span></div>
                        <div style="display: flex; flex-direction: column; align-items: flex-start; margin-left: 15px;">
                            <span class="menu-card-title" style="font-size: 16px;">Tetris</span>
                            <span style="font-size: 12px; color: var(--text-secondary); margin-top: 4px;">Susun balok dengan rapi</span>
                        </div>
                    </div>
                </button>
            </div>
`;

html = html.replace(/<div class="menu-container">[\s\S]*?<\/div>\s*<\/div>/, newGridHtml.trim() + '\n        </div>');

fs.writeFileSync('pages/game.html', html);
