"use client";
import { BuilderComponent } from "@builder.io/react";
import { builder } from "@/lib/builder";

// URL JSON (bạn có thể thay bằng link JSONForm.io hoặc JSONBin.io)
const JSON_URL = "https://api.jsonbin.io/v3/b/68f8f791ae596e708f243e4a"; // ví dụ

export default async function Page() {
  const [content, jsonConfig] = await Promise.all([
    builder.get("page", { userAttributes: { urlPath: "/" } }).toPromise(),
    fetch(JSON_URL, { cache: "no-store" }).then((r) => r.json()), // ⚡ luôn lấy mới nhất
  ]);

  const config = jsonConfig.record || jsonConfig;

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
