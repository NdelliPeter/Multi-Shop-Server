const express = require('express');
const db = require('../models');

const Accounct = db.accounts;


const saveAccount = async (req, res, next) => {

    try {
        const username = await Accounct.findOne({
            where: {
                username: req.body.username,
            },
        });

        if(username) {
            return res.json(409).send('username already taken');
        }

        const emailcheck = await Accounct.findOne({
            where: {
                email: req.boby.email,
            },
        });

        if(emailcheck) {
            return res.json(409).send('Authentication failed');
        }

        next();
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    saveAccount,
}