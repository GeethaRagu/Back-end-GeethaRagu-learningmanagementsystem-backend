import express from 'express';
import { google, loginUser, registeruser } from '../Controllers/authController.js';

const router  = express.Router();

router.post('/signup',registeruser);
router.post('/signin',loginUser);
router.post('/google',google);

export default router;