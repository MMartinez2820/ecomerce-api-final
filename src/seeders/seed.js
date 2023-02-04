const Cart = require("../models/cart.models");
const initModels = require("../models/initModels");
const Products = require("../models/products.models");
const Users = require("../models/users.models");
const db = require("../utils/database");


const users = [
    {"email": "miguel@gmail.com", "password": "123456"},
    {"email": "jose@gmail.com", "password": "123456"},
    {"email": "pedro@email.com", "password": "123456"},
];

const carts = [
    {"user_id": 1},
    {"user_id": 2},
    {"user_id": 3},
];

const products = [
    {"name": "lapiz", "price": 2000, "availableQty": 20, "user_id": 1, "image_url": "http://lapiz.com"},
    {"name": "lapicero", "price": 5000, "availableQty": 30, "user_id": 2, "image_url": "http://lapicero.com"},
    {"name": "cuaderno", "price": 2500, "availableQty": 25, "user_id": 3, "image_url": "http://cuaderno.com"},
    {"name": "bolso", "price": 50000, "availableQty": 50, "user_id": 1, "image_url": "http://bolso.com"},
    {"name": "computador", "price": 2000000, "availableQty": 20, "user_id": 2, "image_url": "http://computador.com"},
    {"name": "borrador", "price": 500, "availableQty": 500, "user_id": 3, "image_url": "http://borrador.com"},
];

initModels();
db.sync({force: true}) 
    .then(() => {
        users.forEach(user => Users.create(user));

        setTimeout(() => {
            carts.forEach(cart => Cart.create(cart));
        }, 200);

        setTimeout(() => {
            products.forEach(product => Products.create(product));
        }, 400)
    })
    .catch(error => console.log(error));