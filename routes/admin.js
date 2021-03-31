const express = require('express');
const router = express.Router();

const { renderIndex, renderStaff, newStaff, deleteStaff, updateStaff, renderFirstAdmin, firstAdmin } = require('../controllers/admin');
const { isNotUser } = require('../middleware/admin')
const { isLoggedIn } = require('../middleware/users');

router.route('/')
	.get(isLoggedIn, isNotUser, renderIndex)
	.post(firstAdmin);

router.get('/new', renderFirstAdmin);

router.route('/staff')
	.get(isLoggedIn, isNotUser, renderStaff)
	.post(isLoggedIn, isNotUser, newStaff)
	.put(isLoggedIn, isNotUser, updateStaff)
	.delete(isLoggedIn, isNotUser, deleteStaff);

module.exports = router;
