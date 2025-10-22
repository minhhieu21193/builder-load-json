# UIaaS Quick Start Guide

## 5-Minute Setup

### 1. Prepare Your jsonbin Configuration

1. Visit [jsonbin.io](https://jsonbin.io)
2. Create a new bin and paste this configuration:

```json
{
  "version": "1.0.0",
  "name": "My First App",
  "description": "My first UI as a Service application",
  "sections": [
    {
      "id": "hero",
      "type": "HeroSection",
      "props": {
        "title": "Welcome to UI as a Service",
        "subtitle": "Build dynamic UIs without redeployment",
        "backgroundColor": "#3b82f6"
      }
    },
    {
      "id": "features",
      "type": "Container",
      "props": {
        "maxWidth": "1200px",
        "padding": "60px 20px"
      },
      "children": [
        {
          "id": "feature-1",
          "type": "Card",
          "props": {
            "title": "Feature One",
            "description": "This is the first feature"
          }
        },
        {
          "id": "feature-2",
          "type": "Card",
          "props": {
            "title": "Feature Two",
            "description": "This is the second feature"
          }
        }
      ]
    }
  ]
}
```

3. Copy the bin ID from the URL (format: `https://api.jsonbin.io/v3/b/{BIN_ID}`)

### 2. Set Environment Variable

Update your environment variables with the jsonbin URL:

```
JSON_CONFIG_URL=https://api.jsonbin.io/v3/b/{YOUR_BIN_ID}
```

Note: The other environment variables are already set:
- `NEXT_PUBLIC_BUILDER_API_KEY=d4e3023c11fe4b818e84d27ea547b4b3`
- `NEXT_PUBLIC_BUILDER_PUBLIC_API_KEY=d4e3023c11fe4b818e84d27ea547b4b3`

### 3. Access the Application

The application will automatically:
1. Fetch your configuration from jsonbin.io
2. Validate the configuration structure
3. Render your UI using the registered components
4. Display helpful error messages if something goes wrong

## Using Different Components

### Hero Section
```json
{
  "type": "HeroSection",
  "props": {
    "title": "Main Title",
    "subtitle": "Subtitle text",
    "backgroundColor": "#3b82f6"
  }
}
```

### Card
```json
{
  "type": "Card",
  "props": {
    "title": "Card Title",
    "description": "Card description text",
    "image": "https://via.placeholder.com/400x300"
  }
}
```

### Button
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

### Grid Layout
```json
{
  "type": "Grid",
  "props": {
    "columns": 3,
    "gap": "20px"
  },
  "children": [
    { "type": "Card", "props": { "title": "Item 1" } },
    { "type": "Card", "props": { "title": "Item 2" } },
    { "type": "Card", "props": { "title": "Item 3" } }
  ]
}
```

### Container with Max Width
```json
{
  "type": "Container",
  "props": {
    "maxWidth": "1200px",
    "padding": "40px 20px"
  },
  "children": [
    { "type": "Text", "props": { "variant": "h1" }, "children": "Title" }
  ]
}
```

## Complete Example

Here's a complete configuration file you can use:

```json
{
  "version": "1.0.0",
  "name": "Landing Page",
  "description": "Professional landing page",
  "sections": [
    {
      "id": "hero-section",
      "type": "HeroSection",
      "props": {
        "title": "Welcome to Our Service",
        "subtitle": "Build amazing things with UI as a Service",
        "backgroundColor": "#3b82f6"
      }
    },
    {
      "id": "features-container",
      "type": "Container",
      "props": {
        "maxWidth": "1200px",
        "padding": "60px 20px"
      },
      "children": [
        {
          "id": "features-title",
          "type": "Text",
          "props": { "variant": "h2" },
          "children": "Our Features"
        },
        {
          "id": "features-grid",
          "type": "Grid",
          "props": { "columns": 3, "gap": "20px" },
          "children": [
            {
              "id": "feature-1",
              "type": "Card",
              "props": {
                "title": "Dynamic Rendering",
                "description": "Update your UI without redeployment"
              }
            },
            {
              "id": "feature-2",
              "type": "Card",
              "props": {
                "title": "Component Registry",
                "description": "Register and reuse components easily"
              }
            },
            {
              "id": "feature-3",
              "type": "Card",
              "props": {
                "title": "Builder.io Integration",
                "description": "Use Builder.io for visual editing"
              }
            }
          ]
        }
      ]
    },
    {
      "id": "cta-section",
      "type": "HeroSection",
      "props": {
        "title": "Ready to Get Started?",
        "subtitle": "Join thousands of developers",
        "backgroundColor": "#10b981"
      }
    }
  ]
}
```

## File Structure

```
src/
├── components/
│   ├── BuilderPageClient.tsx    # Main client component
│   ├── UIRenderer.tsx            # Renders configurations
│   ├── CustomComponents.tsx      # Button, Card, HeroSection, etc.
│   └── builder.register.ts       # Component registration
├── lib/
│   ├── componentRegistry.ts      # Component registration system
│   ├── uiConfig.ts              # Configuration types & parser
│   └── configManager.ts         # Configuration management utilities
└── hooks/
    └── useUIConfig.ts            # React hooks for configuration
```

## Common Issues & Solutions

### Configuration not loading?
- Check the `JSON_CONFIG_URL` environment variable
- Ensure jsonbin.io is accessible
- Verify the configuration JSON is valid

### Components not showing?
- Check component name matches exactly (case-sensitive)
- Verify the `type` field in your configuration
- See error messages in red boxes for details

### Want to modify the layout?
1. Edit your jsonbin configuration
2. Save the changes
3. Refresh the page
4. New layout will load automatically

## Advanced Usage

### Programmatic Configuration Creation

```typescript
import { ConfigBuilder } from '@/lib/configManager';

const config = new ConfigBuilder('My App', '1.0.0')
  .setDescription('My custom application')
  .addHeroSection('Welcome', 'Subtitle here', '#3b82f6')
  .addContainer(
    [
      {
        id: 'card-1',
        type: 'Card',
        props: { title: 'Feature' }
      }
    ],
    '1200px',
    '40px 20px'
  )
  .build();

console.log(config.toJSON());
```

### Register Custom Component

```typescript
import { registerComponent } from '@/lib/componentRegistry';
import MyComponent from '@/components/MyComponent';

registerComponent(
  'MyComponent',
  MyComponent,
  [{ name: 'title', type: 'string' }],
  'My custom component'
);
```

## Next Steps

1. **Read the full documentation**: See [UI_AS_SERVICE.md](./UI_AS_SERVICE.md)
2. **Explore example configurations**: Check `example-configs/` folder
3. **Customize components**: Modify components in `src/components/CustomComponents.tsx`
4. **Build your own**: Use `ConfigManager` or `ConfigBuilder` for programmatic creation

## Support & Documentation

- Full documentation: [UI_AS_SERVICE.md](./UI_AS_SERVICE.md)
- Example configurations: `example-configs/` directory
- Component reference: `src/components/CustomComponents.tsx`
- Type definitions: `src/lib/uiConfig.ts`

## Tips for Success

✅ **Start with the landing page example** from `example-configs/landing-page.json`

✅ **Use Container and Grid** to structure your layout

✅ **Leverage nested children** for complex hierarchies

✅ **Test with placeholder images** from `placeholder.com`

✅ **Keep configurations simple** and build incrementally

❌ **Don't forget the `id` field** on each element

❌ **Don't use undefined component types**

❌ **Don't forget the `sections` array** must not be empty

---

Ready? Update your `JSON_CONFIG_URL` and refresh the page! 🚀
