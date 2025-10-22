"use client";

import { BuilderComponent, builder } from "@builder.io/react";
import { BUILDER_API_KEY } from "@/lib/builder";

if (!builder.apiKey && BUILDER_API_KEY) {
  builder.init(BUILDER_API_KEY);
}

export default function BuilderPageClient({
  content,
  config,
}: {
  content: any;
  config: any;
}) {
  return (
    <BuilderComponent
      model="page"
      content={content}
      data={{ jsonConfig: config }}
    />
  );
}
