export interface UIElement {
  id: string;
  type: string;
  props?: Record<string, any>;
  children?: UIElement[] | string;
  className?: string;
  style?: Record<string, any>;
}

export interface UIConfig {
  version: string;
  name: string;
  description?: string;
  sections: UIElement[];
  metadata?: Record<string, any>;
}

export class UIConfigParser {
  static parse(data: any): UIConfig {
    if (typeof data === "string") {
      data = JSON.parse(data);
    }

    if (data.record) {
      data = data.record;
    }

    return {
      version: data.version || "1.0.0",
      name: data.name || "UI Configuration",
      description: data.description,
      sections: Array.isArray(data.sections) ? data.sections : data.elements || [],
      metadata: data.metadata,
    };
  }

  static validate(config: UIConfig): boolean {
    return (
      config.version &&
      config.name &&
      Array.isArray(config.sections)
    );
  }

  static merge(base: UIConfig, override: UIConfig): UIConfig {
    return {
      ...base,
      ...override,
      sections: [...base.sections, ...override.sections],
      metadata: { ...base.metadata, ...override.metadata },
    };
  }
}

export async function fetchUIConfig(url: string): Promise<UIConfig | null> {
  if (!url) return null;

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error(`Failed to fetch UI config: ${response.statusText}`);
      return null;
    }

    const data = await response.json();
    return UIConfigParser.parse(data);
  } catch (error) {
    console.error("Error fetching UI config:", error);
    return null;
  }
}
