import axios from 'axios';
import { getEnvVariables } from '../../utils/auth';

// API route that handles exchanging the authorization code for tokens
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { code } = req.query;
  if (!code) {
    return res.status(400).json({ error: 'Authorization code is missing' });
  }

  try {
    const { clientId, clientSecret, realm } = getEnvVariables();

    // URL for Keycloak's token endpoint
    const tokenUrl = `http://keycloak:8888/realms/${realm}/protocol/openid-connect/token`;

    // Prepare params for the token exchange
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      redirect_uri: 'http://localhost:8080/api/callback',
    });

    const response = await axios.post(tokenUrl, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    const accessToken = response.data.access_token;

    // Redirect back to frontend with the token in the URL
    res.redirect(`http://localhost:8080?token=${accessToken}`); // TODO: store token into a cookie or something instead of passing it as query param
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to exchange authorization code for tokens' });
  }
}
