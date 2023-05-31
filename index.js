const { writeFile } = require('fs').promises;
const { join } = require('path');
const axios = require('axios');
const mergeImg = require('merge-img');
const argv = require('minimist')(process.argv.slice(2));

const {
  greeting = 'Hello',
  who = 'You',
  width = 400,
  height = 500,
  color = 'Pink',
  size = 100,
} = argv;

async function fetchCatImage(text) {
  const url = `https://cataas.com/cat/says/${text}?width=${width}&height=${height}&color=${color}&s=${size}`;
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  console.log(`Received response with status: ${response.status}`);
  return Buffer.from(response.data, 'binary');
}

async function createMergedImage(firstBody, secondBody) {
  const mergedImage = await mergeImg([
    { src: firstBody, x: 0, y: 0 },
    { src: secondBody, x: width, y: 0 },
  ]);
  return new Promise((resolve, reject) => {
    mergedImage.getBuffer('image/jpeg', (err, buffer) => {
      if (err) {
        reject(err);
      } else {
        resolve(buffer);
      }
    });
  });
}

async function saveImageToFile(buffer) {
  const filePath = join(process.cwd(), `/cat-card.jpg`);
  await writeFile(filePath, buffer, 'binary');
  console.log('The file was saved!');
}

async function main() {
  try {
    const firstBody = await fetchCatImage(greeting);
    const secondBody = await fetchCatImage(who);
    const mergedImageBuffer = await createMergedImage(firstBody, secondBody);
    await saveImageToFile(mergedImageBuffer);
  } catch (error) {
    console.log(error);
  }
}

main();
