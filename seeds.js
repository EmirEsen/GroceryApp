const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/shopApp').then(
    () => { console.log('connected to mongodb://127.0.0.1:27017/shop!!') },
    err => { console.log('something went wrong!!', err) }
);

// let apple = new Product({ name: 'apple', price: 1.99, category: 'fruit', qty: 2 });
// apple.save().then(p => console.log(p));


const seedProducts = [
    {
        name: "Fairy Eggplant",
        price: 1.00,
        category: "vegetable"
    },
    {
        name: "Organic Goddess Melon",
        price: 4.99,
        category: "fruit"
    },
    {
        name: "Organic Mini Seedless Watermelon",
        price: 3.99,
        category: "fruit"
    },
    {
        name: "Organic Celery",
        price: 1.50,
        category: "vegetable"
    },
    {
        name: "Chocolate Whole Milk",
        price: 2.69,
        category: "dairy"
    }
];



Product.insertMany(seedProducts);

