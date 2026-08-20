const crypto = require('crypto');
function hashStringSync(str) {
    return crypto.pbkdf2Sync(str, '2026MiftahHernes', 100000, 32, 'sha256').toString('hex');
}
console.log("0512:", hashStringSync('0512'));
console.log("1910:", hashStringSync('1910'));
