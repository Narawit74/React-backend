const express = require("express")
const router = express.Router();
const RentBookController = require('../controllers/rentbook-controller')
const authenticate = require("../middlewares/authorization")

router.get("/",authenticate,RentBookController.getByUser)
router.get("/all",authenticate,RentBookController.getByAdmin)
router.post("/insert",authenticate,RentBookController.createNewRentbook)
router.get("/search",authenticate,RentBookController.getByAdminSearch)
router.patch("/edit",authenticate,RentBookController.getRentBookByID)

module.exports = router