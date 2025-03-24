
# Introduction

This is a quickstart example of how to use the ETOPay SDK to create a new wallet and generate the first receiver address.

## Installation

The ETOPay SDK is available on NPM, making it easy to integrate into your project. You can find it here: [ETOPay SDK on NPM](https://www.npmjs.com/package/@etospheres/etopay-sdk-wasm).

To install it as a dependency, simply run the following command in your project directory: 

```bash
npm install @etospheres/etopay-sdk-wasm
```

This will add the ETOPay SDK to your project, and you'll be ready to start using it (as it is already done in this example)! 😊

## Getting started

- Copy the .env.example file to .env and set the missing values
- Go to `https://etopayapp.etospheres.com` and get the SDK configuration for you project
- Set the SDK configuration in `src/index.ts`
- Run the example with `ts-node src/index.ts`

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

