# **aurafy 🔮**

A Spotify Web Player and music visualizer that generates a colour palette based on the audio features of a track in a playlist.

## **Technologies**

- React
- Tailwind
- Express
- Redis

## **Getting Started**

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### **Prerequisites**

- Node.js is required to run Aurafy.

- To run this application, a premium Spotify account is required.

- In the Developer's dashboard for Spotify, you will need to click "Create app" with `http://localhost:<YOUR_SERVER_PORT>/callback` as the redirect URI.

### **Installation**

1. Create an `.env` file under `/server` with the following:

```
SERVER_PORT=<server port>
CLIENT_PORT=<client port>
CLIENT_ID=<client id from Spotify>
CLIENT_SECRET=<client secret from Spotify>
REDIS_HOST=<redis host>
REDIS_PORT=<redis port>
REDIS_PASSWORD=<redis password>
```

The client ID and client secret are taken from your Spotify API application.

2. Under `/server`, run `npm install` to install all of the dependencies for the back-end.

3. Aurafy uses the authorization code flow for Spotify to handle authentication. To start the server, run `node index.js`.

4. Under `/client`, run `npm install` to install all of the dependencies for the front-end.

5. To start the front-end, run `npm start` under `/client`.

6. Try out the application by entering `http://localhost:3000/` in your browser.

## **Notes/Known Issues**

- The current version of the Aurafy uses 3000 for the client port and 8000 for the server port.
- Up to only 20 playlists are displayed.
- Up to only 100 songs in a playlist are displayed.
