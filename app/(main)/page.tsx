import { cookiesClient } from "@/utils/amplify-utils";
import React from "react";

async function Home() {
  const { data: positions, errors } =
    await cookiesClient.models.PlayerPosition.list({
      selectionSet: ["id", "longName", "attributes"],
      authMode: "identityPool",
    });
  console.log("positions: ", positions);
  return (
    <div>
      <h1>Welcome to Beyond limits</h1>
    </div>
  );
}

export default Home;
