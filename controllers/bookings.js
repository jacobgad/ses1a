const Booking = require("../models/Booking");
const Table = require("../models/Table");

module.exports.renderBooking = async (req, res) => {
  const bookings = await Booking.find({
    date: { $gte: Date.now(), $lte: Date.now() + 12096e5 },
  });
  if (req.user.id) {
    let usersBookings = await Booking.find({ user: req.user.id });
    res.render("bookings/index", { usersBookings });
  } else {
    res.render("users/login");
  }
};

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
    let { date, table } = req.body;
    if (req.user.id) {
      const user = req.user.id;
      const newBooking = new Booking({ date, table, user });
      await newBooking.save();
      res.status(201);
      req.flash("success", "Booking successfully made");
      res.json({ msg: "success" });
    } else {
      res.status(401);
      req.flash("error", "Please Log in and try again");
    }
  } catch (e) {
    res.status(400);
    req.flash("error", "There was an error please try again soon");
    res.json(e);
  }
};

module.exports.renderNewBooking = async (req, res) => {
  const bookings = await Booking.find({
    date: { $gte: Date.now(), $lte: Date.now() + 12096e5 },
  });
  let bookedSlots = avalibility(bookings);
  res.render("bookings/new", { bookedSlots });
};

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
