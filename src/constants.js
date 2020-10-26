'use strict';

const DEFAULT_COMMAND = `--help`;
const DEFAULT_PORT = 8080;
const TARGET_ARGS_INDEX = 1;
const USER_ARGV_INDEX = 2;

const FILENAME = `mocks.json`;
const PUBLIC_DIR = `public`;
const TEMPLATES_DIR = `templates`;
const LOGS_DIR = `./src/service/logs/logs.log`;

const MAX_ADS = 1000;
const MAX_COMMENTS = 6;
const MAX_ID_LENGTH = 5;
const DEFAULT_COUNT = 1;

const API_PREFIX = `/api`;

const СliMessage = Object.freeze({
  LENGTH_ERROR: `No more than 1000 cards`,
  WRITE_ERROR: `Can't write data to file...`,
  SUCCESS: `Operation success. File created.`
});

const ServerMessage = Object.freeze({
  CREATE_ERROR: `Ошибка при создании сервера`,
  PENDING: `Ожидаю соединения на `
});

const ExitCode = Object.freeze({
  SUCCESS: 0,
  ERROR: 1
});

const MockPath = Object.freeze({
  SENTENCES_PATH: `./data/sentences.txt`,
  TITLES_PATH: `./data/titles.txt`,
  CATEGORIES_PATH: `./data/categories.txt`,
  COMMENTS_PATH: `./data/comments.txt`
});

const HttpCode = Object.freeze({
  OK: 200,
  NOT_FOUND: 404,
  CREATED: 201,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400
});

const ApiRoutes = Object.freeze({
  ARTICLES: `/api/articles`,
  CATEGORIES: `/api/categories`,
  SEARCH: `/api/search`,
});

const LoggerMessage = Object.freeze({
  ROUTE: `Route is `,
  STATUS_CODE: `Status code is `,
  NOT_FOUND: `Error, not found`,
  BAD_REQUEST: `Error, bad request`
});

module.exports = {
  DEFAULT_COMMAND,
  DEFAULT_PORT,
  TARGET_ARGS_INDEX,
  USER_ARGV_INDEX,
  FILENAME,
  PUBLIC_DIR,
  TEMPLATES_DIR,
  LOGS_DIR,
  MAX_ADS,
  MAX_COMMENTS,
  MAX_ID_LENGTH,
  DEFAULT_COUNT,
  API_PREFIX,
  СliMessage,
  ServerMessage,
  ExitCode,
  MockPath,
  HttpCode,
  ApiRoutes,
  LoggerMessage
};
