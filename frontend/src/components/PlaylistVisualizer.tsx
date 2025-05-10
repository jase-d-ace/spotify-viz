import { useState } from "react";
import { usePlaylistContext } from "../contexts/PlaylistContext";
import { AnalysisService } from "../services/analysis";
import VisualizerNav from "./VisualizerNav";
import Loading from "./Loading";

export default function PlaylistVisualizer() {

    const [analysis, setAnalysis] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>("visualizer");

    const { tracks } = usePlaylistContext();
    const analysisService = new AnalysisService();

    const tracksList = tracks?.items.map((track: any) => (`title: ${track.track.name} artist: ${track.track.artists[0].name}`));

    const handleClick = async () => {
        setLoading(true);
        const res = await analysisService.getTracksAnalysis(tracksList);
        setAnalysis(res);
        setLoading(false);
    }

    return (
        <div className="playlist-visualizer">
            <h2>Playlist Visualizer</h2>
            <VisualizerNav 
                setActiveTab={setActiveTab}
            />
            <div className="visualizer-container">
                <div className="visualizer-content">
                    <h3>Visualizer Content</h3>
                    <button 
                        onClick={() => handleClick()}
                        disabled={loading}
                        >Analyze Tracks
                    </button>
                    {loading && <Loading />}
                </div>
            </div>
        </div>
    )
}