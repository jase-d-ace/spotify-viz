import { AuthTokens,  } from "../types/auth";

export class AuthService {
    async initiateLogin(): Promise<void> {
        try {
            const response = await fetch(`http://127.0.0.1:3000/api/auth/spotify`, {
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
                },
            });
            const json = await response.json();
            window.location.href = json.url;
        } catch (e) {
            console.error("Error initiating login:", e);
            throw e;
        }
    }
    
    async logIntoSpotify() {
        const res = await fetch(`http://127.0.0.1:3000/api/auth/spotify/me`, {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
            },
        });
        const json = await res.json();
        return json;
    }

    async refreshAccessToken(): Promise<AuthTokens> {
        try {
            const response = await fetch(`http://127.0.0.1:3000/api/auth/spotify/refresh`, {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json",
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