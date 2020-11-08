'use strict';

const axios = require(`axios`);
const {TIMEOUT} = require(`../constants`);

const {getLogger} = require(`../logger`);
const logger = getLogger();

class API {
  constructor(baseUrl, timeout) {
    this._http = axios.create({
      baseURL: baseUrl,
      timeout
    });
  }

  async _load(url, options) {
    try {
      const res = await this._http.request({url, ...options});
      return res.data;
    } catch (error) {
      logger.error(error);
      return error;
    }
  }

  getArticles() {
    return this._load(`/articles`);
  }

  getArticle(id) {
    return this._load(`/articles/${id}`);
  }

  search(query) {
    return this._load(`/search`, {params: {query}});
  }

  getCategories() {
    return this._load(`/categories`);
  }

  createArticle(data) {
    return this._load(`/articles`, {
      method: `POST`,
      data
    });
  }
}

const port = process.env.API_PORT || 3000;
const defaultUrl = `http://localhost:${port}/api/`;
const defaultAPI = new API(defaultUrl, TIMEOUT);

module.exports = {
  API,
  getApi: () => defaultAPI
};
