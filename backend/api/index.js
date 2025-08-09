const serverless = require('serverless-http');
const createApp = require('../src/createApp');

// Create the Express app once per cold start
const app = createApp();

module.exports = serverless(app);


