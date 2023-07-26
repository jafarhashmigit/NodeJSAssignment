"use strict";

var jwt = require('jsonwebtoken');
var JWT_SECRET = 'your-secret-key'; // Replace with a strong secret key in production

module.exports = function (req, res, next) {
  var token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({
      message: 'Authorization header not found'
    });
  }
  try {
    var decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Invalid token'
    });
  }
};