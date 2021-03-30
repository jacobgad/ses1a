const express = require('express');
const router = express.Router();

const { newAdmin, renderNewAdmin, renderIndex } = require('../controllers/admin');
const { isLoggedIn } = require('../middleware/users');

router.route('/')
	.get(isLoggedIn, renderIndex)
	.post(newAdmin)

router.get('/new', renderNewAdmin)



module.exports = router;
