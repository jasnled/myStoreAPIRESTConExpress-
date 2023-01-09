
const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler');


const app = express(); // construimos la app

const port = 3000;

app.use(express.json()); // para que pueda capturar la data en formato JSON

const whitelist = ['http://127.0.0.1:5500', 'http://myapp.com']; // para darle acceso a clientes en especifico
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) { //para agregar el mismo origen
      callback(null, true);
    }else{
      callback(new Error('no permitido'));
    }
  }
}

app.use(cors(options)); // habilitamos a cualquier dominio a hacer peticiones a la api

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});



routerApi(app); //

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port ' + port);
});

