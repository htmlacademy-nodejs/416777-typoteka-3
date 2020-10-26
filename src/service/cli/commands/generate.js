'use strict';

const fs = require(`fs`).promises;
const {nanoid} = require(`nanoid`);
const {getLogger} = require(`../../../logger`);
const logger = getLogger();

const {
  FILENAME,
  MAX_ADS,
  MAX_COMMENTS,
  MAX_ID_LENGTH,
  DEFAULT_COUNT,
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

const generateComments = (count, comments) => {
  return Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `)
  }));
};

const generateCards = (count, titles, categories, sentences, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: getRandomDate(),
    announce: shuffle(sentences).slice(1, 5).join(` `),
    fullText: shuffle(sentences).slice(0, getRandomInt(1, sentences.length - 1)).join(` `),
    category: shuffle(categories).slice(0, getRandomInt(1, categories.length - 1)),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments)
  }))
);

module.exports = {
  name: `--generate`,

  async run(args) {
    const sentences = await readContent(MockPath.SENTENCES_PATH);
    const titles = await readContent(MockPath.TITLES_PATH);
    const categories = await readContent(MockPath.CATEGORIES_PATH);
    const comments = await readContent(MockPath.COMMENTS_PATH);

    const [count] = args;
    const countCard = Number.parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generateCards(countCard, titles, categories, sentences, comments));

    if (args > MAX_ADS) {
      logger.error(СliMessage.LENGTH_ERROR);
      process.exit(ExitCode.ERROR);
    }

    try {
      await fs.writeFile(FILENAME, content);
      logger.info(СliMessage.SUCCESS);
      process.exit(ExitCode.SUCCESS);
    } catch (error) {
      logger.error(СliMessage.WRITE_ERROR);
      process.exit(ExitCode.ERROR);
    }
  }
};
