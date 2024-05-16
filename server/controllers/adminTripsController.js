import AdminTrip from "../models/adminTrip.js";

export const createAdminTrip = async (req, res) => {
    const {
        departure,
        date,
        type,
    } = req.body;

    try {
        const newAdminTrip = new AdminTrip({
            departureAdress: departure,
            date: date,
            type: type,
        });
        await newAdminTrip.save();

        return res
            .status(200)
            .send({ message: "AdminTrip created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

export const getAdminTrips = async (req, res) => {
    try {
        const adminTrips = await AdminTrip.find();
        return res.status(200).send(adminTrips);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

export const getAdminTrip = async (req, res) => {
    const { id } = req.params;

    try {
        const adminTrip = await AdminTrip.findById(id);
        return res.status(200).send(adminTrip);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

export const updateAdminTrip = async (req, res) => {
    const { id } = req.params;
    const {
        departure,
        date,
        type,
    } = req.body;

    try {
        await AdminTrip.findByIdAndUpdate(id, {
            departureAdress: departure,
            date: date,
            type: type,
        });

        return res
            .status(200)
            .send({ message: "AdminTrip updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

export const deleteAdminTrip = async (req, res) => {
    const { id } = req.params;

    try {
        await AdminTrip.findByIdAndDelete(id);
        return res
            .status(200)
            .send({ message: "AdminTrip deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}