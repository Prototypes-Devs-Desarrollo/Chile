// const express = require('express');
// const mongoose = require('mongoose');
// const routes = require('../src/routes');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const port = process.env.PORT || 8080;
// const { checkJwt, checkAdmin } = require('../src/utils/jwtUtils');
// const { globalLimit } = require('../src/utils/rate-limiters');
// require('dotenv').config();


// mongoose.set('strictQuery', true);


// const mongodbURI = "mongodb://mongo:wWrXyveWmifBiqWOBdH6@containers-us-west-150.railway.app:7573";

// async function main() {
//   await mongoose.connect(mongodbURI);
// }

// const app = express();

// app.get('/api', async (req, res) => {
//   console.log(process.env, 'linea 24');
//   res.send({
//     message: 'Server working',
//   });
// });

// app.get('/api/check-db', async (req, res) => {
//   try {
//     res.send({ message: await connect() });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ message: 'Unable to connect to the database' });
//   }
// });

// app.use(cors({ origin: '*' }));
// app.use(globalLimit);
// // en /api aplicamos solamente el express.json, porque a stripe no le gusta.
// app.use('/api', express.json({ limit: '50mb' }));
// app.use('/api', bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));
// app.use(routes);

// app.get('/api/check', checkJwt, async (req, res) => {
//   try {
//     res.send({
//       message: 'Token decoded successfully!',
//       user: req.user,
//     });
//   } catch (err) {
//     res.send({ message: 'The server encountered an error: ' + err.message });
//   }
// });

// app.get('/api/auth', async (req, res) => {
//   const userToken = req.header('Auth');
//   const cargaToken = process.env.CARGA_TOKEN;

//   if (userToken && userToken === cargaToken) {
//     res.sendStatus(200);
//   } else {
//     res.sendStatus(401);
//   }
// });

// const ReportSchema = new mongoose.Schema({
//   number: Number,
// });

// const Report = mongoose.model('Report', ReportSchema);

// app.get('/api/report/:number', checkJwt, checkAdmin, async (req, res) => {
//   const { number } = req.params;
//   try {
//     const report = new Report({ number: parseInt(number) });
//     await report.save();
//     res.status(201).send(report);
//   } catch (err) {
//     res.status(500).send('Error: ' + err.message);
//   }
// });

// app.listen(port, () => {
//   console.log(`Server has started on port ${port}!`);
// });

// async function main() {
//   try {
//     await mongoose.connect(mongodbURI);
//     console.log('Connected to the database.');
//   } catch (error) {
//     console.error('Failed to connect to the database:', error);
//     process.exit(1); // Exit the application if unable to connect to the database
//   }
// }

// main().catch((error) => {
//   console.error('An error occurred during initialization:', error);
//   process.exit(1); // Exit the application if an error occurs during initialization
// });

// module.exports = app;

const express = require('express');
const mongoose = require('mongoose');
const routes = require('../src/routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8080;
const { checkJwt, checkAdmin } = require('../src/utils/jwtUtils');
const { globalLimit } = require('../src/utils/rate-limiters');
const morgan = require("morgan");
const {response} = require('../src/utils');

require('dotenv').config();

mongoose.set('strictQuery', true);

const mongodbURI = "mongodb://mongo:wWrXyveWmifBiqWOBdH6@containers-us-west-150.railway.app:7573";


const app = express();
app.use(morgan("dev"))

app.get('/api', async (req, res) => {
  res.status(200).send({
    message: 'Server working',
  });
});



app.use(cors({ origin: '*' }));
app.use(globalLimit);
// en /api aplicamos solamente el express.json, porque a stripe no le gusta.
app.use('/api', express.json({ limit: '50mb' }));
app.use('/api', bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(routes);

app.use("*", (req, res) => {
  response(res,404,req.baseUrl)
})

app.use((err, req, res, next) => {
  const message_to_send = err.message
  res.status(err.statusCode||500).send({
      error: true,
      message: message_to_send,
  })
})

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
