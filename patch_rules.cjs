const fs = require('fs');
let rules = fs.readFileSync('firestore.rules', 'utf8');

rules = rules.replace(
    /allow delete: if false; \/\/ real deletion is blocked/,
    'allow delete: if true;'
);

fs.writeFileSync('firestore.rules', rules);
