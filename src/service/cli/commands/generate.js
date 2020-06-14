'use strict';

const fs = require(`fs`).promises;

const logger = require(`../../../logger`);

const {
  СliMessage,
  ExitCode,
  MockPath
} = require(`../../../constants`);

const {
  getRandomInt,
  getRandomDate,
  shuffle,
  readContent
} = require(`../../../utils`);

const DEFAULT_COUNT = 1;
const MAX_ADS = 1000;
const FILE_NAME = `mocks.json`;

const generateCards = (count, titles, categories, sentences) => (
  Array(count).fill({}).map(() => ({
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: getRandomDate(),
    announce: shuffle(sentences).slice(1, 5).join(` `),
    fullText: shuffle(sentences).slice(0, getRandomInt(1, sentences.length - 1)).join(` `),
    category: shuffle(categories).slice(0, getRandomInt(1, categories.length - 1)),
  }))
);

module.exports = {
  name: `--generate`,

  async run(args) {
    const sentences = await readContent(MockPath.SENTENCES_PATH);
    const titles = await readContent(MockPath.TITLES_PATH);
    const categories = await readContent(MockPath.CATEGORIES_PATH);

    const [count] = args;
    const countCard = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateCards(countCard, titles, categories, sentences));

    if (args > MAX_ADS) {
      console.error(logger.showError(СliMessage.LENGTH_ERROR));
      process.exit(ExitCode.ERROR);
    }

    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(logger.showSuccess(СliMessage.SUCCESS));
      process.exit(ExitCode.SUCCESS);
    } catch (error) {
      console.error(logger.showError(СliMessage.WRITE_ERROR));
      process.exit(ExitCode.ERROR);
    }
  }
};
