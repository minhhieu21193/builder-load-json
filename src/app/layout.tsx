import "@/components/builder.register";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="max-w-3xl mx-auto py-10">{children}</body>
    </html>
  );
}

