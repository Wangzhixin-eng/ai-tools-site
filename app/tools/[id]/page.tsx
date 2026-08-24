import { aiTools } from '../../../data/tools';
import ToolDetailClient from './ToolDetailClient';
import { Suspense } from 'react';

export function generateStaticParams() {
  return aiTools.map((tool) => ({ id: tool.id }));
}

export default function ToolDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-gray-500">Loading...</div>
      </div>
    }>
      <ToolDetailClient params={params} />
    </Suspense>
  );
}
