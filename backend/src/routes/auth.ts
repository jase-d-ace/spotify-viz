import { Router } from "express";
import { AuthController } from "../controllers/auth";
import { SpotifyService } from "../services/spotify";


export function createAuthRouter(spotifyService: SpotifyService) {
    const router = Router();
    const authController = new AuthController(spotifyService);

    router.get("/spotify", authController.getAuthUrl);
    router.get("/spotify/callback", authController.handleCallback);
    router.get("/spotify/refresh", authController.refreshAccessToken);

    return router;
}
