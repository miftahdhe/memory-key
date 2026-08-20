const crypto = globalThis.crypto;
const SALT = "2026MiftahHernes";

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
            iterations: 100000,
            hash: "SHA-256"
        },
        keyMaterial,
        256
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function test() {
    console.log("0512:", await hashString('0512'));
    console.log("1910:", await hashString('1910'));
}
test();
