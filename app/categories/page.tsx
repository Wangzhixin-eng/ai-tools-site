import Link from 'next/link';
import { aiTools } from '../../data/tools';

const categories = [
  { id: 'chatbot', name: '💬 Chat & AI', nameCn: '聊天AI', emoji: '💬' },
  { id: 'image', name: '🎨 Image Generation', nameCn: '图像生成', emoji: '🎨' },
  { id: 'video', name: '🎬 Video & Animation', nameCn: '视频动画', emoji: '🎬' },
  { id: 'audio', name: '🎵 Audio & Music', nameCn: '音频音乐', emoji: '🎵' },
  { id: 'code', name: '💻 Code & Dev', nameCn: '编程开发', emoji: '💻' },
  { id: 'productivity', name: '⚡ Productivity', nameCn: '效率工具', emoji: '⚡' },
  { id: 'design', name: '🎯 Design & UI', nameCn: '设计UI', emoji: '🎯' },
  { id: 'writing', name: '✍️ Writing & Text', nameCn: '写作文本', emoji: '✍️' },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-purple-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-purple-600 dark:text-purple-400">AIHub</Link>
          <nav className="flex gap-6">
            <Link href="/" className="text-purple-600 dark:text-purple-400 font-medium text-sm">Home · 首页</Link>
            <Link href="/categories" className="text-gray-600 dark:text-gray-300 text-sm font-medium">Categories · 分类</Link>
            <Link href="/featured" className="text-gray-600 dark:text-gray-300 text-sm">Featured · 精选</Link>
            <Link href="/new" className="text-gray-600 dark:text-gray-300 text-sm">New · 最新</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Browse by Category</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg">按分类浏览所有AI工具</p>
      </div>

      {/* Category Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const count = aiTools.filter(t => t.category === cat.id).length;
            return (
              <Link key={cat.id} href={`/categories/${cat.id}`}>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-100 dark:border-gray-700">
                  <div className="text-4xl mb-3">{cat.emoji}</div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">{cat.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{cat.nameCn}</p>
                  <p className="text-purple-600 dark:text-purple-400 text-sm mt-3 font-medium">{count} tools · {count}个工具</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center">
        <p className="text-sm">© 2026 AIHub · AI Tools Navigator · AI工具精选导航</p>
      </footer>
    </div>
  );
}
