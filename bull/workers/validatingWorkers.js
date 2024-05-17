const { validatingQueue } = require('../queues/validatingQueue');
const validatingJob = require('../jobs/validatingJob');

validatingQueue.process(validatingJob);
validatingQueue.on('completed', (job, result) => {
    console.log(`Job id ${job.id} | Job Name ${job.name} | data: ${JSON.stringify(job.data)}`);
    console.log(`Job completed with result ${JSON.stringify(result)}`);
});

