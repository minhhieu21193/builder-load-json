"use client";

import { BuilderComponent } from "@builder.io/react";

export default function BuilderPageClient({ content, config }: any) {
  console.log("content", content)
  console.log("config", config)
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          marginTop: "20px",
          height: "auto",
        }}
      >
        <input
          type="text"
          placeholder="bạn mong chờ điều gì ở một con chó"
          style={{
            padding: "12px 16px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontFamily: "Arial, sans-serif",
          }}
        />
      </div>
      <div
        style={{
          maxWidth: "768px",
          color: "rgb(237, 237, 237)",
          backgroundColor: "rgb(10, 10, 10)",
          margin: "0 auto",
          padding: "40px 0",
          font: "400 16px/24px Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "none", fontWeight: "400" }} hidden />
        <main style={{ fontWeight: "400" }}>
          {!content ? (
            <div
              style={{
                color: "rgb(255, 255, 255)",
                fontWeight: "400",
                textAlign: "center",
                padding: "100px",
              }}
            >
              ⚠️ No Builder.io content found for this URL
            </div>
          ) : (
            <BuilderComponent
              model="page"
              content={content}
              data={{ jsonConfig: config }}
            />
          )}
        </main>
        <next-route-announcer
          style={{
            display: "block",
            fontWeight: "400",
            position: "absolute",
          }}
        />
      </div>
    </>
  );
}
