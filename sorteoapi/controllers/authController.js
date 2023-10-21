const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const sequelize = require('../config/db');

exports.register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password: hashedPassword
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    
    const user = await User.findOne({ where: { username: req.body.username } });
    console.log(user);
    

    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials PASS' });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
