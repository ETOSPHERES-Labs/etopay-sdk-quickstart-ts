import { CryptpaySdk } from "@cawaena/cawaena-sdk-wasm";
import { resolve } from "path";
import * as dotenv from 'dotenv';
const { LocalStorage } = require("node-localstorage");

const WALLET_PIN = "12345";
const WALLET_PASSWORD = "Strong+Wallet+Pa55word";

async function main() {
    dotenv.config();

     // setup localStorage to use a file-based mock version
     globalThis.window = { localStorage: new LocalStorage('./local-storage') } as any;
    
    // Initialize the SDK
    const sdk = await new CryptpaySdk();
    console.log("SDK initialized");

    // Set the SDK configuration. Get it from the dashboard: https://dashboard.cawaena.com
    sdk.setConfig(JSON.stringify({
        auth_provider: "9c6700ffc1fc4cd8a0d9a883f4b97b71",
        backend_url: "http://localhost:7071/v1",
        storage_path: "./",
        log_level: "info"
    }));
    console.log("SDK was configured with success");

    // Create new user
    await sdk.createNewUser("username");
    console.log("user created successfully");
}

main();