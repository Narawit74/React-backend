const express = require("express")
const router = express.Router()
const authController = require('../controllers/auth-controller')
const authenticate = require("../middlewares/authorization")

router.post("/register",authController.register)
router.post("/login",authController.login)
router.get("/me", authenticate ,authController.getMe)
router.patch("/update", authenticate , authController.updateUser)


module.exports = router