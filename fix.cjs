const fs = require('fs');
let code = fs.readFileSync('pages/baca.js', 'utf8');

// The marker we added earlier
let startMarker = "    function processText() {";
let endMarker = "    let touchStartX = 0;";

let startIndex = code.indexOf(startMarker);
let endIndex = code.indexOf(endMarker);

if (startIndex > -1 && endIndex > -1) {
    let newBlock = `    function processText() {
        parseTextToTokens();
        
        document.fonts.ready.then(() => {
            setTimeout(() => {
                measurePages();
                
                loadingScreen.classList.remove('active');
                bookScreen.classList.add('active');
                
                setTimeout(() => {
                    hintText.classList.add('visible');
                }, 1000);
            }, 100);
        });
    }

`;
    code = code.slice(0, startIndex) + newBlock + code.slice(endIndex);
    fs.writeFileSync('pages/baca.js', code);
    console.log("Fixed!");
} else {
    console.log("Markers not found");
}
