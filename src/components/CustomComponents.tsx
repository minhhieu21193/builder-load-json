"use client";

import React from "react";

// Button Component
export function Button({
  text,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: {
  text?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}) {
  const baseStyles =
    "font-semibold rounded-lg transition-colors duration-200 inline-block cursor-pointer";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const finalClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  return (
    <button className={finalClassName} onClick={onClick} {...props}>
      {text || props.children}
    </button>
  );
}

// Card Component
export function Card({
  title,
  description,
  image,
  className = "",
  children,
  ...props
}: {
  title?: string;
  description?: string;
  image?: string;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <div
      className={`border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${className}`}
      {...props}
    >
      {image && (
        <img
          src={image}
          alt={title || "Card"}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
        {description && (
          <p className="text-gray-600 text-sm mb-3">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}

// Hero Section Component
export function HeroSection({
  title,
  subtitle,
  backgroundImage,
  backgroundColor,
  children,
  className = "",
  ...props
}: {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  return (
    <section
      className={`py-20 px-4 text-center ${className}`}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundColor: backgroundColor || "rgb(59, 130, 246)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
      }}
      {...props}
    >
      <div className="max-w-4xl mx-auto">
        {title && (
          <h1 className="text-5xl font-bold mb-4" style={{ color: "white" }}>
            {title}
          </h1>
        )}
        {subtitle && (
          <p className="text-xl mb-6" style={{ color: "rgba(255,255,255,0.9)" }}>
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

// Container Component
export function Container({
  maxWidth = "1200px",
  padding = "20px",
  className = "",
  children,
  ...props
}: {
  maxWidth?: string;
  padding?: string;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <div
      className={`mx-auto ${className}`}
      style={{
        maxWidth,
        padding,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

// Grid Component
export function Grid({
  columns = 3,
  gap = "20px",
  className = "",
  children,
  ...props
}: {
  columns?: number;
  gap?: string;
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <div
      className={`grid ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

// Text Component
export function Text({
  variant = "body",
  children,
  className = "",
  ...props
}: {
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "small";
  children?: React.ReactNode;
  className?: string;
  [key: string]: any;
}) {
  const variantStyles = {
    h1: "text-4xl font-bold",
    h2: "text-3xl font-bold",
    h3: "text-2xl font-semibold",
    h4: "text-xl font-semibold",
    body: "text-base",
    small: "text-sm",
  };

  const Tag = ["h1", "h2", "h3", "h4"].includes(variant)
    ? (variant as keyof JSX.IntrinsicElements)
    : "p";

  return (
    <Tag className={`${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}

// Badge Component
export function Badge({
  text,
  variant = "default",
  className = "",
  ...props
}: {
  text?: string;
  variant?: "default" | "success" | "warning" | "error" | "info";
  className?: string;
  children?: React.ReactNode;
  [key: string]: any;
}) {
  const variantStyles = {
    default: "bg-gray-200 text-gray-900",
    success: "bg-green-100 text-green-900",
    warning: "bg-yellow-100 text-yellow-900",
    error: "bg-red-100 text-red-900",
    info: "bg-blue-100 text-blue-900",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {text || props.children}
    </span>
  );
}
