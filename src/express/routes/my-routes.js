'use strict';

const {Router} = require(`express`);
const myRouter = new Router();
const {getMyArticlesPage, getMyArticlesComments} = require(`../controllers/my`);

myRouter.get(`/`, getMyArticlesPage);

myRouter.get(`/comments`, getMyArticlesComments);

module.exports = myRouter;

