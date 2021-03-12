const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/users');

router.get('/', isLoggedIn, (req, res) => {
	res.render('admin/index');
});

module.exports = router;
