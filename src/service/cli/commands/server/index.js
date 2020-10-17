'use strict';

const express = require(`express`);
const app = express();

const routes = require(`../server/routes`);
const {HttpCode, API_PREFIX} = require(`../../../../constants`);

app.use(express.json());
app.use(API_PREFIX, routes);

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));

module.exports = app;
