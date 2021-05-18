const express = require("express");
const router = express.Router();

const booking = require("../controllers/bookings");

router
  .route("/")
  .get(booking.renderBooking)
  .post(booking.registerBooking)
  .delete(booking.deleteBooking)
  .put(booking.updateBooking)

router.get("/editBooking", booking.getBookingByID);

router.post("/new", booking.renderNewBooking);

router.get("/table", booking.getTable);

router.get("/:date", booking.jsonDateBookings);

module.exports = router;
