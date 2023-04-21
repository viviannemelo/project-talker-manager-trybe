const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '../talker.json');

const writeFile = async (talk) => {
    const talkers = await fs.writeFile(talkerPath, JSON.stringify(talk));
    return talkers;
};

module.exports = {
    writeFile,
};