"use client";

import { BuilderComponent } from "@builder.io/react";
import UIRenderer from "./UIRenderer";
import { UIConfig } from "@/lib/uiConfig";
import { useState } from "react";

export default function BuilderPageClient({ content, config }: any) {
  const [renderError, setRenderError] = useState<string | null>(null);

  const handleRenderError = (error: Error) => {
    setRenderError(error.message);
    console.error("UI Render Error:", error);
  };

  return (
    <>
      <div className="input-container">
        <input
          type="text"
          placeholder="bạn mong chờ điều gì ở một con chó"
          className="search-input"
        />
      </div>
      <div className="main-content">
        <div className="hidden-placeholder" hidden />
        <main className="main-section">
          {renderError && (
            <div className="error-container">
              <div className="error-message">
                ⚠️ Lỗi render: {renderError}
              </div>
            </div>
          )}

          {config && isValidUIConfig(config) ? (
            <UIRenderer config={config} onError={handleRenderError} />
          ) : content ? (
            <BuilderComponent
              model="page"
              content={content}
              data={{ jsonConfig: config }}
            />
          ) : (
            <div className="no-content-message">
              ⚠️ No Builder.io content found for this URL
            </div>
          )}
        </main>
        <next-route-announcer className="route-announcer" />
      </div>
    </>
  );
}

function isValidUIConfig(config: any): config is UIConfig {
  return (
    config &&
    typeof config === "object" &&
    Array.isArray(config.sections) &&
    config.sections.length > 0
  );
}
