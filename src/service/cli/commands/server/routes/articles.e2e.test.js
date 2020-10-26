'use strict';

const request = require(`supertest`);
const server = require(`../../server/index`);
const getMockData = require(`../lib/get-mock-data`);
const {ApiRoutes, HttpCode} = require(`../../../../../constants`);

let mockArticle;
let mockComment;
let mockData;

beforeEach(() => {
  mockArticle = {
    title: `Test title`,
    createdDate: `29.06.90`,
    announce: `Test announce`,
    fullText: `Test text`,
    category: [`Разное`]
  };

  mockComment = {
    text: `Test comment`
  };
});

beforeAll(async () => {
  mockData = await getMockData();
});

// Тесты объялений

describe(`Articles API end-points`, () => {
  describe(`Get articles`, () => {
    test(`When get articles status code should be 200`, async () => {
      const res = await request(server).get(ApiRoutes.ARTICLES);

      expect(res.statusCode).toBe(HttpCode.OK);
    });
  });

  describe(`Get article by ID`, () => {
    test(`When get article by id status code should be 200`, async () => {
      const id = mockData[0].id;
      const res = await request(server).get(`${ApiRoutes.ARTICLES}/${id}`);

      expect(res.statusCode).toBe(HttpCode.OK);
    });

    test(`When article not found by id status code should be 404`, async () => {
      const id = `test`;
      const res = await request(server).get(`${ApiRoutes.ARTICLES}/${id}`);

      expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });

  describe(`Create new article`, () => {
    test(`When create new article status code should be 201`, async () => {
      const res = await request(server).post(ApiRoutes.ARTICLES).send(mockArticle);

      expect(res.statusCode).toBe(HttpCode.CREATED);
    });

    test(`When create new article with not with all fields status code should be 400`, async () => {
      delete mockArticle.category;

      const res = await request(server).post(ApiRoutes.ARTICLES).send(mockArticle);

      expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    });
  });

  describe(`Edit article`, () => {
    test(`When edit article status code should be 200`, async () => {
      const id = mockData[0].id;
      mockData[0].title = `New title`;

      const res = await request(server).put(`${ApiRoutes.ARTICLES}/${id}`).send(mockData[0]);

      expect(res.statusCode).toBe(HttpCode.OK);
    });

    test(`When edit article with not with all fields status code should be 400`, async () => {
      delete mockData[0].category;

      const res = await request(server).post(ApiRoutes.ARTICLES).send(mockData[0]);

      expect(res.statusCode).toBe(HttpCode.BAD_REQUEST);
    });
  });

  describe(`Delete article`, () => {
    test(`When delete article status code should be 200`, async () => {
      const id = mockData[0].id;

      const res = await request(server).delete(`${ApiRoutes.ARTICLES}/${id}`);

      expect(res.statusCode).toBe(HttpCode.OK);
    });

    test(`When delete article with wrong id status code should be 404`, async () => {
      const id = `test`;

      const res = await request(server).delete(`${ApiRoutes.ARTICLES}/${id}`);

      expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });

  describe(`Wrong request`, () => {
    test(`When set wrong API request status code should be 404`, async () => {
      const res = await request(server).get(`/api/test`);

      expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });
});


// Тесты комментов

describe(`Comments API end-points`, () => {
  describe(`Get comments`, () => {
    test(`When get article comments status code should be 200`, async () => {
      const id = mockData[0].id;

      const res = await request(server).get(`${ApiRoutes.ARTICLES}/${id}/comments`);

      expect(res.statusCode).toBe(HttpCode.OK);
    });
  });

  describe(`Add comment`, () => {
    test(`When add new comment return this comment`, async () => {
      const id = mockData[0].id;

      const res = await request(server).post(`${ApiRoutes.ARTICLES}/${id}/comments`).send(mockComment);

      expect(res.body.text).toBe(mockComment.text);
    });

    test(`When add new comment to wrong article return 404`, async () => {
      const id = `test`;

      const res = await request(server).post(`${ApiRoutes.ARTICLES}/${id}/comments`).send(mockComment);

      expect(res.statusCode).toBe(HttpCode.NOT_FOUND);
    });
  });

  describe(`Delete comment`, () => {
    test(`When delete comment return 200`, async () => {
      const id = mockData[0].id;
      const commentId = mockData[0].comments[0].id;

      const res = await request(server).delete(`${ApiRoutes.ARTICLES}/${id}/comments/${commentId}`);

      expect(res.statusCode).toBe(HttpCode.OK);
    });
  });
});
