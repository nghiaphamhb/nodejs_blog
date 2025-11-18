import ProductModel from '../models/ProductModel.js';

// Controller
class MeController {
  // [GET] /me/stored/products
  async storedProducts(req, res, next) {
  try {
    const [foods, deletedCount] = await Promise.all([
      ProductModel.findAll(),      // deletedAt IS NULL
      ProductModel.countDeleted(), // deletedAt IS NOT NULL
    ]);

    res.render('me/store-products', {
      foods,
      deletedCount,
    });
  } catch (err) {
    next(err);
  }
}


  // [GET] /me/trash/products
  async trashProducts(req, res, next){
    ProductModel.findAllWithDeleted()
        .then(deletedFoods => res.render('me/trash-products.hbs',
          {deletedFoods}
        ))
        .catch(next);
  }
}

export default new MeController();
