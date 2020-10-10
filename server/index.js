const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 9999;

app.use(express.static(path.join(__dirname, '../client')));
app.use(cors());

// app.get('/products/:src/:id', (req, res) => {
//   const { src, id } = req.params;
//   let path;

//   if(src === 'featureExplorer') {
//     path = 'http://localhost:3000';
//   }
//   else if(src === 'relatedProducts') {
//     path = 'http://localhost:3001';
//   }
//   else if(src === 'productInfo') {
//     path = 'http://localhost:3002';
//   }

//   axios.get(`${path}/products/${id}`)
//   .then((response) => {
//     res.status(200).send(response.data);
//   })
//   .catch((error) => {
//     res.status(400).send(error);
//   })
// });


const Proxy = (targetUrl) => (req, res) => {
  axios.get(targetUrl + req.originalUrl)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
};
const proxyFeatureExplorer = Proxy('http://3.101.127.251');
const proxyRelatedProducts = Proxy('http://18.144.2.219');
const proxyProductInfo = Proxy('http://3.138.107.143');
const proxyQuestions = Proxy('http://54.183.5.42');
const proxyReviews = Proxy('http://3.131.135.129');
app.use('/products/featureExplorer/:id', proxyFeatureExplorer);
app.use('/products/relatedProducts/:id', proxyRelatedProducts);
app.use('/products/productInfo/:id', proxyProductInfo);
app.use('/questions/:id', proxyQuestions);
app.use('/review/:id', proxyReviews);
app.use('/relatedproducts/:id', proxyRelatedProducts);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});