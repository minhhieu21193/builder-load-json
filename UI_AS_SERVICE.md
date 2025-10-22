# UI as a Service (UIaaS) - Complete Guide

This project implements a **UI as a Service** system using Builder.io and jsonbin.io, allowing you to manage and render dynamic UI configurations from a remote JSON source.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│           jsonbin.io (Configuration Storage)             │
│  Stores UI layouts, components, and configuration data   │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ HTTP Request (fetch)
                 │
┌────────────────▼────────────────────────────────────────┐
│  Next.js Server (src/app/page.tsx)                       │
│  - Fetches config from jsonbin.io                        │
│  - Passes config to client components                    │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ Props & Hydration
                 │
┌────────────────▼────────────────────────────────────────┐
│  BuilderPageClient (React Client Component)              │
│  - Validates configuration                               │
│  - Routes to UIRenderer or Builder.io                    │
└────────────────┬────────────────────────────────────────┘
                 │
    ┌────────────┴────────────┐
    │                         │
┌───▼──────────────┐  ┌───────▼──────────────┐
│   UIRenderer      │  │  Builder.io Content  │
│  (Custom Config)  │  │   (if available)     │
└───┬──────────────┘  └──────────────────────┘
    │
┌───▼──────────────────────────────────────────┐
│  Component Registry & Renderer                 │
│  - Button, Card, HeroSection, etc.            │
│  - Custom registered components               │
│  - Error handling & fallback rendering        │
└──────────────────────────────────────────────┘
```

## Configuration Structure

A valid UI configuration JSON should have the following structure:

```json
{
  "version": "1.0.0",
  "name": "My App UI",
  "description": "Dynamic UI configuration",
  "sections": [
    {
      "id": "hero-section",
      "type": "HeroSection",
      "props": {
        "title": "Welcome to My App",
        "subtitle": "Build amazing UIs dynamically",
        "backgroundColor": "#3b82f6"
      },
      "children": []
    },
    {
      "id": "features-grid",
      "type": "Container",
      "props": {
        "maxWidth": "1200px",
        "padding": "40px 20px"
      },
      "children": [
        {
          "id": "feature-1",
          "type": "Card",
          "props": {
            "title": "Feature 1",
            "description": "Amazing feature description",
            "image": "https://via.placeholder.com/400x300"
          }
        },
        {
          "id": "feature-2",
          "type": "Card",
          "props": {
            "title": "Feature 2",
            "description": "Another great feature",
            "image": "https://via.placeholder.com/400x300"
          }
        }
      ]
    }
  ],
  "metadata": {}
}
```

## Available Components

### 1. **Button**
Reusable button component with variants and sizes.

```json
{
  "type": "Button",
  "props": {
    "text": "Click Me",
    "variant": "primary",
    "size": "md"
  }
}
```

**Props:**
- `text` (string): Button label
- `variant` (string): "primary" | "secondary" | "danger"
- `size` (string): "sm" | "md" | "lg"
- `onClick` (function): Click handler

### 2. **Card**
Display content in a card layout with optional image.

```json
{
  "type": "Card",
  "props": {
    "title": "Card Title",
    "description": "Card description",
    "image": "https://example.com/image.jpg"
  }
}
```

**Props:**
- `title` (string): Card title
- `description` (string): Card description
- `image` (string): Image URL

### 3. **HeroSection**
Large banner section with background image or color.

```json
{
  "type": "HeroSection",
  "props": {
    "title": "Welcome",
    "subtitle": "Subtitle here",
    "backgroundColor": "#3b82f6"
  }
}
```

**Props:**
- `title` (string): Main heading
- `subtitle` (string): Subheading
- `backgroundColor` (string): Background color
- `backgroundImage` (string): Background image URL

### 4. **Container**
Wrapper component with max-width constraint.

```json
{
  "type": "Container",
  "props": {
    "maxWidth": "1200px",
    "padding": "20px"
  }
}
```

**Props:**
- `maxWidth` (string): Maximum width CSS value
- `padding` (string): Padding CSS value

### 5. **Grid**
CSS Grid layout component.

```json
{
  "type": "Grid",
  "props": {
    "columns": 3,
    "gap": "20px"
  }
}
```

**Props:**
- `columns` (number): Number of grid columns
- `gap` (string): Gap between items

### 6. **Text**
Semantic text component with heading variants.

```json
{
  "type": "Text",
  "props": {
    "variant": "h1"
  },
  "children": "Hello World"
}
```

**Props:**
- `variant` (string): "h1" | "h2" | "h3" | "h4" | "body" | "small"

### 7. **Badge**
Label component with style variants.

```json
{
  "type": "Badge",
  "props": {
    "text": "New",
    "variant": "success"
  }
}
```

**Props:**
- `text` (string): Badge text
- `variant` (string): "default" | "success" | "warning" | "error" | "info"

### 8. **DynamicSection**
Custom component for advanced rendering.

```json
{
  "type": "DynamicSection",
  "props": {
    "title": "Section Title",
    "config": {
      "heroBanner": {
        "image": "https://example.com/image.jpg",
        "headline": "Headline"
      },
      "sections": []
    }
  }
}
```

## Setup Instructions

### Step 1: Prepare Your jsonbin Configuration

1. Go to [jsonbin.io](https://jsonbin.io)
2. Create a new bin with your UI configuration (see Configuration Structure above)
3. Copy the bin URL and bin ID
4. Note the API format: `https://api.jsonbin.io/v3/b/{BIN_ID}`

