const express = require('express');
const passport = require('passport');
const router = express.Router();

const { isLoggedIn, isUser } = require('../middleware/users');
const users = require('../controllers/users');

router.route('/register')
	.get(users.renderRegister)
	.post(users.register);

router.route('/login')
	.get(users.renderLogin)
	.post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

router.route('/users/:username')
	.put(isLoggedIn, isUser, users.updateUser)
	.delete(isLoggedIn, isUser, users.deleteUser)

router.get('/users/:username/edit', isLoggedIn, isUser, users.renderEdit)

router.route('/forgot')
	.get(users.renderForgot)
	.post(users.forgot)

router.route('/reset/:token')
	.get(users.renderReset)
	.post(users.reset)

module.exports = router;
