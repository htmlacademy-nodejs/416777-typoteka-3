'use strict';

const {HttpCode} = require(`../../../../constants`);
const getMockData = require(`../lib/get-mock-data`);

const ArticleModel = require(`../models/article`);
const CommentModel = require(`../models/comment`);

let articleService;
let commentService;

(async () => {
  const mockData = await getMockData();
  articleService = new ArticleModel(mockData);
  commentService = new CommentModel(mockData);
})();

const checkExistArticle = (req, res) => {
  const {articleId} = req.params;
  const article = articleService.findOne(articleId);

  if (!article) {
    return res.status(HttpCode.NOT_FOUND)
      .send(`Article with ${articleId} not found`);
  }

  res.locals.article = article;
  return true;
};

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

const getComments = async (req, res) => {
  try {
    checkExistArticle(req, res);

    const {article} = res.locals;
    const comments = await commentService.findAll(article);

    return res.status(HttpCode.OK)
      .json(comments);
  } catch (error) {
    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const deleteComment = async (req, res) => {
  try {
    checkExistArticle(req, res);

    const {article} = res.locals;
    const {commentId} = req.params;
    const deletedComment = await commentService.drop(article, commentId);

    if (!deletedComment) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    return res.status(HttpCode.OK)
      .json(deletedComment);
  } catch (error) {
    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const postComment = async (req, res) => {
  try {
    checkExistArticle(req, res);

    const {article} = res.locals;
    const comment = commentService.create(article, req.body);

    return res.status(HttpCode.CREATED).json(comment);
  } catch (error) {
    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

module.exports = {
  getArticles,
  getArticle,
  postArticle,
  putArticle,
  deleteArticle,
  getComments,
  deleteComment,
  postComment
};
