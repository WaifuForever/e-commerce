const fs = require('fs');

const messages = JSON.parse(fs.readFileSync(__dirname + '/messages.json'));

export const getMessage = (path: string) => {
    return messages[path] || null;
};
