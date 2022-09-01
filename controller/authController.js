const { response } = require('express');
const bcrypt = require('bcryptjs/dist/bcrypt');
const salt = bcrypt.genSaltSync(10);
const User = require('../models/User');
const { generateJWT } = require('../helper/jwt');

const signup = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                ok: false,
                message: "User already exists"
            })
        }
        user = new User(req.body);
        user.password = bcrypt.hashSync(password, salt)
        await user.save();
        return res.status(201).json({
            status: "ok",
            name: user.name,
            email: user.email,
            password: user.password,
            playlists: user.playlists,
            likedSongs: user.likedSongs,
            isAdmin: user.isAdmin
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "server error"
        })
    }

}

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                ok: false,
                message: "user don't exists"
            });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({
                ok: false,
                message: "invalid password"
            })
        }

        const token = await generateJWT(user.id, user.name);
        return res.json({
            ok: true,
            message: "login",
            email,
            id: user.id,
            token
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "server error"
        })
    }
}

const revalidate = async (req, res = response) => {
    const { id, name } = req
    const token = await generateJWT(id, name);
    res.json({
        ok: true,
        message: "revalidating token",
        token
    })
}

module.exports = { signup, login, revalidate }