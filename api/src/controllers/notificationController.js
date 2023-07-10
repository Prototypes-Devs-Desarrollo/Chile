const admin = require('firebase-admin');
const User = require('../models/user.model');
const { response } = require('../utils');
const { ClientError } = require('../utils/errors');

const sendNotification = async (token, title, body) => {
  const message = {
    notification: {
      title,
      body,
    },
    token,
  };

  const response = await admin.messaging().send(message);
  console.log('Notificación enviada:', response);
  const user = await User.findOne({ deviceTokens: token });
  if (!user) throw new ClientError('No se enviará la notificación', 400);
  user.Notifications.push({
    title,
    body,
    createdAt: new Date(),
  });
  await user.save();
};

const saveDeviceToken = async (req, res) => {
  const { email, token } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    throw new ClientError('No se guardara el token en la Database', 400);
  // Actualizar los tokens de registro del usuario
  user.deviceTokens.push(token);
  await user.save();
  response(res, 200, 'Token de registro guardado correctamente en la Database');
};

module.exports = {
  sendNotification,
  saveDeviceToken,
};
