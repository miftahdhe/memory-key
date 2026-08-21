const fs = require('fs');
let css = fs.readFileSync('pages/baca.css', 'utf8');

// Replace the old block I inserted
css = css.replace(/\.left-page-bg \.page-content \{[\s\S]*?\}\n\.page-content \{/, '.page-content {');

// Put the specific rules AFTER .page-content { ... } block
const specificRules = `
.left-page-bg .page-content {
    padding-left: 6%;
    padding-right: 12%;
}
.right-page-bg .page-content {
    padding-left: 12%;
    padding-right: 6%;
}
`;

css = css.replace(/(\.page-content \{[\s\S]*?\})/, `$1\n${specificRules}`);

// Ensure padding shorthand in .page-content is 12% top and bottom, 8% left/right by default
css = css.replace(/padding: 8% 8% 12% 8%;/, 'padding: 12% 8%;');

// Also decrease line-height slightly to fit a bit better on mobile
css = css.replace(/line-height: 1\.4;/, 'line-height: 1.5;');

fs.writeFileSync('pages/baca.css', css);
