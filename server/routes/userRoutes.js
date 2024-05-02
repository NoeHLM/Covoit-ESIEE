import { Router } from "express";

import {
    signup,
    login,
    refreshToken,
    getUserLoggedData,
} from "../controllers/userController.js";


const router = Router();

router.post('/register', signup);
router.post('/login', login);
router.post("/refresh-token", refreshToken);
router.post("/me", getUserLoggedData);

export default router;
