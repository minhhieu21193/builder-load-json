import { BuilderComponent } from "@builder.io/react";
import { builder } from "@/lib/builder";

const JSON_URL = "https://api.jsonbin.io/v3/b/68f8f791ae596e708f243e4a";

export default async function Page() {
  let content = null;
  let config = null;

  try {
    const [builderContent, jsonResponse] = await Promise.all([
      builder.get("page", { userAttributes: { urlPath: "/" } }).toPromise(),
      fetch(JSON_URL, { cache: "no-store" })
        .then((r) => r.json())
        .catch(() => ({ record: null })),
    ]);

    content = builderContent;
    config = jsonResponse.record || jsonResponse;
  } catch (error) {
    console.error("Error fetching Builder content:", error);
  }

  return (
    <main>
      <BuilderComponent
        model="page"
        content={content}
        data={{ jsonConfig: config }}
      />
    </main>
  );
}
