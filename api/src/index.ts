import { PORT } from "./config/env";
import express from 'express'
import morgan from 'morgan'
import bodyParser from "body-parser";
import cors from 'cors'
import routes from "./routes";
const {users, clients} = require('./database')
const { globalLimit } = require('./utils/rate-limiters');



/* users.find().then(r=>{
  console.log(r);
}).catch(e=>{
  console.log(e.message);
})

clients.find().then(r=>{
  console.log(r,"x");
}).catch(e=>{
  console.log(e.message);
}) */

//Creamos un servidor:
const server = express();
//Lo configuramos con Middlewares generales:
server.use(morgan('dev'));
server.use(cors({ origin: '*' }));
server.use(express.json({ limit: '500mb' }));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static('public'));
//Le agregamos las rutas:
server.use(routes);


//ruta general 404
server.use('*', (req, res) => {
  res.status(404).send({ error: true, message: "Ruta no encontrada: " + req.baseUrl });
});


//atrapador de errores de express:
server.use((err, req, res, next) => {
  let message_to_send = 'API: ' + err.message;
  console.error(message_to_send)
  res.status(err.statusCode || 500).send({
    error: true,
    message: message_to_send,
  });
});


//Una vez configurado, Iniciamos el servidor:
server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}!`);
});

