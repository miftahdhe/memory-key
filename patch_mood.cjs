const fs = require('fs');
let html = fs.readFileSync('pages/mood.html', 'utf8');

// Update CSS for mood grid and buttons to make them smaller
html = html.replace(/gap: 15px;/, 'gap: 10px;');
html = html.replace(/margin-bottom: 30px;/, 'margin-bottom: 15px;');
html = html.replace(/padding: 20px 10px;/, 'padding: 10px 5px;');
html = html.replace(/font-size: 32px;/, 'font-size: 26px;');

// Update CSS for history-card to have position: relative
html = html.replace(/\.history-card \{/, '.history-card {\n            position: relative;');

// Update fetchMoods to include author in top right of history card
const replacement = `
                    const authorStr = data.enteredName ? data.enteredName.charAt(0).toUpperCase() + data.enteredName.slice(1) : "Anonim";
                    let timeStr = "";
                    if (data.timestamp) {
                        const date = data.timestamp.toDate ? data.timestamp.toDate() : new Date(data.timestamp);
                        timeStr = date.toLocaleString('id-ID', {day: 'numeric', month: 'short', hour: '2-digit', minute:'2-digit'});
                    }

                    // Extract emoji from string (it contains emoji at the end)
                    const label = data.mood || "Biasa aja ✨";
                    const parts = label.split(' ');
                    const emojiPart = parts.length > 1 ? parts.pop() : '✨';
                    const textPart = parts.join(' ');
                    
                    const noteHtml = data.note ? \`<div style="font-size: 12px; color: #475569; margin-top: 4px; font-style: italic;">"\${data.note.replace(/</g, "&lt;").replace(/>/g, "&gt;")}"</div>\` : "";
                    
                    el.innerHTML = \`
                        <div style="position: absolute; top: 12px; right: 15px; font-size: 10px; font-weight: 600; color: #64748b; background: rgba(255,255,255,0.8); padding: 3px 8px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">\${authorStr}</div>
                        <div class="emoji">\${emojiPart}</div>
                        <div class="details">
                            <div class="name">Hari ini merasa \${textPart.toLowerCase()}</div>
                            <div class="time">\${timeStr}</div>
                            \${noteHtml}
                        </div>
                    \`;
`;

html = html.replace(/const authorStr = data\.enteredName \? data\.enteredName\.charAt\(0\)\.toUpperCase\(\) \+ data\.enteredName\.slice\(1\) : "Anonim";[\s\S]*?<\/div>\\n\s*`;/, replacement.trim() + '\n                    `;');

fs.writeFileSync('pages/mood.html', html);
