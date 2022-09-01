const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const PlaylistSchema = Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    desc: {
        type: String
    },
    img: {
        type: String
    }
});

const Playlist = model('Playlist', PlaylistSchema)

module.exports = Playlist;