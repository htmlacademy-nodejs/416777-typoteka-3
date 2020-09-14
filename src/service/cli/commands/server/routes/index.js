'use strict';

const {Router} = require(`express`);
const categories = require(`../routes/categories`);
const articles = require(`../routes/articles`);
const search = require(`../routes/search`);

const app = new Router();

app.use(`/categories`, categories);
app.use(`/articles`, articles);
app.use(`/search`, search);

module.exports = app;
