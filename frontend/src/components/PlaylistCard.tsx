import type { Playlist } from "@spotify/web-api-ts-sdk";

export default function PlaylistCard( { playlist, stripHTML, onClick }: { playlist: Playlist, stripHTML: (html: string) => string, onClick: () => void }) {
    return (
        <div className="playlist-card box">
            <div onClick={onClick} key={playlist.id}>
                    <p>{playlist.name}</p>
                    &nbsp;{playlist.description ? stripHTML(playlist.description) : <p>No Description Provided</p>}
            </div>
        </div>
    )
}