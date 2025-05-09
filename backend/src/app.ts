import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { createAuthRouter } from "./routes/auth";
import { SpotifyService } from "./services/spotify";
import { OpenAIService } from "./services/openai";
import { securityMiddleware } from "./middleware/security";
import { createPlaylistsRouter } from "./routes/playlists";
import { createAnalysisRouter } from "./routes/analysis";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(securityMiddleware);

app.use(cors({
    origin: "http://127.0.0.1:5173",
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    exposedHeaders: ['set-cookie']
}));

app.use(express.json());

const spotifyService = new SpotifyService(
    process.env.SPOTIFY_CLIENT_ID as string,
    process.env.SPOTIFY_CLIENT_SECRET as string,
    process.env.SPOTIFY_REDIRECT_URI as string
)
const openAIService = new OpenAIService(process.env.OPENAI_APIKEY as string)

app.use("/api/auth", createAuthRouter(spotifyService));
app.use("/api/playlists", createPlaylistsRouter(spotifyService));
app.use("/api/analysis", createAnalysisRouter(openAIService))

app.get("/", (req, res) => {
    res.json({
        "text": "hello world"
    })
})


app.listen(port, () => console.log(`live on port ${port}`))