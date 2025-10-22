import "@/components/builder.register";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="max-w-3xl mx-auto py-10">{children}</body>
    </html>
  );
}
