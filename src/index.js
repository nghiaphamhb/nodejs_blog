import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express()
const port = 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));  // public path for static files (_dirname/public/*)

// HTTP logger
// app.use(morgan('combined'))

// Template engine
app.engine('.hbs', engine({extname: '.hbs'}));  //handlebars
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

app.get('/', (req, res) => {
  res.render("home")
})

app.get('/news', (req, res) => {
  res.render("news")
})

app.get('/search', (req, res) => {
  console.log(req.query.q);
  res.render("search");
})

app.post('/search', (req, res) => {
  console.log(req.query.p);
  res.render("search");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})







