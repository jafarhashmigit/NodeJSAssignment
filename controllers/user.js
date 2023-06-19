const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getCollection } = require('../utils/database');

const USER_COLLECTION = 'users';

async function signup(req, res) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const usersCollection = getCollection(USER_COLLECTION);
    await usersCollection.insertOne({ username, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    const usersCollection = getCollection(USER_COLLECTION);
    const user = await usersCollection.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ user: user._id }, 'secret');
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getAllUsers(req, res) {
  try {
    const usersCollection = getCollection(USER_COLLECTION);
    const users = await usersCollection.find().toArray();

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;

    const usersCollection = getCollection(USER_COLLECTION);
    const user = await usersCollection.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function createUser(req, res) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const usersCollection = getCollection(USER_COLLECTION);
    await usersCollection.insertOne({ username, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const usersCollection = getCollection(USER_COLLECTION);
    await usersCollection.updateOne(
      { _id: id },
      { $set: { username, password: hashedPassword } }
    );

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const usersCollection = getCollection(USER_COLLECTION);
    await usersCollection.deleteOne({ _id: id });

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  signup,
  login,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};