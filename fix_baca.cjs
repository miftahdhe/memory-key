const fs = require('fs');
let js = fs.readFileSync('pages/baca.js', 'utf8');

const ytLogic = `
    let ytPlayer = null;
    let ytReady = false;

    // Function to extract YT ID
    function extractVideoID(url) {
        var regExp = /^.*((youtu.be\\/)|(v\\/)|(\\/u\\/\\w\\/)|(embed\\/)|(watch\\?))\\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }

    function initYoutubePlayer(link) {
        if (!link) return;
        const vidId = extractVideoID(link);
        if (vidId && window.YT && window.YT.Player && !ytPlayer) {
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

    window.onYouTubeIframeAPIReady = function() {
        if (window.youtubeLinkData) {
            initYoutubePlayer(window.youtubeLinkData);
        } else {
            // It might be loaded later, we will handle it after fetch
            window.isYTAPIReady = true;
        }
    };
`;

js = js.replace(/let ytPlayer = null;[\s\S]*?ytPlayer\.pauseVideo\(\);\s*}\s*else if \(audio && !audio\.paused && !window\.youtubeLinkData\) {\s*audio\.pause\(\);\s*}\s*}/, ytLogic + `
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
`);

const fetchWaitLogic = `
                const data = await window.fetchDiaryFromDB(dbId);
                if (data) {
                    fullText = data.content;
                    if (bookTitleEl) bookTitleEl.textContent = data.title;
                    if (data.youtubeLink) {
                        window.youtubeLinkData = data.youtubeLink;
                        if (window.YT && window.YT.Player) {
                            initYoutubePlayer(data.youtubeLink);
                        }
                    }
                }
`;

js = js.replace(/const data = await window\.fetchDiaryFromDB\(dbId\);[\s\S]*?}\s*else {\s*fullText = "Teks diary tidak ditemukan\.";\s*}/, fetchWaitLogic + `                else {
                    fullText = "Teks diary tidak ditemukan.";
                }`);


fs.writeFileSync('pages/baca.js', js);
