const Reservation = require("../models/reservation.model");
const Court = require("../models/court.model");

module.exports = {
  deleteCourtsFromAdmin: async (courts) => {
    try {
      const courtsDeleted = await Court.deleteMany({_id: {$in: courts}})
    } catch(err) {
      console.log(err)
    }
  },
  deleteReservationsFromCourt: async(courts) => {
    try {
      const reservations = await Reservation.deleteMany({courtId: {$in: courts}})
    } catch(err){
      console.log(err)
    }   
  }
}