import { ETOPaySdk } from "@etospheres/etopay-sdk-wasm";
import * as dotenv from 'dotenv';
const { LocalStorage } = require("node-localstorage");
import { getAccessToken } from './utils';

const WALLET_PIN = "12345";
const WALLET_PASSWORD = "Strong+Wallet+Pa55word";

async function main() {
    dotenv.config();
    let username: string = (process.env.USER_NAME as string);
    let password: string = (process.env.USER_PASSWORD as string);

    // setup localStorage to use a file-based mock version
    globalThis.window = { localStorage: new LocalStorage('./local-storage') } as any;

    // Initialize the SDK
    const sdk = await new ETOPaySdk();
    console.log("SDK initialized successfully ..");

    // Set the SDK configuration. Get it from the dashboard: https://etopayapp.etospheres.com
    let auth_provider = "";
    sdk.setConfig(JSON.stringify({
        auth_provider: auth_provider,
        backend_url: "",
        storage_path: "",
        log_level: ""
    }));
    console.log("SDK was configured successfully .. ");

    // Create new user and initialize
    await sdk.createNewUser(username);
    await sdk.initializeUser(username);
    console.log("User created and initialized successfully ..");

    // Refresh access token
    let access_token = await getAccessToken(auth_provider, username, password);
    await sdk.refreshAccessToken(access_token);
    console.log("Access token generated successfully .. ");

    // Get list of available networks
    let networks = await sdk.getNetworks();
    console.log("Get network list success: ", networks);

    // Select which network to use
    await sdk.setNetwork("67a1f08edf55756bae21e7eb");
    console.log("Network was set successfully .. ");

    // Set wallet password if not set
    sdk.setWalletPassword(WALLET_PIN, WALLET_PASSWORD);

    // Create new wallet if no wallets exists
    await sdk.createNewWallet(WALLET_PIN);

    // Generate new receiver address
    let address = await sdk.generateNewAddress(WALLET_PIN);
    console.log("Address: ", address);
}

main();