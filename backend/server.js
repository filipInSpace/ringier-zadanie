require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const ratesRouter = require('./src/routes/rates');
require('./src/cronJobs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

app.use('/api/rates', ratesRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocument);
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});