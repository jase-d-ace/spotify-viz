import { Request, Response } from "express";
import { SpotifyService } from "../services/spotify";

export class AuthController {
    constructor(private spotifyService: SpotifyService) {}

    async getAuthUrl(req: Request, res: Response) {
        const url = await this.spotifyService.getAuthUrl(["user-read-private", "user-read-email", "playlist-read-private"]);
        res.json({ url });
    }

    async handleCallback(req: Request, res: Response) {
        const { code } = req.query;
        const { accessToken, refreshToken } = await this.spotifyService.getTokens(code as string);
        this.spotifyService.setAccessToken(accessToken);
        this.spotifyService.setRefreshToken(refreshToken);
        res.json({ accessToken, refreshToken });
    }

    async refreshAccessToken(req: Request, res: Response) {
        const accessToken = await this.spotifyService.refreshAccessToken();
        res.json({ accessToken });
    }
}
