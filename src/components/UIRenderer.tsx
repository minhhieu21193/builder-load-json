"use client";

import { componentRegistry } from "@/lib/componentRegistry";
import { UIElement, UIConfig } from "@/lib/uiConfig";
import React from "react";

interface UIRendererProps {
  config: UIConfig;
  onError?: (error: Error) => void;
}

export default function UIRenderer({ config, onError }: UIRendererProps) {
  const renderElement = (element: UIElement, index: number): React.ReactNode => {
    if (!element) return null;

    const { id, type, props = {}, children, className = "", style = {} } = element;
    const key = id || `element-${index}`;

    try {
      // Try to get registered component first
      const registeredComponent = componentRegistry.getComponent(type);

      if (registeredComponent) {
        return React.createElement(registeredComponent, {
          key,
          ...props,
          className,
          style,
          children: renderChildren(children),
        });
      }

      // Fallback to native HTML elements
      return React.createElement(
        type as keyof JSX.IntrinsicElements,
        {
          key,
          className,
          style,
          ...props,
        },
        renderChildren(children)
      );
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      onError?.(err);
      console.error(`Error rendering element with type "${type}":`, error);

      return (
        <div
          key={key}
          className="border-2 border-red-500 p-4 bg-red-50 rounded"
          style={{ margin: "10px 0" }}
        >
          <p className="text-red-700 font-semibold">
            Error rendering component: {type}
          </p>
          <p className="text-red-600 text-sm">{err.message}</p>
        </div>
      );
    }
  };

  const renderChildren = (
    children: UIElement[] | string | undefined
  ): React.ReactNode => {
    if (!children) return null;

    if (typeof children === "string") {
      return children;
    }

    if (Array.isArray(children)) {
      return children.map((child, index) => renderElement(child, index));
    }

    return null;
  };

  return (
    <div className="ui-renderer">
      {config.sections.map((section, index) => (
        <div key={section.id || `section-${index}`} className="ui-section">
          {renderElement(section, index)}
        </div>
      ))}
    </div>
  );
}
