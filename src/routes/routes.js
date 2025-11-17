import newsRouter from './news.js';
import siteRouter from './site.js';

function routes(app) {
  app.use('/news', newsRouter);

  app.use('/', siteRouter);
}

export default routes;
