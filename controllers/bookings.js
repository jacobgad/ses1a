const Booking = require("../models/Booking");
const Table = require("../models/Table");
const mongoose = require('mongoose');
const { response } = require("express");

module.exports.renderBooking = async (req, res) => {
  const bookings = await Booking.find({
    date: { $gte: Date.now(), $lte: Date.now() + 12096e5 },
  });
  if (req.user.id) {
    let usersBookings = await Booking.find({ user: req.user.id });
    res.render("bookings/index", { usersBookings });
  } else {
    res.redirect('/login')
  }
};

module.exports.updateBooking = async (req, res) => {
  const bookingID = req.query.id;
  let { date, table, noGuests } = req.body;
  const user = req.user.id;

  (await Booking.findByIdAndUpdate({bookingID}, { date, table, noGuests, user })).exec();
}

module.exports.jsonDateBookings = async (req, res) => {
  let { date } = req.params;
  date = new Date(date);
  const bookings = await Booking.find({
    date: { $gte: date.setHours(00, 00, 00), $lte: date.setHours(23, 59, 59) },
  });
  res.json(bookings);
};

module.exports.getTable = async (req, res) => {
  const tables = await Table.find({});
  const tableRes = tables ? tables : {};
  res.json(tableRes);
};

module.exports.registerBooking = async (req, res) => {
  try {
    let { date, table, noGuests } = req.body;
    if (req.user.id) {
      const user = req.user.id;
      const newBooking = new Booking({ date, table, noGuests, user });
      await newBooking.save();
      res.status(201);
      req.flash("success", "Booking successfully made");
      res.json({ msg: "success" });
    } else {
      res.status(401);
      req.flash("error", "Please Log in and try again");
      res.redirect("users/login");
    }
  } catch (e) {
    res.status(400);
    req.flash("error", "There was an error please try again soon");
    res.json(e);
  }
};

module.exports.deleteBooking = async (req, res) => {
  const bookingID = req.body.bookingId;
  Booking.findByIdAndRemove(bookingID, (err) => {
    if (!err) {
      req.flash("success", "Booking Deleted");
      res.status(200).send
      res.redirect('/bookings')
    } else {
      res.status(400).send
      req.flash("deleted", "Something went wrong please call the restraunt");
    }
  })
}

module.exports.renderNewBooking = async (req, res) => {
  const bookings = await Booking.find({
    date: { $gte: Date.now(), $lte: Date.now() + 12096e5 },
  });
  let bookedSlots = avalibility(bookings);
  res.render("bookings/new", { bookedSlots });
};

module.exports.getBookingByID = async (req, res) => {
  const bookingID = req.query.id;
  const booking = await Booking.findById(bookingID).exec();

  res.json(booking)
}

//Helper Functions
function avalibility(bookings) {
  let avalibility = {};
  for (let booking of bookings) {
    const { date, tables } = booking;
    avalibility[date]
      ? (avalibility[date] += tables)
      : (avalibility[date] = tables);
  }
  return avalibility;
}
