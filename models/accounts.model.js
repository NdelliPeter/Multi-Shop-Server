const db =require('./data/db.json');


module.exports = db.model('account', {
    firstName: {type: String},
    Last: {type: String},
    userName: {type: String},
    email: {type: String},
    password: {type: String},
    confirmPassword: {type: String}
})