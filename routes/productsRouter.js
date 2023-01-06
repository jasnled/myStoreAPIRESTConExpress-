//abrimos un archivo para la ruta de productos de productos

const express = require('express');
const ProductsService = require('../services/productsService');

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


router.get('/:id', async (req,res) => { // esto es dinamico y cuando uno quiere ir a /filter
  // este endpoint toma filter como id
  /*
  const id = req.params.id; //aqui en vienen los parametros que fueron pasados
  //como se dio en el '/products/:id' entonces en los parametros viene id
  //si hubiese sido asignado como '/products/:productId'
  //se encontraría en req.params.productId
  */

  const { id } = req.params; // utilizando desestructuracion
  const product = await service.findOne(id); //ya que va a ejcutar una promesa
  if(product == null){
    res.status(404).json({
      message: "Not found"
    });
  }else{
    res.status(200).json(product);
  }



});

router.post('/',async (req, res)=>{  //el metodo post sera atendido desde el endpoint principal
  const body = req.body;
  const product = await service.create(body);
  res.status(201).json({
    message: 'create',
    data: product
  });
});

router.patch('/:id',async (req, res)=>{  //se recibe el id del producto a actualizar
  try{
    const { id } = req.params;
    const body = req.body;

    const product = await service.update(id, body);
    res.json({
      message:'updated',
      data: product
    });
  } catch (error){
    res.status(404).json({
      message:error.message
    });
  };


});

router.delete('/:id',async (req, res)=>{  //se recibe el id del producto a borrar
  const { id } = req.params;
  const productDelete = await service.delete(id);
  if(productDelete != null){
    res.status(200).json({
      message:'deleted',
      data: productDelete
    });
  }else{
    res.status(404).json({
      message: "not found"
    });
  }

});


module.exports = router;
