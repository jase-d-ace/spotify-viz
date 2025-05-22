import { useState } from "react";
import { usePlaylistContext } from "../contexts/PlaylistContext";
import { AnalysisService } from "../services/analysis";
import type { Analysis } from "@types";
import VisualizerNav from "./VisualizerNav";
import Loading from "./Loading";
import RankCheck from "./RankCheck";
import ThreeDimViz from "./ThreeDimViz";

export default function PlaylistVisualizer() {

    const [analysis, setAnalysis] = useState<Analysis | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>("visualizer");

    const { tracks } = usePlaylistContext();
    const analysisService = new AnalysisService();

    const tracksList = tracks?.items.map((track) => (`title: ${track.track.name} artist: ${track.track.artists[0].name}`));

    const handleClick = async () => {
        if (!tracksList) return;
        setLoading(true);
        const res = await analysisService.getTracksAnalysis(tracksList);
        setAnalysis(res.analysis);
        setLoading(false);
    }


    return (
        <div className="playlist-visualizer box">
            <main className="visualizer-container">
                <h2>Playlist Visualizer</h2>
                <header className="visualizer-header">
                    <VisualizerNav 
                        setActiveTab={setActiveTab}
                    />
                </header>
                <section className="visualizer-content">
                    {loading && <Loading />}
                    {analysis && activeTab == "visualizer" && <ThreeDimViz colors={analysis.colors} />}
                    {analysis && activeTab == "analysis" && <RankCheck rankings={analysis.ranking} />}
                    <button 
                        onClick={() => handleClick()}
                        disabled={loading}
                        >Analyze Tracks
                    </button>
                </section>
            </main>
        </div>
    )
}