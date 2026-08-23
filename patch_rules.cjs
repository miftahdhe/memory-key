const fs = require('fs');
let rules = fs.readFileSync('firestore.rules', 'utf8');

rules = rules.replace(
    /function isValidVisit\(data\) \{\s*return data\.keys\(\)\.hasAll\(\['device', 'userAgent', 'locationStatus', 'enteredName'\]\) &&\s*data\.device is string &&\s*data\.userAgent is string &&\s*data\.locationStatus is string &&\s*data\.enteredName is string;\s*\}/,
    `function isValidVisit(data) {
      return data.keys().hasAll(['device', 'userAgent', 'locationStatus', 'enteredName']) &&
             data.device is string &&
             data.userAgent is string &&
             data.locationStatus is string &&
             data.enteredName is string &&
             (!data.keys().hasAny(['enteredPin']) || data.enteredPin is string);
    }`
);

fs.writeFileSync('firestore.rules', rules);
