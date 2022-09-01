const { Router } = require('express');
const validObjectId = require('../middlewares/ObjectIdValidator');
const auth = require('../middlewares/Authvalidator');
const { createPlaylist, updatePlaylist, getPlaylistById, getPlaylists, deletePlaylist, addSongToPlaylist, removeSongFromPlaylist, getUserPlaylists, getRandomPlaylists } = require('../controller/playlistController');

const router = Router();

router.post('/:user', [validObjectId, auth], createPlaylist);
router.get('/', auth, getPlaylists);
router.get('/:user/favourite', auth, getUserPlaylists);
router.get('/:id', [validObjectId, auth], getPlaylistById);
router.put('/:user/:id', [validObjectId, auth], updatePlaylist);
router.delete('/:user/:id', [validObjectId, auth], deletePlaylist);

// extra
// router.put('/:user/add-song/:id', auth, addSongToPlaylist);
// router.put('/remove-song', auth, removeSongFromPlaylist);
// router.get('/random', auth, getRandomPlaylists);

module.exports = router;