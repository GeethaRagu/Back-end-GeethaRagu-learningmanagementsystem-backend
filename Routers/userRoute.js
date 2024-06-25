import express from 'express';
import { postquery, studentdetails, viewstudents } from '../Controllers/userController.js';

const router  = express.Router();

router.get('/viewstudents',viewstudents);
router.post('/studentdetails',studentdetails);
router.post('/postquery',postquery);
export default router;