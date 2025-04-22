import SpotifyWebApi from "spotify-web-api-node";
import { SpotifyPlaylist, PlaylistAnalysis } from "../types/spotify";

const spotifyAPI = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    redirectUri: `${process.env.BASE_URL}/api/auth/spotify/callback`
})

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

    async getAuthUrl(scopes: string[]): Promise<string> {
        const state = this.generateRandomString(16);
        return this.spotifyApi.createAuthorizeURL(scopes, state);
    }

    async getTokens(code: string): Promise<{ accessToken: string, refreshToken: string }> {
        const data = await this.spotifyApi.authorizationCodeGrant(code);
        return {
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token
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