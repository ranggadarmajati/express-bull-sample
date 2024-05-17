const moment = require('moment');

module.exports = async (job) => {
    try {
        console.log(`Validating job started at ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
        console.log(job.data);
        return Promise.resolve({ status: 'success', data: job.data });   
    } catch (error) {
        console.log(`Validating job failed at ${moment().format('YYYY-MM-DD HH:mm:ss')}`);
        console.log(error);
        return Promise.reject({ status: 'failed', data: job.data });
    }
};

