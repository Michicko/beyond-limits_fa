import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "beyondLimitsDrive",
  access: (allow) => ({
    "images/*": [
      allow.guest.to(["read", "write", "delete"]),
      allow.entity("identity").to(["read", "write", "delete"]),
    ],
  }),
});
