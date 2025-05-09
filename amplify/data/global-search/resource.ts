import { defineFunction } from "@aws-amplify/backend";

export const globalSearch = defineFunction({
  name: "global-search",
  entry: "./handler.ts",
});
