const express = require('express');
const router = express.Router();
const productController = require('../Controller/productController');

// @route POST /products
// @desc Create a product
router.post('/', productController.createProduct);

// @route GET /products
// @desc Get all products
router.get('/', productController.getAllProducts);

// @route GET /products/:id
// @desc Get product by ID
router.get('/:id', productController.getProductById);

// @route PUT /products/:id
// @desc Update a product
router.put('/:id', productController.updateProduct);

// @route DELETE /products/:id
// @desc Delete a product
router.delete('/:id', productController.deleteProduct);

module.exports = router;
