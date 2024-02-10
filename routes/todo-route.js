const express = require("express")
const router = express.Router();
const todoController = require('../controllers/todo-controller')
const authenticate = require("../middlewares/authorization")

router.get("/",authenticate,todoController.getByUser)

module.exports = router