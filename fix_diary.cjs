const fs = require('fs');
let html = fs.readFileSync('pages/diary.html', 'utf8');

// 1. Update the CSS for .book-card and others
const oldCssMatch = /<style>[\s\S]*?<\/style>/;
const newCss = `<style>
        .books-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 20px;
            width: 100%;
        }
        @media (max-width: 480px) {
            .books-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 15px;
            }
        }
        .book-card {
            background: linear-gradient(135deg, #d81b60, #880e4f);
            border-radius: 4px 12px 12px 4px;
            box-shadow: inset 2px 0 5px rgba(0,0,0,0.4), 3px 5px 10px rgba(0,0,0,0.3);
            border: 1px solid #6a0035;
            border-left: 6px solid #6a0035;
            padding: 20px 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            position: relative;
            min-height: 160px;
            text-decoration: none;
            overflow: hidden;
        }
        .book-card::before {
            content: '';
            position: absolute;
            top: 5px; right: 5px; bottom: 5px; left: 10px;
            border: 1px solid rgba(255,192,203,0.3);
            pointer-events: none;
            border-radius: 2px 8px 8px 2px;
        }
        .book-card:hover {
            transform: translateY(-5px);
            box-shadow: inset 2px 0 5px rgba(0,0,0,0.4), 5px 10px 15px rgba(0,0,0,0.4);
        }
        .book-title {
            font-weight: 600;
            color: #fff;
            font-size: 15px;
            margin-bottom: 8px;
            font-family: 'Playfair Display', serif;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
            z-index: 2;
        }
        .book-author {
            font-size: 12px;
            color: rgba(255,255,255,0.8);
            font-family: 'Inter', sans-serif;
            font-style: italic;
            z-index: 2;
        }
        .delete-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255,255,255,0.2);
            color: #fff;
            border: 1px solid rgba(255,255,255,0.5);
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
            z-index: 10;
        }
        .delete-btn:hover {
            background: rgba(255,0,0,0.6);
            border-color: rgba(255,0,0,0.8);
        }
    </style>`;
html = html.replace(oldCssMatch, newCss);

// 2. Fix the grid container to be one single grid
const gridMarkupRegex = /<div class="books-grid">[\s\S]*?<\/div>\s*<div id="user-diaries-container" class="books-grid"><\/div>/;
const newGridMarkup = `<div id="all-books-container" class="books-grid">
                <!-- Hardcoded books -->
                <div class="book-card" onclick="window.location.href='baca.html?id=1'">
                    <div class="book-title">Dalam Lima Waktuku</div>
                    <div class="book-author">by Miftah</div>
                </div>
                <div class="book-card" onclick="window.location.href='baca.html?id=2'">
                    <div class="book-title">Sajak Untukmu</div>
                    <div class="book-author">by Miftah</div>
                </div>
                <div class="book-card" onclick="window.location.href='baca.html?id=3'">
                    <div class="book-title">Porsi</div>
                    <div class="book-author">by Miftah</div>
                </div>
                <div class="book-card" onclick="window.location.href='baca.html?id=4'">
                    <div class="book-title">Berubah Arah</div>
                    <div class="book-author">by Miftah</div>
                </div>
                <div class="book-card" onclick="window.location.href='baca.html?id=5'">
                    <div class="book-title">10 malam</div>
                    <div class="book-author">by Miftah</div>
                </div>
                <div class="book-card" onclick="window.location.href='baca.html?id=6'">
                    <div class="book-title">10 tahun</div>
                    <div class="book-author">by Miftah</div>
                </div>
                <div class="book-card" onclick="window.location.href='baca.html?id=7'">
                    <div class="book-title">Hening</div>
                    <div class="book-author">by Miftah</div>
                </div>
            </div>`;
html = html.replace(gridMarkupRegex, newGridMarkup);

// 3. Update the load logic
html = html.replace("const container = document.getElementById('user-diaries-container');", "const container = document.getElementById('all-books-container');");
html = html.replace("container.innerHTML = '';", `
                // Remove all previously loaded dynamic books
                const existingDynamics = container.querySelectorAll('.dynamic-book');
                existingDynamics.forEach(el => el.remove());
`);
html = html.replace("card.className = 'book-card';", "card.className = 'book-card dynamic-book';");

fs.writeFileSync('pages/diary.html', html);
