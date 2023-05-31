const { writeFile } = require('fs');
const { join } = require('path');
const request = require('request');
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

const firstReq = {
  url: `https://cataas.com/cat/says/${greeting}?width=${width}&height=${height}&color=${color}&s=${size}`,
  encoding: 'binary',
};

const secondReq = {
  url: `https://cataas.com/cat/says/${who}?width=${width}&height=${height}&color=${color}&s=${size}`,
  encoding: 'binary',
};

request.get(firstReq, (err, res, firstBody) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Received response with status: ${res.statusCode}`);

  request.get(secondReq, (err, res, secondBody) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log(`Received response with status: ${res.statusCode}`);

    mergeImg([
      { src: Buffer.from(firstBody, 'binary'), x: 0, y: 0 },
      { src: Buffer.from(secondBody, 'binary'), x: width, y: 0 },
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

          console.log("The file was saved!");
        });
      });
    });
  });
});
