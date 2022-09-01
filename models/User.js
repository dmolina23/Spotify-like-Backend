const { Schema, model } = require('mongoose');
const Playlist = require('./Playlist');

const UserSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    playlists: {
        type: [Object],
        default: []
    },
    likedSongs: {
        type: [Object],
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

const User = model('User', UserSchema)

module.exports = User;