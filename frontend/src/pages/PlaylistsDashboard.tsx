import { usePlaylistContext } from "../contexts/PlaylistContext";
import Loading from "../components/Loading";
import CurrentPlaylist from "../components/CurrentPlaylist";
import PlaylistVisualizer from "../components/PlaylistVisualizer";
import PlaylistCard from "../components/PlaylistCard";
import type { Playlist } from "@backend/types"


export default function PlaylistsDashboard() {
    const { selectedPlaylist, setSelectedPlaylist, playlists, isLoading, isError } = usePlaylistContext();
    if (isLoading) return <Loading />
    if (isError) return <div>Error</div>

    return (
        <div className="playlists-dashboard">
            <main className="playlist-dashboard-main box">
                <section className="main-content">
                    <CurrentPlaylist selectedPlaylist={selectedPlaylist} />
                    <div className="chart-container">
                        <PlaylistVisualizer />
                    </div>
                </section>
                <section className="other-playlists">
                    <h4>Other playlists</h4>
                    <div className="card-container">
                        {playlists?.items.map((playlist: Playlist) => <PlaylistCard onClick={() => setSelectedPlaylist(playlist)} key={playlist.id} selected={playlist.id == selectedPlaylist.id} playlist={playlist} />)}
                    </div>
                </section>
            </main>
        </div>)
}