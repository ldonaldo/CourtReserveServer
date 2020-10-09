const router = require("express").Router()
const UserService = require("../services/user.controller")

router.route("/").post(UserService.createNewUser)
router.route("/login").post(UserService.loginUser)
router.route("/logout").post(UserService.logoutUser)

module.exports = router 