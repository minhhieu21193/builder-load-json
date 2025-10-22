import BuilderPageClient from "@/components/BuilderPageClient";
import { BUILDER_API_KEY } from "@/lib/builder";

const JSON_URL = "https://api.jsonbin.io/v3/b/6718f62be41b4d34e4702b9a";

export default async function Page() {
  // 1️⃣ Fetch nội dung Builder.io (dạng page)
  const builderRes = await fetch(
    `https://cdn.builder.io/api/v3/content/page?apiKey=${BUILDER_API_KEY}&userAttributes.urlPath=/`,
    { cache: "no-store" }
  ).then((r) => r.json());

  const content = builderRes.results?.[0] || null;

  // 2️⃣ Fetch JSON config (ví dụ từ JSONBin)
  const jsonConfig = await fetch(JSON_URL, { cache: "no-store" }).then((r) =>
    r.json()
  );
  const config = jsonConfig.record || jsonConfig;

  // 3️⃣ Render phía client
  return (
    <main>
      <BuilderPageClient content={content} config={config} />
    </main>
  );
}
