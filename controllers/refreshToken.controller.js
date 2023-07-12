const jwt = require('jsonwebtoken')
require('dotenv').config()
const db = require('../models')

const Accouts = db.accounts

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies
    console.log(cookies);
    if(!cookies?.jwt) return res.sendStatus(401)
    console.log('refreshtoken', cookies.jwt);
    const refreshToken = cookies.jwt
    const find = Accouts.findOne({where: {refreshToken: refreshToken}})
    console.log(find);
    if(!find) return res.sendStatus(403)

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || find.email !== decoded.email) return res.sendStatus(403)
            const accessToken = jwt.sign(
                {"email": decoded.email},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '5min'}
            )
            res.json({accessToken})
        }
    )
}

module.exports = {handleRefreshToken}