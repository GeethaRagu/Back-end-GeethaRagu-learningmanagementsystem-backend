import express from 'express';
import { addcourse, createcourse, getcourse } from '../Controllers/courseController.js';




const router  = express.Router();

router.post('/createcourse',createcourse);
router.get('/getcourses',getcourse);
router.post('/addcourse',addcourse)

export default router;