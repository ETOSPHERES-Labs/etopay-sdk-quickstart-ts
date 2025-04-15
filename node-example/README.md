
# Introduction

This is a quickstart example of how to use the ETOPay SDK to create a new wallet and generate the first receiver address. This _node-example_ is developed with `Typescript`.

## Installation

The ETOPay SDK is available on NPM, making it easy to integrate into your project. You can find it here:  

* Node - [ETOPay SDK Node](https://www.npmjs.com/package/@etospheres/etopay-sdk-wasm-node).

To install it as a dependency, simply run the following command in your project directory:

```bash
bun install @etospheres/etopay-sdk-wasm-node
```

> Currently, we only support `bun` for running the SDK, as `node` does not work correctly with the current version. We recommend using `bun` to ensure proper functionality.

This will add the ETOPay SDK to your project, and you'll be ready to start using it (as it is already done in this example) ! 😊

## Getting started

* Copy the .env.example file to .env and set the missing values
* Go to `https://etopayapp.etospheres.com` and get the SDK configuration for you project
* Set the SDK configuration in `src/index.ts` and also the  `auth_provider`
* Run the node example with `bun src/index.ts`

### Removing the local storage

If testing with the same user again, remove the local-storage folder. Since this folder contains the local user and their wallet settings, make sure you have back-ed up the mnemonic before removing. Do not attempt removal of local storage in production and ensure a safe and secure backup mechanism for the local storage.

## Snippets

Curl snippet to get an access_token.

```bash
curl -X POST "https://auth-etopay.etospheres.com/realms/<realm>/protocol/openid-connect/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=password" \
     -d "scope=profile email openid" \
     -d "client_id=<client_id>" \
     -d "client_secret=<client_secret>" \
     -d "username=<user_name>" \
     -d "password=<user_password>"
```
