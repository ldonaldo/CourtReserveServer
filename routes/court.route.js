const router = require("express").Router()
const CourtService = require("../services/court.controller")
const { authMiddleware } = require("../utils/middlewares")

router.route("/").post(authMiddleware, CourtService.createNewCourt)
router.route("/update").put(authMiddleware, CourtService.updateCourt)
router.route("/").get(CourtService.getCourts)
router.route("/admin").get(authMiddleware, CourtService.getCourtsByUser)

module.exports = router 