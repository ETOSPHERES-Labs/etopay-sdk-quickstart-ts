import axios from "axios";

// Function to fetch the access token from KC
export async function getAccessToken(realm, username, password) {
  const authUrl = process.env.NEXT_PUBLIC_AUTH_URL;
  if (!authUrl) throw new Error("AUTH_URL is not defined");

  const url = `${authUrl}/realms/${realm}/protocol/openid-connect/token`;

  const clientId = process.env.NEXT_PUBLIC_AUTH_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_AUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) throw new Error("Client credentials are not defined");

  const params = new URLSearchParams({
    grant_type: "password",
    scope: "openid",
    client_id: clientId,
    client_secret: clientSecret,
    username: username,
    password: password,
  });

  try {
    const response = await axios.post(url, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error("Failed to fetch access token", error);
    throw new Error("Error fetching access token");
  }
}