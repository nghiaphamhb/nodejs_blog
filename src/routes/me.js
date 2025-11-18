import express from 'express';
import meController from '../app/controllers/MeController.js';

const meRouter = express.Router();

meRouter.get('/stored/products', meController.storedProducts);

export default meRouter;
