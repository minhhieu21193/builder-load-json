import { ComponentType } from "react";

export interface ComponentInput {
  name: string;
  type: "string" | "number" | "boolean" | "object" | "array";
  defaultValue?: any;
  required?: boolean;
}

export interface RegisteredComponent {
  component: ComponentType<any>;
  inputs: ComponentInput[];
  description?: string;
}

class ComponentRegistry {
  private components = new Map<string, RegisteredComponent>();

  register(
    name: string,
    component: ComponentType<any>,
    inputs: ComponentInput[] = [],
    description?: string
  ) {
    this.components.set(name, {
      component,
      inputs,
      description,
    });
  }

  get(name: string): RegisteredComponent | undefined {
    return this.components.get(name);
  }

  getComponent(name: string): ComponentType<any> | undefined {
    return this.components.get(name)?.component;
  }

  getAll(): Map<string, RegisteredComponent> {
    return new Map(this.components);
  }

  exists(name: string): boolean {
    return this.components.has(name);
  }

  list(): string[] {
    return Array.from(this.components.keys());
  }
}

// Create singleton instance
export const componentRegistry = new ComponentRegistry();

// Export registration helper
export const registerComponent = (
  name: string,
  component: ComponentType<any>,
  inputs?: ComponentInput[],
  description?: string
) => {
  componentRegistry.register(name, component, inputs, description);
};
