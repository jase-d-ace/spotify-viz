import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createAuthRouter } from "./routes/auth";
import { SpotifyService } from "./services/spotify";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

const spotifyService = new SpotifyService(
    process.env.SPOTIFY_CLIENT_ID as string,
    process.env.SPOTIFY_CLIENT_SECRET as string,
    `${process.env.BASE_URL}/api/auth/spotify/callback`
)

app.use(createAuthRouter(spotifyService));

app.use(cors());

app.use("/api/auth", createAuthRouter(spotifyService));

app.get("/", (req, res) => {
    res.json({
        "text": "butts"
    })
})


app.listen(port, () => console.log(`butts`))