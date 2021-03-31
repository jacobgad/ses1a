const express = require('express');
const router = express.Router();

const { newAdmin, renderNewAdmin, renderIndex, renderStaff, newStaff, deleteStaff, updateStaff } = require('../controllers/admin');
const { isLoggedIn } = require('../middleware/users');

router.route('/')
	.get(isLoggedIn, renderIndex)
	.post(newAdmin);

router.get('/new', renderNewAdmin);

router.route('/staff')
	.get(renderStaff)
	.post(newStaff)
	.put(updateStaff)
	.delete(deleteStaff);

module.exports = router;
