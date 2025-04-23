import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Callback() {
    const { state, handleCallback } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('accessToken');
        if (accessToken) {
            setAccessToken(accessToken);
        }
    }, [])
    return <div>Callback</div>;
}