import { AuthTokens, AuthState } from "../types/auth";
const BASE_URL = import.meta.env.VITE_API_URL;

export class AuthService {
    async initiateLogin(): Promise<void> {
        try {
            const response = await fetch(`http://localhost:3000/api/auth/spotify`, {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            window.location.href = json.url;
            return json;
        } catch (e) {
            console.error("Error initiating login:", e);
            throw e;
        }
    }

    async handleCallback(code: string) {

        const res = await fetch(`http://localhost:3000/api/auth/spotify/me`, {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${code}`,
            },
            body: JSON.stringify({
                code
            })
        });
        const json = await res.json();
        return json;
    }

    async refreshAccessToken(): Promise<AuthTokens> {
        try {
            const response = await fetch(`${BASE_URL}/api/auth/spotify/refresh`, {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json();
            return json.tokens;
        } catch (e) {
            console.error("Error refreshing access token:", e);
            throw e;
        }
    }
}