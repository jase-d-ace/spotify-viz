import VisualizerNav from "./VisualizerNav";
import { usePlaylistContext } from "../contexts/PlaylistContext";
import { AnalysisService } from "../services/analysis";

export default function PlaylistVisualizer() {
    const { tracks } = usePlaylistContext();
    const analysisService = new AnalysisService();
    const tracksList = tracks?.items.map((track: any) => (`title: ${track.track.name} artist: ${track.track.artists[0].name}`))
    return (
        <div className="playlist-visualizer">
            <h2>Playlist Visualizer</h2>
            <VisualizerNav />
            <div className="visualizer-container">
                <div className="visualizer-content">
                    <h3>Visualizer Content</h3>
                    <button onClick={() => analysisService.getTracksAnalysis(tracksList)}>
                       Analyze Tracks
                    </button>
                </div>
            </div>
        </div>
    )
}