const express = require("express")
const router = express.Router();
const authenticate = require("../middlewares/admin-authorization")

router.get("/", authenticate, (req, res, next) => {
    console.log(req.user)
    res.json({ message: "welcome admin" })
})

module.exports = router