'use strict';

const fs = require(`fs`);

const {
  ExitCode
} = require(`../../../constants`);

const {
  TITLES,
  SENTENCES,
  CATEGORIES
} = require(`../mocks`);

const {
  getRandomInt,
  getRandomDate,
  shuffle
} = require(`../../../utils`);

const DEFAULT_COUNT = 1;
const MAX_ADS = 1000;
const FILE_NAME = `mocks.json`;

const generateCards = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: getRandomDate(),
    announce: shuffle(SENTENCES).slice(1, 5).join(` `),
    fullText: shuffle(SENTENCES).slice(0, getRandomInt(1, CATEGORIES.length - 1)).join(` `),
    category: shuffle(CATEGORIES).slice(0, getRandomInt(1, CATEGORIES.length - 1)),
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countCard = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateCards(countCard));

    if (args > MAX_ADS) {
      console.error(`No more than 1000 cards`);
      process.exit(ExitCode.ERROR);
    }

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.error(`Can't write data to file...`);
        process.exit(ExitCode.ERROR);
      }

      console.info(`Operation success. File created.`);
      process.exit(ExitCode.SUCCESS);
    });
  }
};
