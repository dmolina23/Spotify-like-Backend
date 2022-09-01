const { response } = require("express")
const User = require("../models/User")
const Playlist = require("../models/Playlist");
const Song = require("../models/Song");

// create playlist
const createPlaylist = async (req, res = response) => {
    const user = await User.findById(req.params.user);
    const playlist = await Playlist({ ...req.body, user: user._id }).save();
    if (!Array.isArray(user.playlists)) {
        user.playlists = [];
    }

    user.playlists.push(playlist);
    console.log(user.playlists);
    await User.updateOne({ id: user._id }, { $addToSet: { playlists: [user.playlists] } });
    await user.save();

    console.log(user);

    return res.status(201).json({
        playlist
    })
}

// get playlist by id
const getPlaylistById = async (req, res = response) => {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
        return res.status(404).json({
            message: "Playlist not found"
        })
    }

    const songs = await Song.find({ _id: playlist.song });
    return res.status(200).json({
        playlist,
        songs
    })
}

// get all playlists
const getPlaylists = async (req, res = response) => {
    const playlists = await Playlist.find();
    return res.status(200).json({
        playlists
    });
}

// update playlist by id
const updatePlaylist = async (req, res = response) => {
    const playlist = await Playlist.findById(req.params.id);

    if (!playlist) {
        return res.status(404).json({
            message: "Playlist not found!"
        });
    }

    const user = await User.findById(req.params.user);
    
    if (!user._id.equals(playlist.user)) {
        return res.status(403).json({
            message: "User don't have access to this playlist"
        })
    }

    const { name, desc, img } = req.body;
    playlist.name = name;
    playlist.desc = desc;
    playlist.img = img;

    await playlist.save();


    return res.status(200).json({
        ok: true,
        message: "Updated successfully",
        playlist
    })
}

// delete playlist by id
const deletePlaylist = async (req, res = response) => {
    const user = await User.findById(req.params.user);
    const playlist = await Playlist.findById(req.params.id);
    
    if (!playlist || playlist == null) {
        return res.status(400).json({
            message: "Playlists doesn't exists"
        })
    }

    if (!user._id.equals(playlist.user)) {
        return res.status(403).json({
            message: "User don't have access to this playlist"
        });
    }

    const index = user.playlists.indexOf(req.params.id);
    user.playlists.splice(index, 1);
    await User.updateOne({ id: user._id }, { $addToSet: { playlists: [user.playlists] } });
    
    await user.save();
    await playlist.remove();
    
    return res.status(200).json({
        ok: true,
        message: "Playlist removed from library"
    });
}

// get random playlists
const getRandomPlaylists = async (req, res = response) => {
    const playlists = await Playlist.aggregate([{ $sample: { size: 10 } }]);
    
    return res.status(200).json({
        playlists
    })
}

// get user playlists
const getUserPlaylists = async (req, res = response) => {
    const user = await User.findById(req.params.user);
    const playlists = await Playlist.find({ _id: user.playlists });

    return res.status(200).send({
        playlists
    });
}

// add song to playlist
const addSongToPlaylist = async (req, res = response) => {
    const user = await User.findById(req.params.user);
    const playlist = await Playlist.findById(req.params.id);

    if (!user._id.equals(playlist.user)) {
        return res.status(403).json({
            message: "User don't have access to the playlist"
        })
    }

    if (playlist.songs.indexOf(req.body.songId) === -1) {
        playlist.songs.push(req.body.songId);
    }

    await playlist.save();
    return res.status(200).json({
        message: "Song added to playlist",
        playlist
    })
}

// remove song from playlist
const removeSongFromPlaylist = async (req, res = response) => {
    const user = await User.findById(req.user._id);
    const playlist = await Playlist.findById(req.body.playlistId);

    if (!user._id.equals(playlist.user)) {
        return res.status(403).json({
            message: "User don't have access to the playlist"
        });
    }

    const index = playlist.songs.indexOf(req.body.songId);
    playlist.songs.splice(index, 1);
    await playlist.save();

    return res.status(200).json({
        message: "Song removed from playlist",
        playlist
    })
}

module.exports = {
    createPlaylist,
    updatePlaylist,
    getPlaylists,
    getPlaylistById,
    deletePlaylist,
    getRandomPlaylists,
    getUserPlaylists,
    addSongToPlaylist,
    removeSongFromPlaylist
}