"use client";

import { useCallback, useState } from "react";
import { UIConfig } from "@/lib/uiConfig";
import { componentRegistry } from "@/lib/componentRegistry";

interface UseUIConfigResult {
  config: UIConfig | null;
  isLoading: boolean;
  error: Error | null;
  registeredComponents: string[];
  validateConfig: (config: UIConfig) => boolean;
  refreshConfig: () => Promise<void>;
}

/**
 * Hook to manage UI configuration state and validation
 */
export function useUIConfig(initialConfig?: UIConfig | null): UseUIConfigResult {
  const [config, setConfig] = useState<UIConfig | null>(initialConfig || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const registeredComponents = componentRegistry.list();

  const validateConfig = useCallback((cfg: UIConfig): boolean => {
    try {
      if (!cfg.version || !cfg.name || !Array.isArray(cfg.sections)) {
        throw new Error("Invalid configuration structure");
      }

      if (cfg.sections.length === 0) {
        throw new Error("Configuration must have at least one section");
      }

      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      return false;
    }
  }, []);

  const refreshConfig = useCallback(async () => {
    // This would typically refetch the configuration from a source
    // Implementation depends on application needs
  }, []);

  return {
    config,
    isLoading,
    error,
    registeredComponents,
    validateConfig,
    refreshConfig,
  };
}

/**
 * Hook to track which components are used in configuration
 */
export function useComponentAnalysis(config: UIConfig | null) {
  const [usedComponents, setUsedComponents] = useState<Set<string>>(
    new Set()
  );

  const analyzeComponents = useCallback((cfg: UIConfig) => {
    const components = new Set<string>();

    const traverse = (elements: any[]) => {
      for (const element of elements) {
        if (element.type) {
          components.add(element.type);
        }

        if (Array.isArray(element.children)) {
          traverse(element.children);
        }
      }
    };

    traverse(cfg.sections);
    setUsedComponents(components);
  }, []);

  return {
    usedComponents: Array.from(usedComponents),
    analyzeComponents,
  };
}

/**
 * Hook to get component metadata and inputs
 */
export function useComponentMetadata(componentName: string) {
  const registeredComponent = componentRegistry.get(componentName);

  return {
    exists: !!registeredComponent,
    inputs: registeredComponent?.inputs || [],
    description: registeredComponent?.description,
    component: registeredComponent?.component,
  };
}
