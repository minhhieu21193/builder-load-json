import { UIConfig, UIConfigParser, UIElement } from "./uiConfig";
import { componentRegistry } from "./componentRegistry";

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

export interface ValidationError {
  type: "structure" | "component" | "props";
  message: string;
  element?: UIElement;
  field?: string;
}

export interface ValidationWarning {
  type: "unused" | "deprecated" | "missing";
  message: string;
  element?: UIElement;
}

export class ConfigTester {
  /**
   * Validate a complete configuration
   */
  static validate(config: any): ValidationResult {
    const errors: ValidationError[] = [];
    const warnings: ValidationWarning[] = [];

    // Step 1: Parse and validate structure
    try {
      const parsed = UIConfigParser.parse(config);

      if (!UIConfigParser.validate(parsed)) {
        errors.push({
          type: "structure",
          message: "Invalid configuration structure",
        });
        return { isValid: false, errors, warnings };
      }

      // Step 2: Validate each section
      this.validateSections(parsed.sections, errors, warnings);

      // Step 3: Check for unused components
      this.checkUnusedComponents(parsed.sections, warnings);
    } catch (error) {
      errors.push({
        type: "structure",
        message:
          error instanceof Error ? error.message : "Unknown parsing error",
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  /**
   * Validate all sections recursively
   */
  private static validateSections(
    elements: UIElement[],
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ) {
    for (const element of elements) {
      this.validateElement(element, errors, warnings);

      if (Array.isArray(element.children)) {
        this.validateSections(element.children, errors, warnings);
      }
    }
  }

  /**
   * Validate a single element
   */
  private static validateElement(
    element: UIElement,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ) {
    // Check required fields
    if (!element.id) {
      warnings.push({
        type: "missing",
        message: "Element is missing an 'id' field",
        element,
      });
    }

    if (!element.type) {
      errors.push({
        type: "structure",
        message: "Element is missing a 'type' field",
        element,
      });
      return;
    }

    // Check if component exists
    const componentExists = componentRegistry.exists(element.type);
    if (!componentExists && !this.isHTMLElement(element.type)) {
      errors.push({
        type: "component",
        message: `Component '${element.type}' is not registered`,
        element,
      });
    }

    // Validate props
    if (element.props) {
      this.validateProps(element, errors, warnings);
    }

    // Validate children
    if (element.children !== undefined) {
      if (
        typeof element.children !== "string" &&
        !Array.isArray(element.children)
      ) {
        errors.push({
          type: "structure",
          message: "Element 'children' must be a string or array",
          element,
          field: "children",
        });
      }
    }
  }

  /**
   * Validate element props
   */
  private static validateProps(
    element: UIElement,
    errors: ValidationError[],
    warnings: ValidationWarning[]
  ) {
    const registered = componentRegistry.get(element.type);

    if (!registered) {
      return; // Already reported as missing component
    }

    // Check required props
    for (const input of registered.inputs) {
      if (input.required && !(input.name in (element.props || {}))) {
        warnings.push({
          type: "missing",
          message: `Element '${element.type}' is missing required prop '${input.name}'`,
          element,
        });
      }

      // Type validation
      if (input.name in (element.props || {})) {
        const value = element.props![input.name];
        if (!this.validatePropType(value, input.type)) {
          errors.push({
            type: "props",
            message: `Element '${element.type}' prop '${input.name}' has invalid type (expected ${input.type})`,
            element,
            field: input.name,
          });
        }
      }
    }
  }

  /**
   * Validate prop type
   */
  private static validatePropType(value: any, expectedType: string): boolean {
    switch (expectedType) {
      case "string":
        return typeof value === "string";
      case "number":
        return typeof value === "number";
      case "boolean":
        return typeof value === "boolean";
      case "object":
        return value !== null && typeof value === "object";
      case "array":
        return Array.isArray(value);
      default:
        return true;
    }
  }

  /**
   * Check for unused components
   */
  private static checkUnusedComponents(
    elements: UIElement[],
    warnings: ValidationWarning[]
  ) {
    const usedComponents = new Set<string>();

    const traverse = (els: UIElement[]) => {
      for (const el of els) {
        usedComponents.add(el.type);
        if (Array.isArray(el.children)) {
          traverse(el.children);
        }
      }
    };

    traverse(elements);

    // Check for components that are registered but not used
    for (const registeredComponent of componentRegistry.list()) {
      if (!usedComponents.has(registeredComponent)) {
        // This is just informational, not an issue
      }
    }
  }

  /**
   * Check if a string is a valid HTML element
   */
  private static isHTMLElement(type: string): boolean {
    const htmlElements = new Set([
      "div",
      "span",
      "p",
      "a",
      "button",
      "input",
      "form",
      "section",
      "article",
      "header",
      "footer",
      "nav",
      "main",
      "aside",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "img",
      "video",
      "audio",
      "canvas",
      "svg",
    ]);

    return htmlElements.has(type.toLowerCase());
  }

  /**
   * Generate a test report
   */
  static generateReport(config: any): string {
    const result = this.validate(config);
    let report = `\n${"=".repeat(60)}\n`;
    report += `UI Configuration Validation Report\n`;
    report += `${"=".repeat(60)}\n\n`;

    report += `Status: ${result.isValid ? "✅ VALID" : "❌ INVALID"}\n\n`;

    if (result.errors.length > 0) {
      report += `Errors (${result.errors.length}):\n`;
      report += `${"-".repeat(60)}\n`;
      for (const error of result.errors) {
        report += `• [${error.type}] ${error.message}\n`;
        if (error.element?.id) {
          report += `  Element: ${error.element.id}\n`;
        }
        if (error.field) {
          report += `  Field: ${error.field}\n`;
        }
      }
      report += "\n";
    }

    if (result.warnings.length > 0) {
      report += `Warnings (${result.warnings.length}):\n`;
      report += `${"-".repeat(60)}\n`;
      for (const warning of result.warnings) {
        report += `⚠️ [${warning.type}] ${warning.message}\n`;
      }
      report += "\n";
    }

    report += `${"=".repeat(60)}\n`;

    return report;
  }

  /**
   * Suggest fixes for common issues
   */
  static suggestFixes(config: any): string[] {
    const result = this.validate(config);
    const suggestions: string[] = [];

    for (const error of result.errors) {
      if (error.message.includes("not registered")) {
        suggestions.push(
          `Register the component using: registerComponent("${error.element?.type}", Component)`
        );
      }

      if (error.message.includes("missing an 'id'")) {
        suggestions.push(
          "Add unique 'id' fields to all elements for better tracking"
        );
      }

      if (error.message.includes("children") && error.message.includes("must")) {
        suggestions.push(
          "Ensure 'children' is either a string or array of elements"
        );
      }
    }

    return [...new Set(suggestions)];
  }

  /**
   * Get component usage in configuration
   */
  static getComponentUsage(config: any): Record<string, number> {
    const usage: Record<string, number> = {};

    try {
      const parsed = UIConfigParser.parse(config);

      const traverse = (elements: UIElement[]) => {
        for (const el of elements) {
          usage[el.type] = (usage[el.type] || 0) + 1;
          if (Array.isArray(el.children)) {
            traverse(el.children);
          }
        }
      };

      traverse(parsed.sections);
    } catch {
      // Parsing failed
    }

    return usage;
  }

  /**
   * Test render a configuration (dry run)
   */
  static dryRun(config: any): {
    success: boolean;
    elementsToRender: number;
    errors: string[];
  } {
    const validation = this.validate(config);

    if (!validation.isValid) {
      return {
        success: false,
        elementsToRender: 0,
        errors: validation.errors.map((e) => e.message),
      };
    }

    try {
      const parsed = UIConfigParser.parse(config);
      let count = 0;

      const traverse = (elements: UIElement[]) => {
        for (const el of elements) {
          count++;
          if (Array.isArray(el.children)) {
            traverse(el.children);
          }
        }
      };

      traverse(parsed.sections);

      return {
        success: true,
        elementsToRender: count,
        errors: [],
      };
    } catch (error) {
      return {
        success: false,
        elementsToRender: 0,
        errors: [
          error instanceof Error
            ? error.message
            : "Unknown error during dry run",
        ],
      };
    }
  }
}
