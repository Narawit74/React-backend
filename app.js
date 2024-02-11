require('dotenv').config()
const express = require("express")
const cors = require("cors");
const app = express();

const errorHandler = require("./middlewares/error") 
const notFoundHandler = require("./middlewares/notfound")

const authRoute = require("./routes/auth-route")
const RentbookRoute = require("./routes/rentbook-route")
const userRoute = require("./routes/user-route")
const adminRoute = require("./routes/admin-route")


app.use(cors())
app.use(express.json())


app.use("/auth",authRoute)
app.use("/product",()=>{})
app.use("/rentbook",RentbookRoute)
app.use("/user",userRoute)
app.use("/admin",adminRoute)


app.use(errorHandler);
app.use("*", notFoundHandler);


let port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Server Listen on port ${port}`)
})