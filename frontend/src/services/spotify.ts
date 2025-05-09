export class SpotifyService {
    async getPlaylists(): Promise<any> {
        const res = await fetch(`http://127.0.0.1:3000/api/playlists`, {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
            },
        });
        return await res.json();
    }

    async getTracks(playlistId: string): Promise<any> {
        const res = await fetch(`http://127.0.0.1:3000/api/playlists/${playlistId}/tracks`, {
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json",
            },
        });
        return await res.json();
    };
};