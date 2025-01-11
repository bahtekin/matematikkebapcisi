import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface BlogCardProps {
  title: string
  description: string
  category: string
  image: string
  slug: string
  author: {
    name: string
    avatar: string
  }
  date: string
}

const BlogCard: FC<BlogCardProps> = ({
  title,
  description,
  category,
  image,
  slug,
  author,
  date,
}) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800 dark:shadow-gray-700">
      <Link href={`/blog/${slug}`}>
        <div className="relative h-48 w-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm text-green-600 dark:bg-green-900/30 dark:text-green-400">
            {category}
          </span>
          <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
          <p className="mt-2 text-gray-600 line-clamp-2 dark:text-gray-400">{description}</p>
          <div className="mt-4 flex items-center">
            <Image
              src={author.avatar}
              alt={author.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{author.name}</p>
              <div className="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={date}>{date}</time>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default BlogCard 