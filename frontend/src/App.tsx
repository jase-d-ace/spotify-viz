import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PlaylistProvider } from "./contexts/PlaylistContext";
import Home from "./components/Home";
import Profile from "./pages/Profile";
import PlaylistsDashboard from "./pages/PlaylistsDashboard";
const queryClient = new QueryClient();

function App() {

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <PlaylistProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/playlists" element={<PlaylistsDashboard />} />
                        </Routes>
                    </BrowserRouter>
                </PlaylistProvider>
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default App
