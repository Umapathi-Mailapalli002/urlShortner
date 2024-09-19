import express, { urlencoded } from "express";
import connectToMongoDB from "./connect.js";
import { config } from "dotenv";
import router from "./routes/url.js";
import URL from "./models/url.js";
import path from "path";
import staticRoute from "./routes/staticRouter.js"

config();
const app = express();
const PORT = process.env.PORT || 8000;

connectToMongoDB("mongodb://localhost:27017/short-url")
  .then(() => console.log("Mongodb is started"))
  .catch(() => console.log("error on connecting db"));
   app.set("view engine", "ejs");
  app.set('views', path.resolve("./views"))
app.use(express.json());
app.use(express.urlencoded({extended: false}))


app.use("/url", router);
app.use("/", staticRoute);
app.get("/url/:shortId", async (req, res) => {
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
