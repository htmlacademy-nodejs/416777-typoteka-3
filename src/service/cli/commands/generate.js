'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);

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

  async run(args) {
    const [count] = args;
    const countCard = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateCards(countCard));

    const lengthError = `No more than 1000 cards`;
    const writeError = `Can't write data to file...`;
    const successMessage = `Operation success. File created.`;

    if (args > MAX_ADS) {
      console.error(chalk.red(lengthError));
      process.exit(ExitCode.ERROR);
    }

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(successMessage));
      process.exit(ExitCode.SUCCESS);
    } catch (error) {
      console.error(chalk.red(writeError));
      process.exit(ExitCode.ERROR);
    }
  }
};
