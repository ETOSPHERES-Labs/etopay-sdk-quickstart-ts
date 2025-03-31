// Helper function to retrieve environment variables
export function getEnvVariables() {
  const authUrl = process.env.NEXT_PUBLIC_AUTH_URL;
  const clientId = process.env.NEXT_PUBLIC_AUTH_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_AUTH_CLIENT_SECRET;

  if (!authUrl || !clientId || !clientSecret) {
    throw new Error("Missing environment variables: AUTH_URL, CLIENT_ID, or CLIENT_SECRET.");
  }

  return { authUrl, clientId, clientSecret };
}

// Function to redirect user to Keycloak for authentication
export function redirectToLogin(realm) {
  const { authUrl, clientId } = getEnvVariables();
  const redirectUri = "http://localhost:8080/api/callback";

  if (!realm) {
    throw new Error("Realm is not defined in the callback URL");
  }

  // Construct the Keycloak authentication URL
  const url = `${authUrl}/realms/${realm}/protocol/openid-connect/auth?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=openid`;

  // Redirect the user to Keycloak login
  window.location.href = url;
}
