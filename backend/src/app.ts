import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import SpotifyWebApi from "spotify-web-api-node";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
    res.json({
        "text": "butts"
    })
})
app.listen(port, () => console.log(`butts`))