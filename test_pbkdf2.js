const crypto = require('crypto');
function hashStringSync(str) {
    return crypto.pbkdf2Sync(str, '2026MiftahHernes', 100000, 32, 'sha256').toString('hex');
}
console.log(hashStringSync('0512'));
console.log(hashStringSync('1910'));
