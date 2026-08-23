const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newGridHtml = `
            <div class="menu-grid">
                <button class="menu-card" onclick="openMenu('diary')">
                    <div class="menu-card-content">
                        <div class="icon-wrapper"><span class="icon">✒️</span></div>
                        <span class="menu-card-title">Diary</span>
                    </div>
                </button>
                <button class="menu-card" onclick="openMenu('galeri')">
                    <div class="menu-card-content">
                        <div class="icon-wrapper"><span class="icon">📸</span></div>
                        <span class="menu-card-title">Galeri</span>
                    </div>
                </button>
                <button class="menu-card" onclick="openMenu('catatan')">
                    <div class="menu-card-content">
                        <div class="icon-wrapper"><span class="icon">📓</span></div>
                        <span class="menu-card-title">Catatan</span>
                    </div>
                </button>
                <button class="menu-card" onclick="openMenu('kapsul')">
                    <div class="menu-card-content">
                        <div class="icon-wrapper"><span class="icon">⏳</span></div>
                        <span class="menu-card-title">Kapsul Waktu</span>
                    </div>
                </button>
                <button class="menu-card" onclick="openMenu('wishlist')">
                    <div class="menu-card-content">
                        <div class="icon-wrapper"><span class="icon">📌</span></div>
                        <span class="menu-card-title">Wishlist</span>
                    </div>
                </button>
                <button class="menu-card" onclick="openMenu('mood')">
                    <div class="menu-card-content">
                        <div class="icon-wrapper"><span class="icon">🎭</span></div>
                        <span class="menu-card-title">Mood Tracker</span>
                    </div>
                </button>
                <button class="menu-card" onclick="openMenu('game')">
                    <div class="menu-card-content">
                        <div class="icon-wrapper"><span class="icon">🎮</span></div>
                        <span class="menu-card-title">Game</span>
                    </div>
                </button>
                <button class="menu-card logout-card" onclick="logoutApp()">
                    <div class="menu-card-content">
                        <div class="icon-wrapper"><span class="icon">🚪</span></div>
                        <span class="menu-card-title">Keluar</span>
                    </div>
                </button>
            </div>
`;

html = html.replace(/<div class="menu-list">[\s\S]*?<\/div>\s*<div class="footer">/, newGridHtml.trim() + '\n            <div class="footer">');

fs.writeFileSync('index.html', html);
