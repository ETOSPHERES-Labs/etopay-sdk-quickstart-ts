"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const cawaena_sdk_wasm_1 = require("@cawaena/cawaena-sdk-wasm");
const dotenv = __importStar(require("dotenv"));
const { LocalStorage } = require("node-localstorage");
const WALLET_PIN = "12345";
const WALLET_PASSWORD = "Strong+Wallet+Pa55word";
async function main() {
    dotenv.config();
    // setup localStorage to use a file-based mock version
    globalThis.window = { localStorage: new LocalStorage('./local-storage') };
    // Initialize the SDK
    const sdk = await new cawaena_sdk_wasm_1.CryptpaySdk();
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
