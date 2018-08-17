const bunyan = require('bunyan');

const logger = bunyan.createLogger({ name: 'myhapi' });

module.exports = logger;

