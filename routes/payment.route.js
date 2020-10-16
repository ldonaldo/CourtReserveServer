const router = require("express").Router()
const PaymentService = require("../services/payment.controller")

router.route("/").post(PaymentService.createToken)
router.route("/reserve").post(PaymentService.payReserve)
module.exports = router 