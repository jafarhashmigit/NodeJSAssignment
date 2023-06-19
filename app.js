const express = require('express');
const app = express();
const authMiddleware = require('./middleware/auth');
const userRoutes = require('./routes/user');
const { connectToDatabase } = require('./utils/database');

// Connect to MongoDB
connectToDatabase();

app.use(express.json());
app.use('/user', authMiddleware.authenticate, userRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});