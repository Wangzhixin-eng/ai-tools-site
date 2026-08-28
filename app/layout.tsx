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
        {/* 🔍 搜索引擎验证标签
            百度搜索资源平台: https://ziyuan.baidu.com/
            请将下面的 YOUR_BAIDU_VERIFICATION_CODE 替换为百度搜索资源平台提供的验证码

            360搜索站长平台: https://zhanzhang.so.com/
            请将下面的 YOUR_360_VERIFICATION_CODE 替换为360搜索站长平台提供的验证码
        */}
        {/* <meta name="baidu-site-verification" content="YOUR_BAIDU_VERIFICATION_CODE" /> */}
        {/* <meta name="360-site-verification" content="YOUR_360_VERIFICATION_CODE" /> */}
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
