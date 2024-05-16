import e from "express";
import trip from "../models/trip.js";
import user from "../models/user.js";
import mongoose from "mongoose";

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

export const getNextTrips = async (req, res) => {
    try {
        const actualDate = new Date();
        const trips = await trip.find({ date: { $gte: actualDate } });
        
        return res.status(200).send(trips);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

export const ParticipateTrip = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        if (!userId) {
            return res.status(400).send({ message: "User ID is required" });
        }

        const trips = await trip.findById(id);
        if (!trips) {
            return res.status(404).send({ message: "Trip not found"});
        }

        console.log(userId, trips.driver);

        // Convertir userId en ObjectId pour la comparaison
        const userObjectId = new mongoose.Types.ObjectId(userId);
        if (userObjectId.equals(trips.driver)) {
            console.log("You can't participate to your own trip");
            return res.status(400).send({ message: "Vous ne pouvez pas participer à votre propre trajet :/"});
        }

        if (trips.participants && trips.participants.length >= trips.maxPlaces) {
            console.log("Trip is full");
            return res.status(400).send({ message: "Le trajet est complet :/"});
        }

        if (trips.participants && trips.participants.includes(userObjectId)) {
            console.log("You are already participating in this trip");
            return res.status(400).send({ message: "Vous vous êtes déjà inscrits pour ce trajet :/" });
        }

        if (new Date(trips.date) < new Date()) {
            console.log("Trip is already passed");
            return res.status(400).send({ message: "Le trajet est déjà passé :/" });
        }

        await trip.findByIdAndUpdate(id, {
            $push: { participants: userObjectId },
        });

        return res.status(200).send({ message: "Félicitations ! Vous vous êtes inscrits au trajet, vous pouvez le consulter sur la page 'Vos trajets' " });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

export const CancelParticipation = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    try {
        console.log(trip.driver, userId)
        if (userId === trip.driver) {
            return res.status(400).send({ message: "Vous ne pouvez pas vous désinscrire de votre trajet" });
        }
        

        await trip.findByIdAndUpdate(id, {
            $pull: { participants: userId },
        });

        return res
            .status(200)
            .send({ message: "Participation canceled successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

export const getTripsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const trips = await trip.find({ 
            $or: [
                { participants: userId },
                { driver: userId }
            ]
        });
        return res.status(200).send(trips);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}