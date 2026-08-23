const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Inject script into head
html = html.replace(/<\/head>/, '    <script src="theme.js"></script>\n</head>');

// Inject theme picker into main screen
const themePickerHtml = `
        <div class="theme-picker">
            <button class="theme-picker-btn" onclick="toggleThemeMenu(event)">
                <span class="icon">✨</span> Tema
            </button>
            <div class="theme-menu" id="theme-menu">
                <div class="theme-option" onclick="selectTheme('default', event)">
                    <div class="theme-color-circle" style="background: #fce4ec;"></div> Rose
                </div>
                <div class="theme-option" onclick="selectTheme('ocean', event)">
                    <div class="theme-color-circle" style="background: #e0f7fa;"></div> Ocean
                </div>
                <div class="theme-option" onclick="selectTheme('midnight', event)">
                    <div class="theme-color-circle" style="background: #121212;"></div> Midnight
                </div>
                <div class="theme-option" onclick="selectTheme('forest', event)">
                    <div class="theme-color-circle" style="background: #e8f5e9;"></div> Forest
                </div>
                <div class="theme-option" onclick="selectTheme('coffee', event)">
                    <div class="theme-color-circle" style="background: #efebe9;"></div> Coffee
                </div>
            </div>
        </div>
`;

html = html.replace(/<div id="main-screen" class="screen">/, '<div id="main-screen" class="screen">\n' + themePickerHtml);

fs.writeFileSync('index.html', html);
