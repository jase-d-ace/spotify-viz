import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createAuthRouter } from "./routes/auth";
import { SpotifyService } from "./services/spotify";
import { securityMiddleware } from "./middleware/security";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const spotifyService = new SpotifyService(
    process.env.SPOTIFY_CLIENT_ID as string,
    process.env.SPOTIFY_CLIENT_SECRET as string,
    process.env.SPOTIFY_REDIRECT_URI as string
)

app.use(securityMiddleware);

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());

app.use("/api/auth", createAuthRouter(spotifyService));

app.get("/", (req, res) => {
    res.json({
        "text": "hello world"
    })
})


app.listen(port, () => console.log(`live on port ${port}`))