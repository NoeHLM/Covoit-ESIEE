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
router.post("/getUserName/:id", getUserName);

export default router;
