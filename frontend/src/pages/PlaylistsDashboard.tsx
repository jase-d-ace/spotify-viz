
import { SpotifyPlaylist } from "../types/spotify";
import { usePlaylistContext } from "../contexts/PlaylistContext";
import Loading from "../components/Loading";
import CurrentPlaylist from "../components/CurrentPlaylist";
import PlaylistVisualizer from "../components/PlaylistVisualizer";
import PlaylistCard from "../components/PlaylistCard";


export default function PlaylistsDashboard() {
    const { selectedPlaylist, setSelectedPlaylist, playlists, isLoading, isError } = usePlaylistContext();
    if (isLoading) return <Loading />
    if (isError) return <div>Error</div>
    const stripHTML = (html: string) => {
        const div = document.createElement('p');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }

    return (
        <div className="playlists-dashboard">
            <div className="header">
                <h1>Playlists</h1>
            </div>
            <main>
                <section className="main-content">
                    <CurrentPlaylist selectedPlaylist={selectedPlaylist} />
                    <div className="chart-container">
                        <PlaylistVisualizer />
                    </div>
                </section>
                <section className="other-playlists">
                {playlists?.items.map((playlist: SpotifyPlaylist) => <PlaylistCard onClick={() => setSelectedPlaylist(playlist)} key={playlist.id} playlist={playlist} stripHTML={stripHTML} />)}
                </section>
            </main>
        </div>)
}