const express = require("express")
const router = express.Router();
const RentBookController = require('../controllers/rentbook-controller')
const authenticate = require("../middlewares/authorization")
const upload = require('../middlewares/upload')

router.get("/",authenticate,RentBookController.getByUser)
router.get("/all",authenticate,RentBookController.getByAdmin)
router.get("/edit/:id",RentBookController.getRentBookByID)
router.post("/insert",authenticate ,upload.single('image') ,RentBookController.createNewRentbook)
router.delete("/delete/:id",authenticate,RentBookController.deleteRentBook)
router.get("/search",authenticate,RentBookController.getByAdminSearch)
router.patch("/edit/:id",authenticate,RentBookController.updateRentBook)

module.exports = router