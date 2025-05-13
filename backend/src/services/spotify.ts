import SpotifyWebApi from "spotify-web-api-node";

export class SpotifyService {
    private spotifyApi: SpotifyWebApi;
    private expiry: number = 0;

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

    private async isTokenValid() {
        return Date.now() >= this.expiry - 60 * 1000
    }

    setAccessToken(token:string) {
        this.spotifyApi.setAccessToken(token);
    }

    setRefreshToken(token: string) {
        this.spotifyApi.setRefreshToken(token);
    }

    async refreshAccessToken(): Promise<string> {
        const data = await this.spotifyApi.refreshAccessToken();
        this.expiry = Date.now() + data.body.expires_in * 1000;
        this.spotifyApi.setAccessToken(data.body.access_token);
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

    async getMyProfile(accessToken: string): Promise<SpotifyApi.CurrentUsersProfileResponse> {
        if (!this.isTokenValid()) {
            const newToken = await this.spotifyApi.refreshAccessToken();
            this.expiry = Date.now() + 3600 * 1000;
            accessToken = newToken.body.access_token;
        }
        this.spotifyApi.setAccessToken(accessToken);
        const data = await this.spotifyApi.getMe();
        return data.body;
    }

    ////////////////////////////////
    // spotify playlist functions //
    ////////////////////////////////

    async getPlaylists(accessToken: string): Promise<SpotifyApi.ListOfUsersPlaylistsResponse> {
        if (!this.isTokenValid()) {
            const newToken = await this.spotifyApi.refreshAccessToken();
            this.expiry = Date.now() + 3600 * 1000;
            accessToken = newToken.body.access_token;
        }
        this.spotifyApi.setAccessToken(accessToken);
        const data = await this.spotifyApi.getUserPlaylists();
        return data.body;
    }

    async getTracks(accessToken: string, playlistId: string): Promise<SpotifyApi.PlaylistTrackResponse> {
        if (!this.isTokenValid()) {
            const newToken = await this.spotifyApi.refreshAccessToken();
            this.expiry = Date.now() + 3600 * 1000;
            accessToken = newToken.body.access_token;
        }
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