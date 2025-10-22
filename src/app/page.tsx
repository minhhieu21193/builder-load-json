import { BuilderComponent } from "@builder.io/react";
import { builder } from "@/lib/builder";

export default async function Page() {
  let content = null;

  try {
    content = await builder.get("page", { userAttributes: { urlPath: "/" } }).toPromise();
  } catch (error) {
    console.error("Error fetching Builder content:", error);
  }

  return (
    <main>
      <BuilderComponent model="page" content={content} />
    </main>
  );
}
