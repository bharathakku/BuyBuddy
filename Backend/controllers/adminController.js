// controllers/adminController.js
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register admin
export const registerAdmin = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = await User.create({
      name,
      email,
      password,
      isAdmin: true,
    });

    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: 'admin',
      token: generateToken(admin._id),
    });
  } catch (error) {
    console.error('Admin registration error:', error);
    res.status(500).json({ message: 'Failed to register admin' });
  }
};

// Login admin
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.isAdmin) {
      return res.status(401).json({ message: 'Not an admin' });
    }

    const passwordMatch = await user.matchPassword(password);

    if (passwordMatch) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: 'admin',
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};

// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve users' });
  }
};

// Delete a user (Admin only)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    await User.deleteOne({ _id: user._id });

    res.json({ message: 'User removed' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Failed to delete user' });
  }
};
