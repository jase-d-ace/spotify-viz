import { SpotifyPlaylist } from "../types/spotify";

export default function PlaylistCard( { playlist }: { playlist: SpotifyPlaylist }, html: (html: string) => string) {
    return (
        <div className="playlist-card">
            <div key={playlist.id}>
                    <p>{playlist.name}</p>
                    &nbsp;{playlist.description ? html(playlist.description) : <p>No Description Provided</p>}
            </div>
        </div>
    )
}