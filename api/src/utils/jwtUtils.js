const jwt = require('jsonwebtoken');
const { ClientError } = require('./errors');

const jwtSecretKey = 'MySuperSecretKey123!@';

require('dotenv').config();
const generateToken = (payload) => {
  return jwt.sign(payload, jwtSecretKey, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    return jwt.verify(token, jwtSecretKey);
};

const checkJwt = (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token)
    throw new ClientError('Missing token! Authorization=undefined', 400);
  try {
    const decodedToken = verifyToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    throw new ClientError('Token falló al decodificarse!', 400);
  }
};

const checkAdmin = async (req, res, next) => {
  const { email } = req.user; // Assuming the user's email is present in the decoded token
  // Check if the user has admin privileges based on your custom logic
  //const isAdmin = true; // Replace this with your admin check logic
  if (!isAdmin) throw new ClientError('You are not an admin!', 400);
  next();
};

module.exports = {
  generateToken,
  verifyToken,
  checkJwt,
  checkAdmin,
};
