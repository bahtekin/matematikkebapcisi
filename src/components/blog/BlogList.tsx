import { FC } from 'react'
import BlogCard from './BlogCard'

interface BlogListProps {
  posts: {
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
  }[]
}

const BlogList: FC<BlogListProps> = ({ posts }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <BlogCard key={index} {...post} />
        ))}
      </div>
    </div>
  )
}

export default BlogList 