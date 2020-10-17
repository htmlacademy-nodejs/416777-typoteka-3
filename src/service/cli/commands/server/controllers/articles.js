'use strict';

const {HttpCode, LoggerMessage} = require(`../../../../../constants`);
const getMockData = require(`../lib/get-mock-data`);
const ArticleModel = require(`../models/article`);

const {getLogger} = require(`../../../../../logger`);
const logger = getLogger();

const getArticles = async (req, res) => {
  try {
    const mockData = await getMockData();
    const articleService = new ArticleModel(mockData);

    const articles = await articleService.findAll();
    logger.debug(`${LoggerMessage.ROUTE}articles`);

    return res.status(HttpCode.OK).json(articles);
  } catch (error) {
    logger.error(LoggerMessage.NOT_FOUND);

    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const getArticle = async (req, res) => {
  try {
    const mockData = await getMockData();
    const articleService = new ArticleModel(mockData);

    const {articleId} = req.params;
    const article = await articleService.findOne(articleId);

    if (!article) {
      logger.error(LoggerMessage.NOT_FOUND);

      return res.status(HttpCode.NOT_FOUND)
      .send(`Not found with ${articleId}`);
    }

    logger.debug(`${LoggerMessage.ROUTE}article`);

    return res.status(HttpCode.OK)
      .json(article);
  } catch (error) {
    logger.error(LoggerMessage.NOT_FOUND);

    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const postArticle = async (req, res) => {
  try {
    const mockData = await getMockData();
    const articleService = new ArticleModel(mockData);

    const article = await articleService.create(req.body);

    logger.debug(`${LoggerMessage.ROUTE}new article`);

    return res.status(HttpCode.CREATED)
      .json(article);
  } catch (error) {
    logger.error(LoggerMessage.NOT_FOUND);

    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const putArticle = async (req, res) => {
  try {
    const mockData = await getMockData();
    const articleService = new ArticleModel(mockData);

    const {articleId} = req.params;
    const existArticle = await articleService.findOne(articleId);

    if (!existArticle) {
      logger.error(LoggerMessage.NOT_FOUND);

      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    const updatedArticle = await articleService.update(articleId, req.body);

    logger.debug(`${LoggerMessage.ROUTE}edit article`);

    return res.status(HttpCode.OK)
      .json(updatedArticle);
  } catch (error) {
    logger.error(LoggerMessage.NOT_FOUND);

    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const deleteArticle = async (req, res) => {
  try {
    const mockData = await getMockData();
    const articleService = new ArticleModel(mockData);

    const {articleId} = req.params;
    const article = await articleService.drop(articleId);

    if (!article) {
      logger.error(LoggerMessage.NOT_FOUND);

      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    logger.debug(`${LoggerMessage.ROUTE}delete article`);

    return res.status(HttpCode.OK)
      .json(article);
  } catch (error) {
    logger.error(LoggerMessage.NOT_FOUND);

    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const articlesController = {
  getArticles,
  getArticle,
  postArticle,
  putArticle,
  deleteArticle
};

module.exports = articlesController;
