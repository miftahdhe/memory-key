const fs = require('fs');
let html = fs.readFileSync('pages/diary.html', 'utf8');

// 1. Add deleteDoc, doc to imports
html = html.replace(
  'import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";',
  'import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";'
);

// 2. Add style for the book grid and cards
const bookStyles = `
    <style>
        .books-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 20px;
            width: 100%;
        }
        @media (max-width: 480px) {
            .books-grid {
                grid-template-columns: repeat(2, 1fr); /* 2 columns on mobile too, or keep responsive */
                gap: 15px;
            }
        }
        .book-card {
            background: linear-gradient(135deg, #fff 0%, #f4f4f4 100%);
            border-radius: 4px 12px 12px 4px;
            box-shadow: inset 4px 0 10px rgba(0,0,0,0.1), 0 8px 15px rgba(0,0,0,0.05);
            border-left: 10px solid var(--accent);
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
            border-top: 1px solid rgba(0,0,0,0.05);
            border-right: 1px solid rgba(0,0,0,0.05);
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        .book-card:hover {
            transform: translateY(-5px);
            box-shadow: inset 4px 0 10px rgba(0,0,0,0.1), 0 12px 20px rgba(0,0,0,0.1);
        }
        .book-title {
            font-weight: 600;
            color: var(--text-primary);
            font-size: 15px;
            margin-bottom: 8px;
            font-family: 'Playfair Display', serif;
        }
        .book-author {
            font-size: 12px;
            color: var(--text-secondary);
            font-family: 'Inter', sans-serif;
            font-style: italic;
        }
        .delete-btn {
            position: absolute;
            top: 8px;
            right: 8px;
            background: rgba(255,0,0,0.1);
            color: #d32f2f;
            border: none;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 12px;
            transition: all 0.2s;
            z-index: 10;
        }
        .delete-btn:hover {
            background: #d32f2f;
            color: white;
        }
    </style>
</head>
`;
html = html.replace('</head>', bookStyles);

// 3. Replace the placeholder and user-diaries-container
const oldContent = `<div id="user-diaries-container" style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1rem;"></div>
            <div class="content-placeholder" style="display: flex; flex-direction: column; gap: 1rem;">
                <button class="menu-btn list-btn" onclick="window.location.href='baca.html?id=1'">
                    <div class="menu-btn-content">
                        <span class="menu-btn-title">Dalam Lima Waktuku</span>
                    </div>
                </button>
                <button class="menu-btn list-btn" onclick="window.location.href='baca.html?id=2'">
                    <div class="menu-btn-content">
                        <span class="menu-btn-title">Sajak Untukmu</span>
                    </div>
                </button>
                <button class="menu-btn list-btn" onclick="window.location.href='baca.html?id=3'">
                    <div class="menu-btn-content">
                        <span class="menu-btn-title">Porsi</span>
                    </div>
                </button>
                <button class="menu-btn list-btn" onclick="window.location.href='baca.html?id=4'">
                    <div class="menu-btn-content">
                        <span class="menu-btn-title">Berubah Arah</span>
                    </div>
                </button>
                <button class="menu-btn list-btn" onclick="window.location.href='baca.html?id=5'">
                    <div class="menu-btn-content">
                        <span class="menu-btn-title">10 malam</span>
                    </div>
                </button>
                <button class="menu-btn list-btn" onclick="window.location.href='baca.html?id=6'">
                    <div class="menu-btn-content">
                        <span class="menu-btn-title">10 tahun</span>
                    </div>
                </button>
                <button class="menu-btn list-btn" onclick="window.location.href='baca.html?id=7'">
                    <div class="menu-btn-content">
                        <span class="menu-btn-title">Hening</span>
                    </div>
                </button>
            </div>`;

const newContent = `<div class="books-grid">
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
            </div>
            
            <div id="user-diaries-container" class="books-grid"></div>`;
html = html.replace(oldContent, newContent);

// 4. Update order to "asc"
html = html.replace('orderBy("timestamp", "desc")', 'orderBy("timestamp", "asc")');

// 5. Update user-diaries render logic to create book cards and delete button
const oldRender = `                        const btn = document.createElement('button');
                        btn.className = 'menu-btn list-btn';
                        btn.onclick = () => {
                            window.location.href = 'baca.html?dbId=' + doc.id;
                        };
                        
                        btn.innerHTML = "<div class='menu-btn-content'><span class='menu-btn-title'>" + data.title + "</span></div>";
                        container.appendChild(btn);`;

const newRender = `                        const card = document.createElement('div');
                        card.className = 'book-card';
                        
                        const titleEl = document.createElement('div');
                        titleEl.className = 'book-title';
                        titleEl.textContent = data.title;
                        
                        const authorEl = document.createElement('div');
                        authorEl.className = 'book-author';
                        authorEl.textContent = 'by ' + (data.enteredName || 'Unknown');
                        
                        const delBtn = document.createElement('button');
                        delBtn.className = 'delete-btn';
                        delBtn.innerHTML = '×';
                        delBtn.title = 'Hapus';
                        delBtn.onclick = (e) => {
                            e.stopPropagation();
                            if (confirm('Yakin ingin menghapus diary ini?')) {
                                window.deleteDiary(doc.id);
                            }
                        };
                        
                        card.onclick = () => {
                            window.location.href = 'baca.html?dbId=' + doc.id;
                        };
                        
                        card.appendChild(delBtn);
                        card.appendChild(titleEl);
                        card.appendChild(authorEl);
                        container.appendChild(card);`;
html = html.replace(oldRender, newRender);

// 6. Add deleteDiary function
const deleteFunc = `
        window.deleteDiary = async function(id) {
            try {
                await deleteDoc(doc(db, "user_diaries", id));
                loadUserDiaries();
            } catch(e) {
                console.error("Gagal menghapus", e);
                alert("Gagal menghapus diary");
            }
        };

        async function loadUserDiaries()`;
html = html.replace('async function loadUserDiaries()', deleteFunc);

fs.writeFileSync('pages/diary.html', html);
