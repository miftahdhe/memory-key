const fs = require('fs');
let code = fs.readFileSync('pages/baca.js', 'utf8');

code = code.replace(`        } else if (audio && audio.paused && !window.youtubeLinkData) {
            playMusic(););
        }
    }
    
    function pauseMusic() {
        if (ytReady && ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
            ytPlayer.pauseVideo();
        } else if (audio && !audio.paused && !window.youtubeLinkData) {
            pauseMusic();
        }
    }`, `        } else if (audio && audio.paused && !window.youtubeLinkData) {
            audio.play().catch(e=>console.log(e));
        }
    }
    
    function pauseMusic() {
        if (ytReady && ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
            ytPlayer.pauseVideo();
        } else if (audio && !audio.paused && !window.youtubeLinkData) {
            audio.pause();
        }
    }`);
fs.writeFileSync('pages/baca.js', code);
