import { ETOPaySdk } from "@etospheres/etopay-sdk-wasm";
import { expect, test } from "vitest";

test("SDK dependency works", () => {
  // init sdk
  const sdk = new ETOPaySdk();
  
  // get build info
  console.log("Get SDK build Info:");
  const buildInfo = sdk.getBuildInfo().toString();
  console.log(buildInfo);

  // assert
  expect(buildInfo).toBeDefined(); 
});

