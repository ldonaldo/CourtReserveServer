const router = require("express").Router()
const AdminService = require("../services/admin.controller")
const { authMiddleware } = require("../utils/middlewares")

router.route("/").post(AdminService.createNewAdmin)
router.route("/login").post(AdminService.loginAdmin)
router.route("/logout").post(AdminService.logoutAdmin)
router.route("/").get(authMiddleware, AdminService.getAdmin)
router.route("/update").post(authMiddleware, AdminService.updateAdmin)
router.route("/delete").delete(authMiddleware, AdminService.deleteAdmin)

module.exports = router 