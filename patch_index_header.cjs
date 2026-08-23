const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

html = html.replace(
    /<h2 class="dashboard-title">Memory Key<\/h2>\s*<p class="dashboard-greeting">TO HERNES<\/p>\s*<div class="dashboard-divider"><\/div>/,
    `<div style="text-align: center; margin-bottom: 25px;">
                <h2 class="dashboard-title">Memory Key</h2>
                <p class="dashboard-greeting">A Private Space For Hernes</p>
                <div class="dashboard-divider"></div>
            </div>`
);

fs.writeFileSync('index.html', html);
