const fs = require('fs');
let html = fs.readFileSync('pages/admin.html', 'utf8');

html = html.replace(
    /import { getFirestore, collection, query, orderBy, getDocs } from "https:\/\/www\.gstatic\.com\/firebasejs\/10\.12\.0\/firebase-firestore\.js";/,
    `import { getFirestore, collection, query, orderBy, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";`
);

fs.writeFileSync('pages/admin.html', html);
