import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';

interface Category {
  id: string;
  name: string;
  nameCn: string;
  nameJp: string;
  nameKr: string;
  icon: string;
  color: string;
}

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const { t } = useLanguage();
  const name = t({ en: category.name, cn: category.nameCn, jp: category.nameJp, kr: category.nameKr });

  return (
    <Link href={`/categories/${category.id}`}>
      <div className={`${category.color} rounded-2xl p-4 text-white hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col items-center justify-center text-center gap-2`}>
        <div className="text-3xl">{category.icon}</div>
        <div className="font-bold text-sm">{name}</div>
      </div>
    </Link>
  );
}
