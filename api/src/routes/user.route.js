const { loginUser, registerUser, recoverPassword } = require('../controllers/userController');
const UserModel = require('../models/user.model');
const response = require('../utils/response');
const { ClientError } = require('../utils/errors');

const user = {
  get_my_data: async (req, res) => {
    const { userId } = req.user;
    const user = await UserModel.findOne({ _id: userId });
    if (!user) throw new ClientError('Usuario no encontrado', 500);
    response(res, 200, user);
  },

  register_new: async (req, res, next) => {
    const { email, password, firstName } = req.body;
    if (!firstName) throw new ClientError('firstName is missing', 500);
    if (!email) throw new ClientError('email is missing', 500);
    if (!password) throw new ClientError('password is missing', 500);

    const result = await registerUser(email, password, firstName);

    response(res, 200, result);
  },

  login: async (req, res, next) => {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    //SE COMENTAN 2 LINEAS
    // if (!user) // LA VALIDACION DEL USER YA SE REALIZA EN EL CONTROLADOR TIRABA ERROR PORQUE NO ESTABA DEFINIDA
    //   throw new ClientError('Usuario ' + email + ' no encontrado', 400);
    response(res, 200, result);
  },

  recover_my_password: async (req, res) => {
    const { email, password } = req.body;
    const result = await recoverPassword(email, password);
    response(res, 200, result);
  },

  retrieve_notifications: async (req, res) => {
    const { email } = req.query; // Usar req.query en lugar de req.body
    const user = await UserModel.findOne({ email });
    if (!user) throw new ClientError('Usuario no encontrado', 500);
    // Obtener el array de notificaciones del usuario
    const notifications = user.notifications;
    response(res, 200, notifications);
  },
  logout: async (req, res) => {
    const { userId } = req.user;
    const user = await UserModel.findOne({ _id: userId });
    if (!user) throw new ClientError('Usuario no encontrado', 500);

    // Eliminar el token actual del usuario
    user.tokens = user.tokens.filter((token) => token.token !== req.token);
    await user.save();

    response(res, 200, { message: 'Logout exitoso' });
  },

};

module.exports = user;
