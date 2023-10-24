const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, 'YOUR_SECRET_KEY', (error, user) => {
    if (error) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};