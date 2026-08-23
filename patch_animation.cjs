const fs = require('fs');
let html = fs.readFileSync('pages/admin.html', 'utf8');

const animationCSS = `
        @keyframes modalFadeIn {
            from { opacity: 0; transform: scale(0.95) translateY(10px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .admin-read-content {
            animation: modalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes backdropFade {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        #admin-read-modal.active {
            display: flex;
            animation: backdropFade 0.2s ease-out forwards;
        }
`;

html = html.replace(/<\/style>/, animationCSS + '\n    </style>');

fs.writeFileSync('pages/admin.html', html);
