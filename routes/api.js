import express from 'express';
import rateLimit from 'express-rate-limit';
import { chatPage, sendMessage } from '../controllers/chatController.js';
import  historyPage  from '../controllers/historyController.js';
import  comparePage  from '../controllers/compareController.js';
import  forecastPage  from '../controllers/forecastController.js';

const chatLimiter = rateLimit({
    windowMs: 60 * 1000,  // 1 minute
    max: 20,              // max 20 requests per minute per IP
    message: { error: 'Trop de requêtes. Veuillez réessayer dans une minute.' }
});

const router = express.Router();

router.get("/chat", chatPage);
router.post("/chat", chatLimiter, sendMessage);
router.get("/history", historyPage);
router.get("/compare", comparePage);
router.get("/forecast", forecastPage);

export default router;