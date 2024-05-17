const Queue = require('bull');

const validatingQueue = new Queue('ValidatingQueue', {
  redis: {
    url: process.env.REDIS_URL,
  },
});

module.exports = { validatingQueue };

