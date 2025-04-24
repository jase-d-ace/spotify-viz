import { usePlaylists } from "../hooks/usePlaylists";
import { SpotifyPlaylist } from "../types/spotify";

export default function PlaylistsDashboard() {
    const { data: playlists } = usePlaylists();
    const stripHTML = (html: string) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }
    return <div>
        <h1>Playlists</h1>
        {playlists.items.map((playlist: SpotifyPlaylist) => <div key={playlist.id}>
            {playlist.name}
            &nbsp;{stripHTML(playlist.description)}
            </div>)}
    </div>
}