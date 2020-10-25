const Reservation = require("../models/reservation.model");

module.exports = {
  deleteReservationsFromUser: async (_id) => {
    try {
      const reservations = await Reservation.deleteMany({userId: _id})
    } catch(err) {
      console.log(err)
    }
  } 
}