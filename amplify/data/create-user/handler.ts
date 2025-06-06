import type { Schema } from "../resource";
import { env } from "$amplify/env/list-groups-for-user";
import {
  AdminCreateUserCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";

type Handler = Schema["createUser"]["functionHandler"];
const client = new CognitoIdentityProviderClient();

export const handler: Handler = async (event) => {
  try {
    const { username, name, email, password } = event.arguments;
    const command = new AdminCreateUserCommand({
      Username: email,
      UserAttributes: [
        { Name: "email", Value: email },
        { Name: "name", Value: name },
        { Name: "preferred_username", Value: username },
        { Name: "email_verified", Value: "true" },
      ],
      TemporaryPassword: password,
      UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
      MessageAction: "SUPPRESS",
    });
    const response = await client.send(command);
    return response;
  } catch (error) {
    console.error("Lambda error:", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
};
