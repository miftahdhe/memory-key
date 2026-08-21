const fs = require('fs');
let js = fs.readFileSync('pages/baca.js', 'utf8');

js = js.replace(
    "'onReady': () => { ytReady = true; }",
    "'onReady': () => { ytReady = true; if (isBookOpen && typeof ytPlayer.playVideo === 'function') { ytPlayer.setVolume(50); ytPlayer.playVideo(); } }"
);

fs.writeFileSync('pages/baca.js', js);
