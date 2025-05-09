# Spotify Viz

At full power, this app will let you visualize your Spotify playlists in the same vibe as the Windows Media Player of olden times. This app will also give you a kitschy analysis of your playlists using OpenAI.

## Features

- **Playlist Visualization**: Visualize your Spotify playlists in a nostalgic Windows Media Player style.
- **AI Analysis**: Get a fun analysis of your playlists using OpenAI, complete with a danceability rating.
- **Playlist Management**: View and play your Spotify playlists directly from the app.

## Tech Stack

- **Frontend**: React, TypeScript
- **Backend**: Node.js, Express, TypeScript
- **AI**: OpenAI API
- **Music**: Spotify API

## Preqrequisites

### Spotify API
* Create a Spotify Developer account and create an app to get your client ID and client secret.
* Create a `backend/.env` file in the backend directory and add your client ID and client secret.
* Add your redirect URI to the Spotify Developer dashboard.
  * Note: Spotify doesn't like localhost, so you'll need to configure your app to redirect to `127.0.0.1:5173` instead.
    * You can change your frontend to be `127.0.0.1:5173` instead of `localhost:5173` in the `frontend/vite.config.ts` file.

### OpenAI API
* Create an OpenAI account and get your API key.
* Add your API key to the `backend/.env` file.

### Environment Variables
* `backend/.env`
  * `SPOTIFY_CLIENT_ID` From the Spotify Developer dashboard.
  * `SPOTIFY_CLIENT_SECRET` From the Spotify Developer dashboard.
  * `SPOTIFY_REDIRECT_URI` This has to match exactly what's in the Spotify Developer dashboard. So if you wrote `127.0.0.1:5173/callback` in the dashboard, you have to write `127.0.0.1:5173/callback` here.
  * `OPENAI_API_KEY` From the OpenAI dashboard.


## Running the App

Run two terminals, one for the frontend and one for the backend.

### Frontend
* `cd frontend`
* `npm install`
* `npm run dev`

### Backend
* `cd backend`
* `npm install`
* `npm run dev`