import { Router } from "express";

import {
    signup,
    login,
    refreshToken,
    getUserLoggedData,
    getUserName
} from "../controllers/userController.js";


const router = Router();

router.post('/register', signup);
router.post('/login', login);
router.post("/refresh-token", refreshToken);
router.post("/me", getUserLoggedData);
router.get("/getUserName/:driverId", getUserName);

export default router;
