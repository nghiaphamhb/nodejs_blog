import express from 'express';
import productController from '../app/controllers/ProductController.js';

const router = express.Router();

router.get('/product/create', productController.createForm);
router.post('/product/create', productController.store);
router.get('/product/:id/edit', productController.edit);
router.put('/product/:id', productController.update);
router.delete('/product/:id', productController.destroy);
router.get('/product/:id', productController.show);
router.get('/', productController.index);

export default router;
