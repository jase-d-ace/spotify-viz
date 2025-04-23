import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from "./components/Home";
import Profile from "./pages/Profile";
function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/callback" element={<Profile />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
