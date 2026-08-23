const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    /<div id="main-screen" class="screen">/,
    `<div id="main-screen" class="screen">
        <div class="bg-orb orb-1"></div>
        <div class="bg-orb orb-2"></div>`
);

fs.writeFileSync('index.html', html);
