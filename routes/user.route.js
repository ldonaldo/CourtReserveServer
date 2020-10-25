const router = require("express").Router()
const UserService = require("../services/user.controller")
const { authMiddleware } = require("../utils/middlewares")

router.route("/").post(UserService.createNewUser)
router.route("/login").post(UserService.loginUser)
router.route("/logout").post(UserService.logoutUser)
router.route("/").get(authMiddleware, UserService.getUser)
router.route("/update").post(authMiddleware, UserService.updateUser)
router.route("/delete").delete(authMiddleware, UserService.deleteUser)

module.exports = router 