require('dotenv').config();
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');
const Arena = require('bull-arena');
const Bull = require('bull');
const app = express();
const OrderRoute = require('./v1/routes/OrderRoute');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());

const bullDefaultHostConfig = {
  hostId: process.env.ARENA_HOST_ID,
  redis: {
    host: process.env.REDIST_HOST,
    port: process.env.REDIST_PORT,
    password: process.env.REDIST_PASSWORD,
  },
}
const queueNames = [
  'ValidatingQueue',
];
const arenaConfig = Arena({
  Bull,
  queues: queueNames.map(queueName => ({
    ...bullDefaultHostConfig,
    name: queueName,
  }),
    {
      basePath: '/arena',
      disableListen: true,
    }
  ),
});

app.use('/arena', arenaConfig);
// register route
app.use('/api/v1/orders', OrderRoute);

app.get("/healthcheck", (req, res) => {
  return res.status(200).send({
    type: "healthcheck",
    message: "ok",
  });
});

app.listen(port, () => {
  console.log("Listening on " + port);
});

module.exports = app;