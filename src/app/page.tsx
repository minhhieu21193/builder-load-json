import BuilderPageClient from "@/components/BuilderPageClient";
import { BUILDER_API_KEY, JSON_CONFIG_URL } from "@/lib/builder";

export default async function Page() {
  const jsonConfig = await fetch(JSON_CONFIG_URL, { cache: "no-store" }).then(
    (r) => r.json()
  );

  const config = jsonConfig.record || jsonConfig;

  return (
    <main>
      <BuilderPageClient
        model="page"
        apiKey={BUILDER_API_KEY!}
        data={{ jsonConfig: config }}
      />
    </main>
  );
}
