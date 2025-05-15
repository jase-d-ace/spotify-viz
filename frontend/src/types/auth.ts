import type { UserProfile } from "@spotify/web-api-ts-sdk";

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expires_in: number;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: UserProfile | null;
    error?: string | null;
}