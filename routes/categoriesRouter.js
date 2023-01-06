const express = require('express');


const router = express.Router();

router.get('/categories/:categoryId/products/:productId', (req, res) => {
  const {
    categoryId, productId
  } = req.params;

  res.json({
    categoryId,
    productId,
  });

});

router.post('/', (req,res)=>{
  const body = req.body;
  res.json({
    message:'created',
    data:body,
  });
});

router.patch('/:id', (req,res) => {
  const body = req.body;
  const { id } = req.params;
  res.json({
    message: 'updated',
    data: body,
    id
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message:'deleted',
    id
  });
});
module.exports = router;
