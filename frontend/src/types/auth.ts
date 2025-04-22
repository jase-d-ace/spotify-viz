import { SpotifyUser } from "./spotify";

export interface AuthConfig {
    clientId: string;
    clientSecret: string;
    redirectUri: string;
    scopes: string[];
}

export interface SessionUser {
    access_token: string;
    refresh_token: string;
    expires_at: number;
    user: SpotifyUser;
}