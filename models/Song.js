const { Schema, model} = require('mongoose');

const SongSchema = Schema({
    name: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    song: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    }
});

const Song = model('Song', SongSchema);

module.exports = Song;