import Product from '../models/Product.js'; // Importing Product model
import asyncHandler from 'express-async-handler'; // Async error handler

// Create a new product
export const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    brand,
    category,
    description,
    price,
    countInStock
  } = req.body;

  // Cloudinary gives the image URL as `req.file.path`
  const imageUrl = req.file?.path; 

  // Validate that all required fields are provided
  if (!name || !imageUrl || !brand || !category || !description || !price || !countInStock) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  const product = new Product({
    name,
    image: imageUrl, // Cloudinary image URL
    brand,
    category: category.toLowerCase(),
    description,
    price: Number(price),
    countInStock: Number(countInStock),
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct); // Return the created product
});

// Get all products
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// Get product by ID
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Update product
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const fields = ['name', 'image', 'brand', 'category', 'description', 'price', 'countInStock'];
  fields.forEach((field) => {
    if (req.body[field] !== undefined && req.body[field] !== '') {
      product[field] = field === 'category' ? req.body[field].toLowerCase() : req.body[field];
    }
  });

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});

// Delete a product
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json({ message: 'Product deleted successfully' });
});


export const searchProducts = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          $or: [
            { name: { $regex: req.query.keyword, $options: 'i' } },
            { description: { $regex: req.query.keyword, $options: 'i' } }
          ]
        }
      : {};

    const products = await Product.find(keyword);
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};