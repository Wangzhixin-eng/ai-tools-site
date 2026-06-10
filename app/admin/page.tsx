'use client';

import { useState } from 'react';
import { aiTools, type AITool } from '../../data/tools';

export default function AdminPage() {
  const [tools, setTools] = useState<AITool[]>(aiTools);
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = ['all', 'chatbot', 'image', 'video', 'audio', 'code', 'productivity', 'design', 'writing'];

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.nameCn.includes(searchQuery);
    const matchesCategory = filterCategory === 'all' || tool.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToggleFeatured = (id: string) => {
    setTools(tools.map(t => t.id === id ? { ...t, featured: !t.featured } : t));
  };

  const handleToggleNew = (id: string) => {
    setTools(tools.map(t => t.id === id ? { ...t, new: !t.new } : t));
  };

  const handleDelete = (id: string) => {
    if (confirm('确定要删除这个工具吗？')) {
      setTools(tools.filter(t => t.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            🛠️ AIHub Admin · 后台管理
          </h1>
          <div className="flex gap-4">
            <a href="/" className="text-purple-600 dark:text-purple-400 text-sm">
              查看站点 →
            </a>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-600">{tools.length}</div>
            <div className="text-sm text-gray-500">总工具数</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-yellow-600">{tools.filter(t => t.featured).length}</div>
            <div className="text-sm text-gray-500">精选工具</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">{tools.filter(t => t.new).length}</div>
            <div className="text-sm text-gray-500">最新工具</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">{tools.filter(t => t.pricing === 'free').length}</div>
            <div className="text-sm text-gray-500">免费工具</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-pink-600">8</div>
            <div className="text-sm text-gray-500">分类数</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <input
              type="text"
              placeholder="搜索工具..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? '全部分类' : cat}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            + 添加新工具
          </button>
        </div>
      </div>

      {/* Tools Table */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">工具名称</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">分类</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">评分</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">价格</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">状态</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-300">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTools.map(tool => (
                <tr key={tool.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center text-sm font-bold">
                        {tool.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{tool.name}</div>
                        <div className="text-sm text-gray-500">{tool.nameCn}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-600 rounded text-sm text-gray-700 dark:text-gray-300">
                      {tool.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-white">
                    ⭐ {tool.rating}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      tool.pricing === 'free' ? 'bg-green-100 text-green-700' :
                      tool.pricing === 'freemium' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {tool.pricing}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {tool.featured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs">⭐ 精选</span>
                      )}
                      {tool.new && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">🆕 最新</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleToggleFeatured(tool.id)}
                        className="text-yellow-600 hover:text-yellow-700 text-sm"
                        title="切换精选"
                      >
                        ⭐
                      </button>
                      <button
                        onClick={() => handleToggleNew(tool.id)}
                        className="text-green-600 hover:text-green-700 text-sm"
                        title="切换最新"
                      >
                        🆕
                      </button>
                      <button
                        onClick={() => setSelectedTool(tool)}
                        className="text-blue-600 hover:text-blue-700 text-sm"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDelete(tool.id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      {selectedTool && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">编辑工具</h2>
              <button onClick={() => setSelectedTool(null)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">名称</label>
                <input
                  type="text"
                  value={selectedTool.name}
                  onChange={(e) => setSelectedTool({ ...selectedTool, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">中文名称</label>
                <input
                  type="text"
                  value={selectedTool.nameCn}
                  onChange={(e) => setSelectedTool({ ...selectedTool, nameCn: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">描述</label>
                <textarea
                  value={selectedTool.description}
                  onChange={(e) => setSelectedTool({ ...selectedTool, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">中文描述</label>
                <textarea
                  value={selectedTool.descriptionCn}
                  onChange={(e) => setSelectedTool({ ...selectedTool, descriptionCn: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">分类</label>
                  <select
                    value={selectedTool.category}
                    onChange={(e) => setSelectedTool({ ...selectedTool, category: e.target.value as AITool['category'] })}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    {categories.slice(1).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">价格</label>
                  <select
                    value={selectedTool.pricing}
                    onChange={(e) => setSelectedTool({ ...selectedTool, pricing: e.target.value as AITool['pricing'] })}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="free">免费</option>
                    <option value="freemium">免费+付费</option>
                    <option value="paid">付费</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">评分</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={selectedTool.rating}
                    onChange={(e) => setSelectedTool({ ...selectedTool, rating: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">网站</label>
                  <input
                    type="url"
                    value={selectedTool.website}
                    onChange={(e) => setSelectedTool({ ...selectedTool, website: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedTool.featured}
                    onChange={(e) => setSelectedTool({ ...selectedTool, featured: e.target.checked })}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">精选工具</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedTool.new}
                    onChange={(e) => setSelectedTool({ ...selectedTool, new: e.target.checked })}
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">最新工具</span>
                </label>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setTools(tools.map(t => t.id === selectedTool.id ? selectedTool : t));
                    setSelectedTool(null);
                  }}
                  className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
                >
                  保存更改
                </button>
                <button
                  onClick={() => setSelectedTool(null)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:border-gray-600"
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">添加新工具</h2>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <p className="text-gray-500 dark:text-gray-400">
              添加新工具功能需要后端支持，当前为纯静态站点。<br/>
              建议直接编辑 <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">data/tools.ts</code> 文件添加。
            </p>
            <button
              onClick={() => setShowAddModal(false)}
              className="mt-4 w-full py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              关闭
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-8 py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
        AIHub Admin Dashboard · 后台管理面板
      </footer>
    </div>
  );
}
