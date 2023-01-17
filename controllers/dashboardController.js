exports.indexView = async (req, res, next) => {
  res.render("home", {
    totalRestaurant: 0,
    totalBooking: 0,
    activeBooking: 0,
    cancelBooking: 0,
  });
};
