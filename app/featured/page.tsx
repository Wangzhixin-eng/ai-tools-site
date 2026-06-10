import Link from 'next/link';
import { aiTools } from '../../data/tools';
import ToolCard from '../../components/ToolCard';

export default function FeaturedPage() {
  const featuredTools = aiTools.filter(t => t.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-purple-600 dark:text-purple-400">AIHub</Link>
          <nav className="flex gap-6">
            <Link href="/" className="text-gray-600 dark:text-gray-300 text-sm">Home · 首页</Link>
            <Link href="/categories" className="text-gray-600 dark:text-gray-300 text-sm">Categories · 分类</Link>
            <Link href="/featured" className="text-purple-600 dark:text-purple-400 font-medium text-sm">Featured · 精选</Link>
            <Link href="/new" className="text-gray-600 dark:text-gray-300 text-sm">New · 最新</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">⭐ Featured AI Tools</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">精选AI工具推荐 · Hand-picked by our editors</p>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="flex gap-8 text-sm">
          <span className="text-purple-600 dark:text-purple-400 font-medium">✨ {featuredTools.length} Featured Tools</span>
          <span className="text-gray-500">平均评分 {Math.round(featuredTools.reduce((a, t) => a + t.rating, 0) / featuredTools.length * 10) / 10} ⭐</span>
        </div>
      </div>

      {/* Featured Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-purple-600 dark:bg-purple-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold">Want more AI tools?</h2>
          <p className="text-purple-200 mt-2">Explore our full collection of 54+ AI tools</p>
          <Link href="/" className="inline-block mt-4 bg-white text-purple-600 px-6 py-2 rounded-lg font-medium hover:bg-purple-50 transition">
            Browse All → 查看全部
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
