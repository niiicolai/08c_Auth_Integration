require('dotenv').config();

const { google } = require('googleapis');
const express = require('express');

/**
 * https://github.com/googleapis/google-api-nodejs-client?tab=readme-ov-file#oauth2-client
 */

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);

/**
 * Ask the user to consent to the scopes needed for the app.
 */
app.get('/auth/google/consent', (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/userinfo.profile']
    });

    res.redirect(url)
})

/**
 * The user will be redirected back to the app with the code.
 * The code will be exchanged for tokens.
 * The tokens will be used to make requests to the Google API.
 */
app.get('/auth/google/callback', async (req, res) => {
    try {
        const { code } = req.query;
        const { tokens } = await oauth2Client.getToken(code)

        res.redirect(`/index.html?tokens=${JSON.stringify(tokens)}`);
    } catch (error) {
        console.error('Error', error);
        res.send('Error');
    }
});

/**
 * Use the tokens to make requests to the Google API.
 */
app.get('/auth/whoami', async (req, res) => {
    try {
        const tokens = JSON.parse(req.query.tokens);
        oauth2Client.setCredentials(tokens);
        const userInfo = await google.oauth2('v2').userinfo.get({ 
            auth: oauth2Client 
        }); 
        res.send(userInfo.data);
    } catch (error) {
        console.error('Error', error);
        res.send('Error');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
