import { SpotifyPlaylist } from "../types/spotify";

export default function PlaylistCard( { playlist, stripHTML, onClick }: { playlist: SpotifyPlaylist, stripHTML: (html: string) => string, onClick: () => void }) {
    return (
        <div className="playlist-card">
            <div onClick={onClick} key={playlist.id}>
                    <p>{playlist.name}</p>
                    &nbsp;{playlist.description ? stripHTML(playlist.description) : <p>No Description Provided</p>}
            </div>
        </div>
    )
}