const { CARGA_TOKEN } = process.env;
require('dotenv').config(); // Carga las variables de entorno desde .env

const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { ClientError } = require('../utils/errors');

const createNewUser = async (user) => {
  const userExists = await UserModel.findOne({ email: user.email });
  if (userExists) throw new ClientError('Este usuario ya existe', 500);
  const newUser = new UserModel(user);
  await newUser.save();
  return newUser;
};

const registerUser = async (
  email,
  password,
  firstName,
) => {
  const existingUser = await UserModel.findOne({ email }).maxTimeMS(15000); // Increase timeout to 15 seconds
  if (existingUser) throw new ClientError('Este usuario ya existe', 500);
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    email,
    password: hashedPassword,
    firstName,
 
  });
  await newUser.save();
  const jwtSecretKey = 'MySuperSecretKey123!@';
  const token = jwt.sign({ userId: newUser._id }, jwtSecretKey, {
    expiresIn: '3000h',
  });
  newUser.tokens.push({ token });
  await newUser.save();
  return {
    ok: true,
    message: 'User created successfully',
    token,
    user: newUser,
  };
};

const loginUser = async (emailParam, password) => {
  const user = await UserModel.findOne({ email: emailParam });
  if (!user)
    throw new ClientError('El usuario no se encuentra registrado', 500);
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new ClientError('Contraseña incorrecta', 500);
  const jwtSecretKey = 'MySuperSecretKey123!@';
  const token = jwt.sign({ userId: user._id }, jwtSecretKey, {
    expiresIn: '3000h',
  });
  user.tokens.push({ token });
  await user.save();
  return {
    token,
    user
  };
};

const recoverPassword = async (email, password) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new ClientError('Usuario ' + email + ' no registrado', 400);
  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  await user.save();
  const jwtSecretKey = 'MySuperSecretKey123!@';
  const token = jwt.sign({ userId: user._id }, jwtSecretKey, {
    expiresIn: '1h',
  });
  return 'Contraseña recuperada correctamente', token, user;
};

const findUser = async (email) => {
  const userInDB = await UserModel.findOne({ email: email });
  return userInDB;
};

const findUserName = async (email) => {
  const userInDB = await UserModel.findOne({ email: email });
  return userInDB.firstName + ' ' + userInDB.lastName;
};


module.exports = {
  createNewUser,
  registerUser,
  loginUser,
  findUser,
  findUserName,
  recoverPassword,
};
