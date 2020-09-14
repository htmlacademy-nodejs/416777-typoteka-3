'use strict';

const {HttpCode} = require(`../../../../../constants`);
const getMockData = require(`../lib/get-mock-data`);

const ArticleModel = require(`../models/article`);
const CommentModel = require(`../models/comment`);

let commentService;
let articleService;

(async () => {
  const mockData = await getMockData();
  articleService = new ArticleModel(mockData);
  commentService = new CommentModel(mockData);
})();

const getComments = async (req, res) => {
  try {
    const {articleId} = req.params;
    const article = await articleService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Article with ${articleId} not found`);
    }

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
    const {articleId} = req.params;
    const article = await articleService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Article with ${articleId} not found`);
    }

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
    const {articleId} = req.params;
    const article = await articleService.findOne(articleId);

    if (!article) {
      return res.status(HttpCode.NOT_FOUND)
        .send(`Article with ${articleId} not found`);
    }

    const comment = commentService.create(article, req.body);

    return res.status(HttpCode.CREATED).json(comment);
  } catch (error) {
    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const commentsController = {
  getComments,
  deleteComment,
  postComment
};

module.exports = commentsController;
