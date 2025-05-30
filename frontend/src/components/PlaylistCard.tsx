import type { Playlist } from "@spotify/web-api-ts-sdk";

export default function PlaylistCard( { playlist, onClick }: { playlist: Playlist, onClick: () => void }) {
    return (
        <div className="playlist-card box">
            <div onClick={onClick} key={playlist.id}>
                    <p>{playlist.name}</p>
            </div>
        </div>
    )
}