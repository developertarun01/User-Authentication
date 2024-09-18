const mongoose = require("mongoose")
const connect = mongoose.connect("mongodb://localhost:27017/login")

//Check database connected or not
connect.then(() => {
    console.log("Database connected Successfully")
})
.catch(() => {
    console.log("Database cannot be Connected")
})

//Create a Schema
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

//Collection Part
const Collection = new mongoose.model("users", LoginSchema)

module.exports = Collection