const currentDate = new Date();
let dateModel = new Date();
let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const timeSlots = [1700, 1730, 1800, 1830, 1900, 1930, 2000, 2030];

let url = document.URL;

function getFullTime (min) {
  if (min == 0) {
    return '00'
  } else if (min == 30) {
    return '30'
  }
}

async function getAvability(time) {
  const date =
    time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate();

  let dayBookings;
  let tables;
  let availabeTables = new Set();

  try {
    const tableRes = await axios.get(url + "/table");
    tables = tableRes.data;
  } catch (error) {
    console.log(error);
  }

  try {
    const bookingRes = await axios.get(url + "/" + date);
    dayBookings = await bookingRes.data;
  } catch (error) {
    console.log(error);
  }

  if (Object.keys(dayBookings).length === 0) {
    return tables;
  } else {
    dayBookings.forEach((booking) => {
      const bookingTime = new Date(booking.date);
      if (
        bookingTime >= time &&
        bookingTime <= new Date(time.setHours(time.getHours() + 1))
      ) {
        console.log("reached here");
        tables.forEach((table) => {
          if (table.id != booking.table) {
            availabeTables.add(table);
          }
        });
      }
    });
  }

  return Array.from(availabeTables);
}

async function editBooking(bookingID) {
  app.open = true;
  app.isUpdate = true;
  app.bookingID = bookingID;

  axios.get( url + '/editBooking', {params: {id : bookingID}})
    .then((res) => {
      app.date = new Date(res.data.date);
      app.numValue = res.data.noGuests;

      const time = app.date.getHours() + getFullTime(app.date.getMinutes())
      
      document.getElementById("time").value = time
    })
}

function deleteBooking(bookingID) {
  const booking = {data: {bookingId : bookingID}}
  axios.delete(url, booking)
}

async function findTable(num, time) {
  let suitableTables = [];

  await getAvability(time).then((res) => {
    if (num <= 2) {
      res.forEach((table) => {
        if (table.seating == 2) {
          suitableTables.push(table);
        }
      });

      res.forEach((table) => {
        if (table.seating == 4) {
          suitableTables.push(table);
        }
      });

      res.forEach((table) => {
        if (table.seating == 6) {
          suitableTables.push(table);
        }
      });
    } else if (num <= 4) {
      res.forEach((table) => {
        if (table.seating == 4) {
          suitableTables.push(table);
        }
      });

      res.forEach((table) => {
        if (table.seating == 6) {
          suitableTables.push(table);
        }
      });
    } else if (num <= 6) {
      res.forEach((table) => {
        if (table.seating == 6) {
          suitableTables.push(table);
        }
      });
    }
  });

  if ((await suitableTables.length) > 0) {
    return suitableTables[0];
  } else {
    return null;
  }
}

setTimeout(() => {
  var prevMonthBtn = document
    .getElementById("date-picker")
    .getElementsByClassName("pagination-previous")[0];
  prevMonthBtn.classList.add("disabled");
  prevMonthBtn.childNodes[0].classList.add("disabled");
  var div = document.createElement("div");
  div.setAttribute("id", "prevMonthBtnCon");
  div.appendChild(prevMonthBtn);
  document
    .getElementById("date-picker")
    .getElementsByClassName("pagination field is-centered")[0]
    .appendChild(div);
  document.getElementById("prevMonthBtnCon").style.cursor = "not-allowed";
});

if (currentDate.getHours() > 20) {
  document.getElementById("restrauntClosedWarning").hidden = false;
  yesterday.setDate(yesterday.getDate() + 1);
} else {
  timeSlots.forEach((timeSlot) => {
    if (timeSlot < currentDate.getHours() + "" + currentDate.getMinutes()) {
      document
        .getElementById(timeSlot.toString())
        .setAttribute("disabled", "disabled");
    }
  });
}

const app = new Vue({
  el: "#app",
  data() {
    return {
      open: false,
      date: dateModel,
      dayNames: ["S", "M", "T", "W", "T", "F", "S"],
      minDate: yesterday,
      incrementMinutes: 30,
      numValue: 1,
      isUpdate: false,
      bookingID: "",
    };
  },
  methods: {
    dateChange: function (date) {
      const dayMonthYear =
        date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
      const currentDayMonthYear =
        currentDate.getDate() +
        "/" +
        currentDate.getMonth() +
        "/" +
        currentDate.getFullYear();

      if (dayMonthYear == currentDayMonthYear) {
        timeSlots.forEach((timeSlot) => {
          if (
            timeSlot <
            currentDate.getHours() + "" + currentDate.getMinutes()
          ) {
            document
              .getElementById(timeSlot.toString())
              .setAttribute("disabled", "disabled");
          }
        });
      }
    },
    monthChange: function (date) {
      if (date <= currentDate.getMonth()) {
        var prevMonthBtn = document
          .getElementById("date-picker")
          .getElementsByClassName("pagination-previous")[0];
        prevMonthBtn.classList.add("disabled");
        prevMonthBtn.childNodes[0].classList.add("disabled");
        document.getElementById("prevMonthBtnCon").style.cursor = "not-allowed";
      } else {
        var prevMonthBtn = document
          .getElementById("date-picker")
          .getElementsByClassName("pagination-previous")[0];
        prevMonthBtn.classList.remove("disabled");
        prevMonthBtn.childNodes[0].classList.remove("disabled");
        document.getElementById("prevMonthBtnCon").style.cursor = "pointer";
      }
    },
    submitForm: async function () {
      const bookingTime = document.getElementById("time").value;
      const bookingDateTime = new Date(
        this.date.setHours(
          Number(bookingTime.substring(0, 2)),
          Number(bookingTime.substring(2, 4)),
          00
        )
      );
      const table = await findTable(this.numValue, bookingDateTime);

      const bookingPost = {
        date: bookingDateTime,
        table: table.id,
        noGuests: this.numValue
      };

      axios
        .post(url + "/", bookingPost)
        .then((res) => {
          this.open = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openDrawer: function() {
      this.open = true;
      this.isUpdate = false;
      this.bookingID = "";
    },

    cancelForm: function(){
      this.open = false;
    },
    updateForm: async function () {
      const bookingTime = document.getElementById("time").value;
      const bookingDateTime = new Date(
        this.date.setHours(
          Number(bookingTime.substring(0, 2)),
          Number(bookingTime.substring(2, 4)),
          00
        )
      );
      const table = await findTable(this.numValue, bookingDateTime);

      const bookingPost = {
        date: bookingDateTime,
        table: table.id,
        noGuests: this.numValue
      };

      axios.put(url + "/", bookingPost, {params: {id : this.bookingID}}).then(
        this.open = false
      )
    }
  },
});
