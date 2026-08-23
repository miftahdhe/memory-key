const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Remove old menu-btn classes
css = css.replace(/\.menu-container \{[\s\S]*?\.menu-btn-arrow \{[\s\S]*?\}/, '');

const newMenuCss = `
.menu-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
    margin-bottom: 2rem;
}

.menu-item {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.8);
    padding: 12px 16px;
    border-radius: 16px;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(136, 14, 79, 0.04);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    text-align: left;
    width: 100%;
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

.menu-item:hover, .menu-item:active {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(136, 14, 79, 0.08);
    background: rgba(255, 255, 255, 0.85);
}

.menu-item:active {
    transform: translateY(0) scale(0.98);
}

.menu-item-icon {
    font-size: 22px;
    margin-right: 16px;
    background: rgba(255, 255, 255, 0.8);
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(136, 14, 79, 0.04);
}

.menu-item-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.menu-item-title {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
}

.menu-item-desc {
    font-family: 'Inter', sans-serif;
    font-size: 11.5px;
    color: var(--text-secondary);
    font-weight: 400;
}

.menu-item-arrow {
    font-size: 18px;
    color: var(--text-secondary);
    opacity: 0.5;
    font-weight: 300;
}

.logout-item {
    background: rgba(211, 47, 47, 0.05);
    border-color: rgba(211, 47, 47, 0.1);
    margin-top: 8px;
}
.logout-item:hover {
    background: rgba(211, 47, 47, 0.1);
}
.logout-item .menu-item-icon {
    background: rgba(255, 255, 255, 0.9);
}

.dashboard-title {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    font-weight: 500;
    letter-spacing: -0.01em;
    margin-bottom: 0.2rem;
    color: var(--text-primary);
    text-align: center;
    margin-top: 1rem;
}

.dashboard-greeting {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary);
    letter-spacing: 0.1em;
    text-align: center;
    text-transform: uppercase;
}

.dashboard-divider {
    height: 2px;
    width: 30px;
    background-color: var(--accent);
    opacity: 0.3;
    margin: 1.5rem auto 2rem auto;
    border-radius: 2px;
}
`;

css = css + '\n' + newMenuCss;

fs.writeFileSync('style.css', css);
