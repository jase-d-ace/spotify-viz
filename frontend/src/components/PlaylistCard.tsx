import type { Playlist } from "@backend/types"
import { useState } from "react";

/** things to add
 * which is currently selected DONE
 * whose playlist is it DONE
 * on hover: underline, card popup
 * is it public? DONE
    * lock icon?
 * total tracks DONE
 * go-to for the playlist itself DONE
 */


export default function PlaylistCard( { playlist, onClick, selected }: { playlist: Playlist, onClick: () => void, selected: boolean }) {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className={`playlist-card box ${selected ? "selected" : ""}`}>
            <div className="card" key={playlist.id}>
                <header>
                    <small>{!playlist.public ? "private" : "public"}</small>
                    <h3
                        onClick={onClick}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)} 
                        className={`title ${isHovered ? "hovered" : ""}`}
                    >{playlist.name} </h3>
                    <h4>By {playlist.owner.display_name} {playlist.external_urls?.spotify && <a href={playlist.external_urls.spotify}>Go to</a>}</h4>
                </header>
                <section>
                    <p>Total Tracks: {playlist.tracks.total}</p>
                </section>
            </div>
        </div>
    )
}