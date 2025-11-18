import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';
import methodOverride from 'method-override'

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // location mine now

app.use(express.static(path.join(__dirname, 'public'))); // _dirname/public -> autocheck static files (img, css, ...)

// read POST form
app.use(express.urlencoded({ extended: true }));

// HTTP logger
app.use(morgan('combined'));

app.use(methodOverride('_method'));  // add HTTP methods: PUT, PATCH, ...

// Template engine (handlerbars)
app.engine('.hbs', engine({
   extname: '.hbs' ,
   helpers: {
            sum: (a, b) => a + b,
        },
  })); //handlebars
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resource', 'views')); // _dirname/resource/views -> autocheck hbs

// routes init
routes(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
