import BuilderPageClient from "@/components/BuilderPageClient";
import { BUILDER_API_KEY } from "@/lib/builder";

const JSON_URL = "https://api.jsonbin.io/v3/b/6718f62be41b4d34e4702b9a";

export default async function Page() {
  // Fetch Builder content
  const builderRes = await fetch(
    `https://cdn.builder.io/api/v3/content/page?apiKey=${BUILDER_API_KEY}&userAttributes.urlPath=/`,
    { cache: "no-store" }
  ).then((r) => r.json());

  console.log("🔍 Builder response:", builderRes); // 👈 thêm dòng này để kiểm tra log

  const content = builderRes.results?.[0] || null;

  const jsonConfig = await fetch(JSON_URL, { cache: "no-store" }).then((r) =>
    r.json()
  );
  const config = jsonConfig.record || jsonConfig;

  return (
    <main>
      <BuilderPageClient content={content} config={config} />
    </main>
  );
}
