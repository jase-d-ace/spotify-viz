import { useState } from "react";
import { usePlaylistContext } from "../contexts/PlaylistContext";
import { AnalysisService } from "../services/analysis";
import type { Analysis } from "@backend/types";
import VisualizerNav from "./VisualizerNav";
import Loading from "./Loading";
import ThreeDimViz from "./ThreeDimViz";

export default function PlaylistVisualizer() {

    const [analysis, setAnalysis] = useState<Analysis | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string>("visualizer");

    const { selectedPlaylist, tracks, isTracksError } = usePlaylistContext();
    const analysisService = new AnalysisService();

    const tracksList = tracks?.items.map((track) => (track.track ? `title: ${track.track.name} artist: ${track.track.artists[0].name}` : ""));

    const handleClick = async (): Promise<void> => {
        if (!tracksList) return;
        setLoading(true);
        setAnalysis(null);
        const res = await analysisService.getTracksAnalysis({tracksList, id: selectedPlaylist?.id});
        setAnalysis(res.analysis);
        setLoading(false);
    }


    return (
        <div className="playlist-visualizer box">
            <main className="visualizer-container">
                <header className="visualizer-header">
                    <VisualizerNav 
                        setActiveTab={setActiveTab}
                    />
                </header>
                <section className="visualizer-content">
                    {loading && <Loading />}
                    {/** TODO: Create error component */}
                    {isTracksError && <p>Error loading tracks</p>}
                    {analysis && activeTab == "visualizer" && <ThreeDimViz colors={analysis.colors} />}
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