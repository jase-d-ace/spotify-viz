export interface APIResponse<T> { // this is a wrapper type in the same way that PlaylistTrack wraps SpotifyTrack
    data?: T;
    success: boolean;
    error?: APIError;
    status: number;
}

export interface APIError {
    message: string;
    status: number;
    details?: any;
}

