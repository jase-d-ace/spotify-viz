import { SpotifyPlaylist } from "../types/spotify";

export default function PlaylistCard( { playlist, stripHTML }: { playlist: SpotifyPlaylist, stripHTML: (html: string) => string }) {
    return (
        <div className="playlist-card">
            <div key={playlist.id}>
                    <p>{playlist.name}</p>
                    &nbsp;{playlist.description ? stripHTML(playlist.description) : <p>No Description Provided</p>}
            </div>
        </div>
    )
}