import Link from 'next/link';
import { notFound } from 'next/navigation';
import { aiTools } from '../../../data/tools';
import ToolCard from '../../../components/ToolCard';

const BASE_PATH = '/ai-tools-site';

const categoryInfo: Record<string, { name: string; nameCn: string; emoji: string; desc: string; descCn: string }> = {
  chatbot: { name: 'Chat & AI', nameCn: '聊天AI', emoji: '💬', desc: 'Conversational AI and chatbots', descCn: '对话AI与聊天机器人' },
  image: { name: 'Image Generation', nameCn: '图像生成', emoji: '🎨', desc: 'AI image generation and editing', descCn: 'AI图像生成与编辑' },
  video: { name: 'Video & Animation', nameCn: '视频动画', emoji: '🎬', desc: 'AI video creation and editing', descCn: 'AI视频创作与剪辑' },
  audio: { name: 'Audio & Music', nameCn: '音频音乐', emoji: '🎵', desc: 'AI audio and music generation', descCn: 'AI音频与音乐生成' },
  code: { name: 'Code & Dev', nameCn: '编程开发', emoji: '💻', desc: 'AI coding assistants and dev tools', descCn: 'AI编程助手与开发工具' },
  productivity: { name: 'Productivity', nameCn: '效率工具', emoji: '⚡', desc: 'AI productivity and automation tools', descCn: 'AI效率与自动化工具' },
  design: { name: 'Design & UI', nameCn: '设计UI', emoji: '🎯', desc: 'AI design and UI tools', descCn: 'AI设计与UI工具' },
  writing: { name: 'Writing & Text', nameCn: '写作文本', emoji: '✍️', desc: 'AI writing and text tools', descCn: 'AI写作与文本工具' },
};

export async function generateStaticParams() {
  return Object.keys(categoryInfo).map(id => ({ id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { id } = await params;
  const info = categoryInfo[id];

  if (!info) {
    notFound();
  }

  const tools = aiTools.filter(t => t.category === id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-purple-600 dark:text-purple-400">AIHub</Link>
          <nav className="flex gap-6">
            <Link href="/" className="text-gray-600 dark:text-gray-300 text-sm">Home · 首页</Link>
            <Link href="/categories" className="text-gray-600 dark:text-gray-300 text-sm">Categories · 分类</Link>
            <Link href="/featured" className="text-gray-600 dark:text-gray-300 text-sm">Featured · 精选</Link>
            <Link href="/new" className="text-gray-600 dark:text-gray-300 text-sm">New · 最新</Link>
          </nav>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/categories" className="hover:text-purple-600">Categories</Link>
          <span>›</span>
          <span className="text-purple-600">{info.name}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-8">
        <div className="text-5xl mb-4">{info.emoji}</div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{info.name}</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{info.nameCn} · {info.descCn}</p>
        <p className="text-gray-400 text-sm mt-1">{info.desc}</p>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="flex gap-6 text-sm">
          <span className="text-purple-600 dark:text-purple-400 font-medium">{tools.length} tools in this category</span>
          <span className="text-gray-500">Browse all {info.nameCn} tools</span>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {tools.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">{info.emoji}</div>
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">Coming soon!</h3>
            <p className="text-gray-500 mt-2">We are adding {info.nameCn} tools right now</p>
            <Link href="/categories" className="inline-block mt-6 bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition">
              Browse other categories →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map(tool => (
              <ToolCard key={tool.id} tool={tool} basePath={BASE_PATH} />
            ))}
          </div>
        )}
      </div>

      {/* Other Categories */}
      <div className="bg-gray-50 dark:bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Explore more categories</h3>
          <div className="flex flex-wrap gap-3">
            {Object.entries(categoryInfo)
              .filter(([catId]) => catId !== id)
              .map(([catId, cat]) => (
                <Link key={catId} href={`/categories/${catId}`}>
                  <span className="inline-flex items-center gap-2 bg-white dark:bg-gray-700 px-4 py-2 rounded-full text-sm text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900 transition cursor-pointer">
                    {cat.emoji} {cat.name}
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center">
        <p className="text-sm">© 2026 AIHub · AI Tools Navigator · AI工具精选导航</p>
      </footer>
    </div>
  );
}
