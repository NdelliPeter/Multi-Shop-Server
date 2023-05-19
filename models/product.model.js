const db = require('../data/product.json')


module.exports = db.model('Product', {
    name: {type: String},
    image: {type: Image},
    category: {type: String},
    price: {type: Number},
    Quantity: {type: Number}
})