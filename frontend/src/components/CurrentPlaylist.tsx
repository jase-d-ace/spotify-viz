import { usePlaylistContext } from "../contexts/PlaylistContext";

export default function CurrentPlaylist( {selectedPlaylist}: {selectedPlaylist: Record<any, any> | null} ) {
    const { tracks, isTracksLoading, isTracksError } = usePlaylistContext();
    if (isTracksLoading) {
        return <div>Loading...</div>;
    }
    if (isTracksError) {
        return <div>Error loading tracks</div>;
    }

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