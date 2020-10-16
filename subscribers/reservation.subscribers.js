const User = require('../models/user.model');
const Court = require("../models/court.model");

module.exports = {
  addReservationIdToCourt: async (reservation) => {
    try {
      const { _id, courtId } = reservation
      const court = await Court.findById(courtId)
      court.reservations.push(_id)
      await court.save({validateBeforeSave: false})
    } catch(err){
      console.log(err)
    }
  },
  addReservationIdToUser: async (reservation) => {
    try {
      const { _id, userId } = reservation
      const user = await User.findById(userId)
      user.reservations.push(_id)
      await user.save({validateBeforeSave: false})
    } catch(err){
      console.log(err)
    }
  }
}