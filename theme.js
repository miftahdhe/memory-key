const themes = {
    'default': {
        '--bg-color': '#fce4ec',
        '--text-primary': '#880e4f',
        '--text-secondary': 'rgba(136, 14, 79, 0.6)',
        '--accent': '#d81b60',
        '--error': '#d32f2f',
        '--key-border': 'rgba(136, 14, 79, 0.2)',
        '--key-active': 'rgba(216, 27, 96, 0.15)',
        '--card-bg': 'rgba(255, 255, 255, 0.6)',
        '--bg-gradient': 'linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%)',
        '--orb-1': 'rgba(216, 27, 96, 0.15)',
        '--orb-2': 'rgba(255, 140, 0, 0.1)'
    },
    'ocean': {
        '--bg-color': '#e0f7fa',
        '--text-primary': '#006064',
        '--text-secondary': 'rgba(0, 96, 100, 0.6)',
        '--accent': '#00acc1',
        '--error': '#d32f2f',
        '--key-border': 'rgba(0, 96, 100, 0.2)',
        '--key-active': 'rgba(0, 188, 212, 0.15)',
        '--card-bg': 'rgba(255, 255, 255, 0.6)',
        '--bg-gradient': 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)',
        '--orb-1': 'rgba(0, 188, 212, 0.15)',
        '--orb-2': 'rgba(38, 166, 154, 0.1)'
    },
    'midnight': {
        '--bg-color': '#121212',
        '--text-primary': '#e0e0e0',
        '--text-secondary': 'rgba(224, 224, 224, 0.6)',
        '--accent': '#bb86fc',
        '--error': '#cf6679',
        '--key-border': 'rgba(224, 224, 224, 0.3)',
        '--key-active': 'rgba(187, 134, 252, 0.2)',
        '--card-bg': 'rgba(30, 30, 30, 0.6)',
        '--bg-gradient': 'linear-gradient(135deg, #121212 0%, #1e1e1e 100%)',
        '--orb-1': 'rgba(187, 134, 252, 0.15)',
        '--orb-2': 'rgba(3, 218, 198, 0.1)'
    },
    'forest': {
        '--bg-color': '#e8f5e9',
        '--text-primary': '#1b5e20',
        '--text-secondary': 'rgba(27, 94, 32, 0.6)',
        '--accent': '#4caf50',
        '--error': '#d32f2f',
        '--key-border': 'rgba(27, 94, 32, 0.2)',
        '--key-active': 'rgba(76, 175, 80, 0.15)',
        '--card-bg': 'rgba(255, 255, 255, 0.6)',
        '--bg-gradient': 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
        '--orb-1': 'rgba(76, 175, 80, 0.15)',
        '--orb-2': 'rgba(139, 195, 74, 0.1)'
    },
    'coffee': {
        '--bg-color': '#efebe9',
        '--text-primary': '#4e342e',
        '--text-secondary': 'rgba(78, 52, 46, 0.6)',
        '--accent': '#795548',
        '--error': '#d32f2f',
        '--key-border': 'rgba(78, 52, 46, 0.2)',
        '--key-active': 'rgba(121, 85, 72, 0.15)',
        '--card-bg': 'rgba(255, 255, 255, 0.6)',
        '--bg-gradient': 'linear-gradient(135deg, #efebe9 0%, #d7ccc8 100%)',
        '--orb-1': 'rgba(121, 85, 72, 0.15)',
        '--orb-2': 'rgba(141, 110, 99, 0.1)'
    }
};

function applyTheme(themeName) {
    const theme = themes[themeName] || themes['default'];
    for (const key in theme) {
        document.documentElement.style.setProperty(key, theme[key]);
    }
    localStorage.setItem('memory_key_theme', themeName);
}

// Auto load theme
const savedTheme = localStorage.getItem('memory_key_theme') || 'default';
applyTheme(savedTheme);
