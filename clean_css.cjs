const fs = require('fs');
let css = fs.readFileSync('pages/baca.css', 'utf8');

// Remove all instances of .left-page-bg .page-content
css = css.replace(/\.left-page-bg \.page-content\s*\{[\s\S]*?\}/g, '');
// Remove all instances of .right-page-bg .page-content
css = css.replace(/\.right-page-bg \.page-content\s*\{[\s\S]*?\}/g, '');

const finalPageContent = `
.page-content {
    padding: 12% 8%;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    font-family: 'Caveat', cursive;
    font-size: 14px;
    line-height: 1.5;
    color: #1a2a40; /* Dark blue ink */
    text-align: left;
    word-wrap: break-word;
    white-space: pre-wrap;
    text-shadow: 0px 0px 1px rgba(26, 42, 64, 0.2); /* Slight bleed effect */
}

.left-page-bg .page-content {
    padding-left: 6%;
    padding-right: 12%;
}

.right-page-bg .page-content {
    padding-left: 12%;
    padding-right: 6%;
}
`;

css = css.replace(/\.page-content\s*\{[\s\S]*?\}/, finalPageContent.trim());

fs.writeFileSync('pages/baca.css', css);
