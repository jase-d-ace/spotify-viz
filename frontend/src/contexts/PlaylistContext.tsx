import { createContext, useContext, useState } from "react";
import { SpotifyPlaylist } from "../types";
import { useQuery } from "@tanstack/react-query";
import { SpotifyService } from "../services/spotify";
interface PlaylistContextType {
    selectedPlaylist: SpotifyPlaylist | null;
    setSelectedPlaylist: (playlist: SpotifyPlaylist) => void;
    playlists: Record<any, any> | null;
    isLoading: boolean;
    isError: boolean;
}

const PlaylistContext = createContext<PlaylistContextType>({
    selectedPlaylist: null,
    setSelectedPlaylist:() => {},
    playlists: [],
    isLoading: false,
    isError: false,
});

export const PlaylistProvider = ( { children }: { children: React.ReactNode } ) => {
    const [selectedPlaylist, setSelectedPlaylist] = useState<SpotifyPlaylist | null>(null);

    const spotifyService = new SpotifyService();
    const { data: playlists, isLoading, isError } = useQuery({
        queryKey: ['playlists'],
        queryFn: async () => {
            const playlists = await spotifyService.getPlaylists()
            setSelectedPlaylist(playlists.items[0] || null)
            return playlists
        },
    })



    return (
        <PlaylistContext.Provider value={{ selectedPlaylist, setSelectedPlaylist, playlists, isLoading, isError }}>
            { children }
        </PlaylistContext.Provider>
    )
}
export const usePlaylistContext = () => useContext(PlaylistContext);