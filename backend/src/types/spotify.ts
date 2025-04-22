export interface SpotifyAuthResponse {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
}

export interface SpotifyUser {
    id: string;
    display_name: string;
    email: string;
    images: SpotifyImage[];
}

export interface SpotifyImage {
    url: string;
    height: number | null;
    width: number | null;
}

export interface SpotifyPlaylist {
    id: string;
    name: string;
    description: string;
    images: SpotifyImage[];
    tracks: {
        total: number;
        tracks: PlaylistTrack[];
    }
    owner: SpotifyUser;
    analysis: PlaylistAnalysis;
}

// The difference between playlist and spotify track is that a playlist can't directly add spotify tracks, so the playlist track is a copy of the spotify track
export interface PlaylistTrack {
    added_at: string;
    track: SpotifyTrack;
}

export interface SpotifyTrack {
    id: string;
    name: string;
    artists: SpotifyArtist[];
    album: SpotifyAlbum;
    duration: number;
    preview_url: string;
    analysis_result: AudioAnalysis;
}

export interface SpotifyArtist {
    id: string;
    name: string;
    genres: string[];
    images: SpotifyImage[];
}

export interface SpotifyAlbum {
    id: string;
    name: string;
    genres: string[];
    images: SpotifyImage[];
    artists: SpotifyArtist[];
}

export interface AudioAnalysis {
    id: string;
    tempo: number;
    energy: number;
    danceability: number;
}

export interface PlaylistAnalysis {
    average_tempo: number;
    genre_distribution: Map<string, number>;
    artist_diversity: number;
}