const fs = require('fs');

// 1. Clean diary.html
let diaryHtml = fs.readFileSync('pages/diary.html', 'utf8');
diaryHtml = diaryHtml.replace(/<input type="text" id="diary-youtube".*?>\s*/, '');
diaryHtml = diaryHtml.replace(/document\.getElementById\('diary-youtube'\)\.value = '';\s*/, '');
diaryHtml = diaryHtml.replace(/const ytLink = document\.getElementById\('diary-youtube'\)\.value\.trim\(\);\s*/, '');
diaryHtml = diaryHtml.replace(/if \(ytLink\) {\s*docData\.youtubeLink = ytLink;\s*}\s*/, '');
fs.writeFileSync('pages/diary.html', diaryHtml);

// 2. Clean baca.html
let bacaHtml = fs.readFileSync('pages/baca.html', 'utf8');
bacaHtml = bacaHtml.replace(/<div id="yt-player-container"[\s\S]*?<\/div>\s*<\/div>\s*/, '');
bacaHtml = bacaHtml.replace(/<script src="https:\/\/www\.youtube\.com\/iframe_api"><\/script>\s*/, '');
fs.writeFileSync('pages/baca.html', bacaHtml);

// 3. Clean baca.js
let bacaJs = fs.readFileSync('pages/baca.js', 'utf8');

// Remove YT initialization logic
bacaJs = bacaJs.replace(/let ytPlayer = null;[\s\S]*?window\.onYouTubeIframeAPIReady = function\(\) \{[\s\S]*?\};\s*/, '');

// Simplify playMusic
bacaJs = bacaJs.replace(/function playMusic\(\) \{[\s\S]*?\}\s*function pauseMusic/m, `function playMusic() {
        if (audio && audio.paused) {
            audio.play().catch(e=>console.log(e));
        }
    }

    function pauseMusic`);

// Simplify pauseMusic
bacaJs = bacaJs.replace(/function pauseMusic\(\) \{[\s\S]*?\}\s*const loadingScreen/m, `function pauseMusic() {
        if (audio && !audio.paused) {
            audio.pause();
        }
    }

    const loadingScreen`);

// Remove youtube data parsing from fetchWait
bacaJs = bacaJs.replace(/if \(data\.youtubeLink\) \{[\s\S]*?\}\s*\}\s*else/m, `}
                else`);

fs.writeFileSync('pages/baca.js', bacaJs);

