const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf8');

const themeJs = `

// Theme Menu Logic
function toggleThemeMenu(e) {
    e.stopPropagation();
    const menu = document.getElementById('theme-menu');
    menu.classList.toggle('show');
}

function selectTheme(themeName, e) {
    e.stopPropagation();
    if (typeof applyTheme === 'function') {
        applyTheme(themeName);
    }
    const menu = document.getElementById('theme-menu');
    menu.classList.remove('show');
}

document.addEventListener('click', (e) => {
    const menu = document.getElementById('theme-menu');
    if (menu && menu.classList.contains('show') && !e.target.closest('.theme-picker')) {
        menu.classList.remove('show');
    }
});
`;

js = js + '\n' + themeJs;
fs.writeFileSync('script.js', js);
