const express = require('express');
const router = express.Router();

const admin = require('../controllers/admin');
const { isNotUser } = require('../middleware/admin')
const { isLoggedIn } = require('../middleware/users');

router.route('/')
	.get(isLoggedIn, isNotUser, admin.renderIndex)
	.post(admin.firstAdmin);

router.get('/new', admin.renderFirstAdmin);

router.route('/staff')
	.get(isLoggedIn, isNotUser, admin.renderStaff)
	.post(isLoggedIn, isNotUser, admin.newStaff)
	.put(isLoggedIn, isNotUser, admin.updateStaff)
	.delete(isLoggedIn, isNotUser, admin.deleteStaff);

router.route('/discounts')
	.get(admin.renderDiscounts)
	.post(admin.newDiscount)
  .delete(admin.deleteDiscount);

router.get('/menu', isLoggedIn, isNotUser, admin.renderMenu)

module.exports = router;
