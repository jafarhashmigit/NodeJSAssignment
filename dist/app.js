"use strict";

var express = require('express');
var mongoose = require('mongoose');
var dotenv = require('dotenv');
dotenv.config();
var app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('Connected to MongoDB');
})["catch"](function (err) {
  return console.error('Error connecting to MongoDB:', err);
});

// Routes
var authRoutes = require('./routes/auth');
var categoryRoutes = require('./routes/categoryRoutes');
var productRoutes = require('./routes/productRoutes');
var userRoutes = require('./routes/users');
var cartRoutes = require('./routes/cartRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/users', userRoutes);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});