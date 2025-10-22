"use client";

import { Content } from "@builder.io/sdk-react";

interface Props {
  model: string;
  entry?: string;
  apiKey: string;
  data?: any;
}

export default function BuilderPageClient({
  model,
  entry,
  apiKey,
  data,
}: Props) {
  return <Content model={model} apiKey={apiKey} entry={entry} data={data} />;
}
