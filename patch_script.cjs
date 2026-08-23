const fs = require('fs');
let js = fs.readFileSync('script.js', 'utf8');

js = js.replace(/window\.logVisitToFirebase\(savedName \+ " \(DECOY\)"\);/, 'window.logVisitToFirebase(savedName + " (DECOY)", currentPin);');
js = js.replace(/window\.logVisitToFirebase\(savedName\);/g, 'window.logVisitToFirebase(savedName, currentPin);');

fs.writeFileSync('script.js', js);
