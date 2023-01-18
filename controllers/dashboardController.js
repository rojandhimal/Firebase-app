const { db } = require("../utils/auth");

exports.indexView = async (req, res, next) => {
  let totalStudents = 0;
  let activeStudents = 0;
  let cancelStudents = 0;

  await db
    .collection("students")
    .get()
    .then((snap) => {
      totalStudents = snap.size;
    });
  await db
    .collection("students")
    .where("studentStatus", "==", "approved")
    .get()
    .then((snap) => {
      activeBooking = snap.size;
    });
  await db
    .collection("students")
    .where("studentStatus", "==", "canceled")
    .get()
    .then((snap) => {
      cancelBooking = snap.size;
    });

  res.render("home", {
    totalStudents,
    activeStudents,
    cancelStudents
  });
};
