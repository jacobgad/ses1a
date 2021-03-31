const express = require('express');
const router = express.Router();

const { renderBooking } = require('../controllers/booking');

router.route('/').get(renderBooking);

module.exports = router;
