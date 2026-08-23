const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Update root
css = css.replace(/:root \{[\s\S]*?\}/, `:root {
    --bg-color: #fce4ec;
    --text-primary: #880e4f;
    --text-secondary: rgba(136, 14, 79, 0.6);
    --accent: #d81b60;
    --error: #d32f2f;
    --key-border: rgba(136, 14, 79, 0.2);
    --key-active: rgba(216, 27, 96, 0.15);
    --card-bg: rgba(255, 255, 255, 0.6);
    --bg-gradient: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%);
    --orb-1: rgba(216, 27, 96, 0.15);
    --orb-2: rgba(255, 140, 0, 0.1);
}`);

// Update body background
css = css.replace(/background: linear-gradient\(135deg, #fce4ec 0%, #f8bbd0 100%\);/, 'background: var(--bg-gradient);');

// Update orbs
css = css.replace(/background: rgba\(216, 27, 96, 0\.15\);/, 'background: var(--orb-1);');
css = css.replace(/background: rgba\(255, 140, 0, 0\.1\);/, 'background: var(--orb-2);');

// Theme Picker Styles
const themePickerCss = `
/* Theme Picker */
.theme-picker {
    position: fixed;
    top: 15px;
    right: 15px;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.theme-picker-btn {
    background: var(--card-bg);
    border: 1px solid var(--key-border);
    color: var(--text-primary);
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 11px;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    cursor: pointer;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.3s ease;
}

.theme-picker-btn:hover {
    background: var(--key-active);
    transform: scale(1.05);
}

.theme-menu {
    position: absolute;
    top: 35px;
    right: 0;
    background: var(--card-bg);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 1px solid var(--key-border);
    border-radius: 12px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    opacity: 0;
    pointer-events: none;
    transform: translateY(-10px) scale(0.95);
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    transform-origin: top right;
}

.theme-menu.show {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0) scale(1);
}

.theme-option {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 10px;
    border-radius: 8px;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 500;
    color: var(--text-primary);
    transition: all 0.2s ease;
    border: 1px solid transparent;
}

.theme-option:hover {
    background: rgba(255, 255, 255, 0.5);
    border-color: var(--key-border);
}

.theme-option.active {
    background: var(--key-active);
    border-color: var(--accent);
}

.theme-color-circle {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,0.1);
}
`;

css = css + '\n' + themePickerCss;

fs.writeFileSync('style.css', css);
