import express from "express";
import { createMentor, getmentors } from "../Controllers/mentorController.js";

const router = express.Router();

router.post("/creatementor", createMentor);
router.get('/getmentors',getmentors)

export default router;
