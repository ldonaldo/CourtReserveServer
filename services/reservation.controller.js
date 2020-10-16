const EventEmiter = require("events");
const ReservationSubscribers = require("../subscribers/reservation.subscribers")
const Reservation = require("../models/reservation.model");
const reservationSubscribers = require("../subscribers/reservation.subscribers");

class ReservationService extends EventEmiter {
  createNewReservation = async (req,res) => {
    try {
      const reservationData = (({courtId, date, startTime, endTime, month, year, paidReserve, status, totalPrice}) => ({courtId, date, startTime, endTime, month, year, paidReserve, status, totalPrice}))(req.body)
      console.log(reservationData)
      const reservation = await new Reservation(reservationData)
      reservation.userId = req.person._id
      this.emit("reservationCreated", reservation)
      this.emit("courtIdInserted", reservation)
      await reservation.save()      
      res.status(201).json({reservation})
    } catch (err){
      res.status(400).json(err.message)
    }
  }
  getReservations = async (req,res) => {
    try {
      const {date, courtId} = req.query
      const reservations = await Reservation.find({courtId: courtId, date: date})
      res.status(200).json({reservations})
    } catch(err){
      res.status(400).json(err.message)
    }   
  }
  getMonthlyReservations = async (req,res) => {
    try {
      const {courtId, year} = req.query
      const reservations = await Reservation.find({courtId: courtId, year: year})
      res.status(200).json({reservations})
    } catch(err){
      res.status(400).json(err.message)
    }   
  }

}

const reservationService = new ReservationService();
reservationService.on('reservationCreated',reservationSubscribers.addReservationIdToCourt)
reservationService.on('courtIdInserted',reservationSubscribers.addReservationIdToUser)
module.exports = reservationService