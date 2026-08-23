const fs = require('fs');
let html = fs.readFileSync('pages/admin.html', 'utf8');

// 1. Add CSS for Read Modal
const css = `
        /* Read Modal */
        #admin-read-modal {
            display: none;
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(15, 23, 42, 0.7);
            backdrop-filter: blur(4px);
            z-index: 10000;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        #admin-read-modal.active {
            display: flex;
        }
        .admin-read-content {
            background: #fff;
            width: 100%;
            max-width: 500px;
            max-height: 80vh;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        .admin-read-header {
            padding: 16px 20px;
            border-bottom: 1px solid #f1f5f9;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #f8fafc;
        }
        .admin-read-title {
            font-size: 16px;
            font-weight: 600;
            color: #1e293b;
            margin: 0;
            font-family: 'Inter', sans-serif;
        }
        .close-read-modal {
            background: none;
            border: none;
            font-size: 24px;
            color: #64748b;
            cursor: pointer;
            line-height: 1;
        }
        .admin-read-body {
            padding: 20px;
            overflow-y: auto;
            font-size: 14px;
            line-height: 1.6;
            color: #334155;
            font-family: 'Inter', sans-serif;
            white-space: pre-wrap;
        }
`;
html = html.replace(/<\/style>/, css + '\n    </style>');

// 2. Add Modal HTML
const modalHtml = `
    <!-- Read Text Modal -->
    <div id="admin-read-modal" onclick="closeAdminReadModal(event)">
        <div class="admin-read-content" onclick="event.stopPropagation()">
            <div class="admin-read-header">
                <h3 class="admin-read-title" id="admin-read-title">Isi Catatan</h3>
                <button class="close-read-modal" onclick="closeAdminReadModal()">×</button>
            </div>
            <div class="admin-read-body" id="admin-read-body">
                <!-- Text goes here -->
            </div>
        </div>
    </div>
`;
html = html.replace(/<!-- Lightbox Modal -->/, modalHtml + '\n    <!-- Lightbox Modal -->');

// 3. Add JS functions to window
const jsFuncs = `
        window.openAdminReadModal = function(title, encodedText) {
            document.getElementById('admin-read-title').textContent = title;
            document.getElementById('admin-read-body').innerHTML = decodeURIComponent(encodedText);
            document.getElementById('admin-read-modal').classList.add('active');
        };

        window.closeAdminReadModal = function(e) {
            if (e && e.target.id !== 'admin-read-modal' && e.target.className !== 'close-read-modal') return;
            document.getElementById('admin-read-modal').classList.remove('active');
        };
`;
html = html.replace(/window\.closeAdminLightbox = function\(\) \{[\s\S]*?\}/, '$&\n' + jsFuncs);

fs.writeFileSync('pages/admin.html', html);
