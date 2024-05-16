import mongoose from "mongoose";
const { Schema, model } = mongoose;

const adminTripSchema = new Schema({
    departureAdress: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: null,
    },
    type: {
        type: String,
        required: true,
    },
});
export default model("adminTrip", adminTripSchema);