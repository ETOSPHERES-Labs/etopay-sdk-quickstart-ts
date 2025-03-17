import axios from "axios";

interface AuthResponse {
    access_token: string;
}

/**
 * Fetches an access token for the specified user via Keycloak.
 * Required environment variables:
 *   - AUTH_URL
 *   - AUTH_CLIENT_ID
 *   - AUTH_CLIENT_SECRET
 */
export async function getAccessToken(realm: string, username: string, password: string): Promise<string> {
    const authUrl = process.env.AUTH_URL;
    if (!authUrl) throw new Error("AUTH_URL is not defined");

    const url = `${authUrl}/realms/${realm}/protocol/openid-connect/token`;

    const clientId = process.env.AUTH_CLIENT_ID;
    const clientSecret = process.env.AUTH_CLIENT_SECRET;
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
        const response = await axios.post<AuthResponse>(url, params, {
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
