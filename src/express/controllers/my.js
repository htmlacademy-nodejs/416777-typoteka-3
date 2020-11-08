'use strict';

const api = require(`../api`).getApi();
const {HttpCode} = require(`../../constants`);

const getMyArticlesPage = async (req, res) => {
  try {
    const articles = await api.getArticles();

    res.render(`my.pug`, {articles});
  } catch (error) {
    res.status(HttpCode.BAD_REQUEST).send(error.message);
  }
};

const getMyArticlesComments = async (req, res) => {
  try {
    const articles = await api.getArticles();

    res.render(`comments.pug`, {articles: articles.slice(0, 3)});
  } catch (error) {
    res.status(HttpCode.BAD_REQUEST).send(error.message);
  }
};

module.exports = {
  getMyArticlesPage,
  getMyArticlesComments
};
