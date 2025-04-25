import { usePlaylists } from "../hooks/usePlaylists";
import { SpotifyPlaylist } from "../types/spotify";
import Loading from "../components/Loading";
import CurrentPlaylist from "../components/CurrentPlaylist";
import PlaylistVisualizer from "../components/PlaylistVisualizer";
import PlaylistCard from "../components/PlaylistCard";


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
    return (
        <div className="playlists-dashboard">
            <div className="header">
                <h1>Playlists</h1>
            </div>
            <main>
                <section className="main-content">
                    <CurrentPlaylist />
                    <div className="chart-container">
                        <PlaylistVisualizer />
                    </div>
                </section>
                <section className="other-playlists">
                {playlists?.items.map((playlist: SpotifyPlaylist) => <PlaylistCard key={playlist.id} playlist={playlist} html={stripHTML} />)}
                </section>
            </main>
        </div>)
}