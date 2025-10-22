import BuilderPageClient from "@/components/BuilderPageClient";
import { BUILDER_API_KEY, JSON_CONFIG_URL } from "@/lib/builder";

export default async function Page() {
  // Fetch Builder content
  const builderRes = await fetch(
    `https://cdn.builder.io/api/v3/content/page?apiKey=${BUILDER_API_KEY}&userAttributes.urlPath=/`,
    { cache: "no-store" }
  ).then(r => r.json());

  console.log("🔍 Builder response:", builderRes);

  const content = builderRes.results?.[0] || null;

  let config = null;

  if (JSON_CONFIG_URL) {
    const jsonConfig = await fetch(JSON_CONFIG_URL, { cache: "no-store" }).then((r) =>
      r.json()
    );
    config = jsonConfig.record || jsonConfig;
  }

  return (
    <main>
      <BuilderPageClient
        model="page"
        apiKey={BUILDER_API_KEY!}
        content={content}
        config={config}
      />
    </main>
  );
}
