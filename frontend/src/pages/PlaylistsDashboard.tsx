import { usePlaylists } from "../hooks/usePlaylists";
import { SpotifyPlaylist } from "../types/spotify";
import Loading from "../components/Loading";
// todo: add a loading state while fetching playlists
export default function PlaylistsDashboard() {
    const { data: playlists, isLoading } = usePlaylists();
    const stripHTML = (html: string) => {
        const div = document.createElement('p');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }

    if (isLoading || !playlists) {
        return <Loading />
    }
    return (<div>
        <h1>Playlists</h1>
        <div className="playlist-container">
            {playlists?.items.map((playlist: SpotifyPlaylist) => <div key={playlist.id}>
                <p>{playlist.name}</p>
                &nbsp;{playlist.description ? stripHTML(playlist.description) : <p>No Description Provided</p>} 
                </div>)}
        </div>
    </div>)
}