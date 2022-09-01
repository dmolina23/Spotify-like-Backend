const { Router } = require('express');
const { getUsers, getUserById, updateUserById, deleteUserById } = require('../controller/userController');
const admin = require('../middlewares/AdminValidator');
const validObjectId = require('../middlewares/ObjectIdValidator');
const auth = require('../middlewares/Authvalidator');

const router = Router();

router.get('/', admin, getUsers);
router.get('/:id', [validObjectId, auth], getUserById);
router.put('/:id', [validObjectId, auth], updateUserById);
router.delete('/:id', [validObjectId, admin], deleteUserById);

module.exports = router;