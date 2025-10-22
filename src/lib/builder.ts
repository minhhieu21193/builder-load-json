import { builder } from "@builder.io/react";

if (!process.env.NEXT_PUBLIC_BUILDER_PUBLIC_API_KEY) {
  throw new Error("Missing NEXT_PUBLIC_BUILDER_PUBLIC_API_KEY");
}
builder.init(process.env.NEXT_PUBLIC_BUILDER_PUBLIC_API_KEY);

export { builder };
