'use strict';

const {Router} = require(`express`);
const articlesRouter = new Router();

const {getEditArticle, getAddArticle, getPostAddArticle} = require(`../controllers/articles`);

const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);

const {UPLOAD_DIR} = require(`../../constants`);
const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});

const upload = multer({storage});

articlesRouter.get(`/category/:id`, (req, res) => res.render(`articles/articles-by-category`));

articlesRouter.get(`/add`, getAddArticle);
articlesRouter.post(`/add`, upload.single(`picture`), getPostAddArticle);
articlesRouter.get(`/edit/:id`, getEditArticle);

articlesRouter.get(`/:id`, (req, res) => res.render(`articles/post`));

module.exports = articlesRouter;
