import { Router } from "express";
import { AuthController } from "../controllers/auth";
import { SpotifyService } from "../services/spotify";


export function createAuthRouter(spotifyService: SpotifyService) {
    const router = Router();
    const authController = new AuthController(spotifyService);

    router.get("/spotify", authController.getAuthUrl.bind(authController));
    router.get("/spotify/callback", authController.handleCallback.bind(authController));
    router.get("/spotify/refresh", authController.refreshAccessToken.bind(authController));
    router.get("/spotify/me", authController.logIntoSpotify.bind(authController));

    return router;
}
