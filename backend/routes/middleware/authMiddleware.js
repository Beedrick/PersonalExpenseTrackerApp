const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.cookies?.token;  // Extract token from cookie named 'token'

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey');
    req.user = decoded;  // Attach user info (id, username) to req.user
    next();  // Proceed to next middleware/route
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = authMiddleware;