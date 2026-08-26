import type { Metadata } from 'next';
import { LanguageProvider } from './context/LanguageContext';
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
      <head>
        {/* 🔍 搜索引擎验证标签 - 请将 YOUR_GOOGLE_VERIFICATION_CODE 替换为 Google Search Console 提供的验证码
            例如: <meta name="google-site-verification" content="abc123xyz..." />
        */}
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
