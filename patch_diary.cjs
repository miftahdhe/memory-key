const fs = require('fs');
let code = fs.readFileSync('pages/diary.html', 'utf8');

// Insert the new input field before the textarea
code = code.replace(
    '<textarea id="diary-content"',
    '<input type="text" id="diary-youtube" placeholder="Link YouTube Musik (Opsional)" style="width: 100%; padding: 12px; margin-bottom: 15px; border-radius: 8px; border: 1px solid rgba(136, 14, 79, 0.2); font-family: \\'Inter\\', sans-serif; box-sizing: border-box;">\\n            <textarea id="diary-content"'
);

// Reset the input in closeWriteModal
code = code.replace(
    "document.getElementById('diary-content').value = '';",
    "document.getElementById('diary-content').value = '';\\n            document.getElementById('diary-youtube').value = '';"
);

// Read the input in saveDiary
code = code.replace(
    "const content = document.getElementById('diary-content').value.trim();",
    "const content = document.getElementById('diary-content').value.trim();\\n            const ytLink = document.getElementById('diary-youtube').value.trim();"
);

// Add to payload
code = code.replace(
    "enteredName: name,",
    "enteredName: name,\\n                    youtubeLink: ytLink,"
);

fs.writeFileSync('pages/diary.html', code);
