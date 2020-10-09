require("dotenv").config({path: __dirname + '/.env.dev'})
const express = require ("express")
const cors = require("cors")
const helmet = require("helmet")
const morgan = require("morgan")
const userRouter = require("./routes/user.route")
const adminRouter = require("./routes/admin.route")

const db = require("./config/dbConnection")
db() 

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan("common"))
app.use(helmet())

app.use("/user", userRouter)
app.use("/admin", adminRouter)

module.exports = app