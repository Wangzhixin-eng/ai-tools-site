import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AIHub - Discover the Best AI Tools | AI工具精选导航',
  description: 'Explore and discover the best AI tools in 2026. Comprehensive reviews, ratings, and comparisons of ChatGPT, Midjourney, Claude, and more AI tools. | 探索2026年最佳AI工具。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
