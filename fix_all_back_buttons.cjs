const fs = require('fs');

function fixBackButton(file, targetHref) {
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');
    
    // Replace onclick="window.history.back()" with onclick="window.location.href='...'"
    html = html.replace(/onclick="window\.history\.back\(\)"/g, "onclick=\"window.location.href='" + targetHref + "'\"");
    
    fs.writeFileSync(file, html);
    console.log('Fixed', file, 'to point to', targetHref);
}

fixBackButton('pages/baca.html', 'diary.html');
fixBackButton('pages/diary.html', '../index.html');
fixBackButton('pages/catatan.html', '../index.html');
fixBackButton('pages/galeri.html', '../index.html');
fixBackButton('pages/tetris.html', 'game.html');
fixBackButton('pages/memory.html', 'game.html');
fixBackButton('pages/game.html', '../index.html');
