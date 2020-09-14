'use strict';

class SearchModel {
  constructor(articles) {
    this._articles = articles;
  }

  findAll(searchText) {
    return this._articles.filter((article) => article.title.includes(searchText));
  }
}

module.exports = SearchModel;
