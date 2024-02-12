const express = require("express")
const router = express.Router();
const RentBookController = require('../controllers/rentbook-controller')
const authenticate = require("../middlewares/authorization")

router.get("/",authenticate,RentBookController.getByUser)
router.get("/all",authenticate,RentBookController.getByAdmin)
router.get("/search",authenticate,RentBookController.getByAdminSearch)

module.exports = router