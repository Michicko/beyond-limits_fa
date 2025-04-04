import { cookiesClient } from "@/utils/amplify-utils";
import React from "react";

async function Home() {
  const { data: positions, errors } =
    await cookiesClient.models.PlayerPosition.list({
      selectionSet: ["id", "longName", "attributes"],
      authMode: "identityPool",
    });
  console.log(errors ? `errors: ${errors}` : `positions: ${positions}`);
  return (
    <div>
      <h1>Welcome to Beyond limits</h1>
      {
        <div>
          {positions.map((el) => {
            return <h3 key={el.id}>{el.longName}</h3>;
          })}
        </div>
      }
    </div>
  );
}

export default Home;
