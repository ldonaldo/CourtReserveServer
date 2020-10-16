const router = require("express").Router()
const ReservationService = require("../services/reservation.controller")
const { authMiddleware } = require("../utils/middlewares")

router.route("/").post(authMiddleware, ReservationService.createNewReservation)
router.route("/").get(ReservationService.getReservations)
router.route("/month").get(ReservationService.getMonthlyReservations)

module.exports = router 