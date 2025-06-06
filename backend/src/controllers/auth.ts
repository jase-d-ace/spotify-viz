import { Request, Response } from "express";
import { SpotifyService } from "../services/spotify";
import type { UserProfile } from "@types";

export class AuthController {
    constructor(private spotifyService: SpotifyService) {
    }

    async getAuthUrl(_req: Request, res: Response) {
        const url = await this.spotifyService.getAuthUrl(["user-read-private", "user-read-email", "playlist-read-private"]);
        res.json({ url });
    }

    async handleCallback(req: Request, res: Response) {
        const { code } = req.query;
        if (!code || typeof code !== "string") {
            res.status(400).json({ error: "Invalid code" });
            return;
        }
        const { accessToken, refreshToken, expires_in } = await this.spotifyService.getTokens(code);
        res.cookie("accesstoken", accessToken, {
            httpOnly: true,
            secure: false,
            maxAge: expires_in * 1000,
            sameSite: "lax",
        });
        res.cookie("refreshtoken", refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: "lax",
        });
        res.redirect(`${process.env.FRONTEND_URL}/playlists`);
    }

    async refreshAccessToken(_req: Request, res: Response) {
        const accessToken = await this.spotifyService.refreshAccessToken();
        res.cookie("accesstoken", accessToken, {
            httpOnly: true,
            secure: false,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: "lax",
        });
        res.json({ accessToken });
    }

    async logIntoSpotify(req: Request, res: Response) {
        const accessToken = req.cookies?.accessToken;
        if (!accessToken || typeof accessToken !== "string")  {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const user: UserProfile = await this.spotifyService.getMyProfile(accessToken);
        res.json({ user });
    }
}
