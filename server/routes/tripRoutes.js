import { Router } from "express";

import { createTrip, getTrips, getTrip, updateTrip, deleteTrip, getNextTrips, ParticipateTrip, CancelParticipation, getTripsByUser } from "../controllers/tripController.js";

const router = Router();

router.post('/create', createTrip);
router.get('/get', getTrips);
router.get('/get/:id', getTrip);
router.put('/update/:id', updateTrip);
router.delete('/delete/:id', deleteTrip);
router.get('/getNextTrips', getNextTrips);
router.post('/participate/:id', ParticipateTrip);
router.get('/getTripsByUser/:userId', getTripsByUser);
router.post('/cancelParticipation/:id', CancelParticipation);

export default router;