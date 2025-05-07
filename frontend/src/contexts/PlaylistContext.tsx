import { createContext, useContext, useState } from "react";
import { usePlaylists } from "../hooks/usePlaylists";
import { SpotifyPlaylist } from "../types";

interface PlaylistContextType {
    selectedPlaylist: SpotifyPlaylist | null;
    playlists: SpotifyPlaylist[];
    isLoading: boolean;
    isError: boolean;
}

const PlaylistContext = createContext<PlaylistContextType>({
    selectedPlaylist: null,
    playlists: [],
    isLoading: false,
    isError: false,
});

export const PlaylistProvider = ( { children }: { children: React.ReactNode } ) => {
    const { data, isLoading, isError } = usePlaylists();
    const [selectedPlaylist, setSelectedPlaylist] = useState<SpotifyPlaylist | null>(data[0]);
    const [playlists, setPlaylists] = useState<SpotifyPlaylist[]>(data);

    return (
        <PlaylistContext.Provider value={{ selectedPlaylist, playlists, isLoading, isError }}>
            { children }
        </PlaylistContext.Provider>
    )
}
export const usePlaylistContext = () => useContext(PlaylistContext);