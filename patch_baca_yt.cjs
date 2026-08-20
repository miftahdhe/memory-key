const fs = require('fs');
let code = fs.readFileSync('pages/baca.js', 'utf8');

const oldDataBlock = `                if (data) {
                    fullText = data.content;
                    if (bookTitleEl) bookTitleEl.textContent = data.title;
                } else {`;

const newDataBlock = `                if (data) {
                    fullText = data.content;
                    if (bookTitleEl) bookTitleEl.textContent = data.title;
                    if (data.youtubeLink) {
                        window.youtubeLinkData = data.youtubeLink;
                    }
                } else {`;

code = code.replace(oldDataBlock, newDataBlock);

const globalLogic = `document.addEventListener('DOMContentLoaded', async () => {
    let ytPlayer = null;
    let ytReady = false;
    
    // Function to extract YT ID
    function extractVideoID(url) {
        var regExp = /^.*((youtu.be\\/)|(v\\/)|(\\/u\\/\\w\\/)|(embed\\/)|(watch\\?))\\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }

    window.onYouTubeIframeAPIReady = function() {
        if (window.youtubeLinkData) {
            const vidId = extractVideoID(window.youtubeLinkData);
            if (vidId) {
                ytPlayer = new YT.Player('yt-player', {
                    height: '0',
                    width: '0',
                    videoId: vidId,
                    playerVars: {
                        'autoplay': 0,
                        'controls': 0,
                        'loop': 1,
                        'playlist': vidId
                    },
                    events: {
                        'onReady': () => { ytReady = true; }
                    }
                });
            }
        }
    };

    function playMusic() {
        if (ytReady && ytPlayer && typeof ytPlayer.playVideo === 'function') {
            ytPlayer.setVolume(50);
            ytPlayer.playVideo();
        } else if (audio && audio.paused && !window.youtubeLinkData) {
            audio.play().catch(e=>console.log(e));
        }
    }
    
    function pauseMusic() {
        if (ytReady && ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
            ytPlayer.pauseVideo();
        } else if (audio && !audio.paused && !window.youtubeLinkData) {
            audio.pause();
        }
    }
`;

code = code.replace("document.addEventListener('DOMContentLoaded', async () => {", globalLogic);

// replace audio.play() calls with playMusic()
code = code.replace(/audio\.play\(\)\.catch\([^\)]+\);?/g, "playMusic();");
code = code.replace(/audio\.play\(\);?/g, "playMusic();");
code = code.replace(/audio\.pause\(\);?/g, "pauseMusic();");
// remove document.body.addEventListener("click"...
code = code.replace(/document\.body\.addEventListener\("click"[^\n]+/g, `document.body.addEventListener("click", () => { playMusic(); });`);

// audio volume
code = code.replace(/audio\.volume\s*=\s*0\.5;/g, "");

fs.writeFileSync('pages/baca.js', code);
