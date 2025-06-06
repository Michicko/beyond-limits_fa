import type { Schema } from "../resource";
import { env } from "$amplify/env/list-groups-for-user";
import {
  AdminDeleteUserCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";

type Handler = Schema["deleteUser"]["functionHandler"];
const client = new CognitoIdentityProviderClient();

export const handler: Handler = async (event) => {
  try {
    const { userId } = event.arguments;
    const command = new AdminDeleteUserCommand({
      Username: userId,
      UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
    });
    const response = await client.send(command);
    return response;
  } catch (error) {
    console.error("Lambda error:", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
