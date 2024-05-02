import 'dotenv/config'
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const mongoString = process.env.DATABASE_URL;
const app = express();
app.use(express.json());
app.use(cors());
const port = 3000


import userRoutes from "./routes/userRoutes.js";


mongoose.connect(mongoString);

const database = mongoose.connection;

database.on("error", (error) => {
    console.log(error);
});

database.once("open", () => {
    console.log("Database Connected");
});

// var myLogger = function (req, res, next) {
//     console.log('LOGGED');
//     next();
// }

// app.use(myLogger);

app.use("/users", userRoutes);
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})