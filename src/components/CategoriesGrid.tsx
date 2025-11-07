import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { headers } from 'next/headers';
import { Locale } from '@/i18n.config';

interface Category {
  id: string;
  name: string;
  name_ar?: string | null;
  slug: string;
  hero_image?: string | null;
}

interface CategoriesGridProps {
  categories: Category[];
}

const CategoriesGrid = async ({ categories }: CategoriesGridProps) => {
  const url = (await headers()).get('x-url');
  const locale = url?.split('/')[3] as Locale;

  return (
    <div className="mt-16 grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:justify-center">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={`/${locale}/listings?category=${category.slug}`}
          prefetch={true}
          className="group flex flex-col items-center p-2 sm:p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-all h-[120px] w-[100px] sm:w-[120px]"
        >
          <div className="h-16 w-16 flex items-center justify-center">
            <Image
              src={category.hero_image || "/placeholder.svg"}
              alt={category.name}
              width={32}
              height={32}
            />
          </div>
          <span className="mt-2 text-xs sm:text-sm font-medium text-center line-clamp-2">
            {locale === 'ar' && category.name_ar ? category.name_ar : category.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default CategoriesGrid;
