import { builder } from "@builder.io/react";

if (!process.env.BUILDER_PUBLIC_API_KEY) {
  throw new Error("Missing BUILDER_PUBLIC_API_KEY");
}
builder.init(process.env.BUILDER_PUBLIC_API_KEY);

export { builder };

