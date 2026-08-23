const fs = require('fs');
let htmlG = fs.readFileSync('pages/galeri.html', 'utf8');

const dateLogic = `
                    let timeStr = "";
                    if (photo.timestamp) {
                        const date = photo.timestamp.toDate ? photo.timestamp.toDate() : new Date(photo.timestamp);
                        timeStr = \`<div style="font-size: 9px; color: #888; font-family: 'Inter', sans-serif; margin-top: 2px;">\${date.toLocaleString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'})}</div>\`;
                    }
                    const caption = photo.caption ? photo.caption : (photo.isPrivate ? \`Rahasia \${i+1}\` : \`Upload oleh \${photo.enteredName}\`);
`;

htmlG = htmlG.replace(/const caption = photo\.caption \? photo\.caption : \`Upload oleh \$\{photo\.enteredName\}\`;/, dateLogic);
htmlG = htmlG.replace(/<div class="polaroid-caption">\$\{caption\}<\/div>/, '<div class="polaroid-caption">${caption}\n                        ${timeStr}\n                        </div>');

htmlG = htmlG.replace(/const caption = photo\.caption \? photo\.caption : \`Rahasia \$\{i\+1\}\`;/, dateLogic);
htmlG = htmlG.replace(/<div class="polaroid-caption">\$\{caption\}<\/div>/, '<div class="polaroid-caption">${caption}\n                        ${timeStr}\n                        </div>');

fs.writeFileSync('pages/galeri.html', htmlG);
