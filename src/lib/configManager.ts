import { UIConfig, UIElement, UIConfigParser, fetchUIConfig } from "./uiConfig";

export class ConfigManager {
  /**
   * Create a new UI element with sensible defaults
   */
  static createElement(
    type: string,
    props: Record<string, any> = {},
    children?: UIElement[] | string,
    id?: string
  ): UIElement {
    return {
      id: id || `${type}-${Date.now()}`,
      type,
      props,
      children,
    };
  }

  /**
   * Create a new container element
   */
  static createContainer(
    children: UIElement[],
    maxWidth = "1200px",
    padding = "20px",
    id?: string
  ): UIElement {
    return this.createElement(
      "Container",
      { maxWidth, padding },
      children,
      id
    );
  }

  /**
   * Create a new grid with columns
   */
  static createGrid(
    children: UIElement[],
    columns = 3,
    gap = "20px",
    id?: string
  ): UIElement {
    return this.createElement(
      "Grid",
      { columns, gap },
      children,
      id
    );
  }

  /**
   * Create a card element
   */
  static createCard(
    title: string,
    description?: string,
    image?: string,
    id?: string
  ): UIElement {
    return this.createElement(
      "Card",
      {
        title,
        ...(description && { description }),
        ...(image && { image }),
      },
      undefined,
      id
    );
  }

  /**
   * Create a button element
   */
  static createButton(
    text: string,
    variant: "primary" | "secondary" | "danger" = "primary",
    size: "sm" | "md" | "lg" = "md",
    id?: string
  ): UIElement {
    return this.createElement(
      "Button",
      { text, variant, size },
      undefined,
      id
    );
  }

  /**
   * Create a hero section
   */
  static createHeroSection(
    title: string,
    subtitle?: string,
    backgroundColor?: string,
    backgroundImage?: string,
    id?: string
  ): UIElement {
    return this.createElement(
      "HeroSection",
      {
        title,
        ...(subtitle && { subtitle }),
        ...(backgroundColor && { backgroundColor }),
        ...(backgroundImage && { backgroundImage }),
      },
      undefined,
      id
    );
  }

  /**
   * Create a text element
   */
  static createText(
    children: string,
    variant: "h1" | "h2" | "h3" | "h4" | "body" | "small" = "body",
    id?: string
  ): UIElement {
    return this.createElement(
      "Text",
      { variant },
      children,
      id
    );
  }

  /**
   * Create a badge element
   */
  static createBadge(
    text: string,
    variant: "default" | "success" | "warning" | "error" | "info" = "default",
    id?: string
  ): UIElement {
    return this.createElement(
      "Badge",
      { text, variant },
      undefined,
      id
    );
  }

  /**
   * Create a complete UI configuration
   */
  static createConfig(
    name: string,
    sections: UIElement[],
    version = "1.0.0",
    description?: string,
    metadata?: Record<string, any>
  ): UIConfig {
    return {
      version,
      name,
      ...(description && { description }),
      sections,
      ...(metadata && { metadata }),
    };
  }

  /**
   * Add a section to a configuration
   */
  static addSection(config: UIConfig, section: UIElement): UIConfig {
    return {
      ...config,
      sections: [...config.sections, section],
    };
  }

  /**
   * Update a section by ID
   */
  static updateSection(
    config: UIConfig,
    sectionId: string,
    updates: Partial<UIElement>
  ): UIConfig {
    return {
      ...config,
      sections: config.sections.map((section) =>
        section.id === sectionId ? { ...section, ...updates } : section
      ),
    };
  }

  /**
   * Remove a section by ID
   */
  static removeSection(config: UIConfig, sectionId: string): UIConfig {
    return {
      ...config,
      sections: config.sections.filter((section) => section.id !== sectionId),
    };
  }

  /**
   * Find a section by ID (recursive)
   */
  static findElement(
    sections: UIElement[],
    elementId: string
  ): UIElement | undefined {
    for (const section of sections) {
      if (section.id === elementId) {
        return section;
      }

      if (Array.isArray(section.children)) {
        const found = this.findElement(section.children, elementId);
        if (found) return found;
      }
    }

    return undefined;
  }

  /**
   * Convert config to JSON string for jsonbin submission
   */
  static toJSON(config: UIConfig, pretty = true): string {
    return pretty ? JSON.stringify(config, null, 2) : JSON.stringify(config);
  }

  /**
   * Clone a configuration
   */
  static clone(config: UIConfig): UIConfig {
    return JSON.parse(JSON.stringify(config));
  }

  /**
   * Validate configuration structure
   */
  static validate(config: UIConfig): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!config.version) {
      errors.push("Missing 'version' field");
    }

    if (!config.name) {
      errors.push("Missing 'name' field");
    }

    if (!Array.isArray(config.sections)) {
      errors.push("'sections' must be an array");
    }

    if (config.sections.length === 0) {
      errors.push("'sections' array cannot be empty");
    }

    for (const section of config.sections) {
      if (!section.id) {
        errors.push(`Section missing 'id' field`);
      }

      if (!section.type) {
        errors.push(`Section "${section.id}" missing 'type' field`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Get configuration stats
   */
  static getStats(config: UIConfig): {
    totalSections: number;
    totalElements: number;
    componentTypes: string[];
    elementsByType: Record<string, number>;
  } {
    let totalElements = 0;
    const componentTypes = new Set<string>();
    const elementsByType: Record<string, number> = {};

    const countElements = (elements: UIElement[]) => {
      for (const element of elements) {
        totalElements++;
        componentTypes.add(element.type);
        elementsByType[element.type] = (elementsByType[element.type] || 0) + 1;

        if (Array.isArray(element.children)) {
          countElements(element.children);
        }
      }
    };

    countElements(config.sections);

    return {
      totalSections: config.sections.length,
      totalElements,
      componentTypes: Array.from(componentTypes),
      elementsByType,
    };
  }
}

/**
 * Builder helper for fluent configuration creation
 */
export class ConfigBuilder {
  private config: UIConfig;

  constructor(name: string, version = "1.0.0") {
    this.config = ConfigManager.createConfig(name, [], version);
  }

  setDescription(description: string): this {
    this.config.description = description;
    return this;
  }

  setMetadata(metadata: Record<string, any>): this {
    this.config.metadata = metadata;
    return this;
  }

  addSection(section: UIElement): this {
    this.config.sections.push(section);
    return this;
  }

  addSections(sections: UIElement[]): this {
    this.config.sections.push(...sections);
    return this;
  }

  addHeroSection(
    title: string,
    subtitle?: string,
    backgroundColor?: string
  ): this {
    this.config.sections.push(
      ConfigManager.createHeroSection(title, subtitle, backgroundColor)
    );
    return this;
  }

  addContainer(children: UIElement[], maxWidth?: string, padding?: string): this {
    this.config.sections.push(
      ConfigManager.createContainer(children, maxWidth, padding)
    );
    return this;
  }

  build(): UIConfig {
    return ConfigManager.clone(this.config);
  }

  toJSON(pretty = true): string {
    return ConfigManager.toJSON(this.config, pretty);
  }

  validate(): { valid: boolean; errors: string[] } {
    return ConfigManager.validate(this.config);
  }
}
