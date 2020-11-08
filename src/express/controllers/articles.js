'use strict';

const api = require(`../api`).getApi();
const {HttpCode} = require(`../../constants`);

const getEditArticle = async (req, res) => {
  try {
    const {id} = req.params;
    const [article, categories] = await Promise.all([
      api.getArticle(id),
      api.getCategories()
    ]);

    res.render(`post.pug`, {article, categories});
  } catch (error) {
    res.status(HttpCode.BAD_REQUEST).send(error.message);
  }
};

const getAddArticle = async (req, res) => {
  try {
    res.render(`new-post.pug`);
  } catch (error) {
    res.status(HttpCode.BAD_REQUEST).send(error.message);
  }
};

const getPostAddArticle = async (req, res) => {
  const {body, file} = req;

  console.log(req.body)

  const articleData = {
    picture: file.filename,
    title: body.title,
    createdDate: body.login,
    announce: body.announce,
    fullText: body.fullText,
    category: body.category
  };

  try {
    await api.createArticle(`/articles`, articleData);
    res.redirect(`/my`);
  } catch (error) {
    res.redirect(`back`);
  }
};

module.exports = {
  getEditArticle,
  getAddArticle,
  getPostAddArticle
};
