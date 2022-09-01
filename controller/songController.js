const { response } = require("express");
const res = require("express/lib/response");
const Song = require("../models/Song");
const User = require("../models/User");

const createSong = async (req, res = response) => {
    const { name, artist } = req.body;
    try {
        let song = await Song.findOne({ name, artist })
        if (song) {
            return res.status(400).json({
                ok: false,
                message: "Song already exists"
            })
        }
        song = new Song(req.body);
        await song.save();

        return res.status(201).json({
            status: "ok",
            name: song.name,
            artist: song.artist,
            song: song.song,
            img: song.img,
            duration: song.duration
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "server error"
        })
    }
}

const getSongs = async (req, res = response) => {
    const songs = await Song.find();

    return res.status(200).json({
        ok: true,
        songs
    })
}

const getSongById = async (req, res = response) => {
    const song = await Song.findById(req.params.id);

    if (!song) {
        return res.status(400).json({
            ok: false,
            message: "Song not found"
        });
    }

    return res.status(200).json({
        ok: true,
        song
    })
}

const updateSongById = async (req, res = response) => {
    const song = await Song.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
    );

    return res.status(200).json({
        ok: true,
        message: "Song updated correctly",
        song
    })
}

const deleteSongById = async (req, res = response) => {
    const song = await Song.findByIdAndDelete(req.params.id);

    if (!song) {
        return res.status(400).json({
            ok: false,
            message: "Song doesn't exists"
        })
    }

    return res.status(200).json({
        ok: true,
        message: "Song deleted",
        song
    })
}

const likeSong = async (req, res = response) => {
    const song = await Song.findById(req.params.id);
    let resMessage = "";

    if (!song) {
        return res.status(400).json({
            ok: false,
            message: "Song doesn't exists"
        });
    }

    const user = await User.findById(req.params.user);
    const index = user.likedSongs.indexOf(song._id);

    if (index === -1) {
        user.likedSongs.push({ id: song._id })
        await User.updateOne({ id: user._id }, { $addToSet: { likedSongs: [user.likedSongs] } });
        await user.save();
        resMessage = "Added to your liked songs"
    } else {
        user.likedSongs.splice(index, 1);
        await User.updateOne({ id: user._id }, { $addToSet: { likedSongs: [user.likedSongs] } });
        await user.save();
        resMessage = "Removed from your liked songs"
    }

    await user.save();
    return res.status(200).json({
        ok: true,
        message: resMessage
    })
}

const getAllLikedSongs = async (req, res = response) => {
    const user = User.findById(req.params.user);
    const songs = await Song.find({}, { id: "$id", name: "$name", artist: "$artist" }, { _id: { $in: ["$id", [user.likedSongs]] } });
    if (songs.length == 0) {
        return res.status(400).json({
            message: "You don't have any liked songs"
        })
    }
    return res.status(200).json({
        ok: true,
        songs
    })
}

module.exports = {
    createSong,
    getSongs,
    getSongById,
    updateSongById,
    deleteSongById,
    likeSong,
    getAllLikedSongs
}