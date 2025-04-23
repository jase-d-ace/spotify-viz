import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Callback() {
    const { state, handleCallback } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("accessToken");
        const refreshToken = urlParams.get("refreshToken")?.toString();
        const expires_in = urlParams.get("expires_in")?.toString();
        if (token) {
            setAccessToken(token);
            window.history.replaceState({}, "", window.location.pathname);
            const tokens = {
                accessToken: token,
                refreshToken: refreshToken,
                expires_in: expires_in,
            }
            handleCallback(tokens);
            urlParams.delete("accessToken");
            urlParams.delete("refreshToken");
            urlParams.delete("expires_in");
        }
    }, [])
    return <div>Callback, {accessToken} <Link to="/profile">Profile</Link></div>;
}