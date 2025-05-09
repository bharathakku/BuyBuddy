import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log('Login request received:', { email, password });

  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    const user = await User.findOne({ email });
    console.log('User found:', user);

    if (user) {
      const isMatch = await user.matchPassword(password);
      console.log('Password match:', isMatch);

      if (isMatch) {
        const token = generateToken(user._id);
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.isAdmin ? 'admin' : 'user',
          token,
        });
      }
    }

    return res.status(401).json({ message: 'Invalid email or password' });
  } catch (error) {
    console.error('Error logging in:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export { registerUser, loginUser }; 
