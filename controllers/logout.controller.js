
const db = require('../models')

const Accounts = db.accounts

const logout = async (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.sendStatus(204)
    const refreshToken = cookies.jwt

    const find = Accounts.findOne({where: {refreshToken: refreshToken}})
    
    if(!find) {
        res.clearCookie('jwt', {httpOnly: true  })
        return res.sendStatus(204)
    }

    if(find){
        find.refreshtoken = null
        await find.save()
    }else{
        console.log('Account not found');
    }

    res.clearCookie('jwt', { httpOnly: true, maxAge:24*60*60*1000})
    res.sendStatus(204)

}

module.exports = {logout}