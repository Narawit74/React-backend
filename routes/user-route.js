const express = require("express")
const router = express.Router();
const userController = require('../controllers/user-controller')
const authenticate = require("../middlewares/authorization")

router.get("/",authenticate,userController.getByUser)
router.get("/users",authenticate,userController.getUsers)
router.get("/search",authenticate,userController.getUsersSearch)
router.delete("/delete/:id",authenticate,userController.deleteUsers)

module.exports = router