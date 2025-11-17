import express from 'express';
import siteController from '../app/controllers/SiteController.js';

const siteRouter = express.Router();

siteRouter.use('/search', siteController.search)
siteRouter.use('/', siteController.home)

export default siteRouter;
