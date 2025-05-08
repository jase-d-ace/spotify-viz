import { usePlaylistContext } from "../contexts/PlaylistContext";
import Loading from "./Loading";

export default function CurrentPlaylist( {selectedPlaylist}: {selectedPlaylist: Record<any, any> | null} ) {
    const { tracks, isTracksLoading, isTracksError } = usePlaylistContext();

    if (isTracksLoading) return ( 
        <div className="current-playlist">
            <h2>Loading...</h2>
            <Loading />
        </div>
    );

    if (isTracksError) return(
        <div className="current-playlist">
            <h2>Error</h2>
        </div>
    );

    return (
        <div className="current-playlist">
            <h2>Current Playlist</h2>
            {selectedPlaylist && <p>{selectedPlaylist.name}</p>}
            {
                tracks?.items.map((track: any) => (
                    <div key={track.track.id}>
                        <p>{track.track.name}</p>
                    </div>
                ))
            }
        </div>
    )
}