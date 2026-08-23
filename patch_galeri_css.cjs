const fs = require('fs');
let css = fs.readFileSync('pages/galeri.css', 'utf8');

css = css.replace(/padding: 8px 8px 30px 8px;/, 'padding: 8px 8px 10px 8px;\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-start;');

css = css.replace(/\.polaroid-caption \{[\s\S]*?\}/, `.polaroid-caption {
    font-family: 'Caveat', cursive;
    color: #333;
    text-align: center;
    font-size: 1rem;
    margin-top: 6px;
    line-height: 1.2;
    width: 100%;
    word-wrap: break-word;
}`);

fs.writeFileSync('pages/galeri.css', css);
