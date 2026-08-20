const fs = require('fs');
let html = fs.readFileSync('pages/baca.html', 'utf8');

const fbScript = `
    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
        import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
        
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

        window.fetchDiaryFromDB = async function(dbId) {
            try {
                const docRef = doc(db, "user_diaries", dbId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    return docSnap.data();
                } else {
                    return null;
                }
            } catch (e) {
                console.error("Error getting document:", e);
                return null;
            }
        };
    </script>
`;

html = html.replace('</body>', fbScript + '</body>');
fs.writeFileSync('pages/baca.html', html);
