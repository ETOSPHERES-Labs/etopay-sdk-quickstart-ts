import { useEffect, useState } from "react";
import init, { ETOPaySdk } from "@etospheres/etopay-sdk-wasm-web";
import { redirectToLogin, getEnvVariables } from '../utils/auth';

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

      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token"); // TODO: retieve token from a cookie

      try {
        const { username, realm } = getEnvVariables();

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
        sdk.setConfig(
          JSON.stringify({
            auth_provider: realm,
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

        if (token) {
          console.log("Access Token received:", token);
          await sdk.refreshAccessToken(token);
          // Store the token in localStorage or state if needed
        } else {
          redirectToLogin();
        }

        // Fetch and set networks
        const networksList = await sdk.getNetworks();
        console.log("Networks:", networksList);

        // Set a network
        await sdk.setNetwork(networksList[1].key);
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
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f4f4f4",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{ color: "#333", fontSize: "24px", marginBottom: "20px" }}>
        ETOPay SDK React Integration
      </h1>

      {error && (
        <p style={{
          color: "white",
          backgroundColor: "red",
          padding: "10px",
          borderRadius: "5px"
        }}>
          Error: {error}
        </p>
      )}

      {address && (
        <div style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
        }}>
          <h2 style={{ color: "#555", marginBottom: "10px" }}>Generated Address</h2>
          <p style={{ fontSize: "18px", fontWeight: "bold", color: "#222" }}>{address}</p>
        </div>
      )}
    </div>
  );

};

export default Home;
