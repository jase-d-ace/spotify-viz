import SpotifyWebApi from "spotify-web-api-node";
import { SpotifyPlaylist, PlaylistAnalysis, SpotifyUser } from "../types/spotify";


export class SpotifyService {
    private spotifyApi: SpotifyWebApi;

    constructor(clientId: string, clientSecret: string, redirectUri: string) {
        this.spotifyApi = new SpotifyWebApi({
            clientId,
            clientSecret,
            redirectUri
        })
    }
    //////////////////////////////
    /// spotify auth functions ///
    //////////////////////////////
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
        try {
            const data = await this.spotifyApi.authorizationCodeGrant(code);
            return {
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expires_in: data.body.expires_in
            }
        } catch (e) {
            console.error("Error getting tokens:", e);
            return {
                accessToken: "",
                refreshToken: "",
                expires_in: 0
            }
        }
    }

    async getMyProfile(accessToken: string): Promise<any> {
        this.spotifyApi.setAccessToken(accessToken);
        const data = await this.spotifyApi.getMe();
        return data.body;
    }

    ////////////////////////////////
    // spotify playlist functions //
    ////////////////////////////////

    async getPlaylists(accessToken: string): Promise<any> {
        this.spotifyApi.setAccessToken(accessToken);
        const data = await this.spotifyApi.getUserPlaylists();
        return data.body;
    }

    async getTracks(accessToken: string, playlistId: string): Promise<any> {
        this.spotifyApi.setAccessToken(accessToken);
        const data = await this.spotifyApi.getPlaylistTracks(playlistId);
        return data.body;
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