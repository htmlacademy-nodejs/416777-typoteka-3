'use strict';

const {
  Router
} = require(`express`);

const articleValidator = require(`../middlewares/validators/article`);
const commentValidator = require(`../middlewares/validators/comment`);

const articlesController = require(`../controllers/articles`);
const commentsController = require(`../controllers/comments`);

const articlesRouter = new Router();

articlesRouter.get(`/`, articlesController.getArticles);
articlesRouter.get(`/:articleId`, articlesController.getArticle);
articlesRouter.post(`/`, articleValidator, articlesController.postArticle);
articlesRouter.put(`/:articleId`, articleValidator, articlesController.putArticle);
articlesRouter.delete(`/:articleId`, articlesController.deleteArticle);
articlesRouter.get(`/:articleId/comments`, commentsController.getComments);
articlesRouter.delete(`/:articleId/comments/:commentId`, commentsController.deleteComment);
articlesRouter.post(`/:articleId/comments`, commentValidator, commentsController.postComment);

module.exports = articlesRouter;
