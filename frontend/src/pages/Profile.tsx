import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
    const { state, handleCallback } = useAuth();
    useEffect(() => {
        handleCallback();
    }, [])
    return <div>Profile for {state.user?.display_name} <Link to="/playlists">Playlists</Link></div>;
}