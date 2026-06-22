import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "beyondLimitsDrive",
  access: (allow) => ({
    "images/*": [
      allow.guest.to(["read"]),
      allow.entity("identity").to(["read"]),
      allow.authenticated.to(["read"]),
      allow.groups(["Admin", "Writer"]).to(["read", "write", "delete"]),
    ],
  }),
});
