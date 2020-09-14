'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../../../../constants`);

class ArticleModel {
  constructor(articles) {
    this._articles = articles;
  }

  create(article) {
    const newArticle = {id: nanoid(MAX_ID_LENGTH), comments: [], ...article};

    this._articles.push(newArticle);
    return newArticle;
  }

  drop(id) {
    const articleTarget = this._articles.find((article) => article.id === id);

    if (!articleTarget) {
      return null;
    }

    this._articles = this._articles.filter((article) => article.id !== id);
    return articleTarget;
  }

  findAll() {
    return this._articles;
  }

  findOne(id) {
    return this._articles.find((article) => article.id === id);
  }

  update(id, newArticle) {
    const oldArticle = this._articles.find((article) => article.id === id);

    return Object.assign(oldArticle, newArticle);
  }
}

module.exports = ArticleModel;
