import ProductModel from '../models/ProductModel.js';

class MeController {
  // [GET] /stored/products
  storedProducts(req, res, next) {
        ProductModel.findAll()
        .then(foods => res.render('me/store-products.hbs',
          {foods}
        ))
        .catch(next);
    }
}

export default new MeController();
