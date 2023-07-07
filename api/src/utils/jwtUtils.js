const jwt = require('jsonwebtoken');

const jwtSecretKey = 'MySuperSecretKey123!@';

require('dotenv').config();
const generateToken = (payload) => {
  return jwt.sign(payload, jwtSecretKey, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecretKey);
  } catch (error) {
    throw new Error('Invalid token!');
  }
};

const checkJwt = (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) {
    return res.status(401).json({ msg: 'Missing token! Provide the token in the Authorization header.', res: {}, con: false });
  }

  try {
    const decodedToken = verifyToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Invalid token!', res: {}, con: false });
  }
};

const checkAdmin = async (req, res, next) => {
  const { email } = req.user; // Assuming the user's email is present in the decoded token

  // Check if the user has admin privileges based on your custom logic
  const isAdmin = true; // Replace this with your admin check logic

  if (isAdmin) {
    next();
  } else {
    return res.status(403).send({ msg: 'Access denied! You do not have admin privileges.', res: {}, con: false });
  }
};

module.exports = {
  generateToken,
  verifyToken,
  checkJwt,
  checkAdmin,
};
