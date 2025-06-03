import { createContext, useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SpotifyService } from "../services/spotify";
import type { Tracks, Playlist, Playlists} from "@backend/types"

interface PlaylistContextType {
  selectedPlaylist: Playlist | null;
  setSelectedPlaylist: (playlist: Playlist | null) => void;
  playlists?: Playlists | null;
  isLoading: boolean;
  isError: boolean;
  tracks?: Tracks | null;
  isTracksLoading: boolean;
  isTracksError: boolean;
}

const PlaylistContext = createContext<PlaylistContextType>({
  selectedPlaylist: null,
  setSelectedPlaylist: () => {},
  playlists: null,
  isLoading: false,
  isError: false,
  tracks: null,
  isTracksLoading: false,
  isTracksError: false,
});

export const PlaylistProvider = ( { children }: { children: React.ReactNode } ) => {
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
    const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

    const spotifyService = new SpotifyService();
    const { data: playlists, isLoading, isError } = useQuery({
        queryKey: ['playlists'],
        queryFn: async (): Promise<Playlists | null> => {
            const { playlists } = await spotifyService.getPlaylists()
            setSelectedPlaylist(playlists?.items[0] || null)
            setIsInitialLoad(false);
            return playlists || null
        },
        enabled: isInitialLoad // coerce the presnce of selectedPlaylist into a boolean
    })

    const { data: tracks, isLoading: isTracksLoading, isError: isTracksError } = useQuery({
        queryKey: ['tracks', selectedPlaylist?.id],
        queryFn: async (): Promise<Tracks | null> => {
            if (!selectedPlaylist) return null
            const { tracks } = await spotifyService.getTracks(selectedPlaylist.id);
            return tracks || null;
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