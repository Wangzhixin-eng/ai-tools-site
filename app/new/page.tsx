import Link from 'next/link';
import { aiTools } from '../../data/tools';
import ToolCard from '../../components/ToolCard';

const BASE_PATH = '/ai-tools-site';

export default function NewPage() {
  const newTools = aiTools.filter(t => t.new);

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
            <Link href="/new" className="text-purple-600 dark:text-purple-400 font-medium text-sm">New · 最新</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="flex items-center gap-3">
          <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">🆕 New</span>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">New AI Tools</h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">最新上线的AI工具 · Fresh tools added recently</p>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="flex gap-8 text-sm">
          <span className="text-green-600 dark:text-green-400 font-medium">🆕 {newTools.length} New Tools</span>
          <span className="text-gray-500">Recently added · 最新添加</span>
        </div>
      </div>

      {/* New Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {newTools.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🚧</div>
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300">More tools coming soon!</h3>
            <p className="text-gray-500 mt-2">We are adding new AI tools every week</p>
            <Link href="/" className="inline-block mt-6 bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition">
              Browse all → 查看全部
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} basePath={BASE_PATH} />
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-purple-600 dark:bg-purple-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold">Stay updated!</h2>
          <p className="text-purple-200 mt-2">Check back regularly for new AI tools</p>
          <Link href="/categories" className="inline-block mt-4 bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-purple-50 transition">
            Browse by Category → 按分类浏览
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center">
        <p className="text-sm">© 2026 AIHub · AI Tools Navigator · AI工具精选导航</p>
      </footer>
    </div>
  );
}
