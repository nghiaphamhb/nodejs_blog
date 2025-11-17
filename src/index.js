import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/routes.js';

const app = express()
const port = 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));  // public path for static files (_dirname/public/*)

// HTTP logger
app.use(morgan('combined'))

// Template engine (handlerbars)
app.engine('.hbs', engine({extname: '.hbs'}));  //handlebars
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

// routes init
routes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})







