require('dotenv').config();
const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const helmet = require('helmet');
const Arena = require('bull-arena');
const Bull = require('bull');
const { BullMonitorExpress } = require('@bull-monitor/express');
const { BullAdapter } = require('@bull-monitor/root/dist/bull-adapter');
const OrderRoute = require('./v1/routes/OrderRoute');
const port = process.env.PORT || 5000;
const { validatingQueue } = require("./bull/queues/validatingQueue");
(async () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
  app.use(cookieParser());
  app.use(compression());
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        "script-src": ["'self'", "https://cdn.jsdelivr.net"]
      }
    }
  }));

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

  const monitor = new BullMonitorExpress({
    queues: [
      new BullAdapter(validatingQueue)
    ],
    // enables graphql introspection query. false by default if NODE_ENV == production, true otherwise
    gqlIntrospection: true,
    // enable metrics collector. false by default
    // metrics are persisted into redis as a list
    // with keys in format "bull_monitor::metrics::{{queue}}"
    metrics: {
      // collect metrics every X
      // where X is any value supported by https://github.com/kibertoad/toad-scheduler
      collectInterval: { hours: 1 },
      maxMetrics: 100,
      // disable metrics for specific queues
      blacklist: ['1'],
    },
  });
  await monitor.init();
  app.use('/queue/monitor', monitor.router );
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
})();

// module.exports = app;
// module.exports = app;