### Step 2: Update Environment Variables

Set the following environment variables in your deployment or local `.env.local`:

```
NEXT_PUBLIC_BUILDER_API_KEY=your_builder_api_key
JSON_CONFIG_URL=https://api.jsonbin.io/v3/b/YOUR_BIN_ID
NEXT_PUBLIC_BUILDER_PUBLIC_API_KEY=your_builder_api_key
```

### Step 3: Deploy

The application will automatically:
1. Fetch configuration from jsonbin.io
2. Parse and validate the configuration
3. Render components using the registered component system
4. Fall back to Builder.io content if no valid configuration is found

## Component Registration

### Registering Custom Components

To register a custom React component for use in configurations:

```typescript
import { registerComponent } from "@/lib/componentRegistry";
import MyCustomComponent from "@/components/MyCustomComponent";

registerComponent(
  "MyCustomComponent",
  MyCustomComponent,
  [
    { name: "title", type: "string" },
    { name: "onClick", type: "object" },
  ],
  "Custom component description"
);
```

Then use it in your configuration:

```json
{
  "type": "MyCustomComponent",
  "props": {
    "title": "Hello"
  }
}
```

## Error Handling

The system includes comprehensive error handling:

- **Invalid configurations**: Falls back to Builder.io content
- **Component not found**: Renders error boundary with helpful message
- **Rendering errors**: Displays error message in red box
- **Network errors**: Logs to console and uses fallback

## API Reference

### UIRenderer Component

```typescript
<UIRenderer 
  config={uiConfig}
  onError={(error) => console.error(error)}
/>
```

### Component Registry

```typescript
// Register component
registerComponent(name, component, inputs, description);

// Get component
componentRegistry.get("ButtonComponent");

// List all components
componentRegistry.list();
```

### UI Config Parser

```typescript
// Parse configuration
const config = UIConfigParser.parse(jsonData);

// Validate configuration
const isValid = UIConfigParser.validate(config);

// Merge configurations
const merged = UIConfigParser.merge(config1, config2);

// Fetch from URL
const config = await fetchUIConfig(url);
```

## Advanced Features

### Nested Children

Components can have nested children:

```json
{
  "type": "Container",
  "props": {
    "maxWidth": "1200px"
  },
  "children": [
    {
      "type": "Text",
      "props": { "variant": "h1" },
      "children": "Title"
    },
    {
      "type": "Button",
      "props": { "text": "Click" }
    }
  ]
}
```

### Custom Styling

Each element supports:
- `className`: Tailwind CSS classes
- `style`: Inline CSS object
- `props`: Component-specific props

```json
{
  "type": "Button",
  "className": "my-custom-class",
  "style": {
    "backgroundColor": "#ff0000",
    "padding": "10px 20px"
  },
  "props": {
    "text": "Styled Button"
  }
}
```

### Metadata

Store custom data in metadata for application use:

```json
{
  "version": "1.0.0",
  "name": "My Config",
  "sections": [],
  "metadata": {
    "theme": "dark",
    "version": "2.0",
    "author": "Your Name",
    "customData": {}
  }
}
```

## Troubleshooting

### Configuration not loading

1. Check the `JSON_CONFIG_URL` environment variable
2. Verify jsonbin.io accessibility
3. Ensure configuration has valid structure
4. Check browser console for errors

### Components not rendering

1. Verify component name matches exactly (case-sensitive)
2. Check component is registered before use
3. Ensure component props match expected types
4. Review error messages in red error boxes

### Performance optimization

1. Use nested configuration to reduce HTTP requests
2. Cache configurations at build time when possible
3. Minimize configuration file size
4. Use CDN for image URLs in props

## File Structure

```
src/
├── app/
│   ├── globals.css           # Styles for UI components
│   ├── layout.tsx            # Root layout with Builder registration
│   └── page.tsx              # Server component that fetches config
├── components/
│   ├── BuilderPageClient.tsx # Main client component
│   ├── CustomComponents.tsx  # Built-in components (Button, Card, etc.)
│   ├── DynamicSection.tsx    # Custom dynamic section component
│   ├── UIRenderer.tsx        # Main renderer for configurations
│   └── builder.register.ts   # Builder.io and component registry setup
└── lib/
    ├── builder.ts            # Builder.io configuration
    ├── componentRegistry.ts  # Component registration system
    └── uiConfig.ts          # Configuration types and parser
```

## Example Configurations

See `example-configs/` directory for complete working examples:
- `landing-page.json`: Full landing page with hero, features, and CTA
- `dashboard.json`: Dashboard layout with cards and grid
- `product-showcase.json`: Product showcase with images and descriptions

## Performance Considerations

- **Build-time fetching**: Configurations are fetched at request time (no caching by default)
- **Component registry**: Registers happen once at app startup via builder.register.ts
- **Lazy rendering**: Components render only when included in configuration
- **Error boundaries**: Bad components don't crash entire page

## Security Notes

- Configurations are fetched from untrusted sources (jsonbin.io)
- All user input should be sanitized before rendering
- XSS prevention: React automatically escapes string values
- CORS headers must be set correctly on jsonbin.io

## License

This UIaaS implementation is part of your application. All custom components and utilities are available for extension and modification.
