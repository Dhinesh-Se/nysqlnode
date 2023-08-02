const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerAutogen = require('swagger-autogen')();
const http = require('http');
const fs = require('fs');
const ejs = require('ejs'); // If using a template engine
const app = express();
// Define your moels
// Define your route
const employeeRoutes = require('./src/routes/employee.routes');
app.get('/html', (req, res) => {
  const templatePath = __dirname + '/views/template.html';
  fs.readFile(templatePath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading HTML template:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send(data);
    }
  });
});
// Generate Swagger configuration
const doc = {
  info: {
    title: 'Express API Documentation',
    description: 'API documentation generated using swagger-autogen',
  },
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
};
const outputFile = './swagger_output.json';
const endpointsFiles = ['./server.js'];
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  // Configure Swagger U
  const swaggerDocument = require('./swagger_output.json');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
});
// Parse JSON request bodies
app.use(express.json());
// Define your routes
app.use('/api/v1/employees', employeeRoutes);
// Start the server

const port = process.env.PORT || 3000;

app.listen(port, () => {

  console.log(`Server is running on port ${port}`);

});