import { defineAuth } from "@aws-amplify/backend";
import { addUserToGroup } from "../data/add-user-to-group/resource";
import { listUsers } from "../data/list-users/resource";

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    preferredUsername: {
      mutable: true,
      required: false,
    },
  },
  groups: ["Admin", "Writer"],

  access: (allow) => [
    allow.resource(addUserToGroup).to(["addUserToGroup"]),
    allow.resource(listUsers).to(["listUsers"]),
  ],
});
