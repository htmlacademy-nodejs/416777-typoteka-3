'use strict';

const {HttpCode, LoggerMessage, ApiRoutes} = require(`../../../../../constants`);

const CategoryModel = require(`../models/category`);
const getMockData = require(`../lib/get-mock-data`);

const {getLogger} = require(`../../../../../logger`);
const logger = getLogger();

const getCategories = async (req, res) => {
  try {
    const mockData = await getMockData();
    const categoryService = new CategoryModel(mockData);

    const categories = await categoryService.findAll();

    logger.debug(`${LoggerMessage.ROUTE}${ApiRoutes.CATEGORIES}`);

    return res.status(HttpCode.OK).json(categories);
  } catch (error) {
    logger.error(LoggerMessage.NOT_FOUND);

    return res.status(HttpCode.NOT_FOUND).send(`Not found`);
  }
};

module.exports = getCategories;
