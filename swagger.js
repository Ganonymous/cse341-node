const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Andrew Leetham\'s CSE341 Project 1 API',
    description: 'Contacts API'
  },
  host: 'cse341-node-cs6s.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
