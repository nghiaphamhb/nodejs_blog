import newsRouter from './news.js';
import siteRouter from './site.js';
import productsRouter from './product.js';

function routes(app) {
  app.use('/news', newsRouter);
  app.use('/site', siteRouter);
  app.use('/', productsRouter);
  
}

export default routes;
