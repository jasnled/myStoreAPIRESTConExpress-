//abrimos un archivo para la ruta de productos de productos

const express = require('express');
const ProductsService = require('../services/productsService');
const validatorHandler = require('../middlewares/validatorHandler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/productcSchema');

//creamos un routing propio

const router = express.Router();

const service = new ProductsService(); // creamos una instancia del servicio



router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});


router.get('/filter', (req,res)=>{ // lo que es especifico debe de in antes que lo dinamico
  res.send('yo soy un filtro')
});


router.get('/:id',
  validatorHandler(getProductSchema, 'params'), //de primero corre una validacion y luego el next();

  async (req,res, next) => { // esto es dinamico y cuando uno quiere ir a /filter
    // este endpoint toma filter como id
    /*
    const id = req.params.id; //aqui en vienen los parametros que fueron pasados
    //como se dio en el '/products/:id' entonces en los parametros viene id
    //si hubiese sido asignado como '/products/:productId'
    //se encontraría en req.params.productId
    */
    try {
      const { id } = req.params; // utilizando desestructuracion
      const product = await service.findOne(id); //ya que va a ejcutar una promesa
      res.json(product);
      /*if(product == null){
        res.status(404).json({
          message: "Not found"
        });

      }else{
        res.status(200).json(product);
      }
      */

    } catch (error) {
      next(error);
    }
  }
) ;

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res)=>{  //el metodo post sera atendido desde el endpoint principal
    const body = req.body;
    const product = await service.create(body);
    res.status(201).json({
      message: 'create',
      data: product
    });
  }
);

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'), //se valida de forma secuencial id
  validatorHandler(updateProductSchema, 'body'), // se valida lo del body
  async (req, res, next)=>{  //se recibe el id del producto a actualizar
    try{
      const { id } = req.params;
      const body = req.body;

      const product = await service.update(id, body);
      res.json({
        message:'updated',
        data: product
      });
    } catch (error){
      next(error);
    };


  }
);

router.delete('/:id',async (req, res, next)=>{  //se recibe el id del producto a borrar
  const { id } = req.params;

  try {
    const productDelete = await service.delete(id);
    res.status(200).json({
      message:'deleted',
      data: productDelete
    });
  } catch (error) {
    next(error);
  }


});


module.exports = router;
