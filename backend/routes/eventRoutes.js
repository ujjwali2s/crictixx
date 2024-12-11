import express from 'express';
import { getAllEvents, getOddsForEvent } from '../controllers/eventController.js';

const router = express.Router();

router.get('/events', getAllEvents);
router.get('/get_odds/:sportRadarId', getOddsForEvent);

export default router;