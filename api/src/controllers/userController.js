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
  lastName,
  phone,
  country,
  province,
  zipcode
) => {
  const existingUser = await UserModel.findOne({ email }).maxTimeMS(15000); // Increase timeout to 15 seconds
  if (existingUser) throw new ClientError('Este usuario ya existe', 500);
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    phone,
    country,
    province,
    zipcode,
  });

  await newUser.save();
  const jwtSecretKey = 'MySuperSecretKey123!@';
  const token = jwt.sign({ userId: newUser._id, email}, jwtSecretKey, {
    expiresIn: '3000h',
  });

  newUser.tokens.push({ token });
  newUser.Notifications.push('Bienvenido a Whopaws')

  await newUser.save();
  return {
    ok: true,
    message: 'User created successfully',
    token,
    user: {
      userType: newUser.userType,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      profilePic: newUser.profilePic,
      pets: newUser.pets,
      id: newUser.id,
    },
  };
};

const loginUser = async (emailParam, password) => {
  if (!emailParam || !password) throw new ClientError("No ha llegado el email o el password", 400);
  const user = await UserModel.findOne({ email: emailParam });
  if (!user)
    throw new ClientError('El usuario no se encuentra registrado', 500);
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) throw new ClientError('Contraseña incorrecta', 500);
  const jwtSecretKey = 'MySuperSecretKey123!@';
  const token = jwt.sign({ userId: user._id }, jwtSecretKey, {
    expiresIn: '3000h',
  });
  if(user.tokens && user.tokens.length==0){
  user.tokens.push({ token })
}
  else{
    user.tokens = [{ token }]
  }

  
  await user.save();
  const { userType, firstName, lastName, email, profilePic, pets, id } = user;
  return {
    token,
    user: { userType, firstName, lastName, email, profilePic, pets, id },
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

// const uno = { userType, firstName, lastName, email, profilePic, pets, id };
