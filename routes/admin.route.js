const router = require("express").Router()
const AdminService = require("../services/admin.controller")

router.route("/").post(AdminService.createNewAdmin)
router.route("/login").post(AdminService.loginAdmin)
router.route("/logout").post(AdminService.logoutAdmin)

module.exports = router 