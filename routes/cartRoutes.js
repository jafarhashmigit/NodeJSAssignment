const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Create a new cart
router.post('/', cartController.createCart);

// Add product to cart
router.post('/:cartId/add-product/:productId', cartController.addProductToCart);

// Remove product from cart
router.delete('/:cartId/remove-product/:productId', cartController.removeProductFromCart);

// Get cart by ID
router.get('/:cartId', cartController.getCartById);

// Checkout cart
router.post('/:cartId/checkout', cartController.checkoutCart);

module.exports = router;