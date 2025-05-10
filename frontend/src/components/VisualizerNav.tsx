export default function VisualizerNav({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
    return (
        <div className="visualizer-nav">
            <nav>
                <ul>
                    <li onClick={() => setActiveTab("visualizer")}>Visualizer</li>
                    <li onClick={() => setActiveTab("analysis")}>Analysis</li>
                </ul>
            </nav>
        </div>
    )
}