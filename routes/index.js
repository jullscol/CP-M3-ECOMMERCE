"use strict";

var express = require("express");
const model = require("../models/model");


var router = express.Router();
module.exports = router;


const models = require("../models/model");


// escriban sus rutas acá
// siéntanse libres de dividir entre archivos si lo necesitan


router.get('/categories', (require, resolve)=>{
    resolve.json(models.listCategories());
})

router.post('/categories', (require, resolve) => {
    const {category} = require.body;
    try{
        models.addCategory(category)
        resolve.status(201).json({ msg: 'Categoría creada correctamente' });
    } catch (error) {
        resolve.status(400).json({error: error.message });
    }
});


router.get('/products', (require, resolve)=>{
    resolve.json(models.listProducts());
})

router.post('/products', (require, resolve) => {
    const {name, brand, category, stock} = require.body;
    try{
        resolve.status(201).json(models.addProduct(name, brand, category, stock) );
    } catch (error) {
        resolve.status(404).json({error: error.message });
    }
});

router.get('/products/:categoryName', (require, resolve) => {
    let { categoryName } = require.params;
    let {fullName} = require.query;
    try{
        resolve.status(200).json(models.listProducts(categoryName, fullName));
    } catch (error) {
        resolve.status(404).json({error: error.message });
    }
})

router.get('/reviews', (require, resolve) => {
    let {name} = require.query;
    try{
        resolve.status(200).json(models.getReviews(name));
    } catch (error) {
        resolve.status(404).json({error: error.message });
    } 
})

router.post('/reviews', (require, resolve) => {
    const {name, stars, text, user} = require.body;
    try{
        models.addReview(name, stars, text, user)
        resolve.status(201).json({ msg: 'Reseña agregada correctamente' } );
    } catch (error) {
        resolve.status(400).json({error: error.message });
    }
})

router.get('/rating', (require, resolve) => {
    try{
        resolve.status(200).json(models.getRating());
    } catch (error) {
        resolve.status(404).json({error: error.message });
    } 
})

router.get('/rating/:product', (require, resolve) => {
    let {product} = require.params;
    try{

        resolve.status(200).json({rating:models.getRating(product)});
    } catch (error) {
        resolve.status(404).json({error: error.message });
    } 
})





