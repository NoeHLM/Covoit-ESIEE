import mongoose from "mongoose";
const { Schema, model } = mongoose;

const tripSchema = new Schema({
    driver: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    departureAdress: {
        type: String,
        required: true,
    },
    destinationAdress: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    maxPlaces: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
export default model("trip", tripSchema);