import clsx from 'clsx'
import { PromoBanner } from 'lib/sanity/client'
import Link from 'next/link'

interface PromoBannerBlockProps {
  block: PromoBanner
}

export function PromoBannerBlock({ block }: PromoBannerBlockProps) {
  // Check if banner is expired
  const isExpired = block.expiryDate && new Date(block.expiryDate) < new Date()
  
  // Don't render if not visible or expired
  if (!block.isVisible || isExpired) {
    return null
  }

  const backgroundColorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    orange: 'bg-orange-600',
    red: 'bg-red-600',
    gray: 'bg-gray-600',
  }

  const textColorClasses = {
    white: 'text-white',
    black: 'text-black',
  }

  return (
    <section className={clsx(
      'py-4 px-4',
      backgroundColorClasses[block.backgroundColor]
    )}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            <h3 className={clsx(
              'text-lg md:text-xl font-bold mb-1',
              textColorClasses[block.textColor]
            )}>
              {block.title}
            </h3>
            {block.description && (
              <p className={clsx(
                'text-sm md:text-base opacity-90',
                textColorClasses[block.textColor]
              )}>
                {block.description}
              </p>
            )}
          </div>

          {/* Button */}
          <div className="flex-shrink-0">
            <Link
              href={block.buttonUrl}
              className={clsx(
                'inline-flex items-center justify-center px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105',
                textColorClasses[block.textColor],
                'border-2 border-current hover:bg-current hover:bg-opacity-10'
              )}
            >
              {block.buttonText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
