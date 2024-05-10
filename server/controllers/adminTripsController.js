import AdminTrip from "../models/adminTrip";

const createAdminTrip = async (req, res) => {
    const adminTrip = new AdminTrip(req.body);

    try {
        const newAdminTrip = await adminTrip.save();
        res.status(201).json(newAdminTrip);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    createAdminTrip,
};