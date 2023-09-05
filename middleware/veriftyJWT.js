const jwt = require('jsonwebtoken')
require('dotenv').config() 

const verityJWT = (req, res, next) => {
    console.log(req);
    const authHeader = req.headers.authorization || req.headers.Authorization
    if (!authHeader.startsWith('Bearer ')) return res.sendStatus(401)
    console.log(authHeader);
    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res. sendStatus(403)
            req.account = decoded.email;
            next()
        }
    )
}

module.exports = { verityJWT }