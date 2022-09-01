const { response } = require("express");
const User = require("../models/User");

const getUsers = async (req, res = response) => {
    const users = await User.find();

    if (!users) {
        return res.status(400).json({
            ok: false,
            message: "There are no users yet"
        });
    }

    return res.status(200).json({
        ok: true,
        users
    })
}

const getUserById = async (req, res = response) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return res.status(400).json({
            ok: false,
            message: "User not found"
        });
    }

    return res.status(200).json({
        ok: true,
        user
    })
}

const updateUserById = async (req, res = response) => {
    const user = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body},
        {new: true}
    )

    return res.status(200).json({
        ok: true,
        user
    })
}

const deleteUserById = async (req, res = response) => {
    const user = await User.findByIdAndDelete(req.params.id);

    return res.status(200).json({
        ok: true,
        message: "User deleted",
        user
    })
}

module.exports = { getUsers, getUserById, updateUserById, deleteUserById }