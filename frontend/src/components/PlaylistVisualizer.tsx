import { useState } from "react";
import { usePlaylistContext } from "../contexts/PlaylistContext";
import { AnalysisService } from "../services/analysis";
import VisualizerNav from "./VisualizerNav";
import Loading from "./Loading";
import RankCheck from "./RankCheck";
import Gradient from "./Gradient";

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
        setAnalysis(JSON.parse(res.analysis));
        setLoading(false);
    }

    return (
        <div className="playlist-visualizer">
            <main className="visualizer-container">
                <h2>Playlist Visualizer</h2>
                <header className="visualizer-header">
                    <VisualizerNav 
                        setActiveTab={setActiveTab}
                    />
                </header>
                <section className="visualizer-content">
                    {loading && <Loading />}
                    {activeTab == "visualizer" && <Gradient colors={analysis?.colors || []} description={analysis?.description} />}
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