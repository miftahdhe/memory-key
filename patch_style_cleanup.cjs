const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

css = css.replace(/\.title, \.dashboard-title \{[\s\S]*?\}/, `.title {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 2.5rem;
    font-weight: 400;
    letter-spacing: -0.02em;
    margin-bottom: 0.5rem;
    opacity: 0.9;
}`);

css = css.replace(/\.dashboard-title \{[\s\S]*?\}/, '');
css = css.replace(/\.dashboard-greeting \{[\s\S]*?\}/, '');
css = css.replace(/\.dashboard-divider \{[\s\S]*?\}/, '');

fs.writeFileSync('style.css', css);
