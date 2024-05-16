import { Router } from "express";

import {
    signup,
    login,
    refreshToken,
    getUserLoggedData,
    getUserName,
    getUserNameAndPhone,
} from "../controllers/userController.js";


const router = Router();

router.post('/register', signup);
router.post('/login', login);
router.post("/refresh-token", refreshToken);
router.post("/me", getUserLoggedData);
router.get("/getUserName/:driverId", getUserName);
router.get("/getUserNameAndPhone/:passengerId", getUserNameAndPhone);
export default router;
