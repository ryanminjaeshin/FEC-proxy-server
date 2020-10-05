/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

const PORT = 9999;
// const bodyParser = require('body-parser');

app.use(cors());
// app.use('/', router)
app.use(express.static(path.join(__dirname, '../client')));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`server is running and listening on port ${PORT}`);
});
