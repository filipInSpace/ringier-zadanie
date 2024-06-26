const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Currency Exchange Rate API',
      version: '1.0.0',
      description: 'This API provides services for currency conversion, retrieving current exchange rates and finding extremes',
    },
    servers: [
      {
        url: 'http://localhost:5000/',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const openApiSpecification = swaggerJsdoc(options);

module.exports = openApiSpecification;
