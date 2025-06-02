// In reference to ./services/spotify.ts

export type Playlist = SpotifyApi.PlaylistObjectSimplified;

export type Playlists = SpotifyApi.ListOfUsersPlaylistsResponse;

export interface PlaylistsResponse {
  playlists: Playlists;
  status: number;
  error?: string;
}

export type Tracks = SpotifyApi.PlaylistTrackResponse;

export interface TracksResponse {
  tracks: Tracks;
  status: number;
  error?: string;
}

export type UserProfile = SpotifyApi.CurrentUsersProfileResponse;

export interface UserProfileResponse {
  user: UserProfile;
  status: number;
  error?: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
    expires_in: number;
}
