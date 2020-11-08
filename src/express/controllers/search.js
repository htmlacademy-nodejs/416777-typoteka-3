'use strict';

const api = require(`../api`).getApi();

const getSearchResult = async (req, res) => {
  try {
    const {search} = req.query;
    const results = await api.search(search);

    res.render(`search.pug`, {
      results
    });
  } catch (error) {
    res.render(`search.pug`);
  }
};

module.exports = {
  getSearchResult
};
