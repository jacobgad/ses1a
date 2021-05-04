const express = require('express');
const router = express.Router();

const booking = require('../controllers/bookings');

router.route('/')
  .get(booking.renderBooking);

router.post('/new', booking.registerBooking);

router.get('/table', booking.getTable);

router.get('/:date', booking.jsonDateBookings);

module.exports = router;
