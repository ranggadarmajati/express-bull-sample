const Queue = require('bull');

const validatingQueue = new Queue('ValidatingQueue', {
    limiter: {
        max: 1000,
        duration: 5000
    },
    redis: {
        url: process.env.REDIS_URL,
    },
});

module.exports = { validatingQueue };

