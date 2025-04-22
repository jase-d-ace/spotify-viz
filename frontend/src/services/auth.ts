import { AuthTokens, AuthState } from "../types/auth";
import { SpotifyUser } from "../types/spotify";
const BASE_URL = import.meta.env.VITE_API_URL;

export class AuthService {
    async initiateLogin(): Promise<void> {
        try {
            const response = await fetch(`http://localhost:3000/api/auth/spotify`);
            const json = await response.json();
            window.location.href = json.url;
            return json;
        } catch (e) {
            console.error("Error initiating login:", e);
            throw e;
        }
    }

    async handleCallback(code: string): Promise<AuthState> {
        try {
            const response = await fetch(`${BASE_URL}/api/auth/spotify/callback?code=${code}`);
            const json = await response.json();
            return {
                isAuthenticated: true,
                user: json.user as SpotifyUser,
                tokens: json.tokens,
            }
        } catch (e) {
            console.error("Error handling callback:", e);
            return {
                isAuthenticated: false,
                user: null,
                tokens: null,
                error: "Failed to authenticate",
            }
        }
    }

    async refreshAccessToken(): Promise<AuthTokens> {
        try {
            const response = await fetch(`${BASE_URL}/api/auth/spotify/refresh`);
            const json = await response.json();
            return json.tokens;
        } catch (e) {
            console.error("Error refreshing access token:", e);
            throw e;
        }
    }
}