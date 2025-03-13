import { CryptpaySdk } from "@cawaena/cawaena-sdk-wasm";
import * as dotenv from 'dotenv';
import { access } from "fs/promises";
import { resolve } from "path";
const WALLET_PIN = "12345";
const WALLET_PASSWORD = "Strong+Wallet+Pa55word";
async function main() {
    dotenv.config();
    // Initialize the SDK
    const sdk = await new CryptpaySdk();
    // Set the SDK configuration. Get it from the dashboard: https://dashboard.cawaena.com
    sdk.setConfig(JSON.stringify({
        auth_provider: "<authentication provider name>",
        backend_url: "<valid URL to the backend API>",
        storage_path: "/path/to/valid/folder",
        log_level: "info"
    }));
    // Create new user if user database not exists
    const pathUserDb = resolve("./tmp/sdk-user.db");
    access(pathUserDb).catch(() => sdk.createNewUser("testuser"));
}
main();
