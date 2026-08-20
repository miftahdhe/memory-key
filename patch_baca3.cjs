const fs = require('fs');
let code = fs.readFileSync('pages/baca.js', 'utf8');

code = code.replace(`    function processText() {
        parseTextToTokens();
        
        // Wait for fonts to load before measuring
        document.fonts.ready.then(() => {
            paginateText();
            setTimeout(() => {
                loadingScreen.classList.remove('active');
                bookScreen.classList.add('active');
                setTimeout(() => {
                    hintText.classList.add('visible');
                }, 1000);
            }, 1500);
        });
    }
    
    // Disable rest of old code block that called document.fonts.ready
    return;
    // Wait for fonts to load before measuring
    await document.fonts.ready; await new Promise(r => setTimeout(r, 100));
    
    // We will measure pages now
    measurePages();
    
    loadingScreen.classList.remove('active');
    bookScreen.classList.add('active');
    
    setTimeout(() => {
        hintText.classList.add('visible');
    }, 1000);`, `    function processText() {
        parseTextToTokens();
        
        // Wait for fonts to load before measuring
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
    }`);

fs.writeFileSync('pages/baca.js', code);
