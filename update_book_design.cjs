const fs = require('fs');
let html = fs.readFileSync('pages/diary.html', 'utf8');

const newCss = `
        .book-card {
            background: linear-gradient(135deg, #a61246, #63082e);
            border-radius: 3px 12px 12px 3px;
            /* Combine drop shadow and the "page edges" on the right/bottom */
            box-shadow: 
                inset 4px 0 10px rgba(0,0,0,0.5), /* deep spine shadow */
                inset 6px 0 2px rgba(255,255,255,0.15), /* spine highlight */
                inset -1px -1px 2px rgba(0,0,0,0.3), /* subtle inner shadow */
                2px 2px 0px #fff, /* page edge 1 */
                3px 3px 0px #f4f0ea, /* page edge 2 */
                4px 4px 0px #e2dcd2, /* page edge 3 */
                6px 8px 15px rgba(0,0,0,0.4); /* actual drop shadow */
            border-left: 12px solid #500424; /* solid spine */
            padding: 20px 15px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            position: relative;
            min-height: 170px;
            text-decoration: none;
            overflow: hidden;
            border-right: 1px solid rgba(0,0,0,0.1);
        }
        
        /* Book Cover Texture / Shine */
        .book-card::after {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 10%, rgba(255,255,255,0) 20%);
            pointer-events: none;
        }

        /* Gold frame ornament */
        .book-card::before {
            content: '';
            position: absolute;
            top: 10px; right: 10px; bottom: 10px; left: 10px;
            border: 1px solid #d4af37;
            border-radius: 2px 8px 8px 2px;
            opacity: 0.6;
            pointer-events: none;
            box-shadow: inset 0 0 0 3px rgba(212, 175, 55, 0.2);
        }

        .book-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 
                inset 4px 0 10px rgba(0,0,0,0.5), 
                inset 6px 0 2px rgba(255,255,255,0.15), 
                2px 2px 0px #fff, 
                3px 3px 0px #f4f0ea, 
                4px 4px 0px #e2dcd2, 
                8px 12px 20px rgba(0,0,0,0.5);
        }

        .book-title {
            font-weight: 700;
            color: #fcebbb; /* Gold text */
            font-size: 16px;
            line-height: 1.3;
            margin-bottom: 10px;
            font-family: 'Playfair Display', serif;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.6);
            z-index: 2;
            letter-spacing: 0.5px;
        }
        .book-author {
            font-size: 11px;
            color: #d4af37;
            font-family: 'Inter', sans-serif;
            font-style: italic;
            z-index: 2;
            letter-spacing: 1px;
            text-transform: uppercase;
        }
        .delete-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(0,0,0,0.3);
            color: #fff;
            border: 1px solid rgba(255,255,255,0.2);
            width: 26px;
            height: 26px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
            z-index: 10;
        }
        .delete-btn:hover {
            background: #e53935;
            border-color: #fff;
            color: #fff;
            transform: scale(1.1);
        }
`;

// Extract everything between .book-card { and .books-grid { (wait, .books-grid is before .book-card).
// Let's replace using regex.
const regex = /\.book-card \{[\s\S]*?\.delete-btn:hover \{[\s\S]*?\}/;
html = html.replace(regex, newCss.trim());

fs.writeFileSync('pages/diary.html', html);
console.log("Done updating book card design.");
