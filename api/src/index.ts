const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8080;
const { checkJwt, checkAdmin } = require('./utils/jwtUtils');
const { globalLimit } = require('./utils/rate-limiters');
const admin = require('firebase-admin');
const serviceAccount = require('../happy-clean-8e79e-firebase-adminsdk-d9ktq-6d4baeab21'); // Ruta al archivo JSON de las credenciales de servicio
const morgan = require('morgan');
const { ClientError } = require('./utils/errors');

require('dotenv').config();

mongoose.set('strictQuery', true);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

let mongodbURI = process.env.DB_DEV;

if(!!process.env.NODE_ENV && !!process.env.DB_PRO ){
  mongodbURI = process.env.DB_PRO;
  console.log("MODO PRODUCCIÓN ACTIVADO");
  console.log("DB_PRO=",process.env.DB_PRO);
}
else{
  console.log("MODO DEV, USANDO DB LOCAL");
  console.log("DB_DEV=",process.env.DB_DEV);
}

console.log("NODE_ENV: ",JSON.stringify(process.env.NODE_ENV),"mongo url: ", mongodbURI);

const app = express();
app.use(morgan('dev'));

app.get('/api', async (req, res) => {
  res.send({
    message: 'Server working',
  });
});

app.get('/', async (req, res) => {
  res.send({
    message: 'Server ts working',
  });
});


app.use(cors({ origin: '*' }));
app.use(globalLimit);
// en /api aplicamos solamente el express.json, porque a stripe no le gusta.
app.use('/api', express.json({ limit: '50mb' }));
app.use('/api', bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(routes);

// En caso de que la ruta no exista:
app.use('*', (req, res) => {
  throw new ClientError("Ruta no encontrada: "+ req.baseUrl, 404);
});


// Todos los errores pasan por este manejador de errores de expresss:
app.use((err, req, res, next) => {
  let message_to_send = 'API: ' + err.message;
  console.log(message_to_send)
  res.status(err.statusCode || 500).send({
    error: true,
    message: message_to_send,
  });
});

app.listen(port, () => {
  console.log(`Server has started on port ${port}!`);
});

async function main() {
  try {
    await mongoose.connect(mongodbURI);
    console.log('Connected to the database.');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Exit the application if unable to connect to the database
  }
}

main().catch((error) => {
  console.error('An error occurred during initialization:', error);
  process.exit(1); // Exit the application if an error occurs during initialization
});

module.exports = app;
