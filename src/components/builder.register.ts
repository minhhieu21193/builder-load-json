"use client";

import { builder } from "@builder.io/react";
import { registerComponent } from "@/lib/componentRegistry";
import DynamicSection from "./DynamicSection";
import {
  Button,
  Card,
  HeroSection,
  Container,
  Grid,
  Text,
  Badge,
} from "./CustomComponents";

// Register custom component with Builder.io
builder.registerComponent(DynamicSection, {
  name: "DynamicSection",
  inputs: [
    { name: "title", type: "string" },
    { name: "config", type: "object" },
  ],
});

// Register components in the component registry for UIRenderer
registerComponent(
  "Button",
  Button,
  [
    { name: "text", type: "string" },
    { name: "variant", type: "string" },
    { name: "size", type: "string" },
    { name: "onClick", type: "object" },
  ],
  "Reusable button component"
);

registerComponent(
  "Card",
  Card,
  [
    { name: "title", type: "string" },
    { name: "description", type: "string" },
    { name: "image", type: "string" },
  ],
  "Card component with optional image and title"
);

registerComponent(
  "HeroSection",
  HeroSection,
  [
    { name: "title", type: "string" },
    { name: "subtitle", type: "string" },
    { name: "backgroundImage", type: "string" },
    { name: "backgroundColor", type: "string" },
  ],
  "Hero section with background image or color"
);

registerComponent(
  "Container",
  Container,
  [
    { name: "maxWidth", type: "string" },
    { name: "padding", type: "string" },
  ],
  "Container component with max-width constraint"
);

registerComponent(
  "Grid",
  Grid,
  [
    { name: "columns", type: "number" },
    { name: "gap", type: "string" },
  ],
  "Grid layout component"
);

registerComponent(
  "Text",
  Text,
  [
    { name: "variant", type: "string" },
  ],
  "Text component with variants (h1-h4, body, small)"
);

registerComponent(
  "Badge",
  Badge,
  [
    { name: "text", type: "string" },
    { name: "variant", type: "string" },
  ],
  "Badge component with various styles"
);
