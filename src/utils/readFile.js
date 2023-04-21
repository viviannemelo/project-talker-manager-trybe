const fs = require('fs').promises;

const path = require('path');

const talkerPath = path.resolve(__dirname, '../talker.json');

const readFile = async () => {
  try {
    const response = await fs.readFile(talkerPath);
    return JSON.parse(response);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
    readFile,
};