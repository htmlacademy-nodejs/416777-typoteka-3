'use strict';

const {
  Router
} = require(`express`);

const articleValidator = require(`../middlewares/validators/article`);
const commentValidator = require(`../middlewares/validators/comment`);

const {
  getArticles,
  getArticle,
  postArticle,
  putArticle,
  deleteArticle,
  getComments,
  deleteComment,
  postComment
} = require(`../controllers/articles`);

const articlesRouter = new Router();

articlesRouter.get(`/`, getArticles);
articlesRouter.get(`/:articleId`, getArticle);
articlesRouter.post(`/`, articleValidator, postArticle);
articlesRouter.put(`/:articleId`, articleValidator, putArticle);
articlesRouter.delete(`/:articleId`, deleteArticle);
articlesRouter.get(`/:articleId/comments`, getComments);
articlesRouter.delete(`/:articleId/comments/:commentId`, deleteComment);
articlesRouter.post(`/:articleId/comments`, commentValidator, postComment);

module.exports = articlesRouter;
