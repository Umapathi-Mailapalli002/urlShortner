import express from "express";
import {handleGenerateNewShortURL, handleGtAnalytics} from "../controllers/url.js";
const router = express.Router();

router.post('/', handleGenerateNewShortURL)
router.get("/analytics/:shortId", handleGtAnalytics)

export default router;