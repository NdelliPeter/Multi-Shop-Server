const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');

// Create express app
const app = express();

// Local imports
// const db = require('./data/db.json');
const accountRoutes = require('./routes/Route')
const productRoutes = require('./routes/Route')

const port = process.env.PORT || 5000;

// middleware
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true}));

// route
const routes = require('./routes/Route')
app.use('/', routes)

// db().then(() => {
//   console.log('db connected Successfully');
//   app.listen(port, function () {
//     console.log(`Example app listening on port ${port}!`);
//   });
// }).catch(err => console.log(err))

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

const dataPath = './data/account.json'
const productDataPath = './data/product.json'
// util functions
const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}
const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)   
}
const saveProductData = (data) => {
  const stringifyData = JSON.stringify(data)
  fs.writeFileSync(productDataPath, stringifyData)
}
const getProductData = () => {
  const jsonData = fs.readFileSync(productDataPath)
 return JSON.parse(jsonData)
}

// Create an Account
accountRoutes.post('/account/addaccount', (req, res) => {
 
  var existAccounts = getAccountData()
  const newAccountId = Math.floor(100000 + Math.random() * 900000)

  existAccounts[newAccountId] = req.body
 
  console.log(existAccounts);
  saveAccountData(existAccounts);
  res.send({success: true, msg: 'account added successfully'})
})

productRoutes.post('/product/addproduct', (req, res) => {
 
  let existProduct = getProductData()
  const newProducttId = Math.floor(100000 + Math.random() * 900000)

  existProduct[newProducttId] = req.body
 
  console.log(existProduct);
  saveProductData(existProduct);
  res.send({success: true, msg: 'product added successfully'})
})



// Read all Data
accountRoutes.get('/account/list', (req, res) => {
  const accounts = getAccountData()
  res.send(accounts)
})
productRoutes.get('/product/list', (req ,res) => {
  const products = getProductData();
  res.send(products);
})

// Update - using Put method
accountRoutes.put('/account/:id', (req, res) => {
  var existAccounts = getAccountData()
  fs.readFile(dataPath, 'utf8', (err, data) => {
    const accountId = req.params['id'];
    existAccounts[accountId] = req.body;
    saveAccountData(existAccounts);
    res.send(`accounts with id ${accountId} has been updated`)
  }, true);
});

productRoutes.put('/product/:id', (req, res) => {
  var existProducts = getProductData()
  fs.readFile(productDataPath, 'utf8', (err, data) => {
    const productId = req.params['id'];
    existProducts[productId] = req.body;
    saveProductData(existProducts);
    res.send(`product with id ${productId} has been updated`)
  }, true);
});

// delete - using delete method
accountRoutes.delete('/account/delete/:id', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    let existAccounts = getAccountData()
    const userId = req.params['id'];
    delete existAccounts[userId]; 
    saveAccountData(existAccounts);
    res.send(`accounts with id ${userId} has been deleted`)
  }, true);
});
productRoutes.delete('/product/delete/:id', (req, res) => {
  fs.readFile(productDataPath, 'utf8', (err, data) => {
    let existProducts = getProductData()
    const userId = req.params['id'];
    delete existProducts[userId]; 
    saveProductData(existProducts);
    res.send(`product with id ${userId} has been deleted`)
  }, true);
})

