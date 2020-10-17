'use strict';

const {HttpCode, LoggerMessage} = require(`../../../../../constants`);

const SearchModel = require(`../models/search`);
const getMockData = require(`../lib/get-mock-data`);

const {getLogger} = require(`../../../../../logger`);
const logger = getLogger();

const getSearch = async (req, res) => {
  const {query = ``} = req.query;

  if (!query) {
    logger.error(LoggerMessage.BAD_REQUEST);
    return res.status(HttpCode.BAD_REQUEST).json([]);
  }

  const mockData = await getMockData();
  const searchService = new SearchModel(mockData);

  const searchResults = searchService.findAll(query);
  const searchStatus = searchResults.length > 0 ? HttpCode.OK : HttpCode.NOT_FOUND;

  logger.debug(`${LoggerMessage.ROUTE}search`);

  return res.status(searchStatus)
    .json(searchResults);
};

module.exports = getSearch;
