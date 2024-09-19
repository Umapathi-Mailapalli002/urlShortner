import URL from "../models/url.js";
import shortid from "shortid";
const handleGenerateNewShortURL = async (req, res) => {
    const shortID = shortid();
    const body = req.body;
    if (!body.url) return res.status(400).json({error: "url is required"})
    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
    });
    return res.json({id: shortID});
}

const handleGtAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}
export  {
    handleGenerateNewShortURL,
    handleGtAnalytics
};