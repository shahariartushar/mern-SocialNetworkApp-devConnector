import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authentication = (req, res, next) => {
  // Get the token from header
  const token = req.header('x-auth-token');

  const secret = process.env.jwtSecret;

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, secret);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
