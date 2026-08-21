const fs = require('fs');
let css = fs.readFileSync('pages/baca.css', 'utf8');

css = css.replace(/padding: 15px 15px;/, 'padding: 8% 8% 12% 8%;');

const spineCss = `
.left-page-bg .page-content {
    padding-left: 8%;
    padding-right: 12%;
}
.right-page-bg .page-content {
    padding-left: 12%;
    padding-right: 8%;
}
`;

css = css.replace(/\.page-content \{/, spineCss + '\n.page-content {');

// Let's also adjust the font-sizes for smaller screens to fit better
css = css.replace(/font-size: 18px;/, 'font-size: 14px;');
css = css.replace(/@media \(min-width: 400px\) \{ \.page-content \{ font-size: 20px; \} \}/, '@media (min-width: 400px) { .page-content { font-size: 16px; } }');
css = css.replace(/@media \(min-width: 600px\) \{ \.page-content \{ font-size: 23px; \} \}/, '@media (min-width: 600px) { .page-content { font-size: 20px; } }');
css = css.replace(/@media \(min-width: 800px\) \{ \.page-content \{ font-size: 23px; \} \}/, '@media (min-width: 800px) { .page-content { font-size: 22px; } }');

fs.writeFileSync('pages/baca.css', css);
