import express from 'express';
import productController from '../app/controllers/ProductController.js';

const router = express.Router();

router.get('/product/:id', productController.show);
router.get('/', productController.index);     

export default router;
