import { Request, Response } from "express";
import { SpotifyService } from "../services/spotify";

export class PlaylistsController {
    constructor(private spotifyService: SpotifyService) {}

    async getPlaylists(req: Request, res: Response) {
        const accessToken = req.cookies.accesstoken;
        if (!accessToken) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const playlists = await this.spotifyService.getPlaylists(accessToken);
        res.json(playlists);
    }
}