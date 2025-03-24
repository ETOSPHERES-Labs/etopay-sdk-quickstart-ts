import { CryptpaySdk } from "@cawaena/cawaena-sdk-wasm";
import { expect, test } from "vitest";

test("SDK dependency works", () => {
  // init sdk
  const sdk = new CryptpaySdk();
  
  // get build info
  console.log("Get SDK build Info:");
  const buildInfo = sdk.getBuildInfo().toString();
  console.log(buildInfo);


  // assert
  expect(buildInfo).toBeDefined(); 
});

