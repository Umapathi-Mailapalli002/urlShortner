import express from "express";
import connectToMongoDB from "./connect.js";
import { config } from "dotenv";
import router from "./routes/url.js";
import URL from "./models/url.js";

config();
const app = express();
const PORT = process.env.PORT || 8000;

connectToMongoDB("mongodb://localhost:27017/short-url")
  .then(() => console.log("Mongodb is started"))
  .catch(() => console.log("error on connecting db"));
app.use(express.json());
app.use("/url", router);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
  );
  res.redirect(entry.redirectURL);
});
app.get("/analytics/:shortId", router)
app.listen(PORT, () => console.log("the server is starting at :", PORT));
