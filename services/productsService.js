/*
creamos una nueva carpeta llamada
services.
aqui se define todo la logica a nivel transaccional
que van a tener los datos

*/

const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 10;
    for(let i = 0; i < limit; i++){
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
      console.log(this.products);

      }
  }

  async create(body){
    const image = faker.image.imageUrl();
    const id = faker.datatype.uuid();
    const isBlock = faker.datatype.boolean();
    const {name, price} = body;

    const product = {id ,name, price, image, isBlock};
    this.products.push(product);
    return product;
  }

  async find(){
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        resolve(this.products);
      },5000);
    });
    return this.products;
  }

  async findOne(id) {

    const product = this.products.find(item => item.id === id);
    if(!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock){
      throw boom.conflict('product is block');
    }
    return product;

  }

  async update(id, body) {

    let {name, price, image} = body;
    const index = this.products.findIndex(item => item.id === id);

    if (index != -1){
      /*
      if(name == null){
        name = this.products[index].name;
        console.log(`name ${name}`);
      }

      if(price == null){
        price = this.products[index].price;
        console.log(`price ${price}`);
      }

      if(image == null){ // verificando si esta indefinido
        image = this.products[index].image;
        console.log(`image ${image}`);
      }
      */
      const productUpdate = {
        ...this.products[index],
        ...body
       }

      this.products[index] = productUpdate;

      return productUpdate;
    }else {
      throw boom.notFound('product not found');
    }


  }
  async delete(id) {
    const product = this.products.find(item => item.id === id);
    if (product === null){
      throw boom.notFound('product not found');
    }
    if (product.isBlock){
      throw boom.conflict('product is block');
    }
    this.products = this.products.filter(item => item.id != id);
    return product;
  }
}

module.exports = ProductsService;
