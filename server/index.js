const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 9999;

app.use(express.static(path.join(__dirname, '../client')));
app.use(cors());

app.get('/products/:src/:id', (req, res) => {
  const { src, id } = req.params;
  let path;

  if(src === 'featureExplorer') {
    path = 'http://localhost:3000';
  }
  else if(src === 'relatedProducts') {
    path = 'http://localhost:3001';
  }
  else if(src === 'productInfo') {
    path = 'http://localhost:3002';
  }

  axios.get(`${path}/products/${id}`)
  .then((response) => {
    res.status(200).send(response.data);
  })
  .catch((error) => {
    res.status(400).send(error);
  })
});


const Proxy = (targetUrl) => (req, res) => {
  axios.get(targetUrl + req.originalUrl + req.params.id)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
};
const proxyQuestions = Proxy('http://localhost:3004');
const proxyReviews = Proxy('http://localhost:7777');
const proxyRelatedProducts = Proxy('http://localhost:3001');

app.use('/questions/:id', proxyQuestions);
app.use('/review/:id', proxyReviews);
app.use('/relatedProducts/:id', proxyRelatedProducts);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});