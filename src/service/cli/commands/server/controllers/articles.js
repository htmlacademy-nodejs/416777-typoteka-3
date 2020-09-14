'use strict';

const {HttpCode} = require(`../../../../../constants`);
const getMockData = require(`../lib/get-mock-data`);

const ArticleModel = require(`../models/article`);

let articleService;

(async () => {
  const mockData = await getMockData();
  articleService = new ArticleModel(mockData);
})();

const getArticles = async (req, res) => {
  try {
    const articles = await articleService.findAll();
    res.status(HttpCode.OK).json(articles);
  } catch (error) {
    res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const getArticle = async (req, res) => {
  try {
    const {articleId} = req.params;
    const article = await articleService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND)
      .send(`Not found with ${articleId}`);
    }

    return res.status(HttpCode.OK)
      .json(article);
  } catch (error) {
    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const postArticle = async (req, res) => {
  try {
    const article = await articleService.create(req.body);

    return res.status(HttpCode.CREATED)
      .json(article);
  } catch (error) {
    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const putArticle = async (req, res) => {
  try {
    const {articleId} = req.params;
    const existArticle = await articleService.findOne(articleId);

    if (!existArticle) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found with ${articleId}`);
    }

    const updatedArticle = await articleService.update(articleId, req.body);

    return res.status(HttpCode.OK)
      .json(updatedArticle);
  } catch (error) {
    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const deleteArticle = async (req, res) => {
  try {
    const {articleId} = req.params;
    const article = await articleService.drop(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(article);
  } catch (error) {
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
