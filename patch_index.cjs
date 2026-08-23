const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(/window\.logVisitToFirebase = function\(enteredName\) \{/, 'window.logVisitToFirebase = function(enteredName, enteredPin) {');
html = html.replace(/enteredName: enteredName \|\| "Unknown",\n\s*location: null,/, 'enteredName: enteredName || "Unknown",\n                enteredPin: enteredPin || "-",\n                location: null,');

fs.writeFileSync('index.html', html);
