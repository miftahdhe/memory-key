const fs = require('fs');
let code = fs.readFileSync('pages/baca.js', 'utf8');

const oldCode = `    // Get ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const diaryId = urlParams.get('id') || '1'; // Default to 1 if no ID

    // Set Audio Source dynamically
    audio.src = \`../assets/audio/diary/diary\${diaryId}.mp3\`;
    audio.load();

    // Load text
    try {
        const response = await fetch(\`../assets/diary/diary\${diaryId}.txt\`);
        if (!response.ok) throw new Error("File tidak ditemukan");
        fullText = await response.text();
    } catch (error) {
        fullText = "Teks diary tidak ditemukan.";
        console.error(error);
    }
    
    // Update cover title
    const bookTitleEl = document.querySelector('.book-title');
    if (bookTitleEl) {
        if (diaryId === '2') {
            bookTitleEl.textContent = 'Sajak Untukmu';
        } else if (diaryId === '3') {
            bookTitleEl.textContent = 'Porsi';
        } else if (diaryId === '4') {
            bookTitleEl.textContent = 'Berubah Arah';
        } else if (diaryId === '5') {
            bookTitleEl.textContent = '10 malam';
        } else if (diaryId === '6') {
            bookTitleEl.textContent = '10 tahun';
        } else if (diaryId === '7') {
            bookTitleEl.textContent = 'Hening';
        } else {
            bookTitleEl.textContent = 'Dalam Lima Waktuku';
        }
    }

    parseTextToTokens();
    
    // Wait for fonts to load before measuring`;

const newCode = `    // Get ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const diaryId = urlParams.get('id');
    const dbId = urlParams.get('dbId');

    const bookTitleEl = document.querySelector('.book-title');

    if (dbId) {
        const fetchWait = async () => {
            if (typeof window.fetchDiaryFromDB === "function") {
                const data = await window.fetchDiaryFromDB(dbId);
                if (data) {
                    fullText = data.content;
                    if (bookTitleEl) bookTitleEl.textContent = data.title;
                } else {
                    fullText = "Teks diary tidak ditemukan.";
                }
                processText();
            } else {
                setTimeout(fetchWait, 100);
            }
        };
        fetchWait();
        audio.src = \`../assets/audio/diary/diary1.mp3\`;
        audio.load();
        return;
    } else {
        const idToUse = diaryId || '1';
        audio.src = \`../assets/audio/diary/diary\${idToUse}.mp3\`;
        audio.load();
        
        try {
            const response = await fetch(\`../assets/diary/diary\${idToUse}.txt\`);
            if (!response.ok) throw new Error("File tidak ditemukan");
            fullText = await response.text();
        } catch (error) {
            fullText = "Teks diary tidak ditemukan.";
            console.error(error);
        }

        if (bookTitleEl) {
            if (idToUse === '2') {
                bookTitleEl.textContent = 'Sajak Untukmu';
            } else if (idToUse === '3') {
                bookTitleEl.textContent = 'Porsi';
            } else if (idToUse === '4') {
                bookTitleEl.textContent = 'Berubah Arah';
            } else if (idToUse === '5') {
                bookTitleEl.textContent = '10 malam';
            } else if (idToUse === '6') {
                bookTitleEl.textContent = '10 tahun';
            } else if (idToUse === '7') {
                bookTitleEl.textContent = 'Hening';
            } else {
                bookTitleEl.textContent = 'Dalam Lima Waktuku';
            }
        }
        processText();
    }

    function processText() {
        parseTextToTokens();
        
        // Wait for fonts to load before measuring
        document.fonts.ready.then(() => {
            paginateText();
            setTimeout(() => {
                loadingScreen.classList.remove('active');
                bookScreen.classList.add('active');
                setTimeout(() => {
                    hintText.classList.add('visible');
                }, 1000);
            }, 1500);
        });
    }
    
    // Disable rest of old code block that called document.fonts.ready
    return;
    // Wait for fonts to load before measuring`;

code = code.replace(oldCode, newCode);
fs.writeFileSync('pages/baca.js', code);
