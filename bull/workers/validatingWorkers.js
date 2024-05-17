const { validatingQueue } = require('../queues/validatingQueue');
const validatingJob = require('../jobs/validatingJob');

validatingQueue.process(validatingJob);
