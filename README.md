A simple OAuth 2 implementation with Google in Node.js

## Getting Started
1. Clone the repository
2. Run `npm install`
3. Create a `.env` file in the root directory and add the following:
```bash
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/google/callback
```
4. Run `npm start`
5. Visit `http://localhost:3000` in your browser

## Create Credentials
1. Go to the [Google Developers Console](https://console.developers.google.com/)
2. Create a new project or select an existing project
3. Go to the `Credentials` tab
4. Click `Create credentials` and select `OAuth client ID`
5. Select `Web application`
6. Add `http://localhost:3000` to the `Authorized JavaScript origins`
7. Add `http://localhost:3000/auth/google/callback` to the `Authorized redirect URIs`
8. Click `Create`
9. Copy the `Client ID` and `Client Secret` to the `.env` file

