'use strict';

const {HttpCode, LoggerMessage} = require(`../../../../../constants`);
const getMockData = require(`../lib/get-mock-data`);

const ArticleModel = require(`../models/article`);
const CommentModel = require(`../models/comment`);

const {getLogger} = require(`../../../../../logger`);
const logger = getLogger();

const getComments = async (req, res) => {
  try {
    const mockData = await getMockData();
    const articleService = new ArticleModel(mockData);
    const commentService = new CommentModel(mockData);

    const {articleId} = req.params;
    const article = await articleService.findOne(articleId);

    if (!article) {
      logger.error(LoggerMessage.NOT_FOUND);

      return res.status(HttpCode.NOT_FOUND)
        .send(`Article with ${articleId} not found`);
    }

    const comments = await commentService.findAll(article);

    logger.debug(`${LoggerMessage.ROUTE}get comments`);

    return res.status(HttpCode.OK)
      .json(comments);
  } catch (error) {
    logger.error(LoggerMessage.NOT_FOUND);

    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const deleteComment = async (req, res) => {
  try {
    const mockData = await getMockData();
    const articleService = new ArticleModel(mockData);
    const commentService = new CommentModel(mockData);

    const {articleId} = req.params;
    const article = await articleService.findOne(articleId);

    if (!article) {
      logger.error(LoggerMessage.NOT_FOUND);

      return res.status(HttpCode.NOT_FOUND)
        .send(`Article with ${articleId} not found`);
    }

    const {commentId} = req.params;
    const deletedComment = await commentService.drop(article, commentId);

    if (!deletedComment) {
      logger.error(LoggerMessage.NOT_FOUND);

      return res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
    }

    logger.debug(`${LoggerMessage.ROUTE}delete comments`);

    return res.status(HttpCode.OK)
      .json(deletedComment);
  } catch (error) {
    logger.error(LoggerMessage.NOT_FOUND);

    return res.status(HttpCode.NOT_FOUND)
    .send(`Not found`);
  }
};

const postComment = async (req, res) => {
  try {
    const mockData = await getMockData();
    const articleService = new ArticleModel(mockData);
    const commentService = new CommentModel(mockData);

    const {articleId} = req.params;
    const article = await articleService.findOne(articleId);

    if (!article) {
      logger.error(LoggerMessage.NOT_FOUND);

      return res.status(HttpCode.NOT_FOUND)
        .send(`Article with ${articleId} not found`);
    }

    const comment = commentService.create(article, req.body);

    logger.debug(`${LoggerMessage.ROUTE}new comments`);

    return res.status(HttpCode.CREATED).json(comment);
  } catch (error) {
    logger.error(LoggerMessage.NOT_FOUND);

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
