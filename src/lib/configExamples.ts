import { ConfigBuilder } from "./configManager";
import { UIConfig } from "./uiConfig";

/**
 * Pre-built example configurations for quick start and testing
 */
export const ConfigExamples = {
  /**
   * Simple landing page
   */
  simpleLandingPage: (): UIConfig => {
    return new ConfigBuilder("Simple Landing Page", "1.0.0")
      .setDescription("A minimal landing page example")
      .addHeroSection(
        "Welcome to My App",
        "This is a simple landing page built with UIaaS",
        "#3b82f6"
      )
      .addContainer(
        [
          {
            id: "content-text",
            type: "Text",
            props: { variant: "body" },
            children: "This is your content area. Edit the configuration to customize it.",
          },
        ],
        "800px",
        "40px 20px"
      )
      .build();
  },

  /**
   * Feature showcase page
   */
  featureShowcase: (): UIConfig => {
    return new ConfigBuilder("Feature Showcase", "1.0.0")
      .setDescription("Showcase your features")
      .addHeroSection(
        "Our Amazing Features",
        "Discover what makes us special",
        "#6366f1"
      )
      .addContainer(
        [
          {
            id: "features-grid",
            type: "Grid",
            props: { columns: 3, gap: "20px" },
            children: [
              {
                id: "feature-1",
                type: "Card",
                props: {
                  title: "Feature One",
                  description: "Amazing feature description",
                  image: "https://via.placeholder.com/400x300/3b82f6/ffffff?text=Feature+1",
                },
              },
              {
                id: "feature-2",
                type: "Card",
                props: {
                  title: "Feature Two",
                  description: "Another great feature",
                  image: "https://via.placeholder.com/400x300/10b981/ffffff?text=Feature+2",
                },
              },
              {
                id: "feature-3",
                type: "Card",
                props: {
                  title: "Feature Three",
                  description: "Yet another amazing feature",
                  image: "https://via.placeholder.com/400x300/f59e0b/ffffff?text=Feature+3",
                },
              },
            ],
          },
        ],
        "1200px",
        "60px 20px"
      )
      .build();
  },

  /**
   * Dashboard with metrics
   */
  dashboard: (): UIConfig => {
    return new ConfigBuilder("Dashboard", "1.0.0")
      .setDescription("Admin dashboard with metrics")
      .addContainer(
        [
          {
            id: "header",
            type: "Text",
            props: { variant: "h1" },
            children: "Dashboard",
          },
        ],
        "100%",
        "20px 40px"
      )
      .addContainer(
        [
          {
            id: "stats-grid",
            type: "Grid",
            props: { columns: 4, gap: "20px" },
            children: [
              {
                id: "stat-users",
                type: "Card",
                props: {
                  title: "Total Users",
                  description: "12,543 active users",
                },
              },
              {
                id: "stat-revenue",
                type: "Card",
                props: {
                  title: "Revenue",
                  description: "$45,230 this month",
                },
              },
              {
                id: "stat-conversions",
                type: "Card",
                props: {
                  title: "Conversion",
                  description: "3.24% average",
                },
              },
              {
                id: "stat-growth",
                type: "Card",
                props: {
                  title: "Growth",
                  description: "+12.5% MoM",
                },
              },
            ],
          },
        ],
        "1400px",
        "40px 20px"
      )
      .build();
  },

  /**
   * Product catalog
   */
  productCatalog: (): UIConfig => {
    return new ConfigBuilder("Product Catalog", "1.0.0")
      .setDescription("Browse our products")
      .addHeroSection(
        "Our Products",
        "Find the perfect solution for your needs",
        "#ec4899"
      )
      .addContainer(
        [
          {
            id: "products-grid",
            type: "Grid",
            props: { columns: 3, gap: "20px" },
            children: [
              {
                id: "product-1",
                type: "Card",
                props: {
                  title: "Product 1",
                  description: "High-quality product with great features",
                  image:
                    "https://via.placeholder.com/400x300/ec4899/ffffff?text=Product+1",
                },
              },
              {
                id: "product-2",
                type: "Card",
                props: {
                  title: "Product 2",
                  description: "Premium solution for professionals",
                  image:
                    "https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Product+2",
                },
              },
              {
                id: "product-3",
                type: "Card",
                props: {
                  title: "Product 3",
                  description: "Best value for money",
                  image:
                    "https://via.placeholder.com/400x300/06b6d4/ffffff?text=Product+3",
                },
              },
            ],
          },
        ],
        "1200px",
        "60px 20px"
      )
      .build();
  },

  /**
   * Blog post template
   */
  blogPost: (): UIConfig => {
    return new ConfigBuilder("Blog Post", "1.0.0")
      .setDescription("A blog post template")
      .addContainer(
        [
          {
            id: "blog-title",
            type: "Text",
            props: { variant: "h1" },
            children: "Article Title Goes Here",
          },
          {
            id: "blog-meta",
            type: "Text",
            props: { variant: "small" },
            className: "text-gray-500",
            children: "Published on January 1, 2024 • 5 min read",
          },
        ],
        "800px",
        "40px 20px"
      )
      .addContainer(
        [
          {
            id: "blog-image",
            type: "div",
            children: [],
            style: {
              backgroundImage:
                "url('https://via.placeholder.com/800x400')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "400px",
              borderRadius: "8px",
              marginBottom: "40px",
            },
          },
        ],
        "800px",
        "0 20px"
      )
      .addContainer(
        [
          {
            id: "blog-content",
            type: "Text",
            props: { variant: "body" },
            children:
              "Your blog post content goes here. This is a simple template that you can customize.",
          },
        ],
        "800px",
        "0 20px 40px"
      )
      .build();
  },

  /**
   * Minimal contact form page
   */
  contactForm: (): UIConfig => {
    return new ConfigBuilder("Contact Us", "1.0.0")
      .setDescription("Simple contact page")
      .addHeroSection(
        "Get in Touch",
        "We would love to hear from you",
        "#10b981"
      )
      .addContainer(
        [
          {
            id: "form-container",
            type: "div",
            props: {
              style: {
                maxWidth: "600px",
                margin: "0 auto",
                backgroundColor: "#f9fafb",
                padding: "40px",
                borderRadius: "8px",
              },
            },
            children: [
              {
                id: "form-title",
                type: "Text",
                props: { variant: "h2" },
                className: "mb-4",
                children: "Contact Form",
              },
              {
                id: "form-description",
                type: "Text",
                props: { variant: "body" },
                className: "mb-6 text-gray-600",
                children: "Fill out the form below and we will get back to you soon.",
              },
              {
                id: "submit-button",
                type: "Button",
                props: {
                  text: "Send Message",
                  variant: "primary",
                  size: "lg",
                },
              },
            ],
          },
        ],
        "1200px",
        "60px 20px"
      )
      .build();
  },

  /**
   * Testimonials page
   */
  testimonials: (): UIConfig => {
    return new ConfigBuilder("Testimonials", "1.0.0")
      .setDescription("Customer testimonials")
      .addHeroSection(
        "What Our Customers Say",
        "Hear from our satisfied clients",
        "#f59e0b"
      )
      .addContainer(
        [
          {
            id: "testimonials-grid",
            type: "Grid",
            props: { columns: 3, gap: "20px" },
            children: [
              {
                id: "testimonial-1",
                type: "Card",
                props: {
                  title: "John Doe",
                  description:
                    "Amazing product! It completely transformed my business.",
                },
              },
              {
                id: "testimonial-2",
                type: "Card",
                props: {
                  title: "Jane Smith",
                  description:
                    "The best investment we made. Highly recommended!",
                },
              },
              {
                id: "testimonial-3",
                type: "Card",
                props: {
                  title: "Bob Johnson",
                  description:
                    "Outstanding support and fantastic product quality.",
                },
              },
            ],
          },
        ],
        "1200px",
        "60px 20px"
      )
      .build();
  },

  /**
   * Pricing page
   */
  pricing: (): UIConfig => {
    return new ConfigBuilder("Pricing", "1.0.0")
      .setDescription("Pricing plans")
      .addHeroSection(
        "Simple Transparent Pricing",
        "Choose the perfect plan for your needs",
        "#6366f1"
      )
      .addContainer(
        [
          {
            id: "pricing-grid",
            type: "Grid",
            props: { columns: 3, gap: "20px" },
            children: [
              {
                id: "plan-starter",
                type: "Card",
                props: {
                  title: "Starter",
                  description: "Perfect for getting started • $9/month",
                },
              },
              {
                id: "plan-professional",
                type: "Card",
                props: {
                  title: "Professional",
                  description: "For growing teams • $29/month",
                },
              },
              {
                id: "plan-enterprise",
                type: "Card",
                props: {
                  title: "Enterprise",
                  description: "For large organizations • Custom pricing",
                },
              },
            ],
          },
        ],
        "1200px",
        "60px 20px"
      )
      .build();
  },
};

/**
 * Get all available example names
 */
export function getExampleNames(): string[] {
  return Object.keys(ConfigExamples);
}

/**
 * Get an example configuration by name
 */
export function getExample(
  name: keyof typeof ConfigExamples
): UIConfig | null {
  const example = ConfigExamples[name];
  return typeof example === "function" ? example() : null;
}

/**
 * List all examples with descriptions
 */
export function listExamples(): Array<{
  name: string;
  description: string;
}> {
  return [
    { name: "simpleLandingPage", description: "A minimal landing page" },
    { name: "featureShowcase", description: "Feature showcase page" },
    { name: "dashboard", description: "Admin dashboard with metrics" },
    { name: "productCatalog", description: "Product catalog with grid" },
    { name: "blogPost", description: "Blog post template" },
    { name: "contactForm", description: "Simple contact form page" },
    { name: "testimonials", description: "Customer testimonials" },
    { name: "pricing", description: "Pricing plans page" },
  ];
}
