const fs = require('fs');
let html = fs.readFileSync('pages/diary.html', 'utf8');
const modalHTML = `
    <!-- Modal Buat Diary -->
    <div id="write-modal" class="modal-overlay" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 1000; align-items: center; justify-content: center; padding: 20px;">
        <div style="background: var(--bg-primary); width: 100%; max-width: 500px; border-radius: 16px; padding: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
            <h3 style="font-size: 18px; margin-bottom: 15px; font-weight: 600; color: var(--text-primary);">Buat Tulisan Baru</h3>
            <input type="text" id="diary-title" placeholder="Judul Tulisan" style="width: 100%; padding: 12px; margin-bottom: 15px; border-radius: 8px; border: 1px solid rgba(136, 14, 79, 0.2); font-family: 'Inter', sans-serif; box-sizing: border-box;">
            <textarea id="diary-content" placeholder="Tuliskan sesuatu..." rows="6" style="width: 100%; padding: 12px; margin-bottom: 15px; border-radius: 8px; border: 1px solid rgba(136, 14, 79, 0.2); font-family: 'Inter', sans-serif; resize: vertical; box-sizing: border-box;"></textarea>
            <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button onclick="closeWriteModal()" style="padding: 10px 15px; background: transparent; border: 1px solid #cbd5e1; border-radius: 8px; color: var(--text-secondary); cursor: pointer; font-weight: 500;">Batal</button>
                <button onclick="saveDiary()" id="save-btn" style="padding: 10px 15px; background: var(--accent); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500;">Simpan</button>
            </div>
        </div>
    </div>

    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
        import { getFirestore, collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
        
        const firebaseConfig = {
            projectId: "articulate-summer-58chg",
            appId: "1:865644935448:web:c18c46e5457616c7a5c66d",
            apiKey: "AIzaSyAwNe_iTf3a6cFmliiZaGrmLCnn-mBl-9c",
            authDomain: "articulate-summer-58chg.firebaseapp.com",
            storageBucket: "articulate-summer-58chg.firebasestorage.app",
            messagingSenderId: "865644935448"
        };
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app, "ai-studio-memorykey-6b6d5d2b-ef2b-407f-8d98-76d614ba8b9d");

        window.openWriteModal = function() {
            document.getElementById('write-modal').style.display = 'flex';
        };

        window.closeWriteModal = function() {
            document.getElementById('write-modal').style.display = 'none';
            document.getElementById('diary-title').value = '';
            document.getElementById('diary-content').value = '';
        };

        window.saveDiary = async function() {
            const title = document.getElementById('diary-title').value.trim();
            const content = document.getElementById('diary-content').value.trim();
            const name = sessionStorage.getItem('enteredName') || 'Unknown';
            
            if (!title || !content) {
                alert("Isi judul dan tulisannya ya!");
                return;
            }
            
            const btn = document.getElementById('save-btn');
            btn.innerText = 'Menyimpan...';
            btn.disabled = true;
            
            try {
                await addDoc(collection(db, "user_diaries"), {
                    title: title,
                    content: content,
                    enteredName: name,
                    timestamp: serverTimestamp()
                });
                closeWriteModal();
                loadUserDiaries();
            } catch(e) {
                console.error(e);
                alert("Gagal menyimpan tulisan");
            } finally {
                btn.innerText = 'Simpan';
                btn.disabled = false;
            }
        };

        async function loadUserDiaries() {
            const container = document.getElementById('user-diaries-container');
            if(!container) return;
            
            try {
                const q = query(collection(db, "user_diaries"), orderBy("timestamp", "desc"));
                const querySnapshot = await getDocs(q);
                
                container.innerHTML = '';
                
                if(!querySnapshot.empty) {
                    querySnapshot.forEach(doc => {
                        const data = doc.data();
                        const btn = document.createElement('button');
                        btn.className = 'menu-btn list-btn';
                        btn.onclick = () => {
                            window.location.href = 'baca.html?dbId=' + doc.id;
                        };
                        
                        btn.innerHTML = "<div class='menu-btn-content'><span class='menu-btn-title'>" + data.title + "</span></div>";
                        container.appendChild(btn);
                    });
                }
            } catch(e) {
                console.error("Error load diaries", e);
            }
        }
        
        document.addEventListener('DOMContentLoaded', loadUserDiaries);
    </script>
`;
html = html.replace('</body>', modalHTML + '</body>');
fs.writeFileSync('pages/diary.html', html);
