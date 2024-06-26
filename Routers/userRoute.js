import express from 'express';
import { forgotpassword, postquery, resetpassword, studentdetails, viewstudents } from '../Controllers/userController.js';
import { verifyToken } from '../Middleware/verifyToken.js';

const router  = express.Router();

router.get('/viewstudents',viewstudents);
router.post('/studentdetails',studentdetails);
router.post('/postquery',postquery);

router.post('/forgotpassword',verifyToken,forgotpassword);
router.post('/resetpassword',verifyToken,resetpassword);
export default router;