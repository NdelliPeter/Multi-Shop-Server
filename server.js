const express = require("express");
const cors  = require('cors');
const corsOptions = require('./config/corsOptions')
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
dotenv.config()
const {verityJWT} = require('./middleware/veriftyJWT')
const {logger} = require('./middleware/logEvents')
const cookieParser = require('cookie-parser')
const sessions = require('express-session')
const {sessionMiddleware} = require('./middleware/session')

// Create express app
const app = express();
// client.connect()

const port = process.env.PORT || 4000;
const oneDay = 1000 * 60 * 60 * 24;

// middleware
//session middleware
// app.use(sessions({
//   secret: process.env.ACCESS_TOKEN_SECRET,
//   saveUninitialized:true,
//   cookie: {
//     secure: false,
//     httpOnly:true,
//     // maxAge: oneDay 
//   },
//   resave: false
// }));

app.use(sessionMiddleware)
// app.use(cors(corsOptions));
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(logger)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())


// db.sequelize.sync({force: true}).then(() => {
//   console.log('db has been re sync');
// })


// route
const routes = require('./routes/Route');
const flash = require("express-flash");
app.use('/', routes);

app.use('/products' , require('./routes/products'));
app.use('/accounts' , require('./routes/accounts'));
app.use('/auth' , require('./routes/auth'));
app.use('/refresh' , require('./routes/refresh'));
app.use('/logout' , require('./routes/logout'));

// app.use(verityJWT); 
app.use('/baskets', require('./routes/baskets'));
app.use('/checkout', require('./routes/checkout'));
app.use('/filter', require('./routes/filter'))


// app.use('/api/user', accountRoutes)


app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});