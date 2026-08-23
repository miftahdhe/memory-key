const fs = require('fs');
let html = fs.readFileSync('pages/admin.html', 'utf8');

// Find the stray "}" and "});" at the end before fetchLogs
// The pattern looks like:
/*
                            deleteLog(id);
                        }
                    }
                            }
        });

        async function fetchLogs() {
*/
html = html.replace(
    /deleteLog\(id\);\s*\}\s*\}\s*\}\s*\);\s*\}\s*\}\);\s*async function fetchLogs\(\) \{/,
    `deleteLog(id);
                        }
                    }
                });
            }

        async function fetchLogs() {`
);

fs.writeFileSync('pages/admin.html', html);
