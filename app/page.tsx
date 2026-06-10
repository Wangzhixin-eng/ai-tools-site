import Link from 'next/link';
import { aiTools, categories, getFeaturedTools } from '@/data/tools';
import ToolCard from '@/components/ToolCard';
import CategoryCard from '@/components/CategoryCard';
import HeroSection from '@/components/HeroSection';

export default function Home() {
  const featuredTools = getFeaturedTools();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🤖</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">AIHub</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">AI Tools Navigator · AI工具精选</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-purple-600 dark:text-purple-400 font-medium text-sm">Home · 首页</Link>
              <Link href="/categories" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm">Categories · 分类</Link>
              <Link href="/featured" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm">Featured · 精选</Link>
              <Link href="/new" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm">New · 最新</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Bar */}
      <section className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">{aiTools.length}+</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">AI Tools · AI工具</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">9</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Categories · 分类</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400">Free & Paid</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">免费和付费</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold text-pink-600 dark:text-pink-400">Daily</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Updated · 每日更新</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Browse by Category</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">按分类浏览</p>
          </div>
          <Link href="/categories" className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline">
            View All → 查看全部
          </Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* Featured Tools */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">⭐ Featured AI Tools</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">精选AI工具推荐</p>
          </div>
          <Link href="/featured" className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTools.slice(0, 6).map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* All Tools */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🔥 All AI Tools</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">全部AI工具 · 共{aiTools.length}个</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Know a Great AI Tool? | 推荐好用的AI工具？
          </h2>
          <p className="text-purple-100 mb-8 text-lg">
            Help us build the most comprehensive AI tools database!<br />
            帮助我们建设最全面的AI工具数据库！
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-gray-400">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">🤖</span>
              </div>
              <span className="text-white font-bold text-lg">AIHub</span>
            </div>
            <p className="text-sm text-gray-500">
              Your ultimate AI tools navigator. | 最全面的AI工具导航站。
            </p>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
            <p>© 2026 AIHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
