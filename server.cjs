const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const routes = require('./modules/routes/routes.cjs');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use('/api', routes);

// SSR - Server Side Rendering
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.listen(3000, () => {
    console.log(`App Running On ${'http://localhost:3000'}`);
});