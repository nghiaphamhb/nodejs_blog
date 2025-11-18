import ProductModel from '../models/ProductModel.js';

// Controller + REST Controller
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
  
  // [DELETE] /product/:id (soft delete)
  async delete(req, res, next) {
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

  // [PATCH] /product/:id/restore
  async restore(req, res, next) {
    try {
      const id = req.params.id;
      await ProductModel.restore(id);   // gọi hàm restore trong model
      res.redirect('/me/trash/products');
    } catch (err) {
      console.error('Restore controller error:', err);
      next(err);
    }
  }

  // [DELETE] /product/:id/force
async forceDelete(req, res, next) {
  try {
    const id = req.params.id;

    // Tìm cả record đã bị soft delete
    const product = await ProductModel.findByIdWithDeleted(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const result = await ProductModel.delete(id); // HARD DELETE

    if (result) {
      if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') > -1)) {
        return res.status(200).json({
          success: true,
          message: 'Product destroyed successfully',
        });
      }

      // Request thường: quay về trang trash
      return res.redirect('back');
    } else {
      throw new Error('Failed to destroy product');
    }

  } catch (err) {
    console.error('Force delete error:', err);

    if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') > -1)) {
      return res.status(500).json({
        success: false,
        message: 'Error destroying product',
      });
    }

    next(err);
  }
  
}

  // [POST] /product/handle-form-action
async handleFormAction(req, res, next) {
  try {
    const { action } = req.body;

    // Tên field trong form là "foods[]"
    // tuỳ body-parser có thể là req.body.foods hoặc req.body['foods[]']
    let foodIds = req.body.foods || req.body['foods[]'];

    // Chuẩn hoá thành mảng
    if (!Array.isArray(foodIds)) {
      foodIds = foodIds ? [foodIds] : [];
    }

    switch (action) {
      case 'delete':
        if (foodIds.length === 0) {
          // Không chọn gì mà bấm Execute → quay lại
          return res.redirect('/me/stored/products');
        }

        // Soft delete nhiều sản phẩm
        await ProductModel.softDeleteMany(foodIds);
        return res.redirect('/me/stored/products');

      case 'edit':
        // Tuỳ bài: thường action "edit" cho 1 item, hoặc bạn có thể chặn
        return res.json({ message: 'Edit action for multiple items is not implemented.' });

      default:
        return res.json({ message: 'Action is invalid!' });
    }
  } catch (err) {
    next(err);
  }
}

}

export default new ProductController();
