import SpotifyWebApi from "spotify-web-api-node";
import { SpotifyPlaylist, PlaylistAnalysis } from "../types/spotify";


export class SpotifyService {
    private spotifyApi: SpotifyWebApi;

    constructor(clientId: string, clientSecret: string, redirectUri: string) {
        this.spotifyApi = new SpotifyWebApi({
            clientId,
            clientSecret,
            redirectUri
        })
    }
    
    setAccessToken(token:string) {
        this.spotifyApi.setAccessToken(token);
    }

    setRefreshToken(token: string) {
        this.spotifyApi.setRefreshToken(token);
    }

    async refreshAccessToken(): Promise<string> {
        const data = await this.spotifyApi.refreshAccessToken();
        return data.body.access_token;
    }

    async getAuthUrl(scopes: string[]): Promise<string> {
        const state = this.generateRandomString(16);
        return this.spotifyApi.createAuthorizeURL(scopes, state);
    }

    async getTokens(code: string): Promise<{ accessToken: string, refreshToken: string, expires_in: number }> {
        const data = await this.spotifyApi.authorizationCodeGrant(code);
        return {
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expires_in: data.body.expires_in
        }
    }


    private generateRandomString(length: number): string {
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let text = '';
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }
}