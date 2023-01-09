const boom = require('@hapi/boom');

function validatorHandler(schema, property){ // recibiremos la propiedad y esquema a validar
  return (req, res, next) => {
    const data = req[property];
    const { error } = schema.validate(data, {abortEarly: false});
    // abortEarly : false nos genera que se envien todos los errores de una vez
    if (error){
      next(boom.badRequest(error)); // si hay un error, lo manda al middleware que maneja errores

    }
    next();
  };
}

module.exports = validatorHandler;
