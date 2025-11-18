import ProductModel from '../models/ProductModel.js';

class ProductController {
    // [GET] /products
  async index(req, res, next) {
    try {
      const products = await ProductModel.findAll();
      res.render('product', { products });
    } catch (err) {
      next(err); // đưa lỗi cho middleware xử lý
    }
  }

  // [GET] /products/:id
  async show(req, res, next) {
    try {
      const product = await ProductModel.findById(req.params.id);
      if (!product) {
        return res.status(404).send('Not found');
      }
      res.render('product-detail', { product });
    } catch (err) {
      next(err);
    }
  }
}

export default new ProductController();