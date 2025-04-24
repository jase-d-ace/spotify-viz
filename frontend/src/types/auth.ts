import { SpotifyUser } from "./spotify";

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expires_in: number;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: SpotifyUser | null;
    error?: string | null;
}