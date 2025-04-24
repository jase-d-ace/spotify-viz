import { Router } from "express";
import { PlaylistsController } from "../controllers/playlists";
import { SpotifyService } from "../services/spotify";

export function createPlaylistsRouter(spotifyService: SpotifyService) {
    const router = Router();
    const playlistsController = new PlaylistsController(spotifyService);

    router.get("/", playlistsController.getPlaylists.bind(playlistsController));

    return router;
}