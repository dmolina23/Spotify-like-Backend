const { response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req, res = response, next) => {
    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(400).send({
            ok: false,
            message: "Access denied"
        })
    }

    jwt.verify(token, process.env.SECRET_KEY_JWT, async (error, validToken) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                message: "Invalid token"
            });
        } else {
            const user = await User.findById(validToken.id);
            
            if(!(user.isAdmin)) {
                return res.status(403).json({
                    ok: false,
                    message: "You don't have sufficient permissions"
                })
            }
            req.user = validToken;
            next();
        }
    })
}