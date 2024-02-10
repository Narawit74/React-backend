const express = require("express")
const router = express.Router();
const userController = require('../controllers/user-controller')
const authenticate = require("../middlewares/authorization")

router.get("/",authenticate,userController.getByUser)

module.exports = router