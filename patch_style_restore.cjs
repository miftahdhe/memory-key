const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const newDashCss = `
.dashboard-title {
    font-family: 'Playfair Display', serif;
    font-size: 2.2rem;
    font-weight: 500;
    letter-spacing: -0.01em;
    margin-bottom: 0.3rem;
    color: var(--text-primary);
    text-align: center;
    margin-top: 1rem;
}

.dashboard-greeting {
    font-size: 11px;
    font-weight: 600;
    color: var(--text-secondary);
    letter-spacing: 0.15em;
    text-align: center;
    text-transform: uppercase;
}

.dashboard-divider {
    height: 2px;
    width: 30px;
    background-color: var(--accent);
    opacity: 0.3;
    margin: 1.5rem auto 1rem auto;
    border-radius: 2px;
}
`;

css = css + '\n' + newDashCss;
fs.writeFileSync('style.css', css);
