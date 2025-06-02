import { Request, Response } from "express";
import { SpotifyService } from "../services/spotify";
import type { Playlists, Tracks } from "@types"

export class PlaylistsController {
    constructor(private spotifyService: SpotifyService) {}

    async getPlaylists(req: Request, res: Response) {
        const accessToken = req.cookies.accesstoken;
        if (!accessToken || typeof accessToken !== "string")  {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const playlists: Playlists = await this.spotifyService.getPlaylists(accessToken);
        res.json({ playlists });
    }

    async getTracks(req: Request, res: Response) {
        const accessToken = req.cookies?.accesstoken;
        if (!accessToken || typeof accessToken !== "string")  {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const tracks: Tracks = await this.spotifyService.getTracks(accessToken, req.params.playlistId);
        res.json({ tracks });
    }
}