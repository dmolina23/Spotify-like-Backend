const {response} = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
    const token = req.header('x-token')
    if (!token) {
        return res.status(401).json({
            ok: 'false',
            mensaje: 'There is no authoritation token'
        })
    }
    
    try {
        const { id, name} = jwt.verify(token, process.env.SECRET_KEY_JWT)
        req.id = id
        req.name = name
    } catch (error) {
        return res.status(401).json({
            ok: 'false',
            message: 'Invalid token'
        })
    }
    next()
}

module.exports = { validateJWT }