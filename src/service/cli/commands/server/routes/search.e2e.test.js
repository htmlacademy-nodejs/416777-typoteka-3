"use strict";

const request = require(`supertest`);
const server = require(`../../server/index`);
const {ApiRoutes, HttpCode} = require(`../../../../../constants`);

describe(`Search API end-points`, () => {
  describe(`Get search`, () => {
    test(`When search not found query status code should be 404`, async () => {
      const res = await request(server).get(`${ApiRoutes.SEARCH}?query=test`);
      expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    });

    test(`When get search without query status code should be 400`, async () => {
      const res = await request(server).get(`${ApiRoutes.SEARCH}?query=`);
      expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    });
  });
});
