const { writeFile } = require('fs');
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

const firstReq = `https://cataas.com/cat/says/${greeting}?width=${width}&height=${height}&color=${color}&s=${size}`;
const secondReq = `https://cataas.com/cat/says/${who}?width=${width}&height=${height}&color=${color}&s=${size}`;

axios
  .get(firstReq, { responseType: 'arraybuffer' })
  .then((firstRes) => {
    console.log(`Received response with status: ${firstRes.status}`);
    const firstBody = Buffer.from(firstRes.data, 'binary');

    axios
      .get(secondReq, { responseType: 'arraybuffer' })
      .then((secondRes) => {
        console.log(`Received response with status: ${secondRes.status}`);
        const secondBody = Buffer.from(secondRes.data, 'binary');

        mergeImg([
          { src: firstBody, x: 0, y: 0 },
          { src: secondBody, x: width, y: 0 },
        ]).then((img) => {
          img.getBuffer('image/jpeg', (err, buffer) => {
            if (err) {
              console.log(err);
              return;
            }

            const fileOut = join(process.cwd(), `/cat-card.jpg`);

            writeFile(fileOut, buffer, 'binary', (err) => {
              if (err) {
                console.log(err);
                return;
              }

              console.log('The file was saved!');
            });
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });
