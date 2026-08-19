const CORRECT_PIN_HASH = "78c72f67941a420cd4e5ee9fdabcaeaba6d72f16160915085f9802220fd83799";
let currentPin = "";
let globalEnteredName = "";

function submitName() {
    const nameInput = document.getElementById('name-input');
    const nameValue = nameInput.value.trim();
    if (!nameValue) return;

    globalEnteredName = nameValue;
    sessionStorage.setItem('enteredName', globalEnteredName);

    const nameScreen = document.getElementById('name-screen');
    const lockScreen = document.getElementById('lock-screen');

    nameScreen.classList.remove('active');
    lockScreen.classList.add('active');
}

async function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index < currentPin.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    });
}

function pressKey(num) {
    const errorMsg = document.getElementById('error-message');
    errorMsg.classList.remove('show');
    const lockContainer = document.querySelector('.lock-container');
    lockContainer.classList.remove('shake');

    // Trigger music on first interaction
    const bgMusic = document.getElementById('main-music');
    if (bgMusic && bgMusic.paused) {
        bgMusic.volume = 0.4;
        bgMusic.play().catch(e => console.log('Audio play failed:', e));
    }

    if (currentPin.length < 4) {
        currentPin += num;
        updateDots();
    }
}

function clearPin() {
    currentPin = currentPin.slice(0, -1);
    updateDots();
    const errorMsg = document.getElementById('error-message');
    errorMsg.classList.remove('show');
}

async function submitPin() {
    if (currentPin.length === 0) return;
    
    if (currentPin === "1910") {
        window.location.href = "pages/admin.html";
        return;
    }

    // FAKE DECOY PIN (Main Login)
    if (currentPin === "0000") {
        const lockScreen = document.getElementById('lock-screen');
        lockScreen.classList.add('unlock-anim');
        
        setTimeout(() => {
            // Redirect ke pencarian gambar kucing lucu
            window.location.href = "https://www.google.com/search?q=kucing+lucu&tbm=isch";
        }, 800);
        return;
    }

    const hashedPin = await hashString(currentPin);
    
    if (hashedPin === CORRECT_PIN_HASH) {
        const savedName = sessionStorage.getItem('enteredName') || globalEnteredName || "Unknown";
        
        if (typeof window.logVisitToFirebase === "function") {
            window.logVisitToFirebase(savedName);
        }

        const normalizedName = savedName.toLowerCase();
        const isAuthorized = normalizedName.includes("hernes") || normalizedName.includes("miftah");

        if (isAuthorized) {
            sessionStorage.setItem('isUnlocked', 'true');
            // Unlock success
            const lockScreen = document.getElementById('lock-screen');
            lockScreen.classList.add('unlock-anim');
            
            setTimeout(() => {
                lockScreen.classList.remove('active');
                lockScreen.classList.remove('unlock-anim');
                
                const welcomeScreen = document.getElementById('welcome-screen');
                welcomeScreen.classList.add('active');
                
                setTimeout(() => {
                    welcomeScreen.classList.add('fade-out');
                    
                    setTimeout(() => {
                        welcomeScreen.classList.remove('active');
                        welcomeScreen.classList.remove('fade-out');
                        document.getElementById('main-screen').classList.add('active');
                        
                        // Play background music
                        const bgMusic = document.getElementById('main-music');
                        if(bgMusic) {
                            bgMusic.volume = 0.4;
                            bgMusic.play().catch(e => console.log('Audio play failed:', e));
                        }
                    }, 800);
                }, 2000);
            }, 800);
        } else {
            // Fake unlock for unauthorized names (Decoy Trap)
            sessionStorage.removeItem('isUnlocked');
            const lockScreen = document.getElementById('lock-screen');
            lockScreen.classList.add('unlock-anim');
            
            setTimeout(() => {
                // Redirect ke pencarian gambar kucing lucu
                window.location.href = "https://www.google.com/search?q=kucing+lucu&tbm=isch";
            }, 800);
        }
    } else {
        // Unlock failed
        const errorMsg = document.getElementById('error-message');
        errorMsg.classList.add('show');
        
        const lockContainer = document.querySelector('.lock-container');
        lockContainer.classList.add('shake');
        
        // Vibrate if supported
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
        
        currentPin = "";
        setTimeout(() => {
            updateDots();
        }, 400);
    }
}

function openMenu(menuName) {
    window.location.href = `pages/${menuName}.html`;
}

document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('isUnlocked') === 'true') {
        const nameScreen = document.getElementById('name-screen');
        if(nameScreen) nameScreen.classList.remove('active');
        const lockScreen = document.getElementById('lock-screen');
        if(lockScreen) lockScreen.classList.remove('active');
        
        const mainScreen = document.getElementById('main-screen');
        if(mainScreen) mainScreen.classList.add('active');
        
        // Play music if already unlocked
        const bgMusic = document.getElementById('main-music');
        if(bgMusic) {
            bgMusic.volume = 0.4;
            // Interaction might be needed, but we attempt anyway
            bgMusic.play().catch(e => {
                // If autoplay blocked, add one-time click listener to body
                document.body.addEventListener('click', () => {
                    bgMusic.play();
                }, { once: true });
            });
        }
    } else if (sessionStorage.getItem('enteredName')) {
        // Name already entered but not unlocked yet
        const nameScreen = document.getElementById('name-screen');
        if(nameScreen) nameScreen.classList.remove('active');
        const lockScreen = document.getElementById('lock-screen');
        if(lockScreen) lockScreen.classList.add('active');
    }
});
