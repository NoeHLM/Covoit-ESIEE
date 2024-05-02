import { Router } from "express";

import {
    signup
} from "../controllers/userController.js";


const router = Router();


router.post('/', signup);

export default router;
