import 'dotenv/config'
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const mongoString = process.env.DATABASE_URL;
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:8080" }));
const port = 3000


import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminTripRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";


mongoose.connect(mongoString);

const database = mongoose.connection;

database.on("error", (error) => {
    console.log(error);
});

database.once("open", () => {
    console.log("Database Connected");
});

app.use("/users", userRoutes);
app.use('/admin', adminRoutes);
app.use('/trips', tripRoutes);
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})