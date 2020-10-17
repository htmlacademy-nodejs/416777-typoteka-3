'use strict';

const express = require(`express`);
const path = require(`path`);

const mainRoutes = require(`./routes/main-routes`);
const myRoutes = require(`./routes/my-routes`);
const articlesRoutes = require(`./routes/articles-routes`);
const loginRoutes = require(`./routes/login-routes`);
const registrationRoutes = require(`./routes/registration-routes`);
const searchRoutes = require(`./routes/search-routes`);
const categoriesRoutes = require(`./routes/categories-routes`);
const {getLogger} = require(`../logger`);
const logger = getLogger();

const {DEFAULT_PORT, PUBLIC_DIR, TEMPLATES_DIR} = require(`../constants`);

const app = express();

app.use(`/`, mainRoutes);
app.use(`/login`, loginRoutes);
app.use(`/registration`, registrationRoutes);
app.use(`/search`, searchRoutes);
app.use(`/categories`, categoriesRoutes);
app.use(`/my`, myRoutes);
app.use(`/articles`, articlesRoutes);
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`views`, path.resolve(__dirname, TEMPLATES_DIR));
app.set(`view engine`, `pug`);

app.listen(DEFAULT_PORT, () => {
  logger.info(`Сервер запущен на ${DEFAULT_PORT} порту`);
});
