import { Router } from "express";

import { createTrip, getTrips, getTrip, updateTrip, deleteTrip } from "../controllers/tripController.js";

const router = Router();

router.post('/create', createTrip);
router.get('/get', getTrips);
router.get('/get/:id', getTrip);
router.put('/update/:id', updateTrip);
router.delete('/delete/:id', deleteTrip);

export default router;