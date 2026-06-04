const express = require("express")
console.log("INDEX FILE VERSION 999");
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

require("dotenv").config()

mongoose.connect(process.env.MONGO_URI)

.then(()=>console.log("MongoDB Atlas Connected"))
.catch(err=>console.log(err))

const cylinderRoutes = require("./routes/cylinderRoutes")
const saleRoutes = require("./routes/saleRoutes")

app.use("/api/cylinders", cylinderRoutes)
app.use("/api/sales",saleRoutes)

app.listen(5000,()=>{
console.log("Server running on port 5000")
})