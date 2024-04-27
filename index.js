const mongoose = require('mongoose');
const express = require('express');
var methodOverride = require('method-override')
const app = express();
const path = require('path')

const Product = require('./models/product');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetable', 'dairy', 'fungi'];

app.get('/product', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category });
        res.render('products/index', { products, category });
    } else {
        const products = await Product.find({});
        res.render('products/index', { products, category: 'All' });
    }

});


app.get('/product/new', (req, res) => {
    res.render('products/new', { categories })
});


app.get('/product/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories })
});

app.put('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true });
        res.redirect(`/product/${product._id}`);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.delete('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
        await product.deleteOne(product);
        res.redirect("/product");
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('Internal Server Error');
    }
});




app.post('/product', async (req, res) => {
    try {
        // Extract product data from req.body
        const { name, price, category } = req.body;

        // Create a new Product instance
        const newProduct = new Product({
            name,
            price,
            category
        });
        // Save the new product to the database
        const product = await newProduct.save();
        res.render('products/show', { product });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('Internal Server Error');
    }
});



app.get('/product/:id', async (req, res) => {
    const { id } = req.params;

    // const product = await Product.findById({ _id: id });
    // console.log(product);
    const product = await Product.findById(id);
    res.render('products/show', { product });
});


app.listen(3000, () => {
    console.log(`Example app listening on port`)
})

mongoose.connect('mongodb://127.0.0.1:27017/shopApp').then(
    () => { console.log('connected to mongodb://127.0.0.1:27017/manav!!') },
    err => { console.log('something went wrong!!', err) }
);






