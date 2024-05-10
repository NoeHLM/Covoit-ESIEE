import mongoose from "mongoose";
const { Schema, model } = mongoose;

const adminTripSchema = new Schema({
    departureAdress: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
    },
});
export default model("adminTrip", adminTripSchema);