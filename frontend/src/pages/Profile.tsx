import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
    const { state, handleCallback } = useAuth();
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("accessToken");
        const refreshToken = urlParams.get("refreshToken")?.toString();
        const expires_in = urlParams.get("expires_in")?.toString();
        if (token) {
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
    return <div>Profile for {state.user?.display_name}</div>;
}