import express from 'express';
import productController from '../app/controllers/ProductController.js';

const router = express.Router();

router.get('/product/create', productController.createForm);
router.post('/product/create', productController.store);
router.get('/product/:id/edit', productController.edit);
router.post('/product/handle-form-action', productController.handleFormAction);
router.put('/product/:id', productController.update);
router.patch('/product/:id/restore', productController.restore);
router.delete('/product/:id', productController.delete);
router.delete('/product/:id/force', productController.forceDelete);  // permantly delete
router.get('/product/:id', productController.show);
router.get('/', productController.index);

export default router;
