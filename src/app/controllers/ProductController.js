import ProductModel from '../models/ProductModel.js';

class ProductController {
  // [GET] /product
  async index(req, res, next) {
    try {
      const products = await ProductModel.findAll();
      res.render('products/product', { products });
    } catch (err) {
      next(err); // đưa lỗi cho middleware xử lý
    }
  }

  // [GET] /product/:id
  async show(req, res, next) {
    try {
      const product = await ProductModel.findById(req.params.id);
      if (!product) {
        return res.status(404).send('Not found');
      }
      res.render('products/product-detail', { product });
    } catch (err) {
      next(err);
    }
  }

  // [GET] /product/create
  createForm(req, res) {
    res.render('products/product-create');
  }

  // [POST] /product/create
  async store(req, res, next) {
    try {
      const { name, description, image } = req.body;

      if (!name || name.trim() === '') {
        return res.render('products/product-create', {
          error: 'Tên sản phẩm không được để trống.',
        });
      }

      const product = await ProductModel.create({
        name,
        description,
        image,
      });

      res.render('products/product-result', {
        success: true,
        product,
      });
    } catch (err) {
      console.error(err);
      res.render('products/product-result', {
        success: false,
        error: 'Lỗi hệ thống. Vui lòng thử lại.',
      });
    }
  }

  // [GET] /product/:id/edit
  edit(req, res, next) {
    ProductModel.findById(req.params.id)
    .then(food => res.render('products/edit', {food}))
    .catch(next);
    
  }

  // [PUT] /product/:id
  async update(req, res, next) {
    try {
      const id = req.params.id;       
      await ProductModel.update(id, req.body);

      res.redirect('/me/stored/products');
    } catch (err) {
      next(err);
    }
  }
  
  // [DELETE] /product/:id
  async destroy(req, res, next) {
    try {
      const id = req.params.id;
      
      // Kiểm tra product có tồn tại không
      const product = await ProductModel.findById(id);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found'
        });
      }

      // Xóa product
      const result = await ProductModel.softDelete(id);
      
      if (result) {
        // Nếu là AJAX request (từ fetch)
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
          return res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
          });
        }
        
        // Nếu là normal request
        res.redirect('/me/stored/products');
      } else {
        throw new Error('Failed to delete product');
      }
      
    } catch (err) {
      console.error('Delete error:', err);
      
      // Xử lý lỗi cho AJAX request
      if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        return res.status(500).json({
          success: false,
          message: 'Error deleting product'
        });
      }
      
      // Xử lý lỗi cho normal request
      next(err);
    }
  }
}

export default new ProductController();
