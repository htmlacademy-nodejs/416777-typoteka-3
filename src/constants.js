'use strict';

const DEFAULT_COMMAND = `--help`;
const TARGET_ARGS_INDEX = 1;
const USER_ARGV_INDEX = 2;

const СliMessage = Object.freeze({
  LENGTH_ERROR: `No more than 1000 cards`,
  WRITE_ERROR: `Can't write data to file...`,
  SUCCESS: `Operation success. File created.`
});

const ExitCode = Object.freeze({
  SUCCESS: 0,
  ERROR: 1
});

const MockPath = Object.freeze({
  SENTENCES_PATH: `./data/sentences.txt`,
  TITLES_PATH: `./data/titles.txt`,
  CATEGORIES_PATH: `./data/categories.txt`
});

module.exports = {
  DEFAULT_COMMAND,
  TARGET_ARGS_INDEX,
  USER_ARGV_INDEX,
  СliMessage,
  ExitCode,
  MockPath
};
