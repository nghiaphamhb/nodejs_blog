import express from 'express';
import newsController from '../app/controllers/NewsController.js';

const newsRouter = express.Router();

newsRouter.use('/:slug', newsController.show);
newsRouter.use('/', newsController.index);

export default newsRouter;
