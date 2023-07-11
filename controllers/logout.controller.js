const jwt = require('jsonwebtoken')


const logout = (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(204)
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt
    const allAcc =  pool.query(`Select * from accounts`, (err, result) => {
        if (!err) {
            res.send(result.rows)
        }
    })
    pool.end
    const find = allAcc.find(person => person.refreshToken === refreshToken)
    
    if(!find) return res.sendStatus(403)

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || find.username !== decoded.username) return res.sendStatus(403)
            const accessToken = jwt.sign(
                {"username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '60s'}
            )
            res.json({accessToken})
        }
    )
}

module.exports = {logout}