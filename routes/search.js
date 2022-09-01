const { Router } = require("express");
const Playlist = require("../models/Playlist");
const Song = require("../models/Song");
const auth = require("../middlewares/Authvalidator");

const router = Router();

router.get('/', auth, async (req, res = response) => {
    const search = req.query.search;
    if (search !== "") {
        const songs = await Song.find({
            name: { $regex: search },
        }).limit(10);

        const playlists = await Playlist.find({
            name: { $regex: search },
        }).limit(10);

        const result = { songs, playlists };

        return res.status(200).json({
            result
        });
    } else {
        return res.status(200).json({})
    }
});

module.exports = router;