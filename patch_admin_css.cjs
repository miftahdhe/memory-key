const fs = require('fs');
let html = fs.readFileSync('pages/admin.html', 'utf8');

html = html.replace(
    /table, thead, tbody, th, td, tr \{\s*display: block;\s*\}/,
    `table, thead, tbody, th, td, tr {
                display: block;
            }
            table {
                min-width: auto; /* Fix horizontal overflow */
            }`
);

fs.writeFileSync('pages/admin.html', html);
