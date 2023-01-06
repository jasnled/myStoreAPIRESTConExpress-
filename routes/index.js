// archivo para configurar cada una de las rutas
const express = require('express');

const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');


function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1',router); //es un ruta maestra, la será agregada a cada una de las rutas
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
}

module.exports = routerApi;
