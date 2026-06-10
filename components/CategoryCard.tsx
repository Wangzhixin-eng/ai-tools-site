import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  nameCn: string;
  icon: string;
  color: string;
}

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.id}`}>
      <div className={`${category.color} rounded-2xl p-4 text-white hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col items-center justify-center text-center gap-2`}>
        <div className="text-3xl">{category.icon}</div>
        <div className="font-bold text-sm">{category.nameCn}</div>
        <div className="text-xs opacity-80">{category.name}</div>
      </div>
    </Link>
  );
}
