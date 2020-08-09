'use strict';

const {Router} = require(`express`);
const registrationRouter = new Router();

registrationRouter.get(`/`, (req, res) => res.render(`registration/registration`));

module.exports = registrationRouter;
