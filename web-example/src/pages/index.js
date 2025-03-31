import { useEffect, useState } from "react";
import init, { ETOPaySdk } from "@etospheres/etopay-sdk-wasm-web";
import { getAccessToken } from '../utils/auth';

const WALLET_PIN = "12345";
const WALLET_PASSWORD = "Strong+Wallet+Pa55word";

const Home = () => {
  const [sdk, setSdk] = useState(null);
  const [address, setAddress] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeSdk = async () => {
      // Ensure WASM is fully initialized
      await init();

      try {
        const username = process.env.NEXT_PUBLIC_USER_NAME;
        const password = process.env.NEXT_PUBLIC_USER_PASSWORD;
        if (!username || !password) throw new Error("Missing credentials");

        // Ensure `window.localStorage` is available
        if (typeof window !== "undefined" && window.localStorage) {
          console.log("localStorage is available");
          window.localStorage.clear();
        } else {
          throw new Error("localStorage is not available");
        }

        // Initialize SDK
        const sdk = new ETOPaySdk();
        setSdk(sdk);
        console.log("SDK initialized successfully ..");

        // Set SDK config
        let auth_provider = "";
        sdk.setConfig(
          JSON.stringify({
            auth_provider,
            backend_url: "",
            storage_path: "",
            log_level: "",
          })
        );
        console.log("SDK configured successfully ..");

        // Create user if not already created
        await sdk.createNewUser(username);
        await sdk.initializeUser(username)
        console.log("User created and initialized ..");

        // Generate access token
        const access_token = await getAccessToken(auth_provider, username, password);
        await sdk.refreshAccessToken(access_token);
        console.log("Access token generated successfully .. ");

        // Fetch and set networks
        const networksList = await sdk.getNetworks();
        console.log("Networks:", networksList);

        // Set a network
        await sdk.setNetwork(networksList[0].key);
        console.log("Network set successfully ..");

        // Set wallet password
        await sdk.setWalletPassword(WALLET_PIN, WALLET_PASSWORD);

        // Create wallet if none exists
        await sdk.createNewWallet(WALLET_PIN);

        // Generate a new address
        const newAddress = await sdk.generateNewAddress(WALLET_PIN);
        setAddress(newAddress);
        console.log("New Address:", newAddress);
      } catch (err) {
        setError(err.message);
        console.error("Error:", err);
      }
    };

    initializeSdk();
  }, []);

  return (
    <div>
      <h1>ETOPay SDK React Integration</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {address && (
        <div>
          <h2>Generated Address</h2>
          <p>{address}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
