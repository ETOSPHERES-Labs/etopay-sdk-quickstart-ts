// Helper function to retrieve environment variables
export function getEnvVariables() {
  const authUrl = process.env.NEXT_PUBLIC_AUTH_URL;
  const clientId = process.env.NEXT_PUBLIC_AUTH_CLIENT_ID;
  const clientSecret = process.env.NEXT_PUBLIC_AUTH_CLIENT_SECRET;
  const realm = process.env.NEXT_PUBLIC_REALM;
  const username = process.env.NEXT_PUBLIC_USER_NAME;
  const password = process.env.NEXT_PUBLIC_USER_PASSWORD;

  const missingEnvVars = [];

  if (!authUrl) missingEnvVars.push('NEXT_PUBLIC_AUTH_URL');
  if (!clientId) missingEnvVars.push('NEXT_PUBLIC_AUTH_CLIENT_ID');
  if (!clientSecret) missingEnvVars.push('NEXT_PUBLIC_AUTH_CLIENT_SECRET');
  if (!realm) missingEnvVars.push('NEXT_PUBLIC_REALM');
  if (!username) missingEnvVars.push('NEXT_PUBLIC_USER_NAME');
  if (!password) missingEnvVars.push('NEXT_PUBLIC_USER_PASSWORD');

  if (missingEnvVars.length > 0) {
    throw new Error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
  }

  return { authUrl, clientId, clientSecret, realm, username, password };
}

// Function to redirect user to Keycloak for authentication
export function redirectToLogin() {
  const { authUrl, clientId, realm } = getEnvVariables();
  const redirectUri = "http://localhost:8080/api/callback";

  // Construct the Keycloak authentication URL
  const url = `${authUrl}/realms/${realm}/protocol/openid-connect/auth?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=openid`;

  // Redirect the user to Keycloak login
  window.location.href = url;
}
