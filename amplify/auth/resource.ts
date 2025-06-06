import { defineAuth } from "@aws-amplify/backend";
import { addUserToGroup } from "../data/add-user-to-group/resource";
import { listUsers } from "../data/list-users/resource";
import { removeUserFromGroup } from "../data/remove-user-from-group/resource";
import { listGroupsForUser } from "../data/list-groups-for-user/resource";
import { createUser } from "../data/create-user/resource";

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    preferredUsername: {
      mutable: true,
      required: true,
    },
  },

  groups: ["Admin", "Writer"],

  access: (allow) => [
    allow.resource(addUserToGroup).to(["addUserToGroup"]),
    allow.resource(listUsers).to(["listUsers"]),
    allow.resource(removeUserFromGroup).to(["removeUserFromGroup"]),
    allow.resource(listGroupsForUser).to(["listGroupsForUser"]),
    allow.resource(createUser).to(["createUser"]),
  ],
});
