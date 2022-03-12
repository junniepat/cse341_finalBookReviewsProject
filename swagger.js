const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Book Reviews API ',
        version: '1.0.0',
        description: 'BookReview API'
    },
    license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
    },
    host: 'localhost:8080',
    schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];


swaggerAutogen(outputFile, endpointsFiles, doc)

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc)
// .then(async () => {
//     await import('./index.js');
// })