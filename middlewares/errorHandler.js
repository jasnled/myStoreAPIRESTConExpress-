function logErrors (err, req, res, next){
  console.log('logErrors');
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next){  //aunque no se utilice la variable next hay que ponerlo
  res.status(500).json({                     //para que él detecte que es este tipo de middleware
    message: err.message,
    stack: err.stack
  });
}

function boomErrorHandler(err, req, res, next){
  if (err.isBoom){
    const { output } = err;
    res.status(output.statusCode).json(output.payload);

    /*si es un error generado por boom entonces tendra un atributo llamado
    de out put donde tambein podemos encontrar el status code y el json
    del error en output.payload
    */

  }
  next(err);
};

module.exports = { logErrors, errorHandler, boomErrorHandler };
