import ProductModel from '../models/ProductModel.js';

// Controller
class MeController {
  // [GET] /me/stored/products
  storedProducts(req, res, next) {
        ProductModel.findAll()
        .then(foods => res.render('me/store-products.hbs',
          {foods}
        ))
        .catch(next);
  }

  // [GET] /me/trash/products
  trashProducts(req, res, next){
    ProductModel.findAllWithDeleted()
        .then(deletedFoods => res.render('me/trash-products.hbs',
          {deletedFoods}
        ))
        .catch(next);
  }
}

export default new MeController();
