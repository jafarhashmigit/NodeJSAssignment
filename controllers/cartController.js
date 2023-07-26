const Cart = require('../models/cart');
const Product = require('../models/product');

// Create a new cart
exports.createCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const newCart = new Cart({ user: userId, items: [] });
    await newCart.save();

    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create cart', error });
  }
};

// Add product to cart
exports.addProductToCart = async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    cart.items.push({ product: productId, quantity });
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add product to cart', error });
  }
};

// Remove product from cart
exports.removeProductFromCart = async (req, res) => {
  try {
    const { cartId, productId } = req.params;

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const index = cart.items.findIndex(item => item.product.toString() === productId);
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    cart.items.splice(index, 1);
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove product from cart', error });
  }
};

// Get cart by ID
exports.getCartById = async (req, res) => {
  try {
    const { cartId } = req.params;

    const cart = await Cart.findById(cartId).populate('items.product', 'name price');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get cart', error });
  }
};

// Checkout cart
exports.checkoutCart = async (req, res) => {
  try {
    const { cartId } = req.params;

    const cart = await Cart.findById(cartId).populate('items.product');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Calculate the total price
    let totalPrice = 0;
    for (const item of cart.items) {
      totalPrice += item.product.price * item.quantity;
    }

    // You can implement payment gateway and other checkout logic here
    // For now, we'll just empty the cart after checkout
    cart.items = [];
    await cart.save();

    res.json({ message: 'Checkout successful', totalPrice });
  } catch (error) {
    res.status(500).json({ message: 'Failed to checkout cart', error });
  }
};