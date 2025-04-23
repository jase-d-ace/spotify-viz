import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from "./components/Home";
import Callback from "./components/Callback";
function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/callback" element={<Callback />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
