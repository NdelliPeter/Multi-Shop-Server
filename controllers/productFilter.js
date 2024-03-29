const db = require('../models');


const Product = db.products


const getProductsByprice = async (req, res) =>{

    try {
        console.log('lknnfflndlnnvl', req.query.range);
        const {min, max} = req.query.range;
        console.log(min, max);
        const products = await Product.findAll();
        const filter = products.filter((prod)=> prod.price >= min && prod.price <= max)
        console.log(filter);
        res.status(201).send(filter);
    } catch (error) {
        res.status(404).json({message: `${error}`})
    }

}


const getPaintingsByprice = async (req, res) =>{

    try {
        console.log('lknnfflndlnnvl', req.query.range);
        const {min, max} = req.query.range;
        console.log(min, max);
        const products = await Product.findAll({where:{category: 'painting'}});
        const filter = products.filter((prod)=> prod.price >= min && prod.price <= max)
        console.log(filter);
        res.status(201).send(filter);
    } catch (error) {
        res.status(404).json({message: `${error}`})
    }

}
const getSculpturesByprice = async (req, res) =>{

    try {
        console.log('lknnfflndlnnvl', req.query.range);
        const {min, max} = req.query.range;
        console.log(min, max);
        const products = await Product.findAll({where:{category: 'sculpture'}});
        const filter = products.filter((prod)=> prod.price >= min && prod.price <= max)
        console.log(filter);
        res.status(201).send(filter);
    } catch (error) {
        res.status(404).json({message: `${error}`})
    }

}
const getFabricByprice = async (req, res) =>{

    try {
        console.log('lknnfflndlnnvl', req.query.range);
        const {min, max} = req.query.range;
        console.log(min, max);
        const products = await Product.findAll({where:{category: 'fabric'}});
        const filter = products.filter((prod)=> prod.price >= min && prod.price <= max)
        console.log(filter);
        res.status(201).send(filter);
    } catch (error) {
        res.status(404).json({message: `${error}`})
    }

}


module.exports = { 
    getProductsByprice,
    getPaintingsByprice,
    getSculpturesByprice,
    getFabricByprice
 }