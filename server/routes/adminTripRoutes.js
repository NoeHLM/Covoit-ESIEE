import { Router } from "express";

import {
    createAdminTrip,
    getAdminTrips,
    getAdminTrip,
    updateAdminTrip,
    deleteAdminTrip
} from "../controllers/adminTripsController.js";

const router = Router();

router.post('/create', createAdminTrip);
router.get('/get', getAdminTrips);
router.get('/get/:id', getAdminTrip);
router.put('/update/:id', updateAdminTrip);
router.delete('/delete/:id', deleteAdminTrip);


export default router;