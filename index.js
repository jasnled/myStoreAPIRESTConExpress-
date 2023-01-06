
const express = require('express');
const routerApi = require('./routes');


const app = express(); // construimos la app

const port = 3000;

app.use(express.json()); // para que pueda capturar la data en formato JSON

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});


routerApi(app); //


app.listen(port, () => {
  console.log('Mi port ' + port);
});

