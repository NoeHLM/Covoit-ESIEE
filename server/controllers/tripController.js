import trip from "../models/trip.js";

export const createTrip = async (req, res) => {
    console.log(req.body);
    const {
        User_id,
        departure,
        arrival,
        date,
        time,
        maxPlaces,
        createdAt,
    } = req.body;

    try {
        const newTrip = new trip({
            driver: User_id,
            departureAdress: departure,
            destinationAdress: arrival,
            date: date,
            time: time,
            maxPlaces: maxPlaces,
            createdAt: createdAt,
        });
        await newTrip.save();

        return res
            .status(200)
            .send({ message: "Trip created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

export const getTrips = async (req, res) => {
    try {
        const trips = await trip.find();
        return res.status(200).send(trips);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

export const getTrip = async (req, res) => {
    const { id } = req.params;

    try {
        const trips = await trip.findById(id);
        return res.status(200).send(trips);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

export const updateTrip = async (req, res) => {
    const { id } = req.params;
    const {
        User_id,
        departure,
        destination,
        date,
        time,
        maxPlaces,
        createdAt,
    } = req.body;

    try {
        await trip.findByIdAndUpdate(id, {
            driver: User_id,
            departureAdress: departure,
            destinationAdress: destination,
            date: date,
            time: time,
            maxPlaces: maxPlaces,
            createdAt: createdAt,
        });

        return res
            .status(200)
            .send({ message: "Trip updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

export const deleteTrip = async (req, res) => {
    const { id } = req.params;

    try {
        await trip.findByIdAndDelete(id);
        return res
            .status(200)
            .send({ message: "Trip deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}