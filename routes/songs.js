const { Router } = require('express');
const { User } = require('../models/User');
const { Song } = require('../models/Song');
const admin = require('../middlewares/AdminValidator');
const auth = require('../middlewares/Authvalidator');
const validObjectId = require('../middlewares/ObjectIdValidator');
const { createSong, getSongs, getSongById, updateSongById, deleteSongById, likeSong, getAllLikedSongs } = require('../controller/songController');

const router = Router();

router.post('/', admin, createSong);
router.get('/',auth, getSongs);
router.get('/:id',auth, getSongById);
router.put('/:id', [validObjectId, admin], updateSongById);
router.delete('/:id', [validObjectId, admin], deleteSongById);
router.put('/:user/like/:id', [validObjectId, auth], likeSong);
router.get('/:user/liked', auth, getAllLikedSongs);

module.exports = router;