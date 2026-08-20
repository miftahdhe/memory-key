const fs = require('fs');
let code = fs.readFileSync('firestore.rules', 'utf8');

code = code.replace(
    /function isValidUserDiary\(data\) {[\s\S]*?timestamp is timestamp;\s*}/,
    \`function isValidUserDiary(data) {
      return data.keys().hasAll(['title', 'content', 'enteredName', 'timestamp']) &&
             data.title is string &&
             data.content is string &&
             data.enteredName is string &&
             data.timestamp is timestamp &&
             (!data.keys().hasAny(['youtubeLink']) || data.youtubeLink is string);
    }\`
);
fs.writeFileSync('firestore.rules', code);
