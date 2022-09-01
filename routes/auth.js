const { Router } = require('express');
const { login, signup, revalidate } = require('../controller/authController');
const { check } = require('express-validator');
const validate = require('../middlewares/Authvalidator');
const { validateJWT } = require('../middlewares/TokenValidator');

const router = Router();

router.post('/signup', [
    check('name', 'name cannot be empty').notEmpty(),
    check('email', 'invalid email').isEmail(),
    check('password', 'password must have at least 8 characters').isLength({ min: 8 }),
    validate
], signup)

router.post('/login', [
    check('email', 'invalid email').isEmail(),
    check('password', 'password must have at least 8 characters').isLength({ min: 8 }),
    validate
], login)

router.get('/revalidate', validateJWT, revalidate)

module.exports = router;