'use strict';

const api = require(`../api`).getApi();
const {HttpCode} = require(`../../constants`);

const getMainPage = async (req, res) => {
  try {
    const articles = await api.getArticles();

    res.render(`main.pug`, {articles});
  } catch (error) {
    res.status(HttpCode.BAD_REQUEST).send(error.message);
  }
};

module.exports = {
  getMainPage
};
