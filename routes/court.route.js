const router = require("express").Router()
const CourtService = require("../services/court.controller")
const { authMiddleware } = require("../utils/middlewares")

router.route("/").post(authMiddleware, CourtService.createNewCourt)
router.route("/").get(CourtService.getCourts)

module.exports = router 