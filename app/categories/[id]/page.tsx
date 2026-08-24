import { aiTools } from '../../../data/tools';
import CategoryDetailClient from './CategoryDetailClient';

const categoryIds = ['chatbot', 'writing', 'image', 'video', 'audio', 'code', 'productivity', 'design'];

export function generateStaticParams() {
  return categoryIds.map((id) => ({ id }));
}

export default function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  return <CategoryDetailClient params={params} />;
}
