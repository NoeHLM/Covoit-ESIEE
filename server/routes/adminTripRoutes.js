import { Router } from "express";

import {
    createAdminTrip,
} from "../controllers/adminTripsController.js";

const router = Router();

router.post('/create', createAdminTrip);