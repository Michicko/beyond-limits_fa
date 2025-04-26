import type { Schema } from "../resource";
import { env } from "$amplify/env/add-user-to-group";
import {
  AdminAddUserToGroupCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";

type Handler = Schema["addUserToGroup"]["functionHandler"];
const client = new CognitoIdentityProviderClient();

export const handler: Handler = async (event) => {
  try {
    const { userId, groupName } = event.arguments;
    const command = new AdminAddUserToGroupCommand({
      Username: userId,
      GroupName: groupName,
      UserPoolId: env.AMPLIFY_AUTH_USERPOOL_ID,
    });
    const response = await client.send(command);
    return response;
  } catch (error) {
    console.error("Error adding user to group:", error);
    throw new Error("Failed to add user to group");
  }
};
