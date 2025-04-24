import { Request, Response } from "express";
import { SpotifyService } from "../services/spotify";

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
        const { accessToken, refreshToken, expires_in } = await this.spotifyService.getTokens(code as string);
        res.cookie("accesstoken", accessToken as string, {
            httpOnly: true,
            secure: false,
            maxAge: expires_in * 1000,
            sameSite: "lax",
        });
        res.cookie("refreshtoken", refreshToken as string, {
            httpOnly: true,
            secure: false,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: "lax",
        });
        res.redirect(`${process.env.FRONTEND_URL}/profile`);
    }

    async refreshAccessToken(_req: Request, res: Response) {
        const accessToken = await this.spotifyService.refreshAccessToken();
        res.cookie("accesstoken", accessToken as string, {
            httpOnly: true,
            secure: false,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: "lax",
        });
        res.json({ accessToken });
    }

    async logIntoSpotify(req: Request, res: Response) {
        const accessToken = req.cookies.accesstoken;
        console.log("logging in")
        if (!accessToken) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const user = await this.spotifyService.getMyProfile(accessToken);
        console.log("user", user)
        res.json({ user });
    }
}
