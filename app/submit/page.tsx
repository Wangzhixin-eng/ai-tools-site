'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';

const BASE_PATH = '/ai-tools-site';

const labels = {
  title: {
    en: '📢 Submit an AI Tool',
    cn: '📢 提交AI工具',
    jp: '📢 AIツールを提交',
    kr: '📢 AI 도구 제출'
  },
  subtitle: {
    en: 'Know a great AI tool not on our list? Let us know!',
    cn: '发现了好用的AI工具但不在列表里？快来告诉我们！',
    jp: '素晴らしいAIツールがリストにない？お知らせください！',
    kr: '훌륭한 AI 도구가 목록에 없으신가요? 알려주세요!'
  },
  nameLabel: { en: 'Tool Name *', cn: '工具名称 *', jp: 'ツール名 *', kr: '도구 이름 *' },
  namePlaceholder: { en: 'e.g. ChatGPT', cn: '如：ChatGPT', jp: '例：ChatGPT', kr: '예: ChatGPT' },
  websiteLabel: { en: 'Website URL *', cn: '官网地址 *', jp: 'ウェブサイトURL *', kr: '공식 사이트 URL *' },
  websitePlaceholder: { en: 'https://...', cn: 'https://...', jp: 'https://...', kr: 'https://...' },
  descLabel: { en: 'Description *', cn: '工具简介 *', jp: '説明 *', kr: '설명 *' },
  descPlaceholder: { en: 'What does this tool do?', cn: '这个工具是做什么的？', jp: 'このツールは何をしますか？', kr: '이 도구는 무엇을 합니까?' },
  categoryLabel: { en: 'Category *', cn: '分类 *', jp: 'カテゴリ *', kr: '카테고리 *' },
  pricingLabel: { en: 'Pricing *', cn: '收费模式 *', jp: '料金 *', kr: '결제 *' },
  emailLabel: { en: 'Your Email (optional)', cn: '您的邮箱（选填）', jp: 'メールアドレス（任意）', kr: '이메일 (선택)' },
  emailPlaceholder: { en: 'For us to contact you', cn: '方便我们联系您', jp: 'ご連絡のため', kr: '연락을 위해' },
  submitBtn: { en: 'Submit Tool →', cn: '提交工具 →', jp: 'ツールを提交 →', kr: '도구 제출 →' },
  successTitle: { en: '✅ Submitted!', cn: '✅ 提交成功！', jp: '✅ 提交完了！', kr: '✅ 제출 완료!' },
  successText: { en: "We'll review it and add it to the database. Thank you!", cn: '我们审核后会添加到数据库，感谢您的推荐！', jp: '審査してデータベースに追加します。ありがとうございます！', kr: '검토 후 데이터베이스에 추가하겠습니다. 감사합니다!' },
  backHome: { en: '← Back to AIHub', cn: '← 返回AIHub', jp: '← AIHubに戻る', kr: '← AIHub으로 돌아가기' },
  note: { en: 'Note: Sponsored tools get featured placement. Contact us for rates.', cn: '注：赞助工具可获得优先展示位，联系我们了解详情。', jp: '注：赞助ツールは優先展示されます。詳細は联系我们ください。', kr: '참고: 스폰서 도구는 우선 배치됩니다. 연락주세요.' },
};

const categories = [
  { en: 'AI Chatbots', cn: 'AI聊天', jp: 'AIチャット', kr: 'AI 채팅', value: 'chatbot' },
  { en: 'Writing', cn: '写作助手', jp: '文章作成', kr: '글쓰기', value: 'writing' },
  { en: 'Image Generation', cn: '图像生成', jp: '画像生成', kr: '이미지 생성', value: 'image' },
  { en: 'Video AI', cn: '视频AI', jp: '動画AI', kr: '비디오 AI', value: 'video' },
  { en: 'Audio & Music', cn: '音频音乐', jp: 'オーディオ＆音楽', kr: '오디오 & 음악', value: 'audio' },
  { en: 'Coding', cn: '编程开发', jp: 'コーディング', kr: '코딩', value: 'code' },
  { en: 'Productivity', cn: '效率工具', jp: '生産性', kr: '생산성', value: 'productivity' },
  { en: 'Design', cn: '设计工具', jp: 'デザイン', kr: '디자인', value: 'design' },
];

const pricingOptions = [
  { en: 'Free', cn: '免费', jp: '無料', kr: '무료', value: 'free' },
  { en: 'Freemium', cn: 'Freemium（基础免费+付费功能）', jp: 'フレミアム', kr: '프리미엄', value: 'freemium' },
  { en: 'Paid', cn: '付费', jp: '有料', kr: '유료', value: 'paid' },
];

export default function SubmitPage() {
  const { t, lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', website: '', description: '', category: '', pricing: '', email: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Save to localStorage as demo (in production, send to backend/API)
    const submissions = JSON.parse(localStorage.getItem('aihub-submissions') || '[]');
    submissions.push({ ...form, submittedAt: new Date().toISOString() });
    localStorage.setItem('aihub-submissions', JSON.stringify(submissions));
    
    await new Promise(r => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t(labels.successTitle)}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">{t(labels.successText)}</p>
          <Link href={BASE_PATH} className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl transition">
            {t(labels.backHome)}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Link href={BASE_PATH} className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm font-medium">
            ← <span>{t(labels.backHome)}</span>
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">📢</div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">{t(labels.title)}</h1>
          <p className="text-gray-500 dark:text-gray-400">{t(labels.subtitle)}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t(labels.nameLabel)}</label>
            <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder={t(labels.namePlaceholder)} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t(labels.websiteLabel)}</label>
            <input required type="url" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} placeholder={t(labels.websitePlaceholder)} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t(labels.categoryLabel)}</label>
            <select required value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="">-- {t({ en: 'Select category', cn: '选择分类', jp: 'カテゴリを選択', kr: '카테고리 선택' })} --</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {lang === 'en' ? cat.en : lang === 'cn' ? cat.cn : lang === 'jp' ? cat.jp : cat.kr}
                </option>
              ))}
            </select>
          </div>

          {/* Pricing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t(labels.pricingLabel)}</label>
            <div className="grid grid-cols-3 gap-3">
              {pricingOptions.map(opt => (
                <label key={opt.value} className={`flex items-center justify-center px-4 py-3 rounded-xl border cursor-pointer transition text-sm font-medium ${
                  form.pricing === opt.value
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                    : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-purple-300'
                }`}>
                  <input type="radio" name="pricing" value={opt.value} checked={form.pricing === opt.value} onChange={e => setForm({ ...form, pricing: e.target.value })} className="sr-only" />
                  {lang === 'en' ? opt.en : lang === 'cn' ? opt.cn : lang === 'jp' ? opt.jp : opt.kr}
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t(labels.descLabel)}</label>
            <textarea required rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder={t(labels.descPlaceholder)} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none" />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t(labels.emailLabel)}</label>
            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder={t(labels.emailPlaceholder)} className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>

          {/* Note */}
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">{t(labels.note)}</p>

          {/* Submit */}
          <button type="submit" disabled={submitting} className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-bold rounded-xl transition text-base">
            {submitting ? '...' : t(labels.submitBtn)}
          </button>
        </form>
      </div>
    </main>
  );
}
