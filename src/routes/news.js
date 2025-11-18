import express from 'express';
import newsController from '../app/controllers/NewsController.js';

const newsRouter = express.Router();

newsRouter.get('/:slug', newsController.show);
newsRouter.get('/', newsController.index);

export default newsRouter;
