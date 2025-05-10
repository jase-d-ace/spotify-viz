import { createContext, useContext, useState } from "react";
import { SpotifyPlaylist } from "../types";
import { useQuery } from "@tanstack/react-query";
import { SpotifyService } from "../services/spotify";
interface PlaylistContextType {
    selectedPlaylist: Record<any, any> | null;
    setSelectedPlaylist: (playlist: SpotifyPlaylist) => void;
    playlists: Record<any, any> | null;
    isLoading: boolean;
    isError: boolean;
    tracks: Record<any,any> | null;
    isTracksLoading: boolean;
    isTracksError: boolean;
}

const PlaylistContext = createContext<PlaylistContextType>({
    selectedPlaylist: null,
    setSelectedPlaylist:() => {},
    playlists: [],
    isLoading: false,
    isError: false,
    tracks: {},
    isTracksLoading: false,
    isTracksError: false,
});

export const PlaylistProvider = ( { children }: { children: React.ReactNode } ) => {
    const [selectedPlaylist, setSelectedPlaylist] = useState<Record<any, any> | null>(null);
    const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

    const spotifyService = new SpotifyService();
    const { data: playlists, isLoading, isError } = useQuery({
        queryKey: ['playlists'],
        queryFn: async () => {
            const playlists = await spotifyService.getPlaylists()
            setSelectedPlaylist(playlists.items[0] || null)
            setIsInitialLoad(false);
            return playlists
        },
        enabled: isInitialLoad // coerce the presnce of selectedPlaylist into a boolean
    })

    const { data: tracks, isLoading: isTracksLoading, isError: isTracksError } = useQuery({
        queryKey: ['tracks', selectedPlaylist?.id],
        queryFn: async () => {
            if (!selectedPlaylist) return null
            return await spotifyService.getTracks(selectedPlaylist.id);
        },
        enabled: Boolean(selectedPlaylist)
    })

    return (
        <PlaylistContext.Provider value={{ selectedPlaylist, setSelectedPlaylist, playlists, isLoading, isError, tracks, isTracksLoading, isTracksError }}>
            { children }
        </PlaylistContext.Provider>
    )
}
export const usePlaylistContext = () => useContext(PlaylistContext);