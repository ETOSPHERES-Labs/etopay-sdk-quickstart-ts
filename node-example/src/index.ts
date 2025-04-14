import { ETOPaySdk } from "@etospheres/etopay-sdk-wasm-node";
import * as dotenv from 'dotenv';
import * as fs from 'fs';
const { LocalStorage } = require("node-localstorage");
import { getAccessToken } from './utils';

const WALLET_PIN = "666666";
const WALLET_PASSWORD = "Strong+Wallet+P@55word";

async function main() {
    dotenv.config();
    let username: string = (process.env.USER_NAME as string);
    let password: string = (process.env.USER_PASSWORD as string);

    // setup localStorage to use a file-based mock version
    globalThis.window = { localStorage: new LocalStorage('./local-storage') } as any;

    // Initialize the SDK
    const sdk = await new ETOPaySdk();
    console.log("SDK initialized successfully ..");
    let auth_provider = (process.env.AUTH_PROVIDER as string);
    // Set the SDK configuration. Get it from the dashboard: https://etopayapp.etospheres.com
    // Load configuration from config.json
    const configPath = './config.json';
    if (!fs.existsSync(configPath)) {
        throw new Error(`Configuration file not found at ${configPath}`);
    }
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

    // Set the SDK configuration
    sdk.setConfig(JSON.stringify(config));

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
    await sdk.setNetwork(networks[0].key);
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