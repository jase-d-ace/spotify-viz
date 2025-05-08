import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
    const { state } = useAuth();
    return <div>Profile for {state.user?.display_name} <Link to="/playlists">Playlists</Link></div>;
}