const Queue = require('bull');

const validatingQueue = new Queue('ValidatingQueue', {
    limiter: {
        max: 1000,
        duration: 5000
    },
    redis: {
        port: 6379,
        host: process.env.REDIST_HOST,
    },
});

module.exports = { validatingQueue };

