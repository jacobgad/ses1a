const currentDate = new Date();
let dateModel = new Date();
let yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const timeSlots = [1700, 1730, 1800, 1830, 1900, 1930, 2000, 2030];

let url = "http://localhost:3000";

async function getAvability(time) {
  const slug = time.getFullYear() + '-' + time.getMonth() + '-' + time.getDate()

  axios
    .get(url + "/bookings/" + slug)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err);
    });
}

function findTable(num, time) {
  console.log(getAvability(time))
  return null;
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
  dateModel.setDate(dateModel.getDate() + 1);
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
    submitForm: function () {
      const bookingTime = document.getElementById('time').value
      let bookingDateTime = new Date(this.date.setHours(Number(bookingTime.substring(0,2)), 
      Number(bookingTime.substring(2,4)), 00));

      const bookingPost = {
        date: bookingDateTime,
        table: findTable(this.numValue, bookingDateTime)
      }

      console.log(bookingPost)
    },
  },
});
