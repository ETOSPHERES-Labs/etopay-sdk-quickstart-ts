
# Introduction

These are two quickstart examples of how to use the ETOPay SDK to create a new wallet and generate the first receiver address. The _node-example_ is developed with `Typescript` while the _web-example_ is developed with `NextJs`.

## Installation

The ETOPay SDK is available on NPM, making it easy to integrate into your project. You can find it here:  

* Node - [ETOPay SDK Node](https://www.npmjs.com/package/@etospheres/etopay-sdk-wasm-node).
* Web - [ETOPay SDK Web](https://www.npmjs.com/package/@etospheres/etopay-sdk-wasm-web).

To install it as a dependency, simply run the following command in your project directory: 

```bash
bun install @etospheres/etopay-sdk-wasm-node
```
or

```bash
bun install @etospheres/etopay-sdk-wasm-web
```

> Currently, we only support `bun` for running the SDK, as `node` does not work correctly with the current version. We recommend using `bun` to ensure proper functionality. This restriction is only for the node-example.

This will add the ETOPay SDK to your project, and you'll be ready to start using it (as it is already done in these examples) ! 😊

## Getting started

- Copy the .env.example file to .env and set the missing values
- Go to `https://etopayapp.etospheres.com` and get the SDK configuration for you project
- Set the SDK configuration in `src/index.ts`
- Run the node example with `cd node-example && bun src/index.ts`
- Run the web example with `cd web-example && pnpm run dev`

!!! Note

To run the web example locally, you need to enable _CORS_ for your Keycloak setup. Therefore, go to the **Clients** section in the Keycloak Admin Console and add `http://localhost:8080` to the **Web Origins** field. Then, ensure the **Standard Flow** is enabled and _Direct Access Grants_ is disabled for the client. Save your changes, and this will allow your app to communicate with Keycloak properly while using the recommended authorization code flow.

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
