const Product = require('../Models/Product');
const upload = require('../helpers/upload');
const fs = require('fs');
const path = require('path');

// Create a new product
exports.createProduct = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    const { name, description, price, category } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image: req.file ? req.file.path : null, // Store the image path if file is uploaded
    });

    newProduct.save()
      .then(product => res.status(201).json(product))
      .catch(error => res.status(500).json({ error: 'Unable to create product', details: error }));
  });
};

// Get all products
exports.getAllProducts = (req, res) => {
  Product.find()
    .then(products => res.status(200).json(products))
    .catch(error => res.status(500).json({ error: 'Unable to fetch products', details: error }));
};

// Get product by ID
exports.getProductById = (req, res) => {
  const { id } = req.params;

  Product.findById(id)
    .then(product => {
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.status(200).json(product);
    })
    .catch(error => res.status(500).json({ error: 'Unable to fetch product', details: error }));
};

// Update a product by ID
exports.updateProduct = (req, res) => {
  const { id } = req.params;

  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }

    const { name, description, price, category } = req.body;

    Product.findById(id)
      .then(product => {
        if (!product) return res.status(404).json({ message: 'Product not found' });

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.category = category || product.category;
        
        if (req.file) {
          if (product.image) {
            fs.unlinkSync(path.resolve(product.image)); // Delete old image
          }
          product.image = req.file.path;
        }

        return product.save();
      })
      .then(updatedProduct => res.status(200).json(updatedProduct))
      .catch(error => res.status(500).json({ error: 'Unable to update product', details: error }));
  });
};

// Delete a product by ID
exports.deleteProduct = (req, res) => {
  const { id } = req.params;

  Product.findByIdAndDelete(id)
    .then(product => {
      if (!product) return res.status(404).json({ message: 'Product not found' });

      if (product.image) {
        fs.unlinkSync(path.resolve(product.image)); // Delete image file
      }

      res.status(200).json({ message: 'Product deleted successfully' });
    })
    .catch(error => res.status(500).json({ error: 'Unable to delete product', details: error }));
};
