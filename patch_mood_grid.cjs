const fs = require('fs');
let html = fs.readFileSync('pages/mood.html', 'utf8');

html = html.replace(
    /<div class="mood-btn" onclick="openMoodModal\('custom', ''\)" style="background: rgba\(255, 255, 255, 0\.4\); border: 1px dashed rgba\(136, 14, 79, 0\.3\);">/,
    '<div class="mood-btn" onclick="openMoodModal(\'custom\', \'\')" style="background: rgba(255, 255, 255, 0.4); border: 1px dashed rgba(136, 14, 79, 0.3); grid-column: 1 / -1;">'
);

fs.writeFileSync('pages/mood.html', html);
