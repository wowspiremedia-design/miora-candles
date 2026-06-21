import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import type { Category } from '@/types'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const imageUrl = category.image
    ? urlFor(category.image).width(600).height(400).fit('crop').url()
    : null

  return (
    <Link
      href={`/categories/${category.slug.current}`}
      className="glass-card group block overflow-hidden"
    >
      <div className="relative aspect-[3/2] w-full overflow-hidden" style={{ borderRadius: '15px 15px 0 0' }}>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={category.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center" style={{ background: '#FDF0EC' }}>
            <svg className="h-16 w-16" style={{ color: '#E8DDD0' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            </svg>
          </div>
        )}
        {/* Dark gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,18,8,0.75) 0%, transparent 60%)' }} />
        {/* Category name */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-heading text-2xl font-semibold text-white drop-shadow-sm">
            {category.name}
          </h3>
          {category.description && (
            <p className="mt-1 font-body text-sm line-clamp-2" style={{ color: 'rgba(255,255,255,0.8)' }}>
              {category.description}
            </p>
          )}
        </div>
      </div>

      {/* Card footer */}
      <div className="flex items-center justify-between px-5 py-4">
        <span className="font-body text-sm font-medium text-secondary transition-colors duration-300 group-hover:text-gold">
          Explore Collection
        </span>
        <svg
          className="h-4 w-4 text-secondary transition-all duration-300 group-hover:translate-x-1 group-hover:text-gold"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}
