const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const newMenuHtml = `
            <div class="menu-list">
                <button class="menu-item" onclick="openMenu('diary')">
                    <div class="menu-item-icon">✒️</div>
                    <div class="menu-item-text">
                        <span class="menu-item-title">Buku Harian</span>
                        <span class="menu-item-desc">Tulis cerita & keseharianmu</span>
                    </div>
                    <div class="menu-item-arrow">→</div>
                </button>
                <button class="menu-item" onclick="openMenu('galeri')">
                    <div class="menu-item-icon">📸</div>
                    <div class="menu-item-text">
                        <span class="menu-item-title">Galeri Foto</span>
                        <span class="menu-item-desc">Kenangan yang tersimpan</span>
                    </div>
                    <div class="menu-item-arrow">→</div>
                </button>
                <button class="menu-item" onclick="openMenu('catatan')">
                    <div class="menu-item-icon">📓</div>
                    <div class="menu-item-text">
                        <span class="menu-item-title">Catatan Rahasia</span>
                        <span class="menu-item-desc">Pesan khusus & rahasia</span>
                    </div>
                    <div class="menu-item-arrow">→</div>
                </button>
                <button class="menu-item" onclick="openMenu('kapsul')">
                    <div class="menu-item-icon">⏳</div>
                    <div class="menu-item-text">
                        <span class="menu-item-title">Kapsul Waktu</span>
                        <span class="menu-item-desc">Pesan untuk masa depan</span>
                    </div>
                    <div class="menu-item-arrow">→</div>
                </button>
                <button class="menu-item" onclick="openMenu('wishlist')">
                    <div class="menu-item-icon">📌</div>
                    <div class="menu-item-text">
                        <span class="menu-item-title">Wishlist</span>
                        <span class="menu-item-desc">Harapan & impian</span>
                    </div>
                    <div class="menu-item-arrow">→</div>
                </button>
                <button class="menu-item" onclick="openMenu('mood')">
                    <div class="menu-item-icon">🎭</div>
                    <div class="menu-item-text">
                        <span class="menu-item-title">Mood Tracker</span>
                        <span class="menu-item-desc">Rekam perasaan hari ini</span>
                    </div>
                    <div class="menu-item-arrow">→</div>
                </button>
                <button class="menu-item" onclick="openMenu('game')">
                    <div class="menu-item-icon">🎮</div>
                    <div class="menu-item-text">
                        <span class="menu-item-title">Mini Game</span>
                        <span class="menu-item-desc">Santai sejenak</span>
                    </div>
                    <div class="menu-item-arrow">→</div>
                </button>
                <button class="menu-item logout-item" onclick="logoutApp()">
                    <div class="menu-item-icon">🚪</div>
                    <div class="menu-item-text">
                        <span class="menu-item-title" style="color: #d32f2f;">Keluar Aplikasi</span>
                        <span class="menu-item-desc">Kunci kembali memori ini</span>
                    </div>
                </button>
            </div>
`;

html = html.replace(/<div class="menu-container">[\s\S]*?<\/div>\s*<div class="footer">/, newMenuHtml.trim() + '\n            <div class="footer">');

fs.writeFileSync('index.html', html);
