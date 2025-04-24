import { useQuery } from "@tanstack/react-query";
import { SpotifyService } from "../services/spotify";

export const usePlaylists = () => {
    const spotifyService = new SpotifyService();
    return useQuery({
        queryKey: ['playlists'],
        queryFn: () => spotifyService.getPlaylists(),
    })
}