import { SpotifyPlaylist } from "../types/spotify";

export default function CurrentPlaylist( {selectedPlaylist}: {selectedPlaylist: SpotifyPlaylist | null} ) {
    return (
        <div className="current-playlist">
            <h2>Current Playlist</h2>
            {selectedPlaylist && <p>{selectedPlaylist.name}</p>}
        </div>
    )
}