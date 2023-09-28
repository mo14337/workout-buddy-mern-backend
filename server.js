require("dotenv").config()


const express = require("express");
const mongoose = require("mongoose")
const workoutRoutes = require("./routes/workouts")
const userRoutes=require("./routes/user")
const cors=require("cors")

// express app
const app = express()


//middleware

app.use(cors())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()

})


app.use(express.json())

//routes

app.use("/api/workouts", workoutRoutes)
//user routes
app.use("/api/user", userRoutes)

//connect to db

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("db connected");

        //listen for requests

        app.listen(process.env.PORT, () => {
            console.log("Server is running on port 4000!!");
        })
    })
    .catch(error => {
        console.log(error);
    })


