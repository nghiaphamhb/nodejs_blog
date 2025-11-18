import newsRouter from './news.js';
import siteRouter from './site.js';
import productsRouter from './product.js';
import meRouter from './me.js';

function routes(app) {
  app.use('/news', newsRouter);
  app.use('/site', siteRouter);
  app.use('/me', meRouter);
  app.use('/', productsRouter);
}

export default routes;
