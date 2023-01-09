const Joi = require('joi');

const id = Joi.string().uuid(); // de tipo string y uid
const name = Joi.string().min(3).max(15); // string alfa nummin 3 caracteres y max 15
const price = Joi.number().integer().min(10); // si es entero numero y un valor minimo de 10 dolores
const image = Joi.string().uri();

const createProductSchema = Joi.object({ // cuando se crea es requerido nombre y precio
  name: name.required(),
  price: price.required(),
  image: image.required()
});


const updateProductSchema = Joi.object({ // se verifica pero no es requerido
  name: name,
  price: price,
  image: image
});

const getProductSchema = Joi.object({ // cuando se ocupa un producto se requiere su id
  id: id.required()
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema
}
