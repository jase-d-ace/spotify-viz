import VisualizerNav from "./VisualizerNav";

export default function PlaylistVisualizer() {
    return (
        <div className="playlist-visualizer">
            <h2>Playlist Visualizer</h2>
            <VisualizerNav />
            <div className="visualizer-container">
                <div className="visualizer-content"></div>
            </div>
        </div>
    )
}