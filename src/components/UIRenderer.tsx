"use client";

import { componentRegistry } from "@/lib/componentRegistry";
import { UIElement, UIConfig } from "@/lib/uiConfig";
import React from "react";

interface UIRendererProps {
  config: UIConfig;
  onError?: (error: Error) => void;
}

/**
 * Các thuộc tính CSS hợp lệ mà ta muốn tự động đưa vào style
 * Bạn có thể mở rộng danh sách này tùy ý (bao gồm toàn bộ các CSS camelCase)
 */
const STYLE_PROPS = new Set([
  "background",
  "backgroundColor",
  "border",
  "borderColor",
  "borderRadius",
  "borderWidth",
  "color",
  "display",
  "flex",
  "flexDirection",
  "flexWrap",
  "fontSize",
  "fontWeight",
  "gap",
  "height",
  "justifyContent",
  "lineHeight",
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "maxWidth",
  "maxHeight",
  "minWidth",
  "minHeight",
  "overflow",
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "textAlign",
  "width",
  "zIndex",
]);

export default function UIRenderer({ config, onError }: UIRendererProps) {
  const renderElement = (
    element: UIElement,
    index: number
  ): React.ReactNode => {
    if (!element) return null;

    const {
      id,
      type,
      props = {},
      children,
      className = "",
      style = {},
    } = element;
    const key = id || `element-${index}`;

    try {
      // Phân loại props: tách riêng style-related props
      const styleProps: Record<string, string | number> = {};
      const safeProps: Record<string, any> = {};

      for (const [k, v] of Object.entries(props)) {
        if (STYLE_PROPS.has(k)) {
          styleProps[k] = v as any;
        } else {
          safeProps[k] = v;
        }
      }

      const mergedStyle = { ...style, ...styleProps };

      // Thử render component đã đăng ký trước
      const registeredComponent = componentRegistry.getComponent(type);

      if (registeredComponent) {
        return React.createElement(registeredComponent, {
          key,
          ...safeProps,
          className,
          style: mergedStyle,
          children: renderChildren(children),
        });
      }

      // Fallback: native HTML element or other dynamic element
      if (typeof type === "string") {
        return React.createElement(
          type,
          {
            key,
            className,
            style: mergedStyle,
            ...safeProps,
          },
          renderChildren(children)
        );
      }

      // If `type` is not a string, cast to `any` to satisfy React.createElement overloads
      return React.createElement(
        type as any,
        {
          key,
          className,
          style: mergedStyle,
          ...safeProps,
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
    if (typeof children === "string") return children;
    if (Array.isArray(children))
      return children.map((child, i) => renderElement(child, i));
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
