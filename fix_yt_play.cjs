const fs = require('fs');
let html = fs.readFileSync('pages/baca.html', 'utf8');
html = html.replace(
    '<div id="yt-player-container" style="display: none; position: absolute; top: -9999px; left: -9999px;">',
    '<div id="yt-player-container" style="position: absolute; top: -9999px; left: -9999px; width: 10px; height: 10px; overflow: hidden; opacity: 0; pointer-events: none;">'
);
fs.writeFileSync('pages/baca.html', html);

let js = fs.readFileSync('pages/baca.js', 'utf8');
js = js.replace("height: '0',", "height: '10',");
js = js.replace("width: '0',", "width: '10',");
js = js.replace(
    "'autoplay': 0,",
    "'autoplay': 0,\n                    'playsinline': 1,"
);

fs.writeFileSync('pages/baca.js', js);
