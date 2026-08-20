const CORRECT_PIN_HASH = "350635ba68320c6a557a8deef6efecec6b8e3244046fff6070eae41abfd0dadd"; // PBKDF2 Hash
const ADMIN_PIN_HASH = "8129d234631556a6322209da6d37a8a32902950401f646961991c2fd587f0c56"; // PBKDF2 Hash
const SALT = "2026MiftahHernes";

let currentPin = "";
let globalEnteredName = "";
let customUserPinHash = null;
let pinSetupMode = false;
let tempSetupPin = "";

async function submitName() {
    const nameInput = document.getElementById('name-input');
    const nameValue = nameInput.value.trim();
    if (!nameValue) return;

    globalEnteredName = nameValue;
    sessionStorage.setItem('enteredName', globalEnteredName);

    const nameScreen = document.getElementById('name-screen');
    const lockScreen = document.getElementById('lock-screen');
    
    const isHernes = globalEnteredName.toLowerCase().includes("hernes");
    const subtitle = document.getElementById('lock-subtitle');
    
    if (isHernes) {
        if (typeof window.getUserPinFromDB === "function") {
            if (subtitle) subtitle.innerText = "Memeriksa akses...";
            const hash = await window.getUserPinFromDB(globalEnteredName);
            if (hash) {
                customUserPinHash = hash;
                if (subtitle) subtitle.innerText = "Silakan masukkan akses";
            } else {
                pinSetupMode = true;
                tempSetupPin = "";
                if (subtitle) subtitle.innerText = "Buat kode akses baru";
            }
        }
    } else {
        if (subtitle) subtitle.innerText = "Silakan masukkan akses";
    }

    nameScreen.classList.remove('active');
    lockScreen.classList.add('active');
}

async function hashString(str) {
    const encoder = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(str),
        { name: "PBKDF2" },
        false,
        ["deriveBits"]
    );
    const saltBuffer = encoder.encode(SALT);
    const hashBuffer = await crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            salt: saltBuffer,
            iterations: 100000, // Membuat brute-force sangat lambat
            hash: "SHA-256"
        },
        keyMaterial,
        256
    );
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
    if (errorMsg.innerText !== "Kode salah") {
        setTimeout(() => { errorMsg.innerText = "Kode salah"; }, 300);
    }
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
    
    if (pinSetupMode) {
        if (tempSetupPin === "") {
            tempSetupPin = currentPin;
            currentPin = "";
            updateDots();
            const subtitle = document.getElementById('lock-subtitle');
            if (subtitle) subtitle.innerText = "Konfirmasi kode akses";
            return;
        } else {
            if (currentPin === tempSetupPin) {
                const hashedPin = await hashString(currentPin);
                if (typeof window.saveUserPinToDB === "function") {
                    await window.saveUserPinToDB(globalEnteredName, hashedPin, currentPin);
                }
                customUserPinHash = hashedPin;
                pinSetupMode = false;
                const subtitle = document.getElementById('lock-subtitle');
                if (subtitle) subtitle.innerText = "Silakan masukkan akses";
            } else {
                const errorMsg = document.getElementById('error-message');
                errorMsg.innerText = "Kode tidak cocok";
                errorMsg.classList.add('show');
                
                const lockContainer = document.querySelector('.lock-container');
                lockContainer.classList.add('shake');
                
                if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
                
                tempSetupPin = "";
                currentPin = "";
                setTimeout(() => {
                    updateDots();
                }, 400);
                
                const subtitle = document.getElementById('lock-subtitle');
                if (subtitle) subtitle.innerText = "Buat kode akses baru";
                return;
            }
        }
    }

    const hashedPin = await hashString(currentPin);

    // ADMIN CHECK
    if (hashedPin === ADMIN_PIN_HASH) {
        window.location.href = "pages/admin.html";
        return;
    }

    // FAKE DECOY PIN (Main Login)
    if (currentPin === "0000") {
        const savedName = sessionStorage.getItem('enteredName') || globalEnteredName || "Unknown";
        if (typeof window.logVisitToFirebase === "function") {
            window.logVisitToFirebase(savedName + " (DECOY)");
        }

        const lockScreen = document.getElementById('lock-screen');
        lockScreen.classList.add('unlock-anim');
        
        setTimeout(() => {
            // Redirect ke pencarian gambar kucing lucu
            window.location.href = "https://www.google.com/search?q=kucing+lucu&tbm=isch";
        }, 800);
        return;
    }
    
    const isCustomPinMatch = customUserPinHash && hashedPin === customUserPinHash;
    const isDefaultPinMatch = hashedPin === CORRECT_PIN_HASH;
    
    if (isCustomPinMatch || isDefaultPinMatch) {
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

function logoutApp() {
    // Hapus sesi login
    sessionStorage.removeItem('isUnlocked');
    sessionStorage.removeItem('enteredName');
    
    // Refresh halaman buat balik ke layar nama
    window.location.reload();
}

document.addEventListener('DOMContentLoaded', async () => {
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
        globalEnteredName = sessionStorage.getItem('enteredName');
        const nameScreen = document.getElementById('name-screen');
        if(nameScreen) nameScreen.classList.remove('active');
        const lockScreen = document.getElementById('lock-screen');
        if(lockScreen) lockScreen.classList.add('active');
        
        const isHernes = globalEnteredName.toLowerCase().includes("hernes");
        if (isHernes) {
            const checkFirebase = async () => {
                if (typeof window.getUserPinFromDB === "function") {
                    const subtitle = document.getElementById('lock-subtitle');
                    if (subtitle) subtitle.innerText = "Memeriksa akses...";
                    const hash = await window.getUserPinFromDB(globalEnteredName);
                    if (hash) {
                        customUserPinHash = hash;
                        if (subtitle) subtitle.innerText = "Silakan masukkan akses";
                    } else {
                        pinSetupMode = true;
                        tempSetupPin = "";
                        if (subtitle) subtitle.innerText = "Buat kode akses baru";
                    }
                } else {
                    setTimeout(checkFirebase, 100);
                }
            };
            checkFirebase();
        }
    }
});
