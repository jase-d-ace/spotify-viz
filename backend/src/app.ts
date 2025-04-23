import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createAuthRouter } from "./routes/auth";
import { SpotifyService } from "./services/spotify";
import { securityMiddleware } from "./middleware/security";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(securityMiddleware);

app.use(cors({
    origin: ['http://localhost:5173', "http://127.0.0.1:5173", "http://localhost:3000", "http://127.0.0.1:3000", "https://accounts.spotify.com"],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

app.use(express.json());
const spotifyService = new SpotifyService(
    process.env.SPOTIFY_CLIENT_ID as string,
    process.env.SPOTIFY_CLIENT_SECRET as string,
    process.env.SPOTIFY_REDIRECT_URI as string
)

app.use("/api/auth", createAuthRouter(spotifyService));

app.get("/", (req, res) => {
    res.json({
        "text": "hello world"
    })
})


app.listen(port, () => console.log(`live on port ${port}`))